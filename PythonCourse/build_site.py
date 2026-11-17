# -*- coding: utf-8 -*-
"""生成课程导览站 index.html —— 数据来自 data.json（B站合集快照）。"""
import json, re

D = json.load(open('data.json'))
BV = 'https://www.bilibili.com/video/'
SS = 'https://space.bilibili.com/475155110/channel/seriesdetail?sid='

def mmss(d):
    return f"{d//60}:{d%60:02d}" if d else ''

def link(ep, label=None):
    t = label or ep['title']
    d = mmss(ep.get('dur'))
    tail = f'<span class="dur">{d}</span>' if d else ''
    return f'<a class="ep" href="{BV}{ep["bvid"]}" target="_blank" rel="noopener">{t}{tail}</a>'

# ---------- 讲义：按章分组 ----------
chapters = {}
for ep in D['jiangyi']['eps']:
    m = re.match(r'第(\d+)章 ([^（|]+?)（?(\d+/\d+)?）?[｜|](.*?) · Python 专业课讲义', ep['title'])
    if m:
        ch, name, frac, sub = m.group(1), m.group(2), m.group(3), m.group(4)
        chapters.setdefault((int(ch), name), []).append((frac or '', sub, ep))
    else:
        chapters.setdefault((0, ep['title']), []).append(('', ep['title'], ep))

cards_jy = []
for (ch, name), eps in chapters.items():
    rows = ''.join(link(e, f'<b>{f}</b> {s}') for f, s, e in eps)
    cards_jy.append(f'''<details class="card"><summary>
      <span class="no">第 {ch} 章</span>
      <span class="t">{name}<span class="sub">{len(eps)} 集</span></span>
      <span class="vc"></span></summary><div class="eps">{rows}</div></details>''')

# ---------- 语法课先导（shiyan 前 7 集）----------
gram = D['shiyan']['eps'][:7]
gram_rows = ''.join(link(e, re.sub(r'^Python ', '', e['title'])) for e in gram)

# ---------- 实验题解：按实验N分组 ----------
labs = {}
for ep in D['shiyan']['eps'][7:]:
    m = re.match(r'【勇者斗恶龙题解】(.+?)｜XMUOJ (实验\S+) (P|T)(\d+)', ep['title'])
    if not m:
        continue
    name, lab, pt, num = m.groups()
    labs.setdefault(lab, []).append((pt, int(num), name, ep))

CN = {'0': '零', '一': '一', '二': '二', '三': '三', '四': '四', '五': '五', '六': '六', '七': '七'}
LAB_NAME = {'实验0': '入门先导', '实验一': '变量、IO与顺序语句', '实验二': '判断语句', '实验三': '循环语句',
            '实验四': '列表与数组', '实验五': '字符串操作', '实验六': '元组集合与字典', '实验七': '函数'}
cards_sy = []
for lab in sorted(labs, key=lambda x: list(CN).index(x.replace('实验', ''))):
    items = sorted(labs[lab], key=lambda x: (x[0] != 'P', x[1]))
    rows = ''.join(link(e, f'<b>{pt}{num:02d}</b> {name}') for pt, num, name, e in items)
    np_ = sum(1 for i in items if i[0] == 'P'); nt = len(items) - np_
    cnt = f'{np_} 道例题 + {nt} 道习题' if nt else f'{np_} 道例题'
    cards_sy.append(f'''<details class="card"><summary>
      <span class="no">{lab}</span>
      <span class="t">{LAB_NAME.get(lab, '')}<span class="sub">题解 {cnt}</span></span>
      <span class="vc"></span></summary><div class="eps">{rows}</div></details>''')

# ---------- 期中串讲 + 函数串讲 ----------
qz = ''.join(link(e) for e in D['qizhong']['eps'])
hs = ''.join(link(e) for e in D['tjjj']['eps'] if '函数串讲' in e['title'])

