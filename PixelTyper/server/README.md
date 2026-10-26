# PixelTyper API 后端（排行榜 + 自定义关卡）

纯 Python 标准库实现（零 pip 依赖），跑在 `pixeltyper-api` 容器里，
通过 oj-backend 的 nginx 以 `https://www.xmuoj.com/PixelTyper/api/` 对外。

## 架构

```
浏览器 ──► oj-backend:nginx ──/PixelTyper/api/──► pixeltyper-api:9100 ──► SQLite (/data)
                ▲                                      │
                └──── /api/profile 验证会话 ◄──────────┘
```

- **认证**：转发 `sessionid` Cookie 到 `http://oj-backend:8000/api/profile`，60 秒缓存。
  学生无需注册 PixelTyper 账号——直接用 xmuoj 账号登录 OJ 主站即可。
- **管理员**：OJ 账号 `admin_type` 为 `Super Admin` / `Admin`（即 OJ 后台管理员），零额外配置。
- **防刷**：服务端复核 wpm = (chars/5)/(ms/60s)；限 wpm≤300、ms≥1s、acc≥0.8；
  每用户 1.5s 提交节流；写操作要求 `X-PT-Client: pixeltyper` 自定义头（防 CSRF）。
- 每个学生每关只保留最好成绩（先比星数，再比 WPM）。

## 服务器部署位置

- 代码：`/OnlineJudgeDeploy/pixeltyper-api/`（app.py / Dockerfile / docker-compose.yml）
- 数据：`/OnlineJudgeDeploy/pixeltyper-api/data/pixeltyper.db`（SQLite WAL，定期 cp 备份即可）
- 容器：`pixeltyper-api`，网络 `onlinejudgedeploy_default`，`restart: unless-stopped`

## 常用运维

```bash
cd /OnlineJudgeDeploy/pixeltyper-api
sudo docker-compose up -d --build   # 改代码后重建
sudo docker logs pixeltyper-api --tail 50
sudo docker exec pixeltyper-api python -c "import urllib.request;print(urllib.request.urlopen('http://127.0.0.1:9100/ping').read())"
```

## 注意事项

1. **nginx 路由在容器可写层**：`oj-backend` 的 `/app/deploy/nginx/locations.conf` 里
   加了 `location ^~ /PixelTyper/api/`。如果 oj-backend 容器被重建，
   需要重新加这一段（同时 `/app/dist/PixelTyper/` 静态文件也要重新部署，跑本地 deploy.sh）。
   备份：`locations.conf.bak-pixeltyper-20261023` 是加之前的版本。
2. 基础镜像用的是服务器本地已有的 `textbook-center_textbook-web:latest`（python 3.7 alpine），
   因为 Docker 19.03 拉不了 Docker Hub 新镜像。纯标准库实现对此完全够用。
3. 改题不需要动后端：老师在网页端「🛠 管理」里直接编辑关卡包。
