#!/usr/bin/env python3
"""修复 Python 语法题库「实验七 函数」的参考解：统一用 def 定义函数。

- 读取 data/pybank.js（生成物，内部是合法 JSON）
- 用函数式写法替换 16 个原本没有 def 的关卡
- 逐一对比新旧代码在样例输入下的 stdout，必须完全一致
- 写出 data/pybank_override.js（window.PY_CODE_FIXES = {id: code}），
  app.js 合并后覆盖 pybank.js 的 code，避免直接改生成物。
"""
import json
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
PYBANK = os.path.join(HERE, 'pybank.js')
OUT = os.path.join(HERE, 'pybank_override.js')

# ── 16 个原本没有 def 的关卡，全部改成函数式写法 ──────────────
FIXES = {
    'pyq-7-01': '''def fact(n):
    r = 1
    for i in range(2, n + 1):
        r *= i
    return r

n = int(input())
print(fact(n))''',

    'pyq-7-02': '''def max2(x, y):
    if x > y:
        return x
    return y

x, y = map(int, input().split())
print(max2(x, y))''',

    'pyq-7-03': '''def gcd(a, b):
    while b:
        a, b = b, a % b
    return a

a, b = map(int, input().split())
print(gcd(a, b))''',

    'pyq-7-04': '''def swap(a, b):
    return b, a

a, b = map(int, input().split())
a, b = swap(a, b)
print(a, b)''',

    'pyq-7-05': '''import sys

def print_nums(arr, size):
    print(' '.join(map(str, arr[:size])))

data = sys.stdin.read().split()
n, size = int(data[0]), int(data[1])
arr = list(map(int, data[2:2 + n]))
print_nums(arr, size)''',

    'pyq-7-06': '''def print_matrix(rows):
    for row in rows:
        print(' '.join(row.split()))

r, c = map(int, input().split())
print_matrix([input() for _ in range(r)])''',

    'pyq-7-09': '''def absval(x):
    return x if x >= 0 else -x

x = int(input())
print(absval(x))''',

    'pyq-7-10': '''def add(a, b):
    return a + b

a = float(input())
b = float(input())
print(f"{add(a, b):.2f}")''',

    'pyq-7-11': '''def range_sum(l, r):
    return sum(range(l, r + 1))

l, r = map(int, input().split())
print(range_sum(l, r))''',

    'pyq-7-12': '''import math

def lcm(a, b):
    return a * b // math.gcd(a, b)

a, b = map(int, input().split())
print(lcm(a, b))''',

    'pyq-7-13': '''def copy_part(a, b, size):
    b[:size] = a[:size]
    return b

n, m, size = map(int, input().split())
a = list(map(int, input().split()))
b = list(map(int, input().split()))
print(' '.join(map(str, copy_part(a, b, size))))''',

    'pyq-7-14': '''def print_chars(s):
    for c in s:
        print(c)

print_chars(input().strip())''',

    'pyq-7-15': '''def reverse_part(a, size):
    a[:size] = reversed(a[:size])
    return a

n, size = map(int, input().split())
a = list(map(int, input().split()))
print(' '.join(map(str, reverse_part(a, size))))''',

    'pyq-7-16': '''import sys

def unique(a):
    seen = set()
    res = []
    for x in a:
        if x not in seen:
            seen.add(x)
            res.append(x)
    return res

data = sys.stdin.read().split()
n = int(data[0])
print(' '.join(unique(data[1:1 + n])))''',

    'pyq-7-17': '''import sys

def sort_part(a, l, r):
    a[l:r + 1] = sorted(a[l:r + 1])
    return a

data = sys.stdin.read().split()
n, l, r = int(data[0]), int(data[1]), int(data[2])
a = list(map(int, data[3:3 + n]))
print(' '.join(map(str, sort_part(a, l, r))))''',

    'pyq-7-20': '''from itertools import permutations

def show_permutations(n):
    for p in permutations(range(1, n + 1)):
        print(' '.join(map(str, p)))

show_permutations(int(input()))''',
}

SAMPLES = {
    'pyq-7-01': '5\n',
    'pyq-7-02': '3 7\n',
    'pyq-7-03': '12 18\n',
    'pyq-7-04': '3 5\n',
    'pyq-7-05': '5 3\n1 2 3 4 5\n',
    'pyq-7-06': '2 3\n1 2 3\n4 5 6\n',
    'pyq-7-07': '5\n',
    'pyq-7-08': '6\n',
    'pyq-7-09': '-5\n',
    'pyq-7-10': '1.5\n2.25\n',
    'pyq-7-11': '1 10\n',
    'pyq-7-12': '6 8\n',
    'pyq-7-13': '5 3 2\n1 2 3 4 5\n9 9 9\n',
    'pyq-7-14': 'abc\n',
    'pyq-7-15': '5 3\n1 2 3 4 5\n',
    'pyq-7-16': '5\n1 2 1 3 2\n',
    'pyq-7-17': '5 1 3\n5 4 3 2 1\n',
    'pyq-7-18': '5\n',
    'pyq-7-19': '3 4\n',
    'pyq-7-20': '2\n',
}


def load_pybank():
    src = open(PYBANK, encoding='utf-8').read()
    anchor = src.index('window.PY_SNIPPETS')
    body = src[src.index('[', anchor):src.rindex(']') + 1]
    return json.loads(body)


def run(code, inp):
    r = subprocess.run([sys.executable, '-c', code], input=inp,
                       stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                       universal_newlines=True, timeout=10)
    if r.returncode != 0:
        raise RuntimeError(r.stderr)
    return r.stdout


def main():
    data = load_pybank()
    lesson7 = [s for s in data if s['lesson'] == 7]
    assert len(lesson7) == 20, len(lesson7)
    by_id = {s['id']: s for s in lesson7}

    bad = 0
    for sid, new in FIXES.items():
        assert sid in by_id, 'missing ' + sid
        old = by_id[sid]['code']
        out_old = run(old, SAMPLES[sid])
        out_new = run(new, SAMPLES[sid])
        same = out_old == out_new
        nlines = new.count('\n') + 1
        wide = max(len(x) for x in new.split('\n'))
        ok = same and nlines <= 25 and wide <= 170 and all(ord(c) < 128 for c in new)
        print('%s %s old=%r new=%r %dL/%dc' % (
            'OK ' if ok else 'BAD', sid, out_old, out_new, nlines, wide))
        if not ok:
            bad += 1

    # 全部 20 关都必须含 def
    merged = [(sid, FIXES.get(sid, by_id[sid]['code'])) for sid in by_id]
    no_def = [sid for sid, code in merged if 'def ' not in code]
    print('\nlesson7 total=%d, with def=%d, without def=%s' % (
        len(merged), len(merged) - len(no_def), no_def or '无'))
    if no_def or bad:
        sys.exit('FAILED: %d 个输出不一致，%d 个缺 def' % (bad, len(no_def)))

    # 写出覆盖文件
    head = ('/* 2026-11-04 手工修复，勿删 —— 源: data/build_pyfunc_override.py\n'
            '   Python 语法题库「实验七 函数」：原参考解有 16 关没有定义函数，\n'
            '   这里按 id 覆盖 code；其余字段仍用 data/pybank.js。\n'
            '   app.js 的 pyLanes() 负责合并，index.html 在 pybank.js 之后加载本文件。 */\n')
    body = 'window.PY_CODE_FIXES = ' + json.dumps(FIXES, ensure_ascii=False, indent=1) + ';\n'
    open(OUT, 'w', encoding='utf-8').write(head + body)
    print('\n写出 %s（%d 关）' % (OUT, len(FIXES)))


if __name__ == '__main__':
    main()
