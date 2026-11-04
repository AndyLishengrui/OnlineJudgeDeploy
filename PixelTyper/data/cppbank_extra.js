/* 2026-11-04 手工补充，勿删 —— 源: data/build_cppbank_extra.py
   cppbank_extra.js：C++ 语法题库缺的实验四/五各 3 关；
   实验七「函数」20 关，与 Python P01-P08 / T01-T12 一一对应，全部用独立函数。
   index.html 在 cppbank.js 之后加载，app.js 的 cppLessons/cppLanes 负责合并。 */
window.CPPQ_EXTRA_LESSONS = [
 {
  "no": 4,
  "mod": 2,
  "label": "实验四",
  "title": "数组与列表",
  "src": "C++ 参考解 3 题",
  "p": 3,
  "n": 3
 },
 {
  "no": 5,
  "mod": 2,
  "label": "实验五",
  "title": "字符串",
  "src": "C++ 参考解 3 题",
  "p": 3,
  "n": 3
 },
 {
  "no": 7,
  "mod": 3,
  "label": "实验七",
  "title": "函数",
  "src": "C++ 函数 20 题",
  "p": 20,
  "n": 20
 }
];
window.CPPQ_EXTRA_SNIPPETS = [
 {
  "alt": false,
  "code": "#include <cstdio>\nint main(){\n    int n;\n    scanf(\"%d\", &n);\n    int a[1005];\n    for (int i = 0; i < n; i++) scanf(\"%d\", &a[i]);\n    for (int i = n - 1; i >= 0; i--) printf(\"%d%c\", a[i], i ? ' ' : '\\n');\n    return 0;\n}",
  "hint": "习题",
  "id": "cppq-4-01",
  "lesson": 4,
  "tier": 5,
  "title": "T01 数组逆序"
 },
 {
  "alt": false,
  "code": "#include <cstdio>\nint main(){\n    int n, x;\n    long long sum = 0;\n    scanf(\"%d\", &n);\n    for (int i = 0; i < n; i++){ scanf(\"%d\", &x); sum += x; }\n    printf(\"%lld\\n\", sum);\n    return 0;\n}",
  "hint": "习题",
  "id": "cppq-4-02",
  "lesson": 4,
  "tier": 5,
  "title": "T02 数组求和"
 },
 {
  "alt": false,
  "code": "#include <cstdio>\nint main(){\n    int n;\n    scanf(\"%d\", &n);\n    int a[1005];\n    for (int i = 0; i < n; i++) scanf(\"%d\", &a[i]);\n    for (int i = 0; i < n - 1; i++)\n        for (int j = 0; j < n - 1 - i; j++)\n            if (a[j] > a[j + 1]){\n                int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;\n            }\n    for (int i = 0; i < n; i++) printf(\"%d%c\", a[i], i + 1 < n ? ' ' : '\\n');\n    return 0;\n}",
  "hint": "习题",
  "id": "cppq-4-03",
  "lesson": 4,
  "tier": 5,
  "title": "T03 冒泡排序"
 },
 {
  "alt": false,
  "code": "#include <cstdio>\n#include <cstring>\nint main(){\n    char s[1005];\n    scanf(\"%s\", s);\n    int d = 0, a = 0;\n    for (int i = 0; s[i]; i++){\n        if (s[i] >= '0' && s[i] <= '9') d++;\n        else if (s[i] >= 'a' && s[i] <= 'z') a++;\n    }\n    printf(\"%d %d\\n\", d, a);\n    return 0;\n}",
  "hint": "习题",
  "id": "cppq-5-01",
  "lesson": 5,
  "tier": 5,
  "title": "T01 字符统计"
 },
 {
  "alt": false,
  "code": "#include <cstdio>\n#include <cstring>\nint main(){\n    char s[1005];\n    scanf(\"%s\", s);\n    int L = strlen(s);\n    for (int i = L - 1; i >= 0; i--) putchar(s[i]);\n    putchar('\\n');\n    return 0;\n}",
  "hint": "习题",
  "id": "cppq-5-02",
  "lesson": 5,
  "tier": 5,
  "title": "T02 字符串反转"
 },
 {
  "alt": false,
  "code": "#include <cstdio>\n#include <cstring>\nint main(){\n    char s[1005];\n    scanf(\"%s\", s);\n    int L = strlen(s), ok = 1;\n    for (int i = 0; i < L / 2; i++)\n        if (s[i] != s[L - 1 - i]){ ok = 0; break; }\n    printf(\"%s\\n\", ok ? \"yes\" : \"no\");\n    return 0;\n}",
  "hint": "习题",
  "id": "cppq-5-03",
  "lesson": 5,
  "tier": 5,
  "title": "T03 回文判断"
 },
 {
  "id": "cppq-7-01",
  "lesson": 7,
  "tier": 5,
  "title": "P01 n的阶乘",
  "hint": "例题",
  "alt": false,
  "code": "#include <cstdio>\n\nlong long fact(int n) {\n    long long r = 1;\n    for (int i = 2; i <= n; i++) r *= i;\n    return r;\n}\n\nint main() {\n    int n;\n    scanf(\"%d\", &n);\n    printf(\"%lld\\n\", fact(n));\n    return 0;\n}"
 },
 {
  "id": "cppq-7-02",
  "lesson": 7,
  "tier": 5,
  "title": "P02 x和y的最大值",
  "hint": "例题",
  "alt": false,
  "code": "#include <cstdio>\n\nint max2(int x, int y) {\n    return x > y ? x : y;\n}\n\nint main() {\n    int x, y;\n    scanf(\"%d%d\", &x, &y);\n    printf(\"%d\\n\", max2(x, y));\n    return 0;\n}"
 },
 {
  "id": "cppq-7-03",
  "lesson": 7,
  "tier": 5,
  "title": "P03 最大公约数",
  "hint": "例题",
  "alt": false,
  "code": "#include <cstdio>\n\nint gcd(int a, int b) {\n    while (b) {\n        int t = a % b;\n        a = b;\n        b = t;\n    }\n    return a;\n}\n\nint main() {\n    int a, b;\n    scanf(\"%d%d\", &a, &b);\n    printf(\"%d\\n\", gcd(a, b));\n    return 0;\n}"
 },
 {
  "id": "cppq-7-04",
  "lesson": 7,
  "tier": 5,
  "title": "P04 交换数值",
  "hint": "例题",
  "alt": false,
  "code": "#include <cstdio>\n\nvoid swap2(int *a, int *b) {\n    int t = *a;\n    *a = *b;\n    *b = t;\n}\n\nint main() {\n    int x, y;\n    scanf(\"%d%d\", &x, &y);\n    swap2(&x, &y);\n    printf(\"%d %d\\n\", x, y);\n    return 0;\n}"
 },
 {
  "id": "cppq-7-05",
  "lesson": 7,
  "tier": 5,
  "title": "P05 打印数字",
  "hint": "例题",
  "alt": false,
  "code": "#include <cstdio>\n\nvoid print_nums(int a[], int size) {\n    for (int i = 0; i < size; i++)\n        printf(\"%d%c\", a[i], i + 1 < size ? ' ' : '\\n');\n}\n\nint main() {\n    int n, size;\n    scanf(\"%d%d\", &n, &size);\n    int a[1005];\n    for (int i = 0; i < n; i++) scanf(\"%d\", &a[i]);\n    print_nums(a, size);\n    return 0;\n}"
 },
 {
  "id": "cppq-7-06",
  "lesson": 7,
  "tier": 5,
  "title": "P06 打印矩阵",
  "hint": "例题",
  "alt": false,
  "code": "#include <cstdio>\n\nvoid print_matrix(int a[][100], int r, int c) {\n    for (int i = 0; i < r; i++)\n        for (int j = 0; j < c; j++)\n            printf(\"%d%c\", a[i][j], j + 1 < c ? ' ' : '\\n');\n}\n\nint main() {\n    int r, c;\n    scanf(\"%d%d\", &r, &c);\n    int a[100][100];\n    for (int i = 0; i < r; i++)\n        for (int j = 0; j < c; j++) scanf(\"%d\", &a[i][j]);\n    print_matrix(a, r, c);\n    return 0;\n}"
 },
 {
  "id": "cppq-7-07",
  "lesson": 7,
  "tier": 5,
  "title": "P07 递归求阶乘",
  "hint": "例题",
  "alt": false,
  "code": "#include <cstdio>\n\nlong long fact(int n) {\n    if (n <= 1) return 1;\n    return n * fact(n - 1);\n}\n\nint main() {\n    int n;\n    scanf(\"%d\", &n);\n    printf(\"%lld\\n\", fact(n));\n    return 0;\n}"
 },
 {
  "id": "cppq-7-08",
  "lesson": 7,
  "tier": 5,
  "title": "P08 递归求斐波那契数列",
  "hint": "例题",
  "alt": false,
  "code": "#include <cstdio>\n\nlong long fib(int n) {\n    if (n <= 2) return 1;\n    return fib(n - 1) + fib(n - 2);\n}\n\nint main() {\n    int n;\n    scanf(\"%d\", &n);\n    printf(\"%lld\\n\", fib(n));\n    return 0;\n}"
 },
 {
  "id": "cppq-7-09",
  "lesson": 7,
  "tier": 5,
  "title": "T01 绝对值",
  "hint": "习题",
  "alt": false,
  "code": "#include <cstdio>\n\nint absval(int x) {\n    return x >= 0 ? x : -x;\n}\n\nint main() {\n    int x;\n    scanf(\"%d\", &x);\n    printf(\"%d\\n\", absval(x));\n    return 0;\n}"
 },
 {
  "id": "cppq-7-10",
  "lesson": 7,
  "tier": 5,
  "title": "T02 两个数的和",
  "hint": "习题",
  "alt": false,
  "code": "#include <cstdio>\n\ndouble add(double a, double b) {\n    return a + b;\n}\n\nint main() {\n    double a, b;\n    scanf(\"%lf%lf\", &a, &b);\n    printf(\"%.2f\\n\", add(a, b));\n    return 0;\n}"
 },
 {
  "id": "cppq-7-11",
  "lesson": 7,
  "tier": 5,
  "title": "T03 区间求和",
  "hint": "习题",
  "alt": false,
  "code": "#include <cstdio>\n\nlong long range_sum(int l, int r) {\n    long long s = 0;\n    for (int i = l; i <= r; i++) s += i;\n    return s;\n}\n\nint main() {\n    int l, r;\n    scanf(\"%d%d\", &l, &r);\n    printf(\"%lld\\n\", range_sum(l, r));\n    return 0;\n}"
 },
 {
  "id": "cppq-7-12",
  "lesson": 7,
  "tier": 5,
  "title": "T04 最小公倍数",
  "hint": "习题",
  "alt": false,
  "code": "#include <cstdio>\n\nlong long gcd(long long a, long long b) {\n    while (b) {\n        long long t = a % b;\n        a = b;\n        b = t;\n    }\n    return a;\n}\n\nlong long lcm(long long a, long long b) {\n    return a / gcd(a, b) * b;\n}\n\nint main() {\n    long long a, b;\n    scanf(\"%lld%lld\", &a, &b);\n    printf(\"%lld\\n\", lcm(a, b));\n    return 0;\n}"
 },
 {
  "id": "cppq-7-13",
  "lesson": 7,
  "tier": 5,
  "title": "T05 复制数组",
  "hint": "习题",
  "alt": false,
  "code": "#include <cstdio>\n\nvoid copy_part(int a[], int b[], int size) {\n    for (int i = 0; i < size; i++) b[i] = a[i];\n}\n\nint main() {\n    int n, m, size;\n    scanf(\"%d%d%d\", &n, &m, &size);\n    int a[1005], b[1005];\n    for (int i = 0; i < n; i++) scanf(\"%d\", &a[i]);\n    for (int i = 0; i < m; i++) scanf(\"%d\", &b[i]);\n    copy_part(a, b, size);\n    for (int i = 0; i < m; i++)\n        printf(\"%d%c\", b[i], i + 1 < m ? ' ' : '\\n');\n    return 0;\n}"
 },
 {
  "id": "cppq-7-14",
  "lesson": 7,
  "tier": 5,
  "title": "T06 打印字符串",
  "hint": "习题",
  "alt": false,
  "code": "#include <cstdio>\n#include <cstring>\n\nvoid print_chars(char s[]) {\n    for (int i = 0; i < (int)strlen(s); i++)\n        printf(\"%c\\n\", s[i]);\n}\n\nint main() {\n    char s[1005];\n    scanf(\"%s\", s);\n    print_chars(s);\n    return 0;\n}"
 },
 {
  "id": "cppq-7-15",
  "lesson": 7,
  "tier": 5,
  "title": "T07 数组翻转",
  "hint": "习题",
  "alt": false,
  "code": "#include <cstdio>\n\nvoid reverse_part(int a[], int size) {\n    for (int i = 0, j = size - 1; i < j; i++, j--) {\n        int t = a[i];\n        a[i] = a[j];\n        a[j] = t;\n    }\n}\n\nint main() {\n    int n, size;\n    scanf(\"%d%d\", &n, &size);\n    int a[1005];\n    for (int i = 0; i < n; i++) scanf(\"%d\", &a[i]);\n    reverse_part(a, size);\n    for (int i = 0; i < n; i++)\n        printf(\"%d%c\", a[i], i + 1 < n ? ' ' : '\\n');\n    return 0;\n}"
 },
 {
  "id": "cppq-7-16",
  "lesson": 7,
  "tier": 5,
  "title": "T08 数组去重",
  "hint": "习题",
  "alt": false,
  "code": "#include <cstdio>\n\nint unique_count(int a[], int n) {\n    int cnt = 0;\n    for (int i = 0; i < n; i++) {\n        bool seen = false;\n        for (int j = 0; j < cnt; j++)\n            if (a[j] == a[i]) { seen = true; break; }\n        if (!seen) a[cnt++] = a[i];\n    }\n    return cnt;\n}\n\nint main() {\n    int n;\n    scanf(\"%d\", &n);\n    int a[1005];\n    for (int i = 0; i < n; i++) scanf(\"%d\", &a[i]);\n    int m = unique_count(a, n);\n    for (int i = 0; i < m; i++)\n        printf(\"%d%c\", a[i], i + 1 < m ? ' ' : '\\n');\n    return 0;\n}"
 },
 {
  "id": "cppq-7-17",
  "lesson": 7,
  "tier": 5,
  "title": "T09 数组排序",
  "hint": "习题",
  "alt": false,
  "code": "#include <cstdio>\n#include <algorithm>\n\nvoid sort_part(int a[], int l, int r) {\n    std::sort(a + l, a + r + 1);\n}\n\nint main() {\n    int n, l, r;\n    scanf(\"%d%d%d\", &n, &l, &r);\n    int a[1005];\n    for (int i = 0; i < n; i++) scanf(\"%d\", &a[i]);\n    sort_part(a, l, r);\n    for (int i = 0; i < n; i++)\n        printf(\"%d%c\", a[i], i + 1 < n ? ' ' : '\\n');\n    return 0;\n}"
 },
 {
  "id": "cppq-7-18",
  "lesson": 7,
  "tier": 5,
  "title": "T10 跳台阶",
  "hint": "习题",
  "alt": false,
  "code": "#include <cstdio>\n\nlong long steps(int n) {\n    if (n <= 2) return n;\n    long long a = 1, b = 2;\n    for (int i = 3; i <= n; i++) {\n        long long c = a + b;\n        a = b;\n        b = c;\n    }\n    return b;\n}\n\nint main() {\n    int n;\n    scanf(\"%d\", &n);\n    printf(\"%lld\\n\", steps(n));\n    return 0;\n}"
 },
 {
  "id": "cppq-7-19",
  "lesson": 7,
  "tier": 5,
  "title": "T11 走方格",
  "hint": "习题",
  "alt": false,
  "code": "#include <cstdio>\n\nlong long ways(int n, int m) {\n    long long dp[11][11] = {0};\n    for (int i = 0; i <= n; i++) dp[i][0] = 1;\n    for (int j = 0; j <= m; j++) dp[0][j] = 1;\n    for (int i = 1; i <= n; i++)\n        for (int j = 1; j <= m; j++)\n            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];\n    return dp[n][m];\n}\n\nint main() {\n    int n, m;\n    scanf(\"%d%d\", &n, &m);\n    printf(\"%lld\\n\", ways(n, m));\n    return 0;\n}"
 },
 {
  "id": "cppq-7-20",
  "lesson": 7,
  "tier": 5,
  "title": "T12 排列",
  "hint": "习题",
  "alt": false,
  "code": "#include <cstdio>\n#include <algorithm>\n\nvoid show_permutations(int n) {\n    int a[10];\n    for (int i = 0; i < n; i++) a[i] = i + 1;\n    do {\n        for (int i = 0; i < n; i++)\n            printf(\"%d%c\", a[i], i + 1 < n ? ' ' : '\\n');\n    } while (std::next_permutation(a, a + n));\n}\n\nint main() {\n    int n;\n    scanf(\"%d\", &n);\n    show_permutations(n);\n    return 0;\n}"
 }
];
