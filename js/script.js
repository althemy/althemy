(function (e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? e(require("jquery")) : e(window.jQuery || window.Zepto)
})(function (e) {
    var t, i, n, o, r, a, s = "Close", l = "BeforeClose", c = "AfterClose", d = "BeforeAppend", p = "MarkupParse",
        u = "Open", f = "Change", m = "mfp", g = "." + m, h = "mfp-ready", v = "mfp-removing", y = "mfp-prevent-close",
        C = function () {
        }, b = !!window.jQuery, w = e(window), x = function (e, i) {
            t.ev.on(m + e + g, i)
        }, I = function (t, i, n, o) {
            var r = document.createElement("div");
            return r.className = "mfp-" + t, n && (r.innerHTML = n), o ? i && i.appendChild(r) : (r = e(r), i && r.appendTo(i)), r
        }, k = function (i, n) {
            t.ev.triggerHandler(m + i, n), t.st.callbacks && (i = i.charAt(0).toLowerCase() + i.slice(1), t.st.callbacks[i] && t.st.callbacks[i].apply(t, e.isArray(n) ? n : [n]))
        }, T = function (i) {
            return i === a && t.currTemplate.closeBtn || (t.currTemplate.closeBtn = e(t.st.closeMarkup.replace("%title%", t.st.tClose)), a = i), t.currTemplate.closeBtn
        }, N = function () {
            e.magnificPopup.instance || (t = new C, t.init(), e.magnificPopup.instance = t)
        }, _ = function () {
            var e = document.createElement("p").style, t = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== e.transition) return !0;
            for (; t.length;) if (t.pop() + "Transition" in e) return !0;
            return !1
        };
    C.prototype = {
        constructor: C, init: function () {
            var i = navigator.appVersion;
            t.isLowIE = t.isIE8 = document.all && !document.addEventListener, t.isAndroid = /android/gi.test(i), t.isIOS = /iphone|ipad|ipod/gi.test(i), t.supportsTransition = _(), n = e(document), t.popupsCache = {}
        }, open: function (i) {
            var o;
            if (!1 === i.isObj) {
                null != t.content ? t.items = jQuery.merge(i.items.toArray(), t.items) : t.items = i.items.toArray(), t.index = 0;
                var a, s = i.items;
                for (o = 0; o < s.length; o++) if (a = s[o], a.parsed && (a = a.el[0]), a === i.el[0]) {
                    t.index = o;
                    break
                }
            } else t.items = e.isArray(i.items) ? i.items : [i.items], t.index = i.index || 0;
            if (!t.isOpen) {
                t.types = [], r = "", i.mainEl && i.mainEl.length ? t.ev = i.mainEl.eq(0) : t.ev = n, i.key ? (t.popupsCache[i.key] || (t.popupsCache[i.key] = {}), t.currTemplate = t.popupsCache[i.key]) : t.currTemplate = {}, t.st = e.extend(!0, {}, e.magnificPopup.defaults, i), t.fixedContentPos = "auto" === t.st.fixedContentPos ? !t.probablyMobile : t.st.fixedContentPos, t.st.modal && (t.st.closeOnContentClick = !1, t.st.closeOnBgClick = !1, t.st.showCloseBtn = !1, t.st.enableEscapeKey = !1), t.bgOverlay || (t.bgOverlay = I("bg").on("click" + g, function () {
                    t.close()
                }), t.wrap = I("wrap").attr("tabindex", -1).on("click" + g, function (e) {
                    t._checkIfClose(e.target) && t.close()
                }), t.container = I("container", t.wrap)), t.contentContainer = I("content"), t.st.preloader && (t.preloader = I("preloader", t.container, t.st.tLoading));
                var l = e.magnificPopup.modules;
                for (o = 0; o < l.length; o++) {
                    var c = l[o];
                    c = c.charAt(0).toUpperCase() + c.slice(1), t["init" + c].call(t)
                }
                k("BeforeOpen"), t.st.showCloseBtn && (t.st.closeBtnInside ? (x(p, function (e, t, i, n) {
                    i.close_replaceWith = T(n.type)
                }), r += " mfp-close-btn-in") : t.wrap.append(T())), t.st.alignTop && (r += " mfp-align-top"), t.fixedContentPos ? t.wrap.css({
                    overflow: t.st.overflowY,
                    overflowX: "hidden",
                    overflowY: t.st.overflowY
                }) : t.wrap.css({
                    top: w.scrollTop(),
                    position: "absolute"
                }), (!1 === t.st.fixedBgPos || "auto" === t.st.fixedBgPos && !t.fixedContentPos) && t.bgOverlay.css({
                    height: n.height(),
                    position: "absolute"
                }), t.st.enableEscapeKey && n.on("keyup" + g, function (e) {
                    27 === e.keyCode && t.close()
                }), w.on("resize" + g, function () {
                    t.updateSize()
                }), t.st.closeOnContentClick || (r += " mfp-auto-cursor"), r && t.wrap.addClass(r);
                var d = t.wH = w.height(), f = {};
                if (t.fixedContentPos && t._hasScrollBar(d)) {
                    var m = t._getScrollbarSize();
                    m && (f.marginRight = m)
                }
                t.fixedContentPos && (t.isIE7 ? e("body, html").css("overflow", "hidden") : f.overflow = "hidden");
                var v = t.st.mainClass;
                return t.isIE7 && (v += " mfp-ie7"), v && t._addClassToMFP(v), t.updateItemHTML(), k("BuildControls"), e("html").css(f), t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || e(document.body)), t._lastFocusedEl = document.activeElement, setTimeout(function () {
                    t.content ? (t._addClassToMFP(h), t._setFocus()) : t.bgOverlay.addClass(h), n.on("focusin" + g, t._onFocusIn)
                }, 16), t.isOpen = !0, t.updateSize(d), k(u), i
            }
            t.updateItemHTML()
        }, close: function () {
            t.isOpen && (k(l), t.isOpen = !1, t.st.removalDelay && !t.isLowIE && t.supportsTransition ? (t._addClassToMFP(v), setTimeout(function () {
                t._close()
            }, t.st.removalDelay)) : t._close())
        }, _close: function () {
            k(s);
            var i = v + " " + h + " ";
            if (t.bgOverlay.detach(), t.wrap.detach(), t.container.empty(), t.st.mainClass && (i += t.st.mainClass + " "), t._removeClassFromMFP(i), t.fixedContentPos) {
                var o = {marginRight: ""};
                t.isIE7 ? e("body, html").css("overflow", "") : o.overflow = "", e("html").css(o)
            }
            n.off("keyup" + g + " focusin" + g), t.ev.off(g), t.wrap.attr("class", "mfp-wrap").removeAttr("style"), t.bgOverlay.attr("class", "mfp-bg"), t.container.attr("class", "mfp-container"), !t.st.showCloseBtn || t.st.closeBtnInside && !0 !== t.currTemplate[t.currItem.type] || t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach(), t.st.autoFocusLast && t._lastFocusedEl && e(t._lastFocusedEl).focus(), t.currItem = null, t.content = null, t.currTemplate = null, t.prevHeight = 0, k(c)
        }, updateSize: function (e) {
            if (t.isIOS) {
                var i = document.documentElement.clientWidth / window.innerWidth, n = window.innerHeight * i;
                t.wrap.css("height", n), t.wH = n
            } else t.wH = e || w.height();
            t.fixedContentPos || t.wrap.css("height", t.wH), k("Resize")
        }, updateItemHTML: function () {
            var i = t.items[t.index];
            t.contentContainer.detach(), t.content && t.content.detach(), i.parsed || (i = t.parseEl(t.index));
            var n = i.type;
            if (k("BeforeChange", [t.currItem ? t.currItem.type : "", n]), t.currItem = i, !t.currTemplate[n]) {
                var r = !!t.st[n] && t.st[n].markup;
                k("FirstMarkupParse", r), t.currTemplate[n] = !r || e(r)
            }
            o && o !== i.type && t.container.removeClass("mfp-" + o + "-holder");
            var a = t["get" + n.charAt(0).toUpperCase() + n.slice(1)](i, t.currTemplate[n]);
            t.appendContent(a, n), i.preloaded = !0, k(f, i), o = i.type, t.container.prepend(t.contentContainer), k("AfterChange")
        }, appendContent: function (e, i) {
            t.content = e, e ? t.st.showCloseBtn && t.st.closeBtnInside && !0 === t.currTemplate[i] ? t.content.find(".mfp-close").length || t.content.append(T()) : t.content = e : t.content = "", k(d), t.container.addClass("mfp-" + i + "-holder"), t.contentContainer.append(t.content)
        }, parseEl: function (i) {
            var n, o = t.items[i];
            if (o.tagName ? o = {el: e(o)} : (n = o.type, o = {data: o, src: o.src}), o.el) {
                for (var r = t.types, a = 0; a < r.length; a++) if (o.el.hasClass("mfp-" + r[a])) {
                    n = r[a];
                    break
                }
                o.src = o.el.attr("data-mfp-src"), o.title = o.el.attr("title"), o.href = o.el.attr("data-mfp-href"), o.sitename = o.el.attr("data-mfp-sitename"), o.sitelink = o.el.attr("data-mfp-sitelink"), o.text = o.el.attr("data-mfp-text"), o.zentype = o.el.attr("data-mfp-zentype"), o.label = o.el.attr("data-mfp-label"), o.labels = o.el.parents(".element2").find(".mfp-labels").text().replace(/\r?\n|\r/g, ""), o.id = o.el.attr("data-mfp-id"), o.comments = o.el.attr("data-mfp-comments"), o.author = o.el.attr("data-mfp-author"), o.href || (o.href = "#"), o.src || (o.src = o.el.attr("href"))
            }
            return o.type = n || t.st.type || "inline", o.index = i, o.parsed = !0, t.items[i] = o, k("ElementParse", o), t.items[i]
        }, addGroup: function (e, i) {
            var n = function (n) {
                n.mfpEl = this, t._openClick(n, e, i)
            };
            i || (i = {});
            var o = "click.magnificPopup";
            i.mainEl = e, i.items ? (i.isObj = !0, e.off(o).on(o, n)) : (i.isObj = !1, i.delegate ? e.off(o).on(o, i.delegate, n) : (i.items = e, e.off(o).on(o, n)))
        }, _openClick: function (i, n, o) {
            var r = void 0 !== o.midClick ? o.midClick : e.magnificPopup.defaults.midClick;
            if (r || !(2 === i.which || i.ctrlKey || i.metaKey || i.altKey || i.shiftKey)) {
                var a = void 0 !== o.disableOn ? o.disableOn : e.magnificPopup.defaults.disableOn;
                if (a) if (e.isFunction(a)) {
                    if (!a.call(t)) return !0
                } else if (w.width() < a) return !0;
                i.type && (i.preventDefault(), t.isOpen && i.stopPropagation()), o.el = e(i.mfpEl), o.delegate && (o.items = n.find(o.delegate)), t.open(o)
            }
        }, updateStatus: function (e, n) {
            if (t.preloader) {
                i !== e && t.container.removeClass("mfp-s-" + i), n || "loading" !== e || (n = t.st.tLoading);
                var o = {status: e, text: n};
                k("UpdateStatus", o), e = o.status, n = o.text, t.preloader.html(n), t.preloader.find("a").on("click", function (e) {
                    e.stopImmediatePropagation()
                }), t.container.addClass("mfp-s-" + e), i = e
            }
        }, _checkIfClose: function (i) {
            if (!e(i).hasClass(y)) {
                var n = t.st.closeOnContentClick, o = t.st.closeOnBgClick;
                if (n && o) return !0;
                if (!t.content || e(i).hasClass("mfp-close") || t.preloader && i === t.preloader[0]) return !0;
                if (i === t.content[0] || e.contains(t.content[0], i)) {
                    if (n) return !0
                } else if (o && e.contains(document, i)) return !0;
                return !1
            }
        }, _addClassToMFP: function (e) {
            t.bgOverlay.addClass(e), t.wrap.addClass(e)
        }, _removeClassFromMFP: function (e) {
            this.bgOverlay.removeClass(e), t.wrap.removeClass(e)
        }, _hasScrollBar: function (e) {
            return (t.isIE7 ? n.height() : document.body.scrollHeight) > (e || w.height())
        }, _setFocus: function () {
            (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus()
        }, _onFocusIn: function (i) {
            if (i.target !== t.wrap[0] && !e.contains(t.wrap[0], i.target)) return t._setFocus(), !1
        }, _parseMarkup: function (t, i, n) {
            var o;
            n.data && (i = e.extend(n.data, i)), k(p, [t, i, n]), e.each(i, function (i, r) {
                if (void 0 === r || !1 === r) return !0;
                if (o = i.split("_"), o.length > 1) {
                    var a = t.find(g + "-" + o[0]);
                    if (a.length > 0) {
                        var s = o[1];
                        if ("replaceWith" === s) {
                            if (a[0] !== r[0] && (a.replaceWith(r), r.is("img"))) {
                                if (void 0 !== n.title && (this[0].parentNode.parentNode.parentNode.childNodes[2].childNodes[1].childNodes[0].childNodes[1].innerHTML = '<a href="' + n.href + '">' + n.title + "</a>"), void 0 !== n.sitename && ("" != n.sitename ? (this[0].parentNode.parentNode.parentNode.childNodes[1].childNodes[0].childNodes[0].childNodes[1].innerHTML = n.sitename, this[0].parentNode.parentNode.parentNode.childNodes[1].childNodes[0].childNodes[0].childNodes[1].style.position = "relative") : (this[0].parentNode.parentNode.parentNode.childNodes[1].childNodes[0].childNodes[0].childNodes[1].innerHTML = "Journal", this[0].parentNode.parentNode.parentNode.childNodes[1].childNodes[0].childNodes[0].childNodes[1].style.position = "initial")), void 0 !== n.author && this[0].parentNode.parentNode.parentNode.childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].setAttribute("src", n.author), "#" != n.href && r[0].parentNode.setAttribute("href", n.href), void 0 !== n.text && ("" != n.text ? this[0].parentNode.nextSibling.firstChild.children[2].innerHTML = n.text + '...<br><a href="' + n.href + '">Read more</a>' : this[0].parentNode.nextSibling.firstChild.children[2].innerHTML = ""), void 0 !== n.zentype) {
                                    var l = this[0].parentNode.nextSibling.firstChild.children[4],
                                        c = "/search/label/" + n.label + "+" + n.zentype + "?max-results=25#filters";
                                    l.setAttribute("href", c), l.innerHTML = n.zentype
                                }
                                void 0 !== n.label && this[0].parentNode.parentNode.parentNode.childNodes[1].childNodes[0].childNodes[0].setAttribute("href", "/search/label/" + n.label + "?max-results=25#filters"), void 0 !== n.comments && (this[0].parentNode.nextSibling.firstChild.children[6].innerHTML = '<a href="' + n.href + '#comments">' + n.comments + '&nbsp;<i class="fa fa-comment fa-lg"></i></a>'), loadMore(n, 0)
                            }
                        } else "img" === s ? a.is("img") ? a.attr("src", r) : a.replaceWith(e("<img>").attr("src", r).attr("class", a.attr("class"))) : a.attr(o[1], r)
                    }
                } else t.find(g + "-" + i).html(r)
            })
        }, _getScrollbarSize: function () {
            if (void 0 === t.scrollbarSize) {
                var e = document.createElement("div");
                e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(e), t.scrollbarSize = e.offsetWidth - e.clientWidth, document.body.removeChild(e)
            }
            return t.scrollbarSize
        }
    }, e.magnificPopup = {
        instance: null,
        proto: C.prototype,
        modules: [],
        open: function (t, i) {
            return N(), t = t ? e.extend(!0, {}, t) : {}, t.isObj = !0, t.index = i || 0, this.instance.open(t)
        },
        close: function () {
            return e.magnificPopup.instance && e.magnificPopup.instance.close()
        },
        registerModule: function (t, i) {
            i.options && (e.magnificPopup.defaults[t] = i.options), e.extend(this.proto, i.proto), this.modules.push(t)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    }, e.fn.magnificPopup = function (i) {
        N();
        var n = e(this);
        if ("string" == typeof i) if ("open" === i) {
            var o, r = b ? n.data("magnificPopup") : n[0].magnificPopup, a = parseInt(arguments[1], 10) || 0;
            r.items ? o = r.items[a] : (o = n, r.delegate && (o = o.find(r.delegate)), o = o.eq(a)), t._openClick({mfpEl: o}, n, r)
        } else t.isOpen && t[i].apply(t, Array.prototype.slice.call(arguments, 1)); else i = e.extend(!0, {}, i), b ? n.data("magnificPopup", i) : n[0].magnificPopup = i, t.addGroup(n, i);
        return n
    };
    var S, z, P, E = "inline", M = function () {
        P && (z.after(P.addClass(S)).detach(), P = null)
    };
    e.magnificPopup.registerModule(E, {
        options: {hiddenClass: "hide", markup: "", tNotFound: "Content not found"},
        proto: {
            initInline: function () {
                t.types.push(E), x(s + "." + E, function () {
                    M()
                })
            }, getInline: function (i, n) {
                if (M(), i.src) {
                    var o = t.st.inline, r = e(i.src);
                    if (r.length) {
                        var a = r[0].parentNode;
                        a && a.tagName && (z || (S = o.hiddenClass, z = I(S), S = "mfp-" + S), P = r.after(z).detach().removeClass(S)), t.updateStatus("ready")
                    } else t.updateStatus("error", o.tNotFound), r = e("<div>");
                    return i.inlineElement = r, r
                }
                return t.updateStatus("ready"), t._parseMarkup(n, {}, i), n
            }
        }
    });
    var O, L = "ajax", B = function () {
        O && e(document.body).removeClass(O)
    }, H = function () {
        B(), t.req && t.req.abort()
    };
    e.magnificPopup.registerModule(L, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        }, proto: {
            initAjax: function () {
                t.types.push(L), O = t.st.ajax.cursor, x(s + "." + L, H), x("BeforeChange." + L, H)
            }, getAjax: function (i) {
                O && e(document.body).addClass(O), t.updateStatus("loading");
                var n = e.extend({
                    url: i.src, success: function (n, o, r) {
                        var a = {data: n, xhr: r};
                        k("ParseAjax", a), t.appendContent(e(a.data), L), i.finished = !0, B(), t._setFocus(), setTimeout(function () {
                            t.wrap.addClass(h)
                        }, 16), t.updateStatus("ready"), k("AjaxContentAdded")
                    }, error: function () {
                        B(), i.finished = i.loadError = !0, t.updateStatus("error", t.st.ajax.tError.replace("%url%", i.src))
                    }
                }, t.st.ajax.settings);
                return t.req = e.ajax(n), ""
            }
        }
    });
    var A, j = function (i) {
        if (i.data && void 0 !== i.data.title) return i.data.title;
        var n = t.st.image.titleSrc;
        if (n) {
            if (e.isFunction(n)) return n.call(t, i);
            if (i.el) return i.el.attr(n) || ""
        }
        return ""
    };
    e.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        }, proto: {
            initImage: function () {
                var i = t.st.image, n = ".image";
                t.types.push("image"), x(u + n, function () {
                    "image" === t.currItem.type && i.cursor && e(document.body).addClass(i.cursor)
                }), x(s + n, function () {
                    i.cursor && e(document.body).removeClass(i.cursor), w.off("resize" + g)
                }), x("Resize" + n, t.resizeImage), t.isLowIE && x("AfterChange", t.resizeImage)
            }, resizeImage: function () {
                var e = t.currItem;
                if (e && e.img && t.st.image.verticalFit) {
                    t.isLowIE && parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)
                }
            }, _onImageHasSize: function (e) {
                e.img && (e.hasSize = !0, A && clearInterval(A), e.isCheckingImgSize = !1, k("ImageHasSize", e), e.imgHidden && (t.content && t.content.removeClass("mfp-loading"), e.imgHidden = !1))
            }, findImageSize: function (e) {
                var i = 0, n = e.img[0], o = function (r) {
                    A && clearInterval(A), A = setInterval(function () {
                        n.naturalWidth > 0 ? t._onImageHasSize(e) : (i > 200 && clearInterval(A), i++, 3 === i ? o(10) : 40 === i ? o(50) : 100 === i && o(500))
                    }, r)
                };
                o(1)
            }, getImage: function (i, n) {
                var o = 0, r = function () {
                    i && (i.img[0].complete ? (i.img.off(".mfploader"), i === t.currItem && (t._onImageHasSize(i), t.updateStatus("ready")), i.hasSize = !0, i.loaded = !0, k("ImageLoadComplete")) : (o++, o < 200 ? setTimeout(r, 100) : a()))
                }, a = function () {
                    i && (i.img.off(".mfploader"), i === t.currItem && (t._onImageHasSize(i), t.updateStatus("error", s.tError.replace("%url%", i.src))), i.hasSize = !0, i.loaded = !0, i.loadError = !0)
                }, s = t.st.image, l = n.find(".mfp-img");
                if (l.length) {
                    var c = document.createElement("img");
                    c.className = "mfp-img", i.el && i.el.find("img").length && (c.alt = i.el.find("img").attr("alt")), i.img = e(c).on("load.mfploader", r).on("error.mfploader", a), c.src = i.src, l.is("img") && (i.img = i.img.clone()), c = i.img[0], c.naturalWidth > 0 ? i.hasSize = !0 : c.width || (i.hasSize = !1)
                }
                return t._parseMarkup(n, {
                    title: j(i),
                    img_replaceWith: i.img
                }, i), t.resizeImage(), i.hasSize ? (A && clearInterval(A), i.loadError ? (n.addClass("mfp-loading"), t.updateStatus("error", s.tError.replace("%url%", i.src))) : (n.removeClass("mfp-loading"), t.updateStatus("ready")), n) : (t.updateStatus("loading"), i.loading = !0, i.hasSize || (i.imgHidden = !0, n.addClass("mfp-loading"), t.findImageSize(i)), n)
            }
        }
    });
    var F, q = function () {
        return void 0 === F && (F = void 0 !== document.createElement("p").style.MozTransform), F
    };
    e.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1, easing: "ease-in-out", duration: 300, opener: function (e) {
                return e.is("img") ? e : e.find("img")
            }
        }, proto: {
            initZoom: function () {
                var e, i = t.st.zoom, n = ".zoom";
                if (i.enabled && t.supportsTransition) {
                    var o, r, a = i.duration, c = function (e) {
                        var t = e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                            n = "all " + i.duration / 1e3 + "s " + i.easing, o = {
                                position: "fixed",
                                zIndex: 9999,
                                left: 0,
                                top: 0,
                                "-webkit-backface-visibility": "hidden"
                            }, r = "transition";
                        return o["-webkit-" + r] = o["-moz-" + r] = o["-o-" + r] = o[r] = n, t.css(o), t
                    }, d = function () {
                        t.content.css("visibility", "visible"), t.contentContainer.find(".zencategory").css("opacity", "1")
                    };
                    x("BuildControls" + n, function () {
                        if (t._allowZoom()) {
                            if (clearTimeout(o), t.content.css("visibility", "hidden"), e = t._getItemToZoom(), !e) return void d();
                            r = c(e), r.css(t._getOffset()), t.wrap.append(r), o = setTimeout(function () {
                                r.css(t._getOffset(!0)), o = setTimeout(function () {
                                    d(), setTimeout(function () {
                                        r.remove(), e = r = null, k("ZoomAnimationEnded")
                                    }, 16)
                                }, a)
                            }, 16)
                        }
                    }), x(l + n, function () {
                        if (t._allowZoom()) {
                            if (clearTimeout(o), t.st.removalDelay = a, !e) {
                                if (e = t._getItemToZoom(), !e) return;
                                r = c(e)
                            }
                            r.css(t._getOffset(!0)), t.wrap.append(r), t.content.css("visibility", "hidden"), t.contentContainer.find(".zencategory").hide(), setTimeout(function () {
                                r.css(t._getOffset())
                            }, 16)
                        }
                    }), x(s + n, function () {
                        t._allowZoom() && (d(), r && r.remove(), e = null)
                    })
                }
            }, _allowZoom: function () {
                return "image" === t.currItem.type
            }, _getItemToZoom: function () {
                return !!t.currItem.hasSize && t.currItem.img
            }, _getOffset: function (i) {
                var n;
                n = i ? t.currItem.img : t.st.zoom.opener(t.currItem.el || t.currItem);
                var o = n.offset(), r = parseInt(n.css("padding-top"), 10), a = parseInt(n.css("padding-bottom"), 10);
                o.top -= e(window).scrollTop() - r;
                var s = {width: n.width(), height: (b ? n.innerHeight() : n[0].offsetHeight) - a - r};
                return q() ? s["-moz-transform"] = s.transform = "translate(" + o.left + "px," + o.top + "px)" : (s.left = o.left, s.top = o.top), s
            }
        }
    });
    var W = "iframe", Q = "//about:blank", R = function (e) {
        if (t.currTemplate[W]) {
            var i = t.currTemplate[W].find("iframe");
            i.length && (e || (i[0].src = Q), t.isIE8 && i.css("display", e ? "block" : "none"))
        }
    };
    e.magnificPopup.registerModule(W, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {index: "youtube.com", id: "v=", src: "//www.youtube.com/embed/%id%?autoplay=1"},
                vimeo: {index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=1"},
                gmaps: {index: "//maps.google.", src: "%id%&output=embed"}
            }
        }, proto: {
            initIframe: function () {
                t.types.push(W), x("BeforeChange", function (e, t, i) {
                    t !== i && (t === W ? R() : i === W && R(!0))
                }), x(s + "." + W, function () {
                    R()
                })
            }, getIframe: function (i, n) {
                var o = i.src, r = t.st.iframe;
                e.each(r.patterns, function () {
                    if (o.indexOf(this.index) > -1) return this.id && (o = "string" == typeof this.id ? o.substr(o.lastIndexOf(this.id) + this.id.length, o.length) : this.id.call(this, o)), o = this.src.replace("%id%", o), !1
                });
                var a = {};
                return r.srcAction && (a[r.srcAction] = o), t._parseMarkup(n, a, i), t.updateStatus("ready"), n
            }
        }
    });
    var Z = function (e) {
        var i = t.items.length;
        return e > i - 1 ? e - i : e < 0 ? i + e : e
    }, K = function (e, t, i) {
        return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, i)
    };
    e.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !1,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        }, proto: {
            initGallery: function () {
                var i = t.st.gallery, o = ".mfp-gallery";
                if (t.direction = !0, !i || !i.enabled) return !1;
                r += " mfp-gallery", x(u + o, function () {
                    i.navigateByImgClick && t.wrap.on("click" + o, ".mfp-img", function () {
                        if (t.items.length > 1) return t.next(), !1
                    }), n.on("keydown" + o, function (e) {
                        37 === e.keyCode ? t.prev() : 39 === e.keyCode && t.next()
                    })
                }), x("UpdateStatus" + o, function (e, i) {
                    i.text && (i.text = K(i.text, t.currItem.index, t.items.length))
                }), x(p + o, function (e, n, o, r) {
                    var a = t.items.length;
                    o.counter = a > 1 ? K(i.tCounter, r.index, a) : ""
                }), x("BuildControls" + o, function () {
                    if (t.items.length > 1 && i.arrows && !t.arrowLeft) {
                        var n = i.arrowMarkup,
                            o = t.arrowLeft = e(n.replace(/%title%/gi, i.tPrev).replace(/%dir%/gi, "left")).addClass(y),
                            r = t.arrowRight = e(n.replace(/%title%/gi, i.tNext).replace(/%dir%/gi, "right")).addClass(y);
                        o.click(function () {
                            t.prev()
                        }), r.click(function () {
                            jQuery("body").hasClass("com_content") && t.index + 1 > t.items.length - 1 ? jQuery(".grid_6:eq(" + (jQuery(t.currItem.el).parents().eq(5).index() + 1) + ")").is("li") ? jQuery(".grid_6:eq(" + (jQuery(t.currItem.el).parents().eq(5).index() + 1) + ")").find(".jackbox img").click() : "none" == jQuery(".loading").css("display") && explore_more(jQuery(t.currItem.el).parents().eq(5).index()) : t.next()
                        }), t.container.append(o.add(r))
                    }
                }), x(f + o, function () {
                    t._preloadTimeout && clearTimeout(t._preloadTimeout), t._preloadTimeout = setTimeout(function () {
                        t.preloadNearbyImages(), t._preloadTimeout = null
                    }, 16)
                }), x(s + o, function () {
                    n.off(o), t.wrap.off("click" + o), t.arrowRight = t.arrowLeft = null
                })
            }, next: function () {
                t.direction = !0, t.index = Z(t.index + 1), t.updateItemHTML()
            }, prev: function () {
                t.direction = !1, t.index = Z(t.index - 1), t.updateItemHTML()
            }, goTo: function (e) {
                t.direction = e >= t.index, t.index = e, t.updateItemHTML()
            }, preloadNearbyImages: function () {
                var e, i = t.st.gallery.preload, n = Math.min(i[0], t.items.length), o = Math.min(i[1], t.items.length);
                for (e = 1; e <= (t.direction ? o : n); e++) t._preloadItem(t.index + e);
                for (e = 1; e <= (t.direction ? n : o); e++) t._preloadItem(t.index - e)
            }, _preloadItem: function (i) {
                if (i = Z(i), !t.items[i].preloaded) {
                    var n = t.items[i];
                    n.parsed || (n = t.parseEl(i)), k("LazyLoad", n), "image" === n.type && (n.img = e('<img class="mfp-img" />').on("load.mfploader", function () {
                        n.hasSize = !0
                    }).on("error.mfploader", function () {
                        n.hasSize = !0, n.loadError = !0, k("LazyLoadError", n)
                    }).attr("src", n.src)), n.preloaded = !0
                }
            }
        }
    });
    var D = "retina";
    e.magnificPopup.registerModule(D, {
        options: {
            replaceSrc: function (e) {
                return e.src.replace(/\.\w+$/, function (e) {
                    return "@2x" + e
                })
            }, ratio: 1
        }, proto: {
            initRetina: function () {
                if (window.devicePixelRatio > 1) {
                    var e = t.st.retina, i = e.ratio;
                    i = isNaN(i) ? i() : i, i > 1 && (x("ImageHasSize." + D, function (e, t) {
                        t.img.css({"max-width": t.img[0].naturalWidth / i, width: "100%"})
                    }), x("ElementParse." + D, function (t, n) {
                        n.src = e.replaceSrc(n, i)
                    }))
                }
            }
        }
    }), N()
});

