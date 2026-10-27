#!/usr/bin/env python3
# 生成两门语言的语法题库数据，一门语言一张卡：
#   data/pybank.js  —— 《Python 语法题库》：每题的 solution.py；同题若还有第二种 Python 解法
#                      （solution2.py / solution_2.py …）就再占一关，各记各的星
#   data/cppbank.js —— 《C++ 语法题库》：只收题库里本来就有 solution.cpp 的题
# 关卡代码 = 参考题解原文，只做两件事：
#   ① 去掉含中文的注释（中文没法在打字战场里敲）；
#   ② 去掉行尾空白与首尾空行。
# 题目来源：13_专业课实验/题库（实验0 新手入门 + 实验一）与
#           04_语法题库/acw_grammar_bank（第2~7章，按专业课的实验次序重排）。
# 用法：python3 data/build_pybank.py [--report]
import io
import json
import os
import sys
import tokenize

# 本脚本的闸门全部写成 assert；python -O / PYTHONOPTIMIZE=1 会把它们整批剥掉，
# 于是中文、超宽行、超长文件都能静默写进产物。宁可不跑也别带着失效闸门跑。
if not __debug__:
    sys.exit('本脚本用 assert 当闸门：请勿用 python -O / PYTHONOPTIMIZE=1 运行')

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..', '..', '..'))   # AI协同工作区/
PRO = os.path.join(ROOT, '2026Python程序设计/13_专业课实验/题库')
ACW = os.path.join(ROOT, '2026Python程序设计/04_语法题库/acw_grammar_bank')

TIER = 5          # 与 llm.js 一致：用最宽的星级门槛（3★ = 34wpm / 95%）
MAX_W = 170       # 代码面板单行上限（实测最长 163，见 第5章 P03）
EXPECT_PY_PROBLEMS = 136   # 8 个实验的题目总数
EXPECT_CPP_LEVELS = 16     # 题库里已有 C++ 参考题解的题数（全落在这 8 个实验里）
SUF = ['', 'b', 'c', 'd']  # 同题多解法的关卡 id 后缀

MODULES = ['起步与输入输出', '流程控制', '数据容器', '函数与映射']
CN = ['0', '一', '二', '三', '四', '五', '六', '七']   # 与手册一致：实验0、实验一…实验七

# no = 实验号（0 是新手村）。dirs 里的顺序就是关卡顺序。
LESSONS = [
    dict(no=0, mod=0, title='新手入门', src='6 顺序语句 + 10 课本基础',
         dirs=[(PRO, '实验0_新手入门/例题')]),
    dict(no=1, mod=0, title='变量、输入输出与顺序语句', src='7 例题 + 7 习题',
         dirs=[(PRO, '实验一_变量输入输出与顺序语句/例题'),
               (PRO, '实验一_变量输入输出与顺序语句/习题')]),
    dict(no=2, mod=1, title='判断语句', src='7 例题 + 9 习题',
         dirs=[(ACW, '第2章_判断语句/例题'), (ACW, '第2章_判断语句/习题')]),
    dict(no=3, mod=1, title='循环语句', src='9 例题 + 11 习题',
         dirs=[(ACW, '第3章_循环语句/例题'), (ACW, '第3章_循环语句/习题')]),
    dict(no=4, mod=2, title='数组与列表', src='9 例题 + 11 习题',
         dirs=[(ACW, '第4章_数组/例题'), (ACW, '第4章_数组/习题')]),
    dict(no=5, mod=2, title='字符串', src='7 例题 + 13 习题',
         dirs=[(ACW, '第5章_字符串/例题'), (ACW, '第5章_字符串/习题')]),
    dict(no=6, mod=3, title='元组、集合和字典', src='5 例题 + 5 习题',
         dirs=[(ACW, '第7章_元组集合和字典/例题'), (ACW, '第7章_元组集合和字典/习题')]),
    dict(no=7, mod=3, title='函数', src='8 例题 + 12 习题',
         dirs=[(ACW, '第6章_函数/例题'), (ACW, '第6章_函数/习题')]),
]


