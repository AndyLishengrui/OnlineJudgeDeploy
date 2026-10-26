# -*- coding: utf-8 -*-
"""把《从零手搓大模型》的 16 讲跟打关卡生成成 data/llm.js。

代码不是手抄的：每关都直接切自 Zero2hero/_01_官方源码 里的官方 notebook / 库文件，
行号对应「把 notebook 的 code cell 按 '\\n\\n# ===== CELL =====\\n' 拼起来」后的行号
（part1 与基准文件逐字节相同，part2-5、L7 用同一规则复现，见 2026-10-26 校验）。

用法:
    python3 data/build_llm.py            # 校验并写出 data/llm.js
    python3 data/build_llm.py --report   # 只打印每关切片，不写文件

改了关卡以后必须重跑；llm.js 是产物，不要手改。
"""
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, '..'))
Z2H = os.path.normpath(os.path.join(ROOT, '..', '..', 'Zero2hero'))

# 源文件简称 → 实际路径
SRC = {
    'P1': Z2H + '/L2_makemore_bigrams/notebook/makemore_part1_bigrams.ipynb',
    'P2': Z2H + '/L3_makemore_mlp/notebook/makemore_part2_mlp.ipynb',
    'P3': Z2H + '/L4_makemore_batchnorm/notebook/makemore_part3_bn.ipynb',
    'P4': Z2H + '/L5_makemore_backprop_ninja/notebook/makemore_part4_backprop.ipynb',
    'P5': Z2H + '/L6_makemore_wavenet/notebook/makemore_part5_cnn1.ipynb',
    'L7': Z2H + '/L7_build_gpt/notebook/L7_gpt_dev_official.ipynb',
    'EN': Z2H + '/_01_官方源码/micrograd/micrograd/engine.py',
    'NN': Z2H + '/_01_官方源码/micrograd/micrograd/nn.py',
    'BS': Z2H + '/_01_官方源码/minbpe/minbpe/base.py',
    'BB': Z2H + '/_01_官方源码/minbpe/minbpe/basic.py',
}

MODULES = ['计算图与梯度', '语言模型基座', '反传与结构', 'GPT 与分词']

