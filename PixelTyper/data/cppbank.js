/* 自动生成，勿手改 —— 源: data/build_pybank.py
   cppbank.js：5 个实验 / 16 关，代码取自每题参考题解（同题有第二份同语言解法就再占一关） */
window.CPPQ_MODULES = ["起步与输入输出", "流程控制", "数据容器", "函数与映射"];
window.CPPQ_LESSONS = [
 {
  "no": 0,
  "mod": 0,
  "label": "实验0",
  "title": "新手入门",
  "src": "6 顺序语句 + 10 课本基础",
  "p": 1,
  "n": 1
 },
 {
  "no": 1,
  "mod": 0,
  "label": "实验一",
  "title": "变量、输入输出与顺序语句",
  "src": "7 例题 + 7 习题",
  "p": 3,
  "n": 3
 },
 {
  "no": 2,
  "mod": 1,
  "label": "实验二",
  "title": "判断语句",
  "src": "7 例题 + 9 习题",
  "p": 1,
  "n": 1
 },
 {
  "no": 3,
  "mod": 1,
  "label": "实验三",
  "title": "循环语句",
  "src": "9 例题 + 11 习题",
  "p": 1,
  "n": 1
 },
 {
  "no": 6,
  "mod": 3,
  "label": "实验六",
  "title": "元组、集合和字典",
  "src": "5 例题 + 5 习题",
  "p": 10,
  "n": 10
 }
];
window.CPPQ_SNIPPETS = [
 {
  "id": "cppq-0-06",
  "lesson": 0,
  "tier": 5,
  "title": "P06 燃料消耗",
  "hint": "例题",
  "alt": false,
  "code": "#include <cstdio>\nint main(){\n    long long t, v;\n    scanf(\"%lld %lld\", &t, &v);\n    printf(\"%.3f\\n\", t * v / 12.0);\n    return 0;\n}"
 },
 {
  "id": "cppq-1-11",
  "lesson": 1,
  "tier": 5,
  "title": "T04 工资和奖金",
  "hint": "习题",
  "alt": false,
  "code": "#include <cstdio>\nint main(){\n    char name[15];\n    double s, v;\n    scanf(\"%s %lf %lf\", name, &s, &v);\n    printf(\"TOTAL = R$ %.2f\\n\", s + v * 0.15);\n    return 0;\n}"
 },
 {
  "id": "cppq-1-13",
  "lesson": 1,
  "tier": 5,
  "title": "T06 距离",
  "hint": "习题",
  "alt": false,
  "code": "#include <cstdio>\nint main(){\n    long long L;\n    scanf(\"%lld\", &L);\n    printf(\"%lld minutos\\n\", L * 2);\n    return 0;\n}"
 },
 {
  "id": "cppq-1-14",
  "lesson": 1,
  "tier": 5,
  "title": "T07 钞票和硬币",
  "hint": "习题",
  "alt": false,
  "code": "#include <cstdio>\n#include <cmath>\nint main(){\n    double x;\n    scanf(\"%lf\", &x);\n    long long n = llround(x * 100);\n    int notes[] = {10000, 5000, 2000, 1000, 500, 200};\n    int coins[] = {100, 50, 25, 10, 5, 1};\n    printf(\"NOTAS:\\n\");\n    for (int v : notes){ printf(\"%lld nota(s) de R$ %.2f\\n\", n / v, v / 100.0); n %= v; }\n    printf(\"MOEDAS:\\n\");\n    for (int v : coins){ printf(\"%lld moeda(s) de R$ %.2f\\n\", n / v, v / 100.0); n %= v; }\n    return 0;\n}"
 },
 {
  "id": "cppq-2-16",
  "lesson": 2,
  "tier": 5,
  "title": "T09 平均数3",
  "hint": "习题",
  "alt": false,
  "code": "#include <cstdio>\nint main(){\n    double n1, n2, n3, n4, ne;\n    scanf(\"%lf %lf %lf %lf\", &n1, &n2, &n3, &n4);\n    double media = (n1 * 2 + n2 * 3 + n3 * 4 + n4) / 10;\n    printf(\"Media: %.1f\\n\", media);\n    if (media >= 7.0) printf(\"Aluno aprovado.\\n\");\n    else if (media < 5.0) printf(\"Aluno reprovado.\\n\");\n    else {\n        printf(\"Aluno em exame.\\n\");\n        scanf(\"%lf\", &ne);\n        printf(\"Nota do exame: %.1f\\n\", ne);\n        media = (media + ne) / 2;\n        printf(media >= 5.0 ? \"Aluno aprovado.\\n\" : \"Aluno reprovado.\\n\");\n        printf(\"Media final: %.1f\\n\", media);\n    }\n    return 0;\n}"
 },
 {
  "id": "cppq-3-15",
  "lesson": 3,
  "tier": 5,
  "title": "T06 连续奇数的和2",
  "hint": "习题",
  "alt": false,
  "code": "#include <cstdio>\nint main(){\n    int n, x, y;\n    scanf(\"%d\", &n);\n    while (n--){\n        scanf(\"%d %d\", &x, &y);\n        if (x > y){ int t = x; x = y; y = t; }\n        long long s = 0;\n        for (int i = x + 1 + ((x + 1) % 2 == 0); i < y; i += 2) s += i;\n        printf(\"%lld\\n\", s);\n    }\n    return 0;\n}"
 },
 {
  "id": "cppq-6-01",
  "lesson": 6,
  "tier": 5,
  "title": "P01 不同正整数的个数",
  "hint": "例题",
  "alt": false,
  "code": "#include <cstdio>\n#include <set>\nusing namespace std;\nint main(){\n    int n, x;\n    scanf(\"%d\", &n);\n    set<int> s;\n    for (int i = 0; i < n; i++){ scanf(\"%d\", &x); if (x > 0) s.insert(x); }\n    printf(\"%d\\n\", (int)s.size());\n    return 0;\n}"
 },
 {
  "id": "cppq-6-02",
  "lesson": 6,
  "tier": 5,
  "title": "P02 模拟散列表",
  "hint": "例题",
  "alt": false,
  "code": "#include <cstdio>\n#include <unordered_set>\nusing namespace std;\nint main(){\n    int n;\n    scanf(\"%d\", &n);\n    unordered_set<long long> s;\n    char op[2];\n    long long x;\n    while (n--){\n        scanf(\"%s %lld\", op, &x);\n        if (op[0] == 'I') s.insert(x);\n        else printf(\"%s\\n\", s.count(x) ? \"Yes\" : \"No\");\n    }\n    return 0;\n}"
 },
 {
  "id": "cppq-6-03",
  "lesson": 6,
  "tier": 5,
  "title": "P03 字符串赋值",
  "hint": "例题",
  "alt": false,
  "code": "#include <cstdio>\n#include <string>\n#include <unordered_map>\nusing namespace std;\nint main(){\n    int n, m, a;\n    char s[15];\n    scanf(\"%d\", &n);\n    unordered_map<string, int> d;\n    while (n--){ scanf(\"%s %d\", s, &a); d[s] = a; }\n    scanf(\"%d\", &m);\n    while (m--){\n        scanf(\"%s\", s);\n        auto it = d.find(s);\n        printf(\"%d\\n\", it == d.end() ? -1 : it->second);\n    }\n    return 0;\n}"
 },
 {
  "id": "cppq-6-04",
  "lesson": 6,
  "tier": 5,
  "title": "P04 门禁系统",
  "hint": "例题",
  "alt": false,
  "code": "#include <cstdio>\n#include <unordered_map>\nusing namespace std;\nint main(){\n    int n, x;\n    scanf(\"%d\", &n);\n    unordered_map<int, int> cnt;\n    for (int i = 0; i < n; i++){\n        scanf(\"%d\", &x);\n        printf(\"%s%d\", i ? \" \" : \"\", ++cnt[x]);\n    }\n    printf(\"\\n\");\n    return 0;\n}"
 },
 {
  "id": "cppq-6-05",
  "lesson": 6,
  "tier": 5,
  "title": "P05 数字排序",
  "hint": "例题",
  "alt": false,
  "code": "#include <cstdio>\n#include <map>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main(){\n    int n, x;\n    scanf(\"%d\", &n);\n    map<int, int> cnt;\n    while (n--){ scanf(\"%d\", &x); cnt[x]++; }\n    vector<pair<int,int>> v(cnt.begin(), cnt.end());\n    sort(v.begin(), v.end(), [](const pair<int,int>&a, const pair<int,int>&b){\n        return a.second != b.second ? a.second > b.second : a.first < b.first;\n    });\n    for (auto& p : v) printf(\"%d %d\\n\", p.first, p.second);\n    return 0;\n}"
 },
 {
  "id": "cppq-6-06",
  "lesson": 6,
  "tier": 5,
  "title": "T01 奇偶",
  "hint": "习题",
  "alt": false,
  "code": "#include <iostream>\n#include <string>\n#include <set>\nusing namespace std;\nint main(){\n    string s;\n    cin >> s;\n    set<char> st(s.begin(), s.end());\n    printf(\"%s\\n\", st.size() % 2 ? \"odd\" : \"even\");\n    return 0;\n}"
 },
 {
  "id": "cppq-6-07",
  "lesson": 6,
  "tier": 5,
  "title": "T02 字符串",
  "hint": "习题",
  "alt": false,
  "code": "#include <iostream>\n#include <string>\n#include <set>\n#include <cctype>\nusing namespace std;\nint main(){\n    int n;\n    string s;\n    cin >> n >> s;\n    set<char> st;\n    for (char c : s) st.insert(tolower(c));\n    printf(\"%s\\n\", st.size() == 26 ? \"YES\" : \"NO\");\n    return 0;\n}"
 },
 {
  "id": "cppq-6-08",
  "lesson": 6,
  "tier": 5,
  "title": "T03 查找",
  "hint": "习题",
  "alt": false,
  "code": "#include <cstdio>\n#include <unordered_set>\nusing namespace std;\nint main(){\n    int n, m;\n    long long x;\n    scanf(\"%d\", &n);\n    unordered_set<long long> a;\n    while (n--){ scanf(\"%lld\", &x); a.insert(x); }\n    scanf(\"%d\", &m);\n    while (m--){\n        scanf(\"%lld\", &x);\n        printf(\"%s\\n\", a.count(x) ? \"YES\" : \"NO\");\n    }\n    return 0;\n}"
 },
 {
  "id": "cppq-6-09",
  "lesson": 6,
  "tier": 5,
  "title": "T04 出现次数最多的数",
  "hint": "习题",
  "alt": false,
  "code": "#include <cstdio>\n#include <map>\nusing namespace std;\nint main(){\n    int n, x;\n    scanf(\"%d\", &n);\n    map<int, int> cnt;\n    while (n--){ scanf(\"%d\", &x); cnt[x]++; }\n    int best = -1, bc = -1;\n    for (auto& p : cnt)\n        if (p.second > bc){ bc = p.second; best = p.first; }\n    printf(\"%d\\n\", best);\n    return 0;\n}"
 },
 {
  "id": "cppq-6-10",
  "lesson": 6,
  "tier": 5,
  "title": "T05 子串计算",
  "hint": "习题",
  "alt": false,
  "code": "#include <iostream>\n#include <string>\n#include <map>\nusing namespace std;\nint main(){\n    string s;\n    while (cin >> s){\n        map<string, int> cnt;\n        int L = s.size();\n        for (int i = 0; i < L; i++)\n            for (int j = i + 1; j <= L; j++)\n                cnt[s.substr(i, j - i)]++;\n        for (auto& p : cnt)\n            if (p.second > 1) printf(\"%s %d\\n\", p.first.c_str(), p.second);\n    }\n    return 0;\n}"
 }
];
