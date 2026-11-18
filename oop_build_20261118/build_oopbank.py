#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""生成 PixelTyper 的独立题库 data/oopbank.js（Python 面向对象编程实验）。

用法: python3 build_oopbank.py [oop_snippets.json] [oopbank.js]

版面约定：4 个模块 = 4 个实验各占一列（列头写对应章节，行写实验名），
所以在 OOP_MODULES 里放章节名，每课的 mod 指向自己那一列。
"""
import json
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent

# 4 列：列头 = 章节，行 = 实验
MODULES = ['第 7 章 类', '第 8 章 文件和异常', '第 9 章 网络爬虫', '第 10 章 Numpy']
LESSONS = [
    dict(no=12, mod=0, label='实验一', title='图书馆管理系统', src='library.py'),
    dict(no=13, mod=1, label='实验二', title='JSON 文件存储', src='country_store.py'),
    dict(no=14, mod=2, label='实验三', title='网页数据抓取', src='scraper.py + merge.py'),
    dict(no=15, mod=3, label='实验四', title='Numpy 数据分类', src='label/split/knn/evaluate'),
]

HEADER = """/* Python 面向对象编程实验（专业课）—— 4 个实验 / 33 关
   代码取自 13_专业课实验/项目实验 的参考项目；
   同一实验内按顺序拼接 = 完整源文件（library.py 217 行 / country_store.py 105 行 /
   scraper.py+merge.py 207 行 / 四件套 318 行）。
   版面：4 个模块 = 4 列（列头写章节），每课一个实验。
   生成：build_oopbank.py（源 oop_snippets.json） */
"""


def main():
    src = Path(sys.argv[1]) if len(sys.argv) > 1 else HERE / 'oop_snippets.json'
    dst = Path(sys.argv[2]) if len(sys.argv) > 2 else HERE / 'oopbank.js'
    snips = json.loads(src.read_text(encoding='utf-8'))

    lessons = []
    for L in LESSONS:
        part = [s for s in snips if s['lesson'] == L['no']]
        files = len({s['title'].split(' ')[0] for s in part})
        lessons.append({**L, 'p': files, 'n': len(part)})

    # 关卡 id 按「课时内序号」编号（oop-12-01 … oop-15-11），
    # 这样深链接 #oop/<实验>/<第几关> 才能对上（沿用 pyq/cppq 的约定）
    lanes, counters = [], {}
    for s in snips:
        counters[s['lesson']] = counters.get(s['lesson'], 0) + 1
        lanes.append({'id': f"oop-{s['lesson']}-{counters[s['lesson']]:02d}", 'lesson': s['lesson'],
                      'tier': s['tier'], 'title': s['title'], 'hint': s['hint'],
                      'alt': False, 'code': s['code']})

    js = (HEADER
          + 'window.OOP_MODULES = ' + json.dumps(MODULES, ensure_ascii=False) + ';\n'
          + 'window.OOP_LESSONS = ' + json.dumps(lessons, ensure_ascii=False, indent=1) + ';\n'
          + 'window.OOP_SNIPPETS = ' + json.dumps(lanes, ensure_ascii=False, indent=1) + ';\n')
    dst.write_text(js, encoding='utf-8')
    print(f'{len(MODULES)} 列 / {len(lessons)} 课 / {len(lanes)} 关 → {dst} ({len(js)} 字节)')


if __name__ == '__main__':
    main()