def drop_cn_comments(src):
    """删掉含中文的注释（保留同行的代码），并清掉行尾空白。"""
    spans = {}
    for tok in tokenize.generate_tokens(io.StringIO(src).readline):
        if tok.type == tokenize.COMMENT and not tok.string.isascii():
            spans.setdefault(tok.start[0] - 1, []).append((tok.start[1], tok.end[1]))
    lines = src.splitlines()
    for i, sp in spans.items():
        ln = lines[i]
        for a, b in sorted(sp, reverse=True):
            ln = ln[:a] + ln[b:]
        lines[i] = ln.rstrip()
    return [ln.rstrip() for ln in lines]


def cpp_comment_spans(src):
    """扫出 C++ 注释的绝对偏移 [起, 止)。

    不能拿 Python 的 tokenize 扫 C++：`#include <cstdio>  // 中文` 在 Python 眼里是
    一整条注释，会把整行连 #include 一起删掉。字符串里的 // 同理。
    """
    spans, i, n = [], 0, len(src)
    while i < n:
        c = src[i]
        if c in '"\'':
            j = i + 1
            while j < n and src[j] != c:
                j += 2 if src[j] == '\\' else 1
            i = j + 1                                   # 跳过收尾引号（未闭合时越界即止）
        elif src.startswith('//', i):
            j = src.find('\n', i)
            j = n if j < 0 else j
            spans.append((i, j))
            i = j
        elif src.startswith('/*', i):
            j = src.find('*/', i + 2)
            j = n if j < 0 else j + 2
            spans.append((i, j))
            i = j
        else:
            i += 1
    return spans


def code_of(path):
    src = open(path, encoding='utf-8').read()
    if path.endswith('.cpp'):
        # 只删非 ASCII 的注释；块注释里的换行必须留着，否则会把上下两行代码粘成一行。
        spans = [sp for sp in cpp_comment_spans(src) if not src[sp[0]:sp[1]].isascii()]
        for a, b in reversed(spans):
            src = src[:a] + '\n' * src[a:b].count('\n') + src[b:]
        lines = src.splitlines()
    else:
        lines = drop_cn_comments(src)
    while lines and not lines[0].strip():
        lines.pop(0)
    while lines and not lines[-1].strip():
        lines.pop()
    return '\n'.join(lines)


def solution_files(pdir, ext):
    """同一题同一语言的解法文件：solution<ext> 永远排第一，其余（solution2.py 之类）按名字。
    一份都没有时返回空列表 —— 题目没有这种语言的参考题解，就不进那张卡。"""
    fs = [f for f in os.listdir(pdir) if f.startswith('solution') and f.endswith(ext)]
    return sorted(fs, key=lambda f: (f != 'solution' + ext, f))


def make_level(sid, no, title, hint, alt, code, is_py):
    assert code.isascii(), f'{sid} 含非 ASCII: {code[:60]!r}'
    if is_py:
        compile(code, sid, 'exec')
    else:
        # C++ 关卡必须是完整程序：注释扫描器误吞时，最先丢的就是这两行
        assert '#include' in code and 'main' in code, f'{sid} 不像完整的 C++ 程序'
    nl = code.count('\n') + 1
    assert 1 <= nl <= 25, f'{sid} 行数 {nl}'
    wide = [ln for ln in code.split('\n') if len(ln) > MAX_W]
    assert not wide, f'{sid} 行过宽 {len(wide[0])}: {wide[0][:60]}'
    return {'id': sid, 'lesson': no, 'tier': TIER, 'title': title,
            'hint': hint, 'alt': alt, 'code': code}


