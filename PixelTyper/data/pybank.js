/* 自动生成，勿手改 —— 源: data/build_pybank.py
   pybank.js：8 个实验 / 136 关，代码取自每题参考题解（同题有第二份同语言解法就再占一关） */
window.PY_MODULES = ["起步与输入输出", "流程控制", "数据容器", "函数与映射"];
window.PY_LESSONS = [
 {
  "no": 0,
  "mod": 0,
  "label": "实验0",
  "title": "新手入门",
  "src": "6 顺序语句 + 10 课本基础",
  "p": 16,
  "n": 16
 },
 {
  "no": 1,
  "mod": 0,
  "label": "实验一",
  "title": "变量、输入输出与顺序语句",
  "src": "7 例题 + 7 习题",
  "p": 14,
  "n": 14
 },
 {
  "no": 2,
  "mod": 1,
  "label": "实验二",
  "title": "判断语句",
  "src": "7 例题 + 9 习题",
  "p": 16,
  "n": 16
 },
 {
  "no": 3,
  "mod": 1,
  "label": "实验三",
  "title": "循环语句",
  "src": "9 例题 + 11 习题",
  "p": 20,
  "n": 20
 },
 {
  "no": 4,
  "mod": 2,
  "label": "实验四",
  "title": "数组与列表",
  "src": "9 例题 + 11 习题",
  "p": 20,
  "n": 20
 },
 {
  "no": 5,
  "mod": 2,
  "label": "实验五",
  "title": "字符串",
  "src": "7 例题 + 13 习题",
  "p": 20,
  "n": 20
 },
 {
  "no": 6,
  "mod": 3,
  "label": "实验六",
  "title": "元组、集合和字典",
  "src": "5 例题 + 5 习题",
  "p": 10,
  "n": 10
 },
 {
  "no": 7,
  "mod": 3,
  "label": "实验七",
  "title": "函数",
  "src": "8 例题 + 12 习题",
  "p": 20,
  "n": 20
 }
];
window.PY_SNIPPETS = [
 {
  "id": "pyq-0-01",
  "lesson": 0,
  "tier": 5,
  "title": "P01 A+B",
  "hint": "例题",
  "alt": false,
  "code": "import sys\ndata = sys.stdin.read().split()\nif data:\n    a, b = map(int, data[:2])\n    print(a + b)"
 },
 {
  "id": "pyq-0-02",
  "lesson": 0,
  "tier": 5,
  "title": "P02 简单乘积",
  "hint": "例题",
  "alt": false,
  "code": "import sys\ndata = sys.stdin.read().split()\na, b = int(data[0]), int(data[1])\nprint(f\"PROD = {a * b}\")"
 },
 {
  "id": "pyq-0-03",
  "lesson": 0,
  "tier": 5,
  "title": "P03 差",
  "hint": "例题",
  "alt": false,
  "code": "s = __import__('sys').stdin.read()\nnums = []\nfor tok in s.replace('\\r',' ').replace('\\n',' ').split(' '):\n    tok = tok.strip()\n    if tok:\n        try: nums.append(int(tok))\n        except: pass\na,b,c,d = nums[0], nums[1], nums[2], nums[3]\nprint(f\"DIFERENCA = {a * b - c * d}\")"
 },
 {
  "id": "pyq-0-04",
  "lesson": 0,
  "tier": 5,
  "title": "P04 圆的面积",
  "hint": "例题",
  "alt": false,
  "code": "r = float(input())\nprint(f\"A={3.14159 * r * r:.4f}\")"
 },
 {
  "id": "pyq-0-05",
  "lesson": 0,
  "tier": 5,
  "title": "P05 球的体积",
  "hint": "例题",
  "alt": false,
  "code": "import sys\ndata = sys.stdin.read().split()\nif data:\n    r = float(data[0])\n    v = (4.0 / 3.0) * 3.14159 * r ** 3\n    print(f\"VOLUME = {v:.3f}\")"
 },
 {
  "id": "pyq-0-06",
  "lesson": 0,
  "tier": 5,
  "title": "P06 燃料消耗",
  "hint": "例题",
  "alt": false,
  "code": "t = int(input())\nv = int(input())\nprint(f\"{t * v / 12:.3f}\")"
 },
 {
  "id": "pyq-0-07",
  "lesson": 0,
  "tier": 5,
  "title": "P07 名字的三种形式",
  "hint": "例题",
  "alt": false,
  "code": "s = input().strip()\nprint(s.lower())\nprint(s.upper())\nprint(s.title())"
 },
 {
  "id": "pyq-0-08",
  "lesson": 0,
  "tier": 5,
  "title": "P08 名单的首尾",
  "hint": "例题",
  "alt": false,
  "code": "a = input().split()\nprint(a[0].title())\nprint(a[-1].title())"
 },
 {
  "id": "pyq-0-09",
  "lesson": 0,
  "tier": 5,
  "title": "P09 收集摩托车",
  "hint": "例题",
  "alt": false,
  "code": "a = []\na.append(input())\na.append(input())\na.append(input())\nprint(a)"
 },
 {
  "id": "pyq-0-10",
  "lesson": 0,
  "tier": 5,
  "title": "P10 列表大扫除",
  "hint": "例题",
  "alt": false,
  "code": "a = input().split()\na.append(input())\nprint(a)\na.remove('ducati')\nprint(a)\na.pop()\nprint(a)\na.sort()\nprint(a)"
 },
 {
  "id": "pyq-0-11",
  "lesson": 0,
  "tier": 5,
  "title": "P11 名言",
  "hint": "例题",
  "alt": false,
  "code": "author = input()\nquote = input()\nprint(f'{author} once said, \"{quote}\"')"
 },
 {
  "id": "pyq-0-12",
  "lesson": 0,
  "tier": 5,
  "title": "P12 去除空白",
  "hint": "例题",
  "alt": false,
  "code": "s = input()\nprint(f\"[{s.lstrip()}]\")\nprint(f\"[{s.rstrip()}]\")\nprint(f\"[{s.strip()}]\")"
 },
 {
  "id": "pyq-0-13",
  "lesson": 0,
  "tier": 5,
  "title": "P13 嘉宾名单",
  "hint": "例题",
  "alt": false,
  "code": "print(f\"{input().title()}, please come to dinner.\")\nprint(f\"{input().title()}, please come to dinner.\")\nprint(f\"{input().title()}, please come to dinner.\")"
 },
 {
  "id": "pyq-0-14",
  "lesson": 0,
  "tier": 5,
  "title": "P14 放眼世界",
  "hint": "例题",
  "alt": false,
  "code": "a = input().split()\nprint(a)\nprint(sorted(a))\nprint(a)\nprint(sorted(a, reverse=True))\nprint(a)\na.reverse()\nprint(a)"
 },
 {
  "id": "pyq-0-15",
  "lesson": 0,
  "tier": 5,
  "title": "P15 嘉宾人数",
  "hint": "例题",
  "alt": false,
  "code": "a = input().split()\nprint(f\"I am inviting {len(a)} people to dinner.\")"
 },
 {
  "id": "pyq-0-16",
  "lesson": 0,
  "tier": 5,
  "title": "P16 最小数和它的位置",
  "hint": "例题",
  "alt": false,
  "code": "n = int(input())\na = list(map(int, input().split()))\nmn = min(a)\nprint(f\"Minimum value: {mn}\")\nprint(f\"Position: {a.index(mn)}\")"
 },
 {
  "id": "pyq-1-01",
  "lesson": 1,
  "tier": 5,
  "title": "P01 平均数1",
  "hint": "例题",
  "alt": false,
  "code": "import sys\ndata = sys.stdin.read().split()\nif data:\n    a = float(data[0])\n    b = float(data[1])\n    print(f\"MEDIA = {(a * 3.5 + b * 7.5) / 11:.5f}\")"
 },
 {
  "id": "pyq-1-02",
  "lesson": 1,
  "tier": 5,
  "title": "P02 工资",
  "hint": "例题",
  "alt": false,
  "code": "import sys\ndata = sys.stdin.read().split()\nif data:\n    n = int(data[0])\n    h = int(data[1])\n    m = float(data[2])\n    print(f\"NUMBER = {n}\")\n    print(f\"SALARY = U$ {h * m:.2f}\")"
 },
 {
  "id": "pyq-1-03",
  "lesson": 1,
  "tier": 5,
  "title": "P03 油耗",
  "hint": "例题",
  "alt": false,
  "code": "import sys\ndata = sys.stdin.read().split()\nif data:\n    x = float(data[0])\n    y = float(data[1])\n    print(f\"{x / y:.3f} km/l\")"
 },
 {
  "id": "pyq-1-04",
  "lesson": 1,
  "tier": 5,
  "title": "P04 两点间的距离",
  "hint": "例题",
  "alt": false,
  "code": "import sys\nimport math\ndata = sys.stdin.read().split()\nif data:\n    x1, y1, x2, y2 = map(float, data[:4])\n    d = math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)\n    print(f\"{d:.4f}\")"
 },
 {
  "id": "pyq-1-05",
  "lesson": 1,
  "tier": 5,
  "title": "P05 钞票",
  "hint": "例题",
  "alt": false,
  "code": "import sys\ndata = sys.stdin.read().split()\nif data:\n    n = int(data[0])\n    print(n)\n    for v in [100, 50, 20, 10, 5, 2, 1]:\n        print(f\"{n // v} nota(s) de R$ {v},00\")\n        n %= v"
 },
 {
  "id": "pyq-1-06",
  "lesson": 1,
  "tier": 5,
  "title": "P06 时间转换",
  "hint": "例题",
  "alt": false,
  "code": "import sys\ndata = sys.stdin.read().split()\nif data:\n    n = int(data[0])\n    h = n // 3600\n    m = n % 3600 // 60\n    s = n % 60\n    print(f\"{h}:{m}:{s}\")"
 },
 {
  "id": "pyq-1-07",
  "lesson": 1,
  "tier": 5,
  "title": "P07 天数转换",
  "hint": "例题",
  "alt": false,
  "code": "n=int(input())\ny=n//365;n%=365;m=n//30;d=n%30\nprint(f\"{y} ano(s)\")\nprint(f\"{m} mes(es)\")\nprint(f\"{d} dia(s)\")"
 },
 {
  "id": "pyq-1-08",
  "lesson": 1,
  "tier": 5,
  "title": "T01 简单计算",
  "hint": "习题",
  "alt": false,
  "code": "import sys\ndata = sys.stdin.read().split()\nc, q, p = int(data[0]), int(data[1]), float(data[2])\nprint(f\"VALOR A PAGAR: R$ {q * p:.2f}\")"
 },
 {
  "id": "pyq-1-09",
  "lesson": 1,
  "tier": 5,
  "title": "T02 面积",
  "hint": "习题",
  "alt": false,
  "code": "import sys\ndata = sys.stdin.read().split()\nif data:\n    a, b, c = map(float, data[:3])\n    print(f\"TRIANGULO: {a * c / 2:.3f}\")\n    print(f\"CIRCULO: {3.14159 * c * c:.3f}\")\n    print(f\"TRAPEZIO: {(a + b) * c / 2:.3f}\")\n    print(f\"QUADRADO: {b * b:.3f}\")\n    print(f\"RETANGULO: {a * b:.3f}\")"
 },
 {
  "id": "pyq-1-10",
  "lesson": 1,
  "tier": 5,
  "title": "T03 平均数2",
  "hint": "习题",
  "alt": false,
  "code": "a=float(input());b=float(input());c=float(input())\nprint(f\"MEDIA = {(a*2+b*3+c*5)/10:.1f}\")"
 },
 {
  "id": "pyq-1-11",
  "lesson": 1,
  "tier": 5,
  "title": "T04 工资和奖金",
  "hint": "习题",
  "alt": false,
  "code": "name = input().strip()\nsalary = float(input())\nsales = float(input())\nprint(f\"TOTAL = R$ {salary + sales * 0.15:.2f}\")"
 },
 {
  "id": "pyq-1-12",
  "lesson": 1,
  "tier": 5,
  "title": "T05 最大值",
  "hint": "习题",
  "alt": false,
  "code": "import sys\ndata = sys.stdin.read().split()\nif data:\n    a, b, c = map(int, data[:3])\n    mx = max(a, b, c)\n    print(f\"{mx} eh o maior\")"
 },
 {
  "id": "pyq-1-13",
  "lesson": 1,
  "tier": 5,
  "title": "T06 距离",
  "hint": "习题",
  "alt": false,
  "code": "L = int(input())\nprint(f\"{L * 2} minutos\")"
 },
 {
  "id": "pyq-1-14",
  "lesson": 1,
  "tier": 5,
  "title": "T07 钞票和硬币",
  "hint": "习题",
  "alt": false,
  "code": "n = float(input())\nn = int(n * 100 + 0.5)\nprint(\"NOTAS:\")\nfor v in [10000, 5000, 2000, 1000, 500, 200]:\n    print(f\"{n // v} nota(s) de R$ {v / 100:.2f}\")\n    n %= v\nprint(\"MOEDAS:\")\nfor v in [100, 50, 25, 10, 5, 1]:\n    print(f\"{n // v} moeda(s) de R$ {v / 100:.2f}\")\n    n %= v"
 },
 {
  "id": "pyq-2-01",
  "lesson": 2,
  "tier": 5,
  "title": "P01 倍数",
  "hint": "例题",
  "alt": false,
  "code": "a, b = map(int, input().split())\nif a % b == 0 or b % a == 0:\n    print(\"Sao Multiplos\")\nelse:\n    print(\"Nao sao Multiplos\")"
 },
 {
  "id": "pyq-2-02",
  "lesson": 2,
  "tier": 5,
  "title": "P02 零食",
  "hint": "例题",
  "alt": false,
  "code": "prices = {1: 4.0, 2: 4.5, 3: 5.0, 4: 2.0, 5: 1.5}\nx, y = map(int, input().split())\nprint(f\"Total: R$ {prices[x] * y:.2f}\")"
 },
 {
  "id": "pyq-2-03",
  "lesson": 2,
  "tier": 5,
  "title": "P03 区间",
  "hint": "例题",
  "alt": false,
  "code": "x = float(input())\nif 0 <= x <= 25:\n    print(\"Intervalo [0,25]\")\nelif 25 < x <= 50:\n    print(\"Intervalo (25,50]\")\nelif 50 < x <= 75:\n    print(\"Intervalo (50,75]\")\nelif 75 < x <= 100:\n    print(\"Intervalo (75,100]\")\nelse:\n    print(\"Fora de intervalo\")"
 },
 {
  "id": "pyq-2-04",
  "lesson": 2,
  "tier": 5,
  "title": "P04 三角形",
  "hint": "例题",
  "alt": false,
  "code": "a, b, c = map(float, input().split())\nif a + b > c and a + c > b and b + c > a:\n    print(f\"Perimetro = {a + b + c:.1f}\")\nelse:\n    print(f\"Area = {(a + b) * c / 2:.1f}\")"
 },
 {
  "id": "pyq-2-05",
  "lesson": 2,
  "tier": 5,
  "title": "P05 游戏时间",
  "hint": "例题",
  "alt": false,
  "code": "a, b = map(int, input().split())\nif a < b:\n    horas = b - a\nelse:\n    horas = 24 - a + b\nprint(f\"O JOGO DUROU {horas} HORA(S)\")"
 },
 {
  "id": "pyq-2-06",
  "lesson": 2,
  "tier": 5,
  "title": "P06 加薪",
  "hint": "例题",
  "alt": false,
  "code": "s = float(input())\nif s <= 400: p = 15\nelif s <= 800: p = 12\nelif s <= 1200: p = 10\nelif s <= 2000: p = 7\nelse: p = 4\nr = s * p / 100\nprint(f\"Novo salario: {s + r:.2f}\")\nprint(f\"Reajuste ganho: {r:.2f}\")\nprint(f\"Em percentual: {p} %\")"
 },
 {
  "id": "pyq-2-07",
  "lesson": 2,
  "tier": 5,
  "title": "P07 动物",
  "hint": "例题",
  "alt": false,
  "code": "import sys\na, b, c = sys.stdin.read().split()\nif a == \"vertebrado\":\n    if b == \"ave\":\n        print(\"aguia\" if c == \"carnivoro\" else \"pomba\")\n    else:\n        print(\"homem\" if c == \"onivoro\" else \"vaca\")\nelse:\n    if b == \"inseto\":\n        print(\"pulga\" if c == \"hematofago\" else \"lagarta\")\n    else:\n        print(\"sanguessuga\" if c == \"hematofago\" else \"minhoca\")"
 },
 {
  "id": "pyq-2-08",
  "lesson": 2,
  "tier": 5,
  "title": "T01 选择练习1",
  "hint": "习题",
  "alt": false,
  "code": "a, b, c, d = map(int, input().split())\nif b > c and d > a and c + d > a + b and c > 0 and d > 0 and a % 2 == 0:\n    print(\"Valores aceitos\")\nelse:\n    print(\"Valores nao aceitos\")"
 },
 {
  "id": "pyq-2-09",
  "lesson": 2,
  "tier": 5,
  "title": "T02 DDD",
  "hint": "习题",
  "alt": false,
  "code": "ddd = {61:\"Brasilia\",71:\"Salvador\",11:\"Sao Paulo\",21:\"Rio de Janeiro\",32:\"Juiz de Fora\",19:\"Campinas\",27:\"Vitoria\",31:\"Belo Horizonte\"}\nx = int(input())\nprint(ddd.get(x, \"DDD nao cadastrado\"))"
 },
 {
  "id": "pyq-2-10",
  "lesson": 2,
  "tier": 5,
  "title": "T03 点的坐标",
  "hint": "习题",
  "alt": false,
  "code": "x, y = map(float, input().split())\nif x > 0 and y > 0: print(\"Q1\")\nelif x < 0 and y > 0: print(\"Q2\")\nelif x < 0 and y < 0: print(\"Q3\")\nelif x > 0 and y < 0: print(\"Q4\")\nelif x == 0 and y == 0: print(\"Origem\")\nelif x == 0: print(\"Eixo Y\")\nelse: print(\"Eixo X\")"
 },
 {
  "id": "pyq-2-11",
  "lesson": 2,
  "tier": 5,
  "title": "T04 三角形类型",
  "hint": "习题",
  "alt": false,
  "code": "a, b, c = sorted(map(float, input().split()), reverse=True)\nif a >= b + c:\n    print(\"NAO FORMA TRIANGULO\")\nelse:\n    if a*a == b*b + c*c: print(\"TRIANGULO RETANGULO\")\n    if a*a > b*b + c*c: print(\"TRIANGULO OBTUSANGULO\")\n    if a*a < b*b + c*c: print(\"TRIANGULO ACUTANGULO\")\n    if a == b == c: print(\"TRIANGULO EQUILATERO\")\n    elif a == b or b == c or a == c: print(\"TRIANGULO ISOSCELES\")"
 },
 {
  "id": "pyq-2-12",
  "lesson": 2,
  "tier": 5,
  "title": "T05 游戏时间2",
  "hint": "习题",
  "alt": false,
  "code": "a, b, c, d = map(int, input().split())\ns = a * 60 + b\ne = c * 60 + d\nif e <= s: e += 24 * 60\nd = e - s\nprint(f\"O JOGO DUROU {d // 60} HORA(S) E {d % 60} MINUTO(S)\")"
 },
 {
  "id": "pyq-2-13",
  "lesson": 2,
  "tier": 5,
  "title": "T06 税",
  "hint": "习题",
  "alt": false,
  "code": "x = float(input())\nif x <= 2000:\n    print(\"Isento\")\nelse:\n    x -= 2000\n    t = 0\n    if x > 0:\n        v = min(x, 1000)\n        t += v * 0.08\n        x -= v\n    if x > 0:\n        v = min(x, 1500)\n        t += v * 0.18\n        x -= v\n    if x > 0:\n        t += x * 0.28\n    print(f\"R$ {t:.2f}\")"
 },
 {
  "id": "pyq-2-14",
  "lesson": 2,
  "tier": 5,
  "title": "T07 简单排序",
  "hint": "习题",
  "alt": false,
  "code": "a,b,c=map(int,input().split())\nfor x in sorted([a,b,c]): print(x)\nprint()\nfor x in [a,b,c]: print(x)"
 },
 {
  "id": "pyq-2-15",
  "lesson": 2,
  "tier": 5,
  "title": "T08 一元二次方程公式",
  "hint": "习题",
  "alt": false,
  "code": "import math\na, b, c = map(float, input().split())\nd = b * b - 4 * a * c\nif a == 0:\n    print(\"Impossivel calcular\")\nelif d < 0:\n    re = -b / (2 * a)\n    im = math.sqrt(-d) / (2 * a)\n    print(f\"x1={re:.5f}+{im:.5f}i;x2={re:.5f}-{im:.5f}i\")\nelse:\n    r1 = (-b + math.sqrt(d)) / (2 * a)\n    r2 = (-b - math.sqrt(d)) / (2 * a)\n    print(f\"x1={max(r1, r2):.5f};x2={min(r1, r2):.5f}\")"
 },
 {
  "id": "pyq-2-16",
  "lesson": 2,
  "tier": 5,
  "title": "T09 平均数3",
  "hint": "习题",
  "alt": false,
  "code": "import sys\nnums = list(map(float, sys.stdin.read().split()))\nn1, n2, n3, n4 = nums[:4]\nmedia = (n1 * 2 + n2 * 3 + n3 * 4 + n4) / 10\nprint(f\"Media: {media:.1f}\")\nif media >= 7.0:\n    print(\"Aluno aprovado.\")\nelif media < 5.0:\n    print(\"Aluno reprovado.\")\nelse:\n    print(\"Aluno em exame.\")\n    ne = nums[4]\n    print(f\"Nota do exame: {ne:.1f}\")\n    media = (media + ne) / 2\n    print(\"Aluno aprovado.\" if media >= 5.0 else \"Aluno reprovado.\")\n    print(f\"Media final: {media:.1f}\")"
 },
 {
  "id": "pyq-3-01",
  "lesson": 3,
  "tier": 5,
  "title": "P01 偶数",
  "hint": "例题",
  "alt": false,
  "code": "for i in range(2, 101, 2):\n    print(i)"
 },
 {
  "id": "pyq-3-02",
  "lesson": 3,
  "tier": 5,
  "title": "P02 奇数",
  "hint": "例题",
  "alt": false,
  "code": "x = int(input())\nfor i in range(1, x + 1, 2):\n    print(i)"
 },
 {
  "id": "pyq-3-03",
  "lesson": 3,
  "tier": 5,
  "title": "P03 正数",
  "hint": "例题",
  "alt": false,
  "code": "import sys\nnums = list(map(float, sys.stdin.read().split()))\ncnt = sum(1 for x in nums if x > 0)\nprint(f\"{cnt} positive numbers\")"
 },
 {
  "id": "pyq-3-04",
  "lesson": 3,
  "tier": 5,
  "title": "P04 连续奇数的和1",
  "hint": "例题",
  "alt": false,
  "code": "x, y = map(int, input().split())\nif x > y: x, y = y, x\nprint(sum(i for i in range(x + 1, y) if i % 2))"
 },
 {
  "id": "pyq-3-05",
  "lesson": 3,
  "tier": 5,
  "title": "P05 最大数和它的位置",
  "hint": "例题",
  "alt": false,
  "code": "import sys\ndata = list(map(int, sys.stdin.read().split()))\nn = data[0]\nvals = data[1:n+1]\nmx = max(vals)\npos = vals.index(mx) + 1\nprint(mx)\nprint(pos)"
 },
 {
  "id": "pyq-3-06",
  "lesson": 3,
  "tier": 5,
  "title": "P06 递增序列",
  "hint": "例题",
  "alt": false,
  "code": "while True:\n    x = int(input())\n    if x == 0: break\n    print(' '.join(str(i) for i in range(1, x + 1)))"
 },
 {
  "id": "pyq-3-07",
  "lesson": 3,
  "tier": 5,
  "title": "P07 连续整数相加",
  "hint": "例题",
  "alt": false,
  "code": "a = int(input())\nwhile True:\n    for n in map(int, input().split()):\n        if n > 0: break\n    if n > 0: break\nprint(sum(a + i for i in range(n)))"
 },
 {
  "id": "pyq-3-08",
  "lesson": 3,
  "tier": 5,
  "title": "P08 约数",
  "hint": "例题",
  "alt": false,
  "code": "n = int(input())\nfor i in range(1, n + 1):\n    if n % i == 0:\n        print(i)"
 },
 {
  "id": "pyq-3-09",
  "lesson": 3,
  "tier": 5,
  "title": "P09 PUM",
  "hint": "例题",
  "alt": false,
  "code": "n, m = map(int, input().split())\nfor i in range(1, n * m + 1):\n    if i % m == 0:\n        print(\"PUM\")\n    else:\n        print(i, end=' ')"
 },
 {
  "id": "pyq-3-10",
  "lesson": 3,
  "tier": 5,
  "title": "T01 余数",
  "hint": "习题",
  "alt": false,
  "code": "n = int(input())\nfor i in range(1, 10001):\n    if i % n == 2:\n        print(i)"
 },
 {
  "id": "pyq-3-11",
  "lesson": 3,
  "tier": 5,
  "title": "T02 六个奇数",
  "hint": "习题",
  "alt": false,
  "code": "x = int(input())\nif x % 2 == 0:\n    x += 1\nfor _ in range(6):\n    print(x)\n    x += 2"
 },
 {
  "id": "pyq-3-12",
  "lesson": 3,
  "tier": 5,
  "title": "T03 乘法表",
  "hint": "习题",
  "alt": false,
  "code": "import sys\nn = int(sys.stdin.read().strip())\nfor i in range(1, 11):\n    print(f\"{i} x {n} = {i * n}\")"
 },
 {
  "id": "pyq-3-13",
  "lesson": 3,
  "tier": 5,
  "title": "T04 实验",
  "hint": "习题",
  "alt": false,
  "code": "import sys\ndata = sys.stdin.read().split()\nn = int(data[0])\nc = r = f = 0\nidx = 1\nfor _ in range(n):\n    k = int(data[idx]); t = data[idx + 1]\n    idx += 2\n    if t == 'C': c += k\n    elif t == 'R': r += k\n    else: f += k\ns = c + r + f\nprint(f\"Total: {s} animals\")\nprint(f\"Total coneys: {c}\")\nprint(f\"Total rats: {r}\")\nprint(f\"Total frogs: {f}\")\nprint(f\"Percentage of coneys: {c / s * 100:.2f} %\")\nprint(f\"Percentage of rats: {r / s * 100:.2f} %\")\nprint(f\"Percentage of frogs: {f / s * 100:.2f} %\")"
 },
 {
  "id": "pyq-3-14",
  "lesson": 3,
  "tier": 5,
  "title": "T05 区间2",
  "hint": "习题",
  "alt": false,
  "code": "n = int(input())\nin_cnt = sum(1 for _ in range(n) if 10 <= int(input()) <= 20)\nprint(f\"{in_cnt} in\")\nprint(f\"{n - in_cnt} out\")"
 },
 {
  "id": "pyq-3-15",
  "lesson": 3,
  "tier": 5,
  "title": "T06 连续奇数的和2",
  "hint": "习题",
  "alt": false,
  "code": "n = int(input())\nfor _ in range(n):\n    x, y = map(int, input().split())\n    if x > y:\n        x, y = y, x\n    s = 0\n    for i in range(x + 1 + ((x + 1) % 2 == 0), y, 2):\n        s += i\n    print(s)"
 },
 {
  "id": "pyq-3-16",
  "lesson": 3,
  "tier": 5,
  "title": "T07 简单斐波那契",
  "hint": "习题",
  "alt": false,
  "code": "n = int(input())\na, b = 0, 1\nfor _ in range(n):\n    a, b = b, a + b\nprint(a)"
 },
 {
  "id": "pyq-3-17",
  "lesson": 3,
  "tier": 5,
  "title": "T08 数字序列和它的和",
  "hint": "习题",
  "alt": false,
  "code": "while True:\n    m, n = map(int, input().split())\n    if m <= 0 or n <= 0: break\n    if m > n: m, n = n, m\n    nums = range(m, n + 1)\n    print(' '.join(map(str, nums)), f\"Sum={sum(nums)}\")"
 },
 {
  "id": "pyq-3-18",
  "lesson": 3,
  "tier": 5,
  "title": "T09 完全数",
  "hint": "习题",
  "alt": false,
  "code": "n = int(input())\n# All perfect numbers up to 10^8: 6, 28, 496, 8128, 33550336\nperfect = [6, 28, 496, 8128, 33550336]\nfor p in perfect:\n    if p <= n:\n        print(p)"
 },
 {
  "id": "pyq-3-19",
  "lesson": 3,
  "tier": 5,
  "title": "T10 质数",
  "hint": "习题",
  "alt": false,
  "code": "import math\nn = int(input())\nfor i in range(2, n + 1):\n    prime = True\n    for j in range(2, int(math.sqrt(i)) + 1):\n        if i % j == 0:\n            prime = False\n            break\n    if prime:\n        print(i)"
 },
 {
  "id": "pyq-3-20",
  "lesson": 3,
  "tier": 5,
  "title": "T11 菱形",
  "hint": "习题",
  "alt": false,
  "code": "import sys\nn = int(sys.stdin.read().split()[0])\ncx = cy = n // 2\nfor i in range(n):\n    row = []\n    for j in range(n):\n        if abs(i-cx) + abs(j-cy) <= n//2: row.append('*')\n        else: row.append(' ')\n    print(''.join(row))"
 },
 {
  "id": "pyq-4-01",
  "lesson": 4,
  "tier": 5,
  "title": "P01 数组替换",
  "hint": "例题",
  "alt": false,
  "code": "for i in range(10):\n    x = int(input())\n    if x <= 0: x = 1\n    print(f\"X[{i}] = {x}\")"
 },
 {
  "id": "pyq-4-02",
  "lesson": 4,
  "tier": 5,
  "title": "P02 数组填充",
  "hint": "例题",
  "alt": false,
  "code": "v = int(input())\nfor i in range(10):\n    print(f\"N[{i}] = {v}\")\n    v *= 2"
 },
 {
  "id": "pyq-4-03",
  "lesson": 4,
  "tier": 5,
  "title": "P03 数组选择",
  "hint": "例题",
  "alt": false,
  "code": "for i in range(100):\n    x = float(input())\n    if x <= 10:\n        print(f\"A[{i}] = {x:.1f}\")"
 },
 {
  "id": "pyq-4-04",
  "lesson": 4,
  "tier": 5,
  "title": "P04 数组中的行",
  "hint": "例题",
  "alt": false,
  "code": "import sys\ndata = sys.stdin.read().split()\nl = int(data[0])\nt = data[1]\ns = 0.0\nidx = 2\nfor i in range(12):\n    for j in range(12):\n        x = float(data[idx])\n        idx += 1\n        if i == l:\n            s += x\nprint(f\"{s if t == 'S' else s / 12:.1f}\")"
 },
 {
  "id": "pyq-4-05",
  "lesson": 4,
  "tier": 5,
  "title": "P05 数组的右上半部分",
  "hint": "例题",
  "alt": false,
  "code": "import sys\ndata = sys.stdin.read().split()\nt = data[0]\ns = 0.0\nidx = 1\nfor i in range(12):\n    for j in range(12):\n        x = float(data[idx])\n        idx += 1\n        if j > i:\n            s += x\nprint(f\"{s if t == 'S' else s / 66:.1f}\")"
 },
 {
  "id": "pyq-4-06",
  "lesson": 4,
  "tier": 5,
  "title": "P06 数组的左上半部分",
  "hint": "例题",
  "alt": false,
  "code": "t=input().strip()\ns=0\nfor i in range(12):\n    row=list(map(float,input().split()))\n    for j in range(12):\n        if j<11-i: s+=row[j]\nprint(f\"{s:.1f}\" if t==\"S\" else f\"{s/66:.1f}\")"
 },
 {
  "id": "pyq-4-07",
  "lesson": 4,
  "tier": 5,
  "title": "P07 数组的上方区域",
  "hint": "例题",
  "alt": false,
  "code": "t=input().strip()\ns=c=0\nfor i in range(12):\n    row=list(map(float,input().split()))\n    for j in range(12):\n        if i<j and i+j<11: s+=row[j]; c+=1\nprint(f\"{s:.1f}\" if t==\"S\" else f\"{s/c:.1f}\")"
 },
 {
  "id": "pyq-4-08",
  "lesson": 4,
  "tier": 5,
  "title": "P08 数组的左方区域",
  "hint": "例题",
  "alt": false,
  "code": "t=input().strip()\ns=c=0\nfor i in range(12):\n    row=list(map(float,input().split()))\n    for j in range(12):\n        if j<i and i+j<11: s+=row[j]; c+=1\nprint(f\"{s:.1f}\" if t==\"S\" else f\"{s/c:.1f}\")"
 },
 {
  "id": "pyq-4-09",
  "lesson": 4,
  "tier": 5,
  "title": "P09 平方矩阵I",
  "hint": "例题",
  "alt": false,
  "code": "while True:\n    n=int(input())\n    if n==0: break\n    for i in range(n):\n        print(\" \".join(str(min(i+1,j+1,n-i,n-j)) for j in range(n)))\n    print()"
 },
 {
  "id": "pyq-4-10",
  "lesson": 4,
  "tier": 5,
  "title": "T01 数组变换",
  "hint": "习题",
  "alt": false,
  "code": "arr = [int(input()) for _ in range(20)]\narr.reverse()\nfor i, v in enumerate(arr):\n    print(f\"N[{i}] = {v}\")"
 },
 {
  "id": "pyq-4-11",
  "lesson": 4,
  "tier": 5,
  "title": "T02 斐波那契数列",
  "hint": "习题",
  "alt": false,
  "code": "import sys\ndata=sys.stdin.read().split()\nt=int(data[0])\nfib=[0,1]\nfor i in range(2,65): fib.append(fib[-1]+fib[-2])\nfor n in map(int,data[1:1+t]):\n    print(f\"Fib({n}) = {fib[n]}\")"
 },
 {
  "id": "pyq-4-12",
  "lesson": 4,
  "tier": 5,
  "title": "T03 最小数和它的位置",
  "hint": "习题",
  "alt": false,
  "code": "import sys\ndata=sys.stdin.read().split()\nn=int(data[0])\na=list(map(int,data[1:1+n]))\nmn=min(a)\nprint(f\"Minimum value: {mn}\")\nprint(f\"Position: {a.index(mn)}\")"
 },
 {
  "id": "pyq-4-13",
  "lesson": 4,
  "tier": 5,
  "title": "T04 数组中的列",
  "hint": "习题",
  "alt": false,
  "code": "import sys\ndata = sys.stdin.read().split()\nc = int(data[0])\nt = data[1]\ns = 0.0\nidx = 2\nfor i in range(12):\n    for j in range(12):\n        x = float(data[idx])\n        idx += 1\n        if j == c:\n            s += x\nprint(f\"{s if t == 'S' else s / 12:.1f}\")"
 },
 {
  "id": "pyq-4-14",
  "lesson": 4,
  "tier": 5,
  "title": "T05 数组的右下半部分",
  "hint": "习题",
  "alt": false,
  "code": "import sys\ndata = sys.stdin.read().split()\nt = data[0]\ns = 0.0\nidx = 1\nfor i in range(12):\n    for j in range(12):\n        x = float(data[idx]); idx += 1\n        if i + j > 11: s += x\nprint(f\"{s:.1f}\" if t == 'S' else f\"{s/66:.1f}\")"
 },
 {
  "id": "pyq-4-15",
  "lesson": 4,
  "tier": 5,
  "title": "T06 数组的左下半部分",
  "hint": "习题",
  "alt": false,
  "code": "t=input().strip()\ns=0\nfor i in range(12):\n    row=list(map(float,input().split()))\n    for j in range(12):\n        if j<i: s+=row[j]\nprint(f\"{s:.1f}\" if t==\"S\" else f\"{s/66:.1f}\")"
 },
 {
  "id": "pyq-4-16",
  "lesson": 4,
  "tier": 5,
  "title": "T07 数组的下方区域",
  "hint": "习题",
  "alt": false,
  "code": "import sys\ndata = sys.stdin.read().split()\nt = data[0]\ns = 0.0\nidx = 1\nfor i in range(12):\n    for j in range(12):\n        x = float(data[idx]); idx += 1\n        if i > j and i + j > 11: s += x\nprint(f\"{s:.1f}\" if t == 'S' else f\"{s/30:.1f}\")"
 },
 {
  "id": "pyq-4-17",
  "lesson": 4,
  "tier": 5,
  "title": "T08 数组的右方区域",
  "hint": "习题",
  "alt": false,
  "code": "import sys\ndata = sys.stdin.read().split()\nt = data[0]\ns = 0.0\nidx = 1\nfor i in range(12):\n    for j in range(12):\n        x = float(data[idx]); idx += 1\n        if j > i and i + j > 11: s += x\nprint(f\"{s:.1f}\" if t == 'S' else f\"{s/30:.1f}\")"
 },
 {
  "id": "pyq-4-18",
  "lesson": 4,
  "tier": 5,
  "title": "T09 平方矩阵II",
  "hint": "习题",
  "alt": false,
  "code": "while True:\n    n=int(input())\n    if n==0: break\n    for i in range(n):\n        print(\" \".join(str(abs(i-j)+1) for j in range(n)))\n    print()"
 },
 {
  "id": "pyq-4-19",
  "lesson": 4,
  "tier": 5,
  "title": "T10 平方矩阵III",
  "hint": "习题",
  "alt": false,
  "code": "import sys\ndata = sys.stdin.read().split()\nfor val in data:\n    n = int(val)\n    if n == 0: break\n    for i in range(n):\n        row = []\n        for j in range(n):\n            v = 1\n            for k in range(i + j):\n                v *= 2\n            row.append(str(v))\n        print(' '.join(row) + ' ')\n    print()"
 },
 {
  "id": "pyq-4-20",
  "lesson": 4,
  "tier": 5,
  "title": "T11 蛇形矩阵",
  "hint": "习题",
  "alt": false,
  "code": "import sys\ndata = sys.stdin.read().split()\nn, m = int(data[0]), int(data[1])\na = [[0] * m for _ in range(n)]\ndx = [0, 1, 0, -1]\ndy = [1, 0, -1, 0]\nd = x = y = 0\nfor v in range(1, n * m + 1):\n    a[x][y] = v\n    nx, ny = x + dx[d], y + dy[d]\n    if nx < 0 or nx >= n or ny < 0 or ny >= m or a[nx][ny]:\n        d = (d + 1) % 4\n        nx, ny = x + dx[d], y + dy[d]\n    x, y = nx, ny\nfor r in a:\n    print(' '.join(map(str, r)) + ' ')"
 },
 {
  "id": "pyq-5-01",
  "lesson": 5,
  "tier": 5,
  "title": "P01 字符串长度",
  "hint": "例题",
  "alt": false,
  "code": "print(len(input()))"
 },
 {
  "id": "pyq-5-02",
  "lesson": 5,
  "tier": 5,
  "title": "P02 字符串中的数字个数",
  "hint": "例题",
  "alt": false,
  "code": "s = input()\nprint(sum(1 for c in s if c.isdigit()))"
 },
 {
  "id": "pyq-5-03",
  "lesson": 5,
  "tier": 5,
  "title": "P03 循环相克令",
  "hint": "例题",
  "alt": false,
  "code": "import sys\ndata=sys.stdin.read().split()\nt=int(data[0])\nres=[];idx=1\nr={(\"Hunter\",\"Gun\"):\"Player1\",(\"Gun\",\"Bear\"):\"Player1\",(\"Bear\",\"Hunter\"):\"Player1\",(\"Gun\",\"Hunter\"):\"Player2\",(\"Bear\",\"Gun\"):\"Player2\",(\"Hunter\",\"Bear\"):\"Player2\"}\nfor _ in range(t):\n    p1,p2=data[idx],data[idx+1];idx+=2\n    res.append(\"Tie\" if p1==p2 else r[(p1,p2)])\nprint(\"\\n\".join(res))"
 },
 {
  "id": "pyq-5-04",
  "lesson": 5,
  "tier": 5,
  "title": "P04 字符串加空格",
  "hint": "例题",
  "alt": false,
  "code": "print(\" \".join(input()))"
 },
 {
  "id": "pyq-5-05",
  "lesson": 5,
  "tier": 5,
  "title": "P05 替换字符",
  "hint": "例题",
  "alt": false,
  "code": "s = input()\nc = input()\nprint(s.replace(c, \"#\"))"
 },
 {
  "id": "pyq-5-06",
  "lesson": 5,
  "tier": 5,
  "title": "P06 字符串插入",
  "hint": "例题",
  "alt": false,
  "code": "import sys\ndata = sys.stdin.read().split()\nfor i in range(0, len(data) - 1, 2):\n    a, b = data[i], data[i + 1]\n    p = 0\n    for j in range(len(a)):\n        if a[j] > a[p]:\n            p = j\n    print(a[:p + 1] + b + a[p + 1:])"
 },
 {
  "id": "pyq-5-07",
  "lesson": 5,
  "tier": 5,
  "title": "P07 只出现一次的字符",
  "hint": "例题",
  "alt": false,
  "code": "s = input()\nfrom collections import Counter\ncnt = Counter(s)\nfor c in s:\n    if cnt[c] == 1:\n        print(c)\n        break\nelse:\n    print(\"no\")"
 },
 {
  "id": "pyq-5-08",
  "lesson": 5,
  "tier": 5,
  "title": "T01 字符串匹配",
  "hint": "习题",
  "alt": false,
  "code": "import sys\nlines = sys.stdin.read().splitlines()\na = lines[0] if len(lines) > 0 else ''\nb = lines[1] if len(lines) > 1 else ''\nprint(\"yes\" if b in a else \"no\")"
 },
 {
  "id": "pyq-5-09",
  "lesson": 5,
  "tier": 5,
  "title": "T02 忽略大小写比较字符串大小",
  "hint": "习题",
  "alt": false,
  "code": "a=input();b=input()\na=a.lower();b=b.lower()\nif a<b: print(\"<\")\nelif a>b: print(\">\")\nelse: print(\"=\")"
 },
 {
  "id": "pyq-5-10",
  "lesson": 5,
  "tier": 5,
  "title": "T03 去掉多余的空格",
  "hint": "习题",
  "alt": false,
  "code": "import sys,re\ns=sys.stdin.read()\nprint(re.sub(r\"\\s+\",\" \",s).strip())"
 },
 {
  "id": "pyq-5-11",
  "lesson": 5,
  "tier": 5,
  "title": "T04 信息加密",
  "hint": "习题",
  "alt": false,
  "code": "r = []\nfor c in input():\n    if \"a\" <= c <= \"z\":\n        r.append(chr((ord(c) - 97 + 1) % 26 + 97))\n    elif \"A\" <= c <= \"Z\":\n        r.append(chr((ord(c) - 65 + 1) % 26 + 65))\n    elif \"0\" <= c <= \"9\":\n        r.append(chr((ord(c) - 48 + 1) % 10 + 48))\n    else:\n        r.append(c)\nprint(\"\".join(r))"
 },
 {
  "id": "pyq-5-12",
  "lesson": 5,
  "tier": 5,
  "title": "T05 输出字符串",
  "hint": "习题",
  "alt": false,
  "code": "import sys\ns = sys.stdin.read().rstrip('\\n')\nn = len(s)\nresult = ''.join(chr(ord(s[i]) + ord(s[(i+1) % n])) for i in range(n))\nprint(result)"
 },
 {
  "id": "pyq-5-13",
  "lesson": 5,
  "tier": 5,
  "title": "T06 单词替换",
  "hint": "习题",
  "alt": false,
  "code": "import sys\nlines = sys.stdin.read().splitlines()\ns = lines[0] if len(lines) > 0 else ''\na = lines[1] if len(lines) > 1 else ''\nb = lines[2] if len(lines) > 2 else ''\nwords = s.split()\nresult = ' '.join(b if w == a else w for w in words)\nprint(result)"
 },
 {
  "id": "pyq-5-14",
  "lesson": 5,
  "tier": 5,
  "title": "T07 字符串中最长的连续出现的字符",
  "hint": "习题",
  "alt": false,
  "code": "import sys\ndata=sys.stdin.read().split()\nn=int(data[0])\nfor s in data[1:1+n]:\n    mx=1;mc=s[0];cur=1\n    for i in range(1,len(s)):\n        if s[i]==s[i-1]: cur+=1\n        else: cur=1\n        if cur>mx: mx=cur;mc=s[i]\n    print(mc,mx)"
 },
 {
  "id": "pyq-5-15",
  "lesson": 5,
  "tier": 5,
  "title": "T08 最长单词",
  "hint": "习题",
  "alt": false,
  "code": "s = input()\nwords = s.split()\nwords[-1] = words[-1].rstrip('.')\nprint(max(words, key=len))"
 },
 {
  "id": "pyq-5-16",
  "lesson": 5,
  "tier": 5,
  "title": "T09 倒排单词",
  "hint": "习题",
  "alt": false,
  "code": "import sys\nwords=sys.stdin.read().strip().split()\nprint(\" \".join(reversed(words)))"
 },
 {
  "id": "pyq-5-17",
  "lesson": 5,
  "tier": 5,
  "title": "T10 字符串移位包含问题",
  "hint": "习题",
  "alt": false,
  "code": "a=input().strip();b=input().strip()\nif len(a)<len(b): a,b=b,a\nprint(\"true\" if b in a+a else \"false\")"
 },
 {
  "id": "pyq-5-18",
  "lesson": 5,
  "tier": 5,
  "title": "T11 字符串乘方",
  "hint": "习题",
  "alt": false,
  "code": "while True:\n    s = input().strip()\n    if s == '.':\n        break\n    n = len(s)\n    ne = [0] * n\n    j = 0\n    for i in range(1, n):\n        while j > 0 and s[i] != s[j]:\n            j = ne[j - 1]\n        if s[i] == s[j]:\n            j += 1\n        ne[i] = j\n    length = n - ne[n - 1]\n    if n % length == 0:\n        print(n // length)\n    else:\n        print(1)"
 },
 {
  "id": "pyq-5-19",
  "lesson": 5,
  "tier": 5,
  "title": "T12 字符串最大跨距",
  "hint": "习题",
  "alt": false,
  "code": "s, s1, s2 = input().split(',')\nn = len(s)\nl = s.find(s1)\nr = s.rfind(s2)\nif l == -1 or r == -1 or l + len(s1) > r:\n    print(-1)\nelse:\n    print(r - l - len(s1))"
 },
 {
  "id": "pyq-5-20",
  "lesson": 5,
  "tier": 5,
  "title": "T13 最长公共字符串后缀",
  "hint": "习题",
  "alt": false,
  "code": "import sys\ndata=sys.stdin.read().split()\nwhile data:\n    n=int(data[0]);data=data[1:]\n    if n==0: break\n    strs=data[:n];data=data[n:]\n    suf=\"\"\n    for i in range(1,min(len(s) for s in strs)+1):\n        c=strs[0][-i]\n        if all(s[-i]==c for s in strs): suf=c+suf\n        else: break\n    print(suf)"
 },
 {
  "id": "pyq-6-01",
  "lesson": 6,
  "tier": 5,
  "title": "P01 不同正整数的个数",
  "hint": "例题",
  "alt": false,
  "code": "n = int(input())\na = list(map(int, input().split()))\nprint(len({x for x in a if x > 0}))"
 },
 {
  "id": "pyq-6-02",
  "lesson": 6,
  "tier": 5,
  "title": "P02 模拟散列表",
  "hint": "例题",
  "alt": false,
  "code": "import sys\ndata = sys.stdin.read().split()\nn = int(data[0])\ns = set()\nout = []\ni = 1\nfor _ in range(n):\n    op, x = data[i], int(data[i + 1])\n    i += 2\n    if op == 'I':\n        s.add(x)\n    else:\n        out.append('Yes' if x in s else 'No')\nprint('\\n'.join(out))"
 },
 {
  "id": "pyq-6-03",
  "lesson": 6,
  "tier": 5,
  "title": "P03 字符串赋值",
  "hint": "例题",
  "alt": false,
  "code": "import sys\ndata = sys.stdin.read().split()\ni = 0\nn = int(data[i]); i += 1\nd = {}\nfor _ in range(n):\n    d[data[i]] = data[i + 1]\n    i += 2\nm = int(data[i]); i += 1\nout = []\nfor _ in range(m):\n    out.append(d.get(data[i], '-1'))\n    i += 1\nprint('\\n'.join(out))"
 },
 {
  "id": "pyq-6-04",
  "lesson": 6,
  "tier": 5,
  "title": "P04 门禁系统",
  "hint": "例题",
  "alt": false,
  "code": "n = int(input())\na = list(map(int, input().split()))\ncnt = {}\nout = []\nfor x in a:\n    cnt[x] = cnt.get(x, 0) + 1\n    out.append(str(cnt[x]))\nprint(' '.join(out))"
 },
 {
  "id": "pyq-6-05",
  "lesson": 6,
  "tier": 5,
  "title": "P05 数字排序",
  "hint": "例题",
  "alt": false,
  "code": "from collections import Counter\nn = int(input())\na = list(map(int, input().split()))\nfor v, c in sorted(Counter(a).items(), key=lambda kv: (-kv[1], kv[0])):\n    print(v, c)"
 },
 {
  "id": "pyq-6-06",
  "lesson": 6,
  "tier": 5,
  "title": "T01 奇偶",
  "hint": "习题",
  "alt": false,
  "code": "s = input().strip()\nprint('odd' if len(set(s)) % 2 else 'even')"
 },
 {
  "id": "pyq-6-07",
  "lesson": 6,
  "tier": 5,
  "title": "T02 字符串",
  "hint": "习题",
  "alt": false,
  "code": "n = int(input())\ns = input().strip()\nprint('YES' if len(set(s.lower())) == 26 else 'NO')"
 },
 {
  "id": "pyq-6-08",
  "lesson": 6,
  "tier": 5,
  "title": "T03 查找",
  "hint": "习题",
  "alt": false,
  "code": "import sys\ndata = sys.stdin.read().split()\ni = 0\nn = int(data[i]); i += 1\na = set(data[i:i + n]); i += n\nm = int(data[i]); i += 1\nout = []\nfor _ in range(m):\n    out.append('YES' if data[i] in a else 'NO')\n    i += 1\nprint('\\n'.join(out))"
 },
 {
  "id": "pyq-6-09",
  "lesson": 6,
  "tier": 5,
  "title": "T04 出现次数最多的数",
  "hint": "习题",
  "alt": false,
  "code": "from collections import Counter\nn = int(input())\na = list(map(int, input().split()))\nprint(min(Counter(a).items(), key=lambda kv: (-kv[1], kv[0]))[0])"
 },
 {
  "id": "pyq-6-10",
  "lesson": 6,
  "tier": 5,
  "title": "T05 子串计算",
  "hint": "习题",
  "alt": false,
  "code": "import sys\nfor line in sys.stdin:\n    s = line.strip()\n    if not s:\n        continue\n    cnt = {}\n    L = len(s)\n    for i in range(L):\n        for j in range(i + 1, L + 1):\n            sub = s[i:j]\n            cnt[sub] = cnt.get(sub, 0) + 1\n    for sub in sorted(k for k, v in cnt.items() if v > 1):\n        print(sub, cnt[sub])"
 },
 {
  "id": "pyq-7-01",
  "lesson": 7,
  "tier": 5,
  "title": "P01 n的阶乘",
  "hint": "例题",
  "alt": false,
  "code": "import math;n=int(input());print(math.factorial(n))"
 },
 {
  "id": "pyq-7-02",
  "lesson": 7,
  "tier": 5,
  "title": "P02 x和y的最大值",
  "hint": "例题",
  "alt": false,
  "code": "x, y = map(int, input().split())\nif x > y:\n    print(x)\nelse:\n    print(y)"
 },
 {
  "id": "pyq-7-03",
  "lesson": 7,
  "tier": 5,
  "title": "P03 最大公约数",
  "hint": "例题",
  "alt": false,
  "code": "a, b = map(int, input().split())\nwhile b:\n    a, b = b, a % b\nprint(a)"
 },
 {
  "id": "pyq-7-04",
  "lesson": 7,
  "tier": 5,
  "title": "P04 交换数值",
  "hint": "例题",
  "alt": false,
  "code": "a,b=map(int,input().split());a,b=b,a;print(a,b)"
 },
 {
  "id": "pyq-7-05",
  "lesson": 7,
  "tier": 5,
  "title": "P05 打印数字",
  "hint": "例题",
  "alt": false,
  "code": "import sys\ndata = sys.stdin.read().split()\nn = int(data[0])\nsize = int(data[1])\narr = list(map(int, data[2:2+n]))\nprint(' '.join(map(str, arr[:size])))"
 },
 {
  "id": "pyq-7-06",
  "lesson": 7,
  "tier": 5,
  "title": "P06 打印矩阵",
  "hint": "例题",
  "alt": false,
  "code": "r,c=map(int,input().split())\nfor _ in range(r):print(' '.join(input().split()))"
 },
 {
  "id": "pyq-7-07",
  "lesson": 7,
  "tier": 5,
  "title": "P07 递归求阶乘",
  "hint": "例题",
  "alt": false,
  "code": "import sys\nsys.setrecursionlimit(200000)\ndef f(n):return 1 if n<=1 else n*f(n-1)\nprint(f(int(input())))"
 },
 {
  "id": "pyq-7-08",
  "lesson": 7,
  "tier": 5,
  "title": "P08 递归求斐波那契数列",
  "hint": "例题",
  "alt": false,
  "code": "import sys\nsys.setrecursionlimit(200000)\ndef f(n):return n if n<=1 else f(n-1)+f(n-2)\nprint(f(int(input())))"
 },
 {
  "id": "pyq-7-09",
  "lesson": 7,
  "tier": 5,
  "title": "T01 绝对值",
  "hint": "习题",
  "alt": false,
  "code": "x = int(input())\nprint(x if x >= 0 else -x)"
 },
 {
  "id": "pyq-7-10",
  "lesson": 7,
  "tier": 5,
  "title": "T02 两个数的和",
  "hint": "习题",
  "alt": false,
  "code": "a=float(input());b=float(input())\nprint(f\"{a+b:.2f}\")"
 },
 {
  "id": "pyq-7-11",
  "lesson": 7,
  "tier": 5,
  "title": "T03 区间求和",
  "hint": "习题",
  "alt": false,
  "code": "l,r=map(int,input().split())\nprint(sum(range(l,r+1)))"
 },
 {
  "id": "pyq-7-12",
  "lesson": 7,
  "tier": 5,
  "title": "T04 最小公倍数",
  "hint": "习题",
  "alt": false,
  "code": "import math\na,b=map(int,input().split())\nprint(a*b//math.gcd(a,b))"
 },
 {
  "id": "pyq-7-13",
  "lesson": 7,
  "tier": 5,
  "title": "T05 复制数组",
  "hint": "习题",
  "alt": false,
  "code": "n, m, size = map(int, input().split())\na = list(map(int, input().split()))\nb = list(map(int, input().split()))\nb[:size] = a[:size]\nprint(' '.join(map(str, b)))"
 },
 {
  "id": "pyq-7-14",
  "lesson": 7,
  "tier": 5,
  "title": "T06 打印字符串",
  "hint": "习题",
  "alt": false,
  "code": "s=input().strip()\nfor c in s: print(c)"
 },
 {
  "id": "pyq-7-15",
  "lesson": 7,
  "tier": 5,
  "title": "T07 数组翻转",
  "hint": "习题",
  "alt": false,
  "code": "n, size = map(int, input().split())\na = list(map(int, input().split()))\na[:size] = reversed(a[:size])\nprint(' '.join(map(str, a)))"
 },
 {
  "id": "pyq-7-16",
  "lesson": 7,
  "tier": 5,
  "title": "T08 数组去重",
  "hint": "习题",
  "alt": false,
  "code": "import sys\ndata=sys.stdin.read().split()\nn=int(data[0])\nseen=set();res=[]\nfor x in data[1:1+n]:\n    if x not in seen: seen.add(x);res.append(x)\nprint(\" \".join(res))"
 },
 {
  "id": "pyq-7-17",
  "lesson": 7,
  "tier": 5,
  "title": "T09 数组排序",
  "hint": "习题",
  "alt": false,
  "code": "import sys\ndata = sys.stdin.read().split()\nn, l, r = int(data[0]), int(data[1]), int(data[2])\na = list(map(int, data[3:3+n]))\na[l:r+1] = sorted(a[l:r+1])\nprint(' '.join(map(str, a)))"
 },
 {
  "id": "pyq-7-18",
  "lesson": 7,
  "tier": 5,
  "title": "T10 跳台阶",
  "hint": "习题",
  "alt": false,
  "code": "from functools import lru_cache\n@lru_cache(None)\ndef f(n):return n if n<=2 else f(n-1)+f(n-2)\nn=int(input());print(f(n))"
 },
 {
  "id": "pyq-7-19",
  "lesson": 7,
  "tier": 5,
  "title": "T11 走方格",
  "hint": "习题",
  "alt": false,
  "code": "def c(n,k):\n    if k<0 or k>n: return 0\n    k=min(k,n-k)\n    r=1\n    for i in range(1,k+1): r=r*(n-i+1)//i\n    return r\nn,m=map(int,input().split())\nprint(c(n+m,n))"
 },
 {
  "id": "pyq-7-20",
  "lesson": 7,
  "tier": 5,
  "title": "T12 排列",
  "hint": "习题",
  "alt": false,
  "code": "from itertools import permutations\nn = int(input())\nfor p in permutations(range(1, n + 1)):\n    print(' '.join(map(str, p)))"
 }
];
