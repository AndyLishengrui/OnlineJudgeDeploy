#!/usr/bin/env python3
"""生成 data/cppbank_extra.js：C++ 语法题库实验四/五/七。

实验七从 3 关扩到 20 关，与 Python 语法题库 P01-P08 / T01-T12 一一对应，
每关都定义独立函数；用 OJ 官方样例逐题校验编译与输出。
"""
import json
import os
import re
import subprocess

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, 'cppbank_extra.js')

# 实验四/五沿用 2026-11-04 已上线的 6 关（只保留元数据 + code）
LESSON45 = [{'alt': False,
  'code': '#include <cstdio>\n'
          'int main(){\n'
          '    int n;\n'
          '    scanf("%d", &n);\n'
          '    int a[1005];\n'
          '    for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n'
          '    for (int i = n - 1; i >= 0; i--) printf("%d%c", a[i], i ? \' \' : \'\\n\');\n'
          '    return 0;\n'
          '}',
  'hint': '习题',
  'id': 'cppq-4-01',
  'lesson': 4,
  'tier': 5,
  'title': 'T01 数组逆序'},
 {'alt': False,
  'code': '#include <cstdio>\n'
          'int main(){\n'
          '    int n, x;\n'
          '    long long sum = 0;\n'
          '    scanf("%d", &n);\n'
          '    for (int i = 0; i < n; i++){ scanf("%d", &x); sum += x; }\n'
          '    printf("%lld\\n", sum);\n'
          '    return 0;\n'
          '}',
  'hint': '习题',
  'id': 'cppq-4-02',
  'lesson': 4,
  'tier': 5,
  'title': 'T02 数组求和'},
 {'alt': False,
  'code': '#include <cstdio>\n'
          'int main(){\n'
          '    int n;\n'
          '    scanf("%d", &n);\n'
          '    int a[1005];\n'
          '    for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n'
          '    for (int i = 0; i < n - 1; i++)\n'
          '        for (int j = 0; j < n - 1 - i; j++)\n'
          '            if (a[j] > a[j + 1]){\n'
          '                int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;\n'
          '            }\n'
          '    for (int i = 0; i < n; i++) printf("%d%c", a[i], i + 1 < n ? \' \' : \'\\n\');\n'
          '    return 0;\n'
          '}',
  'hint': '习题',
  'id': 'cppq-4-03',
  'lesson': 4,
  'tier': 5,
  'title': 'T03 冒泡排序'},
 {'alt': False,
  'code': '#include <cstdio>\n'
          '#include <cstring>\n'
          'int main(){\n'
          '    char s[1005];\n'
          '    scanf("%s", s);\n'
          '    int d = 0, a = 0;\n'
          '    for (int i = 0; s[i]; i++){\n'
          "        if (s[i] >= '0' && s[i] <= '9') d++;\n"
          "        else if (s[i] >= 'a' && s[i] <= 'z') a++;\n"
          '    }\n'
          '    printf("%d %d\\n", d, a);\n'
          '    return 0;\n'
          '}',
  'hint': '习题',
  'id': 'cppq-5-01',
  'lesson': 5,
  'tier': 5,
  'title': 'T01 字符统计'},
 {'alt': False,
  'code': '#include <cstdio>\n'
          '#include <cstring>\n'
          'int main(){\n'
          '    char s[1005];\n'
          '    scanf("%s", s);\n'
          '    int L = strlen(s);\n'
          '    for (int i = L - 1; i >= 0; i--) putchar(s[i]);\n'
          "    putchar('\\n');\n"
          '    return 0;\n'
          '}',
  'hint': '习题',
  'id': 'cppq-5-02',
  'lesson': 5,
  'tier': 5,
  'title': 'T02 字符串反转'},
 {'alt': False,
  'code': '#include <cstdio>\n'
          '#include <cstring>\n'
          'int main(){\n'
          '    char s[1005];\n'
          '    scanf("%s", s);\n'
          '    int L = strlen(s), ok = 1;\n'
          '    for (int i = 0; i < L / 2; i++)\n'
          '        if (s[i] != s[L - 1 - i]){ ok = 0; break; }\n'
          '    printf("%s\\n", ok ? "yes" : "no");\n'
          '    return 0;\n'
          '}',
  'hint': '习题',
  'id': 'cppq-5-03',
  'lesson': 5,
  'tier': 5,
  'title': 'T03 回文判断'}]

