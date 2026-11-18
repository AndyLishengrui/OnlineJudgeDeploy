#!/usr/bin/env python3
# 生成《Python 公共课 PTA 题库》卡片数据：data/ptabank.js
#
# 题目来源：OJ Contest 483「公共课 PTA 题库」（72 题，PTA1.1 … PTA10.9）。
# 关卡代码 = 每题 hint 里「📖 参考题解」页上的「参考代码（Python3）」与「另一种写法」，
# 同题两种写法各占一关（与 pybank.js 的「同题多解法」口径一致）。
#
# 抓取/缓存由外部脚本完成（fetch_pages.py → pages.json），本脚本只负责清洗与打包：
#   ① 去掉含中文的注释（中文没法在打字战场里敲）；
#   ② 去掉行尾空白与首尾空行；
#   ③ 清洗后仍含非 ASCII 的代码块（例如 print("该数是偶数") 这类中文字符串）：
#      若 pta_en_overrides.json 里有该块的英译版就用英译版（原题解页不动），
#      否则跳过 —— 打字战场只能输入英文。
#
# 用法：python3 data/build_ptabank.py [--pages pta_pages.json] [--report]
import io
import json
import os
import sys
import tokenize

if not __debug__:
    sys.exit('本脚本用 assert 当闸门：请勿用 python -O / PYTHONOPTIMIZE=1 运行')

HERE = os.path.dirname(os.path.abspath(__file__))
TIER = 5
MAX_W = 170
MAX_LINES = 40

# 周次 → 模块列（周次缺 5、9，是题库本身如此）
MODULES = ['基础与顺序结构', '列表与字符串', '选择与循环', '字典与查询']
WEEK_MOD = {1: 0, 2: 0, 3: 1, 4: 2, 6: 2, 7: 2, 8: 2, 10: 3}
CN = '一二三四五六七八九十'
SUF = ['', 'b']


def isascii(s):
    return all(ord(ch) < 128 for ch in s)


def drop_cn_comments(src):
    """删掉含中文的注释（保留同行的代码），并清掉行尾空白。"""
    spans = {}
    for tok in tokenize.generate_tokens(io.StringIO(src).readline):
        if tok.type == tokenize.COMMENT and not isascii(tok.string):
            spans.setdefault(tok.start[0] - 1, []).append((tok.start[1], tok.end[1]))
    lines = src.splitlines()
    for i, sp in spans.items():
        ln = lines[i]
        for a, b in sorted(sp, reverse=True):
            ln = ln[:a] + ln[b:]
        lines[i] = ln.rstrip()
    return [ln.rstrip() for ln in lines]


def code_of(src):
    lines = drop_cn_comments(src)
    while lines and not lines[0].strip():
        lines.pop(0)
    while lines and not lines[-1].strip():
        lines.pop()
    return '\n'.join(lines)


def week_of(pid):
    assert pid.startswith('PTA') and '.' in pid, pid
    return int(pid[3:pid.index('.')])


def week_title(crumb):
    tail = crumb.split('·', 1)[-1].strip()
    i = tail.find('周')
    assert i > 0, crumb
    return tail[i + 1:].strip()


def load_overrides():
    path = os.path.join(HERE, 'pta_en_overrides.json')
    return json.load(open(path, encoding='utf-8')) if os.path.exists(path) else {}


