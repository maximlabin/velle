// webpack module 2161 from _app
(function (t, e, n) {
    "use strict";
    n.d(e, { A4: function () { return T; }, G9: function () { return S; }, Gh: function () { return O; }, I6: function () { return l; }, Kp: function () { return a; }, PN: function () { return o; }, Rm: function () { return f; }, SE: function () { return s; }, VS: function () { return g; }, X7: function () { return h; }, ZT: function () { return i; }, _v: function () { return u; }, _x: function () { return d; }, lV: function () { return c; }, oE: function () { return q; }, sk: function () { return r; }, to: function () { return y; }, yF: function () { return p; } });
    const r = "undefined" === typeof window || "Deno" in window;
    function i() { }
    function s(t, e) { return "function" === typeof t ? t(e) : t; }
    function o(t) { return "number" === typeof t && t >= 0 && t !== 1 / 0; }
    function a(t, e) { return Math.max(t + (e || 0) - Date.now(), 0); }
    function u(t, e, n) { return C(t) ? "function" === typeof e ? { ...n, queryKey: t, queryFn: e } : { ...e, queryKey: t } : t; }
    function c(t, e, n) { return C(t) ? "function" === typeof e ? { ...n, mutationKey: t, mutationFn: e } : { ...e, mutationKey: t } : "function" === typeof t ? { ...e, mutationFn: t } : { ...t }; }
    function l(t, e, n) { return C(t) ? [{ ...e, queryKey: t }, n] : [t || {}, e]; }
    function d(t, e) { const { type: n = "all", exact: r, fetchStatus: i, predicate: s, queryKey: o, stale: a } = t; if (C(o))
        if (r) {
            if (e.queryHash !== f(o, e.options))
                return !1;
        }
        else if (!y(e.queryKey, o))
            return !1; if ("all" !== n) {
        const t = e.isActive();
        if ("active" === n && !t)
            return !1;
        if ("inactive" === n && t)
            return !1;
    } return ("boolean" !== typeof a || e.isStale() === a) && (("undefined" === typeof i || i === e.state.fetchStatus) && !(s && !s(e))); }
    function h(t, e) { const { exact: n, fetching: r, predicate: i, mutationKey: s } = t; if (C(s)) {
        if (!e.options.mutationKey)
            return !1;
        if (n) {
            if (p(e.options.mutationKey) !== p(s))
                return !1;
        }
        else if (!y(e.options.mutationKey, s))
            return !1;
    } return ("boolean" !== typeof r || "loading" === e.state.status === r) && !(i && !i(e)); }
    function f(t, e) { return ((null == e ? void 0 : e.queryKeyHashFn) || p)(t); }
    function p(t) { return JSON.stringify(t, ((t, e) => w(e) ? Object.keys(e).sort().reduce(((t, n) => (t[n] = e[n], t)), {}) : e)); }
    function y(t, e) { return v(t, e); }
    function v(t, e) { return t === e || typeof t === typeof e && (!(!t || !e || "object" !== typeof t || "object" !== typeof e) && !Object.keys(e).some((n => !v(t[n], e[n])))); }
    function m(t, e) { if (t === e)
        return t; const n = b(t) && b(e); if (n || w(t) && w(e)) {
        const r = n ? t.length : Object.keys(t).length, i = n ? e : Object.keys(e), s = i.length, o = n ? [] : {};
        let a = 0;
        for (let u = 0; u < s; u++) {
            const r = n ? u : i[u];
            o[r] = m(t[r], e[r]), o[r] === t[r] && a++;
        }
        return r === s && a === r ? t : o;
    } return e; }
    function g(t, e) { if (t && !e || e && !t)
        return !1; for (const n in t)
        if (t[n] !== e[n])
            return !1; return !0; }
    function b(t) { return Array.isArray(t) && t.length === Object.keys(t).length; }
    function w(t) { if (!E(t))
        return !1; const e = t.constructor; if ("undefined" === typeof e)
        return !0; const n = e.prototype; return !!E(n) && !!n.hasOwnProperty("isPrototypeOf"); }
    function E(t) { return "[object Object]" === Object.prototype.toString.call(t); }
    function C(t) { return Array.isArray(t); }
    function O(t) { return new Promise((e => { setTimeout(e, t); })); }
    function T(t) { O(0).then(t); }
    function S() { if ("function" === typeof AbortController)
        return new AbortController; }
    function q(t, e, n) { return null != n.isDataEqual && n.isDataEqual(t, e) ? t : "function" === typeof n.structuralSharing ? n.structuralSharing(t, e) : !1 !== n.structuralSharing ? m(t, e) : e; }
});
