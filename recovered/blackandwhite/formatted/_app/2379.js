// webpack module 2379 from _app
(function (t, e, n) {
    "use strict";
    n.d(e, { DV: function () { return c; }, Kw: function () { return a; }, Mz: function () { return l; } });
    var r = n(5761), i = n(6474), s = n(2161);
    function o(t) { return Math.min(1e3 * 2 ** t, 3e4); }
    function a(t) { return "online" !== (null != t ? t : "online") || i.N.isOnline(); }
    class u {
        constructor(t) { this.revert = null == t ? void 0 : t.revert, this.silent = null == t ? void 0 : t.silent; }
    }
    function c(t) { return t instanceof u; }
    function l(t) { let e, n, c, l = !1, d = 0, h = !1; const f = new Promise(((t, e) => { n = t, c = e; })), p = () => !r.j.isFocused() || "always" !== t.networkMode && !i.N.isOnline(), y = r => { h || (h = !0, null == t.onSuccess || t.onSuccess(r), null == e || e(), n(r)); }, v = n => { h || (h = !0, null == t.onError || t.onError(n), null == e || e(), c(n)); }, m = () => new Promise((n => { e = t => { const e = h || !p(); return e && n(t), e; }, null == t.onPause || t.onPause(); })).then((() => { e = void 0, h || null == t.onContinue || t.onContinue(); })), g = () => { if (h)
        return; let e; try {
        e = t.fn();
    }
    catch (n) {
        e = Promise.reject(n);
    } Promise.resolve(e).then(y).catch((e => { var n, r; if (h)
        return; const i = null != (n = t.retry) ? n : 3, a = null != (r = t.retryDelay) ? r : o, u = "function" === typeof a ? a(d, e) : a, c = !0 === i || "number" === typeof i && d < i || "function" === typeof i && i(d, e); !l && c ? (d++, null == t.onFail || t.onFail(d, e), (0, s.Gh)(u).then((() => { if (p())
        return m(); })).then((() => { l ? v(e) : g(); }))) : v(e); })); }; return a(t.networkMode) ? g() : m().then(g), { promise: f, cancel: e => { h || (v(new u(e)), null == t.abort || t.abort()); }, continue: () => (null == e ? void 0 : e()) ? f : Promise.resolve(), cancelRetry: () => { l = !0; }, continueRetry: () => { l = !1; } }; }
});
