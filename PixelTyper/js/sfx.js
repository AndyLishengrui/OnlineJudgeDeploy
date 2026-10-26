/* ═══════════════════════════════════════════════════
   PixelTyper — WebAudio 8-bit 合成音效（无音频文件）
   ═══════════════════════════════════════════════════ */
(function () {
  'use strict';

  let ctx = null;
  let enabled = true;

  function ac() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  /** 基础方波哔声 */
  function beep(freq, dur, type, vol, when) {
    if (!enabled) return;
    try {
      const a = ac();
      const t = a.currentTime + (when || 0);
      const osc = a.createOscillator();
      const gain = a.createGain();
      osc.type = type || 'square';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(vol || 0.06, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(gain).connect(a.destination);
      osc.start(t);
      osc.stop(t + dur + 0.02);
    } catch (e) { /* 音频不可用时静默 */ }
  }

  // 连击越高音调越高（上限）
  function keyPitch(combo) {
    const base = 880;
    return Math.min(base + combo * 12, 1600);
  }

  window.SFX = {
    get enabled() { return enabled; },
    toggle() { enabled = !enabled; return enabled; },

    key(combo) { beep(keyPitch(combo || 0), 0.05, 'square', 0.045); },
    error() { beep(140, 0.18, 'sawtooth', 0.08); beep(90, 0.22, 'sawtooth', 0.07, 0.05); },
    backspace() { beep(440, 0.04, 'square', 0.03); },
    newline() { beep(660, 0.05, 'square', 0.04); beep(990, 0.06, 'square', 0.035, 0.05); },
    bossHit() { beep(220, 0.08, 'sawtooth', 0.06); },
    playerHurt() { beep(180, 0.15, 'sawtooth', 0.09); beep(120, 0.2, 'sawtooth', 0.08, 0.06); },

    // 过关小号角：上行琶音
    victory() {
      [523, 659, 784, 1047, 1319].forEach((f, i) => beep(f, 0.16, 'square', 0.07, i * 0.09));
    },
    // 失败下行
    defeat() {
      [392, 330, 262, 196].forEach((f, i) => beep(f, 0.22, 'square', 0.07, i * 0.14));
    },
    // 升级
    levelUp() {
      [523, 784, 1047, 1568].forEach((f, i) => beep(f, 0.12, 'triangle', 0.09, i * 0.07));
    },
    // 成就
    achieve() { beep(1047, 0.1, 'square', 0.07); beep(1568, 0.18, 'square', 0.07, 0.1); },
    // UI 点击
    click() { beep(1200, 0.04, 'square', 0.035); },
    // 开机
    boot() {
      [262, 523, 1047].forEach((f, i) => beep(f, 0.12, 'square', 0.05, i * 0.1));
    },
  };
})();
