var pfHeaderImgUrl = '';
var pfHeaderTagline = '';
var pfdisableClickToDel = 0;
var pfHideImages = 0;
var pfImageDisplayStyle = 'right';
var pfDisablePDF = 1;
var pfDisableEmail = 1;
var pfDisablePrint = 0;
var pfCustomCSS = '';
var pfBtVersion='1';
var PF_VERSION = "2014-03-07-090624306",
    pfMod = window.pfMod || function (c, k) {
        var f = c.document.location.protocol,
            h = {
                environment: "production",
                protocol: f,
                dir: "ltr",
                usingBM: !1,
                hosts: {
                    cdn: "https:" == f ? "https://d3nekkt1lmmhms.cloudfront.net" : "http://cdn.printnicer.com",
                    pf: f + "//www.printfriendly.com",
                    ds: f + "//ds.printfriendly.com",
                    pdf: f + "//pdf.printfriendly.com",
                    email: f + "//email-srv.printfriendly.com",
                    tracker: f + "//log.printfriendly.com",
                    page: c.location.host
                },
                domains: {
                    page: c.location.host.split(":")[0].split("www.").pop()
                }
            },
            d = {
                isReady: !1,
                readyBound: !1,
                addStyles: function () {
                    var a = document.getElementsByTagName("head")[0],
                        b = document.createElement("style");
                    b.type = "text/css";
                    b.styleSheet ? b.styleSheet.cssText = "body * { z-index: 0 !important; }" : b.appendChild(document.createTextNode("body * { z-index: 0 !important; }"));
                    a.appendChild(b)
                },
                setWidthOfImages: function () {
                    for (var a = document.getElementsByTagName("img"), b = 0; b < a.length; b++) {
                        var c = a[b];
                        c.width = c.width
                    }
                },
                convertRelativetoAbsolute: function (a) {
                    for (var b = document.getElementsByTagName(a),
                            c = 0; c < b.length; c++) {
                        var d = b[c];
                        try {
                            "img" === a ? d.src = d.src : d.href = d.href
                        } catch (e) {}
                    }
                },
                removeScripts: function () {
                    for (var a = document.getElementsByTagName("script"), b = a.length - 1; 0 <= b; b -= 1) if ("undefined" === typeof a[b].src || -1 === a[b].src.indexOf("printfriendly")) a[b].nodeValue = "", a[b].removeAttribute("src"), a[b].parentNode && a[b].parentNode.removeChild(a[b])
                },
                markHiddenElements: function () {
                    var a, b;
                    c.getComputedStyle ? a = "standard" : document.body.currentStyle && (a = "ie");
                    for (var d = document.body.getElementsByTagName("*"),
                            e = 0; e < d.length; e++) {
                        var f = d[e];
                        "ie" === a ? b = f.currentStyle.display : "standard" === a && (b = c.getComputedStyle(f, null).getPropertyValue("display"));
                        "none" === b && (f.className += " hidden-originally")
                    }
                },
                ready: function () {
                    if (!d.isReady) {
                        if (!document.body) return setTimeout(d.ready, 13);
                        d.isReady = !0;
                        d.readyFunc.call()
                    }
                },
                doScrollCheck: function () {
                    if (!d.isReady) {
                        try {
                            document.documentElement.doScroll("left")
                        } catch (a) {
                            return setTimeout(d.doScrollCheck, 50)
                        }
                        d.detach();
                        d.ready()
                    }
                },
                detach: function () {
                    document.addEventListener ?
                        (document.removeEventListener("DOMContentLoaded", d.completed, !1), c.removeEventListener("load", d.completed, !1)) : document.attachEvent && "complete" === document.readyState && (document.detachEvent("onreadystatechange", d.completed), c.detachEvent("onload", d.completed))
                },
                completed: function (a) {
                    if (document.addEventListener || "load" === a.type || "complete" === document.readyState) d.detach(), d.ready()
                },
                bindReady: function () {
                    if (!d.readyBound) {
                        d.readyBound = !0;
                        if ("complete" === document.readyState) return d.ready();
                        if (document.addEventListener) document.addEventListener("DOMContentLoaded",
                                d.completed, !1), c.addEventListener("load", d.completed, !1);
                        else if (document.attachEvent) {
                            document.attachEvent("onreadystatechange", d.completed);
                            c.attachEvent("onload", d.completed);
                            var a = !1;
                            try {
                                a = null == c.frameElement
                            } catch (b) {}
                            a && document.documentElement.doScroll && d.doScrollCheck()
                        }
                    }
                },
                domReady: function (a) {
                    this.readyFunc = a;
                    this.bindReady()
                }
            }, g = {
                headerImageUrl: c.pfHeaderImgUrl,
                headerTagline: c.pfHeaderTagline,
                imageDisplayStyle: c.pfImageDisplayStyle,
                customCSSURL: c.pfCustomCSS,
                disableClickToDel: c.pfdisableClickToDel,
                disablePDF: c.pfDisablePDF,
                disablePrint: c.pfDisablePrint,
                disableEmail: c.pfDisableEmail,
                hideImages: c.pfHideImages
            }, e = {
                version: PF_VERSION,
                initialized: !1,
                init: function (a) {
                    this.initialized = !0;
                    this.configure(a);
                    this.setVariables();
                    this.detectBrowser();
                    this.startIfNecessary();
                    c.print = this.start
                },
                configure: function (a) {
                    this.config = h;
                    if (a) {
                        this.config.environment = "development";
                        for (var b in a.hosts) this.config.hosts[b] = a.hosts[b]
                    }
                },
                startIfNecessary: function () {
                    (c.pfstyle || -1 != this.config.urls.page.indexOf("pfstyle=wp")) &&
                        this.start()
                },
                start: function () {
                    e.isRedirectNecessary() ? e.redirect() : d.domReady(function () {
                        e.startTime = (new Date).getTime();
                        e.cacheBodyHTML();
                        e.createMask();
                        e.loadCore()
                    })
                },
                setVariables: function () {
                    Math.random();
                    var a;
                    this.config.urls = {
                        js: {
                            jquery: "http://dev.nretnil.com/staging/tools/js/PrintFriendly/js/jquery.min.js",
                            core: "http://dev.nretnil.com/staging/tools/js/PrintFriendly/js/core.js",
                            algo: "http://dev.nretnil.com/staging/tools/js/PrintFriendly/js/algo.js"
                        },
                        css: {
                            page: "http://dev.nretnil.com/staging/tools/js/PrintFriendly/css/main.css"
                        },
                        pdfMake: this.config.hosts.pdf + "/pdfs/make",
                        email: this.config.hosts.email + "/email/new"
                    };
                    try {
                        a = top.location.href
                    } catch (b) {
                        a = c.location.href
                    }
                    this.config.urls.page = a;
                    this.userSettings = g;
                    !c.pfstyle || "bk" !== c.pfstyle && "nbk" !== c.pfstyle && "cbk" !== c.pfstyle || (this.config.usingBM = !0)
                },
                detectBrowser: function () {
                    this.browser = {};
                    var a = navigator.appVersion; - 1 !== a.indexOf("MSIE") ? (this.browser.version = parseFloat(a.split("MSIE")[1]), this.browser.isIE = !0) : this.browser.isIE = !1
                },
                createIframe: function (a) {
                    a =
                        a.createElement("iframe");
                    a.src = "javascript:false";
                    a.frameBorder = "0";
                    a.allowTransparency = "true";
                    return a
                },
                loadHtmlInIframe: function (a, b, d) {
                    var c;
                    try {
                        c = b.contentWindow.document
                    } catch (e) {
                        a = a.domain, b.src = "javascript:var d=document.open();d.domain='" + a + "';void(0);", c = b.contentWindow.document
                    }
                    c.write(d);
                    c.close()
                },
                redirect: function () {
                    var a = ["redirect=1", "url=" + encodeURIComponent(top.location.href)],
                        b;
                    for (b in g) "undefined" !== typeof g[b] && a.push(b + "=" + encodeURIComponent(g[b]));
                    top.location.replace(this.config.hosts.pf +
                        "/print/?" + a.join("&"))
                },
                isRedirectNecessary: function () {
                    try {
                        return navigator.userAgent.match(/(iphone|ipad|ipod|android)/i) || this.browser.isIE && 8 > this.browser.version || "undefined" !== typeof $ && $.jcarousel && this.browser.isIE || this.browser.isIE && 9 > this.browser.version && "skinnytaste.com" === this.config.domains.page ? !0 : !1
                    } catch (a) {
                        return !1
                    }
                },
                createMask: function () {
                    var a = document.createElement("div");
                    a.innerHTML = '<div id="pf-mask" style="z-index: 2147483627!important; position: fixed !important; top: 0pt !important; left: 0pt !important; background-color: rgb(0, 0, 0) !important; opacity: 0.8 !important;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=80); height: 100% !important; width: 100% !important;"></div>';
                    document.body.appendChild(a.firstChild)
                },
                cacheBodyHTML: function () {
                    d.addStyles();
                    d.setWidthOfImages();
                    d.convertRelativetoAbsolute("a");
                    d.convertRelativetoAbsolute("img");
                    d.removeScripts();
                    d.markHiddenElements();
                    e.bodyCache = '<div id="' + document.body.id + '" class="' + document.body.className + ' pf-body-cache">' + document.body.innerHTML + "</div>";
                    e.browser.isIE && (document.body.innerHTML = "<p></p>")
                },
                refresh: function () {
                    var a = e.config.urls.page.replace("pfstyle=wp", "").replace(/#(.*)$/, "");
                    try {
                        return document.body.innerHTML =
                            '<div style="position:absolute; top:0; bottom:0; left:0; right:0; padding:10%; text-align:center; background:#333;">&nbsp;</div>', -1 === e.config.urls.page.indexOf("pfstyle") ? c.top.location.reload() : c.top.location.href = a, !1
                    } catch (b) {
                        setTimeout(function () {
                            c.top.location.replace(a)
                        }, 100)
                    }
                },
                removeDoubleSemiColon: function (a) {
                    return a.replace(/;{2}/g, ";")
                },
                loadCore: function () {
                    var a = ['<!DOCTYPE html><html><head><meta http-equiv="X-UA-Compatible" content="IE=edge" /><script>(function(_,e,rr,s){_errs=[s];var c=_.onerror;_.onerror=function(){var a=arguments;_errs.push(a); c&&c.apply(this,a)};var b=function(){var c=e.createElement(rr),b=e.getElementsByTagName(rr)[0]; c.src="http://dev.nretnil.com/staging/tools/js/PrintFriendly/js/error.js";c.async=!0;b.parentNode.insertBefore(c,b)}; _.addEventListener?_.addEventListener("load",b,!1):_.attachEvent("onload",b)}) (window,document,"script","51dd5a5a0a7b9b3d5a0004f8");\x3c/script>',
                            '<script src="' + this.config.urls.js.jquery + '"></', "script>", '<script src="' + this.config.urls.js.core + '"></', 'script><link media="screen" type="text/css" rel="stylesheet" href="', this.config.urls.css.page + '">', '</head><body onload="core.init();"></body>'
                    ].join(""),
                        b = this.createIframe(document);
                    b.id = "pf-core";
                    document.body.appendChild(b);
                    b.style.cssText = this.removeDoubleSemiColon(b.style.cssText + ";width: 100% !important;height: 100% !important; display: block !important; overflow: hidden !important; position: absolute !important; top: 0px !important; left: 0px !important; background-color: transparent !important; z-index: 2147483637!important");
                    this.loadHtmlInIframe(document, b, a)
                }
            };
        return e
    }(window),
    priFri = pfMod;
"algo" === window.name || pfMod.initialized || pfMod.init(window.pfOptions);