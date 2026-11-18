#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""把「Python 面向对象编程实验」的参考代码追加进 PixelTyper 的 PTA 关卡库。

用法: python3 build_ooplab_bank.py <现有 ptabank.js> <输出 ptabank.js>

新增：1 个模块「面向对象与工程实验」+ 4 个课时（实验一~四），共 32 关。
每一关都是参考项目里可直接拼接的代码段，按顺序打完即还原完整工程。
"""
import json
import re
import sys
from pathlib import Path

MODULE = "面向对象与工程实验"

LESSONS = [
    dict(no=12, label="OOP1", title="实验一 图书馆管理系统", src="6 段 · 6 关"),
    dict(no=13, label="OOP2", title="实验二 JSON 文件存储", src="6 段 · 6 关"),
    dict(no=14, label="OOP3", title="实验三 网页数据抓取", src="6 段 · 6 关"),
    dict(no=15, label="OOP4", title="实验四 Numpy 数据分类", src="7 段 · 7 关"),
]

# (lesson, tier, 标题, 提示, 代码)
SNIPPETS = json.loads((Path(__file__).resolve().parent / 'oop_snippets.json')
                       .read_text(encoding='utf-8'))


def main():
    src, dst = sys.argv[1], sys.argv[2]
    s = open(src, encoding='utf-8').read()

    mods = json.loads(re.search(r'window\.PTAB_MODULES = (\[.*?\]);', s, re.S).group(1))
    lessons = json.loads(re.search(r'window\.PTAB_LESSONS = (\[.*?\]);', s, re.S).group(1))
    snips = json.loads(re.search(r'window\.PTAB_SNIPPETS = (\[.*?\]);', s, re.S).group(1))

    if MODULE in mods:
        mod_idx = mods.index(MODULE)
        lessons = [l for l in lessons if l['label'] not in ('OOP1', 'OOP2', 'OOP3', 'OOP4')]
        snips = [x for x in snips if not x['id'].startswith('oop-')]
    else:
        mods.append(MODULE)
        mod_idx = len(mods) - 1

    for L in LESSONS:
        n = sum(1 for x in SNIPPETS if x['lesson'] == L['no'])
        files = len({x['title'].split(' ')[0] for x in SNIPPETS if x['lesson'] == L['no']})
        lessons.append({'no': L['no'], 'mod': mod_idx, 'label': L['label'],
                        'title': L['title'], 'src': f'{files} 个文件 · {n} 关', 'p': n, 'n': n})

    for i, item in enumerate(SNIPPETS, 1):
        snips.append({'id': f"oop-{item['lesson']}-{i:02d}", 'lesson': item['lesson'],
                      'tier': item['tier'], 'title': item['title'],
                      'hint': item['hint'], 'alt': False, 'code': item['code']})

    # 注意：re.sub 的替换串会把 \n 当转义，必须用函数替换，否则代码里的换行会变成真换行
    out = re.sub(r'window\.PTAB_MODULES = \[.*?\];',
                 lambda m: 'window.PTAB_MODULES = ' + json.dumps(mods, ensure_ascii=False) + ';',
                 s, flags=re.S)
    out = re.sub(r'window\.PTAB_LESSONS = \[.*?\];',
                 lambda m: 'window.PTAB_LESSONS = ' + json.dumps(lessons, ensure_ascii=False, indent=1) + ';',
                 out, flags=re.S)
    out = re.sub(r'window\.PTAB_SNIPPETS = \[.*?\];',
                 lambda m: 'window.PTAB_SNIPPETS = ' + json.dumps(snips, ensure_ascii=False, indent=1) + ';',
                 out, flags=re.S)
    open(dst, 'w', encoding='utf-8').write(out)
    print(f'modules={len(mods)} lessons={len(lessons)} snippets={len(snips)} → {dst}')


if __name__ == '__main__':
    main()
