// webpack module 3989 from _app
(function (t, e, n) {
    "use strict";
    n.d(e, { l: function () { return r; } });
    class r {
        constructor() { this.listeners = new Set, this.subscribe = this.subscribe.bind(this); }
        subscribe(t) { const e = { listener: t }; return this.listeners.add(e), this.onSubscribe(), () => { this.listeners.delete(e), this.onUnsubscribe(); }; }
        hasListeners() { return this.listeners.size > 0; }
        onSubscribe() { }
        onUnsubscribe() { }
    }
});