# 每讲：no 讲次 / mod 模块下标 / title / src 对应原片 / mins 视频分钟 / levels 关卡
# 关卡 = (标题, 提示, 源文件, 起始行, 结束行)  —— 行号含两端，对应拼平后的 notebook
LESSONS = [
    dict(no=1, mod=0, title='总览：一个大模型就是一次接龙', src='Deep Dive 压缩', mins=39, levels=[
        ('读入一份名字表', '课程数据只有三万个英文名字；模型要学的，就是这些名字的拼法。', 'P1', 1, 13),
        ('数一数相邻字符对', '先不谈神经网络：把每个相邻字符对出现的次数数出来，概率就藏在里面。', 'P1', 16, 24),
        ('字符表与整数矩阵', '把字符映射成 0..26，再累加成一张 27×27 的计数矩阵。', 'P1', 33, 45),
    ]),
    dict(no=2, mod=0, title='一个数怎么求导：Value 与计算图', src='L1 前半 · 2:25', mins=42, levels=[
        ('Value 的五个字段', 'data 是值，grad 是梯度；_prev 记住自己从谁算出来的。', 'EN', 5, 11),
        ('加法与它的反向', '加法的梯度原样往回传：这就是反向传播最简的一环。', 'EN', 13, 22),
        ('乘法与它的反向', '乘法互换两个乘子：self 的梯度带上 other 的值。', 'EN', 24, 33),
        ('幂运算的梯度', 'x**n 求导得 n·x**(n-1)，后面连乘、连除全靠它。', 'EN', 35, 43),
        ('ReLU 与它的反向', 'ReLU 只在正半边放行，梯度是 0 或 1。', 'EN', 45, 52),
        ('减法、除法、取负', 'Python 的运算符都要补齐，否则 a - b 写不出来。', 'EN', 72, 79),
    ]),
    dict(no=3, mod=0, title='反向传播与 nn.Module', src='L1 后半', mins=45, levels=[
        ('backward：先排拓扑序', '先把整张图按依赖关系排好序，才谈得上从后往前传。', 'EN', 55, 65),
        ('backward：逆序链式求导', '自己先置 1，然后每一步把梯度推给上游。', 'EN', 66, 70),
        ('Module：参数与清梯度', 'zero_grad / parameters 是所有层共享的两条约定。', 'NN', 4, 11),
        ('Neuron：一个神经元', '权重乘输入再求和，最后过一道非线性。', 'NN', 13, 25),
        ('Layer：一层神经元', '一层就是若干个神经元并排，输出拼成向量。', 'NN', 30, 40),
        ('MLP：把层堆起来', '层与层首尾相接，最后一层不要非线性。', 'NN', 45, 57),
    ]),
    dict(no=4, mod=1, title='从计数到概率：bigram 字符级模型', src='L2 · 1:57', mins=42, levels=[
        ('训练集：(x, y) 对', '每个字符跟着下一个字符，就是一条训练样本。', 'P1', 152, 165),
        ('one-hot 编码', '把字符编号变成 27 维独热向量，才喂得进矩阵乘法。', 'P1', 174, 179),
        ('从 logits 到概率', 'exp 之后归一化，这三行合起来就叫 softmax。', 'P1', 188, 195),
        ('前向传播一次', 'one-hot 乘 W 得 logits，softmax 得概率。', 'P1', 219, 228),
        ('逐样本算负对数似然', '取对数、变负数、取平均——loss 就是这么来的。', 'P1', 234, 254),
        ('用训练好的 W 采样', '每次按概率抽一个字符，抽到 . 就停。', 'P1', 330, 355),
    ]),
    dict(no=5, mod=1, title='损失函数：为什么是交叉熵', src='新编', mins=28, levels=[
        ('对数似然逐对累加', '概率连乘容易下溢，取对数就变成连加。', 'P1', 131, 143),
        ('平均负对数似然', '除以样本数取平均，loss 就跟数据量无关了。', 'P1', 145, 149),
        ('向量化求 loss', '一次算完整个 batch：probs[arange, ys].log().mean()。', 'P1', 269, 276),
        ('正则化 + 反向 + 更新', '加一项 W² 惩罚，再走一步梯度下降。', 'P1', 320, 328),
    ]),
    dict(no=6, mod=1, title='MLP 上：训练集、验证集与嵌入', src='L3 前半 · 1:15', mins=42, levels=[
        ('build_dataset：滑窗造样本', '三个字符预测第四个，窗口一格一格往右挪。', 'P2', 48, 68),
        ('训练 / 验证 / 测试三分', '80 / 10 / 10，验证集是用来选超参的。', 'P2', 69, 74),
        ('词嵌入矩阵 C', '27 个字符，每个换成 2 维向量，而不是 27 维独热。', 'P2', 78, 82),
        ('拼接窗口 + 隐层', '三个 2 维拼成 6 维，过一层 100 神经元的 tanh。', 'P2', 84, 89),
        ('输出层 logits', '把 100 维压回 27 个字符的分数。', 'P2', 97, 102),
        ('参数初始化', '五个参数张量一起交给优化器。', 'P2', 127, 133),
    ]),
    dict(no=7, mod=1, title='MLP 下：初始化、学习率与过拟合', src='L3 后半', mins=42, levels=[
        ('打开梯度', '默认不记梯度，要手动对每个参数打开。', 'P2', 135, 140),
        ('学习率网格', '先扫一遍 1e-3 到 1 的量级，再定最终学习率。', 'P2', 142, 149),
        ('训练循环：前向 + 交叉熵', '取一个 minibatch，前向，算损失。', 'P2', 152, 161),
        ('反向 + 更新 + 学习率衰减', '十万步之后把学习率降到 1/10，损失会再掉一档。', 'P2', 164, 178),
        ('训练集损失', '整份训练集一次前向，看拟合到什么程度。', 'P2', 185, 190),
        ('验证集损失', '同一套参数换验证集，和训练集差多少就是过拟合的量。', 'P2', 192, 197),
    ]),
    dict(no=8, mod=1, title='梯度三关：消失、爆炸、死亡', src='L4 前段 · 1:55', mins=30, levels=[
        ('Kaiming 初始化与零 bias', '权重除以 sqrt(fan_in)，bias 可以直接不要。', 'P3', 56, 65),
        ('看激活分布：饱和了多少', 'tanh 一旦饱和到 ±1，梯度就几乎传不动了。', 'P3', 304, 315),
        ('看梯度分布：还剩多少', '逐层看梯度直方图，越靠下越窄就是消失。', 'P3', 318, 329),
        ('update / data 比例', '这个比值应该在 1e-3 左右，差一个量级就要改学习率。', 'P3', 345, 353),
    ]),
    dict(no=9, mod=1, title='BatchNorm 精修与训练诊断', src='L4 后段', mins=45, levels=[
        ('BatchNorm 的参数与缓冲区', 'gamma / beta 要训练，running 均值方差只是记录。', 'P3', 67, 71),
        ('BN 前向：批内标准化', '减批均值、除批标准差，让每一层输入都归一。', 'P3', 95, 99),
        ('BN 前向：gain / bias + 滑动平均', '再学一个缩放和平移，同时把统计量滑进 buffer。', 'P3', 100, 105),
        ('Linear：手工实现一层', '跟 PyTorch 的 nn.Linear 同一个接口，只是自己写一遍。', 'P3', 169, 182),
        ('BatchNorm1d：训练时用批统计', '训练走一批的均值方差，顺手更新 running。', 'P3', 198, 207),
        ('BatchNorm1d：推理时用 running', '推理没有 batch 可言，只能靠训练时攒下的统计量。', 'P3', 208, 216),
    ]),
    dict(no=10, mod=2, title='反向传播 Ninja 上：手推全网络', src='L5 前半 · 1:55', mins=48, levels=[
        ('把前向拆成一步一变量', '每一步只做一件事，才可能一步步往回求导。', 'P4', 100, 117),
        ('交叉熵也是一种 softmax', '减最大值、exp、归一化、取对数——全部摊开写。', 'P4', 118, 126),
        ('先把中间量都 retain 住', 'PyTorch 默认不存中间张量的梯度，要手动开。', 'P4', 128, 136),
        ('loss → probs 的梯度', '只有一个位置有梯度：正确字符那一格是 -1/n。', 'P4', 144, 149),
        ('probs → logits 的梯度', '商的求导法则，穿过 softmax 的三步。', 'P4', 150, 154),
        ('logits → h → hpreact', '矩阵乘法的反向就是转置相乘。', 'P4', 155, 158),
    ]),
    dict(no=11, mod=2, title='反向传播 Ninja 下：逐层对账', src='L5 后半', mins=48, levels=[
        ('BN 的 gain / bias / raw', 'BN 有三个输入，每个都要单独求一份梯度。', 'P4', 159, 161),
        ('BN 的方差与差', '标准差里套着方差、方差里套着平方差，一层层剥。', 'P4', 162, 167),
        ('BN 的均值', '均值把梯度平均分回整批。', 'P4', 168, 170),
        ('回到 W1 与 b1', '一路传回第一层线性层。', 'P4', 171, 173),
        ('散回嵌入矩阵 C', '同一个字符出现在多个位置，梯度要累加。', 'P4', 174, 179),
        ('和 PyTorch 逐项对账', '每个中间量都跟 autograd 比一遍，误差要在 1e-6 以内。', 'P4', 180, 200),
    ]),
    dict(no=12, mod=2, title='层级结构：WaveNet 与树形依赖', src='L6 · 0:56', mins=39, levels=[
        ('滑窗造数据集（上下文 8）', '上下文从 3 拉到 8，一个字符一个字符往后挪。', 'P5', 30, 47),
        ('三分数据集', '先打乱再切，避免名字首字母扎堆。', 'P5', 49, 53),
        ('Linear：Kaiming 初始化', '权重除以 sqrt(fan_in)，这是深网络能训起来的前提。', 'P5', 62, 76),
        ('BatchNorm1d：按 ndim 选归约轴', '二维批按第 0 维归一，三维批要按 (0,1) 一起归。', 'P5', 92, 111),
        ('FlattenConsecutive：合并相邻两位', '每合并一次，序列长度减半、特征宽度翻倍。', 'P5', 138, 152),
        ('分层模型装配', '同样的一层重复三次，序列 8→4→2→1，视野 2→4→8。', 'P5', 186, 203),
    ]),
    dict(no=13, mod=2, title='Attention 为什么：从平均到加权', src='新编', mins=30, levels=[
        ('用掩码矩阵做加权平均', '下三角矩阵乘一遍，就等于「只对前面求平均」。', 'L7', 165, 178),
        ('手写版本：逐位置求均值', '先用两个 for 循环写清楚要什么，再想怎么并行。', 'L7', 188, 194),
        ('用 softmax 代替归一化', '遮罩填 -inf，softmax 之后天然只剩前面。', 'L7', 204, 211),
        ('自注意力：q、k、v', '三个线性层分别算 query / key / value，打分再乘 value。', 'L7', 214, 238),
    ]),
    dict(no=14, mod=3, title='从零写 GPT：自注意力与多头', src='L7 前半 · 1:56', mins=45, levels=[
        ('Head：三个投影', 'key / query / value 各一个线性层，都不带 bias。', 'L7', 369, 377),
        ('Head：算 k 和 q', '整批一次算完，形状 (B, T, head_size)。', 'L7', 378, 381),
        ('Head：打分 + 遮罩 + softmax', '缩放 sqrt(C)，再把未来位置填成 -inf。', 'L7', 382, 385),
        ('Head：加权求值', '权重矩阵乘 value，得到每个位置的输出。', 'L7', 386, 390),
        ('MultiHeadAttention：多头并行', '几个 head 各自看不同的子空间，最后拼起来。', 'L7', 394, 399),
        ('MultiHead：拼接 + 投影', '拼完再走一次线性层，把多头的意见混成一路。', 'L7', 400, 404),
        ('FeedFoward：扩 4 倍再压回', '先升维再降维，中间夹一个 ReLU。', 'L7', 409, 420),
        ('Block：先通信再计算', '两条残差：注意力负责通信，前馈负责计算。', 'L7', 424, 441),
    ]),
    dict(no=15, mod=3, title='从零写 GPT：残差、缩放与训练', src='L7 后半', mins=45, levels=[
        ('超参数一览', '六十四维、四个头、四层——这些小模型一晚就能训完。', 'L7', 307, 318),
        ('读文本、建词表', '莎士比亚全集，65 个字符就是全部词表。', 'L7', 327, 340),
        ('get_batch：随机切窗口', 'x 和 y 只差一格：y 就是 x 往后错一位。', 'L7', 342, 350),
        ('estimate_loss：不建图估损', '评估时关掉梯度，训练 / 验证各跑一遍。', 'L7', 352, 364),
        ('模型 __init__', '词嵌入表、位置嵌入表、四层 Block、最后一层 lm_head。', 'L7', 443, 448),
        ('forward：词向量 + 位置向量', '同一个字符在不同位置，要靠位置向量区分开。', 'L7', 450, 458),
        ('forward：收尾 + 交叉熵', '最后过一层 LayerNorm，再投到词表上。', 'L7', 459, 470),
        ('generate：逐字接龙', '每次只取最后一个位置的输出，接上去再算下一轮。', 'L7', 472, 490),
    ]),
    dict(no=16, mod=3, title='分词器：BPE 到底在切什么', src='L8 · 2:13', mins=42, levels=[
        ('get_stats：数相邻对', '把整段文本看成整数序列，统计每对相邻整数出现了几次。', 'BS', 13, 22),
        ('merge：把 pair 换成新 id', '从左到右扫一遍，命中就换成新 id 并跳过两位。', 'BS', 25, 41),
        ('train：迭代合并最高频的 pair', '每轮挑最高频的一对，铸一个新 token，重复到底。', 'BB', 20, 41),
        ('train：存下 merges 与 vocab', 'merges 决定编码，vocab 只是给人看的。', 'BB', 43, 49),
        ('encode：一路合并到没有为止', '每步都挑 merge 序号最小的那一对，保证和训练一致。', 'BB', 57, 73),
        ('decode：把 id 拼回字节', '所有 token 都是字节片段，拼起来再按 UTF-8 解。', 'BB', 51, 55),
    ]),
]