function removeHtmlTag(e, t) {
    if (-1 != e.indexOf("<")) {
        for (var a = e.split("<"), l = 0; l < a.length; l++) -1 != a[l].indexOf(">") && (a[l] = a[l].substring(a[l].indexOf(">") + 1, a[l].length));
        e = a.join("")
    }
    for (t = t < e.length - 1 ? t : e.length - 2; " " != e.charAt(t - 1) && -1 != e.indexOf(" ", t);) t++;
    return e = e.substring(0, t - 1), e + "..."
}

function getCombinations(e) {
    var t = [[]];
    for (var a of e) {
        var l = t.slice();
        for (var s of l) t.push(s.concat(a))
    }
    return t.slice(1).sort(function (e, t) {
        return t.length - e.length
    })
}

function dropDown(e, t) {
    var a = -1, l = "";
    $(t).each(function (e) {
        text = $(this).text(), zero = 0;
        for (var t = 0; t < text.length && (zero = text.indexOf("+", zero), -1 != zero); t++) zero++;
        if (level = t, level > a && (l += "<ul>"), level < a) {
            offset = a - level;
            for (var s = 0; s < offset; s++) l += "</ul></li>"
        }
        l += "<li class='dj-up'>" + $(this).html().replace(/\+/gi, ""), a = level
    });
    for (var s = 0; s <= a; s++) l += "</ul>", 0 != s && (l += "</li>");
    $(e).html(l).removeClass("hidden"), $(e).find("ul:first-child").attr("class", "dj-mtmenu"), $(".dj-mtmenu li > ul li, .dj-mtmenu li > ul li a").removeAttr("class");
    var winWidth = $(window).width(), topMenu = "";
    winWidth < 768 && ($(".moduletablemenu a").each(function () {
        var a = $(this), e = a.attr("href"), n = a.text().toLowerCase();
        topMenu += '<li class="dj-up"><a class="dj-up_a" href="' + e + '"><span class="dj-drop">' + n + "</span></a></li>"
    }), $(".dj-mtmenu").prepend(topMenu).find(".dj-up").each(function () {
        $(this).has("ul").length && $(this).addClass("has-children").children("a").after('<i class="fa fa-plus expand-submenu"></i>')
    }), $(".has-children ul").hide(), $(".expand-submenu").on("click", function () {
        $(this).next("ul").toggle()
    }));
}

