/* ═══════════════════════════════════════════════════
   PixelTyper — localStorage 档案系统
   ═══════════════════════════════════════════════════ */
(function () {
  'use strict';

  const KEY = 'pixeltyper.profile.v1';

  const DEFAULTS = () => ({
    uid: null,          // 这份本机档案最后对齐过的 xmuoj user_id（null = 还是没认领的匿名档）
    xp: 0,
    stars: {},          // snippetId -> 0..3（历史最高）
    best: {},           // snippetId -> {wpm, acc, attempts, clears, bestAcc, last}（每一关的战绩）
    bestMigrated: false,// 老档案从 stars/history 回填过没有
    bossKills: {},      // tier -> true
    achievements: [],   // 成就 id 列表
    keyStats: {},       // char -> {err: n, ok: n, totalMs: ms}
    history: [],        // {id, wpm, acc, ts（当地时间戳）}
    daily: { lastDay: '', streak: 0 },
    settings: { sound: true, fontCode: 22, fontFt: 30 },
    firstRunDone: false,
  });

  let profile = null;

  function load() {
    if (profile) return profile;
    try {
      const raw = localStorage.getItem(KEY);
      profile = raw ? Object.assign(DEFAULTS(), JSON.parse(raw)) : DEFAULTS();
    } catch (e) {
      profile = DEFAULTS();
    }
    migrateBest();
    return profile;
  }

  /** 老档案一次性回填：stars 是「通关过」的硬证据，history 里每一笔都是当时达标的局
      （只在 passed 时写历史），所以最快那笔就是「最快的一次通关」。
      只做一次，之后由 recordRun 增量维护。（history 只留最近 200 条，回填可能不全。） */
  function migrateBest() {
    if (profile.bestMigrated) return;
    const p = profile;
    p.best = p.best || {};
    const runs = {};
    for (const h of p.history || []) {
      if (!h || !h.id) continue;
      runs[h.id] = (runs[h.id] || 0) + 1;
    }
    const ids = new Set([...Object.keys(p.stars || {}), ...Object.keys(runs)]);
    for (const id of ids) {
      const st = p.stars[id] || 0;
      if (!st && !runs[id]) continue;
      const b = p.best[id] || { wpm: 0, acc: 0, attempts: 0, clears: 0, bestAcc: 0, last: '' };
      b.clears = Math.max(b.clears, runs[id] || 0, st > 0 ? 1 : 0);
      b.attempts = Math.max(b.attempts, runs[id] || 0, st > 0 ? 1 : 0);
      p.best[id] = b;
    }
    for (const h of p.history || []) {
      if (!h || !h.id) continue;
      const b = p.best[h.id];
      if (h.acc > b.bestAcc) b.bestAcc = h.acc;
      if (h.wpm > b.wpm) { b.wpm = h.wpm; b.acc = h.acc; }  // 速度与准确率同取一笔，别拼
      if (h.ts) b.last = h.ts;   // history 按追加顺序，最后一条就是最近一次
    }
    p.bestMigrated = true;
    save();
  }

  /** 写回本机档案。返回是否成功——配额满 / 隐私模式下会失败，
      调用方（比如进度回灌）必须知道「看起来存了其实没存」。 */
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(profile)); return true; }
    catch (e) { return false; }
  }

  function addXp(n) { profile.xp += Math.round(n); save(); }

  /** 玩家等级：每级所需 XP 递增，12 级封顶称号 */
  function levelOf(xp) {
    // 累计门槛：0,100,250,450,700,1000,1400,1900,2500,3200,4000,5000
    const gates = [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000, 5000];
    let lv = 1;
    for (let i = 0; i < gates.length; i++) if (xp >= gates[i]) lv = i + 1;
    const cur = gates[lv - 1];
    const next = lv < gates.length ? gates[lv] : null;
    return { level: lv, curBase: cur, next, progress: next ? (xp - cur) / (next - cur) : 1 };
  }

  function recordStars(id, stars) {
    const prev = profile.stars[id] || 0;
    if (stars > prev) { profile.stars[id] = stars; save(); }
    return Math.max(prev, stars);
  }

  /** 每局结束都记一笔（含没达标的）：
      attempts 每次 +1；wpm/acc 取「最快的一次通关」整局照抄（不各取最大值，
      否则会把最快那局的速度和最准那局的准确率拼成一个不可能的组合）；
      bestAcc 单独记「见过的最高准确率」，给没通过的人看差多少；
      clears 只数真正达标的局。 */
  function recordRun(id, run) {
    const b = profile.best[id] ||
      { wpm: 0, acc: 0, attempts: 0, clears: 0, bestAcc: 0, last: '' };
    b.attempts += 1;
    if (run.completed) {
      if (run.acc > b.bestAcc) b.bestAcc = run.acc;
      if (run.stars > 0) {
        b.clears += 1;
        if (run.wpm > b.wpm) { b.wpm = Math.round(run.wpm); b.acc = run.acc; }
      }
    }
    if (run.ts) b.last = run.ts;
    profile.best[id] = b;
    save();
    return b;
  }

  function bestOf(id) { return profile.best[id] || null; }

  function recordKeyStats(perKey) {
    for (const [ch, s] of Object.entries(perKey)) {
      const k = profile.keyStats[ch] || { err: 0, ok: 0, totalMs: 0 };
      k.err += s.err; k.ok += s.ok; k.totalMs += s.totalMs;
      profile.keyStats[ch] = k;
    }
    save();
  }

  function pushHistory(entry) {
    profile.history.push(entry);
    if (profile.history.length > 200) profile.history = profile.history.slice(-200);
    save();
  }

  function unlockAchv(id) {
    if (profile.achievements.includes(id)) return false;
    profile.achievements.push(id); save();
    return true; // 新解锁
  }

  // ─────────── 服务器进度回灌（GET /my-scores） ───────────
  // 星星/战绩/XP 只存在本机 localStorage，换电脑或清缓存就「进度没了」。
  // 服务器 scores 一行 = 一关的最佳成绩，登录后拉回来合并即可。
  // 两个口径必须照办：① sts.acc 是 0..1 的比率，本机 best.acc/bestAcc 是百分数；
  // ② 速度与准确率必须成对写入（见 recordRun），不能各取各的最大值。
  const BAD_IDS = { '__proto__': 1, 'constructor': 1, 'prototype': 1 };  // snippet_id 允许下划线
  const num = (v, lo, hi) => {
    const n = Number(v);
    return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : null;
  };

  /** 把服务器成绩并进本机档案。
      @param res {user_id, xp, scores:{id:{stars,wpm,acc,ms,chars,updated_at}}}
      @param isKnown id => bool，当前题库里还存在的关卡（旧关卡改版后的孤儿 id 不写进来）
      @return {changed, replaced, skipped} —— replaced 表示档案原本属于别的账号，已整体换成本账号 */
  function mergeServer(res, isKnown) {
    const uid = num(res && res.user_id, 1, Number.MAX_SAFE_INTEGER);
    const scores = res && res.scores;
    if (uid === null || !Number.isInteger(uid) || uid <= 0) return { changed: false, replaced: false, skipped: 0 };
    if (!scores || typeof scores !== 'object' || Array.isArray(scores)) return { changed: false, replaced: false, skipped: 0 };

    const p = load();
    // 换账号：本机这份星星/战绩属于上一个人，不能带进新账号，整体按服务器重建
    const replaced = p.uid != null && p.uid !== uid;
    if (replaced) {
      p.stars = {}; p.best = {}; p.bossKills = {}; p.xp = 0;
      p.history = []; p.keyStats = {}; p.achievements = [];
      p.daily = { lastDay: '', streak: 0 };
    }
    let changed = replaced, skipped = 0;

    for (const id of Object.keys(scores)) {
      if (BAD_IDS[id]) continue;
      if (isKnown && !isKnown(id)) { skipped += 1; continue; }
      const row = scores[id];
      if (!row || typeof row !== 'object') continue;
      const stars = num(row.stars, 0, 3);
      if (stars === null || stars < 1) continue;
      const wpm = num(row.wpm, 0, 1000);
      const acc = num(row.acc, 0, 1);
      if (wpm === null || acc === null) continue;
      if ((p.stars[id] || 0) < stars) { p.stars[id] = stars; changed = true; }
      const b = p.best[id] || (p.best[id] = { wpm: 0, acc: 0, attempts: 0, clears: 0, bestAcc: 0, last: '' });
      const pct = Math.round(acc * 1000) / 10;               // 0.9823 → 98.2
      // 卡片战绩行和战场 HUD 都拿 attempts 当门槛：服务器只知道「至少通关过一次」
      if (!b.attempts) { b.attempts = 1; changed = true; }
      if (!b.clears) { b.clears = 1; changed = true; }
      if (Math.round(wpm) > b.wpm) { b.wpm = Math.round(wpm); b.acc = pct; changed = true; }
      if (pct > b.bestAcc) { b.bestAcc = pct; changed = true; }
      if (!b.last && row.updated_at) {
        const d = new Date(Number(row.updated_at) * 1000);
        if (!isNaN(d.getTime())) b.last = d.toLocaleString('zh-CN');
      }
    }

    // XP：服务器口径不含 Boss/每日加成，取大值只保证「不倒退」
    const sx = Math.round(num(res.xp, 0, 1e7) || 0);
    if (sx > (Number(p.xp) || 0)) { p.xp = sx; changed = true; }

    // uid 变了必须落盘：否则下次加载还是老的 null，「这台机器上一份档案属于别人」就检测不出来
    if (p.uid !== uid) { p.uid = uid; changed = true; }
    const saved = changed ? save() : true;
    return { changed, replaced, skipped, saved };
  }

  /** 薄弱按键：按错误率排序取前 5（至少 3 次击键才统计） */
  function weakKeys() {
    return Object.entries(profile.keyStats)
      .map(([ch, s]) => {
        const total = s.err + s.ok;
        return { ch, errRate: total ? s.err / total : 0, avgMs: s.ok ? s.totalMs / s.ok : 0, total };
      })
      .filter(k => k.total >= 3 && k.errRate > 0.05)
      .sort((a, b) => b.errRate - a.errRate)
      .slice(0, 5);
  }

  window.Store = {
    load, save, addXp, levelOf, recordStars, recordRun, bestOf, recordKeyStats,
    pushHistory, unlockAchv, weakKeys, mergeServer,
    get p() { return load(); },
  };
})();
