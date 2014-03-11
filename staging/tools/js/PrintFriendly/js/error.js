(function (g) {
    if (g._errs && _errs.shift) {
        var s = "https:" == location.protocol,
            n = "http" + (s ? "s" : "") + "://p.errorception.com/projects/" + _errs.shift() + "/err",
            y = "<form method='post' action='" + n + "'>",
            k = [],
            t = "before",
            u = document.getElementsByTagName("script")[0],
            p = Array.prototype.slice,
            z = navigator.userAgent,
            q, l = function (a, c) {
                for (var b in a) a.hasOwnProperty(b) && c(b, a[b])
            }, v = function (a) {
                return function (c, b) {
                    b && (a[c] = b)
                }
            }, A = function () {
                var a = document.createElement("iframe");
                a.style.display = "none";
                u.parentNode.insertBefore(a, u);
                setTimeout(function () {
                    a.parentNode.removeChild(a)
                }, 1E4);
                var c = a.contentWindow || a.contentDocument;
                return c.document || c
            }, B = function (a) {
                for (var c = y, b = 0; b < a.length; b++) l(a[b], function (d, e) {
                        if ("meta" !== d) c += r(d + b, e);
                        else {
                            var f = 0;
                            l(a[b].meta, function (a, d) {
                                c += r("meta" + b + "name" + f, a);
                                c += r("meta" + b + "value" + f, d);
                                f++
                            })
                        }
                    });
                return c + "</form><script>onload=function(){setTimeout(function(){document.forms[0].submit()},10);}\x3c/script>"
            }, r = function (a, c) {
                return "<textarea name=" + a + ">" + ("" + c).replace(/</g, "&lt;") + "</textarea>"
            }, C = function (a, c) {
                var b;
                g.XMLHttpRequest && "withCredentials" in new XMLHttpRequest ? (b = new XMLHttpRequest, b.open("post", n, !0), b.setRequestHeader("Content-Type", "text/plain")) : g.XDomainRequest && (b = new XDomainRequest, b.open("POST", n));
                if (b && g.JSON) b.onload = function () {
                        c && 200 == b.status && parseInt(b.responseText) && c(b.responseText)
                }, b.send(JSON.stringify(a));
                else {
                    var d = A();
                    d.open();
                    d.write(B(a));
                    d.close()
                }
            }, D = function () {
                if (_errs.meta) {
                    var a;
                    l(_errs.meta, function (c, b) {
                        /string|number|boolean/.test(typeof b) && (a = a || {}, a[c] = b)
                    });
                    return a
                }
            }, E = function () {
                for (var a = [], c; c = k.shift();) {
                    a.push(c);
                    if (k.length && "2" == c.method) {
                        var b = k.shift();
                        "2" != c.method || "2" === b.method || -1 == b.message.indexOf(c.message) && -1 == c.message.indexOf(b.message) ? k.unshift(b) : !c.line && b.line && (c.line = b.line)
                    }
                    c.line || c.stack || a.pop()
                }
                return a
            }, w = function (a) {
                q && clearTimeout(q);
                try {
                    var c;
                    if (a) {
                        var b;
                        a.m ? b = {
                            message: a.m,
                            url: a.u,
                            line: a.l,
                            method: "0"
                        } : a.length ? (b = {
                            message: a[0],
                            url: a[1],
                            line: a[2],
                            method: "1"
                        }, l({
                            column: a[3],
                            stack: a[4] && a[4].stack ? a[4].stack : a.stacktrace || a.stack,
                            number: a.number
                        }, v(b))) : a instanceof Error && (b = {
                            message: a.name + ": " + a.message,
                            method: "2"
                        }, l({
                            url: a.fileName || a.sourceURL,
                            line: a.line || a.lineNumber,
                            column: a.columnNumber,
                            stack: a.stacktrace || a.stack,
                            number: a.number
                        }, v(b)));
                        c = b
                    } else c = void 0; if (!c) return;
                    c.when = t;
                    c.page = location.href;
                    var d = D();
                    d && (c.meta = d);
                    if (!c.stack && a.callee && a.callee.caller && a.callee.caller.caller) {
                        b = c;
                        var e, f = a.callee.caller;
                        a = /function\s*([\w\-$]+)?\s*\(/i;
                        for (var d = [], g; f && f.arguments && 10 > d.length;) g = a.test(f.toString()) ? RegExp.$1 || "{anonymous}" : "{anonymous}", d.push(g + "(" + (s ? "" : m(p.call(f.arguments || []))) + ")"), f = f.caller;
                        (e = 1 < d.length ? d.join("\n") : "") && (b.stack = e)
                    }
                    e = c;
                    "Error loading script" == e.message && /Firefox/.test(z) || !e.message || 0 == e.line || e.url && 0 === e.url.split("#")[0].indexOf(location.href.split("#")[0]) && 1 == e.line || "script error." == e.message.toLowerCase() || /originalCreateNotification/.test(e.message) || /atomicFindClose/.test(e.message) || /jid1\-ejhbjdxm9zr4tq/.test(e.url) || "miscellaneous_bindings" == e.url || k.push(c)
                } catch (h) {}
                q = setTimeout(F, 200)
            }, F = function () {
                try {
                    var a = E();
                    a.length && C(a, function (a) {
                        !_errs.silent && g.console && console.log && console.log("Posted " + a + " error" + (1 == a ? "" : "s") + " to errorception.com")
                    })
                } catch (c) {}
            }, m = function (a) {
                for (var c = [], b = 0; b < a.length; ++b) {
                    var d = a[b];
                    void 0 === d || null === d ? c[b] = "" + d : d.constructor && (d.constructor == Array ? c[b] = 3 > d.length ? "[" + m(d) + "]" : "[" + m(p.call(d, 0, 1)) + "..." + m(p.call(d, -1)) + "]" : d.constructor == Object ? c[b] = "#object" : d.constructor == Function ? c[b] = "#function" : d.constructor == String ? c[b] = '"' + d + '"' : d.constructor == Number && (c[b] = d))
                }
                return c.join()
            }, h;
        for (; h = _errs.shift();) w(h);
        t = "after";
        h = _errs.meta;
        var x = _errs.silent;
        _errs = {
            push: w
        };
        h && (_errs.meta = h);
        x && (_errs.silent = x)
    }
})(window);