function magnific(e) {
    e.magnificPopup({
        type: "image",
        gallery: {enabled: !0},
        zoom: {
            enabled: !0, duration: 400, opener: function (e) {
                return e.is("img") ? e : e.find("img")
            }
        },
        navigateByImgClick: !1,
        image: {markup: '<div class="zeninner"><div class="mfp-figure column"><div class="mfp-close"></div><div class="zencategory element1 firstitem"><div class="sitelink"><a href="#" class="mfp-sitelink"><div class="mfp-logo"><img src=""></div><div class="mfp-logotext"></div></a></div></div><figure><a class="mfp-href" href="#"><img class="mfp-img"></a><figcaption><div class="mfp-bottom-bar"><div class="mfp-price zenprice"></div><div class="mfp-title"></div><div class="mfp-text"></div><div class="mfp-counter"></div><a class="mfp-zentype zentype" href="#" target="_blank"></a><div class="mfp-likes zenlikes"></div><div class="mfp-comments zencomments"></div></div></figcaption></figure></div></div></div><div class="loading"></div><div class="zentools masonry more_elements"><ul><li class="sizer"></li></ul></div>'},
        callbacks: {
            imageLoadComplete: function () {
                $(".mfp-img").orThemesZoom()
            }
        }
    })
}

function loadMore(e, t) {
    var a = e.zentype, l = e.labels, s = e.id, i = "", n = [];
    labelsComb = getCombinations(l.split(",")), t > 0 ? i = "/feeds/posts/default/?category=" + encodeURIComponent(labelsComb[t]) + "&published&alt=json" : (i = "/feeds/posts/default/?category=" + encodeURIComponent(labelsComb[0]) + "&published&alt=json", html = "", entriesLength = 0, IDs = [], scrolled = 0), $.ajax({
        url: i, type: "get", dataType: "jsonp", success: function (e) {
            var t = e.feed.entry;
            if (void 0 !== t) for (var l = !1, i = 0; i < t.length; i++) {
                var r = t[i], o = parseInt(r.id.$t.split("-").slice(-1).join(""));
                if (!(o == s || IDs.indexOf(o + "") > -1)) {
                    IDs.push(o + ""), l || (entriesLength += t.length - 1, l = !0);
                    var c = "";
                    "content" in r ? c = r.content.$t : "summary" in r && (c = r.summary.$t);
                    var m = $("<div>" + c + "</div>"), d = m.find("img").attr("src");
                    void 0 === d && (d = m.find("iframe").data("thumbnail-src"), void 0 === d && (d = "https://lh3.googleusercontent.com/-Yyf6Amv22oI/VcDFF690PYI/AAAAAAAACT8/NSB63gjG9NM/w680-h610-c-Ic42/NoThumb.png"));
                    for (var f = removeHtmlTag(c, 50), p = "", v = 0; v < r.link.length; v++) if ("replies" == r.link[v].rel && "text/html" == r.link[v].type) {
                        p = r.link[v].title.split(" ")[0];
                        break
                    }
                    for (var h = "", u = 0; u < r.link.length; u++) if ("alternate" == r.link[u].rel) {
                        h = r.link[u].href;
                        break
                    }
                    var g = r.title.$t, b = a, y = a;
                    if (void 0 !== r.category) {
                        y = r.category[0].term;
                        for (var x = 0; x < r.category.length; x++) {
                            var j = r.category[x].term;
                            if (j.toLowerCase().match(/photo|video|blog|journal|product/)) {
                                b = j;
                                break
                            }
                        }
                    }
                    n = [];
                    for (var k = 0; k < r.category.length; k++) {
                        j = r.category[k].term;
                        n.push(j)
                    }
                    var A = n.join(","), z = r.author[0].name.$t, C = r.author[0].gd$image.src.replace("http", "https");
                    C = C.replace("s512", "s70"), C = z.match(/anonymous/i) ? "https://2.bp.blogspot.com/-GfFjD8etS2E/UTPve4mQdYI/AAAAAAAAC7k/gy0DVRlx4xM/s40/anonymous-Icon.jpg" : C.match(/(blank|rounded)(\.gif)/g) ? "https://2.bp.blogspot.com/-GfFjD8etS2E/UTPve4mQdYI/AAAAAAAAC7k/gy0DVRlx4xM/s40/anonymous-Icon.jpg" : C, html += "<li class='grid_6 element mfp-prevent-close'><div class='zenitem zenitem1  category full'><div class='zeninner mfp-prevent-close'><div class='column grid_twelve mfp-prevent-close'><div class='zencategory element1 firstitem mfp-prevent-close'><div class='sitelink mfp-prevent-close'><a class='mfp-prevent-close' href='/search/label/" + y + "?max-results=25#filters'><img class='mfp-prevent-close' src='" + C + "'/>" + z + "</a></div></div><div class='zenimage element2'><span class='mfp-labels' style='display:none'>" + A + "</span><a class='jackbox' data-behavior='lightbox' data-group='gallery-334i' data-width='600' data-href='#" + o + "' expr:data-thumbTooltip='" + g + "' data-title='" + g + "'><img class='zoom_me' alt='" + g + "' data-mfp-comments='" + p + "' data-mfp-href='" + h + "' data-mfp-id='" + o + "' data-mfp-sitename='" + z + "' data-mfp-author='" + C + "' data-mfp-src='" + d + "' data-mfp-text='" + f + "' data-mfp-zentype='" + b + "' data-mfp-label='" + b + "' src='" + d + "' title='" + g + "'/></a></div><div class='zentitle element3'><strong><a class='jackbox' data-group='gallery-334t' data-width='600' data-href='" + h + "' data-title='" + g + "' href='" + h + "'><span>" + g + "</span></a></strong></div><div class='zentext element4 mfp-prevent-close'>" + f + "</div><a href='/search/label/" + y + "+" + b + "?max-results=25#filters' class='zentype mfp-prevent-close'>" + b + "</a><div class='zencomments mfp-prevent-close'><a class='zencomment_linkzero' href='" + h + "#comments'><span>" + p + "</span><i class='fa fa-comment fa-lg mfp-prevent-close'/></a></div></div><div class='clear'/></div></div></li>"
                }
            }
        }
    }).then(function () {
        if (t < labelsComb.length - 1) {
            var e = {zentype: a, labels: l, id: s};
            scrolled = ++t, loadMore(e, scrolled)
        } else {
            var i = $(".more_elements ul"), n = $(html);
            i.masonry({
                itemSelector: ".more_elements ul li",
                transitionDuration: 800,
                isResizable: !0,
                percentPosition: !0,
                columnWidth: ".sizer",
                gutter: 20
            }), n.length > 0 && (i.append(n), n.hide(), $(".mfp-content .loading").show(), $(".mfp-wrap").scrollTop(0), i.imagesLoaded(function () {
                $(".mfp-content .loading").hide(), i.masonry("remove", i.find("li.grid_6")), n.show(), i.masonry("appended", n).masonry();
                var e = n.find(".jackbox img");
                $(".zoom_me").orThemesZoom();
                magnific(e)
            }))
        }
    })
}