def build(pages):
    overrides = load_overrides()
    by_week = {}
    skipped, translated = [], []
    for prob in pages:
        wk = week_of(prob['_id'])
        lesson = by_week.setdefault(wk, dict(title=week_title(prob['crumb']), problems=[],
                                             levels=[], skipped=[]))
        levels = []
        for i, raw in enumerate(prob['codes']):
            code = code_of(raw)
            en = False
            if not isascii(code):
                key = '%s:%d' % (prob['_id'], i)
                if key not in overrides:
                    skipped.append(key)
                    continue
                code = overrides[key]
                en = True
                translated.append(key)
            try:
                compile(code, prob['_id'], 'exec')
            except SyntaxError as e:
                raise AssertionError('%s block %d 无法编译: %s' % (prob['_id'], i, e))
            assert isascii(code), '%s block %d 英译后仍含非 ASCII' % (prob['_id'], i)
            lines = code.split('\n')
            assert 1 <= len(lines) <= MAX_LINES, '%s block %d 行数 %d' % (prob['_id'], i, len(lines))
            wide = [ln for ln in lines if len(ln) > MAX_W]
            assert not wide, '%s block %d 行过宽' % (prob['_id'], i)
            hint = '参考代码' if i == 0 else '另一种写法'
            if en:
                hint += ' · 中文字符串已译成英文（打字练习版，OJ 提交请用原题解）'
            levels.append(dict(code=code, alt=i > 0, hint=hint))
        if not levels:
            lesson['skipped'].append(prob['_id'])
            continue
        pno = int(prob['_id'].split('.', 1)[1])
        for i, lv in enumerate(levels):
            lv.update(id='pta-%d-%02d%s' % (wk, pno, SUF[i]),
                      lesson=wk, tier=TIER,
                      title='%s %s' % (prob['_id'], prob['title']))
        lesson['problems'].append(pno)
        lesson['levels'].extend(levels)

    lessons, snippets = [], []
    seen = set()
    for wk in sorted(by_week):
        L = by_week[wk]
        assert L['levels'], '第 %d 周没有可用的关卡' % wk
        assert wk in WEEK_MOD, wk
        p, n = len(L['problems']), len(L['levels'])
        src = '%d 题 · %d 关' % (p, n)
        if L['skipped']:
            src += '（%d 题含中文，未收）' % len(L['skipped'])
        lessons.append(dict(no=wk, mod=WEEK_MOD[wk], label='PTA%d' % wk,
                            title=L['title'], src=src, p=p, n=n))
        for s in L['levels']:
            assert s['id'] not in seen, s['id']
            assert isascii(s['code']), s['id']
            seen.add(s['id'])
            snippets.append(dict(id=s['id'], lesson=s['lesson'], tier=s['tier'],
                                 title=s['title'], hint=s['hint'], alt=s['alt'],
                                 code=s['code']))
    snippets.sort(key=lambda s: (s['lesson'], s['id']))
    assert len(lessons) == len(by_week)
    assert len(snippets) == sum(l['n'] for l in lessons)
    return lessons, snippets, skipped, translated


def write(lessons, snippets, name='ptabank.js'):
    head = ('/* 自动生成，勿手改 —— 源: data/build_ptabank.py\n'
            '   源题：OJ Contest 483「公共课 PTA 题库」；代码取自每题「📖 参考题解」页，\n'
            '   同题「参考代码」与「另一种写法」各占一关（与 pybank.js 口径一致）。 */\n')
    body = (head
            + 'window.PTAB_MODULES = ' + json.dumps(MODULES, ensure_ascii=False) + ';\n'
            + 'window.PTAB_LESSONS = ' + json.dumps(lessons, ensure_ascii=False, indent=1) + ';\n'
            + 'window.PTAB_SNIPPETS = ' + json.dumps(snippets, ensure_ascii=False, indent=1) + ';\n')
    dst = os.path.join(HERE, name)
    open(dst, 'w', encoding='utf-8').write(body)
    print('%s: %d 周 / %d 题 / %d 关 / %d 字符' % (
        dst, len(lessons), sum(l['p'] for l in lessons), len(snippets),
        sum(len(s['code']) for s in snippets)))


def main():
    args = sys.argv[1:]
    pages_path = os.path.join(HERE, 'pta_pages.json')
    if '--pages' in args:
        pages_path = args[args.index('--pages') + 1]
    pages = json.load(open(pages_path, encoding='utf-8'))
    lessons, snippets, skipped, translated = build(pages)
    if '--report' in args:
        for l in lessons:
            print('PTA%-2d %-28s %2d 题 / %2d 关 · %s' % (
                l['no'], l['title'], l['p'], l['n'], l['src']))
        print('英译代码块 %d 个：%s' % (len(translated), ', '.join(translated)))
        print('跳过代码块 %d 个：%s' % (len(skipped), ', '.join(skipped)))
        return
    write(lessons, snippets)


if __name__ == '__main__':
    main()
