/* ═══════════════════════════════════════════════════
   PixelTyper — 在线 API 客户端（排行榜 + 自定义关卡）
   同源部署：页面在 /PixelTyper/，API 在 /PixelTyper/api/
   任何失败一律返回 null → 前端自动降级为纯本地模式
   ═══════════════════════════════════════════════════ */
(function () {
  'use strict';

  const BASE = 'api';           // 相对页面路径，线上 = /PixelTyper/api
  const TIMEOUT = 6000;

  async function req(path, opts) {
    opts = opts || {};
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT);
    try {
      const resp = await fetch(`${BASE}/${path}`, {
        method: opts.method || 'GET',
        credentials: 'same-origin',          // 带 OJ sessionid
        signal: ctrl.signal,
        headers: opts.body
          ? { 'Content-Type': 'application/json', 'X-PT-Client': 'pixeltyper' }
          : {},
        body: opts.body ? JSON.stringify(opts.body) : undefined,
      });
      // 域名迁移守卫：请求被 301 到别的域名（www → apex）时，浏览器跟随后就变成跨域，
      // cookie 不会再带、响应也过不了 CORS —— 与其伪装成「离线」，不如让上层提示刷新。
      if (resp.redirected) {
        try {
          if (new URL(resp.url).origin !== location.origin) return { __moved: true };
        } catch (e) { /* 解析失败就按正常流程走 */ }
      }
      if (resp.status === 401) return { __unauth: true };
      const data = await resp.json().catch(() => null);
      if (!resp.ok) {
        const d = data && (data.error || data.detail);
        const msg = typeof d === 'string' ? d
          : Array.isArray(d) ? d.map(x => (x && x.msg) || JSON.stringify(x)).join('; ')
          : `HTTP ${resp.status}`;
        return { __error: msg, __status: resp.status };
      }
      return data;
    } catch (e) {
      // 跨域重定向会被浏览器直接抛 TypeError，跟「真的离线」分不出来；
      // 用 hostname 兜底（正常情况下 index.html 的守卫已经把 www 页面带走，这是双保险）。
      if (location.hostname === 'www.xmuoj.com') return { __moved: true };
      return null;                            // 离线 / 无后端 → 本地模式
    } finally {
      clearTimeout(timer);
    }
  }

  window.PTAPI = {
    /** {logged_in, user:{id,username,name}, admin} 或 {logged_in:false} 或 null(离线) */
    me: () => req('me'),

    /** 本账号在服务器上的全部最佳成绩：{ok,user_id,count,xp,scores:{id:{stars,wpm,acc,ms,chars,updated_at}}}
        未登录 → {__unauth}；后端还没更新 → {__error:'HTTP 404'} */
    myScores: () => req('my-scores'),

    /** 上传通关成绩；返回 {ok, improved, best} / {__unauth} / {__error} / null */
    submitScore: s => req('scores', { method: 'POST', body: s }),

    /** 总榜 {rows:[{username,name,stars,xp,clears,avg_acc}], me} */
    boardOverall: () => req('leaderboard/overall'),

    /** 单关榜 {rows:[{username,name,stars,wpm,acc,ms}]} */
    boardSnippet: id => req(`leaderboard/snippet/${encodeURIComponent(id)}`),

    /** 关卡包列表 {packs:[{id,name,desc,count,updated_at}]} */
    packs: () => req('packs'),
    /** 关卡包详情（含 snippets，每项带稳定 id） */
    pack: id => req(`packs/${id}`),

    /** 管理端（需 OJ 管理员会话） */
    createPack: p => req('packs', { method: 'POST', body: p }),
    updatePack: (id, p) => req(`packs/${id}`, { method: 'PUT', body: p }),
    deletePack: id => req(`packs/${id}`, { method: 'DELETE' }),
  };
})();