function relatedPosts(e, t, a) {
    $.ajax({
        url: "/feeds/posts/default/-/" + encodeURIComponent(t) + "?published&alt=json&max-results=6",
        type: "get",
        dataType: "jsonp",
        success: function (t) {
            var l = t.feed.entry, s = 0, i = !1;
            if (void 0 !== l) {
                for (var n = "<ul>", r = 0; r < l.length; r++) {
                    var o = l[r], c = parseInt(o.id.$t.split("-").slice(-1).join(""));
                    if (c != a) {
                        if (i || r != l.length - 1) {
                            s++;
                            var m = "";
                            "content" in o ? m = o.content.$t : "summary" in o && (m = o.summary.$t);
                            var d = $("<div>" + m + "</div>"), f = d.find("img").attr("src");
                            void 0 === f && (f = d.find("iframe").data("thumbnail-src"), void 0 === f && (f = "https://lh3.googleusercontent.com/-Yyf6Amv22oI/VcDFF690PYI/AAAAAAAACT8/NSB63gjG9NM/w680-h610-c-Ic42/NoThumb.png"));
                            for (var p = "", v = 0; v < o.link.length; v++) if ("alternate" == o.link[v].rel) {
                                p = o.link[v].href;
                                break
                            }
                            var h = o.title.$t;
                            n += "<li><div class='related-thumb'><a href='" + p + "' style='background: url(" + f + ") no-repeat center center;background-size: cover;'></a></div><h4 class='related-title'><a href='" + p + "'>" + h + "</a></h4></li>"
                        }
                    } else i = !0
                }
                for (var u = 6 - l.length; u > 0; u--) n += "<li></li>";
                n += "</ul>", s > 0 ? $(e).html(n) : $(e).parent().remove()
            }
        }
    })
}

