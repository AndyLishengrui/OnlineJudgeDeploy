/* ═══════════════════════════════════════════════════
   PixelTyper — 主逻辑：屏幕路由 / 地图 / 战斗 / 结算 / 档案
   ═══════════════════════════════════════════════════ */
(function () {
  'use strict';

  const $ = sel => document.querySelector(sel);
  const $$ = sel => [...document.querySelectorAll(sel)];

  const BOSS_SPRITES = ['slime', 'ghost', 'golem', 'wizard', 'dragon'];

  // HTML 转义（排行榜显示学生真实姓名、管理端显示包内容，必须转义）
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g,
    c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // ─────────── 在线状态（离线时自动降级纯本地模式） ───────────
  // moved：请求被 301 到别的域名（www → apex）时为 true —— 写操作必然失败，提示刷新
  const oj = { online: false, logged_in: false, admin: false, moved: false, user: null };
  let packCache = [];          // 自定义关卡包摘要 [{id,name,desc,count}]
  let packDetailCache = {};    // id -> 完整包（含 snippets）
  let curPack = null;          // 正在浏览的自定义包

  async function initOnline() {
    const me = await window.PTAPI.me();
    oj.moved = !!(me && me.__moved);
    if (me && me.logged_in) {
      oj.online = true; oj.logged_in = true;
      oj.user = me.user; oj.admin = !!me.admin;
    } else if (me) {
      oj.online = true; // 服务在线但未登录
    }
    renderOjChip();
    refreshPacks();
  }

  /** OJ 没有 /login 路由（那个是管理端的）：登录是首页右上角「登录」按钮弹出的对话框。
      所以点提示条是开新标签页去首页登录，回到本页时这里再自动探测一次。 */
  let rechecking = false;
  async function recheckLogin() {
    if (oj.logged_in || rechecking) return;
    rechecking = true;
    try { await initOnline(); } finally { rechecking = false; }
  }

  function renderOjChip() {
    const el = $('#oj-chip');
    if (oj.moved) {
      el.textContent = '⚠ 页面已过期（域名迁移），点此刷新';
      el.classList.add('offline');
      el.title = '本页是从旧域名加载的：API 已被 301 到新域名，成绩上传和排行榜都会失败。点一下刷新即可。';
    } else if (!oj.online) {
      el.textContent = '⚫ 离线·本地模式';
      el.classList.add('offline');
    } else {
      el.classList.remove('offline');
      el.textContent = oj.logged_in ? `🎓 ${oj.user.name || oj.user.username}` : '⚪ 点我登录 xmuoj';
      el.title = oj.logged_in
        ? '已登录：成绩会同步到排行榜'
        : '在新标签页打开 xmuoj 首页 → 点右上角「登录」→ 回来这页就自动生效（OJ 没有独立的登录网址）';
    }
    $('#btn-goto-admin').classList.toggle('hidden', !oj.admin);
  }

  async function refreshPacks() {
    const res = await window.PTAPI.packs();
    if (!res || !res.packs) return;
    if (JSON.stringify(res.packs) !== JSON.stringify(packCache)) {
      packCache = res.packs;
      packDetailCache = {}; // 摘要变了 → 详情缓存失效
      if ($('#screen-map').classList.contains('active')) renderMap();
    }
  }

  // ─────────── 屏幕路由 ───────────
  function show(id) {
    $$('.screen').forEach(s => s.classList.remove('active'));
    $('#' + id).classList.add('active');
  }

  // ─────────── 玩家徽章 ───────────
  function rankTitle() {
    const { level } = Store.levelOf(Store.p.xp);
    const r = (window.FLAVOR.ranks || []).find(r => r.level === level);
    return `Lv${level} ${r ? r.title : ''}`;
  }
  function renderChips() {
    const txt = `⚔ ${rankTitle()} · XP ${Store.p.xp}`;
    ['#map-player-chip', '#stage-player-chip', '#profile-player-chip'].forEach(s => { $(s).textContent = txt; });
  }

  // ─────────── 题库组织 ───────────
  // 三大模块：指法练习（lane=ft）/ Python 关卡（py-*）/ C++ 关卡（c-*），互不混排
  // stage(tier 1..5, lang) = 该 tier 该语言全部片段；Boss 关 = 其中代码最长者
  function langOf(s) { return s.id.startsWith('py-') ? 'py' : s.id.startsWith('c-') ? 'c' : 'drill'; }
  function langName(l) { return l === 'py' ? 'Python' : 'C++'; }
  function stageSnippets(tier, lang) {
    return window.SNIPPETS.filter(s => s.tier === tier && (!lang || langOf(s) === lang));
  }
  function bossOf(tier, lang) {
    return stageSnippets(tier, lang).reduce((a, b) => (b.code.length > (a ? a.code.length : 0) ? b : a), null);
  }
  function drills() { return window.SNIPPETS.filter(s => s.tier === 0 && s.lane !== 'ft'); }
  function ftLessons() { return window.SNIPPETS.filter(s => s.lane === 'ft'); }

  // 《从零手搓大模型》独立题库（data/llm.js）。刻意不进 window.SNIPPETS：
  // 一旦混进去，特训营地 / 每日挑战 / Boss 判定都会多出一批 tier=5 的怪。
  function llmLessons() { return window.LLM_LESSONS || []; }
  function llmLanes() { return window.LLM_SNIPPETS || []; }
  function llmOfLesson(no) { return llmLanes().filter(s => s.lesson === no); }

  // Boss 击杀记录按语言分开（py1..c5）；旧版数字键兼容两种语言
  function bossKilled(tier, lang) {
    return !!(Store.p.bossKills[lang + tier] || Store.p.bossKills[tier]);
  }
  function stageUnlocked(tier, lang) {
    if (tier <= 1) return true;
    return bossKilled(tier - 1, lang);
  }
  function stageStars(tier, lang) {
    return stageSnippets(tier, lang).reduce((n, s) => n + (Store.p.stars[s.id] || 0), 0);
  }

  // ─────────── 世界地图 ───────────
  // 大模型卡的目录：四个模块各一列，每讲一行（讲号 / 标题 / 关数 · 时长 · 星数）
  function llmModColumns() {
    const mods = window.LLM_MODULES || [];
    return mods.map((m, mi) =>
      `<div class="llm-mod"><div class="llm-mod-name">${esc(m)}</div>` +
      llmLessons().filter(l => l.mod === mi).map(l => {
        const got = llmOfLesson(l.no).reduce((n, s) => n + (Store.p.stars[s.id] || 0), 0);
        return `<div class="llm-les" data-no="${l.no}">
          <span class="llm-les-no">讲${l.no}</span>
          <span class="llm-les-t">${esc(l.title)}</span>
          <span class="llm-les-m">${l.n} 关 · ${l.mins}′ · ★${got}/${l.n * 3}</span>
        </div>`;
      }).join('') + '</div>').join('');
  }

  function renderMap() {
    renderChips();
    const wrap = $('#map-path');
    wrap.innerHTML = '';

    const sec = title => {
      const h = document.createElement('div');
      h.className = 'map-sec';
      h.textContent = title;
      wrap.appendChild(h);
    };
    const addStageNode = (st, tier, lang) => {
      const unlocked = stageUnlocked(tier, lang);
      const node = document.createElement('div');
      node.className = 'stage-node' + (unlocked ? '' : ' locked');
      const cv = document.createElement('canvas');
      cv.width = 16; cv.height = 16; cv.className = 'pixel-canvas';
      PixelArt.draw(cv, BOSS_SPRITES[tier - 1]);
      const stars = stageStars(tier, lang);
      const maxStars = stageSnippets(tier, lang).length * 3;
      node.innerHTML = `${unlocked ? '' : '<span class="node-lock">🔒</span>'}`;
      node.appendChild(cv);
      node.insertAdjacentHTML('beforeend',
        `<div class="node-name">${st.name}</div>
         <div class="node-sub">Boss:${st.boss}${bossKilled(tier, lang) ? ' ✅' : ''}</div>
         <div class="node-stars">★ ${stars}/${maxStars}</div>`);
      if (unlocked) node.onclick = () => { SFX.click(); renderStage(tier, lang); };
      wrap.appendChild(node);
    };

    // 模块一：指法练习
    sec('⌨ 指法练习');
    const dojoNode = document.createElement('div');
    dojoNode.className = 'stage-node dojo-node';
    const ftStars = ftLessons().reduce((n, s) => n + (Store.p.stars[s.id] || 0), 0);
    dojoNode.innerHTML = `<canvas class="pixel-canvas" width="16" height="16"></canvas>
      <div class="node-name">指法道场</div><div class="node-sub">TT 式渐进指法课</div>
      <div class="node-stars">16 课 · ★ ${ftStars}/48</div>`;
    PixelArt.draw(dojoNode.querySelector('canvas'), 'hero');
    dojoNode.onclick = () => { SFX.click(); renderDojo(); };
    wrap.appendChild(dojoNode);

    // 模块二：从零手搓大模型 —— 一张整幅宽卡，16 讲的目录就长在卡里
    sec('🧠 大模型实战');
    const llmNode = document.createElement('div');
    llmNode.className = 'stage-node llm-node';
    const allLlm = llmLanes();
    const llmStars = allLlm.reduce((n, s) => n + (Store.p.stars[s.id] || 0), 0);
    llmNode.innerHTML = `
      <div class="llm-head">
        <canvas class="pixel-canvas" width="16" height="16"></canvas>
        <div>
          <div class="node-name">从零手搓大模型</div>
          <div class="node-sub">16 讲 · ${allLlm.length} 关 · 代码全部取自 Karpathy 官方源码</div>
          <div class="node-stars">★ ${llmStars}/${allLlm.length * 3}</div>
        </div>
      </div>
      <div class="llm-mods">${llmModColumns()}</div>`;
    PixelArt.draw(llmNode.querySelector('canvas'), 'vera');
    llmNode.onclick = e => {
      const les = e.target.closest('.llm-les');
      SFX.click();
      renderLlm(les ? +les.dataset.no : null);
    };
    wrap.appendChild(llmNode);

    // 模块三/四：Python / C++ 语言关卡（分开闯关，各自解锁）
    [['py', '🐍 Python 语言关卡'], ['c', '⚙ C++ 语言关卡']].forEach(([lang, title]) => {
      sec(title);
      window.FLAVOR.stages.forEach((st, i) => addStageNode(st, i + 1, lang));
    });

    // 特别训练
    sec('✦ 特别训练');
    const drillNode = document.createElement('div');
    drillNode.className = 'stage-node special';
    drillNode.innerHTML = `<canvas class="pixel-canvas" width="16" height="16"></canvas>
      <div class="node-name">特训营地</div><div class="node-sub">符号·数字·高频短句</div><div class="node-stars">10 项训练</div>`;
    PixelArt.draw(drillNode.querySelector('canvas'), 'drill');
    drillNode.onclick = () => { SFX.click(); renderStage(0); };
    wrap.appendChild(drillNode);

    const dailyNode = document.createElement('div');
    dailyNode.className = 'stage-node daily-node';
    const done = Store.p.daily.lastDay === todayStr();
    dailyNode.innerHTML = `<canvas class="pixel-canvas" width="16" height="16"></canvas>
      <div class="node-name">每日挑战</div><div class="node-sub">连续打卡 ${Store.p.daily.streak} 天</div>
      <div class="node-stars">${done ? '今日已完成 ✅' : '双倍 XP!'} </div>`;
    PixelArt.draw(dailyNode.querySelector('canvas'), 'daily');
    dailyNode.onclick = () => { SFX.click(); startDaily(); };
    wrap.appendChild(dailyNode);

    // 老师自定义关卡包（在线才有）
    if (packCache.length) sec('📦 自定义关卡包');
    packCache.forEach(pk => {
      const node = document.createElement('div');
      node.className = 'stage-node pack-node';
      node.innerHTML = `<canvas class="pixel-canvas" width="16" height="16"></canvas>
        <div class="node-name">📦 ${esc(pk.name)}</div>
        <div class="node-sub">${esc(pk.desc || '自定义关卡包')}</div>
        <div class="node-stars">${pk.count} 关 · 计入排行榜</div>`;
      PixelArt.draw(node.querySelector('canvas'), 'drill');
      node.onclick = () => { SFX.click(); openPack(pk.id); };
      wrap.appendChild(node);
    });

    show('screen-map');
  }

  // ─────────── 自定义关卡包 ───────────
  async function openPack(id) {
    let pk = packDetailCache[id];
    if (!pk) {
      const res = await window.PTAPI.pack(id);
      if (!res || res.__error) return;
      pk = res;
      packDetailCache[id] = pk;
    }
    renderPack(pk);
  }

  /** 关卡卡片上的战绩行：通关过就写「✔ 已通关 N 次 · 最快 41 WPM（97%）」，
      只打过没达标就写「已打 N 次 · 未达标（最好 88%）」，从没开打则整行不出。 */
  function bestLine(sn) {
    const b = Store.bestOf(sn.id);
    if (!b || !b.attempts) return '';
    if (b.clears > 0) {
      const accTxt = b.acc ? `（${b.acc}%）` : '';
      return `<div class="lv-best ok">✔ 已通关 ${b.clears} 次 · 最快 ${b.wpm} WPM${accTxt}</div>`;
    }
    const accOnly = b.bestAcc ? `（最好 ${b.bestAcc}%）` : '';
    return `<div class="lv-best warn">已打 ${b.attempts} 次 · 未达标${accOnly}</div>`;
  }

  function renderPack(pk) {
    curStageTier = -1; // 自定义包（撤退按钮用：-1 表示回地图而非 renderStage）
    curPack = pk;
    renderChips();
    $('#finger-map').classList.add('hidden');
    $('#stage-title').textContent = `◆ 📦 ${esc(pk.name)}`;
    $('#stage-desc').textContent = `${esc(pk.desc || '老师自定义关卡包')} —— 成绩同样计入排行榜！`;
    const grid = $('#level-grid');
    grid.innerHTML = '';
    pk.snippets.forEach(sn => {
      const card = document.createElement('div');
      card.className = 'level-card';
      const langMap = { py: 'PY', c: 'C', drill: 'DRILL' };
      const lang = langMap[sn.lang] || 'PY';
      const stars = Store.p.stars[sn.id] || 0;
      const lines = sn.code.split('\n').length;
      card.innerHTML = `
        <span class="lv-lang ${lang.toLowerCase()}">${lang}</span>
        <div class="lv-title">${esc(sn.title)}</div>
        <div class="lv-meta">${lines} 行 · ${sn.code.length} 字符${sn.hint ? ' · ' + esc(sn.hint) : ''}</div>
        <div class="lv-stars">${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>${bestLine(sn)}`;
      card.onclick = () => { SFX.click(); startLevel(sn, { pack: pk, list: pk.snippets }); };
      grid.appendChild(card);
    });
    show('screen-stage');
  }

  // ─────────── 关卡选择 ───────────
  let curStageTier = 1;
  let curLang = 'py';        // 当前语言模块（撤退/复盘返回用）
  function renderStage(tier, lang) {
    curStageTier = tier;
    if (lang) curLang = lang;
    curPack = null;
    renderChips();
    $('#finger-map').classList.add('hidden');
    const isDrill = tier === 0;
    const st = isDrill ? null : window.FLAVOR.stages[tier - 1];
    $('#stage-title').textContent = isDrill ? '◆ 特训营地' : `◆ ${st.name} · ${langName(curLang)}`;
    $('#stage-desc').textContent = isDrill
      ? '针对弱键的强化训练：符号、数字、高频短句。练熟了再回主线砍 Boss！'
      : st.desc + ' —— 最后一关是 Boss 战，限时 + 血条，小心！';
    const grid = $('#level-grid');
    grid.innerHTML = '';
    const list = isDrill ? drills() : stageSnippets(tier, curLang);
    const boss = isDrill ? null : bossOf(tier, curLang);
    // Boss 卡固定排在最后（与「最后一关是 Boss 战」的引导语一致）
    const ordered = boss ? [...list.filter(s => s.id !== boss.id), boss] : list;
    ordered.forEach(sn => {
      const isBoss = boss && sn.id === boss.id;
      const card = document.createElement('div');
      card.className = 'level-card' + (isBoss ? ' boss-card' : '');
      const lang = sn.id.startsWith('py-') ? 'PY' : sn.id.startsWith('c-') ? 'C++' : 'DRILL';
      const stars = Store.p.stars[sn.id] || 0;
      const lines = sn.code.split('\n').length;
      card.innerHTML = `
        <span class="lv-lang ${lang === 'C++' ? 'c' : lang.toLowerCase()}">${lang}</span>
        <div class="lv-title">${isBoss ? '👑 Boss · ' : ''}${sn.title}</div>
        <div class="lv-meta">${lines} 行 · ${sn.code.length} 字符</div>
        <div class="lv-stars">${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>${bestLine(sn)}`;
      card.onclick = () => { SFX.click(); startLevel(sn, { boss: isBoss, list: ordered }); };
      grid.appendChild(card);
    });
    show('screen-stage');
  }

  // ─────────── 指法道场（TT 式渐进指法课） ───────────
  // TT (Typing Tutor IV, 1987) 的精髓：基准键起步、每次只加 2 个键、
  // 新键立刻与旧键混编成词。屏幕键盘图按手指分区着色。
  const FINGERS = [
    { name: '小指', cls: 'f-pinky', keys: 'qaz1`p;/-=[]\\\'0' },
    { name: '无名指', cls: 'f-ring', keys: 'wsx2ol.9' },
    { name: '中指', cls: 'f-middle', keys: 'edc3ik,8' },
    { name: '食指', cls: 'f-index', keys: 'rfv45tgb6yhn7ujm' },
    { name: '拇指', cls: 'f-thumb', keys: ' ' },
  ];
  function fingerOf(ch) {
    ch = ch.toLowerCase();
    for (const f of FINGERS) if (f.keys.includes(ch)) return f.cls;
    return '';
  }
  function renderFingerMap() {
    const rows = ['1234567890-=', 'qwertyuiop[]', "asdfghjkl;'", 'zxcvbnm,./'];
    const el = $('#finger-map');
    el.innerHTML = rows.map(row =>
      `<div class="fm-row">${[...row].map(ch =>
        `<span class="fm-key ${fingerOf(ch)}">${ch === ' ' ? '␣' : esc(ch)}</span>`).join('')}</div>`
    ).join('') +
    `<div class="fm-row"><span class="fm-key fm-space f-thumb">空格 · 拇指</span></div>
     <div class="fm-legend">${FINGERS.map(f => `<span><i class="fm-dot ${f.cls}"></i>${f.name}</span>`).join('')}</div>`;
  }

  function renderDojo() {
    curStageTier = -2; // -2 = 指法道场（撤退按钮据此返回）
    curPack = null;
    renderChips();
    $('#stage-title').textContent = '◆ 指法道场';
    $('#stage-desc').textContent =
      'TT 祖训：先求准，再求快；手指永远回基准行（asdf jkl;）。每课只新增一两个键，由浅入深。';
    renderFingerMap();
    $('#finger-map').classList.remove('hidden');
    const grid = $('#level-grid');
    grid.innerHTML = '';
    const list = ftLessons();
    list.forEach((sn, i) => {
      const card = document.createElement('div');
      card.className = 'level-card';
      const stars = Store.p.stars[sn.id] || 0;
      card.innerHTML = `
        <span class="lv-lang key">KEY</span>
        <div class="lv-title">${esc(sn.title)}</div>
        <div class="lv-meta">${esc(sn.hint)}</div>
        <div class="lv-stars">${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>${bestLine(sn)}`;
      card.onclick = () => { SFX.click(); startLevel(sn, { list }); };
      grid.appendChild(card);
    });
    show('screen-stage');
  }

  // ─────────── 从零手搓大模型（16 讲 · 91 关） ───────────
  // 九十一关一屏列出，按讲分节；从地图点某一讲进来就滚到那一节
  let curLlmNo = 1;
  function renderLlm(no) {
    curStageTier = -3; // -3 = 大模型实战（撤退/复盘据此回到这一屏）
    curPack = null;
    if (no) curLlmNo = no;
    renderChips();
    $('#finger-map').classList.add('hidden');
    $('#stage-title').textContent = '◆ 🧠 从零手搓大模型';
    $('#stage-desc').textContent =
      '16 讲 · 91 关，代码全部取自 Karpathy 官方源码：从标量求导一路打到 minbpe 分词器。按讲分节，通过一关就能接着打下一关。';
    const grid = $('#level-grid');
    grid.innerHTML = '';
    const list = llmLanes();
    llmLessons().forEach(l => {
      const head = document.createElement('div');
      head.className = 'llm-sec';
      head.dataset.no = l.no;
      const got = llmOfLesson(l.no).reduce((n, s) => n + (Store.p.stars[s.id] || 0), 0);
      head.innerHTML = `<span class="llm-sec-no">讲${l.no}</span>
        <span class="llm-sec-t">${esc(l.title)}</span>
        <span class="llm-sec-m">${esc(l.src)} · ${l.n} 关 · ★${got}/${l.n * 3}</span>`;
      grid.appendChild(head);
      llmOfLesson(l.no).forEach(sn => {
        const card = document.createElement('div');
        card.className = 'level-card';
        const stars = Store.p.stars[sn.id] || 0;
        const lines = sn.code.split('\n').length;
        card.innerHTML = `
          <span class="lv-lang llm">LLM</span>
          <div class="lv-title">${esc(sn.title)}</div>
          <div class="lv-meta">${lines} 行 · ${sn.code.length} 字符${sn.hint ? ' · ' + esc(sn.hint) : ''}</div>
          <div class="lv-stars">${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>${bestLine(sn)}`;
        card.onclick = () => { SFX.click(); startLevel(sn, { list }); };
        grid.appendChild(card);
      });
    });
    show('screen-stage');
    requestAnimationFrame(() => {
      const el = grid.querySelector(`.llm-sec[data-no="${curLlmNo}"]`);
      if (el) el.scrollIntoView({ block: 'start' });
    });
  }
  // ─────────── 深链接：#llm/<讲>[/<第几关>] ───────────
  // 供导读页的「跟打」卡片直接跳进来，例如 #llm/6/2 = 讲6 第2关
  function applyHash() {
    const m = /^#llm(?:\/(\d{1,2}))?(?:\/(\d{1,2}))?$/.exec(location.hash || '');
    if (!m) return false;
    const no = m[1] ? +m[1] : 1;
    const k = m[2] ? +m[2] : 0;
    renderLlm(no);
    const sn = k ? llmOfLesson(no)[k - 1] : null;
    if (sn) startLevel(sn, { list: llmLanes() });
    return true;
  }
  // ─────────── 每日挑战 ───────────
  function todayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function startDaily() {
    const t = todayStr();
    let seed = 0;
    for (const ch of t) seed = (seed * 31 + ch.charCodeAt(0)) | 0;
    const pool = window.SNIPPETS.filter(s => s.tier > 0);
    const sn = pool[Math.floor(mulberry32(seed)() * pool.length)];
    startLevel(sn, { daily: true });
  }

  // ─────────── 打字战场 ───────────
  let session = null;        // TypingSession
  let gameCtx = null;        // {snippet, boss, daily, timerId, bossHP, playerHP, timeLeft, deadline}
  let charSpans = [];

  function renderCode(snippet) {
    const panel = $('#code-panel');
    panel.innerHTML = '';
    charSpans = [];
    let code = snippet.code.replace(/\r\n?/g, '\n').replace(/[ \t]+$/gm, '');
    if (snippet.lane === 'ft') code = code.replace(/\n+/g, ' '); // TT 式：无换行，自动折行
    for (const ch of code) {
      const sp = document.createElement('span');
      sp.className = 'ch';
      if (ch === '\n') { sp.textContent = '↵\n'; sp.classList.add('nl'); }
      else if (ch === ' ') { sp.textContent = '·'; sp.classList.add('ws'); }
      else if (ch === '\t') { sp.textContent = '→   '; sp.classList.add('ws'); }
      else sp.textContent = ch;
      panel.appendChild(sp);
      charSpans.push(sp);
    }
    if (charSpans[0]) charSpans[0].classList.add('cur');
  }

  function setCursor(prev, cur) {
    if (charSpans[prev]) charSpans[prev].classList.remove('cur');
    if (charSpans[cur]) {
      charSpans[cur].classList.add('cur');
      charSpans[cur].scrollIntoView({ block: 'nearest' });
    }
  }

  function mascotSay(mood, text) {
    PixelArt.draw($('#mascot'), 'hero', mood === 'hurt' ? 2 : mood === 'happy' ? 1 : 0);
    if (text) $('#mascot-line').textContent = text;
  }

  /** 薇拉闪现：只在通关、破纪录、被击倒、断连击这几个时刻陪勇者站一下，5 秒后自己退场。
      平时战场上只留勇者，免得两个人抢注意力。 */
  let veraTimer = null;
  function veraAppear(text) {
    const cv = $('#mascot-vera');
    if (!cv) return;
    PixelArt.draw(cv, 'vera', 1);
    cv.classList.remove('hidden');
    if (text) $('#mascot-line').textContent = text;
    clearTimeout(veraTimer);
    veraTimer = setTimeout(() => cv.classList.add('hidden'), 5000);
  }

  const VERA_LINES = {
    record: ['新纪录！这一笔我给你记在通关簿上了。', '比上次还快，勇者，你进步了。'],
    pass: ['稳了。按 Enter 看结算吧。', '这一关拿下了，下一关我陪你去。'],
    fail: ['别急，看清错在哪，按 R 再来一次。', '摔一次不算什么，我等着你重打。'],
    hurt: ['连击断了，深呼吸，重新起手。', '稳住——手别抖，一个一个来。'],
  };

  const MASCOT_LINES = {
    start: ['稳住指法，不求快，先求准！', '眼睛看屏幕，别偷看键盘哦！', '食指记得回 F 和 J 的家。'],
    err: ['哎呀！敲错了，退格修正它！', '痛痛痛……集中精神！', '这个键又叛变了，记住它！'],
    combo: ['连击上升！手感来了！', '太强了，指尖在燃烧！', '保持这个节奏！'],
    boss: ['Boss 战！敲对就是攻击！', '别慌，一个字符一个字符来！'],
  };
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];

  // 代码字号：普通关与指法课各自记忆（settings.fontCode / fontFt）
  function applyFontSize() {
    const s = Store.p.settings;
    const ft = gameCtx && gameCtx.snippet.lane === 'ft';
    const px = ft ? (s.fontFt || 30) : (s.fontCode || 22);
    $('#code-panel').style.fontSize = px + 'px';
  }
  function adjustFont(delta) {
    if (!gameCtx) return;
    const s = Store.p.settings;
    const key = gameCtx.snippet.lane === 'ft' ? 'fontFt' : 'fontCode';
    s[key] = Math.min(44, Math.max(16, (s[key] || (key === 'fontFt' ? 30 : 22)) + delta));
    Store.save();
    applyFontSize();
    SFX.click();
  }

  function startLevel(snippet, opts) {
    opts = opts || {};
    gameCtx = {
      snippet, boss: !!opts.boss, daily: !!opts.daily,
      pack: opts.pack || null,          // 自定义包上下文（排行榜/下一关用）
      list: opts.list || null,          // 当前关卡的有序列表（决定「下一关」）
      timerId: null, bossHP: 0, bossMaxHP: 0, playerHP: 8, playerMaxHP: 8,
      deadline: null, failed: false,
      dmg: {}, // boss 战：每个光标位置造成的伤害，退格时精确返还（含连击加成）
      comboPeak: 0, // 断连击前攒了多少，用来决定要不要让薇拉出来
    };
    $('#mascot-vera').classList.add('hidden'); // 上一关的薇拉先退场
    $('#game-title').textContent =
      (opts.boss ? `👑 Boss 战 · ${window.FLAVOR.stages[snippet.tier - 1].boss}` :
       opts.daily ? '📅 每日挑战 · ' :
       opts.pack ? `📦 ${esc(opts.pack.name)} · ` : '') + snippet.title;

    // Boss 数值
    const wrap = $('#boss-bar-wrap');
    if (opts.boss) {
      wrap.classList.remove('hidden');
      const n = snippet.code.length;
      gameCtx.bossMaxHP = gameCtx.bossHP = n;
      gameCtx.deadline = null; // 第一次击键后才设定
      gameCtx.timeLimitMs = Math.max(30000, n * 800);
      $('#boss-name').textContent = window.FLAVOR.stages[snippet.tier - 1].boss;
      PixelArt.draw($('#boss-sprite'), BOSS_SPRITES[snippet.tier - 1]);
      updateHpBars();
    } else {
      wrap.classList.add('hidden');
    }

    renderCode(snippet);
    // 指法课：大字 + 自动折行模式（长代码关卡同样靠 .code-panel 的滚动视图跟随光标）
    $('#code-panel').classList.toggle('ft-mode', snippet.lane === 'ft');
    applyFontSize();
    $('#review-panel').classList.add('hidden');
    updateHud({ wpm: 0, acc: 1, combo: 0, progress: 0 });
    // 一进关就告诉你：这一关以前打没打过、最好到哪
    const b = Store.bestOf(snippet.id);
    $('#hud-best').textContent = !b || !b.attempts ? '—'
      : b.clears > 0 ? `${b.wpm} · ${b.acc}%` : `打过 ${b.attempts} 次`;
    $('#hud-best-cell').title = !b || !b.attempts ? '这一关还没打过'
      : b.clears > 0
        ? `最快的一次通关：${b.wpm} WPM（那局准确率 ${b.acc}%）；通关 ${b.clears} 次 / 共打 ${b.attempts} 次`
        : `打过 ${b.attempts} 次还没达标，最好准确率 ${b.bestAcc || '—'}%（达标线 80%）`;
    $('#game-timer').textContent = '0.0s';
    $('#progress-fill').style.width = '0%';
    mascotSay('idle', opts.boss ? pick(MASCOT_LINES.boss) : pick(MASCOT_LINES.start));

    session = new TypingSession(snippet.code, onSessionEvent);
    show('screen-game');
    $('#code-panel').focus();

    gameCtx.timerId = setInterval(gameTick, 100);
  }

  function updateHpBars() {
    $('#boss-hp-fill').style.width = `${(gameCtx.bossHP / gameCtx.bossMaxHP) * 100}%`;
    $('#player-hp-fill').style.width = `${(gameCtx.playerHP / gameCtx.playerMaxHP) * 100}%`;
  }

  function gameTick() {
    if (!session || !gameCtx) return;
    const now = Date.now();
    if (gameCtx.boss && session.startedAt) {
      if (!gameCtx.deadline) gameCtx.deadline = session.startedAt + gameCtx.timeLimitMs;
      const left = gameCtx.deadline - now;
      if (left <= 0 && !session.done) { endLevel(false, '时间耗尽！魔王把你轰出了战场。'); return; }
      $('#game-timer').textContent = `⏱ ${(left / 1000).toFixed(1)}s`;
    } else {
      $('#game-timer').textContent = `${(session.elapsedMs(now) / 1000).toFixed(1)}s`;
    }
    if (session.startedAt && !session.done) updateHud(session.liveStats(now));
  }

  function updateHud(st) {
    $('#hud-wpm').textContent = st.wpm;
    $('#hud-acc').textContent = `${Math.round(st.acc * 100)}%`;
    $('#hud-combo').textContent = st.combo;
    $('#hud-prog').textContent = `${Math.round(st.progress * 100)}%`;
    $('#progress-fill').style.width = `${st.progress * 100}%`;
  }

  function onSessionEvent(ev) {
    const i = session.cursor - 1;
    if (ev.type === 'char') {
      const sp = charSpans[i];
      if (sp) sp.classList.add(ev.ok ? 'ok' : 'bad');
      setCursor(i, session.cursor);
      if (ev.ok) {
        SFX.key(session.combo);
        gameCtx.comboPeak = session.combo;
        if (gameCtx.boss) {
          const dmg = 1 + Math.floor(session.combo / 20);
          gameCtx.dmg[i] = dmg; // 记录该位置伤害，退格精确返还
          gameCtx.bossHP = Math.max(0, gameCtx.bossHP - dmg);
          updateHpBars();
          if (session.combo > 0 && session.combo % 30 === 0) { SFX.bossHit(); mascotSay('happy', pick(MASCOT_LINES.combo)); }
        } else if (session.combo > 0 && session.combo % 30 === 0) {
          mascotSay('happy', pick(MASCOT_LINES.combo));
        }
        if (ev.newline) SFX.newline();
      } else {
        SFX.error();
        mascotSay('hurt', pick(MASCOT_LINES.err));
        flashShake();
        if (gameCtx.comboPeak >= 20) veraAppear(pick(VERA_LINES.hurt)); // 连击断了，薇拉出来说一句
        gameCtx.comboPeak = 0;
        if (gameCtx.boss) {
          gameCtx.playerHP -= 1;
          SFX.playerHurt();
          updateHpBars();
          if (gameCtx.playerHP <= 0) { endLevel(false, '血量归零！被 Boss 击倒了。'); return; }
        }
      }
      updateHud(session.liveStats(Date.now()));
    } else if (ev.type === 'backspace') {
      const sp = charSpans[ev.cursor];
      if (sp) sp.classList.remove('ok', 'bad');
      setCursor(ev.cursor + 1, ev.cursor);
      SFX.backspace();
      if (gameCtx.boss) {
        // 精确返还该位置造成过的伤害（含连击加成），防止反复敲-退刷伤害
        const refund = gameCtx.dmg[ev.cursor] || 0;
        if (refund) {
          gameCtx.bossHP = Math.min(gameCtx.bossMaxHP, gameCtx.bossHP + refund);
          delete gameCtx.dmg[ev.cursor];
          updateHpBars();
        }
      }
    } else if (ev.type === 'done') {
      finishReview(); // 打完不跳走：留在战场复盘代码，Enter 才进结算
    }
  }

  // ─────────── 打完停留复盘（用户反馈：想留在打字页看战绩、背代码） ───────────
  function finishReview() {
    clearInterval(gameCtx.timerId);
    gameCtx.review = true;
    const stats = session.finalStats();
    const stars = TypingSession.starsFor(stats, gameCtx.snippet.tier);
    $('#review-title').textContent = stars > 0
      ? '✔ 完成！代码完整保留在上方，可以对答案、背代码'
      : '✘ 准确率不足 80%，建议按 R 重打一遍';
    $('#review-stats').innerHTML = `
      <span class="rv-stars">${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}</span>
      <span>WPM <b>${stats.wpm}</b></span>
      <span>准确率 <b>${Math.round(stats.acc * 100)}%</b></span>
      <span>最高连击 <b>${stats.maxCombo}</b></span>
      <span>耗时 <b>${(stats.ms / 1000).toFixed(1)}s</b></span>`;
    $('#review-panel').classList.remove('hidden');
    $('#review-panel').scrollIntoView({ block: 'nearest' });
    mascotSay(stars > 0 ? 'happy' : 'idle',
      stars > 0 ? '漂亮！复盘一下，满意就按 Enter 看结算～' : '别灰心，看清错在哪，按 R 再来！');
    // 薇拉闪现：这里是结算面板盖住之前、唯一还看得见战场的时刻。
    // 此刻 endLevel 还没写库，所以 bestOf 拿到的仍是上一局的最好成绩。
    const prev = Store.bestOf(gameCtx.snippet.id);
    const isRecord = stars > 0 && (!prev || prev.clears === 0 || stats.wpm > prev.wpm);
    veraAppear(pick(stars > 0 ? (isRecord ? VERA_LINES.record : VERA_LINES.pass) : VERA_LINES.fail));
    if (stars > 0) SFX.victory(); else SFX.defeat();
  }

  function showResultFromReview() {
    if (!gameCtx || !gameCtx.review) return;
    gameCtx.review = false;
    gameCtx.fromReview = true;
    $('#review-panel').classList.add('hidden');
    endLevel(true);
  }

  function retryFromReview() {
    const g = gameCtx;
    startLevel(g.snippet, { boss: g.boss, daily: g.daily, pack: g.pack, list: g.list });
  }

  function backFromReview() {
    const g = gameCtx;
    session = null;
    if (g.pack) renderPack(g.pack);
    else if (g.daily) renderMap();
    else if (curStageTier === -2) renderDojo();
    else if (curStageTier === -3) renderLlm();
    else renderStage(g.snippet.tier, langOf(g.snippet));
  }

  function flashShake() {
    const el = $('#screen-game');
    el.classList.remove('shake');
    void el.offsetWidth;
    el.classList.add('shake');
  }

  // ─────────── 结算 ───────────
  function endLevel(win, failReason) {
    if (!gameCtx || gameCtx.failed || gameCtx.settled) return;
    gameCtx.settled = true; // 复盘界面按钮+回车可能触发两次，幂等
    if (!win) { gameCtx.failed = true; session.done = true; } // 失败后锁键盘
    clearInterval(gameCtx.timerId);
    const stats = session.finalStats();
    const sn = gameCtx.snippet;
    const stars = win ? TypingSession.starsFor(stats, sn.tier) : 0;
    const passed = win && stars > 0; // 准确率 <80% = 0 星 = 未达标：不给成就/打卡/解锁

    // 每局都记一笔（含没达标的）：关卡卡片和战场 HUD 靠它显示「打过没有 / 最好成绩」
    const runTs = new Date().toLocaleString('zh-CN');
    Store.recordRun(sn.id, {
      wpm: stats.wpm, acc: +(stats.acc * 100).toFixed(1),
      stars, completed: !!win, ts: runTs,
    });

    // 每日挑战双倍 XP 只给当天第一次完成（防无限重玩刷分）
    const dailyFirstWin = passed && gameCtx.daily && Store.p.daily.lastDay !== todayStr();

    // 持久化（0 星不算通关，不写任何进度）
    if (passed) {
      Store.recordStars(sn.id, stars);
      Store.recordKeyStats(stats.perKey);
      Store.pushHistory({ id: sn.id, wpm: stats.wpm, acc: +(stats.acc * 100).toFixed(1), ts: runTs });
      if (gameCtx.boss) Store.p.bossKills[langOf(sn) + sn.tier] = true;
      if (dailyFirstWin) {
        const t = todayStr();
        const y = new Date(); y.setDate(y.getDate() - 1);
        const yStr = `${y.getFullYear()}-${String(y.getMonth() + 1).padStart(2, '0')}-${String(y.getDate()).padStart(2, '0')}`;
        Store.p.daily.streak = (Store.p.daily.lastDay === yStr) ? Store.p.daily.streak + 1 : 1;
        Store.p.daily.lastDay = t;
      }
      Store.save();
    }

    // XP（0 星为 0）
    let xp = 0;
    if (passed) {
      xp = sn.code.length * [0, 0.6, 1, 1.6][stars];
      if (gameCtx.boss) xp *= 1.5;
      if (dailyFirstWin) xp *= 2;
      xp = Math.round(xp);
    }
    const lvBefore = Store.levelOf(Store.p.xp).level;
    if (xp) Store.addXp(xp);
    const lvAfter = Store.levelOf(Store.p.xp).level;

    // 成就（仅达标局）
    if (passed) checkAchievements(stats, sn, stars);

    // 渲染
    $('#result-title').textContent = !win ? 'GAME OVER'
      : passed ? (gameCtx.boss ? 'BOSS 击破!' : 'VICTORY!')
      : '准确率未达标';
    $('#result-title').classList.toggle('fail', !win || !passed);
    $('#result-stars').innerHTML = win
      ? '★'.repeat(stars) + `<span class="star-off">${'★'.repeat(3 - stars)}</span>` : '';
    $('#result-stats').innerHTML = `
      <div class="rs"><span>WPM</span><b>${stats.wpm}</b></div>
      <div class="rs"><span>准确率</span><b>${Math.round(stats.acc * 100)}%</b></div>
      <div class="rs"><span>最高连击</span><b>${stats.maxCombo}</b></div>
      <div class="rs"><span>耗时</span><b>${(stats.ms / 1000).toFixed(1)}s</b></div>`;
    $('#xp-label').textContent = !win
      ? (failReason || '别灰心，魔王也是这么练出来的。')
      : !passed
      ? '准确率低于 80%，本关不计星——慢下来，看准了再敲！'
      : `XP +${xp}${dailyFirstWin ? '（每日双倍）' : ''}${lvAfter > lvBefore ? ` · 升级! ${rankTitle()}` : ''}`;
    const lv = Store.levelOf(Store.p.xp);
    $('#xp-fill').style.width = '0%';
    setTimeout(() => { $('#xp-fill').style.width = `${Math.round(lv.progress * 100)}%`; }, 60);

    const weak = Store.weakKeys();
    $('#weak-keys').innerHTML = weak.length
      ? `薄弱按键：${weak.map(k => `<b>${k.ch === ' ' ? '空格' : k.ch === '\n' ? '回车' : k.ch}</b>(错${Math.round(k.errRate * 100)}%)`).join(' · ')} → 去特训营地加餐！`
      : '';

    // 上传排行榜成绩（在线 + 已登录 + 达标才上传；任何失败都静默降级本地模式）
    const upEl = $('#upload-note');
    upEl.textContent = ''; upEl.className = 'upload-note';
    if (passed && oj.logged_in) {
      upEl.textContent = '成绩上传中…';
      window.PTAPI.submitScore({
        snippet_id: sn.id, tier: sn.tier, chars: stats.correct,
        stars, wpm: stats.wpm, acc: +stats.acc.toFixed(4),
        ms: Math.round(stats.ms), max_combo: stats.maxCombo,
      }).then(res => {
        if (res && res.__moved) upEl.textContent = '⚠ 页面已过期（域名迁移），刷新后重打一次才会进榜';
        else if (!res) upEl.textContent = '⚫ 离线：成绩仅保存在本机';
        else if (res.__unauth) upEl.textContent = '⚪ 登录已过期，成绩仅保存在本机';
        else if (res.__error) upEl.textContent = `上传失败：${esc(res.__error)}`;
        else {
          upEl.textContent = res.improved ? '🏆 新纪录！已上传排行榜' : '✔ 已上传（未超个人最佳）';
          if (res.improved) upEl.classList.add('newbest');
        }
      });
    } else if (passed && oj.online && !oj.logged_in) {
      upEl.textContent = '⚪ 未登录 xmuoj，成绩仅保存在本机（回地图点右上角登录）';
    }

    // 下一关按钮：用开打时冻结的有序列表（每日挑战不给下一关，防止绕过解锁体系）
    const ordered = gameCtx.list || [];
    const idx = ordered.findIndex(s => s.id === sn.id);
    const next = ordered[idx + 1];
    $('#btn-next').disabled = !(passed && next && !gameCtx.daily);

    if (!gameCtx.fromReview) {
      if (passed) { SFX.victory(); if (lvAfter > lvBefore) setTimeout(() => SFX.levelUp(), 700); }
      else SFX.defeat();
    } else if (passed && lvAfter > lvBefore) setTimeout(() => SFX.levelUp(), 300);

    show('screen-result');
  }

  function checkAchievements(stats, sn, stars) {
    const unlock = id => {
      if (Store.unlockAchv(id)) {
        const a = window.FLAVOR.achievements.find(a => a.id === id);
        if (a) toastAchv(a);
      }
    };
    unlock('first-clear');
    if (sn.id === 'py-print-hello' || sn.id === 'c-hello-main') unlock('hello-world');
    if (gameCtx.boss) {
      unlock('first-blood');
      if (stats.errors === 0) unlock('flawless-boss');
      if (['py', 'c'].every(l => [1, 2, 3, 4, 5].every(t => bossKilled(t, l)))) unlock('all-stages');
    }
    if (stats.maxCombo >= 50) unlock('combo-50');
    if (stats.maxCombo >= 200) unlock('combo-200');
    if (stats.acc >= 0.99) unlock('accuracy-99');
    if (stats.wpm >= 60) unlock('speed-60');
    if (stats.wpm >= 100) unlock('speed-100');
    const h = new Date().getHours();
    if (h >= 0 && h < 5) unlock('night-owl');
    if (Store.p.daily.streak >= 7) unlock('streak-7');
  }

  let toastQueue = [];
  let toastBusy = false;
  function toastAchv(a) {
    toastQueue.push(a);
    if (toastBusy) return;
    toastBusy = true;
    const next = () => {
      const item = toastQueue.shift();
      if (!item) { toastBusy = false; return; }
      $('#achv-toast-name').textContent = `成就解锁 · ${item.name}`;
      $('#achv-toast-desc').textContent = item.desc;
      $('#achv-toast').classList.remove('hidden');
      SFX.achieve();
      setTimeout(() => { $('#achv-toast').classList.add('hidden'); setTimeout(next, 300); }, 2600);
    };
    next();
  }

  // ─────────── 排行榜 ───────────
  let boardMode = 'overall';

  function allLevelOptions() {
    // 单关榜下拉：按模块分组（指法 / Python 各关 / C++ 各关 / 特训）+ 自定义包关卡
    const opts = [];
    const ft = ftLessons();
    if (ft.length) {
      opts.push(`<optgroup label="⌨ 指法道场">` +
        ft.map(s => `<option value="${esc(s.id)}">${esc(s.title)}</option>`).join('') + '</optgroup>');
    }
    for (let t = 1; t <= 5; t++) {
      ['py', 'c'].forEach(l => {
        const list = stageSnippets(t, l);
        if (!list.length) return;
        const stName = (window.FLAVOR.stages[t - 1] || {}).name || `第${t}关`;
        opts.push(`<optgroup label="${esc(stName)} · ${langName(l)}">` +
          list.map(s => `<option value="${esc(s.id)}">${esc(s.title)}</option>`).join('') +
          '</optgroup>');
      });
    }
    const dr = drills();
    if (dr.length) {
      opts.push(`<optgroup label="特训营地">` +
        dr.map(s => `<option value="${esc(s.id)}">${esc(s.title)}</option>`).join('') + '</optgroup>');
    }
    llmLessons().forEach(l => {
      opts.push(`<optgroup label="🧠 讲${l.no} ${esc(l.title)}">` +
        llmOfLesson(l.no).map(s => `<option value="${esc(s.id)}">${esc(s.title)}</option>`).join('') +
        '</optgroup>');
    });
    packCache.forEach(pk => {
      const detail = packDetailCache[pk.id];
      if (!detail) return;
      opts.push(`<optgroup label="📦 ${esc(pk.name)}">` +
        detail.snippets.map(s => `<option value="${esc(s.id)}">${esc(s.title)}</option>`).join('') +
        '</optgroup>');
    });
    return opts.join('');
  }

  async function renderBoard() {
    renderChips();
    show('screen-board');
    $('#tab-board-overall').classList.toggle('active', boardMode === 'overall');
    $('#tab-board-snippet').classList.toggle('active', boardMode === 'snippet');
    $('#board-snippet-bar').classList.toggle('hidden', boardMode !== 'snippet');
    const table = $('#board-table');
    const empty = $('#board-empty');
    const meLine = $('#board-me-line');
    table.innerHTML = '';
    empty.classList.add('hidden');
    meLine.textContent = '加载中…';

    if (boardMode === 'overall') {
      const res = await window.PTAPI.boardOverall();
      if (res && res.__moved) { meLine.textContent = '⚠ 页面已过期（域名迁移），刷新页面后才能看到排行榜'; return; }
      if (!res || res.__error) { meLine.textContent = '⚫ 排行榜服务不可用（离线模式）'; return; }
      meLine.textContent = '';
      const rows = res.rows || [];
      if (!rows.length) empty.classList.remove('hidden');
      table.innerHTML =
        // 管理员多一列真名（real_name 只有管理员请求时后端才下发）
        `<tr><th>#</th><th>勇者</th>${oj.admin ? '<th>姓名</th>' : ''}<th>总星数</th><th>战功XP</th><th>通关数</th><th>平均准确率</th></tr>` +
        rows.map((r, i) => `
          <tr${oj.user && r.user_id === oj.user.id ? ' class="me"' : ''}>
            <td class="b-rank">${i + 1}</td>
            <td class="b-name">${esc(r.username)}</td>${oj.admin ? `<td class="b-realname">${esc(r.real_name || '—')}</td>` : ''}
            <td>★ ${r.stars}</td><td>${r.xp}</td><td>${r.clears}</td>
            <td>${Math.round((r.avg_acc || 0) * 100)}%</td>
          </tr>`).join('');
      if (res.me) meLine.textContent = `你的名次：第 ${res.me.rank} 名 · ★${res.me.stars} · ${res.me.xp} XP`;
      else meLine.textContent = oj.logged_in ? '你还没有上榜成绩——去打通任意一关！' : '登录 xmuoj 后成绩才会上榜（回地图点右上角）';
    } else {
      const sel = $('#board-snippet-select');
      const prev = sel.value; // 重建选项后尽量保住当前选择（onchange 也会触发本函数）
      sel.innerHTML = allLevelOptions();
      if (prev && [...sel.options].some(o => o.value === prev)) sel.value = prev;
      const sid = sel.value;
      if (!sid) { meLine.textContent = ''; return; }
      const res = await window.PTAPI.boardSnippet(sid);
      if (res && res.__moved) { meLine.textContent = '⚠ 页面已过期（域名迁移），刷新页面后才能看到排行榜'; return; }
      if (!res || res.__error) { meLine.textContent = '⚫ 排行榜服务不可用（离线模式）'; return; }
      meLine.textContent = '';
      const rows = res.rows || [];
      if (!rows.length) empty.classList.remove('hidden');
      table.innerHTML =
        `<tr><th>#</th><th>勇者</th>${oj.admin ? '<th>姓名</th>' : ''}<th>星级</th><th>WPM</th><th>准确率</th><th>耗时</th></tr>` +
        rows.map((r, i) => `
          <tr${oj.user && r.username === oj.user.username ? ' class="me"' : ''}>
            <td class="b-rank">${i + 1}</td>
            <td class="b-name">${esc(r.username)}</td>${oj.admin ? `<td class="b-realname">${esc(r.real_name || '—')}</td>` : ''}
            <td>${'★'.repeat(r.stars)}</td><td>${r.wpm}</td>
            <td>${Math.round((r.acc || 0) * 100)}%</td>
            <td>${(r.ms / 1000).toFixed(1)}s</td>
          </tr>`).join('');
    }
  }

  // ─────────── 管理员 · 自定义关卡 ───────────
  let editingPackId = null;

  function adminMsg(text, isErr) {
    const el = $('#admin-msg');
    el.textContent = text;
    el.classList.toggle('err', !!isErr);
  }

  function clearEditor() {
    editingPackId = null;
    $('#admin-editor-title').textContent = '编辑器 · 新关卡包';
    $('#admin-name').value = '';
    $('#admin-desc').value = '';
    $('#admin-json').value = JSON.stringify([
      { title: '示例·输出练习', tier: 1, lang: 'py', hint: '注意引号和括号', code: "name = 'world'\nprint('hello', name)" },
    ], null, 2);
    $('#btn-admin-delete').classList.add('hidden');
    adminMsg('');
  }

  function readEditor() {
    // 返回 {name, desc, snippets} 或抛错（带中文提示）
    const name = $('#admin-name').value.trim();
    const desc = $('#admin-desc').value.trim();
    if (!name) throw new Error('请填写包名称');
    let arr;
    try { arr = JSON.parse($('#admin-json').value); }
    catch (e) { throw new Error(`JSON 语法错误：${e.message}`); }
    if (!Array.isArray(arr) || !arr.length) throw new Error('snippets 必须是非空数组');
    if (arr.length > 30) throw new Error('一个包最多 30 关');
    const snippets = arr.map((s, i) => {
      const no = `第 ${i + 1} 关`;
      if (!s || typeof s !== 'object') throw new Error(`${no}：不是对象`);
      const title = String(s.title || '').trim();
      if (!title) throw new Error(`${no}：缺 title`);
      const code = String(s.code || '').replace(/\r\n?/g, '\n').replace(/\n+$/, '');
      if (code.length < 5) throw new Error(`${no}：code 太短（至少 5 字符）`);
      if (code.length > 2000) throw new Error(`${no}：code 超过 2000 字符`);
      if ([...code].some(c => c.charCodeAt(0) > 127)) throw new Error(`${no}：代码必须纯 ASCII（中文引号/全角符号也不行）`);
      const lines = code.split('\n');
      if (lines.length > 60) throw new Error(`${no}：超过 60 行`);
      if (Math.max(...lines.map(l => l.length)) > 80) throw new Error(`${no}：有行超过 80 字符`);
      const tier = s.tier == null ? 1 : Number(s.tier);
      if (!Number.isInteger(tier) || tier < 0 || tier > 5) throw new Error(`${no}：tier 必须是 0~5 的整数（0=专项训练，1~5=难度）`);
      const lang = s.lang || 'py';
      if (!['py', 'c', 'drill'].includes(lang)) throw new Error(`${no}：lang 必须是 py / c / drill`);
      return { title, tier, lang, code, hint: String(s.hint || '').slice(0, 120) };
    });
    return { name, desc, snippets };
  }

  async function renderAdmin() {
    renderChips();
    show('screen-admin');
    const list = $('#admin-pack-list');
    list.innerHTML = '<p class="card-sub">加载中…</p>';
    const res = await window.PTAPI.packs();
    list.innerHTML = '';
    if (!res || res.__error) { list.innerHTML = '<p class="card-sub">⚫ 服务不可用</p>'; return; }
    (res.packs || []).forEach(pk => {
      const div = document.createElement('div');
      div.className = 'admin-pack-item' + (editingPackId === pk.id ? ' editing' : '');
      div.innerHTML = `<div class="ap-name">📦 ${esc(pk.name)}</div>
        <div class="ap-meta">${pk.count} 关 · ${esc(pk.desc || '')}</div>`;
      div.onclick = () => { SFX.click(); loadPackIntoEditor(pk.id); };
      list.appendChild(div);
    });
    if (!list.children.length) list.innerHTML = '<p class="card-sub">还没有关卡包——点右上「新建」。</p>';
  }

  async function loadPackIntoEditor(id) {
    const res = await window.PTAPI.pack(id);
    if (!res || res.__error) { adminMsg('载入失败'); return; }
    editingPackId = id;
    $('#admin-editor-title').textContent = `编辑器 · #${id} ${res.name}`;
    $('#admin-name').value = res.name;
    $('#admin-desc').value = res.desc || '';
    // 去掉服务端注入的 id 字段，其余原样回填
    $('#admin-json').value = JSON.stringify(
      res.snippets.map(s => ({ title: s.title, tier: s.tier, lang: s.lang, hint: s.hint || '', code: s.code })),
      null, 2);
    $('#btn-admin-delete').classList.remove('hidden');
    adminMsg(`已载入 ${res.snippets.length} 关，可编辑。`);
    renderAdmin();
  }

  async function savePack() {
    let body;
    try { body = readEditor(); } catch (e) { adminMsg(e.message, true); return; }
    adminMsg('保存中…');
    const res = editingPackId
      ? await window.PTAPI.updatePack(editingPackId, body)
      : await window.PTAPI.createPack(body);
    if (!res) { adminMsg('⚫ 服务不可用', true); return; }
    if (res.__unauth) { adminMsg('登录已过期，请重新登录 xmuoj', true); return; }
    if (res.__error) { adminMsg(`保存失败：${res.__error}`, true); return; }
    if (res.id) editingPackId = res.id;
    adminMsg(`✔ 已发布！学生端刷新地图即可看到「${body.name}」`);
    packDetailCache = {};
    refreshPacks();
    renderAdmin();
  }

  async function deletePack() {
    if (!editingPackId) return;
    if (!confirm('确定删除这个关卡包？学生端将立即看不到它。')) return;
    const res = await window.PTAPI.deletePack(editingPackId);
    if (!res || res.__error) { adminMsg(`删除失败：${res ? res.__error : '离线'}`, true); return; }
    adminMsg('✔ 已删除');
    clearEditor();
    packDetailCache = {};
    refreshPacks();
    renderAdmin();
  }

  // ─────────── 键盘处理 ───────────
  let imeWarnTimer = null;
  function gameActive() { return $('#screen-game').classList.contains('active') && session && !session.done; }

  document.addEventListener('compositionstart', () => {
    if (!gameActive()) return;
    $('#ime-warning').classList.remove('hidden');
    clearTimeout(imeWarnTimer);
    imeWarnTimer = setTimeout(() => $('#ime-warning').classList.add('hidden'), 1800);
  });

  document.addEventListener('keydown', e => {
    // 标题画面：任意键开始
    if ($('#screen-boot').classList.contains('active')) {
      SFX.boot();
      renderMap();
      return;
    }
    // 复盘模式：打完停留在战场，Enter 看结算 / R 重打 / Esc 返回
    if (gameCtx && gameCtx.review && $('#screen-game').classList.contains('active')) {
      if (e.key === 'Enter') { e.preventDefault(); SFX.click(); showResultFromReview(); }
      else if (e.key === 'r' || e.key === 'R') { e.preventDefault(); SFX.click(); retryFromReview(); }
      else if (e.key === 'Escape') { e.preventDefault(); SFX.click(); backFromReview(); }
      return;
    }
    if (!gameActive()) return;
    if (e.isComposing) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    if (e.key === 'Tab') {
      e.preventDefault();
      const n = session.tabFill(Date.now());
      if (n > 0) SFX.key(session.combo);
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (gameCtx.snippet.lane !== 'ft') session.typeChar('\n', Date.now()); // 指法课无换行，Enter 忽略
      return;
    }
    if (e.key === 'Backspace') { e.preventDefault(); session.backspace(Date.now()); return; }
    if (e.key === ' ') { e.preventDefault(); session.typeChar(' ', Date.now()); return; }
    if (e.key.length === 1) { e.preventDefault(); session.typeChar(e.key, Date.now()); }
  });

  // ─────────── 修炼小屋 ───────────
  function renderProfile() {
    renderChips();
    const p = Store.p;
    const lv = Store.levelOf(p.xp);
    const totalStars = Object.values(p.stars).reduce((a, b) => a + b, 0);
    const runs = p.history.length;
    const best = p.history.reduce((m, h) => Math.max(m, h.wpm), 0);
    $('#profile-summary').innerHTML = `
      <div class="ps-item">称号<br><b>${rankTitle()}</b></div>
      <div class="ps-item">总 XP<br><b>${p.xp}</b></div>
      <div class="ps-item">星星<br><b>★ ${totalStars}</b></div>
      <div class="ps-item">修炼次数<br><b>${runs}</b></div>
      <div class="ps-item">最高 WPM<br><b>${best}</b></div>
      <div class="ps-item">连续打卡<br><b>${p.daily.streak} 天</b></div>`;

    // WPM 曲线（最近 40 次）
    const cv = $('#wpm-chart');
    const ctx = cv.getContext('2d');
    ctx.clearRect(0, 0, cv.width, cv.height);
    const hist = p.history.slice(-40);
    if (hist.length) {
      const max = Math.max(...hist.map(h => h.wpm), 10);
      const bw = Math.floor(cv.width / Math.max(hist.length, 10));
      hist.forEach((h, i) => {
        const bh = Math.max(4, (h.wpm / max) * (cv.height - 20));
        ctx.fillStyle = h.wpm >= max * 0.8 ? '#00E436' : h.wpm >= max * 0.5 ? '#29ADFF' : '#83769C';
        ctx.fillRect(i * bw + 2, cv.height - bh, bw - 4, bh);
      });
    } else {
      ctx.fillStyle = '#83769C';
      ctx.font = '14px sans-serif';
      ctx.fillText('还没有修炼记录，去打一关吧！', 20, 60);
    }

    renderHeatmap();
    renderAchvGrid();
    show('screen-profile');
  }

  const KB_ROWS = [
    '1234567890-='.split(''),
    'qwertyuiop[]\\'.split(''),
    "asdfghjkl;'".split(''),
    'zxcvbnm,./'.split(''),
  ];
  function renderHeatmap() {
    const wrap = $('#key-heatmap');
    wrap.innerHTML = '';
    const stats = Store.p.keyStats;
    KB_ROWS.forEach(row => {
      const div = document.createElement('div');
      div.className = 'kb-row';
      row.forEach(ch => {
        const k = document.createElement('div');
        k.className = 'kb-key';
        k.textContent = ch.toUpperCase();
        const s = stats[ch];
        if (s && (s.err + s.ok) >= 2) {
          const rate = s.err / (s.err + s.ok);
          // 0% → 正常深色；越高越红
          const r = Math.min(255, Math.round(80 + rate * 700));
          const gb = Math.max(0, 120 - Math.round(rate * 400));
          k.style.background = `rgb(${r},${gb},${gb})`;
          k.title = `${ch}: 错误率 ${(rate * 100).toFixed(0)}% · 平均 ${Math.round(s.ok ? s.totalMs / s.ok : 0)}ms`;
        }
        div.appendChild(k);
      });
      wrap.appendChild(div);
    });
  }

  function renderAchvGrid() {
    const grid = $('#achv-grid');
    grid.innerHTML = '';
    window.FLAVOR.achievements.forEach(a => {
      const got = Store.p.achievements.includes(a.id);
      const div = document.createElement('div');
      div.className = 'achv-item ' + (got ? 'unlocked' : 'locked');
      div.innerHTML = `<div class="a-name">${got ? '🏅' : '🔒'} ${a.name}</div><div class="a-desc">${a.desc}</div>`;
      grid.appendChild(div);
    });
  }

  // ─────────── 事件绑定 ───────────
  function bind() {
    $('#screen-boot').addEventListener('click', () => { SFX.boot(); renderMap(); });
    $('#btn-goto-daily').onclick = () => { SFX.click(); startDaily(); };
    $('#btn-goto-drills').onclick = () => { SFX.click(); renderStage(0); };
    $('#btn-goto-profile').onclick = () => { SFX.click(); renderProfile(); };
    $('#btn-goto-board').onclick = () => { SFX.click(); renderBoard(); };
    $('#btn-board-back').onclick = () => { SFX.click(); renderMap(); };
    $('#tab-board-overall').onclick = () => { SFX.click(); boardMode = 'overall'; renderBoard(); };
    $('#tab-board-snippet').onclick = () => { SFX.click(); boardMode = 'snippet'; renderBoard(); };
    $('#board-snippet-select').onchange = () => renderBoard();
    $('#btn-goto-admin').onclick = () => { SFX.click(); clearEditor(); renderAdmin(); };
    $('#btn-admin-back').onclick = () => { SFX.click(); renderMap(); };
    $('#btn-admin-new').onclick = () => { SFX.click(); clearEditor(); };
    $('#btn-admin-validate').onclick = () => {
      SFX.click();
      try { const b = readEditor(); adminMsg(`✔ 校验通过：${b.snippets.length} 关，共 ${b.snippets.reduce((n, s) => n + s.code.length, 0)} 字符`); }
      catch (e) { adminMsg(e.message, true); }
    };
    $('#btn-admin-save').onclick = () => { SFX.click(); savePack(); };
    $('#btn-admin-delete').onclick = () => { SFX.click(); deletePack(); };
    $('#oj-chip').onclick = () => {
      if (oj.moved) { location.reload(); return; }   // 旧域名页面：刷新即回到 apex
      if (!oj.logged_in) window.open('/', '_blank', 'noopener');
    };
    document.addEventListener('visibilitychange', () => { if (!document.hidden) recheckLogin(); });
    window.addEventListener('focus', recheckLogin);
    $('#btn-stage-back').onclick = () => { SFX.click(); renderMap(); };
    $('#btn-profile-back').onclick = () => { SFX.click(); renderMap(); };
    $('#btn-result-map').onclick = () => { SFX.click(); renderMap(); };
    $('#btn-quit-level').onclick = () => {
      SFX.click();
      if (gameCtx) clearInterval(gameCtx.timerId);
      session = null;
      if (gameCtx) gameCtx.review = false;
      if (curPack && curStageTier === -1) renderPack(curPack);
      else if (curStageTier === -2) renderDojo();
      else if (curStageTier === -3) renderLlm();
      else renderStage(curStageTier);
    };
    $('#btn-review-result').onclick = () => { SFX.click(); showResultFromReview(); };
    $('#btn-review-retry').onclick = () => { SFX.click(); retryFromReview(); };
    $('#btn-review-back').onclick = () => { SFX.click(); backFromReview(); };
    $('#btn-font-inc').onclick = () => adjustFont(2);
    $('#btn-font-dec').onclick = () => adjustFont(-2);
    $('#btn-sound').onclick = function () {
      const on = SFX.toggle();
      Store.p.settings.sound = on; Store.save();
      this.textContent = `音效:${on ? '开' : '关'}`;
      if (on) SFX.click();
    };
    $('#btn-retry').onclick = () => {
      SFX.click();
      startLevel(gameCtx.snippet, {
        boss: gameCtx.boss, daily: gameCtx.daily,
        pack: gameCtx.pack, list: gameCtx.list,
      });
    };
    $('#btn-next').onclick = () => {
      SFX.click();
      const ordered = gameCtx.list || [];
      const next = ordered[ordered.findIndex(s => s.id === gameCtx.snippet.id) + 1];
      if (!next) return;
      const boss = gameCtx.pack ? null : (next.tier > 0 ? bossOf(next.tier, langOf(next)) : null);
      startLevel(next, {
        boss: !!(boss && next.id === boss.id),
        pack: gameCtx.pack, list: gameCtx.list,
      });
    };
  }

  // ─────────── 启动 ───────────
  function boot() {
    $('#boot-story').textContent = window.FLAVOR.story || '';
    const tips = window.FLAVOR.tips || [];
    let ti = 0;
    const tipEl = $('#boot-tip');
    tipEl.textContent = `💡 ${tips[0] || ''}`;
    setInterval(() => {
      if (!$('#screen-boot').classList.contains('active')) return;
      ti = (ti + 1) % tips.length;
      tipEl.textContent = `💡 ${tips[ti]}`;
    }, 3500);
    PixelArt.drawPair($('#logo-heroes'), 'hero', 0, 'vera', 0);
    if (!Store.p.settings.sound) { SFX.toggle(); $('#btn-sound').textContent = '音效:关'; }
    bind();
    initOnline(); // 异步探测在线状态：离线自动降级本地模式
    applyHash();  // 导读页跳进来的深链接（#llm/讲/关）
    window.addEventListener('hashchange', applyHash);
    // 双勇者待机眨眼：勇者每 900ms 随机笑一下，薇拉偶尔跟一下
    setInterval(() => {
      if ($('#screen-boot').classList.contains('active')) {
        PixelArt.drawPair($('#logo-heroes'), 'hero', Math.random() < 0.3 ? 1 : 0,
          'vera', Math.random() < 0.2 ? 1 : 0);
      }
    }, 900);
  }

  document.addEventListener('DOMContentLoaded', boot);
})();
