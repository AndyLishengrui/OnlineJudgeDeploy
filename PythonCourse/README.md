# 课程导览站源码（PythonCourse）

线上：https://xmuoj.com/PythonCourse/ ｜ 部署目标：`oj-backend:/app/dist/PythonCourse/`

## 目录

| 文件 | 说明 |
|---|---|
| `build_site.py` | 生成器：读 `data.json` → 输出 `index.html`（单文件，内联 CSS） |
| `data.json` | 数据快照：`jiangyi`（专业课讲义 46 集）/ `shiyan`（实验题解 136 题）/ `qizhong`（期中串讲）/ `tjjj`（其他）/ **`oop`（面向对象编程实验 13 集，2026-11-18 新增）** |
| `index.html` | 生成产物，当前线上版 md5 `ac0f4e1c7779aec6382688be8b247c7d` |
| `assets/hero.svg`、`assets/vera.svg` | 页头像素角色 |
| `assets/labs/Lab1–4_实验指导书.pdf` | 四个项目实验的 A4 讲义，卡片里「📘 实验指导书 PDF」直接指向这里 |

## 重新生成

```bash
cd 课程网站
python3 build_site.py          # 覆盖写 index.html
md5 -q index.html              # 期望 ac0f4e1c7779aec6382688be8b247c7d（数据未变时）
```

## 部署

```bash
scp index.html ubuntu@122.51.69.77:/tmp/site_up/
scp -r assets/labs ubuntu@122.51.69.77:/tmp/site_up/labs   # 首次或 PDF 有更新时
ssh ubuntu@122.51.69.77 "sudo docker cp /tmp/site_up/index.html oj-backend:/app/dist/PythonCourse/index.html \
  && sudo docker exec oj-backend mkdir -p /app/dist/PythonCourse/assets/labs \
  && sudo docker cp /tmp/site_up/labs/. oj-backend:/app/dist/PythonCourse/assets/labs/"
```

## 页面结构（h2 顺序）

1. 课程讲义（第 1–10 章 · 46 集）
2. 实验先导 · 语法课（7 支概念短片）
3. 实验题解（XMUOJ 实验 0–七 · 136 题）
4. **Python 面向对象编程实验（4 个实验 · 讲义 PDF + 题解视频 + 小测 + 编程题）**
5. 期中串讲（5 集）

第 4 节由 `data.json` 的 `oop` 段 + `build_site.py` 里的 `LABS` 列表生成，
每张卡片固定四个入口：实验指导书 PDF / XMUOJ 编程题 / PixelTyper 打字关 / LNT 小测，外加该实验的题解视频。

## 依赖

- `data.json` 里的 B 站数据是从公开接口抓的快照（合集 9361217 讲义 / 9321748 实验题解 / 9461078 期中 / 9600313 面向对象实验）。
  新增视频后需要重抓并更新 `oop.eps`，再跑生成器。
- PDF 由 `13_专业课实验/项目实验/build_guides_pdf.py` 从 markdown 生成（pandoc + Chrome 打印）。
