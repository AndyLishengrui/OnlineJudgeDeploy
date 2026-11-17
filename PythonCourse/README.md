# PythonCourse 课程导览页

线上地址：<https://xmuoj.com/PythonCourse/>

## 文件

- `data.json` — B 站合集快照，页面数据的唯一来源
- `build_site.py` — 由 `data.json` 生成 `index.html`
- `index.html` — 生成产物（当前线上版本）
- `assets/` — 页头插图

## 修改与重新生成

```bash
cd PythonCourse
python3 build_site.py     # 覆盖当前目录的 index.html
```

改完后建议先确认产物与线上一致：

```bash
md5sum index.html         # 2026-11-17 线上为 447bb9ac8dc1ffe566d1f7963b4e98aa
```

## 部署

站点是静态页，直接放进 `oj-backend` 容器的 `/app/dist/PythonCourse/`：

```bash
sudo docker cp PythonCourse/. oj-backend:/app/dist/PythonCourse/
```

页面含直达 Python 语法题库（Contest 493）的入口。
