/* 2026-11-04 手工修复，勿删 —— 源: data/build_pyfunc_override.py
   Python 语法题库「实验七 函数」：原参考解有 16 关没有定义函数，
   这里按 id 覆盖 code；其余字段仍用 data/pybank.js。
   app.js 的 pyLanes() 负责合并，index.html 在 pybank.js 之后加载本文件。 */
window.PY_CODE_FIXES = {
 "pyq-7-01": "def fact(n):\n    r = 1\n    for i in range(2, n + 1):\n        r *= i\n    return r\n\nn = int(input())\nprint(fact(n))",
 "pyq-7-02": "def max2(x, y):\n    if x > y:\n        return x\n    return y\n\nx, y = map(int, input().split())\nprint(max2(x, y))",
 "pyq-7-03": "def gcd(a, b):\n    while b:\n        a, b = b, a % b\n    return a\n\na, b = map(int, input().split())\nprint(gcd(a, b))",
 "pyq-7-04": "def swap(a, b):\n    return b, a\n\na, b = map(int, input().split())\na, b = swap(a, b)\nprint(a, b)",
 "pyq-7-05": "import sys\n\ndef print_nums(arr, size):\n    print(' '.join(map(str, arr[:size])))\n\ndata = sys.stdin.read().split()\nn, size = int(data[0]), int(data[1])\narr = list(map(int, data[2:2 + n]))\nprint_nums(arr, size)",
 "pyq-7-06": "def print_matrix(rows):\n    for row in rows:\n        print(' '.join(row.split()))\n\nr, c = map(int, input().split())\nprint_matrix([input() for _ in range(r)])",
 "pyq-7-09": "def absval(x):\n    return x if x >= 0 else -x\n\nx = int(input())\nprint(absval(x))",
 "pyq-7-10": "def add(a, b):\n    return a + b\n\na = float(input())\nb = float(input())\nprint(f\"{add(a, b):.2f}\")",
 "pyq-7-11": "def range_sum(l, r):\n    return sum(range(l, r + 1))\n\nl, r = map(int, input().split())\nprint(range_sum(l, r))",
 "pyq-7-12": "import math\n\ndef lcm(a, b):\n    return a * b // math.gcd(a, b)\n\na, b = map(int, input().split())\nprint(lcm(a, b))",
 "pyq-7-13": "def copy_part(a, b, size):\n    b[:size] = a[:size]\n    return b\n\nn, m, size = map(int, input().split())\na = list(map(int, input().split()))\nb = list(map(int, input().split()))\nprint(' '.join(map(str, copy_part(a, b, size))))",
 "pyq-7-14": "def print_chars(s):\n    for c in s:\n        print(c)\n\nprint_chars(input().strip())",
 "pyq-7-15": "def reverse_part(a, size):\n    a[:size] = reversed(a[:size])\n    return a\n\nn, size = map(int, input().split())\na = list(map(int, input().split()))\nprint(' '.join(map(str, reverse_part(a, size))))",
 "pyq-7-16": "import sys\n\ndef unique(a):\n    seen = set()\n    res = []\n    for x in a:\n        if x not in seen:\n            seen.add(x)\n            res.append(x)\n    return res\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nprint(' '.join(unique(data[1:1 + n])))",
 "pyq-7-17": "import sys\n\ndef sort_part(a, l, r):\n    a[l:r + 1] = sorted(a[l:r + 1])\n    return a\n\ndata = sys.stdin.read().split()\nn, l, r = int(data[0]), int(data[1]), int(data[2])\na = list(map(int, data[3:3 + n]))\nprint(' '.join(map(str, sort_part(a, l, r))))",
 "pyq-7-20": "from itertools import permutations\n\ndef show_permutations(n):\n    for p in permutations(range(1, n + 1)):\n        print(' '.join(map(str, p)))\n\nshow_permutations(int(input()))"
};
