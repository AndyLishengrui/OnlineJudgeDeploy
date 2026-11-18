# OOP 实验构建脚本包（2026-11-18）

这四个实验的产物（PixelTyper `data/oopbank.js`、课程站 index.html、LNT 活动）都是这些脚本生成的。
脚本在本地工作区跑，输入是 `2026Python程序设计/13_专业课实验/项目实验/` 下的参考项目源码；
服务器上只需要**产物**（`dist/PixelTyper/data/oopbank.js` 等），但这个包里放了脚本 + 中间产物，
方便纳入仓库、以后复现。

## 文件

| 文件 | 作用 | 用法 |
|---|---|---|
| `make_oop_snippets.py` | 把 4 个参考项目的 `.py` 切成可拼接的关卡片段 → `oop_snippets.json` | `python3 make_oop_snippets.py` |
| **`build_oopbank.py`** | **当前使用**：片段 → 独立题库 `oopbank.js`（4 列 = 4 个章节，一实验一列） | `python3 build_oopbank.py [oop_snippets.json] [oopbank.js]` |
| ~~`build_ooplab_bank.py`~~ | **已废弃**：旧思路是把 OOP 课时合并进 `ptabank.js`（公共课 PTA 题库），位置和归属都错了，仅留作历史参考 | — |
| `oop_snippets.json` | 33 个片段（切分结果，已带断言：拼接 == 源文件） | 中间产物，入库即可 |
| `oopbank.js` | **最终产物**：`window.OOP_MODULES / OOP_LESSONS / OOP_SNIPPETS` | 直接放到 `dist/PixelTyper/data/` |
| `build_guides_pdf.py` | 4 份实验指导书 md → A4 PDF（pandoc + Chrome 打印） | `python3 build_guides_pdf.py` |
| `lnt_labs_setup.py` | 在 LNT 课程 111920 的模块 267768 建 4 份资料 + 1 个作业 | `python3 lnt_labs_setup.py --labs 1,2,3,4` |

## 重要约束

1. **同一课时内片段按顺序拼接，必须与参考项目源文件逐字节相同**
   （`make_oop_snippets.py` 里有断言，4 个课时：217 / 105 / 207 / 318 行）。
2. `oopbank.js` 是**独立题库**，不要混进 `ptabank.js`（那是公共课 PTA 内容）；
   `js/app.js` 里注册为 `BANKS.oop`（tier -7、tag `OOP`），地图上排在「语法题库实战」之后。
   **不要再用 `build_ooplab_bank.py`** —— 那版会把 33 关塞进公共课 PTA 卡，已废弃。
3. 版面：`OOP_MODULES` 是 4 个章节（第 7/8/9/10 章），每个实验的 `mod` 指向自己那一列，
   所以地图上是「一实验一列」的 4 列布局；改版面只需改 `build_oopbank.py` 顶部的 `MODULES`。
4. `lnt_labs_setup.py` 依赖 `pta_to_lnt/lnt_api.py` 和 `~/.lnt_cookie`。
5. **中文自动跳过**：`js/engine.js` 里的 `AUTO_RE` 把中文字符、全角标点、破折号/省略号/中文引号
   标成「不需要敲」——光标自动越过，不计击键、不计准确率、不计 WPM 分子，但计入进度。
   界面里这些字显示为暗色 + 虚下划线。若以后要新增「不要求敲」的字符（如特殊符号），改这一个正则即可。
6. 关卡 id 按**课时内序号**编号（`oop-12-01 … oop-15-11`），深链接 `#oop/<实验>/<第几关>` 才能对上。

## 路径

脚本里的相对路径是本地工作区结构：

```
2026Python程序设计/13_专业课实验/项目实验/
├── Lab1_图书馆管理系统/参考项目/library.py
├── Lab2_JSON文件存储/参考项目/country_store.py
├── Lab3_网页数据抓取/参考项目/{scraper,merge}.py
├── Lab4_Numpy数据分类/参考项目/{label_data,split_data,knn,evaluate}.py
├── dist/                      # 指导书 PDF
└── OJ题库/题解视频/            # 13 支题解视频（已在 B 站 + LNT）
```

服务器上若只要复现 `oopbank.js`，直接用包里的 `oopbank.js` 即可；要重新切分再跑前两个脚本。
