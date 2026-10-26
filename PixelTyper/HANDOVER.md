# PixelTyper 代码交接文档

> 交接对象：在 xmuoj 云服务器上接手的 AI / 运维者。
> 交接时间：2026-10-24。原始开发在老师 Mac 的 `~/Downloads/PixelTyper/`，本目录是完整镜像。
> 线上地址：https://xmuoj.com/PixelTyper/ （`www.xmuoj.com` 已 301 到此，2026-10-26）

---

## 1. 项目是什么

面向大一新生的像素风打字训练网站，三大模块：

1. **指法练习**：指法道场 16 课（TT 式渐进指法，`lane="ft"`，tier 0），大字自动折行、不打回车
2. **Python 语言关卡**：5 个大关（tier 1-5），每关 Boss 战解锁下一关
3. **C++ 语言关卡**：同上，与 Python 独立解锁

附加：特训营地（tier 0 符号/数字训练）、每日挑战、排行榜（复用 OJ 账号）、老师自定义关卡包（管理员在线编辑 JSON 发布）。

## 2. 线上架构

```
浏览器
  │  https://xmuoj.com/PixelTyper/         ← 静态文件（oj-backend 容器 nginx 直接发）
  │  https://xmuoj.com/PixelTyper/api/*    ← 动态 API
  │  （www.xmuoj.com 由 nginx 301 → https://xmuoj.com，见 §5）
  ▼
oj-backend 容器（nginx + gunicorn + dramatiq，supervisord 管理）
  ├─ /app/dist/PixelTyper/          静态前端（容器可写层！非挂载）
  ├─ /app/deploy/nginx/locations.conf  里有 location ^~ /PixelTyper/api/ → pixeltyper-api:9100
  ├─ /app/deploy/nginx/nginx.conf  include /data/nginx/domain_redirect.conf（www→apex 301）
  ▼
pixeltyper-api 容器（纯 Python 3.7 标准库，零 pip 依赖）
  ├─ 代码：/OnlineJudgeDeploy/pixeltyper-api/（docker-compose + app.py，挂载进容器）
  ├─ 数据：/OnlineJudgeDeploy/pixeltyper-api/data/pixeltyper.db（SQLite WAL，挂载卷）
  └─ 认证：转发浏览器 sessionid Cookie → http://oj-backend:8000/api/profile 验证（60s 缓存）
```

**两个容器的网络**：都在 `onlinejudgedeploy_default`。OJ 评测核心（judge-server）完全不被本系统触碰。

## 3. 服务器环境的坑（都踩过，别再踩）

- **docker 19.03.4**：不能拉 OCI manifest 的新镜像，Docker Hub 也不通。**只能用本地已有镜像**。pixeltyper-api 的 base 是本地 `textbook-center_textbook-web:latest`（py3.7-alpine）。这就是为什么后端是纯标准库、零 pip 依赖。
- **docker-compose 1.22**：compose 文件必须 `version: "3.3"`，networks 不能写 `name:` 字段（用网络 key 本身当名字 + `external: true`）。
- **PyPI 镜像可用**：aliyun/tuna 通（但本项目不需要）。
- **nginx 配置在 oj-backend 容器可写层**：`/app/deploy/nginx/locations.conf` 不是挂载卷！oj-backend 容器重建后 `/PixelTyper/api/` 路由会丢，需要重加。备份在同目录 `locations.conf.bak-pixeltyper-20261023`。同理 `/app/dist/PixelTyper/` 静态文件也在可写层，重建容器后需重新部署（跑本目录的 deploy 流程即可）。
- **域名规范化（2026-10-26）**：`/data/nginx/domain_redirect.conf`（`/data` 是持久挂载）把 `www.xmuoj.com` 301 到 `https://xmuoj.com`（保留路径/查询串）；`/app/deploy/nginx/nginx.conf` 里有一行 `include /data/nginx/domain_redirect.conf;`（可写层，重建会丢）。重建后按 §5 恢复；整份预存在 `/data/nginx/nginx.conf.with-domain-20261026`。
- 🔥 **老 www 标签页会「假离线」（2026-10-26）**：301 上线前加载、之后没刷新的 www 页面，其 `/PixelTyper/api/*` 请求会被 301 到 apex；跨域重定向在 fetch 里必失败（CORS 无 ACAO），前端旧行为是静默显示「⚫ 离线·本地模式 / 排行榜服务不可用」，**成绩根本传不上去**。现已加两道守卫（**别再删**）：
  1. `index.html` `<head>` 内联脚本：`location.hostname === 'www.xmuoj.com'` → `location.replace` 到 apex（老标签页/bfcache 一加载就跳走）；
  2. `js/api.js`：`resp.redirected && 跨 origin` 或「www 上 fetch 抛错」→ 返回 `{__moved:true}`；`app.js` 据此显示「⚠ 页面已过期，刷新」而不是伪装成离线。
  验证脚本在 `~/pixeltyper_harden_20261026/`（含改动前备份 `original/`、`mirror_before/`）。
