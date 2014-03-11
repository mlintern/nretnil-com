Cookie = {
    set: function (a, b, c) {
        if (c) {
            var d = new Date;
            d.setTime(d.getTime() + 864E5 * c);
            c = "; expires=" + d.toGMTString()
        } else c = "";
        document.cookie = a + "=" + b + c + "; path=/"
    },
    get: function (a) {
        a += "=";
        for (var b = document.cookie.split(";"), c = 0; c < b.length; c++) {
            for (var d = b[c];
            " " == d.charAt(0);) d = d.substring(1, d.length);
            if (0 == d.indexOf(a)) return d.substring(a.length, d.length)
        }
        return null
    },
    erase: function (a) {
        createCookie(a, "", -1)
    }
};
String.prototype.trim = function () {
    return $.trim(this.replace(/&nbsp;/g, ""))
};
var _window = window.parent,
    _document = _window.document,
    pf = _window.pfMod;
(function () {
    for (var a, b = function () {}, c = "assert clear count debug dir dirxml error exception group groupCollapsed groupEnd info log markTimeline profile profileEnd table time timeEnd timeStamp trace warn".split(" "), d = c.length, e = window.console = window.console || {}; d--;) a = c[d], e[a] || (e[a] = b);
    window.log = "development" == pf.config.environment ? Function.prototype.bind ? Function.prototype.bind.call(e.log, e) : function () {
        Function.prototype.apply.call(e.log, e, arguments)
    } : b
})();
var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
        this.OS = this.searchString(this.dataOS) || "an unknown OS"
    },
    searchString: function (a) {
        for (var b = 0; b < a.length; b++) {
            var c = a[b].string,
                d = a[b].prop;
            this.versionSearchString = a[b].versionSearch || a[b].identity;
            if (c) {
                if (-1 != c.indexOf(a[b].subString)) return a[b].identity
            } else if (d) return a[b].identity
        }
    },
    searchVersion: function (a) {
        var b = a.indexOf(this.versionSearchString);
        if (-1 != b) return parseFloat(a.substring(b + this.versionSearchString.length + 1))
    },
    dataBrowser: [{
            string: navigator.userAgent,
            subString: "Chrome",
            identity: "Chrome"
        }, {
            string: navigator.userAgent,
            subString: "OmniWeb",
            versionSearch: "OmniWeb/",
            identity: "OmniWeb"
        }, {
            string: navigator.vendor,
            subString: "Apple",
            identity: "Safari",
            versionSearch: "Version"
        }, {
            prop: window.opera,
            identity: "Opera",
            versionSearch: "Version"
        }, {
            string: navigator.vendor,
            subString: "iCab",
            identity: "iCab"
        }, {
            string: navigator.vendor,
            subString: "KDE",
            identity: "Konqueror"
        }, {
            string: navigator.userAgent,
            subString: "Firefox",
            identity: "Firefox"
        }, {
            string: navigator.vendor,
            subString: "Camino",
            identity: "Camino"
        }, {
            string: navigator.userAgent,
            subString: "Netscape",
            identity: "Netscape"
        }, {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "Explorer",
            versionSearch: "MSIE"
        }, {
            string: navigator.userAgent,
            subString: "Gecko",
            identity: "Mozilla",
            versionSearch: "rv"
        }, {
            string: navigator.userAgent,
            subString: "Mozilla",
            identity: "Netscape",
            versionSearch: "Mozilla"
        }
    ],
    dataOS: [{
            string: navigator.platform,
            subString: "Win",
            identity: "Windows"
        }, {
            string: navigator.platform,
            subString: "Mac",
            identity: "Mac"
        }, {
            string: navigator.userAgent,
            subString: "iPhone",
            identity: "iPhone/iPod"
        }, {
            string: navigator.platform,
            subString: "Linux",
            identity: "Linux"
        }
    ]
};
try {
    BrowserDetect.init()
} catch (e$$16) {}
var imageFreeDomains = "skinnytaste.com pieceofcakekitchen.com naturesgarden.co.za cehd.gmu.edu greatlittlespots.com thesportsresume.com azaleafalls.com americantrails.org".split(" "),
    deleteDisabledDomains = "tourismresearchmt.org equalvoiceforfamilies.org mansmith.net matthewlberg.com qrgtx.com withoutreservation.org knitting-and.com sbdcnet.org inglesonline.com.br courtroomlogic.com rachaelcampbell.com cateringbyanne.com fundschoolhouse.com shulamitgallery.com thekitchencousins.com prouds.com.fj lawnow.org rohanphoto.com kerrygoldusa.com".split(" "),
    settings = {
        adFree: !0,
        brandFree: !0,
        hideImages: !1,
        disableClickToDel: !1,
        localeInformationFetched: !1,
        algoRunFinished: !1,
        localizedClickToDelTitle: "click to delete",
        clickToDelElements: "p, img, blockquote, h1, h2, h3, h4, h5, h6, ol, ul, li, a, table, td, pre, span, code, dl, dt, dd, hr, div.pf-caption",
        nonClickToDelElements: "#pf-src, #pf-src-icon, .pf-src-icon, .pf-src-name, .pf-src-url, #copyright, .copyright, .delete-off, .delete-no",
        setup: function () {
            pf.config.dir = _window.dir || $("body", _document).css("direction") ||
                $("body", _document).attr("dir") || $("html", _document).attr("dir") || "ltr";
            var a = this;
            $.each(imageFreeDomains, function (b, c) {
                if (-1 != pf.config.domains.page.indexOf(c)) return a.hideImages = !0, !1
            });
            $.each(deleteDisabledDomains, function (b, c) {
                if (-1 != pf.config.domains.page.indexOf(c)) return a.disableClickToDel = !0, !1
            });
            1 === parseInt(pf.userSettings.disableClickToDel) && (this.disableClickToDel = !0);
            1 === parseInt(pf.userSettings.hideImages) && (this.hideImages = !0)
        }
    }, ad = {
        create: function () {
            if ("https:" !== pf.config.protocol && !settings.adFree) {
                var a = pf.config.hosts.cdn + "/ads/" + settings.adType + ".html";
                $("body", _document).append('<iframe frameborder="0"  name="gaiframe" id="gaiframe" src="' + a + '" style="position:absolute!important; top:296px!important; left:50%!important; height:255px!important; width:636px!important; margin-left:-312px!important; z-index: 2147483647!important; display:none;"></iframe>')
            }
        },
        show: function () {
            "https:" === pf.config.protocol || settings.adFree || ($("#pf-dialog-ads").show(), $("#gaiframe", _document).show())
        },
        hide: function () {
            $("#pf-dialog-ads").hide();
            $("#gaiframe", _document).hide()
        }
    }, core = {
        deletedNodes: [],
        deletedNodesCss: [],
        init: function () {
            if (!document.body) return setTimeout(core.init, 13);
            core.start()
        },
        start: function () {
            var a = (new Date).getTime();
            this.getSettingsFromPFServer();
            this.cleanOriginalDoc();
            this.resetMarginPadding();
            settings.setup();
            ui.setup();
            this.createAlgoIframe();
            log("Core.js Time: " + ((new Date).getTime() - a) + " ms")
        },
        cleanOriginalDoc: function () {
            $('iframe:not([id="pf-core"]),object, video, embed',
                _document).remove()
        },
        resetMarginPadding: function () {
            var a = _document.getElementsByTagName("head")[0],
                b = _document.createElement("style");
            b.type = "text/css";
            b.styleSheet ? b.styleSheet.cssText = "body * { z-index: 0 !important; }" : b.appendChild(_document.createTextNode("body * { z-index: 0 !important; }"));
            a.appendChild(b);
            $("html,body", _document).css({
                overflow: "hidden",
                margin: "0",
                height: "100%",
                position: "static"
            });
            $("html,body").css({
                margin: "0px",
                padding: "0px",
                overflow: "hidden",
                "text-align": "center"
            });
            pf.browser.isIE &&
                $("body").css({
                overflow: "hidden",
                "overflow-y": "hidden",
                "background-color": "transparent"
            })
        },
        showOriginalPage: function () {
            pf.algoDoc.body.innerHTML = "";
            document.getElementById("algo-iframe").contentWindow.location.replace(pf.config.urls.page.replace("pfstyle=wp", "").replace(/#(.*)$/, ""));
            this.enableOnlyPrint()
        },
        enableOnlyPrint: function () {
            $(".pf-toolbar li").hide();
            $("#w-print").show();
            toolbar.printOnlySetup()
        },
        createAlgoIframe: function () {
            var a = $("title", _document).html(),
                b = "";
            "" !== $.trim(pf.userSettings.customCSSURL) &&
                (b = '<link media="screen,print" type="text/css" rel="stylesheet" href="' + $.trim(pf.userSettings.customCSSURL) + '">');
            a = ['<!DOCTYPE html><html><head><meta http-equiv="X-UA-Compatible" content="IE=edge" /><title>', a, "</title>", '<script src="' + pf.config.urls.js.algo + '">\x3c/script>', '<link media="screen,print" type="text/css" rel="stylesheet" href="', pf.config.urls.css.page + '">', b, '</head><body onload="setup.init();"></body>'].join("");
            b = pf.createIframe(document);
            b.id = "algo-iframe";
            b.name = "algo";
            $(b).height(ui.iframeHeight).insertBefore("#pf-ft");
            pf.algoIframe = b;
            pf.loadHtmlInIframe(document, b, a)
        },
        getSettingsFromPFServer: function () {
            $.ajax({
                url: pf.config.hosts.ds + "/domains/settings",
                dataType: "jsonp",
                data: {
                    url: pf.config.urls.page
                },
                success: function (a) {
                    $(".localize").map(function () {
                        this.innerHTML = a.translations[this.id] || this.innerHTML
                    });
                    settings.localizedClickToDelTitle = a.translations["delete"];
                    settings.localeInformationFetched = !0;
                    core.localizeClickToDelete();
                    settings.adFree = true;
                    settings.adType = a.domain_settings.ad_type;
                    settings.brandFree = true;
                    //ad.create();
                    //settings.brandFree || $("#pf-ft").show()
                }
            })
        },
        localizeClickToDelete: function () {
            settings.localeInformationFetched && settings.algoRunFinished && $("body", pf.algoDoc).append('<style>.hilight:before { content:"' + settings.localizedClickToDelTitle + '" !important;"}</style>')
        },
        runPostAlgoProcesses: function (a) {
            pf.config.dir = "rtl" === pf.config.dir.toLowerCase() ? "rtl" : a.dir;
            var b = (new Date).getTime();
            pf.algoDoc = pf.algoIframe.contentWindow.document;
            a.hasContent ?
                (this.processImages(), this.processText(), toolbar.setup()) : (this.showOriginalPage(), reporter.sendErrorReport("js.algo.failure"));
            $(_window).scrollTop(0);
            settings.hideImages && $("#wri").click();
            this.setupFontSize();
            settings.algoRunFinished = !0;
            ui.hideLoader();
            this.localizeClickToDelete();
            log("Post Algo Process Time: " + ((new Date).getTime() - b) + " ms");
            log("Total Time: " + ((new Date).getTime() - pf.startTime) + " ms")
        },
        customPrint: function () {
            var a = frames.algo;
            a.focus();
            pf.browser.isIE ? a.document.execCommand("print", !1, null) : a.print()
        },
        hideImages: function () {
            $("#pf-content img", pf.algoDoc).toggleClass("pf-hidden");
            $("#pf-content img.thumbimage", pf.algoDoc).parents(".thumbinner").toggleClass("pf-hidden");
            $("#pf-content img", pf.algoDoc).parents(".img-separator").toggleClass("pf-hidden")
        },
        processImages: function () {
            var a = "right"; - 1 !== $.inArray(pf.userSettings.imageDisplayStyle, ["left", "right", "block", "none"]) && (a = pf.userSettings.imageDisplayStyle);
            $("#pf-content img.smallImage", pf.algoDoc).each(function () {
                var b = "1em 1.5em";
                "block" == a ? $(this).css({
                    display: "block",
                    clear: "both",
                    "float": "none",
                    margin: "1em 0"
                }) : (b = "none" == a ? "0" : "left" == a ? "1em 1.5em 1em 0" : "1em 0 1em 1.5em", $(this).css({
                    "float": a,
                    clear: pf.imageDisplayStyle,
                    margin: b
                }))
            });
            $("img[original], img[data-lazy-src], img[data-href]", pf.algoDoc).each(function () {
                this.src = $(this).attr("original") || $(this).attr("data-lazy-src") || $(this).attr("data-href")
            });
            $(".wp-caption img, .caption img, .tr-caption-container img, .thumbinner img.thumbimage", pf.algoDoc).each(function () {
                $(this).parents(".wp-caption, .caption, .tr-caption-container").width(this.offsetWidth).addClass("pf-caption");
                $(this).hasClass("thumbimage") && $(this).parents(".thumbinner").width(this.offsetWidth).addClass("pf-caption")
            })
        },
        processText: function () {
            $("body", pf.algoDoc).append('<br style="clear:both">');
            $("#pf-content, #pf-title", pf.algoDoc).css({
                direction: pf.config.dir
            });
            try {
                this.convertTextNodes(pf.algoDoc.getElementById("pf-content"), pf.algoDoc), $("#pf-content a, #pf-content li", pf.algoDoc).each(function (a) {
                    a = $(this);
                    "" === a.text().trim() && 0 === a.find("img,canvas,svg").size() && a.remove()
                }), $("#pf-content div.separator",
                    pf.algoDoc).each(function (a) {
                    a = $(this);
                    var c = a.next(),
                        d = a.prev();
                    a.children().size() == a.find("a,br").size() && (a.addClass("img-separator"), 0 === d.find("img").size() && "" === d.text().trim() && d.remove(), 0 === c.find("img").size() && "" === c.text().trim() && c.remove());
                    0 === a.find("a,img").size() && "" === a.text().trim() && a.remove()
                })
            } catch (a) {
                log("processText failed")
            }
        },
        convertTextNodes: function (a, b) {
            try {
                var c = a.childNodes,
                    d = c.length;
                if (3 == a.nodeType && -1 === $.inArray(a.parentNode.nodeName.toLowerCase(), settings.clickToDelElements.split(","))) {
                    if ("" !==
                        $.trim(a.nodeValue)) {
                        var e = b.createElement("span");
                        e.innerHTML = a.nodeValue;
                        e.className = "text-node";
                        a.parentNode.replaceChild(e, a)
                    }
                } else if (1 < d || 1 == d && 3 != c[0].nodeType) for (e = 0; e < d; e++) core.convertTextNodes(c[e], b)
            } catch (f) {}
        },
        setupFontSize: function () {
            var a = Cookie.get("printfriendly-font-class");
            a || (a = "pf-12");
            $("#textsize").val(a).trigger("change")
        }
    }, ui = {
        setup: function () {
            this.calculateHeights();
            this.fillBody()
        },
        calculateHeights: function () {
            var a = _document.body,
                b = _document.documentElement.clientHeight;
            this.height = ("CSS1Compat" === _document.compatMode && b || a && a.clientHeight || b) - 20;
            this.iframeHeight = this.height - 105
        },
        fillBody: function () {
            document.body.innerHTML = this.bodyHTML()
        },
        bodyHTML: function () {
            return ['<form id="pf-pdf-form" method="post" action="' + pf.config.urls.pdfMake + '" target="pdf_iframe" accept-charset="UTF-8">', '<input type="hidden" name="hostname" value="">\n<input type="hidden" name="code" value="" >\n<input name="iehack" type="hidden" value="&#9760;">\n<input type="hidden" name="title" value="" >\n<input type="hidden" name="custom_css_url" value="" >\n<input type="hidden" name="dir" value="" >\n</form>\n<div id="pf-app" class="pf-app">\n<div class="pf-toolbar">\n<ul>\n<li id="w-print"><a href="#">\n<div class="pf-sprite"></div>\n<span class="localize" id="print">Print</span></a></li>\n<li id="w-pdf"><a href="#">\n<div class="pf-sprite"></div>\n<span class="localize" id="pdf">PDF</span></a></li>\n<li id="w-email"><a href="#">\n<div class="pf-sprite"></div>\n<span class="localize pf-email" id="email">Email</span></a></li>\n</ul>\n<div class="pf-options">\n<ul class="pf-options">\n<li id="w-txtsize"><label for="textsize"><select name="txtsize" id="textsize"><option value="pf-9">70%</option><option value="pf-10">80%</option><option value="pf-11">90%</option><option value="pf-12" selected="selected">100%</option><option value="pf-13">110%</option><option value="pf-14">120%</option><option value="pf-15">130%</option></select><span class="localize" id="txt-size">Text Size</span></label></li>\n<li id="w-remove-images"><label for="wri"><input type="checkbox" id="wri"><span class="localize" id="remove-images">Remove Images</span></label></li>\n<li id="w-undo"><a href="#">\n<div class="pf-sprite"></div>\n<span class="localize" id="undo">Undo</span></a></li>\n</ul>\n</div>\n<a href="#" id="pf-app-close"><span class="pf-sprite">Close</span></a>\n</div>\n<div id="pf-dialog">\n<div class="pf-dialog">\n<a href="#" title="close window" id="pf-d-close-wrap">\n<span class="localize" id="dialog-close">close</span>\n<span class="pf-sprite"></span></a>\n<div id="pf-dialog-print" class="pf-dialog-head">\n<div class="iefix">\n<div class="pf-sprite"></div>\n<h2 class="localize" id="dialog-title">Printing Your Page</h2>\n<p class="localize" id="dialog-text">We\'ve sent your page to your printer <a class="re-send" href="#">re-send</a></p>\n</div>\n</div>\n<div id="pf-dialog-pdf" class="pf-dialog-head">\n<div id="pdf-iframe-container" style="margin-top:10px"></div>\n</div>\n<div id="pf-dialog-ads">\n<br style="clear:both">\n</div>',
                '<form id="pf-email-form" accept-charset="UTF-8" target="email" method="post" action="' + pf.config.urls.email + '">', '<input type="hidden" name="content" value="" >\n<input name="iehack" type="hidden" value="&#9760;">\n<input type="hidden" name="title" value="" >\n<input type="hidden" name="url" value="" >\n</form>\n</div>\n</div>', '<div id="ajax_loader" style=" background:#ffffff; height:' + this.iframeHeight + 'px; text-align:center;"><img src="' + pf.config.hosts.cdn + '/images/ajax-loader.gif" height="35px" width="35px" style="margin-top:80px;"></div>',
                '<div id="pf-ft"><a href="http://www.printfriendly.com" title="PrintFriendly & PDF" target="_blank">PrintFriendly.com &copy</a><a href="#" class="pf-support">support</a></div>\n</div>'].join("\n")
        },
        hideLoader: function () {
            $("#ajax_loader").hide()
        }
    }, toolbar = {
        setup: function () {
            this.setupHideImages();
            this.hideUIElements();
            this.setupClickToDelete();
            this.setupPrint();
            this.setupPdf();
            this.setupEmail();
            this.setupTextSize();
            this.setupUndo();
            this.setupDialogClose();
            this.setupCloseButton();
            this.setupSupport()
        },
        printOnlySetup: function () {
            this.setupPrint();
            this.setupDialogClose();
            this.setupCloseButton();
            this.setupSupport()
        },
        setupClickToDelete: function () {
            settings.disableClickToDel ? $("#w-undo").hide() : ($(settings.nonClickToDelElements, pf.algoDoc).addClass("non-delete").find("*").addClass("non-delete"), $("#printfriendly", pf.algoDoc).on("mouseover mouseout", settings.clickToDelElements, function (a) {
                a.stopPropagation();
                $(this).hasClass("non-delete") || ("mouseover" == a.type ? $(this).addClass("hilight") : ($(this).removeClass("hilight"),
                    "" === $(this).attr("class") && $(this).removeAttr("class")))
            }), $("#printfriendly", pf.algoDoc).on("click", settings.clickToDelElements, function (a) {
                a.stopPropagation();
                a.preventDefault();
                a = $(this);
                a.hasClass("non-delete") || (core.deletedNodes.push(a), core.deletedNodesCss.push(a.css("display")), a.hide())
            }));
            $("body", pf.algoDoc).on("click", function (a) {
                a.preventDefault()
            })
        },
        setupPrint: function () {
            $("#w-print").on("click", function (a) {
                $(".pf-dialog-head").hide();
                $("#pf-dialog").css({
                    display: "block"
                });
                $("#pf-dialog-print").show();
                ad.show();
                core.customPrint();
                a.preventDefault()
            });
            $("body").on("click", ".re-send", function (a) {
                a.preventDefault();
                core.customPrint()
            })
        },
        setupPdf: function () {
            $("#w-pdf").on("click", function (a) {
                var b = $("h1#pf-title", pf.algoDoc).html();
                $("#pdf-iframe-container").html("");
                $('<iframe style="height:94px" name="pdf_iframe" src="' + pf.config.hosts.cdn + '/IEneeds/iframe_blank.html" frameBorder="0" scrolling="no" allowtransparency="true" />').appendTo($("#pdf-iframe-container"));
                $(".pf-dialog-head").hide();
                $("#pf-dialog").css({
                    display: "block"
                });
                $("#pf-dialog-pdf").show();
                ad.show();
                $("#pf-pdf-form input[name=title]").val(b);
                $("#pf-pdf-form input[name=code]").val(pf.algoDoc.body.innerHTML);
                $("#pf-pdf-form input[name=dir]").val(pf.config.dir);
                $("#pf-pdf-form input[name=hostname]").val(pf.config.hosts.page);
                "" !== $.trim(pf.userSettings.customCSSURL) && $("#pf-pdf-form input[name=custom_css_url]").val($.trim(pf.userSettings.customCSSURL));
                $("#pf-pdf-form").submit();
                frames.algo.focus();
                a.preventDefault()
            })
        },
        setupEmail: function () {
            $("#w-email").on("click", function (a) {
                var b = $("h1#pf-title", pf.algoDoc).html(),
                    c = "undefined" != typeof window.top.screenX ? window.top.screenX : window.top.screenLeft,
                    d = "undefined" != typeof window.top.screenY ? window.top.screenY : window.top.screenTop,
                    e = "undefined" != typeof window.top.outerHeight ? window.top.outerHeight : window.top.document.documentElement.clientHeight - 22,
                    c = parseInt((0 > c ? window.top.screen.width + c : c) + (("undefined" != typeof window.top.outerWidth ? window.top.outerWidth : window.top.document.documentElement.clientWidth) - 720) /
                        2, 10),
                    d = "chrome=yes,centerscreen=yes,width=720,height=430,top=" + parseInt(d + (e - 430) / 2.5, 10) + ",left=" + c;
                window.open(pf.config.urls.email, "email", d);
                d = $("#pf-content", pf.algoDoc).clone();
                d.find("*").filter(function () {
                    return "none" == $(this).css("display")
                }).remove();
                e = encodeURIComponent(pf.config.urls.page);
                $("#pf-email-form input[name=title]").val(b);
                $("#pf-email-form input[name=url]").val(e);
                $("#pf-email-form input[name=content]").val(d.text());
                $("#pf-email-form").submit();
                a.preventDefault()
            })
        },
        setupTextSize: function () {
            $("#textsize").change(function (a) {
                Cookie.set("printfriendly-font-class",
                    $(this).val(), 365);
                $("#printfriendly", pf.algoDoc).removeClass("pf-9 pf-10 pf-11 pf-12 pf-13 pf-14 pf-15").addClass($(this).val());
                a.preventDefault()
            })
        },
        setupHideImages: function () {
            $("#wri").on("click", function (a) {
                core.hideImages()
            })
        },
        setupUndo: function () {
            $("#w-undo").on("click", function (a) {
                0 < core.deletedNodes.length && core.deletedNodes.pop().css({
                    display: core.deletedNodesCss.pop()
                });
                a.preventDefault()
            })
        },
        setupDialogClose: function () {
            $("#pf-d-close-wrap").on("click", function (a) {
                ad.hide();
                $("#pf-dialog").hide();
                a.preventDefault()
            })
        },
        setupCloseButton: function () {
            $("#pf-app-close").on("click", function (a) {
                pf.refresh();
                a.preventDefault()
            })
        },
        setupSupport: function () {
            $(".pf-support").on("click", function (a) {
                var b = encodeURIComponent(pf.config.urls.page),
                    c = "mailto:support@printfriendly.com?subject=" + encodeURIComponent("PrintFriendly Support"),
                    c = c + ("&body=" + encodeURIComponent("Hi PrintFriendly,") + "%0A%0A" + encodeURIComponent("My support request is...")),
                    c = c + ("%0A%0A%0A%0A" + encodeURIComponent("For PrintFriendly:")),
                    c =
                        c + ("%20%20" + b);
                try {
                    c += "%20-%20" + encodeURIComponent(BrowserDetect.browser + " " + BrowserDetect.version + " on " + BrowserDetect.OS)
                } catch (d) {}
                top.location.href = c;
                a.stopPropagation();
                a.preventDefault()
            })
        },
        hideUIElements: function () {
            var a = pf.userSettings;
            1 === parseInt(a.disablePDF) && $("#w-pdf").hide();
            1 === parseInt(a.disableEmail) && $("#w-email").hide();
            1 === parseInt(a.disablePrint) && $("#w-print").hide()
        }
    }, reporter = {
        sendErrorReport: function (a) {
            $.ajax({
                url: pf.config.hosts.tracker + "/log_error",
                dataType: "jsonp",
                data: {
                    key: "8fc008294d11b1344a1919396ee62b26",
                    error_report: {
                        name: a,
                        url: pf.config.urls.page,
                        user_agent: _window.navigator.userAgent
                    }
                },
                success: function () {}
            })
        }
    };