def main():
    report = '--report' in sys.argv
    seen = set()
    py_out, py_lessons = [], []
    cpp_out, cpp_lessons = [], []

    for L in LESSONS:
        no, p, lv, cp, clv = L['no'], 0, 0, 0, 0
        for base, rel in L['dirs']:
            d = os.path.join(base, rel)
            assert os.path.isdir(d), f'题目录缺失: {d}'
            kind = rel.rsplit('/', 1)[1]            # 例题 / 习题
            for dirname in sorted(os.listdir(d)):
                pdir = os.path.join(d, dirname)
                if not os.path.isdir(pdir):
                    continue
                py_files = solution_files(pdir, '.py')
                assert py_files, f'缺 Python 参考题解: {pdir}'
                p += 1
                tag, _, name = dirname.partition('_')
                title = f'{tag} {name}'.strip() if name else dirname

                for i, f in enumerate(py_files):
                    sid = 'pyq-%d-%02d%s' % (no, p, SUF[i])
                    assert sid not in seen, sid
                    seen.add(sid)
                    py_out.append(make_level(
                        sid, no, title, kind if i == 0 else kind + ' · 解法二',
                        i > 0, code_of(os.path.join(pdir, f)), True))
                    lv += 1

                cpp_files = solution_files(pdir, '.cpp')
                if cpp_files:
                    cp += 1
                for i, f in enumerate(cpp_files):
                    sid = 'cppq-%d-%02d%s' % (no, p, SUF[i])
                    assert sid not in seen, sid
                    seen.add(sid)
                    cpp_out.append(make_level(
                        sid, no, title, kind if i == 0 else kind + ' · 解法二',
                        i > 0, code_of(os.path.join(pdir, f)), False))
                    clv += 1

        py_lessons.append({'no': no, 'mod': L['mod'], 'label': '实验' + CN[no],
                           'title': L['title'], 'src': L['src'], 'p': p, 'n': lv})
        if cp:
            cpp_lessons.append({'no': no, 'mod': L['mod'], 'label': '实验' + CN[no],
                                'title': L['title'], 'src': L['src'], 'p': cp, 'n': clv})

    py_alts = sum(1 for s in py_out if s['alt'])
    assert len(py_lessons) == 8 and len(py_lessons) == len(LESSONS)
    assert sum(l['p'] for l in py_lessons) == EXPECT_PY_PROBLEMS, \
        '%d 题 ≠ %d，先人工确认题目录' % (sum(l['p'] for l in py_lessons), EXPECT_PY_PROBLEMS)
    assert len(py_out) == EXPECT_PY_PROBLEMS + py_alts   # Python 卡：一题至少一关
    assert len(cpp_out) == EXPECT_CPP_LEVELS, \
        'C++ 关数变成 %d（应为 %d），先人工确认题库' % (len(cpp_out), EXPECT_CPP_LEVELS)
    assert sum(l['n'] for l in cpp_lessons) == len(cpp_out)

    if report:
        for l in py_lessons:
            lens = [len(s['code'].split('\n')) for s in py_out if s['lesson'] == l['no']]
            print(f'Python 实验{l["no"]} {l["title"]}: {l["p"]} 题 / {l["n"]} 关'
                  f' · 代码 {min(lens)}–{max(lens)} 行')
        for l in cpp_lessons:
            lens = [len(s['code'].split('\n')) for s in cpp_out if s['lesson'] == l['no']]
            print(f'C++    实验{l["no"]} {l["title"]}: {l["p"]} 题 / {l["n"]} 关'
                  f' · 代码 {min(lens)}–{max(lens)} 行')
        print(f'\nPython 卡 {len(py_lessons)} 个实验 / {EXPECT_PY_PROBLEMS} 题 / {len(py_out)} 关'
              f'（同题多解法 {py_alts} 关） / {sum(len(s["code"]) for s in py_out)} 字符')
        print(f'C++    卡 {len(cpp_lessons)} 个实验 / {sum(l["p"] for l in cpp_lessons)} 题 / '
              f'{len(cpp_out)} 关 / {sum(len(s["code"]) for s in cpp_out)} 字符')
        return

    write_bank('pybank.js', 'PY', py_lessons, py_out)
    write_bank('cppbank.js', 'CPPQ', cpp_lessons, cpp_out)


def write_bank(name, ns, lessons, out):
    head = ('/* 自动生成，勿手改 —— 源: data/build_pybank.py\n'
            f'   {name}：{len(lessons)} 个实验 / {len(out)} 关，'
            '代码取自每题参考题解（同题有第二份同语言解法就再占一关） */\n')
    body = (head
            + f'window.{ns}_MODULES = ' + json.dumps(MODULES, ensure_ascii=False) + ';\n'
            f'window.{ns}_LESSONS = ' + json.dumps(lessons, ensure_ascii=False, indent=1) + ';\n'
            f'window.{ns}_SNIPPETS = ' + json.dumps(out, ensure_ascii=False, indent=1) + ';\n')
    dst = os.path.join(HERE, name)
    open(dst, 'w', encoding='utf-8').write(body)
    print(f'{dst}: {len(lessons)} 个实验 / {len(out)} 关 / '
          f'{sum(len(s["code"]) for s in out)} 字符')


if __name__ == '__main__':
    main()
