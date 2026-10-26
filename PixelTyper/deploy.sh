#!/bin/bash
# PixelTyper 一键部署到 xmuoj（oj-backend 容器 /app/dist/PixelTyper/）
set -euo pipefail
cd "$(dirname "$0")"

echo "==> 打包（排除截图与设计文档）"
tar -czf /tmp/pixeltyper.tar.gz \
  --exclude='.playwright-mcp' --exclude='.DS_Store' \
  --exclude='DESIGN.md' --exclude='deploy.sh' \
  index.html css js data fonts

echo "==> 上传到服务器"
scp -q /tmp/pixeltyper.tar.gz 122.51.69.77:/tmp/

echo "==> 部署进 oj-backend 容器"
ssh 122.51.69.77 '
  set -e
  sudo docker exec oj-backend mkdir -p /app/dist/PixelTyper
  sudo docker cp /tmp/pixeltyper.tar.gz oj-backend:/tmp/
  sudo docker exec oj-backend sh -c "cd /app/dist/PixelTyper && tar -xzf /tmp/pixeltyper.tar.gz && rm /tmp/pixeltyper.tar.gz"
  rm -f /tmp/pixeltyper.tar.gz
  echo "==> 容器内文件清单:"
  sudo docker exec oj-backend ls -la /app/dist/PixelTyper/
'
echo "==> 验证线上可访问"
curl -s -o /dev/null -w "HTTP %{http_code}\n" "https://www.xmuoj.com/PixelTyper/"
echo "==> 完成: https://www.xmuoj.com/PixelTyper/"
