# 纯标准库实现，零 pip 依赖 → 构建完全离线。
# 基础镜像用服务器已有的 python 3.7 alpine（textbook 服务同源基础层）：
# 服务器 Docker 19.03 拉不了 Docker Hub 新镜像（OCI manifest 不兼容），
# 而 aliyun 上也只有 py3.7 —— 本服务只用到标准库，3.7 足够。
FROM textbook-center_textbook-web:latest

WORKDIR /app
COPY app.py .

ENV PT_OJ_PROFILE_URL=http://oj-backend:8000/api/profile \
    PT_DB_PATH=/data/pixeltyper.db \
    PT_PORT=9100

EXPOSE 9100
CMD ["python", "app.py"]
