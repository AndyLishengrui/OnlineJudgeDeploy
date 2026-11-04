/* 2026-11-04 手工补充，勿删 —— 源: ~/pixeltyper_levels_20261104/apply_levels.py
   cppbank_extra.js：C++ 语法题库缺的实验四/五/七各补 3 关，
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
  "src": "C++ 参考解 3 题",
  "p": 3,
  "n": 3
 }
];
window.CPPQ_EXTRA_SNIPPETS = [
 {
  "id": "cppq-4-01",
  "lesson": 4,
  "tier": 5,
  "title": "T01 数组逆序",
  "hint": "习题",
  "alt": false,
  "code": "#include <cstdio>\nint main(){\n    int n;\n    scanf(\"%d\", &n);\n    int a[1005];\n    for (int i = 0; i < n; i++) scanf(\"%d\", &a[i]);\n    for (int i = n - 1; i >= 0; i--) printf(\"%d%c\", a[i], i ? ' ' : '\\n');\n    return 0;\n}"
 },
 {
  "id": "cppq-4-02",
  "lesson": 4,
  "tier": 5,
  "title": "T02 数组求和",
  "hint": "习题",
  "alt": false,
  "code": "#include <cstdio>\nint main(){\n    int n, x;\n    long long sum = 0;\n    scanf(\"%d\", &n);\n    for (int i = 0; i < n; i++){ scanf(\"%d\", &x); sum += x; }\n    printf(\"%lld\\n\", sum);\n    return 0;\n}"
 },
 {
  "id": "cppq-4-03",
  "lesson": 4,
  "tier": 5,
  "title": "T03 冒泡排序",
  "hint": "习题",
  "alt": false,
  "code": "#include <cstdio>\nint main(){\n    int n;\n    scanf(\"%d\", &n);\n    int a[1005];\n    for (int i = 0; i < n; i++) scanf(\"%d\", &a[i]);\n    for (int i = 0; i < n - 1; i++)\n        for (int j = 0; j < n - 1 - i; j++)\n            if (a[j] > a[j + 1]){\n                int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;\n            }\n    for (int i = 0; i < n; i++) printf(\"%d%c\", a[i], i + 1 < n ? ' ' : '\\n');\n    return 0;\n}"
 },
 {
  "id": "cppq-5-01",
  "lesson": 5,
  "tier": 5,
  "title": "T01 字符统计",
  "hint": "习题",
  "alt": false,
  "code": "#include <cstdio>\n#include <cstring>\nint main(){\n    char s[1005];\n    scanf(\"%s\", s);\n    int d = 0, a = 0;\n    for (int i = 0; s[i]; i++){\n        if (s[i] >= '0' && s[i] <= '9') d++;\n        else if (s[i] >= 'a' && s[i] <= 'z') a++;\n    }\n    printf(\"%d %d\\n\", d, a);\n    return 0;\n}"
 },
 {
  "id": "cppq-5-02",
  "lesson": 5,
  "tier": 5,
  "title": "T02 字符串反转",
  "hint": "习题",
  "alt": false,
  "code": "#include <cstdio>\n#include <cstring>\nint main(){\n    char s[1005];\n    scanf(\"%s\", s);\n    int L = strlen(s);\n    for (int i = L - 1; i >= 0; i--) putchar(s[i]);\n    putchar('\\n');\n    return 0;\n}"
 },
 {
  "id": "cppq-5-03",
  "lesson": 5,
  "tier": 5,
  "title": "T03 回文判断",
  "hint": "习题",
  "alt": false,
  "code": "#include <cstdio>\n#include <cstring>\nint main(){\n    char s[1005];\n    scanf(\"%s\", s);\n    int L = strlen(s), ok = 1;\n    for (int i = 0; i < L / 2; i++)\n        if (s[i] != s[L - 1 - i]){ ok = 0; break; }\n    printf(\"%s\\n\", ok ? \"yes\" : \"no\");\n    return 0;\n}"
 },
 {
  "id": "cppq-7-01",
  "lesson": 7,
  "tier": 5,
  "title": "T01 最大公约数",
  "hint": "习题",
  "alt": false,
  "code": "#include <cstdio>\nint gcd(int a, int b){\n    while (b){ int t = a % b; a = b; b = t; }\n    return a;\n}\nint main(){\n    int a, b;\n    scanf(\"%d%d\", &a, &b);\n    printf(\"%d\\n\", gcd(a, b));\n    return 0;\n}"
 },
 {
  "id": "cppq-7-02",
  "lesson": 7,
  "tier": 5,
  "title": "T02 素数判断",
  "hint": "习题",
  "alt": false,
  "code": "#include <cstdio>\nint is_prime(int n){\n    if (n < 2) return 0;\n    for (int i = 2; i * i <= n; i++)\n        if (n % i == 0) return 0;\n    return 1;\n}\nint main(){\n    int n;\n    scanf(\"%d\", &n);\n    printf(\"%s\\n\", is_prime(n) ? \"yes\" : \"no\");\n    return 0;\n}"
 },
 {
  "id": "cppq-7-03",
  "lesson": 7,
  "tier": 5,
  "title": "T03 斐波那契",
  "hint": "习题",
  "alt": false,
  "code": "#include <cstdio>\nlong long fib(int n){\n    if (n <= 2) return 1;\n    long long a = 1, b = 1;\n    for (int i = 3; i <= n; i++){ long long c = a + b; a = b; b = c; }\n    return b;\n}\nint main(){\n    int n;\n    scanf(\"%d\", &n);\n    printf(\"%lld\\n\", fib(n));\n    return 0;\n}"
 }
];
