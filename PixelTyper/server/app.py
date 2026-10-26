#!/usr/bin/env python3
"""PixelTyper API — 排行榜 + 自定义关卡 后端（纯标准库，零 pip 依赖）

为什么不用 FastAPI：服务器 Docker 19.03 拉不了新基础镜像，只有 python 3.7 基础层，
且 modern FastAPI/pydantic v2 需要 3.8+。标准库 http.server 对这个 API 面（10 条路由、
教学班并发）绰绰有余，而且构建完全离线、无供应链风险。

认证：把浏览器 Cookie 转发给 OJ（PT_OJ_PROFILE_URL）验证会话，60s 缓存。
管理员：OJ 账号 admin_type 为 Super Admin / Admin（即老师本人，零配置）。
写操作统一要求请求头 X-PT-Client: pixeltyper（自定义头跨站表单无法伪造 → 防 CSRF）。

兼容 Python 3.7+（容器基础镜像是 py3.7-alpine）。
"""
import hashlib
import json
import os
import re
import sqlite3
import threading
import time
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

# ─────────── 配置 ───────────
OJ_PROFILE_URL = os.environ.get("PT_OJ_PROFILE_URL", "http://oj-backend:8000/api/profile")
DB_PATH = os.environ.get("PT_DB_PATH", "/data/pixeltyper.db")
LISTEN_PORT = int(os.environ.get("PT_PORT", "9100"))
AUTH_CACHE_TTL = 60          # 秒，session→user 缓存
AUTH_TIMEOUT = 4             # 秒，转发 OJ 验证超时
MAX_WPM = 300
MIN_MS, MAX_MS = 1000, 3600000
MIN_CHARS, MAX_CHARS = 10, 4000
SCORE_MIN_INTERVAL = 1.5     # 秒，同一用户两次提交最小间隔
ADMIN_TYPES = ("Super Admin", "Admin")
XP_FACTOR = [0, 0.6, 1, 1.6]  # 与前端星级 XP 口径一致（不含 BOSS/每日加成）
SID_RE = re.compile(r"^[A-Za-z0-9._-]{1,64}$")

# ─────────── 数据库 ───────────
_SCHEMA = """
CREATE TABLE IF NOT EXISTS users (
    user_id   INTEGER PRIMARY KEY,
    username  TEXT NOT NULL,
    name      TEXT NOT NULL DEFAULT '',
    first_seen REAL NOT NULL,
    last_seen  REAL NOT NULL
);
CREATE TABLE IF NOT EXISTS scores (
    user_id    INTEGER NOT NULL,
    snippet_id TEXT NOT NULL,
    stars      INTEGER NOT NULL,
    wpm        INTEGER NOT NULL,
    acc        REAL NOT NULL,
    ms         INTEGER NOT NULL,
    chars      INTEGER NOT NULL,
    max_combo  INTEGER NOT NULL DEFAULT 0,
    updated_at REAL NOT NULL,
    PRIMARY KEY (user_id, snippet_id)
);
CREATE TABLE IF NOT EXISTS packs (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL,
    desc       TEXT NOT NULL DEFAULT '',
    snippets   TEXT NOT NULL,
    created_by INTEGER NOT NULL,
    created_at REAL NOT NULL,
    updated_at REAL NOT NULL
);
"""

_db_lock = threading.Lock()


def _db():
    conn = sqlite3.connect(DB_PATH, timeout=10)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    return conn


def init_db():
    parent = os.path.dirname(DB_PATH)
    if parent and not os.path.isdir(parent):
        os.makedirs(parent)
    with _db_lock, _db() as conn:
        conn.executescript(_SCHEMA)


# ─────────── OJ 会话认证 ───────────
_auth_cache = {}          # session_hash -> (ts, user_dict|None)
_auth_lock = threading.Lock()


