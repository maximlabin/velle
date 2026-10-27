// webpack module 3579 from chunk-947
(function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.default = function (e, t) { let n = o.default, a = (null == t ? void 0 : t.suspense) ? {} : { loading: e => { let { error: t, isLoading: n, pastDelay: r } = e; return null; } }; e instanceof Promise ? a.loader = () => e : "function" === typeof e ? a.loader = e : "object" === typeof e && (a = r({}, a, e)); a = r({}, a, t), !1; a.suspense && (delete a.ssr, delete a.loading); a.loadableGenerated && (a = r({}, a, a.loadableGenerated), delete a.loadableGenerated); if ("boolean" === typeof a.ssr && !a.suspense) {
        if (!a.ssr)
            return delete a.ssr, l(n, a);
        delete a.ssr;
    } return n(a); }, t.noSSR = l;
    var r = n(6495).Z, a = n(2648).Z, o = (a(n(7294)), a(n(3668)));
    function l(e, t) { return delete t.webpack, delete t.modules, e(t); }
    ("function" === typeof t.default || "object" === typeof t.default && null !== t.default) && "undefined" === typeof t.default.__esModule && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
});