- **scp 到 /tmp 可能 Permission denied**（有 root 同名文件）：先 scp 到家目录再 sudo cp。

## 4. 目录结构

```
PixelTyper/
├── index.html          # 单页应用骨架（7 个 screen：boot/map/stage/game/result/profile/board/admin）
├── css/style.css       # 全部样式（PICO-8 配色，像素边框）
├── js/
│   ├── app.js          # 主逻辑（IIFE）：地图/关卡/战斗/结算/复盘/排行榜/管理后台
│   ├── engine.js       # TypingSession：击键状态机、WPM/准确率/连击统计、星级判定
│   ├── api.js          # PTAPI：fetch 封装，6s 超时，401→{__unauth}，网络失败→null 降级离线
│   ├── storage.js      # localStorage 档案（xp/stars/bossKills/keyStats/settings）
│   ├── pixelart.js     # canvas 像素画（角色/Boss）
│   └── sfx.js          # WebAudio 合成音效
├── data/
│   ├── snippets.js     # 全部内置关卡：py-* / c-* / 特训 / ft-01..16（指法课）
│   └── flavor.js       # 文案：大关名/Boss 名/称号/成就
├── server/
│   ├── app.py          # 后端全部代码（~450 行，stdlib http.server + sqlite3）
│   ├── Dockerfile      # FROM textbook-center_textbook-web:latest，无 pip
│   ├── docker-compose.yml
│   └── README.md       # 后端运维细节
├── deploy.sh           # Mac 端一键部署静态文件（tar→scp→docker cp 进 oj-backend）
├── README.md           # 面向老师/学生的使用说明
└── HANDOVER.md         # 本文档
```

## 5. 常用运维命令（在服务器上）

```bash
# 后端重启/重建
cd /OnlineJudgeDeploy/pixeltyper-api && sudo docker-compose up -d --build
sudo docker logs -f pixeltyper-api

# 数据库直接查（注意：含学生账号数据，先征得老师同意再 dump）
sudo docker exec pixeltyper-api python -c "import sqlite3; db=sqlite3.connect('/data/pixeltyper.db'); ..."

# nginx 路由丢失时重加（oj-backend 重建后）
sudo docker exec oj-backend sh -c 'cp /app/deploy/nginx/locations.conf.bak-pixeltyper-20261023 /app/deploy/nginx/locations.conf'

# 域名 301（www → https://xmuoj.com）：/data/nginx/domain_redirect.conf 在持久挂载里；
# 重建后 nginx.conf 的 include 行会丢，恢复整份（含 include）并重载：
sudo docker exec oj-backend sh -c 'cp /data/nginx/nginx.conf.with-domain-20261026 /app/deploy/nginx/nginx.conf'
sudo docker exec oj-backend nginx -t -c /app/deploy/nginx/nginx.conf
sudo docker exec oj-backend nginx -s reload -c /app/deploy/nginx/nginx.conf
# 注意：nginx.conf 是整份覆盖；以后若镜像里的 nginx.conf 有更新，改成手工补 include 行：
#   include /data/nginx/domain_redirect.conf;   （放在 http { } 内、第一个 server 之前）

# 前端更新：在 Mac 源码目录跑 ./deploy.sh；
# 若 Mac 不在手，直接改服务器上的源码镜像再 tar 进容器：
sudo docker exec oj-backend mkdir -p /app/dist/PixelTyper
sudo docker cp <打包文件> oj-backend:/tmp/ && sudo docker exec oj-backend sh -c "cd /app/dist/PixelTyper && tar -xzf /tmp/<打包文件>"
```

## 6. 安全红线（必须遵守）

- **`battle_service_token` 只给 Battle Service 后端，永远不进浏览器、不进仓库、不进日志。** 这是老师的死命令。
- 所有写请求必须带自定义头 `X-PT-Client: pixeltyper`（CSRF 防线，api.js 已封装）。
- 服务端复核成绩：`wpm = (chars/5)/(ms/60000)` 与上报值容差 15%；上限 wpm≤300、ms≥1000、acc≥0.8、stars 1-3；每用户 1.5s 提交节流；每用户每关只留最好成绩（先比星数再比 WPM）。
- 用户输入（关卡包 name/desc/code 等）前端渲染一律过 `esc()` HTML 转义。
- 管理员判定 = OJ `admin_type in ("Super Admin","Admin")`，即老师的 OJ 账号，无独立 token。