function blogStats(e) {
    var t = ["/feeds/posts/default/?published&alt=json&max-results=0", "/feeds/comments/default/?published&alt=json&max-results=0"],
        a = $("#pageviews").data("url");
    $.ajax({
        url: a, type: "get", dataType: "json", success: function (t) {
            $(e).append("<li>Page Views: " + t.total + "</li>")
        }
    });
    for (var l = 0; l < t.length; l++) $.ajax({
        url: t[l], type: "get", dataType: "jsonp", success: function (t) {
            var a = t.feed,
                l = (t = a.openSearch$totalResults.$t, a.id.$t.indexOf("comments") > -1 ? "Comments" : "Posts");
            $(e).append("<li>Total " + l + ": " + t + "</li>")
        }
    })
}

function getAuthorNameFromLabelPageUrl(label_page_url) {
    // get the label search term
    const startIndex = label_page_url.indexOf("/label/@") + "/label/@".length;
    if (startIndex < 1) {
        return '';
    }
    const endIndex = label_page_url.indexOf("?");
    let searchTerm = label_page_url.substring(startIndex, endIndex);
    return searchTerm.toLowerCase().replace('%20', '_').replace(' ', '_').replace('+', '_');
}

function renderModelCoverDataOnSearchPagesForModelSearchTerms() {
    // pull model cover image, title, description on search pages for search terms containing model names
    let url = window.location.href;
    let isSearchPage = url.indexOf('/search') !== -1 && url.indexOf('q=') !== -1;
    if (isSearchPage) {
        let searchTerm = decodeURIComponent(url.split('q=')[1].split('&')[0]);
        searchTerm = searchTerm.toLowerCase().replace(' ', '_').replace('%20', '_').replace('+', '_');
        if (models_data[searchTerm]) {
            let model_data = models_data[searchTerm];
            $(".g_list h2.model_title").text(model_data.title);
            $(".g_list p.model_description").text(model_data.description);
            let cover_image = "https://raw.githubusercontent.com/althemy/althemy/master/images/covers/" + searchTerm + ".jpg";
            $(".foa_bg").css("background-image", "url('" + cover_image + "')");
        }
    }
}

