/* ═══════════════════════════════════════════════════
   PixelTyper — 打字会话引擎（无 DOM，可独立测试）

   规则：
   - 逐字符对照 snippet.code；敲对标记 ok，敲错标记 bad（可继续，准确率受损）
   - Backspace 回退一个字符（允许跨行，回到上一个已敲位置）
   - Tab：若光标后紧跟的是行首缩进空白，自动补齐整段缩进
   - 完成条件：光标到达末尾
   ═══════════════════════════════════════════════════ */
(function () {
  'use strict';

  // 星级阈值（按 tier）：{wpm3, acc3, wpm2, acc2}
  const STAR_GATES = {
    0: { wpm3: 38, acc3: 0.96, wpm2: 26, acc2: 0.90 },  // 专项（短句爆发，门槛与 tier3 对齐）
    1: { wpm3: 42, acc3: 0.97, wpm2: 28, acc2: 0.90 },
    2: { wpm3: 40, acc3: 0.97, wpm2: 27, acc2: 0.90 },
    3: { wpm3: 38, acc3: 0.96, wpm2: 26, acc2: 0.90 },
    4: { wpm3: 36, acc3: 0.96, wpm2: 25, acc2: 0.88 },
    5: { wpm3: 34, acc3: 0.95, wpm2: 24, acc2: 0.88 },
    6: { wpm3: 32, acc3: 0.95, wpm2: 23, acc2: 0.87 },  // 面向对象（代码更长，门槛略降）
  };

  // 中文字符（含中文注释、中文串、全角标点、破折号/省略号/中文引号）无法用键盘直接敲，
  // 这类位置在打字时自动跳过：不计击键、不计准确率，也不要求输入。
  const AUTO_RE = /[\u00B7\u2000-\u206F\u2E80-\u2FFF\u3000-\u303F\u3040-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF]/;
  const isAutoChar = ch => AUTO_RE.test(ch);

  class TypingSession {
    /**
     * @param {string} code 练习代码原文
     * @param {(ev:object)=>void} onEvent 回调：{type:'char'|'backspace'|'done'|'tick', ...}
     */
    constructor(code, onEvent, opts) {
      // 统一换行符，去掉行尾空白，收尾恰好一个换行都不要（最后一行后无换行）
      this.code = code.replace(/\r\n?/g, '\n').replace(/[ \t]+$/gm, '');
      this.chars = [...this.code];
      this.cursor = 0;
      this.states = new Array(this.chars.length).fill(null);    // 'ok' | 'bad' | null
      this.physical = new Array(this.chars.length).fill(false); // 亲手敲过且未被退格的位置
      this.counted = new Array(this.chars.length).fill(false);  // 历史上首次到访（perKey 只计首次，防稀释）
      this.keystrokes = 0;
      this.errors = 0;
      this.combo = 0;
      this.maxCombo = 0;
      this.startedAt = null;   // ms
      this.finishedAt = null;
      this.lastKeyAt = null;
      this.perKey = {};        // expectedChar -> {err, ok, totalMs}
      this.onEvent = onEvent || (() => {});
      this.done = false;
      // 中文（注释/字符串/全角标点）自动跳过：auto[i] = true 表示这一位不需要敲
      this.auto = this.chars.map(isAutoChar);
      // 注释与文档字符串整段跳过（含 # 与三引号本身）：只练真正要写的代码
      this.commentStyle = (opts && opts.commentStyle) || 'python';
      this._scanComments();
      this._skipAuto();
      if (this.cursor >= this.chars.length) { this.done = true; this.finishedAt = Date.now(); }
    }

    /** 注释 / 文档字符串整段标成 auto（含 # 与三引号），字符串里的 # 不算注释 */
    _scanComments() {
      const s = this.chars, n = s.length, auto = this.auto;
      const py = this.commentStyle === 'python';
      const cpp = this.commentStyle === 'cpp';
      let i = 0;
      while (i < n) {
        const c = s[i];
        if (py && c === '#') {
          while (i < n && s[i] !== '\n') auto[i++] = true;
          continue;
        }
        if (cpp && c === '/' && s[i + 1] === '/') {
          while (i < n && s[i] !== '\n') auto[i++] = true;
          continue;
        }
        if (cpp && c === '/' && s[i + 1] === '*') {
          auto[i++] = true; auto[i++] = true;
          while (i < n && !(s[i] === '*' && s[i + 1] === '/')) auto[i++] = true;
          if (i < n) { auto[i++] = true; auto[i++] = true; }
          continue;
        }
        // 三引号文档字符串（Python）
        if (py && (c === '"' || c === "'") && s[i + 1] === c && s[i + 2] === c) {
          const q = c;
          let j = i + 3;
          while (j < n && !(s[j] === q && s[j + 1] === q && s[j + 2] === q)) j++;
          const end = Math.min(n, j + 3);
          for (let k = i; k < end; k++) auto[k] = true;
          i = end;
          continue;
        }
        // 普通字符串：整段跳过（防止串内的 # 或 // 被当注释）
        if (c === '"' || c === "'") {
          let j = i + 1;
          while (j < n && s[j] !== c && s[j] !== '\n') { if (s[j] === '\\') j++; j++; }
          i = (j < n && s[j] === c) ? j + 1 : j;
          continue;
        }
        i++;
      }
      // 整行都在注释/文档字符串里 → 行尾换行也不用敲
      let lineStart = 0;
      for (let k = 0; k <= n; k++) {
        if (k === n || s[k] === '\n') {
          let allAuto = true;
          for (let m = lineStart; m < k; m++) { if (!auto[m]) { allAuto = false; break; } }
          if (allAuto && k < n) auto[k] = true;
          lineStart = k + 1;
        }
      }
    }

    /** 把光标推过连续的中文字符（不计数、不计击键） */
    _skipAuto() {
      while (this.cursor < this.chars.length && this.auto[this.cursor]) {
        if (this.states[this.cursor] === null) this.states[this.cursor] = 'auto';
        this.cursor++;
      }
    }

    static isAutoChar(ch) { return isAutoChar(ch); }

    get expected() { return this.chars[this.cursor]; }
    get totalChars() { return this.chars.length; }
    get typedCount() { return this.cursor; }
    get progress() { return this.chars.length ? this.cursor / this.chars.length : 1; }

    elapsedMs(now) {
      if (!this.startedAt) return 0;
      return (this.finishedAt || now) - this.startedAt;
    }

    correctPositions() { return this.states.reduce((n, s) => n + (s === 'ok' ? 1 : 0), 0); }

    /**
     * 准确率（位置口径，防刷）：当前亲手敲过的位置中，仍保持正确的比例。
     * 退格会摘掉 physical 标记，重打正确可修回准确率——但每处错误都花费时间，
     * 所以速度门槛自然惩罚粗心；反复重打已 ok 的位置对 acc 毫无影响（无法注水）。
     */
    accuracy() {
      let typed = 0, ok = 0;
      for (let i = 0; i < this.chars.length; i++) {
        if (this.physical[i]) { typed++; if (this.states[i] === 'ok') ok++; }
      }
      return typed === 0 ? 1 : ok / typed;
    }

    liveStats(now) {
      const mins = this.elapsedMs(now) / 60000;
      const wpm = mins > 0 ? Math.round((this.correctPositions() / 5) / mins) : 0;
      return { wpm, acc: this.accuracy(), combo: this.combo, progress: this.progress };
    }

    _keyRecord(ch, isErr, latencyMs) {
      const k = this.perKey[ch] || { err: 0, ok: 0, totalMs: 0 };
      if (isErr) k.err++; else { k.ok++; k.totalMs += latencyMs; }
      this.perKey[ch] = k;
    }

    _startIfNeeded(now) {
      if (!this.startedAt) { this.startedAt = now; this.lastKeyAt = now; }
    }

    /** 敲入一个可打印字符或 '\n'。返回 'ok'|'bad'|'ignored'|'done' */
    typeChar(c, now) {
      if (this.done || this.cursor >= this.chars.length) return 'ignored';
      this._startIfNeeded(now);
      const expected = this.expected;
      const latency = now - this.lastKeyAt;
      this.lastKeyAt = now;
      this.keystrokes++;

      const ok = c === expected;
      this.states[this.cursor] = ok ? 'ok' : 'bad';
      this.physical[this.cursor] = true;
      if (ok) {
        this.combo++;
        this.maxCombo = Math.max(this.maxCombo, this.combo);
      } else {
        this.errors++;
        this.combo = 0;
      }
      // perKey 只统计每个位置的首次到访，防止「退格重打」稀释弱键数据
      if (!this.counted[this.cursor]) {
        this.counted[this.cursor] = true;
        this._keyRecord(expected, !ok, latency);
      }
      this.cursor++;
      this.onEvent({ type: 'char', ok, expected, got: c, newline: expected === '\n' });
      this._skipAuto();

      if (this.cursor >= this.chars.length) {
        this.done = true;
        this.finishedAt = now;
        this.onEvent({ type: 'done', stats: this.finalStats() });
        return 'done';
      }
      return ok ? 'ok' : 'bad';
    }

    /** Tab：补齐当前位置开始的连续空白（用于行首缩进）。自动填充不计任何击键统计。返回补齐的字符数 */
    tabFill(now) {
      if (this.done) return 0;
      // 仅当光标前是本行开头或光标前全是空白时允许（防止跳关）
      let lineStart = this.cursor;
      while (lineStart > 0 && this.chars[lineStart - 1] !== '\n') lineStart--;
      const beforeCursor = this.chars.slice(lineStart, this.cursor);
      const onlyWsBefore = beforeCursor.every(ch => ch === ' ' || ch === '\t');
      if (!onlyWsBefore) return 0;
      let n = 0;
      while (this.cursor < this.chars.length &&
             (this.expected === ' ' || this.expected === '\t')) {
        // 直接落位，不走 typeChar：不计 keystrokes / combo / perKey（统计中性）
        this.states[this.cursor] = 'ok';
        const exp = this.expected;
        this.cursor++;
        n++;
        this.onEvent({ type: 'char', ok: true, expected: exp, got: exp, newline: false, tabbed: true });
        this._skipAuto();
        if (this.cursor >= this.chars.length) {
          this.done = true;
          this.finishedAt = now;
          this.onEvent({ type: 'done', stats: this.finalStats() });
          break;
        }
      }
      return n;
    }

    /** 退格：回退一个字符（可跨行）。返回是否成功 */
    backspace(now) {
      if (this.done || this.cursor <= 0) return false;
      this.cursor--;
      // 退格落点若是中文自动位，继续往前退到上一个真正敲过的字符
      while (this.cursor > 0 && this.auto[this.cursor]) this.cursor--;
      this.states[this.cursor] = null;
      this.physical[this.cursor] = false;
      this.lastKeyAt = now;
      this.onEvent({ type: 'backspace', cursor: this.cursor });
      return true;
    }

    finalStats() {
      const now = this.finishedAt || Date.now(); // 失败结算时 finishedAt 为空，不能取 0（会算出天文负耗时）
      const mins = this.elapsedMs(now) / 60000;
      const correct = this.correctPositions();
      const wpm = mins > 0 ? Math.round((correct / 5) / mins) : 0;
      const cpm = mins > 0 ? Math.round(correct / mins) : 0;
      return {
        wpm, cpm,
        correct,               // 正确字符数（上传成绩时服务端按它复核 wpm）
        acc: this.accuracy(),
        errors: this.errors,
        keystrokes: this.keystrokes,
        maxCombo: this.maxCombo,
        ms: this.elapsedMs(now),
        perKey: this.perKey,
      };
    }

    /** 按 tier 评星 1~3（0 = 不合格，需重打：准确率过低） */
    static starsFor(stats, tier) {
      const g = STAR_GATES[tier] || STAR_GATES[1];
      if (stats.acc < 0.80) return 0;
      if (stats.wpm >= g.wpm3 && stats.acc >= g.acc3) return 3;
      if (stats.wpm >= g.wpm2 && stats.acc >= g.acc2) return 2;
      return 1;
    }
  }

  window.TypingSession = TypingSession;
})();