def _oj_profile(session_value):
    """向 OJ 验证会话。返回 user dict 或 None（未登录/验证失败）。"""
    h = hashlib.sha256(session_value.encode()).hexdigest()
    now = time.time()
    with _auth_lock:
        hit = _auth_cache.get(h)
        if hit and now - hit[0] < AUTH_CACHE_TTL:
            return hit[1]
    user = None
    try:
        req = urllib.request.Request(
            OJ_PROFILE_URL,
            headers={"Cookie": "sessionid=" + session_value, "Accept": "application/json"})
        with urllib.request.urlopen(req, timeout=AUTH_TIMEOUT) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
        data = payload.get("data")
        if data and isinstance(data, dict) and data.get("user"):
            u = data["user"]
            user = {
                "id": int(u["id"]),
                "username": str(u.get("username", "")),
                "name": str(u.get("real_name") or u.get("username") or ""),
                "admin": u.get("admin_type") in ADMIN_TYPES,
            }
    except Exception:
        user = None
    with _auth_lock:
        if len(_auth_cache) > 512:      # 单教学站点量级，超了直接清空
            _auth_cache.clear()
        _auth_cache[h] = (now, user)
    return user


def current_user(headers):
    cookie = headers.get("Cookie", "")
    session_value = None
    for part in cookie.split(";"):
        part = part.strip()
        if part.startswith("sessionid="):
            session_value = part[len("sessionid="):]
            break
    if not session_value:
        return None
    user = _oj_profile(session_value)
    if user:
        now = time.time()
        with _db_lock, _db() as conn:
            conn.execute(
                "INSERT INTO users(user_id, username, name, first_seen, last_seen) VALUES(?,?,?,?,?) "
                "ON CONFLICT(user_id) DO UPDATE SET username=excluded.username, name=excluded.name, "
                "last_seen=excluded.last_seen",
                (user["id"], user["username"], user["name"], now, now))
    return user


# ─────────── 输入校验 ───────────
class BadInput(Exception):
    pass


def _num(body, key, lo, hi, is_int=True, required=True, default=None):
    v = body.get(key, default if not required else None)
    if v is None:
        raise BadInput("缺字段 " + key)
    if isinstance(v, bool) or not isinstance(v, (int, float)):
        raise BadInput(key + " 类型不对")
    if is_int and int(v) != v:
        raise BadInput(key + " 必须是整数")
    v = int(v) if is_int else float(v)
    if not (lo <= v <= hi):
        raise BadInput("%s 超出范围 (%s~%s)" % (key, lo, hi))
    return v


def validate_score(body):
    if not isinstance(body, dict):
        raise BadInput("请求体必须是 JSON 对象")
    sid = body.get("snippet_id")
    if not isinstance(sid, str) or not SID_RE.match(sid):
        raise BadInput("snippet_id 不合法")
    s = {
        "snippet_id": sid,
        "tier": _num(body, "tier", 0, 5),
        "chars": _num(body, "chars", MIN_CHARS, MAX_CHARS),
        "stars": _num(body, "stars", 1, 3),
        "wpm": _num(body, "wpm", 1, MAX_WPM),
        "acc": _num(body, "acc", 0.8, 1.0, is_int=False),
        "ms": _num(body, "ms", MIN_MS, MAX_MS),
        "max_combo": _num(body, "max_combo", 0, MAX_CHARS, required=False, default=0),
    }
    # wpm 与 chars/ms 一致性复核（防直接调 API 刷榜）
    wpm_calc = round((s["chars"] / 5) / (s["ms"] / 60000))
    if abs(wpm_calc - s["wpm"]) > max(3, int(0.15 * s["wpm"])):
        raise BadInput("成绩数据不自洽")
    return s