# (题号, 标题, hint, 代码)
L7 = [
('P01 n的阶乘', '例题', '''#include <cstdio>

long long fact(int n) {
    long long r = 1;
    for (int i = 2; i <= n; i++) r *= i;
    return r;
}

int main() {
    int n;
    scanf("%d", &n);
    printf("%lld\\n", fact(n));
    return 0;
}'''),
('P02 x和y的最大值', '例题', '''#include <cstdio>

int max2(int x, int y) {
    return x > y ? x : y;
}

int main() {
    int x, y;
    scanf("%d%d", &x, &y);
    printf("%d\\n", max2(x, y));
    return 0;
}'''),
('P03 最大公约数', '例题', '''#include <cstdio>

int gcd(int a, int b) {
    while (b) {
        int t = a % b;
        a = b;
        b = t;
    }
    return a;
}

int main() {
    int a, b;
    scanf("%d%d", &a, &b);
    printf("%d\\n", gcd(a, b));
    return 0;
}'''),
('P04 交换数值', '例题', '''#include <cstdio>

void swap2(int *a, int *b) {
    int t = *a;
    *a = *b;
    *b = t;
}

int main() {
    int x, y;
    scanf("%d%d", &x, &y);
    swap2(&x, &y);
    printf("%d %d\\n", x, y);
    return 0;
}'''),
('P05 打印数字', '例题', '''#include <cstdio>

void print_nums(int a[], int size) {
    for (int i = 0; i < size; i++)
        printf("%d%c", a[i], i + 1 < size ? ' ' : '\\n');
}

int main() {
    int n, size;
    scanf("%d%d", &n, &size);
    int a[1005];
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    print_nums(a, size);
    return 0;
}'''),
('P06 打印矩阵', '例题', '''#include <cstdio>

void print_matrix(int a[][100], int r, int c) {
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++)
            printf("%d%c", a[i][j], j + 1 < c ? ' ' : '\\n');
}

int main() {
    int r, c;
    scanf("%d%d", &r, &c);
    int a[100][100];
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++) scanf("%d", &a[i][j]);
    print_matrix(a, r, c);
    return 0;
}'''),
('P07 递归求阶乘', '例题', '''#include <cstdio>

long long fact(int n) {
    if (n <= 1) return 1;
    return n * fact(n - 1);
}

int main() {
    int n;
    scanf("%d", &n);
    printf("%lld\\n", fact(n));
    return 0;
}'''),
('P08 递归求斐波那契数列', '例题', '''#include <cstdio>

long long fib(int n) {
    if (n <= 2) return 1;
    return fib(n - 1) + fib(n - 2);
}

int main() {
    int n;
    scanf("%d", &n);
    printf("%lld\\n", fib(n));
    return 0;
}'''),
('T01 绝对值', '习题', '''#include <cstdio>

int absval(int x) {
    return x >= 0 ? x : -x;
}

int main() {
    int x;
    scanf("%d", &x);
    printf("%d\\n", absval(x));
    return 0;
}'''),
('T02 两个数的和', '习题', '''#include <cstdio>

double add(double a, double b) {
    return a + b;
}

int main() {
    double a, b;
    scanf("%lf%lf", &a, &b);
    printf("%.2f\\n", add(a, b));
    return 0;
}'''),
('T03 区间求和', '习题', '''#include <cstdio>

long long range_sum(int l, int r) {
    long long s = 0;
    for (int i = l; i <= r; i++) s += i;
    return s;
}

int main() {
    int l, r;
    scanf("%d%d", &l, &r);
    printf("%lld\\n", range_sum(l, r));
    return 0;
}'''),
('T04 最小公倍数', '习题', '''#include <cstdio>

long long gcd(long long a, long long b) {
    while (b) {
        long long t = a % b;
        a = b;
        b = t;
    }
    return a;
}

long long lcm(long long a, long long b) {
    return a / gcd(a, b) * b;
}

int main() {
    long long a, b;
    scanf("%lld%lld", &a, &b);
    printf("%lld\\n", lcm(a, b));
    return 0;
}'''),
('T05 复制数组', '习题', '''#include <cstdio>

void copy_part(int a[], int b[], int size) {
    for (int i = 0; i < size; i++) b[i] = a[i];
}

int main() {
    int n, m, size;
    scanf("%d%d%d", &n, &m, &size);
    int a[1005], b[1005];
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    for (int i = 0; i < m; i++) scanf("%d", &b[i]);
    copy_part(a, b, size);
    for (int i = 0; i < m; i++)
        printf("%d%c", b[i], i + 1 < m ? ' ' : '\\n');
    return 0;
}'''),
('T06 打印字符串', '习题', '''#include <cstdio>
#include <cstring>

void print_chars(char s[]) {
    for (int i = 0; i < (int)strlen(s); i++)
        printf("%c\\n", s[i]);
}

int main() {
    char s[1005];
    scanf("%s", s);
    print_chars(s);
    return 0;
}'''),
('T07 数组翻转', '习题', '''#include <cstdio>

void reverse_part(int a[], int size) {
    for (int i = 0, j = size - 1; i < j; i++, j--) {
        int t = a[i];
        a[i] = a[j];
        a[j] = t;
    }
}

int main() {
    int n, size;
    scanf("%d%d", &n, &size);
    int a[1005];
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    reverse_part(a, size);
    for (int i = 0; i < n; i++)
        printf("%d%c", a[i], i + 1 < n ? ' ' : '\\n');
    return 0;
}'''),
('T08 数组去重', '习题', '''#include <cstdio>

int unique_count(int a[], int n) {
    int cnt = 0;
    for (int i = 0; i < n; i++) {
        bool seen = false;
        for (int j = 0; j < cnt; j++)
            if (a[j] == a[i]) { seen = true; break; }
        if (!seen) a[cnt++] = a[i];
    }
    return cnt;
}

int main() {
    int n;
    scanf("%d", &n);
    int a[1005];
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    int m = unique_count(a, n);
    for (int i = 0; i < m; i++)
        printf("%d%c", a[i], i + 1 < m ? ' ' : '\\n');
    return 0;
}'''),
('T09 数组排序', '习题', '''#include <cstdio>
#include <algorithm>

void sort_part(int a[], int l, int r) {
    std::sort(a + l, a + r + 1);
}

int main() {
    int n, l, r;
    scanf("%d%d%d", &n, &l, &r);
    int a[1005];
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    sort_part(a, l, r);
    for (int i = 0; i < n; i++)
        printf("%d%c", a[i], i + 1 < n ? ' ' : '\\n');
    return 0;
}'''),
('T10 跳台阶', '习题', '''#include <cstdio>

long long steps(int n) {
    if (n <= 2) return n;
    long long a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        long long c = a + b;
        a = b;
        b = c;
    }
    return b;
}

int main() {
    int n;
    scanf("%d", &n);
    printf("%lld\\n", steps(n));
    return 0;
}'''),
('T11 走方格', '习题', '''#include <cstdio>

long long ways(int n, int m) {
    long long dp[11][11] = {0};
    for (int i = 0; i <= n; i++) dp[i][0] = 1;
    for (int j = 0; j <= m; j++) dp[0][j] = 1;
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    return dp[n][m];
}

int main() {
    int n, m;
    scanf("%d%d", &n, &m);
    printf("%lld\\n", ways(n, m));
    return 0;
}'''),
('T12 排列', '习题', '''#include <cstdio>
#include <algorithm>

void show_permutations(int n) {
    int a[10];
    for (int i = 0; i < n; i++) a[i] = i + 1;
    do {
        for (int i = 0; i < n; i++)
            printf("%d%c", a[i], i + 1 < n ? ' ' : '\\n');
    } while (std::next_permutation(a, a + n));
}

int main() {
    int n;
    scanf("%d", &n);
    show_permutations(n);
    return 0;
}'''),
]

