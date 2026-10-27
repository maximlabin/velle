// webpack module 81 from _app
(function (t, e, n) {
    "use strict";
    n.d(e, { V: function () { return i; } });
    var r = n(2161);
    const i = function () { let t = [], e = 0, n = t => { t(); }, i = t => { t(); }; const s = i => { e ? t.push(i) : (0, r.A4)((() => { n(i); })); }, o = () => { const e = t; t = [], e.length && (0, r.A4)((() => { i((() => { e.forEach((t => { n(t); })); })); })); }; return { batch: t => { let n; e++; try {
            n = t();
        }
        finally {
            e--, e || o();
        } return n; }, batchCalls: t => (...e) => { s((() => { t(...e); })); }, schedule: s, setNotifyFunction: t => { n = t; }, setBatchNotifyFunction: t => { i = t; } }; }();
});