TIER = 5        # 关卡难度：课程代码行又长又带下划线，星级门槛用最宽的一档
MAX_W = 160     # 单行宽度硬上限（再长就不是打字练习了）


def flatten(path):
    """notebook → 拼平的行列表；.py 直接读。"""
    if path.endswith('.ipynb'):
        nb = json.load(open(path, encoding='utf-8'))
        cells = [''.join(c['source']) for c in nb['cells'] if c['cell_type'] == 'code']
        return '\n\n# ===== CELL =====\n'.join(cells).splitlines()
    return open(path, encoding='utf-8').read().splitlines()


def cut(lines, a, b):
    """取 [a, b] 行，清掉 cell 标记 / 空行 / 魔法命令，按最小缩进去缩进。"""
    raw = []
    for ln in lines[a - 1:b]:
        if ln.strip() == '# ===== CELL =====' or ln.strip().startswith('%'):
            continue
        if not ln.strip():
            continue
        raw.append(ln.rstrip())
    ind = min(len(ln) - len(ln.lstrip()) for ln in raw)
    return [ln[ind:] for ln in raw]


def main():
    report = '--report' in sys.argv
    cache = {}
    out, seen = [], set()
    for L in LESSONS:
        for i, (title, hint, key, a, b) in enumerate(L['levels'], 1):
            lines = cache.setdefault(key, flatten(SRC[key]))
            assert 1 <= a <= b <= len(lines), f'{key} 行号越界 {a}-{b} / 共 {len(lines)}'
            code = '\n'.join(cut(lines, a, b))
            sid = f'llm-{L["no"]:02d}-{i:02d}'
            assert sid not in seen, sid
            seen.add(sid)
            bad = [ln for ln in code.split('\n') if not ln.isascii()]
            assert not bad, f'{sid} 含非 ASCII: {bad[:2]}'
            assert 3 <= len(code.split('\n')) <= 25, f'{sid} 行数 {len(code.split(chr(10)))}'
            wide = [ln for ln in code.split('\n') if len(ln) > MAX_W]
            assert not wide, f'{sid} 行过宽: {wide[0][:60]}'
            out.append({'id': sid, 'lesson': L['no'], 'tier': TIER,
                        'title': title, 'hint': hint, 'code': code})
            if report:
                print(f'\n───── {sid} {title}  [{key} {a}-{b}]  '
                      f'{len(code.split(chr(10)))} 行')
                print(code)

    lens = [len(L['levels']) for L in LESSONS]
    assert len(LESSONS) == 16 and sum(lens) == 91, (len(LESSONS), sum(lens))
    if report:
        print('\n合计', len(out), '关 /', sum(lens), '（', lens, '）')
        return

    lessons = [{'no': L['no'], 'mod': L['mod'], 'title': L['title'],
                'src': L['src'], 'mins': L['mins'], 'n': len(L['levels'])}
               for L in LESSONS]
    body = ('/* 自动生成，勿手改 —— 源: data/build_llm.py\n'
            '   《从零手搓大模型》16 讲 / 91 关，代码切片取自 Zero2hero 官方源码 */\n'
            'window.LLM_MODULES = ' + json.dumps(MODULES, ensure_ascii=False) + ';\n'
            'window.LLM_LESSONS = ' + json.dumps(lessons, ensure_ascii=False, indent=1) + ';\n'
            'window.LLM_SNIPPETS = ' + json.dumps(out, ensure_ascii=False, indent=1) + ';\n')
    dst = os.path.join(HERE, 'llm.js')
    open(dst, 'w', encoding='utf-8').write(body)
    print(f'{dst}: {len(lessons)} 讲 / {len(out)} 关 / '
          f'{sum(len(s["code"]) for s in out)} 字符')


if __name__ == '__main__':
    main()
