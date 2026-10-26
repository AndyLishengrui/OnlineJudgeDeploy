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
  };

  class TypingSession {
    /**
     * @param {string} code 练习代码原文
     * @param {(ev:object)=>void} onEvent 回调：{type:'char'|'backspace'|'done'|'tick', ...}
     */
    constructor(code, onEvent) {
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
    }

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
