/* 自动生成，勿手改 —— 源: data/build_llm.py
   《从零手搓大模型》20 讲 / 148 关，代码切片取自 Zero2hero 官方源码 */
window.LLM_MODULES = ["计算图与梯度", "语言模型基座", "反传与结构", "GPT 与分词", "GPT-2 工程实战"];
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
  "n": 7
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
  "n": 7
 },
 {
  "no": 5,
  "mod": 1,
  "title": "损失函数：为什么是交叉熵",
  "src": "新编",
  "mins": 28,
  "n": 5
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
  "n": 7
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
  "n": 10
 },
 {
  "no": 10,
  "mod": 2,
  "title": "反向传播 Ninja 上：手推全网络",
  "src": "L5 前半 · 1:55",
  "mins": 48,
  "n": 9
 },
 {
  "no": 11,
  "mod": 2,
  "title": "反向传播 Ninja 下：逐层对账",
  "src": "L5 后半",
  "mins": 48,
  "n": 8
 },
 {
  "no": 12,
  "mod": 2,
  "title": "层级结构：WaveNet 与树形依赖",
  "src": "L6 · 0:56",
  "mins": 39,
  "n": 9
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
  "n": 10
 },
 {
  "no": 15,
  "mod": 3,
  "title": "从零写 GPT：残差、缩放与训练",
  "src": "L7 后半",
  "mins": 45,
  "n": 11
 },
 {
  "no": 16,
  "mod": 3,
  "title": "分词器：BPE 到底在切什么",
  "src": "L8 · 2:13",
  "mins": 42,
  "n": 10
 },
 {
  "no": 17,
  "mod": 4,
  "title": "nanoGPT·模型：model.py",
  "src": "nanoGPT 官方仓库",
  "mins": 45,
  "n": 9
 },
 {
  "no": 18,
  "mod": 4,
  "title": "nanoGPT·训练：train.py",
  "src": "nanoGPT 官方仓库",
  "mins": 45,
  "n": 9
 },
 {
  "no": 19,
  "mod": 4,
  "title": "nanoGPT·推理：sample.py",
  "src": "nanoGPT 官方仓库",
  "mins": 30,
  "n": 4
 },
 {
  "no": 20,
  "mod": 4,
  "title": "复现 GPT-2：train_gpt2.py",
  "src": "L9 · build-nanogpt",
  "mins": 50,
  "n": 10
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
  "id": "llm-02-07",
  "lesson": 2,
  "tier": 5,
  "title": "右操作数：__rsub__ / __rmul__ / __rtruediv__",
  "hint": "2 - a 走到的是 other 的 __rsub__，方向反了别写错。",
  "code": "def __rsub__(self, other): # other - self\n    return other + (-self)\ndef __rmul__(self, other): # other * self\n    return self * other\ndef __truediv__(self, other): # self / other\n    return self * other**-1\ndef __rtruediv__(self, other): # other / self\n    return other * self**-1\ndef __repr__(self):\n    return f\"Value(data={self.data}, grad={self.grad})\""
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
  "id": "llm-04-07",
  "lesson": 4,
  "tier": 5,
  "title": "训练集与 W 初始化",
  "hint": "相邻字符对攒成索引列表，27×27 的 W 就是全部参数。",
  "code": "# create the dataset\nxs, ys = [], []\nfor w in words:\n  chs = ['.'] + list(w) + ['.']\n  for ch1, ch2 in zip(chs, chs[1:]):\n    ix1 = stoi[ch1]\n    ix2 = stoi[ch2]\n    xs.append(ix1)\n    ys.append(ix2)\nxs = torch.tensor(xs)\nys = torch.tensor(ys)\nnum = xs.nelement()\nprint('number of examples: ', num)\n# initialize the 'network'\ng = torch.Generator().manual_seed(2147483647)\nW = torch.randn((27, 27), generator=g, requires_grad=True)"
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
  "id": "llm-05-05",
  "lesson": 5,
  "tier": 5,
  "title": "梯度下降主循环",
  "hint": "前向算概率、交叉熵算损失、反向、更新——训练就是这四步转圈。",
  "code": "# gradient descent\nfor k in range(1):\n  # forward pass\n  xenc = F.one_hot(xs, num_classes=27).float() # input to the network: one-hot encoding\n  logits = xenc @ W # predict log-counts\n  counts = logits.exp() # counts, equivalent to N\n  probs = counts / counts.sum(1, keepdims=True) # probabilities for next character\n  loss = -probs[torch.arange(num), ys].log().mean() + 0.01*(W**2).mean()\n  print(loss.item())\n  # backward pass\n  W.grad = None # set to zero the gradient\n  loss.backward()\n  # update\n  W.data += -50 * W.grad"
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
  "id": "llm-07-07",
  "lesson": 7,
  "tier": 5,
  "title": "用训练好的 MLP 起名",
  "hint": "窗口一格一格往右挪，采到句号就收工。",
  "code": "# sample from the model\ng = torch.Generator().manual_seed(2147483647 + 10)\nfor _ in range(20):\n    out = []\n    context = [0] * block_size # initialize with all ...\n    while True:\n      emb = C[torch.tensor([context])] # (1,block_size,d)\n      h = torch.tanh(emb.view(1, -1) @ W1 + b1)\n      logits = h @ W2 + b2\n      probs = F.softmax(logits, dim=1)\n      ix = torch.multinomial(probs, num_samples=1, generator=g).item()\n      context = context[1:] + [ix]\n      out.append(ix)\n      if ix == 0:\n        break\n    print(''.join(itos[i] for i in out))"
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
  "id": "llm-09-07",
  "lesson": 9,
  "tier": 5,
  "title": "BatchNorm1d：__init__",
  "hint": "gamma/beta 是真参数，running 均值方差只是带走的统计量。",
  "code": "class BatchNorm1d:\n  def __init__(self, dim, eps=1e-5, momentum=0.1):\n    self.eps = eps\n    self.momentum = momentum\n    self.training = True\n    # parameters (trained with backprop)\n    self.gamma = torch.ones(dim)\n    self.beta = torch.zeros(dim)\n    # buffers (trained with a running 'momentum update')\n    self.running_mean = torch.zeros(dim)\n    self.running_var = torch.ones(dim)"
 },
 {
  "id": "llm-09-08",
  "lesson": 9,
  "tier": 5,
  "title": "六层堆叠：Linear-BN-Tanh",
  "hint": "同一条三连件重复五次，收尾层只要 Linear + BN。",
  "code": "n_embd = 10 # the dimensionality of the character embedding vectors\nn_hidden = 100 # the number of neurons in the hidden layer of the MLP\ng = torch.Generator().manual_seed(2147483647) # for reproducibility\nC = torch.randn((vocab_size, n_embd),            generator=g)\nlayers = [\n  Linear(n_embd * block_size, n_hidden, bias=False), BatchNorm1d(n_hidden), Tanh(),\n  Linear(           n_hidden, n_hidden, bias=False), BatchNorm1d(n_hidden), Tanh(),\n  Linear(           n_hidden, n_hidden, bias=False), BatchNorm1d(n_hidden), Tanh(),\n  Linear(           n_hidden, n_hidden, bias=False), BatchNorm1d(n_hidden), Tanh(),\n  Linear(           n_hidden, n_hidden, bias=False), BatchNorm1d(n_hidden), Tanh(),\n  Linear(           n_hidden, vocab_size, bias=False), BatchNorm1d(vocab_size),\n]"
 },
 {
  "id": "llm-09-09",
  "lesson": 9,
  "tier": 5,
  "title": "训练循环：minibatch 三步",
  "hint": "抽一批 → 过一遍层 → 反向 → 按 lr 更新。",
  "code": "for i in range(max_steps):\n  # minibatch construct\n  ix = torch.randint(0, Xtr.shape[0], (batch_size,), generator=g)\n  Xb, Yb = Xtr[ix], Ytr[ix] # batch X,Y\n  # forward pass\n  emb = C[Xb] # embed the characters into vectors\n  x = emb.view(emb.shape[0], -1) # concatenate the vectors\n  for layer in layers:\n    x = layer(x)\n  loss = F.cross_entropy(x, Yb) # loss function\n  # backward pass\n  for layer in layers:\n    layer.out.retain_grad() # AFTER_DEBUG: would take out retain_graph\n  for p in parameters:\n    p.grad = None\n  loss.backward()\n  # update\n  lr = 0.1 if i < 150000 else 0.01 # step learning rate decay\n  for p in parameters:\n    p.data += -lr * p.grad"
 },
 {
  "id": "llm-09-10",
  "lesson": 9,
  "tier": 5,
  "title": "采样：BN 网络版",
  "hint": "训练完把层切到 eval，再让窗口滚动生成 20 个名字。",
  "code": "# sample from the model\ng = torch.Generator().manual_seed(2147483647 + 10)\nfor _ in range(20):\n    out = []\n    context = [0] * block_size # initialize with all ...\n    while True:\n      # forward pass the neural net\n      emb = C[torch.tensor([context])] # (1,block_size,n_embd)\n      x = emb.view(emb.shape[0], -1) # concatenate the vectors\n      for layer in layers:\n        x = layer(x)\n      logits = x\n      probs = F.softmax(logits, dim=1)\n      # sample from the distribution\n      ix = torch.multinomial(probs, num_samples=1, generator=g).item()\n      # shift the context window and track the samples\n      context = context[1:] + [ix]\n      out.append(ix)\n      # if we sample the special '.' token, break\n      if ix == 0:\n        break\n    print(''.join(itos[i] for i in out)) # decode and print the generated word"
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
  "id": "llm-10-07",
  "lesson": 10,
  "tier": 5,
  "title": "cmp：手算梯度对账",
  "hint": "自己推的梯度和 autograd 的差多少，一个函数全说清。",
  "code": "# utility function we will use later when comparing manual gradients to PyTorch gradients\ndef cmp(s, dt, t):\n  ex = torch.all(dt == t.grad).item()\n  app = torch.allclose(dt, t.grad)\n  maxdiff = (dt - t.grad).abs().max().item()\n  print(f'{s:15s} | exact: {str(ex):5s} | approximate: {str(app):5s} | maxdiff: {maxdiff}')"
 },
 {
  "id": "llm-10-08",
  "lesson": 10,
  "tier": 5,
  "title": "全部参数一次备齐",
  "hint": "两层 MLP + 一对 BN 参数，requires_grad 逐个开。",
  "code": "n_embd = 10 # the dimensionality of the character embedding vectors\nn_hidden = 64 # the number of neurons in the hidden layer of the MLP\ng = torch.Generator().manual_seed(2147483647) # for reproducibility\nC  = torch.randn((vocab_size, n_embd),            generator=g)\n# Layer 1\nW1 = torch.randn((n_embd * block_size, n_hidden), generator=g) * (5/3)/((n_embd * block_size)**0.5)\nb1 = torch.randn(n_hidden,                        generator=g) * 0.1 # using b1 just for fun, it's useless because of BN\n# Layer 2\nW2 = torch.randn((n_hidden, vocab_size),          generator=g) * 0.1\nb2 = torch.randn(vocab_size,                      generator=g) * 0.1\n# BatchNorm parameters\nbngain = torch.randn((1, n_hidden))*0.1 + 1.0\nbnbias = torch.randn((1, n_hidden))*0.1\n# Note: I am initializating many of these parameters in non-standard ways\n# because sometimes initializating with e.g. all zeros could mask an incorrect\n# implementation of the backward pass.\nparameters = [C, W1, b1, W2, b2, bngain, bnbias]\nprint(sum(p.nelement() for p in parameters)) # number of parameters in total\nfor p in parameters:\n  p.requires_grad = True"
 },
 {
  "id": "llm-10-09",
  "lesson": 10,
  "tier": 5,
  "title": "训练循环：前向逐变量",
  "hint": "每个中间量都起名字存下来，待会反向才好对账。",
  "code": "# kick off optimization\nfor i in range(max_steps):\n  # minibatch construct\n  ix = torch.randint(0, Xtr.shape[0], (batch_size,), generator=g)\n  Xb, Yb = Xtr[ix], Ytr[ix] # batch X,Y\n  # forward pass\n  emb = C[Xb] # embed the characters into vectors\n  embcat = emb.view(emb.shape[0], -1) # concatenate the vectors\n  # Linear layer\n  hprebn = embcat @ W1 + b1 # hidden layer pre-activation\n  # BatchNorm layer\n  # -------------------------------------------------------------\n  bnmean = hprebn.mean(0, keepdim=True)\n  bnvar = hprebn.var(0, keepdim=True, unbiased=True)\n  bnvar_inv = (bnvar + 1e-5)**-0.5\n  bnraw = (hprebn - bnmean) * bnvar_inv\n  hpreact = bngain * bnraw + bnbias\n  # -------------------------------------------------------------\n  # Non-linearity\n  h = torch.tanh(hpreact) # hidden layer\n  logits = h @ W2 + b2 # output layer\n  loss = F.cross_entropy(logits, Yb) # loss function"
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
  "id": "llm-11-07",
  "lesson": 11,
  "tier": 5,
  "title": "手推反向：输出层到 tanh",
  "hint": "dlogits 一步到位，顺着 W2、tanh 一路穿回 BN。",
  "code": "# manual backprop! #swole_doge_meme\n# -----------------\ndlogits = F.softmax(logits, 1)\ndlogits[range(n), Yb] -= 1\ndlogits /= n\n# 2nd layer backprop\ndh = dlogits @ W2.T\ndW2 = h.T @ dlogits\ndb2 = dlogits.sum(0)\n# tanh\ndhpreact = (1.0 - h**2) * dh\n# batchnorm backprop\ndbngain = (bnraw * dhpreact).sum(0, keepdim=True)\ndbnbias = dhpreact.sum(0, keepdim=True)\ndhprebn = bngain*bnvar_inv/n * (n*dhpreact - dhpreact.sum(0) - n/(n-1)*bnraw*(dhpreact*bnraw).sum(0))\n# 1st layer\ndembcat = dhprebn @ W1.T\ndW1 = embcat.T @ dhprebn\ndb1 = dhprebn.sum(0)"
 },
 {
  "id": "llm-11-08",
  "lesson": 11,
  "tier": 5,
  "title": "嵌入散回 + 手动更新",
  "hint": "同一个字符出现多次，梯度必须加回去；不靠 autograd 也能更新。",
  "code": "# embedding\ndemb = dembcat.view(emb.shape)\ndC = torch.zeros_like(C)\nfor k in range(Xb.shape[0]):\n  for j in range(Xb.shape[1]):\n    ix = Xb[k,j]\n    dC[ix] += demb[k,j]\ngrads = [dC, dW1, db1, dW2, db2, dbngain, dbnbias]\n# -----------------\n# update\nlr = 0.1 if i < 100000 else 0.01 # step learning rate decay\nfor p, grad in zip(parameters, grads):\n  #p.data += -lr * p.grad # old way of cheems doge (using PyTorch grad from .backward())\n  p.data += -lr * grad # new way of swole doge TODO: enable\n# track stats\nif i % 10000 == 0: # print every once in a while\n  print(f'{i:7d}/{max_steps:7d}: {loss.item():.4f}')\nlossi.append(loss.log10().item())"
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
  "id": "llm-12-07",
  "lesson": 12,
  "tier": 5,
  "title": "训练循环：工程版",
  "hint": "model(Xb) 一行前向、loss.backward() 一行反向——类都封装好了。",
  "code": "# same optimization as last time\nmax_steps = 200000\nbatch_size = 32\nlossi = []\nfor i in range(max_steps):\n  # minibatch construct\n  ix = torch.randint(0, Xtr.shape[0], (batch_size,))\n  Xb, Yb = Xtr[ix], Ytr[ix] # batch X,Y\n  # forward pass\n  logits = model(Xb)\n  loss = F.cross_entropy(logits, Yb) # loss function\n  # backward pass\n  for p in parameters:\n    p.grad = None\n  loss.backward()\n  # update: simple SGD\n  lr = 0.1 if i < 150000 else 0.01 # step learning rate decay\n  for p in parameters:\n    p.data += -lr * p.grad"
 },
 {
  "id": "llm-12-08",
  "lesson": 12,
  "tier": 5,
  "title": "split_loss：eval 模式评估",
  "hint": "先把所有层切到 eval，再算训练/验证两份损失。",
  "code": "# put layers into eval mode (needed for batchnorm especially)\nfor layer in model.layers:\n  layer.training = False\n# evaluate the loss\n@torch.no_grad() # this decorator disables gradient tracking inside pytorch\ndef split_loss(split):\n  x,y = {\n    'train': (Xtr, Ytr),\n    'val': (Xdev, Ydev),\n    'test': (Xte, Yte),\n  }[split]\n  logits = model(x)\n  loss = F.cross_entropy(logits, y)\n  print(split, loss.item())\nsplit_loss('train')\nsplit_loss('val')"
 },
 {
  "id": "llm-12-09",
  "lesson": 12,
  "tier": 5,
  "title": "采样：WaveNet 版",
  "hint": "滑动窗口喂 8 字符上下文，采到句号停。",
  "code": "# sample from the model\nfor _ in range(20):\n    out = []\n    context = [0] * block_size # initialize with all ...\n    while True:\n      # forward pass the neural net\n      logits = model(torch.tensor([context]))\n      probs = F.softmax(logits, dim=1)\n      # sample from the distribution\n      ix = torch.multinomial(probs, num_samples=1).item()\n      # shift the context window and track the samples\n      context = context[1:] + [ix]\n      out.append(ix)\n      # if we sample the special '.' token, break\n      if ix == 0:\n        break\n    print(''.join(itos[i] for i in out)) # decode and print the generated word"
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
  "id": "llm-14-09",
  "lesson": 14,
  "tier": 5,
  "title": "BigramLanguageModel：定义",
  "hint": "一张 embedding 表直出 logits——最朴素的神经语言模型。",
  "code": "class BigramLanguageModel(nn.Module):\n    def __init__(self, vocab_size):\n        super().__init__()\n        # each token directly reads off the logits for the next token from a lookup table\n        self.token_embedding_table = nn.Embedding(vocab_size, vocab_size)\n    def forward(self, idx, targets=None):\n        # idx and targets are both (B,T) tensor of integers\n        logits = self.token_embedding_table(idx) # (B,T,C)\n        if targets is None:\n            loss = None\n        else:\n            B, T, C = logits.shape\n            logits = logits.view(B*T, C)\n            targets = targets.view(B*T)\n            loss = F.cross_entropy(logits, targets)\n        return logits, loss"
 },
 {
  "id": "llm-14-10",
  "lesson": 14,
  "tier": 5,
  "title": "BigramLM.generate",
  "hint": "每次只看最后一个位置的 logits，接一个、拼回去。",
  "code": "    def generate(self, idx, max_new_tokens):\n        # idx is (B, T) array of indices in the current context\n        for _ in range(max_new_tokens):\n            # get the predictions\n            logits, loss = self(idx)\n            # focus only on the last time step\n            logits = logits[:, -1, :] # becomes (B, C)\n            # apply softmax to get probabilities\n            probs = F.softmax(logits, dim=-1) # (B, C)\n            # sample from the distribution\n            idx_next = torch.multinomial(probs, num_samples=1) # (B, 1)\n            # append sampled index to the running sequence\n            idx = torch.cat((idx, idx_next), dim=1) # (B, T+1)\n        return idx\nm = BigramLanguageModel(vocab_size)\nlogits, loss = m(xb, yb)\nprint(logits.shape)\nprint(loss)\nprint(decode(m.generate(idx = torch.zeros((1, 1), dtype=torch.long), max_new_tokens=100)[0].tolist()))"
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
  "id": "llm-15-09",
  "lesson": 15,
  "tier": 5,
  "title": "LayerNorm1d：自己写一个",
  "hint": "GPT 不用 BN，换 LayerNorm：按行归一，跟 batch 无关。",
  "code": "class LayerNorm1d: # (used to be BatchNorm1d)\n  def __init__(self, dim, eps=1e-5, momentum=0.1):\n    self.eps = eps\n    self.gamma = torch.ones(dim)\n    self.beta = torch.zeros(dim)\n  def __call__(self, x):\n    # calculate the forward pass\n    xmean = x.mean(1, keepdim=True) # batch mean\n    xvar = x.var(1, keepdim=True) # batch variance\n    xhat = (x - xmean) / torch.sqrt(xvar + self.eps) # normalize to unit variance\n    self.out = self.gamma * xhat + self.beta\n    return self.out\n  def parameters(self):\n    return [self.gamma, self.beta]\ntorch.manual_seed(1337)\nmodule = LayerNorm1d(100)\nx = torch.randn(32, 100) # batch size 32 of 100-dimensional vectors\nx = module(x)\nx.shape"
 },
 {
  "id": "llm-15-10",
  "lesson": 15,
  "tier": 5,
  "title": "参数统计与 AdamW",
  "hint": "模型搬上 GPU 数参数量，优化器就一行 AdamW。",
  "code": "model = BigramLanguageModel()\nm = model.to(device)\n# print the number of parameters in the model\nprint(sum(p.numel() for p in m.parameters())/1e6, 'M parameters')\n# create a PyTorch optimizer\noptimizer = torch.optim.AdamW(model.parameters(), lr=learning_rate)"
 },
 {
  "id": "llm-15-11",
  "lesson": 15,
  "tier": 5,
  "title": "训练循环与最终生成",
  "hint": "定期估损、前向反向更新，最后 generate 出 2000 字符。",
  "code": "for iter in range(max_iters):\n    # every once in a while evaluate the loss on train and val sets\n    if iter % eval_interval == 0 or iter == max_iters - 1:\n        losses = estimate_loss()\n        print(f\"step {iter}: train loss {losses['train']:.4f}, val loss {losses['val']:.4f}\")\n    # sample a batch of data\n    xb, yb = get_batch('train')\n    # evaluate the loss\n    logits, loss = model(xb, yb)\n    optimizer.zero_grad(set_to_none=True)\n    loss.backward()\n    optimizer.step()\n# generate from the model\ncontext = torch.zeros((1, 1), dtype=torch.long, device=device)\nprint(decode(m.generate(context, max_new_tokens=2000)[0].tolist()))"
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
 },
 {
  "id": "llm-16-07",
  "lesson": 16,
  "tier": 5,
  "title": "split pattern：正则先切块",
  "hint": "GPT-4 分词先靠一条长正则按类别切小块，再逐块 BPE。",
  "code": "# the main GPT text split patterns, see\n# https://github.com/openai/tiktoken/blob/main/tiktoken_ext/openai_public.py\nGPT2_SPLIT_PATTERN = r\"\"\"'(?:[sdmt]|ll|ve|re)| ?\\p{L}+| ?\\p{N}+| ?[^\\s\\p{L}\\p{N}]+|\\s+(?!\\S)|\\s+\"\"\"\nGPT4_SPLIT_PATTERN = r\"\"\"'(?i:[sdmt]|ll|ve|re)|[^\\r\\n\\p{L}\\p{N}]?+\\p{L}+|\\p{N}{1,3}| ?[^\\s\\p{L}\\p{N}]++[\\r\\n]*|\\s*[\\r\\n]|\\s+(?!\\S)|\\s+\"\"\"\nclass RegexTokenizer(Tokenizer):\n    def __init__(self, pattern=None):\n        \"\"\"\n        - pattern: optional string to override the default (GPT-4 split pattern)\n        - special_tokens: str -> int dictionary of special tokens\n          example: {'<|endoftext|>': 100257}\n        \"\"\"\n        super().__init__()\n        self.pattern = GPT4_SPLIT_PATTERN if pattern is None else pattern\n        self.compiled_pattern = re.compile(self.pattern)\n        self.special_tokens = {}\n        self.inverse_special_tokens = {}"
 },
 {
  "id": "llm-16-08",
  "lesson": 16,
  "tier": 5,
  "title": "encode_ordinary：逐块编码",
  "hint": "每块转 utf-8 字节单独跑 BPE，最后拼回一条 id 流。",
  "code": "def encode_ordinary(self, text):\n    \"\"\"Encoding that ignores any special tokens.\"\"\"\n    # split text into chunks of text by categories defined in regex pattern\n    text_chunks = re.findall(self.compiled_pattern, text)\n    # all chunks of text are encoded separately, then results are joined\n    ids = []\n    for chunk in text_chunks:\n        chunk_bytes = chunk.encode(\"utf-8\") # raw bytes\n        chunk_ids = self._encode_chunk(chunk_bytes)\n        ids.extend(chunk_ids)\n    return ids"
 },
 {
  "id": "llm-16-09",
  "lesson": 16,
  "tier": 5,
  "title": "bpe：单 token 拆回 pair",
  "hint": "按 rank 从小到大合并，直到没有更小的 pair 可用。",
  "code": "def bpe(mergeable_ranks, token, max_rank):\n    # helper function used in get_gpt4_merges() to reconstruct the merge forest\n    parts = [bytes([b]) for b in token]\n    while True:\n        min_idx = None\n        min_rank = None\n        for i, pair in enumerate(zip(parts[:-1], parts[1:])):\n            rank = mergeable_ranks.get(pair[0] + pair[1])\n            if rank is not None and (min_rank is None or rank < min_rank):\n                min_idx = i\n                min_rank = rank\n        if min_rank is None or (max_rank is not None and min_rank >= max_rank):\n            break\n        assert min_idx is not None\n        parts = parts[:min_idx] + [parts[min_idx] + parts[min_idx + 1]] + parts[min_idx + 2:]\n    return parts"
 },
 {
  "id": "llm-16-10",
  "lesson": 16,
  "tier": 5,
  "title": "recover_merges：还原官方合并表",
  "hint": "tiktoken 只给最终词表，把每个 token 跑一遍小 BPE 找回拆法。",
  "code": "def recover_merges(mergeable_ranks):\n    # the `merges` are already the byte sequences in their merged state.\n    # so we have to recover the original pairings. We can do this by doing\n    # a small BPE training run on all the tokens, in their order.\n    # also see https://github.com/openai/tiktoken/issues/60\n    # also see https://github.com/karpathy/minbpe/issues/11#issuecomment-1950805306\n    merges = {}\n    for token, rank in mergeable_ranks.items():\n        if len(token) == 1:\n            continue # skip raw bytes\n        pair = tuple(bpe(mergeable_ranks, token, max_rank=rank))\n        assert len(pair) == 2\n        # recover the integer ranks of the pair\n        ix0 = mergeable_ranks[pair[0]]\n        ix1 = mergeable_ranks[pair[1]]\n        merges[(ix0, ix1)] = rank\n    return merges"
 },
 {
  "id": "llm-17-01",
  "lesson": 17,
  "tier": 5,
  "title": "LayerNorm：手写可选 bias 版",
  "hint": "原生 LayerNorm 关不掉 bias，nanoGPT 只好自己写一个。",
  "code": "class LayerNorm(nn.Module):\n    \"\"\" LayerNorm but with an optional bias. PyTorch doesn't support simply bias=False \"\"\"\n    def __init__(self, ndim, bias):\n        super().__init__()\n        self.weight = nn.Parameter(torch.ones(ndim))\n        self.bias = nn.Parameter(torch.zeros(ndim)) if bias else None\n    def forward(self, input):\n        return F.layer_norm(input, self.weight.shape, self.weight, self.bias, 1e-5)"
 },
 {
  "id": "llm-17-02",
  "lesson": 17,
  "tier": 5,
  "title": "注意力：c_attn 一次出 qkv",
  "hint": "一个 Linear 出 3×n_embd，比三个 Linear 少两趟 kernel。",
  "code": "def __init__(self, config):\n    super().__init__()\n    assert config.n_embd % config.n_head == 0\n    # key, query, value projections for all heads, but in a batch\n    self.c_attn = nn.Linear(config.n_embd, 3 * config.n_embd, bias=config.bias)\n    # output projection\n    self.c_proj = nn.Linear(config.n_embd, config.n_embd, bias=config.bias)\n    # regularization\n    self.attn_dropout = nn.Dropout(config.dropout)\n    self.resid_dropout = nn.Dropout(config.dropout)\n    self.n_head = config.n_head\n    self.n_embd = config.n_embd\n    self.dropout = config.dropout\n    # flash attention make GPU go brrrrr but support is only in PyTorch >= 2.0\n    self.flash = hasattr(torch.nn.functional, 'scaled_dot_product_attention')\n    if not self.flash:\n        print(\"WARNING: using slow attention. Flash Attention requires PyTorch >= 2.0\")\n        # causal mask to ensure that attention is only applied to the left in the input sequence\n        self.register_buffer(\"bias\", torch.tril(torch.ones(config.block_size, config.block_size))\n                                    .view(1, 1, config.block_size, config.block_size))"
 },
 {
  "id": "llm-17-03",
  "lesson": 17,
  "tier": 5,
  "title": "注意力前向：分头 + flash 双路径",
  "hint": "有 flash 就走 fused kernel，没有就退回手动 mask。",
  "code": "def forward(self, x):\n    B, T, C = x.size() # batch size, sequence length, embedding dimensionality (n_embd)\n    # calculate query, key, values for all heads in batch and move head forward to be the batch dim\n    q, k, v  = self.c_attn(x).split(self.n_embd, dim=2)\n    k = k.view(B, T, self.n_head, C // self.n_head).transpose(1, 2) # (B, nh, T, hs)\n    q = q.view(B, T, self.n_head, C // self.n_head).transpose(1, 2) # (B, nh, T, hs)\n    v = v.view(B, T, self.n_head, C // self.n_head).transpose(1, 2) # (B, nh, T, hs)\n    # causal self-attention; Self-attend: (B, nh, T, hs) x (B, nh, hs, T) -> (B, nh, T, T)\n    if self.flash:\n        # efficient attention using Flash Attention CUDA kernels\n        y = torch.nn.functional.scaled_dot_product_attention(q, k, v, attn_mask=None, dropout_p=self.dropout if self.training else 0, is_causal=True)\n    else:\n        # manual implementation of attention\n        att = (q @ k.transpose(-2, -1)) * (1.0 / math.sqrt(k.size(-1)))\n        att = att.masked_fill(self.bias[:,:,:T,:T] == 0, float('-inf'))\n        att = F.softmax(att, dim=-1)\n        att = self.attn_dropout(att)\n        y = att @ v # (B, nh, T, T) x (B, nh, T, hs) -> (B, nh, T, hs)\n    y = y.transpose(1, 2).contiguous().view(B, T, C) # re-assemble all head outputs side by side\n    # output projection\n    y = self.resid_dropout(self.c_proj(y))\n    return y"
 },
 {
  "id": "llm-17-04",
  "lesson": 17,
  "tier": 5,
  "title": "MLP 与 Block：Pre-LN 残差",
  "hint": "先归一再 attn/mlp，残差主干保持干净，深网才训得动。",
  "code": "class MLP(nn.Module):\n    def __init__(self, config):\n        super().__init__()\n        self.c_fc    = nn.Linear(config.n_embd, 4 * config.n_embd, bias=config.bias)\n        self.gelu    = nn.GELU()\n        self.c_proj  = nn.Linear(4 * config.n_embd, config.n_embd, bias=config.bias)\n        self.dropout = nn.Dropout(config.dropout)\n    def forward(self, x):\n        x = self.c_fc(x)\n        x = self.gelu(x)\n        x = self.c_proj(x)\n        x = self.dropout(x)\n        return x\nclass Block(nn.Module):\n    def __init__(self, config):\n        super().__init__()\n        self.ln_1 = LayerNorm(config.n_embd, bias=config.bias)\n        self.attn = CausalSelfAttention(config)\n        self.ln_2 = LayerNorm(config.n_embd, bias=config.bias)\n        self.mlp = MLP(config)\n    def forward(self, x):\n        x = x + self.attn(self.ln_1(x))\n        x = x + self.mlp(self.ln_2(x))\n        return x"
 },
 {
  "id": "llm-17-05",
  "lesson": 17,
  "tier": 5,
  "title": "GPTConfig + 模型骨架",
  "hint": "dataclass 装超参，ModuleDict 把 wte/wpe/h/ln_f 挂成模块树。",
  "code": "@dataclass\nclass GPTConfig:\n    block_size: int = 1024\n    vocab_size: int = 50304 # GPT-2 vocab_size of 50257, padded up to nearest multiple of 64 for efficiency\n    n_layer: int = 12\n    n_head: int = 12\n    n_embd: int = 768\n    dropout: float = 0.0\n    bias: bool = True # True: bias in Linears and LayerNorms, like GPT-2. False: a bit better and faster\nclass GPT(nn.Module):\n    def __init__(self, config):\n        super().__init__()\n        assert config.vocab_size is not None\n        assert config.block_size is not None\n        self.config = config\n        self.transformer = nn.ModuleDict(dict(\n            wte = nn.Embedding(config.vocab_size, config.n_embd),\n            wpe = nn.Embedding(config.block_size, config.n_embd),\n            drop = nn.Dropout(config.dropout),\n            h = nn.ModuleList([Block(config) for _ in range(config.n_layer)]),\n            ln_f = LayerNorm(config.n_embd, bias=config.bias),\n        ))\n        self.lm_head = nn.Linear(config.n_embd, config.vocab_size, bias=False)"
 },
 {
  "id": "llm-17-06",
  "lesson": 17,
  "tier": 5,
  "title": "初始化：tying + 残差缩放",
  "hint": "wte 与 lm_head 共享权重；c_proj 按 1/√(2n) 缩小稳住残差流。",
  "code": "# \"UserWarning: functional_call was passed multiple values for tied weights.\n# This behavior is deprecated and will be an error in future versions\"\n# not 100% sure what this is, so far seems to be harmless. TODO investigate\nself.transformer.wte.weight = self.lm_head.weight # https://paperswithcode.com/method/weight-tying\n# init all weights\nself.apply(self._init_weights)\n# apply special scaled init to the residual projections, per GPT-2 paper\nfor pn, p in self.named_parameters():\n    if pn.endswith('c_proj.weight'):\n        torch.nn.init.normal_(p, mean=0.0, std=0.02/math.sqrt(2 * config.n_layer))\n# report number of parameters\nprint(\"number of parameters: %.2fM\" % (self.get_num_params()/1e6,))"
 },
 {
  "id": "llm-17-07",
  "lesson": 17,
  "tier": 5,
  "title": "GPT.forward",
  "hint": "token + 位置两个 embedding 相加，过 n_layer 个 Block，ln_f 后进 lm_head。",
  "code": "def forward(self, idx, targets=None):\n    device = idx.device\n    b, t = idx.size()\n    assert t <= self.config.block_size, f\"Cannot forward sequence of length {t}, block size is only {self.config.block_size}\"\n    pos = torch.arange(0, t, dtype=torch.long, device=device) # shape (t)\n    # forward the GPT model itself\n    tok_emb = self.transformer.wte(idx) # token embeddings of shape (b, t, n_embd)\n    pos_emb = self.transformer.wpe(pos) # position embeddings of shape (t, n_embd)\n    x = self.transformer.drop(tok_emb + pos_emb)\n    for block in self.transformer.h:\n        x = block(x)\n    x = self.transformer.ln_f(x)\n    if targets is not None:\n        # if we are given some desired targets also calculate the loss\n        logits = self.lm_head(x)\n        loss = F.cross_entropy(logits.view(-1, logits.size(-1)), targets.view(-1), ignore_index=-1)\n    else:\n        # inference-time mini-optimization: only forward the lm_head on the very last position\n        logits = self.lm_head(x[:, [-1], :]) # note: using list [-1] to preserve the time dim\n        loss = None\n    return logits, loss"
 },
 {
  "id": "llm-17-08",
  "lesson": 17,
  "tier": 5,
  "title": "from_pretrained：搬 HF 权重",
  "hint": "四档 GPT-2 规格写死，从 transformers 拉权重灌进自家模型。",
  "code": "def from_pretrained(cls, model_type, override_args=None):\n    assert model_type in {'gpt2', 'gpt2-medium', 'gpt2-large', 'gpt2-xl'}\n    override_args = override_args or {} # default to empty dict\n    # only dropout can be overridden see more notes below\n    assert all(k == 'dropout' for k in override_args)\n    from transformers import GPT2LMHeadModel\n    print(\"loading weights from pretrained gpt: %s\" % model_type)\n    # n_layer, n_head and n_embd are determined from model_type\n    config_args = {\n        'gpt2':         dict(n_layer=12, n_head=12, n_embd=768),  # 124M params\n        'gpt2-medium':  dict(n_layer=24, n_head=16, n_embd=1024), # 350M params\n        'gpt2-large':   dict(n_layer=36, n_head=20, n_embd=1280), # 774M params\n        'gpt2-xl':      dict(n_layer=48, n_head=25, n_embd=1600), # 1558M params\n    }[model_type]\n    print(\"forcing vocab_size=50257, block_size=1024, bias=True\")\n    config_args['vocab_size'] = 50257 # always 50257 for GPT model checkpoints\n    config_args['block_size'] = 1024 # always 1024 for GPT model checkpoints\n    config_args['bias'] = True # always True for GPT model checkpoints\n    # we can override the dropout rate, if desired\n    if 'dropout' in override_args:\n        print(f\"overriding dropout rate to {override_args['dropout']}\")\n        config_args['dropout'] = override_args['dropout']"
 },
 {
  "id": "llm-17-09",
  "lesson": 17,
  "tier": 5,
  "title": "generate：温度 + top-k",
  "hint": "temperature 调随机性，top_k 只留头部候选，比裸采样稳。",
  "code": "def generate(self, idx, max_new_tokens, temperature=1.0, top_k=None):\n    \"\"\"\n    Take a conditioning sequence of indices idx (LongTensor of shape (b,t)) and complete\n    the sequence max_new_tokens times, feeding the predictions back into the model each time.\n    Most likely you'll want to make sure to be in model.eval() mode of operation for this.\n    \"\"\"\n    for _ in range(max_new_tokens):\n        # if the sequence context is growing too long we must crop it at block_size\n        idx_cond = idx if idx.size(1) <= self.config.block_size else idx[:, -self.config.block_size:]\n        # forward the model to get the logits for the index in the sequence\n        logits, _ = self(idx_cond)\n        # pluck the logits at the final step and scale by desired temperature\n        logits = logits[:, -1, :] / temperature\n        # optionally crop the logits to only the top k options\n        if top_k is not None:\n            v, _ = torch.topk(logits, min(top_k, logits.size(-1)))\n            logits[logits < v[:, [-1]]] = -float('Inf')\n        # apply softmax to convert logits to (normalized) probabilities\n        probs = F.softmax(logits, dim=-1)\n        # sample from the distribution\n        idx_next = torch.multinomial(probs, num_samples=1)\n        # append sampled index to the running sequence and continue\n        idx = torch.cat((idx, idx_next), dim=1)\n    return idx"
 },
 {
  "id": "llm-18-01",
  "lesson": 18,
  "tier": 5,
  "title": "超参总表",
  "hint": "训练脚本本身就是配置：参数全裸写，再由 configurator 命令行覆盖。",
  "code": "out_dir = 'out'\neval_interval = 2000\nlog_interval = 1\neval_iters = 200\neval_only = False # if True, script exits right after the first eval\nalways_save_checkpoint = True # if True, always save a checkpoint after each eval\ninit_from = 'scratch' # 'scratch' or 'resume' or 'gpt2*'\n# wandb logging\nwandb_log = False # disabled by default\nwandb_project = 'owt'\nwandb_run_name = 'gpt2' # 'run' + str(time.time())\n# data\ndataset = 'openwebtext'\ngradient_accumulation_steps = 5 * 8 # used to simulate larger batch sizes\nbatch_size = 12 # if gradient_accumulation_steps > 1, this is the micro-batch size\nblock_size = 1024\n# model\nn_layer = 12\nn_head = 12\nn_embd = 768\ndropout = 0.0 # for pretraining 0 is good, for finetuning try 0.1+\nbias = False # do we use bias inside LayerNorm and Linear layers?"
 },
 {
  "id": "llm-18-02",
  "lesson": 18,
  "tier": 5,
  "title": "get_batch：memmap 按需读",
  "hint": "train.bin 是几十亿 token 的 uint16 文件，mmap 切片 + pin_memory 上卡。",
  "code": "def get_batch(split):\n    # We recreate np.memmap every batch to avoid a memory leak, as per\n    # https://stackoverflow.com/questions/45132940/numpy-memmap-memory-usage-want-to-iterate-once/61472122#61472122\n    if split == 'train':\n        data = np.memmap(os.path.join(data_dir, 'train.bin'), dtype=np.uint16, mode='r')\n    else:\n        data = np.memmap(os.path.join(data_dir, 'val.bin'), dtype=np.uint16, mode='r')\n    ix = torch.randint(len(data) - block_size, (batch_size,))\n    x = torch.stack([torch.from_numpy((data[i:i+block_size]).astype(np.int64)) for i in ix])\n    y = torch.stack([torch.from_numpy((data[i+1:i+1+block_size]).astype(np.int64)) for i in ix])\n    if device_type == 'cuda':\n        # pin arrays x,y, which allows us to move them to GPU asynchronously (non_blocking=True)\n        x, y = x.pin_memory().to(device, non_blocking=True), y.pin_memory().to(device, non_blocking=True)\n    else:\n        x, y = x.to(device), y.to(device)\n    return x, y\n# init these up here, can override if init_from='resume' (i.e. from a checkpoint)"
 },
 {
  "id": "llm-18-03",
  "lesson": 18,
  "tier": 5,
  "title": "模型初始化：scratch",
  "hint": "从零开训：vocab_size 取 meta 或默认 50304（50257 向上取到 64 倍数）。",
  "code": "                  bias=bias, vocab_size=None, dropout=dropout) # start with model_args from command line\nif init_from == 'scratch':\n    # init a new model from scratch\n    print(\"Initializing a new model from scratch\")\n    # determine the vocab size we'll use for from-scratch training\n    if meta_vocab_size is None:\n        print(\"defaulting to vocab_size of GPT-2 to 50304 (50257 rounded up for efficiency)\")\n    model_args['vocab_size'] = meta_vocab_size if meta_vocab_size is not None else 50304\n    gptconf = GPTConfig(**model_args)\n    model = GPT(gptconf)"
 },
 {
  "id": "llm-18-04",
  "lesson": 18,
  "tier": 5,
  "title": "模型初始化：resume / gpt2",
  "hint": "续训读 ckpt 强校验六个结构参数；或直接拉 GPT-2 权重热启动。",
  "code": "elif init_from == 'resume':\n    print(f\"Resuming training from {out_dir}\")\n    # resume training from a checkpoint.\n    ckpt_path = os.path.join(out_dir, 'ckpt.pt')\n    checkpoint = torch.load(ckpt_path, map_location=device)\n    checkpoint_model_args = checkpoint['model_args']\n    # force these config attributes to be equal otherwise we can't even resume training\n    # the rest of the attributes (e.g. dropout) can stay as desired from command line\n    for k in ['n_layer', 'n_head', 'n_embd', 'block_size', 'bias', 'vocab_size']:\n        model_args[k] = checkpoint_model_args[k]\n    # create the model\n    gptconf = GPTConfig(**model_args)\n    model = GPT(gptconf)\n    state_dict = checkpoint['model']\n    # fix the keys of the state dictionary :(\n    # honestly no idea how checkpoints sometimes get this prefix, have to debug more\n    unwanted_prefix = '_orig_mod.'\n    for k,v in list(state_dict.items()):\n        if k.startswith(unwanted_prefix):\n            state_dict[k[len(unwanted_prefix):]] = state_dict.pop(k)\n    model.load_state_dict(state_dict)\n    iter_num = checkpoint['iter_num']\n    best_val_loss = checkpoint['best_val_loss']\nelif init_from.startswith('gpt2'):"
 },
 {
  "id": "llm-18-05",
  "lesson": 18,
  "tier": 5,
  "title": "estimate_loss：eval 模式估损",
  "hint": "no_grad 下对 train/val 各跑 eval_iters 次取均值，比单点稳。",
  "code": "# helps estimate an arbitrarily accurate loss over either split using many batches\n@torch.no_grad()\ndef estimate_loss():\n    out = {}\n    model.eval()\n    for split in ['train', 'val']:\n        losses = torch.zeros(eval_iters)\n        for k in range(eval_iters):\n            X, Y = get_batch(split)\n            with ctx:\n                logits, loss = model(X, Y)\n            losses[k] = loss.item()\n        out[split] = losses.mean()"
 },
 {
  "id": "llm-18-06",
  "lesson": 18,
  "tier": 5,
  "title": "get_lr：warmup + cosine",
  "hint": "前 warmup_iters 步线性升到峰值，之后余弦退到 min_lr。",
  "code": "    model.train()\n    return out\n# learning rate decay scheduler (cosine with warmup)\ndef get_lr(it):\n    # 1) linear warmup for warmup_iters steps\n    if it < warmup_iters:\n        return learning_rate * (it + 1) / (warmup_iters + 1)\n    # 2) if it > lr_decay_iters, return min learning rate\n    if it > lr_decay_iters:\n        return min_lr\n    # 3) in between, use cosine decay down to min learning rate"
 },
 {
  "id": "llm-18-07",
  "lesson": 18,
  "tier": 5,
  "title": "主循环：估损 + 存 ckpt",
  "hint": "每 eval_interval 评一次；验证集更好就把 checkpoint 存进 out_dir。",
  "code": "# evaluate the loss on train/val sets and write checkpoints\nif iter_num % eval_interval == 0 and master_process:\n    losses = estimate_loss()\n    print(f\"step {iter_num}: train loss {losses['train']:.4f}, val loss {losses['val']:.4f}\")\n    if wandb_log:\n        wandb.log({\n            \"iter\": iter_num,\n            \"train/loss\": losses['train'],\n            \"val/loss\": losses['val'],\n            \"lr\": lr,\n            \"mfu\": running_mfu*100, # convert to percentage\n        })\n    if losses['val'] < best_val_loss or always_save_checkpoint:\n        best_val_loss = losses['val']\n        if iter_num > 0:\n            checkpoint = {\n                'model': raw_model.state_dict(),\n                'optimizer': optimizer.state_dict(),\n                'model_args': model_args,\n                'iter_num': iter_num,\n                'best_val_loss': best_val_loss,\n                'config': config,"
 },
 {
  "id": "llm-18-08",
  "lesson": 18,
  "tier": 5,
  "title": "梯度累积 + clip + step",
  "hint": "micro_step 循环摊大 batch；DDP 只在最后一个 micro 步同步梯度。",
  "code": "if iter_num == 0 and eval_only:\n    break\n# forward backward update, with optional gradient accumulation to simulate larger batch size\n# and using the GradScaler if data type is float16\nfor micro_step in range(gradient_accumulation_steps):\n    if ddp:\n        # in DDP training we only need to sync gradients at the last micro step.\n        # the official way to do this is with model.no_sync() context manager, but\n        # I really dislike that this bloats the code and forces us to repeat code\n        # looking at the source of that context manager, it just toggles this variable\n        model.require_backward_grad_sync = (micro_step == gradient_accumulation_steps - 1)\n    with ctx:\n        logits, loss = model(X, Y)\n        loss = loss / gradient_accumulation_steps # scale the loss to account for gradient accumulation\n    # immediately async prefetch next batch while model is doing the forward pass on the GPU\n    X, Y = get_batch('train')\n    # backward pass, with gradient scaling if training in fp16\n    scaler.scale(loss).backward()\n# clip the gradient\nif grad_clip != 0.0:"
 },
 {
  "id": "llm-18-09",
  "lesson": 18,
  "tier": 5,
  "title": "计时、MFU 与退出",
  "hint": "每步记耗时和 MFU，iter 超 max_iters 退出。",
  "code": "    scaler.unscale_(optimizer)\n    torch.nn.utils.clip_grad_norm_(model.parameters(), grad_clip)\n# step the optimizer and scaler if training in fp16\nscaler.step(optimizer)\nscaler.update()\n# flush the gradients as soon as we can, no need for this memory anymore\noptimizer.zero_grad(set_to_none=True)\n# timing and logging\nt1 = time.time()\ndt = t1 - t0\nt0 = t1\nif iter_num % log_interval == 0 and master_process:\n    # get loss as float. note: this is a CPU-GPU sync point\n    # scale up to undo the division above, approximating the true total loss (exact would have been a sum)\n    lossf = loss.item() * gradient_accumulation_steps\n    if local_iter_num >= 5: # let the training loop settle a bit\n        mfu = raw_model.estimate_mfu(batch_size * gradient_accumulation_steps, dt)\n        running_mfu = mfu if running_mfu == -1.0 else 0.9*running_mfu + 0.1*mfu\n    print(f\"iter {iter_num}: loss {lossf:.4f}, time {dt*1000:.2f}ms, mfu {running_mfu*100:.2f}%\")"
 },
 {
  "id": "llm-19-01",
  "lesson": 19,
  "tier": 5,
  "title": "推理配置",
  "hint": "sample.py 同样是裸配置：temperature、top_k、num_samples 控制生成。",
  "code": "init_from = 'resume' # either 'resume' (from an out_dir) or a gpt2 variant (e.g. 'gpt2-xl')\nout_dir = 'out' # ignored if init_from is not 'resume'\nstart = \"\\n\" # or \"<|endoftext|>\" or etc. Can also specify a file, use as: \"FILE:prompt.txt\"\nnum_samples = 10 # number of samples to draw\nmax_new_tokens = 500 # number of tokens generated in each sample\ntemperature = 0.8 # 1.0 = no change, < 1.0 = less random, > 1.0 = more random, in predictions\ntop_k = 200 # retain only the top_k most likely tokens, clamp others to have 0 probability\nseed = 1337\ndevice = 'cuda' # examples: 'cpu', 'cuda', 'cuda:0', 'cuda:1', etc.\ndtype = 'bfloat16' if torch.cuda.is_available() and torch.cuda.is_bf16_supported() else 'float16' # 'float32' or 'bfloat16' or 'float16'\ncompile = False # use PyTorch 2.0 to compile the model to be faster"
 },
 {
  "id": "llm-19-02",
  "lesson": 19,
  "tier": 5,
  "title": "加载 checkpoint 建模型",
  "hint": "读 ckpt.pt，照存的 model_args 重建 GPT，state_dict 剥掉 _orig_mod 前缀。",
  "code": "if init_from == 'resume':\n    # init from a model saved in a specific directory\n    ckpt_path = os.path.join(out_dir, 'ckpt.pt')\n    checkpoint = torch.load(ckpt_path, map_location=device)\n    gptconf = GPTConfig(**checkpoint['model_args'])\n    model = GPT(gptconf)\n    state_dict = checkpoint['model']\n    unwanted_prefix = '_orig_mod.'\n    for k,v in list(state_dict.items()):\n        if k.startswith(unwanted_prefix):\n            state_dict[k[len(unwanted_prefix):]] = state_dict.pop(k)\n    model.load_state_dict(state_dict)\nelif init_from.startswith('gpt2'):\n    # init from a given GPT-2 model\n    model = GPT.from_pretrained(init_from, dict(dropout=0.0))\nmodel.eval()\nmodel.to(device)\nif compile:\n    model = torch.compile(model) # requires PyTorch 2.0 (optional)"
 },
 {
  "id": "llm-19-03",
  "lesson": 19,
  "tier": 5,
  "title": "encode/decode 两条路",
  "hint": "有 meta.pkl 用训练时的词表，没有就退回 tiktoken 的 gpt2 编码。",
  "code": "load_meta = False\nif init_from == 'resume' and 'config' in checkpoint and 'dataset' in checkpoint['config']: # older checkpoints might not have these...\n    meta_path = os.path.join('data', checkpoint['config']['dataset'], 'meta.pkl')\n    load_meta = os.path.exists(meta_path)\nif load_meta:\n    print(f\"Loading meta from {meta_path}...\")\n    with open(meta_path, 'rb') as f:\n        meta = pickle.load(f)\n    # TODO want to make this more general to arbitrary encoder/decoder schemes\n    stoi, itos = meta['stoi'], meta['itos']\n    encode = lambda s: [stoi[c] for c in s]\n    decode = lambda l: ''.join([itos[i] for i in l])\nelse:\n    # ok let's assume gpt-2 encodings by default\n    print(\"No meta.pkl found, assuming GPT-2 encodings...\")\n    enc = tiktoken.get_encoding(\"gpt2\")"
 },
 {
  "id": "llm-19-04",
  "lesson": 19,
  "tier": 5,
  "title": "Prompt → 循环生成",
  "hint": "start 编成 ids，no_grad 里连 generate num_samples 次。",
  "code": "    decode = lambda l: enc.decode(l)\n# encode the beginning of the prompt\nif start.startswith('FILE:'):\n    with open(start[5:], 'r', encoding='utf-8') as f:\n        start = f.read()\nstart_ids = encode(start)\nx = (torch.tensor(start_ids, dtype=torch.long, device=device)[None, ...])\n# run generation\nwith torch.no_grad():\n    with ctx:\n        for k in range(num_samples):\n            y = model.generate(x, max_new_tokens, temperature=temperature, top_k=top_k)\n            print(decode(y[0].tolist()))\n            print('---------------')"
 },
 {
  "id": "llm-20-01",
  "lesson": 20,
  "tier": 5,
  "title": "注意力：qkv 一把梭 + flash",
  "hint": "c_attn 一次切三份，直接调 fused scaled_dot_product_attention。",
  "code": "def forward(self, x):\n    B, T, C = x.size() # batch size, sequence length, embedding dimensionality (n_embd)\n    # calculate query, key, values for all heads in batch and move head forward to be the batch dim\n    # nh is \"number of heads\", hs is \"head size\", and C (number of channels) = nh * hs\n    # e.g. in GPT-2 (124M), n_head=12, hs=64, so nh*hs=C=768 channels in the Transformer\n    qkv = self.c_attn(x)\n    q, k, v = qkv.split(self.n_embd, dim=2)\n    k = k.view(B, T, self.n_head, C // self.n_head).transpose(1, 2) # (B, nh, T, hs)\n    q = q.view(B, T, self.n_head, C // self.n_head).transpose(1, 2) # (B, nh, T, hs)\n    v = v.view(B, T, self.n_head, C // self.n_head).transpose(1, 2) # (B, nh, T, hs)\n    y = F.scaled_dot_product_attention(q, k, v, is_causal=True) # flash attention\n    y = y.transpose(1, 2).contiguous().view(B, T, C) # re-assemble all head outputs side by side\n    # output projection\n    y = self.c_proj(y)\n    return y"
 },
 {
  "id": "llm-20-02",
  "lesson": 20,
  "tier": 5,
  "title": "GPT.forward：直推版",
  "hint": "token + 位置 embedding 相加过 Block，lm_head 出 logits。",
  "code": "def forward(self, idx, targets=None):\n    # idx is of shape (B, T)\n    B, T = idx.size()\n    assert T <= self.config.block_size, f\"Cannot forward sequence of length {T}, block size is only {self.config.block_size}\"\n    # forward the token and posisition embeddings\n    pos = torch.arange(0, T, dtype=torch.long, device=idx.device) # shape (T)\n    pos_emb = self.transformer.wpe(pos) # position embeddings of shape (T, n_embd)\n    tok_emb = self.transformer.wte(idx) # token embeddings of shape (B, T, n_embd)\n    x = tok_emb + pos_emb\n    # forward the blocks of the transformer\n    for block in self.transformer.h:\n        x = block(x)\n    # forward the final layernorm and the classifier\n    x = self.transformer.ln_f(x)\n    logits = self.lm_head(x) # (B, T, vocab_size)\n    loss = None\n    if targets is not None:\n        loss = F.cross_entropy(logits.view(-1, logits.size(-1)), targets.view(-1))\n    return logits, loss"
 },
 {
  "id": "llm-20-03",
  "lesson": 20,
  "tier": 5,
  "title": "from_pretrained：对齐 HF",
  "hint": "按命名规则把 HF 的 Conv1D 权重逐个转置搬进自家 Linear。",
  "code": "def from_pretrained(cls, model_type):\n    \"\"\"Loads pretrained GPT-2 model weights from huggingface\"\"\"\n    assert model_type in {'gpt2', 'gpt2-medium', 'gpt2-large', 'gpt2-xl'}\n    from transformers import GPT2LMHeadModel\n    print(\"loading weights from pretrained gpt: %s\" % model_type)\n    # n_layer, n_head and n_embd are determined from model_type\n    config_args = {\n        'gpt2':         dict(n_layer=12, n_head=12, n_embd=768),  # 124M params\n        'gpt2-medium':  dict(n_layer=24, n_head=16, n_embd=1024), # 350M params\n        'gpt2-large':   dict(n_layer=36, n_head=20, n_embd=1280), # 774M params\n        'gpt2-xl':      dict(n_layer=48, n_head=25, n_embd=1600), # 1558M params\n    }[model_type]\n    config_args['vocab_size'] = 50257 # always 50257 for GPT model checkpoints\n    config_args['block_size'] = 1024 # always 1024 for GPT model checkpoints\n    # create a from-scratch initialized minGPT model\n    config = GPTConfig(**config_args)\n    model = GPT(config)\n    sd = model.state_dict()\n    sd_keys = sd.keys()\n    sd_keys = [k for k in sd_keys if not k.endswith('.attn.bias')] # discard this mask / buffer, not a param"
 },
 {
  "id": "llm-20-04",
  "lesson": 20,
  "tier": 5,
  "title": "DataLoaderLite：分片读",
  "hint": "FineWeb 切成几十个 shard，每个进程按 rank 错开起点。",
  "code": "def __init__(self, B, T, process_rank, num_processes, split):\n    self.B = B\n    self.T = T\n    self.process_rank = process_rank\n    self.num_processes = num_processes\n    assert split in {'train', 'val'}\n    # get the shard filenames\n    data_root = \"edu_fineweb10B\"\n    shards = os.listdir(data_root)\n    shards = [s for s in shards if split in s]\n    shards = sorted(shards)\n    shards = [os.path.join(data_root, s) for s in shards]\n    self.shards = shards\n    assert len(shards) > 0, f\"no shards found for split {split}\"\n    if master_process:\n        print(f\"found {len(shards)} shards for split {split}\")\n    self.reset()"
 },
 {
  "id": "llm-20-05",
  "lesson": 20,
  "tier": 5,
  "title": "next_batch：跨片续读",
  "hint": "一片读完自动切下一片，position 始终对齐 DDP 步长。",
  "code": "def next_batch(self):\n    B, T = self.B, self.T\n    buf = self.tokens[self.current_position : self.current_position+B*T+1]\n    x = (buf[:-1]).view(B, T) # inputs\n    y = (buf[1:]).view(B, T) # targets\n    # advance the position in the tensor\n    self.current_position += B * T * self.num_processes\n    # if loading the next batch would be out of bounds, advance to next shard\n    if self.current_position + (B * T * self.num_processes + 1) > len(self.tokens):\n        self.current_shard = (self.current_shard + 1) % len(self.shards)\n        self.tokens = load_tokens(self.shards[self.current_shard])\n        self.current_position = B * T * self.process_rank\n    return x, y"
 },
 {
  "id": "llm-20-06",
  "lesson": 20,
  "tier": 5,
  "title": "get_most_likely_row：HellaSwag",
  "hint": "四个结尾谁续上去 loss 最低，谁就是答案。",
  "code": "def get_most_likely_row(tokens, mask, logits):\n    # evaluate the autoregressive loss at all positions\n    shift_logits = (logits[..., :-1, :]).contiguous()\n    shift_tokens = (tokens[..., 1:]).contiguous()\n    flat_shift_logits = shift_logits.view(-1, shift_logits.size(-1))\n    flat_shift_tokens = shift_tokens.view(-1)\n    shift_losses = F.cross_entropy(flat_shift_logits, flat_shift_tokens, reduction='none')\n    shift_losses = shift_losses.view(tokens.size(0), -1)\n    # now get the average loss just for the completion region (where mask == 1), in each row\n    shift_mask = (mask[..., 1:]).contiguous() # we must shift mask, so we start at the last prompt token\n    masked_shift_losses = shift_losses * shift_mask\n    # sum and divide by the number of 1s in the mask\n    sum_loss = masked_shift_losses.sum(dim=1)\n    avg_loss = sum_loss / shift_mask.sum(dim=1)\n    # now we have a loss for each of the 4 completions\n    # the one with the lowest loss should be the most likely\n    pred_norm = avg_loss.argmin().item()\n    return pred_norm"
 },
 {
  "id": "llm-20-07",
  "lesson": 20,
  "tier": 5,
  "title": "get_lr：warmup 后余弦",
  "hint": "线性升到 max_lr，再余弦退到 min_lr。",
  "code": "def get_lr(it):\n    # 1) linear warmup for warmup_iters steps\n    if it < warmup_steps:\n        return max_lr * (it+1) / warmup_steps\n    # 2) if it > lr_decay_iters, return min learning rate\n    if it > max_steps:\n        return min_lr\n    # 3) in between, use cosine decay down to min learning rate\n    decay_ratio = (it - warmup_steps) / (max_steps - warmup_steps)\n    assert 0 <= decay_ratio <= 1\n    coeff = 0.5 * (1.0 + math.cos(math.pi * decay_ratio)) # coeff starts at 1 and goes to 0"
 },
 {
  "id": "llm-20-08",
  "lesson": 20,
  "tier": 5,
  "title": "采样：top-k 50 接龙",
  "hint": "每 250 步采样一次：topk 取概率、multinomial 抽、gather 取回 id。",
  "code": "sample_rng.manual_seed(42 + ddp_rank)\nwhile xgen.size(1) < max_length:\n    # forward the model to get the logits\n    with torch.no_grad():\n        with torch.autocast(device_type=device_type, dtype=torch.bfloat16):\n            logits, loss = model(xgen) # (B, T, vocab_size)\n        # take the logits at the last position\n        logits = logits[:, -1, :] # (B, vocab_size)\n        # get the probabilities\n        probs = F.softmax(logits, dim=-1)\n        # do top-k sampling of 50 (huggingface pipeline default)\n        # topk_probs here becomes (5, 50), topk_indices is (5, 50)\n        topk_probs, topk_indices = torch.topk(probs, 50, dim=-1)\n        # select a token from the top-k probabilities\n        # note: multinomial does not demand the input to sum to 1\n        ix = torch.multinomial(topk_probs, 1, generator=sample_rng) # (B, 1)\n        # gather the corresponding indices\n        xcol = torch.gather(topk_indices, -1, ix) # (B, 1)\n        # append to the sequence\n        xgen = torch.cat((xgen, xcol), dim=1)\n# print the generated text\nfor i in range(num_return_sequences):\n    tokens = xgen[i, :max_length].tolist()\n    decoded = enc.decode(tokens)"
 },
 {
  "id": "llm-20-09",
  "lesson": 20,
  "tier": 5,
  "title": "训练一步：累积 + clip + step",
  "hint": "micro_step 分摊 loss、DDP 末步才同步、clip 完再按调度 lr 更新。",
  "code": "# do one step of the optimization\nmodel.train()\noptimizer.zero_grad()\nloss_accum = 0.0\nfor micro_step in range(grad_accum_steps):\n    x, y = train_loader.next_batch()\n    x, y = x.to(device), y.to(device)\n    # added after video, this field is also used by the forward pass.\n    if ddp:\n        model.require_backward_grad_sync = (micro_step == grad_accum_steps - 1)\n    with torch.autocast(device_type=device_type, dtype=torch.bfloat16):\n        logits, loss = model(x, y)\n    # we have to scale the loss to account for gradient accumulation,\n    # because the gradients just add on each successive backward().\n    # addition of gradients corresponds to a SUM in the objective, but\n    # instead of a SUM we want MEAN. Scale the loss here so it comes out right\n    loss = loss / grad_accum_steps\n    loss_accum += loss.detach()\n    loss.backward()\nif ddp:\n    dist.all_reduce(loss_accum, op=dist.ReduceOp.AVG)\nnorm = torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)\n# determine and set the learning rate for this iteration\nlr = get_lr(step)\nfor param_group in optimizer.param_groups:"
 },
 {
  "id": "llm-20-10",
  "lesson": 20,
  "tier": 5,
  "title": "日志：tok/s 与落盘",
  "hint": "吞吐按 B×T×累积×world_size 算，顺手写进 log 文件。",
  "code": "optimizer.step()\nif device_type == \"cuda\":\n    torch.cuda.synchronize() # wait for the GPU to finish work\nt1 = time.time()\ndt = t1 - t0 # time difference in seconds\ntokens_processed = train_loader.B * train_loader.T * grad_accum_steps * ddp_world_size\ntokens_per_sec = tokens_processed / dt\nif master_process:\n    print(f\"step {step:5d} | loss: {loss_accum.item():.6f} | lr {lr:.4e} | norm: {norm:.4f} | dt: {dt*1000:.2f}ms | tok/sec: {tokens_per_sec:.2f}\")\n    with open(log_file, \"a\") as f:\n        f.write(f\"{step} train {loss_accum.item():.6f}\\n\")"
 }
];
