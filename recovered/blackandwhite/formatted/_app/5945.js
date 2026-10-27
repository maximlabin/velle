// webpack module 5945 from _app
(function (t, e, n) {
    "use strict";
    n.d(e, { NL: function () { return a; }, aH: function () { return u; } });
    var r = n(7294);
    const i = r.createContext(void 0), s = r.createContext(!1);
    function o(t, e) { return t || (e && "undefined" !== typeof window ? (window.ReactQueryClientContext || (window.ReactQueryClientContext = i), window.ReactQueryClientContext) : i); }
    const a = ({ context: t } = {}) => { const e = r.useContext(o(t, r.useContext(s))); if (!e)
        throw new Error("No QueryClient set, use QueryClientProvider to set one"); return e; }, u = ({ client: t, children: e, context: n, contextSharing: i = !1 }) => { r.useEffect((() => (t.mount(), () => { t.unmount(); })), [t]); const a = o(n, i); return r.createElement(s.Provider, { value: !n && i }, r.createElement(a.Provider, { value: t }, e)); };
});
