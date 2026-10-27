// webpack module 2717 from chunk-947
(function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.defaultHead = i, t.default = void 0;
    var r = n(6495).Z, a = n(2648).Z, o = (0, n(1598).Z)(n(7294)), l = a(n(1585)), s = n(8e3), u = n(5850), d = n(9470);
    n(9475);
    function i() { let e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]; const t = [o.default.createElement("meta", { charSet: "utf-8" })]; return e || t.push(o.default.createElement("meta", { name: "viewport", content: "width=device-width" })), t; }
    function c(e, t) { return "string" === typeof t || "number" === typeof t ? e : t.type === o.default.Fragment ? e.concat(o.default.Children.toArray(t.props.children).reduce(((e, t) => "string" === typeof t || "number" === typeof t ? e : e.concat(t)), [])) : e.concat(t); }
    const f = ["name", "httpEquiv", "charSet", "itemProp"];
    function p(e, t) { const { inAmpMode: n } = t; return e.reduce(c, []).reverse().concat(i(n).reverse()).filter(function () { const e = new Set, t = new Set, n = new Set, r = {}; return a => { let o = !0, l = !1; if (a.key && "number" !== typeof a.key && a.key.indexOf("$") > 0) {
        l = !0;
        const t = a.key.slice(a.key.indexOf("$") + 1);
        e.has(t) ? o = !1 : e.add(t);
    } switch (a.type) {
        case "title":
        case "base":
            t.has(a.type) ? o = !1 : t.add(a.type);
            break;
        case "meta": for (let e = 0, t = f.length; e < t; e++) {
            const t = f[e];
            if (a.props.hasOwnProperty(t))
                if ("charSet" === t)
                    n.has(t) ? o = !1 : n.add(t);
                else {
                    const e = a.props[t], n = r[t] || new Set;
                    "name" === t && l || !n.has(e) ? (n.add(e), r[t] = n) : o = !1;
                }
        }
    } return o; }; }()).reverse().map(((e, t) => { const a = e.key || t; if (!n && "link" === e.type && e.props.href && ["https://fonts.googleapis.com/css", "https://use.typekit.net/"].some((t => e.props.href.startsWith(t)))) {
        const t = r({}, e.props || {});
        return t["data-href"] = t.href, t.href = void 0, t["data-optimized-fonts"] = !0, o.default.cloneElement(e, t);
    } return o.default.cloneElement(e, { key: a }); })); }
    var h = function (e) { let { children: t } = e; const n = o.useContext(s.AmpStateContext), r = o.useContext(u.HeadManagerContext); return o.default.createElement(l.default, { reduceComponentsToState: p, headManager: r, inAmpMode: d.isInAmpMode(n) }, t); };
    t.default = h, ("function" === typeof t.default || "object" === typeof t.default && null !== t.default) && "undefined" === typeof t.default.__esModule && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
});
