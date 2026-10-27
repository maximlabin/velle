// webpack module 6474 from _app
(function (t, e, n) {
    "use strict";
    n.d(e, { N: function () { return a; } });
    var r = n(3989), i = n(2161);
    const s = ["online", "offline"];
    class o extends r.l {
        constructor() { super(), this.setup = t => { if (!i.sk && window.addEventListener) {
            const e = () => t();
            return s.forEach((t => { window.addEventListener(t, e, !1); })), () => { s.forEach((t => { window.removeEventListener(t, e); })); };
        } }; }
        onSubscribe() { this.cleanup || this.setEventListener(this.setup); }
        onUnsubscribe() { var t; this.hasListeners() || (null == (t = this.cleanup) || t.call(this), this.cleanup = void 0); }
        setEventListener(t) { var e; this.setup = t, null == (e = this.cleanup) || e.call(this), this.cleanup = t((t => { "boolean" === typeof t ? this.setOnline(t) : this.onOnline(); })); }
        setOnline(t) { this.online !== t && (this.online = t, this.onOnline()); }
        onOnline() { this.listeners.forEach((({ listener: t }) => { t(); })); }
        isOnline() { return "boolean" === typeof this.online ? this.online : "undefined" === typeof navigator || "undefined" === typeof navigator.onLine || navigator.onLine; }
    }
    const a = new o;
});