def validate_snippet(s, idx):
    no = "第 %d 关" % (idx + 1)
    if not isinstance(s, dict):
        raise BadInput(no + "：不是对象")
    title = str(s.get("title") or "").strip()
    if not title or len(title) > 60:
        raise BadInput(no + "：title 缺失或超过 60 字")
    code = str(s.get("code") or "").replace("\r\n", "\n").replace("\r", "\n").rstrip("\n")
    if len(code) < 5:
        raise BadInput(no + "：code 太短（至少 5 字符）")
    if len(code) > 2000:
        raise BadInput(no + "：code 超过 2000 字符")
    if any(ord(c) > 127 for c in code):
        raise BadInput(no + "：代码必须纯 ASCII")
    lines = code.split("\n")
    if len(lines) > 60:
        raise BadInput(no + "：超过 60 行")
    if max(len(l) for l in lines) > 80:
        raise BadInput(no + "：有行超过 80 字符")
    tier = s.get("tier", 1)
    if isinstance(tier, bool) or not isinstance(tier, int) or not (0 <= tier <= 5):
        raise BadInput(no + "：tier 必须是 0~5 的整数")
    lang = s.get("lang", "py")
    if lang not in ("py", "c", "drill"):
        raise BadInput(no + "：lang 必须是 py / c / drill")
    hint = str(s.get("hint") or "")[:120]
    return {"title": title, "tier": tier, "lang": lang, "code": code, "hint": hint}


def validate_pack(body):
    if not isinstance(body, dict):
        raise BadInput("请求体必须是 JSON 对象")
    name = str(body.get("name") or "").strip()
    if not name or len(name) > 40:
        raise BadInput("包名称缺失或超过 40 字")
    desc = str(body.get("desc") or "")[:200]
    arr = body.get("snippets")
    if not isinstance(arr, list) or not arr:
        raise BadInput("snippets 必须是非空数组")
    if len(arr) > 30:
        raise BadInput("一个包最多 30 关")
    return {"name": name, "desc": desc,
            "snippets": [validate_snippet(s, i) for i, s in enumerate(arr)]}


# ─────────── HTTP 层 ───────────
_last_submit = {}         # user_id -> ts
_last_lock = threading.Lock()


