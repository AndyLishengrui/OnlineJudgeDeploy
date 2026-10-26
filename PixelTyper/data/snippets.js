/* PixelTyper 内容库（AI 生成 + 校验）*/
window.SNIPPETS = [
 {
  "id": "py-print-hello",
  "title": "打印输出",
  "tier": 1,
  "code": "print(\"Hello, world!\")\nprint(\"I can type code.\")\nprint(\"A\" * 3, \"B\" * 2, \"C\")\nprint(\"3 + 4 =\", 3 + 4)",
  "hint": "print 是输出的第一步，注意引号成对、逗号分隔多个值，星号可重复字符串。"
 },
 {
  "id": "py-var-assign",
  "title": "变量赋值",
  "tier": 1,
  "code": "name = \"Ada\"\nage = 18\nheight = 1.68\nis_ready = True\nprint(name, age, height, is_ready)",
  "hint": "等号=是赋值不是判断，变量名用下划线连接单词，True 首字母要大写。"
 },
 {
  "id": "py-input-echo",
  "title": "键盘输入",
  "tier": 1,
  "code": "name = input(\"Your name: \")\nprint(\"Hi,\", name)\ncolor = input(\"Fav color: \")\nprint(\"You like\", color + \"!\")",
  "hint": "input() 读入的是字符串，注意括号套括号时右括号别漏敲。"
 },
 {
  "id": "py-arith-ops",
  "title": "算术运算",
  "tier": 1,
  "code": "a = 17\nb = 5\nprint(a + b, a - b)\nprint(a * b, a / b)\nprint(a // b, a % b)\nprint(a ** 2, -a)",
  "hint": "重点练习运算符：// 整除、% 取余、** 乘方，Shift+8 的星号最容易敲错。"
 },
 {
  "id": "py-fstring-out",
  "title": "模板字符串",
  "tier": 1,
  "code": "name = \"Lin\"\nscore = 92.5\nprint(f\"{name} got {score}\")\nprint(f\"sum={score + 7.5}\")\nprint(f\"len={len(name)}, ok={score > 60}\")",
  "hint": "f-string 在引号前加 f，花括号{}里放变量，花括号要用 Shift+[ 敲出。"
 },
 {
  "id": "py-type-cast",
  "title": "类型转换",
  "tier": 1,
  "code": "s = input(\"num: \")\nn = int(s)\nf = float(\"0.5\")\nprint(n + 1, n * 2, f)\nprint(str(n) + \"!\", bin(n))",
  "hint": "int/float/str 互相转换是输入处理的标配，注意函数名后紧跟圆括号。"
 },
 {
  "id": "py-swap-vars",
  "title": "变量交换",
  "tier": 1,
  "code": "x = 10\ny = 20\nprint(\"before:\", x, y)\nx, y = y, x\nprint(\"after:\", x, y)\na, b, c = 1, 2, 3\na, b, c = c, a, b\nprint(a, b, c)",
  "hint": "Python 特有的一行交换写法 x, y = y, x，逗号位置是易错点。"
 },
 {
  "id": "py-if-elif-else",
  "title": "三分支判断",
  "tier": 2,
  "code": "n = int(input(\"n: \"))\nif n > 0:\n    print(\"positive\")\nelif n < 0:\n    print(\"negative\")\nelse:\n    print(\"zero\")",
  "hint": "if/elif/else 末尾的冒号:别漏，缩进固定 4 个空格。"
 },
 {
  "id": "py-compare-ops",
  "title": "比较运算符",
  "tier": 2,
  "code": "a = int(input(\"a: \"))\nb = int(input(\"b: \"))\nif a == b:\n    print(\"equal\")\nelif a > b:\n    print(\"a wins\")\nelse:\n    print(\"b wins\")",
  "hint": "判断是否相等用双等号==，单=是赋值，这是新手最常敲错的键。"
 },
 {
  "id": "py-logic-ops",
  "title": "逻辑运算符",
  "tier": 2,
  "code": "age = int(input(\"age: \"))\nvip = input(\"vip(y/n): \") == \"y\"\nif age >= 18 and vip:\n    print(\"full pass\")\nelif age >= 18 or vip:\n    print(\"half pass\")\nif not vip:\n    print(\"no vip yet\")",
  "hint": "and/or/not 全是小写，>= 先敲大于号再敲等号，顺序反了会报错。"
 },
 {
  "id": "py-grade-level",
  "title": "成绩等级",
  "tier": 2,
  "code": "s = int(input(\"score: \"))\nif s >= 90:\n    print(\"A\")\nelif s >= 80:\n    print(\"B\")\nelif s >= 60:\n    print(\"C\")\nelse:\n    print(\"D\")",
  "hint": "多分支从高到低排，elif 不是 elseif，敲完条件马上补冒号。"
 },
 {
  "id": "py-leap-year",
  "title": "闰年判断",
  "tier": 2,
  "code": "y = int(input(\"year: \"))\nif y % 400 == 0:\n    print(\"leap year\")\nelif y % 100 == 0:\n    print(\"not leap\")\nelif y % 4 == 0:\n    print(\"leap year\")\nelse:\n    print(\"not leap\")",
  "hint": "取余%和双等号==组合出现，% 用 Shift+5，注意判断顺序不能乱。"
 },
 {
  "id": "py-odd-even",
  "title": "奇偶判断",
  "tier": 2,
  "code": "n = int(input(\"n: \"))\nif n % 2 == 0:\n    print(n, \"is even\")\nelse:\n    print(n, \"is odd\")",
  "hint": "最经典的分支入门题，n % 2 == 0 里 % 和 == 连着敲容易手滑。"
 },
 {
  "id": "py-piecewise-func",
  "title": "分段函数",
  "tier": 2,
  "code": "x = float(input(\"x: \"))\nif x < 0:\n    y = -x\nelif x <= 10:\n    y = x * 2 + 1\nelse:\n    y = x ** 2 - 5\nprint(\"y =\", y)",
  "hint": "分段函数对应 if/elif/else，<= 和 ** 都是双字符运算符，注意顺序。"
 },
 {
  "id": "py-for-sum",
  "title": "循环累加",
  "tier": 3,
  "code": "total = 0\nfor i in range(1, 101):\n    total += i\n    if i % 10 == 0:\n        print(\"i =\", i, \"sum =\", total)\nprint(\"1..100 sum:\", total)",
  "hint": "for 行末冒号与 += 组合键最常漏敲，% 取余号在 Shift+5。"
 },
 {
  "id": "py-while-guess",
  "title": "猜数字",
  "tier": 3,
  "code": "secret = 42\nguess = int(input(\"guess: \"))\nwhile guess != secret:\n    if guess < secret:\n        print(\"too small!\")\n    else:\n        print(\"too big!\")\n    guess = int(input(\"again: \"))\nprint(\"you got it:\", secret)",
  "hint": "while 循环注意 != 的叹号位置，int(input()) 两层括号要配对。"
 },
 {
  "id": "py-nested-mult",
  "title": "乘法表",
  "tier": 3,
  "code": "for i in range(1, 10):\n    for j in range(1, i + 1):\n        print(f\"{j}x{i}={i * j}\", end=\" \")\n    print()",
  "hint": "f-string 里花括号与引号交错，end=\" \" 是取消换行的关键。"
 },
 {
  "id": "py-break-continue",
  "title": "跳出与跳过",
  "tier": 3,
  "code": "count = 0\nfor n in range(1, 31):\n    if n % 3 == 0:\n        continue\n    if count >= 8:\n        break\n    count += 1\n    print(\"pick\", n)\nprint(\"picked\", count, \"numbers\")",
  "hint": "continue 与 break 缩进各深一层，== 判断和 = 赋值别混。"
 },
 {
  "id": "py-factorial",
  "title": "阶乘计算",
  "tier": 3,
  "code": "n = int(input(\"n = \"))\nfact = 1\nif n < 0:\n    print(\"no factorial\")\nelse:\n    for i in range(2, n + 1):\n        fact *= i\n    print(n, \"! =\", fact)",
  "hint": "if-else 分支各带冒号，*= 是乘赋值一体键。"
 },
 {
  "id": "py-def-func",
  "title": "函数定义",
  "tier": 4,
  "code": "def add(a, b):\n    return a + b\n\n\ndef main():\n    x, y = 3, 5\n    print(\"sum =\", add(x, y))\n    print(\"mul =\", x * y)\n\n\nmain()",
  "hint": "def 后空格接函数名，参数括号与 return 缩进是易错点。"
 },
 {
  "id": "py-list-ops",
  "title": "列表操作",
  "tier": 4,
  "code": "nums = [3, 1, 4, 1, 5]\nnums.append(9)\nnums.insert(2, 6)\nnums.remove(1)\nnums.sort()\nprint(\"len:\", len(nums))\nprint(\"first:\", nums[0])\nprint(\"last:\", nums[-1])",
  "hint": "方括号在字母 P 右侧两键，点号调用方法别漏小括号。"
 },
 {
  "id": "py-str-slice",
  "title": "字符串切片",
  "tier": 4,
  "code": "s = \"Hello, Python!\"\nprint(s[0:5])\nprint(s[7:])\nprint(s[::-1])\nprint(s.upper())\nprint(s.replace(\"Python\", \"World\"))\nprint(len(s), s.count(\"o\"))",
  "hint": "切片冒号与 [:: -1] 双冒号步长是切片的高频符号组合。"
 },
 {
  "id": "py-dict-loop",
  "title": "字典遍历",
  "tier": 4,
  "code": "scores = {\"Ann\": 90, \"Bob\": 85, \"Coy\": 78}\nfor name, score in scores.items():\n    if score >= 80:\n        tag = \"good\"\n    else:\n        tag = \"ok\"\n    print(name, \"->\", score, tag)\nprint(\"avg:\", sum(scores.values()) / 3)",
  "hint": "花括号字典、.items() 双变量解包，-> 是减号加大于号。"
 },
 {
  "id": "py-list-comp",
  "title": "列表推导式",
  "tier": 4,
  "code": "squares = [x * x for x in range(10)]\nevens = [x for x in squares if x % 2 == 0]\ncubes = [x ** 3 for x in range(5)]\nprint(\"squares:\", squares)\nprint(\"evens:\", evens)\nprint(\"cubes:\", cubes)",
  "hint": "推导式把 for 和 if 收进一行方括号里，** 是乘方运算。"
 },
 {
  "id": "py-narcissistic",
  "title": "水仙花数",
  "tier": 5,
  "code": "for n in range(100, 1000):\n    a = n // 100\n    b = n // 10 % 10\n    c = n % 10\n    if a ** 3 + b ** 3 + c ** 3 == n:\n        print(n, \"is narcissistic\")",
  "hint": "PTA 经典题：// 整除与 % 取余配合拆三位数，** 立方。"
 },
 {
  "id": "py-prime-sieve",
  "title": "素数筛选",
  "tier": 5,
  "code": "n = 50\nis_p = [True] * (n + 1)\nis_p[0] = is_p[1] = False\nfor i in range(2, n + 1):\n    if is_p[i]:\n        for j in range(i * i, n + 1, i):\n            is_p[j] = False\nfor i in range(2, n + 1):\n    if is_p[i]:\n        print(i, end=\" \")\nprint()",
  "hint": "下划线 is_p 用 Shift+减号，range 三参数含步长 i。"
 },
 {
  "id": "py-bubble-sort",
  "title": "冒泡排序",
  "tier": 5,
  "code": "data = [5, 2, 9, 1, 7, 3]\nn = len(data)\nfor i in range(n - 1):\n    for j in range(n - 1 - i):\n        if data[j] > data[j + 1]:\n            t = data[j]\n            data[j] = data[j + 1]\n            data[j + 1] = t\nprint(\"sorted:\", data)",
  "hint": "双重循环加三行交换，j+1 的方括号下标最容易敲错。"
 },
 {
  "id": "py-fibonacci",
  "title": "斐波那契",
  "tier": 5,
  "code": "n = int(input(\"how many: \"))\na, b = 0, 1\nfor _ in range(n):\n    print(a, end=\" \")\n    a, b = b, a + b\nprint()",
  "hint": "a, b = b, a + b 同步赋值是 Python 特色，逗号分隔别漏。"
 },
 {
  "id": "c-hello-main",
  "title": "第一个程序",
  "tier": 1,
  "code": "#include <stdio.h>\n\nint main(void) {\n    printf(\"Hello, C!\\n\");\n    return 0;\n}",
  "hint": "注意 \\n 里的反斜杠方向，句末分号是新手最常漏的键。"
 },
 {
  "id": "c-scanf-echo",
  "title": "读入并回显",
  "tier": 1,
  "code": "#include <stdio.h>\n\nint main(void) {\n    int age = 0;\n    scanf(\"%d\", &age);\n    printf(\"age = %d\\n\", age);\n    return 0;\n}",
  "hint": "scanf 里的 & 取地址符和 %d 占位符最容易漏敲。"
 },
 {
  "id": "c-var-types",
  "title": "变量与类型",
  "tier": 1,
  "code": "#include <stdio.h>\n\nint main(void) {\n    int count = 7;\n    double pi = 3.14159;\n    char grade = 'A';\n    printf(\"%d %c\\n\", count, grade);\n    printf(\"pi = %.2f\\n\", pi);\n    return 0;\n}",
  "hint": "字符用单引号、字符串用双引号，%c 对应 char 类型。"
 },
 {
  "id": "c-arith-ops",
  "title": "算术与取余",
  "tier": 1,
  "code": "#include <stdio.h>\n\nint main(void) {\n    int a = 17, b = 5;\n    int sum = a + b;\n    int rem = a % b;\n    double q = a / (double)b;\n    printf(\"%d %d %.2f\\n\", sum, rem, q);\n    return 0;\n}",
  "hint": "% 是取余不是百分号，(double)b 强制转换别漏括号。"
 },
 {
  "id": "c-format-print",
  "title": "格式化输出",
  "tier": 1,
  "code": "#include <stdio.h>\n\nint main(void) {\n    double pi = 3.1415926;\n    int n = 42;\n    printf(\"n = %d\\n\", n);\n    printf(\"pi = %f\\n\", pi);\n    printf(\"pi = %.2f\\n\", pi);\n    return 0;\n}",
  "hint": "%f 默认六位小数，%.2f 里的点号容易敲成逗号。"
 },
 {
  "id": "c-if-else-score",
  "title": "及格判断",
  "tier": 2,
  "code": "#include <stdio.h>\n\nint main(void) {\n    int score = 72;\n    if (score >= 60) {\n        printf(\"Pass!\\n\");\n    } else {\n        printf(\"Fail...\\n\");\n    }\n    return 0;\n}",
  "hint": ">= 不要写成 =>，else 与大括号在同一行要敲准。"
 },
 {
  "id": "c-else-if-temp",
  "title": "温度分级",
  "tier": 2,
  "code": "#include <stdio.h>\n\nint main(void) {\n    int t = 28;\n    if (t >= 35) {\n        printf(\"hot\\n\");\n    } else if (t >= 15) {\n        printf(\"warm\\n\");\n    } else if (t >= 0) {\n        printf(\"cool\\n\");\n    }\n    printf(\"done\\n\");\n    return 0;\n}",
  "hint": "else if 链从上往下只匹配一个分支，括号成对别漏。"
 },
 {
  "id": "c-switch-day",
  "title": "星期开关",
  "tier": 2,
  "code": "#include <stdio.h>\n\nint main(void) {\n    int day = 6;\n    switch (day) {\n        case 6:\n        case 7:\n            printf(\"weekend\\n\");\n            break;\n        default:\n            printf(\"workday\\n\");\n    }\n    return 0;\n}",
  "hint": "case 后面是冒号不是分号，漏了 break 会一直往下穿透。"
 },
 {
  "id": "c-ternary-max",
  "title": "三目求最大",
  "tier": 2,
  "code": "#include <stdio.h>\n\nint main(void) {\n    int a = 12, b = 20;\n    int max = (a > b) ? a : b;\n    char *s = (a % 2) ? \"odd\" : \"even\";\n    printf(\"max = %d, %s\\n\", max, s);\n    return 0;\n}",
  "hint": "三目运算符的 ? 和 : 必须成对出现，(a % 2) 非零即真。"
 },
 {
  "id": "c-for-sum-100",
  "title": "累加一百",
  "tier": 3,
  "code": "#include <stdio.h>\n\nint main(void) {\n    int sum = 0;\n    for (int i = 1; i <= 100; i++) {\n        sum += i;\n    }\n    printf(\"sum = %d\\n\", sum);\n    return 0;\n}",
  "hint": "for 圆括号里是两个分号不是逗号，i++ 与 += 是高频键位。"
 },
 {
  "id": "c-while-countdown",
  "title": "倒数发射",
  "tier": 3,
  "code": "#include <stdio.h>\n\nint main(void) {\n    int n = 5;\n    while (n > 0) {\n        printf(\"%d...\\n\", n);\n        n--;\n    }\n    printf(\"go!\\n\");\n    return 0;\n}",
  "hint": "while 先判断再执行，忘了 n-- 就会变成死循环。"
 },
 {
  "id": "c-do-while-guess",
  "title": "猜数游戏",
  "tier": 3,
  "code": "#include <stdio.h>\n\nint main(void) {\n    int guess = 0;\n    do {\n        printf(\"guess (1-9): \");\n        scanf(\"%d\", &guess);\n    } while (guess != 7);\n    printf(\"bingo!\\n\");\n    return 0;\n}",
  "hint": "do-while 先执行一次再判断，结尾 while 后面要加分号。"
 },
 {
  "id": "c-nested-stars",
  "title": "星星三角",
  "tier": 3,
  "code": "#include <stdio.h>\n\nint main(void) {\n    for (int i = 1; i <= 5; i++) {\n        for (int j = 0; j < i; j++) {\n            printf(\"* \");\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}",
  "hint": "内层循环控制每行星数，大括号嵌套时注意缩进对齐。"
 },
 {
  "id": "c-func-call",
  "title": "函数定义调用",
  "tier": 4,
  "code": "#include <stdio.h>\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint main(void) {\n    int sum = add(3, 4);\n    printf(\"sum=%d\\n\", sum);\n    return 0;\n}",
  "hint": "函数先定义再调用，注意形参列表的括号与逗号，printf 里的 %d 和 \\n 容易漏敲。"
 },
 {
  "id": "c-array-max",
  "title": "数组找最大",
  "tier": 4,
  "code": "#include <stdio.h>\n\nint main(void) {\n    int a[5] = {3, 1, 4, 1, 5};\n    int i, max = a[0];\n    for (i = 1; i < 5; i++) {\n        if (a[i] > max) {\n            max = a[i];\n        }\n    }\n    printf(\"max=%d\\n\", max);\n    return 0;\n}",
  "hint": "一维数组初始化用花括号，for 循环三要素之间是分号不是逗号，下标从 0 开始。"
 },
 {
  "id": "c-string-cat",
  "title": "字符串拼接",
  "tier": 4,
  "code": "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char s1[20] = \"hello\";\n    char s2[20] = \"_world\";\n    strcat(s1, s2);\n    printf(\"len=%d\\n\", (int)strlen(s1));\n    printf(\"%s\\n\", s1);\n    return 0;\n}",
  "hint": "用 strcat 和 strlen 必须包含 string.h；字符数组用双引号赋值，%s 对应字符串。"
 },
 {
  "id": "c-pointer-swap",
  "title": "指针改值",
  "tier": 4,
  "code": "#include <stdio.h>\n\nint main(void) {\n    int x = 42;\n    int *p = &x;\n    *p = *p + 8;\n    printf(\"x=%d\\n\", x);\n    printf(\"addr=%p\\n\", (void *)p);\n    return 0;\n}",
  "hint": "& 取地址、* 解引用，两个符号方向相反别敲混；%p 用来打印地址。"
 },
 {
  "id": "c-struct-point",
  "title": "结构体坐标",
  "tier": 4,
  "code": "#include <stdio.h>\n\nstruct Point {\n    int x;\n    int y;\n};\n\nint main(void) {\n    struct Point p = {3, 4};\n    p.x += 1;\n    p.y *= 2;\n    printf(\"(%d,%d)\\n\", p.x, p.y);\n    return 0;\n}",
  "hint": "结构体定义末尾的花括号后必须有分号；成员访问用点号，+= 和 *= 是复合赋值。"
 },
 {
  "id": "c-gcd-euclid",
  "title": "辗转求公约",
  "tier": 5,
  "code": "#include <stdio.h>\n\nint main(void) {\n    int a, b, t;\n    scanf(\"%d %d\", &a, &b);\n    while (b != 0) {\n        t = a % b;\n        a = b;\n        b = t;\n    }\n    printf(\"gcd=%d\\n\", a);\n    return 0;\n}",
  "hint": "辗转相除法的核心是 t=a%b 的接力赋值；scanf 里变量前必须加 &，!= 是不等于。"
 },
 {
  "id": "c-prime-check",
  "title": "素数判断",
  "tier": 5,
  "code": "#include <stdio.h>\n\nint main(void) {\n    int n, i, ok = 1;\n    scanf(\"%d\", &n);\n    if (n < 2) ok = 0;\n    for (i = 2; i * i <= n; i++) {\n        if (n % i == 0) ok = 0;\n    }\n    printf(\"%d\\n\", ok);\n    return 0;\n}",
  "hint": "用 i*i<=n 代替开方提速；判断相等是双等号 ==，模运算 % 在 Shift+5。"
 },
 {
  "id": "c-select-sort",
  "title": "选择排序",
  "tier": 5,
  "code": "#include <stdio.h>\n\nint main(void) {\n    int a[5] = {5, 2, 9, 1, 7};\n    int i, j, k, t;\n    for (i = 0; i < 4; i++) {\n        k = i;\n        for (j = i + 1; j < 5; j++) {\n            if (a[j] < a[k]) k = j;\n        }\n        t = a[i]; a[i] = a[k]; a[k] = t;\n    }\n    printf(\"%d %d\\n\", a[0], a[4]);\n    return 0;\n}",
  "hint": "双重循环里 k 记录最小值下标；一行三条交换语句用分号隔开，方括号下标别敲成圆括号。"
 },
 {
  "id": "c-binary-search",
  "title": "二分查找",
  "tier": 5,
  "code": "#include <stdio.h>\n\nint main(void) {\n    int a[7] = {1, 3, 5, 7, 9, 11, 13};\n    int key = 9, lo = 0, hi = 6, mid;\n    while (lo <= hi) {\n        mid = (lo + hi) / 2;\n        if (a[mid] == key) break;\n        if (a[mid] < key) lo = mid + 1;\n        else hi = mid - 1;\n    }\n    printf(\"idx=%d\\n\", mid);\n    return 0;\n}",
  "hint": "二分前提是数组有序；mid=(lo+hi)/2 的括号不能省，break 立即跳出循环。"
 },
 {
  "id": "c-fact-recur",
  "title": "递归阶乘",
  "tier": 5,
  "code": "#include <stdio.h>\n\nlong fact(int n) {\n    if (n <= 1) {\n        return 1;\n    }\n    return n * fact(n - 1);\n}\n\nint main(void) {\n    int n = 10;\n    printf(\"%d!=%ld\\n\", n, fact(n));\n    return 0;\n}",
  "hint": "递归必须有出口 n<=1；long 类型对应 %ld，阶乘结果大容易溢出要注意。"
 },
 {
  "id": "drill-brackets",
  "title": "括号家族",
  "tier": 0,
  "code": "a = [1, 2, 3]\nb = {\"x\": (a[0], a[1])}\nc = (a[2] > b[\"x\"][0]) < (3 + 2)\nd = {k: (k * k) for k in a}\nprint(a[0], b[\"x\"], c, d[2])",
  "hint": "圆括号、方括号、花括号与大小于号连番上阵，注意 shift+9/0 和 [ ] 的手指切换。"
 },
 {
  "id": "drill-operators",
  "title": "运算符连击",
  "tier": 0,
  "code": "#include <stdio.h>\nint main()\n{\n    int a = 3, b = 4;\n    a += 2; b += a;\n    printf(\"%d\\n\", a <= b && b >= a);\n    printf(\"%d\\n\", a != b || a == 5);\n    return 0;\n}",
  "hint": "==、!=、<=、>=、+= 与 &&、|| 高密度出现，双字符运算符别漏敲第二个符号。"
 },
 {
  "id": "drill-quotes",
  "title": "引号转义",
  "tier": 0,
  "code": "a = 'it\\'s \"ok\"'\nb = \"say \\\"hi\\\"\\nbye\"\nprint(a + \"\\t\" + b)\nprint('x:\\\\n[\"y\"]\\tz')",
  "hint": "单双引号交替配合反斜杠转义，\\ 键和引号键最容易漏敲或多敲。"
 },
 {
  "id": "drill-punct",
  "title": "标点风暴",
  "tier": 0,
  "code": "#include <stdio.h>\nint main()\n{\n    int a[3] = {1, 2, 3}, i;\n    for (i = 0; i < 3; i++)\n        printf(\"%d:%d.%d;\\n\", i, i, a[i]);\n    return 0;\n}",
  "hint": "逗号、分号、冒号、点号齐上阵，for 括号里的两个分号和句末分号别丢。"
 },
 {
  "id": "drill-numbers-array",
  "title": "数字阵列",
  "tier": 0,
  "code": "data = [12, 34, 56, 78, 90]\nmat = [[1, 2, 3], [4, 5, 6]]\nw = [100, 200, 300, 400]\ntotal = data[0] + mat[1][2] + w[3]\nprint(total, data[4] * 10)",
  "hint": "大量数字字面量配合逗号与方括号，数字键排要打得连贯不卡顿。"
 },
 {
  "id": "drill-numbers-coord",
  "title": "坐标跳动",
  "tier": 0,
  "code": "x1, y1 = 15, 28\nx2, y2 = 47, 93\ndx = x2 - x1\ndy = y2 - y1\ndist2 = dx * dx + dy * dy\nprint(x1, y1, x2, y2, dist2)",
  "hint": "变量名里的数字、逗号、等号交替出现，注意逗号后面跟空格的节律。"
 },
 {
  "id": "drill-numbers-math",
  "title": "小数运算",
  "tier": 0,
  "code": "pi = 3.14159\nr = 2.5\narea = pi * r * r\ncirc = 2 * pi * r\navg = (98.5 + 87.0 + 76.25) / 3\nprint(area, circ, avg)",
  "hint": "小数点与数字密集穿插，乘号 shift+8 和除号 / 的位置要记牢。"
 },
 {
  "id": "drill-for-loop",
  "title": "for三连",
  "tier": 0,
  "code": "for i in range(5):\n    print(i)\nfor j in range(2, 8):\n    print(j * j)\nfor k in range(10, 0, -2):\n    print(k)",
  "hint": "for、in、range、冒号是 Python 最高频组合，行首四格缩进用空格敲。"
 },
 {
  "id": "drill-scanf",
  "title": "scanf连发",
  "tier": 0,
  "code": "#include <stdio.h>\nint main()\n{\n    int a, b;\n    scanf(\"%d\", &a);\n    scanf(\"%d\", &b);\n    printf(\"%d %d\\n\", a, b);\n    return 0;\n}",
  "hint": "引号、%d、逗号、取地址符 & 连敲是 C 输入的招牌动作，% 是 shift+5。"
 },
 {
  "id": "drill-if-else",
  "title": "分支连判",
  "tier": 0,
  "code": "x = 7\nif x % 2 == 0:\n    print(\"even\")\nelif x % 3 == 0:\n    print(\"triple\")\nelse:\n    print(\"odd\")",
  "hint": "取余 %、判等 == 与冒号、缩进配合使用，elif 别拼成 elseif。"
 },
 /* ═══════ 指法道场（TT 式渐进课程，lane=ft，tier 0）═══════ */
 /* TT 排版：单行连续文本、空格分组、自动换行，无需 Enter，满屏练习量 */
 {
  "id": "ft-01",
  "title": "第1课·基准键 F J",
  "tier": 0,
  "lane": "ft",
  "code": "fff jjj fjf jfj fjfj jfjf ff jj fj jf ffjj jjff fjfj jfjf fj jf fjf jfj ff jj fjfj jf fj fff jjj fjf jfj fjfj jfjf ff jj fj jf ffjj jjff fjfj jfjf fj jf fjf jfj ff jj fjfj jf fj fff jjj fjf jfj fjfj jfjf ff jj fj jf ffjj jjff fjfj jfjf fj jf fjf jfj ff jj fjfj jf fj fff jjj fjf jfj fjfj jfjf ff jj fj jf ffjj jjff fjfj jfjf fj jf fjf jfj ff jj fjfj jf fj fff jjj fjf jfj fjfj jfjf ff jj fj jf ffjj jjff fjfj jfjf fj jf",
  "hint": "双手食指分别放在 F 和 J 的凸点上，这是盲打的家。敲完每个键都要回家。"
 },
 {
  "id": "ft-02",
  "title": "第2课·加入 D K",
  "tier": 0,
  "lane": "ft",
  "code": "ddd kkk dkd kdk dkdk kdkd fdf jkj fdjk jkfd fjd kdf jfk dkfj ddkk kkdd df jk fdkj kjfd dk kd fjdk ddd kkk dkd kdk dkdk kdkd fdf jkj fdjk jkfd fjd kdf jfk dkfj ddkk kkdd df jk fdkj kjfd dk kd fjdk ddd kkk dkd kdk dkdk kdkd fdf jkj fdjk jkfd fjd kdf jfk dkfj ddkk kkdd df jk fdkj kjfd dk kd fjdk ddd kkk dkd kdk dkdk kdkd fdf jkj fdjk jkfd fjd kdf jfk dkfj ddkk kkdd df jk fdkj kjfd dk kd fjdk ddd kkk dkd kdk dkdk kdkd fdf",
  "hint": "中指负责 D 和 K。手指伸直起落，手掌保持不动。"
 },
 {
  "id": "ft-03",
  "title": "第3课·加入 S L",
  "tier": 0,
  "lane": "ft",
  "code": "sss lll sls lsl slsl lsls fsd jkl sdf lkj fds jkl fdsjkl asdl slak flak salf lass fall sass sl ls sjk sss lll sls lsl slsl lsls fsd jkl sdf lkj fds jkl fdsjkl asdl slak flak salf lass fall sass sl ls sjk sss lll sls lsl slsl lsls fsd jkl sdf lkj fds jkl fdsjkl asdl slak flak salf lass fall sass sl ls sjk sss lll sls lsl slsl lsls fsd jkl sdf lkj fds jkl fdsjkl asdl slak flak salf lass fall sass sl ls sjk sss lll sls",
  "hint": "无名指负责 S 和 L。无名指最不听话，放慢一点也要敲准。"
 },
 {
  "id": "ft-04",
  "title": "第4课·加入 A ;（小指）",
  "tier": 0,
  "lane": "ft",
  "code": "aaa ;;; a;a ;a; asdf jkl; fdsa ;lkj a;s; dkfj slak asdf jkl; a s d f j k l ; asdf jkl; fdsa ;lkj aaa ;;; a;a ;a; asdf jkl; fdsa ;lkj a;s; dkfj slak asdf jkl; a s d f j k l ; asdf jkl; fdsa ;lkj aaa ;;; a;a ;a; asdf jkl; fdsa ;lkj a;s; dkfj slak asdf jkl; a s d f j k l ; asdf jkl; fdsa ;lkj aaa ;;; a;a ;a; asdf jkl; fdsa ;lkj a;s; dkfj slak asdf jkl; a s d f j k l ; asdf jkl; fdsa ;lkj aaa ;;; a;a ;a; asdf jkl; fdsa ;lkj",
  "hint": "小指负责 A 和分号;。基准行八键集合完毕：asdf jkl;"
 },
 {
  "id": "ft-05",
  "title": "第5课·食指内移 G H",
  "tier": 0,
  "lane": "ft",
  "code": "ggg hhh ghg hgh ghgh hghg fgh jhg gh hg fghj jhgf flag gash dash hall glad shall lash half gala hash flag hall dash ggg hhh ghg hgh ghgh hghg fgh jhg gh hg fghj jhgf flag gash dash hall glad shall lash half gala hash flag hall dash ggg hhh ghg hgh ghgh hghg fgh jhg gh hg fghj jhgf flag gash dash hall glad shall lash half gala hash flag hall dash ggg hhh ghg hgh ghgh hghg fgh jhg gh hg fghj jhgf flag gash dash hall glad",
  "hint": "G 和 H 由食指向内平移一格敲，手腕不要跟着歪。"
 },
 {
  "id": "ft-06",
  "title": "第6课·上排 E I",
  "tier": 0,
  "lane": "ft",
  "code": "eee iii eie iei ded lil did lid kid ill sell like file desk idea side slide deal isle dell feel seed less kiss eee iii eie iei ded lil did lid kid ill sell like file desk idea side slide deal isle dell feel seed less kiss eee iii eie iei ded lil did lid kid ill sell like file desk idea side slide deal isle dell feel seed less kiss eee iii eie iei ded lil did lid kid ill sell like file desk idea side slide deal isle dell",
  "hint": "上排开始！中指向上伸敲 E 和 I，敲完立刻回基准行。"
 },
 {
  "id": "ft-07",
  "title": "第7课·上排 R U",
  "tier": 0,
  "lane": "ft",
  "code": "rrr uuu rur uru rude rule surf sure read dear dare rare fuse fire tire rise urea ruff user fear rear true ruse urge rrr uuu rur uru rude rule surf sure read dear dare rare fuse fire tire rise urea ruff user fear rear true ruse urge rrr uuu rur uru rude rule surf sure read dear dare rare fuse fire tire rise urea ruff user fear rear true ruse urge rrr uuu rur uru rude rule surf sure read dear dare rare fuse fire tire rise",
  "hint": "食指向上伸敲 R 和 U，幅度比中指大，注意回位。"
 },
 {
  "id": "ft-08",
  "title": "第8课·上排 T Y",
  "tier": 0,
  "lane": "ft",
  "code": "ttt yyy tyt yty try yet they test stay easy year tear tray dust just study tasty truly yeast arty type yurt sty tyre ttt yyy tyt yty try yet they test stay easy year tear tray dust just study tasty truly yeast arty type yurt sty tyre ttt yyy tyt yty try yet they test stay easy year tear tray dust just study tasty truly yeast arty type yurt sty tyre ttt yyy tyt yty try yet they test stay easy year tear tray dust just",
  "hint": "T 和 Y 是食指伸得最远的上排键，宁可慢也不要错位。"
 },
 {
  "id": "ft-09",
  "title": "第9课·上排 W O",
  "tier": 0,
  "lane": "ft",
  "code": "www ooo wow owo how low owl slow flow too two will wall follow yellow wool lower wallow welt tow owe owl wow woo www ooo wow owo how low owl slow flow too two will wall follow yellow wool lower wallow welt tow owe owl wow woo www ooo wow owo how low owl slow flow too two will wall follow yellow wool lower wallow welt tow owe owl wow woo www ooo wow owo how low owl slow flow too two will wall follow yellow wool lower",
  "hint": "无名指向上敲 W 和 O。到这里，双手十键上排全部解锁。"
 },
 {
  "id": "ft-10",
  "title": "第10课·上排 Q P",
  "tier": 0,
  "lane": "ft",
  "code": "qqq ppp qpq pqp quit pale play quip queen quiet equal apple people purple puppy plaque papa quell quail ape pea pop qqq ppp qpq pqp quit pale play quip queen quiet equal apple people purple puppy plaque papa quell quail ape pea pop qqq ppp qpq pqp quit pale play quip queen quiet equal apple people purple puppy plaque papa quell quail ape pea pop qqq ppp qpq pqp quit pale play quip queen quiet equal apple people purple",
  "hint": "小指向上够 Q 和 P，是全键盘最吃力的动作之一，多练。"
 },
 {
  "id": "ft-11",
  "title": "第11课·下排 V M",
  "tier": 0,
  "lane": "ft",
  "code": "vvv mmm vmv mvm move vim mud milk mile vote very movie five live wave velvet mum eve vowel maim volume venom mauve vvv mmm vmv mvm move vim mud milk mile vote very movie five live wave velvet mum eve vowel maim volume venom mauve vvv mmm vmv mvm move vim mud milk mile vote very movie five live wave velvet mum eve vowel maim volume venom mauve vvv mmm vmv mvm move vim mud milk mile vote very movie five live wave velvet",
  "hint": "下排开始！食指向下敲 V 和 M，手指弯曲下探。"
 },
 {
  "id": "ft-12",
  "title": "第12课·下排 C X",
  "tier": 0,
  "lane": "ft",
  "code": "ccc xxx cxc xcx excuse exact except code cave voice fix mix six exit oxen exec box cox excel cycle civic vex wax ccc xxx cxc xcx excuse exact except code cave voice fix mix six exit oxen exec box cox excel cycle civic vex wax ccc xxx cxc xcx excuse exact except code cave voice fix mix six exit oxen exec box cox excel cycle civic vex wax ccc xxx cxc xcx excuse exact except code cave voice fix mix six exit oxen exec box",
  "hint": "中指向下敲 C、无名指向下敲 X，注意别和上排搞混。"
 },
 {
  "id": "ft-13",
  "title": "第13课·下排 B N Z",
  "tier": 0,
  "lane": "ft",
  "code": "bbb nnn bnb nbn zzz znz can box cab zoo next zero zinc been banana zone numb buzz zebra nab bun zen bane zoom bbb nnn bnb nbn zzz znz can box cab zoo next zero zinc been banana zone numb buzz zebra nab bun zen bane zoom bbb nnn bnb nbn zzz znz can box cab zoo next zero zinc been banana zone numb buzz zebra nab bun zen bane zoom bbb nnn bnb nbn zzz znz can box cab zoo next zero zinc been banana zone numb buzz zebra nab",
  "hint": "B 和 N 是食指向下最远的键，Z 归左手小指。至此 26 字母集齐！"
 },
 {
  "id": "ft-14",
  "title": "第14课·大写 Shift",
  "tier": 0,
  "lane": "ft",
  "code": "Aa Ss Dd Ff Gg Hh Jj Kk Ll Qq Ww Ee Rr Tt Yy Uu Ii Oo Pp Zz Xx Cc Vv Bb Nn Mm Cat Dog Sun Moon Red Blue Green White Left Hand Right Key Aa Ss Dd Ff Gg Hh Jj Kk Ll Qq Ww Ee Rr Tt Yy Uu Ii Oo Pp Zz Xx Cc Vv Bb Nn Mm Cat Dog Sun Moon Red Blue Green White Left Hand Right Key Aa Ss Dd Ff Gg Hh Jj Kk Ll Qq Ww Ee Rr Tt Yy Uu Ii Oo Pp Zz Xx Cc Vv Bb Nn Mm Cat Dog Sun Moon Red Blue Green White Left Hand Right Key Aa Ss Dd Ff",
  "hint": "左手敲字母时用右小指按 Shift，反之亦然——永远用对侧小指。"
 },
 {
  "id": "ft-15",
  "title": "第15课·数字排",
  "tier": 0,
  "lane": "ft",
  "code": "123 456 789 0 111 222 333 444 555 666 777 888 999 000 13579 24680 12 34 56 78 90 2026 101 365 100 950 137 246 808 314 159 267 42 7 60 24 123 456 789 0 111 222 333 444 555 666 777 888 999 000 13579 24680 12 34 56 78 90 2026 101 365 100 950 137 246 808 314 159 267 42 7 60 24 123 456 789 0 111 222 333 444 555 666 777 888 999 000 13579 24680 12 34 56 78 90 2026 101 365 100 950 137 246 808 314 159 267 42 7 60 24 123 456 789",
  "hint": "数字排与字母同指：1/Q/A/Z 一线，依此类推，伸手时整排一起动。"
 },
 {
  "id": "ft-16",
  "title": "毕业考·全键盘句子",
  "tier": 0,
  "lane": "ft",
  "code": "the quick brown fox jumps over the lazy dog the quick brown fox jumps over the lazy dog the quick brown fox jumps over the lazy dog how vexingly quick daft zebras jump tonight how vexingly quick daft zebras jump tonight pack my box with five dozen liquor jugs pack my box with five dozen liquor jugs the quick brown fox jumps over the lazy dog",
  "hint": "三句话含全部 26 个字母。目标：30 WPM、准确率 96% 以上，指法毕业！"
 }
];
