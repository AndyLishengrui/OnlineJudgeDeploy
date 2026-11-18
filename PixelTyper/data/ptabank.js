/* 自动生成，勿手改 —— 源: data/build_ptabank.py
   源题：OJ Contest 483「公共课 PTA 题库」；代码取自每题「📖 参考题解」页，
   同题「参考代码」与「另一种写法」各占一关（与 pybank.js 口径一致）。 */
window.PTAB_MODULES = ["基础与顺序结构", "列表与字符串", "选择与循环", "字典与查询"];
window.PTAB_LESSONS = [
 {
  "no": 1,
  "mod": 0,
  "label": "PTA1",
  "title": "Python 基础语法与简单程序练习",
  "src": "8 题 · 16 关",
  "p": 8,
  "n": 16
 },
 {
  "no": 2,
  "mod": 0,
  "label": "PTA2",
  "title": "顺序结构编程",
  "src": "3 题 · 6 关",
  "p": 3,
  "n": 6
 },
 {
  "no": 3,
  "mod": 1,
  "label": "PTA3",
  "title": "列表、字符串练习",
  "src": "10 题 · 20 关",
  "p": 10,
  "n": 20
 },
 {
  "no": 4,
  "mod": 2,
  "label": "PTA4",
  "title": "format、选择结构",
  "src": "10 题 · 20 关",
  "p": 10,
  "n": 20
 },
 {
  "no": 6,
  "mod": 2,
  "label": "PTA6",
  "title": "循环练习",
  "src": "10 题 · 20 关",
  "p": 10,
  "n": 20
 },
 {
  "no": 7,
  "mod": 2,
  "label": "PTA7",
  "title": "循环练习2",
  "src": "10 题 · 20 关",
  "p": 10,
  "n": 20
 },
 {
  "no": 8,
  "mod": 2,
  "label": "PTA8",
  "title": "循环练习3",
  "src": "12 题 · 24 关",
  "p": 12,
  "n": 24
 },
 {
  "no": 10,
  "mod": 3,
  "label": "PTA10",
  "title": "字典1",
  "src": "9 题 · 18 关",
  "p": 9,
  "n": 18
 },
 {
  "no": 11,
  "mod": 1,
  "label": "PTA11",
  "title": "字符串和列表的高级应用",
  "src": "10 题 · 20 关",
  "p": 10,
  "n": 20
 }
];
window.PTAB_SNIPPETS = [
 {
  "id": "pta-1-01",
  "lesson": 1,
  "tier": 5,
  "title": "PTA1.1 求2数的积",
  "hint": "参考代码",
  "alt": false,
  "code": "a = int(input())\nb = int(input())\nprint(a * b)"
 },
 {
  "id": "pta-1-01b",
  "lesson": 1,
  "tier": 5,
  "title": "PTA1.1 求2数的积",
  "hint": "另一种写法",
  "alt": true,
  "code": "import sys\nfrom functools import reduce\nfrom operator import mul\n\nnums = [int(t) for t in sys.stdin.read().split()]\nprint(reduce(mul, nums))"
 },
 {
  "id": "pta-1-02",
  "lesson": 1,
  "tier": 5,
  "title": "PTA1.2 计算三角形面积",
  "hint": "参考代码",
  "alt": false,
  "code": "import math\na = int(input())\nb = int(input())\nc = int(input())\np = (a + b + c) / 2.0\ns = math.sqrt(p * (p - a) * (p - b) * (p - c))\nprint(s)"
 },
 {
  "id": "pta-1-02b",
  "lesson": 1,
  "tier": 5,
  "title": "PTA1.2 计算三角形面积",
  "hint": "另一种写法",
  "alt": true,
  "code": "import math\nimport sys\nfrom functools import reduce\nfrom operator import mul\n\na, b, c = (int(t) for t in sys.stdin.read().split())\np = sum([a, b, c]) / 2.0\ns = math.sqrt(reduce(mul, [p, p - a, p - b, p - c]))\nprint(s)"
 },
 {
  "id": "pta-1-03",
  "lesson": 1,
  "tier": 5,
  "title": "PTA1.3 输出姓名",
  "hint": "参考代码",
  "alt": false,
  "code": "s1 = input()\ns2 = input()\nprint(s1 + \" \" + s2)"
 },
 {
  "id": "pta-1-03b",
  "lesson": 1,
  "tier": 5,
  "title": "PTA1.3 输出姓名",
  "hint": "另一种写法",
  "alt": true,
  "code": "first_name = input()\nfamily_name = input()\nprint(first_name, family_name)"
 },
 {
  "id": "pta-1-04",
  "lesson": 1,
  "tier": 5,
  "title": "PTA1.4 输出英文时间",
  "hint": "参考代码",
  "alt": false,
  "code": "month = input()\nprint(month + \". 1st\")"
 },
 {
  "id": "pta-1-04b",
  "lesson": 1,
  "tier": 5,
  "title": "PTA1.4 输出英文时间",
  "hint": "另一种写法",
  "alt": true,
  "code": "month = input()\nprint(month, \"1st\", sep=\". \")"
 },
 {
  "id": "pta-1-05",
  "lesson": 1,
  "tier": 5,
  "title": "PTA1.5 身份证号码是否18位",
  "hint": "参考代码",
  "alt": false,
  "code": "id_card = input()\nprint(len(id_card) == 18)"
 },
 {
  "id": "pta-1-05b",
  "lesson": 1,
  "tier": 5,
  "title": "PTA1.5 身份证号码是否18位",
  "hint": "另一种写法",
  "alt": true,
  "code": "card = input()\ncount = 0\nfor _ in card:\n    count += 1\nprint(\"True\" if count == 18 else \"False\")"
 },
 {
  "id": "pta-1-06",
  "lesson": 1,
  "tier": 5,
  "title": "PTA1.6 求个位、十位、百位、千位和万位数",
  "hint": "参考代码",
  "alt": false,
  "code": "n = int(input())\n\nwan  = n // 10000\nqian = n // 1000 % 10\nbai  = n // 100 % 10\nshi  = n // 10 % 10\nge   = n % 10\n\nprint(wan, qian, bai, shi, ge)"
 },
 {
  "id": "pta-1-06b",
  "lesson": 1,
  "tier": 5,
  "title": "PTA1.6 求个位、十位、百位、千位和万位数",
  "hint": "另一种写法",
  "alt": true,
  "code": "n = int(input())\ndigits = []\nfor _ in range(5):\n    digits.append(n % 10)\n    n //= 10\nprint(*reversed(digits))"
 },
 {
  "id": "pta-1-07",
  "lesson": 1,
  "tier": 5,
  "title": "PTA1.7 求2个数的较大者及其平方根",
  "hint": "参考代码",
  "alt": false,
  "code": "import math\na = int(input())\nb = int(input())\nbigger = (a + b + abs(a - b)) // 2\nprint(bigger)\nprint(bigger ** 0.5)"
 },
 {
  "id": "pta-1-07b",
  "lesson": 1,
  "tier": 5,
  "title": "PTA1.7 求2个数的较大者及其平方根",
  "hint": "另一种写法",
  "alt": true,
  "code": "import math\nimport sys\n\na, b = (int(t) for t in sys.stdin.read().split())\nbigger = a if a >= b else b\nprint(bigger)\nprint(math.sqrt(bigger))"
 },
 {
  "id": "pta-1-08",
  "lesson": 1,
  "tier": 5,
  "title": "PTA1.8 四则运算（+ - * / // %）使用eval",
  "hint": "参考代码",
  "alt": false,
  "code": "expr = input()\nprint(eval(expr))"
 },
 {
  "id": "pta-1-08b",
  "lesson": 1,
  "tier": 5,
  "title": "PTA1.8 四则运算（+ - * / // %）使用eval",
  "hint": "另一种写法",
  "alt": true,
  "code": "left, op, right = input().split()\na, b = int(left), int(right)\nif op == \"+\":\n    result = a + b\nelif op == \"-\":\n    result = a - b\nelif op == \"*\":\n    result = a * b\nelif op == \"/\":\n    result = a / b\nelif op == \"//\":\n    result = a // b\nelse:\n    result = a % b\nprint(result)"
 },
 {
  "id": "pta-2-01",
  "lesson": 2,
  "tier": 5,
  "title": "PTA2.1 求 b²-4ac 的值",
  "hint": "参考代码",
  "alt": false,
  "code": "a, b, c = map(int, input().split())\nprint(b * b - 4 * a * c)"
 },
 {
  "id": "pta-2-01b",
  "lesson": 2,
  "tier": 5,
  "title": "PTA2.1 求 b²-4ac 的值",
  "hint": "另一种写法",
  "alt": true,
  "code": "import sys\n\na, b, c = [int(x) for x in sys.stdin.read().split()]\nprint(pow(b, 2) - 4 * a * c)"
 },
 {
  "id": "pta-2-02",
  "lesson": 2,
  "tier": 5,
  "title": "PTA2.2 输出出生日期",
  "hint": "参考代码 · 中文字符串已译成英文（打字练习版，OJ 提交请用原题解）",
  "alt": false,
  "code": "year, month, day = input().split(\",\")\nprint(f\"Birth date is {year}-{month}-{day}\")"
 },
 {
  "id": "pta-2-02b",
  "lesson": 2,
  "tier": 5,
  "title": "PTA2.2 输出出生日期",
  "hint": "另一种写法 · 中文字符串已译成英文（打字练习版，OJ 提交请用原题解）",
  "alt": true,
  "code": "y, m, d = input().split(\",\")\nprint(\"Birth date is {}-{}-{}\".format(y, m, d))"
 },
 {
  "id": "pta-2-03",
  "lesson": 2,
  "tier": 5,
  "title": "PTA2.3 产生 B 个 A 组成的数字",
  "hint": "参考代码",
  "alt": false,
  "code": "a, b = input().split(',')\na = a.strip()\nb = int(b.strip())\nprint(a * b)"
 },
 {
  "id": "pta-2-03b",
  "lesson": 2,
  "tier": 5,
  "title": "PTA2.3 产生 B 个 A 组成的数字",
  "hint": "另一种写法",
  "alt": true,
  "code": "a, b = (t.strip() for t in input().split(\",\"))\nprint(int(a) * (10 ** int(b) - 1) // 9)"
 },
 {
  "id": "pta-3-01",
  "lesson": 3,
  "tier": 5,
  "title": "PTA3.1 回文诗",
  "hint": "参考代码",
  "alt": false,
  "code": "s = input()\n\nprint(s[::-1])"
 },
 {
  "id": "pta-3-01b",
  "lesson": 3,
  "tier": 5,
  "title": "PTA3.1 回文诗",
  "hint": "另一种写法",
  "alt": true,
  "code": "print(\"\".join(reversed(input())))"
 },
 {
  "id": "pta-3-02",
  "lesson": 3,
  "tier": 5,
  "title": "PTA3.2 学号解析",
  "hint": "参考代码",
  "alt": false,
  "code": "sid = input()\ny = sid[0:4]\nd = sid[4:6]\nc = sid[6:8]\nprint(f\"year:{y}\")\nprint(f\"department:{d}\")\nprint(f\"class:{c}\")"
 },
 {
  "id": "pta-3-02b",
  "lesson": 3,
  "tier": 5,
  "title": "PTA3.2 学号解析",
  "hint": "另一种写法",
  "alt": true,
  "code": "sid = input()\nfor label, start, end in [(\"year\", 0, 4), (\"department\", 4, 6), (\"class\", 6, 8)]:\n    print(\"{}:{}\".format(label, sid[start:end]))"
 },
 {
  "id": "pta-3-03",
  "lesson": 3,
  "tier": 5,
  "title": "PTA3.3 平均值、最大值、最小值",
  "hint": "参考代码",
  "alt": false,
  "code": "nums = list(map(int, input().split()))\navg = sum(nums) // len(nums)\nprint(avg, max(nums), min(nums))"
 },
 {
  "id": "pta-3-03b",
  "lesson": 3,
  "tier": 5,
  "title": "PTA3.3 平均值、最大值、最小值",
  "hint": "另一种写法",
  "alt": true,
  "code": "import sys\n\nnums = sorted(int(x) for x in sys.stdin.read().split())\nprint(sum(nums) // len(nums), nums[-1], nums[0])"
 },
 {
  "id": "pta-3-04",
  "lesson": 3,
  "tier": 5,
  "title": "PTA3.4 输出前 k 个字符串",
  "hint": "参考代码",
  "alt": false,
  "code": "data = input().split()\nk = int(data[0])\nprint(*data[1:k+1])"
 },
 {
  "id": "pta-3-04b",
  "lesson": 3,
  "tier": 5,
  "title": "PTA3.4 输出前 k 个字符串",
  "hint": "另一种写法",
  "alt": true,
  "code": "data = input().split()\nk = int(data[0])\nprint(\" \".join(data[1:k + 1]))"
 },
 {
  "id": "pta-3-05",
  "lesson": 3,
  "tier": 5,
  "title": "PTA3.5 位数与各位数字之和",
  "hint": "参考代码",
  "alt": false,
  "code": "n = input()\ntotal = 0\nfor ch in n:\n    total += int(ch)\nprint(len(n), total)"
 },
 {
  "id": "pta-3-05b",
  "lesson": 3,
  "tier": 5,
  "title": "PTA3.5 位数与各位数字之和",
  "hint": "另一种写法",
  "alt": true,
  "code": "n = input()\nprint(len(n), sum(map(int, n)))"
 },
 {
  "id": "pta-3-06",
  "lesson": 3,
  "tier": 5,
  "title": "PTA3.6 循环左移 N 次",
  "hint": "参考代码",
  "alt": false,
  "code": "s = input()\nn = int(input())\nn = n % len(s)\nprint(s[n:] + s[:n])"
 },
 {
  "id": "pta-3-06b",
  "lesson": 3,
  "tier": 5,
  "title": "PTA3.6 循环左移 N 次",
  "hint": "另一种写法",
  "alt": true,
  "code": "s = input()\nn = int(input()) % len(s)\nprint((s + s)[n:n + len(s)])"
 },
 {
  "id": "pta-3-07",
  "lesson": 3,
  "tier": 5,
  "title": "PTA3.7 计算是2024年的第几天",
  "hint": "参考代码",
  "alt": false,
  "code": "month, day = map(int, input().split())\n\ndays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]\nprint(sum(days[:month-1]) + day)"
 },
 {
  "id": "pta-3-07b",
  "lesson": 3,
  "tier": 5,
  "title": "PTA3.7 计算是2024年的第几天",
  "hint": "另一种写法",
  "alt": true,
  "code": "import calendar\n\nmonth, day = map(int, input().split())\nprint(sum(calendar.monthrange(2024, m)[1] for m in range(1, month)) + day)"
 },
 {
  "id": "pta-3-08",
  "lesson": 3,
  "tier": 5,
  "title": "PTA3.8 可重组相等(字母异位词)",
  "hint": "参考代码",
  "alt": false,
  "code": "s1, s2 = input().split()\nprint(sorted(s1) == sorted(s2))"
 },
 {
  "id": "pta-3-08b",
  "lesson": 3,
  "tier": 5,
  "title": "PTA3.8 可重组相等(字母异位词)",
  "hint": "另一种写法",
  "alt": true,
  "code": "from collections import Counter\n\ns1, s2 = input().split()\nprint(Counter(s1) == Counter(s2))"
 },
 {
  "id": "pta-3-09",
  "lesson": 3,
  "tier": 5,
  "title": "PTA3.9 奇偶下标拆分重组",
  "hint": "参考代码",
  "alt": false,
  "code": "s = input()\na = s[0::2]\nb = s[1::2]\nprint(a)\nprint(b)\nprint(a + b)"
 },
 {
  "id": "pta-3-09b",
  "lesson": 3,
  "tier": 5,
  "title": "PTA3.9 奇偶下标拆分重组",
  "hint": "另一种写法",
  "alt": true,
  "code": "s = input()\na = \"\".join(ch for i, ch in enumerate(s) if i % 2 == 0)\nb = \"\".join(ch for i, ch in enumerate(s) if i % 2 == 1)\nprint(a)\nprint(b)\nprint(a + b)"
 },
 {
  "id": "pta-3-10",
  "lesson": 3,
  "tier": 5,
  "title": "PTA3.10 歌手打分(去2个最高、2个最低)",
  "hint": "参考代码",
  "alt": false,
  "code": "n = int(input())\nscores = list(map(float, input().split()))\n\nscores.sort()\nvalid = scores[2:-2]\navg = sum(valid) / len(valid)\n\nprint(f\"aver={avg:.2f}\")"
 },
 {
  "id": "pta-3-10b",
  "lesson": 3,
  "tier": 5,
  "title": "PTA3.10 歌手打分(去2个最高、2个最低)",
  "hint": "另一种写法",
  "alt": true,
  "code": "n = int(input())\nscores = list(map(float, input().split()))\n\nwork = scores[:]\nfor _ in range(2):\n    work.remove(max(work))\n    work.remove(min(work))\n\navg = sum(work) / len(work)\nprint(\"aver={:.2f}\".format(avg))"
 },
 {
  "id": "pta-4-01",
  "lesson": 4,
  "tier": 5,
  "title": "PTA4.1 时间换算(用 format 控制输出)",
  "hint": "参考代码",
  "alt": false,
  "code": "h, m, s = map(int, input().split(':'))\ntotal = h * 3600 + m * 60 + s\nprint(total)\n\nsec = int(input())\nhour   = sec // 3600\nminute = sec % 3600 // 60\nsecond = sec % 60\nprint(f\"{hour:02d}:{minute:02d}:{second:02d}\")"
 },
 {
  "id": "pta-4-01b",
  "lesson": 4,
  "tier": 5,
  "title": "PTA4.1 时间换算(用 format 控制输出)",
  "hint": "另一种写法",
  "alt": true,
  "code": "h, m, s = map(int, input().split(':'))\n\ntotal = 0\nfor value, weight in ((h, 3600), (m, 60), (s, 1)):\n    total += value * weight\nprint(total)\n\nsec = int(input())\nhour, rest = divmod(sec, 3600)\nminute, second = divmod(rest, 60)\nprint(\"{}:{}:{}\".format(str(hour).zfill(2), str(minute).zfill(2), str(second).zfill(2)))"
 },
 {
  "id": "pta-4-02",
  "lesson": 4,
  "tier": 5,
  "title": "PTA4.2 三角形面积与周长(用 format 控制输出)",
  "hint": "参考代码",
  "alt": false,
  "code": "import math\na = int(input()); b = int(input()); c = int(input())\ns = (a + b + c) / 2\narea = math.sqrt(s * (s - a) * (s - b) * (s - c))\nperimeter = a + b + c\nprint(f\"area={area:.2f};perimeter={perimeter:.2f}\")"
 },
 {
  "id": "pta-4-02b",
  "lesson": 4,
  "tier": 5,
  "title": "PTA4.2 三角形面积与周长(用 format 控制输出)",
  "hint": "另一种写法",
  "alt": true,
  "code": "import math\na = int(input())\nb = int(input())\nc = int(input())\n\np16 = (a + b + c) * (-a + b + c) * (a - b + c) * (a + b - c)\narea = math.sqrt(p16) / 4\nperimeter = sum([a, b, c])\nprint(\"area={};perimeter={}\".format(format(area, \".2f\"), format(perimeter, \".2f\")))"
 },
 {
  "id": "pta-4-03",
  "lesson": 4,
  "tier": 5,
  "title": "PTA4.3 圆的面积(用 format 控制输出)",
  "hint": "参考代码",
  "alt": false,
  "code": "import math\nr = float(input())\narea = math.pi * r ** 2\nprint(f\"{area:.2f}\")"
 },
 {
  "id": "pta-4-03b",
  "lesson": 4,
  "tier": 5,
  "title": "PTA4.3 圆的面积(用 format 控制输出)",
  "hint": "另一种写法",
  "alt": true,
  "code": "import math\nr = float(input())\nprint(\"{:.2f}\".format(math.pow(r, 2) * math.pi))"
 },
 {
  "id": "pta-4-04",
  "lesson": 4,
  "tier": 5,
  "title": "PTA4.4 奇偶判断",
  "hint": "参考代码 · 中文字符串已译成英文（打字练习版，OJ 提交请用原题解）",
  "alt": false,
  "code": "n = int(input())\nif n % 2 == 0:\n    print(\"The number is even\")\nelse:\n    print(\"The number is odd\")"
 },
 {
  "id": "pta-4-04b",
  "lesson": 4,
  "tier": 5,
  "title": "PTA4.4 奇偶判断",
  "hint": "另一种写法 · 中文字符串已译成英文（打字练习版，OJ 提交请用原题解）",
  "alt": true,
  "code": "n = int(input())\n_, remainder = divmod(n, 2)\nprint(\"The number is odd\" if remainder else \"The number is even\")"
 },
 {
  "id": "pta-4-05",
  "lesson": 4,
  "tier": 5,
  "title": "PTA4.5 因子判断(能整除)",
  "hint": "参考代码 · 中文字符串已译成英文（打字练习版，OJ 提交请用原题解）",
  "alt": false,
  "code": "a, b = map(int, input().split())\nif (b != 0 and a % b == 0) or (a != 0 and b % a == 0):\n    print(\"Divisible\")\nelse:\n    print(\"Not divisible\")"
 },
 {
  "id": "pta-4-05b",
  "lesson": 4,
  "tier": 5,
  "title": "PTA4.5 因子判断(能整除)",
  "hint": "另一种写法 · 中文字符串已译成英文（打字练习版，OJ 提交请用原题解）",
  "alt": true,
  "code": "a, b = map(int, input().split())\npairs = ((a, b), (b, a))\nprint(\"Divisible\" if any(d != 0 and n % d == 0 for d, n in pairs) else \"Not divisible\")"
 },
 {
  "id": "pta-4-06",
  "lesson": 4,
  "tier": 5,
  "title": "PTA4.6 三角形构成判断",
  "hint": "参考代码",
  "alt": false,
  "code": "a, b, c = map(int, input().split())\nif a + b > c and a + c > b and b + c > a:\n    print(\"yes\")\nelse:\n    print(\"no\")"
 },
 {
  "id": "pta-4-06b",
  "lesson": 4,
  "tier": 5,
  "title": "PTA4.6 三角形构成判断",
  "hint": "另一种写法",
  "alt": true,
  "code": "x, y, z = sorted(map(int, input().split()))\nprint(\"yes\" if x + y > z else \"no\")"
 },
 {
  "id": "pta-4-07",
  "lesson": 4,
  "tier": 5,
  "title": "PTA4.7 闰年判断",
  "hint": "参考代码 · 中文字符串已译成英文（打字练习版，OJ 提交请用原题解）",
  "alt": false,
  "code": "year = int(input())\nif (year % 4 == 0 and year % 100 != 0) or year % 400 == 0:\n    print(f\"{year} is a leap year\")\nelse:\n    print(f\"{year} is not a leap year\")"
 },
 {
  "id": "pta-4-07b",
  "lesson": 4,
  "tier": 5,
  "title": "PTA4.7 闰年判断",
  "hint": "另一种写法 · 中文字符串已译成英文（打字练习版，OJ 提交请用原题解）",
  "alt": true,
  "code": "import calendar\nyear = int(input())\nprint(\"{} is a leap year\".format(year) if calendar.isleap(year) else \"{} is not a leap year\".format(year))"
 },
 {
  "id": "pta-4-08",
  "lesson": 4,
  "tier": 5,
  "title": "PTA4.8 分段函数",
  "hint": "参考代码",
  "alt": false,
  "code": "x = float(input())\nif x < 0:\n    print(0)\nelif 0 <= x < 5:\n    print(x)\nelif 5 <= x < 10:\n    print(3 * x - 5)\nelif 10 <= x < 20:\n    print(0.5 * x - 2)\nelse:\n    print(0)"
 },
 {
  "id": "pta-4-08b",
  "lesson": 4,
  "tier": 5,
  "title": "PTA4.8 分段函数",
  "hint": "另一种写法",
  "alt": true,
  "code": "import math\nx = float(input())\nsegments = (\n    (-math.inf, 0.0, lambda t: 0),\n    (0.0, 5.0, lambda t: t),\n    (5.0, 10.0, lambda t: 3 * t - 5),\n    (10.0, 20.0, lambda t: 0.5 * t - 2),\n    (20.0, math.inf, lambda t: 0),\n)\nfor low, high, rule in segments:\n    if low <= x < high:\n        print(rule(x))\n        break"
 },
 {
  "id": "pta-4-09",
  "lesson": 4,
  "tier": 5,
  "title": "PTA4.9 5位回文数",
  "hint": "参考代码",
  "alt": false,
  "code": "n = input()\nif n == n[::-1]:\n    print(\"yes\")\nelse:\n    print(\"no\")"
 },
 {
  "id": "pta-4-09b",
  "lesson": 4,
  "tier": 5,
  "title": "PTA4.9 5位回文数",
  "hint": "另一种写法",
  "alt": true,
  "code": "n = int(input())\nwan = n // 10000\nqian = n // 1000 % 10\nshi = n // 10 % 10\nge = n % 10\nprint(\"yes\" if wan == ge and qian == shi else \"no\")"
 },
 {
  "id": "pta-4-10",
  "lesson": 4,
  "tier": 5,
  "title": "PTA4.10 四则运算(禁用 eval,练习多分支)",
  "hint": "参考代码 · 中文字符串已译成英文（打字练习版，OJ 提交请用原题解）",
  "alt": false,
  "code": "a, op, b, eq = input().split()\na = int(a)\nb = int(b)\n\nif op == '+':\n    print(a + b)\nelif op == '-':\n    print(a - b)\nelif op == '*':\n    print(a * b)\nelif op == '/':\n    print(a / b)\nelif op == '//':\n    print(a // b)\nelif op == '%':\n    print(a % b)\nelse:\n    print(\"Invalid operator\")"
 },
 {
  "id": "pta-4-10b",
  "lesson": 4,
  "tier": 5,
  "title": "PTA4.10 四则运算(禁用 eval,练习多分支)",
  "hint": "另一种写法 · 中文字符串已译成英文（打字练习版，OJ 提交请用原题解）",
  "alt": true,
  "code": "import operator\na, op, b, eq = input().split()\ntable = {\n    '+': operator.add,\n    '-': operator.sub,\n    '*': operator.mul,\n    '/': operator.truediv,\n    '//': operator.floordiv,\n    '%': operator.mod,\n}\nprint(table[op](int(a), int(b)) if op in table else \"Invalid operator\")"
 },
 {
  "id": "pta-6-01",
  "lesson": 6,
  "tier": 5,
  "title": "PTA6.1 求偶数之和",
  "hint": "参考代码",
  "alt": false,
  "code": "total = 0\nfor i in range(0, 101, 2):\n    total += i\nprint(total)"
 },
 {
  "id": "pta-6-01b",
  "lesson": 6,
  "tier": 5,
  "title": "PTA6.1 求偶数之和",
  "hint": "另一种写法",
  "alt": true,
  "code": "print(sum(i for i in range(101) if i % 2 == 0))"
 },
 {
  "id": "pta-6-02",
  "lesson": 6,
  "tier": 5,
  "title": "PTA6.2 求阶乘",
  "hint": "参考代码",
  "alt": false,
  "code": "n = int(input())\nresult = 1\nfor i in range(1, n + 1):\n    result *= i\nprint(result)"
 },
 {
  "id": "pta-6-02b",
  "lesson": 6,
  "tier": 5,
  "title": "PTA6.2 求阶乘",
  "hint": "另一种写法",
  "alt": true,
  "code": "import math\n\nprint(math.factorial(int(input())))"
 },
 {
  "id": "pta-6-03",
  "lesson": 6,
  "tier": 5,
  "title": "PTA6.3 统计正数和负数的个数",
  "hint": "参考代码",
  "alt": false,
  "code": "nums = [int(x) for x in input().split(',')]\n\npositive = 0\nnegative = 0\nfor x in nums:\n    if x > 0:\n        positive += 1\n    elif x < 0:\n        negative += 1\n\nprint(f\"{positive},{negative}\")\nprint(f\"{sum(nums) / len(nums):.2f}\")"
 },
 {
  "id": "pta-6-03b",
  "lesson": 6,
  "tier": 5,
  "title": "PTA6.3 统计正数和负数的个数",
  "hint": "另一种写法",
  "alt": true,
  "code": "nums = list(map(int, input().split(',')))\n\nprint(\"{},{}\".format(sum(1 for x in nums if x > 0),\n                     sum(1 for x in nums if x < 0)))\nprint(\"{:.2f}\".format(sum(nums) / len(nums)))"
 },
 {
  "id": "pta-6-04",
  "lesson": 6,
  "tier": 5,
  "title": "PTA6.4 求数列的前 n 项之和",
  "hint": "参考代码",
  "alt": false,
  "code": "n = int(input())\n\na, b = 2, 1\ntotal = 0.0\nfor _ in range(n):\n    total += a / b\n    a, b = a + b, a\n\nprint(f\"{total:.2f}\")"
 },
 {
  "id": "pta-6-04b",
  "lesson": 6,
  "tier": 5,
  "title": "PTA6.4 求数列的前 n 项之和",
  "hint": "另一种写法",
  "alt": true,
  "code": "n = int(input())\n\nfib = [1, 1]\nwhile len(fib) < n + 2:\n    fib.append(fib[-1] + fib[-2])\n\ntotal = 0.0\nfor i in range(1, n + 1):\n    total += fib[i + 1] / fib[i]\n\nprint(format(total, \".2f\"))"
 },
 {
  "id": "pta-6-05",
  "lesson": 6,
  "tier": 5,
  "title": "PTA6.5 找列表中最大元素的下标",
  "hint": "参考代码",
  "alt": false,
  "code": "lst = [int(x) for x in input().split(',')]\n\nbiggest = max(lst)\nfor i, v in enumerate(lst):\n    if v == biggest:\n        print(i)"
 },
 {
  "id": "pta-6-05b",
  "lesson": 6,
  "tier": 5,
  "title": "PTA6.5 找列表中最大元素的下标",
  "hint": "另一种写法",
  "alt": true,
  "code": "lst = list(map(int, input().split(',')))\n\nbiggest = lst[0]\nfor x in lst[1:]:\n    if x > biggest:\n        biggest = x\n\nidxs = [i for i in range(len(lst)) if lst[i] == biggest]\nprint(\"\\n\".join(str(i) for i in idxs))"
 },
 {
  "id": "pta-6-06",
  "lesson": 6,
  "tier": 5,
  "title": "PTA6.6 成绩分段统计",
  "hint": "参考代码 · 中文字符串已译成英文（打字练习版，OJ 提交请用原题解）",
  "alt": false,
  "code": "scores = [int(x) for x in input().replace(',', ' ').split()]\ncount = [0] * 5              # 0:<60  1:60~69  2:70~79  3:80~89  4:>=90\nfor s in scores:\n    if s >= 90:   count[4] += 1\n    elif s >= 80: count[3] += 1\n    elif s >= 70: count[2] += 1\n    elif s >= 60: count[1] += 1\n    else:         count[0] += 1\nprint(f\"below 60: {count[0]}\")\nprint(f\"[60, 70): {count[1]}\")\nprint(f\"[70, 80): {count[2]}\")\nprint(f\"[80, 90): {count[3]}\")\nprint(f\"90 and above: {count[4]}\")"
 },
 {
  "id": "pta-6-06b",
  "lesson": 6,
  "tier": 5,
  "title": "PTA6.6 成绩分段统计",
  "hint": "另一种写法 · 中文字符串已译成英文（打字练习版，OJ 提交请用原题解）",
  "alt": true,
  "code": "import bisect\n\nBOUNDS = [60, 70, 80, 90]\nscores = [int(x) for x in input().replace(',', ' ').split()]\n\ncount = [0] * 5\nfor s in scores:\n    count[bisect.bisect_right(BOUNDS, s)] += 1\n\nprint(f\"below 60: {count[0]}\")\nprint(f\"[60, 70): {count[1]}\")\nprint(f\"[70, 80): {count[2]}\")\nprint(f\"[80, 90): {count[3]}\")\nprint(f\"90 and above: {count[4]}\")"
 },
 {
  "id": "pta-6-07",
  "lesson": 6,
  "tier": 5,
  "title": "PTA6.7 求忽略正负号的整数平均值",
  "hint": "参考代码",
  "alt": false,
  "code": "lst = eval(input())\n\ntotal = 0\nfor x in lst:\n    total += abs(x)\n\nprint(f\"{total / len(lst):.2f}\")"
 },
 {
  "id": "pta-6-07b",
  "lesson": 6,
  "tier": 5,
  "title": "PTA6.7 求忽略正负号的整数平均值",
  "hint": "另一种写法",
  "alt": true,
  "code": "import ast\n\nlst = ast.literal_eval(input())\n\nprint(\"{:.2f}\".format(sum(map(abs, lst)) / len(lst)))"
 },
 {
  "id": "pta-6-08",
  "lesson": 6,
  "tier": 5,
  "title": "PTA6.8 输出 1~100 之间能被 3 整除但不能被 5 整除的数",
  "hint": "参考代码",
  "alt": false,
  "code": "for i in range(1, 101):\n    if i % 3 == 0 and i % 5 != 0:\n        print(i)"
 },
 {
  "id": "pta-6-08b",
  "lesson": 6,
  "tier": 5,
  "title": "PTA6.8 输出 1~100 之间能被 3 整除但不能被 5 整除的数",
  "hint": "另一种写法",
  "alt": true,
  "code": "for i in range(3, 101, 3):\n    if i % 5:\n        print(i)"
 },
 {
  "id": "pta-6-09",
  "lesson": 6,
  "tier": 5,
  "title": "PTA6.9 python-循环:统计成绩",
  "hint": "参考代码 · 中文字符串已译成英文（打字练习版，OJ 提交请用原题解）",
  "alt": false,
  "code": "total = 0\nn = 0\nfail = 0\n\nwhile True:\n    score = int(input())\n    if score < 0:\n        break\n    total += score\n    n += 1\n    if score < 60:\n        fail += 1\n\nif n == 0:\n    print(\"no students\")\nelse:\n    print(f\"average={total / n:.2f}, failed={fail}\")"
 },
 {
  "id": "pta-6-09b",
  "lesson": 6,
  "tier": 5,
  "title": "PTA6.9 python-循环:统计成绩",
  "hint": "另一种写法 · 中文字符串已译成英文（打字练习版，OJ 提交请用原题解）",
  "alt": true,
  "code": "import sys\n\nscores = []\nfor token in sys.stdin.read().split():\n    value = int(token)\n    if value < 0:\n        break\n    scores.append(value)\n\nif not scores:\n    print(\"no students\")\nelse:\n    print(\"average={:.2f}, failed={}\".format(\n        sum(scores) / len(scores),\n        sum(1 for s in scores if s < 60)))"
 },
 {
  "id": "pta-6-10",
  "lesson": 6,
  "tier": 5,
  "title": "PTA6.10 超市营业额统计系统",
  "hint": "参考代码",
  "alt": false,
  "code": "n = int(input())\nsales = list(map(int, input().split()))\n\ntotal = sum(sales)\nprint(total)\n\naverage = total / n\nabove = 0\nfor x in sales:\n    if x > average:\n        above += 1\nprint(above)\n\nprint(sales.index(max(sales)) + 1)"
 },
 {
  "id": "pta-6-10b",
  "lesson": 6,
  "tier": 5,
  "title": "PTA6.10 超市营业额统计系统",
  "hint": "另一种写法",
  "alt": true,
  "code": "n = int(input())\nsales = list(map(int, input().split()))\n\ntotal = sum(sales)\naverage = total / len(sales)\n\nabove = len([x for x in sales if x > average])\nbest = min(range(n), key=lambda i: (-sales[i], i))\n\nprint(total)\nprint(above)\nprint(best + 1)"
 },
 {
  "id": "pta-7-01",
  "lesson": 7,
  "tier": 5,
  "title": "PTA7.1 求最接近的值",
  "hint": "参考代码",
  "alt": false,
  "code": "import sys\n\nx = float(sys.stdin.read().split()[0])\ns = 0.0\nbest_n, best_s, best_d = 0, 0.0, None\nn = 1\nwhile True:\n    s += 1.0 / n\n    d = abs(s - x)\n    if best_d is None or d < best_d:\n        best_d, best_n, best_s = d, n, s\n    if s - x > 0.5:\n        break\n    n += 1\nprint(\"%.6f %d\" % (best_s, best_n))"
 },
 {
  "id": "pta-7-01b",
  "lesson": 7,
  "tier": 5,
  "title": "PTA7.1 求最接近的值",
  "hint": "另一种写法",
  "alt": true,
  "code": "import sys\n\ndef solve(x):\n    s, n, best = 0.0, 0, (None, None, None)\n    while True:\n        n += 1\n        s += 1 / n\n        diff = abs(x - s)\n        if best[0] is None or diff < best[0]:\n            best = (diff, s, n)\n        if s > x + 1:\n            return best[1], best[2]\n\ns_val, n_val = solve(float(sys.stdin.read().split()[0]))\nprint(f\"{s_val:.6f} {n_val}\")"
 },
 {
  "id": "pta-7-02",
  "lesson": 7,
  "tier": 5,
  "title": "PTA7.2 s=1+2+3+...+n 直到 s>=m",
  "hint": "参考代码",
  "alt": false,
  "code": "import sys\n\nm = int(sys.stdin.read().split()[0])\ns = 0\nn = 0\nwhile s < m:\n    n += 1\n    s += n\nprint(f\"{s}=1+2+...+{n}\")"
 },
 {
  "id": "pta-7-02b",
  "lesson": 7,
  "tier": 5,
  "title": "PTA7.2 s=1+2+3+...+n 直到 s>=m",
  "hint": "另一种写法",
  "alt": true,
  "code": "import sys\n\nm = int(sys.stdin.read().split()[0])\nn = 1\nwhile n * (n + 1) // 2 < m:\n    n += 1\ns = n * (n - 1) // 2\nwhile s < m:\n    s += n\nelse:\n    print(\"%d=1+2+...+%d\" % (s, n))"
 },
 {
  "id": "pta-7-03",
  "lesson": 7,
  "tier": 5,
  "title": "PTA7.3 求 1!+2!+3!+...+n!",
  "hint": "参考代码",
  "alt": false,
  "code": "import sys\n\nn = int(sys.stdin.read().split()[0])\ntotal = 0\nterm = 1\nfor i in range(1, n + 1):\n    term *= i\n    total += term\nprint(total)"
 },
 {
  "id": "pta-7-03b",
  "lesson": 7,
  "tier": 5,
  "title": "PTA7.3 求 1!+2!+3!+...+n!",
  "hint": "另一种写法",
  "alt": true,
  "code": "import sys\nfrom math import factorial\n\nn = int(sys.stdin.read().split()[0])\nprint(sum(factorial(i) for i in range(1, n + 1)))"
 },
 {
  "id": "pta-7-04",
  "lesson": 7,
  "tier": 5,
  "title": "PTA7.4 输出一组数，一行8个",
  "hint": "参考代码",
  "alt": false,
  "code": "import sys\n\nn = int(sys.stdin.read().split()[0])\nbuf = []\nfor i in range(1, n):\n    if i % 5 == 0 or i % 7 == 0:\n        buf.append(str(i))\n\nlines = [\" \".join(buf[i:i + 8]) for i in range(0, len(buf), 8)]\nsys.stdout.write(\"\\n\".join(lines))\nif lines:\n    sys.stdout.write(\"\\n\")"
 },
 {
  "id": "pta-7-04b",
  "lesson": 7,
  "tier": 5,
  "title": "PTA7.4 输出一组数，一行8个",
  "hint": "另一种写法",
  "alt": true,
  "code": "import sys\n\nn = int(sys.stdin.read().split()[0])\nnums = [x for x in range(1, n) if x % 5 == 0 or x % 7 == 0]\nout = []\nfor idx, x in enumerate(nums, 1):\n    out.append(str(x))\n    out.append(\"\\n\" if idx % 8 == 0 else \" \")\nprint(\"\".join(out).rstrip())"
 },
 {
  "id": "pta-7-05",
  "lesson": 7,
  "tier": 5,
  "title": "PTA7.5 判断是否为等差数列",
  "hint": "参考代码",
  "alt": false,
  "code": "import sys\n\ndata = sys.stdin.read().split()\nn = int(data[0])\na = [int(x) for x in data[1:1 + n]]\nok = True\nif n >= 3:\n    d = a[1] - a[0]\n    for i in range(2, n):\n        if a[i] - a[i - 1] != d:\n            ok = False\n            break\nprint(\"True\" if ok else \"False\")"
 },
 {
  "id": "pta-7-05b",
  "lesson": 7,
  "tier": 5,
  "title": "PTA7.5 判断是否为等差数列",
  "hint": "另一种写法",
  "alt": true,
  "code": "import sys\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nnums = list(map(int, data[1:1 + n]))\ndiffs = {nums[i] - nums[i - 1] for i in range(1, n)}\nprint(\"True\" if len(diffs) <= 1 else \"False\")"
 },
 {
  "id": "pta-7-06",
  "lesson": 7,
  "tier": 5,
  "title": "PTA7.6 求一组数的最大值",
  "hint": "参考代码",
  "alt": false,
  "code": "import sys\n\nbest_val = None\nbest_txt = None\nfor line in sys.stdin.read().splitlines():\n    txt = line.strip()\n    if txt == \"\":\n        break\n    val = eval(txt)\n    if best_val is None or val > best_val:\n        best_val, best_txt = val, txt\nprint(best_txt)"
 },
 {
  "id": "pta-7-06b",
  "lesson": 7,
  "tier": 5,
  "title": "PTA7.6 求一组数的最大值",
  "hint": "另一种写法",
  "alt": true,
  "code": "import sys\n\nlines = sys.stdin.read().split(\"\\n\")\nbest = None\nfor raw in lines:\n    s = raw.strip()\n    if not s:\n        break\n    v = eval(s)\n    if best is None or v > best[0]:\n        best = (v, s)\nprint(best[1])"
 },
 {
  "id": "pta-7-07",
  "lesson": 7,
  "tier": 5,
  "title": "PTA7.7 血压正常的最长小时数",
  "hint": "参考代码",
  "alt": false,
  "code": "import sys\n\ndata = sys.stdin.read().split()\nn = int(data[0])\nbest = cur = 0\nidx = 1\nfor _ in range(n):\n    sbp, dbp = int(data[idx]), int(data[idx + 1])\n    idx += 2\n    if 90 <= sbp <= 140 and 60 <= dbp <= 90:\n        cur += 1\n        if cur > best:\n            best = cur\n    else:\n        cur = 0\nprint(best)"
 },
 {
  "id": "pta-7-07b",
  "lesson": 7,
  "tier": 5,
  "title": "PTA7.7 血压正常的最长小时数",
  "hint": "另一种写法",
  "alt": true,
  "code": "import sys\n\ntokens = sys.stdin.read().split()\nn = int(tokens[0])\npairs = [(int(tokens[1 + 2 * i]), int(tokens[2 + 2 * i])) for i in range(n)]\nflags = [1 if (90 <= a <= 140 and 60 <= b <= 90) else 0 for a, b in pairs]\nbest = cur = 0\nfor f in flags:\n    cur = cur + 1 if f else 0\n    best = cur if cur > best else best\nprint(best)"
 },
 {
  "id": "pta-7-08",
  "lesson": 7,
  "tier": 5,
  "title": "PTA7.8 考拉兹猜想",
  "hint": "参考代码",
  "alt": false,
  "code": "import sys\n\nn = int(sys.stdin.read().split()[0])\nseq = []\nwhile n != 1:\n    n = n * 3 + 1 if n % 2 else n // 2\n    seq.append(str(n))\nprint(\",\".join(seq))"
 },
 {
  "id": "pta-7-08b",
  "lesson": 7,
  "tier": 5,
  "title": "PTA7.8 考拉兹猜想",
  "hint": "另一种写法",
  "alt": true,
  "code": "import sys\n\nn = int(sys.stdin.read().split()[0])\nout = []\nwhile True:\n    if n % 2 == 1:\n        n = 3 * n + 1\n    else:\n        n = n // 2\n    out.append(n)\n    if n == 1:\n        break\nsys.stdout.write(\",\".join(map(str, out)) + \"\\n\")"
 },
 {
  "id": "pta-7-09",
  "lesson": 7,
  "tier": 5,
  "title": "PTA7.9 jmu-python-素数",
  "hint": "参考代码",
  "alt": false,
  "code": "import sys\n\nn = int(sys.stdin.read().split()[0])\nprime = n > 1\nd = 2\nwhile d * d <= n:\n    if n % d == 0:\n        prime = False\n        break\n    d += 1\nprint(f\"{n} is prime\" if prime else f\"{n} is not prime\")"
 },
 {
  "id": "pta-7-09b",
  "lesson": 7,
  "tier": 5,
  "title": "PTA7.9 jmu-python-素数",
  "hint": "另一种写法",
  "alt": true,
  "code": "import sys\n\nn = int(sys.stdin.read().split()[0])\ntry:\n    for d in range(2, int(n ** 0.5) + 1):\n        if n % d == 0:\n            raise ValueError\n    if n <= 1:\n        raise ValueError\n    print(\"{} is prime\".format(n))\nexcept ValueError:\n    print(\"{} is not prime\".format(n))"
 },
 {
  "id": "pta-7-10",
  "lesson": 7,
  "tier": 5,
  "title": "PTA7.10 判断回文对联",
  "hint": "参考代码 · 中文字符串已译成英文（打字练习版，OJ 提交请用原题解）",
  "alt": false,
  "code": "import sys\n\ns = sys.stdin.readline().rstrip(\"\\n\")\nlow, high = 0, len(s) - 1\nok = True\nwhile low < high:\n    if s[low] != s[high]:\n        ok = False\n        break\n    low += 1\n    high -= 1\nprint(s, \"is a palindrome couplet\" if ok else \"is not a palindrome couplet\")"
 },
 {
  "id": "pta-7-10b",
  "lesson": 7,
  "tier": 5,
  "title": "PTA7.10 判断回文对联",
  "hint": "另一种写法 · 中文字符串已译成英文（打字练习版，OJ 提交请用原题解）",
  "alt": true,
  "code": "import sys\n\ns = sys.stdin.readline().rstrip(\"\\n\")\nprint(s, \"is a palindrome couplet\" if s == s[::-1] else \"is not a palindrome couplet\")"
 },
 {
  "id": "pta-8-01",
  "lesson": 8,
  "tier": 5,
  "title": "PTA8.1 判断一组非负整数是不是素数",
  "hint": "参考代码",
  "alt": false,
  "code": "import sys\n\n\ndef is_prime(n):\n    if n < 2:\n        return False\n    if n % 2 == 0:\n        return n == 2\n    d = 3\n    while d * d <= n:\n        if n % d == 0:\n            return False\n        d += 2\n    return True\n\n\nres = []\nfor tok in sys.stdin.read().split():\n    if tok == \"end\":\n        break\n    res.append(\"yes\" if is_prime(int(tok)) else \"no\")\nprint(\" \".join(res))"
 },
 {
  "id": "pta-8-01b",
  "lesson": 8,
  "tier": 5,
  "title": "PTA8.1 判断一组非负整数是不是素数",
  "hint": "另一种写法",
  "alt": true,
  "code": "import sys\nfrom math import isqrt\n\n\ndef prime(x):\n    if x < 2:\n        return False\n    for i in range(2, isqrt(x) + 1):\n        if x % i == 0:\n            return False\n    return True\n\n\nanswers = []\nfor line in sys.stdin:\n    s = line.strip()\n    if not s:\n        continue\n    if s == \"end\":\n        break\n    answers.append(\"yes\" if prime(int(s)) else \"no\")\nprint(\" \".join(answers))"
 },
 {
  "id": "pta-8-02",
  "lesson": 8,
  "tier": 5,
  "title": "PTA8.2 输出满足公式的数",
  "hint": "参考代码",
  "alt": false,
  "code": "n = int(input())\nfor a in range(1, 10):\n    for b in range(0, 10):\n        ab = 10 * a + b\n        if ab <= n and ab - (10 * b + a) == 9:\n            print(ab)"
 },
 {
  "id": "pta-8-02b",
  "lesson": 8,
  "tier": 5,
  "title": "PTA8.2 输出满足公式的数",
  "hint": "另一种写法",
  "alt": true,
  "code": "n = int(input())\nres = []\nfor a in range(1, 10):\n    b = a - 1\n    ab = 10 * a + b\n    if ab <= n:\n        res.append(ab)\nprint(\"\\n\".join(str(x) for x in res))"
 },
 {
  "id": "pta-8-03",
  "lesson": 8,
  "tier": 5,
  "title": "PTA8.3 区间内的完全数",
  "hint": "参考代码",
  "alt": false,
  "code": "import sys\n\n\ndef perfect(n):\n    if n < 2:\n        return False\n    s = 1\n    d = 2\n    while d * d <= n:\n        if n % d == 0:\n            s += d\n            if d != n // d:\n                s += n // d\n        d += 1\n    return s == n\n\n\na, b = map(int, sys.stdin.read().split())\nfor x in range(a, b + 1):\n    if perfect(x):\n        print(x)"
 },
 {
  "id": "pta-8-03b",
  "lesson": 8,
  "tier": 5,
  "title": "PTA8.3 区间内的完全数",
  "hint": "另一种写法",
  "alt": true,
  "code": "import sys\nfrom math import isqrt\n\n\ndef is_perfect(x):\n    if x <= 1:\n        return False\n    total = 0\n    for d in range(1, isqrt(x) + 1):\n        if x % d == 0:\n            total += d\n            q = x // d\n            if q != x and q != d:\n                total += q\n    return total == x\n\n\na, b = map(int, sys.stdin.read().split())\nres = [str(x) for x in range(a, b + 1) if is_perfect(x)]\nif res:\n    print(\"\\n\".join(res))"
 },
 {
  "id": "pta-8-04",
  "lesson": 8,
  "tier": 5,
  "title": "PTA8.4 计算最大公约数",
  "hint": "参考代码",
  "alt": false,
  "code": "import sys\n\n\ndef gcd(a, b):\n    while b:\n        a, b = b, a % b\n    return a\n\n\nm, n = map(int, sys.stdin.read().split())\nprint(gcd(m, n))"
 },
 {
  "id": "pta-8-04b",
  "lesson": 8,
  "tier": 5,
  "title": "PTA8.4 计算最大公约数",
  "hint": "另一种写法",
  "alt": true,
  "code": "from math import gcd\nimport sys\n\na, b = map(int, sys.stdin.read().split())\nprint(gcd(a, b))"
 },
 {
  "id": "pta-8-05",
  "lesson": 8,
  "tier": 5,
  "title": "PTA8.5 列表元素转换2",
  "hint": "参考代码",
  "alt": false,
  "code": "lst = eval(input())\nres = []\nfor x in lst:\n    if x % 2:\n        res.append(x * x)\n    else:\n        res.append(x)\nprint(res)"
 },
 {
  "id": "pta-8-05b",
  "lesson": 8,
  "tier": 5,
  "title": "PTA8.5 列表元素转换2",
  "hint": "另一种写法",
  "alt": true,
  "code": "v = eval(input())\nprint([x ** 2 if x % 2 != 0 else x for x in v])"
 },
 {
  "id": "pta-8-06",
  "lesson": 8,
  "tier": 5,
  "title": "PTA8.6 偶数移动到末尾",
  "hint": "参考代码",
  "alt": false,
  "code": "nums = list(map(int, input().split()))\nodd, even = [], []\nfor x in nums:\n    if x % 2:\n        odd.append(x)\n    else:\n        even.append(x)\nprint(odd + even)"
 },
 {
  "id": "pta-8-06b",
  "lesson": 8,
  "tier": 5,
  "title": "PTA8.6 偶数移动到末尾",
  "hint": "另一种写法",
  "alt": true,
  "code": "v = list(map(int, input().split()))\nprint([x for x in v if x % 2 != 0] + [x for x in v if x % 2 == 0])"
 },
 {
  "id": "pta-8-07",
  "lesson": 8,
  "tier": 5,
  "title": "PTA8.7 判断元音字母开头的单词",
  "hint": "参考代码",
  "alt": false,
  "code": "import sys\n\nlines = sys.stdin.read().split()\nn = int(lines[0])\nfor w in lines[1:1 + n]:\n    if w[0].lower() in \"aeiou\":\n        print(w)"
 },
 {
  "id": "pta-8-07b",
  "lesson": 8,
  "tier": 5,
  "title": "PTA8.7 判断元音字母开头的单词",
  "hint": "另一种写法",
  "alt": true,
  "code": "import sys\n\ndata = sys.stdin.read().splitlines()\nn = int(data[0].strip())\nvowels = set(\"aeiouAEIOU\")\nout = []\nfor i in range(1, n + 1):\n    w = data[i].strip()\n    if w and w[0] in vowels:\n        out.append(w)\nif out:\n    print(\"\\n\".join(out))"
 },
 {
  "id": "pta-8-08",
  "lesson": 8,
  "tier": 5,
  "title": "PTA8.8 提取数字字符",
  "hint": "参考代码",
  "alt": false,
  "code": "s = input()\ndigits = []\nfor c in s:\n    if \"0\" <= c <= \"9\":\n        digits.append(c)\nif digits:\n    digits.sort(reverse=True)\n    print(\"\".join(digits))\nelse:\n    print(\"no\")"
 },
 {
  "id": "pta-8-08b",
  "lesson": 8,
  "tier": 5,
  "title": "PTA8.8 提取数字字符",
  "hint": "另一种写法",
  "alt": true,
  "code": "s = input()\nds = sorted((c for c in s if c.isascii() and c.isdigit()), reverse=True)\nprint(\"\".join(ds) if ds else \"no\")"
 },
 {
  "id": "pta-8-09",
  "lesson": 8,
  "tier": 5,
  "title": "PTA8.9 求最大因子",
  "hint": "参考代码",
  "alt": false,
  "code": "n = int(input())\ni = n - 1\nwhile i > 1:\n    if n % i == 0:\n        print(i)\n        break\n    i -= 1\nelse:\n    print(\"NO\")"
 },
 {
  "id": "pta-8-09b",
  "lesson": 8,
  "tier": 5,
  "title": "PTA8.9 求最大因子",
  "hint": "另一种写法",
  "alt": true,
  "code": "n = int(input())\nif n < 4:\n    print(\"NO\")\nelse:\n    p = 0\n    d = 2\n    while d * d <= n:\n        if n % d == 0:\n            p = d\n            break\n        d += 1\n    print(n // p if p else \"NO\")"
 },
 {
  "id": "pta-8-10",
  "lesson": 8,
  "tier": 5,
  "title": "PTA8.10 求最小因子",
  "hint": "参考代码",
  "alt": false,
  "code": "n = int(input())\nfor i in range(2, n):\n    if n % i == 0:\n        print(i)\n        break\nelse:\n    print(\"NO\")"
 },
 {
  "id": "pta-8-10b",
  "lesson": 8,
  "tier": 5,
  "title": "PTA8.10 求最小因子",
  "hint": "另一种写法",
  "alt": true,
  "code": "n = int(input())\nd = 2\nwhile d * d <= n:\n    if n % d == 0:\n        break\n    d += 1\nprint(d if d * d <= n else \"NO\")"
 },
 {
  "id": "pta-8-11",
  "lesson": 8,
  "tier": 5,
  "title": "PTA8.11 列表统计",
  "hint": "参考代码",
  "alt": false,
  "code": "v = eval(input())\nprint(max(v))\nprint(min(v))\nprint(sum(v))\nprint(\"%.2f\" % (sum(v) / len(v)))"
 },
 {
  "id": "pta-8-11b",
  "lesson": 8,
  "tier": 5,
  "title": "PTA8.11 列表统计",
  "hint": "另一种写法",
  "alt": true,
  "code": "v = eval(input())\nsv = sorted(v)\nprint(sv[-1])\nprint(sv[0])\nprint(sum(sv))\nprint(\"%.2f\" % (sum(sv) / len(sv)))"
 },
 {
  "id": "pta-8-12",
  "lesson": 8,
  "tier": 5,
  "title": "PTA8.12 去除列表中的重复元素并排序",
  "hint": "参考代码",
  "alt": false,
  "code": "original_list = eval(input())\nunique_list = []\nfor item in original_list:\n    if item not in unique_list:\n        unique_list.append(item)\nunique_list.sort()\nprint(unique_list)"
 },
 {
  "id": "pta-8-12b",
  "lesson": 8,
  "tier": 5,
  "title": "PTA8.12 去除列表中的重复元素并排序",
  "hint": "另一种写法",
  "alt": true,
  "code": "lst = eval(input())\nprint(sorted(set(lst)))"
 },
 {
  "id": "pta-10-01",
  "lesson": 10,
  "tier": 5,
  "title": "PTA10.1 数字转换为星期",
  "hint": "参考代码",
  "alt": false,
  "code": "days = {1: \"Mon\", 2: \"Tue\", 3: \"Wed\", 4: \"Thu\", 5: \"Fri\", 6: \"Sat\", 7: \"Sun\"}\nn = int(input())\nprint(days[n])"
 },
 {
  "id": "pta-10-01b",
  "lesson": 10,
  "tier": 5,
  "title": "PTA10.1 数字转换为星期",
  "hint": "另一种写法",
  "alt": true,
  "code": "days = [\"\", \"Mon\", \"Tue\", \"Wed\", \"Thu\", \"Fri\", \"Sat\", \"Sun\"]\nprint(days[int(input())])"
 },
 {
  "id": "pta-10-02",
  "lesson": 10,
  "tier": 5,
  "title": "PTA10.2 将两个列表的对应元素构建字典",
  "hint": "参考代码",
  "alt": false,
  "code": "keys = input().split()\nvalues = input().split()\nd = {}\nfor k, v in zip(keys, values):\n    d[k] = v\nprint(d)"
 },
 {
  "id": "pta-10-02b",
  "lesson": 10,
  "tier": 5,
  "title": "PTA10.2 将两个列表的对应元素构建字典",
  "hint": "另一种写法",
  "alt": true,
  "code": "keys = input().split()\nvalues = input().split()\nprint(dict(zip(keys, values)))"
 },
 {
  "id": "pta-10-03",
  "lesson": 10,
  "tier": 5,
  "title": "PTA10.3 根据输入创建字典",
  "hint": "参考代码",
  "alt": false,
  "code": "import sys\n\nd = {}\nfor line in sys.stdin:\n    line = line.rstrip(\"\\n\")\n    if not line.strip():\n        break\n    country, capital = line.split(\";\")\n    d[country] = capital\nprint(d)"
 },
 {
  "id": "pta-10-03b",
  "lesson": 10,
  "tier": 5,
  "title": "PTA10.3 根据输入创建字典",
  "hint": "另一种写法",
  "alt": true,
  "code": "import sys\n\ntext = sys.stdin.read()\nblock = text.split(\"\\n\\n\")[0].strip().split(\"\\n\")\nd = {}\nfor line in block:\n    if line.strip():\n        k, v = line.split(\";\")\n        d[k] = v\nprint(d)"
 },
 {
  "id": "pta-10-04",
  "lesson": 10,
  "tier": 5,
  "title": "PTA10.4 三种语言的单词转换",
  "hint": "参考代码 · 中文字符串已译成英文（打字练习版，OJ 提交请用原题解）",
  "alt": false,
  "code": "import sys\n\nblocks, cur = [], []\nfor line in sys.stdin:\n    s = line.strip()\n    if not s:\n        if cur:\n            blocks.append(cur)\n            cur = []\n        continue\n    cur.append(s)\nif cur:\n    blocks.append(cur)\n\ncn2en, en2dk = {}, {}\nfor line in blocks[0]:\n    cn, en = line.split()\n    cn2en[cn] = en\nfor line in blocks[1]:\n    en, dk = line.split()\n    en2dk[en] = dk\n\nword = blocks[2][0]\nen = cn2en.get(word)\nprint(en2dk.get(en, \"word not found\") if en else \"word not found\")"
 },
 {
  "id": "pta-10-04b",
  "lesson": 10,
  "tier": 5,
  "title": "PTA10.4 三种语言的单词转换",
  "hint": "另一种写法 · 中文字符串已译成英文（打字练习版，OJ 提交请用原题解）",
  "alt": true,
  "code": "import sys\n\n\ndef to_dict(lines):\n    return dict(line.split() for line in lines)\n\n\nblocks, cur = [], []\nfor line in sys.stdin:\n    s = line.strip()\n    if not s:\n        if cur:\n            blocks.append(cur)\n            cur = []\n        continue\n    cur.append(s)\nif cur:\n    blocks.append(cur)\n\ncn2en = to_dict(blocks[0])\nen2dk = to_dict(blocks[1])\nword = blocks[2][0]\ntry:\n    print(en2dk[cn2en[word]])\nexcept KeyError:\n    print(\"word not found\")"
 },
 {
  "id": "pta-10-05",
  "lesson": 10,
  "tier": 5,
  "title": "PTA10.5 公交线路的起终点查询",
  "hint": "参考代码 · 中文字符串已译成英文（打字练习版，OJ 提交请用原题解）",
  "alt": false,
  "code": "dict1 = {\"Route 1\": \"Railway Station-Xiamen University\",\n         \"Route 2\": \"Xiamen University-Haicang\",\n         \"Express 1\": \"Ferry-Convention Center\"}\nname = input().strip()\nif name in dict1:\n    print(dict1[name])\nelse:\n    print(\"invalid route\")"
 },
 {
  "id": "pta-10-05b",
  "lesson": 10,
  "tier": 5,
  "title": "PTA10.5 公交线路的起终点查询",
  "hint": "另一种写法 · 中文字符串已译成英文（打字练习版，OJ 提交请用原题解）",
  "alt": true,
  "code": "dict1 = {\"Route 1\": \"Railway Station-Xiamen University\",\n         \"Route 2\": \"Xiamen University-Haicang\",\n         \"Express 1\": \"Ferry-Convention Center\"}\nprint(dict1.get(input().strip(), \"invalid route\"))"
 },
 {
  "id": "pta-10-06",
  "lesson": 10,
  "tier": 5,
  "title": "PTA10.6 人口字典中查找城市",
  "hint": "参考代码 · 中文字符串已译成英文（打字练习版，OJ 提交请用原题解）",
  "alt": false,
  "code": "population = {\"Chongqing\": 3212, \"Hefei\": 570.2, \"Zunyi\": 612.7, \"Suzhou\": 1295,\n              \"Fuzhou\": 710.1, \"Nanchang\": 536, \"Xiamen\": 261.1, \"Chengdu\": 1500.1}\nn = int(input())\nfor city in population:\n    if population[city] > n:\n        print(city, end=\" \")\nprint()"
 },
 {
  "id": "pta-10-06b",
  "lesson": 10,
  "tier": 5,
  "title": "PTA10.6 人口字典中查找城市",
  "hint": "另一种写法 · 中文字符串已译成英文（打字练习版，OJ 提交请用原题解）",
  "alt": true,
  "code": "population = {\"Chongqing\": 3212, \"Hefei\": 570.2, \"Zunyi\": 612.7, \"Suzhou\": 1295,\n              \"Fuzhou\": 710.1, \"Nanchang\": 536, \"Xiamen\": 261.1, \"Chengdu\": 1500.1}\nn = int(input())\nprint(\"\".join(c + \" \" for c in population if population[c] > n))"
 },
 {
  "id": "pta-10-07",
  "lesson": 10,
  "tier": 5,
  "title": "PTA10.7 字典的逆向查询之二",
  "hint": "参考代码 · 中文字符串已译成英文（打字练习版，OJ 提交请用原题解）",
  "alt": false,
  "code": "import sys\n\nblocks, cur = [], []\nfor line in sys.stdin:\n    s = line.strip()\n    if not s:\n        if cur:\n            blocks.append(cur)\n            cur = []\n        continue\n    cur.append(s)\nif cur:\n    blocks.append(cur)\n\nname2ids = {}\nfor line in blocks[0]:\n    sid, name = line.split(\";\")\n    name2ids.setdefault(name, []).append(sid)\n\nprint(\"\\n\".join(name2ids.get(blocks[1][0], [\"name not found\"])))"
 },
 {
  "id": "pta-10-07b",
  "lesson": 10,
  "tier": 5,
  "title": "PTA10.7 字典的逆向查询之二",
  "hint": "另一种写法 · 中文字符串已译成英文（打字练习版，OJ 提交请用原题解）",
  "alt": true,
  "code": "import sys\n\nrows = [l.strip() for l in sys.stdin.read().splitlines()]\ncut = rows.index(\"\")\npairs = [r for r in rows[:cut] if r]\nquery = next(r for r in rows[cut:] if r)\n\ncount = {}\nfor r in pairs:\n    name = r.split(\";\")[1]\n    count[name] = count.get(name, 0) + 1\n\nif count.get(query, 0) == 0:\n    print(\"name not found\")\nelse:\n    for r in pairs:\n        sid, name = r.split(\";\")\n        if name == query:\n            print(sid)"
 },
 {
  "id": "pta-10-08",
  "lesson": 10,
  "tier": 5,
  "title": "PTA10.8 输出经过的公交线路",
  "hint": "参考代码 · 中文字符串已译成英文（打字练习版，OJ 提交请用原题解）",
  "alt": false,
  "code": "dict1 = {\"Route 1\": \"Railway Station-Xiamen University\",\n         \"Route 2\": \"Xiamen University-Haicang\",\n         \"Express 1\": \"Ferry-Convention Center\",\n         \"Route 92\": \"Software Park-Xiamen University\",\n         \"Route 101\": \"Dongdu-Convention Center\",\n         \"Route 855\": \"Convention Center-Haicang\"}\nstation = input().strip()\nres = []\nfor route in dict1:\n    start, end = dict1[route].split(\"-\")\n    if station == start or station == end:\n        res.append(route)\nprint(res if res else \"no route available\")"
 },
 {
  "id": "pta-10-08b",
  "lesson": 10,
  "tier": 5,
  "title": "PTA10.8 输出经过的公交线路",
  "hint": "另一种写法 · 中文字符串已译成英文（打字练习版，OJ 提交请用原题解）",
  "alt": true,
  "code": "dict1 = {\"Route 1\": \"Railway Station-Xiamen University\",\n         \"Route 2\": \"Xiamen University-Haicang\",\n         \"Express 1\": \"Ferry-Convention Center\",\n         \"Route 92\": \"Software Park-Xiamen University\",\n         \"Route 101\": \"Dongdu-Convention Center\",\n         \"Route 855\": \"Convention Center-Haicang\"}\nstation = input().strip()\nroutes = [r for r, ends in dict1.items() if station in ends.split(\"-\")]\nprint(routes or \"no route available\")"
 },
 {
  "id": "pta-10-09",
  "lesson": 10,
  "tier": 5,
  "title": "PTA10.9 成绩等级统计",
  "hint": "参考代码 · 中文字符串已译成英文（打字练习版，OJ 提交请用原题解）",
  "alt": false,
  "code": "import sys\n\nlevels = \"ABCDEF\"\nids = {lv: [] for lv in levels}\nfor line in sys.stdin:\n    s = line.strip()\n    if s == \"#\":\n        break\n    sid, lv = s.split()\n    ids[lv].append(sid)\n\nfor lv in levels:\n    print(f\"grade {lv}: {len(ids[lv])} students\")\n    if ids[lv]:\n        print(\"   students: \" + \"\".join(\"  \" + sid for sid in ids[lv]) + \"  \")"
 },
 {
  "id": "pta-10-09b",
  "lesson": 10,
  "tier": 5,
  "title": "PTA10.9 成绩等级统计",
  "hint": "另一种写法 · 中文字符串已译成英文（打字练习版，OJ 提交请用原题解）",
  "alt": true,
  "code": "import sys\n\ngrades = {lv: [] for lv in \"ABCDEF\"}\nfor line in sys.stdin.read().splitlines():\n    line = line.strip()\n    if line == \"#\":\n        break\n    if line:\n        sid, lv = line.split()\n        grades[lv].append(sid)\n\nout = []\nfor lv in \"ABCDEF\":\n    out.append(\"grade %s: %d students\" % (lv, len(grades[lv])))\n    if grades[lv]:\n        out.append(\"   students: \" + \"\".join(\"  %s\" % sid for sid in grades[lv]) + \"  \")\nprint(\"\\n\".join(out))"
 },
 {
  "id": "pta-11-01",
  "lesson": 11,
  "tier": 5,
  "title": "PTA11.1 列表元素转换（奇数元素平方）",
  "hint": "参考代码",
  "alt": false,
  "code": "lst = eval(input())\nfor i in range(len(lst)):\n    if lst[i] % 2 == 1:\n        lst[i] = lst[i] ** 2\nprint(lst)"
 },
 {
  "id": "pta-11-01b",
  "lesson": 11,
  "tier": 5,
  "title": "PTA11.1 列表元素转换（奇数元素平方）",
  "hint": "另一种写法",
  "alt": true,
  "code": "lst = eval(input())\nprint([x * x if x % 2 else x for x in lst])"
 },
 {
  "id": "pta-11-02",
  "lesson": 11,
  "tier": 5,
  "title": "PTA11.2 字符串字母大小写转换",
  "hint": "参考代码",
  "alt": false,
  "code": "s = input()\nprint(s[:-1].swapcase())"
 },
 {
  "id": "pta-11-02b",
  "lesson": 11,
  "tier": 5,
  "title": "PTA11.2 字符串字母大小写转换",
  "hint": "另一种写法",
  "alt": true,
  "code": "s = input()\nprint(\"\".join(c.swapcase() for c in s[:-1]))"
 },
 {
  "id": "pta-11-03",
  "lesson": 11,
  "tier": 5,
  "title": "PTA11.3 卡牌游戏1（列表方法做）",
  "hint": "参考代码",
  "alt": false,
  "code": "n = int(input())\nlist2 = []\nfor _ in range(n):\n    seq = input()\n    list1 = []\n    last = 0\n    for ch in seq:\n        p = last * 2 if ch == \"D\" else int(ch)\n        list1.append(p)\n        last = p\n    list2.append(sum(list1))\nm = min(list2)\nprint(\"min=\" + str(m))\nprint(\"no=\" + str(list2.index(m) + 1))"
 },
 {
  "id": "pta-11-03b",
  "lesson": 11,
  "tier": 5,
  "title": "PTA11.3 卡牌游戏1（列表方法做）",
  "hint": "另一种写法",
  "alt": true,
  "code": "n = int(input())\nbest, who = None, 0\nfor i in range(1, n + 1):\n    seq = input()\n    total, last = 0, 0\n    for ch in seq:\n        last = last * 2 if ch == \"D\" else int(ch)\n        total += last\n    if best is None or total < best:\n        best, who = total, i\nprint(\"min=\" + str(best))\nprint(\"no=\" + str(who))"
 },
 {
  "id": "pta-11-04",
  "lesson": 11,
  "tier": 5,
  "title": "PTA11.4 号码牌的制作",
  "hint": "参考代码",
  "alt": false,
  "code": "s = input()\nc, h, v, num = s[0], s[1], s[2], s[3:]\nprint(c + h * len(num) + c)\nprint(v + num + v)\nprint(c + h * len(num) + c)"
 },
 {
  "id": "pta-11-04b",
  "lesson": 11,
  "tier": 5,
  "title": "PTA11.4 号码牌的制作",
  "hint": "另一种写法",
  "alt": true,
  "code": "s = input()\nc, h, v, num = s[0], s[1], s[2], s[3:]\ntop = c + h * len(num) + c\nprint(top, v + num + v, top, sep=\"\\n\")"
 },
 {
  "id": "pta-11-05",
  "lesson": 11,
  "tier": 5,
  "title": "PTA11.5 敏感词过滤",
  "hint": "参考代码 · 中文字符串已译成英文（打字练习版，OJ 提交请用原题解）",
  "alt": false,
  "code": "s = input()\nfor w in [\"spam\", \"scam\", \"knockoff\", \"insider\", \"pirated\"]:\n    s = s.replace(w, \"*\")\nprint(s)"
 },
 {
  "id": "pta-11-05b",
  "lesson": 11,
  "tier": 5,
  "title": "PTA11.5 敏感词过滤",
  "hint": "另一种写法 · 中文字符串已译成英文（打字练习版，OJ 提交请用原题解）",
  "alt": true,
  "code": "import re\ns = input()\nprint(re.sub(\"spam|scam|knockoff|insider|pirated\", \"*\", s))"
 },
 {
  "id": "pta-11-06",
  "lesson": 11,
  "tier": 5,
  "title": "PTA11.6 删除一个数字能否整除7",
  "hint": "参考代码",
  "alt": false,
  "code": "s = input().strip()\nans = \"cannot find!\"\nfor i in range(len(s)):\n    t = s[:i] + s[i + 1:]\n    if t and int(t) % 7 == 0:\n        ans = t\n        break\nprint(ans)"
 },
 {
  "id": "pta-11-06b",
  "lesson": 11,
  "tier": 5,
  "title": "PTA11.6 删除一个数字能否整除7",
  "hint": "另一种写法",
  "alt": true,
  "code": "s = input().strip()\nfor i in range(len(s)):\n    t = \"\".join(c for j, c in enumerate(s) if j != i)\n    if t and int(t) % 7 == 0:\n        print(t)\n        break\nelse:\n    print(\"cannot find!\")"
 },
 {
  "id": "pta-11-07",
  "lesson": 11,
  "tier": 5,
  "title": "PTA11.7 求子串",
  "hint": "参考代码",
  "alt": false,
  "code": "line = input()\nk, s = line.split(\" \", 1)\nprint(s[:int(k)])"
 },
 {
  "id": "pta-11-07b",
  "lesson": 11,
  "tier": 5,
  "title": "PTA11.7 求子串",
  "hint": "另一种写法",
  "alt": true,
  "code": "line = input()\nk, _, s = line.partition(\" \")\nprint(s[:int(k)])"
 },
 {
  "id": "pta-11-08",
  "lesson": 11,
  "tier": 5,
  "title": "PTA11.8 字母塔",
  "hint": "参考代码",
  "alt": false,
  "code": "n = int(input())\nfor i in range(1, n + 1):\n    row = \" \" * (n - i)\n    row += \"\".join(chr(64 + j) for j in range(1, i + 1))\n    row += \"\".join(chr(64 + j) for j in range(i - 1, 0, -1))\n    print(row)"
 },
 {
  "id": "pta-11-08b",
  "lesson": 11,
  "tier": 5,
  "title": "PTA11.8 字母塔",
  "hint": "另一种写法",
  "alt": true,
  "code": "n = int(input())\nfor i in range(1, n + 1):\n    idx = list(range(i)) + list(range(i - 2, -1, -1))\n    print(\" \" * (n - i) + \"\".join(chr(65 + j) for j in idx))"
 },
 {
  "id": "pta-11-09",
  "lesson": 11,
  "tier": 5,
  "title": "PTA11.9 字符串中提取学号",
  "hint": "参考代码",
  "alt": false,
  "code": "s = input()\ni = s.find(\"(\")\nd = \"\"\nif i >= 0:\n    for ch in s[i + 1:]:\n        if ch.isdigit():\n            d += ch\n        else:\n            break\nprint(int(d) if d and int(d) > 0 else \"not find\")"
 },
 {
  "id": "pta-11-09b",
  "lesson": 11,
  "tier": 5,
  "title": "PTA11.9 字符串中提取学号",
  "hint": "另一种写法",
  "alt": true,
  "code": "import re\ns = input()\nm = re.search(r\"\\((\\d+)\", s)\nprint(int(m.group(1)) if m and int(m.group(1)) > 0 else \"not find\")"
 },
 {
  "id": "pta-11-10",
  "lesson": 11,
  "tier": 5,
  "title": "PTA11.10 A-B",
  "hint": "参考代码",
  "alt": false,
  "code": "a = input()\nb = set(input())\nprint(\"\".join(c for c in a if c not in b))"
 },
 {
  "id": "pta-11-10b",
  "lesson": 11,
  "tier": 5,
  "title": "PTA11.10 A-B",
  "hint": "另一种写法",
  "alt": true,
  "code": "a = input()\nb = input()\nprint(a.translate({ord(c): None for c in b}))"
 }
];
