!function(e, t) {
    if ("object" == typeof exports && "object" == typeof module)
        module.exports = t();
    else if ("function" == typeof define && define.amd)
        define([], t);
    else {
        var n = t();
        for (var r in n)
            ("object" == typeof exports ? exports : e)[r] = n[r]
    }
}(window, (function() {
    return function(e) {
        var t = {};
        function n(r) {
            if (t[r])
                return t[r].exports;
            var o = t[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return e[r].call(o.exports, o, o.exports, n),
            o.l = !0,
            o.exports
        }
        return n.m = e,
        n.c = t,
        n.d = function(e, t, r) {
            n.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: r
            })
        }
        ,
        n.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }
        ,
        n.t = function(e, t) {
            if (1 & t && (e = n(e)),
            8 & t)
                return e;
            if (4 & t && "object" == typeof e && e && e.__esModule)
                return e;
            var r = Object.create(null);
            if (n.r(r),
            Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }),
            2 & t && "string" != typeof e)
                for (var o in e)
                    n.d(r, o, function(t) {
                        return e[t]
                    }
                    .bind(null, o));
            return r
        }
        ,
        n.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            }
            : function() {
                return e
            }
            ;
            return n.d(t, "a", t),
            t
        }
        ,
        n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        ,
        n.p = "",
        n(n.s = 0)
    }([function(e, t, n) {
        e.exports = n(1)
    }
    , function(e, t, n) {
        window.oauthOpen = n(2)
    }
    , function(e, t, n) {
        var r = n(3)
          , o = n(6)
          , c = n(7);
        function u(e, t) {
            var n = c(t)
              , u = setInterval((function() {
                if (e.closed)
                    clearInterval(u);
                else {
                    try {
                        var t = document.location.host
                          , c = e.location.host
                    } catch (e) {}
                    if (c === t && (e.location.search || e.location.hash)) {
                        var i = e.location.search.substring(1).replace(/\/$/, "")
                          , a = e.location.hash.substring(1).replace(/[\/$]/, "")
                          , f = r.parse(a)
                          , l = r.parse(i);
                        (l = o(l, f)).error ? (clearInterval(u),
                        e.close(),
                        n(new Error(l.error))) : (clearInterval(u),
                        e.close(),
                        n(null, l))
                    }
                }
            }
            ), 35)
        }
        function i(e) {
            var t = e.width || 500
              , n = e.height || 500;
            return o({
                width: t,
                height: n,
                left: window.screenX + (window.outerWidth - t) / 2,
                top: window.screenY + (window.outerHeight - n) / 2.5
            }, e || {})
        }
        function a(e) {
            var t = [];
            for (var n in e)
                t.push(n + "=" + e[n]);
            return t.join(",")
        }
        e.exports = function(e, t, n) {
            t = t || {},
            2 == arguments.length && (n = t,
            t = {});
            var r = a(i(t))
              , o = window.open(e, t.name || "", r);
            return o.focus(),
            u(o, n),
            o
        }
    }
    , function(e, t, n) {
        "use strict";
        t.decode = t.parse = n(4),
        t.encode = t.stringify = n(5)
    }
    , function(e, t, n) {
        "use strict";
        function r(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        e.exports = function(e, t, n, c) {
            t = t || "&",
            n = n || "=";
            var u = {};
            if ("string" != typeof e || 0 === e.length)
                return u;
            var i = /\+/g;
            e = e.split(t);
            var a = 1e3;
            c && "number" == typeof c.maxKeys && (a = c.maxKeys);
            var f = e.length;
            a > 0 && f > a && (f = a);
            for (var l = 0; l < f; ++l) {
                var p, s, d, y, v = e[l].replace(i, "%20"), b = v.indexOf(n);
                b >= 0 ? (p = v.substr(0, b),
                s = v.substr(b + 1)) : (p = v,
                s = ""),
                d = decodeURIComponent(p),
                y = decodeURIComponent(s),
                r(u, d) ? o(u[d]) ? u[d].push(y) : u[d] = [u[d], y] : u[d] = y
            }
            return u
        }
        ;
        var o = Array.isArray || function(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        }
    }
    , function(e, t, n) {
        "use strict";
        var r = function(e) {
            switch (typeof e) {
            case "string":
                return e;
            case "boolean":
                return e ? "true" : "false";
            case "number":
                return isFinite(e) ? e : "";
            default:
                return ""
            }
        };
        e.exports = function(e, t, n, i) {
            return t = t || "&",
            n = n || "=",
            null === e && (e = void 0),
            "object" == typeof e ? c(u(e), (function(u) {
                var i = encodeURIComponent(r(u)) + n;
                return o(e[u]) ? c(e[u], (function(e) {
                    return i + encodeURIComponent(r(e))
                }
                )).join(t) : i + encodeURIComponent(r(e[u]))
            }
            )).join(t) : i ? encodeURIComponent(r(i)) + n + encodeURIComponent(r(e)) : ""
        }
        ;
        var o = Array.isArray || function(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        }
        ;
        function c(e, t) {
            if (e.map)
                return e.map(t);
            for (var n = [], r = 0; r < e.length; r++)
                n.push(t(e[r], r));
            return n
        }
        var u = Object.keys || function(e) {
            var t = [];
            for (var n in e)
                Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
            return t
        }
    }
    , function(e, t, n) {
        "use strict";
        var r = Object.prototype.propertyIsEnumerable;
        function o(e) {
            if (null == e)
                throw new TypeError("Object.assign cannot be called with null or undefined");
            return Object(e)
        }
        function c(e) {
            var t = Object.getOwnPropertyNames(e);
            return Object.getOwnPropertySymbols && (t = t.concat(Object.getOwnPropertySymbols(e))),
            t.filter((function(t) {
                return r.call(e, t)
            }
            ))
        }
        e.exports = Object.assign || function(e, t) {
            for (var n, r, u = o(e), i = 1; i < arguments.length; i++) {
                n = arguments[i],
                r = c(Object(n));
                for (var a = 0; a < r.length; a++)
                    u[r[a]] = n[r[a]]
            }
            return u
        }
    }
    , function(e, t, n) {
        var r = n(8);
        function o(e) {
            var t = function() {
                return t.called ? t.value : (t.called = !0,
                t.value = e.apply(this, arguments))
            };
            return t.called = !1,
            t
        }
        function c(e) {
            var t = function() {
                if (t.called)
                    throw new Error(t.onceError);
                return t.called = !0,
                t.value = e.apply(this, arguments)
            }
              , n = e.name || "Function wrapped with `once`";
            return t.onceError = n + " shouldn't be called more than once",
            t.called = !1,
            t
        }
        e.exports = r(o),
        e.exports.strict = r(c),
        o.proto = o((function() {
            Object.defineProperty(Function.prototype, "once", {
                value: function() {
                    return o(this)
                },
                configurable: !0
            }),
            Object.defineProperty(Function.prototype, "onceStrict", {
                value: function() {
                    return c(this)
                },
                configurable: !0
            })
        }
        ))
    }
    , function(e, t) {
        e.exports = function e(t, n) {
            if (t && n)
                return e(t)(n);
            if ("function" != typeof t)
                throw new TypeError("need wrapper function");
            return Object.keys(t).forEach((function(e) {
                r[e] = t[e]
            }
            )),
            r;
            function r() {
                for (var e = new Array(arguments.length), n = 0; n < e.length; n++)
                    e[n] = arguments[n];
                var r = t.apply(this, e)
                  , o = e[e.length - 1];
                return "function" == typeof r && r !== o && Object.keys(o).forEach((function(e) {
                    r[e] = o[e]
                }
                )),
                r
            }
        }
    }
    ])
}
));
