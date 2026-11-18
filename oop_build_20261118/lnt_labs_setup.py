#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""在 LNT 课程 111920 的「Python 面向对象编程实验」模块里建 4 个实验资料 + 1 个代码作业。

每个实验一份 material（讲义 PDF + 题解视频 mp4 + B 站链接 + 小测指引），
实验四额外建一个 homework（大综合代码提交）。

用法: python3 lnt_labs_setup.py [--labs 1,2,3,4] [--dry] [--no-video]
"""
import json
import mimetypes
import os
import sys
import uuid
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import Request, urlopen

sys.path.insert(0, '/Users/andyshengruilee/Downloads/AI协同工作区/2026Python程序设计/pta_to_lnt')
from lnt_api import BASE, cookie, req  # noqa: E402

COURSE = 111920
MODULE = 267768
ROOT = Path('/Users/andyshengruilee/Downloads/AI协同工作区/2026Python程序设计/13_专业课实验/项目实验')
VID = ROOT / 'OJ题库/题解视频'
DIST = ROOT / 'dist'
STATE = Path('/tmp/lnt_lab_uploads.json')

LABS = {
    1: dict(
        name='实验一 图书馆管理系统',
        pdf='Lab1_实验指导书.pdf',
        videos=[('exp11', '题解 EXP1.1 图书库存借还模拟.mp4'),
                ('exp12', '题解 EXP1.2 读者借阅额度校验.mp4'),
                ('exp13', '题解 EXP1.3 逾期天数与罚金.mp4')],
        bv={'EXP1.1': 'BV1Bisy6XEap', 'EXP1.2': 'BV1qisy6XEUQ', 'EXP1.3': 'BV1Bvsy6WE23'},
        test='实验1 · 图书馆管理系统（客观题）',
        points='类与对象、封装、职责划分、借还规则与逾期罚金',
    ),
    2: dict(
        name='实验二 JSON 文件存储',
        pdf='Lab2_实验指导书.pdf',
        videos=[('exp21', '题解 EXP2.1 国家数据校验.mp4'),
                ('exp22', '题解 EXP2.2 两批数据合并去重.mp4'),
                ('exp23', '题解 EXP2.3 JSON 容错解析.mp4')],
        bv={'EXP2.1': 'BV1fvsy6WEFn', 'EXP2.2': 'BV1Rcsy62Eou', 'EXP2.3': 'BV1GKsy65Ery'},
        test='实验2 · JSON文件存储（客观题）',
        points='JSON 读写、with 与编码、异常容错、数据校验与去重',
    ),
    3: dict(
        name='实验三 网页数据抓取',
        pdf='Lab3_实验指导书.pdf',
        videos=[('exp31', '题解 EXP3.1 解析国家 HTML 片段.mp4'),
                ('exp32', '题解 EXP3.2 数字清洗.mp4'),
                ('exp33', '题解 EXP3.3 提取页面链接.mp4')],
        bv={'EXP3.1': 'BV1XKsy6VEWE', 'EXP3.2': 'BV1XPsy6yE9L', 'EXP3.3': 'BV1uasC6qEqT'},
        test='实验3 · 网页数据抓取（客观题）',
        points='HTTP 请求与重试、正则解析 HTML、数据清洗、爬虫礼仪',
    ),
    4: dict(
        name='实验四 Numpy 数据分类',
        pdf='Lab4_实验指导书.pdf',
        videos=[('exp41', '题解 EXP4.1 面积标注标签.mp4'),
                ('exp42', '题解 EXP4.2 KNN 最近邻预测.mp4'),
                ('exp43', '题解 EXP4.3 准确率与混淆矩阵.mp4'),
                ('exp44', '题解 EXP4.4 min-max 归一化.mp4')],
        bv={'EXP4.1': 'BV1uasC6qEMT', 'EXP4.2': 'BV1uhsC6MEkq',
            'EXP4.3': 'BV1uhsC6MEDF', 'EXP4.4': 'BV1TvsC6vEoN'},
        test='实验4 · Numpy数据分类（客观题）',
        points='numpy 数组运算、特征归一化、KNN 投票、准确率与混淆矩阵',
    ),
}

HOMEWORK_DESC = """<p><strong>实验四是大综合实验</strong>：它把前三个实验的成果串成一条完整的数据流水线——</p>
<p>实验二录入的 <code>data.json</code> → 实验三爬虫抓取并合并去重 → 实验四标注 <code>y</code> 标签 → 训练/测试划分 → KNN 分类 → 报告准确率。</p>
<p>因此<strong>只需要提交一次代码</strong>：实验四的完整工程（含前三个实验的可复用模块）。</p>
<p><strong>提交内容</strong>（打成一个 zip）：</p>
<ul>
<li><code>country_store.py</code>、<code>scraper.py</code>、<code>merge.py</code>（实验二/三的可复用部分）</li>
<li><code>label_data.py</code>、<code>split_data.py</code>、<code>knn.py</code>、<code>evaluate.py</code>（实验四主体）</li>
<li><code>data.json</code>、<code>report.txt</code>（运行产物）</li>
<li><code>实验报告.pdf</code>（1–2 页：K 值对比表 + 为什么必须归一化）</li>
</ul>
<p><strong>评分</strong>：功能实现 50 + 代码质量 20 + 提高/挑战 15 + 报告 10 + 答辩 5（细则见实验指导书第七节）。</p>
<p><strong>截止</strong>：第 15 周周五 23:59。</p>
"""


def multipart(path: Path, filename: str):
    boundary = '----py' + uuid.uuid4().hex
    ctype = mimetypes.guess_type(filename)[0] or 'application/octet-stream'
    head = (f'--{boundary}\r\nContent-Disposition: form-data; name="file"; '
            f'filename="{filename}"\r\nContent-Type: {ctype}\r\n\r\n').encode()
    tail = f'\r\n--{boundary}--\r\n'.encode()
    with open(path, 'rb') as f:
        return head + f.read() + tail, f'multipart/form-data; boundary={boundary}'


def upload(path: Path, name: str, state: dict) -> int:
    if name in state:
        print(f"    skip upload {name} → {state[name]}")
        return state[name]
    size = path.stat().st_size
    c, b = req('POST', '/api/uploads', {'name': name, 'size': size, 'parent_id': 0,
                                        'is_scorm': False, 'is_wmpkg': False})
    if c not in (200, 201):
        raise SystemExit(f"× 预上传失败 {name}: {c} {b[:200]}")
    up = json.loads(b)
    uid = up['id']
    data, ct = multipart(path, 'file' + path.suffix)
    url = up['upload_url']
    if url.startswith('/'):
        url = BASE + url
    r = Request(url, data=data, method='PUT',
                headers={'Cookie': cookie(), 'X-Requested-With': 'XMLHttpRequest',
                         'Content-Type': ct})
    try:
        with urlopen(r, timeout=1800) as x:
            print(f"    upload {name} ({size // 1024} KB) → {x.status}")
    except HTTPError as e:
        raise SystemExit(f"× 上传失败 {name}: {e.code} {e.read()[:200]}")
    state[name] = uid
    STATE.write_text(json.dumps(state, ensure_ascii=False, indent=1), encoding='utf-8')
    return uid


def material_body(lab: int, cfg: dict, uploads: list) -> dict:
    links = ''.join(
        f'<p>{i}. <a href="https://www.bilibili.com/video/{bv}" target="_blank">'
        f'{title.replace(".mp4", "").replace("题解 ", "")}</a></p>'
        for i, ((code, title), bv) in enumerate(zip(cfg['videos'], cfg['bv'].values()), 1))
    desc = (
        f'<p><strong>🎯 本实验要点</strong>：{cfg["points"]}</p>'
        f'<p><strong>📘 实验讲义</strong>：见本页附件《{cfg["pdf"].replace(".pdf", "")}》'
        f'（含任务分级、接口约定、评分表、常见问题）。</p>'
        f'<p><strong>🎬 题解视频</strong>（B 站直达，支持倍速/弹幕；视频也已上传到本页附件）</p>'
        f'{links}'
        f'<p><strong>📝 小测</strong>：本模块下的《{cfg["test"]}》，8 题 16 分，检验概念掌握情况。</p>'
        f'<p><strong>💻 代码与题库</strong>：函数级编程题在 XMUOJ'
        f' <a href="https://xmuoj.com/contest/494" target="_blank">《Python面向对象与工程实验》</a>；'
        f'完整工程按实验指导书要求提交。</p>'
    )
    return {
        'type': 'material',
        'title': f'{cfg["name"]} · 讲义与题解视频',
        'module_id': MODULE,
        'description': desc,
        'material_type': 'Material',
        'teaching_model': 'online',
        'using_phase': 'unspecified',
        'score_type': 'percentage',
        'is_assigned_to_all': True,
        'submit_times': 1,
        'completion_criterion': {'activity_completion_criterion_type_id': 4, 'value': 0},
        'prerequisites': [],
        'uploads': [u for u, _ in uploads],
        'upload_references': [
            {'upload_id': u, 'allow_download': True, 'cc_license_name': 'private',
             'reference_id': 0, 'name': n, 'origin_allow_download': True, 'is_from_vtrs': False}
            for u, n in uploads
        ],
    }


def homework_body() -> dict:
    data = {
        'description': HOMEWORK_DESC, 'homework_type': 'file_upload', 'mode': 'normal',
        'score_rule': 'highest', 'score_percentage': '0.0',
        'announce_answer_status': 'no_announce', 'announce_score_type': 2,
        'allow_retract': True, 'is_announce_mark': True, 'has_assign_target': False,
        'homework_score_percentage': {'instructor_score_percentage': '100.0'},
        'other_resources': [], 'publish_count': 0, 'publish_time': None,
        'reference_answer': '', 'show_intra_rubric': False, 'show_rubric': False,
        'submit_times': None,
        'inter_review_incomplete_score_minus': False,
        'inter_review_incomplete_score_minus_percent': None,
        'intra_review_incomplete_score_minus': False,
        'intra_review_incomplete_score_minus_percent': None,
    }
    return {
        'type': 'homework', 'title': '实验四 · 大综合工程代码提交（含前三个实验模块）',
        'module_id': MODULE, 'description': HOMEWORK_DESC,
        'end_time': '2026-12-31T15:59:00Z', 'is_assigned_to_all': True,
        'data': data, 'prerequisites': [],
        'announce_answer_status': 'no_announce', 'announce_score_type': 2,
        'review_by_instructor': True, 'review_by_inter': False,
        'review_by_interGroup': False, 'review_by_intraGroup': False,
        'score_rule': 'highest', 'score_percentage': '0.0', 'submit_times': 1,
        'rubric_id': 0,
        'completion_criterion': {'activity_completion_criterion_type_id': 4, 'value': 1},
    }


def main():
    argv = sys.argv[1:]
    dry = '--dry' in argv
    with_video = '--no-video' not in argv
    which = [1, 2, 3, 4]
    if '--labs' in argv:
        which = [int(x) for x in argv[argv.index('--labs') + 1].split(',')]

    state = json.loads(STATE.read_text(encoding='utf-8')) if STATE.exists() else {}

    # 已存在的活动先查一遍，避免重复建
    _, b = req('GET', f'/api/courses/{COURSE}/activities')
    existing = {(a['title'], a['type']) for a in json.loads(b)['activities']}

    for lab in which:
        cfg = LABS[lab]
        title = f'{cfg["name"]} · 讲义与题解视频'
        if (title, 'material') in existing:
            print(f"skip {title}（已存在）")
            continue
        print(f"\n=== {cfg['name']}")
        uploads = []
        pdf = DIST / cfg['pdf']
        uploads.append((upload(pdf, cfg['pdf'], state), cfg['pdf']))
        if with_video:
            for code, name in cfg['videos']:
                mp4 = VID / code / f'{code}.mp4'
                uploads.append((upload(mp4, name, state), name))
        if dry:
            print('  [dry] 将创建 material：', title, len(uploads), '个附件')
            continue
        c, b = req('POST', f'/api/courses/{COURSE}/activities', material_body(lab, cfg, uploads))
        print('  material →', c)
        if c not in (200, 201):
            print('  ', b[:400])

    if (('实验四 · 大综合工程代码提交（含前三个实验模块）', 'homework') not in existing
            and 4 in which and not dry):
        c, b = req('POST', f'/api/courses/{COURSE}/activities', homework_body())
        print('\nhomework →', c, b[:200].replace('\n', ' '))


if __name__ == '__main__':
    main()
