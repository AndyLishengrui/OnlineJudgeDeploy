/* ═══════════════════════════════════════════════════
   PixelTyper — localStorage 档案系统
   ═══════════════════════════════════════════════════ */
(function () {
  'use strict';

  const KEY = 'pixeltyper.profile.v1';

  const DEFAULTS = () => ({
    xp: 0,
    stars: {},          // snippetId -> 0..3（历史最高）
    best: {},           // snippetId -> {wpm, acc, attempts, clears, bestAcc, last}（每一关的战绩）
    bestMigrated: false,// 老档案从 stars/history 回填过没有
    bossKills: {},      // tier -> true
    achievements: [],   // 成就 id 列表
    keyStats: {},       // char -> {err: n, ok: n, totalMs: ms}
    history: [],        // {id, wpm, acc, ts（当地时间戳）}
    daily: { lastDay: '', streak: 0 },
    settings: { sound: true, fontCode: 22, fontFt: 30 },
    firstRunDone: false,
  });

  let profile = null;

  function load() {
    if (profile) return profile;
    try {
      const raw = localStorage.getItem(KEY);
      profile = raw ? Object.assign(DEFAULTS(), JSON.parse(raw)) : DEFAULTS();
    } catch (e) {
      profile = DEFAULTS();
    }
    migrateBest();
    return profile;
  }

  /** 老档案一次性回填：stars 是「通关过」的硬证据，history 里每一笔都是当时达标的局
      （只在 passed 时写历史），所以最快那笔就是「最快的一次通关」。
      只做一次，之后由 recordRun 增量维护。（history 只留最近 200 条，回填可能不全。） */
  function migrateBest() {
    if (profile.bestMigrated) return;
    const p = profile;
    p.best = p.best || {};
    const runs = {};
    for (const h of p.history || []) {
      if (!h || !h.id) continue;
      runs[h.id] = (runs[h.id] || 0) + 1;
    }
    const ids = new Set([...Object.keys(p.stars || {}), ...Object.keys(runs)]);
    for (const id of ids) {
      const st = p.stars[id] || 0;
      if (!st && !runs[id]) continue;
      const b = p.best[id] || { wpm: 0, acc: 0, attempts: 0, clears: 0, bestAcc: 0, last: '' };
      b.clears = Math.max(b.clears, runs[id] || 0, st > 0 ? 1 : 0);
      b.attempts = Math.max(b.attempts, runs[id] || 0, st > 0 ? 1 : 0);
      p.best[id] = b;
    }
    for (const h of p.history || []) {
      if (!h || !h.id) continue;
      const b = p.best[h.id];
      if (h.acc > b.bestAcc) b.bestAcc = h.acc;
      if (h.wpm > b.wpm) { b.wpm = h.wpm; b.acc = h.acc; }  // 速度与准确率同取一笔，别拼
      if (h.ts) b.last = h.ts;   // history 按追加顺序，最后一条就是最近一次
    }
    p.bestMigrated = true;
    save();
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(profile)); } catch (e) { /* 隐私模式 */ }
  }

  function addXp(n) { profile.xp += Math.round(n); save(); }

  /** 玩家等级：每级所需 XP 递增，12 级封顶称号 */
  function levelOf(xp) {
    // 累计门槛：0,100,250,450,700,1000,1400,1900,2500,3200,4000,5000
    const gates = [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000, 5000];
    let lv = 1;
    for (let i = 0; i < gates.length; i++) if (xp >= gates[i]) lv = i + 1;
    const cur = gates[lv - 1];
    const next = lv < gates.length ? gates[lv] : null;
    return { level: lv, curBase: cur, next, progress: next ? (xp - cur) / (next - cur) : 1 };
  }

  function recordStars(id, stars) {
    const prev = profile.stars[id] || 0;
    if (stars > prev) { profile.stars[id] = stars; save(); }
    return Math.max(prev, stars);
  }

  /** 每局结束都记一笔（含没达标的）：
      attempts 每次 +1；wpm/acc 取「最快的一次通关」整局照抄（不各取最大值，
      否则会把最快那局的速度和最准那局的准确率拼成一个不可能的组合）；
      bestAcc 单独记「见过的最高准确率」，给没通过的人看差多少；
      clears 只数真正达标的局。 */
  function recordRun(id, run) {
    const b = profile.best[id] ||
      { wpm: 0, acc: 0, attempts: 0, clears: 0, bestAcc: 0, last: '' };
    b.attempts += 1;
    if (run.completed) {
      if (run.acc > b.bestAcc) b.bestAcc = run.acc;
      if (run.stars > 0) {
        b.clears += 1;
        if (run.wpm > b.wpm) { b.wpm = Math.round(run.wpm); b.acc = run.acc; }
      }
    }
    if (run.ts) b.last = run.ts;
    profile.best[id] = b;
    save();
    return b;
  }

  function bestOf(id) { return profile.best[id] || null; }

  function recordKeyStats(perKey) {
    for (const [ch, s] of Object.entries(perKey)) {
      const k = profile.keyStats[ch] || { err: 0, ok: 0, totalMs: 0 };
      k.err += s.err; k.ok += s.ok; k.totalMs += s.totalMs;
      profile.keyStats[ch] = k;
    }
    save();
  }

  function pushHistory(entry) {
    profile.history.push(entry);
    if (profile.history.length > 200) profile.history = profile.history.slice(-200);
    save();
  }

  function unlockAchv(id) {
    if (profile.achievements.includes(id)) return false;
    profile.achievements.push(id); save();
    return true; // 新解锁
  }

  /** 薄弱按键：按错误率排序取前 5（至少 3 次击键才统计） */
  function weakKeys() {
    return Object.entries(profile.keyStats)
      .map(([ch, s]) => {
        const total = s.err + s.ok;
        return { ch, errRate: total ? s.err / total : 0, avgMs: s.ok ? s.totalMs / s.ok : 0, total };
      })
      .filter(k => k.total >= 3 && k.errRate > 0.05)
      .sort((a, b) => b.errRate - a.errRate)
      .slice(0, 5);
  }

  window.Store = {
    load, save, addXp, levelOf, recordStars, recordRun, bestOf, recordKeyStats,
    pushHistory, unlockAchv, weakKeys,
    get p() { return load(); },
  };
})();
