var _window = window.parent,
    pf = _window.pf,
    $ = _window.jQuery,
    log = _window.log,
    $doc = $(document),
    setup = {
        init: function () {
            if (!document.body) return setTimeout(setup.init, 13);
            setup.start()
        },
        start: function () {
            this.startTime = (new Date).getTime();
            this.copyBodyHTML();
            this.removeHiddenContent();
            helper.detectWpBlogger();
            readability.extractAuthors();
            readability.extractPubDate();
            readability.extractCustomHeaderFooter();
            this.cleanHTML();
            readability.init()
        },
        copyBodyHTML: function () {
            document.body.innerHTML = pf.bodyCache
        },
        cleanHTML: function () {
            $doc.find("body").find("script, link, style, iframe, ins, noscript, object, embed, select, cufon canvas").remove();
            $doc.find(".yarpp-related, #wdsb-share-box, .pf-init-iframe, .sociable, #sociable, .addthis, #addthis, #printfriendly, .pf-print, #print, .wp-socializer, .editsection, .a2a_dd, .addtoany_share_save, .addtoany_share_save_container, .simply-social-wrapper, #pf-mask, .social_button, #socialbookmarks, .articleFeedback, .print-no, .no-print, .ftwit, .famos-toolbar, .famos-fstar, .ftwit-drawer, .linkwithin_outer, #lws_0, #nrelate_related_0, .ccc-widget, #cccwr, .widget-cb, .doncaprio-share-buttons, .st_twitter_hcount, .st_pinterest_hcount, .st_digg_hcount, .st_stumbleupon_hcount, .st_fblike_hcount, .addthis_toolbox, #goog-gt-tt, .skiptranslate, .really_simple_share, .robots-nocontent, #sharebar, .sharebar, .articleExtras, .embed-mod, .pd-rating, .itxtrstimg, .itxthookicon, .w2bPinitButton, #twitter_h, .instaemail, .emailbutton, #share_print, .pinit-overlay, .pinit-button, .ngg_images, .mr_social_sharing_wrapper").remove()
        },
        removeHiddenContent: function () {
            var a = $doc.find(".copyright, #copyright, .delete-no, .delete-off, .pf-author, .print-content, #print-content, .pf-date, #pf-date, .pf-footer, .print-header, .print-footer, .print-only, #print-only, .print-yes, .pf-content, #pf-content"),
                c = "";
            a.find(".hidden-originally").removeClass("hidden-originally");
            a.removeClass("hidden-originally");
            a.parents().removeClass("hidden-originally");
            c += $doc.find(readability.wpContentParentTags.join(", ")).find(readability.wpContentTags.join(".hidden-originally, ") +
                ".hidden-originally").map(function () {
                return $(this).attr("class")
            }).get().join(" ");
            c += $doc.find(readability.wpContentParentTags.join(".hidden-originally, ") + ".hidden-originally").map(function () {
                return $(this).attr("class")
            }).get().join(" ");
            c = c.replace(/hidden-originally/g, "");
            log("Hidden Classes: " + c);
            readability.wpContentParentTags = $.grep(readability.wpContentParentTags, function (a, d) {
                return -1 === c.indexOf(a.replace(".", ""))
            });
            readability.wpContentTags = $.grep(readability.wpContentTags, function (a,
                d) {
                return -1 === c.indexOf(a.replace(".", ""))
            });
            log("WP Content Parent Tags: " + readability.wpContentParentTags);
            log("WP Content Tags: " + readability.wpContentTags);
            $doc.find(".hidden-originally").remove()
        }
    }, logElIdClass = function (a) {
        try {
            return a.tagName.toLowerCase() + "#" + a.id + "." + a.className
        } catch (c) {
            return ""
        }
    }, logEl = function (a) {
        return "Score - " + (a.readability ? a.readability.contentScore.toFixed(2) : "undefined") + " - " + logElIdClass(a)
    }, coreData = {
        hasContent: !1,
        dir: "ltr"
    }, readability = {
        version: "1.7.1",
        bodyCache: null,
        flags: 7,
        hasContent: !0,
        isBlogger: !1,
        isWP: !1,
        titleText: null,
        titleTags: ["h1", "h2", "h3"],
        wpContentParentTags: [".hentry", ".single-post"],
        wpContentTags: ".entry-content .entry_content .entry .format_text .entrytext .post-body .post-content .post-entry .post_body .post_content .post_entry".split(" "),
        run: 0,
        debugLevel: 1,
        textLimit: 250,
        positiveTags: ["article"],
        negativeTags: ["aside", "nav"],
        FLAG_STRIP_UNLIKELYS: 1,
        FLAG_WEIGHT_CLASSES: 2,
        FLAG_CLEAN_CONDITIONALLY: 4,
        parsedPages: {},
        regexps: {
            unlikelyCandidates: /combx|comment|community|disqus|extra|foot|header|menu|remark|rss|shoutbox|sidebar|sponsor|ad-break|agegate|pagination|pager|popup|tweet|twitter|replies/i,
            okMaybeItsACandidate: /and|article|body|column|main|shadow|rightmen|header|content-sidebar-wrap|pk_left_sidebar|artpag/i,
            positive: /article|body|content|entry|hentry|main|page|pagination|post|blog|story|ERSIngredientsHeader|ERSHeading|ERSSectionHead|ingredient|dataTable/i,
            negative: /archive|bookmark|share|login|aside|combx|comment|com-|contact|foot|footer|footnote|masthead|media|meta|outbrain|promo|related|scroll|shoutbox|sidebar|sponsor|shopping|tags|tool|widget|menu|authorp|breadcrumb|replies|reply/i,
            extraneous: /print|archive|comment|discuss|e[\-]?mail|share|reply|all|login|sign|single/i,
            divToPElements: /<(a|blockquote|dl|div|img|ol|p|pre|table|ul)/i,
            replaceBrs: /(<br[^>]*>[ \n\r\t]*){2,}/gi,
            replaceFonts: /<(\/?)font[^>]*>/gi,
            trim: /^\s+|\s+$/g,
            normalize: /\s{2,}/g,
            killBreaks: /(<br\s*\/?>(\s|&nbsp;?)*){1,}/g,
            videos: /http:\/\/(www\.)?(youtube|vimeo)\.com/i,
            skipFootnoteLink: /^\s*(\[?[a-z0-9]{1,2}\]?|^|edit|citation needed)\s*$/i,
            nextLink: /(next|weiter|continue|>([^\|]|$)|\u00bb([^\|]|$))/i,
            prevLink: /(prev|earl|old|new|<|\u00ab)/i,
            period: /\.( |$)/,
            captions: /caption|figure/i,
            weight: /[\s\d]+(gram|gm|ml|kg|cup|pound|lb|spoon|tbsp)[s]?\s+/i,
            fractions: /[0-9]+\/[0-9]+/i,
            cookingWords: /salt|egg|eggs|honey|cream|organic|tablespoon|baking|chopped|cup|sugar|flour|rice|oil|salt|garlic|chili|egg|tsp|garlic|tbsp|spoon|cocoa|butter|milk|waniliowy|cytrynowego|jajka/i,
            wpStyleUrl: /wp-content/i,
            bloggerStyleUrl: /blogger.com/,
            wpPostImage: /wp-post-image/i
        },
        extractAuthors: function () {
            var a = [],
                c = [],
                b, d, m, f = [],
                k = /(^|\W)(by)(\W|$)/i;
            $.each(".pf-author;.byline;.hentry a[rel=author];a[rel=author];.author.vcard .fn;#author".split(";"), function (e, l) {
                d = $doc.find(l).not(".widget *").not(".sidebar *");
                if (1 == d.size() && -1 == d[0].className.search(/combx|comment|community|disqus|extra|foot|header|menu|remark|rss|shoutbox|sidebar|sponsor|ad-break|agegate|pagination|pager|popup|tweet|twitter|tags|postmetadata/i) && -1 == $.inArray(this.nodeName, ["INPUT"])) {
                    b = d.first();
                    c.push(b);
                    helper.extractText(a, b[0]);
                    if (-1 === b.text().search(k)) try {
                            m = b.parent(), f.push(m), 0 === m.prev().children().size() && f.push(m.prev()), $.each(f, function (b, d) {
                                var e = d.text();
                                if (-1 !== e.search(k) && 60 > e.length) return c.push(d), a.unshift(e.match(k)[2]), !1
                            })
                    } catch (h) {}
                    $.each(c, function (a, b) {
                        b.remove()
                    });
                    readability.author = '<span id="pf_author">' + a.join(" ") + "</span>";
                    return !1
                }
            })
        },
        extractPubDate: function () {
            var a;
            $.each([".pf-date", "#pf-date", ".hentry .entry-date"], function (c, b) {
                a = $doc.find(b).not(".widget *").not(".sidebar *");
                if (1 == a.size()) return readability.pubDate = a.text(), a.remove(), !1
            })
        },
        extractCustomHeaderFooter: function () {
            var a = $doc.find(".print-header");
            1 == a.size() &&
                (readability.customHeader = $("<div />", document).append(a.clone()).html(), a.remove());
            a = $doc.find(".pf-footer, .print-footer");
            0 < a.size() && (readability.customFooter = $("<div />", document).append(a.clone()).html(), a.remove())
        },
        init: function () {
            try {
                document.body && !readability.bodyCache && (readability.bodyCache = document.body.innerHTML);
                readability.prepDocument();
                var a = document.createElement("DIV"),
                    c = document.createElement("DIV");
                helper.pickTitleFromContent();
                var b = readability.getArticleTitle(),
                    d = readability.grabArticle();
                d || (d = document.createElement("DIV"), d.id = "pf-content", readability.hasContent = !1);
                readability.articleTitle = b;
                readability.articleContent = d;
                readability.titleText ? readability.articleTitle.innerHTML = readability.titleText : readability.titleText = $.trim($(readability.articleTitle).text());
                $(d).find(readability.titleTags.join(",")).each(function () {
                    readability.titleText == $.trim($(this).text()) && $(this).remove()
                });
                a.id = "printfriendly";
                c.id = "pf-print-area";
                b.id = "pf-title";
                c.appendChild(b);
                c.appendChild(d);
                a.appendChild(c);
                document.body.innerHTML = "";
                document.body.insertBefore(a, document.body.firstChild);
                document.body.removeAttribute("style");
                coreData.hasContent = readability.hasContent;
                coreData.dir = readability.getSuggestedDirection(d.innerHTML);
                readability.postProcessContent(d);
                log("algo.js Time: " + ((new Date).getTime() - setup.startTime) + " ms");
                helper.runPostAlgoProcesses(coreData)
            } catch (m) {
                log("Algo Error " + m), helper.runPostAlgoProcesses(coreData)
            }
        },
        postProcessContent: function (a) {
            readability.fixImageFloats(a)
        },
        fixImageFloats: function (a) {
            var c =
                0.45 * Math.min(a.offsetWidth, 800);
            a = a.getElementsByTagName("img");
            for (var b = 0, d = a.length; b < d; b += 1) {
                var m = a[b];
                m.removeAttribute("height");
                m.className = m.offsetWidth > c ? m.className + " blockImage" : m.className + " smallImage"
            }
        },
        getSuggestedDirection: function (a) {
            function c(b) {
                b = a.match(RegExp(b, "g"));
                return null !== b ? b.length : 0
            }
            a = a.replace(/@\w+/, "");
            return function () {
                var b = c("[\\u05B0-\\u05F4\\uFB1D-\\uFBF4]"),
                    d = c("[\\u060C-\\u06FE\\uFB50-\\uFEFC]");
                return 20 < 100 * (b + d) / a.length
            }() ? "rtl" : "ltr"
        },
        getArticleTitle: function () {
            var a,
                c, b, d, m, f, k = null;
            a = ["h1", "h2", "h3"];
            d = $doc.find(".pf-title");
            1 == d.size() && (log("Picking title using .pf-title"), k = d);
            k || !readability.isBlogger && !readability.isWP || (c = [".post-title", ".entry-title"], readability.isWP && c.push(".post_title", ".posttitle", "#page-title", "#title", ".title"), b = [], $.each([".single-post", ".post", "#post", ".hentry"], function (d, e) {
                0 == $doc.find(".pf-body-cache" + e).size() && $.each(a, function (a, d) {
                    $.each(c, function (a, c) {
                        b.push(e + " " + c + " " + d);
                        b.push(e + " " + d + c)
                    })
                })
            }), $.each(b, function (a,
                b) {
                d = $doc.find(b);
                if (1 == d.size()) return log("Using title using WP/blogger classes"), k = d, !1
            }));
            !k && readability.isWP && (m = $doc.find("article header, .post, .hentry"), 0 < m.size() && $.each(a, function (a, b) {
                d = m.find(b);
                if (1 < d.size()) return !1;
                if (1 == d.size()) return log("Using title using WP post h-tags"), k = d, !1
            }));
            if (!k && document.title && "" !== document.title) {
                var e = document.title.split(/[\|\-\u00ab<]/).shift().split(/[\u00bb>]/).pop().toLowerCase().replace(/\W+/g, ""),
                    l = 0;
                $.each(a, function (a, b) {
                    $doc.find(b).each(function (a,
                        b) {
                        var c = e.match($(b).text().toLowerCase().replace(/\W+/g, ""));
                        c && 15 < c[0].length && c[0].length > l && (log("Using title element which had a substring of document title"), l = c[0].length, k = $(b))
                    })
                })
            }
            if (k) return readability.titleText = $.trim(k.text()), readability.titleTags.push(k[0].nodeName), f = document.createElement("H1");
            var h = "";
            f = "";
            try {
                h = f = document.title, "string" !== typeof h && (h = f = readability.getInnerText(document.getElementsByTagName("title")[0]))
            } catch (g) {}
            if (h.match(/ [\|\-] /)) h = f.replace(/(.*)[\|\-] .*/gi,
                    "$1"), 3 > h.split(" ").length && (h = f.replace(/[^\|\-]*[\|\-](.*)/gi, "$1"));
            else if (-1 !== h.indexOf(": ")) h = f.replace(/.*:(.*)/gi, "$1"), 3 > h.split(" ").length && (h = f.replace(/[^:]*[:](.*)/gi, "$1"));
            else if (150 < h.length || 15 > h.length) {
                var n = document.getElementsByTagName("h1");
                1 === n.length && (h = readability.getInnerText(n[0]))
            }
            h = h.replace(readability.regexps.trim, "");
            4 >= h.split(" ").length && (h = f);
            f = document.createElement("H1");
            f.innerHTML = h;
            return f
        },
        prepDocument: function () {
            if (null === document.body) {
                var a = document.createElement("body");
                try {
                    document.body = a
                } catch (c) {
                    document.documentElement.appendChild(a), log(c)
                }
            }
            document.body.id = "pf-body";
            document.body.innerHTML = document.body.innerHTML.replace(readability.regexps.replaceBrs, "</p><p>").replace(readability.regexps.replaceFonts, "<$1span>")
        },
        prepArticle: function (a) {
            readability.cleanStyles(a);
            readability.killBreaks(a);
            readability.cleanConditionally(a, "form");
            readability.clean(a, "object");
            readability.cleanConditionally(a, "table");
            readability.cleanConditionally(a, "ul");
            readability.cleanConditionally(a,
                "ol");
            readability.cleanConditionally(a, "div");
            for (var c = a.getElementsByTagName("p"), b = c.length - 1; 0 <= b; b -= 1) {
                var d = c[b].getElementsByTagName("img").length,
                    m = c[b].getElementsByTagName("embed").length,
                    f = c[b].getElementsByTagName("object").length;
                0 === d && 0 === m && 0 === f && "" === readability.getInnerText(c[b], !1) && c[b].parentNode.removeChild(c[b])
            }
            try {
                a.innerHTML = a.innerHTML.replace(/<br[^>]*>\s*<p/gi, "<p")
            } catch (k) {
                log("Cleaning innerHTML of breaks failed. This is an IE strict-block-elements bug. Ignoring.: " +
                    k)
            }
        },
        initializeNode: function (a) {
            a.readability = {
                contentScore: 0
            };
            switch (a.tagName) {
                case "ARTICLE":
                    a.readability.contentScore += 15;
                    break;
                case "ASIDE":
                case "NAV":
                    a.readability.contentScore -= 15;
                    break;
                case "DIV":
                    a.readability.contentScore += 5;
                    break;
                case "PRE":
                case "TD":
                case "BLOCKQUOTE":
                    a.readability.contentScore += 3;
                    break;
                case "ADDRESS":
                case "OL":
                case "UL":
                case "DL":
                case "DD":
                case "DT":
                case "LI":
                case "FORM":
                    a.readability.contentScore -= 3;
                    break;
                case "H1":
                case "H2":
                case "H3":
                case "H4":
                case "H5":
                case "H6":
                case "TH":
                    a.readability.contentScore -=
                        5
            }
            a.readability.contentScore += readability.getClassWeight(a)
        },
        grabArticle: function (a) {
            readability.run += 1;
            var c, b;
            c = [".print-only", "#print-only"];
            var d = $doc.find(".pf-content, #pf-content");
            d.find(".printfriendly.pf-alignright, .printfriendly.pf-alignleft, .printfriendly.pf-aligncenter").remove();
            ("" !== $.trim(d.text()) || 0 < d.find("img").size() || -1 !== $.inArray("IMG", $.map(d, function (a) {
                return a.nodeName
            }))) && c.push(".pf-content", "#pf-content");
            b = pf.config.usingBM ? $() : $doc.find(c.join(","));
            if (0 === b.size()) if (readability.isBlogger) c =
                        $doc.find("#main .post-body, #main .entry-content"), 0 < c.size() && (log("Found blogger candidate"), c.find(".post-title, .entry-title, .post-header, .post-footer").remove(), b = c);
                else if (readability.isWP) {
                var m = [];
                $.each(readability.wpContentParentTags, function (a, b) {
                    $.each(readability.wpContentTags, function (a, c) {
                        m.push(b + " " + c)
                    })
                });
                $.each(m, function (a, c) {
                    var d = $doc.find(c);
                    if (1 == d.size() && (20 < d.text().length || 0 < d.find("img").size())) return log("Found WP candidate. Selector - " + c), b = d, !1
                })
            }
            if (0 < b.size() &&
                (b.find(".yarpp-related, .articleInline, .bottom-meta, .bottomnavigation, #branding, .commentlist, #commentwrapper, #comments, .comments, #disqus_thread, .entry-meta, .igit_relpost, #navbar, .nocomments, .noprint, .pd-rating, .pin-it-btn-wrapper, .post-actions, .post-comments, .post-extras, .post-footer, .post_footer, .post-header, .post-info, .post .meta, .post-meta, .postmeta, .postmetadata, .post_nav, .post_tags, .prev_next, .print-no, .respond, #respond, #sharebar, .shareTools, .share-buttons, .shareTop, .share_this, #sharebarx, .share_box, .sharedaddy, .share_icons, .shr-bookmarks, .sociable, .social_button, .social-ring, .socialwrap, .wpadvert, .wp-socializer").remove(),
                b.find(".printfriendly.pf-alignright, .printfriendly.pf-alignleft, .printfriendly.pf-aligncenter").remove(), "" !== $.trim($(b).text()) || 0 < $(b).find("img").size() || -1 !== $.inArray("IMG", $.map(b, function (a) {
                return a.nodeName
            })))) return log("Bypassed readability"), a = document.createElement("DIV"), a.id = "pf-content", readability.isWP && $(a).append($doc.find(".wp-post-image").first()), b.find("*[style]").removeAttr("style"), $(a).append(b), a;
            var f = readability.flagIsActive(readability.FLAG_STRIP_UNLIKELYS),
                d = null !==
                    a ? !0 : !1;
            a = a ? a : document.body;
            c = a.innerHTML;
            for (var k = a.getElementsByTagName("*"), e = null, l = [], h = 0; e = k[h]; h += 1) {
                if (f) {
                    var g = e.className + e.id + e.nodeName;
                    if (-1 !== g.search(readability.regexps.unlikelyCandidates) && -1 === g.search(readability.regexps.okMaybeItsACandidate) && "BODY" !== e.tagName && -1 === $.inArray(e.tagName.toLowerCase(), readability.positiveTags)) {
                        log("Removing unlikely candidate - " + logElIdClass(e));
                        e.parentNode.removeChild(e);
                        h -= 1;
                        continue
                    }
                }
                if (-1 < $.inArray(e.tagName, ["P", "PRE", "TD"])) l[l.length] =
                        e;
                else if (-1 < $.inArray(e.tagName, ["UL", "OL", "B", "H5", "H6"])) {
                    for (var g = $(e.parentNode), n = g.parent(); n[0] && "undefined" !== typeof n[0].tagName && "BODY" !== n[0].tagName && "BODY" !== g[0].tagName && (1 == n.children().length || 1 == g.children().length || "block" !== g.css("display"));) g = n, n = g.parent();
                    g.hasClass("added-to-list-" + readability.run) || (l[l.length] = g[0], g.addClass("added-to-list-" + readability.run))
                }
                if ("DIV" === e.tagName) if (-1 === e.innerHTML.search(readability.regexps.divToPElements)) {
                        g = document.createElement("p");
                        try {
                            g.innerHTML = e.innerHTML, e.parentNode.replaceChild(g, e), h -= 1, l[l.length] = e
                        } catch (s) {
                            log("Could not alter div to p, probably an IE restriction, reverting back to div.: " + s)
                        }
                    } else for (g = 0, n = e.childNodes.length; g < n; g += 1) {
                            var p = e.childNodes[g];
                            if (3 === p.nodeType && "" !== $.trim(p.nodeValue)) {
                                var q = document.createElement("p");
                                q.innerHTML = p.nodeValue;
                                q.style.display = "inline";
                                q.className = "pf-styled";
                                p.parentNode.replaceChild(q, p)
                            }
                    }
                if ("SPAN" === e.tagName && 1 == e.childNodes.length && 3 == e.childNodes[0].nodeType &&
                    30 < readability.getInnerText(e).length) {
                    g = document.createElement("p");
                    try {
                        g.innerHTML = e.innerHTML, g.style.display = "inline", g.className = "pf-styled", e.parentNode.replaceChild(g, e), h -= 1, l[l.length] = e
                    } catch (r) {
                        log("Could not alter span to p, probably an IE restriction, reverting back to span.: " + r)
                    }
                }
            }
            b = [];
            for (f = 0; f < l.length; f += 1) if (e = (k = -1 < $.inArray(l[f].tagName, ["SECTION", "DIV", "ARTICLE"]) ? l[f] : l[f].parentNode) ? k.parentNode : null, h = readability.getInnerText(l[f]), k && "undefined" !== typeof k.tagName) {
                    if (25 >
                        h.length && !helper.isRecipeIngredient(h)) {
                        if (5 > h.length) continue;
                        g = $(l[f]);
                        if ("P" != g.prev().prop("tagName") && "P" != g.next().prop("tagName")) continue
                    }
                    for (; e && "undefined" !== typeof e.tagName && "BODY" !== e.tagName && "BODY" !== k.tagName && (1 == e.childNodes.length || 1 == k.childNodes.length || "block" !== $(k).css("display"));) k = e, e = k.parentNode;
                    "undefined" === typeof k.readability && (readability.initializeNode(k), b.push(k));
                    e && "undefined" === typeof e.readability && "undefined" !== typeof e.tagName && (readability.initializeNode(e),
                        b.push(e));
                    g = 0;
                    g += 1;
                    g += h.split(",").length;
                    g += Math.min(Math.floor(h.length / 100), 3);
                    k.readability.contentScore += g;
                    e && "undefined" !== typeof e.readability && (e.readability.contentScore += g / 2);
                    3 < readability.debugLevel && (log("Node: " + logElIdClass(l[f])), log("Content Score: " + g), log("Parent: " + logEl(k)), e && "undefined" !== typeof e.readability && log("grandParent: " + logEl(e)), log(""))
                }
            l = null;
            f = 0;
            for (k = b.length; f < k; f += 1) b[f].readability.contentScore *= 1 - readability.getLinkDensity(b[f]);
            b.sort(function (a, b) {
                var c =
                    a.readability.contentScore,
                    d = b.readability.contentScore;
                return c < d ? 1 : c == d ? 0 : -1
            });
            log("Top 5 Candidates");
            for (f = 0; f < Math.min(5, b.length); f++) log(logEl(b[f]));
            0 < b.length && (l = b[0]);
            if (null === l || "BODY" === l.tagName) log("Top Candidate NULL or BODY"), l = document.createElement("DIV"), l.innerHTML = a.innerHTML, a.innerHTML = "", a.appendChild(l), readability.initializeNode(l);
            log("Top Candidate: " + logEl(l));
            f = document.createElement("DIV");
            d && (f.id = "pf-content");
            d = Math.max(10, 0.2 * l.readability.contentScore);
            k = l.parentNode ?
                l.parentNode.childNodes : [];
            e = null;
            1 == $(l).prev().find("img").length && (e = $(l).prev()[0], f.appendChild(e));
            1 == $(l).parent().prev().find("img").length && f.appendChild($(l).parent().prev()[0]);
            h = 0;
            for (g = k.length; h < g; h += 1) if (n = k[h], p = !1, n && n !== e) {
                    log("Looking at sibling node: " + logEl(n));
                    n === l && (p = !0);
                    q = 0;
                    n.className === l.className && "" !== l.className && (q += 0.2 * l.readability.contentScore);
                    "undefined" !== typeof n.readability && n.readability.contentScore + q >= d && (p = !0);
                    if (-1 < $.inArray(n.nodeName.toLowerCase(), "p div ul ol table tr td tbody".split(" "))) {
                        var q =
                            readability.getLinkDensity(n),
                            t = readability.getInnerText(n),
                            u = t.length,
                            v = n.getElementsByTagName("a").length,
                            w = n.getElementsByTagName("img").length;
                        80 < u && 0.25 > q && 3 > v ? p = !0 : 80 > u && 0 === q && -1 !== t.search(readability.regexps.period) && (p = !0);
                        2 > v && 1 == w && (p = !0)
                    }
                    if (p) {
                        log("Appending node: " + logElIdClass(n));
                        p = null;
                        if ("DIV" !== n.nodeName && "P" !== n.nodeName) {
                            log("Altering siblingNode of " + n.nodeName + " to div.");
                            p = document.createElement("DIV");
                            try {
                                p.id = n.id, p.innerHTML = n.innerHTML
                            } catch (x) {
                                log("Could not alter siblingNode to div, probably an IE restriction, reverting back to original."),
                                p = n, h -= 1, g -= 1
                            }
                        } else p = n, h -= 1, g -= 1;
                        p.className = "";
                        f.appendChild(p)
                    }
                }
            readability.prepArticle(f);
            return readability.getInnerText(f).length < readability.textLimit ? (log("****Text length less than " + readability.textLimit + " ****"), a.innerHTML = c, readability.flagIsActive(readability.FLAG_STRIP_UNLIKELYS) ? (readability.removeFlag(readability.FLAG_STRIP_UNLIKELYS), log("Turning off FLAG_STRIP_UNLIKELYS"), readability.grabArticle(a)) : readability.flagIsActive(readability.FLAG_WEIGHT_CLASSES) ? (readability.removeFlag(readability.FLAG_WEIGHT_CLASSES),
                log("Turning off FLAG_WEIGHT_CLASSES"), readability.grabArticle(a)) : readability.flagIsActive(readability.FLAG_CLEAN_CONDITIONALLY) ? (readability.removeFlag(readability.FLAG_CLEAN_CONDITIONALLY), log("Turning off FLAG_CLEAN_CONDITIONALLY"), readability.grabArticle(a)) : 250 === readability.textLimit ? (log("*** Reducing text limit to 75 ***"), readability.textLimit = 75, readability.addFlag(readability.FLAG_STRIP_UNLIKELYS), readability.addFlag(readability.FLAG_WEIGHT_CLASSES), readability.addFlag(readability.FLAG_CLEAN_CONDITIONALLY),
                readability.grabArticle(a)) : null) : f
        },
        getInnerText: function (a, c) {
            var b = "";
            if ("undefined" === typeof a.textContent && "undefined" === typeof a.innerText) return "";
            c = "undefined" === typeof c ? !0 : c;
            b = "Microsoft Internet Explorer" === navigator.appName ? a.innerText.replace(readability.regexps.trim, "") : a.textContent.replace(readability.regexps.trim, "");
            return c ? b.replace(readability.regexps.normalize, " ") : b
        },
        getCharCount: function (a, c) {
            c = c || ",";
            return readability.getInnerText(a).split(c).length - 1
        },
        cleanStyles: function (a) {
            a =
                a || document;
            var c = a.firstChild;
            if (a) for ("function" === typeof a.removeAttribute && "pf-styled" !== a.className && a.removeAttribute("style"); null !== c;) 1 === c.nodeType && ("pf-styled" !== c.className && c.removeAttribute("style"), readability.cleanStyles(c)), c = c.nextSibling
        },
        getLinkDensity: function (a) {
            var c = a.getElementsByTagName("a");
            a = readability.getInnerText(a).length;
            for (var b = 0, d = 0, m = c.length; d < m; d += 1) b += readability.getInnerText(c[d]).length;
            return b / a
        },
        getClassWeight: function (a) {
            if (!readability.flagIsActive(readability.FLAG_WEIGHT_CLASSES)) return 0;
            var c = 0;
            "string" === typeof a.className && "" !== a.className && (-1 !== a.className.search(readability.regexps.negative) && -1 === $.inArray(a.nodeName.toLowerCase(), readability.positiveTags) && (c -= 25), -1 !== a.className.search(readability.regexps.positive) && (c += 25));
            "string" === typeof a.id && "" !== a.id && (-1 !== a.id.search(readability.regexps.negative) && -1 === $.inArray(a.nodeName.toLowerCase(), readability.positiveTags) && (c -= 25), -1 !== a.id.search(readability.regexps.positive) && (c += 25));
            return c
        },
        nodeIsVisible: function (a) {
            return (0 !==
                a.offsetWidth || 0 !== a.offsetHeight) && "none" !== a.style.display.toLowerCase()
        },
        killBreaks: function (a) {
            try {
                a.innerHTML = a.innerHTML.replace(readability.regexps.killBreaks, "<br />")
            } catch (c) {
                log("KillBreaks failed - this is an IE bug. Ignoring.: " + c)
            }
        },
        clean: function (a, c) {
            for (var b = a.getElementsByTagName(c), d = "object" === c || "embed" === c, m = b.length - 1; 0 <= m; m -= 1) {
                if (d) {
                    for (var f = "", k = 0, e = b[m].attributes.length; k < e; k += 1) f += b[m].attributes[k].value + "|";
                    if (-1 !== f.search(readability.regexps.videos)) continue;
                    if (-1 !==
                        b[m].innerHTML.search(readability.regexps.videos)) continue
                }
                b[m].parentNode.removeChild(b[m])
            }
        },
        cleanConditionally: function (a, c) {
            if (readability.flagIsActive(readability.FLAG_CLEAN_CONDITIONALLY)) for (var b = a.getElementsByTagName(c), d = b.length - 1; 0 <= d; d -= 1) {
                    var m = readability.getClassWeight(b[d]);
                    if (0 > m + ("undefined" !== typeof b[d].readability ? b[d].readability.contentScore : 0)) log("Removed " + logEl(b[d])), b[d].parentNode.removeChild(b[d]);
                    else if (10 > readability.getCharCount(b[d], ",")) {
                        var f = b[d].getElementsByTagName("p").length,
                            k = b[d].getElementsByTagName("img").length;
                        b[d].getElementsByTagName("li");
                        for (var e = b[d].getElementsByTagName("input").length, l = b[d].getElementsByTagName("a").length, h = b[d].getElementsByTagName("tr").length, g = b[d].className + b[d].id, n = 0, s = b[d].getElementsByTagName("embed"), p = 0, q = s.length; p < q; p += 1) - 1 === s[p].src.search(readability.regexps.videos) && (n += 1);
                        var s = readability.getLinkDensity(b[d]),
                            p = readability.getInnerText(b[d]),
                            q = p.length,
                            r = !1;
                        if (3 < k && 3 > f) {
                            var t = 0,
                                u = "";
                            $(b[d]).find("img").each(function (a) {
                                t +=
                                    $(this).width();
                                u += this.className + this.id
                            });
                            100 > t / k && -1 === u.search(readability.regexps.wpPostImage) && (r = !0)
                        } else if (e > Math.floor(f / 3)) r = !0;
                        else if (25 > m && 0.2 < s && 2 < l) r = !0;
                        else if (25 <= m && 0.5 < s && 2 < l) r = !0;
                        else if (1 === n && 75 > q || 1 < n) r = !0;
                        if (4 < h || helper.isRecipeIngredient(p) || -1 !== g.search(readability.regexps.captions)) r = !1;
                        r && (log("Removed " + logEl(b[d])), b[d].parentNode.removeChild(b[d]))
                    }
            }
        },
        cleanHeaders: function (a) {
            for (var c = 1; 3 > c; c += 1) for (var b = a.getElementsByTagName("h" + c), d = b.length - 1; 0 <= d; d -= 1)(0 > readability.getClassWeight(b[d]) ||
                        0.33 < readability.getLinkDensity(b[d])) && b[d].parentNode.removeChild(b[d])
        },
        htmlspecialchars: function (a) {
            "string" === typeof a && (a = a.replace(/&/g, "&amp;"), a = a.replace(/"/g, "&quot;"), a = a.replace(/'/g, "&#039;"), a = a.replace(/</g, "&lt;"), a = a.replace(/>/g, "&gt;"));
            return a
        },
        flagIsActive: function (a) {
            return 0 < (readability.flags & a)
        },
        addFlag: function (a) {
            readability.flags |= a
        },
        removeFlag: function (a) {
            readability.flags &= ~a
        }
    }, helper = {
        runPostAlgoProcesses: function (a) {
            a.hasContent && this.addHeaderFooter();
            _window.core.runPostAlgoProcesses(a)
        },
        detectWpBlogger: function () {
            for (var a = parent.parent.document.styleSheets, c = 0; c < a.length; c++) if (null !== a[c].href && -1 !== a[c].href.search(readability.regexps.wpStyleUrl)) {
                    readability.isWP = !0;
                    break
                } else if (null !== a[c].href && -1 !== a[c].href.search(readability.regexps.bloggerStyleUrl)) {
                readability.isBlogger = !0;
                break
            }
        },
        pickTitleFromContent: function () {
            $.each(["h1", "h2", "h3"], function (a, c) {
                var b = $doc.find(c);
                if (1 == b.size() && "" !== $.trim(b.text())) return readability.titleText = $.trim(b.text()), readability.titleTags.push(c),
                log("Picking possible title from content - " + readability.titleText), !1;
                if (1 < b.size()) return !1
            })
        },
        isRecipeIngredient: function (a) {
            var c = -1 !== a.search(readability.regexps.weight),
                b = -1 !== a.search(readability.regexps.fractions);
            a = -1 !== a.search(readability.regexps.cookingWords);
            return c || b || a
        },
        addHeaderFooter: function () {
            var a = [];
            "" !== $.trim(pf.userSettings.headerImageUrl) && a.push('<img id="pf-header-img" src="' + $.trim(pf.userSettings.headerImageUrl) + '"/>');
            "" !== $.trim(pf.userSettings.headerTagline) && a.push('<p id="pf-tagline">' +
                unescape($.trim(pf.userSettings.headerTagline)) + "</p>");
            a.push('<div id="pf-src">', '<img id="pf-src-icon" height="16px" width="16px" src="https://s2.googleusercontent.com/s2/favicons?domain=' + pf.config.hosts.page.split(":")[0] + '">', '<a class="pf-src-name" href="' + pf.config.protocol + "//" + pf.config.hosts.page + '">' + pf.config.domains.page + "</a>", '<a  href="' + pf.config.urls.page + '" class="pf-src-url">', decodeURIComponent(pf.config.urls.page), "</a>", '<br class="clearfloat">', "</div>");
            readability.author &&
                a.push(readability.author);
            readability.pubDate && a.push("<span id='pf-date'>" + readability.pubDate + "</span>");
            $(a.join("")).insertBefore($doc.find("#pf-content"));
            $doc.find("#pf-title").insertAfter($doc.find("#pf-src"));
            readability.customHeader && $(readability.customHeader, document).insertBefore($doc.find("#pf-title"));
            readability.customFooter && $doc.find("body").append(readability.customFooter)
        },
        extractText: function (a, c) {
            var b = c.childNodes,
                d = b.length;
            if (3 == c.nodeType) b = $.trim(c.nodeValue), "" !== b && a.push(b);
            else if (1 < d || 1 == d && 3 != b[0].nodeType) for (var m = 0; m < d; m++) helper.extractText(a, b[m]);
            else a.push($.trim($(c).text()))
        }
    };