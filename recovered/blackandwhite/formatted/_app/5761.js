// webpack module 5761 from _app
(function (t, e, n) {
    "use strict";
    n.d(e, { j: function () { return o; } });
    var r = n(3989), i = n(2161);
    class s extends r.l {
        constructor() { super(), this.setup = t => { if (!i.sk && window.addEventListener) {
            const e = () => t();
            return window.addEventListener("visibilitychange", e, !1), window.addEventListener("focus", e, !1), () => { window.removeEventListener("visibilitychange", e), window.removeEventListener("focus", e); };
        } }; }
        onSubscribe() { this.cleanup || this.setEventListener(this.setup); }
        onUnsubscribe() { var t; this.hasListeners() || (null == (t = this.cleanup) || t.call(this), this.cleanup = void 0); }
        setEventListener(t) { var e; this.setup = t, null == (e = this.cleanup) || e.call(this), this.cleanup = t((t => { "boolean" === typeof t ? this.setFocused(t) : this.onFocus(); })); }
        setFocused(t) { this.focused !== t && (this.focused = t, this.onFocus()); }
        onFocus() { this.listeners.forEach((({ listener: t }) => { t(); })); }
        isFocused() { return "boolean" === typeof this.focused ? this.focused : "undefined" === typeof document || [void 0, "visible", "prerender"].includes(document.visibilityState); }
    }
    const o = new s;
});