HTML = f'''<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Python 程序设计 · 勇者讲义课程导览</title><style>
*{{box-sizing:border-box}}
body{{margin:0;color:#2b2418;font:16px/1.7 -apple-system,"PingFang SC","Microsoft YaHei",sans-serif;
padding:40px max(16px,env(safe-area-inset-left)) 64px max(16px,env(safe-area-inset-right));
background:repeating-linear-gradient(0deg,rgba(43,36,24,.05) 0 1px,transparent 1px 36px),
repeating-linear-gradient(90deg,rgba(43,36,24,.05) 0 1px,transparent 1px 36px),
radial-gradient(1200px 560px at 50% -120px,#faf5e8 0%,#f3eee2 58%,#ece5d2 100%) fixed}}
main{{max-width:880px;margin:0 auto}}
header{{position:relative;padding:26px 180px 20px 24px;margin-bottom:14px;overflow:hidden;
background:linear-gradient(160deg,rgba(181,80,42,.10),transparent 46%),#fbf8ef;
border:3px solid #2b2418;box-shadow:8px 8px 0 rgba(43,36,24,.18)}}
@media(max-width:700px){{header{{padding-right:24px}}}}
header::before,header::after{{content:"";position:absolute;width:16px;height:16px;border:3px solid #b5502a}}
header::before{{top:-3px;left:-3px;border-right:none;border-bottom:none}}
header::after{{bottom:-3px;right:-3px;border-left:none;border-top:none}}
.kicker{{font:600 12.5px/1.6 ui-monospace,Menlo,monospace;letter-spacing:.22em;color:#b5502a}}
h1{{font-size:clamp(24px,4.4vw,32px);margin:10px 0 6px}}
.lead{{color:#6b5f49;font-size:14px;margin:6px 0 0}}
.lead a{{color:#2b4c7e}}
.sprites{{position:absolute;right:18px;bottom:0;display:flex;align-items:flex-end;pointer-events:none}}
.sprites .h{{width:120px;height:120px;image-rendering:pixelated;filter:drop-shadow(0 10px 10px rgba(43,36,24,.3))}}
.sprites .v{{width:60px;height:60px;image-rendering:pixelated;margin-left:-14px;margin-bottom:4px}}
@media(max-width:700px){{.sprites{{opacity:.3}}}}
h2{{font:600 15px/1.6 ui-monospace,Menlo,monospace;letter-spacing:.12em;color:#b5502a;margin:34px 0 12px;
border-left:4px solid #b5502a;padding-left:10px}}
h2 small{{color:#6b5f49;font-weight:400;letter-spacing:0;margin-left:10px}}
.card{{border:3px solid #2b2418;background:#fbf8ef;margin-bottom:12px;box-shadow:5px 5px 0 rgba(43,36,24,.15)}}
.card summary{{display:flex;gap:14px;align-items:baseline;padding:14px 16px;cursor:pointer;list-style:none}}
.card summary::-webkit-details-marker{{display:none}}
.card:hover{{border-color:#b5502a}}
.card[open]{{border-color:#b5502a}}
.no{{flex:0 0 76px;font:600 12.5px/1.7 ui-monospace,Menlo,monospace;color:#b5502a;letter-spacing:.08em}}
.t{{font-size:16px;min-width:0}}
.sub{{display:block;font-size:12.5px;color:#6b5f49;margin-top:2px}}
.vc{{margin-left:auto;font:600 12px/1.8 ui-monospace,Menlo,monospace;color:#2b4c7e;white-space:nowrap}}
.vc::after{{content:'展开 ▸'}}
.card[open] .vc::after{{content:'收起 ▾'}}
.eps{{display:flex;flex-wrap:wrap;gap:8px;padding:0 16px 14px 16px;border-top:1px dashed #d8cfb8}}
a.ep{{font:13px/1.6 ui-monospace,Menlo,monospace;text-decoration:none;color:#2b4c7e;
background:#f3eee2;border:1px solid #d8cfb8;padding:5px 10px;margin-top:10px}}
a.ep:hover{{border-color:#b5502a;color:#b5502a}}
a.ep b{{color:#b5502a;font-weight:600}}
.dur{{color:#6b5f49;margin-left:6px}}
</style></head><body><main>
<header>
  <div class="kicker">PYTHON COURSE · 勇者讲义系列 ｜ 课程讲义 10 章 · 实验题解 8 套 · 期中串讲</div>
  <h1>Python 程序设计 · 课程导览</h1>
  <p class="lead">🎬 B站合集直达：
  <a href="{SS}9361217" target="_blank" rel="noopener">《Python 专业课讲义》</a> ·
  <a href="{SS}9321748" target="_blank" rel="noopener">《Python 语法课 · 实验题解》</a> ·
  <a href="{SS}9461078" target="_blank" rel="noopener">《Python 期中串讲》</a></p>
  <p class="lead">📚 刷题直达：<a class="ep" style="display:inline-block" href="https://xmuoj.com/contest/493" target="_blank" rel="noopener"><b>Python 语法题库</b> 公共课实验一~七 · 126 题</a></p>
  <div class="sprites"><img class="h" src="assets/hero.svg"><img class="v" src="assets/vera.svg"></div>
</header>

<h2>课程讲义<small>第 1–10 章 · {len(D['jiangyi']['eps'])} 集 · 点击章节展开分集</small></h2>
{''.join(cards_jy)}

<h2>实验先导 · 语法课<small>7 支概念短片，做实验前先过一遍</small></h2>
<details class="card" open><summary>
  <span class="no">先导</span>
  <span class="t">实验语法速通<span class="sub">顺序 · 判断 · 循环 · 列表 · 字符串 · 元组集合字典 · 函数</span></span>
  <span class="vc"></span></summary><div class="eps">{gram_rows}</div></details>

<h2>实验题解<small>XMUOJ 实验 0–七 · {len(D['shiyan']['eps'])-7} 道题 · P=例题 T=习题</small></h2>
{''.join(cards_sy)}

<h2>刷题 · 题库<small>公共课实验一~七 · 126 题 · 可直接提交</small></h2>
<details class="card" open><summary>
  <span class="no">题库</span>
  <span class="t">Python 语法题库<span class="sub">按实验一~七 / 例题·习题顺序编排 · 126 题</span></span>
  <span class="vc"></span></summary><div class="eps"><a class="ep" style="display:inline-block" href="https://xmuoj.com/contest/493" target="_blank" rel="noopener"><b>直达</b> Python 语法题库</a></div></details>

<h2>期中串讲<small>考前压缩饼干 · 先过套路再刷题</small></h2>
<details class="card" open><summary>
  <span class="no">期中</span>
  <span class="t">期中串讲 + 函数串讲<span class="sub">5 集 · 习题套路集中放送</span></span>
  <span class="vc"></span></summary><div class="eps">{qz}{hs}</div></details>

</main></body></html>'''

open('index.html', 'w').write(HTML)
print('written index.html', len(HTML), 'bytes')