## 7. 排行榜口径

- 总榜：总星数 → 战功 XP（`XP_FACTOR=[0,0.6,1,1.6]`，不含 Boss 1.5x 和每日 2x 加成）→ 平均准确率
- 单关榜：星数 → WPM → 准确率
- 0 星（准确率 <80%）的成绩不上传、不计入任何统计
- **真名只给管理员**（2026-10-26）：`users.name` 存 OJ 的 `real_name`（⚠️ 该字段在 `/api/profile` 的 `data` **顶层**，
  不在 `data.user` 里——以前读错位置导致排行榜显示的全是学号）。排行榜接口对管理员额外下发 `real_name` 字段，
  匿名/普通学生一律为 `null`，页面只显示学号；管理员多出「姓名」一列（总榜和单关榜都有）。
- 新用户首次访问/交卷时 `current_user()` 会自动把真名写进 `users.name`；老数据用一次性回填写入。

## 8. 前端关键机制（改代码前必读）

- `app.js` 是 IIFE，内部函数不外露；`window.SNIPPETS`/`window.FLAVOR`/`window.Store`/`window.PTAPI` 是全局入口
- 语言判定：`langOf(s)` 按 snippet id 前缀（`py-`/`c-`/其他）。Boss 击杀按语言记 `bossKills['py1'..'c5']`；**旧存档的数字键（`bossKills[1]`）对两种语言都算数，不要删这个兼容**
- 打完停留复盘：`finishReview()` 显示 `#review-panel`（代码保留可见），Enter→结算 / R→重打 / Esc→返回；`gameCtx.settled` 保证 endLevel 幂等
- 指法课：`lane="ft"` → renderCode 把换行转空格、code-panel 加 `.ft-mode`（大字自动折行）、Enter 键忽略
- 字号可调：战场右上 A-/A+，`settings.fontCode`（默认 22）与 `settings.fontFt`（默认 30）分开持久化
- 长代码：`.code-panel` max-height + overflow-y，光标 scrollIntoView 自动跟随
- 离线降级：API 不可达时一切照常，成绩只存 localStorage
- 域名守卫：`index.html` 的内联脚本负责 www→apex 跳转；`api.js` 的 `__moved` + `app.js` 的 `oj.moved` 负责把「页面过期」讲清楚（见 §3）

## 9. 测试方法

- 后端：`server/` 下有 stdlib 测试模式（Mac 上曾用 /tmp/pt-test/test_stdlib.py 31 例全过）；改动 app.py 后至少跑一遍 validate_score/validate_snippet/排行榜聚合的单测
- 前端 E2E：Mac 上用 Playwright 驱动 http://localhost:8899（devserver 静态 + 代理 api 到本地 9100 后端 + 9101 OJ stub）；服务器上可直接对 https://xmuoj.com/PixelTyper/ 做冒烟（www 会 301 过来）
- **E2E 模拟打字不要太快**：<50ms/键 会撞服务端 ms≥1000 / wpm≤300 校验，那是防刷设计不是 bug

## 10. 当前待办（按优先级）

1. **排行榜没人气**（2026-10-24 诊断；主因 B 已于 2026-10-26 修复）：
   - 库中确实只有老师（andy）的成绩——学生打的分没上传
   - **主因 A（待办）**：学生未登录 xmuoj 就玩（成绩只存本地，结算页有提示但不显眼）
     → ③ 前端把"未登录"提示做得更醒目
   - ✅ **主因 B 已修（2026-10-26）**：`www.xmuoj.com` → **301** → `https://xmuoj.com`（老师选 apex 为唯一入口）。
     OJ 的 `sessionid` 是 host-only cookie；现在登录/游玩都在 apex，cookie 一致。
     之前只在 www 登录过的用户需在 apex 重新登录一次。
   - 待办 ②：注册测试学生账号做端到端验证（验证成绩上传/排行榜）
2. **老师会随时给自定义关卡/模板**：用网页「🛠 管理」在线发布（OJ 管理员账号），或直接 POST /packs（JSON schema 见 server/README.md 和 README.md 的关卡格式表）
3. 可能的未来需求：长代码并排对照视图（学生提过滚动视图已做，并排暂搁置）

## 11. 变更纪律

- 任何改动先在本地/测试环境验证再上线；动 oj-backend 的 nginx 前**必须备份** locations.conf（命名 `locations.conf.bak-pixeltyper-YYYYMMDD`）
- 不动 OJ 评测相关的任何容器/路由/数据
- 上线后必须实测 https://xmuoj.com/PixelTyper/ 冒烟（地图分区、打字、复盘、排行榜）；`www` 应 301 到 apex
