/* 自动生成，勿手改 —— 源: data/build_llm.py
   《从零手搓大模型》16 讲 / 91 关，代码切片取自 Zero2hero 官方源码 */
window.LLM_MODULES = ["计算图与梯度", "语言模型基座", "反传与结构", "GPT 与分词"];
window.LLM_LESSONS = [
 {
  "no": 1,
  "mod": 0,
  "title": "总览：一个大模型就是一次接龙",
  "src": "Deep Dive 压缩",
  "mins": 39,
  "n": 3
 },
 {
  "no": 2,
  "mod": 0,
  "title": "一个数怎么求导：Value 与计算图",
  "src": "L1 前半 · 2:25",
  "mins": 42,
  "n": 6
 },
 {
  "no": 3,
  "mod": 0,
  "title": "反向传播与 nn.Module",
  "src": "L1 后半",
  "mins": 45,
  "n": 6
 },
 {
  "no": 4,
  "mod": 1,
  "title": "从计数到概率：bigram 字符级模型",
  "src": "L2 · 1:57",
  "mins": 42,
  "n": 6
 },
 {
  "no": 5,
  "mod": 1,
  "title": "损失函数：为什么是交叉熵",
  "src": "新编",
  "mins": 28,
  "n": 4
 },
 {
  "no": 6,
  "mod": 1,
  "title": "MLP 上：训练集、验证集与嵌入",
  "src": "L3 前半 · 1:15",
  "mins": 42,
  "n": 6
 },
 {
  "no": 7,
  "mod": 1,
  "title": "MLP 下：初始化、学习率与过拟合",
  "src": "L3 后半",
  "mins": 42,
  "n": 6
 },
 {
  "no": 8,
  "mod": 1,
  "title": "梯度三关：消失、爆炸、死亡",
  "src": "L4 前段 · 1:55",
  "mins": 30,
  "n": 4
 },
 {
  "no": 9,
  "mod": 1,
  "title": "BatchNorm 精修与训练诊断",
  "src": "L4 后段",
  "mins": 45,
  "n": 6
 },
 {
  "no": 10,
  "mod": 2,
  "title": "反向传播 Ninja 上：手推全网络",
  "src": "L5 前半 · 1:55",
  "mins": 48,
  "n": 6
 },
 {
  "no": 11,
  "mod": 2,
  "title": "反向传播 Ninja 下：逐层对账",
  "src": "L5 后半",
  "mins": 48,
  "n": 6
 },
 {
  "no": 12,
  "mod": 2,
  "title": "层级结构：WaveNet 与树形依赖",
  "src": "L6 · 0:56",
  "mins": 39,
  "n": 6
 },
 {
  "no": 13,
  "mod": 2,
  "title": "Attention 为什么：从平均到加权",
  "src": "新编",
  "mins": 30,
  "n": 4
 },
 {
  "no": 14,
  "mod": 3,
  "title": "从零写 GPT：自注意力与多头",
  "src": "L7 前半 · 1:56",
  "mins": 45,
  "n": 8
 },
 {
  "no": 15,
  "mod": 3,
  "title": "从零写 GPT：残差、缩放与训练",
  "src": "L7 后半",
  "mins": 45,
  "n": 8
 },
 {
  "no": 16,
  "mod": 3,
  "title": "分词器：BPE 到底在切什么",
  "src": "L8 · 2:13",
  "mins": 42,
  "n": 6
 }
];
window.LLM_SNIPPETS = [
 {
  "id": "llm-01-01",
  "lesson": 1,
  "tier": 5,
  "title": "读入一份名字表",
  "hint": "课程数据只有三万个英文名字；模型要学的，就是这些名字的拼法。",
  "code": "words = open('names.txt', 'r').read().splitlines()\nwords[:10]\nlen(words)\nmin(len(w) for w in words)\nmax(len(w) for w in words)"
 },
 {
  "id": "llm-01-02",
  "lesson": 1,
  "tier": 5,
  "title": "数一数相邻字符对",
  "hint": "先不谈神经网络：把每个相邻字符对出现的次数数出来，概率就藏在里面。",
  "code": "b = {}\nfor w in words:\n  chs = ['<S>'] + list(w) + ['<E>']\n  for ch1, ch2 in zip(chs, chs[1:]):\n    bigram = (ch1, ch2)\n    b[bigram] = b.get(bigram, 0) + 1\nsorted(b.items(), key = lambda kv: -kv[1])"
 },
 {
  "id": "llm-01-03",
  "lesson": 1,
  "tier": 5,
  "title": "字符表与整数矩阵",
  "hint": "把字符映射成 0..26，再累加成一张 27×27 的计数矩阵。",
  "code": "chars = sorted(list(set(''.join(words))))\nstoi = {s:i+1 for i,s in enumerate(chars)}\nstoi['.'] = 0\nitos = {i:s for s,i in stoi.items()}\nfor w in words:\n  chs = ['.'] + list(w) + ['.']\n  for ch1, ch2 in zip(chs, chs[1:]):\n    ix1 = stoi[ch1]\n    ix2 = stoi[ch2]\n    N[ix1, ix2] += 1"
 },
 {
  "id": "llm-02-01",
  "lesson": 2,
  "tier": 5,
  "title": "Value 的五个字段",
  "hint": "data 是值，grad 是梯度；_prev 记住自己从谁算出来的。",
  "code": "def __init__(self, data, _children=(), _op=''):\n    self.data = data\n    self.grad = 0\n    # internal variables used for autograd graph construction\n    self._backward = lambda: None\n    self._prev = set(_children)\n    self._op = _op # the op that produced this node, for graphviz / debugging / etc"
 },
 {
  "id": "llm-02-02",
  "lesson": 2,
  "tier": 5,
  "title": "加法与它的反向",
  "hint": "加法的梯度原样往回传：这就是反向传播最简的一环。",
  "code": "def __add__(self, other):\n    other = other if isinstance(other, Value) else Value(other)\n    out = Value(self.data + other.data, (self, other), '+')\n    def _backward():\n        self.grad += out.grad\n        other.grad += out.grad\n    out._backward = _backward\n    return out"
 },
 {
  "id": "llm-02-03",
  "lesson": 2,
  "tier": 5,
  "title": "乘法与它的反向",
  "hint": "乘法互换两个乘子：self 的梯度带上 other 的值。",
  "code": "def __mul__(self, other):\n    other = other if isinstance(other, Value) else Value(other)\n    out = Value(self.data * other.data, (self, other), '*')\n    def _backward():\n        self.grad += other.data * out.grad\n        other.grad += self.data * out.grad\n    out._backward = _backward\n    return out"
 },
 {
  "id": "llm-02-04",
  "lesson": 2,
  "tier": 5,
  "title": "幂运算的梯度",
  "hint": "x**n 求导得 n·x**(n-1)，后面连乘、连除全靠它。",
  "code": "def __pow__(self, other):\n    assert isinstance(other, (int, float)), \"only supporting int/float powers for now\"\n    out = Value(self.data**other, (self,), f'**{other}')\n    def _backward():\n        self.grad += (other * self.data**(other-1)) * out.grad\n    out._backward = _backward\n    return out"
 },
 {
  "id": "llm-02-05",
  "lesson": 2,
  "tier": 5,
  "title": "ReLU 与它的反向",
  "hint": "ReLU 只在正半边放行，梯度是 0 或 1。",
  "code": "def relu(self):\n    out = Value(0 if self.data < 0 else self.data, (self,), 'ReLU')\n    def _backward():\n        self.grad += (out.data > 0) * out.grad\n    out._backward = _backward\n    return out"
 },
 {
  "id": "llm-02-06",
  "lesson": 2,
  "tier": 5,
  "title": "减法、除法、取负",
  "hint": "Python 的运算符都要补齐，否则 a - b 写不出来。",
  "code": "def __neg__(self): # -self\n    return self * -1\ndef __radd__(self, other): # other + self\n    return self + other\ndef __sub__(self, other): # self - other\n    return self + (-other)"
 },
 {
  "id": "llm-03-01",
  "lesson": 3,
  "tier": 5,
  "title": "backward：先排拓扑序",
  "hint": "先把整张图按依赖关系排好序，才谈得上从后往前传。",
  "code": "# topological order all of the children in the graph\ntopo = []\nvisited = set()\ndef build_topo(v):\n    if v not in visited:\n        visited.add(v)\n        for child in v._prev:\n            build_topo(child)\n        topo.append(v)\nbuild_topo(self)"
 },
 {
  "id": "llm-03-02",
  "lesson": 3,
  "tier": 5,
  "title": "backward：逆序链式求导",
  "hint": "自己先置 1，然后每一步把梯度推给上游。",
  "code": "# go one variable at a time and apply the chain rule to get its gradient\nself.grad = 1\nfor v in reversed(topo):\n    v._backward()"
 },
 {
  "id": "llm-03-03",
  "lesson": 3,
  "tier": 5,
  "title": "Module：参数与清梯度",
  "hint": "zero_grad / parameters 是所有层共享的两条约定。",
  "code": "class Module:\n    def zero_grad(self):\n        for p in self.parameters():\n            p.grad = 0\n    def parameters(self):\n        return []"
 },
 {
  "id": "llm-03-04",
  "lesson": 3,
  "tier": 5,
  "title": "Neuron：一个神经元",
  "hint": "权重乘输入再求和，最后过一道非线性。",
  "code": "class Neuron(Module):\n    def __init__(self, nin, nonlin=True):\n        self.w = [Value(random.uniform(-1,1)) for _ in range(nin)]\n        self.b = Value(0)\n        self.nonlin = nonlin\n    def __call__(self, x):\n        act = sum((wi*xi for wi,xi in zip(self.w, x)), self.b)\n        return act.relu() if self.nonlin else act\n    def parameters(self):\n        return self.w + [self.b]"
 },
 {
  "id": "llm-03-05",
  "lesson": 3,
  "tier": 5,
  "title": "Layer：一层神经元",
  "hint": "一层就是若干个神经元并排，输出拼成向量。",
  "code": "class Layer(Module):\n    def __init__(self, nin, nout, **kwargs):\n        self.neurons = [Neuron(nin, **kwargs) for _ in range(nout)]\n    def __call__(self, x):\n        out = [n(x) for n in self.neurons]\n        return out[0] if len(out) == 1 else out\n    def parameters(self):\n        return [p for n in self.neurons for p in n.parameters()]"
 },
 {
  "id": "llm-03-06",
  "lesson": 3,
  "tier": 5,
  "title": "MLP：把层堆起来",
  "hint": "层与层首尾相接，最后一层不要非线性。",
  "code": "class MLP(Module):\n    def __init__(self, nin, nouts):\n        sz = [nin] + nouts\n        self.layers = [Layer(sz[i], sz[i+1], nonlin=i!=len(nouts)-1) for i in range(len(nouts))]\n    def __call__(self, x):\n        for layer in self.layers:\n            x = layer(x)\n        return x\n    def parameters(self):\n        return [p for layer in self.layers for p in layer.parameters()]"
 },
 {
  "id": "llm-04-01",
  "lesson": 4,
  "tier": 5,
  "title": "训练集：(x, y) 对",
  "hint": "每个字符跟着下一个字符，就是一条训练样本。",
  "code": "# create the training set of bigrams (x,y)\nxs, ys = [], []\nfor w in words[:1]:\n  chs = ['.'] + list(w) + ['.']\n  for ch1, ch2 in zip(chs, chs[1:]):\n    ix1 = stoi[ch1]\n    ix2 = stoi[ch2]\n    print(ch1, ch2)\n    xs.append(ix1)\n    ys.append(ix2)\nxs = torch.tensor(xs)\nys = torch.tensor(ys)"
 },
 {
  "id": "llm-04-02",
  "lesson": 4,
  "tier": 5,
  "title": "one-hot 编码",
  "hint": "把字符编号变成 27 维独热向量，才喂得进矩阵乘法。",
  "code": "import torch.nn.functional as F\nxenc = F.one_hot(xs, num_classes=27).float()\nxenc\nxenc.shape"
 },
 {
  "id": "llm-04-03",
  "lesson": 4,
  "tier": 5,
  "title": "从 logits 到概率",
  "hint": "exp 之后归一化，这三行合起来就叫 softmax。",
  "code": "W = torch.randn((27, 1))\nxenc @ W\nlogits = xenc @ W # log-counts\ncounts = logits.exp() # equivalent N\nprobs = counts / counts.sum(1, keepdims=True)\nprobs"
 },
 {
  "id": "llm-04-04",
  "lesson": 4,
  "tier": 5,
  "title": "前向传播一次",
  "hint": "one-hot 乘 W 得 logits，softmax 得概率。",
  "code": "# randomly initialize 27 neurons' weights. each neuron receives 27 inputs\ng = torch.Generator().manual_seed(2147483647)\nW = torch.randn((27, 27), generator=g)\nxenc = F.one_hot(xs, num_classes=27).float() # input to the network: one-hot encoding\nlogits = xenc @ W # predict log-counts\ncounts = logits.exp() # counts, equivalent to N\nprobs = counts / counts.sum(1, keepdims=True) # probabilities for next character\n# btw: the last 2 lines here are together called a 'softmax'"
 },
 {
  "id": "llm-04-05",
  "lesson": 4,
  "tier": 5,
  "title": "逐样本算负对数似然",
  "hint": "取对数、变负数、取平均——loss 就是这么来的。",
  "code": "nlls = torch.zeros(5)\nfor i in range(5):\n  # i-th bigram:\n  x = xs[i].item() # input character index\n  y = ys[i].item() # label character index\n  print('--------')\n  print(f'bigram example {i+1}: {itos[x]}{itos[y]} (indexes {x},{y})')\n  print('input to the neural net:', x)\n  print('output probabilities from the neural net:', probs[i])\n  print('label (actual next character):', y)\n  p = probs[i, y]\n  print('probability assigned by the net to the the correct character:', p.item())\n  logp = torch.log(p)\n  print('log likelihood:', logp.item())\n  nll = -logp\n  print('negative log likelihood:', nll.item())\n  nlls[i] = nll\nprint('=========')\nprint('average negative log likelihood, i.e. loss =', nlls.mean().item())"
 },
 {
  "id": "llm-04-06",
  "lesson": 4,
  "tier": 5,
  "title": "用训练好的 W 采样",
  "hint": "每次按概率抽一个字符，抽到 . 就停。",
  "code": "# finally, sample from the 'neural net' model\ng = torch.Generator().manual_seed(2147483647)\nfor i in range(5):\n  out = []\n  ix = 0\n  while True:\n    # ----------\n    # BEFORE:\n    #p = P[ix]\n    # ----------\n    # NOW:\n    xenc = F.one_hot(torch.tensor([ix]), num_classes=27).float()\n    logits = xenc @ W # predict log-counts\n    counts = logits.exp() # counts, equivalent to N\n    p = counts / counts.sum(1, keepdims=True) # probabilities for next character\n    # ----------\n    ix = torch.multinomial(p, num_samples=1, replacement=True, generator=g).item()\n    out.append(itos[ix])\n    if ix == 0:\n      break\n  print(''.join(out))"
 },
 {
  "id": "llm-05-01",
  "lesson": 5,
  "tier": 5,
  "title": "对数似然逐对累加",
  "hint": "概率连乘容易下溢，取对数就变成连加。",
  "code": "log_likelihood = 0.0\nn = 0\nfor w in words:\n#for w in [\"andrejq\"]:\n  chs = ['.'] + list(w) + ['.']\n  for ch1, ch2 in zip(chs, chs[1:]):\n    ix1 = stoi[ch1]\n    ix2 = stoi[ch2]\n    prob = P[ix1, ix2]\n    logprob = torch.log(prob)\n    log_likelihood += logprob\n    n += 1"
 },
 {
  "id": "llm-05-02",
  "lesson": 5,
  "tier": 5,
  "title": "平均负对数似然",
  "hint": "除以样本数取平均，loss 就跟数据量无关了。",
  "code": "print(f'{log_likelihood=}')\nnll = -log_likelihood\nprint(f'{nll=}')\nprint(f'{nll/n}')"
 },
 {
  "id": "llm-05-03",
  "lesson": 5,
  "tier": 5,
  "title": "向量化求 loss",
  "hint": "一次算完整个 batch：probs[arange, ys].log().mean()。",
  "code": "# forward pass\nxenc = F.one_hot(xs, num_classes=27).float() # input to the network: one-hot encoding\nlogits = xenc @ W # predict log-counts\ncounts = logits.exp() # counts, equivalent to N\nprobs = counts / counts.sum(1, keepdims=True) # probabilities for next character\nloss = -probs[torch.arange(5), ys].log().mean()"
 },
 {
  "id": "llm-05-04",
  "lesson": 5,
  "tier": 5,
  "title": "正则化 + 反向 + 更新",
  "hint": "加一项 W² 惩罚，再走一步梯度下降。",
  "code": "loss = -probs[torch.arange(num), ys].log().mean() + 0.01*(W**2).mean()\nprint(loss.item())\n# backward pass\nW.grad = None # set to zero the gradient\nloss.backward()\n# update\nW.data += -50 * W.grad"
 },
 {
  "id": "llm-06-01",
  "lesson": 6,
  "tier": 5,
  "title": "build_dataset：滑窗造样本",
  "hint": "三个字符预测第四个，窗口一格一格往右挪。",
  "code": "def build_dataset(words):\n  X, Y = [], []\n  for w in words:\n    #print(w)\n    context = [0] * block_size\n    for ch in w + '.':\n      ix = stoi[ch]\n      X.append(context)\n      Y.append(ix)\n      #print(''.join(itos[i] for i in context), '--->', itos[ix])\n      context = context[1:] + [ix] # crop and append\n  X = torch.tensor(X)\n  Y = torch.tensor(Y)\n  print(X.shape, Y.shape)\n  return X, Y\nimport random\nrandom.seed(42)\nrandom.shuffle(words)"
 },
 {
  "id": "llm-06-02",
  "lesson": 6,
  "tier": 5,
  "title": "训练 / 验证 / 测试三分",
  "hint": "80 / 10 / 10，验证集是用来选超参的。",
  "code": "n1 = int(0.8*len(words))\nn2 = int(0.9*len(words))\nXtr, Ytr = build_dataset(words[:n1])\nXdev, Ydev = build_dataset(words[n1:n2])\nXte, Yte = build_dataset(words[n2:])"
 },
 {
  "id": "llm-06-03",
  "lesson": 6,
  "tier": 5,
  "title": "词嵌入矩阵 C",
  "hint": "27 个字符，每个换成 2 维向量，而不是 27 维独热。",
  "code": "C = torch.randn((27, 2))\nemb = C[X]\nemb.shape"
 },
 {
  "id": "llm-06-04",
  "lesson": 6,
  "tier": 5,
  "title": "拼接窗口 + 隐层",
  "hint": "三个 2 维拼成 6 维，过一层 100 神经元的 tanh。",
  "code": "W1 = torch.randn((6, 100))\nb1 = torch.randn(100)\nh = torch.tanh(emb.view(-1, 6) @ W1 + b1)"
 },
 {
  "id": "llm-06-05",
  "lesson": 6,
  "tier": 5,
  "title": "输出层 logits",
  "hint": "把 100 维压回 27 个字符的分数。",
  "code": "W2 = torch.randn((100, 27))\nb2 = torch.randn(27)\nlogits = h @ W2 + b2"
 },
 {
  "id": "llm-06-06",
  "lesson": 6,
  "tier": 5,
  "title": "参数初始化",
  "hint": "五个参数张量一起交给优化器。",
  "code": "g = torch.Generator().manual_seed(2147483647) # for reproducibility\nC = torch.randn((27, 10), generator=g)\nW1 = torch.randn((30, 200), generator=g)\nb1 = torch.randn(200, generator=g)\nW2 = torch.randn((200, 27), generator=g)\nb2 = torch.randn(27, generator=g)\nparameters = [C, W1, b1, W2, b2]"
 },
 {
  "id": "llm-07-01",
  "lesson": 7,
  "tier": 5,
  "title": "打开梯度",
  "hint": "默认不记梯度，要手动对每个参数打开。",
  "code": "sum(p.nelement() for p in parameters) # number of parameters in total\nfor p in parameters:\n  p.requires_grad = True"
 },
 {
  "id": "llm-07-02",
  "lesson": 7,
  "tier": 5,
  "title": "学习率网格",
  "hint": "先扫一遍 1e-3 到 1 的量级，再定最终学习率。",
  "code": "lre = torch.linspace(-3, 0, 1000)\nlrs = 10**lre\nlri = []\nlossi = []\nstepi = []"
 },
 {
  "id": "llm-07-03",
  "lesson": 7,
  "tier": 5,
  "title": "训练循环：前向 + 交叉熵",
  "hint": "取一个 minibatch，前向，算损失。",
  "code": "for i in range(200000):\n  # minibatch construct\n  ix = torch.randint(0, Xtr.shape[0], (32,))\n  # forward pass\n  emb = C[Xtr[ix]] # (32, 3, 10)\n  h = torch.tanh(emb.view(-1, 30) @ W1 + b1) # (32, 200)\n  logits = h @ W2 + b2 # (32, 27)\n  loss = F.cross_entropy(logits, Ytr[ix])"
 },
 {
  "id": "llm-07-04",
  "lesson": 7,
  "tier": 5,
  "title": "反向 + 更新 + 学习率衰减",
  "hint": "十万步之后把学习率降到 1/10，损失会再掉一档。",
  "code": "# backward pass\nfor p in parameters:\n  p.grad = None\nloss.backward()\n# update\n#lr = lrs[i]\nlr = 0.1 if i < 100000 else 0.01\nfor p in parameters:\n  p.data += -lr * p.grad\n# track stats\n#lri.append(lre[i])\nstepi.append(i)\nlossi.append(loss.log10().item())"
 },
 {
  "id": "llm-07-05",
  "lesson": 7,
  "tier": 5,
  "title": "训练集损失",
  "hint": "整份训练集一次前向，看拟合到什么程度。",
  "code": "emb = C[Xtr] # (32, 3, 2)\nh = torch.tanh(emb.view(-1, 30) @ W1 + b1) # (32, 100)\nlogits = h @ W2 + b2 # (32, 27)\nloss = F.cross_entropy(logits, Ytr)\nloss"
 },
 {
  "id": "llm-07-06",
  "lesson": 7,
  "tier": 5,
  "title": "验证集损失",
  "hint": "同一套参数换验证集，和训练集差多少就是过拟合的量。",
  "code": "emb = C[Xdev] # (32, 3, 2)\nh = torch.tanh(emb.view(-1, 30) @ W1 + b1) # (32, 100)\nlogits = h @ W2 + b2 # (32, 27)\nloss = F.cross_entropy(logits, Ydev)\nloss"
 },
 {
  "id": "llm-08-01",
  "lesson": 8,
  "tier": 5,
  "title": "Kaiming 初始化与零 bias",
  "hint": "权重除以 sqrt(fan_in)，bias 可以直接不要。",
  "code": "# MLP revisited\nn_embd = 10 # the dimensionality of the character embedding vectors\nn_hidden = 200 # the number of neurons in the hidden layer of the MLP\ng = torch.Generator().manual_seed(2147483647) # for reproducibility\nC  = torch.randn((vocab_size, n_embd),            generator=g)\nW1 = torch.randn((n_embd * block_size, n_hidden), generator=g) * (5/3)/((n_embd * block_size)**0.5) #* 0.2\n#b1 = torch.randn(n_hidden,                        generator=g) * 0.01\nW2 = torch.randn((n_hidden, vocab_size),          generator=g) * 0.01\nb2 = torch.randn(vocab_size,                      generator=g) * 0"
 },
 {
  "id": "llm-08-02",
  "lesson": 8,
  "tier": 5,
  "title": "看激活分布：饱和了多少",
  "hint": "tanh 一旦饱和到 ±1，梯度就几乎传不动了。",
  "code": "# visualize histograms\nplt.figure(figsize=(20, 4)) # width and height of the plot\nlegends = []\nfor i, layer in enumerate(layers[:-1]): # note: exclude the output layer\n  if isinstance(layer, Tanh):\n    t = layer.out\n    print('layer %d (%10s): mean %+.2f, std %.2f, saturated: %.2f%%' % (i, layer.__class__.__name__, t.mean(), t.std(), (t.abs() > 0.97).float().mean()*100))\n    hy, hx = torch.histogram(t, density=True)\n    plt.plot(hx[:-1].detach(), hy.detach())\n    legends.append(f'layer {i} ({layer.__class__.__name__}')\nplt.legend(legends);\nplt.title('activation distribution')"
 },
 {
  "id": "llm-08-03",
  "lesson": 8,
  "tier": 5,
  "title": "看梯度分布：还剩多少",
  "hint": "逐层看梯度直方图，越靠下越窄就是消失。",
  "code": "# visualize histograms\nplt.figure(figsize=(20, 4)) # width and height of the plot\nlegends = []\nfor i, layer in enumerate(layers[:-1]): # note: exclude the output layer\n  if isinstance(layer, Tanh):\n    t = layer.out.grad\n    print('layer %d (%10s): mean %+f, std %e' % (i, layer.__class__.__name__, t.mean(), t.std()))\n    hy, hx = torch.histogram(t, density=True)\n    plt.plot(hx[:-1].detach(), hy.detach())\n    legends.append(f'layer {i} ({layer.__class__.__name__}')\nplt.legend(legends);\nplt.title('gradient distribution')"
 },
 {
  "id": "llm-08-04",
  "lesson": 8,
  "tier": 5,
  "title": "update / data 比例",
  "hint": "这个比值应该在 1e-3 左右，差一个量级就要改学习率。",
  "code": "plt.figure(figsize=(20, 4))\nlegends = []\nfor i,p in enumerate(parameters):\n  if p.ndim == 2:\n    plt.plot([ud[j][i] for j in range(len(ud))])\n    legends.append('param %d' % i)\nplt.plot([0, len(ud)], [-3, -3], 'k') # these ratios should be ~1e-3, indicate on plot\nplt.legend(legends);"
 },
 {
  "id": "llm-09-01",
  "lesson": 9,
  "tier": 5,
  "title": "BatchNorm 的参数与缓冲区",
  "hint": "gamma / beta 要训练，running 均值方差只是记录。",
  "code": "# BatchNorm parameters\nbngain = torch.ones((1, n_hidden))\nbnbias = torch.zeros((1, n_hidden))\nbnmean_running = torch.zeros((1, n_hidden))\nbnstd_running = torch.ones((1, n_hidden))"
 },
 {
  "id": "llm-09-02",
  "lesson": 9,
  "tier": 5,
  "title": "BN 前向：批内标准化",
  "hint": "减批均值、除批标准差，让每一层输入都归一。",
  "code": "# BatchNorm layer\n# -------------------------------------------------------------\nbnmeani = hpreact.mean(0, keepdim=True)\nbnstdi = hpreact.std(0, keepdim=True)\nhpreact = bngain * (hpreact - bnmeani) / bnstdi + bnbias"
 },
 {
  "id": "llm-09-03",
  "lesson": 9,
  "tier": 5,
  "title": "BN 前向：gain / bias + 滑动平均",
  "hint": "再学一个缩放和平移，同时把统计量滑进 buffer。",
  "code": "with torch.no_grad():\n  bnmean_running = 0.999 * bnmean_running + 0.001 * bnmeani\n  bnstd_running = 0.999 * bnstd_running + 0.001 * bnstdi\n# -------------------------------------------------------------\n# Non-linearity\nh = torch.tanh(hpreact) # hidden layer"
 },
 {
  "id": "llm-09-04",
  "lesson": 9,
  "tier": 5,
  "title": "Linear：手工实现一层",
  "hint": "跟 PyTorch 的 nn.Linear 同一个接口，只是自己写一遍。",
  "code": "class Linear:\n  def __init__(self, fan_in, fan_out, bias=True):\n    self.weight = torch.randn((fan_in, fan_out), generator=g) / fan_in**0.5\n    self.bias = torch.zeros(fan_out) if bias else None\n  def __call__(self, x):\n    self.out = x @ self.weight\n    if self.bias is not None:\n      self.out += self.bias\n    return self.out\n  def parameters(self):\n    return [self.weight] + ([] if self.bias is None else [self.bias])"
 },
 {
  "id": "llm-09-05",
  "lesson": 9,
  "tier": 5,
  "title": "BatchNorm1d：训练时用批统计",
  "hint": "训练走一批的均值方差，顺手更新 running。",
  "code": "def __call__(self, x):\n  # calculate the forward pass\n  if self.training:\n    xmean = x.mean(0, keepdim=True) # batch mean\n    xvar = x.var(0, keepdim=True) # batch variance\n  else:\n    xmean = self.running_mean\n    xvar = self.running_var\n  xhat = (x - xmean) / torch.sqrt(xvar + self.eps) # normalize to unit variance\n  self.out = self.gamma * xhat + self.beta"
 },
 {
  "id": "llm-09-06",
  "lesson": 9,
  "tier": 5,
  "title": "BatchNorm1d：推理时用 running",
  "hint": "推理没有 batch 可言，只能靠训练时攒下的统计量。",
  "code": "  # update the buffers\n  if self.training:\n    with torch.no_grad():\n      self.running_mean = (1 - self.momentum) * self.running_mean + self.momentum * xmean\n      self.running_var = (1 - self.momentum) * self.running_var + self.momentum * xvar\n  return self.out\ndef parameters(self):\n  return [self.gamma, self.beta]"
 },
 {
  "id": "llm-10-01",
  "lesson": 10,
  "tier": 5,
  "title": "把前向拆成一步一变量",
  "hint": "每一步只做一件事，才可能一步步往回求导。",
  "code": "# forward pass, \"chunkated\" into smaller steps that are possible to backward one at a time\nemb = C[Xb] # embed the characters into vectors\nembcat = emb.view(emb.shape[0], -1) # concatenate the vectors\n# Linear layer 1\nhprebn = embcat @ W1 + b1 # hidden layer pre-activation\n# BatchNorm layer\nbnmeani = 1/n*hprebn.sum(0, keepdim=True)\nbndiff = hprebn - bnmeani\nbndiff2 = bndiff**2\nbnvar = 1/(n-1)*(bndiff2).sum(0, keepdim=True) # note: Bessel's correction (dividing by n-1, not n)\nbnvar_inv = (bnvar + 1e-5)**-0.5\nbnraw = bndiff * bnvar_inv\nhpreact = bngain * bnraw + bnbias\n# Non-linearity\nh = torch.tanh(hpreact) # hidden layer\n# Linear layer 2\nlogits = h @ W2 + b2 # output layer"
 },
 {
  "id": "llm-10-02",
  "lesson": 10,
  "tier": 5,
  "title": "交叉熵也是一种 softmax",
  "hint": "减最大值、exp、归一化、取对数——全部摊开写。",
  "code": "# cross entropy loss (same as F.cross_entropy(logits, Yb))\nlogit_maxes = logits.max(1, keepdim=True).values\nnorm_logits = logits - logit_maxes # subtract max for numerical stability\ncounts = norm_logits.exp()\ncounts_sum = counts.sum(1, keepdims=True)\ncounts_sum_inv = counts_sum**-1 # if I use (1.0 / counts_sum) instead then I can't get backprop to be bit exact...\nprobs = counts * counts_sum_inv\nlogprobs = probs.log()\nloss = -logprobs[range(n), Yb].mean()"
 },
 {
  "id": "llm-10-03",
  "lesson": 10,
  "tier": 5,
  "title": "先把中间量都 retain 住",
  "hint": "PyTorch 默认不存中间张量的梯度，要手动开。",
  "code": "# PyTorch backward pass\nfor p in parameters:\n  p.grad = None\nfor t in [logprobs, probs, counts, counts_sum, counts_sum_inv, # afaik there is no cleaner way\n          norm_logits, logit_maxes, logits, h, hpreact, bnraw,\n         bnvar_inv, bnvar, bndiff2, bndiff, hprebn, bnmeani,\n         embcat, emb]:\n  t.retain_grad()\nloss.backward()"
 },
 {
  "id": "llm-10-04",
  "lesson": 10,
  "tier": 5,
  "title": "loss → probs 的梯度",
  "hint": "只有一个位置有梯度：正确字符那一格是 -1/n。",
  "code": "dlogprobs = torch.zeros_like(logprobs)\ndlogprobs[range(n), Yb] = -1.0/n\ndprobs = (1.0 / probs) * dlogprobs\ndcounts_sum_inv = (counts * dprobs).sum(1, keepdim=True)\ndcounts = counts_sum_inv * dprobs\ndcounts_sum = (-counts_sum**-2) * dcounts_sum_inv"
 },
 {
  "id": "llm-10-05",
  "lesson": 10,
  "tier": 5,
  "title": "probs → logits 的梯度",
  "hint": "商的求导法则，穿过 softmax 的三步。",
  "code": "dcounts += torch.ones_like(counts) * dcounts_sum\ndnorm_logits = counts * dcounts\ndlogits = dnorm_logits.clone()\ndlogit_maxes = (-dnorm_logits).sum(1, keepdim=True)\ndlogits += F.one_hot(logits.max(1).indices, num_classes=logits.shape[1]) * dlogit_maxes"
 },
 {
  "id": "llm-10-06",
  "lesson": 10,
  "tier": 5,
  "title": "logits → h → hpreact",
  "hint": "矩阵乘法的反向就是转置相乘。",
  "code": "dh = dlogits @ W2.T\ndW2 = h.T @ dlogits\ndb2 = dlogits.sum(0)\ndhpreact = (1.0 - h**2) * dh"
 },
 {
  "id": "llm-11-01",
  "lesson": 11,
  "tier": 5,
  "title": "BN 的 gain / bias / raw",
  "hint": "BN 有三个输入，每个都要单独求一份梯度。",
  "code": "dbngain = (bnraw * dhpreact).sum(0, keepdim=True)\ndbnraw = bngain * dhpreact\ndbnbias = dhpreact.sum(0, keepdim=True)"
 },
 {
  "id": "llm-11-02",
  "lesson": 11,
  "tier": 5,
  "title": "BN 的方差与差",
  "hint": "标准差里套着方差、方差里套着平方差，一层层剥。",
  "code": "dbndiff = bnvar_inv * dbnraw\ndbnvar_inv = (bndiff * dbnraw).sum(0, keepdim=True)\ndbnvar = (-0.5*(bnvar + 1e-5)**-1.5) * dbnvar_inv\ndbndiff2 = (1.0/(n-1))*torch.ones_like(bndiff2) * dbnvar\ndbndiff += (2*bndiff) * dbndiff2\ndhprebn = dbndiff.clone()"
 },
 {
  "id": "llm-11-03",
  "lesson": 11,
  "tier": 5,
  "title": "BN 的均值",
  "hint": "均值把梯度平均分回整批。",
  "code": "dbnmeani = (-dbndiff).sum(0)\ndhprebn += 1.0/n * (torch.ones_like(hprebn) * dbnmeani)\ndembcat = dhprebn @ W1.T"
 },
 {
  "id": "llm-11-04",
  "lesson": 11,
  "tier": 5,
  "title": "回到 W1 与 b1",
  "hint": "一路传回第一层线性层。",
  "code": "dW1 = embcat.T @ dhprebn\ndb1 = dhprebn.sum(0)\ndemb = dembcat.view(emb.shape)"
 },
 {
  "id": "llm-11-05",
  "lesson": 11,
  "tier": 5,
  "title": "散回嵌入矩阵 C",
  "hint": "同一个字符出现在多个位置，梯度要累加。",
  "code": "dC = torch.zeros_like(C)\nfor k in range(Xb.shape[0]):\n  for j in range(Xb.shape[1]):\n    ix = Xb[k,j]\n    dC[ix] += demb[k,j]"
 },
 {
  "id": "llm-11-06",
  "lesson": 11,
  "tier": 5,
  "title": "和 PyTorch 逐项对账",
  "hint": "每个中间量都跟 autograd 比一遍，误差要在 1e-6 以内。",
  "code": "cmp('logprobs', dlogprobs, logprobs)\ncmp('probs', dprobs, probs)\ncmp('counts_sum_inv', dcounts_sum_inv, counts_sum_inv)\ncmp('counts_sum', dcounts_sum, counts_sum)\ncmp('counts', dcounts, counts)\ncmp('norm_logits', dnorm_logits, norm_logits)\ncmp('logit_maxes', dlogit_maxes, logit_maxes)\ncmp('logits', dlogits, logits)\ncmp('h', dh, h)\ncmp('W2', dW2, W2)\ncmp('b2', db2, b2)\ncmp('hpreact', dhpreact, hpreact)\ncmp('bngain', dbngain, bngain)\ncmp('bnbias', dbnbias, bnbias)\ncmp('bnraw', dbnraw, bnraw)\ncmp('bnvar_inv', dbnvar_inv, bnvar_inv)\ncmp('bnvar', dbnvar, bnvar)\ncmp('bndiff2', dbndiff2, bndiff2)\ncmp('bndiff', dbndiff, bndiff)\ncmp('bnmeani', dbnmeani, bnmeani)\ncmp('hprebn', dhprebn, hprebn)"
 },
 {
  "id": "llm-12-01",
  "lesson": 12,
  "tier": 5,
  "title": "滑窗造数据集（上下文 8）",
  "hint": "上下文从 3 拉到 8，一个字符一个字符往后挪。",
  "code": "# build the dataset\nblock_size = 8 # context length: how many characters do we take to predict the next one?\ndef build_dataset(words):\n  X, Y = [], []\n  for w in words:\n    context = [0] * block_size\n    for ch in w + '.':\n      ix = stoi[ch]\n      X.append(context)\n      Y.append(ix)\n      context = context[1:] + [ix] # crop and append\n  X = torch.tensor(X)\n  Y = torch.tensor(Y)\n  print(X.shape, Y.shape)\n  return X, Y"
 },
 {
  "id": "llm-12-02",
  "lesson": 12,
  "tier": 5,
  "title": "三分数据集",
  "hint": "先打乱再切，避免名字首字母扎堆。",
  "code": "n1 = int(0.8*len(words))\nn2 = int(0.9*len(words))\nXtr,  Ytr  = build_dataset(words[:n1])     # 80%\nXdev, Ydev = build_dataset(words[n1:n2])   # 10%\nXte,  Yte  = build_dataset(words[n2:])     # 10%"
 },
 {
  "id": "llm-12-03",
  "lesson": 12,
  "tier": 5,
  "title": "Linear：Kaiming 初始化",
  "hint": "权重除以 sqrt(fan_in)，这是深网络能训起来的前提。",
  "code": "# -----------------------------------------------------------------------------------------------\nclass Linear:\n  def __init__(self, fan_in, fan_out, bias=True):\n    self.weight = torch.randn((fan_in, fan_out)) / fan_in**0.5 # note: kaiming init\n    self.bias = torch.zeros(fan_out) if bias else None\n  def __call__(self, x):\n    self.out = x @ self.weight\n    if self.bias is not None:\n      self.out += self.bias\n    return self.out\n  def parameters(self):\n    return [self.weight] + ([] if self.bias is None else [self.bias])"
 },
 {
  "id": "llm-12-04",
  "lesson": 12,
  "tier": 5,
  "title": "BatchNorm1d：按 ndim 选归约轴",
  "hint": "二维批按第 0 维归一，三维批要按 (0,1) 一起归。",
  "code": "def __call__(self, x):\n  # calculate the forward pass\n  if self.training:\n    if x.ndim == 2:\n      dim = 0\n    elif x.ndim == 3:\n      dim = (0,1)\n    xmean = x.mean(dim, keepdim=True) # batch mean\n    xvar = x.var(dim, keepdim=True) # batch variance\n  else:\n    xmean = self.running_mean\n    xvar = self.running_var\n  xhat = (x - xmean) / torch.sqrt(xvar + self.eps) # normalize to unit variance\n  self.out = self.gamma * xhat + self.beta\n  # update the buffers\n  if self.training:\n    with torch.no_grad():\n      self.running_mean = (1 - self.momentum) * self.running_mean + self.momentum * xmean\n      self.running_var = (1 - self.momentum) * self.running_var + self.momentum * xvar\n  return self.out"
 },
 {
  "id": "llm-12-05",
  "lesson": 12,
  "tier": 5,
  "title": "FlattenConsecutive：合并相邻两位",
  "hint": "每合并一次，序列长度减半、特征宽度翻倍。",
  "code": "class FlattenConsecutive:\n  def __init__(self, n):\n    self.n = n\n  def __call__(self, x):\n    B, T, C = x.shape\n    x = x.view(B, T//self.n, C*self.n)\n    if x.shape[1] == 1:\n      x = x.squeeze(1)\n    self.out = x\n    return self.out\n  def parameters(self):\n    return []"
 },
 {
  "id": "llm-12-06",
  "lesson": 12,
  "tier": 5,
  "title": "分层模型装配",
  "hint": "同样的一层重复三次，序列 8→4→2→1，视野 2→4→8。",
  "code": "n_hidden = 128 # the number of neurons in the hidden layer of the MLP\nmodel = Sequential([\n  Embedding(vocab_size, n_embd),\n  FlattenConsecutive(2), Linear(n_embd * 2, n_hidden, bias=False), BatchNorm1d(n_hidden), Tanh(),\n  FlattenConsecutive(2), Linear(n_hidden*2, n_hidden, bias=False), BatchNorm1d(n_hidden), Tanh(),\n  FlattenConsecutive(2), Linear(n_hidden*2, n_hidden, bias=False), BatchNorm1d(n_hidden), Tanh(),\n  Linear(n_hidden, vocab_size),\n])\n# parameter init\nwith torch.no_grad():\n  model.layers[-1].weight *= 0.1 # last layer make less confident\nparameters = model.parameters()\nprint(sum(p.nelement() for p in parameters)) # number of parameters in total\nfor p in parameters:\n  p.requires_grad = True"
 },
 {
  "id": "llm-13-01",
  "lesson": 13,
  "tier": 5,
  "title": "用掩码矩阵做加权平均",
  "hint": "下三角矩阵乘一遍，就等于「只对前面求平均」。",
  "code": "# toy example illustrating how matrix multiplication can be used for a \"weighted aggregation\"\ntorch.manual_seed(42)\na = torch.tril(torch.ones(3, 3))\na = a / torch.sum(a, 1, keepdim=True)\nb = torch.randint(0,10,(3,2)).float()\nc = a @ b\nprint('a=')\nprint(a)\nprint('--')\nprint('b=')\nprint(b)\nprint('--')\nprint('c=')\nprint(c)"
 },
 {
  "id": "llm-13-02",
  "lesson": 13,
  "tier": 5,
  "title": "手写版本：逐位置求均值",
  "hint": "先用两个 for 循环写清楚要什么，再想怎么并行。",
  "code": "# We want x[b,t] = mean_{i<=t} x[b,i]\nxbow = torch.zeros((B,T,C))\nfor b in range(B):\n    for t in range(T):\n        xprev = x[b,:t+1] # (t,C)\n        xbow[b,t] = torch.mean(xprev, 0)"
 },
 {
  "id": "llm-13-03",
  "lesson": 13,
  "tier": 5,
  "title": "用 softmax 代替归一化",
  "hint": "遮罩填 -inf，softmax 之后天然只剩前面。",
  "code": "# version 3: use Softmax\ntril = torch.tril(torch.ones(T, T))\nwei = torch.zeros((T,T))\nwei = wei.masked_fill(tril == 0, float('-inf'))\nwei = F.softmax(wei, dim=-1)\nxbow3 = wei @ x\ntorch.allclose(xbow, xbow3)"
 },
 {
  "id": "llm-13-04",
  "lesson": 13,
  "tier": 5,
  "title": "自注意力：q、k、v",
  "hint": "三个线性层分别算 query / key / value，打分再乘 value。",
  "code": "# version 4: self-attention!\ntorch.manual_seed(1337)\nB,T,C = 4,8,32 # batch, time, channels\nx = torch.randn(B,T,C)\n# let's see a single Head perform self-attention\nhead_size = 16\nkey = nn.Linear(C, head_size, bias=False)\nquery = nn.Linear(C, head_size, bias=False)\nvalue = nn.Linear(C, head_size, bias=False)\nk = key(x)   # (B, T, 16)\nq = query(x) # (B, T, 16)\nwei =  q @ k.transpose(-2, -1) # (B, T, 16) @ (B, 16, T) ---> (B, T, T)\ntril = torch.tril(torch.ones(T, T))\n#wei = torch.zeros((T,T))\nwei = wei.masked_fill(tril == 0, float('-inf'))\nwei = F.softmax(wei, dim=-1)\nv = value(x)\nout = wei @ v\n#out = wei @ x\nout.shape"
 },
 {
  "id": "llm-14-01",
  "lesson": 14,
  "tier": 5,
  "title": "Head：三个投影",
  "hint": "key / query / value 各一个线性层，都不带 bias。",
  "code": "def __init__(self, head_size):\n    super().__init__()\n    self.key = nn.Linear(n_embd, head_size, bias=False)\n    self.query = nn.Linear(n_embd, head_size, bias=False)\n    self.value = nn.Linear(n_embd, head_size, bias=False)\n    self.register_buffer('tril', torch.tril(torch.ones(block_size, block_size)))\n    self.dropout = nn.Dropout(dropout)"
 },
 {
  "id": "llm-14-02",
  "lesson": 14,
  "tier": 5,
  "title": "Head：算 k 和 q",
  "hint": "整批一次算完，形状 (B, T, head_size)。",
  "code": "def forward(self, x):\n    B,T,C = x.shape\n    k = self.key(x)   # (B,T,C)\n    q = self.query(x) # (B,T,C)"
 },
 {
  "id": "llm-14-03",
  "lesson": 14,
  "tier": 5,
  "title": "Head：打分 + 遮罩 + softmax",
  "hint": "缩放 sqrt(C)，再把未来位置填成 -inf。",
  "code": "# compute attention scores (\"affinities\")\nwei = q @ k.transpose(-2,-1) * C**-0.5 # (B, T, C) @ (B, C, T) -> (B, T, T)\nwei = wei.masked_fill(self.tril[:T, :T] == 0, float('-inf')) # (B, T, T)\nwei = F.softmax(wei, dim=-1) # (B, T, T)"
 },
 {
  "id": "llm-14-04",
  "lesson": 14,
  "tier": 5,
  "title": "Head：加权求值",
  "hint": "权重矩阵乘 value，得到每个位置的输出。",
  "code": "wei = self.dropout(wei)\n# perform the weighted aggregation of the values\nv = self.value(x) # (B,T,C)\nout = wei @ v # (B, T, T) @ (B, T, C) -> (B, T, C)\nreturn out"
 },
 {
  "id": "llm-14-05",
  "lesson": 14,
  "tier": 5,
  "title": "MultiHeadAttention：多头并行",
  "hint": "几个 head 各自看不同的子空间，最后拼起来。",
  "code": "def __init__(self, num_heads, head_size):\n    super().__init__()\n    self.heads = nn.ModuleList([Head(head_size) for _ in range(num_heads)])\n    self.proj = nn.Linear(n_embd, n_embd)\n    self.dropout = nn.Dropout(dropout)"
 },
 {
  "id": "llm-14-06",
  "lesson": 14,
  "tier": 5,
  "title": "MultiHead：拼接 + 投影",
  "hint": "拼完再走一次线性层，把多头的意见混成一路。",
  "code": "def forward(self, x):\n    out = torch.cat([h(x) for h in self.heads], dim=-1)\n    out = self.dropout(self.proj(out))\n    return out"
 },
 {
  "id": "llm-14-07",
  "lesson": 14,
  "tier": 5,
  "title": "FeedFoward：扩 4 倍再压回",
  "hint": "先升维再降维，中间夹一个 ReLU。",
  "code": "def __init__(self, n_embd):\n    super().__init__()\n    self.net = nn.Sequential(\n        nn.Linear(n_embd, 4 * n_embd),\n        nn.ReLU(),\n        nn.Linear(4 * n_embd, n_embd),\n        nn.Dropout(dropout),\n    )\ndef forward(self, x):\n    return self.net(x)"
 },
 {
  "id": "llm-14-08",
  "lesson": 14,
  "tier": 5,
  "title": "Block：先通信再计算",
  "hint": "两条残差：注意力负责通信，前馈负责计算。",
  "code": "    def __init__(self, n_embd, n_head):\n        # n_embd: embedding dimension, n_head: the number of heads we'd like\n        super().__init__()\n        head_size = n_embd // n_head\n        self.sa = MultiHeadAttention(n_head, head_size)\n        self.ffwd = FeedFoward(n_embd)\n        self.ln1 = nn.LayerNorm(n_embd)\n        self.ln2 = nn.LayerNorm(n_embd)\n    def forward(self, x):\n        x = x + self.sa(self.ln1(x))\n        x = x + self.ffwd(self.ln2(x))\n        return x\n# super simple bigram model\nclass BigramLanguageModel(nn.Module):\n    def __init__(self):"
 },
 {
  "id": "llm-15-01",
  "lesson": 15,
  "tier": 5,
  "title": "超参数一览",
  "hint": "六十四维、四个头、四层——这些小模型一晚就能训完。",
  "code": "# hyperparameters\nbatch_size = 16 # how many independent sequences will we process in parallel?\nblock_size = 32 # what is the maximum context length for predictions?\nmax_iters = 5000\neval_interval = 100\nlearning_rate = 1e-3\ndevice = 'cuda' if torch.cuda.is_available() else 'cpu'\neval_iters = 200\nn_embd = 64\nn_head = 4\nn_layer = 4\ndropout = 0.0"
 },
 {
  "id": "llm-15-02",
  "lesson": 15,
  "tier": 5,
  "title": "读文本、建词表",
  "hint": "莎士比亚全集，65 个字符就是全部词表。",
  "code": "# here are all the unique characters that occur in this text\nchars = sorted(list(set(text)))\nvocab_size = len(chars)\n# create a mapping from characters to integers\nstoi = { ch:i for i,ch in enumerate(chars) }\nitos = { i:ch for i,ch in enumerate(chars) }\nencode = lambda s: [stoi[c] for c in s] # encoder: take a string, output a list of integers\ndecode = lambda l: ''.join([itos[i] for i in l]) # decoder: take a list of integers, output a string\n# Train and test splits\ndata = torch.tensor(encode(text), dtype=torch.long)\nn = int(0.9*len(data)) # first 90% will be train, rest val\ntrain_data = data[:n]\nval_data = data[n:]"
 },
 {
  "id": "llm-15-03",
  "lesson": 15,
  "tier": 5,
  "title": "get_batch：随机切窗口",
  "hint": "x 和 y 只差一格：y 就是 x 往后错一位。",
  "code": "# data loading\ndef get_batch(split):\n    # generate a small batch of data of inputs x and targets y\n    data = train_data if split == 'train' else val_data\n    ix = torch.randint(len(data) - block_size, (batch_size,))\n    x = torch.stack([data[i:i+block_size] for i in ix])\n    y = torch.stack([data[i+1:i+block_size+1] for i in ix])\n    x, y = x.to(device), y.to(device)\n    return x, y"
 },
 {
  "id": "llm-15-04",
  "lesson": 15,
  "tier": 5,
  "title": "estimate_loss：不建图估损",
  "hint": "评估时关掉梯度，训练 / 验证各跑一遍。",
  "code": "@torch.no_grad()\ndef estimate_loss():\n    out = {}\n    model.eval()\n    for split in ['train', 'val']:\n        losses = torch.zeros(eval_iters)\n        for k in range(eval_iters):\n            X, Y = get_batch(split)\n            logits, loss = model(X, Y)\n            losses[k] = loss.item()\n        out[split] = losses.mean()\n    model.train()\n    return out"
 },
 {
  "id": "llm-15-05",
  "lesson": 15,
  "tier": 5,
  "title": "模型 __init__",
  "hint": "词嵌入表、位置嵌入表、四层 Block、最后一层 lm_head。",
  "code": "# each token directly reads off the logits for the next token from a lookup table\nself.token_embedding_table = nn.Embedding(vocab_size, n_embd)\nself.position_embedding_table = nn.Embedding(block_size, n_embd)\nself.blocks = nn.Sequential(*[Block(n_embd, n_head=n_head) for _ in range(n_layer)])\nself.ln_f = nn.LayerNorm(n_embd) # final layer norm\nself.lm_head = nn.Linear(n_embd, vocab_size)"
 },
 {
  "id": "llm-15-06",
  "lesson": 15,
  "tier": 5,
  "title": "forward：词向量 + 位置向量",
  "hint": "同一个字符在不同位置，要靠位置向量区分开。",
  "code": "def forward(self, idx, targets=None):\n    B, T = idx.shape\n    # idx and targets are both (B,T) tensor of integers\n    tok_emb = self.token_embedding_table(idx) # (B,T,C)\n    pos_emb = self.position_embedding_table(torch.arange(T, device=device)) # (T,C)\n    x = tok_emb + pos_emb # (B,T,C)\n    x = self.blocks(x) # (B,T,C)\n    x = self.ln_f(x) # (B,T,C)"
 },
 {
  "id": "llm-15-07",
  "lesson": 15,
  "tier": 5,
  "title": "forward：收尾 + 交叉熵",
  "hint": "最后过一层 LayerNorm，再投到词表上。",
  "code": "logits = self.lm_head(x) # (B,T,vocab_size)\nif targets is None:\n    loss = None\nelse:\n    B, T, C = logits.shape\n    logits = logits.view(B*T, C)\n    targets = targets.view(B*T)\n    loss = F.cross_entropy(logits, targets)\nreturn logits, loss"
 },
 {
  "id": "llm-15-08",
  "lesson": 15,
  "tier": 5,
  "title": "generate：逐字接龙",
  "hint": "每次只取最后一个位置的输出，接上去再算下一轮。",
  "code": "        # idx is (B, T) array of indices in the current context\n        for _ in range(max_new_tokens):\n            # crop idx to the last block_size tokens\n            idx_cond = idx[:, -block_size:]\n            # get the predictions\n            logits, loss = self(idx_cond)\n            # focus only on the last time step\n            logits = logits[:, -1, :] # becomes (B, C)\n            # apply softmax to get probabilities\n            probs = F.softmax(logits, dim=-1) # (B, C)\n            # sample from the distribution\n            idx_next = torch.multinomial(probs, num_samples=1) # (B, 1)\n            # append sampled index to the running sequence\n            idx = torch.cat((idx, idx_next), dim=1) # (B, T+1)\n        return idx\nmodel = BigramLanguageModel()\nm = model.to(device)\n# print the number of parameters in the model"
 },
 {
  "id": "llm-16-01",
  "lesson": 16,
  "tier": 5,
  "title": "get_stats：数相邻对",
  "hint": "把整段文本看成整数序列，统计每对相邻整数出现了几次。",
  "code": "def get_stats(ids, counts=None):\n    \"\"\"\n    Given a list of integers, return a dictionary of counts of consecutive pairs\n    Example: [1, 2, 3, 1, 2] -> {(1, 2): 2, (2, 3): 1, (3, 1): 1}\n    Optionally allows to update an existing dictionary of counts\n    \"\"\"\n    counts = {} if counts is None else counts\n    for pair in zip(ids, ids[1:]): # iterate consecutive elements\n        counts[pair] = counts.get(pair, 0) + 1\n    return counts"
 },
 {
  "id": "llm-16-02",
  "lesson": 16,
  "tier": 5,
  "title": "merge：把 pair 换成新 id",
  "hint": "从左到右扫一遍，命中就换成新 id 并跳过两位。",
  "code": "def merge(ids, pair, idx):\n    \"\"\"\n    In the list of integers (ids), replace all consecutive occurrences\n    of pair with the new integer token idx\n    Example: ids=[1, 2, 3, 1, 2], pair=(1, 2), idx=4 -> [4, 3, 4]\n    \"\"\"\n    newids = []\n    i = 0\n    while i < len(ids):\n        # if not at the very last position AND the pair matches, replace it\n        if ids[i] == pair[0] and i < len(ids) - 1 and ids[i+1] == pair[1]:\n            newids.append(idx)\n            i += 2\n        else:\n            newids.append(ids[i])\n            i += 1\n    return newids"
 },
 {
  "id": "llm-16-03",
  "lesson": 16,
  "tier": 5,
  "title": "train：迭代合并最高频的 pair",
  "hint": "每轮挑最高频的一对，铸一个新 token，重复到底。",
  "code": "def train(self, text, vocab_size, verbose=False):\n    assert vocab_size >= 256\n    num_merges = vocab_size - 256\n    # input text preprocessing\n    text_bytes = text.encode(\"utf-8\") # raw bytes\n    ids = list(text_bytes) # list of integers in range 0..255\n    # iteratively merge the most common pairs to create new tokens\n    merges = {} # (int, int) -> int\n    vocab = {idx: bytes([idx]) for idx in range(256)} # int -> bytes\n    for i in range(num_merges):\n        # count up the number of times every consecutive pair appears\n        stats = get_stats(ids)\n        # find the pair with the highest count\n        pair = max(stats, key=stats.get)\n        # mint a new token: assign it the next available id\n        idx = 256 + i\n        # replace all occurrences of pair in ids with idx\n        ids = merge(ids, pair, idx)\n        # save the merge\n        merges[pair] = idx"
 },
 {
  "id": "llm-16-04",
  "lesson": 16,
  "tier": 5,
  "title": "train：存下 merges 与 vocab",
  "hint": "merges 决定编码，vocab 只是给人看的。",
  "code": "    # prints\n    if verbose:\n        print(f\"merge {i+1}/{num_merges}: {pair} -> {idx} ({vocab[idx]}) had {stats[pair]} occurrences\")\n# save class variables\nself.merges = merges # used in encode()\nself.vocab = vocab   # used in decode()"
 },
 {
  "id": "llm-16-05",
  "lesson": 16,
  "tier": 5,
  "title": "encode：一路合并到没有为止",
  "hint": "每步都挑 merge 序号最小的那一对，保证和训练一致。",
  "code": "def encode(self, text):\n    # given a string text, return the token ids\n    text_bytes = text.encode(\"utf-8\") # raw bytes\n    ids = list(text_bytes) # list of integers in range 0..255\n    while len(ids) >= 2:\n        # find the pair with the lowest merge index\n        stats = get_stats(ids)\n        pair = min(stats, key=lambda p: self.merges.get(p, float(\"inf\")))\n        # subtle: if there are no more merges available, the key will\n        # result in an inf for every single pair, and the min will be\n        # just the first pair in the list, arbitrarily\n        # we can detect this terminating case by a membership check\n        if pair not in self.merges:\n            break # nothing else can be merged anymore\n        # otherwise let's merge the best pair (lowest merge index)\n        idx = self.merges[pair]\n        ids = merge(ids, pair, idx)"
 },
 {
  "id": "llm-16-06",
  "lesson": 16,
  "tier": 5,
  "title": "decode：把 id 拼回字节",
  "hint": "所有 token 都是字节片段，拼起来再按 UTF-8 解。",
  "code": "def decode(self, ids):\n    # given ids (list of integers), return Python string\n    text_bytes = b\"\".join(self.vocab[idx] for idx in ids)\n    text = text_bytes.decode(\"utf-8\", errors=\"replace\")\n    return text"
 }
];