function renderModelAuthorDataOnListingPages() {
    if (!$('body').hasClass('item') && !$('body').hasClass('static_page')) {
        $(".author_wrapper").each(function () {
            const $this = $(this);
            const searchTerm = getAuthorNameFromLabelPageUrl($this.attr('href'));

            if (searchTerm != "" && models_data[searchTerm]) {
                let author_thumb = "https://raw.githubusercontent.com/althemy/althemy/master/images/authors/" + searchTerm + ".jpg";
                $("img.model_author_image").attr('src', author_thumb);
                $("span.model_author_title").text(models_data[searchTerm].title);
            }
        });
    }
}

var html = "", entriesLength = 0, IDs = [], scrolled = 0, labelsComb = [], labelsCombLength = labelsComb.length,
    elements_clicked = [];
jQuery(document).ready(function () {
    dropDown(".shop_menu", ".shop_menu li");
    var e = _WidgetManager._GetAllData().blog.view;
    location.href.indexOf("?q=") > -1 ? $("#filters li").each(function () {
        var e = $(this), t = e.data("label"), a = e.children("a"), l = location.href;
        searchQuery.indexOf("label") > -1 && (searchQuery = searchQuery.split(" "), searchQuery.pop(), searchQuery = searchQuery.join(" ")), l = "/search/?q=" + searchQuery, t && (l = l + "+label:" + t), l += "&max-results=25#filters", a.attr("href", l)
    }) : location.href.indexOf("/search/label") > -1 && "home" !== e && $("#filters li").each(function () {
        var e = $(this), t = e.data("label"), a = e.children("a"), l = location.href;
        searchLabel.indexOf("+") > -1 && (searchLabel = searchLabel.split("+")[0]), l = t ? "/search/label/" + searchLabel + "+" + t : "/search/label/" + searchLabel, l += "?max-results=25#filters", a.attr("href", l)
    }), $(".post-outer.card.replace img").first().parent("a").remove();
    var t = jQuery("#zentoolslist334");
    t.imagesLoaded(function () {
        t.masonry({itemSelector: "#zentoolslist334 li", transitionDuration: 800, columnWidth: ".sizer", gutter: 20})
    }), $("#zentoolslist334 .jackbox img").click(function () {
        var e = jQuery(this), t = e.parents().eq(5).index(), a = jQuery(".jackbox img").slice(t - 1, t + 24);
        magnific(a), setTimeout(function () {
            elements_clicked[t] || (e.click(), elements_clicked[t] = !0)
        }, 150)
    });
    var a = $("#nextPage").attr("href");
    a ? $("#explore-more a").attr("href", a) : $("#explore-more").remove(), $(".toggleMenu").on("click", function () {
        $(".shop_menu").toggle()
    }), $(".toggleSearch").on("click", function () {
        $(".main_logo").toggle(), $(".topSearch").toggleClass("shown")
    });
    var l = [];
    $(".related-content-wrap span").each(function () {
        l.push($(this).text().trim())
    });
    var s = Math.floor(Math.random() * l.length);
    s = l[s];
    var i = $(".post-outer").data("id");
    s && relatedPosts(".related-content-wrap", s, i), blogStats(".sidebar-stats ul")
}), WebFontConfig = {google: {families: ["Josefin+Sans", "Oswald"]}}, function () {
    var e = document.createElement("script");
    e.src = ("https:" == document.location.protocol ? "https" : "http") + "://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js", e.type = "text/javascript", e.async = "true";
    var t = document.getElementsByTagName("script")[0];
    t.parentNode.insertBefore(e, t)
}();
$(function () {
    var s, i = 0, o = $("#navwrap"), t = o.height();
    $(window).scroll(function () {
        s = !0
    }), setInterval(function () {
        s && (function () {
            var s = $(this).scrollTop();
            Math.abs(i - s) <= 5 || (i < s && t < s ? ($(o).css({
                position: "relative",
                opacity: "0"
            }).removeClass("sticky"), $("body").removeClass("sticky").css({"margin-top": 0})) : (s + $(window).height() < $(document).height() - $(window).height() - 1e3 && ($(o).css({
                position: "fixed",
                opacity: "1"
            }).addClass("sticky"), $("body").addClass("sticky").css({"margin-top": t})), s < 400 && ($("body").removeClass("sticky").css({"margin-top": 0}), $(o).css({
                position: "relative",
                opacity: "1"
            }).removeClass("sticky"))), i = s)
        }(), s = !1)
    }, 250);
    setInterval(function () {
        var o = $("img.mfp-img:not(.zoom_ready)"), m = $("img.zoom_me:not(.zoom_ready)");
        0 < o.length && o.orThemesZoom(), 0 < m.length && m.orThemesZoom()
    }, 200);

    renderModelCoverDataOnSearchPagesForModelSearchTerms();
    renderModelAuthorDataOnListingPages();

});
