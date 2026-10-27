// webpack module 9643 from _app
(function (t, e, n) {
    "use strict";
    n.d(e, { F: function () { return i; } });
    var r = n(2161);
    class i {
        destroy() { this.clearGcTimeout(); }
        scheduleGc() { this.clearGcTimeout(), (0, r.PN)(this.cacheTime) && (this.gcTimeout = setTimeout((() => { this.optionalRemove(); }), this.cacheTime)); }
        updateCacheTime(t) { this.cacheTime = Math.max(this.cacheTime || 0, null != t ? t : r.sk ? 1 / 0 : 3e5); }
        clearGcTimeout() { this.gcTimeout && (clearTimeout(this.gcTimeout), this.gcTimeout = void 0); }
    }
});
