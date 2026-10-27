// webpack module 1585 from chunk-947
(function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.default = function (e) { const { headManager: t, reduceComponentsToState: n } = e; function s() { if (t && t.mountedInstances) {
        const a = r.Children.toArray(Array.from(t.mountedInstances).filter(Boolean));
        t.updateHead(n(a, e));
    } } if (a) {
        var u;
        null == t || null == (u = t.mountedInstances) || u.add(e.children), s();
    } return o((() => { var n; return null == t || null == (n = t.mountedInstances) || n.add(e.children), () => { var n; null == t || null == (n = t.mountedInstances) || n.delete(e.children); }; })), o((() => (t && (t._pendingUpdate = s), () => { t && (t._pendingUpdate = s); }))), l((() => (t && t._pendingUpdate && (t._pendingUpdate(), t._pendingUpdate = null), () => { t && t._pendingUpdate && (t._pendingUpdate(), t._pendingUpdate = null); }))), null; };
    var r = (0, n(1598).Z)(n(7294));
    const a = !1, o = a ? () => { } : r.useLayoutEffect, l = a ? () => { } : r.useEffect;
});