SAMPLES = [
    ('3', '6'), ('3 5', '5'), ('12 16\n', '4\n'), ('3 5\n', '5 3\n'),
    ('5 3\n1 2 3 4 5\n', '1 2 3\n'),
    ('3 4\n1 3 4 5\n2 6 9 4\n1 4 7 5\n', '1 3 4 5\n2 6 9 4\n1 4 7 5\n'),
    ('5', '120'), ('4\n', '3\n'), ('-5', '5'), ('1.5\n2.3', '3.80'),
    ('1 5', '15'), ('6 8', '24'), ('3 5 2\n1 2 3\n4 5 6 7 8\n', '1 2 6 7 8\n'),
    ('abc', 'a\nb\nc'), ('5 3\n1 2 3 4 5\n', '3 2 1 4 5\n'),
    ('6\n9 3 14 9 4 2', '9 3 14 4 2'), ('5 2 4\n4 5 1 3 2\n', '4 5 1 2 3\n'),
    ('5\n', '8\n'), ('2 3\n', '10\n'),
    ('3\n', '1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1\n'),
]


def run(code, inp):
    open('/tmp/cppbank_l7.cpp', 'w').write(code + '\n')
    r = subprocess.run(['g++', '-std=c++11', '-o', '/tmp/cppbank_l7.out', '/tmp/cppbank_l7.cpp'],
                       stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
    assert r.returncode == 0, r.stderr
    return subprocess.run(['/tmp/cppbank_l7.out'], input=inp, stdout=subprocess.PIPE,
                          stderr=subprocess.PIPE, universal_newlines=True).stdout


def main():
    lanes = list(LESSON45)
    for i, (title, hint, code) in enumerate(L7, 1):
        funcs = [m.group(1) for m in re.finditer(
            r'^\s*(?:int|void|long long|bool|double|char|string)\s+(\w+)\s*\([^)]*\)\s*\{',
            code, re.M)]
        assert any(f != 'main' for f in funcs), '%s 没有独立函数' % title
        nlines = code.count('\n') + 1
        assert nlines <= 25 and all(ord(c) < 128 for c in code), title
        inp, exp = SAMPLES[i - 1]
        out = run(code, inp).strip()
        assert out == exp.strip(), (title, out, exp)
        print('OK cppq-7-%02d %-22s %2d 行 funcs=%s' % (i, title.strip(), nlines, funcs))
        lanes.append({'id': 'cppq-7-%02d' % i, 'lesson': 7, 'tier': 5,
                      'title': title, 'hint': hint, 'alt': False, 'code': code})

    lessons = [
        {'no': 4, 'mod': 2, 'label': '实验四', 'title': '数组与列表',
         'src': 'C++ 参考解 3 题', 'p': 3, 'n': 3},
        {'no': 5, 'mod': 2, 'label': '实验五', 'title': '字符串',
         'src': 'C++ 参考解 3 题', 'p': 3, 'n': 3},
        {'no': 7, 'mod': 3, 'label': '实验七', 'title': '函数',
         'src': 'C++ 函数 20 题', 'p': 20, 'n': 20},
    ]
    head = ('/* 2026-11-04 手工补充，勿删 —— 源: data/build_cppbank_extra.py\n'
            '   cppbank_extra.js：C++ 语法题库缺的实验四/五各 3 关；\n'
            '   实验七「函数」20 关，与 Python P01-P08 / T01-T12 一一对应，全部用独立函数。\n'
            '   index.html 在 cppbank.js 之后加载，app.js 的 cppLessons/cppLanes 负责合并。 */\n')
    body = (head
            + 'window.CPPQ_EXTRA_LESSONS = '
            + json.dumps(lessons, ensure_ascii=False, indent=1) + ';\n'
            + 'window.CPPQ_EXTRA_SNIPPETS = '
            + json.dumps(lanes, ensure_ascii=False, indent=1) + ';\n')
    open(OUT, 'w', encoding='utf-8').write(body)
    print('\n写出 %s：%d 关（实验四/五/七：3/3/20）' % (OUT, len(lanes)))


if __name__ == '__main__':
    main()
