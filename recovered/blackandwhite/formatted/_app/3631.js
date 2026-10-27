// webpack module 3631 from _app
(function (t, e, n) {
    "use strict";
    n.r(e), n.d(e, { default: function () { return J; } });
    var r = n(9499), i = n(7294), s = n(2161), o = n(819), a = n(81), u = n(2379), c = n(9643);
    class l extends c.F {
        constructor(t) { super(), this.abortSignalConsumed = !1, this.defaultOptions = t.defaultOptions, this.setOptions(t.options), this.observers = [], this.cache = t.cache, this.logger = t.logger || o._, this.queryKey = t.queryKey, this.queryHash = t.queryHash, this.initialState = t.state || function (t) { const e = "function" === typeof t.initialData ? t.initialData() : t.initialData, n = "undefined" !== typeof e, r = n ? "function" === typeof t.initialDataUpdatedAt ? t.initialDataUpdatedAt() : t.initialDataUpdatedAt : 0; return { data: e, dataUpdateCount: 0, dataUpdatedAt: n ? null != r ? r : Date.now() : 0, error: null, errorUpdateCount: 0, errorUpdatedAt: 0, fetchFailureCount: 0, fetchFailureReason: null, fetchMeta: null, isInvalidated: !1, status: n ? "success" : "loading", fetchStatus: "idle" }; }(this.options), this.state = this.initialState, this.scheduleGc(); }
        get meta() { return this.options.meta; }
        setOptions(t) { this.options = { ...this.defaultOptions, ...t }, this.updateCacheTime(this.options.cacheTime); }
        optionalRemove() { this.observers.length || "idle" !== this.state.fetchStatus || this.cache.remove(this); }
        setData(t, e) { const n = (0, s.oE)(this.state.data, t, this.options); return this.dispatch({ data: n, type: "success", dataUpdatedAt: null == e ? void 0 : e.updatedAt, manual: null == e ? void 0 : e.manual }), n; }
        setState(t, e) { this.dispatch({ type: "setState", state: t, setStateOptions: e }); }
        cancel(t) { var e; const n = this.promise; return null == (e = this.retryer) || e.cancel(t), n ? n.then(s.ZT).catch(s.ZT) : Promise.resolve(); }
        destroy() { super.destroy(), this.cancel({ silent: !0 }); }
        reset() { this.destroy(), this.setState(this.initialState); }
        isActive() { return this.observers.some((t => !1 !== t.options.enabled)); }
        isDisabled() { return this.getObserversCount() > 0 && !this.isActive(); }
        isStale() { return this.state.isInvalidated || !this.state.dataUpdatedAt || this.observers.some((t => t.getCurrentResult().isStale)); }
        isStaleByTime(t = 0) { return this.state.isInvalidated || !this.state.dataUpdatedAt || !(0, s.Kp)(this.state.dataUpdatedAt, t); }
        onFocus() { var t; const e = this.observers.find((t => t.shouldFetchOnWindowFocus())); e && e.refetch({ cancelRefetch: !1 }), null == (t = this.retryer) || t.continue(); }
        onOnline() { var t; const e = this.observers.find((t => t.shouldFetchOnReconnect())); e && e.refetch({ cancelRefetch: !1 }), null == (t = this.retryer) || t.continue(); }
        addObserver(t) { this.observers.includes(t) || (this.observers.push(t), this.clearGcTimeout(), this.cache.notify({ type: "observerAdded", query: this, observer: t })); }
        removeObserver(t) { this.observers.includes(t) && (this.observers = this.observers.filter((e => e !== t)), this.observers.length || (this.retryer && (this.abortSignalConsumed ? this.retryer.cancel({ revert: !0 }) : this.retryer.cancelRetry()), this.scheduleGc()), this.cache.notify({ type: "observerRemoved", query: this, observer: t })); }
        getObserversCount() { return this.observers.length; }
        invalidate() { this.state.isInvalidated || this.dispatch({ type: "invalidate" }); }
        fetch(t, e) { var n, r; if ("idle" !== this.state.fetchStatus)
            if (this.state.dataUpdatedAt && null != e && e.cancelRefetch)
                this.cancel({ silent: !0 });
            else if (this.promise) {
                var i;
                return null == (i = this.retryer) || i.continueRetry(), this.promise;
            } if (t && this.setOptions(t), !this.options.queryFn) {
            const t = this.observers.find((t => t.options.queryFn));
            t && this.setOptions(t.options);
        } const o = (0, s.G9)(), a = { queryKey: this.queryKey, pageParam: void 0, meta: this.meta }, c = t => { Object.defineProperty(t, "signal", { enumerable: !0, get: () => { if (o)
                return this.abortSignalConsumed = !0, o.signal; } }); }; c(a); const l = { fetchOptions: e, options: this.options, queryKey: this.queryKey, state: this.state, fetchFn: () => this.options.queryFn ? (this.abortSignalConsumed = !1, this.options.queryFn(a)) : Promise.reject("Missing queryFn for queryKey '" + this.options.queryHash + "'") }; var d; (c(l), null == (n = this.options.behavior) || n.onFetch(l), this.revertState = this.state, "idle" === this.state.fetchStatus || this.state.fetchMeta !== (null == (r = l.fetchOptions) ? void 0 : r.meta)) && this.dispatch({ type: "fetch", meta: null == (d = l.fetchOptions) ? void 0 : d.meta }); const h = t => { var e, n, r, i; ((0, u.DV)(t) && t.silent || this.dispatch({ type: "error", error: t }), (0, u.DV)(t)) || (null == (e = (n = this.cache.config).onError) || e.call(n, t, this), null == (r = (i = this.cache.config).onSettled) || r.call(i, this.state.data, t, this)); this.isFetchingOptimistic || this.scheduleGc(), this.isFetchingOptimistic = !1; }; return this.retryer = (0, u.Mz)({ fn: l.fetchFn, abort: null == o ? void 0 : o.abort.bind(o), onSuccess: t => { var e, n, r, i; "undefined" !== typeof t ? (this.setData(t), null == (e = (n = this.cache.config).onSuccess) || e.call(n, t, this), null == (r = (i = this.cache.config).onSettled) || r.call(i, t, this.state.error, this), this.isFetchingOptimistic || this.scheduleGc(), this.isFetchingOptimistic = !1) : h(new Error(this.queryHash + " data is undefined")); }, onError: h, onFail: (t, e) => { this.dispatch({ type: "failed", failureCount: t, error: e }); }, onPause: () => { this.dispatch({ type: "pause" }); }, onContinue: () => { this.dispatch({ type: "continue" }); }, retry: l.options.retry, retryDelay: l.options.retryDelay, networkMode: l.options.networkMode }), this.promise = this.retryer.promise, this.promise; }
        dispatch(t) { this.state = (e => { var n, r; switch (t.type) {
            case "failed": return { ...e, fetchFailureCount: t.failureCount, fetchFailureReason: t.error };
            case "pause": return { ...e, fetchStatus: "paused" };
            case "continue": return { ...e, fetchStatus: "fetching" };
            case "fetch": return { ...e, fetchFailureCount: 0, fetchFailureReason: null, fetchMeta: null != (n = t.meta) ? n : null, fetchStatus: (0, u.Kw)(this.options.networkMode) ? "fetching" : "paused", ...!e.dataUpdatedAt && { error: null, status: "loading" } };
            case "success": return { ...e, data: t.data, dataUpdateCount: e.dataUpdateCount + 1, dataUpdatedAt: null != (r = t.dataUpdatedAt) ? r : Date.now(), error: null, isInvalidated: !1, status: "success", ...!t.manual && { fetchStatus: "idle", fetchFailureCount: 0, fetchFailureReason: null } };
            case "error":
                const i = t.error;
                return (0, u.DV)(i) && i.revert && this.revertState ? { ...this.revertState, fetchStatus: "idle" } : { ...e, error: i, errorUpdateCount: e.errorUpdateCount + 1, errorUpdatedAt: Date.now(), fetchFailureCount: e.fetchFailureCount + 1, fetchFailureReason: i, fetchStatus: "idle", status: "error" };
            case "invalidate": return { ...e, isInvalidated: !0 };
            case "setState": return { ...e, ...t.state };
        } })(this.state), a.V.batch((() => { this.observers.forEach((e => { e.onQueryUpdate(t); })), this.cache.notify({ query: this, type: "updated", action: t }); })); }
    }
    var d = n(3989);
    class h extends d.l {
        constructor(t) { super(), this.config = t || {}, this.queries = [], this.queriesMap = {}; }
        build(t, e, n) { var r; const i = e.queryKey, o = null != (r = e.queryHash) ? r : (0, s.Rm)(i, e); let a = this.get(o); return a || (a = new l({ cache: this, logger: t.getLogger(), queryKey: i, queryHash: o, options: t.defaultQueryOptions(e), state: n, defaultOptions: t.getQueryDefaults(i) }), this.add(a)), a; }
        add(t) { this.queriesMap[t.queryHash] || (this.queriesMap[t.queryHash] = t, this.queries.push(t), this.notify({ type: "added", query: t })); }
        remove(t) { const e = this.queriesMap[t.queryHash]; e && (t.destroy(), this.queries = this.queries.filter((e => e !== t)), e === t && delete this.queriesMap[t.queryHash], this.notify({ type: "removed", query: t })); }
        clear() { a.V.batch((() => { this.queries.forEach((t => { this.remove(t); })); })); }
        get(t) { return this.queriesMap[t]; }
        getAll() { return this.queries; }
        find(t, e) { const [n] = (0, s.I6)(t, e); return "undefined" === typeof n.exact && (n.exact = !0), this.queries.find((t => (0, s._x)(n, t))); }
        findAll(t, e) { const [n] = (0, s.I6)(t, e); return Object.keys(n).length > 0 ? this.queries.filter((t => (0, s._x)(n, t))) : this.queries; }
        notify(t) { a.V.batch((() => { this.listeners.forEach((({ listener: e }) => { e(t); })); })); }
        onFocus() { a.V.batch((() => { this.queries.forEach((t => { t.onFocus(); })); })); }
        onOnline() { a.V.batch((() => { this.queries.forEach((t => { t.onOnline(); })); })); }
    }
    var f = n(9886);
    class p extends d.l {
        constructor(t) { super(), this.config = t || {}, this.mutations = [], this.mutationId = 0; }
        build(t, e, n) { const r = new f.m({ mutationCache: this, logger: t.getLogger(), mutationId: ++this.mutationId, options: t.defaultMutationOptions(e), state: n, defaultOptions: e.mutationKey ? t.getMutationDefaults(e.mutationKey) : void 0 }); return this.add(r), r; }
        add(t) { this.mutations.push(t), this.notify({ type: "added", mutation: t }); }
        remove(t) { this.mutations = this.mutations.filter((e => e !== t)), this.notify({ type: "removed", mutation: t }); }
        clear() { a.V.batch((() => { this.mutations.forEach((t => { this.remove(t); })); })); }
        getAll() { return this.mutations; }
        find(t) { return "undefined" === typeof t.exact && (t.exact = !0), this.mutations.find((e => (0, s.X7)(t, e))); }
        findAll(t) { return this.mutations.filter((e => (0, s.X7)(t, e))); }
        notify(t) { a.V.batch((() => { this.listeners.forEach((({ listener: e }) => { e(t); })); })); }
        resumePausedMutations() { var t; return this.resuming = (null != (t = this.resuming) ? t : Promise.resolve()).then((() => { const t = this.mutations.filter((t => t.state.isPaused)); return a.V.batch((() => t.reduce(((t, e) => t.then((() => e.continue().catch(s.ZT)))), Promise.resolve()))); })).then((() => { this.resuming = void 0; })), this.resuming; }
    }
    var y = n(5761), v = n(6474);
    function m() { return { onFetch: t => { t.fetchFn = () => { var e, n, r, i, s, o; const a = null == (e = t.fetchOptions) || null == (n = e.meta) ? void 0 : n.refetchPage, u = null == (r = t.fetchOptions) || null == (i = r.meta) ? void 0 : i.fetchMore, c = null == u ? void 0 : u.pageParam, l = "forward" === (null == u ? void 0 : u.direction), d = "backward" === (null == u ? void 0 : u.direction), h = (null == (s = t.state.data) ? void 0 : s.pages) || [], f = (null == (o = t.state.data) ? void 0 : o.pageParams) || []; let p = f, y = !1; const v = t.options.queryFn || (() => Promise.reject("Missing queryFn for queryKey '" + t.options.queryHash + "'")), m = (t, e, n, r) => (p = r ? [e, ...p] : [...p, e], r ? [n, ...t] : [...t, n]), w = (e, n, r, i) => { if (y)
            return Promise.reject("Cancelled"); if ("undefined" === typeof r && !n && e.length)
            return Promise.resolve(e); const s = { queryKey: t.queryKey, pageParam: r, meta: t.options.meta }; var o; o = s, Object.defineProperty(o, "signal", { enumerable: !0, get: () => { var e, n; return null != (e = t.signal) && e.aborted ? y = !0 : null == (n = t.signal) || n.addEventListener("abort", (() => { y = !0; })), t.signal; } }); const a = v(s); return Promise.resolve(a).then((t => m(e, r, t, i))); }; let E; if (h.length)
            if (l) {
                const e = "undefined" !== typeof c, n = e ? c : g(t.options, h);
                E = w(h, e, n);
            }
            else if (d) {
                const e = "undefined" !== typeof c, n = e ? c : b(t.options, h);
                E = w(h, e, n, !0);
            }
            else {
                p = [];
                const e = "undefined" === typeof t.options.getNextPageParam;
                E = !a || !h[0] || a(h[0], 0, h) ? w([], e, f[0]) : Promise.resolve(m([], f[0], h[0]));
                for (let n = 1; n < h.length; n++)
                    E = E.then((r => { if (!a || !h[n] || a(h[n], n, h)) {
                        const i = e ? f[n] : g(t.options, r);
                        return w(r, e, i);
                    } return Promise.resolve(m(r, f[n], h[n])); }));
            }
        else
            E = w([]); return E.then((t => ({ pages: t, pageParams: p }))); }; } }; }
    function g(t, e) { return null == t.getNextPageParam ? void 0 : t.getNextPageParam(e[e.length - 1], e); }
    function b(t, e) { return null == t.getPreviousPageParam ? void 0 : t.getPreviousPageParam(e[0], e); }
    class w {
        constructor(t = {}) { this.queryCache = t.queryCache || new h, this.mutationCache = t.mutationCache || new p, this.logger = t.logger || o._, this.defaultOptions = t.defaultOptions || {}, this.queryDefaults = [], this.mutationDefaults = [], this.mountCount = 0; }
        mount() { this.mountCount++, 1 === this.mountCount && (this.unsubscribeFocus = y.j.subscribe((() => { y.j.isFocused() && (this.resumePausedMutations(), this.queryCache.onFocus()); })), this.unsubscribeOnline = v.N.subscribe((() => { v.N.isOnline() && (this.resumePausedMutations(), this.queryCache.onOnline()); }))); }
        unmount() { var t, e; this.mountCount--, 0 === this.mountCount && (null == (t = this.unsubscribeFocus) || t.call(this), this.unsubscribeFocus = void 0, null == (e = this.unsubscribeOnline) || e.call(this), this.unsubscribeOnline = void 0); }
        isFetching(t, e) { const [n] = (0, s.I6)(t, e); return n.fetchStatus = "fetching", this.queryCache.findAll(n).length; }
        isMutating(t) { return this.mutationCache.findAll({ ...t, fetching: !0 }).length; }
        getQueryData(t, e) { var n; return null == (n = this.queryCache.find(t, e)) ? void 0 : n.state.data; }
        ensureQueryData(t, e, n) { const r = (0, s._v)(t, e, n), i = this.getQueryData(r.queryKey); return i ? Promise.resolve(i) : this.fetchQuery(r); }
        getQueriesData(t) { return this.getQueryCache().findAll(t).map((({ queryKey: t, state: e }) => [t, e.data])); }
        setQueryData(t, e, n) { const r = this.queryCache.find(t), i = null == r ? void 0 : r.state.data, o = (0, s.SE)(e, i); if ("undefined" === typeof o)
            return; const a = (0, s._v)(t), u = this.defaultQueryOptions(a); return this.queryCache.build(this, u).setData(o, { ...n, manual: !0 }); }
        setQueriesData(t, e, n) { return a.V.batch((() => this.getQueryCache().findAll(t).map((({ queryKey: t }) => [t, this.setQueryData(t, e, n)])))); }
        getQueryState(t, e) { var n; return null == (n = this.queryCache.find(t, e)) ? void 0 : n.state; }
        removeQueries(t, e) { const [n] = (0, s.I6)(t, e), r = this.queryCache; a.V.batch((() => { r.findAll(n).forEach((t => { r.remove(t); })); })); }
        resetQueries(t, e, n) { const [r, i] = (0, s.I6)(t, e, n), o = this.queryCache, u = { type: "active", ...r }; return a.V.batch((() => (o.findAll(r).forEach((t => { t.reset(); })), this.refetchQueries(u, i)))); }
        cancelQueries(t, e, n) { const [r, i = {}] = (0, s.I6)(t, e, n); "undefined" === typeof i.revert && (i.revert = !0); const o = a.V.batch((() => this.queryCache.findAll(r).map((t => t.cancel(i))))); return Promise.all(o).then(s.ZT).catch(s.ZT); }
        invalidateQueries(t, e, n) { const [r, i] = (0, s.I6)(t, e, n); return a.V.batch((() => { var t, e; if (this.queryCache.findAll(r).forEach((t => { t.invalidate(); })), "none" === r.refetchType)
            return Promise.resolve(); const n = { ...r, type: null != (t = null != (e = r.refetchType) ? e : r.type) ? t : "active" }; return this.refetchQueries(n, i); })); }
        refetchQueries(t, e, n) { const [r, i] = (0, s.I6)(t, e, n), o = a.V.batch((() => this.queryCache.findAll(r).filter((t => !t.isDisabled())).map((t => { var e; return t.fetch(void 0, { ...i, cancelRefetch: null == (e = null == i ? void 0 : i.cancelRefetch) || e, meta: { refetchPage: r.refetchPage } }); })))); let u = Promise.all(o).then(s.ZT); return null != i && i.throwOnError || (u = u.catch(s.ZT)), u; }
        fetchQuery(t, e, n) { const r = (0, s._v)(t, e, n), i = this.defaultQueryOptions(r); "undefined" === typeof i.retry && (i.retry = !1); const o = this.queryCache.build(this, i); return o.isStaleByTime(i.staleTime) ? o.fetch(i) : Promise.resolve(o.state.data); }
        prefetchQuery(t, e, n) { return this.fetchQuery(t, e, n).then(s.ZT).catch(s.ZT); }
        fetchInfiniteQuery(t, e, n) { const r = (0, s._v)(t, e, n); return r.behavior = m(), this.fetchQuery(r); }
        prefetchInfiniteQuery(t, e, n) { return this.fetchInfiniteQuery(t, e, n).then(s.ZT).catch(s.ZT); }
        resumePausedMutations() { return this.mutationCache.resumePausedMutations(); }
        getQueryCache() { return this.queryCache; }
        getMutationCache() { return this.mutationCache; }
        getLogger() { return this.logger; }
        getDefaultOptions() { return this.defaultOptions; }
        setDefaultOptions(t) { this.defaultOptions = t; }
        setQueryDefaults(t, e) { const n = this.queryDefaults.find((e => (0, s.yF)(t) === (0, s.yF)(e.queryKey))); n ? n.defaultOptions = e : this.queryDefaults.push({ queryKey: t, defaultOptions: e }); }
        getQueryDefaults(t) { if (!t)
            return; const e = this.queryDefaults.find((e => (0, s.to)(t, e.queryKey))); return null == e ? void 0 : e.defaultOptions; }
        setMutationDefaults(t, e) { const n = this.mutationDefaults.find((e => (0, s.yF)(t) === (0, s.yF)(e.mutationKey))); n ? n.defaultOptions = e : this.mutationDefaults.push({ mutationKey: t, defaultOptions: e }); }
        getMutationDefaults(t) { if (!t)
            return; const e = this.mutationDefaults.find((e => (0, s.to)(t, e.mutationKey))); return null == e ? void 0 : e.defaultOptions; }
        defaultQueryOptions(t) { if (null != t && t._defaulted)
            return t; const e = { ...this.defaultOptions.queries, ...this.getQueryDefaults(null == t ? void 0 : t.queryKey), ...t, _defaulted: !0 }; return !e.queryHash && e.queryKey && (e.queryHash = (0, s.Rm)(e.queryKey, e)), "undefined" === typeof e.refetchOnReconnect && (e.refetchOnReconnect = "always" !== e.networkMode), "undefined" === typeof e.useErrorBoundary && (e.useErrorBoundary = !!e.suspense), e; }
        defaultMutationOptions(t) { return null != t && t._defaulted ? t : { ...this.defaultOptions.mutations, ...this.getMutationDefaults(null == t ? void 0 : t.mutationKey), ...t, _defaulted: !0 }; }
        clear() { this.queryCache.clear(), this.mutationCache.clear(); }
    }
    var E = n(5945);
    const C = ({ children: t, options: e, state: n }) => (function (t, e = {}) { const n = (0, E.NL)({ context: e.context }), r = i.useRef(e); r.current = e, i.useMemo((() => { t && function (t, e, n) { if ("object" !== typeof e || null === e)
        return; const r = t.getMutationCache(), i = t.getQueryCache(), s = e.mutations || [], o = e.queries || []; s.forEach((e => { var i; r.build(t, { ...null == n || null == (i = n.defaultOptions) ? void 0 : i.mutations, mutationKey: e.mutationKey }, e.state); })), o.forEach((({ queryKey: e, state: r, queryHash: s }) => { var o; const a = i.get(s); if (a) {
        if (a.state.dataUpdatedAt < r.dataUpdatedAt) {
            const { fetchStatus: t, ...e } = r;
            a.setState(e);
        }
    }
    else
        i.build(t, { ...null == n || null == (o = n.defaultOptions) ? void 0 : o.queries, queryKey: e, queryHash: s }, { ...r, fetchStatus: "idle" }); })); }(n, t, r.current); }), [n, t]); }(n, e), t);
    var O = n(7433);
    n(7332), n(993), n(933), n(92), n(8770);
    function T() { return T = Object.assign ? Object.assign.bind() : function (t) { for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var r in n)
            ({}).hasOwnProperty.call(n, r) && (t[r] = n[r]);
    } return t; }, T.apply(null, arguments); }
    function S(t, e) { return S = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, S(t, e); }
    Object.create;
    function q(t, e, n) { if (n || 2 === arguments.length)
        for (var r, i = 0, s = e.length; i < s; i++)
            !r && i in e || (r || (r = Array.prototype.slice.call(e, 0, i)), r[i] = e[i]); return t.concat(r || Array.prototype.slice.call(e)); }
    Object.create;
    "function" === typeof SuppressedError && SuppressedError;
    var A = n(7811), P = new Map, x = function (t) { return t.cloneNode(!0); }, I = function () { return "file:" === window.location.protocol; }, _ = function (t, e, n) { var r = new XMLHttpRequest; r.onreadystatechange = function () { try {
        if (!/\.svg/i.test(t) && 2 === r.readyState) {
            var e = r.getResponseHeader("Content-Type");
            if (!e)
                throw new Error("Content type not found");
            var i = (0, A.Q)(e).type;
            if ("image/svg+xml" !== i && "text/plain" !== i)
                throw new Error("Invalid content type: ".concat(i));
        }
        if (4 === r.readyState) {
            if (404 === r.status || null === r.responseXML)
                throw new Error(I() ? "Note: SVG injection ajax calls do not work locally without adjusting security settings in your browser. Or consider using a local webserver." : "Unable to load SVG file: " + t);
            if (!(200 === r.status || I() && 0 === r.status))
                throw new Error("There was a problem injecting the SVG: " + r.status + " " + r.statusText);
            n(null, r);
        }
    }
    catch (s) {
        if (r.abort(), !(s instanceof Error))
            throw s;
        n(s, r);
    } }, r.open("GET", t), r.withCredentials = e, r.overrideMimeType && r.overrideMimeType("text/xml"), r.send(); }, R = {}, M = function (t, e) { R[t] = R[t] || [], R[t].push(e); }, j = function (t, e, n) { if (P.has(t)) {
        var r = P.get(t);
        if (void 0 === r)
            return void M(t, n);
        if (r instanceof SVGSVGElement)
            return void n(null, x(r));
    } P.set(t, void 0), M(t, n), _(t, e, (function (e, n) { var r; e ? P.set(t, e) : (null === (r = n.responseXML) || void 0 === r ? void 0 : r.documentElement) instanceof SVGSVGElement && P.set(t, n.responseXML.documentElement), function (t) { for (var e = function (e, n) { setTimeout((function () { if (Array.isArray(R[t])) {
        var n = P.get(t), r = R[t][e];
        n instanceof SVGSVGElement && r(null, x(n)), n instanceof Error && r(n), e === R[t].length - 1 && delete R[t];
    } }), 0); }, n = 0, r = R[t].length; n < r; n++)
        e(n); }(t); })); }, D = function (t, e, n) { _(t, e, (function (t, e) { var r; t ? n(t) : (null === (r = e.responseXML) || void 0 === r ? void 0 : r.documentElement) instanceof SVGSVGElement && n(null, e.responseXML.documentElement); })); }, L = 0, k = [], F = {}, N = "http://www.w3.org/1999/xlink", K = function (t, e, n, r, i, s, o) { var a = t.getAttribute("data-src") || t.getAttribute("src"); if (a) {
        if (-1 !== k.indexOf(t))
            return k.splice(k.indexOf(t), 1), void (t = null);
        k.push(t), t.setAttribute("src", ""), (r ? j : D)(a, i, (function (r, i) { if (!i)
            return k.splice(k.indexOf(t), 1), t = null, void o(r); var u = t.getAttribute("id"); u && i.setAttribute("id", u); var c = t.getAttribute("title"); c && i.setAttribute("title", c); var l = t.getAttribute("width"); l && i.setAttribute("width", l); var d = t.getAttribute("height"); d && i.setAttribute("height", d); var h = Array.from(new Set(q(q(q([], (i.getAttribute("class") || "").split(" "), !0), ["injected-svg"], !1), (t.getAttribute("class") || "").split(" "), !0))).join(" ").trim(); i.setAttribute("class", h); var f = t.getAttribute("style"); f && i.setAttribute("style", f), i.setAttribute("data-src", a); var p = [].filter.call(t.attributes, (function (t) { return /^data-\w[\w-]*$/.test(t.name); })); if (Array.prototype.forEach.call(p, (function (t) { t.name && t.value && i.setAttribute(t.name, t.value); })), n) {
            var y, v, m, g, b, w = { clipPath: ["clip-path"], "color-profile": ["color-profile"], cursor: ["cursor"], filter: ["filter"], linearGradient: ["fill", "stroke"], marker: ["marker", "marker-start", "marker-mid", "marker-end"], mask: ["mask"], path: [], pattern: ["fill", "stroke"], radialGradient: ["fill", "stroke"] };
            Object.keys(w).forEach((function (t) { y = t, m = w[t]; for (var e = function (t, e) { var n; g = v[t].id, b = g + "-" + ++L, Array.prototype.forEach.call(m, (function (t) { for (var e = 0, r = (n = i.querySelectorAll("[" + t + '*="' + g + '"]')).length; e < r; e++) {
                var s = n[e].getAttribute(t);
                s && !s.match(new RegExp('url\\("?#' + g + '"?\\)')) || n[e].setAttribute(t, "url(#" + b + ")");
            } })); for (var r = i.querySelectorAll("[*|href]"), s = [], o = 0, a = r.length; o < a; o++) {
                var u = r[o].getAttributeNS(N, "href");
                u && u.toString() === "#" + v[t].id && s.push(r[o]);
            } for (var c = 0, l = s.length; c < l; c++)
                s[c].setAttributeNS(N, "href", "#" + b); v[t].id = b; }, n = 0, r = (v = i.querySelectorAll(y + "[id]")).length; n < r; n++)
                e(n); }));
        } i.removeAttribute("xmlns:a"); for (var E, C, O = i.querySelectorAll("script"), T = [], S = 0, A = O.length; S < A; S++)
            (C = O[S].getAttribute("type")) && "application/ecmascript" !== C && "application/javascript" !== C && "text/javascript" !== C || ((E = O[S].innerText || O[S].textContent) && T.push(E), i.removeChild(O[S])); if (T.length > 0 && ("always" === e || "once" === e && !F[a])) {
            for (var P = 0, x = T.length; P < x; P++)
                new Function(T[P])(window);
            F[a] = !0;
        } var I = i.querySelectorAll("style"); if (Array.prototype.forEach.call(I, (function (t) { t.textContent += ""; })), i.setAttribute("xmlns", "http://www.w3.org/2000/svg"), i.setAttribute("xmlns:xlink", N), s(i), !t.parentNode)
            return k.splice(k.indexOf(t), 1), t = null, void o(new Error("Parent node is null")); t.parentNode.replaceChild(i, t), k.splice(k.indexOf(t), 1), t = null, o(null, i); }));
    }
    else
        o(new Error("Invalid data-src or src attribute")); }, V = n(5697), Q = ["afterInjection", "beforeInjection", "desc", "evalScripts", "fallback", "httpRequestWithCredentials", "loading", "renumerateIRIElements", "src", "title", "useRequestCache", "wrapper"], $ = "http://www.w3.org/2000/svg", G = "http://www.w3.org/1999/xlink", H = function (t) { function e() { for (var e, n = arguments.length, r = new Array(n), i = 0; i < n; i++)
        r[i] = arguments[i]; return (e = t.call.apply(t, [this].concat(r)) || this).initialState = { hasError: !1, isLoading: !0 }, e.state = e.initialState, e._isMounted = !1, e.reactWrapper = void 0, e.nonReactWrapper = void 0, e.refCallback = function (t) { e.reactWrapper = t; }, e; } var n, r; r = t, (n = e).prototype = Object.create(r.prototype), n.prototype.constructor = n, S(n, r); var s = e.prototype; return s.renderSVG = function () { var t, e = this; if (this.reactWrapper instanceof (t = this.reactWrapper, ((null == t ? void 0 : t.ownerDocument) || document).defaultView || window).Node) {
        var n, r, i = this.props, s = i.desc, o = i.evalScripts, a = i.httpRequestWithCredentials, u = i.renumerateIRIElements, c = i.src, l = i.title, d = i.useRequestCache, h = this.props.onError, f = this.props.beforeInjection, p = this.props.afterInjection, y = this.props.wrapper;
        "svg" === y ? ((n = document.createElementNS($, y)).setAttribute("xmlns", $), n.setAttribute("xmlns:xlink", G), r = document.createElementNS($, y)) : (n = document.createElement(y), r = document.createElement(y)), n.appendChild(r), r.dataset.src = c, this.nonReactWrapper = this.reactWrapper.appendChild(n);
        var v = function (t) { e.removeSVG(), e._isMounted ? e.setState((function () { return { hasError: !0, isLoading: !1 }; }), (function () { h(t); })) : h(t); };
        !function (t, e) { var n = void 0 === e ? {} : e, r = n.afterAll, i = void 0 === r ? function () { } : r, s = n.afterEach, o = void 0 === s ? function () { } : s, a = n.beforeEach, u = void 0 === a ? function () { } : a, c = n.cacheRequests, l = void 0 === c || c, d = n.evalScripts, h = void 0 === d ? "never" : d, f = n.httpRequestWithCredentials, p = void 0 !== f && f, y = n.renumerateIRIElements, v = void 0 === y || y; if (t && "length" in t)
            for (var m = 0, g = 0, b = t.length; g < b; g++)
                K(t[g], h, v, l, p, u, (function (e, n) { o(e, n), t && "length" in t && t.length === ++m && i(m); }));
        else
            t ? K(t, h, v, l, p, u, (function (e, n) { o(e, n), i(1), t = null; })) : i(0); }(r, { afterEach: function (t, n) { t ? v(t) : e._isMounted && e.setState((function () { return { isLoading: !1 }; }), (function () { try {
                p(n);
            }
            catch (t) {
                v(t);
            } })); }, beforeEach: function (t) { if (t.setAttribute("role", "img"), s) {
                var e = t.querySelector(":scope > desc");
                e && t.removeChild(e);
                var n = document.createElement("desc");
                n.innerHTML = s, t.prepend(n);
            } if (l) {
                var r = t.querySelector(":scope > title");
                r && t.removeChild(r);
                var i = document.createElement("title");
                i.innerHTML = l, t.prepend(i);
            } try {
                f(t);
            }
            catch (o) {
                v(o);
            } }, cacheRequests: d, evalScripts: o, httpRequestWithCredentials: a, renumerateIRIElements: u });
    } }, s.removeSVG = function () { var t; null != (t = this.nonReactWrapper) && t.parentNode && (this.nonReactWrapper.parentNode.removeChild(this.nonReactWrapper), this.nonReactWrapper = null); }, s.componentDidMount = function () { this._isMounted = !0, this.renderSVG(); }, s.componentDidUpdate = function (t) { var e = this; (function (t, e) { for (var n in t)
        if (!(n in e))
            return !0; for (var r in e)
        if (t[r] !== e[r])
            return !0; return !1; })(T({}, t), this.props) && this.setState((function () { return e.initialState; }), (function () { e.removeSVG(), e.renderSVG(); })); }, s.componentWillUnmount = function () { this._isMounted = !1, this.removeSVG(); }, s.render = function () { var t = this.props; t.afterInjection, t.beforeInjection, t.desc, t.evalScripts; var e = t.fallback; t.httpRequestWithCredentials; var n = t.loading; t.renumerateIRIElements, t.src, t.title, t.useRequestCache; var r = t.wrapper, s = function (t, e) { if (null == t)
        return {}; var n = {}; for (var r in t)
        if ({}.hasOwnProperty.call(t, r)) {
            if (e.includes(r))
                continue;
            n[r] = t[r];
        } return n; }(t, Q), o = r; return i.createElement(o, T({}, s, { ref: this.refCallback }, "svg" === r ? { xmlns: $, xmlnsXlink: G } : {}), this.state.isLoading && n && i.createElement(n, null), this.state.hasError && e && i.createElement(e, null)); }, e; }(i.Component);
    H.defaultProps = { afterInjection: function () { }, beforeInjection: function () { }, desc: "", evalScripts: "never", fallback: null, httpRequestWithCredentials: !1, loading: null, onError: function () { }, renumerateIRIElements: !0, title: "", useRequestCache: !0, wrapper: "div" }, H.propTypes = { afterInjection: V.func, beforeInjection: V.func, desc: V.string, evalScripts: V.oneOf(["always", "once", "never"]), fallback: V.oneOfType([V.func, V.object, V.string]), httpRequestWithCredentials: V.bool, loading: V.oneOfType([V.func, V.object, V.string]), onError: V.func, renumerateIRIElements: V.bool, src: V.string.isRequired, title: V.string, useRequestCache: V.bool, wrapper: V.oneOf(["div", "span", "svg"]) };
    var U = n(1752), Z = n.n(U), W = n.p + "bd727ff9e3a66fac228593d85ed91392.svg", z = n(5893);
    console.log(Z());
    const B = () => (0, z.jsx)("div", { style: { display: "none" }, children: (0, z.jsx)(W, {}) });
    function X(t, e) { var n = Object.keys(t); if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(t);
        e && (r = r.filter((function (e) { return Object.getOwnPropertyDescriptor(t, e).enumerable; }))), n.push.apply(n, r);
    } return n; }
    function Y(t) { for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2 ? X(Object(n), !0).forEach((function (e) { (0, r.Z)(t, e, n[e]); })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : X(Object(n)).forEach((function (e) { Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e)); }));
    } return t; }
    var J = function (t) { let { Component: e, pageProps: n } = t; const { 0: r } = (0, i.useState)((() => new w({ defaultOptions: { queries: { staleTime: 6e4 } } }))), { 0: s, 1: o } = (0, i.useState)(!1); return (0, z.jsx)(E.aH, { client: r, children: (0, z.jsxs)(C, { state: n.dehydratedState, children: [(0, z.jsx)(e, Y({}, n)), s ? (0, z.jsx)(B, {}) : (0, z.jsx)(H, { onError: t => { o(!0), console.error(t); }, style: { display: "none" }, src: "/sprite.svg" }), (0, z.jsx)(O.Ix, {})] }) }); };
});
