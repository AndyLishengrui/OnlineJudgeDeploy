#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""把 4 个参考项目的源码切成「可拼接的关卡片段」，输出 oop_snippets.json。

关键约束：同一课时内所有片段按顺序直接拼接，必须与源文件逐字节相同
（这样学生在 PixelTyper 里打完，就等于抄完了整个工程）。
"""
import json
import re
from pathlib import Path

ROOT = Path('/Users/andyshengruilee/Downloads/AI协同工作区/2026Python程序设计/13_专业课实验/项目实验')

PLAN = [
    (12, [('Lab1_图书馆管理系统/参考项目/library.py', 0,
           'library.py', '实验一 图书馆管理系统')]),
    (13, [('Lab2_JSON文件存储/参考项目/country_store.py', 0,
           'country_store.py', '实验二 JSON 文件存储')]),
    (14, [('Lab3_网页数据抓取/参考项目/scraper.py', 0, 'scraper.py', '实验三 网页数据抓取'),
          ('Lab3_网页数据抓取/参考项目/merge.py', 0, 'merge.py', '实验三 网页数据抓取')]),
    (15, [('Lab4_Numpy数据分类/参考项目/label_data.py', 0, 'label_data.py', '实验四 Numpy 数据分类'),
          ('Lab4_Numpy数据分类/参考项目/split_data.py', 0, 'split_data.py', '实验四 Numpy 数据分类'),
          ('Lab4_Numpy数据分类/参考项目/knn.py', 0, 'knn.py', '实验四 Numpy 数据分类'),
          ('Lab4_Numpy数据分类/参考项目/evaluate.py', 0, 'evaluate.py', '实验四 Numpy 数据分类')]),
]

TOP = re.compile(r'^(?:import |from |def |class |@|    def |[A-Z_][A-Z0-9_]*\s*=|[a-z_][a-z0-9_]*\s*=)')


def auto_n(text: str) -> int:
    lines = len([l for l in text.split('\n') if l.strip()])
    return max(3, min(16, round(lines / 14)))


def split_chunks(text: str, n: int):
    """按顶层语句起点选 n-1 个切点，直接切片原文 —— 拼接天然逐字节一致。"""
    lines = text.split('\n')
    if not n:
        n = auto_n(text)
    starts = [i for i, ln in enumerate(lines) if TOP.match(ln)]
    if len(starts) < n:
        n = max(1, len(starts))
    # 在 starts 里均匀取 n 个起点（首段必须从 0 行开始）
    target = len(lines) / n
    idxs, acc, last = [0], 0, 0
    for i in starts[1:]:
        acc += i - last
        last = i
        if acc >= target and len(idxs) < n:
            idxs.append(i)
            acc = 0
    idxs[0] = 0
    idxs = sorted(set(idxs))
    bounds = idxs + [len(lines)]
    chunks = ['\n'.join(lines[bounds[i]:bounds[i + 1]]) for i in range(len(bounds) - 1)]
    # 去掉末段的空尾行，拼接时补回
    return chunks


def first_meaningful(chunk: str) -> str:
    """用片段里的 class/def 名做标题；没有就用「导入与常量」。"""
    names = re.findall(r'^(?:class|def)\s+(\w+)|^    def\s+(\w+)', chunk, re.M)
    names = [a or b for a, b in names]
    if names:
        return '、'.join(names[:2])
    return '导入与常量'


def main():
    out = []
    for lesson, files in PLAN:
        tier = 2
        for rel, n, fname, lab in files:
            text = (ROOT / rel).read_text(encoding='utf-8')
            chunks = split_chunks(text, n)
            if '\n'.join(chunks) != text:
                raise SystemExit(f'× 切分后拼接与源文件不一致: {rel}')
            for i, ch in enumerate(chunks, 1):
                out.append({
                    'lesson': lesson, 'tier': tier,
                    'title': f'{fname} {i}/{len(chunks)} {first_meaningful(ch)[:28]}',
                    'hint': f'{lab} · {fname} 第 {i} 段（打完按顺序拼接即得完整文件）',
                    'code': ch,
                })
                tier = min(5, tier + 1) if i % 2 == 0 else tier
    Path('/tmp/oop_snippets.json').write_text(
        json.dumps(out, ensure_ascii=False, indent=1), encoding='utf-8')
    print(f'{len(out)} 段 → /tmp/oop_snippets.json')
    for x in out[:3]:
        print(' ', x['lesson'], x['title'])


if __name__ == '__main__':
    main()
