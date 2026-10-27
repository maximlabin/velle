// webpack module 3668 from chunk-947
(function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.default = void 0;
    var r = n(6495).Z, a = (0, n(2648).Z)(n(7294)), o = n(3982);
    const { useSyncExternalStore: l } = n(7294), s = [], u = [];
    let d = !1;
    function i(e) { let t = e(), n = { loading: !0, loaded: null, error: null }; return n.promise = t.then((e => (n.loading = !1, n.loaded = e, e))).catch((e => { throw n.loading = !1, n.error = e, e; })), n; }
    class c {
        promise() { return this._res.promise; }
        retry() { this._clearTimeouts(), this._res = this._loadFn(this._opts.loader), this._state = { pastDelay: !1, timedOut: !1 }; const { _res: e, _opts: t } = this; e.loading && ("number" === typeof t.delay && (0 === t.delay ? this._state.pastDelay = !0 : this._delay = setTimeout((() => { this._update({ pastDelay: !0 }); }), t.delay)), "number" === typeof t.timeout && (this._timeout = setTimeout((() => { this._update({ timedOut: !0 }); }), t.timeout))), this._res.promise.then((() => { this._update({}), this._clearTimeouts(); })).catch((e => { this._update({}), this._clearTimeouts(); })), this._update({}); }
        _update(e) { this._state = r({}, this._state, { error: this._res.error, loaded: this._res.loaded, loading: this._res.loading }, e), this._callbacks.forEach((e => e())); }
        _clearTimeouts() { clearTimeout(this._delay), clearTimeout(this._timeout); }
        getCurrentValue() { return this._state; }
        subscribe(e) { return this._callbacks.add(e), () => { this._callbacks.delete(e); }; }
        constructor(e, t) { this._loadFn = e, this._opts = t, this._callbacks = new Set, this._delay = null, this._timeout = null, this.retry(); }
    }
    function f(e) { return function (e, t) { let n = Object.assign({ loader: null, loading: null, delay: 200, timeout: null, webpack: null, modules: null, suspense: !1 }, t); n.suspense && (n.lazy = a.default.lazy(n.loader)); let s = null; function i() { if (!s) {
        const t = new c(e, n);
        s = { getCurrentValue: t.getCurrentValue.bind(t), subscribe: t.subscribe.bind(t), retry: t.retry.bind(t), promise: t.promise.bind(t) };
    } return s.promise(); } if (!d) {
        const e = n.webpack ? n.webpack() : n.modules;
        e && u.push((t => { for (const n of e)
            if (-1 !== t.indexOf(n))
                return i(); }));
    } function f() { i(); const e = a.default.useContext(o.LoadableContext); e && Array.isArray(n.modules) && n.modules.forEach((t => { e(t); })); } const p = n.suspense ? function (e, t) { return f(), a.default.createElement(n.lazy, r({}, e, { ref: t })); } : function (e, t) { f(); const r = l(s.subscribe, s.getCurrentValue, s.getCurrentValue); return a.default.useImperativeHandle(t, (() => ({ retry: s.retry })), []), a.default.useMemo((() => { return r.loading || r.error ? a.default.createElement(n.loading, { isLoading: r.loading, pastDelay: r.pastDelay, timedOut: r.timedOut, error: r.error, retry: s.retry }) : r.loaded ? a.default.createElement((t = r.loaded) && t.__esModule ? t.default : t, e) : null; var t; }), [e, r]); }; return p.preload = () => i(), p.displayName = "LoadableComponent", a.default.forwardRef(p); }(i, e); }
    function p(e, t) { let n = []; for (; e.length;) {
        let r = e.pop();
        n.push(r(t));
    } return Promise.all(n).then((() => { if (e.length)
        return p(e, t); })); }
    f.preloadAll = () => new Promise(((e, t) => { p(s).then(e, t); })), f.preloadReady = function () { let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []; return new Promise((t => { const n = () => (d = !0, t()); p(u, e).then(n, n); })); }, window.__NEXT_PRELOADREADY = f.preloadReady;
    var h = f;
    t.default = h;
});
