// webpack module 9886 from _app
(function (t, e, n) {
    "use strict";
    n.d(e, { R: function () { return u; }, m: function () { return a; } });
    var r = n(819), i = n(81), s = n(9643), o = n(2379);
    class a extends s.F {
        constructor(t) { super(), this.defaultOptions = t.defaultOptions, this.mutationId = t.mutationId, this.mutationCache = t.mutationCache, this.logger = t.logger || r._, this.observers = [], this.state = t.state || u(), this.setOptions(t.options), this.scheduleGc(); }
        setOptions(t) { this.options = { ...this.defaultOptions, ...t }, this.updateCacheTime(this.options.cacheTime); }
        get meta() { return this.options.meta; }
        setState(t) { this.dispatch({ type: "setState", state: t }); }
        addObserver(t) { this.observers.includes(t) || (this.observers.push(t), this.clearGcTimeout(), this.mutationCache.notify({ type: "observerAdded", mutation: this, observer: t })); }
        removeObserver(t) { this.observers = this.observers.filter((e => e !== t)), this.scheduleGc(), this.mutationCache.notify({ type: "observerRemoved", mutation: this, observer: t }); }
        optionalRemove() { this.observers.length || ("loading" === this.state.status ? this.scheduleGc() : this.mutationCache.remove(this)); }
        continue() { var t, e; return null != (t = null == (e = this.retryer) ? void 0 : e.continue()) ? t : this.execute(); }
        async execute() { const t = () => { var t; return this.retryer = (0, o.Mz)({ fn: () => this.options.mutationFn ? this.options.mutationFn(this.state.variables) : Promise.reject("No mutationFn found"), onFail: (t, e) => { this.dispatch({ type: "failed", failureCount: t, error: e }); }, onPause: () => { this.dispatch({ type: "pause" }); }, onContinue: () => { this.dispatch({ type: "continue" }); }, retry: null != (t = this.options.retry) ? t : 0, retryDelay: this.options.retryDelay, networkMode: this.options.networkMode }), this.retryer.promise; }, e = "loading" === this.state.status; try {
            var n, r, i, s, a, u, c, l;
            if (!e) {
                var d, h, f, p;
                this.dispatch({ type: "loading", variables: this.options.variables }), await (null == (d = (h = this.mutationCache.config).onMutate) ? void 0 : d.call(h, this.state.variables, this));
                const t = await (null == (f = (p = this.options).onMutate) ? void 0 : f.call(p, this.state.variables));
                t !== this.state.context && this.dispatch({ type: "loading", context: t, variables: this.state.variables });
            }
            const o = await t();
            return await (null == (n = (r = this.mutationCache.config).onSuccess) ? void 0 : n.call(r, o, this.state.variables, this.state.context, this)), await (null == (i = (s = this.options).onSuccess) ? void 0 : i.call(s, o, this.state.variables, this.state.context)), await (null == (a = (u = this.mutationCache.config).onSettled) ? void 0 : a.call(u, o, null, this.state.variables, this.state.context, this)), await (null == (c = (l = this.options).onSettled) ? void 0 : c.call(l, o, null, this.state.variables, this.state.context)), this.dispatch({ type: "success", data: o }), o;
        }
        catch (O) {
            try {
                var y, v, m, g, b, w, E, C;
                throw await (null == (y = (v = this.mutationCache.config).onError) ? void 0 : y.call(v, O, this.state.variables, this.state.context, this)), await (null == (m = (g = this.options).onError) ? void 0 : m.call(g, O, this.state.variables, this.state.context)), await (null == (b = (w = this.mutationCache.config).onSettled) ? void 0 : b.call(w, void 0, O, this.state.variables, this.state.context, this)), await (null == (E = (C = this.options).onSettled) ? void 0 : E.call(C, void 0, O, this.state.variables, this.state.context)), O;
            }
            finally {
                this.dispatch({ type: "error", error: O });
            }
        } }
        dispatch(t) { this.state = (e => { switch (t.type) {
            case "failed": return { ...e, failureCount: t.failureCount, failureReason: t.error };
            case "pause": return { ...e, isPaused: !0 };
            case "continue": return { ...e, isPaused: !1 };
            case "loading": return { ...e, context: t.context, data: void 0, failureCount: 0, failureReason: null, error: null, isPaused: !(0, o.Kw)(this.options.networkMode), status: "loading", variables: t.variables };
            case "success": return { ...e, data: t.data, failureCount: 0, failureReason: null, error: null, status: "success", isPaused: !1 };
            case "error": return { ...e, data: void 0, error: t.error, failureCount: e.failureCount + 1, failureReason: t.error, isPaused: !1, status: "error" };
            case "setState": return { ...e, ...t.state };
        } })(this.state), i.V.batch((() => { this.observers.forEach((e => { e.onMutationUpdate(t); })), this.mutationCache.notify({ mutation: this, type: "updated", action: t }); })); }
    }
    function u() { return { context: void 0, data: void 0, error: null, failureCount: 0, failureReason: null, isPaused: !1, status: "idle", variables: void 0 }; }
});
