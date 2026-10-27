// webpack module 7811 from _app
(function (t, e) {
    "use strict";
    var n = /; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g, r = /^[\u000b\u0020-\u007e\u0080-\u00ff]+$/, i = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/, s = /\\([\u000b\u0020-\u00ff])/g, o = /([\\"])/g, a = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;
    function u(t) { var e = String(t); if (i.test(e))
        return e; if (e.length > 0 && !r.test(e))
        throw new TypeError("invalid parameter value"); return '"' + e.replace(o, "\\$1") + '"'; }
    function c(t) { this.parameters = Object.create(null), this.type = t; }
    e.Q = function (t) { if (!t)
        throw new TypeError("argument string is required"); var e = "object" === typeof t ? function (t) { var e; "function" === typeof t.getHeader ? e = t.getHeader("content-type") : "object" === typeof t.headers && (e = t.headers && t.headers["content-type"]); if ("string" !== typeof e)
        throw new TypeError("content-type header is missing from object"); return e; }(t) : t; if ("string" !== typeof e)
        throw new TypeError("argument string is required to be a string"); var r = e.indexOf(";"), i = -1 !== r ? e.slice(0, r).trim() : e.trim(); if (!a.test(i))
        throw new TypeError("invalid media type"); var o = new c(i.toLowerCase()); if (-1 !== r) {
        var u, l, d;
        for (n.lastIndex = r; l = n.exec(e);) {
            if (l.index !== r)
                throw new TypeError("invalid parameter format");
            r += l[0].length, u = l[1].toLowerCase(), 34 === (d = l[2]).charCodeAt(0) && -1 !== (d = d.slice(1, -1)).indexOf("\\") && (d = d.replace(s, "$1")), o.parameters[u] = d;
        }
        if (r !== e.length)
            throw new TypeError("invalid parameter format");
    } return o; };
});