class Handler(BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"
    server_version = "PixelTyperAPI/1.0"

    # ── 工具 ──
    def _send(self, code, obj):
        data = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def _err(self, code, msg):
        self._send(code, {"ok": False, "error": msg})

    def _body(self):
        try:
            n = int(self.headers.get("Content-Length") or 0)
        except ValueError:
            n = 0
        if n <= 0 or n > 256 * 1024:
            raise BadInput("请求体为空或过大")
        raw = self.rfile.read(n)
        try:
            return json.loads(raw.decode("utf-8"))
        except Exception:
            raise BadInput("JSON 解析失败")

    def _require_write_guard(self):
        if self.headers.get("X-PT-Client") != "pixeltyper":
            raise Forbidden("bad client header")

    def _require_admin(self):
        self._require_write_guard()
        user = current_user(self.headers)
        if not user:
            raise Unauthorized("请先登录 xmuoj")
        if not user["admin"]:
            raise Forbidden("需要管理员权限")
        return user

    def log_message(self, fmt, *args):
        pass  # 静默；nginx 已有访问日志

    # ── 路由 ──
    def do_GET(self):
        try:
            path, _, query = self.path.partition("?")
            q = dict(p.split("=", 1) for p in query.split("&") if "=" in p)
            if path == "/ping":
                return self._send(200, {"ok": True, "ts": time.time()})
            if path == "/me":
                return self._h_me()
            if path == "/leaderboard/overall":
                return self._h_board_overall(q)
            m = re.match(r"^/leaderboard/snippet/([A-Za-z0-9._-]+)$", path)
            if m:
                return self._h_board_snippet(m.group(1), q)
            if path == "/packs":
                return self._h_list_packs()
            m = re.match(r"^/packs/(\d+)$", path)
            if m:
                return self._h_get_pack(int(m.group(1)))
            self._err(404, "not found")
        except BrokenPipeError:
            pass
        except Exception:
            self._err(500, "server error")

    def do_POST(self):
        try:
            if self.path == "/scores":
                return self._h_submit_score()
            if self.path == "/packs":
                return self._h_create_pack()
            self._err(404, "not found")
        except Unauthorized as e:
            self._err(401, str(e))
        except Forbidden as e:
            self._err(403, str(e))
        except BadInput as e:
            self._err(422, str(e))
        except BrokenPipeError:
            pass
        except Exception:
            self._err(500, "server error")

    def do_PUT(self):
        try:
            m = re.match(r"^/packs/(\d+)$", self.path)
            if m:
                return self._h_update_pack(int(m.group(1)))
            self._err(404, "not found")
        except Unauthorized as e:
            self._err(401, str(e))
        except Forbidden as e:
            self._err(403, str(e))
        except BadInput as e:
            self._err(422, str(e))
        except BrokenPipeError:
            pass
        except Exception:
            self._err(500, "server error")

    def do_DELETE(self):
        try:
            m = re.match(r"^/packs/(\d+)$", self.path)
            if m:
                return self._h_delete_pack(int(m.group(1)))
            self._err(404, "not found")
        except Unauthorized as e:
            self._err(401, str(e))
        except Forbidden as e:
            self._err(403, str(e))
        except BrokenPipeError:
            pass
        except Exception:
            self._err(500, "server error")

    # ── 端点实现 ──
    def _h_me(self):
        user = current_user(self.headers)
        if not user:
            return self._send(200, {"logged_in": False})
        self._send(200, {
            "logged_in": True,
            "user": {"id": user["id"], "username": user["username"], "name": user["name"]},
            "admin": user["admin"],
        })

    def _h_submit_score(self):
        self._require_write_guard()
        user = current_user(self.headers)
        if not user:
            raise Unauthorized("请先登录 xmuoj")
        s = validate_score(self._body())

        now = time.time()
        with _last_lock:
            last = _last_submit.get(user["id"], 0)
            if now - last < SCORE_MIN_INTERVAL:
                raise BadInput("提交太频繁")
            _last_submit[user["id"]] = now

        with _db_lock, _db() as conn:
            old = conn.execute(
                "SELECT stars, wpm FROM scores WHERE user_id=? AND snippet_id=?",
                (user["id"], s["snippet_id"])).fetchone()
            better = old is None or (s["stars"], s["wpm"]) > (old["stars"], old["wpm"])
            if better:
                conn.execute(
                    "INSERT INTO scores(user_id,snippet_id,stars,wpm,acc,ms,chars,max_combo,updated_at) "
                    "VALUES(?,?,?,?,?,?,?,?,?) "
                    "ON CONFLICT(user_id,snippet_id) DO UPDATE SET "
                    "stars=excluded.stars,wpm=excluded.wpm,acc=excluded.acc,ms=excluded.ms,"
                    "chars=excluded.chars,max_combo=excluded.max_combo,updated_at=excluded.updated_at",
                    (user["id"], s["snippet_id"], s["stars"], s["wpm"], s["acc"], s["ms"],
                     s["chars"], s["max_combo"], now))
            row = conn.execute(
                "SELECT stars, wpm, acc FROM scores WHERE user_id=? AND snippet_id=?",
                (user["id"], s["snippet_id"])).fetchone()
        self._send(200, {"ok": True, "improved": better,
                         "best": {"stars": row["stars"], "wpm": row["wpm"], "acc": row["acc"]}})

    def _h_board_overall(self, q):
        try:
            limit = max(1, min(int(q.get("limit", 50)), 100))
        except ValueError:
            limit = 50
        with _db_lock, _db() as conn:
            rows = conn.execute(
                "SELECT s.user_id, u.username, u.name, s.stars, s.chars, s.acc "
                "FROM scores s JOIN users u ON u.user_id=s.user_id").fetchall()
        agg = {}
        for r in rows:
            a = agg.setdefault(r["user_id"], {
                "user_id": r["user_id"], "username": r["username"], "name": r["name"],
                "stars": 0, "xp": 0, "clears": 0, "_acc": 0.0})
            a["stars"] += r["stars"]
            a["xp"] += round(r["chars"] * XP_FACTOR[r["stars"]])
            a["clears"] += 1
            a["_acc"] += r["acc"]
        board = []
        for a in agg.values():
            a["avg_acc"] = round(a.pop("_acc") / a["clears"], 4)
            board.append(a)
        board.sort(key=lambda x: (-x["stars"], -x["xp"], -x["avg_acc"]))
        me_rank = None
        user = current_user(self.headers)
        if user:
            for i, r in enumerate(board):
                if r["user_id"] == user["id"]:
                    me_rank = dict(r, rank=i + 1)
                    break
        self._send(200, {"rows": board[:limit], "me": me_rank})

    def _h_board_snippet(self, snippet_id, q):
        try:
            limit = max(1, min(int(q.get("limit", 20)), 50))
        except ValueError:
            limit = 20
        with _db_lock, _db() as conn:
            rows = conn.execute(
                "SELECT u.username, u.name, s.stars, s.wpm, s.acc, s.ms "
                "FROM scores s JOIN users u ON u.user_id=s.user_id "
                "WHERE s.snippet_id=? ORDER BY s.stars DESC, s.wpm DESC, s.acc DESC LIMIT ?",
                (snippet_id, limit)).fetchall()
        self._send(200, {"rows": [dict(r) for r in rows]})

    def _h_list_packs(self):
        with _db_lock, _db() as conn:
            rows = conn.execute("SELECT * FROM packs ORDER BY id").fetchall()
        self._send(200, {"packs": [
            {"id": r["id"], "name": r["name"], "desc": r["desc"],
             "count": len(json.loads(r["snippets"])), "updated_at": r["updated_at"]}
            for r in rows]})

    def _h_get_pack(self, pack_id):
        with _db_lock, _db() as conn:
            r = conn.execute("SELECT * FROM packs WHERE id=?", (pack_id,)).fetchone()
        if not r:
            return self._err(404, "关卡包不存在")
        snippets = json.loads(r["snippets"])
        for i, s in enumerate(snippets):
            s["id"] = "pk%d-%d" % (pack_id, i)   # 前端进度/成绩主键，稳定且唯一
        self._send(200, {"id": r["id"], "name": r["name"], "desc": r["desc"],
                         "snippets": snippets, "updated_at": r["updated_at"]})

    def _h_create_pack(self):
        user = self._require_admin()
        p = validate_pack(self._body())
        now = time.time()
        with _db_lock, _db() as conn:
            cur = conn.execute(
                "INSERT INTO packs(name,desc,snippets,created_by,created_at,updated_at) VALUES(?,?,?,?,?,?)",
                (p["name"], p["desc"], json.dumps(p["snippets"], ensure_ascii=False),
                 user["id"], now, now))
            pid = cur.lastrowid
        self._send(200, {"ok": True, "id": pid})

    def _h_update_pack(self, pack_id):
        self._require_admin()
        p = validate_pack(self._body())
        with _db_lock, _db() as conn:
            cur = conn.execute(
                "UPDATE packs SET name=?, desc=?, snippets=?, updated_at=? WHERE id=?",
                (p["name"], p["desc"], json.dumps(p["snippets"], ensure_ascii=False),
                 time.time(), pack_id))
        if cur.rowcount == 0:
            return self._err(404, "关卡包不存在")
        self._send(200, {"ok": True})

    def _h_delete_pack(self, pack_id):
        self._require_admin()
        with _db_lock, _db() as conn:
            cur = conn.execute("DELETE FROM packs WHERE id=?", (pack_id,))
        if cur.rowcount == 0:
            return self._err(404, "关卡包不存在")
        self._send(200, {"ok": True})


class Unauthorized(Exception):
    pass


class Forbidden(Exception):
    pass


def main():
    init_db()
    srv = ThreadingHTTPServer(("0.0.0.0", LISTEN_PORT), Handler)
    srv.daemon_threads = True
    print("PixelTyper API listening on :%d" % LISTEN_PORT, flush=True)
    srv.serve_forever()


if __name__ == "__main__":
    main()
