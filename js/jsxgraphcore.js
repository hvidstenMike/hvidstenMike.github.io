/* Version 0.95 */
/*
    Copyright 2008-2012
        Matthias Ehmann,
        Michael Gerhaeuser,
        Carsten Miller,
        Bianca Valentin,
        Alfred Wassermann,
        Peter Wilfahrt

    This file is part of JSXGraph.

    JSXGraph is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    JSXGraph is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with JSXGraph.  If not, see <http://www.gnu.org/licenses/>.
*/
var JXG = {};
(function () {
    var d, e;
    JXG.countDrawings = 0;
    JXG.countTime = 0;
    JXG.require = function (f) {};
    JXG.rendererFiles = {};
    JXG.rendererFiles.svg = "SVGRenderer";
    JXG.rendererFiles.vml = "VMLRenderer";
    JXG.rendererFiles.canvas = "CanvasRenderer";
    JXG.baseFiles = null;
    JXG.requirePath = "";
    if (typeof document !== "undefined") {
        for (d = 0; d < document.getElementsByTagName("script").length; d++) {
            e = document.getElementsByTagName("script")[d];
            if (e.src && e.src.match(/loadjsxgraphInOneFile\.js(\?.*)?$/)) {
                JXG.requirePath = e.src.replace(/loadjsxgraphInOneFile\.js(\?.*)?$/, "")
            }
        }
    }
    JXG.serverBase = JXG.requirePath + "server/"
})();
JXG.extend = function (d, j, f, i) {
    var h, g;
    f = f || false;
    i = i || false;
    for (h in j) {
        if (!f || (f && j.hasOwnProperty(h))) {
            if (i) {
                g = h.toLowerCase()
            } else {
                g = h
            }
            d[g] = j[h]
        }
    }
};
JXG.shortcut = function (e, d) {
    return function () {
        return e[d].apply(this, arguments)
    }
};
JXG.extend(JXG, {
    touchProperty: "touches",
    supportsVML: function () {
        return typeof document != "undefined" && !! document.namespaces
    },
    supportsSVG: function () {
        return typeof document != "undefined" && document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")
    },
    supportsCanvas: function () {
        return typeof document != "undefined" && !! document.createElement("canvas").getContext
    },
    isAndroid: function () {
        return navigator.userAgent.toLowerCase().search("android") > -1
    },
    isWebkitAndroid: function () {
        return this.isAndroid() && navigator.userAgent.search(" AppleWebKit/") > -1
    },
    isApple: function () {
        return (navigator.userAgent.search(/iPad/) != -1 || navigator.userAgent.search(/iPhone/) != -1)
    },
    isWebkitApple: function () {
        return this.isApple() && (navigator.userAgent.search(/Mobile *.*Safari/) > -1)
    },
    clearVisPropOld: function (d) {
        d.visPropOld = {
            strokecolor: "",
            strokeopacity: "",
            strokewidth: "",
            fillcolor: "",
            fillopacity: "",
            shadow: false,
            firstarrow: false,
            lastarrow: false,
            cssclass: "",
            fontsize: -1
        }
    },
    ieVersion: (function () {
        var f;
        if (typeof document == "undefined") {
            return f
        }
        var d = 3,
            g = document.createElement("div"),
            e = g.getElementsByTagName("i");
        while (g.innerHTML = "<!--[if gt IE " + (++d) + "]><i></i><![endif]-->", e[0]) {}
        return d > 4 ? d : f
    }()),
    getReference: function (e, d) {
        if (typeof (d) == "string") {
            if (JXG.exists(e.objects[d])) {
                d = e.objects[d]
            } else {
                if (JXG.exists(e.elementsByName[d])) {
                    d = e.elementsByName[d]
                } else {
                    if (JXG.exists(e.groups[d])) {
                        d = e.groups[d]
                    }
                }
            }
        }
        return d
    },
    getRef: JXG.shortcut(JXG, "getReference"),
    isId: function (e, d) {
        return typeof (d) == "string" && !! e.objects[d]
    },
    isName: function (e, d) {
        return typeof (d) == "string" && !! e.elementsByName[d]
    },
    isGroup: function (e, d) {
        return typeof (d) == "string" && !! e.groups[d]
    },
    isString: function (d) {
        return typeof d === "string"
    },
    isNumber: function (d) {
        return typeof d === "number"
    },
    isFunction: function (d) {
        return typeof d === "function"
    },
    isArray: function (d) {
        return d !== null && typeof d === "object" && "splice" in d && "join" in d
    },
    isPoint: function (d) {
        if (typeof d == "object") {
            return (d.elementClass == JXG.OBJECT_CLASS_POINT)
        }
        return false
    },
    exists: (function (d) {
        return function (e) {
            return !(e === d || e === null)
        }
    })(),
    def: function (e, f) {
        if (JXG.exists(e)) {
            return e
        } else {
            return f
        }
    },
    str2Bool: function (d) {
        if (!JXG.exists(d)) {
            return true
        }
        if (typeof d == "boolean") {
            return d
        }
        if (JXG.isString(d)) {
            return (d.toLowerCase() == "true")
        } else {
            return false
        }
    },
    _board: function (e, d) {
        return JXG.JSXGraph.initBoard(e, d)
    },
    createEvalFunction: function (e, j, k) {
        var g = [],
            d, h;
        for (d = 0; d < k; d++) {
            if (typeof j[d] == "string") {
                h = JXG.GeonextParser.geonext2JS(j[d], e);
                h = h.replace(/this\.board\./g, "board.");
                g[d] = new Function("", "return " + (h) + ";")
            }
        }
        return function (i) {
            var f = j[i];
            if (typeof f == "string") {
                return g[i]()
            } else {
                if (typeof f == "function") {
                    return f()
                } else {
                    if (typeof f == "number") {
                        return f
                    }
                }
            }
            return 0
        }
    },
    createFunction: function (d, e, h, i) {
        var g = null;
        if ((!JXG.exists(i) || i) && JXG.isString(d)) {
            g = e.jc.snippet(d, true, h, true)
        } else {
            if (JXG.isFunction(d)) {
                g = d
            } else {
                if (JXG.isNumber(d)) {
                    g = function () {
                        return d
                    }
                } else {
                    if (JXG.isString(d)) {
                        g = function () {
                            return d
                        }
                    }
                }
            }
        }
        if (g !== null) {
            g.origin = d
        }
        return g
    },
    checkParents: function (f, o, n) {
        var g, e, d, l, p = [],
            m = o.slice(0),
            h = function (j, i) {
                var k = (typeof j).toLowerCase();
                if (k === "number") {
                    return i && ((i.type && i.type === j) || (i.elementClass && i.elementClass === j))
                } else {
                    switch (j.toLowerCase()) {
                        case "string":
                        case "object":
                        case "function":
                        case "number":
                            return (typeof i).toLowerCase() === j.toLowerCase();
                            break;
                        case "array":
                            return JXG.isArray(i);
                            break
                    }
                }
                return false
            };
        for (g = 0; g < n.length; g++) {
            for (e = 0; e < n[g].length && o.length >= n[g].length; e++) {
                d = 0;
                while (d < m.length && !h(n[g][e], m[d])) {
                    d++
                }
                if (d < m.length) {
                    p.push(m.splice(l - d - 1, 1)[0])
                }
            }
            if (m.length) {
                m = o.slice(0);
                p = []
            } else {
                return p
            }
        }
    },
    readOption: function (d, f, e) {
        var g = d.elements[e];
        if (JXG.exists(d[f][e])) {
            g = d[f][e]
        }
        return g
    },
    checkAttributes: function (d, f) {
        var e;
        if (!JXG.exists(d)) {
            d = {}
        }
        for (e in f) {
            if (!JXG.exists(d[e])) {
                d[e] = f[e]
            }
        }
        return d
    },
    copyAttributes: function (f, g) {
        var e, h, d, l, k, j = {
            circle: 1,
            curve: 1,
            image: 1,
            line: 1,
            point: 1,
            polygon: 1,
            text: 1,
            ticks: 1,
            integral: 1
        };
        d = arguments.length;
        if (d < 3 || j[arguments[2]]) {
            e = this.deepCopy(g.elements, null, true)
        } else {
            e = {}
        }
        if (d < 4 && this.exists(arguments[2]) && this.exists(g.layer[arguments[2]])) {
            e.layer = g.layer[arguments[2]]
        }
        l = g;
        k = true;
        for (h = 2; h < d; h++) {
            if (JXG.exists(l[arguments[h]])) {
                l = l[arguments[h]]
            } else {
                k = false;
                break
            }
        }
        if (k) {
            e = this.deepCopy(e, l, true)
        }
        l = f;
        k = true;
        for (h = 3; h < d; h++) {
            if (JXG.exists(l[arguments[h]])) {
                l = l[arguments[h]]
            } else {
                k = false;
                break
            }
        }
        if (k) {
            this.extend(e, l, null, true)
        }
        l = g;
        k = true;
        for (h = 2; h < d; h++) {
            if (JXG.exists(l[arguments[h]])) {
                l = l[arguments[h]]
            } else {
                k = false;
                break
            }
        }
        if (k) {
            e.label = JXG.deepCopy(l.label, e.label)
        }
        e.label = JXG.deepCopy(g.label, e.label);
        return e
    },
    getDimensions: function (i) {
        var h, k, f, l, j, e, d, g;
        if (typeof document == "undefined" || i == null) {
            return {
                width: 500,
                height: 500
            }
        }
        h = document.getElementById(i);
        if (!JXG.exists(h)) {
            throw new Error("\nJSXGraph: HTML container element '" + (i) + "' not found.")
        }
        k = h.style.display;
        if (k != "none" && k != null) {
            return {
                width: h.offsetWidth,
                height: h.offsetHeight
            }
        }
        f = h.style;
        l = f.visibility;
        j = f.position;
        e = f.display;
        f.visibility = "hidden";
        f.position = "absolute";
        f.display = "block";
        d = h.clientWidth;
        g = h.clientHeight;
        f.display = e;
        f.position = j;
        f.visibility = l;
        return {
            width: d,
            height: g
        }
    },
    addEvent: function (h, g, f, d) {
        var e = function () {
            return f.apply(d, arguments)
        };
        e.origin = f;
        d["x_internal" + g] = d["x_internal" + g] || [];
        d["x_internal" + g].push(e);
        if (JXG.exists(h) && JXG.exists(h.addEventListener)) {
            h.addEventListener(g, e, false)
        } else {
            h.attachEvent("on" + g, e)
        }
    },
    removeEvent: function (k, h, g, d) {
        var f;
        if (!JXG.exists(d)) {
            JXG.debug("no such owner");
            alert("see console and recheck why!!!");
            return
        }
        if (!JXG.exists(d["x_internal" + h])) {
            JXG.debug("no such type: " + h);
            return
        }
        if (!JXG.isArray(d["x_internal" + h])) {
            JXG.debug("owner[x_internal + " + h + "] is not an array");
            return
        }
        f = JXG.indexOf(d["x_internal" + h], g, "origin");
        if (f === -1) {
            JXG.debug("no such event function in internal list: " + g);
            return
        }
        try {
            if (JXG.exists(k.addEventListener)) {
                k.removeEventListener(h, d["x_internal" + h][f], false)
            } else {
                k.detachEvent("on" + h, d["x_internal" + h][f])
            }
        } catch (j) {
            JXG.debug("event not registered in browser: (" + h + " -- " + g + ")")
        }
        d["x_internal" + h].splice(f, 1)
    },
    removeAllEvents: function (h, g, e) {
        var f, d;
        if (e["x_internal" + g]) {
            d = e["x_internal" + g].length;
            for (f = d - 1; f >= 0; f--) {
                JXG.removeEvent(h, g, e["x_internal" + g][f].origin, e)
            }
            if (e["x_internal" + g].length > 0) {
                JXG.debug("removeAllEvents: Not all events could be removed.")
            }
        }
    },
    bind: function (e, d) {
        return function () {
            return e.apply(d, arguments)
        }
    },
    removeElementFromArray: function (d, f) {
        var e;
        for (e = 0; e < d.length; e++) {
            if (d[e] === f) {
                d.splice(e, 1);
                return d
            }
        }
        return d
    },
    getPosition: function (k, g) {
        var h, f, d = 0,
            l = 0,
            j;
        if (!k) {
            k = window.event
        }
        j = k[JXG.touchProperty];
        if (JXG.exists(g)) {
            if (g == -1) {
                f = j.length;
                for (h = 0; h < f; h++) {
                    if (j[h]) {
                        k = j[h];
                        break
                    }
                }
            } else {
                k = j[g]
            }
        }
        if (k.pageX || k.pageY) {
            d = k.pageX;
            l = k.pageY
        } else {
            if (k.clientX || k.clientY) {
                d = k.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                l = k.clientY + document.body.scrollTop + document.documentElement.scrollTop
            }
        }
        return [d, l]
    },
    getOffset: function (g) {
        var h = g,
            f = g,
            d = h.offsetLeft - h.scrollLeft,
            e = h.offsetTop - h.scrollTop;
        while (h = h.offsetParent) {
            d += h.offsetLeft;
            e += h.offsetTop;
            if (h.offsetParent) {
                d += h.clientLeft - h.scrollLeft;
                e += h.clientTop - h.scrollTop
            }
            f = f.parentNode;
            while (f != h) {
                d += f.clientLeft - f.scrollLeft;
                e += f.clientTop - f.scrollTop;
                f = f.parentNode
            }
        }
        return [d, e]
    },
    getStyle: function (f, e) {
        var d;
        if (window.getComputedStyle) {
            d = document.defaultView.getComputedStyle(f, null).getPropertyValue(e)
        } else {
            if (f.currentStyle && JXG.ieVersion >= 9) {
                d = f.currentStyle[e]
            } else {
                if (f.style) {
                    e = e.replace(/-([a-z]|[0-9])/ig, function (g, h) {
                        return (h + "").toUpperCase()
                    });
                    d = f.style[e]
                }
            }
        }
        return d
    },
    keys: function (d, e) {
        var f = [],
            g;
        for (g in d) {
            if (e) {
                if (d.hasOwnProperty(g)) {
                    f.push(g)
                }
            } else {
                f.push(g)
            }
        }
        return f
    },
    indexOf: function (h, g, f) {
        var d, e = JXG.exists(f);
        if (Array.indexOf && !e) {
            return h.indexOf(g)
        }
        for (d = 0; d < h.length; d++) {
            if ((e && h[d][f] === g) || (!e && h[d] === g)) {
                return d
            }
        }
        return -1
    },
    escapeHTML: function (d) {
        return d.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    },
    unescapeHTML: function (d) {
        return d.replace(/<\/?[^>]+>/gi, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    },
    clone: function (e) {
        var d = {};
        d.prototype = e;
        return d
    },
    cloneAndCopy: function (g, f) {
        var d = function () {}, e;
        d.prototype = g;
        for (e in f) {
            d[e] = f[e]
        }
        return d
    },
    deepCopy: function (k, h, g) {
        var m, e, l, d, f;
        g = g || false;
        if (typeof k !== "object" || k == null) {
            return k
        }
        if (this.isArray(k)) {
            m = [];
            for (e = 0; e < k.length; e++) {
                l = k[e];
                if (typeof l == "object") {
                    m[e] = this.deepCopy(l)
                } else {
                    m[e] = l
                }
            }
        } else {
            m = {};
            for (e in k) {
                f = g ? e.toLowerCase() : e;
                l = k[e];
                if (typeof l == "object") {
                    m[f] = this.deepCopy(l)
                } else {
                    m[f] = l
                }
            }
            for (e in h) {
                f = g ? e.toLowerCase() : e;
                l = h[e];
                if (typeof l == "object") {
                    if (JXG.isArray(l) || !JXG.exists(m[f])) {
                        m[f] = this.deepCopy(l)
                    } else {
                        m[f] = this.deepCopy(m[f], l, g)
                    }
                } else {
                    m[f] = l
                }
            }
        }
        return m
    },
    toJSON: function (k, g) {
        var f, l;
        g = JXG.def(g, false);
        if (window.JSON && window.JSON.stringify && !g) {
            try {
                f = JSON.stringify(k);
                return f
            } catch (j) {}
        }
        switch (typeof k) {
            case "object":
                if (k) {
                    var h = [];
                    if (k instanceof Array) {
                        for (var d = 0; d < k.length; d++) {
                            h.push(JXG.toJSON(k[d], g))
                        }
                        return "[" + h.join(",") + "]"
                    } else {
                        for (var m in k) {
                            try {
                                l = JXG.toJSON(k[m], g)
                            } catch (j) {
                                l = ""
                            }
                            if (g) {
                                h.push(m + ":" + l)
                            } else {
                                h.push('"' + m + '":' + l)
                            }
                        }
                        return "{" + h.join(",") + "} "
                    }
                } else {
                    return "null"
                }
            case "string":
                return "'" + k.replace(/(["'])/g, "\\$1") + "'";
            case "number":
            case "boolean":
                return new String(k)
        }
    },
    capitalize: function (d) {
        return d.charAt(0).toUpperCase() + d.substring(1).toLowerCase()
    },
    timedChunk: function (e, g, f, h) {
        var d = e.concat();
        setTimeout(function () {
            var i = +new Date();
            do {
                g.call(f, d.shift())
            } while (d.length > 0 && (+new Date() - i < 300));
            if (d.length > 0) {
                setTimeout(arguments.callee, 1)
            } else {
                h(e)
            }
        }, 1)
    },
    trimNumber: function (d) {
        d = d.replace(/^0+/, "");
        d = d.replace(/0+$/, "");
        if (d[d.length - 1] == "." || d[d.length - 1] == ",") {
            d = d.slice(0, - 1)
        }
        if (d[0] == "." || d[0] == ",") {
            d = "0" + d
        }
        return d
    },
    trim: function (d) {
        d = d.replace(/^\s+/, "");
        d = d.replace(/\s+$/, "");
        return d
    },
    evaluate: function (d) {
        if (JXG.isFunction(d)) {
            return d()
        } else {
            return d
        }
    },
    eliminateDuplicates: function (f) {
        var g, e = f.length,
            d = [],
            h = {};
        for (g = 0; g < e; g++) {
            h[f[g]] = 0
        }
        for (g in h) {
            if (h.hasOwnProperty(g)) {
                d.push(g)
            }
        }
        return d
    },
    cmpArrays: function (e, d) {
        var f;
        if (e === d) {
            return true
        }
        if (e.length !== d.length) {
            return false
        }
        for (f = 0; f < e.length; f++) {
            if ((typeof e[f] !== typeof d[f]) || (e[f] !== d[f])) {
                return false
            }
        }
        return true
    },
    trunc: function (e, d) {
        d = JXG.def(d, 0);
        if (d == 0) {
            e = ~~e
        } else {
            e = e.toFixed(d)
        }
        return e
    },
    autoDigits: function (e) {
        var d = Math.abs(e);
        if (d > 0.1) {
            d = e.toFixed(2)
        } else {
            if (d >= 0.01) {
                d = e.toFixed(4)
            } else {
                if (d >= 0.0001) {
                    d = e.toFixed(6)
                } else {
                    d = e
                }
            }
        }
        return d
    },
    debug: function (e) {
        var d;
        for (d = 0; d < arguments.length; d++) {
            e = arguments[d];
            if (window.console && console.log) {
                console.log(e)
            } else {
                if (document.getElementById("debug")) {
                    document.getElementById("debug").innerHTML += e + "<br/>"
                }
            }
        }
    },
    debugWST: function (d) {
        var f;
        JXG.debug(d);
        if (window.console && console.log) {
            f = new Error();
            if (f && f.stack) {
                console.log("stacktrace");
                console.log(f.stack.split("\n").slice(1).join("\n"))
            }
        }
    }
});
if (typeof window !== "undefined" && typeof document !== "undefined") {
    JXG.addEvent(window, "load", function () {
        var l = document.getElementsByTagName("script"),
            q, n, m, f, p, h, s, r, k, d, g;
        for (n = 0; n < l.length; n++) {
            q = l[n].getAttribute("type", false);
            if (!JXG.exists(q)) {
                continue
            }
            if (q.toLowerCase() === "text/jessiescript" || q.toLowerCase() === "jessiescript" || q.toLowerCase() === "text/jessiecode" || q.toLowerCase() === "jessiecode") {
                h = l[n].getAttribute("width", false) || "500px";
                s = l[n].getAttribute("height", false) || "500px";
                r = l[n].getAttribute("boundingbox", false) || "-5, 5, 5, -5";
                r = r.split(",");
                if (r.length !== 4) {
                    r = [-5, 5, 5, - 5]
                } else {
                    for (m = 0; m < r.length; m++) {
                        r[m] = parseFloat(r[m])
                    }
                }
                k = JXG.str2Bool(l[n].getAttribute("axis", false) || "false");
                d = JXG.str2Bool(l[n].getAttribute("grid", false) || "false");
                f = document.createElement("div");
                f.setAttribute("id", "jessiescript_autgen_jxg_" + n);
                f.setAttribute("style", "width:" + h + "; height:" + s + "; float:left");
                f.setAttribute("class", "jxgbox");
                try {
                    document.body.insertBefore(f, l[n])
                } catch (o) {
                    if (typeof jQuery !== "undefined") {
                        jQuery(f).insertBefore(l[n])
                    }
                }
                if (document.getElementById("jessiescript_autgen_jxg_" + n)) {
                    p = JXG.JSXGraph.initBoard("jessiescript_autgen_jxg_" + n, {
                        boundingbox: r,
                        keepaspectratio: true,
                        grid: d,
                        axis: k
                    });
                    g = l[n].innerHTML;
                    g = g.replace(/<!\[CDATA\[/g, "").replace(/\]\]>/g, "");
                    l[n].innerHTML = g;
                    if (q.toLowerCase().indexOf("script") > -1) {
                        p.construct(g)
                    } else {
                        try {
                            p.jc.parse(g)
                        } catch (o) {
                            JXG.debug(o)
                        }
                    }
                } else {
                    JXG.debug("JSXGraph: Apparently the div injection failed. Can't create a board, sorry.")
                }
            }
        }
    }, window)
}
JXG.Math = (function (e, d, f) {
    var g = function (i) {
        var h, j;
        if (i.memo) {
            return i.memo
        }
        h = {};
        j = Array.prototype.join;
        return (i.memo = function () {
            var k = j.call(arguments);
            return (h[k] !== f) ? h[k] : h[k] = i.apply(this, arguments)
        })
    };
    return {
        eps: 0.000001,
        mod: function (i, h) {
            return i - d.floor(i / h) * h
        },
        vector: function (l, k) {
            var j, h;
            k = k || 0;
            j = new Array(d.ceil(l));
            for (h = 0; h < l; h++) {
                j[h] = k
            }
            return j
        },
        matrix: function (q, h, p) {
            var o, l, k;
            p = p || 0;
            h = h || q;
            o = new Array(d.ceil(q));
            for (l = 0; l < q; l++) {
                o[l] = new Array(d.ceil(h));
                for (k = 0; k < h; k++) {
                    o[l][k] = p
                }
            }
            return o
        },
        identity: function (l, h) {
            var k, j;
            if ((h === f) && (typeof h !== "number")) {
                h = l
            }
            k = this.matrix(l, h);
            for (j = 0; j < d.min(l, h); j++) {
                k[j][j] = 1
            }
            return k
        },
        frustum: function (i, m, h, k, p, o) {
            var j = e.Math.matrix(4, 4);
            j[0][0] = (p * 2) / (m - i);
            j[0][1] = 0;
            j[0][2] = (m + i) / (m - i);
            j[0][3] = 0;
            j[1][0] = 0;
            j[1][1] = (p * 2) / (k - h);
            j[1][2] = (k + h) / (k - h);
            j[1][3] = 0;
            j[2][0] = 0;
            j[2][1] = 0;
            j[2][2] = -(o + p) / (o - p);
            j[2][3] = -(o * p * 2) / (o - p);
            j[3][0] = 0;
            j[3][1] = 0;
            j[3][2] = -1;
            j[3][3] = 0;
            return j
        },
        projection: function (h, j, m, l) {
            var i = m * d.tan(h / 2),
                k = i * j;
            return this.frustum(-k, k, - i, i, m, l)
        },
        matVecMult: function (q, p) {
            var h = q.length,
                t = p.length,
                o = [],
                l, r, j;
            if (t === 3) {
                for (l = 0; l < h; l++) {
                    o[l] = q[l][0] * p[0] + q[l][1] * p[1] + q[l][2] * p[2]
                }
            } else {
                for (l = 0; l < h; l++) {
                    r = 0;
                    for (j = 0; j < t; j++) {
                        r += q[l][j] * p[j]
                    }
                    o[l] = r
                }
            }
            return o
        },
        matMatMult: function (l, h) {
            var p = l.length,
                o = p > 0 ? h[0].length : 0,
                v = h.length,
                u = this.matrix(p, o),
                t, r, w, q;
            for (t = 0; t < p; t++) {
                for (r = 0; r < o; r++) {
                    w = 0;
                    for (q = 0; q < v; q++) {
                        w += l[t][q] * h[q][r]
                    }
                    u[t][r] = w
                }
            }
            return u
        },
        transpose: function (q) {
            var l, o, k, h, p;
            h = q.length;
            p = q.length > 0 ? q[0].length : 0;
            l = this.matrix(p, h);
            for (o = 0; o < p; o++) {
                for (k = 0; k < h; k++) {
                    l[o][k] = q[k][o]
                }
            }
            return l
        },
        inverse: function (z) {
            var u, t, q, C, B, h, w, o = z.length,
                m = [],
                l = [],
                v = [];
            for (u = 0; u < o; u++) {
                m[u] = [];
                for (t = 0; t < o; t++) {
                    m[u][t] = z[u][t]
                }
                l[u] = u
            }
            for (t = 0; t < o; t++) {
                B = d.abs(m[t][t]);
                h = t;
                for (u = t + 1; u < o; u++) {
                    if (d.abs(m[u][t]) > B) {
                        B = d.abs(m[u][t]);
                        h = u
                    }
                }
                if (B <= e.Math.eps) {
                    return false
                }
                if (h > t) {
                    for (q = 0; q < o; q++) {
                        w = m[t][q];
                        m[t][q] = m[h][q];
                        m[h][q] = w
                    }
                    w = l[t];
                    l[t] = l[h];
                    l[h] = w
                }
                C = 1 / m[t][t];
                for (u = 0; u < o; u++) {
                    m[u][t] *= C
                }
                m[t][t] = C;
                for (q = 0; q < o; q++) {
                    if (q != t) {
                        for (u = 0; u < o; u++) {
                            if (u != t) {
                                m[u][q] -= m[u][t] * m[t][q]
                            }
                        }
                        m[t][q] = -C * m[t][q]
                    }
                }
            }
            for (u = 0; u < o; u++) {
                for (q = 0; q < o; q++) {
                    v[l[q]] = m[u][q]
                }
                for (q = 0; q < o; q++) {
                    m[u][q] = v[q]
                }
            }
            return m
        },
        innerProduct: function (j, h, m) {
            var k, l = 0;
            if ((m === f) || (typeof m !== "number")) {
                m = j.length
            }
            for (k = 0; k < m; k++) {
                l += j[k] * h[k]
            }
            return l
        },
        crossProduct: function (i, h) {
            return [i[1] * h[2] - i[2] * h[1], i[2] * h[0] - i[0] * h[2], i[0] * h[1] - i[1] * h[0]]
        },
        factorial: g(function (h) {
            if (h < 0) {
                return NaN
            }
            h = d.floor(h);
            if (h === 0 || h === 1) {
                return 1
            }
            return h * arguments.callee(h - 1)
        }),
        binomial: g(function (m, j) {
            var h, l;
            if (j > m || j < 0) {
                return NaN
            }
            j = d.round(j);
            m = d.round(m);
            if (j === 0 || j === m) {
                return 1
            }
            h = 1;
            for (l = 0; l < j; l++) {
                h *= (m - l);
                h /= (l + 1)
            }
            return h
        }),
        cosh: function (h) {
            return (d.exp(h) + d.exp(-h)) * 0.5
        },
        sinh: function (h) {
            return (d.exp(h) - d.exp(-h)) * 0.5
        },
        pow: function (i, h) {
            if (i === 0) {
                if (h === 0) {
                    return 1
                } else {
                    return 0
                }
            }
            if (d.floor(h) === h) {
                return d.pow(i, h)
            } else {
                if (i > 0) {
                    return d.exp(h * d.log(d.abs(i)))
                } else {
                    return NaN
                }
            }
        },
        squampow: function (j, i) {
            var h;
            if (d.floor(i) === i) {
                h = 1;
                if (i < 0) {
                    j = 1 / j;
                    i *= -1
                }
                while (i != 0) {
                    if (i & 1) {
                        h *= j
                    }
                    i >>= 1;
                    j *= j
                }
                return h
            } else {
                return this.pow(j, i)
            }
        },
        normalize: function (j) {
            var h = 2 * j[3],
                k = j[4] / (h),
                l, i;
            j[5] = k;
            j[6] = -j[1] / h;
            j[7] = -j[2] / h;
            if (k === Infinity || isNaN(k)) {
                l = d.sqrt(j[1] * j[1] + j[2] * j[2]);
                j[0] /= l;
                j[1] /= l;
                j[2] /= l;
                j[3] = 0;
                j[4] = 1
            } else {
                if (d.abs(k) >= 1) {
                    j[0] = (j[6] * j[6] + j[7] * j[7] - k * k) / (2 * k);
                    j[1] = -j[6] / k;
                    j[2] = -j[7] / k;
                    j[3] = 1 / (2 * k);
                    j[4] = 1
                } else {
                    i = (k <= 0) ? (-1) : (1);
                    j[0] = i * (j[6] * j[6] + j[7] * j[7] - k * k) * 0.5;
                    j[1] = -i * j[6];
                    j[2] = -i * j[7];
                    j[3] = i / 2;
                    j[4] = i * k
                }
            }
            return j
        },
        toGL: function (h) {
            var k, n, l;
            if (typeof Float32Array !== "undefined") {
                k = new Float32Array(16)
            } else {
                k = new Array(16)
            }
            if (h.length !== 4 && h[0].length !== 4) {
                return k
            }
            for (n = 0; n < 4; n++) {
                for (l = 0; l < 4; l++) {
                    k[n + 4 * l] = h[n][l]
                }
            }
            return k
        }
    }
})(JXG, Math);
JXG.Math.Numerics = (function (e, d) {
    var f = {
        rk4: {
            s: 4,
            A: [
                [0, 0, 0, 0],
                [0.5, 0, 0, 0],
                [0, 0.5, 0, 0],
                [0, 0, 1, 0]
            ],
            b: [1 / 6, 1 / 3, 1 / 3, 1 / 6],
            c: [0, 0.5, 0.5, 1]
        },
        heun: {
            s: 2,
            A: [
                [0, 0],
                [1, 0]
            ],
            b: [0.5, 0.5],
            c: [0, 1]
        },
        euler: {
            s: 1,
            A: [
                [0]
            ],
            b: [1],
            c: [0]
        }
    };
    return {
        Gauss: function (g, r) {
            var t = e.Math.eps,
                h = g.length > 0 ? g[0].length : 0,
                p, s, q, o, m, l = function (u, n) {
                    var k = this[u];
                    this[u] = this[n];
                    this[n] = k
                };
            if ((h !== r.length) || (h !== g.length)) {
                throw new Error("JXG.Math.Numerics.Gauss: Dimensions don't match. A must be a square matrix and b must be of the same length as A.")
            }
            p = new Array(h);
            s = r.slice(0, h);
            for (q = 0; q < h; q++) {
                p[q] = g[q].slice(0, h)
            }
            for (o = 0; o < h; o++) {
                for (q = h - 1; q > o; q--) {
                    if (d.abs(p[q][o]) > t) {
                        if (d.abs(p[o][o]) < t) {
                            l.apply(p, [q, o]);
                            l.apply(s, [q, o])
                        } else {
                            p[q][o] /= p[o][o];
                            s[q] -= p[q][o] * s[o];
                            for (m = o + 1; m < h; m++) {
                                p[q][m] -= p[q][o] * p[o][m]
                            }
                        }
                    }
                }
                if (d.abs(p[o][o]) < t) {
                    throw new Error("JXG.Math.Numerics.Gauss(): The given matrix seems to be singular.")
                }
            }
            this.backwardSolve(p, s, true);
            return s
        },
        backwardSolve: function (q, k, p) {
            var h, g, r, o, l;
            if (p) {
                h = k
            } else {
                h = k.slice(0, k.length)
            }
            g = q.length;
            r = q.length > 0 ? q[0].length : 0;
            for (o = g - 1; o >= 0; o--) {
                for (l = r - 1; l > o; l--) {
                    h[o] -= q[o][l] * h[l]
                }
                h[o] /= q[o][o]
            }
            return h
        },
        gaussBareiss: function (u) {
            var l, r, z, o, m, g, h, q, v, w = e.Math.eps;
            h = u.length;
            if (h <= 0) {
                return 0
            }
            if (u[0].length < h) {
                h = u[0].length
            }
            q = new Array(h);
            for (o = 0; o < h; o++) {
                q[o] = u[o].slice(0, h)
            }
            r = 1;
            z = 1;
            for (l = 0; l < h - 1; l++) {
                g = q[l][l];
                if (d.abs(g) < w) {
                    for (o = 0; o < h; o++) {
                        if (d.abs(q[o][l]) >= w) {
                            break
                        }
                    }
                    if (o == h) {
                        return 0
                    }
                    for (m = l; m < h; m++) {
                        v = q[o][m];
                        q[o][m] = q[l][m];
                        q[l][m] = v
                    }
                    z = -z;
                    g = q[l][l]
                }
                for (o = l + 1; o < h; o++) {
                    for (m = l + 1; m < h; m++) {
                        v = g * q[o][m] - q[o][l] * q[l][m];
                        q[o][m] = v / r
                    }
                }
                r = g
            }
            return z * q[h - 1][h - 1]
        },
        det: function (g) {
            return this.gaussBareiss(g)
        },
        Jacobi: function (B) {
            var r, p, o, g, s, z, w, C = e.Math.eps,
                v = 0,
                u, q, l = B.length,
                m = [
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0]
                ],
                h = [
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0]
                ],
                t = 0;
            for (r = 0; r < l; r++) {
                for (p = 0; p < l; p++) {
                    m[r][p] = 0;
                    h[r][p] = B[r][p];
                    v += d.abs(h[r][p])
                }
                m[r][r] = 1
            }
            if (l == 1) {
                return [h, m]
            }
            if (v <= 0) {
                return [h, m]
            }
            v /= (l * l);
            do {
                u = 0;
                q = 0;
                for (p = 1; p < l; p++) {
                    for (r = 0; r < p; r++) {
                        g = d.abs(h[r][p]);
                        if (g > q) {
                            q = g
                        }
                        u += g;
                        if (g >= C) {
                            g = d.atan2(2 * h[r][p], h[r][r] - h[p][p]) * 0.5;
                            s = d.sin(g);
                            z = d.cos(g);
                            for (o = 0; o < l; o++) {
                                w = h[o][r];
                                h[o][r] = z * w + s * h[o][p];
                                h[o][p] = -s * w + z * h[o][p];
                                w = m[o][r];
                                m[o][r] = z * w + s * m[o][p];
                                m[o][p] = -s * w + z * m[o][p]
                            }
                            h[r][r] = z * h[r][r] + s * h[p][r];
                            h[p][p] = -s * h[r][p] + z * h[p][p];
                            h[r][p] = 0;
                            for (o = 0; o < l; o++) {
                                h[r][o] = h[o][r];
                                h[p][o] = h[o][p]
                            }
                        }
                    }
                }
                t++
            } while (d.abs(u) / v > C && t < 2000);
            return [h, m]
        },
        NewtonCotes: function (g, k, h) {
            var l = 0,
                p = h && typeof h.number_of_nodes === "number" ? h.number_of_nodes : 28,
                n = {
                    trapez: true,
                    simpson: true,
                    milne: true
                }, q = h && h.integration_type && n.hasOwnProperty(h.integration_type) && n[h.integration_type] ? h.integration_type : "milne",
                o = (g[1] - g[0]) / p,
                m, j, r;
            switch (q) {
                case "trapez":
                    l = (k(g[0]) + k(g[1])) * 0.5;
                    m = g[0];
                    for (j = 0; j < p - 1; j++) {
                        m += o;
                        l += k(m)
                    }
                    l *= o;
                    break;
                case "simpson":
                    if (p % 2 > 0) {
                        throw new Error("JSXGraph:  INT_SIMPSON requires config.number_of_nodes dividable by 2.")
                    }
                    r = p / 2;
                    l = k(g[0]) + k(g[1]);
                    m = g[0];
                    for (j = 0; j < r - 1; j++) {
                        m += 2 * o;
                        l += 2 * k(m)
                    }
                    m = g[0] - o;
                    for (j = 0; j < r; j++) {
                        m += 2 * o;
                        l += 4 * k(m)
                    }
                    l *= o / 3;
                    break;
                default:
                    if (p % 4 > 0) {
                        throw new Error("JSXGraph: Error in INT_MILNE: config.number_of_nodes must be a multiple of 4")
                    }
                    r = p * 0.25;
                    l = 7 * (k(g[0]) + k(g[1]));
                    m = g[0];
                    for (j = 0; j < r - 1; j++) {
                        m += 4 * o;
                        l += 14 * k(m)
                    }
                    m = g[0] - 3 * o;
                    for (j = 0; j < r; j++) {
                        m += 4 * o;
                        l += 32 * (k(m) + k(m + 2 * o))
                    }
                    m = g[0] - 2 * o;
                    for (j = 0; j < r; j++) {
                        m += 4 * o;
                        l += 12 * k(m)
                    }
                    l *= 2 * o / 45
            }
            return l
        },
        I: function (g, h) {
            return this.NewtonCotes(g, h, {
                number_of_nodes: 16,
                integration_type: "milne"
            })
        },
        Newton: function (o, g, j) {
            var k = 0,
                m = e.Math.eps,
                n = o.apply(j, [g]),
                l = 1,
                p;
            if (e.isArray(g)) {
                g = g[0]
            }
            while (k < 50 && d.abs(n) > m) {
                p = this.D(o, j)(g);
                l += 2;
                if (d.abs(p) > m) {
                    g -= n / p
                } else {
                    g += (d.random() * 0.2 - 1)
                }
                n = o.apply(j, [g]);
                l++;
                k++
            }
            return g
        },
        root: function (i, g, h) {
            return this.fzero(i, g, h)
        },
        Neville: function (k) {
            var h = [],
                g = function (l) {
                    return function (v, m) {
                        var o, u, w, z = e.Math.binomial,
                            r = k.length,
                            n = r - 1,
                            p = 0,
                            q = 0;
                        if (!m) {
                            w = 1;
                            for (o = 0; o < r; o++) {
                                h[o] = z(n, o) * w;
                                w *= (-1)
                            }
                        }
                        u = v;
                        for (o = 0; o < r; o++) {
                            if (u === 0) {
                                return k[o][l]()
                            } else {
                                w = h[o] / u;
                                u--;
                                p += k[o][l]() * w;
                                q += w
                            }
                        }
                        return p / q
                    }
                }, j = g("X"),
                i = g("Y");
            return [j, i, 0, function () {
                return k.length - 1
            }]
        },
        splineDef: function (r, q) {
            var g = d.min(r.length, q.length),
                j, m, h, o = [],
                p = [],
                k = [],
                u = [],
                s = [],
                t = [];
            if (g === 2) {
                return [0, 0]
            }
            for (m = 0; m < g; m++) {
                j = {
                    X: r[m],
                    Y: q[m]
                };
                k.push(j)
            }
            k.sort(function (l, i) {
                return l.X - i.X
            });
            for (m = 0; m < g; m++) {
                r[m] = k[m].X;
                q[m] = k[m].Y
            }
            for (m = 0; m < g - 1; m++) {
                u.push(r[m + 1] - r[m])
            }
            for (m = 0; m < g - 2; m++) {
                s.push(6 * (q[m + 2] - q[m + 1]) / (u[m + 1]) - 6 * (q[m + 1] - q[m]) / (u[m]))
            }
            o.push(2 * (u[0] + u[1]));
            p.push(s[0]);
            for (m = 0; m < g - 3; m++) {
                h = u[m + 1] / o[m];
                o.push(2 * (u[m + 1] + u[m + 2]) - h * u[m + 1]);
                p.push(s[m + 1] - h * p[m])
            }
            t[g - 3] = p[g - 3] / o[g - 3];
            for (m = g - 4; m >= 0; m--) {
                t[m] = (p[m] - (u[m + 1] * t[m + 1])) / o[m]
            }
            for (m = g - 3; m >= 0; m--) {
                t[m + 1] = t[m]
            }
            t[0] = 0;
            t[g - 1] = 0;
            return t
        },
        splineEval: function (h, w, u, A) {
            var k = d.min(w.length, u.length),
                o = 1,
                m = false,
                z = [],
                q, p, v, t, s, r, g;
            if (e.isArray(h)) {
                o = h.length;
                m = true
            } else {
                h = [h]
            }
            for (q = 0; q < o; q++) {
                if ((h[q] < w[0]) || (w[q] > w[k - 1])) {
                    return NaN
                }
                for (p = 1; p < k; p++) {
                    if (h[q] <= w[p]) {
                        break
                    }
                }
                p--;
                v = u[p];
                t = (u[p + 1] - u[p]) / (w[p + 1] - w[p]) - (w[p + 1] - w[p]) / 6 * (A[p + 1] + 2 * A[p]);
                s = A[p] / 2;
                r = (A[p + 1] - A[p]) / (6 * (w[p + 1] - w[p]));
                g = h[q] - w[p];
                z.push(v + (t + (s + r * g) * g) * g)
            }
            if (m) {
                return z
            } else {
                return z[0]
            }
        },
        generatePolynomialTerm: function (g, m, h, j) {
            var l = [],
                k;
            for (k = m; k >= 0; k--) {
                l = l.concat(["(", g[k].toPrecision(j), ")"]);
                if (k > 1) {
                    l = l.concat(["*", h, "<sup>", k, "<", "/sup> + "])
                } else {
                    if (k === 1) {
                        l = l.concat(["*", h, " + "])
                    }
                }
            }
            return l.join("")
        },
        lagrangePolynomial: function (i) {
            var g = [],
                h = function (v, l) {
                    var o, m, r, u, w, p = 0,
                        q = 0,
                        t, n;
                    r = i.length;
                    if (!l) {
                        for (o = 0; o < r; o++) {
                            g[o] = 1;
                            u = i[o].X();
                            for (m = 0; m < r; m++) {
                                if (m != o) {
                                    g[o] *= (u - i[m].X())
                                }
                            }
                            g[o] = 1 / g[o]
                        }
                        t = [];
                        for (n = 0; n < r; n++) {
                            t.push([1])
                        }
                    }
                    for (o = 0; o < r; o++) {
                        u = i[o].X();
                        if (v === u) {
                            return i[o].Y()
                        } else {
                            w = g[o] / (v - u);
                            q += w;
                            p += w * i[o].Y()
                        }
                    }
                    return p / q
                };
            h.getTerm = function () {
                return ""
            };
            return h
        },
        CatmullRomSpline: function (i) {
            var h = [],
                k, l = {}, j = {}, g = function (m) {
                    return function (p, o) {
                        var n = i.length,
                            q, r;
                        if (n < 2) {
                            return NaN
                        }
                        if (!o) {
                            l[m] = function () {
                                return 2 * i[0][m]() - i[1][m]()
                            };
                            j[m] = function () {
                                return 2 * i[n - 1][m]() - i[n - 2][m]()
                            };
                            k = [l].concat(i, [j]);
                            h[m] = [];
                            for (q = 0; q < n - 1; q++) {
                                h[m][q] = [2 * k[q + 1][m](), - k[q][m]() + k[q + 2][m](), 2 * k[q][m]() - 5 * k[q + 1][m]() + 4 * k[q + 2][m]() - k[q + 3][m](), - k[q][m]() + 3 * k[q + 1][m]() - 3 * k[q + 2][m]() + k[q + 3][m]()]
                            }
                        }
                        n += 2;
                        if (isNaN(p)) {
                            return NaN
                        }
                        if (p < 0) {
                            return k[1][m]()
                        } else {
                            if (p >= n - 3) {
                                return k[n - 2][m]()
                            }
                        }
                        q = d.floor(p);
                        if (q == p) {
                            return k[q][m]()
                        }
                        p -= q;
                        r = h[m][q];
                        return 0.5 * (((r[3] * p + r[2]) * p + r[1]) * p + r[0])
                    }
                };
            return [g("X"), g("Y"), 0, function () {
                return i.length - 1
            }]
        },
        regressionPolynomial: function (k, o, n) {
            var g, h, m, l, i, p, j = "";
            if (e.isPoint(k) && typeof k.Value == "function") {
                h = function () {
                    return k.Value()
                }
            } else {
                if (e.isFunction(k)) {
                    h = k
                } else {
                    if (e.isNumber(k)) {
                        h = function () {
                            return k
                        }
                    } else {
                        throw new Error("JSXGraph: Can't create regressionPolynomial from degree of type'" + (typeof k) + "'.")
                    }
                }
            }
            if (arguments.length == 3 && e.isArray(o) && e.isArray(n)) {
                i = 0
            } else {
                if (arguments.length == 2 && e.isArray(o) && o.length > 0 && e.isPoint(o[0])) {
                    i = 1
                } else {
                    throw new Error("JSXGraph: Can't create regressionPolynomial. Wrong parameters.")
                }
            }
            p = function (E, q) {
                var u, t, A, w, D, r, C, F, z, v = o.length;
                z = d.floor(h());
                if (!q) {
                    if (i === 1) {
                        m = [];
                        l = [];
                        for (u = 0; u < v; u++) {
                            m[u] = o[u].X();
                            l[u] = o[u].Y()
                        }
                    }
                    if (i === 0) {
                        m = [];
                        l = [];
                        for (u = 0; u < v; u++) {
                            if (e.isFunction(o[u])) {
                                m.push(o[u]())
                            } else {
                                m.push(o[u])
                            }
                            if (e.isFunction(n[u])) {
                                l.push(n[u]())
                            } else {
                                l.push(n[u])
                            }
                        }
                    }
                    A = [];
                    for (t = 0; t < v; t++) {
                        A.push([1])
                    }
                    for (u = 1; u <= z; u++) {
                        for (t = 0; t < v; t++) {
                            A[t][u] = A[t][u - 1] * m[t]
                        }
                    }
                    D = l;
                    w = e.Math.transpose(A);
                    r = e.Math.matMatMult(w, A);
                    C = e.Math.matVecMult(w, D);
                    g = e.Math.Numerics.Gauss(r, C);
                    j = e.Math.Numerics.generatePolynomialTerm(g, z, "x", 3)
                }
                F = g[z];
                for (u = z - 1; u >= 0; u--) {
                    F = (F * E + g[u])
                }
                return F
            };
            p.getTerm = function () {
                return j
            };
            return p
        },
        bezier: function (i) {
            var g, h = function (j) {
                return function (l, k) {
                    var o = d.floor(l) * 3,
                        n = l % 1,
                        m = 1 - n;
                    if (!k) {
                        g = d.floor(i.length / 3)
                    }
                    if (l < 0) {
                        return i[0][j]()
                    }
                    if (l >= g) {
                        return i[i.length - 1][j]()
                    }
                    if (isNaN(l)) {
                        return NaN
                    }
                    return m * m * (m * i[o][j]() + 3 * n * i[o + 1][j]()) + (3 * m * i[o + 2][j]() + n * i[o + 3][j]()) * n * n
                }
            };
            return [h("X"), h("Y"), 0, function () {
                return d.floor(i.length / 3)
            }]
        },
        bspline: function (j, g) {
            var k, m = [],
                l = function (r, o) {
                    var p, q = [];
                    for (p = 0; p < r + o + 1; p++) {
                        if (p < o) {
                            q[p] = 0
                        } else {
                            if (p <= r) {
                                q[p] = p - o + 1
                            } else {
                                q[p] = r - o + 2
                            }
                        }
                    }
                    return q
                }, i = function (A, C, o, p, B) {
                    var r, q, w, v, z, u = [];
                    if (C[B] <= A && A < C[B + 1]) {
                        u[B] = 1
                    } else {
                        u[B] = 0
                    }
                    for (r = 2; r <= p; r++) {
                        for (q = B - r + 1; q <= B; q++) {
                            if (q <= B - r + 1 || q < 0) {
                                w = 0
                            } else {
                                w = u[q]
                            }
                            if (q >= B) {
                                v = 0
                            } else {
                                v = u[q + 1]
                            }
                            z = C[q + r - 1] - C[q];
                            if (z == 0) {
                                u[q] = 0
                            } else {
                                u[q] = (A - C[q]) / z * w
                            }
                            z = C[q + r] - C[q + 1];
                            if (z != 0) {
                                u[q] += (C[q + r] - A) / z * v
                            }
                        }
                    }
                    return u
                }, h = function (n) {
                    return function (u, p) {
                        var o = j.length,
                            z, r, v, w = o - 1,
                            q = g;
                        if (w <= 0) {
                            return NaN
                        }
                        if (w + 2 <= q) {
                            q = w + 1
                        }
                        if (u <= 0) {
                            return j[0][n]()
                        }
                        if (u >= w - q + 2) {
                            return j[w][n]()
                        }
                        k = l(w, q);
                        v = d.floor(u) + q - 1;
                        m = i(u, k, w, q, v);
                        z = 0;
                        for (r = v - q + 1; r <= v; r++) {
                            if (r < o && r >= 0) {
                                z += j[r][n]() * m[r]
                            }
                        }
                        return z
                    }
                };
            return [h("X"), h("Y"), 0, function () {
                return j.length - 1
            }]
        },
        D: function (j, k) {
            var i = 0.00001,
                g = 1 / (i * 2);
            if (arguments.length == 1 || (arguments.length > 1 && !e.exists(arguments[1]))) {
                return function (h, l) {
                    return (j(h + i, l) - j(h - i, l)) * g
                }
            } else {
                return function (h, l) {
                    return (j.apply(k, [h + i, l]) - j.apply(k, [h - i, l])) * g
                }
            }
        },
        riemann: function (r, m, s, k, o) {
            var l = [],
                z = [],
                q, p = 0,
                w, v = k,
                t, h, u, g;
            m = d.round(m);
            l[p] = v;
            z[p] = 0;
            if (m > 0) {
                w = (o - k) / m;
                g = w * 0.01;
                for (q = 0; q < m; q++) {
                    if (s === "right") {
                        t = r(v + w)
                    } else {
                        if (s === "middle") {
                            t = r(v + w * 0.5)
                        } else {
                            if ((s === "left") || (s === "trapezodial")) {
                                t = r(v)
                            } else {
                                if (s === "lower") {
                                    t = r(v);
                                    for (h = v + g; h <= v + w; h += g) {
                                        u = r(h);
                                        if (u < t) {
                                            t = u
                                        }
                                    }
                                } else {
                                    t = r(v);
                                    for (h = v + g; h <= v + w; h += g) {
                                        u = r(h);
                                        if (u > t) {
                                            t = u
                                        }
                                    }
                                }
                            }
                        }
                    }
                    p++;
                    l[p] = v;
                    z[p] = t;
                    p++;
                    v += w;
                    if (s === "trapezodial") {
                        t = r(v)
                    }
                    l[p] = v;
                    z[p] = t;
                    p++;
                    l[p] = v;
                    z[p] = 0
                }
            }
            return [l, z]
        },
        riemannsum: function (o, k, q, j, l) {
            var p = 0,
                m, u, t = j,
                r, h, s, g;
            k = d.floor(k);
            if (k > 0) {
                u = (l - j) / k;
                g = u * 0.01;
                for (m = 0; m < k; m++) {
                    if (q === "right") {
                        r = o(t + u)
                    } else {
                        if (q === "middle") {
                            r = o(t + u * 0.5)
                        } else {
                            if (q === "trapezodial") {
                                r = 0.5 * (o(t + u) + o(t))
                            } else {
                                if (q === "left") {
                                    r = o(t)
                                } else {
                                    if (q === "lower") {
                                        r = o(t);
                                        for (h = t + g; h <= t + u; h += g) {
                                            s = o(h);
                                            if (s < r) {
                                                r = s
                                            }
                                        }
                                    } else {
                                        r = o(t);
                                        for (h = t + g; h <= t + u; h += g) {
                                            s = o(h);
                                            if (s > r) {
                                                r = s
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    p += u * r;
                    t += u
                }
            }
            return p
        },
        rungeKutta: function (g, G, o, m, F) {
            var p = [],
                n = [],
                E = (o[1] - o[0]) / m,
                u = o[0],
                H, D, C, A, z, B = G.length,
                v, q = [],
                w = 0;
            if (e.isString(g)) {
                g = f[g] || f.euler
            }
            v = g.s;
            for (H = 0; H < B; H++) {
                p[H] = G[H]
            }
            for (D = 0; D < m; D++) {
                q[w] = [];
                for (H = 0; H < B; H++) {
                    q[w][H] = p[H]
                }
                w++;
                A = [];
                for (C = 0; C < v; C++) {
                    for (H = 0; H < B; H++) {
                        n[H] = 0
                    }
                    for (z = 0; z < C; z++) {
                        for (H = 0; H < B; H++) {
                            n[H] += (g.A[C][z]) * E * A[z][H]
                        }
                    }
                    for (H = 0; H < B; H++) {
                        n[H] += p[H]
                    }
                    A.push(F(u + g.c[C] * E, n))
                }
                for (H = 0; H < B; H++) {
                    n[H] = 0
                }
                for (z = 0; z < v; z++) {
                    for (H = 0; H < B; H++) {
                        n[H] += g.b[z] * A[z][H]
                    }
                }
                for (H = 0; H < B; H++) {
                    p[H] = p[H] + E * n[H]
                }
                u += E
            }
            return q
        },
        maxIterationsRoot: 80,
        maxIterationsMinimize: 500,
        fzero: function (H, I, N) {
            var A = e.Math.eps,
                g = this.maxIterationsRoot,
                z = 0,
                C = 0,
                o = A,
                L, K, J, B, w, v, M, j, E, F, n, h, D, G, t, r, m, l, s, k;
            if (e.isArray(I)) {
                if (I.length < 2) {
                    throw new Error("JXG.Math.Numerics.fzero: length of array x0 has to be at least two.")
                }
                L = I[0];
                B = H.apply(N, [L]);
                C++;
                K = I[1];
                w = H.apply(N, [K]);
                C++
            } else {
                L = I;
                B = H.apply(N, [L]);
                C++;
                if (L == 0) {
                    M = 1
                } else {
                    M = L
                }
                j = [0.9 * M, 1.1 * M, M - 1, M + 1, 0.5 * M, 1.5 * M, - M, 2 * M, - 10 * M, 10 * M];
                F = j.length;
                for (E = 0; E < F; E++) {
                    K = j[E];
                    w = H.apply(N, [K]);
                    C++;
                    if (B * w <= 0) {
                        break
                    }
                }
                if (K < L) {
                    n = L;
                    L = K;
                    K = n;
                    h = B;
                    B = w;
                    w = h
                }
            }
            if (B * w > 0) {
                if (e.isArray(I)) {
                    return this.fminbr(H, [L, K], N)
                } else {
                    return this.Newton(H, L, N)
                }
            }
            J = L;
            v = B;
            while (z < g) {
                D = K - L;
                if (d.abs(v) < d.abs(w)) {
                    L = K;
                    K = J;
                    J = L;
                    B = w;
                    w = v;
                    v = B
                }
                G = 2 * o * d.abs(K) + A * 0.5;
                m = (J - K) * 0.5;
                if (d.abs(m) <= G && d.abs(w) <= o) {
                    return K
                }
                if (d.abs(D) >= G && d.abs(B) > d.abs(w)) {
                    s = J - K;
                    if (L == J) {
                        l = w / B;
                        t = s * l;
                        r = 1 - l
                    } else {
                        r = B / v;
                        l = w / v;
                        k = w / B;
                        t = k * (s * r * (r - l) - (K - L) * (l - 1));
                        r = (r - 1) * (l - 1) * (k - 1)
                    }
                    if (t > 0) {
                        r = -r
                    } else {
                        t = -t
                    }
                    if (t < (0.75 * s * r - d.abs(G * r) * 0.5) && t < d.abs(D * r * 0.5)) {
                        m = t / r
                    }
                }
                if (d.abs(m) < G) {
                    if (m > 0) {
                        m = G
                    } else {
                        m = -G
                    }
                }
                L = K;
                B = w;
                K += m;
                w = H.apply(N, [K]);
                C++;
                if ((w > 0 && v > 0) || (w < 0 && v < 0)) {
                    J = L;
                    v = B
                }
                z++
            }
            return K
        },
        fminbr: function (H, I, M) {
            var L, J, l, o, n, h, j, i, z = (3 - d.sqrt(5)) * 0.5,
                E = e.Math.eps,
                B = d.sqrt(e.Math.eps),
                g = this.maxIterationsMinimize,
                D = 0,
                u, K, G, m, C, A, s, k, F = 0;
            if (!e.isArray(I) || I.length < 2) {
                throw new Error("JXG.Math.Numerics.fminbr: length of array x0 has to be at least two.")
            }
            L = I[0];
            J = I[1];
            o = L + z * (J - L);
            j = H.apply(M, [o]);
            F++;
            l = o;
            n = o;
            h = j;
            i = j;
            while (D < g) {
                u = J - L;
                K = (L + J) * 0.5;
                G = B * d.abs(l) + E / 3;
                if (d.abs(l - K) + u * 0.5 <= 2 * G) {
                    return l
                }
                m = z * (l < K ? J - l : L - l);
                if (d.abs(l - n) >= G) {
                    s = (l - n) * (h - j);
                    A = (l - o) * (h - i);
                    C = (l - o) * A - (l - n) * s;
                    A = 2 * (A - s);
                    if (A > 0) {
                        C = -C
                    } else {
                        A = -A
                    }
                    if (d.abs(C) < d.abs(m * A) && C > A * (L - l + 2 * G) && C < A * (J - l - 2 * G)) {
                        m = C / A
                    }
                }
                if (d.abs(m) < G) {
                    if (m > 0) {
                        m = G
                    } else {
                        m = -G
                    }
                }
                s = l + m;
                k = H.apply(M, [s]);
                F++;
                if (k <= h) {
                    if (s < l) {
                        J = l
                    } else {
                        L = l
                    }
                    o = n;
                    n = l;
                    l = s;
                    j = i;
                    i = h;
                    h = k
                } else {
                    if (s < l) {
                        L = s
                    } else {
                        J = s
                    }
                    if (k <= i || n == l) {
                        o = n;
                        n = s;
                        j = i;
                        i = k
                    } else {
                        if (k <= j || o == l || o == n) {
                            o = s;
                            j = k
                        }
                    }
                }
                D++
            }
            return l
        },
        reuleauxPolygon: function (i, j) {
            var m = d.PI * 2,
                h = m / j,
                l = (j - 1) / 2,
                k, n = 0,
                g = function (p, o) {
                    return function (r, u) {
                        if (!u) {
                            n = i[0].Dist(i[l]);
                            k = e.Math.Geometry.rad([i[0].X() + 1, i[0].Y()], i[0], i[(l) % j])
                        }
                        var s = (r % m + m) % m;
                        var q = d.floor(s / h) % j;
                        if (isNaN(q)) {
                            return q
                        }
                        s = s * 0.5 + q * h * 0.5 + k;
                        return i[q][p]() + n * d[o](s)
                    }
                };
            return [g("X", "cos"), g("Y", "sin"), 0, d.PI * 2]
        },
        RamerDouglasPeuker: function (p, h) {
            var m = [],
                o, l, g, j = function (u, t, s, q, r) {
                    var k = n(u, t, s);
                    if (k[0] > q) {
                        j(u, t, k[1], q, r);
                        j(u, k[1], s, q, r)
                    } else {
                        r.push(u[s])
                    }
                }, n = function (G, v, u) {
                    var A = 0,
                        w = v,
                        z, t, H, F, E, s, D, r, B, C, q;
                    if (u - v < 2) {
                        return [-1, 0]
                    }
                    H = G[v].scrCoords;
                    F = G[u].scrCoords;
                    if (isNaN(H[1] + H[2] + F[1] + F[2])) {
                        return [NaN, u]
                    }
                    for (t = v + 1; t < u; t++) {
                        E = G[t].scrCoords;
                        s = E[1] - H[1];
                        D = E[2] - H[2];
                        r = F[1] - H[1];
                        B = F[2] - H[2];
                        C = r * r + B * B;
                        if (C >= e.Math.eps) {
                            q = (s * r + D * B) / C;
                            if (q < 0) {
                                q = 0
                            } else {
                                if (q > 1) {
                                    q = 1
                                }
                            }
                            s = s - q * r;
                            D = D - q * B;
                            z = s * s + D * D
                        } else {
                            q = 0;
                            z = s * s + D * D
                        }
                        if (z > A) {
                            A = z;
                            w = t
                        }
                    }
                    return [d.sqrt(A), w]
                };
            g = p.length;
            o = 0;
            while (o < g && isNaN(p[o].scrCoords[1] + p[o].scrCoords[2])) {
                o++
            }
            l = g - 1;
            while (l > o && isNaN(p[l].scrCoords[1] + p[l].scrCoords[2])) {
                l--
            }
            if (!(o > l || o == g)) {
                m[0] = p[o];
                j(p, o, l, h, m)
            }
            return m
        }
    }
})(JXG, Math);
JXG.Math.Statistics = {
    sum: function (e) {
        var g, d = e.length,
            f = 0;
        for (g = 0; g < d; g++) {
            f += e[g]
        }
        return f
    },
    prod: function (e) {
        var g, d = e.length,
            f = 1;
        for (g = 0; g < d; g++) {
            f *= e[g]
        }
        return f
    },
    mean: function (d) {
        if (d.length > 0) {
            return this.sum(d) / d.length
        } else {
            return 0
        }
    },
    median: function (e) {
        var f, d;
        if (e.length > 0) {
            f = e.slice(0);
            f.sort(function (h, g) {
                return h - g
            });
            d = f.length;
            if (d % 2 == 1) {
                return f[parseInt(d * 0.5)]
            } else {
                return (f[d * 0.5 - 1] + f[d * 0.5]) * 0.5
            }
        } else {
            return 0
        }
    },
    variance: function (f) {
        var e, h, g, d = f.length;
        if (d > 1) {
            e = this.mean(f);
            h = 0;
            for (g = 0; g < d; g++) {
                h += (f[g] - e) * (f[g] - e)
            }
            return h / (f.length - 1)
        } else {
            return 0
        }
    },
    sd: function (d) {
        return Math.sqrt(this.variance(d))
    },
    weightedMean: function (d, e) {
        if (d.length != e.length) {
            throw new Error("JSXGraph error (Math.Statistics.weightedMean): Array dimension mismatch.")
        }
        if (d.length > 0) {
            return this.mean(this.multiply(d, e))
        } else {
            return 0
        }
    },
    max: function (d) {
        return Math.max.apply(this, d)
    },
    min: function (d) {
        return Math.min.apply(this, d)
    },
    range: function (d) {
        return [this.min(d), this.max(d)]
    },
    abs: function (e) {
        var g, d, f;
        if (JXG.isArray(e)) {
            d = e.length;
            f = [];
            for (g = 0; g < d; g++) {
                f[g] = Math.abs(e[g])
            }
        } else {
            f = Math.abs(e)
        }
        return f
    },
    add: function (f, e) {
        var h, d, g = [];
        if (JXG.isArray(f) && JXG.isNumber(e)) {
            d = f.length;
            for (h = 0; h < d; h++) {
                g[h] = f[h] + e
            }
        } else {
            if (JXG.isNumber(f) && JXG.isArray(e)) {
                d = e.length;
                for (h = 0; h < d; h++) {
                    g[h] = f + e[h]
                }
            } else {
                if (JXG.isArray(f) && JXG.isArray(e)) {
                    d = Math.min(f.length, e.length);
                    for (h = 0; h < d; h++) {
                        g[h] = f[h] + e[h]
                    }
                } else {
                    g = f + e
                }
            }
        }
        return g
    },
    div: function (f, e) {
        var h, d, g = [];
        if (JXG.isArray(f) && JXG.isNumber(e)) {
            d = f.length;
            for (h = 0; h < d; h++) {
                g[h] = f[h] / e
            }
        } else {
            if (JXG.isNumber(f) && JXG.isArray(e)) {
                d = e.length;
                for (h = 0; h < d; h++) {
                    g[h] = f / e[h]
                }
            } else {
                if (JXG.isArray(f) && JXG.isArray(e)) {
                    d = Math.min(f.length, e.length);
                    for (h = 0; h < d; h++) {
                        g[h] = f[h] / e[h]
                    }
                } else {
                    g = f / e
                }
            }
        }
        return g
    },
    divide: JXG.shortcut(JXG.Math.Statistics, "div"),
    mod: function (f, e, k) {
        var j, d, h = [],
            g = function (l, i) {
                return l % i
            };
        k = JXG.def(k, false);
        if (k) {
            g = JXG.Math.mod
        }
        if (JXG.isArray(f) && JXG.isNumber(e)) {
            d = f.length;
            for (j = 0; j < d; j++) {
                h[j] = g(f[j], e)
            }
        } else {
            if (JXG.isNumber(f) && JXG.isArray(e)) {
                d = e.length;
                for (j = 0; j < d; j++) {
                    h[j] = g(f, e[j])
                }
            } else {
                if (JXG.isArray(f) && JXG.isArray(e)) {
                    d = Math.min(f.length, e.length);
                    for (j = 0; j < d; j++) {
                        h[j] = g(f[j], e[j])
                    }
                } else {
                    h = g(f, e)
                }
            }
        }
        return h
    },
    multiply: function (f, e) {
        var h, d, g = [];
        if (JXG.isArray(f) && JXG.isNumber(e)) {
            d = f.length;
            for (h = 0; h < d; h++) {
                g[h] = f[h] * e
            }
        } else {
            if (JXG.isNumber(f) && JXG.isArray(e)) {
                d = e.length;
                for (h = 0; h < d; h++) {
                    g[h] = f * e[h]
                }
            } else {
                if (JXG.isArray(f) && JXG.isArray(e)) {
                    d = Math.min(f.length, e.length);
                    for (h = 0; h < d; h++) {
                        g[h] = f[h] * e[h]
                    }
                } else {
                    g = f * e
                }
            }
        }
        return g
    },
    subtract: function (f, e) {
        var h, d, g = [];
        if (JXG.isArray(f) && JXG.isNumber(e)) {
            d = f.length;
            for (h = 0; h < d; h++) {
                g[h] = f[h] - e
            }
        } else {
            if (JXG.isNumber(f) && JXG.isArray(e)) {
                d = e.length;
                for (h = 0; h < d; h++) {
                    g[h] = f - e[h]
                }
            } else {
                if (JXG.isArray(f) && JXG.isArray(e)) {
                    d = Math.min(f.length, e.length);
                    for (h = 0; h < d; h++) {
                        g[h] = f[h] - e[h]
                    }
                } else {
                    g = f - e
                }
            }
        }
        return g
    }
};
JXG.Math.Symbolic = function (d, e) {
    return {
        generateSymbolicCoordinatesPartial: function (o, j, i, g) {
            var f = function (k) {
                var q;
                if (g === "underscore") {
                    q = "" + i + "_{" + k + "}"
                } else {
                    if (g == "brace") {
                        q = "" + i + "[" + k + "]"
                    } else {
                        q = "" + i + "" + k
                    }
                }
                return q
            }, m = j.ancestors,
                l = 0,
                n, p, h;
            o.listOfFreePoints = [];
            o.listOfDependantPoints = [];
            for (p in m) {
                n = 0;
                if (d.isPoint(m[p])) {
                    for (h in m[p].ancestors) {
                        n++
                    }
                    if (n === 0) {
                        m[p].symbolic.x = m[p].coords.usrCoords[1];
                        m[p].symbolic.y = m[p].coords.usrCoords[2];
                        o.listOfFreePoints.push(m[p])
                    } else {
                        l++;
                        m[p].symbolic.x = f(l);
                        l++;
                        m[p].symbolic.y = f(l);
                        o.listOfDependantPoints.push(m[p])
                    }
                }
            }
            if (d.isPoint(j)) {
                j.symbolic.x = "x";
                j.symbolic.y = "y"
            }
            return l
        },
        clearSymbolicCoordinates: function (g) {
            var f = function (j) {
                var i, h = (j && j.length) || 0;
                for (i = 0; i < h; i++) {
                    if (d.isPoint(j[i])) {
                        j[i].symbolic.x = "";
                        j[i].symbolic.y = ""
                    }
                }
            };
            f(g.listOfFreePoints);
            f(g.listOfDependantPoints);
            delete(g.listOfFreePoints);
            delete(g.listOfDependantPoints)
        },
        generatePolynomials: function (n, h, j) {
            var m = h.ancestors,
                o, l = [],
                q = [],
                p, f, g;
            if (j) {
                this.generateSymbolicCoordinatesPartial(n, h, "u", "brace")
            }
            m[h.id] = h;
            for (p in m) {
                o = 0;
                l = [];
                if (d.isPoint(m[p])) {
                    for (f in m[p].ancestors) {
                        o++
                    }
                    if (o > 0) {
                        l = m[p].generatePolynomial();
                        for (g = 0; g < l.length; g++) {
                            q.push(l[g])
                        }
                    }
                }
            }
            if (j) {
                this.clearSymbolicCoordinates(n)
            }
            return q
        },
        geometricLocusByGroebnerBase: function (n, B) {
            var l = this.generateSymbolicCoordinatesPartial(n, B, "u", "brace"),
                m, h, q, f = {}, v = new d.Coords(d.COORDS_BY_USR, [0, 0], n),
                t = new d.Coords(d.COORDS_BY_USR, [n.canvasWidth, n.canvasHeight], n),
                k, j, E, H = 1,
                u = 0,
                r = 0,
                o = 0,
                F, w, G, p, A, C, g, D = function (I, J) {
                    var s;
                    for (s = 0; s < J.length; s++) {
                        if (J[s].id === I) {
                            return true
                        }
                    }
                    return false
                }, z = n.options.locus;
            if (d.Server.modules.geoloci === e) {
                d.Server.loadModule("geoloci")
            }
            if (d.Server.modules.geoloci === e) {
                throw new Error("JSXGraph: Unable to load JXG.Server module 'geoloci.py'.")
            }
            p = v.usrCoords[1];
            A = t.usrCoords[1];
            C = t.usrCoords[2];
            g = v.usrCoords[2];
            if (z.translateToOrigin && (n.listOfFreePoints.length > 0)) {
                if ((z.toOrigin !== e) && (z.toOrigin != null) && D(z.toOrigin.id, n.listOfFreePoints)) {
                    k = z.toOrigin
                } else {
                    k = n.listOfFreePoints[0]
                }
                u = k.symbolic.x;
                r = k.symbolic.y;
                for (E = 0; E < n.listOfFreePoints.length; E++) {
                    n.listOfFreePoints[E].symbolic.x -= u;
                    n.listOfFreePoints[E].symbolic.y -= r
                }
                p -= u;
                A -= u;
                C -= r;
                g -= r;
                if (z.translateTo10 && (n.listOfFreePoints.length > 1)) {
                    if ((z.to10 !== e) && (z.to10 != null) && (z.to10.id != z.toOrigin.id) && D(z.to10.id, n.listOfFreePoints)) {
                        j = z.to10
                    } else {
                        if (n.listOfFreePoints[0].id == k.id) {
                            j = n.listOfFreePoints[1]
                        } else {
                            j = n.listOfFreePoints[0]
                        }
                    }
                    o = d.Math.Geometry.rad([1, 0], [0, 0], [j.symbolic.x, j.symbolic.y]);
                    F = Math.cos(-o);
                    w = Math.sin(-o);
                    for (E = 0; E < n.listOfFreePoints.length; E++) {
                        G = n.listOfFreePoints[E].symbolic.x;
                        n.listOfFreePoints[E].symbolic.x = F * n.listOfFreePoints[E].symbolic.x - w * n.listOfFreePoints[E].symbolic.y;
                        n.listOfFreePoints[E].symbolic.y = w * G + F * n.listOfFreePoints[E].symbolic.y
                    }
                    j.symbolic.y = 0;
                    G = p;
                    p = F * p - w * C;
                    C = w * G + F * C;
                    G = A;
                    A = F * A - w * g;
                    g = w * G + F * g;
                    if (z.stretch && (Math.abs(j.symbolic.x) > d.Math.eps)) {
                        H = j.symbolic.x;
                        for (E = 0; E < n.listOfFreePoints.length; E++) {
                            n.listOfFreePoints[E].symbolic.x /= H;
                            n.listOfFreePoints[E].symbolic.y /= H
                        }
                        for (E in n.objects) {
                            if ((n.objects[E].elementClass == d.OBJECT_CLASS_CIRCLE) && (n.objects[E].method == "pointRadius")) {
                                f[E] = n.objects[E].radius;
                                n.objects[E].radius /= H
                            }
                        }
                        p /= H;
                        A /= H;
                        C /= H;
                        g /= H;
                        j.symbolic.x = 1
                    }
                }
                for (E = 0; E < n.listOfFreePoints.length; E++) {
                    G = n.listOfFreePoints[E].symbolic.x;
                    if (Math.abs(G) < d.Math.eps) {
                        n.listOfFreePoints[E].symbolic.x = 0
                    }
                    if (Math.abs(G - Math.round(G)) < d.Math.eps) {
                        n.listOfFreePoints[E].symbolic.x = Math.round(G)
                    }
                    G = n.listOfFreePoints[E].symbolic.y;
                    if (Math.abs(G) < d.Math.eps) {
                        n.listOfFreePoints[E].symbolic.y = 0
                    }
                    if (Math.abs(G - Math.round(G)) < d.Math.eps) {
                        n.listOfFreePoints[E].symbolic.y = Math.round(G)
                    }
                }
            }
            m = this.generatePolynomials(n, B);
            h = m.join(",");
            this.cbp = function (i) {
                q = i
            };
            this.cb = d.bind(this.cbp, this);
            d.Server.modules.geoloci.lociCoCoA(p, A, C, g, l, h, H, o, u, r, this.cb, true);
            this.clearSymbolicCoordinates(n);
            for (E in f) {
                n.objects[E].radius = f[E]
            }
            return q
        }
    }
}(JXG);
JXG.Math.Geometry = {};
JXG.extend(JXG.Math.Geometry, {
    angle: function (f, e, d) {
        var i = [],
            h = [],
            g = [],
            k, j, m, l;
        if (f.coords == null) {
            i[0] = f[0];
            i[1] = f[1]
        } else {
            i[0] = f.coords.usrCoords[1];
            i[1] = f.coords.usrCoords[2]
        }
        if (e.coords == null) {
            h[0] = e[0];
            h[1] = e[1]
        } else {
            h[0] = e.coords.usrCoords[1];
            h[1] = e.coords.usrCoords[2]
        }
        if (d.coords == null) {
            g[0] = d[0];
            g[1] = d[1]
        } else {
            g[0] = d.coords.usrCoords[1];
            g[1] = d.coords.usrCoords[2]
        }
        k = i[0] - h[0];
        j = i[1] - h[1];
        m = g[0] - h[0];
        l = g[1] - h[1];
        return Math.atan2(k * l - j * m, k * m + j * l)
    },
    trueAngle: function (d, f, e) {
        return this.rad(d, f, e) * 57.29577951308232
    },
    rad: function (g, f, e) {
        var d, m, l, k, i, h, j;
        if (g.coords == null) {
            d = g[0];
            m = g[1]
        } else {
            d = g.coords.usrCoords[1];
            m = g.coords.usrCoords[2]
        }
        if (f.coords == null) {
            l = f[0];
            k = f[1]
        } else {
            l = f.coords.usrCoords[1];
            k = f.coords.usrCoords[2]
        }
        if (e.coords == null) {
            i = e[0];
            h = e[1]
        } else {
            i = e.coords.usrCoords[1];
            h = e.coords.usrCoords[2]
        }
        j = Math.atan2(h - k, i - l) - Math.atan2(m - k, d - l);
        if (j < 0) {
            j += 6.283185307179586
        }
        return j
    },
    angleBisector: function (i, h, f, l) {
        var g = i.coords.usrCoords,
            o = h.coords.usrCoords,
            j = f.coords.usrCoords,
            p = g[1] - o[1],
            n = g[2] - o[2],
            m = Math.sqrt(p * p + n * n),
            e, q, k;
        if (!JXG.exists(l)) {
            l = i.board
        }
        p /= m;
        n /= m;
        e = Math.acos(p);
        if (n < 0) {
            e *= -1
        }
        if (e < 0) {
            e += 2 * Math.PI
        }
        p = j[1] - o[1];
        n = j[2] - o[2];
        m = Math.sqrt(p * p + n * n);
        p /= m;
        n /= m;
        q = Math.acos(p);
        if (n < 0) {
            q *= -1
        }
        if (q < 0) {
            q += 2 * Math.PI
        }
        k = (e + q) * 0.5;
        if (e > q) {
            k += Math.PI
        }
        p = Math.cos(k) + o[1];
        n = Math.sin(k) + o[2];
        return new JXG.Coords(JXG.COORDS_BY_USER, [p, n], l)
    },
    reflection: function (o, l, f) {
        var h = l.coords.usrCoords,
            p = o.point1.coords.usrCoords,
            g = o.point2.coords.usrCoords,
            e, k, d, i, m, j, n;
        if (!JXG.exists(f)) {
            f = l.board
        }
        m = g[1] - p[1];
        j = g[2] - p[2];
        e = h[1] - p[1];
        k = h[2] - p[2];
        n = (m * k - j * e) / (m * m + j * j);
        d = h[1] + 2 * n * j;
        i = h[2] - 2 * n * m;
        return new JXG.Coords(JXG.COORDS_BY_USER, [d, i], f)
    },
    rotation: function (d, n, h, i) {
        var k = n.coords.usrCoords,
            e = d.coords.usrCoords,
            g, m, j, o, f, l;
        if (!JXG.exists(i)) {
            i = n.board
        }
        g = k[1] - e[1];
        m = k[2] - e[2];
        j = Math.cos(h);
        o = Math.sin(h);
        f = g * j - m * o + e[1];
        l = g * o + m * j + e[2];
        return new JXG.Coords(JXG.COORDS_BY_USER, [f, l], i)
    },
    perpendicular: function (q, o, i) {
        var h = q.point1.coords.usrCoords,
            g = q.point2.coords.usrCoords,
            e = o.coords.usrCoords,
            m, l, k, p, j, f, d, n;
        if (!JXG.exists(i)) {
            i = o.board
        }
        if (o == q.point1) {
            m = h[1] + g[2] - h[2];
            l = h[2] - g[1] + h[1];
            k = true
        } else {
            if (o == q.point2) {
                m = g[1] + h[2] - g[2];
                l = g[2] - h[1] + g[1];
                k = false
            } else {
                if (((Math.abs(h[1] - g[1]) > JXG.Math.eps) && (Math.abs(e[2] - (h[2] - g[2]) * (e[1] - h[1]) / (h[1] - g[1]) - h[2]) < JXG.Math.eps)) || ((Math.abs(h[1] - g[1]) <= JXG.Math.eps) && (Math.abs(h[1] - e[1]) < JXG.Math.eps))) {
                    m = e[1] + g[2] - e[2];
                    l = e[2] - g[1] + e[1];
                    k = true;
                    if (Math.abs(m - e[1]) < JXG.Math.eps && Math.abs(l - e[2]) < JXG.Math.eps) {
                        m = e[1] + h[2] - e[2];
                        l = e[2] - h[1] + e[1];
                        k = false
                    }
                } else {
                    p = h[2] - g[2];
                    j = h[1] - g[1];
                    f = g[1] * p - g[2] * j;
                    d = e[1] * j + e[2] * p;
                    n = p * p + j * j;
                    if (Math.abs(n) < JXG.Math.eps) {
                        n = JXG.Math.eps
                    }
                    m = (f * p + d * j) / n;
                    l = (d * p - f * j) / n;
                    k = true
                }
            }
        }
        return [new JXG.Coords(JXG.COORDS_BY_USER, [m, l], i), k]
    },
    circumcenterMidpoint: JXG.shortcut(JXG.Math.Geometry, "circumcenter"),
    circumcenter: function (j, i, h, g) {
        var f = j.coords.usrCoords,
            e = i.coords.usrCoords,
            d = h.coords.usrCoords,
            m, k, n, l;
        if (!JXG.exists(g)) {
            g = j.board
        }
        m = [e[0] - f[0], - e[2] + f[2], e[1] - f[1]];
        k = [(f[0] + e[0]) * 0.5, (f[1] + e[1]) * 0.5, (f[2] + e[2]) * 0.5];
        n = JXG.Math.crossProduct(m, k);
        m = [d[0] - e[0], - d[2] + e[2], d[1] - e[1]];
        k = [(e[0] + d[0]) * 0.5, (e[1] + d[1]) * 0.5, (e[2] + d[2]) * 0.5];
        l = JXG.Math.crossProduct(m, k);
        return new JXG.Coords(JXG.COORDS_BY_USER, JXG.Math.crossProduct(n, l), g)
    },
    distance: function (h, g) {
        var f = 0,
            e, d;
        if (h.length != g.length) {
            return NaN
        }
        d = h.length;
        for (e = 0; e < d; e++) {
            f += (h[e] - g[e]) * (h[e] - g[e])
        }
        return Math.sqrt(f)
    },
    affineDistance: function (f, e) {
        var g;
        if (f.length != e.length) {
            return NaN
        }
        g = this.distance(f, e);
        if (g > JXG.Math.eps && (Math.abs(f[0]) < JXG.Math.eps || Math.abs(e[0]) < JXG.Math.eps)) {
            return Infinity
        } else {
            return g
        }
    },
    calcStraight: function (g, r, p, h) {
        var e, d, n, l, q, f, o, v, m, k, u, t;
        if (h == null) {
            h = 10
        }
        q = g.visProp.straightfirst;
        f = g.visProp.straightlast;
        if (Math.abs(r.scrCoords[0]) < JXG.Math.eps) {
            q = true
        }
        if (Math.abs(p.scrCoords[0]) < JXG.Math.eps) {
            f = true
        }
        if (!q && !f) {
            return
        }
        o = [];
        o[0] = g.stdform[0] - g.stdform[1] * g.board.origin.scrCoords[1] / g.board.unitX + g.stdform[2] * g.board.origin.scrCoords[2] / g.board.unitY;
        o[1] = g.stdform[1] / g.board.unitX;
        o[2] = g.stdform[2] / (-g.board.unitY);
        if (isNaN(o[0] + o[1] + o[2])) {
            return
        }
        v = [];
        v[0] = JXG.Math.crossProduct(o, [h, 0, 1]);
        v[1] = JXG.Math.crossProduct(o, [h, 1, 0]);
        v[2] = JXG.Math.crossProduct(o, [-h - g.board.canvasHeight, 0, 1]);
        v[3] = JXG.Math.crossProduct(o, [-h - g.board.canvasWidth, 1, 0]);
        for (m = 0; m < 4; m++) {
            if (Math.abs(v[m][0]) > JXG.Math.eps) {
                for (k = 2; k > 0; k--) {
                    v[m][k] /= v[m][0]
                }
                v[m][0] = 1
            }
        }
        e = false;
        d = false;
        if (!q && Math.abs(r.usrCoords[0]) >= JXG.Math.eps && r.scrCoords[1] >= 0 && r.scrCoords[1] <= g.board.canvasWidth && r.scrCoords[2] >= 0 && r.scrCoords[2] <= g.board.canvasHeight) {
            e = true
        }
        if (!f && Math.abs(p.usrCoords[0]) >= JXG.Math.eps && p.scrCoords[1] >= 0 && p.scrCoords[1] <= g.board.canvasWidth && p.scrCoords[2] >= 0 && p.scrCoords[2] <= g.board.canvasHeight) {
            d = true
        }
        if (Math.abs(v[1][0]) < JXG.Math.eps) {
            n = v[0];
            l = v[2]
        } else {
            if (Math.abs(v[0][0]) < JXG.Math.eps) {
                n = v[1];
                l = v[3]
            } else {
                if (v[1][2] < 0) {
                    n = v[0];
                    if (v[3][2] > g.board.canvasHeight) {
                        l = v[2]
                    } else {
                        l = v[3]
                    }
                } else {
                    if (v[1][2] > g.board.canvasHeight) {
                        n = v[2];
                        if (v[3][2] < 0) {
                            l = v[0]
                        } else {
                            l = v[3]
                        }
                    } else {
                        n = v[1];
                        if (v[3][2] < 0) {
                            l = v[0]
                        } else {
                            if (v[3][2] > g.board.canvasHeight) {
                                l = v[2]
                            } else {
                                l = v[3]
                            }
                        }
                    }
                }
            }
        }
        n = new JXG.Coords(JXG.COORDS_BY_SCREEN, n.slice(1), g.board);
        l = new JXG.Coords(JXG.COORDS_BY_SCREEN, l.slice(1), g.board);
        if (!e && !d) {
            if (!q && f && !this.isSameDirection(r, p, n) && !this.isSameDirection(r, p, l)) {
                return
            } else {
                if (q && !f && !this.isSameDirection(p, r, n) && !this.isSameDirection(p, r, l)) {
                    return
                }
            }
        }
        if (!e) {
            if (!d) {
                if (this.isSameDir(r, p, n, l)) {
                    u = n;
                    t = l
                } else {
                    t = n;
                    u = l
                }
            } else {
                if (this.isSameDir(r, p, n, l)) {
                    u = n
                } else {
                    u = l
                }
            }
        } else {
            if (!d) {
                if (this.isSameDir(r, p, n, l)) {
                    t = l
                } else {
                    t = n
                }
            }
        }
        if (u) {
            r.setCoordinates(JXG.COORDS_BY_USER, u.usrCoords.slice(1))
        }
        if (t) {
            p.setCoordinates(JXG.COORDS_BY_USER, t.usrCoords.slice(1))
        }
    },
    isSameDir: function (j, i, f, e) {
        var d = i.usrCoords[1] - j.usrCoords[1],
            k = i.usrCoords[2] - j.usrCoords[2],
            h = e.usrCoords[1] - f.usrCoords[1],
            g = e.usrCoords[2] - f.usrCoords[2];
        if (Math.abs(i.usrCoords[0]) < JXG.Math.eps) {
            d = i.usrCoords[1];
            k = i.usrCoords[2]
        }
        if (Math.abs(j.usrCoords[0]) < JXG.Math.eps) {
            d = -j.usrCoords[1];
            k = -j.usrCoords[2]
        }
        return d * h + k * g >= 0
    },
    isSameDirection: function (k, h, f) {
        var e, d, j, i, g = false;
        e = h.usrCoords[1] - k.usrCoords[1];
        d = h.usrCoords[2] - k.usrCoords[2];
        j = f.usrCoords[1] - k.usrCoords[1];
        i = f.usrCoords[2] - k.usrCoords[2];
        if (Math.abs(e) < JXG.Math.eps) {
            e = 0
        }
        if (Math.abs(d) < JXG.Math.eps) {
            d = 0
        }
        if (Math.abs(j) < JXG.Math.eps) {
            j = 0
        }
        if (Math.abs(i) < JXG.Math.eps) {
            i = 0
        }
        if (e >= 0 && j >= 0) {
            if ((d >= 0 && i >= 0) || (d <= 0 && i <= 0)) {
                g = true
            }
        } else {
            if (e <= 0 && j <= 0) {
                if ((d >= 0 && i >= 0) || (d <= 0 && i <= 0)) {
                    g = true
                }
            }
        }
        return g
    },
    intersectLineLine: function (o, n, j) {
        var i = o.point1.coords.usrCoords,
            g = o.point2.coords.usrCoords,
            f = n.point1.coords.usrCoords,
            d = n.point2.coords.usrCoords,
            h, e, m, l, k;
        if (!JXG.exists(j)) {
            j = o.board
        }
        h = i[1] * g[2] - i[2] * g[1];
        e = f[1] * d[2] - f[2] * d[1];
        m = (g[2] - i[2]) * (f[1] - d[1]) - (i[1] - g[1]) * (d[2] - f[2]);
        if (Math.abs(m) < JXG.Math.eps) {
            m = JXG.Math.eps
        }
        l = (h * (f[1] - d[1]) - e * (i[1] - g[1])) / m;
        k = (e * (g[2] - i[2]) - h * (d[2] - f[2])) / m;
        return new JXG.Coords(JXG.COORDS_BY_USER, [l, k], j)
    },
    intersectCircleLine: function (k, u, m) {
        var J = u.point1.coords.usrCoords,
            H = u.point2.coords.usrCoords,
            g = k.center.coords.usrCoords,
            B, e, I, G, z, E, C, n, A, v, j, i, D, q, o, f, t, p, F;
        if (!JXG.exists(m)) {
            m = u.board
        }
        B = u.point1.Dist(u.point2);
        if (B > 0) {
            e = k.center.Dist(u.point1);
            I = k.center.Dist(u.point2);
            G = ((e * e) + (B * B) - (I * I)) / (2 * B);
            z = (e * e) - (G * G);
            z = (z < 0) ? 0 : z;
            E = Math.sqrt(z);
            C = k.Radius();
            n = Math.sqrt((C * C) - E * E);
            A = H[1] - J[1];
            v = H[2] - J[2];
            j = g[1] + (E / B) * v;
            i = g[2] - (E / B) * A;
            e = (H[1] * v) - (H[2] * A);
            I = (j * A) + (i * v);
            D = (v * v) + (A * A);
            if (Math.abs(D) < JXG.Math.eps) {
                D = JXG.Math.eps
            }
            q = ((e * v) + (I * A)) / D;
            o = ((I * v) - (e * A)) / D;
            f = n / B;
            t = new JXG.Coords(JXG.COORDS_BY_USER, [q + f * A, o + f * v], m);
            p = new JXG.Coords(JXG.COORDS_BY_USER, [q - f * A, o - f * v], m);
            F = k.center.coords.distance(JXG.COORDS_BY_USER, t);
            if ((C < (F - 1)) || isNaN(F)) {
                return [0]
            } else {
                return [2, t, p]
            }
        }
        return [0]
    },
    intersectCircleCircle: function (l, k, n) {
        var e = {}, i = l.Radius(),
            g = k.Radius(),
            f = l.center.coords.usrCoords,
            d = k.center.coords.usrCoords,
            p, j, t, r, q, o, m;
        if (!JXG.exists(n)) {
            n = l.board
        }
        p = i + g;
        j = Math.abs(i - g);
        t = l.center.coords.distance(JXG.COORDS_BY_USER, k.center.coords);
        if (t > p) {
            return [0]
        } else {
            if (t < j) {
                return [0]
            } else {
                if (t != 0) {
                    e[0] = 1;
                    r = d[1] - f[1];
                    q = d[2] - f[2];
                    o = (t * t - g * g + i * i) / (2 * t);
                    m = Math.sqrt(i * i - o * o);
                    e[1] = new JXG.Coords(JXG.COORDS_BY_USER, [f[1] + (o / t) * r + (m / t) * q, f[2] + (o / t) * q - (m / t) * r], n);
                    e[2] = new JXG.Coords(JXG.COORDS_BY_USER, [f[1] + (o / t) * r - (m / t) * q, f[2] + (o / t) * q + (m / t) * r], n)
                } else {
                    return [0]
                }
                return e
            }
        }
    },
    meet: function (g, e, f, h) {
        var d = JXG.Math.eps;
        if (Math.abs(g[3]) < d && Math.abs(e[3]) < d) {
            return this.meetLineLine(g, e, f, h)
        } else {
            if (Math.abs(g[3]) >= d && Math.abs(e[3]) < d) {
                return this.meetLineCircle(e, g, f, h)
            } else {
                if (Math.abs(g[3]) < d && Math.abs(e[3]) >= d) {
                    return this.meetLineCircle(g, e, f, h)
                } else {
                    return this.meetCircleCircle(g, e, f, h)
                }
            }
        }
    },
    meetLineLine: function (e, d, f, h) {
        var g = JXG.Math.crossProduct(e, d);
        if (Math.abs(g[0]) > JXG.Math.eps) {
            g[1] /= g[0];
            g[2] /= g[0];
            g[0] = 1
        }
        return new JXG.Coords(JXG.COORDS_BY_USER, g, h)
    },
    meetLineCircle: function (j, e, o, p) {
        var u, s, r, q, l, h, g, f, m, v;
        if (e[4] < JXG.Math.eps) {
            if (Math.abs(JXG.Math.innerProduct([1, e[6], e[7]], j, 3)) < JXG.Math.eps) {
                return new JXG.Coords(JXG.COORDS_BY_USER, e.slice(6, 8), p)
            } else {
                return new JXG.Coords(JXG.COORDS_BY_USER, [NaN, NaN], p)
            }
        }
        r = e[0];
        s = e.slice(1, 3);
        u = e[3];
        q = j[0];
        l = j.slice(1, 3);
        h = u;
        g = (s[0] * l[1] - s[1] * l[0]);
        f = u * q * q - (s[0] * l[0] + s[1] * l[1]) * q + r;
        m = g * g - 4 * h * f;
        if (m >= 0) {
            m = Math.sqrt(m);
            v = [(-g + m) / (2 * h), (-g - m) / (2 * h)];
            return ((o == 0) ? new JXG.Coords(JXG.COORDS_BY_USER, [-v[0] * (-l[1]) - q * l[0], - v[0] * l[0] - q * l[1]], p) : new JXG.Coords(JXG.COORDS_BY_USER, [-v[1] * (-l[1]) - q * l[0], - v[1] * l[0] - q * l[1]], p))
        } else {
            return new JXG.Coords(JXG.COORDS_BY_USER, [0, 0, 0], p)
        }
    },
    meetCircleCircle: function (f, d, e, g) {
        var h;
        if (f[4] < JXG.Math.eps) {
            if (Math.abs(this.distance(f.slice(6, 2), d.slice(6, 8)) - d[4]) < JXG.Math.eps) {
                return new JXG.Coords(JXG.COORDS_BY_USER, f.slice(6, 8), g)
            } else {
                return new JXG.Coords(JXG.COORDS_BY_USER, [0, 0, 0], g)
            }
        }
        if (d[4] < JXG.Math.eps) {
            if (Math.abs(this.distance(d.slice(6, 2), f.slice(6, 8)) - f[4]) < JXG.Math.eps) {
                return new JXG.Coords(JXG.COORDS_BY_USER, d.slice(6, 8), g)
            } else {
                return new JXG.Coords(JXG.COORDS_BY_USER, [0, 0, 0], g)
            }
        }
        h = [d[3] * f[0] - f[3] * d[0], d[3] * f[1] - f[3] * d[1], d[3] * f[2] - f[3] * d[2], 0, 1, Infinity, Infinity, Infinity];
        h = JXG.Math.normalize(h);
        return this.meetLineCircle(h, f, e, g)
    },
    meetCurveCurve: function (r, q, h, k, m) {
        var l = 0,
            o, n, B, z, v, u, g, t, s, p, A, w, j, i;
        if (!JXG.exists(m)) {
            m = r.board
        }
        if (arguments.callee.t1memo) {
            o = arguments.callee.t1memo;
            n = arguments.callee.t2memo
        } else {
            o = h;
            n = k
        }
        t = r.X(o) - q.X(n);
        s = r.Y(o) - q.Y(n);
        p = t * t + s * s;
        A = r.board.D(r.X, r);
        w = q.board.D(q.X, q);
        j = r.board.D(r.Y, r);
        i = q.board.D(q.Y, q);
        while (p > JXG.Math.eps && l < 10) {
            B = A(o);
            z = -w(n);
            v = j(o);
            u = -i(n);
            g = B * u - z * v;
            o -= (u * t - z * s) / g;
            n -= (B * s - v * t) / g;
            t = r.X(o) - q.X(n);
            s = r.Y(o) - q.Y(n);
            p = t * t + s * s;
            l++
        }
        arguments.callee.t1memo = o;
        arguments.callee.t2memo = n;
        if (Math.abs(o) < Math.abs(n)) {
            return (new JXG.Coords(JXG.COORDS_BY_USER, [r.X(o), r.Y(o)], m))
        } else {
            return (new JXG.Coords(JXG.COORDS_BY_USER, [q.X(n), q.Y(n)], m))
        }
    },
    meetCurveLine: function (r, q, e, j) {
        var o, l, s, g, p, h, k, w, u, v, n, m, f, d;
        if (!JXG.exists(j)) {
            j = r.board
        }
        for (s = 0; s <= 1; s++) {
            if (arguments[s].elementClass == JXG.OBJECT_CLASS_CURVE) {
                g = arguments[s]
            } else {
                if (arguments[s].elementClass == JXG.OBJECT_CLASS_LINE) {
                    p = arguments[s]
                } else {
                    throw new Error("JSXGraph: Can't call meetCurveLine with parent class " + (arguments[s].elementClass) + ".")
                }
            }
        }
        h = function (i) {
            return p.stdform[0] + p.stdform[1] * g.X(i) + p.stdform[2] * g.Y(i)
        };
        if (arguments.callee.t1memo) {
            n = arguments.callee.t1memo;
            o = JXG.Math.Numerics.root(h, n)
        } else {
            n = g.minX();
            m = g.maxX();
            o = JXG.Math.Numerics.root(h, [n, m])
        }
        arguments.callee.t1memo = o;
        f = g.X(o);
        d = g.Y(o);
        if (e == 1) {
            if (arguments.callee.t2memo) {
                n = arguments.callee.t2memo;
                l = JXG.Math.Numerics.root(h, n)
            }
            if (!(Math.abs(l - o) > 0.1 && Math.abs(f - g.X(l)) > 0.1 && Math.abs(d - g.Y(l)) > 0.1)) {
                u = 20;
                v = (g.maxX() - g.minX()) / u;
                w = g.minX();
                for (s = 0; s < u; s++) {
                    l = JXG.Math.Numerics.root(h, [w, w + v]);
                    if (Math.abs(l - o) > 0.1 && Math.abs(f - g.X(l)) > 0.1 && Math.abs(d - g.Y(l)) > 0.1) {
                        break
                    }
                    w += v
                }
            }
            o = l;
            arguments.callee.t2memo = o
        }
        if (Math.abs(h(o)) > JXG.Math.eps) {
            k = 0
        } else {
            k = 1
        }
        return (new JXG.Coords(JXG.COORDS_BY_USER, [k, g.X(o), g.Y(o)], j))
    },
    projectPointToCircle: function (l, d, f) {
        var i = l.coords.distance(JXG.COORDS_BY_USER, d.center.coords),
            e = l.coords.usrCoords,
            g = d.center.coords.usrCoords,
            k, j, h;
        if (!JXG.exists(f)) {
            f = l.board
        }
        if (Math.abs(i) < JXG.Math.eps) {
            i = JXG.Math.eps
        }
        h = d.Radius() / i;
        k = g[1] + h * (e[1] - g[1]);
        j = g[2] + h * (e[2] - g[2]);
        return new JXG.Coords(JXG.COORDS_BY_USER, [k, j], f)
    },
    projectPointToLine: function (d, e, g) {
        var f = [0, e.stdform[1], e.stdform[2]];
        if (!JXG.exists(g)) {
            g = d.board
        }
        f = JXG.Math.crossProduct(f, d.coords.usrCoords);
        return this.meetLineLine(f, e.stdform, 0, g)
    },
    projectPointToCurve: function (f, i, h) {
        if (!JXG.exists(h)) {
            h = f.board
        }
        var e = f.X(),
            j = f.Y(),
            g = f.position || 0,
            d = this.projectCoordsToCurve(e, j, g, i, h);
        f.position = d[1];
        return d[0]
    },
    projectCoordsToCurve: function (m, k, p, r, j) {
        var E, w, B, f, A, e, C, s, h, q, n, u, D, o = Number.POSITIVE_INFINITY,
            l, H, F, g, G, z;
        if (!JXG.exists(j)) {
            j = r.board
        }
        if (r.visProp.curvetype == "parameter" || r.visProp.curvetype == "polar") {
            l = function (v) {
                var i = m - r.X(v),
                    d = k - r.Y(v);
                return i * i + d * d
            };
            g = l(p);
            z = 20;
            G = (r.maxX() - r.minX()) / z;
            H = r.minX();
            for (w = 0; w < z; w++) {
                F = l(H);
                if (F < g) {
                    p = H;
                    g = F
                }
                H += G
            }
            p = JXG.Math.Numerics.root(JXG.Math.Numerics.D(l), p);
            if (p < r.minX()) {
                p = r.maxX() + p - r.minX()
            }
            if (p > r.maxX()) {
                p = r.minX() + p - r.maxX()
            }
            E = new JXG.Coords(JXG.COORDS_BY_USER, [r.X(p), r.Y(p)], j)
        } else {
            if (r.visProp.curvetype == "plot") {
                p = 0;
                C = o;
                if (r.numberPoints == 0) {
                    E = new JXG.Coords(JXG.COORDS_BY_USER, [0, 1, 1], j)
                } else {
                    if (r.numberPoints == 1) {
                        E = new JXG.Coords(JXG.COORDS_BY_USER, [r.Z(0), r.X(0), r.Y(0)], j)
                    } else {
                        for (w = 0; w < r.numberPoints - 1; w++) {
                            q = JXG.Math.crossProduct([r.Z(w + 1), r.X(w + 1), r.Y(w + 1)], [r.Z(w), r.X(w), r.Y(w)]);
                            n = [0, q[1], q[2]];
                            n = JXG.Math.crossProduct(n, [1, m, k]);
                            u = this.meetLineLine(n, q, 0, j);
                            A = r.X(w + 1) - r.X(w);
                            e = r.Y(w + 1) - r.Y(w);
                            if (Math.abs(A) > JXG.Math.eps) {
                                B = u.usrCoords[1] - r.X(w);
                                h = B / A
                            } else {
                                if (Math.abs(e) > JXG.Math.eps) {
                                    f = u.usrCoords[1] - r.Y(w);
                                    h = f / e
                                } else {
                                    h = 0;
                                    u = new JXG.Coords(JXG.COORDS_BY_USER, [r.Z(w), r.X(w), r.Y(w)], j)
                                }
                            }
                            if (0 <= h && h <= 1) {
                                s = this.distance(u.usrCoords, [1, m, k]);
                                D = w + h
                            } else {
                                if (h < 0) {
                                    u = new JXG.Coords(JXG.COORDS_BY_USER, [r.Z(w), r.X(w), r.Y(w)], j);
                                    s = this.distance(u.usrCoords, [1, m, k]);
                                    D = w
                                } else {
                                    if (h > 1 && w + 1 == r.numberPoints - 1) {
                                        u = new JXG.Coords(JXG.COORDS_BY_USER, [r.Z(w + 1), r.X(w + 1), r.Y(w + 1)], j);
                                        s = this.distance(u.usrCoords, [1, m, k]);
                                        D = r.numberPoints - 1
                                    }
                                }
                            }
                            if (s < C) {
                                C = s;
                                p = D;
                                E = u
                            }
                        }
                    }
                }
            } else {
                p = m;
                m = p;
                k = r.Y(p);
                E = new JXG.Coords(JXG.COORDS_BY_USER, [m, k], j)
            }
        }
        return [r.updateTransform(E), p]
    },
    projectPointToTurtle: function (o, r, k) {
        var q, s, n, m, f, p = 0,
            j = 0,
            g = Number.POSITIVE_INFINITY,
            l, d, e, h = r.objects.length;
        if (!JXG.exists(k)) {
            k = o.board
        }
        for (f = 0; f < h; f++) {
            d = r.objects[f];
            if (d.elementClass == JXG.OBJECT_CLASS_CURVE) {
                q = this.projectPointToCurve(o, d);
                l = this.distance(q.usrCoords, o.coords.usrCoords);
                if (l < g) {
                    n = q.usrCoords[1];
                    m = q.usrCoords[2];
                    s = o.position;
                    g = l;
                    e = d;
                    j = p
                }
                p += d.numberPoints
            }
        }
        q = new JXG.Coords(JXG.COORDS_BY_USER, [n, m], k);
        o.position = s + j;
        return e.updateTransform(q)
    },
    projectPointToPoint: function (d, e, f) {
        return e.coords
    }
});
JXG.Math.Poly = {};
JXG.Math.Poly.Ring = function (d) {
    this.vars = d
};
JXG.extend(JXG.Math.Poly.Ring.prototype, {});
JXG.Math.Poly.Monomial = function (e, d, g) {
    var f;
    if (!JXG.exists(e)) {
        throw new Error("JSXGraph error: In JXG.Math.Poly.monomial missing parameter 'ring'.")
    }
    if (!JXG.isArray(g)) {
        g = []
    }
    g = g.slice(0, e.vars.length);
    for (f = g.length; f < e.vars.length; f++) {
        g.push(0)
    }
    this.ring = e;
    this.coefficient = d || 0;
    this.exponents = JXG.deepCopy(g)
};
JXG.extend(JXG.Math.Poly.Monomial.prototype, {
    copy: function () {
        return new JXG.Math.Poly.Monomial(this.ring, this.coefficient, this.exponents)
    },
    print: function () {
        var e = [],
            d;
        for (d = 0; d < this.ring.vars.length; d++) {
            e.push(this.ring.vars[d] + "^" + this.exponents[d])
        }
        return this.coefficient + "*" + e.join("*")
    }
});
JXG.Math.Poly.Polynomial = function (d, g) {
    var f = function () {}, e;
    if (!JXG.exists(d)) {
        throw new Error("JSXGraph error: In JXG.Math.Poly.polynomial missing parameter 'ring'.")
    }
    if (JXG.exists(g) && typeof g === "string") {
        e = f(g)
    } else {
        e = []
    }
    this.ring = d;
    this.monomials = e
};
JXG.extend(JXG.Math.Poly.Polynomial.prototype, {
    findSignature: function (e) {
        var d;
        for (d = 0; d < this.monomials.length; d++) {
            if (JXG.cmpArrays(this.monomials[d].exponents, e)) {
                return d
            }
        }
        return -1
    },
    addSubMonomial: function (d, f) {
        var e;
        e = this.findSignature(d.exponents);
        if (e > -1) {
            this.monomials[e].coefficient += f * d.coefficient
        } else {
            d.coefficient *= f;
            this.monomials.push(d)
        }
    },
    add: function (e) {
        var d;
        if (JXG.exists(e) && e.ring === this.ring) {
            if (JXG.isArray(e.exponents)) {
                this.addSubMonomial(e, 1)
            } else {
                for (d = 0; d < e.monomials.length; d++) {
                    this.addSubMonomial(e.monomials[d], 1)
                }
            }
        } else {
            throw new Error("JSXGraph error: In JXG.Math.Poly.polynomial.add either summand is undefined or rings don't match.")
        }
    },
    sub: function (e) {
        var d;
        if (JXG.exists(e) && e.ring === this.ring) {
            if (JXG.isArray(e.exponents)) {
                this.addSubMonomial(e, - 1)
            } else {
                for (d = 0; d < e.monomials.length; d++) {
                    this.addSubMonomial(e.monomials[d], - 1)
                }
            }
        } else {
            throw new Error("JSXGraph error: In JXG.Math.Poly.polynomial.sub either summand is undefined or rings don't match.")
        }
    },
    copy: function () {
        var d, e;
        e = new JXG.Math.Poly.Polynomial(this.ring);
        for (d = 0; d < this.monomials.length; d++) {
            e.monomials.push(this.monomials[d].copy())
        }
        return e
    },
    print: function () {
        var e = [],
            d;
        for (d = 0; d < this.monomials.length; d++) {
            e.push("(" + this.monomials[d].print() + ")")
        }
        return e.join("+")
    }
});
JXG.Complex = function (d, e) {
    this.isComplex = true;
    if (typeof d == "undefined") {
        d = 0
    }
    if (typeof e == "undefined") {
        e = 0
    }
    if (d.isComplex) {
        e = d.imaginary;
        d = d.real
    }
    this.real = d;
    this.imaginary = e;
    this.absval = 0;
    this.angle = 0
};
JXG.extend(JXG.Complex.prototype, {
    toString: function () {
        return "" + this.real + " + " + this.imaginary + "i"
    },
    add: function (d) {
        if (typeof d == "number") {
            this.real += d
        } else {
            this.real += d.real;
            this.imaginary += d.imaginary
        }
    },
    sub: function (d) {
        if (typeof d == "number") {
            this.real -= d
        } else {
            this.real -= d.real;
            this.imaginary -= d.imaginary
        }
    },
    mult: function (f) {
        var e, d;
        if (typeof f == "number") {
            this.real *= f;
            this.imaginary *= f
        } else {
            e = this.real;
            d = this.imaginary;
            this.real = e * f.real - d * f.imaginary;
            this.imaginary = e * f.imaginary + d * f.real
        }
    },
    div: function (g) {
        var e, d, f;
        if (typeof g == "number") {
            if (Math.abs(g) < Math.eps) {
                this.real = Infinity;
                this.imaginary = Infinity;
                return
            }
            this.real /= g;
            this.imaginary /= g
        } else {
            if ((Math.abs(g.real) < Math.eps) && (Math.abs(g.imaginary) < Math.eps)) {
                this.real = Infinity;
                this.imaginary = Infinity;
                return
            }
            e = g.real * g.real + g.imaginary * g.imaginary;
            f = this.real;
            d = this.imaginary;
            this.real = (f * g.real + d * g.imaginary) / e;
            this.imaginary = (d * g.real - f * g.imaginary) / e
        }
    },
    conj: function () {
        this.imaginary *= -1
    }
});
JXG.C = {};
JXG.C.add = function (e, d) {
    var f = new JXG.Complex(e);
    f.add(d);
    return f
};
JXG.C.sub = function (e, d) {
    var f = new JXG.Complex(e);
    f.sub(d);
    return f
};
JXG.C.mult = function (e, d) {
    var f = new JXG.Complex(e);
    f.mult(d);
    return f
};
JXG.C.div = function (e, d) {
    var f = new JXG.Complex(e);
    f.div(d);
    return f
};
JXG.C.conj = function (d) {
    var e = new JXG.Complex(d);
    e.conj();
    return e
};
JXG.C.abs = function (d) {
    var e = new JXG.Complex(d);
    e.conj();
    e.mult(d);
    return Math.sqrt(e.real)
};
JXG.AbstractRenderer = function () {
    this.vOffsetText = 0;
    this.enhancedRendering = true;
    this.container = null;
    this.type = ""
};
JXG.extend(JXG.AbstractRenderer.prototype, {
    _updateVisual: function (e, g, f) {
        var d;
        if (f || this.enhancedRendering) {
            g = g || {};
            if (!e.visProp.draft) {
                if (!g.stroke) {
                    this.setObjectStrokeWidth(e, e.visProp.strokewidth);
                    this.setObjectStrokeColor(e, e.visProp.strokecolor, e.visProp.strokeopacity)
                }
                if (!g.fill) {
                    this.setObjectFillColor(e, e.visProp.fillcolor, e.visProp.fillopacity)
                }
                if (!g.dash) {
                    this.setDashStyle(e, e.visProp)
                }
                if (!g.shadow) {
                    this.setShadow(e)
                }
                if (!g.gradient) {
                    this.setShadow(e)
                }
            } else {
                this.setDraft(e)
            }
        }
    },
    drawPoint: function (e) {
        var d, f = JXG.Point.prototype.normalizeFace.call(this, e.visProp.face);
        if (f === "o") {
            d = "ellipse"
        } else {
            if (f === "[]") {
                d = "rect"
            } else {
                d = "path"
            }
        }
        this.appendChildPrim(this.createPrim(d, e.id), e.visProp.layer);
        this.appendNodesToElement(e, d);
        this._updateVisual(e, {
            dash: true,
            shadow: true
        }, true);
        this.updatePoint(e)
    },
    updatePoint: function (e) {
        var d = e.visProp.size,
            f = JXG.Point.prototype.normalizeFace.call(this, e.visProp.face);
        if (!isNaN(e.coords.scrCoords[2] + e.coords.scrCoords[1])) {
            this._updateVisual(e, {
                dash: false,
                shadow: false
            });
            d *= ((!e.board || !e.board.options.point.zoom) ? 1 : Math.sqrt(e.board.zoomX * e.board.zoomY));
            if (f === "o") {
                this.updateEllipsePrim(e.rendNode, e.coords.scrCoords[1], e.coords.scrCoords[2], d + 1, d + 1)
            } else {
                if (f === "[]") {
                    this.updateRectPrim(e.rendNode, e.coords.scrCoords[1] - d, e.coords.scrCoords[2] - d, d * 2, d * 2)
                } else {
                    this.updatePathPrim(e.rendNode, this.updatePathStringPoint(e, d, f), e.board)
                }
            }
            this.setShadow(e)
        }
    },
    changePointStyle: function (d) {
        var e = this.getElementById(d.id);
        if (JXG.exists(e)) {
            this.remove(e)
        }
        this.drawPoint(d);
        JXG.clearVisPropOld(d);
        if (!d.visProp.visible) {
            this.hide(d)
        }
        if (d.visProp.draft) {
            this.setDraft(d)
        }
    },
    drawLine: function (d) {
        this.appendChildPrim(this.createPrim("line", d.id), d.visProp.layer);
        this.appendNodesToElement(d, "lines");
        this.updateLine(d)
    },
    updateLine: function (e) {
        var f = new JXG.Coords(JXG.COORDS_BY_USER, e.point1.coords.usrCoords, e.board),
            d = new JXG.Coords(JXG.COORDS_BY_USER, e.point2.coords.usrCoords, e.board),
            g = null;
        if (e.visProp.firstarrow || e.visProp.lastarrow) {
            g = 0
        }
        JXG.Math.Geometry.calcStraight(e, f, d, g);
        this.updateLinePrim(e.rendNode, f.scrCoords[1], f.scrCoords[2], d.scrCoords[1], d.scrCoords[2], e.board);
        this.makeArrows(e);
        this._updateVisual(e, {
            fill: true
        })
    },
    drawTicks: function (d) {
        var e = this.createPrim("path", d.id);
        this.appendChildPrim(e, d.visProp.layer);
        this.appendNodesToElement(d, "path")
    },
    updateTicks: function (d, g, e, h, f) {},
    drawCurve: function (d) {
        this.appendChildPrim(this.createPrim("path", d.id), d.visProp.layer);
        this.appendNodesToElement(d, "path");
        this._updateVisual(d, {
            shadow: true
        }, true);
        this.updateCurve(d)
    },
    updateCurve: function (d) {
        this._updateVisual(d);
        if (d.visProp.handdrawing) {
            this.updatePathPrim(d.rendNode, this.updatePathStringBezierPrim(d), d.board)
        } else {
            this.updatePathPrim(d.rendNode, this.updatePathStringPrim(d), d.board)
        }
        this.makeArrows(d)
    },
    drawEllipse: function (d) {
        this.appendChildPrim(this.createPrim("ellipse", d.id), d.visProp.layer);
        this.appendNodesToElement(d, "ellipse");
        this.updateEllipse(d)
    },
    updateEllipse: function (e) {
        this._updateVisual(e);
        var d = e.Radius();
        if (d > 0 && Math.abs(e.center.coords.usrCoords[0]) > JXG.Math.eps && !isNaN(d + e.center.coords.scrCoords[1] + e.center.coords.scrCoords[2]) && d * e.board.unitX < 2000000) {
            this.updateEllipsePrim(e.rendNode, e.center.coords.scrCoords[1], e.center.coords.scrCoords[2], (d * e.board.unitX), (d * e.board.unitY))
        }
    },
    drawPolygon: function (d) {
        this.appendChildPrim(this.createPrim("polygon", d.id), d.visProp.layer);
        this.appendNodesToElement(d, "polygon");
        this.updatePolygon(d)
    },
    updatePolygon: function (d) {
        this._updateVisual(d, {
            stroke: true,
            dash: true
        });
        this.updatePolygonPrim(d.rendNode, d)
    },
    displayCopyright: function (d, e) {},
    drawInternalText: function (d) {},
    updateInternalText: function (d) {},
    drawText: function (d) {
        var e, f;
        if (d.visProp.display === "html") {
            e = this.container.ownerDocument.createElement("div");
            e.style.position = "absolute";
            e.className = d.visProp.cssclass;
            if (this.container.style.zIndex == "") {
                f = 0
            } else {
                f = parseInt(this.container.style.zIndex)
            }
            e.style.zIndex = f + d.board.options.layer.text;
            this.container.appendChild(e);
            e.setAttribute("id", this.container.id + "_" + d.id)
        } else {
            e = this.drawInternalText(d)
        }
        d.rendNode = e;
        d.htmlStr = "";
        this.updateText(d)
    },
    updateText: function (d) {
        var e = d.plaintext;
        if (d.visProp.visible) {
            this.updateTextStyle(d, false);
            if (d.visProp.display === "html") {
                if (!isNaN(d.coords.scrCoords[1] + d.coords.scrCoords[2])) {
                    if (d.visProp.anchorx === "right") {
                        d.rendNode.style.right = parseInt(d.board.canvasWidth - d.coords.scrCoords[1]) + "px"
                    } else {
                        if (d.visProp.anchorx === "middle") {
                            d.rendNode.style.left = parseInt(d.coords.scrCoords[1] - 0.5 * d.size[0]) + "px"
                        } else {
                            d.rendNode.style.left = parseInt(d.coords.scrCoords[1]) + "px"
                        }
                    }
                    if (d.visProp.anchory === "top") {
                        d.rendNode.style.top = parseInt(d.coords.scrCoords[2] + this.vOffsetText) + "px"
                    } else {
                        if (d.visProp.anchory === "middle") {
                            d.rendNode.style.top = parseInt(d.coords.scrCoords[2] - 0.5 * d.size[1] + this.vOffsetText) + "px"
                        } else {
                            d.rendNode.style.top = parseInt(d.coords.scrCoords[2] - d.size[1] + this.vOffsetText) + "px"
                        }
                    }
                }
                if (d.htmlStr !== e) {
                    d.rendNode.innerHTML = e;
                    d.htmlStr = e;
                    if (d.visProp.usemathjax) {
                        MathJax.Hub.Queue(["Typeset", MathJax.Hub, d.rendNode])
                    } else {
                        if (d.visProp.useasciimathml) {
                            AMprocessNode(d.rendNode, false)
                        }
                    }
                }
                this.transformImage(d, d.transformations)
            } else {
                this.updateInternalText(d)
            }
        }
    },
    updateTextStyle: function (g, i) {
        var d, k, l, f, h = g.visProp;
        if (i) {
            l = h.highlightstrokecolor;
            k = h.highlightstrokeopacity;
            f = h.highlightcssclass
        } else {
            l = h.strokecolor;
            k = h.strokeopacity;
            f = h.cssclass
        }
        if (g.visProp.display === "html" || this.type != "canvas") {
            d = JXG.evaluate(g.visProp.fontsize);
            if (g.visPropOld.fontsize != d) {
                try {
                    g.rendNode.style.fontSize = d + "px"
                } catch (j) {
                    g.rendNode.style.fontSize = d
                }
                g.visPropOld.fontsize = d
            }
            if (g.visPropOld.cssclass != f) {
                g.rendNode.className = f;
                g.visPropOld.cssclass = f
            }
        }
        if (g.visProp.display === "html") {
            this.setObjectStrokeColor(g, l, k)
        } else {
            this.updateInternalTextStyle(g, l, k)
        }
        return this
    },
    updateInternalTextStyle: function (e, f, d) {
        this.setObjectStrokeColor(e, f, d)
    },
    drawImage: function (d) {},
    updateImage: function (d) {
        this.updateRectPrim(d.rendNode, d.coords.scrCoords[1], d.coords.scrCoords[2] - d.size[1], d.size[0], d.size[1]);
        this.updateImageURL(d);
        this.transformImage(d, d.transformations);
        this._updateVisual(d, {
            stroke: true,
            dash: true
        }, true)
    },
    joinTransforms: function (n, o) {
        var k = [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ],
            g = n.board.origin.scrCoords[1],
            f = n.board.origin.scrCoords[2],
            e = n.board.unitX,
            d = n.board.unitY,
            r = [
                [1, 0, 0],
                [-g, 1, 0],
                [-f, 0, 1]
            ],
            q = [
                [1, 0, 0],
                [0, 1 / e, 0],
                [0, 0, - 1 / d]
            ],
            h = [
                [1, 0, 0],
                [0, e, 0],
                [0, 0, - d]
            ],
            j = [
                [1, 0, 0],
                [g, 1, 0],
                [f, 0, 1]
            ],
            l, p = o.length;
        for (l = 0; l < p; l++) {
            k = JXG.Math.matMatMult(r, k);
            k = JXG.Math.matMatMult(q, k);
            k = JXG.Math.matMatMult(o[l].matrix, k);
            k = JXG.Math.matMatMult(h, k);
            k = JXG.Math.matMatMult(j, k)
        }
        return k
    },
    transformImage: function (e, d) {},
    updateImageURL: function (d) {},
    appendChildPrim: function (d, e) {},
    appendNodesToElement: function (d, e) {},
    createPrim: function (d, e) {
        return null
    },
    remove: function (d) {},
    makeArrows: function (d) {},
    updateEllipsePrim: function (e, d, h, g, f) {},
    updateLinePrim: function (i, e, d, g, f, h) {},
    updatePathPrim: function (f, d, e) {},
    updatePathStringPoint: function (e, d, f) {},
    updatePathStringPrim: function (d) {},
    updatePathStringBezierPrim: function (d) {},
    updatePolygonPrim: function (e, d) {},
    updateRectPrim: function (g, d, i, e, f) {},
    setPropertyPrim: function (e, d, f) {},
    show: function (d) {},
    hide: function (d) {},
    setBuffering: function (e, d) {},
    setDashStyle: function (d) {},
    setDraft: function (d) {
        if (!d.visProp.draft) {
            return
        }
        var e = d.board.options.elements.draft.color,
            f = d.board.options.elements.draft.opacity;
        if (d.type === JXG.OBJECT_TYPE_POLYGON) {
            this.setObjectFillColor(d, e, f)
        } else {
            if (d.elementClass === JXG.OBJECT_CLASS_POINT) {
                this.setObjectFillColor(d, e, f)
            } else {
                this.setObjectFillColor(d, "none", 0)
            }
            this.setObjectStrokeColor(d, e, f);
            this.setObjectStrokeWidth(d, d.board.options.elements.draft.strokeWidth)
        }
    },
    removeDraft: function (d) {
        if (d.type === JXG.OBJECT_TYPE_POLYGON) {
            this.setObjectFillColor(d, d.visProp.fillcolor, d.visProp.fillopacity)
        } else {
            if (d.type === JXG.OBJECT_CLASS_POINT) {
                this.setObjectFillColor(d, d.visProp.fillcolor, d.visProp.fillopacity)
            }
            this.setObjectStrokeColor(d, d.visProp.strokecolor, d.visProp.strokeopacity);
            this.setObjectStrokeWidth(d, d.visProp.strokewidth)
        }
    },
    setGradient: function (d) {},
    updateGradient: function (d) {},
    setObjectFillColor: function (f, d, e) {},
    setObjectStrokeColor: function (f, d, e) {},
    setObjectStrokeWidth: function (d, e) {},
    setShadow: function (d) {},
    highlight: function (e) {
        var d, f = e.visProp;
        if (!f.draft) {
            if (e.type === JXG.OBJECT_TYPE_POLYGON) {
                this.setObjectFillColor(e, f.highlightfillcolor, f.highlightfillopacity);
                for (d = 0; d < e.borders.length; d++) {
                    this.setObjectStrokeColor(e.borders[d], e.borders[d].visProp.highlightstrokecolor, e.borders[d].visProp.highlightstrokeopacity)
                }
            } else {
                if (e.type === JXG.OBJECT_TYPE_TEXT) {
                    this.updateTextStyle(e, true)
                } else {
                    this.setObjectStrokeColor(e, f.highlightstrokecolor, f.highlightstrokeopacity);
                    this.setObjectFillColor(e, f.highlightfillcolor, f.highlightfillopacity)
                }
            }
            if (f.highlightstrokewidth) {
                this.setObjectStrokeWidth(e, Math.max(f.highlightstrokewidth, f.strokewidth))
            }
        }
        return this
    },
    noHighlight: function (e) {
        var d, f = e.visProp;
        if (!e.visProp.draft) {
            if (e.type === JXG.OBJECT_TYPE_POLYGON) {
                this.setObjectFillColor(e, f.fillcolor, f.fillopacity);
                for (d = 0; d < e.borders.length; d++) {
                    this.setObjectStrokeColor(e.borders[d], e.borders[d].visProp.strokecolor, e.borders[d].visProp.strokeopacity)
                }
            } else {
                if (e.type === JXG.OBJECT_TYPE_TEXT) {
                    this.updateTextStyle(e, false)
                } else {
                    this.setObjectStrokeColor(e, f.strokecolor, f.strokeopacity);
                    this.setObjectFillColor(e, f.fillcolor, f.fillopacity)
                }
            }
            this.setObjectStrokeWidth(e, f.strokewidth)
        }
        return this
    },
    suspendRedraw: function () {},
    unsuspendRedraw: function () {},
    drawZoomBar: function (e) {
        var g, f, d = function (h, j) {
            var i;
            i = g.createElement("span");
            f.appendChild(i);
            i.appendChild(document.createTextNode(h));
            JXG.addEvent(i, "click", j, e)
        };
        g = e.containerObj.ownerDocument;
        f = g.createElement("div");
        f.setAttribute("id", e.containerObj.id + "_navigationbar");
        f.style.color = e.options.navbar.strokeColor;
        f.style.backgroundColor = e.options.navbar.fillColor;
        f.style.padding = e.options.navbar.padding;
        f.style.position = e.options.navbar.position;
        f.style.fontSize = e.options.navbar.fontSize;
        f.style.cursor = e.options.navbar.cursor;
        f.style.zIndex = e.options.navbar.zIndex;
        e.containerObj.appendChild(f);
        f.style.right = e.options.navbar.right;
        f.style.bottom = e.options.navbar.bottom;
        d("\u00A0\u2013\u00A0", e.zoomOut);
        d("\u00A0o\u00A0", e.zoom100);
        d("\u00A0+\u00A0", e.zoomIn);
        d("\u00A0\u2190\u00A0", e.clickLeftArrow);
        d("\u00A0\u2193\u00A0", e.clickUpArrow);
        d("\u00A0\u2191\u00A0", e.clickDownArrow);
        d("\u00A0\u2192\u00A0", e.clickRightArrow)
    },
    getElementById: function (d) {
        return document.getElementById(this.container.id + "_" + d)
    },
    resize: function (d, e) {}
});
JXG.NoRenderer = function () {
    this.enhancedRendering = false;
    this.type = "no"
};
JXG.extend(JXG.NoRenderer.prototype, {
    drawPoint: function (d) {},
    updatePoint: function (d) {},
    changePointStyle: function (d) {},
    drawLine: function (d) {},
    updateLine: function (d) {},
    drawTicks: function (d) {},
    updateTicks: function (d, g, e, h, f) {},
    drawCurve: function (d) {},
    updateCurve: function (d) {},
    drawEllipse: function (d) {},
    updateEllipse: function (d) {},
    drawPolygon: function (d) {},
    updatePolygon: function (d) {},
    displayCopyright: function (d, e) {},
    drawInternalText: function (d) {},
    updateInternalText: function (d) {},
    drawText: function (d) {},
    updateText: function (d) {},
    updateTextStyle: function (d, e) {},
    updateInternalTextStyle: function (e, f, d) {},
    drawImage: function (d) {},
    updateImage: function (d) {},
    transformImage: function (e, d) {},
    updateImageURL: function (d) {},
    appendChildPrim: function (d, e) {},
    appendNodesToElement: function (d, e) {},
    createPrim: function (d, e) {
        return null
    },
    remove: function (d) {},
    makeArrows: function (d) {},
    updateEllipsePrim: function (e, d, h, g, f) {},
    updateLinePrim: function (i, e, d, g, f, h) {},
    updatePathPrim: function (f, d, e) {},
    updatePathStringPoint: function (e, d, f) {},
    updatePathStringPrim: function (d) {},
    updatePathStringBezierPrim: function (d) {},
    updatePolygonPrim: function (e, d) {},
    updateRectPrim: function (g, d, i, e, f) {},
    setPropertyPrim: function (e, d, f) {},
    show: function (d) {},
    hide: function (d) {},
    setBuffering: function (e, d) {},
    setDashStyle: function (d) {},
    setDraft: function (d) {},
    removeDraft: function (d) {},
    setGradient: function (d) {},
    updateGradient: function (d) {},
    setObjectFillColor: function (f, d, e) {},
    setObjectStrokeColor: function (f, d, e) {},
    setObjectStrokeWidth: function (d, e) {},
    setShadow: function (d) {},
    highlight: function (d) {},
    noHighlight: function (d) {},
    suspendRedraw: function () {},
    unsuspendRedraw: function () {},
    drawZoomBar: function (d) {},
    getElementById: function (d) {
        return null
    },
    resize: function (d, e) {}
});
JXG.FileReader = {
    parseFileContent: function (d, g, j, f) {
        var h = false;
        if (!JXG.exists(f)) {
            f = true
        }
        try {
            h = new XMLHttpRequest();
            if (j.toLowerCase() == "raw") {
                h.overrideMimeType("text/plain; charset=iso-8859-1")
            } else {
                h.overrideMimeType("text/xml; charset=iso-8859-1")
            }
        } catch (i) {
            try {
                h = new ActiveXObject("Msxml2.XMLHTTP")
            } catch (i) {
                try {
                    h = new ActiveXObject("Microsoft.XMLHTTP")
                } catch (i) {
                    h = false
                }
            }
        }
        if (!h) {
            alert("AJAX not activated!");
            return
        }
        h.open("GET", d, f);
        if (j.toLowerCase() === "raw") {
            this.cbp = function () {
                var e = h;
                if (e.readyState == 4) {
                    g(e.responseText)
                }
            }
        } else {
            this.cbp = function () {
                var e = h;
                if (e.readyState == 4) {
                    var k = "";
                    if (typeof e.responseStream != "undefined" && (e.responseText.slice(0, 2) == "PK" || JXG.Util.asciiCharCodeAt(e.responseText.slice(0, 1), 0) == 31)) {
                        k = JXG.Util.Base64.decode(BinFileReader(e))
                    } else {
                        k = e.responseText
                    }
                    this.parseString(k, g, j, false)
                }
            }
        }
        this.cb = JXG.bind(this.cbp, this);
        h.onreadystatechange = this.cb;
        try {
            h.send(null)
        } catch (i) {
            throw new Error("JSXGraph: A problem occurred while trying to read '" + d + "'.")
        }
    },
    cleanWhitespace: function (d) {
        var e = d.firstChild;
        while (e != null) {
            if (e.nodeType == 3 && !/\S/.test(e.nodeValue)) {
                d.removeChild(e)
            } else {
                if (e.nodeType == 1) {
                    this.cleanWhitespace(e)
                }
            }
            e = e.nextSibling
        }
    },
    stringToXMLTree: function (e) {
        if (typeof DOMParser === "undefined") {
            DOMParser = function () {};
            DOMParser.prototype.parseFromString = function (h, i) {
                if (typeof ActiveXObject !== "undefined") {
                    var g = new ActiveXObject("MSXML.DomDocument");
                    g.loadXML(h);
                    return g
                }
            }
        }
        var f = new DOMParser(),
            d = f.parseFromString(e, "text/xml");
        this.cleanWhitespace(d);
        return d
    },
    parseString: function (j, g, i, e) {
        var d, h, f;
        i = i.toLowerCase();
        switch (i) {
            case "cdy":
            case "cinderella":
                if (e) {
                    j = JXG.Util.Base64.decode(j)
                }
                j = JXG.CinderellaReader.readCinderella(j, g);
                g.xmlString = j;
                break;
            case "tracenpoche":
                g.xmlString = JXG.TracenpocheReader.readTracenpoche(j, g);
                break;
            case "graph":
                j = JXG.GraphReader.readGraph(j, g, false);
                break;
            case "digraph":
                j = JXG.GraphReader.readGraph(j, updateboard, true);
                break;
            case "geonext":
                j = JXG.GeonextReader.prepareString(j);
                f = true;
                break;
            case "geogebra":
                e = j.slice(0, 2) !== "PK";
                j = JXG.GeogebraReader.prepareString(j, e);
                f = true;
                break;
            case "intergeo":
                if (e) {
                    j = JXG.Util.Base64.decode(j)
                }
                j = JXG.IntergeoReader.prepareString(j);
                f = true;
                break
        }
        if (f) {
            g.xmlString = j;
            d = this.stringToXMLTree(j);
            this.readElements(d, g, i)
        }
    },
    readElements: function (d, e, f) {
        if (f.toLowerCase() == "geonext") {
            e.suspendUpdate();
            if (d.getElementsByTagName("GEONEXT").length != 0) {
                JXG.GeonextReader.readGeonext(d, e)
            }
            e.unsuspendUpdate()
        } else {
            if (d.getElementsByTagName("geogebra").length != 0) {
                JXG.GeogebraReader.readGeogebra(d, e)
            } else {
                if (f.toLowerCase() == "intergeo") {
                    JXG.IntergeoReader.readIntergeo(d, e)
                }
            }
        }
    }
};
if (/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent && document && document.write)) {
    document.write('<script type="text/vbscript">\nFunction Base64Encode(inData)\n  Const Base64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"\n  Dim cOut, sOut, I\n  For I = 1 To LenB(inData) Step 3\n    Dim nGroup, pOut, sGroup\n    nGroup = &H10000 * AscB(MidB(inData, I, 1)) + _\n      &H100 * MyASC(MidB(inData, I + 1, 1)) + MyASC(MidB(inData, I + 2, 1))\n    nGroup = Oct(nGroup)\n    nGroup = String(8 - Len(nGroup), "0") & nGroup\n    pOut = Mid(Base64, CLng("&o" & Mid(nGroup, 1, 2)) + 1, 1) + _\n      Mid(Base64, CLng("&o" & Mid(nGroup, 3, 2)) + 1, 1) + _\n      Mid(Base64, CLng("&o" & Mid(nGroup, 5, 2)) + 1, 1) + _\n      Mid(Base64, CLng("&o" & Mid(nGroup, 7, 2)) + 1, 1)\n    sOut = sOut + pOut\n  Next\n  Select Case LenB(inData) Mod 3\n    Case 1: \'8 bit final\n      sOut = Left(sOut, Len(sOut) - 2) + "=="\n    Case 2: \'16 bit final\n      sOut = Left(sOut, Len(sOut) - 1) + "="\n  End Select\n  Base64Encode = sOut\nEnd Function\n\nFunction MyASC(OneChar)\n  If OneChar = "" Then MyASC = 0 Else MyASC = AscB(OneChar)\nEnd Function\n\nFunction BinFileReader(xhr)\n    Dim byteString\n    Dim b64String\n    Dim i\n    byteString = xhr.responseBody\n    ReDim byteArray(LenB(byteString))\n    For i = 1 To LenB(byteString)\n        byteArray(i-1) = AscB(MidB(byteString, i, 1))\n    Next\n    b64String = Base64Encode(byteString)\n    BinFileReader = b64String\nEnd Function\n<\/script>\n')
}
JXG.GeonextParser = {};
JXG.GeonextParser.replacePow = function (f) {
    var k, n, l, j, m, g, d, e, h, q, o;
    f = f.replace(/(\s*)\^(\s*)/g, "^");
    h = f.indexOf("^");
    while (h >= 0) {
        e = f.slice(0, h);
        q = f.slice(h + 1);
        if (e.charAt(e.length - 1) == ")") {
            k = 1;
            n = e.length - 2;
            while (n >= 0 && k > 0) {
                l = e.charAt(n);
                if (l == ")") {
                    k++
                } else {
                    if (l == "(") {
                        k--
                    }
                }
                n--
            }
            if (k == 0) {
                j = "";
                g = e.substring(0, n + 1);
                d = n;
                while (d >= 0 && g.substr(d, 1).match(/([\w\.]+)/)) {
                    j = RegExp.$1 + j;
                    d--
                }
                j += e.substring(n + 1, e.length);
                j = j.replace(/([\(\)\+\*\%\^\-\/\]\[])/g, "\\$1")
            } else {
                throw new Error("JSXGraph: Missing '(' in expression")
            }
        } else {
            j = "[\\w\\.]+"
        }
        if (q.match(/^([\w\.]*\()/)) {
            k = 1;
            n = RegExp.$1.length;
            while (n < q.length && k > 0) {
                l = q.charAt(n);
                if (l == ")") {
                    k--
                } else {
                    if (l == "(") {
                        k++
                    }
                }
                n++
            }
            if (k == 0) {
                m = q.substring(0, n);
                m = m.replace(/([\(\)\+\*\%\^\-\/\[\]])/g, "\\$1")
            } else {
                throw new Error("JSXGraph: Missing ')' in expression")
            }
        } else {
            m = "[\\w\\.]+"
        }
        o = new RegExp("(" + j + ")\\^(" + m + ")");
        f = f.replace(o, "JXG.Math.pow($1,$2)");
        h = f.indexOf("^")
    }
    return f
};
JXG.GeonextParser.replaceIf = function (e) {
    var r = "",
        f, q, h = null,
        d = null,
        l = null,
        g, p, j, m, k, n, o;
    g = e.indexOf("If(");
    if (g < 0) {
        return e
    }
    e = e.replace(/""/g, "0");
    while (g >= 0) {
        f = e.slice(0, g);
        q = e.slice(g + 3);
        j = 1;
        p = 0;
        m = -1;
        k = -1;
        while (p < q.length && j > 0) {
            n = q.charAt(p);
            if (n == ")") {
                j--
            } else {
                if (n == "(") {
                    j++
                } else {
                    if (n == "," && j == 1) {
                        if (m < 0) {
                            m = p
                        } else {
                            k = p
                        }
                    }
                }
            }
            p++
        }
        o = q.slice(0, p - 1);
        q = q.slice(p);
        if (m < 0) {
            return ""
        }
        if (k < 0) {
            return ""
        }
        h = o.slice(0, m);
        d = o.slice(m + 1, k);
        l = o.slice(k + 1);
        h = this.replaceIf(h);
        d = this.replaceIf(d);
        l = this.replaceIf(l);
        r += f + "((" + h + ")?(" + d + "):(" + l + "))";
        e = q;
        h = null;
        d = null;
        g = e.indexOf("If(")
    }
    r += q;
    return r
};
JXG.GeonextParser.replaceSub = function (f) {
    if (f.indexOf) {} else {
        return f
    }
    var e = f.indexOf("_{"),
        d;
    while (e >= 0) {
        f = f.substr(0, e) + f.substr(e).replace(/_\{/, "<sub>");
        d = f.substr(e).indexOf("}");
        if (d >= 0) {
            f = f.substr(0, d) + f.substr(d).replace(/\}/, "</sub>")
        }
        e = f.indexOf("_{")
    }
    e = f.indexOf("_");
    while (e >= 0) {
        f = f.substr(0, e) + f.substr(e).replace(/_(.?)/, "<sub>$1</sub>");
        e = f.indexOf("_")
    }
    return f
};
JXG.GeonextParser.replaceSup = function (f) {
    if (f.indexOf) {} else {
        return f
    }
    var e = f.indexOf("^{"),
        d;
    while (e >= 0) {
        f = f.substr(0, e) + f.substr(e).replace(/\^\{/, "<sup>");
        d = f.substr(e).indexOf("}");
        if (d >= 0) {
            f = f.substr(0, d) + f.substr(d).replace(/\}/, "</sup>")
        }
        e = f.indexOf("^{")
    }
    e = f.indexOf("^");
    while (e >= 0) {
        f = f.substr(0, e) + f.substr(e).replace(/\^(.?)/, "<sup>$1</sup>");
        e = f.indexOf("^")
    }
    return f
};
JXG.GeonextParser.replaceNameById = function (g, j) {
    var l = 0,
        d, k, h, f, e = ["X", "Y", "L", "V"];
    for (f = 0; f < e.length; f++) {
        l = g.indexOf(e[f] + "(");
        while (l >= 0) {
            if (l >= 0) {
                d = g.indexOf(")", l + 2);
                if (d >= 0) {
                    k = g.slice(l + 2, d);
                    k = k.replace(/\\(['"])?/g, "$1");
                    h = j.elementsByName[k];
                    g = g.slice(0, l + 2) + h.id + g.slice(d)
                }
            }
            d = g.indexOf(")", l + 2);
            l = g.indexOf(e[f] + "(", d)
        }
    }
    l = g.indexOf("Dist(");
    while (l >= 0) {
        if (l >= 0) {
            d = g.indexOf(",", l + 5);
            if (d >= 0) {
                k = g.slice(l + 5, d);
                k = k.replace(/\\(['"])?/g, "$1");
                h = j.elementsByName[k];
                g = g.slice(0, l + 5) + h.id + g.slice(d)
            }
        }
        d = g.indexOf(",", l + 5);
        l = g.indexOf(",", d);
        d = g.indexOf(")", l + 1);
        if (d >= 0) {
            k = g.slice(l + 1, d);
            k = k.replace(/\\(['"])?/g, "$1");
            h = j.elementsByName[k];
            g = g.slice(0, l + 1) + h.id + g.slice(d)
        }
        d = g.indexOf(")", l + 1);
        l = g.indexOf("Dist(", d)
    }
    e = ["Deg", "Rad"];
    for (f = 0; f < e.length; f++) {
        l = g.indexOf(e[f] + "(");
        while (l >= 0) {
            if (l >= 0) {
                d = g.indexOf(",", l + 4);
                if (d >= 0) {
                    k = g.slice(l + 4, d);
                    k = k.replace(/\\(['"])?/g, "$1");
                    h = j.elementsByName[k];
                    g = g.slice(0, l + 4) + h.id + g.slice(d)
                }
            }
            d = g.indexOf(",", l + 4);
            l = g.indexOf(",", d);
            d = g.indexOf(",", l + 1);
            if (d >= 0) {
                k = g.slice(l + 1, d);
                k = k.replace(/\\(['"])?/g, "$1");
                h = j.elementsByName[k];
                g = g.slice(0, l + 1) + h.id + g.slice(d)
            }
            d = g.indexOf(",", l + 1);
            l = g.indexOf(",", d);
            d = g.indexOf(")", l + 1);
            if (d >= 0) {
                k = g.slice(l + 1, d);
                k = k.replace(/\\(['"])?/g, "$1");
                h = j.elementsByName[k];
                g = g.slice(0, l + 1) + h.id + g.slice(d)
            }
            d = g.indexOf(")", l + 1);
            l = g.indexOf(e[f] + "(", d)
        }
    }
    return g
};
JXG.GeonextParser.replaceIdByObj = function (d) {
    var e = /(X|Y|L)\(([\w_]+)\)/g;
    d = d.replace(e, 'this.board.objects["$2"].$1()');
    e = /(V)\(([\w_]+)\)/g;
    d = d.replace(e, 'this.board.objects["$2"].Value()');
    e = /(Dist)\(([\w_]+),([\w_]+)\)/g;
    d = d.replace(e, 'this.board.objects["$2"].Dist(this.board.objects["$3"])');
    e = /(Deg)\(([\w_]+),([ \w\[\w_]+),([\w_]+)\)/g;
    d = d.replace(e, 'JXG.Math.Geometry.trueAngle(this.board.objects["$2"],this.board.objects["$3"],this.board.objects["$4"])');
    e = /Rad\(([\w_]+),([\w_]+),([\w_]+)\)/g;
    d = d.replace(e, 'JXG.Math.Geometry.rad(this.board.objects["$1"],this.board.objects["$2"],this.board.objects["$3"])');
    e = /N\((.+)\)/g;
    d = d.replace(e, "($1)");
    return d
};
JXG.GeonextParser.geonext2JS = function (e, g) {
    var h, f, d, k = ["Abs", "ACos", "ASin", "ATan", "Ceil", "Cos", "Exp", "Factorial", "Floor", "Log", "Max", "Min", "Random", "Round", "Sin", "Sqrt", "Tan", "Trunc"],
        j = ["Math.abs", "Math.acos", "Math.asin", "Math.atan", "Math.ceil", "Math.cos", "Math.exp", "JXG.Math.factorial", "Math.floor", "Math.log", "Math.max", "Math.min", "Math.random", "this.board.round", "Math.sin", "Math.sqrt", "Math.tan", "Math.ceil"];
    e = e.replace(/&lt;/g, "<");
    e = e.replace(/&gt;/g, ">");
    e = e.replace(/&amp;/g, "&");
    f = e;
    f = this.replaceNameById(f, g);
    f = this.replaceIf(f);
    f = this.replacePow(f);
    f = this.replaceIdByObj(f);
    for (d = 0; d < k.length; d++) {
        h = new RegExp(["(\\W|^)(", k[d], ")"].join(""), "ig");
        f = f.replace(h, ["$1", j[d]].join(""))
    }
    f = f.replace(/True/g, "true");
    f = f.replace(/False/g, "false");
    f = f.replace(/fasle/g, "false");
    f = f.replace(/Pi/g, "Math.PI");
    return f
};
JXG.GeonextParser.findDependencies = function (h, e, g) {
    if (typeof g == "undefined") {
        g = h.board
    }
    var i = g.elementsByName,
        f, j, d;
    for (f in i) {
        if (f != h.name) {
            if (i[f].type == JXG.OBJECT_TYPE_TEXT) {
                if (!i[f].visProp.islabel) {
                    d = f.replace(/\[/g, "\\[");
                    d = d.replace(/\]/g, "\\]");
                    j = new RegExp("\\(([\\w\\[\\]'_ ]+,)*(" + d + ")(,[\\w\\[\\]'_ ]+)*\\)", "g");
                    if (e.search(j) >= 0) {
                        i[f].addChild(h)
                    }
                }
            } else {
                d = f.replace(/\[/g, "\\[");
                d = d.replace(/\]/g, "\\]");
                j = new RegExp("\\(([\\w\\[\\]'_ ]+,)*(" + d + ")(,[\\w\\[\\]'_ ]+)*\\)", "g");
                if (e.search(j) >= 0) {
                    i[f].addChild(h)
                }
            }
        }
    }
};
JXG.GeonextParser.gxt2jc = function (d, f) {
    var e, h = ["Sqrt"],
        g = ["sqrt"];
    d = d.replace(/&lt;/g, "<");
    d = d.replace(/&gt;/g, ">");
    d = d.replace(/&amp;/g, "&");
    e = d;
    e = this.replaceNameById2(e, f);
    e = e.replace(/True/g, "true");
    e = e.replace(/False/g, "false");
    e = e.replace(/fasle/g, "false");
    return e
};
JXG.GeonextParser.replaceNameById2 = function (g, j) {
    var l = 0,
        d, k, h, f, e = ["X", "Y", "L", "V"];
    for (f = 0; f < e.length; f++) {
        l = g.indexOf(e[f] + "(");
        while (l >= 0) {
            if (l >= 0) {
                d = g.indexOf(")", l + 2);
                if (d >= 0) {
                    k = g.slice(l + 2, d);
                    k = k.replace(/\\(['"])?/g, "$1");
                    h = j.elementsByName[k];
                    g = g.slice(0, l + 2) + "$('" + h.id + "')" + g.slice(d)
                }
            }
            d = g.indexOf(")", l + 2);
            l = g.indexOf(e[f] + "(", d)
        }
    }
    l = g.indexOf("Dist(");
    while (l >= 0) {
        if (l >= 0) {
            d = g.indexOf(",", l + 5);
            if (d >= 0) {
                k = g.slice(l + 5, d);
                k = k.replace(/\\(['"])?/g, "$1");
                h = j.elementsByName[k];
                g = g.slice(0, l + 5) + "$('" + h.id + "')" + g.slice(d)
            }
        }
        d = g.indexOf(",", l + 5);
        l = g.indexOf(",", d);
        d = g.indexOf(")", l + 1);
        if (d >= 0) {
            k = g.slice(l + 1, d);
            k = k.replace(/\\(['"])?/g, "$1");
            h = j.elementsByName[k];
            g = g.slice(0, l + 1) + "$('" + h.id + "')" + g.slice(d)
        }
        d = g.indexOf(")", l + 1);
        l = g.indexOf("Dist(", d)
    }
    e = ["Deg", "Rad"];
    for (f = 0; f < e.length; f++) {
        l = g.indexOf(e[f] + "(");
        while (l >= 0) {
            if (l >= 0) {
                d = g.indexOf(",", l + 4);
                if (d >= 0) {
                    k = g.slice(l + 4, d);
                    k = k.replace(/\\(['"])?/g, "$1");
                    h = j.elementsByName[k];
                    g = g.slice(0, l + 4) + "$('" + h.id + "')" + g.slice(d)
                }
            }
            d = g.indexOf(",", l + 4);
            l = g.indexOf(",", d);
            d = g.indexOf(",", l + 1);
            if (d >= 0) {
                k = g.slice(l + 1, d);
                k = k.replace(/\\(['"])?/g, "$1");
                h = j.elementsByName[k];
                g = g.slice(0, l + 1) + "$('" + h.id + "')" + g.slice(d)
            }
            d = g.indexOf(",", l + 1);
            l = g.indexOf(",", d);
            d = g.indexOf(")", l + 1);
            if (d >= 0) {
                k = g.slice(l + 1, d);
                k = k.replace(/\\(['"])?/g, "$1");
                h = j.elementsByName[k];
                g = g.slice(0, l + 1) + "$('" + h.id + "')" + g.slice(d)
            }
            d = g.indexOf(")", l + 1);
            l = g.indexOf(e[f] + "(", d)
        }
    }
    return g
};
JXG.Board = function (d, i, e, n, m, l, k, j, f, g, h) {
    this.BOARD_MODE_NONE = 0;
    this.BOARD_MODE_DRAG = 1;
    this.BOARD_MODE_MOVE_ORIGIN = 2;
    this.BOARD_QUALITY_LOW = 1;
    this.BOARD_QUALITY_HIGH = 2;
    this.BOARD_MODE_ZOOM = 17;
    this.BOARD_MODE_CONSTRUCT = 16;
    this.CONSTRUCTION_TYPE_POINT = 1129599060;
    this.CONSTRUCTION_TYPE_CIRCLE = 1129595724;
    this.CONSTRUCTION_TYPE_LINE = 1129598030;
    this.CONSTRUCTION_TYPE_GLIDER = 1129596740;
    this.CONSTRUCTION_TYPE_MIDPOINT = 1129598288;
    this.CONSTRUCTION_TYPE_PERPENDICULAR = 1129599044;
    this.CONSTRUCTION_TYPE_PARALLEL = 1129599052;
    this.CONSTRUCTION_TYPE_INTERSECTION = 1129597267;
    this.container = d;
    this.containerObj = typeof document != "undefined" ? document.getElementById(this.container) : null;
    if (typeof document != "undefined" && this.containerObj == null) {
        throw new Error("\nJSXGraph: HTML container element '" + (d) + "' not found.")
    }
    this.renderer = i;
    this.grids = [];
    this.options = JXG.deepCopy(JXG.Options);
    this.dimension = 2;
    this.jc = new JXG.JessieCode();
    this.jc.use(this);
    this.origin = {};
    this.origin.usrCoords = [1, 0, 0];
    this.origin.scrCoords = [1, n[0], n[1]];
    this.zoomX = m;
    this.zoomY = l;
    this.unitX = k * this.zoomX;
    this.unitY = j * this.zoomY;
    this.canvasWidth = f;
    this.canvasHeight = g;
    if (JXG.exists(e) && e !== "" && typeof document != "undefined" && !JXG.exists(document.getElementById(e))) {
        this.id = e
    } else {
        this.id = this.generateId()
    }
    this.eventHandlers = {};
    this.hooks = [];
    this.dependentBoards = [];
    this.inUpdate = false;
    this.objects = {};
    this.objectsList = [];
    this.groups = {};
    this.animationObjects = {};
    this.highlightedObjects = {};
    this.numObjects = 0;
    this.elementsByName = {};
    this.mode = this.BOARD_MODE_NONE;
    this.updateQuality = this.BOARD_QUALITY_HIGH;
    this.isSuspendedRedraw = false;
    this.calculateSnapSizes();
    this.drag_dx = 0;
    this.drag_dy = 0;
    this.mouse = null;
    this.touches = [];
    this.xmlString = "";
    this.cPos = [];
    this.touchMoveLast = 0;
    this.downObjects = [];
    this.showCopyright = false;
    if ((h != null && h) || (h == null && this.options.showCopyright)) {
        this.showCopyright = true;
        this.renderer.displayCopyright(JXG.JSXGraph.licenseText, this.options.text.fontSize)
    }
    this.needsFullUpdate = false;
    this.reducedUpdate = false;
    this.currentCBDef = "none";
    this.geonextCompatibilityMode = false;
    if (this.options.text.useASCIIMathML && translateASCIIMath) {
        init()
    } else {
        this.options.text.useASCIIMathML = false
    }
    this.hasMouseHandlers = false;
    this.hasTouchHandlers = false;
    this.hasMouseUp = false;
    this.hasTouchEnd = false;
    this.addEventHandlers();
    this.methodMap = {
        update: "update",
        on: "on",
        off: "off",
        setView: "setBoundingBox",
        setBoundingBox: "setBoundingBox",
        migratePoint: "migratePoint",
        colorblind: "emulateColorblindness"
    }
};
JXG.extend(JXG.Board.prototype, {
    generateName: function (f) {
        if (f.type == JXG.OBJECT_TYPE_TICKS) {
            return ""
        }
        var l, h = 2,
            e = "",
            m = "",
            n = [],
            d = "",
            k, g;
        if (f.elementClass == JXG.OBJECT_CLASS_POINT) {
            l = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
        } else {
            if (f.type == JXG.OBJECT_TYPE_ANGLE) {
                if (false) {
                    l = ["", "α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ", "λ", "μ", "ν", "ξ", "ο", "π", "ρ", "σ", "τ", "υ", "φ", "χ", "ψ", "ω"]
                } else {
                    l = ["", "&alpha;", "&beta;", "&gamma;", "&delta;", "&epsilon;", "&zeta;", "&eta;", "&theta;", "&iota;", "&kappa;", "&lambda;", "&mu;", "&nu;", "&xi;", "&omicron;", "&pi;", "&rho;", "&sigma;", "&tau;", "&upsilon;", "&phi;", "&chi;", "&psi;", "&omega;"]
                }
            } else {
                l = ["", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
            }
        }
        if (f.elementClass !== JXG.OBJECT_CLASS_POINT && f.elementClass != JXG.OBJECT_CLASS_LINE && f.type != JXG.OBJECT_TYPE_ANGLE) {
            if (f.type === JXG.OBJECT_TYPE_POLYGON) {
                e = "P_{"
            } else {
                if (f.elementClass === JXG.OBJECT_CLASS_CIRCLE) {
                    e = "k_{"
                } else {
                    if (f.type === JXG.OBJECT_TYPE_TEXT) {
                        e = "t_{"
                    } else {
                        e = "s_{"
                    }
                }
            }
            m = "}"
        }
        for (k = 0; k < h; k++) {
            n[k] = 0
        }
        while (n[h - 1] < l.length) {
            for (n[0] = 1; n[0] < l.length; n[0]++) {
                d = e;
                for (k = h; k > 0; k--) {
                    d += l[n[k - 1]]
                }
                if (this.elementsByName[d + m] == null) {
                    return d + m
                }
            }
            n[0] = l.length;
            for (k = 1; k < h; k++) {
                if (n[k - 1] == l.length) {
                    n[k - 1] = 1;
                    n[k]++
                }
            }
        }
        return ""
    },
    generateId: function () {
        var d = 1;
        while (JXG.JSXGraph.boards["jxgBoard" + d] != null) {
            d = Math.round(Math.random() * 65535)
        }
        return ("jxgBoard" + d)
    },
    setId: function (g, f) {
        var e = this.numObjects++,
            d = g.id;
        if (d == "" || !JXG.exists(d)) {
            d = this.id + f + e
        }
        g.id = d;
        this.objects[d] = g;
        g._pos = this.objectsList.length;
        this.objectsList[this.objectsList.length] = g;
        return d
    },
    finalizeAdding: function (d) {
        if (!d.visProp.visible) {
            this.renderer.hide(d)
        }
    },
    finalizeLabel: function (d) {
        if (d.hasLabel && !d.label.content.visProp.islabel && !d.label.content.visProp.visible) {
            this.renderer.hide(d.label.content)
        }
    },
    getCoordsTopLeftCorner: function () {
        var g = this.containerObj,
            e = JXG.getOffset(g),
            f = document.documentElement.ownerDocument,
            d = function (h) {
                var i = parseInt(JXG.getStyle(g, h));
                return isNaN(i) ? 0 : i
            };
        if (this.cPos.length > 0 && (this.mode === JXG.BOARD_MODE_DRAG || this.mode === JXG.BOARD_MODE_MOVE_ORIGIN)) {
            return this.cPos
        }
        if (!g.currentStyle && f.defaultView) {
            g = document.documentElement;
            e[0] += d("margin-left");
            e[1] += d("margin-top");
            e[0] += d("border-left-width");
            e[1] += d("border-top-width");
            e[0] += d("padding-left");
            e[1] += d("padding-top");
            g = this.containerObj
        }
        e[0] += d("border-left-width");
        e[1] += d("border-top-width");
        if (this.renderer.type !== "vml") {
            e[0] += d("padding-left");
            e[1] += d("padding-top")
        }
        this.cPos = e;
        return e
    },
    getMousePosition: function (h, f) {
        var g = this.getCoordsTopLeftCorner(),
            d;
        d = JXG.getPosition(h, f);
        return [d[0] - g[0], d[1] - g[1]]
    },
    initMoveOrigin: function (d, e) {
        this.drag_dx = d - this.origin.scrCoords[1];
        this.drag_dy = e - this.origin.scrCoords[2];
        this.mode = this.BOARD_MODE_MOVE_ORIGIN
    },
    initMoveObject: function (l, k, m, j) {
        var h, e, i = [],
            f, g = this.objectsList.length,
            d = {
                visProp: {
                    layer: -10000
                }
            };
        for (e = 0; e < g; e++) {
            h = this.objectsList[e];
            f = h.hasPoint && h.hasPoint(l, k);
            if (h.visProp.visible && f) {
                h.triggerEventHandlers([j + "down", "down"], m);
                this.downObjects.push(h)
            }
            if (((this.geonextCompatibilityMode && (h.elementClass == JXG.OBJECT_CLASS_POINT || h.type == JXG.OBJECT_TYPE_TEXT)) || !this.geonextCompatibilityMode) && h.isDraggable && h.visProp.visible && (!h.visProp.fixed) && (!h.visProp.frozen) && f) {
                if (h.visProp.layer >= d.visProp.layer) {
                    if (JXG.exists(d.label) && h == d.label.content) {
                        continue
                    }
                    d = h;
                    i[0] = d
                }
            }
        }
        if (i.length > 0) {
            this.mode = this.BOARD_MODE_DRAG
        }
        if (this.options.takeFirst) {
            i.length = 1
        }
        return i
    },
    moveObject: function (d, k, j, e, h) {
        var f = new JXG.Coords(JXG.COORDS_BY_SCREEN, this.getScrCoordsOfMouse(d, k), this),
            g = j.obj,
            i;
        if (g.type != JXG.OBJECT_TYPE_GLIDER) {
            if (!isNaN(j.targets[0].Xprev + j.targets[0].Yprev)) {
                g.setPositionDirectly(JXG.COORDS_BY_SCREEN, f.scrCoords.slice(1), [j.targets[0].Xprev, j.targets[0].Yprev])
            }
            j.targets[0].Xprev = f.scrCoords[1];
            j.targets[0].Yprev = f.scrCoords[2];
            this.update(g)
        } else {
            if (g.type == JXG.OBJECT_TYPE_GLIDER) {
                i = g.coords;
                g.setPositionDirectly(JXG.COORDS_BY_USER, f.usrCoords.slice(1));
                if (g.slideObject.elementClass == JXG.OBJECT_CLASS_CIRCLE) {
                    g.coords = JXG.Math.Geometry.projectPointToCircle(g, g.slideObject, this)
                } else {
                    if (g.slideObject.elementClass == JXG.OBJECT_CLASS_LINE) {
                        g.coords = JXG.Math.Geometry.projectPointToLine(g, g.slideObject, this)
                    }
                }
                if (g.group.length != 0) {
                    g.group[g.group.length - 1].dX = g.coords.scrCoords[1] - i.scrCoords[1];
                    g.group[g.group.length - 1].dY = g.coords.scrCoords[2] - i.scrCoords[2];
                    g.group[g.group.length - 1].update(this)
                } else {
                    this.update(g)
                }
            }
        }
        g.triggerEventHandlers([h + "drag", "drag"], e);
        this.updateInfobox(g);
        this.update();
        g.highlight(true)
    },
    twoFingerMove: function (j, h, i, e) {
        var d, f, g;
        if (JXG.exists(i) && JXG.exists(i.obj)) {
            g = i.obj
        } else {
            return
        }
        d = new JXG.Coords(JXG.COORDS_BY_SCREEN, this.getScrCoordsOfMouse(j[0], j[1]), this);
        f = new JXG.Coords(JXG.COORDS_BY_SCREEN, this.getScrCoordsOfMouse(h[0], h[1]), this);
        if (g.elementClass === JXG.OBJECT_CLASS_LINE) {
            this.moveLine(d, f, i, g)
        } else {
            if (g.elementClass === JXG.OBJECT_CLASS_CIRCLE) {
                this.moveCircle(d, f, i, g)
            }
        }
        g.triggerEventHandlers(["touchdrag", "drag"], e);
        i.targets[0].Xprev = d.scrCoords[1];
        i.targets[0].Yprev = d.scrCoords[2];
        i.targets[1].Xprev = f.scrCoords[1];
        i.targets[1].Yprev = f.scrCoords[2]
    },
    moveLine: function (z, g, s, u) {
        var A, w, r, q, h, n, i, t, v, e, f, p, m, l, k, j;
        if (JXG.exists(s.targets[0]) && JXG.exists(s.targets[1]) && !isNaN(s.targets[0].Xprev + s.targets[0].Yprev + s.targets[1].Xprev + s.targets[1].Yprev)) {
            A = z.usrCoords;
            w = g.usrCoords;
            r = (new JXG.Coords(JXG.COORDS_BY_SCREEN, [s.targets[0].Xprev, s.targets[0].Yprev], this)).usrCoords;
            q = (new JXG.Coords(JXG.COORDS_BY_SCREEN, [s.targets[1].Xprev, s.targets[1].Yprev], this)).usrCoords;
            n = [1, (r[1] + q[1]) * 0.5, (r[2] + q[2]) * 0.5];
            h = [1, (A[1] + w[1]) * 0.5, (A[2] + w[2]) * 0.5];
            t = JXG.Math.crossProduct(r, q);
            i = JXG.Math.crossProduct(A, w);
            e = JXG.Math.crossProduct(t, i);
            if (Math.abs(e[0]) < JXG.Math.eps) {
                return;
                p = this.create("transform", [h[1] - n[1], h[2] - n[2]], {
                    type: "translate"
                })
            } else {
                e[1] /= e[0];
                e[2] /= e[0];
                f = JXG.Math.Geometry.rad(n.slice(1), e.slice(1), h.slice(1));
                p = this.create("transform", [f, e[1], e[2]], {
                    type: "rotate"
                })
            }
            p.update();
            n = JXG.Math.matVecMult(p.matrix, n);
            n[1] /= n[0];
            n[2] /= n[0];
            m = this.create("transform", [h[1] - n[1], h[2] - n[2]], {
                type: "translate"
            });
            m.update();
            n = JXG.Math.matVecMult(m.matrix, n);
            v = JXG.Math.Geometry.distance(A, w) / JXG.Math.Geometry.distance(r, q);
            l = this.create("transform", [-h[1], - h[2]], {
                type: "translate"
            });
            k = this.create("transform", [v, v], {
                type: "scale"
            });
            j = this.create("transform", [h[1], h[2]], {
                type: "translate"
            });
            p.melt(m).melt(l).melt(k).melt(j);
            p.applyOnce([u.point1, u.point2]);
            this.update(u.point1);
            u.highlight(true)
        }
    },
    moveCircle: function (g, s, f, m) {
        var r, q, e, t, p, i, n, l, k, j, h;
        if (m.method === "pointCircle" || m.method === "pointLine") {
            return
        }
        if (JXG.exists(f.targets[0]) && JXG.exists(f.targets[1]) && !isNaN(f.targets[0].Xprev + f.targets[0].Yprev + f.targets[1].Xprev + f.targets[1].Yprev)) {
            r = g.usrCoords;
            q = s.usrCoords;
            e = (new JXG.Coords(JXG.COORDS_BY_SCREEN, [f.targets[0].Xprev, f.targets[0].Yprev], this)).usrCoords;
            t = (new JXG.Coords(JXG.COORDS_BY_SCREEN, [f.targets[1].Xprev, f.targets[1].Yprev], this)).usrCoords;
            n = this.create("transform", [r[1] - e[1], r[2] - e[2]], {
                type: "translate"
            });
            i = JXG.Math.Geometry.rad(t.slice(1), r.slice(1), q.slice(1));
            p = JXG.Math.Geometry.distance(r, q) / JXG.Math.Geometry.distance(e, t);
            l = this.create("transform", [-r[1], - r[2]], {
                type: "translate"
            });
            k = this.create("transform", [i], {
                type: "rotate"
            });
            j = this.create("transform", [p, p], {
                type: "scale"
            });
            h = this.create("transform", [r[1], r[2]], {
                type: "translate"
            });
            n.melt(l).melt(k).melt(j).melt(h);
            n.applyOnce([m.center]);
            if (m.method === "twoPoints") {
                n.applyOnce([m.point2])
            } else {
                if (m.method === "pointRadius") {
                    if (JXG.isNumber(m.updateRadius.origin)) {
                        m.setRadius(m.radius * p)
                    }
                }
            }
            this.update(m.center);
            m.highlight(true)
        }
    },
    highlightElements: function (e, k, f, i) {
        var h, j, g, d = this.objectsList.length;
        for (h = 0; h < d; h++) {
            j = this.objectsList[h];
            g = j.id;
            if (j.visProp.highlight && JXG.exists(j.hasPoint) && j.visProp.visible && j.hasPoint(e, k)) {
                this.updateInfobox(j);
                if (!JXG.exists(this.highlightedObjects[g])) {
                    this.highlightedObjects[g] = j;
                    j.highlight();
                    this.triggerEventHandlers(["mousehit", "hit"], f, j, i)
                }
                if (j.mouseover) {
                    j.triggerEventHandlers(["mousemove", "move"], f)
                } else {
                    j.triggerEventHandlers(["mouseover", "over"], f);
                    j.mouseover = true
                }
            }
        }
        for (h = 0; h < d; h++) {
            j = this.objectsList[h];
            g = j.id;
            if (j.mouseover) {
                if (!this.highlightedObjects[g]) {
                    j.triggerEventHandlers(["mouseout", "out"], f);
                    j.mouseover = false
                }
            }
        }
    },
    initXYstart: function (e) {
        var d = [];
        if (e.elementClass == JXG.OBJECT_CLASS_LINE) {
            d.push(e.point1.coords.usrCoords);
            d.push(e.point2.coords.usrCoords)
        } else {
            if (e.elementClass == JXG.OBJECT_CLASS_CIRCLE) {
                d.push(e.center.coords.usrCoords)
            } else {
                if (e.type == JXG.OBJECT_TYPE_GLIDER) {
                    d.push([e.position, e.position, e.position])
                } else {
                    d.push(e.coords.usrCoords)
                }
            }
        }
        return d
    },
    mouseOriginMoveStart: function (d) {
        var e = this.options.pan && d.shiftKey;
        if (e) {
            var f = this.getMousePosition(d);
            this.initMoveOrigin(f[0], f[1])
        }
        return e
    },
    mouseOriginMove: function (d) {
        var e = this.mode == this.BOARD_MODE_MOVE_ORIGIN;
        if (e) {
            var f = this.getMousePosition(d);
            this.moveOrigin(f[0], f[1])
        }
        return e
    },
    touchOriginMoveStart: function (d) {
        var f = d[JXG.touchProperty],
            e = this.options.pan && f.length == 2 && JXG.Math.Geometry.distance([f[0].screenX, f[0].screenY], [f[1].screenX, f[1].screenY]) < 80;
        if (e) {
            var g = this.getMousePosition(d, 0);
            this.initMoveOrigin(g[0], g[1])
        }
        return e
    },
    touchOriginMove: function (d) {
        var e = this.mode == this.BOARD_MODE_MOVE_ORIGIN;
        if (e) {
            var f = this.getMousePosition(d, 0);
            this.moveOrigin(f[0], f[1])
        }
        return e
    },
    originMoveEnd: function () {
        this.mode = this.BOARD_MODE_NONE
    },
    addEventHandlers: function () {
        this.addMouseEventHandlers();
        this.addTouchEventHandlers()
    },
    addMouseEventHandlers: function () {
        if (!this.hasMouseHandlers && typeof document != "undefined") {
            JXG.addEvent(this.containerObj, "mousedown", this.mouseDownListener, this);
            JXG.addEvent(this.containerObj, "mousemove", this.mouseMoveListener, this);
            JXG.addEvent(this.containerObj, "mousewheel", this.mouseWheelListener, this);
            JXG.addEvent(this.containerObj, "DOMMouseScroll", this.mouseWheelListener, this);
            this.hasMouseHandlers = true;
            this.containerObj.oncontextmenu = function (d) {
                if (JXG.exists(d)) {
                    d.preventDefault()
                }
                return false
            }
        }
    },
    addTouchEventHandlers: function () {
        if (!this.hasTouchHandlers && typeof document != "undefined") {
            JXG.addEvent(this.containerObj, "touchstart", this.touchStartListener, this);
            JXG.addEvent(this.containerObj, "touchmove", this.touchMoveListener, this);
            JXG.addEvent(this.containerObj, "gesturestart", this.gestureStartListener, this);
            JXG.addEvent(this.containerObj, "gesturechange", this.gestureChangeListener, this);
            this.hasTouchHandlers = true
        }
    },
    removeMouseEventHandlers: function () {
        if (this.hasMouseHandlers && typeof document != "undefined") {
            JXG.removeEvent(this.containerObj, "mousedown", this.mouseDownListener, this);
            JXG.removeEvent(this.containerObj, "mousemove", this.mouseMoveListener, this);
            if (this.hasMouseUp) {
                JXG.removeEvent(document, "mouseup", this.mouseUpListener, this);
                this.hasMouseUp = false
            }
            JXG.removeEvent(this.containerObj, "mousewheel", this.mouseWheelListener, this);
            JXG.removeEvent(this.containerObj, "DOMMouseScroll", this.mouseWheelListener, this);
            this.hasMouseHandlers = false
        }
    },
    removeTouchEventHandlers: function () {
        if (this.hasTouchHandlers && typeof document != "undefined") {
            JXG.removeEvent(this.containerObj, "touchstart", this.touchStartListener, this);
            JXG.removeEvent(this.containerObj, "touchmove", this.touchMoveListener, this);
            if (this.hasTouchEnd) {
                JXG.removeEvent(document, "touchend", this.touchEndListener, this);
                this.hasTouchEnd = false
            }
            JXG.removeEvent(this.containerObj, "gesturestart", this.gestureStartListener, this);
            JXG.removeEvent(this.containerObj, "gesturechange", this.gestureChangeListener, this);
            this.hasTouchHandlers = false
        }
    },
    removeEventHandlers: function () {
        this.removeMouseEventHandlers();
        this.removeTouchEventHandlers()
    },
    clickLeftArrow: function () {
        this.moveOrigin(this.origin.scrCoords[1] + this.canvasWidth * 0.1, this.origin.scrCoords[2]);
        return this
    },
    clickRightArrow: function () {
        this.moveOrigin(this.origin.scrCoords[1] - this.canvasWidth * 0.1, this.origin.scrCoords[2]);
        return this
    },
    clickUpArrow: function () {
        this.moveOrigin(this.origin.scrCoords[1], this.origin.scrCoords[2] - this.canvasHeight * 0.1);
        return this
    },
    clickDownArrow: function () {
        this.moveOrigin(this.origin.scrCoords[1], this.origin.scrCoords[2] + this.canvasHeight * 0.1);
        return this
    },
    gestureChangeListener: function (e) {
        var g, f = this.options.zoom.factorX,
            d = this.options.zoom.factorY;
        if (!this.options.zoom.wheel) {
            return true
        }
        e.preventDefault();
        if (this.mode === this.BOARD_MODE_NONE) {
            g = new JXG.Coords(JXG.COORDS_BY_SCREEN, this.getMousePosition(e), this);
            this.options.zoom.factorX = e.scale / this.prevScale;
            this.options.zoom.factorY = e.scale / this.prevScale;
            this.zoomIn(g.usrCoords[1], g.usrCoords[2]);
            this.prevScale = e.scale;
            this.options.zoom.factorX = f;
            this.options.zoom.factorY = d
        }
        return false
    },
    gestureStartListener: function (d) {
        if (!this.options.zoom.wheel) {
            return true
        }
        d.preventDefault();
        this.prevScale = 1;
        return false
    },
    touchStartListener: function (s) {
        var n, r, d, h, g, f, v = this.options.precision.touch,
            m, u = [],
            t, o, q = s[JXG.touchProperty];
        if (!this.hasTouchEnd) {
            JXG.addEvent(document, "touchend", this.touchEndListener, this);
            this.hasTouchEnd = true
        }
        if (this.hasMouseHandlers) {
            this.removeMouseEventHandlers()
        }
        if (document.selection && typeof document.selection.empty == "function") {
            document.selection.empty()
        } else {
            if (window.getSelection) {
                window.getSelection().removeAllRanges()
            }
        }
        if (this.mode === this.BOARD_MODE_NONE && this.touchOriginMoveStart(s)) {
            this.triggerEventHandlers(["touchstart", "down"], s);
            return false
        }
        this.options.precision.hasPoint = this.options.precision.touch;
        for (n = 0; n < q.length; n++) {
            q[n].jxg_isused = false
        }
        for (n = 0; n < this.touches.length; n++) {
            for (h = 0; h < this.touches[n].targets.length; h++) {
                this.touches[n].targets[h].num = -1;
                v = this.options.precision.touch;
                do {
                    for (g = 0; g < q.length; g++) {
                        if (Math.abs(Math.pow(q[g].screenX - this.touches[n].targets[h].X, 2) + Math.pow(q[g].screenY - this.touches[n].targets[h].Y, 2)) < v * v) {
                            this.touches[n].targets[h].num = g;
                            this.touches[n].targets[h].X = q[g].screenX;
                            this.touches[n].targets[h].Y = q[g].screenY;
                            q[g].jxg_isused = true;
                            break
                        }
                    }
                    v *= 2
                } while (this.touches[n].targets[h].num == -1 && v < this.options.precision.touchMax);
                if (this.touches[n].targets[h].num === -1) {
                    JXG.debug("i couldn't find a targettouches for target no " + h + " on " + this.touches[n].obj.name + " (" + this.touches[n].obj.id + "). Removed the target.");
                    JXG.debug("eps = " + v + ", touchMax = " + JXG.Options.precision.touchMax);
                    this.touches[n].targets.splice(n, 1)
                }
            }
        }
        for (n = 0; n < q.length; n++) {
            if (!q[n].jxg_isused) {
                r = this.getMousePosition(s, n);
                d = this.initMoveObject(r[0], r[1], s, "touch");
                if (d.length != 0) {
                    m = d[d.length - 1];
                    if (JXG.isPoint(m) || m.type === JXG.OBJECT_TYPE_TEXT) {
                        o = [{
                            num: n,
                            X: q[n].screenX,
                            Y: q[n].screenY,
                            Xprev: NaN,
                            Yprev: NaN,
                            Xstart: [],
                            Ystart: [],
                            Zstart: []
                        }];
                        u = this.initXYstart(m);
                        for (f = 0; f < u.length; f++) {
                            o[0].Xstart.push(u[f][1]);
                            o[0].Ystart.push(u[f][2]);
                            o[0].Zstart.push(u[f][0])
                        }
                        this.touches.push({
                            obj: m,
                            targets: o
                        });
                        this.highlightedObjects[m.id] = m;
                        m.highlight(true)
                    } else {
                        if (m.elementClass === JXG.OBJECT_CLASS_LINE || m.elementClass === JXG.OBJECT_CLASS_CIRCLE) {
                            t = false;
                            for (h = 0; h < this.touches.length; h++) {
                                if (m.id === this.touches[h].obj.id) {
                                    t = true;
                                    if (this.touches[h].targets.length === 1) {
                                        var p = {
                                            num: n,
                                            X: q[n].screenX,
                                            Y: q[n].screenY,
                                            Xprev: NaN,
                                            Yprev: NaN,
                                            Xstart: [],
                                            Ystart: [],
                                            Zstart: []
                                        };
                                        u = this.initXYstart(m);
                                        for (f = 0; f < u.length; f++) {
                                            p.Xstart.push(u[f][1]);
                                            p.Ystart.push(u[f][2]);
                                            p.Zstart.push(u[f][0])
                                        }
                                        this.touches[h].targets.push(p)
                                    }
                                    q[n].jxg_isused = true
                                }
                            }
                            if (!t) {
                                o = [{
                                    num: n,
                                    X: q[n].screenX,
                                    Y: q[n].screenY,
                                    Xprev: NaN,
                                    Yprev: NaN,
                                    Xstart: [],
                                    Ystart: [],
                                    Zstart: []
                                }];
                                u = this.initXYstart(m);
                                for (f = 0; f < u.length; f++) {
                                    o[0].Xstart.push(u[f][1]);
                                    o[0].Ystart.push(u[f][2]);
                                    o[0].Zstart.push(u[f][0])
                                }
                                this.touches.push({
                                    obj: m,
                                    targets: o
                                });
                                this.highlightedObjects[m.id] = m;
                                m.highlight(true)
                            }
                        }
                    }
                }
                q[n].jxg_isused = true
            }
        }
        if (this.touches.length > 0) {
            s.preventDefault();
            s.stopPropagation()
        }
        if (JXG.isWebkitAndroid()) {
            var e = new Date();
            this.touchMoveLast = e.getTime() - 200
        }
        this.options.precision.hasPoint = this.options.precision.mouse;
        this.triggerEventHandlers(["touchstart", "down"], s);
        return this.touches.length > 0
    },
    touchMoveListener: function (d) {
        var e, g = 0,
            j, h = d[JXG.touchProperty];
        if (this.mode !== this.BOARD_MODE_NONE) {
            d.preventDefault();
            d.stopPropagation()
        }
        if (JXG.isWebkitAndroid()) {
            var f = new Date();
            f = f.getTime();
            if (f - this.touchMoveLast < 80) {
                this.updateQuality = this.BOARD_QUALITY_HIGH;
                this.triggerEventHandlers(["touchmove", "move"], d, this.mode);
                return false
            } else {
                this.touchMoveLast = f
            }
        }
        if (this.mode != this.BOARD_MODE_DRAG) {
            this.renderer.hide(this.infobox)
        }
        this.options.precision.hasPoint = this.options.precision.touch;
        if (!this.touchOriginMove(d)) {
            if (this.mode == this.BOARD_MODE_DRAG) {
                for (e = 0; e < this.touches.length; e++) {
                    if (this.touches[e].targets.length === 1) {
                        if (h[this.touches[e].targets[0].num]) {
                            this.touches[e].targets[0].X = h[this.touches[e].targets[0].num].screenX;
                            this.touches[e].targets[0].Y = h[this.touches[e].targets[0].num].screenY;
                            j = this.getMousePosition(d, this.touches[e].targets[0].num);
                            this.moveObject(j[0], j[1], this.touches[e], d, "touch")
                        }
                    } else {
                        if (this.touches[e].targets.length === 2 && this.touches[e].targets[0].num > -1 && this.touches[e].targets[1].num > -1) {
                            if (h[this.touches[e].targets[0].num] && h[this.touches[e].targets[1].num]) {
                                this.touches[e].targets[0].X = h[this.touches[e].targets[0].num].screenX;
                                this.touches[e].targets[0].Y = h[this.touches[e].targets[0].num].screenY;
                                this.touches[e].targets[1].X = h[this.touches[e].targets[1].num].screenX;
                                this.touches[e].targets[1].Y = h[this.touches[e].targets[1].num].screenY;
                                this.twoFingerMove(this.getMousePosition(d, this.touches[e].targets[0].num), this.getMousePosition(d, this.touches[e].targets[1].num), this.touches[e], d)
                            }
                        }
                    }
                }
            }
        }
        if (this.mode != this.BOARD_MODE_DRAG) {
            this.renderer.hide(this.infobox)
        }
        this.options.precision.hasPoint = this.options.precision.mouse;
        this.triggerEventHandlers(["touchmove", "move"], d, this.mode);
        return this.mode === this.BOARD_MODE_NONE
    },
    touchEndListener: function (m) {
        var f, e, d, o = this.options.precision.touch,
            l = [],
            n, g, h = m[JXG.touchProperty];
        this.triggerEventHandlers(["touchend", "up"], m);
        this.renderer.hide(this.infobox);
        if (h.length > 0) {
            for (f = 0; f < this.touches.length; f++) {
                l[f] = this.touches[f]
            }
            this.touches.length = 0;
            for (f = 0; f < h.length; f++) {
                h[f].jxg_isused = false
            }
            for (f = 0; f < l.length; f++) {
                n = false;
                g = 0;
                for (e = 0; e < l[f].targets.length; e++) {
                    l[f].targets[e].found = false;
                    for (d = 0; d < h.length; d++) {
                        if (Math.abs(Math.pow(h[d].screenX - l[f].targets[e].X, 2) + Math.pow(h[d].screenY - l[f].targets[e].Y, 2)) < o * o) {
                            l[f].targets[e].found = true;
                            l[f].targets[e].num = d;
                            l[f].targets[e].X = h[d].screenX;
                            l[f].targets[e].Y = h[d].screenY;
                            g++;
                            break
                        }
                    }
                }
                if (JXG.isPoint(l[f].obj)) {
                    n = (l[f].targets[0] && l[f].targets[0].found)
                } else {
                    if (l[f].obj.elementClass === JXG.OBJECT_CLASS_LINE) {
                        n = (l[f].targets[0] && l[f].targets[0].found) || (l[f].targets[1] && l[f].targets[1].found)
                    } else {
                        if (l[f].obj.elementClass === JXG.OBJECT_CLASS_CIRCLE) {
                            n = g === 1 || g === 3
                        }
                    }
                }
                if (n) {
                    this.touches.push({
                        obj: l[f].obj,
                        targets: []
                    });
                    for (e = 0; e < l[f].targets.length; e++) {
                        if (l[f].targets[e].found) {
                            this.touches[this.touches.length - 1].targets.push({
                                num: l[f].targets[e].num,
                                X: l[f].targets[e].screenX,
                                Y: l[f].targets[e].screenY,
                                Xprev: NaN,
                                Yprev: NaN,
                                Xstart: l[f].targets[e].Xstart,
                                Ystart: l[f].targets[e].Ystart,
                                Zstart: l[f].targets[e].Zstart
                            })
                        }
                    }
                } else {
                    delete this.highlightedObjects[l[f].obj.id];
                    l[f].obj.noHighlight()
                }
            }
        } else {
            this.touches.length = 0
        }
        for (f = 0; f < this.downObjects.length; f++) {
            n = false;
            for (e = 0; e < this.touches.length; e++) {
                if (this.touches[e].obj.id == this.downObjects[f].id) {
                    n = true
                }
            }
            if (!n) {
                this.downObjects[f].triggerEventHandlers(["touchup", "up"], m);
                this.downObjects[f].snapToGrid();
                this.downObjects.splice(f, 1)
            }
        }
        if (!h || h.length === 0) {
            JXG.removeEvent(document, "touchend", this.touchEndListener, this);
            this.hasTouchEnd = false;
            this.dehighlightAll();
            this.updateQuality = this.BOARD_QUALITY_HIGH;
            this.originMoveEnd();
            this.update()
        }
        return true
    },
    mouseDownListener: function (d) {
        var j, g, h, f, e;
        if (document.selection && typeof document.selection.empty == "function") {
            document.selection.empty()
        } else {
            if (window.getSelection) {
                window.getSelection().removeAllRanges()
            }
        }
        if (!this.hasMouseUp) {
            JXG.addEvent(document, "mouseup", this.mouseUpListener, this);
            this.hasMouseUp = true
        }
        if (this.mouseOriginMoveStart(d)) {
            f = false
        } else {
            j = this.getMousePosition(d);
            g = this.initMoveObject(j[0], j[1], d, "mouse");
            if (g.length == 0) {
                this.mode = this.BOARD_MODE_NONE;
                f = true
            } else {
                this.mouse = {
                    obj: null,
                    targets: [{
                        X: j[0],
                        Y: j[1],
                        Xprev: NaN,
                        Yprev: NaN
                    }]
                };
                this.mouse.obj = g[g.length - 1];
                this.dehighlightAll();
                this.highlightedObjects[this.mouse.obj.id] = this.mouse.obj;
                this.mouse.obj.highlight(true);
                this.mouse.targets[0].Xstart = [];
                this.mouse.targets[0].Ystart = [];
                this.mouse.targets[0].Zstart = [];
                h = this.initXYstart(this.mouse.obj);
                for (e = 0; e < h.length; e++) {
                    this.mouse.targets[0].Xstart.push(h[e][1]);
                    this.mouse.targets[0].Ystart.push(h[e][2]);
                    this.mouse.targets[0].Zstart.push(h[e][0])
                }
                if (d && d.preventDefault) {
                    d.preventDefault()
                } else {
                    if (window.event) {
                        window.event.returnValue = false
                    }
                }
            }
        }
        this.triggerEventHandlers(["mousedown", "down"], d);
        return f
    },
    mouseUpListener: function (d) {
        var e;
        this.triggerEventHandlers(["mouseup", "up"], d);
        this.updateQuality = this.BOARD_QUALITY_HIGH;
        if (this.mouse && this.mouse.obj) {
            this.mouse.obj.snapToGrid()
        }
        this.originMoveEnd();
        this.dehighlightAll();
        this.update();
        for (e = 0; e < this.downObjects.length; e++) {
            this.downObjects[e].triggerEventHandlers(["mouseup", "up"], d)
        }
        this.downObjects.length = 0;
        if (this.hasMouseUp) {
            JXG.removeEvent(document, "mouseup", this.mouseUpListener, this);
            this.hasMouseUp = false
        }
        this.mouse = null
    },
    mouseMoveListener: function (d) {
        var e;
        e = this.getMousePosition(d);
        this.updateQuality = this.BOARD_QUALITY_LOW;
        if (this.mode != this.BOARD_MODE_DRAG) {
            this.dehighlightAll();
            this.renderer.hide(this.infobox)
        }
        if (!this.mouseOriginMove(d)) {
            if (this.mode == this.BOARD_MODE_DRAG) {
                this.moveObject(e[0], e[1], this.mouse, d, "mouse")
            } else {
                this.highlightElements(e[0], e[1], d, - 1)
            }
        }
        this.updateQuality = this.BOARD_QUALITY_HIGH;
        this.triggerEventHandlers(["mousemove", "move"], d, this.mode)
    },
    mouseWheelListener: function (d) {
        if (!this.options.zoom.wheel) {
            return true
        }
        d = d || window.event;
        var e = d.detail ? d.detail * (-1) : d.wheelDelta / 40,
            f = new JXG.Coords(JXG.COORDS_BY_SCREEN, this.getMousePosition(d), this);
        if (e > 0) {
            this.zoomIn(f.usrCoords[1], f.usrCoords[2])
        } else {
            this.zoomOut(f.usrCoords[1], f.usrCoords[2])
        }
        d.preventDefault();
        return false
    },
    updateInfobox: function (e) {
        var d, h, f, g;
        if (!e.visProp.showinfobox) {
            return this
        }
        if (e.elementClass == JXG.OBJECT_CLASS_POINT) {
            f = e.coords.usrCoords[1];
            g = e.coords.usrCoords[2];
            this.infobox.setCoords(f + this.infobox.distanceX / (this.unitX), g + this.infobox.distanceY / (this.unitY));
            if (typeof (e.infoboxText) != "string") {
                if (e.visProp.infoboxdigits === "auto") {
                    d = JXG.autoDigits(f);
                    h = JXG.autoDigits(g)
                } else {
                    if (JXG.isNumber(e.visProp.infoboxdigits)) {
                        d = f.toFixed(e.visProp.infoboxdigits);
                        h = g.toFixed(e.visProp.infoboxdigits)
                    } else {
                        d = f;
                        h = g
                    }
                }
                this.highlightInfobox(d, h, e)
            } else {
                this.highlightCustomInfobox(e.infoboxText, e)
            }
            this.renderer.show(this.infobox)
        }
        return this
    },
    highlightCustomInfobox: function (d) {
        this.infobox.setText(d);
        return this
    },
    highlightInfobox: function (d, f, e) {
        this.highlightCustomInfobox("(" + d + ", " + f + ")");
        return this
    },
    dehighlightAll: function () {
        var e, f, d = false;
        for (e in this.highlightedObjects) {
            f = this.highlightedObjects[e];
            if (this.hasMouseHandlers) {
                f.noHighlight()
            }
            d = true
        }
        this.highlightedObjects = {};
        if (this.options.renderer == "canvas" && d) {
            this.prepareUpdate();
            this.renderer.suspendRedraw(this);
            this.updateRenderer();
            this.renderer.unsuspendRedraw()
        }
        return this
    },
    getScrCoordsOfMouse: function (d, e) {
        return [d, e]
    },
    getUsrCoordsOfMouse: function (f) {
        var g = this.getCoordsTopLeftCorner(),
            e = JXG.getPosition(f),
            d = e[0] - g[0],
            i = e[1] - g[1],
            h = new JXG.Coords(JXG.COORDS_BY_SCREEN, [d, i], this);
        return h.usrCoords.slice(1)
    },
    getAllUnderMouse: function (d) {
        var e = this.getAllObjectsUnderMouse(d);
        e.push(this.getUsrCoordsOfMouse(d));
        return e
    },
    getAllObjectsUnderMouse: function (i) {
        var j = this.getCoordsTopLeftCorner(),
            d = JXG.getPosition(i),
            l = d[0] - j[0],
            k = d[1] - j[1],
            g = [],
            e, h, f = this.objectsList.length;
        for (e = 0; e < f; e++) {
            h = this.objectsList[e];
            if (h.visProp.visible && h.hasPoint && h.hasPoint(l, k)) {
                g[g.length] = h
            }
        }
        return g
    },
    moveOrigin: function (e, h) {
        var g, f, d = this.objectsList.length;
        if (JXG.exists(e) && JXG.exists(h)) {
            this.origin.scrCoords[1] = e;
            this.origin.scrCoords[2] = h;
            if (this.mode === this.BOARD_MODE_MOVE_ORIGIN) {
                this.origin.scrCoords[1] -= this.drag_dx;
                this.origin.scrCoords[2] -= this.drag_dy
            }
        }
        for (f = 0; f < d; f++) {
            g = this.objectsList[f];
            if (!g.visProp.frozen && (g.elementClass == JXG.OBJECT_CLASS_POINT || g.elementClass == JXG.OBJECT_CLASS_CURVE || g.type == JXG.OBJECT_TYPE_AXIS || g.type == JXG.OBJECT_TYPE_TEXT)) {
                if (g.elementClass != JXG.OBJECT_CLASS_CURVE && g.type != JXG.OBJECT_TYPE_AXIS) {
                    g.coords.usr2screen()
                }
            }
        }
        this.clearTraces();
        this.fullUpdate();
        return this
    },
    addConditions: function (o) {
        var e = "var el, x, y, c, rgbo;\n",
            n = o.indexOf("<data>"),
            l = o.indexOf("</data>"),
            k, h, g, q, d, f;
        if (n < 0) {
            return
        }
        while (n >= 0) {
            k = o.slice(n + 6, l);
            h = k.indexOf("=");
            g = k.slice(0, h);
            q = k.slice(h + 1);
            h = g.indexOf(".");
            d = g.slice(0, h);
            f = this.elementsByName[JXG.unescapeHTML(d)];
            var p = g.slice(h + 1).replace(/\s+/g, "").toLowerCase();
            q = JXG.GeonextParser.geonext2JS(q, this);
            q = q.replace(/this\.board\./g, "this.");
            if (!JXG.exists(this.elementsByName[d])) {
                JXG.debug("debug conditions: |" + d + "| undefined")
            }
            e += 'el = this.objects["' + f.id + '"];\n';
            switch (p) {
                case "x":
                    e += "var y=el.coords.usrCoords[2];\n";
                    e += "el.setPositionDirectly(JXG.COORDS_BY_USER,[" + (q) + ",y]);\n";
                    e += "el.prepareUpdate().update();\n";
                    break;
                case "y":
                    e += "var x=el.coords.usrCoords[1];\n";
                    e += "el.coords=new JXG.Coords(JXG.COORDS_BY_USER,[x," + (q) + "],this);\n";
                    e += "el.setPositionDirectly(JXG.COORDS_BY_USER,[x," + (q) + "]);\n";
                    e += "el.prepareUpdate().update();\n";
                    break;
                case "visible":
                    e += "var c=" + (q) + ";\n";
                    e += "el.visProp.visible = c;\n";
                    e += "if (c) {el.showElement();} else {el.hideElement();}\n";
                    break;
                case "position":
                    e += "el.position = " + (q) + ";\n";
                    e += "el.prepareUpdate().update(true);\n";
                    break;
                case "stroke":
                    e += "rgbo = JXG.rgba2rgbo(" + (q) + ");\n";
                    e += "el.visProp.strokecolor = rgbo[0];\n";
                    e += "el.visProp.strokeopacity = rgbo[1];\n";
                    break;
                case "style":
                    e += "el.setStyle(" + (q) + ");\n";
                    break;
                case "strokewidth":
                    e += "el.strokeWidth = " + (q) + ";\n";
                    break;
                case "fill":
                    e += "var rgbo = JXG.rgba2rgbo(" + (q) + ");\n";
                    e += "el.visProp.fillcolor = rgbo[0];\n";
                    e += "el.visProp.fillopacity = rgbo[1];\n";
                    break;
                case "label":
                    break;
                default:
                    JXG.debug("property '" + p + "' in conditions not yet implemented:" + q);
                    break
            }
            o = o.slice(l + 7);
            n = o.indexOf("<data>");
            l = o.indexOf("</data>")
        }
        e += "this.prepareUpdate().updateElements();\n";
        e += "return true;\n";
        e = e.replace(/&lt;/g, "<");
        e = e.replace(/&gt;/g, ">");
        e = e.replace(/&amp;/g, "&");
        this.updateConditions = new Function(e);
        this.updateConditions()
    },
    updateConditions: function () {
        return false
    },
    calculateSnapSizes: function () {
        var f = new JXG.Coords(JXG.COORDS_BY_USER, [0, 0], this),
            e = new JXG.Coords(JXG.COORDS_BY_USER, [this.options.grid.gridX, this.options.grid.gridY], this),
            d = f.scrCoords[1] - e.scrCoords[1],
            g = f.scrCoords[2] - e.scrCoords[2];
        this.options.grid.snapSizeX = this.options.grid.gridX;
        while (Math.abs(d) > 25) {
            this.options.grid.snapSizeX *= 2;
            d /= 2
        }
        this.options.grid.snapSizeY = this.options.grid.gridY;
        while (Math.abs(g) > 25) {
            this.options.grid.snapSizeY *= 2;
            g /= 2
        }
        return this
    },
    applyZoom: function () {
        var f, e, d = this.objectsList.length;
        for (e = 0; e < d; e++) {
            f = this.objectsList[e];
            if (!f.visProp.frozen && (f.elementClass == JXG.OBJECT_CLASS_POINT || f.elementClass == JXG.OBJECT_CLASS_CURVE || f.type == JXG.OBJECT_TYPE_AXIS || f.type == JXG.OBJECT_TYPE_TEXT)) {
                if (f.elementClass != JXG.OBJECT_CLASS_CURVE && f.type != JXG.OBJECT_TYPE_AXIS) {
                    f.coords.usr2screen()
                }
            }
        }
        this.calculateSnapSizes();
        this.clearTraces();
        this.fullUpdate();
        return this
    },
    zoomIn: function (l, j) {
        var g = this.getBoundingBox(),
            k = this.options.zoom.factorX,
            i = this.options.zoom.factorY,
            e = (g[2] - g[0]) * (1 - 1 / k),
            d = (g[1] - g[3]) * (1 - 1 / i),
            f = 0.5,
            h = 0.5;
        if (typeof l === "number" && typeof j === "number") {
            f = (l - g[0]) / (g[2] - g[0]);
            h = (g[1] - j) / (g[1] - g[3])
        }
        this.setBoundingBox([g[0] + e * f, g[1] - d * h, g[2] - e * (1 - f), g[3] + d * (1 - h)], false);
        this.zoomX *= k;
        this.zoomY *= i;
        this.applyZoom();
        return this
    },
    zoomOut: function (l, j) {
        var g = this.getBoundingBox(),
            k = this.options.zoom.factorX,
            i = this.options.zoom.factorY,
            e = (g[2] - g[0]) * (1 - k),
            d = (g[1] - g[3]) * (1 - i),
            f = 0.5,
            h = 0.5;
        if (typeof l === "number" && typeof j === "number") {
            f = (l - g[0]) / (g[2] - g[0]);
            h = (g[1] - j) / (g[1] - g[3])
        }
        this.setBoundingBox([g[0] + e * f, g[1] - d * h, g[2] - e * (1 - f), g[3] + d * (1 - h)], false);
        this.zoomX /= k;
        this.zoomY /= i;
        this.applyZoom();
        return this
    },
    zoom100: function () {
        var f = this.getBoundingBox(),
            e = (f[2] - f[0]) * (1 - this.zoomX) * 0.5,
            d = (f[1] - f[3]) * (1 - this.zoomY) * 0.5;
        this.setBoundingBox([f[0] + e, f[1] - d, f[2] - e, f[3] + d], false);
        this.zoomX = 1;
        this.zoomY = 1;
        this.applyZoom();
        return this
    },
    zoomAllPoints: function () {
        var h = 0,
            e = 0,
            g = 0,
            d = 0,
            f, i, m, l, j = this.objectsList.length,
            k;
        for (f = 0; f < j; f++) {
            k = this.objectsList[f];
            if (JXG.isPoint(k) && k.visProp.visible) {
                if (k.coords.usrCoords[1] < h) {
                    h = k.coords.usrCoords[1]
                } else {
                    if (k.coords.usrCoords[1] > e) {
                        e = k.coords.usrCoords[1]
                    }
                }
                if (k.coords.usrCoords[2] > d) {
                    d = k.coords.usrCoords[2]
                } else {
                    if (k.coords.usrCoords[2] < g) {
                        g = k.coords.usrCoords[2]
                    }
                }
            }
        }
        i = 50;
        m = i / (this.unitX);
        l = i / (this.unitY);
        this.zoomX = 1;
        this.zoomY = 1;
        this.setBoundingBox([h - m, d + l, e + m, g - l], true);
        this.applyZoom();
        return this
    },
    zoomElements: function (l) {
        var h, g, m, k, f = [0, 0, 0, 0],
            d = [1, - 1, - 1, 1];
        if (!JXG.isArray(l) || l.length === 0) {
            return this
        }
        for (h = 0; h < l.length; h++) {
            m = JXG.getRef(this, l[h]);
            k = m.bounds();
            if (JXG.isArray(k)) {
                if (JXG.isArray(f)) {
                    for (g = 0; g < 4; g++) {
                        if (d[g] * k[g] < d[g] * f[g]) {
                            f[g] = k[g]
                        }
                    }
                } else {
                    f = k
                }
            }
        }
        if (JXG.isArray(f)) {
            for (g = 0; g < 4; g++) {
                f[g] -= d[g]
            }
            this.zoomX = 1;
            this.zoomY = 1;
            this.setBoundingBox(f, true)
        }
        return this
    },
    setZoom: function (g, f) {
        var e = this.options.zoom.factorX,
            d = this.options.zoom.factorY;
        this.options.zoom.factorX = g / this.zoomX;
        this.options.zoom.factorY = f / this.zoomY;
        this.zoomIn();
        this.options.zoom.factorX = e;
        this.options.zoom.factorY = d;
        return this
    },
    removeObject: function (d) {
        var g, f;
        if (JXG.isArray(d)) {
            for (f = 0; f < d.length; f++) {
                this.removeObject(d[f])
            }
        }
        d = JXG.getReference(this, d);
        if (!JXG.exists(d)) {
            return this
        }
        try {
            for (g in d.childElements) {
                d.childElements[g].board.removeObject(d.childElements[g])
            }
            for (g in this.objects) {
                if (JXG.exists(this.objects[g].childElements)) {
                    delete(this.objects[g].childElements[d.id]);
                    delete(this.objects[g].descendants[d.id])
                }
            }
            if (d._pos > -1) {
                this.objectsList.splice(d._pos, 1);
                for (g = d._pos; g < this.objectsList.length; g++) {
                    this.objectsList[g]._pos--
                }
            } else {
                JXG.debug("object " + d.id + " not found in list.")
            }
            delete(this.objects[d.id]);
            delete(this.elementsByName[d.name]);
            if (d.visProp && d.visProp.trace) {
                d.clearTrace()
            }
            if (JXG.exists(d.remove)) {
                d.remove()
            }
        } catch (h) {
            JXG.debug(d.id + ": Could not be removed: " + h)
        }
        this.update();
        return this
    },
    removeAncestors: function (d) {
        for (var e in d.ancestors) {
            this.removeAncestors(d.ancestors[e])
        }
        this.removeObject(d);
        return this
    },
    initGeonextBoard: function () {
        var h, g, f, e, d;
        h = this.create("point", [0, 0], {
            id: this.id + "g00e0",
            name: "Ursprung",
            withLabel: false,
            visible: false,
            fixed: true
        });
        g = this.create("point", [1, 0], {
            id: this.id + "gX0e0",
            name: "Punkt_1_0",
            withLabel: false,
            visible: false,
            fixed: true
        });
        f = this.create("point", [0, 1], {
            id: this.id + "gY0e0",
            name: "Punkt_0_1",
            withLabel: false,
            visible: false,
            fixed: true
        });
        e = this.create("line", [h, g], {
            id: this.id + "gXLe0",
            name: "X-Achse",
            withLabel: false,
            visible: false
        });
        d = this.create("line", [h, f], {
            id: this.id + "gYLe0",
            name: "Y-Achse",
            withLabel: false,
            visible: false
        });
        return this
    },
    initInfobox: function () {
        var d = JXG.copyAttributes({}, this.options, "infobox");
        d.id = this.id + "_infobox";
        this.infobox = this.create("text", [0, 0, "0,0"], d);
        this.infobox.distanceX = -20;
        this.infobox.distanceY = 25;
        this.infobox.needsUpdateSize = false;
        this.infobox.dump = false;
        this.renderer.hide(this.infobox);
        return this
    },
    resizeContainer: function (d, e) {
        this.canvasWidth = parseFloat(d);
        this.canvasHeight = parseFloat(e);
        this.containerObj.style.width = (this.canvasWidth) + "px";
        this.containerObj.style.height = (this.canvasHeight) + "px";
        this.renderer.resize(this.canvasWidth, this.canvasHeight);
        return this
    },
    showDependencies: function () {
        var g, e, j, h, d;
        e = "<p>\n";
        for (g in this.objects) {
            d = 0;
            for (j in this.objects[g].childElements) {
                d++
            }
            if (d >= 0) {
                e += "<b>" + this.objects[g].id + ":</b> "
            }
            for (j in this.objects[g].childElements) {
                e += this.objects[g].childElements[j].id + "(" + this.objects[g].childElements[j].name + "), "
            }
            e += "<p>\n"
        }
        e += "</p>\n";
        h = window.open();
        h.document.open();
        h.document.write(e);
        h.document.close();
        return this
    },
    showXML: function () {
        var d = window.open("");
        d.document.open();
        d.document.write("<pre>" + JXG.escapeHTML(this.xmlString) + "</pre>");
        d.document.close();
        return this
    },
    prepareUpdate: function () {
        var e, f, d = this.objectsList.length;
        for (e = 0; e < d; e++) {
            f = this.objectsList[e];
            f.needsUpdate = f.needsRegularUpdate || this.needsFullUpdate
        }
        return this
    },
    updateElements: function (e) {
        var d, f;
        e = JXG.getRef(this, e);
        for (d = 0; d < this.objectsList.length; d++) {
            f = this.objectsList[d];
            f.update(!JXG.exists(e) || f.id !== e.id)
        }
        return this
    },
    updateRenderer: function (f) {
        var e, g, d = this.objectsList.length;
        if (this.options.renderer == "canvas") {
            this.updateRendererCanvas(f)
        } else {
            for (e = 0; e < d; e++) {
                g = this.objectsList[e];
                g.updateRenderer()
            }
        }
        return this
    },
    updateRendererCanvas: function (h) {
        var d, m, g, l = this.objectsList.length,
            f = this.options.layer,
            k = this.options.layer.numlayers,
            n = Number.NEGATIVE_INFINITY,
            j, e;
        for (g = 0; g < k; g++) {
            j = Number.POSITIVE_INFINITY;
            for (e in f) {
                if (f[e] > n && f[e] < j) {
                    j = f[e]
                }
            }
            n = j;
            for (d = 0; d < l; d++) {
                m = this.objectsList[d];
                if (m.visProp.layer === j) {
                    m.prepareUpdate().updateRenderer()
                }
            }
        }
        return this
    },
    addHook: function (f, d, e) {
        d = JXG.def(d, "update");
        e = JXG.def(e, this);
        this.hooks.push([d, f]);
        this.on(d, f, e);
        return this.hooks.length - 1
    },
    on: function (f, e, d) {
        d = JXG.def(d, this);
        if (!JXG.isArray(this.eventHandlers[f])) {
            this.eventHandlers[f] = []
        }
        this.eventHandlers[f].push({
            handler: e,
            context: d
        });
        return this
    },
    addEvent: JXG.shortcut(JXG.Board.prototype, "on"),
    removeHook: function (d) {
        if (this.hooks[d]) {
            this.off(this.hooks[d][0], this.hooks[d][1]);
            this.hooks[d] = null
        }
        return this
    },
    off: function (f, e) {
        var d;
        if (!f || !JXG.isArray(this.eventHandlers[f])) {
            return
        }
        if (e) {
            d = JXG.indexOf(this.eventHandlers[f], e, "handler");
            if (d > -1) {
                this.eventHandlers[f].splice(d, 1)
            }
        } else {
            this.eventHandlers[f].length = 0
        }
        return this
    },
    removeEvent: JXG.shortcut(JXG.Board.prototype, "off"),
    updateHooks: function (d) {
        arguments[0] = JXG.def(arguments[0], "update");
        this.triggerEventHandlers.apply(this, arguments);
        return this
    },
    triggerEventHandlers: function (l) {
        var g, f, k, d, e = Array.prototype.slice.call(arguments, 1);
        if (!JXG.isArray(l)) {
            l = [l]
        }
        for (f = 0; f < l.length; f++) {
            d = l[f];
            if (JXG.isArray(this.eventHandlers[d])) {
                for (g = 0; g < this.eventHandlers[d].length; g++) {
                    k = this.eventHandlers[d][g];
                    k.handler.apply(k.context, e)
                }
            }
        }
        return this
    },
    addChild: function (d) {
        this.dependentBoards.push(d);
        this.update();
        return this
    },
    removeChild: function (e) {
        var d;
        for (d = this.dependentBoards.length - 1; d >= 0; d--) {
            if (this.dependentBoards[d] == e) {
                this.dependentBoards.splice(d, 1)
            }
        }
        return this
    },
    update: function (g) {
        var f, e, h, d;
        if (this.inUpdate || this.isSuspendedUpdate) {
            return this
        }
        this.inUpdate = true;
        this.prepareUpdate(g).updateElements(g).updateConditions();
        this.renderer.suspendRedraw(this);
        this.updateRenderer(g);
        this.renderer.unsuspendRedraw();
        this.triggerEventHandlers("update");
        e = this.dependentBoards.length;
        for (f = 0; f < e; f++) {
            h = this.dependentBoards[f].id;
            d = JXG.JSXGraph.boards[h];
            if (d != this) {
                d.updateQuality = this.updateQuality;
                d.prepareUpdate().updateElements().updateConditions();
                d.renderer.suspendRedraw();
                d.updateRenderer();
                d.renderer.unsuspendRedraw();
                d.triggerEventHandlers("update")
            }
        }
        this.inUpdate = false;
        return this
    },
    fullUpdate: function () {
        this.needsFullUpdate = true;
        this.update();
        this.needsFullUpdate = false;
        return this
    },
    addGrid: function () {
        this.create("grid", []);
        return this
    },
    removeGrids: function () {
        var d;
        for (d = 0; d < this.grids.length; d++) {
            this.removeObject(this.grids[d])
        }
        this.grids.length = 0;
        this.update();
        return this
    },
    create: function (e, f, d) {
        var h, g;
        e = e.toLowerCase();
        if (!JXG.exists(f)) {
            f = []
        }
        if (!JXG.exists(d)) {
            d = {}
        }
        for (g = 0; g < f.length; g++) {
            if (e != "text" || g != 2) {
                f[g] = JXG.getReference(this, f[g])
            }
        }
        if (JXG.JSXGraph.elements[e] != null) {
            if (typeof JXG.JSXGraph.elements[e] == "function") {
                h = JXG.JSXGraph.elements[e](this, f, d)
            } else {
                h = JXG.JSXGraph.elements[e].creator(this, f, d)
            }
        } else {
            throw new Error("JSXGraph: JXG.createElement: Unknown element type given: " + e)
        }
        if (!JXG.exists(h)) {
            JXG.debug("JSXGraph: JXG.createElement: failure creating " + e);
            return h
        }
        if (h.prepareUpdate && h.update && h.updateRenderer) {
            h.prepareUpdate().update().updateRenderer()
        }
        return h
    },
    createElement: JXG.shortcut(JXG.Board.prototype, "create"),
    clearTraces: function () {
        var d;
        for (d = 0; d < this.objectsList.length; d++) {
            this.objectsList[d].clearTrace()
        }
        this.numTraces = 0;
        return this
    },
    suspendUpdate: function () {
        this.isSuspendedUpdate = true;
        return this
    },
    unsuspendUpdate: function () {
        this.isSuspendedUpdate = false;
        this.update();
        return this
    },
    setBoundingBox: function (i, e) {
        if (!JXG.isArray(i)) {
            return this
        }
        var f, d, g = JXG.getDimensions(this.container);
        this.canvasWidth = parseInt(g.width);
        this.canvasHeight = parseInt(g.height);
        d = this.canvasWidth;
        f = this.canvasHeight;
        if (e) {
            this.unitX = d / (i[2] - i[0]);
            this.unitY = f / (i[1] - i[3]);
            if (Math.abs(this.unitX) < Math.abs(this.unitY)) {
                this.unitY = Math.abs(this.unitX) * this.unitY / Math.abs(this.unitY)
            } else {
                this.unitX = Math.abs(this.unitY) * this.unitX / Math.abs(this.unitX)
            }
        } else {
            this.unitX = d / (i[2] - i[0]);
            this.unitY = f / (i[1] - i[3])
        }
        this.moveOrigin(-this.unitX * i[0], this.unitY * i[1]);
        return this
    },
    getBoundingBox: function () {
        var e = new JXG.Coords(JXG.COORDS_BY_SCREEN, [0, 0], this),
            d = new JXG.Coords(JXG.COORDS_BY_SCREEN, [this.canvasWidth, this.canvasHeight], this);
        return [e.usrCoords[1], e.usrCoords[2], d.usrCoords[1], d.usrCoords[2]]
    },
    addAnimation: function (d) {
        var e = this;
        this.animationObjects[d.id] = d;
        if (!this.animationIntervalCode) {
            this.animationIntervalCode = setInterval(function () {
                JXG.JSXGraph.boards[e.id].animate()
            }, d.board.options.animationDelay)
        }
        return this
    },
    stopAllAnimation: function () {
        var d;
        for (d in this.animationObjects) {
            if (this.animationObjects[d] === null) {
                continue
            }
            this.animationObjects[d] = null;
            delete(this.animationObjects[d])
        }
        clearInterval(this.animationIntervalCode);
        delete(this.animationIntervalCode);
        return this
    },
    animate: function () {
        var j = 0,
            g, f, l, d, e, k, i = null,
            h;
        for (g in this.animationObjects) {
            if (this.animationObjects[g] === null) {
                continue
            }
            j++;
            f = this.animationObjects[g];
            if (f.animationPath) {
                if (JXG.isFunction(f.animationPath)) {
                    l = f.animationPath(new Date().getTime() - f.animationStart)
                } else {
                    l = f.animationPath.pop()
                }
                if ((!JXG.exists(l)) || (!JXG.isArray(l) && isNaN(l))) {
                    delete(f.animationPath)
                } else {
                    f.setPositionDirectly(JXG.COORDS_BY_USER, l);
                    f.prepareUpdate().update().updateRenderer();
                    i = f
                }
            }
            if (f.animationData) {
                k = 0;
                for (d in f.animationData) {
                    e = f.animationData[d].pop();
                    if (!JXG.exists(e)) {
                        delete(f.animationData[e])
                    } else {
                        k++;
                        f.setProperty(d + ":" + e)
                    }
                }
                if (k == 0) {
                    delete(f.animationData)
                }
            }
            if (!JXG.exists(f.animationData) && !JXG.exists(f.animationPath)) {
                this.animationObjects[g] = null;
                delete(this.animationObjects[g]);
                if (JXG.exists(f.animationCallback)) {
                    h = f.animationCallback;
                    f.animationCallback = null;
                    h()
                }
            }
        }
        if (j == 0) {
            clearInterval(this.animationIntervalCode);
            delete(this.animationIntervalCode)
        } else {
            this.update(i)
        }
        return this
    },
    migratePoint: function (h, d) {
        var k, g, j, f, e;
        h = JXG.getRef(this, h);
        d = JXG.getRef(this, d);
        for (g in h.childElements) {
            k = h.childElements[g];
            f = false;
            for (j in k) {
                if (k[j] === h) {
                    k[j] = d;
                    f = true
                }
            }
            if (f) {
                delete h.childElements[g]
            }
            for (e = 0; e < k.parents.length; e++) {
                if (k.parents[e] === h.id) {
                    k.parents[e] = d.id
                }
            }
            d.addChild(k)
        }
        this.removeObject(h);
        this.update();
        return this
    },
    emulateColorblindness: function (d) {
        var f, g, h = this;
        if (!JXG.exists(d)) {
            d = "none"
        }
        if (this.currentCBDef == d) {
            return this
        }
        for (f in h.objects) {
            g = h.objects[f];
            if (d != "none") {
                if (this.currentCBDef == "none") {
                    g.visPropOriginal = {
                        strokecolor: g.visProp.strokecolor,
                        fillcolor: g.visProp.fillcolor,
                        highlightstrokecolor: g.visProp.highlightstrokecolor,
                        highlightfillcolor: g.visProp.highlightfillcolor
                    }
                }
                g.setProperty({
                    strokecolor: JXG.rgb2cb(g.visPropOriginal.strokecolor, d),
                    fillcolor: JXG.rgb2cb(g.visPropOriginal.fillcolor, d),
                    highlightstrokecolor: JXG.rgb2cb(g.visPropOriginal.highlightstrokecolor, d),
                    highlightfillcolor: JXG.rgb2cb(g.visPropOriginal.highlightfillcolor, d)
                })
            } else {
                if (JXG.exists(g.visPropOriginal)) {
                    JXG.extend(g.visProp, g.visPropOriginal)
                }
            }
        }
        this.currentCBDef = d;
        this.update();
        return this
    },
    getPartialConstruction: function (d) {
        var f, e;
        for (e = 1; e < arguments.length; e++) {
            f.push(arguments[e])
        }
    },
    createRoulette: function (h, g, l, i, k, e, j) {
        var f = this;
        var d = function () {
            var s = 0,
                w = 0,
                v = 0,
                u = l,
                t = JXG.Math.Numerics.root(function (G) {
                    var I = h.X(u),
                        H = h.Y(u),
                        F = g.X(G),
                        E = g.Y(G);
                    return (I - F) * (I - F) + (H - E) * (H - E)
                }, [0, Math.PI * 2]),
                p = 0,
                m = 0,
                B, C = f.create("transform", [function () {
                    return s
                }], {
                    type: "rotate"
                }),
                o = f.create("transform", [function () {
                    return s
                }, function () {
                    return h.X(u)
                }, function () {
                    return h.Y(u)
                }], {
                    type: "rotate"
                }),
                r = f.create("transform", [function () {
                    return w
                }, function () {
                    return v
                }], {
                    type: "translate"
                }),
                z = function (N, P, O) {
                    var M = JXG.Math.Numerics.D(N.X)(P),
                        G = JXG.Math.Numerics.D(N.Y)(P),
                        L = JXG.Math.Numerics.D(N.X)(O),
                        F = JXG.Math.Numerics.D(N.Y)(O),
                        I = JXG.Math.Numerics.D(N.X)((P + O) * 0.5),
                        K = JXG.Math.Numerics.D(N.Y)((P + O) * 0.5),
                        J = Math.sqrt(M * M + G * G),
                        H = Math.sqrt(L * L + F * F),
                        E = Math.sqrt(I * I + K * K);
                    return (J + 4 * E + H) * (O - P) / 6
                }, D = function (E) {
                    return B - z(g, t, E)
                }, A = Math.PI / 18,
                n = A * 9,
                q = null;
            this.rolling = function () {
                p = u + k * i;
                B = z(h, u, p);
                m = JXG.Math.Numerics.root(D, t);
                var F = new JXG.Complex(h.X(p), h.Y(p));
                var G = new JXG.Complex(g.X(m), g.Y(m));
                var H = new JXG.Complex(JXG.Math.Numerics.D(h.X)(p), JXG.Math.Numerics.D(h.Y)(p));
                var E = new JXG.Complex(JXG.Math.Numerics.D(g.X)(m), JXG.Math.Numerics.D(g.Y)(m));
                var I = JXG.C.div(H, E);
                s = Math.atan2(I.imaginary, I.real);
                I.div(JXG.C.abs(I));
                I.mult(G);
                w = F.real - I.real;
                v = F.imaginary - I.imaginary;
                if (s < -A && s > -n) {
                    s = -A;
                    o.applyOnce(j)
                } else {
                    if (s > A && s < n) {
                        s = A;
                        o.applyOnce(j)
                    } else {
                        C.applyOnce(j);
                        r.applyOnce(j);
                        u = p;
                        t = m
                    }
                }
                f.update()
            };
            this.start = function () {
                if (e > 0) {
                    q = setInterval(this.rolling, e)
                }
                return this
            };
            this.stop = function () {
                clearInterval(q);
                return this
            };
            return this
        };
        return new d()
    }
});
JXG.Options = {
    showCopyright: true,
    showNavigation: true,
    takeSizeFromFile: false,
    renderer: "svg",
    takeFirst: false,
    pan: true,
    animationDelay: 35,
    zoom: {
        factorX: 1.25,
        factorY: 1.25,
        wheel: false
    },
    jc: {
        enabled: true,
        compile: true
    },
    navbar: {
        strokeColor: "#aaaaaa",
        fillColor: "#f5f5f5",
        padding: "2px",
        position: "absolute",
        fontSize: "10px",
        cursor: "pointer",
        zIndex: "100",
        right: "5px",
        bottom: "5px"
    },
    elements: {
        strokeColor: "#0000ff",
        highlightStrokeColor: "#C3D9FF",
        fillColor: "red",
        highlightFillColor: "none",
        strokeOpacity: 1,
        highlightStrokeOpacity: 1,
        fillOpacity: 1,
        highlightFillOpacity: 1,
        strokeWidth: 2,
        highlightStrokeWidth: 2,
        fixed: false,
        frozen: false,
        withLabel: false,
        visible: true,
        priv: false,
        layer: 0,
        dash: 0,
        shadow: false,
        trace: false,
        traceAttributes: {},
        highlight: true,
        needsRegularUpdate: true,
        snapToGrid: false,
        draft: {
            draft: false,
            strokeColor: "#565656",
            fillColor: "#565656",
            strokeOpacity: 0.8,
            fillOpacity: 0.8,
            strokeWidth: 1
        }
    },
    ticks: {
        drawLabels: false,
        label: {},
        drawZero: false,
        insertTicks: false,
        minTicksDistance: 50,
        minorHeight: 4,
        majorHeight: 10,
        minorTicks: 4,
        scale: 1,
        scaleSymbol: "",
        labels: [],
        ticksDistance: 1,
        strokeOpacity: 1,
        strokeWidth: 1,
        strokeColor: "black",
        highlightStrokeColor: "#888888"
    },
    precision: {
        touch: 30,
        touchMax: 100,
        mouse: 4,
        epsilon: 0.0001,
        hasPoint: 4
    },
    layer: {
        numlayers: 20,
        text: 9,
        point: 9,
        glider: 9,
        arc: 8,
        line: 7,
        circle: 6,
        curve: 5,
        turtle: 5,
        polygon: 3,
        sector: 3,
        angle: 3,
        integral: 3,
        axis: 2,
        grid: 1,
        image: 0,
        trace: 0
    },
    angle: {
        withLabel: true,
        radius: 0.5,
        type: "sector",
        orthoType: "square",
        orthoSensitivity: 1,
        fillColor: "#FF7F00",
        highlightFillColor: "#FF7F00",
        strokeColor: "#FF7F00",
        fillOpacity: 0.3,
        highlightFillOpacity: 0.3,
        radiuspoint: {
            withLabel: false,
            visible: false,
            name: ""
        },
        pointsquare: {
            withLabel: false,
            visible: false,
            name: ""
        },
        dot: {
            visible: false,
            strokeColor: "none",
            fillColor: "black",
            size: 2,
            face: "o",
            withLabel: false,
            name: ""
        },
        label: {
            position: "top",
            offset: [0, 0],
            strokeColor: "#0000FF"
        }
    },
    arc: {
        label: {},
        firstArrow: false,
        lastArrow: false,
        fillColor: "none",
        highlightFillColor: "none",
        strokeColor: "#0000ff",
        highlightStrokeColor: "#C3D9FF",
        useDirection: false
    },
    axis: {
        needsRegularUpdate: false,
        strokeWidth: 1,
        strokeColor: "#666666",
        highlightStrokeWidth: 1,
        highlightStrokeColor: "#888888",
        withTicks: true,
        straightFirst: true,
        straightLast: true,
        lastArrow: true,
        withLabel: false,
        ticks: {
            label: {
                offset: [4, - 12 + 3]
            },
            needsRegularUpdate: false,
            strokeWidth: 1,
            strokeColor: "#666666",
            highlightStrokeColor: "#888888",
            drawLabels: true,
            drawZero: false,
            insertTicks: true,
            minTicksDistance: 10,
            minorHeight: 4,
            majorHeight: -1,
            minorTicks: 4,
            ticksDistance: 1,
            strokeOpacity: 0.25
        },
        point1: {
            needsRegularUpdate: false
        },
        point2: {
            needsRegularUpdate: false
        },
        label: {
            position: "lft",
            offset: [10, - 20]
        }
    },
    bisector: {
        strokeColor: "#000000",
        point: {
            visible: false,
            fixed: false,
            withLabel: false,
            name: ""
        }
    },
    bisectorlines: {
        line1: {
            strokeColor: "black"
        },
        line2: {
            strokeColor: "black"
        }
    },
    chart: {
        chartStyle: "line",
        colors: ["#B02B2C", "#3F4C6B", "#C79810", "#D15600", "#FFFF88", "#C3D9FF", "#4096EE", "#008C00"],
        highlightcolors: null,
        fillcolor: null,
        highlightonsector: false,
        highlightbysize: false
    },
    circle: {
        fillColor: "none",
        highlightFillColor: "none",
        strokeColor: "#0000ff",
        highlightStrokeColor: "#C3D9FF",
        center: {
            visible: false,
            withLabel: false,
            fixed: false,
            name: ""
        },
        label: {
            position: "urt"
        }
    },
    circumcircle: {
        fillColor: "none",
        highlightFillColor: "none",
        strokeColor: "#0000ff",
        highlightStrokeColor: "#C3D9FF",
        center: {
            visible: false,
            fixed: false,
            withLabel: false,
            name: ""
        }
    },
    circumcirclearc: {
        fillColor: "none",
        highlightFillColor: "none",
        strokeColor: "#0000ff",
        highlightStrokeColor: "#C3D9FF",
        center: {
            visible: false,
            withLabel: false,
            fixed: false,
            name: ""
        }
    },
    circumcirclesector: {
        useDirection: true,
        fillColor: "#00FF00",
        highlightFillColor: "#00FF00",
        fillOpacity: 0.3,
        highlightFillOpacity: 0.3,
        strokeColor: "#0000ff",
        highlightStrokeColor: "#C3D9FF",
        point: {
            visible: false,
            fixed: false,
            withLabel: false,
            name: ""
        }
    },
    conic: {
        fillColor: "none",
        highlightFillColor: "none",
        strokeColor: "#0000ff",
        highlightStrokeColor: "#C3D9FF",
        foci: {
            fixed: false,
            visible: false,
            withLabel: false,
            name: ""
        }
    },
    curve: {
        strokeWidth: 1,
        strokeColor: "#0000ff",
        fillColor: "none",
        handDrawing: false,
        curveType: null,
        RDPsmoothing: false,
        numberPointsHigh: 1600,
        numberPointsLow: 400,
        doAdvancedPlot: true,
        label: {
            position: "lft"
        }
    },
    glider: {
        label: {}
    },
    grid: {
        needsRegularUpdate: false,
        hasGrid: false,
        gridX: 1,
        gridY: 1,
        strokeColor: "#C0C0C0",
        strokeOpacity: "0.5",
        strokeWidth: 1,
        dash: 0,
        snapToGrid: false,
        snapSizeX: 10,
        snapSizeY: 10
    },
    image: {
        imageString: null,
        fillOpacity: 1,
        rotate: 0
    },
    incircle: {
        fillColor: "none",
        highlightFillColor: "none",
        strokeColor: "#0000ff",
        highlightStrokeColor: "#C3D9FF",
        center: {
            visible: false,
            fixed: false,
            withLabel: false,
            name: ""
        }
    },
    infobox: {
        fontSize: 12,
        isLabel: false,
        strokeColor: "#bbbbbb",
        display: "html",
        anchorX: "left",
        anchorY: "middle",
        cssClass: "JXGinfobox",
        rotate: 0,
        visible: true
    },
    integral: {
        withLabel: true,
        strokeWidth: 0,
        strokeOpacity: 0,
        fillOpacity: 0.8,
        curveLeft: {
            visible: true,
            layer: 9
        },
        baseLeft: {
            visible: false,
            fixed: false,
            withLabel: false,
            name: ""
        },
        curveRight: {
            visible: true,
            layer: 9
        },
        baseRight: {
            visible: false,
            fixed: false,
            withLabel: false,
            name: ""
        },
        label: {
            fontSize: 20
        }
    },
    label: {
        strokeColor: "black",
        fixed: true,
        position: "urt",
        offset: [10, 10]
    },
    legend: {
        style: "vertical",
        labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
        colors: ["#B02B2C", "#3F4C6B", "#C79810", "#D15600", "#FFFF88", "#C3D9FF", "#4096EE", "#008C00"]
    },
    line: {
        firstArrow: false,
        lastArrow: false,
        straightFirst: true,
        straightLast: true,
        fillColor: "none",
        highlightFillColor: "none",
        strokeColor: "#0000ff",
        highlightStrokeColor: "#888888",
        withTicks: false,
        point1: {
            visible: false,
            withLabel: false,
            fixed: false,
            name: ""
        },
        point2: {
            visible: false,
            withLabel: false,
            fixed: false,
            name: ""
        },
        ticks: {
            drawLabels: true,
            label: {
                offset: [4, - 12 + 3]
            },
            drawZero: false,
            insertTicks: false,
            minTicksDistance: 50,
            maxTicksDistance: 300,
            minorHeight: 4,
            majorHeight: -1,
            minorTicks: 4,
            defaultDistance: 1,
            strokeOpacity: 0.3
        },
        label: {
            position: "llft"
        }
    },
    locus: {
        translateToOrigin: false,
        translateTo10: false,
        stretch: false,
        toOrigin: null,
        to10: null
    },
    normal: {
        strokeColor: "#000000",
        point: {
            visible: false,
            fixed: false,
            withLabel: false,
            name: ""
        }
    },
    orthogonalprojection: {},
    parallel: {
        strokeColor: "#000000",
        point: {
            visible: false,
            fixed: false,
            withLabel: false,
            name: ""
        }
    },
    perpendicular: {
        strokeColor: "#000000",
        straightFirst: true,
        straightLast: true
    },
    perpendicularsegment: {
        strokeColor: "#000000",
        straightFirst: false,
        straightLast: false,
        point: {
            visible: false,
            fixed: true,
            withLabel: false,
            name: ""
        }
    },
    point: {
        withLabel: true,
        label: {},
        style: 5,
        face: "o",
        size: 3,
        fillColor: "#ff0000",
        highlightFillColor: "#EEEEEE",
        strokeWidth: 2,
        strokeColor: "#ff0000",
        highlightStrokeColor: "#C3D9FF",
        zoom: false,
        showInfobox: true,
        infoboxDigits: "auto",
        draft: false,
        attractors: [],
        attractorDistance: 0,
        snatchDistance: 0,
        snapToGrid: false,
        snapSizeX: 1,
        snapSizeY: 1,
        snapToPoints: false
    },
    polygon: {
        hasInnerPoints: false,
        fillColor: "#00FF00",
        highlightFillColor: "#00FF00",
        fillOpacity: 0.3,
        highlightFillOpacity: 0.3,
        withLines: true,
        borders: {
            withLabel: false,
            strokeWidth: 1,
            highlightStrokeWidth: 1,
            layer: 5
        },
        vertices: {
            withLabel: true,
            strokeColor: "#ff0000",
            fillColor: "#ff0000",
            fixed: true
        },
        label: {
            offset: [0, 0]
        }
    },
    riemannsum: {
        withLabel: false,
        fillOpacity: 0.3,
        fillColor: "#ffff00"
    },
    sector: {
        fillColor: "#00FF00",
        highlightFillColor: "#00FF00",
        fillOpacity: 0.3,
        highlightFillOpacity: 0.3,
        label: {
            offset: [0, 0]
        }
    },
    semicircle: {
        midpoint: {
            visible: false,
            withLabel: false,
            fixed: false,
            name: ""
        }
    },
    slider: {
        snapWidth: -1,
        precision: 2,
        firstArrow: false,
        lastArrow: false,
        withTicks: true,
        withLabel: true,
        layer: 9,
        showInfobox: false,
        name: "",
        visible: true,
        strokeColor: "#000000",
        highlightStrokeColor: "#888888",
        fillColor: "#ffffff",
        highlightFillColor: "none",
        size: 6,
        point1: {
            needsRegularUpdate: false,
            showInfobox: false,
            withLabel: false,
            visible: false,
            fixed: true,
            name: ""
        },
        point2: {
            needsRegularUpdate: false,
            showInfobox: false,
            withLabel: false,
            visible: false,
            fixed: true,
            name: ""
        },
        baseline: {
            needsRegularUpdate: false,
            name: "",
            strokeWidth: 1,
            strokeColor: "#000000",
            highlightStrokeColor: "#888888"
        },
        ticks: {
            needsRegularUpdate: false,
            drawLabels: false,
            drawZero: true,
            insertTicks: true,
            minorHeight: 4,
            majorHeight: 10,
            minorTicks: 0,
            defaultDistance: 1,
            strokeOpacity: 1,
            strokeWidth: 1,
            strokeColor: "#000000"
        },
        highline: {
            strokeWidth: 3,
            name: "",
            strokeColor: "#000000",
            highlightStrokeColor: "#888888"
        },
        label: {
            strokeColor: "#000000"
        }
    },
    text: {
        fontSize: 12,
        digits: 2,
        isLabel: false,
        strokeColor: "#000000",
        useASCIIMathML: false,
        useMathJax: false,
        display: "html",
        anchorX: "left",
        anchorY: "middle",
        cssClass: "JXGtext",
        highlightCssClass: "JXGtext",
        withLabel: false,
        rotate: 0,
        visible: true
    },
    tracecurve: {
        strokeColor: "#000000",
        fillColor: "none",
        numberPoints: 100
    },
    turtle: {
        strokeWidth: 1,
        fillColor: "none",
        strokeColor: "#000000",
        arrow: {
            strokeWidth: 2,
            withLabel: false,
            strokeColor: "#ff0000"
        }
    },
    shortcuts: {
        color: ["strokeColor", "fillColor"],
        opacity: ["strokeOpacity", "fillOpacity"],
        highlightColor: ["highlightStrokeColor", "highlightFillColor"],
        highlightOpacity: ["highlightStrokeOpacity", "highlightFillOpacity"],
        strokeWidth: ["strokeWidth", "highlightStrokeWidth"]
    }
};
JXG.Validator = (function () {
    var k = function (i) {
        return /^[0-9]+px$/.test(i)
    }, m = function (i) {
        return (i in {
            html: 0,
            internal: 0
        })
    }, n = function (i) {
        return JXG.isString(i)
    }, l = function (i) {
        return JXG.exists(JXG.Point.prototype.normalizeFace.call(this, i))
    }, p = function (i) {
        return (Math.abs(i - Math.round(i)) < JXG.Math.eps)
    }, q = function (i) {
        return p(i) && i > 0
    }, h = function (i) {
        return i.length >= 2 && p(i[0]) && p(i[1])
    }, d = function (i) {
        return (i in {
            vml: 0,
            svg: 0,
            canvas: 0
        })
    }, j = function (i) {
        return i > 0
    }, g = function (i) {
        return !(i < 0)
    }, f, o = {}, e = {
        attractorDistance: g,
        color: n,
        defaultDistance: JXG.isNumber,
        display: m,
        doAdvancedPlot: false,
        draft: false,
        drawLabels: false,
        drawZero: false,
        face: l,
        factor: JXG.isNumber,
        fillColor: n,
        fillOpacity: JXG.isNumber,
        firstArrow: false,
        fontSize: p,
        dash: p,
        gridX: JXG.isNumber,
        gridY: JXG.isNumber,
        hasGrid: false,
        highlightFillColor: n,
        highlightFillOpacity: JXG.isNumber,
        highlightStrokeColor: n,
        highlightStrokeOpacity: JXG.isNumber,
        insertTicks: false,
        lastArrow: false,
        majorHeight: p,
        maxTicksDistance: q,
        minorHeight: p,
        minorTicks: q,
        minTicksDistance: q,
        numberPointsHigh: q,
        numberPointsLow: q,
        opacity: JXG.isNumber,
        radius: JXG.isNumber,
        RDPsmoothing: false,
        renderer: d,
        right: k,
        showCopyright: false,
        showInfobox: false,
        showNavigation: false,
        size: p,
        snapSizeX: j,
        snapSizeY: j,
        snapWidth: JXG.isNumber,
        snapToGrid: false,
        snatchDistance: g,
        straightFirst: false,
        straightLast: false,
        stretch: false,
        strokeColor: n,
        strokeOpacity: JXG.isNumber,
        strokeWidth: p,
        takeFirst: false,
        takeSizeFromFile: false,
        to10: false,
        toOrigin: false,
        translateTo10: false,
        translateToOrigin: false,
        useASCIIMathML: false,
        useDirection: false,
        useMathJax: false,
        withLabel: false,
        withTicks: false,
        zoom: false
    };
    for (f in e) {
        o[f.toLowerCase()] = e[f]
    }
    return o
})();
JXG.useStandardOptions = function (h) {
    var j = JXG.Options,
        g = h.hasGrid,
        f, e, i, d;
    h.options.grid.hasGrid = j.grid.hasGrid;
    h.options.grid.gridX = j.grid.gridX;
    h.options.grid.gridY = j.grid.gridY;
    h.options.grid.gridColor = j.grid.gridColor;
    h.options.grid.gridOpacity = j.grid.gridOpacity;
    h.options.grid.gridDash = j.grid.gridDash;
    h.options.grid.snapToGrid = j.grid.snapToGrid;
    h.options.grid.snapSizeX = j.grid.SnapSizeX;
    h.options.grid.snapSizeY = j.grid.SnapSizeY;
    h.takeSizeFromFile = j.takeSizeFromFile;
    d = function (k, l) {
        k.visProp.fillcolor = l.fillColor;
        k.visProp.highlightfillcolor = l.highlightFillColor;
        k.visProp.strokecolor = l.strokeColor;
        k.visProp.highlightstrokecolor = l.highlightStrokeColor
    };
    for (f in h.objects) {
        i = h.objects[f];
        if (i.elementClass == JXG.OBJECT_CLASS_POINT) {
            d(i, j.point)
        } else {
            if (i.elementClass == JXG.OBJECT_CLASS_LINE) {
                d(i, j.line);
                for (e in i.ticks) {
                    e.majorTicks = j.line.ticks.majorTicks;
                    e.minTicksDistance = j.line.ticks.minTicksDistance;
                    e.visProp.minorheight = j.line.ticks.minorHeight;
                    e.visProp.majorheight = j.line.ticks.majorHeight
                }
            } else {
                if (i.elementClass == JXG.OBJECT_CLASS_CIRCLE) {
                    d(i, j.circle)
                } else {
                    if (i.type == JXG.OBJECT_TYPE_ANGLE) {
                        d(i, j.angle)
                    } else {
                        if (i.type == JXG.OBJECT_TYPE_ARC) {
                            d(i, j.arc)
                        } else {
                            if (i.type == JXG.OBJECT_TYPE_POLYGON) {
                                d(i, j.polygon)
                            } else {
                                if (i.type == JXG.OBJECT_TYPE_CONIC) {
                                    d(i, j.conic)
                                } else {
                                    if (i.type == JXG.OBJECT_TYPE_CURVE) {
                                        d(i, j.curve)
                                    } else {
                                        if (i.type == JXG.OBJECT_TYPE_SECTOR) {
                                            i.arc.visProp.fillcolor = j.sector.fillColor;
                                            i.arc.visProp.highlightfillcolor = j.sector.highlightFillColor;
                                            i.arc.visProp.fillopacity = j.sector.fillOpacity;
                                            i.arc.visProp.highlightfillopacity = j.sector.highlightFillOpacity
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    h.fullUpdate();
    if (g && !h.hasGrid) {
        h.removeGrids(h)
    } else {
        if (!g && h.hasGrid) {
            h.create("grid", [])
        }
    }
};
JXG.useBlackWhiteOptions = function (d) {
    var e = JXG.Options;
    e.point.fillColor = JXG.rgb2bw(e.point.fillColor);
    e.point.highlightFillColor = JXG.rgb2bw(e.point.highlightFillColor);
    e.point.strokeColor = JXG.rgb2bw(e.point.strokeColor);
    e.point.highlightStrokeColor = JXG.rgb2bw(e.point.highlightStrokeColor);
    e.line.fillColor = JXG.rgb2bw(e.line.fillColor);
    e.line.highlightFillColor = JXG.rgb2bw(e.line.highlightFillColor);
    e.line.strokeColor = JXG.rgb2bw(e.line.strokeColor);
    e.line.highlightStrokeColor = JXG.rgb2bw(e.line.highlightStrokeColor);
    e.circle.fillColor = JXG.rgb2bw(e.circle.fillColor);
    e.circle.highlightFillColor = JXG.rgb2bw(e.circle.highlightFillColor);
    e.circle.strokeColor = JXG.rgb2bw(e.circle.strokeColor);
    e.circle.highlightStrokeColor = JXG.rgb2bw(e.circle.highlightStrokeColor);
    e.arc.fillColor = JXG.rgb2bw(e.arc.fillColor);
    e.arc.highlightFillColor = JXG.rgb2bw(e.arc.highlightFillColor);
    e.arc.strokeColor = JXG.rgb2bw(e.arc.strokeColor);
    e.arc.highlightStrokeColor = JXG.rgb2bw(e.arc.highlightStrokeColor);
    e.polygon.fillColor = JXG.rgb2bw(e.polygon.fillColor);
    e.polygon.highlightFillColor = JXG.rgb2bw(e.polygon.highlightFillColor);
    e.sector.fillColor = JXG.rgb2bw(e.sector.fillColor);
    e.sector.highlightFillColor = JXG.rgb2bw(e.sector.highlightFillColor);
    e.curve.strokeColor = JXG.rgb2bw(e.curve.strokeColor);
    e.grid.gridColor = JXG.rgb2bw(e.grid.gridColor);
    JXG.useStandardOptions(d)
};
JXG.JSXGraph = {
    licenseText: "JSXGraph v0.95 Copyright (C) see http://jsxgraph.org",
    boards: {},
    elements: {},
    rendererType: (function () {
        var e = function (h) {
            var f, g;
            if (JXG.rendererFiles[h]) {
                f = JXG.rendererFiles[h].split(",");
                for (g = 0; g < f.length; g++) {
                    (function (i) {
                        JXG.require(JXG.requirePath + i + ".js")
                    })(f[g])
                }
                delete(JXG.rendererFiles[h])
            }
        };
        JXG.Options.renderer = "no";
        if (JXG.supportsVML()) {
            JXG.Options.renderer = "vml";

            function d() {
                document.body.scrollLeft;
                document.body.scrollTop
            }
            document.onmousemove = d;
            e("vml")
        }
        if (JXG.supportsCanvas()) {
            JXG.Options.renderer = "canvas";
            e("canvas")
        }
        if (JXG.supportsSVG()) {
            JXG.Options.renderer = "svg";
            e("svg")
        }
        return JXG.Options.renderer
    })(),
    initBoard: function (o, l) {
        var u, s, r, g, f, p, v, i, d, j, n, m, A, q, k, e, z, t;
        i = JXG.getDimensions(o);
        if (typeof l == "undefined") {
            l = {}
        }
        if (typeof l.boundingbox != "undefined") {
            d = l.boundingbox;
            p = parseInt(i.width);
            v = parseInt(i.height);
            if (l.keepaspectratio) {
                g = p / (d[2] - d[0]);
                f = v / (-d[3] + d[1]);
                if (Math.abs(g) < Math.abs(f)) {
                    f = Math.abs(g) * f / Math.abs(f)
                } else {
                    g = Math.abs(f) * g / Math.abs(g)
                }
            } else {
                g = p / (d[2] - d[0]);
                f = v / (-d[3] + d[1])
            }
            s = -g * d[0];
            r = f * d[1]
        } else {
            s = ((typeof l.originX) == "undefined" ? 150 : l.originX);
            r = ((typeof l.originY) == "undefined" ? 150 : l.originY);
            g = ((typeof l.unitX) == "undefined" ? 50 : l.unitX);
            f = ((typeof l.unitY) == "undefined" ? 50 : l.unitY)
        }
        j = ((typeof l.zoomfactor) == "undefined" ? 1 : l.zoom);
        n = j * ((typeof l.zoomX) == "undefined" ? 1 : l.zoomX);
        m = j * ((typeof l.zoomY) == "undefined" ? 1 : l.zoomY);
        A = ((typeof l.showCopyright) == "undefined" ? JXG.Options.showCopyright : l.showCopyright);
        e = ((typeof l.zoom) == "undefined" ? JXG.Options.zoom.wheel : l.zoom);
        z = ((typeof l.pan) == "undefined" ? JXG.Options.pan : l.pan);
        if (JXG.Options.renderer == "svg") {
            u = new JXG.SVGRenderer(document.getElementById(o))
        } else {
            if (JXG.Options.renderer == "vml") {
                u = new JXG.VMLRenderer(document.getElementById(o))
            } else {
                if (JXG.Options.renderer == "silverlight") {
                    u = new JXG.SilverlightRenderer(document.getElementById(o), i.width, i.height)
                } else {
                    if (JXG.Options.renderer == "canvas") {
                        u = new JXG.CanvasRenderer(document.getElementById(o))
                    } else {
                        u = new JXG.NoRenderer()
                    }
                }
            }
        }
        k = new JXG.Board(o, u, "", [s, r], n, m, g, f, i.width, i.height, A);
        this.boards[k.id] = k;
        k.keepaspectratio = l.keepaspectratio;
        k.options.zoom.wheel = e;
        k.options.pan = z;
        k.suspendUpdate();
        k.initInfobox();
        if (l.axis) {
            t = typeof l.axis === "object" ? l.axis : {
                ticks: {
                    drawZero: true
                }
            };
            k.defaultAxes = {};
            k.defaultAxes.x = k.create("axis", [
                [0, 0],
                [1, 0]
            ], t);
            k.defaultAxes.y = k.create("axis", [
                [0, 0],
                [0, 1]
            ], t)
        }
        if (l.grid) {
            k.create("grid", [], (typeof l.grid === "object" ? l.grid : {}))
        }
        if (typeof l.shownavigation != "undefined") {
            l.showNavigation = l.shownavigation
        }
        q = ((typeof l.showNavigation) == "undefined" ? k.options.showNavigation : l.showNavigation);
        if (q) {
            k.renderer.drawZoomBar(k)
        }
        k.unsuspendUpdate();
        return k
    },
    loadBoardFromFile: function (g, d, i) {
        var h, e, f;
        if (JXG.Options.renderer == "svg") {
            h = new JXG.SVGRenderer(document.getElementById(g))
        } else {
            if (JXG.Options.renderer == "vml") {
                h = new JXG.VMLRenderer(document.getElementById(g))
            } else {
                if (JXG.Options.renderer == "silverlight") {
                    h = new JXG.SilverlightRenderer(document.getElementById(g), f.width, f.height)
                } else {
                    h = new JXG.CanvasRenderer(document.getElementById(g))
                }
            }
        }
        f = JXG.getDimensions(g);
        e = new JXG.Board(g, h, "", [150, 150], 1, 1, 50, 50, f.width, f.height);
        e.initInfobox();
        JXG.FileReader.parseFileContent(d, e, i);
        if (e.options.showNavigation) {
            e.renderer.drawZoomBar(e)
        }
        this.boards[e.id] = e;
        return e
    },
    loadBoardFromString: function (g, d, i) {
        var h, f, e;
        if (JXG.Options.renderer == "svg") {
            h = new JXG.SVGRenderer(document.getElementById(g))
        } else {
            if (JXG.Options.renderer == "vml") {
                h = new JXG.VMLRenderer(document.getElementById(g))
            } else {
                if (JXG.Options.renderer == "silverlight") {
                    h = new JXG.SilverlightRenderer(document.getElementById(g), f.width, f.height)
                } else {
                    h = new JXG.CanvasRenderer(document.getElementById(g))
                }
            }
        }
        f = JXG.getDimensions(g);
        e = new JXG.Board(g, h, "", [150, 150], 1, 1, 50, 50, f.width, f.height);
        e.initInfobox();
        JXG.FileReader.parseString(d, e, i, true);
        if (e.options.showNavigation) {
            e.renderer.drawZoomBar(e)
        }
        this.boards[e.id] = e;
        return e
    },
    freeBoard: function (f) {
        var e, d;
        if (typeof (f) == "string") {
            f = this.boards[f]
        }
        f.removeEventHandlers();
        f.suspendUpdate();
        for (e in f.objects) {
            f.removeObject(f.objects[e])
        }
        while (f.containerObj.firstChild) {
            f.containerObj.removeChild(f.containerObj.firstChild)
        }
        for (e in f.objects) {
            delete(f.objects[e])
        }
        delete(f.renderer);
        delete(f.algebra);
        f.jc.creator.clearCache();
        delete(f.jc);
        delete(this.boards[f.id])
    },
    registerElement: function (d, e) {
        d = d.toLowerCase();
        this.elements[d] = e;
        if (JXG.Board.prototype["_" + d]) {
            throw new Error("JSXGraph: Can't create wrapper method in JXG.Board because member '_" + d + "' already exists'")
        }
        JXG.Board.prototype["_" + d] = function (g, f) {
            return this.create(d, g, f)
        }
    },
    unregisterElement: function (d) {
        delete(this.elements[d.toLowerCase()]);
        delete(JXG.Board.prototype["_" + d.toLowerCase()])
    }
};
JXG.OBJECT_TYPE_ARC = 1;
JXG.OBJECT_TYPE_ARROW = 2;
JXG.OBJECT_TYPE_AXIS = 3;
JXG.OBJECT_TYPE_AXISPOINT = 4;
JXG.OBJECT_TYPE_TICKS = 5;
JXG.OBJECT_TYPE_CIRCLE = 6;
JXG.OBJECT_TYPE_CONIC = 7;
JXG.OBJECT_TYPE_CURVE = 8;
JXG.OBJECT_TYPE_GLIDER = 9;
JXG.OBJECT_TYPE_IMAGE = 10;
JXG.OBJECT_TYPE_LINE = 11;
JXG.OBJECT_TYPE_POINT = 12;
JXG.OBJECT_TYPE_SLIDER = 13;
JXG.OBJECT_TYPE_CAS = 14;
JXG.OBJECT_TYPE_GXTCAS = 15;
JXG.OBJECT_TYPE_POLYGON = 16;
JXG.OBJECT_TYPE_SECTOR = 17;
JXG.OBJECT_TYPE_TEXT = 18;
JXG.OBJECT_TYPE_ANGLE = 19;
JXG.OBJECT_TYPE_INTERSECTION = 20;
JXG.OBJECT_TYPE_TURTLE = 21;
JXG.OBJECT_TYPE_VECTOR = 22;
JXG.OBJECT_TYPE_OPROJECT = 23;
JXG.OBJECT_TYPE_GRID = 24;
JXG.OBJECT_CLASS_POINT = 1;
JXG.OBJECT_CLASS_LINE = 2;
JXG.OBJECT_CLASS_CIRCLE = 3;
JXG.OBJECT_CLASS_CURVE = 4;
JXG.OBJECT_CLASS_AREA = 5;
JXG.OBJECT_CLASS_OTHER = 6;
JXG.GeometryElement = function (h, d, g, i) {
    var e, f;
    this.needsUpdate = true;
    this.isDraggable = false;
    this.isReal = true;
    this.childElements = {};
    this.hasLabel = false;
    this.highlighted = false;
    this.notExistingParents = {};
    this.traces = {};
    this.numTraces = 0;
    this.transformations = [];
    this.baseElement = null;
    this.descendants = {};
    this.ancestors = {};
    this.symbolic = {};
    this.elType = "";
    this.dump = true;
    this.subs = {};
    this._pos = -1;
    this.stdform = [1, 0, 0, 0, 1, 1, 0, 0];
    this.methodMap = {
        setLabel: "setLabelText",
        getName: "getName",
        addTransform: "addTransform",
        setProperty: "setProperty",
        setAttribute: "setAttribute"
    };
    this.quadraticform = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ];
    this.visProp = {};
    this.eventHandlers = {};
    this.mouseover = false;
    if (arguments.length > 0) {
        this.board = h;
        this.type = g;
        this.elementClass = i || JXG.OBJECT_CLASS_OTHER;
        this.id = d.id;
        e = d.name;
        if (!JXG.exists(e)) {
            e = this.board.generateName(this)
        }
        this.board.elementsByName[e] = this;
        this.name = e;
        this.needsRegularUpdate = d.needsregularupdate;
        JXG.clearVisPropOld(this);
        d = this.resolveShortcuts(d);
        for (f in d) {
            this._set(f, d[f])
        }
        this.visProp.draft = d.draft && d.draft.draft;
        this.visProp.gradientangle = "270";
        this.visProp.gradientsecondopacity = this.visProp.fillopacity;
        this.visProp.gradientpositionx = 0.5;
        this.visProp.gradientpositiony = 0.5
    }
};
JXG.extend(JXG.GeometryElement.prototype, {
    addChild: function (f) {
        var e, d;
        this.childElements[f.id] = f;
        this.addDescendants(f);
        f.ancestors[this.id] = this;
        for (e in this.descendants) {
            this.descendants[e].ancestors[this.id] = this;
            for (d in this.ancestors) {
                this.descendants[e].ancestors[this.ancestors[d].id] = this.ancestors[d]
            }
        }
        for (e in this.ancestors) {
            for (d in this.descendants) {
                this.ancestors[e].descendants[this.descendants[d].id] = this.descendants[d]
            }
        }
        return this
    },
    addDescendants: function (e) {
        var d;
        this.descendants[e.id] = e;
        for (d in e.childElements) {
            this.addDescendants(e.childElements[d])
        }
        return this
    },
    countChildren: function () {
        var g, e = 0,
            f;
        f = this.childElements;
        for (g in f) {
            if (f.hasOwnProperty(g) && g.indexOf("Label") < 0) {
                e++
            }
        }
        return e
    },
    getName: function () {
        return this.name
    },
    addTransform: function () {},
    draggable: function () {
        return this.isDraggable && !this.visProp.fixed && !this.visProp.frozen && this.type != JXG.OBJECT_TYPE_GLIDER
    },
    generatePolynomial: function () {
        return []
    },
    animate: function (g, f, q) {
        q = q || {};
        var d, e, j = this.board.options.animationDelay,
            k = Math.ceil(f / (j * 1)),
            h, n = this,
            m = false;
        this.animationData = {};
        var o = function (w, v, t) {
            var u, s, r, p, i;
            u = JXG.rgb2hsv(w);
            s = JXG.rgb2hsv(v);
            r = (s[0] - u[0]) / (1 * k);
            p = (s[1] - u[1]) / (1 * k);
            i = (s[2] - u[2]) / (1 * k);
            n.animationData[t] = new Array(k);
            for (h = 0; h < k; h++) {
                n.animationData[t][k - h - 1] = JXG.hsv2rgb(u[0] + (h + 1) * r, u[1] + (h + 1) * p, u[2] + (h + 1) * i)
            }
        }, l = function (v, i, u, p) {
            var r;
            v = parseFloat(v);
            i = parseFloat(i);
            if (isNaN(v) || isNaN(i)) {
                return
            }
            var t = (i - v) / (1 * k);
            n.animationData[u] = new Array(k);
            for (h = 0; h < k; h++) {
                r = v + (h + 1) * t;
                n.animationData[u][k - h - 1] = p ? Math.floor(r) : r
            }
        };
        for (d in g) {
            e = d.toLowerCase();
            switch (e) {
                case "strokecolor":
                case "fillcolor":
                    o(this.visProp[e], g[d], e);
                    break;
                case "size":
                    if (this.elementClass !== JXG.OBJECT_CLASS_POINT) {
                        break
                    }
                    m = true;
                case "strokeopacity":
                case "strokewidth":
                case "fillopacity":
                    l(this.visProp[e], g[d], e, m);
                    break
            }
        }
        this.animationCallback = q.callback;
        this.board.addAnimation(this);
        return this
    },
    update: function () {
        if (this.visProp.trace) {
            this.cloneToBackground(true)
        }
        return this
    },
    updateRenderer: function () {
        return this
    },
    hideElement: function () {
        this.visProp.visible = false;
        this.board.renderer.hide(this);
        if (this.label != null && this.hasLabel) {
            this.label.hiddenByParent = true;
            if (this.label.content.visProp.visible) {
                this.board.renderer.hide(this.label.content)
            }
        }
        return this
    },
    showElement: function () {
        this.visProp.visible = true;
        this.board.renderer.show(this);
        if (this.label != null && this.hasLabel && this.label.hiddenByParent) {
            this.label.hiddenByParent = false;
            if (this.label.content.visProp.visible) {
                this.board.renderer.show(this.label.content)
            }
        }
        return this
    },
    _set: function (e, d) {
        e = e.toLocaleLowerCase();
        if (this.visProp.hasOwnProperty(e) && e.indexOf("color") >= 0 && JXG.isString(d) && d.length == 9 && d.charAt(0) === "#") {
            d = JXG.rgba2rgbo(d);
            this.visProp[e] = d[0];
            this.visProp[e.replace("color", "opacity")] = d[1]
        } else {
            this.visProp[e] = d
        }
    },
    resolveShortcuts: function (f) {
        var e, d;
        for (e in JXG.Options.shortcuts) {
            if (JXG.exists(f[e])) {
                for (d = 0; d < JXG.Options.shortcuts[e].length; d++) {
                    if (!JXG.exists(f[JXG.Options.shortcuts[e][d]])) {
                        f[JXG.Options.shortcuts[e][d]] = f[e]
                    }
                }
            }
        }
        return f
    },
    setLabelText: function (d) {
        d = d.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        if (this.label !== null) {
            this.label.content.setText(d)
        }
        return this
    },
    setAttribute: JXG.shortcut(JXG.GeometryElement.prototype, "setProperty"),
    setProperty: function () {
        var h, g, j, d, e, k, f = {};
        for (h = 0; h < arguments.length; h++) {
            d = arguments[h];
            if (JXG.isString(d)) {
                k = d.split(":");
                f[JXG.trim(k[0])] = JXG.trim(k[1])
            } else {
                if (!JXG.isArray(d)) {
                    JXG.extend(f, d)
                } else {
                    f[d[0]] = d[1]
                }
            }
        }
        f = this.resolveShortcuts(f);
        for (h in f) {
            g = h.replace(/\s+/g, "").toLowerCase();
            j = f[h];
            switch (g) {
                case "name":
                    delete this.board.elementsByName[this.name];
                    this.name = j;
                    this.board.elementsByName[this.name] = this;
                    break;
                case "needsregularupdate":
                    this.needsRegularUpdate = !(j == "false" || j == false);
                    this.board.renderer.setBuffering(this, this.needsRegularUpdate ? "auto" : "static");
                    break;
                case "labelcolor":
                    j = JXG.rgba2rgbo(j);
                    e = j[1];
                    j = j[0];
                    if (e == 0) {
                        if (this.label != null && this.hasLabel) {
                            this.label.content.hideElement()
                        }
                    }
                    if (this.label != null && this.hasLabel) {
                        this.label.color = j;
                        this.board.renderer.setObjectStrokeColor(this.label.content, j, e)
                    }
                    if (this.type == JXG.OBJECT_TYPE_TEXT) {
                        this.visProp.strokecolor = j;
                        this.visProp.strokeopacity = e;
                        this.board.renderer.setObjectStrokeColor(this, this.visProp.strokecolor, this.visProp.strokeopacity)
                    }
                    break;
                case "infoboxtext":
                    if (typeof (j) == "string") {
                        this.infoboxText = j
                    } else {
                        this.infoboxText = false
                    }
                    break;
                case "visible":
                    if (j == "false" || j == false) {
                        this.visProp.visible = false;
                        this.hideElement()
                    } else {
                        if (j == "true" || j == true) {
                            this.visProp.visible = true;
                            this.showElement()
                        }
                    }
                    break;
                case "face":
                    if (this.elementClass == JXG.OBJECT_CLASS_POINT) {
                        this.visProp.face = j;
                        this.board.renderer.changePointStyle(this)
                    }
                    break;
                case "trace":
                    if (j == "false" || j == false) {
                        this.clearTrace();
                        this.visProp.trace = false
                    } else {
                        this.visProp.trace = true
                    }
                    break;
                case "gradient":
                    this.visProp.gradient = j;
                    this.board.renderer.setGradient(this);
                    break;
                case "gradientsecondcolor":
                    j = JXG.rgba2rgbo(j);
                    this.visProp.gradientsecondcolor = j[0];
                    this.visProp.gradientsecondopacity = j[1];
                    this.board.renderer.updateGradient(this);
                    break;
                case "gradientsecondopacity":
                    this.visProp.gradientsecondopacity = j;
                    this.board.renderer.updateGradient(this);
                    break;
                case "withlabel":
                    this.visProp.withlabel = j;
                    if (!j) {
                        if (this.label && this.label.content && this.hasLabel) {
                            this.label.content.hideElement()
                        }
                    } else {
                        if (this.label && this.label.content) {
                            if (this.visProp.visible) {
                                this.label.content.showElement()
                            }
                        } else {
                            this.createLabel();
                            if (!this.visProp.visible) {
                                this.label.content.hideElement()
                            }
                        }
                    }
                    this.hasLabel = j;
                    break;
                case "rotate":
                    if ((this.type === JXG.OBJECT_TYPE_TEXT && this.visProp.display == "internal") || this.type === JXG.OBJECT_TYPE_IMAGE) {
                        this.addRotation(j)
                    }
                    break;
                default:
                    if (JXG.exists(this.visProp[g]) && (!JXG.Validator[g] || (JXG.Validator[g] && JXG.Validator[g](j)) || (JXG.Validator[g] && JXG.isFunction(j) && JXG.Validator[g](j())))) {
                        j = j.toLowerCase && j.toLowerCase() === "false" ? false : j;
                        this._set(g, j)
                    }
                    break
            }
        }
        if (!this.visProp.needsregularupdate) {
            this.board.fullUpdate()
        } else {
            this.board.update(this)
        }
        return this
    },
    getAttribute: JXG.shortcut(JXG.GeometryElement.prototype, "getProperty"),
    getProperty: function (e) {
        var d;
        e = e.toLowerCase();
        switch (e) {
            case "needsregularupdate":
                d = this.needsRegularUpdate;
                break;
            case "labelcolor":
                d = this.label.color;
                break;
            case "infoboxtext":
                d = this.infoboxText;
                break;
            case "withlabel":
                d = this.hasLabel;
                break;
            default:
                d = this.visProp[e];
                break
        }
        return d
    },
    setDash: function (d) {
        this.setProperty({
            dash: d
        });
        return this
    },
    prepareUpdate: function () {
        this.needsUpdate = true;
        return this
    },
    remove: function () {
        this.board.renderer.remove(this.board.renderer.getElementById(this.id));
        if (this.hasLabel) {
            this.board.renderer.remove(this.board.renderer.getElementById(this.label.content.id))
        }
        return this
    },
    getTextAnchor: function () {
        return new JXG.Coords(JXG.COORDS_BY_USER, [0, 0], this.board)
    },
    getLabelAnchor: function () {
        return new JXG.Coords(JXG.COORDS_BY_USER, [0, 0], this.board)
    },
    setStraight: function (d, e) {
        return this
    },
    setArrow: function (e, d) {
        this.visProp.firstarrow = e;
        this.visProp.lastarrow = d;
        this.prepareUpdate().update();
        return this
    },
    createGradient: function () {
        if (this.visProp.gradient === "linear" || this.visProp.gradient === "radial") {
            this.board.renderer.setGradient(this)
        }
    },
    createLabel: function () {
        var d = {};
        d = JXG.deepCopy(this.visProp.label, null);
        d.id = this.id + "Label";
        d.isLabel = true;
        d.visible = this.visProp.visible;
        d.anchor = this;
        d.priv = this.visProp.priv;
        this.nameHTML = JXG.GeonextParser.replaceSup(JXG.GeonextParser.replaceSub(this.name));
        this.label = {};
        if (this.visProp.withlabel) {
            this.label.relativeCoords = [0, 0];
            this.label.content = JXG.createText(this.board, [this.label.relativeCoords[0], - this.label.relativeCoords[1], this.nameHTML], d);
            this.label.content.dump = false;
            this.label.color = this.label.content.visProp.strokecolor;
            if (!this.visProp.visible) {
                this.label.hiddenByParent = true;
                this.label.content.visProp.visible = false
            }
            this.hasLabel = true
        }
        return this
    },
    highlight: function (d) {
        d = JXG.def(d, false);
        if (!this.highlighted || d) {
            this.highlighted = true;
            this.board.renderer.highlight(this)
        }
        return this
    },
    noHighlight: function () {
        if (this.highlighted) {
            this.highlighted = false;
            this.board.renderer.noHighlight(this)
        }
        return this
    },
    clearTrace: function () {
        var d;
        for (d in this.traces) {
            this.board.renderer.remove(this.traces[d])
        }
        this.numTraces = 0;
        return this
    },
    cloneToBackground: function () {
        return this
    },
    bounds: function () {},
    normalize: function () {
        this.stdform = JXG.Math.normalize(this.stdform);
        return this
    },
    toJSON: function () {
        var e = '{"name":' + this.name;
        e += ', "id":' + this.id;
        var f = [];
        for (var d in this.visProp) {
            if (this.visProp[d] != null) {
                f.push('"' + d + '":' + this.visProp[d])
            }
        }
        e += ', "visProp":{' + f.toString() + "}";
        e += "}";
        return e
    },
    addRotation: function (j) {
        var f, i, g, e, d, h = this;
        if (((this.type === JXG.OBJECT_TYPE_TEXT && this.visProp.display === "internal") || this.type === JXG.OBJECT_TYPE_IMAGE) && j != 0) {
            var f, i, g, e, d, h = this;
            f = this.board.create("transform", [function () {
                return -h.X()
            }, function () {
                return -h.Y()
            }], {
                type: "translate"
            });
            i = this.board.create("transform", [function () {
                return h.X()
            }, function () {
                return h.Y()
            }], {
                type: "translate"
            });
            g = this.board.create("transform", [function () {
                return h.board.unitX / h.board.unitY
            }, function () {
                return 1
            }], {
                type: "scale"
            });
            e = this.board.create("transform", [function () {
                return h.board.unitY / h.board.unitX
            }, function () {
                return 1
            }], {
                type: "scale"
            });
            d = this.board.create("transform", [j * Math.PI / 180], {
                type: "rotate"
            });
            f.bindTo(this);
            g.bindTo(this);
            d.bindTo(this);
            e.bindTo(this);
            i.bindTo(this)
        }
        return this
    },
    highlightStrokeColor: function (d) {
        this.setProperty({
            highlightStrokeColor: d
        });
        return this
    },
    strokeColor: function (d) {
        this.setProperty({
            strokeColor: d
        });
        return this
    },
    strokeWidth: function (d) {
        this.setProperty({
            strokeWidth: d
        });
        return this
    },
    fillColor: function (d) {
        this.setProperty({
            fillColor: d
        });
        return this
    },
    highlightFillColor: function (d) {
        this.setProperty({
            highlightFillColor: d
        });
        return this
    },
    labelColor: function (d) {
        this.setProperty({
            labelColor: d
        });
        return this
    },
    dash: function (e) {
        this.setProperty({
            dash: e
        });
        return this
    },
    visible: function (d) {
        this.setProperty({
            visible: d
        });
        return this
    },
    shadow: function (d) {
        this.setProperty({
            shadow: d
        });
        return this
    },
    getType: function () {
        return this.elType
    },
    getParents: function () {
        return this.parents
    },
    snapToGrid: function () {
        return this
    },
    getAttributes: function () {
        var d = JXG.deepCopy(this.visProp),
            e = ["attractors", "attractordistance", "snatchdistance", "traceattributes", "frozen", "shadow", "gradientangle", "gradientsecondopacity", "gradientpositionx", "gradientpositiony", "needsregularupdate", "zoom", "layer", "offset"],
            f;
        d.id = this.id;
        d.name = this.name;
        for (f = 0; f < e.length; f++) {
            delete d[e[f]]
        }
        return d
    },
    hasPoint: function (d, e) {
        return false
    },
    triggerEventHandlers: function (l) {
        var g, k, f = Array.prototype.slice.call(arguments, 1),
            e, d;
        if (!JXG.isArray(l)) {
            l = [l]
        }
        for (e = 0; e < l.length; e++) {
            d = l[e];
            if (JXG.isArray(this.eventHandlers[d])) {
                for (g = 0; g < this.eventHandlers[d].length; g++) {
                    k = this.eventHandlers[d][g];
                    k.handler.apply(k.context, f)
                }
            }
        }
    },
    on: function (f, e, d) {
        if (!JXG.isArray(this.eventHandlers[f])) {
            this.eventHandlers[f] = []
        }
        d = JXG.def(d, this);
        this.eventHandlers[f].push({
            handler: e,
            context: d
        })
    },
    addEvent: JXG.shortcut(JXG.GeometryElement.prototype, "on"),
    off: function (f, e) {
        var d;
        if (!f || !JXG.isArray(this.eventHandlers[f])) {
            return
        }
        if (e) {
            d = JXG.indexOf(this.eventHandlers[f], e, "handler");
            if (d > -1) {
                this.eventHandlers[f].splice(d, 1)
            }
        } else {
            this.eventHandlers[f].length = 0
        }
    },
    removeEvent: JXG.shortcut(JXG.GeometryElement.prototype, "off")
});
JXG.COORDS_BY_USER = 1;
JXG.COORDS_BY_SCREEN = 2;
JXG.Coords = function (f, e, d) {
    this.board = d;
    this.usrCoords = [];
    this.scrCoords = [];
    this.setCoordinates(f, e)
};
JXG.extend(JXG.Coords.prototype, {
    normalizeUsrCoords: function () {
        var d = JXG.Math.eps;
        if (Math.abs(this.usrCoords[0]) > d) {
            this.usrCoords[1] /= this.usrCoords[0];
            this.usrCoords[2] /= this.usrCoords[0];
            this.usrCoords[0] = 1
        }
    },
    usr2screen: function (h) {
        var g = Math.round,
            d = this.board,
            f = this.usrCoords,
            e = d.origin.scrCoords;
        if (h === null || h) {
            this.scrCoords[0] = g(f[0]);
            this.scrCoords[1] = g(f[0] * e[1] + f[1] * d.unitX);
            this.scrCoords[2] = g(f[0] * e[2] - f[2] * d.unitY)
        } else {
            this.scrCoords[0] = f[0];
            this.scrCoords[1] = f[0] * e[1] + f[1] * d.unitX;
            this.scrCoords[2] = f[0] * e[2] - f[2] * d.unitY
        }
    },
    screen2usr: function () {
        var f = this.board.origin.scrCoords,
            e = this.scrCoords,
            d = this.board;
        this.usrCoords[0] = 1;
        this.usrCoords[1] = (e[1] - f[1]) / d.unitX;
        this.usrCoords[2] = (f[2] - e[2]) / d.unitY
    },
    distance: function (e, j) {
        var g = 0,
            k, d = this.usrCoords,
            i = this.scrCoords,
            h;
        if (e === JXG.COORDS_BY_USER) {
            k = j.usrCoords;
            h = d[0] - k[0];
            g = h * h;
            if (g > JXG.Math.eps) {
                return Number.POSITIVE_INFINITY
            }
            h = d[1] - k[1];
            g += h * h;
            h = d[2] - k[2];
            g += h * h
        } else {
            k = j.scrCoords;
            h = i[1] - k[1];
            g += h * h;
            h = i[2] - k[2];
            g += h * h
        }
        return Math.sqrt(g)
    },
    setCoordinates: function (e, h, f) {
        var d = this.usrCoords,
            g = this.scrCoords;
        if (e === JXG.COORDS_BY_USER) {
            if (h.length === 2) {
                d[0] = 1;
                d[1] = h[0];
                d[2] = h[1]
            } else {
                d[0] = h[0];
                d[1] = h[1];
                d[2] = h[2];
                this.normalizeUsrCoords()
            }
            this.usr2screen(f)
        } else {
            g[1] = h[0];
            g[2] = h[1];
            this.screen2usr()
        }
        return this
    }
});
JXG.Point = function (e, f, d) {
    this.constructor(e, d, JXG.OBJECT_TYPE_POINT, JXG.OBJECT_CLASS_POINT);
    if (f == null) {
        f = [0, 0]
    }
    this.coords = new JXG.Coords(JXG.COORDS_BY_USER, f, this.board);
    this.initialCoords = new JXG.Coords(JXG.COORDS_BY_USER, f, this.board);
    this.position = null;
    this.onPolygon = false;
    this.slideObject = null;
    this.Xjc = null;
    this.Yjc = null;
    this.methodMap = JXG.deepCopy(this.methodMap, {
        move: "moveTo",
        glide: "makeGlider",
        X: "X",
        Y: "Y",
        free: "free",
        setPosition: "setGliderPosition"
    });
    this.group = [];
    this.elType = "point";
    this.id = this.board.setId(this, "P");
    this.board.renderer.drawPoint(this);
    this.board.finalizeAdding(this);
    this.createLabel()
};
JXG.Point.prototype = new JXG.GeometryElement();
JXG.extend(JXG.Point.prototype, {
    hasPoint: function (e, g) {
        var d = this.coords.scrCoords,
            f;
        f = parseFloat(this.visProp.size) + parseFloat(this.visProp.strokewidth) * 0.5;
        if (f < this.board.options.precision.hasPoint) {
            f = this.board.options.precision.hasPoint
        }
        return ((Math.abs(d[1] - e) < f + 2) && (Math.abs(d[2] - g)) < f + 2)
    },
    updateConstraint: function () {
        return this
    },
    update: function (d) {
        if (!this.needsUpdate) {
            return this
        }
        if (typeof d == "undefined") {
            d = false
        }
        if (this.type == JXG.OBJECT_TYPE_GLIDER) {
            if (d) {
                this.updateGliderFromParent()
            } else {
                this.updateGlider()
            }
        }
        if (this.type == JXG.OBJECT_TYPE_CAS || this.type == JXG.OBJECT_TYPE_AXISPOINT) {
            this.updateConstraint()
        }
        this.updateTransform();
        if (this.visProp.trace) {
            this.cloneToBackground(true)
        }
        return this
    },
    updateGlider: function () {
        var k, r, n, m, q, e, f, o, j, l = this.slideObject,
            h, p, g;
        if (l.elementClass == JXG.OBJECT_CLASS_CIRCLE) {
            this.coords = JXG.Math.Geometry.projectPointToCircle(this, l, this.board);
            this.position = JXG.Math.Geometry.rad([l.center.X() + 1, l.center.Y()], l.center, this)
        } else {
            if (l.elementClass == JXG.OBJECT_CLASS_LINE) {
                if (this.onPolygon) {
                    r = l.point1.coords.usrCoords;
                    n = l.point2.coords.usrCoords;
                    k = 1;
                    m = n[k] - r[k];
                    if (Math.abs(m) < JXG.Math.eps) {
                        k = 2;
                        m = n[k] - r[k]
                    }
                    f = JXG.Math.Geometry.projectPointToLine(this, l, this.board);
                    o = (f.usrCoords[k] - r[k]) / m;
                    e = l.parentPolygon;
                    if (o < 0) {
                        for (k = 0; k < e.borders.length; k++) {
                            if (l == e.borders[k]) {
                                l = e.borders[(k - 1 + e.borders.length) % e.borders.length];
                                break
                            }
                        }
                    } else {
                        if (o > 1) {
                            for (k = 0; k < e.borders.length; k++) {
                                if (l == e.borders[k]) {
                                    l = e.borders[(k + 1 + e.borders.length) % e.borders.length];
                                    break
                                }
                            }
                        }
                    }
                }
                r = l.point1.coords;
                n = l.point2.coords;
                m = r.distance(JXG.COORDS_BY_USER, n);
                r = r.usrCoords.slice(0);
                n = n.usrCoords.slice(0);
                if (m < JXG.Math.eps) {
                    this.coords.setCoordinates(JXG.COORDS_BY_USER, r);
                    this.position = 0
                } else {
                    this.coords = JXG.Math.Geometry.projectPointToLine(this, l, this.board);
                    if (Math.abs(n[0]) < JXG.Math.eps) {
                        k = 1;
                        m = n[k];
                        if (Math.abs(m) < JXG.Math.eps) {
                            k = 2;
                            m = n[k]
                        }
                        m = (this.coords.usrCoords[k] - r[k]) / m;
                        j = (m >= 0) ? 1 : -1;
                        m = Math.abs(m);
                        this.position = j * m / (m + 1)
                    } else {
                        if (Math.abs(r[0]) < JXG.Math.eps) {
                            k = 1;
                            m = r[k];
                            if (Math.abs(m) < JXG.Math.eps) {
                                k = 2;
                                m = r[k]
                            }
                            m = (this.coords.usrCoords[k] - n[k]) / m;
                            if (m < 0) {
                                this.position = (1 - 2 * m) / (1 - m)
                            } else {
                                this.position = 1 / (m + 1)
                            }
                        } else {
                            k = 1;
                            m = n[k] - r[k];
                            if (Math.abs(m) < JXG.Math.eps) {
                                k = 2;
                                m = n[k] - r[k]
                            }
                            this.position = (this.coords.usrCoords[k] - r[k]) / m
                        }
                    }
                }
                if (this.visProp.snapwidth > 0 && Math.abs(this._smax - this._smin) >= JXG.Math.eps) {
                    if (this.position < 0) {
                        this.position = 0
                    }
                    if (this.position > 1) {
                        this.position = 1
                    }
                    q = this.position * (this._smax - this._smin) + this._smin;
                    q = Math.round(q / this.visProp.snapwidth) * this.visProp.snapwidth;
                    this.position = (q - this._smin) / (this._smax - this._smin);
                    this.update(true)
                }
                r = l.point1.coords.usrCoords;
                if (!l.visProp.straightfirst && Math.abs(r[0]) > JXG.Math.eps && this.position < 0) {
                    this.coords.setCoordinates(JXG.COORDS_BY_USER, r);
                    this.position = 0
                }
                n = l.point2.coords.usrCoords;
                if (!l.visProp.straightlast && Math.abs(n[0]) > JXG.Math.eps && this.position > 1) {
                    this.coords.setCoordinates(JXG.COORDS_BY_USER, n);
                    this.position = 1
                }
            } else {
                if (l.type == JXG.OBJECT_TYPE_TURTLE) {
                    this.updateConstraint();
                    this.coords = JXG.Math.Geometry.projectPointToTurtle(this, l, this.board)
                } else {
                    if (l.elementClass == JXG.OBJECT_CLASS_CURVE) {
                        if (l.type == JXG.OBJECT_TYPE_ARC || l.type == JXG.OBJECT_TYPE_SECTOR) {
                            this.coords = JXG.Math.Geometry.projectPointToCircle(this, l, this.board);
                            g = JXG.Math.Geometry.rad(l.radiuspoint, l.center, this);
                            h = 0;
                            p = JXG.Math.Geometry.rad(l.radiuspoint, l.center, l.anglepoint);
                            this.position = g;
                            if ((l.visProp.type == "minor" && p > Math.PI) || (l.visProp.type == "major" && p < Math.PI)) {
                                h = p;
                                p = 2 * Math.PI
                            }
                            if (g < h || g > p) {
                                this.position = p;
                                if ((g < h && g > h * 0.5) || (g > p && g > p * 0.5 + Math.PI)) {
                                    this.position = h
                                }
                                this.updateGliderFromParent()
                            }
                        } else {
                            this.updateConstraint();
                            this.coords = JXG.Math.Geometry.projectPointToCurve(this, l, this.board)
                        }
                    } else {
                        if (l.elementClass == JXG.OBJECT_CLASS_POINT) {
                            this.coords = JXG.Math.Geometry.projectPointToPoint(this, l, this.board)
                        }
                    }
                }
            }
        }
    },
    updateGliderFromParent: function () {
        var e, g, h, f, d = this.slideObject,
            i;
        if (d.elementClass == JXG.OBJECT_CLASS_CIRCLE) {
            h = d.Radius();
            this.coords.setCoordinates(JXG.COORDS_BY_USER, [d.center.X() + h * Math.cos(this.position), d.center.Y() + h * Math.sin(this.position)])
        } else {
            if (d.elementClass == JXG.OBJECT_CLASS_LINE) {
                e = d.point1.coords.usrCoords;
                g = d.point2.coords.usrCoords;
                if (Math.abs(g[0]) < JXG.Math.eps) {
                    f = Math.min(Math.abs(this.position), 1 - JXG.Math.eps);
                    f /= (1 - f);
                    if (this.position < 0) {
                        f *= -1
                    }
                    this.coords.setCoordinates(JXG.COORDS_BY_USER, [e[0] + f * g[0], e[1] + f * g[1], e[2] + f * g[2]])
                } else {
                    if (Math.abs(e[0]) < JXG.Math.eps) {
                        f = Math.max(this.position, JXG.Math.eps);
                        f = Math.min(f, 2 - JXG.Math.eps);
                        if (f > 1) {
                            f = (f - 1) / (f - 2)
                        } else {
                            f = (1 - f) / f
                        }
                        this.coords.setCoordinates(JXG.COORDS_BY_USER, [g[0] + f * e[0], g[1] + f * e[1], g[2] + f * e[2]])
                    } else {
                        f = this.position;
                        this.coords.setCoordinates(JXG.COORDS_BY_USER, [e[0] + f * (g[0] - e[0]), e[1] + f * (g[1] - e[1]), e[2] + f * (g[2] - e[2])])
                    }
                }
            } else {
                if (d.type == JXG.OBJECT_TYPE_TURTLE) {
                    this.coords.setCoordinates(JXG.COORDS_BY_USER, [d.Z(this.position), d.X(this.position), d.Y(this.position)]);
                    this.updateConstraint();
                    this.coords = JXG.Math.Geometry.projectPointToTurtle(this, d, this.board)
                } else {
                    if (d.elementClass == JXG.OBJECT_CLASS_CURVE) {
                        this.coords.setCoordinates(JXG.COORDS_BY_USER, [d.Z(this.position), d.X(this.position), d.Y(this.position)]);
                        if (d.type == JXG.OBJECT_TYPE_ARC || d.type == JXG.OBJECT_TYPE_SECTOR) {
                            i = JXG.Math.Geometry.rad([d.center.X() + 1, d.center.Y()], d.center, d.radiuspoint);
                            h = d.Radius();
                            this.coords.setCoordinates(JXG.COORDS_BY_USER, [d.center.X() + h * Math.cos(this.position + i), d.center.Y() + h * Math.sin(this.position + i)])
                        } else {
                            this.updateConstraint();
                            this.coords = JXG.Math.Geometry.projectPointToCurve(this, d, this.board)
                        }
                    } else {
                        if (d.elementClass == JXG.OBJECT_CLASS_POINT) {
                            this.coords = JXG.Math.Geometry.projectPointToPoint(this, d, this.board)
                        }
                    }
                }
            }
        }
    },
    updateRenderer: function () {
        if (!this.needsUpdate) {
            return this
        }
        if (this.visProp.visible && this.visProp.size > 0) {
            var d = this.isReal;
            this.isReal = (!isNaN(this.coords.usrCoords[1] + this.coords.usrCoords[2]));
            this.isReal = (Math.abs(this.coords.usrCoords[0]) > JXG.Math.eps) ? this.isReal : false;
            if (this.isReal) {
                if (d != this.isReal) {
                    this.board.renderer.show(this);
                    if (this.hasLabel && this.label.content.visProp.visible) {
                        this.board.renderer.show(this.label.content)
                    }
                }
                this.board.renderer.updatePoint(this)
            } else {
                if (d != this.isReal) {
                    this.board.renderer.hide(this);
                    if (this.hasLabel && this.label.content.visProp.visible) {
                        this.board.renderer.hide(this.label.content)
                    }
                }
            }
        }
        if (this.hasLabel && this.visProp.visible && this.label.content && this.label.content.visProp.visible && this.isReal) {
            this.label.content.update();
            this.board.renderer.updateText(this.label.content)
        }
        this.needsUpdate = false;
        return this
    },
    X: function () {
        return this.coords.usrCoords[1]
    },
    Y: function () {
        return this.coords.usrCoords[2]
    },
    Z: function () {
        return this.coords.usrCoords[0]
    },
    XEval: function () {
        return this.coords.usrCoords[1]
    },
    YEval: function () {
        return this.coords.usrCoords[2]
    },
    ZEval: function () {
        return this.coords.usrCoords[0]
    },
    bounds: function () {
        return this.coords.usrCoords.slice(1).concat(this.coords.usrCoords.slice(1))
    },
    Dist: function (e) {
        var g, i = e.coords.usrCoords,
            d = this.coords.usrCoords,
            h;
        h = d[0] - i[0];
        g = h * h;
        h = d[1] - i[1];
        g += h * h;
        h = d[2] - i[2];
        g += h * h;
        return Math.sqrt(g)
    },
    snapToGrid: function () {
        return this.handleSnapToGrid()
    },
    handleSnapToGrid: function () {
        var d, g, f = this.visProp.snapsizex,
            e = this.visProp.snapsizey;
        if (this.visProp.snaptogrid) {
            d = this.coords.usrCoords[1];
            g = this.coords.usrCoords[2];
            if (f <= 0 && this.board.defaultAxes && this.board.defaultAxes.x.defaultTicks) {
                f = this.board.defaultAxes.x.defaultTicks.ticksDelta * (this.board.defaultAxes.x.defaultTicks.visProp.minorticks + 1)
            }
            if (e <= 0 && this.board.defaultAxes && this.board.defaultAxes.y.defaultTicks) {
                e = this.board.defaultAxes.y.defaultTicks.ticksDelta * (this.board.defaultAxes.y.defaultTicks.visProp.minorticks + 1)
            }
            if (f > 0 && e > 0) {
                this.coords = new JXG.Coords(JXG.COORDS_BY_USER, [Math.round(d / f) * f, Math.round(g / e) * e], this.board)
            }
        }
        return this
    },
    handleSnapToPoints: function () {
        var g, j, e, h = 0,
            f = Infinity,
            i = null;
        if (this.visProp.snaptopoints) {
            for (g in this.board.objects) {
                j = this.board.objects[g];
                if (j.elementClass == JXG.OBJECT_CLASS_POINT && j !== this && j.visProp.visible) {
                    e = JXG.Math.Geometry.projectPointToPoint(this, j, this.board);
                    h = e.distance(JXG.COORDS_BY_USER, this.coords);
                    if (h < this.visProp.attractordistance && h < f) {
                        f = h;
                        i = e
                    }
                }
            }
            if (i != null) {
                this.coords.setCoordinates(JXG.COORDS_BY_USER, i.usrCoords)
            }
        }
        return this
    },
    handleAttractors: function () {
        var e = this.visProp.attractors.length,
            g, h, f, j = 0;
        if (this.visProp.attractordistance == 0) {
            return
        }
        for (g = 0; g < e; g++) {
            h = JXG.getRef(this.board, this.visProp.attractors[g]);
            if (!JXG.exists(h) || h === this) {
                continue
            }
            if (h.elementClass == JXG.OBJECT_CLASS_POINT) {
                f = JXG.Math.Geometry.projectPointToPoint(this, h, this.board)
            } else {
                if (h.elementClass == JXG.OBJECT_CLASS_LINE) {
                    f = JXG.Math.Geometry.projectPointToLine(this, h, this.board)
                } else {
                    if (h.elementClass == JXG.OBJECT_CLASS_CIRCLE) {
                        f = JXG.Math.Geometry.projectPointToCircle(this, h, this.board)
                    } else {
                        if (h.elementClass == JXG.OBJECT_CLASS_CURVE) {
                            f = JXG.Math.Geometry.projectPointToCurve(this, h, this.board)
                        } else {
                            if (h.type == JXG.OBJECT_TYPE_TURTLE) {
                                f = JXG.Math.Geometry.projectPointToTurtle(this, h, this.board)
                            }
                        }
                    }
                }
            }
            j = f.distance(JXG.COORDS_BY_USER, this.coords);
            if (j < this.visProp.attractordistance) {
                found = true;
                if (!(this.type == JXG.OBJECT_TYPE_GLIDER && this.slideObject == h)) {
                    this.makeGlider(h)
                }
                break
            } else {
                if (h == this.slideObject && j >= this.visProp.snatchdistance) {
                    this.type = JXG.OBJECT_TYPE_POINT
                }
            }
        }
        return this
    },
    setPositionDirectly: function (d, j) {
        var g, n, m, l, f, e, h = this.coords,
            k;
        this.coords = new JXG.Coords(d, j, this.board);
        this.handleSnapToGrid();
        this.handleSnapToPoints();
        this.handleAttractors();
        if (this.group.length != 0) {
            n = this.coords.usrCoords[1] - h.usrCoords[1];
            m = this.coords.usrCoords[2] - h.usrCoords[2];
            l = this.coords.usrCoords[0] = h.usrCoords[0];
            for (g = 0; g < this.group.length; g++) {
                for (f in this.group[g].objects) {
                    e = this.group[g].objects[f];
                    e.initialCoords = new JXG.Coords(JXG.COORDS_BY_USER, [e.initialCoords.usrCoords[0] + l, e.initialCoords.usrCoords[1] + n, e.initialCoords.usrCoords[2] + m], this.board)
                }
            }
            this.group[this.group.length - 1].dX = n;
            this.group[this.group.length - 1].dY = m;
            this.group[this.group.length - 1].dZ = l;
            this.group[this.group.length - 1].update(this)
        } else {
            for (g = this.transformations.length - 1; g >= 0; g--) {
                if (d === JXG.COORDS_BY_SCREEN) {
                    k = (new JXG.Coords(d, j, this.board)).usrCoords
                } else {
                    if (j.length === 2) {
                        j = [1].concat(j)
                    }
                    k = j
                }
                this.initialCoords = new JXG.Coords(JXG.COORDS_BY_USER, JXG.Math.matVecMult(JXG.Math.inverse(this.transformations[g].matrix), k), this.board)
            }
            this.update()
        }
        return this
    },
    setPositionByTransform: function (f, d) {
        var e;
        d = new JXG.Coords(f, d, this.board);
        e = this.board.create("transform", d.usrCoords.slice(1), {
            type: "translate"
        });
        if (this.transformations.length > 0 && this.transformations[this.transformations.length - 1].isNumericMatrix) {
            this.transformations[this.transformations.length - 1].melt(e)
        } else {
            this.addTransform(this, e)
        }
        if (this.group.length == 0) {
            this.update()
        }
        return this
    },
    setPosition: function (e, d) {
        return this.setPositionDirectly(e, d)
    },
    setGliderPosition: function (d) {
        if (this.type = JXG.OBJECT_TYPE_GLIDER) {
            this.position = d;
            this.board.update()
        }
        return this
    },
    makeGlider: function (d) {
        this.slideObject = JXG.getRef(this.board, d);
        this.type = JXG.OBJECT_TYPE_GLIDER;
        this.elType = "glider";
        this.visProp.snapwidth = -1;
        this.slideObject.addChild(this);
        this.isDraggable = true;
        this.generatePolynomial = function () {
            return this.slideObject.generatePolynomial(this)
        };
        this.updateGlider();
        return this
    },
    free: function () {
        var d;
        if (this.type !== JXG.OBJECT_TYPE_GLIDER) {
            if (!this.isDraggable) {
                this.isDraggable = true;
                this.type = JXG.OBJECT_TYPE_POINT;
                this.XEval = function () {
                    return this.coords.usrCoords[1]
                };
                this.YEval = function () {
                    return this.coords.usrCoords[2]
                };
                this.ZEval = function () {
                    return this.coords.usrCoords[0]
                };
                this.Xjc = null;
                this.Yjc = null
            } else {
                return
            }
        }
        for (d in this.ancestors) {
            delete this.ancestors[d].descendants[this.id];
            delete this.ancestors[d].childElements[this.id]
        }
        this.ancestors = [];
        this.slideObject = null;
        this.elType = "point";
        this.type = JXG.OBJECT_TYPE_POINT
    },
    addConstraint: function (h) {
        this.type = JXG.OBJECT_TYPE_CAS;
        var k = [],
            d, g, e, f, j = ["X", "Y"];
        this.isDraggable = false;
        for (g = 0; g < h.length; g++) {
            e = h[g];
            if (typeof e == "string") {
                k[g] = this.board.jc.snippet(e, true, null, true);
                if (h.length === 2) {
                    this[j[g] + "jc"] = h[g]
                }
            } else {
                if (typeof e == "function") {
                    k[g] = e
                } else {
                    if (typeof e == "number") {
                        k[g] = function (i) {
                            return function () {
                                return i
                            }
                        }(e)
                    } else {
                        if (typeof e == "object" && typeof e.Value == "function") {
                            k[g] = (function (i) {
                                return function () {
                                    return i.Value()
                                }
                            })(e)
                        }
                    }
                }
            }
            k[g].origin = e
        }
        if (h.length == 1) {
            this.updateConstraint = function () {
                var i = k[0]();
                if (JXG.isArray(i)) {
                    this.coords.setCoordinates(JXG.COORDS_BY_USER, i)
                } else {
                    this.coords = i
                }
            }
        } else {
            if (h.length == 2) {
                this.XEval = k[0];
                this.YEval = k[1];
                d = "this.coords.setCoordinates(JXG.COORDS_BY_USER,[this.XEval(),this.YEval()]);";
                this.updateConstraint = new Function("", d)
            } else {
                this.ZEval = k[0];
                this.XEval = k[1];
                this.YEval = k[2];
                d = "this.coords.setCoordinates(JXG.COORDS_BY_USER,[this.ZEval(),this.XEval(),this.YEval()]);";
                this.updateConstraint = new Function("", d)
            }
        }
        if (!this.board.isSuspendedUpdate) {
            this.prepareUpdate().update().updateRenderer()
        }
        return this
    },
    updateTransform: function () {
        if (this.transformations.length == 0 || this.baseElement == null) {
            return this
        }
        var e, d;
        if (this === this.baseElement) {
            e = this.transformations[0].apply(this.baseElement, "self")
        } else {
            e = this.transformations[0].apply(this.baseElement)
        }
        this.coords.setCoordinates(JXG.COORDS_BY_USER, e);
        for (d = 1; d < this.transformations.length; d++) {
            this.coords.setCoordinates(JXG.COORDS_BY_USER, this.transformations[d].apply(this))
        }
        return this
    },
    addTransform: function (g, e) {
        var f, h = JXG.isArray(e) ? e : [e],
            d = h.length;
        if (this.transformations.length === 0) {
            this.baseElement = g
        }
        for (f = 0; f < d; f++) {
            this.transformations.push(h[f])
        }
        return this
    },
    startAnimation: function (d, e) {
        if ((this.type == JXG.OBJECT_TYPE_GLIDER) && (typeof this.intervalCode == "undefined")) {
            this.intervalCode = window.setInterval("JXG.JSXGraph.boards['" + this.board.id + "'].objects['" + this.id + "']._anim(" + d + ", " + e + ")", 250);
            if (typeof this.intervalCount == "undefined") {
                this.intervalCount = 0
            }
        }
        return this
    },
    stopAnimation: function () {
        if (typeof this.intervalCode != "undefined") {
            window.clearInterval(this.intervalCode);
            delete(this.intervalCode)
        }
        return this
    },
    moveAlong: function (m, e, n) {
        n = n || {};
        var l = [],
            h = this.board.options.animationDelay,
            j = function (p, o) {
                return function () {
                    return m[p][o]
                }
            }, d = [],
            g, f, k = e / h;
        if (JXG.isArray(m)) {
            for (g = 0; g < m.length; g++) {
                if (JXG.isPoint(m[g])) {
                    d[g] = m[g]
                } else {
                    d[g] = {
                        elementClass: JXG.OBJECT_CLASS_POINT,
                        X: j(g, 0),
                        Y: j(g, 1)
                    }
                }
            }
            e = e || 0;
            if (e === 0) {
                this.setPosition(JXG.COORDS_BY_USER, [d[d.length - 1].X(), d[d.length - 1].Y()]);
                return this.board.update(this)
            }
            f = JXG.Math.Numerics.Neville(d);
            for (g = 0; g < k; g++) {
                l[g] = [];
                l[g][0] = f[0]((k - g) / k * f[3]());
                l[g][1] = f[1]((k - g) / k * f[3]())
            }
            this.animationPath = l
        } else {
            if (JXG.isFunction(m)) {
                this.animationPath = m;
                this.animationStart = new Date().getTime()
            }
        }
        this.animationCallback = n.callback;
        this.board.addAnimation(this);
        return this
    },
    moveTo: function (k, f, p) {
        k = new JXG.Coords(JXG.COORDS_BY_USER, k, this.board);
        if (typeof f == "undefined" || f == 0 || (Math.abs(k.usrCoords[0] - this.coords.usrCoords[0]) > JXG.Math.eps)) {
            this.setPosition(JXG.COORDS_BY_USER, k.usrCoords);
            return this.board.update(this)
        }
        p = p || {};
        var l = this.board.options.animationDelay,
            m = Math.ceil(f / (l * 1)),
            n = new Array(m + 1),
            e = this.coords.usrCoords[1],
            d = this.coords.usrCoords[2],
            h = (k.usrCoords[1] - e),
            g = (k.usrCoords[2] - d),
            j, o = function (q) {
                if (p.effect && p.effect == "<>") {
                    return Math.pow(Math.sin((q / (m * 1)) * Math.PI / 2), 2)
                }
                return q / m
            };
        if (Math.abs(h) < JXG.Math.eps && Math.abs(g) < JXG.Math.eps) {
            return this
        }
        for (j = m; j >= 0; j--) {
            n[m - j] = [k.usrCoords[0], e + h * o(j), d + g * o(j)]
        }
        this.animationPath = n;
        this.animationCallback = p.callback;
        this.board.addAnimation(this);
        return this
    },
    visit: function (m, f, r) {
        if (typeof r == "number") {
            r = {
                repeat: r
            }
        } else {
            r = r || {};
            if (typeof r.repeat == "undefined") {
                r.repeat = 1
            }
        }
        var n = this.board.options.animationDelay,
            o = Math.ceil(f / (n * r.repeat)),
            p = new Array(r.repeat * (o + 1)),
            e = this.coords.usrCoords[1],
            d = this.coords.usrCoords[2],
            k = (m[0] - e),
            g = (m[1] - d),
            l, h, q = function (s) {
                var j = (s < o / 2 ? 2 * s / o : 2 * (o - s) / o);
                if (r.effect && r.effect == "<>") {
                    return Math.pow(Math.sin((j) * Math.PI / 2), 2)
                }
                return j
            };
        for (h = 0; h < r.repeat; h++) {
            for (l = o; l >= 0; l--) {
                p[h * (o + 1) + o - l] = [m[0], e + k * q(l), d + g * q(l)]
            }
        }
        this.animationPath = p;
        this.animationCallback = r.callback;
        this.board.addAnimation(this);
        return this
    },
    _anim: function (n, i) {
        var e, l, j, h, g, f, m = 1,
            d, k;
        this.intervalCount++;
        if (this.intervalCount > i) {
            this.intervalCount = 0
        }
        if (this.slideObject.elementClass == JXG.OBJECT_CLASS_LINE) {
            e = this.slideObject.point1.coords.distance(JXG.COORDS_BY_SCREEN, this.slideObject.point2.coords);
            l = this.slideObject.getSlope();
            if (l != "INF") {
                g = Math.atan(l);
                j = Math.round((this.intervalCount / i) * e * Math.cos(g));
                h = Math.round((this.intervalCount / i) * e * Math.sin(g))
            } else {
                j = 0;
                h = Math.round((this.intervalCount / i) * e)
            }
            if (n < 0) {
                f = this.slideObject.point2;
                if (this.slideObject.point2.coords.scrCoords[1] - this.slideObject.point1.coords.scrCoords[1] > 0) {
                    m = -1
                } else {
                    if (this.slideObject.point2.coords.scrCoords[1] - this.slideObject.point1.coords.scrCoords[1] == 0) {
                        if (this.slideObject.point2.coords.scrCoords[2] - this.slideObject.point1.coords.scrCoords[2] > 0) {
                            m = -1
                        }
                    }
                }
            } else {
                f = this.slideObject.point1;
                if (this.slideObject.point1.coords.scrCoords[1] - this.slideObject.point2.coords.scrCoords[1] > 0) {
                    m = -1
                } else {
                    if (this.slideObject.point1.coords.scrCoords[1] - this.slideObject.point2.coords.scrCoords[1] == 0) {
                        if (this.slideObject.point1.coords.scrCoords[2] - this.slideObject.point2.coords.scrCoords[2] > 0) {
                            m = -1
                        }
                    }
                }
            }
            this.coords.setCoordinates(JXG.COORDS_BY_SCREEN, [f.coords.scrCoords[1] + m * j, f.coords.scrCoords[2] + m * h])
        } else {
            if (this.slideObject.elementClass == JXG.OBJECT_CLASS_CURVE) {
                if (n > 0) {
                    d = Math.round(this.intervalCount / i * this.board.canvasWidth)
                } else {
                    d = Math.round((i - this.intervalCount) / i * this.board.canvasWidth)
                }
                this.coords.setCoordinates(JXG.COORDS_BY_SCREEN, [d, 0]);
                this.coords = JXG.Math.Geometry.projectPointToCurve(this, this.slideObject, this.board)
            } else {
                if (this.slideObject.elementClass == JXG.OBJECT_CLASS_CIRCLE) {
                    if (n < 0) {
                        g = this.intervalCount / i * 2 * Math.PI
                    } else {
                        g = (i - this.intervalCount) / i * 2 * Math.PI
                    }
                    k = this.slideObject.Radius();
                    this.coords.setCoordinates(JXG.COORDS_BY_USER, [this.slideObject.center.coords.usrCoords[1] + k * Math.cos(g), this.slideObject.center.coords.usrCoords[2] + k * Math.sin(g)])
                }
            }
        }
        this.board.update(this);
        return this
    },
    setStyle: function (d) {
        var e = ["cross", "cross", "cross", "circle", "circle", "circle", "circle", "square", "square", "square", "plus", "plus", "plus"],
            f = [2, 3, 4, 1, 2, 3, 4, 2, 3, 4, 2, 3, 4];
        this.visProp.face = e[d];
        this.visProp.size = f[d];
        this.board.renderer.changePointStyle(this);
        return this
    },
    normalizeFace: function (d) {
        var e = {
            cross: "x",
            x: "x",
            circle: "o",
            o: "o",
            square: "[]",
            "[]": "[]",
            plus: "+",
            "+": "+",
            diamond: "<>",
            "<>": "<>",
            triangleup: "^",
            a: "^",
            "^": "^",
            triangledown: "v",
            v: "v",
            triangleleft: "<",
            "<": "<",
            triangleright: ">",
            ">": ">"
        };
        return e[d]
    },
    remove: function () {
        if (this.hasLabel) {
            this.board.renderer.remove(this.board.renderer.getElementById(this.label.content.id))
        }
        this.board.renderer.remove(this.board.renderer.getElementById(this.id))
    },
    getTextAnchor: function () {
        return this.coords
    },
    getLabelAnchor: function () {
        return this.coords
    },
    face: function (d) {
        this.setProperty({
            face: d
        })
    },
    size: function (d) {
        this.setProperty({
            size: d
        })
    },
    cloneToBackground: function () {
        var d = {};
        d.id = this.id + "T" + this.numTraces;
        this.numTraces++;
        d.coords = this.coords;
        d.visProp = JXG.deepCopy(this.visProp, this.visProp.traceattributes, true);
        d.visProp.layer = this.board.options.layer.trace;
        d.elementClass = JXG.OBJECT_CLASS_POINT;
        d.board = this.board;
        JXG.clearVisPropOld(d);
        this.board.renderer.drawPoint(d);
        this.traces[d.id] = d.rendNode;
        return this
    },
    getParents: function () {
        var d = [this.Z(), this.X(), this.Y()];
        if (this.parents) {
            d = this.parents
        }
        if (this.type == JXG.OBJECT_TYPE_GLIDER) {
            d = [this.X(), this.Y(), this.slideObject.id]
        }
        return d
    }
});
JXG.createPoint = function (k, g, f) {
    var j, e = false,
        h, d;
    d = JXG.copyAttributes(f, k.options, "point");
    for (h = 0; h < g.length; h++) {
        if (typeof g[h] == "function" || typeof g[h] == "string") {
            e = true
        }
    }
    if (!e) {
        if ((JXG.isNumber(g[0])) && (JXG.isNumber(g[1]))) {
            j = new JXG.Point(k, g, d);
            if (JXG.exists(d.slideobject)) {
                j.makeGlider(d.slideobject)
            } else {
                j.baseElement = j
            }
            j.isDraggable = true
        } else {
            if ((typeof g[0] == "object") && (typeof g[1] == "object")) {
                j = new JXG.Point(k, [0, 0], d);
                j.addTransform(g[0], g[1]);
                j.isDraggable = false;
                j.parents = [g[0].id, g[1].id]
            } else {
                throw new Error("JSXGraph: Can't create point with parent types '" + (typeof g[0]) + "' and '" + (typeof g[1]) + "'.\nPossible parent types: [x,y], [z,x,y], [point,transformation]")
            }
        }
    } else {
        j = new JXG.Point(k, [NaN, NaN], d);
        j.addConstraint(g)
    }
    return j
};
JXG.createGlider = function (h, f, e) {
    var g, d = JXG.copyAttributes(e, h.options, "glider");
    if (f.length === 1) {
        g = h.create("point", [0, 0], d)
    } else {
        g = h.create("point", f.slice(0, 2), d)
    }
    g.makeGlider(f[f.length - 1]);
    return g
};
JXG.createIntersectionPoint = function (h, f, d) {
    var g;
    f.push(0, 0);
    g = h.create("point", [h.intersection(f[0], f[1], f[2], f[3])], d);
    try {
        f[0].addChild(g);
        f[1].addChild(g)
    } catch (i) {
        throw new Error("JSXGraph: Can't create 'intersection' with parent types '" + (typeof f[0]) + "' and '" + (typeof f[1]) + "'.")
    }
    g.elType = "intersection";
    g.parents = [f[0].id, f[1].id, f[2]];
    if (f[3] != null) {
        g.parents.push(f[3])
    }
    g.generatePolynomial = function () {
        var e = f[0].generatePolynomial(g);
        var j = f[1].generatePolynomial(g);
        if ((e.length == 0) || (j.length == 0)) {
            return []
        } else {
            return [e[0], j[0]]
        }
    };
    return g
};
JXG.createOtherIntersectionPoint = function (g, e, d) {
    var f;
    if (e.length != 3 || !JXG.isPoint(e[2]) || (e[0].elementClass != JXG.OBJECT_CLASS_LINE && e[0].elementClass != JXG.OBJECT_CLASS_CIRCLE) || (e[1].elementClass != JXG.OBJECT_CLASS_LINE && e[1].elementClass != JXG.OBJECT_CLASS_CIRCLE)) {
        throw new Error("JSXGraph: Can't create 'other intersection point' with parent types '" + (typeof e[0]) + "',  '" + (typeof e[1]) + "'and  '" + (typeof e[2]) + "'.\nPossible parent types: [circle|line,circle|line,point]")
    } else {
        f = g.create("point", [g.otherIntersection(e[0], e[1], e[2])], d)
    }
    f.elType = "otherintersection";
    f.parents = [e[0].id, e[1].id, e[2]];
    e[0].addChild(f);
    e[1].addChild(f);
    f.generatePolynomial = function () {
        var h = e[0].generatePolynomial(f);
        var i = e[1].generatePolynomial(f);
        if ((h.length == 0) || (i.length == 0)) {
            return []
        } else {
            return [h[0], i[0]]
        }
    };
    return f
};
JXG.JSXGraph.registerElement("point", JXG.createPoint);
JXG.JSXGraph.registerElement("glider", JXG.createGlider);
JXG.JSXGraph.registerElement("intersection", JXG.createIntersectionPoint);
JXG.JSXGraph.registerElement("otherintersection", JXG.createOtherIntersectionPoint);
JXG.Line = function (e, g, f, d) {
    this.constructor(e, d, JXG.OBJECT_TYPE_LINE, JXG.OBJECT_CLASS_LINE);
    this.point1 = JXG.getReference(this.board, g);
    this.point2 = JXG.getReference(this.board, f);
    this.ticks = [];
    this.defaultTicks = null;
    this.parentPolygon = null;
    this.id = this.board.setId(this, "L");
    this.board.renderer.drawLine(this);
    this.board.finalizeAdding(this);
    this.elType = "line";
    this.createLabel();
    this.point1.addChild(this);
    this.point2.addChild(this);
    this.updateStdform()
};
JXG.Line.prototype = new JXG.GeometryElement;
JXG.extend(JXG.Line.prototype, {
    hasPoint: function (l, k) {
        var h = [],
            o, n = [1, l, k],
            m, p, g, f, j, e;
        h[0] = this.stdform[0] - this.stdform[1] * this.board.origin.scrCoords[1] / this.board.unitX + this.stdform[2] * this.board.origin.scrCoords[2] / this.board.unitY;
        h[1] = this.stdform[1] / this.board.unitX;
        h[2] = this.stdform[2] / (-this.board.unitY);
        m = [0, h[1], h[2]];
        m = JXG.Math.crossProduct(m, n);
        m = JXG.Math.crossProduct(m, h);
        m[1] /= m[0];
        m[2] /= m[0];
        m[0] = 1;
        o = (n[1] - m[1]) * (n[1] - m[1]) + (n[2] - m[2]) * (n[2] - m[2]);
        if (isNaN(o) || o > this.board.options.precision.hasPoint * this.board.options.precision.hasPoint) {
            return false
        }
        if (this.visProp.straightfirst && this.visProp.straightlast) {
            return true
        } else {
            p = this.point1.coords;
            g = this.point2.coords;
            m = (new JXG.Coords(JXG.COORDS_BY_SCREEN, m.slice(1), this.board)).usrCoords;
            f = p.distance(JXG.COORDS_BY_USER, g);
            p = p.usrCoords.slice(0);
            g = g.usrCoords.slice(0);
            if (f < JXG.Math.eps) {
                j = 0
            } else {
                if (f == Number.POSITIVE_INFINITY) {
                    f = 1 / JXG.Math.eps;
                    if (Math.abs(g[0]) < JXG.Math.eps) {
                        f /= JXG.Math.Geometry.distance([0, 0, 0], g);
                        g = [1, p[1] + g[1] * f, p[2] + g[2] * f]
                    } else {
                        f /= JXG.Math.Geometry.distance([0, 0, 0], p);
                        p = [1, g[1] + p[1] * f, g[2] + p[2] * f]
                    }
                }
                e = 1;
                f = g[e] - p[e];
                if (Math.abs(f) < JXG.Math.eps) {
                    e = 2;
                    f = g[e] - p[e]
                }
                j = (m[e] - p[e]) / f
            }
            if (!this.visProp.straightfirst && j < 0) {
                return false
            }
            if (!this.visProp.straightlast && j > 1) {
                return false
            }
            return true
        }
    },
    update: function () {
        var d;
        if (!this.needsUpdate) {
            return this
        }
        if (this.constrained) {
            if (typeof this.funps != "undefined") {
                d = this.funps();
                if (d && d.length && d.length === 2) {
                    this.point1 = d[0];
                    this.point2 = d[1]
                }
            } else {
                if (typeof this.funp1 === "function") {
                    d = this.funp1();
                    if (JXG.isPoint(d)) {
                        this.point1 = d
                    } else {
                        if (d && d.length && d.length === 2) {
                            this.point1.setPositionDirectly(JXG.COORDS_BY_USER, d)
                        }
                    }
                }
                if (typeof this.funp2 === "function") {
                    d = this.funp2();
                    if (JXG.isPoint(d)) {
                        this.point2 = d
                    } else {
                        if (d && d.length && d.length === 2) {
                            this.point2.setPositionDirectly(JXG.COORDS_BY_USER, d)
                        }
                    }
                }
            }
        }
        this.updateSegmentFixedLength();
        this.updateStdform();
        if (this.visProp.trace) {
            this.cloneToBackground(true)
        }
        return this
    },
    updateSegmentFixedLength: function () {
        var k, f, j, i, h, g, e, l;
        if (!this.hasFixedLength) {
            return this
        }
        k = this.point1.Dist(this.point2);
        f = this.fixedLength();
        j = this.fixedLengthOldCoords[0].distance(JXG.COORDS_BY_USER, this.point1.coords);
        i = this.fixedLengthOldCoords[1].distance(JXG.COORDS_BY_USER, this.point2.coords);
        if (j > JXG.Math.eps || i > JXG.Math.eps || k != f) {
            h = this.point1.isDraggable && (this.point1.type != JXG.OBJECT_TYPE_GLIDER) && !this.point1.visProp.fixed;
            g = this.point2.isDraggable && (this.point2.type != JXG.OBJECT_TYPE_GLIDER) && !this.point2.visProp.fixed;
            if (k > JXG.Math.eps) {
                if ((j > i && g) || (j <= i && g && !h)) {
                    this.point2.setPositionDirectly(JXG.COORDS_BY_USER, [this.point1.X() + (this.point2.X() - this.point1.X()) * f / k, this.point1.Y() + (this.point2.Y() - this.point1.Y()) * f / k]);
                    this.point2.prepareUpdate().updateRenderer()
                } else {
                    if ((j <= i && h) || (j > i && h && !g)) {
                        this.point1.setPositionDirectly(JXG.COORDS_BY_USER, [this.point2.X() + (this.point1.X() - this.point2.X()) * f / k, this.point2.Y() + (this.point1.Y() - this.point2.Y()) * f / k]);
                        this.point1.prepareUpdate().updateRenderer()
                    }
                }
            } else {
                e = Math.random() - 0.5;
                l = Math.random() - 0.5;
                k = Math.sqrt(e * e + l * l);
                if (g) {
                    this.point2.setPositionDirectly(JXG.COORDS_BY_USER, [this.point1.X() + e * f / k, this.point1.Y() + l * f / k]);
                    this.point2.prepareUpdate().updateRenderer()
                } else {
                    if (h) {
                        this.point1.setPositionDirectly(JXG.COORDS_BY_USER, [this.point2.X() + e * f / k, this.point2.Y() + l * f / k]);
                        this.point1.prepareUpdate().updateRenderer()
                    }
                }
            }
            this.fixedLengthOldCoords[0].setCoordinates(JXG.COORDS_BY_USER, this.point1.coords.usrCoords);
            this.fixedLengthOldCoords[1].setCoordinates(JXG.COORDS_BY_USER, this.point2.coords.usrCoords)
        }
        return this
    },
    updateStdform: function () {
        var d = JXG.Math.crossProduct(this.point1.coords.usrCoords, this.point2.coords.usrCoords);
        this.stdform[0] = d[0];
        this.stdform[1] = d[1];
        this.stdform[2] = d[2];
        this.stdform[3] = 0;
        this.normalize()
    },
    updateRenderer: function () {
        var d;
        if (this.needsUpdate && this.visProp.visible) {
            d = this.isReal;
            this.isReal = (!isNaN(this.point1.coords.usrCoords[1] + this.point1.coords.usrCoords[2] + this.point2.coords.usrCoords[1] + this.point2.coords.usrCoords[2]) && (JXG.Math.innerProduct(this.stdform, this.stdform, 3) >= JXG.Math.eps * JXG.Math.eps));
            if (this.isReal) {
                if (d != this.isReal) {
                    this.board.renderer.show(this);
                    if (this.hasLabel && this.label.content.visProp.visible) {
                        this.board.renderer.show(this.label.content)
                    }
                }
                this.board.renderer.updateLine(this)
            } else {
                if (d != this.isReal) {
                    this.board.renderer.hide(this);
                    if (this.hasLabel && this.label.content.visProp.visible) {
                        this.board.renderer.hide(this.label.content)
                    }
                }
            }
            this.needsUpdate = false
        }
        if (this.hasLabel && this.label.content.visProp.visible && this.isReal) {
            this.label.content.update();
            this.board.renderer.updateText(this.label.content)
        }
        return this
    },
    generatePolynomial: function (h) {
        var g = this.point1.symbolic.x,
            f = this.point1.symbolic.y,
            j = this.point2.symbolic.x,
            i = this.point2.symbolic.y,
            e = h.symbolic.x,
            d = h.symbolic.y;
        return [["(", f, ")*(", e, ")-(", f, ")*(", j, ")+(", d, ")*(", j, ")-(", g, ")*(", d, ")+(", g, ")*(", i, ")-(", e, ")*(", i, ")"].join("")]
    },
    getRise: function () {
        if (Math.abs(this.stdform[2]) >= JXG.Math.eps) {
            return -this.stdform[0] / this.stdform[2]
        } else {
            return Infinity
        }
    },
    getSlope: function () {
        if (Math.abs(this.stdform[2]) >= JXG.Math.eps) {
            return -this.stdform[1] / this.stdform[2]
        } else {
            return Infinity
        }
    },
    getAngle: function () {
        return Math.atan2(this.point2.Y() - this.point1.Y(), this.point2.X() - this.point1.X())
    },
    setStraight: function (d, e) {
        this.visProp.straightfirst = d;
        this.visProp.straightlast = e;
        this.board.renderer.updateLine(this);
        return this
    },
    getTextAnchor: function () {
        return new JXG.Coords(JXG.COORDS_BY_USER, [0.5 * (this.point2.X() + this.point1.X()), 0.5 * (this.point2.Y() + this.point1.Y())], this.board)
    },
    setLabelRelativeCoords: function (d) {
        if (JXG.exists(this.label.content)) {
            this.label.content.relativeCoords = new JXG.Coords(JXG.COORDS_BY_SCREEN, [d[0], - d[1]], this.board)
        }
    },
    getLabelAnchor: function () {
        var e, j, d = 0,
            i = 0,
            h = 0,
            g = new JXG.Coords(JXG.COORDS_BY_USER, this.point1.coords.usrCoords, this.board),
            f = new JXG.Coords(JXG.COORDS_BY_USER, this.point2.coords.usrCoords, this.board);
        if (this.visProp.straightfirst || this.visProp.straightlast) {
            JXG.Math.Geometry.calcStraight(this, g, f, 0)
        }
        g = g.scrCoords;
        f = f.scrCoords;
        switch (this.label.content.visProp.position) {
            case "lft":
            case "llft":
            case "ulft":
                if (g[1] <= f[1]) {
                    e = g[1];
                    j = g[2]
                } else {
                    e = f[1];
                    j = f[2]
                }
                break;
            case "rt":
            case "lrt":
            case "urt":
                if (g[1] > f[1]) {
                    e = g[1];
                    j = g[2]
                } else {
                    e = f[1];
                    j = f[2]
                }
                break;
            default:
                e = 0.5 * (g[1] + f[1]);
                j = 0.5 * (g[2] + f[2])
        }
        if (this.visProp.straightfirst || this.visProp.straightlast) {
            if (JXG.exists(this.label.content)) {
                i = parseFloat(this.label.content.visProp.offset[0]);
                h = parseFloat(this.label.content.visProp.offset[1]);
                d = this.label.content.visProp.fontsize
            }
            if (Math.abs(e) < JXG.Math.eps) {
                e = i
            } else {
                if (this.board.canvasWidth + JXG.Math.eps > e && e > this.board.canvasWidth - d - JXG.Math.eps) {
                    e = this.board.canvasWidth - i - d
                } else {
                    e += i
                }
            }
            if (JXG.Math.eps + d > j && j > -JXG.Math.eps) {
                j = h + d
            } else {
                if (this.board.canvasHeight + JXG.Math.eps > j && j > this.board.canvasHeight - d - JXG.Math.eps) {
                    j = this.board.canvasHeight - h
                } else {
                    j += h
                }
            }
        }
        return new JXG.Coords(JXG.COORDS_BY_SCREEN, [e, j], this.board)
    },
    cloneToBackground: function () {
        var g = {}, e, d, f;
        g.id = this.id + "T" + this.numTraces;
        g.elementClass = JXG.OBJECT_CLASS_LINE;
        this.numTraces++;
        g.point1 = this.point1;
        g.point2 = this.point2;
        g.stdform = this.stdform;
        g.board = this.board;
        g.visProp = JXG.deepCopy(this.visProp, this.visProp.traceattributes, true);
        g.visProp.layer = this.board.options.layer.trace;
        JXG.clearVisPropOld(g);
        d = this.getSlope();
        e = this.getRise();
        g.getSlope = function () {
            return d
        };
        g.getRise = function () {
            return e
        };
        f = this.board.renderer.enhancedRendering;
        this.board.renderer.enhancedRendering = true;
        this.board.renderer.drawLine(g);
        this.board.renderer.enhancedRendering = f;
        this.traces[g.id] = g.rendNode;
        delete g;
        return this
    },
    addTransform: function (e) {
        var f, g = JXG.isArray(e) ? e : [e],
            d = g.length;
        for (f = 0; f < d; f++) {
            this.point1.transformations.push(g[f]);
            this.point2.transformations.push(g[f])
        }
        return this
    },
    setPosition: function (f, d) {
        var e;
        d = new JXG.Coords(f, d, this.board);
        e = this.board.create("transform", d.usrCoords.slice(1), {
            type: "translate"
        });
        if (this.point1.transformations.length > 0 && this.point1.transformations[this.point1.transformations.length - 1].isNumericMatrix) {
            this.point1.transformations[this.point1.transformations.length - 1].melt(e)
        } else {
            this.point1.addTransform(this.point1, e)
        }
        if (this.point2.transformations.length > 0 && this.point2.transformations[this.point2.transformations.length - 1].isNumericMatrix) {
            this.point2.transformations[this.point2.transformations.length - 1].melt(e)
        } else {
            this.point2.addTransform(this.point2, e)
        }
        return this
    },
    setPositionDirectly: function (j, h, g) {
        var d, e, i = new JXG.Coords(j, h, this.board),
            f = new JXG.Coords(j, g, this.board);
        if (!this.point1.draggable() || !this.point2.draggable()) {
            return this
        }
        d = JXG.Math.Statistics.subtract(i.usrCoords, f.usrCoords);
        e = this.board.create("transform", d.slice(1), {
            type: "translate"
        });
        e.applyOnce([this.point1, this.point2]);
        return this
    },
    snapToGrid: function () {
        if (this.visProp.snaptogrid) {
            this.point1.snapToGrid();
            this.point2.snapToGrid()
        }
        return this
    },
    X: function (f) {
        var e = this.stdform[2],
            d;
        d = (Math.abs(this.point1.coords.usrCoords[0]) > JXG.Math.eps) ? this.point1.coords.usrCoords[1] : this.point2.coords.usrCoords[1];
        f = (f - 0.5) * 2;
        if (f < 0) {
            f *= (-1);
            return (1 - f) * d + f * e
        } else {
            return (1 - f) * d - f * e
        }
    },
    Y: function (e) {
        var d = this.stdform[1],
            f;
        f = (Math.abs(this.point1.coords.usrCoords[0]) > JXG.Math.eps) ? this.point1.coords.usrCoords[2] : this.point2.coords.usrCoords[2];
        e = (e - 0.5) * 2;
        if (e < 0) {
            e *= (-1);
            return (1 - e) * f - e * d
        } else {
            return (1 - e) * f + e * d
        }
    },
    Z: function (d) {
        var e = (Math.abs(this.point1.coords.usrCoords[0]) > JXG.Math.eps) ? this.point1.coords.usrCoords[0] : this.point2.coords.usrCoords[0];
        d = (d - 0.5) * 2;
        if (d < 0) {
            d *= (-1)
        }
        return (1 - d) * e
    },
    L: function () {
        return this.point1.Dist(this.point2)
    },
    minX: function () {
        return 0
    },
    maxX: function () {
        return 1
    },
    bounds: function () {
        var d = this.point1.coords.usrCoords,
            e = this.point2.coords.usrCoords;
        return [Math.min(d[1], e[1]), Math.max(d[2], e[2]), Math.max(d[1], e[1]), Math.min(d[2], e[2])]
    },
    addTicks: function (d) {
        if (d.id == "" || typeof d.id == "undefined") {
            d.id = this.id + "_ticks_" + (this.ticks.length + 1)
        }
        this.board.renderer.drawTicks(d);
        this.ticks.push(d);
        return d.id
    },
    remove: function () {
        this.removeAllTicks();
        JXG.GeometryElement.prototype.remove.call(this)
    },
    removeAllTicks: function () {
        var e, d;
        for (d = this.ticks.length; d > 0; d--) {
            this.removeTicks(this.ticks[d - 1])
        }
        this.ticks = new Array();
        this.board.update()
    },
    removeTicks: function (f) {
        var e, d;
        if (this.defaultTicks != null && this.defaultTicks == f) {
            this.defaultTicks = null
        }
        for (e = this.ticks.length; e > 0; e--) {
            if (this.ticks[e - 1] == f) {
                this.board.removeObject(this.ticks[e - 1]);
                for (d = 0; d < this.ticks[e - 1].ticks.length; d++) {
                    if (this.ticks[e - 1].labels[d] != null) {
                        this.board.removeObject(this.ticks[e - 1].labels[d])
                    }
                }
                delete(this.ticks[e - 1]);
                break
            }
        }
    },
    hideElement: function () {
        var d;
        JXG.GeometryElement.prototype.hideElement.call(this);
        for (d = 0; d < this.ticks.length; d++) {
            this.ticks[d].hideElement()
        }
    },
    showElement: function () {
        var d;
        JXG.GeometryElement.prototype.showElement.call(this);
        for (d = 0; d < this.ticks.length; d++) {
            this.ticks[d].showElement()
        }
    }
});
JXG.createLine = function (k, n, h) {
    var f, p, o, j, l, m = [],
        g = false,
        e;
    if (n.length == 2) {
        if (JXG.isArray(n[0]) && n[0].length > 1) {
            l = JXG.copyAttributes(h, k.options, "line", "point1");
            p = k.create("point", n[0], l)
        } else {
            if (JXG.isString(n[0]) || n[0].elementClass == JXG.OBJECT_CLASS_POINT) {
                p = JXG.getReference(k, n[0])
            } else {
                if ((typeof n[0] == "function") && (n[0]().elementClass == JXG.OBJECT_CLASS_POINT)) {
                    p = n[0]();
                    g = true
                } else {
                    if ((typeof n[0] == "function") && (n[0]().length && n[0]().length === 2)) {
                        l = JXG.copyAttributes(h, k.options, "line", "point1");
                        p = JXG.createPoint(k, n[0](), l);
                        g = true
                    } else {
                        throw new Error("JSXGraph: Can't create line with parent types '" + (typeof n[0]) + "' and '" + (typeof n[1]) + "'.\nPossible parent types: [point,point], [[x1,y1],[x2,y2]], [a,b,c]")
                    }
                }
            }
        }
        if (JXG.isArray(n[1]) && n[1].length > 1) {
            l = JXG.copyAttributes(h, k.options, "line", "point2");
            o = k.create("point", n[1], l)
        } else {
            if (JXG.isString(n[1]) || n[1].elementClass == JXG.OBJECT_CLASS_POINT) {
                o = JXG.getReference(k, n[1])
            } else {
                if ((typeof n[1] == "function") && (n[1]().elementClass == JXG.OBJECT_CLASS_POINT)) {
                    o = n[1]();
                    g = true
                } else {
                    if ((typeof n[1] == "function") && (n[1]().length && n[1]().length === 2)) {
                        l = JXG.copyAttributes(h, k.options, "line", "point2");
                        o = JXG.createPoint(k, n[1](), l);
                        g = true
                    } else {
                        throw new Error("JSXGraph: Can't create line with parent types '" + (typeof n[0]) + "' and '" + (typeof n[1]) + "'.\nPossible parent types: [point,point], [[x1,y1],[x2,y2]], [a,b,c]")
                    }
                }
            }
        }
        l = JXG.copyAttributes(h, k.options, "line");
        f = new JXG.Line(k, p, o, l);
        if (g) {
            f.constrained = true;
            f.funp1 = n[0];
            f.funp2 = n[1]
        } else {
            f.isDraggable = true
        }
        if (!f.constrained) {
            f.parents = [p.id, o.id]
        }
    } else {
        if (n.length == 3) {
            e = true;
            for (j = 0; j < 3; j++) {
                if (typeof n[j] == "number") {
                    m[j] = function (i) {
                        return function () {
                            return i
                        }
                    }(n[j])
                } else {
                    if (typeof n[j] == "function") {
                        m[j] = n[j];
                        e = false
                    } else {
                        throw new Error("JSXGraph: Can't create line with parent types '" + (typeof n[0]) + "' and '" + (typeof n[1]) + "' and '" + (typeof n[2]) + "'.\nPossible parent types: [point,point], [[x1,y1],[x2,y2]], [a,b,c]")
                    }
                }
            }
            l = JXG.copyAttributes(h, k.options, "line", "point1");
            if (e) {
                p = k.create("point", [m[2]() * m[2]() + m[1]() * m[1](), m[2]() - m[1]() * m[0]() + m[2](), - m[1]() - m[2]() * m[0]() - m[1]()], l)
            } else {
                p = k.create("point", [function () {
                    return (0 + m[2]() * m[2]() + m[1]() * m[1]()) * 0.5
                }, function () {
                    return (m[2]() - m[1]() * m[0]() + m[2]()) * 0.5
                }, function () {
                    return (-m[1]() - m[2]() * m[0]() - m[1]()) * 0.5
                }], l)
            }
            l = JXG.copyAttributes(h, k.options, "line", "point2");
            if (e) {
                o = k.create("point", [m[2]() * m[2]() + m[1]() * m[1](), - m[1]() * m[0]() + m[2](), - m[2]() * m[0]() - m[1]()], l)
            } else {
                o = k.create("point", [function () {
                    return m[2]() * m[2]() + m[1]() * m[1]()
                }, function () {
                    return -m[1]() * m[0]() + m[2]()
                }, function () {
                    return -m[2]() * m[0]() - m[1]()
                }], l)
            }
            p.prepareUpdate().update();
            o.prepareUpdate().update();
            l = JXG.copyAttributes(h, k.options, "line");
            f = new JXG.Line(k, p, o, l);
            f.isDraggable = e;
            if (e) {
                f.parents = [m[0](), m[1](), m[2]()]
            }
        } else {
            if ((n.length == 1) && (typeof n[0] == "function") && (n[0]().length == 2) && (n[0]()[0].elementClass == JXG.OBJECT_CLASS_POINT) && (n[0]()[1].elementClass == JXG.OBJECT_CLASS_POINT)) {
                var d = n[0]();
                l = JXG.copyAttributes(h, k.options, "line");
                f = new JXG.Line(k, d[0], d[1], l);
                f.constrained = true;
                f.funps = n[0]
            } else {
                if ((n.length == 1) && (typeof n[0] == "function") && (n[0]().length == 3) && (typeof n[0]()[0] === "number") && (typeof n[0]()[1] === "number") && (typeof n[0]()[2] === "number")) {
                    d = n[0];
                    l = JXG.copyAttributes(h, k.options, "line", "point1");
                    p = k.create("point", [function () {
                        var i = d();
                        return [(0 + i[2] * i[2] + i[1] * i[1]) * 0.5, (i[2] - i[1] * i[0] + i[2]) * 0.5, (-i[1] - i[2] * i[0] - i[1]) * 0.5]
                    }], l);
                    l = JXG.copyAttributes(h, k.options, "line", "point2");
                    o = k.create("point", [function () {
                        var i = d();
                        return [i[2] * i[2] + i[1] * i[1], - i[1] * i[0] + i[2], - i[2] * i[0] - i[1]]
                    }], l);
                    l = JXG.copyAttributes(h, k.options, "line");
                    f = new JXG.Line(k, p, o, l);
                    f.constrained = true;
                    f.funps = n[0]
                } else {
                    throw new Error("JSXGraph: Can't create line with parent types '" + (typeof n[0]) + "' and '" + (typeof n[1]) + "'.\nPossible parent types: [point,point], [[x1,y1],[x2,y2]], [a,b,c]")
                }
            }
        }
    }
    return f
};
JXG.JSXGraph.registerElement("line", JXG.createLine);
JXG.createSegment = function (h, e, d) {
    var g, f;
    d.straightFirst = false;
    d.straightLast = false;
    g = h.create("line", e.slice(0, 2), d);
    if (e.length == 3) {
        g.hasFixedLength = true;
        if (JXG.isNumber(e[2])) {
            g.fixedLength = function () {
                return e[2]
            }
        } else {
            if (JXG.isFunction(e[2])) {
                g.fixedLength = e[2]
            } else {
                throw new Error("JSXGraph: Can't create segment with third parent type '" + (typeof e[2]) + "'.\nPossible third parent types: number or function")
            }
        }
        g.fixedLengthOldCoords = [];
        g.fixedLengthOldCoords[0] = new JXG.Coords(JXG.COORDS_BY_USER, g.point1.coords.usrCoords.slice(1, 3), h);
        g.fixedLengthOldCoords[1] = new JXG.Coords(JXG.COORDS_BY_USER, g.point2.coords.usrCoords.slice(1, 3), h)
    }
    g.elType = "segment";
    return g
};
JXG.JSXGraph.registerElement("segment", JXG.createSegment);
JXG.createArrow = function (g, e, d) {
    var f;
    d.firstArrow = false;
    d.lastArrow = true;
    f = g.create("line", e, d).setStraight(false, false);
    f.type = JXG.OBJECT_TYPE_VECTOR;
    f.elType = "arrow";
    return f
};
JXG.JSXGraph.registerElement("arrow", JXG.createArrow);
JXG.createAxis = function (i, f, e) {
    var d, h, j;
    if ((JXG.isArray(f[0]) || JXG.isPoint(f[0])) && (JXG.isArray(f[1]) || JXG.isPoint(f[1]))) {
        d = JXG.copyAttributes(e, i.options, "axis");
        h = i.create("line", f, d);
        h.type = JXG.OBJECT_TYPE_AXIS;
        h.isDraggable = false;
        h.point1.isDraggable = false;
        h.point2.isDraggable = false;
        for (var g in h.ancestors) {
            h.ancestors[g].type = JXG.OBJECT_TYPE_AXISPOINT
        }
        d = JXG.copyAttributes(e, i.options, "axis", "ticks");
        if (JXG.exists(d.ticksdistance)) {
            j = d.ticksdistance
        } else {
            if (JXG.isArray(d.ticks)) {
                j = d.ticks
            } else {
                j = 1
            }
        }
        h.defaultTicks = i.create("ticks", [h, j], d);
        h.defaultTicks.dump = false;
        h.elType = "axis";
        h.subs = {
            ticks: h.defaultTicks
        }
    } else {
        throw new Error("JSXGraph: Can't create point with parent types '" + (typeof f[0]) + "' and '" + (typeof f[1]) + "'.\nPossible parent types: [point,point], [[x1,y1],[x2,y2]]")
    }
    return h
};
JXG.JSXGraph.registerElement("axis", JXG.createAxis);
JXG.createTangent = function (o, r, k) {
    var d, q, m, n, l, h, e, s;
    if (r.length == 1) {
        d = r[0];
        q = d.slideObject
    } else {
        if (r.length == 2) {
            if (JXG.isPoint(r[0])) {
                d = r[0];
                q = r[1]
            } else {
                if (JXG.isPoint(r[1])) {
                    q = r[0];
                    d = r[1]
                } else {
                    throw new Error("JSXGraph: Can't create tangent with parent types '" + (typeof r[0]) + "' and '" + (typeof r[1]) + "'.\nPossible parent types: [glider], [point,line|curve|circle|conic]")
                }
            }
        } else {
            throw new Error("JSXGraph: Can't create tangent with parent types '" + (typeof r[0]) + "' and '" + (typeof r[1]) + "'.\nPossible parent types: [glider], [point,line|curve|circle|conic]")
        }
    }
    if (q.elementClass == JXG.OBJECT_CLASS_LINE) {
        s = o.create("line", [q.point1, q.point2], k)
    } else {
        if (q.elementClass == JXG.OBJECT_CLASS_CURVE && !(q.type == JXG.OBJECT_TYPE_CONIC)) {
            if (q.visProp.curvetype != "plot") {
                m = q.X;
                n = q.Y;
                s = o.create("line", [function () {
                    return -d.X() * o.D(n)(d.position) + d.Y() * o.D(m)(d.position)
                }, function () {
                    return o.D(n)(d.position)
                }, function () {
                    return -o.D(m)(d.position)
                }], k);
                d.addChild(s);
                s.glider = d
            } else {
                s = o.create("line", [function () {
                    l = Math.floor(d.position);
                    if (l == q.numberPoints - 1) {
                        l--
                    }
                    if (l < 0) {
                        return 1
                    }
                    return q.Y(l) * q.X(l + 1) - q.X(l) * q.Y(l + 1)
                }, function () {
                    l = Math.floor(d.position);
                    if (l == q.numberPoints - 1) {
                        l--
                    }
                    if (l < 0) {
                        return 0
                    }
                    return q.Y(l + 1) - q.Y(l)
                }, function () {
                    l = Math.floor(d.position);
                    if (l == q.numberPoints - 1) {
                        l--
                    }
                    if (l < 0) {
                        return 0
                    }
                    return q.X(l) - q.X(l + 1)
                }], k);
                d.addChild(s);
                s.glider = d
            }
        } else {
            if (q.type == JXG.OBJECT_TYPE_TURTLE) {
                s = o.create("line", [function () {
                    l = Math.floor(d.position);
                    for (h = 0; h < q.objects.length; h++) {
                        e = q.objects[h];
                        if (e.type == JXG.OBJECT_TYPE_CURVE) {
                            if (l < e.numberPoints) {
                                break
                            }
                            l -= e.numberPoints
                        }
                    }
                    if (l == e.numberPoints - 1) {
                        l--
                    }
                    if (l < 0) {
                        return 1
                    }
                    return e.Y(l) * e.X(l + 1) - e.X(l) * e.Y(l + 1)
                }, function () {
                    l = Math.floor(d.position);
                    for (h = 0; h < q.objects.length; h++) {
                        e = q.objects[h];
                        if (e.type == JXG.OBJECT_TYPE_CURVE) {
                            if (l < e.numberPoints) {
                                break
                            }
                            l -= e.numberPoints;
                            moveTo(funps)
                        }
                    }
                    if (l == e.numberPoints - 1) {
                        l--
                    }
                    if (l < 0) {
                        return 0
                    }
                    return e.Y(l + 1) - e.Y(l)
                }, function () {
                    l = Math.floor(d.position);
                    for (h = 0; h < q.objects.length; h++) {
                        e = q.objects[h];
                        if (e.type == JXG.OBJECT_TYPE_CURVE) {
                            if (l < e.numberPoints) {
                                break
                            }
                            l -= e.numberPoints
                        }
                    }
                    if (l == e.numberPoints - 1) {
                        l--
                    }
                    if (l < 0) {
                        return 0
                    }
                    return e.X(l) - e.X(l + 1)
                }], k);
                d.addChild(s);
                s.glider = d
            } else {
                if (q.elementClass == JXG.OBJECT_CLASS_CIRCLE || q.type == JXG.OBJECT_TYPE_CONIC) {
                    s = o.create("line", [function () {
                        return JXG.Math.matVecMult(q.quadraticform, d.coords.usrCoords)[0]
                    }, function () {
                        return JXG.Math.matVecMult(q.quadraticform, d.coords.usrCoords)[1]
                    }, function () {
                        return JXG.Math.matVecMult(q.quadraticform, d.coords.usrCoords)[2]
                    }], k);
                    d.addChild(s);
                    s.glider = d
                }
            }
        }
    }
    if (!JXG.exists(s)) {
        throw new Error("JSXGraph: Couldn't create tangent with the given parents.")
    }
    s.elType = "tangent";
    s.parents = [];
    for (l = 0; l < r.length; l++) {
        s.parents.push(r[l].id)
    }
    return s
};
JXG.JSXGraph.registerElement("tangent", JXG.createTangent);
JXG.JSXGraph.registerElement("polar", JXG.createTangent);
JXG.Group = function (h, l, d) {
    var j, g, e, k, f;
    this.board = h;
    this.objects = {};
    j = this.board.numObjects;
    this.board.numObjects++;
    if ((l == "") || !JXG.exists(l)) {
        this.id = this.board.id + "Group" + j
    } else {
        this.id = l
    }
    this.board.groups[this.id] = this;
    this.type = JXG.OBJECT_TYPE_POINT;
    this.elementClass = JXG.OBJECT_CLASS_POINT;
    if ((d == "") || !JXG.exists(d)) {
        this.name = "group_" + this.board.generateName(this)
    } else {
        this.name = d
    }
    delete(this.type);
    if ((arguments.length == 4) && (JXG.isArray(arguments[3]))) {
        g = arguments[3]
    } else {
        g = [];
        for (e = 3; e < arguments.length; e++) {
            g.push(arguments[e])
        }
    }
    for (e = 0; e < g.length; e++) {
        k = JXG.getReference(this.board, g[e]);
        if ((!k.visProp.fixed) && ((k.type == JXG.OBJECT_TYPE_POINT) || (k.type == JXG.OBJECT_TYPE_GLIDER))) {
            if (k.group.length != 0) {
                this.addGroup(k.group[k.group.length - 1])
            } else {
                this.addPoint(k)
            }
        }
    }
    for (f in this.objects) {
        this.objects[f].group.push(this)
    }
    this.dX = 0;
    this.dY = 0
};
JXG.extend(JXG.Group.prototype, {
    ungroup: function () {
        var d;
        for (d in this.objects) {
            if (this.objects[d].group[this.objects[d].group.length - 1] == this) {
                this.objects[d].group.pop()
            }
            delete(this.objects[d])
        }
    },
    update: function (d) {
        var f = null,
            e;
        for (e in this.objects) {
            f = this.objects[e];
            if (f.id != d.id) {
                f.coords = new JXG.Coords(JXG.COORDS_BY_SCREEN, [f.coords.scrCoords[1] + this.dX, f.coords.scrCoords[2] + this.dY], f.board)
            }
        }
        for (e in this.objects) {
            if (JXG.exists(this.board.objects[e])) {
                this.objects[e].update(false)
            } else {
                delete(this.objects[e])
            }
        }
        return this
    },
    addPoint: function (d) {
        this.objects[d.id] = d
    },
    addPoints: function (d) {
        var e;
        for (e in d) {
            this.objects[e.id] = e
        }
    },
    addGroup: function (e) {
        var d;
        for (d in e.objects) {
            this.addPoint(e.objects[d])
        }
    },
    setProperty: function () {
        var d;
        for (d in this.objects) {
            this.objects[d].setProperty.apply(this.objects[d], arguments)
        }
    }
});
JXG.createGroup = function (h, e, d) {
    var f, j = new JXG.Group(h, d.id, d.name, e);
    j.elType = "group";
    j.parents = [];
    for (f = 0; f < e.length; f++) {
        j.parents.push(e[f].id)
    }
    return j
};
JXG.JSXGraph.registerElement("group", JXG.createGroup);
JXG.Circle = function (g, h, f, e, d) {
    this.constructor(g, d, JXG.OBJECT_TYPE_CIRCLE, JXG.OBJECT_CLASS_CIRCLE);
    this.method = h;
    this.midpoint = JXG.getReference(this.board, f);
    this.center = JXG.getReference(this.board, f);
    this.point2 = null;
    this.radius = 0;
    this.line = null;
    this.circle = null;
    if (h == "twoPoints") {
        this.point2 = JXG.getReference(g, e);
        this.radius = this.Radius()
    } else {
        if (h == "pointRadius") {
            this.gxtterm = e;
            this.updateRadius = JXG.createFunction(e, this.board, null, true);
            this.updateRadius()
        } else {
            if (h == "pointLine") {
                this.line = JXG.getReference(g, e);
                this.radius = this.line.point1.coords.distance(JXG.COORDS_BY_USER, this.line.point2.coords)
            } else {
                if (h == "pointCircle") {
                    this.circle = JXG.getReference(g, e);
                    this.radius = this.circle.Radius()
                }
            }
        }
    }
    this.id = this.board.setId(this, "C");
    this.board.renderer.drawEllipse(this);
    this.board.finalizeAdding(this);
    this.createGradient();
    this.elType = "circle";
    this.createLabel();
    this.center.addChild(this);
    if (h == "pointRadius") {
        this.notifyParents(e)
    } else {
        if (h == "pointLine") {
            this.line.addChild(this)
        } else {
            if (h == "pointCircle") {
                this.circle.addChild(this)
            } else {
                if (h == "twoPoints") {
                    this.point2.addChild(this)
                }
            }
        }
    }
    this.methodMap = JXG.deepCopy(this.methodMap, {
        setRadius: "setRadius",
        getRadius: "getRadius",
        radius: "Radius"
    })
};
JXG.Circle.prototype = new JXG.GeometryElement;
JXG.extend(JXG.Circle.prototype, {
    hasPoint: function (d, j) {
        var e = this.board.options.precision.hasPoint / (this.board.unitX),
            g = this.center.coords.usrCoords,
            h = new JXG.Coords(JXG.COORDS_BY_SCREEN, [d, j], this.board),
            f = this.Radius();
        var i = Math.sqrt((g[1] - h.usrCoords[1]) * (g[1] - h.usrCoords[1]) + (g[2] - h.usrCoords[2]) * (g[2] - h.usrCoords[2]));
        return (Math.abs(i - f) < e)
    },
    generatePolynomial: function (j) {
        var h = this.center.symbolic.x;
        var g = this.center.symbolic.y;
        var f = j.symbolic.x;
        var e = j.symbolic.y;
        var d = this.generateRadiusSquared();
        if (d == "") {
            return []
        }
        var i = "((" + f + ")-(" + h + "))^2 + ((" + e + ")-(" + g + "))^2 - (" + d + ")";
        return [i]
    },
    generateRadiusSquared: function () {
        var e = "",
            g, f, i, h, d, j;
        if (this.method == "twoPoints") {
            g = this.center.symbolic.x;
            f = this.center.symbolic.y;
            i = this.point2.symbolic.x;
            h = this.point2.symbolic.y;
            e = "((" + i + ")-(" + g + "))^2 + ((" + h + ")-(" + f + "))^2"
        } else {
            if (this.method == "pointRadius") {
                if (typeof (this.radius) == "number") {
                    e = "" + this.radius * this.radius
                }
            } else {
                if (this.method == "pointLine") {
                    i = this.line.point1.symbolic.x;
                    h = this.line.point1.symbolic.y;
                    d = this.line.point2.symbolic.x;
                    j = this.line.point2.symbolic.y;
                    e = "((" + i + ")-(" + d + "))^2 + ((" + h + ")-(" + j + "))^2"
                } else {
                    if (this.method == "pointCircle") {
                        e = this.circle.Radius()
                    }
                }
            }
        }
        return e
    },
    update: function () {
        if (this.needsUpdate) {
            if (this.visProp.trace) {
                this.cloneToBackground(true)
            }
            if (this.method == "pointLine") {
                this.radius = this.line.point1.coords.distance(JXG.COORDS_BY_USER, this.line.point2.coords)
            } else {
                if (this.method == "pointCircle") {
                    this.radius = this.circle.Radius()
                } else {
                    if (this.method == "pointRadius") {
                        this.radius = this.updateRadius()
                    }
                }
            }
            this.updateStdform();
            this.updateQuadraticform()
        }
        return this
    },
    updateQuadraticform: function () {
        var d = this.center,
            g = d.X(),
            f = d.Y(),
            e = this.Radius();
        this.quadraticform = [
            [g * g + f * f - e * e, - g, - f],
            [-g, 1, 0],
            [-f, 0, 1]
        ]
    },
    updateStdform: function () {
        this.stdform[3] = 0.5;
        this.stdform[4] = this.Radius();
        this.stdform[1] = -this.center.coords.usrCoords[1];
        this.stdform[2] = -this.center.coords.usrCoords[2];
        this.normalize()
    },
    updateRenderer: function () {
        if (this.needsUpdate && this.visProp.visible) {
            var d = this.isReal;
            this.isReal = (!isNaN(this.center.coords.usrCoords[1] + this.center.coords.usrCoords[2] + this.Radius())) && this.center.isReal;
            if (this.isReal) {
                if (d != this.isReal) {
                    this.board.renderer.show(this);
                    if (this.hasLabel && this.label.content.visProp.visible) {
                        this.board.renderer.show(this.label.content)
                    }
                }
                this.board.renderer.updateEllipse(this)
            } else {
                if (d != this.isReal) {
                    this.board.renderer.hide(this);
                    if (this.hasLabel && this.label.content.visProp.visible) {
                        this.board.renderer.hide(this.label.content)
                    }
                }
            }
            this.needsUpdate = false
        }
        if (this.hasLabel && this.label.content.visProp.visible && this.isReal) {
            this.label.content.update();
            this.board.renderer.updateText(this.label.content)
        }
    },
    notifyParents: function (d) {
        if (typeof d == "string") {
            JXG.GeonextParser.findDependencies(this, d + "", this.board)
        }
    },
    setRadius: function (d) {
        this.updateRadius = JXG.createFunction(d, this.board, null, true);
        this.board.update();
        return this
    },
    Radius: function (d) {
        if (JXG.exists(d)) {
            this.setRadius(d);
            return this.Radius()
        }
        if (this.method == "twoPoints") {
            if (JXG.Math.Geometry.distance(this.point2.coords.usrCoords, [0, 0, 0]) == 0 || JXG.Math.Geometry.distance(this.center.coords.usrCoords, [0, 0, 0]) == 0) {
                return NaN
            } else {
                return this.center.Dist(this.point2)
            }
        } else {
            if (this.method == "pointLine" || this.method == "pointCircle") {
                return this.radius
            } else {
                if (this.method == "pointRadius") {
                    return this.updateRadius()
                }
            }
        }
    },
    getRadius: function () {
        return this.Radius()
    },
    getTextAnchor: function () {
        return this.center.coords
    },
    getLabelAnchor: function () {
        var e = this.Radius(),
            g = this.center.coords.usrCoords,
            d, f;
        switch (this.visProp.label.position) {
            case "lft":
                d = g[1] - e;
                f = g[2];
                break;
            case "llft":
                d = g[1] - Math.sqrt(0.5) * e;
                f = g[2] - Math.sqrt(0.5) * e;
                break;
            case "rt":
                d = g[1] + e;
                f = g[2];
                break;
            case "lrt":
                d = g[1] + Math.sqrt(0.5) * e;
                f = g[2] - Math.sqrt(0.5) * e;
                break;
            case "urt":
                d = g[1] + Math.sqrt(0.5) * e;
                f = g[2] + Math.sqrt(0.5) * e;
                break;
            case "top":
                d = g[1];
                f = g[2] + e;
                break;
            case "bot":
                d = g[1];
                f = g[2] - e;
                break;
            case "ulft":
            default:
                d = g[1] - Math.sqrt(0.5) * e;
                f = g[2] + Math.sqrt(0.5) * e;
                break
        }
        return new JXG.Coords(JXG.COORDS_BY_USER, [d, f], this.board)
    },
    cloneToBackground: function () {
        var f = {}, d, e;
        f.id = this.id + "T" + this.numTraces;
        f.elementClass = JXG.OBJECT_CLASS_CIRCLE;
        this.numTraces++;
        f.center = {};
        f.center.coords = this.center.coords;
        d = this.Radius();
        f.Radius = function () {
            return d
        };
        f.getRadius = function () {
            return d
        };
        f.board = this.board;
        f.visProp = JXG.deepCopy(this.visProp, this.visProp.traceattributes, true);
        f.visProp.layer = this.board.options.layer.trace;
        JXG.clearVisPropOld(f);
        e = this.board.renderer.enhancedRendering;
        this.board.renderer.enhancedRendering = true;
        this.board.renderer.drawEllipse(f);
        this.board.renderer.enhancedRendering = e;
        this.traces[f.id] = f.rendNode;
        return this
    },
    addTransform: function (e) {
        var f, g = JXG.isArray(e) ? e : [e],
            d = g.length;
        for (f = 0; f < d; f++) {
            this.center.transformations.push(g[f]);
            if (this.method === "twoPoints") {
                this.point2.transformations.push(g[f])
            }
        }
        return this
    },
    snapToGrid: function () {
        if (this.visProp.snaptogrid) {
            this.center.snapToGrid();
            if (this.method === "twoPoints") {
                this.point2.snapToGrid()
            }
        }
        return this
    },
    setPosition: function (f, e) {
        var d;
        e = new JXG.Coords(f, e, this.board);
        d = this.board.create("transform", e.usrCoords.slice(1), {
            type: "translate"
        });
        this.addTransform(d);
        return this
    },
    setPositionDirectly: function (k, h, g) {
        h = new JXG.Coords(k, h, this.board);
        g = new JXG.Coords(k, g, this.board);
        var e = JXG.Math.Statistics.subtract(h.usrCoords, g.usrCoords),
            d = this.parents.length,
            f, j;
        for (f = 0; f < d; f++) {
            if (!JXG.getRef(this.board, this.parents[f]).draggable()) {
                return this
            }
        }
        for (f = 0; f < d; f++) {
            j = JXG.getRef(this.board, this.parents[f]);
            j.coords.setCoordinates(JXG.COORDS_BY_USER, JXG.Math.Statistics.add(j.coords.usrCoords, e))
        }
        this.update();
        return this
    },
    X: function (d) {
        return this.Radius() * Math.cos(d * 2 * Math.PI) + this.center.coords.usrCoords[1]
    },
    Y: function (d) {
        return this.Radius() * Math.sin(d * 2 * Math.PI) + this.center.coords.usrCoords[2]
    },
    Z: function (d) {
        return 1
    },
    minX: function () {
        return 0
    },
    maxX: function () {
        return 1
    },
    Area: function () {
        var d = this.Radius();
        return d * d * Math.PI
    },
    bounds: function () {
        var d = this.center.coords.usrCoords,
            e = this.Radius();
        return [d[1] - e, d[2] + e, d[1] + e, d[2] - e]
    }
});
JXG.createCircle = function (k, f, e) {
    var j, l, h, d, g = true;
    l = [];
    for (h = 0; h < f.length; h++) {
        if (JXG.isPoint(f[h])) {
            l[h] = f[h]
        } else {
            if (JXG.isArray(f[h]) && f[h].length > 1) {
                d = JXG.copyAttributes(e, k.options, "circle", "center");
                l[h] = k.create("point", f[h], d)
            } else {
                l[h] = f[h]
            }
        }
    }
    d = JXG.copyAttributes(e, k.options, "circle");
    if (f.length == 2 && JXG.isPoint(l[0]) && JXG.isPoint(l[1])) {
        j = new JXG.Circle(k, "twoPoints", l[0], l[1], d)
    } else {
        if ((JXG.isNumber(l[0]) || JXG.isFunction(l[0]) || JXG.isString(l[0])) && JXG.isPoint(l[1])) {
            j = new JXG.Circle(k, "pointRadius", l[1], l[0], d)
        } else {
            if ((JXG.isNumber(l[1]) || JXG.isFunction(l[1]) || JXG.isString(l[1])) && JXG.isPoint(l[0])) {
                j = new JXG.Circle(k, "pointRadius", l[0], l[1], d)
            } else {
                if ((l[0].elementClass == JXG.OBJECT_CLASS_CIRCLE) && JXG.isPoint(l[1])) {
                    j = new JXG.Circle(k, "pointCircle", l[1], l[0], d)
                } else {
                    if ((l[1].elementClass == JXG.OBJECT_CLASS_CIRCLE) && JXG.isPoint(l[0])) {
                        j = new JXG.Circle(k, "pointCircle", l[0], l[1], d)
                    } else {
                        if ((l[0].elementClass == JXG.OBJECT_CLASS_LINE) && JXG.isPoint(l[1])) {
                            j = new JXG.Circle(k, "pointLine", l[1], l[0], d)
                        } else {
                            if ((l[1].elementClass == JXG.OBJECT_CLASS_LINE) && JXG.isPoint(l[0])) {
                                j = new JXG.Circle(k, "pointLine", l[0], l[1], d)
                            } else {
                                if (f.length == 3 && JXG.isPoint(l[0]) && JXG.isPoint(l[1]) && JXG.isPoint(l[2])) {
                                    j = JXG.createCircumcircle(k, l, e)
                                } else {
                                    throw new Error("JSXGraph: Can't create circle with parent types '" + (typeof f[0]) + "' and '" + (typeof f[1]) + "'.\nPossible parent types: [point,point], [point,number], [point,function], [point,circle], [point,point,point]")
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    j.isDraggable = g;
    j.parents = [];
    for (h = 0; h < f.length; h++) {
        if (f[h].id) {
            j.parents.push(f[h].id)
        }
    }
    j.elType = "circle";
    return j
};
JXG.JSXGraph.registerElement("circle", JXG.createCircle);
JXG.createEllipse = function (n, p, h) {
    var r = [],
        e, d, k, l, j = JXG.copyAttributes(h, n.options, "conic", "foci"),
        m = JXG.copyAttributes(h, n.options, "conic");
    for (k = 0; k < 2; k++) {
        if (p[k].length > 1) {
            r[k] = n.create("point", p[k], j)
        } else {
            if (JXG.isPoint(p[k])) {
                r[k] = JXG.getReference(n, p[k])
            } else {
                if ((typeof p[k] == "function") && (p[k]().elementClass === JXG.OBJECT_CLASS_POINT)) {
                    r[k] = p[k]()
                } else {
                    if (JXG.isString(p[k])) {
                        r[k] = JXG.getReference(n, p[k])
                    } else {
                        throw new Error("JSXGraph: Can't create Ellipse with parent types '" + (typeof p[0]) + "' and '" + (typeof p[1]) + "'.\nPossible parent types: [point,point,point], [point,point,number|function]")
                    }
                }
            }
        }
    }
    if (JXG.isNumber(p[2])) {
        d = JXG.createFunction(p[2], n)
    } else {
        if ((typeof p[2] == "function") && (JXG.isNumber(p[2]()))) {
            d = p[2]
        } else {
            if (JXG.isPoint(p[2])) {
                e = JXG.getReference(n, p[2])
            } else {
                if (p[2].length > 1) {
                    e = n.create("point", p[2], j)
                } else {
                    if ((typeof p[2] == "function") && (p[2]().elementClass == JXG.OBJECT_CLASS_POINT)) {
                        e = p[2]()
                    } else {
                        if (JXG.isString(p[2])) {
                            e = JXG.getReference(n, p[2])
                        } else {
                            throw new Error("JSXGraph: Can't create Ellipse with parent types '" + (typeof p[0]) + "' and '" + (typeof p[1]) + "' and '" + (typeof p[2]) + "'.\nPossible parent types: [point,point,point], [point,point,number|function]")
                        }
                    }
                }
            }
            d = function () {
                return e.Dist(r[0]) + e.Dist(r[1])
            }
        }
    }
    if (typeof p[4] == "undefined") {
        p[4] = 1.0001 * Math.PI
    }
    if (typeof p[3] == "undefined") {
        p[3] = -1.0001 * Math.PI
    }
    var o = n.create("point", [function () {
        return (r[0].X() + r[1].X()) * 0.5
    }, function () {
        return (r[0].Y() + r[1].Y()) * 0.5
    }], j);
    var q = function () {
        var i = r[0].X(),
            B = r[0].Y(),
            w = r[1].X(),
            v = r[1].Y(),
            A, z, u;
        var t = (w - i > 0) ? 1 : -1;
        if (Math.abs(w - i) > 1e-7) {
            A = Math.atan2(v - B, w - i) + ((t < 0) ? Math.PI : 0)
        } else {
            A = ((v - B > 0) ? 0.5 : -0.5) * Math.PI
        }
        z = Math.cos(A);
        u = Math.sin(A);
        var s = [
            [1, 0, 0],
            [o.X(), z, - u],
            [o.Y(), u, z]
        ];
        return s
    };
    var f = n.create("curve", [function (i) {
        return 0
    }, function (i) {
        return 0
    },
    p[3], p[4]], m);
    var g = function (u, s) {
        var A = d() * 0.5,
            i = A * A,
            t = r[1].Dist(r[0]) * 0.5,
            v = i - t * t,
            z = Math.sqrt(v),
            w = [
                [1, 0, 0],
                [0, 1, 0],
                [0, 0, 1]
            ],
            C, B;
        if (!s) {
            l = q();
            C = o.X();
            B = o.Y();
            w[0][0] = l[0][0];
            w[0][1] = 0;
            w[0][2] = 0;
            w[1][0] = C * (1 - l[1][1]) + B * l[1][2];
            w[1][1] = l[1][1];
            w[1][2] = l[2][1];
            w[2][0] = B * (1 - l[1][1]) - C * l[1][2];
            w[2][1] = l[1][2];
            w[2][2] = l[2][2];
            f.quadraticform = JXG.Math.matMatMult(JXG.Math.transpose(w), JXG.Math.matMatMult([
                [-1 + C * C / (A * A) + B * B / v, - C / i, - C / v],
                [-C / i, 1 / i, 0],
                [-B / v, 0, 1 / v]
            ], w))
        }
        return JXG.Math.matVecMult(l, [1, A * Math.cos(u), z * Math.sin(u)])
    };
    f.X = function (i, s) {
        return g(i, s)[1]
    };
    f.Y = function (i, s) {
        return g(i, s)[2]
    };
    f.midpoint = o;
    f.type = JXG.OBJECT_TYPE_CONIC;
    return f
};
JXG.createHyperbola = function (n, p, h) {
    var r = [],
        e, d, k, l, j = JXG.copyAttributes(h, n.options, "conic", "foci"),
        m = JXG.copyAttributes(h, n.options, "conic");
    for (k = 0; k < 2; k++) {
        if (p[k].length > 1) {
            r[k] = n.create("point", p[k], attr_focu)
        } else {
            if (JXG.isPoint(p[k])) {
                r[k] = JXG.getReference(n, p[k])
            } else {
                if ((typeof p[k] == "function") && (p[k]().elementClass == JXG.OBJECT_CLASS_POINT)) {
                    r[k] = p[k]()
                } else {
                    if (JXG.isString(p[k])) {
                        r[k] = JXG.getReference(n, p[k])
                    } else {
                        throw new Error("JSXGraph: Can't create Hyperbola with parent types '" + (typeof p[0]) + "' and '" + (typeof p[1]) + "'.\nPossible parent types: [point,point,point], [point,point,number|function]")
                    }
                }
            }
        }
    }
    if (JXG.isNumber(p[2])) {
        d = JXG.createFunction(p[2], n)
    } else {
        if ((typeof p[2] == "function") && (JXG.isNumber(p[2]()))) {
            d = p[2]
        } else {
            if (JXG.isPoint(p[2])) {
                e = JXG.getReference(n, p[2])
            } else {
                if (p[2].length > 1) {
                    e = n.create("point", p[2], j)
                } else {
                    if ((typeof p[2] == "function") && (p[2]().elementClass == JXG.OBJECT_CLASS_POINT)) {
                        e = p[2]()
                    } else {
                        if (JXG.isString(p[2])) {
                            e = JXG.getReference(n, p[2])
                        } else {
                            throw new Error("JSXGraph: Can't create Hyperbola with parent types '" + (typeof p[0]) + "' and '" + (typeof p[1]) + "' and '" + (typeof p[2]) + "'.\nPossible parent types: [point,point,point], [point,point,number|function]")
                        }
                    }
                }
            }
            d = function () {
                return e.Dist(r[0]) - e.Dist(r[1])
            }
        }
    }
    if (typeof p[4] == "undefined") {
        p[4] = 1.0001 * Math.PI
    }
    if (typeof p[3] == "undefined") {
        p[3] = -1.0001 * Math.PI
    }
    var o = n.create("point", [function () {
        return (r[0].X() + r[1].X()) * 0.5
    }, function () {
        return (r[0].Y() + r[1].Y()) * 0.5
    }], j);
    var q = function () {
        var t = r[0].X(),
            s = r[0].Y(),
            z = r[1].X(),
            v = r[1].Y(),
            u;
        var w = (z - t > 0) ? 1 : -1;
        if (Math.abs(z - t) > 1e-7) {
            u = Math.atan2(v - s, z - t) + ((w < 0) ? Math.PI : 0)
        } else {
            u = ((v - s > 0) ? 0.5 : -0.5) * Math.PI
        }
        var i = [
            [1, 0, 0],
            [o.X(), Math.cos(u), - Math.sin(u)],
            [o.Y(), Math.sin(u), Math.cos(u)]
        ];
        return i
    };
    var f = n.create("curve", [function (i) {
        return 0
    }, function (i) {
        return 0
    },
    p[3], p[4]], m);
    var g = function (u, s) {
        var A = d() * 0.5,
            i = A * A,
            t = r[1].Dist(r[0]) * 0.5,
            z = Math.sqrt(-A * A + t * t),
            v = z * z,
            w = [
                [1, 0, 0],
                [0, 1, 0],
                [0, 0, 1]
            ],
            C, B;
        if (!s) {
            l = q();
            C = o.X();
            B = o.Y();
            w[0][0] = l[0][0];
            w[0][1] = 0;
            w[0][2] = 0;
            w[1][0] = C * (1 - l[1][1]) + B * l[1][2];
            w[1][1] = l[1][1];
            w[1][2] = l[2][1];
            w[2][0] = B * (1 - l[1][1]) - C * l[1][2];
            w[2][1] = l[1][2];
            w[2][2] = l[2][2];
            f.quadraticform = JXG.Math.matMatMult(JXG.Math.transpose(w), JXG.Math.matMatMult([
                [-1 + C * C / i + B * B / v, - C / i, B / v],
                [-C / i, 1 / i, 0],
                [B / v, 0, - 1 / v]
            ], w))
        }
        return JXG.Math.matVecMult(l, [1, A / Math.cos(u), z * Math.tan(u)])
    };
    f.X = function (i, s) {
        return g(i, s)[1]
    };
    f.Y = function (i, s) {
        return g(i, s)[2]
    };
    f.midpoint = o;
    f.type = JXG.OBJECT_TYPE_CONIC;
    return f
};
JXG.createParabola = function (m, o, g) {
    var k = o[0],
        e = o[1],
        i, h = JXG.copyAttributes(g, m.options, "conic", "foci"),
        j = JXG.copyAttributes(g, m.options, "conic");
    if (o[0].length > 1) {
        k = m.create("point", o[0], h)
    } else {
        if (JXG.isPoint(o[0])) {
            k = JXG.getReference(m, o[0])
        } else {
            if ((typeof o[0] == "function") && (o[0]().elementClass == JXG.OBJECT_CLASS_POINT)) {
                k = o[0]()
            } else {
                if (JXG.isString(o[0])) {
                    k = JXG.getReference(m, o[0])
                } else {
                    throw new Error("JSXGraph: Can't create Parabola with parent types '" + (typeof o[0]) + "' and '" + (typeof o[1]) + "'.\nPossible parent types: [point,line]")
                }
            }
        }
    }
    if (typeof o[3] == "undefined") {
        o[3] = 10
    }
    if (typeof o[2] == "undefined") {
        o[2] = -10
    }
    var n = m.create("point", [function () {
        var l = [0, e.stdform[1], e.stdform[2]];
        l = JXG.Math.crossProduct(l, k.coords.usrCoords);
        return JXG.Math.Geometry.meetLineLine(l, e.stdform, 0, m).usrCoords
    }], h);
    var p = function () {
        var r = Math.atan(e.getSlope()),
            q = (n.X() + k.X()) * 0.5,
            s = (n.Y() + k.Y()) * 0.5;
        r += (k.Y() - n.Y() < 0 || (k.Y() == n.Y() && k.X() > n.X())) ? Math.PI : 0;
        var l = [
            [1, 0, 0],
            [q * (1 - Math.cos(r)) + s * Math.sin(r), Math.cos(r), - Math.sin(r)],
            [s * (1 - Math.cos(r)) - q * Math.sin(r), Math.sin(r), Math.cos(r)]
        ];
        return l
    };
    var d = m.create("curve", [function (l) {
        return 0
    }, function (l) {
        return 0
    },
    o[2], o[3]], j);
    var f = function (s, u) {
        var v = n.Dist(k) * 0.5,
            r = [
                [1, 0, 0],
                [0, 1, 0],
                [0, 0, 1]
            ],
            q = (n.X() + k.X()) * 0.5,
            l = (n.Y() + k.Y()) * 0.5;
        if (!u) {
            i = p();
            r[0][0] = i[0][0];
            r[0][1] = 0;
            r[0][2] = 0;
            r[1][0] = q * (1 - i[1][1]) + l * i[1][2];
            r[1][1] = i[1][1];
            r[1][2] = i[2][1];
            r[2][0] = l * (1 - i[1][1]) - q * i[1][2];
            r[2][1] = i[1][2];
            r[2][2] = i[2][2];
            d.quadraticform = JXG.Math.matMatMult(JXG.Math.transpose(r), JXG.Math.matMatMult([
                [-l * 4 * v - q * q, q, 2 * v],
                [q, - 1, 0],
                [2 * v, 0, 0]
            ], r))
        }
        return JXG.Math.matVecMult(i, [1, s + q, s * s / (v * 4) + l])
    };
    d.X = function (l, q) {
        return f(l, q)[1]
    };
    d.Y = function (l, q) {
        return f(l, q)[2]
    };
    d.type = JXG.OBJECT_TYPE_CONIC;
    return d
};
JXG.createConic = function (e, w, g) {
    var j = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ],
        D, B, A, z, f = [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ],
        o, n, t = [],
        u, r, C, m = [],
        s = JXG.copyAttributes(g, e.options, "conic", "foci"),
        q = JXG.copyAttributes(g, e.options, "conic");
    if (w.length == 5) {
        C = true
    } else {
        if (w.length == 6) {
            C = false
        } else {
            throw new Error("JSXGraph: Can't create generic Conic with " + parent.length + " parameters.")
        }
    }
    if (C) {
        for (u = 0; u < 5; u++) {
            if (w[u].length > 1) {
                t[u] = e.create("point", w[u], s)
            } else {
                if (JXG.isPoint(w[u])) {
                    t[u] = JXG.getReference(e, w[u])
                } else {
                    if ((typeof w[u] == "function") && (w[u]().elementClass == JXG.OBJECT_CLASS_POINT)) {
                        t[u] = w[u]()
                    } else {
                        if (JXG.isString(w[u])) {
                            t[u] = JXG.getReference(e, w[u])
                        } else {
                            throw new Error("JSXGraph: Can't create Conic section with parent types '" + (typeof w[u]) + "'.\nPossible parent types: [point,point,point,point,point], [a00,a11,a22,a01,a02,a12]")
                        }
                    }
                }
            }
        }
    } else {
        r = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        r[0][0] = (JXG.isFunction(w[2])) ? function () {
            return w[2]()
        } : function () {
            return w[2]
        };
        r[0][1] = (JXG.isFunction(w[4])) ? function () {
            return w[4]()
        } : function () {
            return w[4]
        };
        r[0][2] = (JXG.isFunction(w[5])) ? function () {
            return w[5]()
        } : function () {
            return w[5]
        };
        r[1][1] = (JXG.isFunction(w[0])) ? function () {
            return w[0]()
        } : function () {
            return w[0]
        };
        r[1][2] = (JXG.isFunction(w[3])) ? function () {
            return w[3]()
        } : function () {
            return w[3]
        };
        r[2][2] = (JXG.isFunction(w[1])) ? function () {
            return w[1]()
        } : function () {
            return w[1]
        }
    }
    var h = function (p) {
        var F, E;
        for (F = 0; F < 3; F++) {
            for (E = F; E < 3; E++) {
                p[F][E] += p[E][F]
            }
        }
        for (F = 0; F < 3; F++) {
            for (E = 0; E < F; E++) {
                p[F][E] = p[E][F]
            }
        }
        return p
    };
    var l = function (E, p) {
        var H, F, G = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        for (H = 0; H < 3; H++) {
            for (F = 0; F < 3; F++) {
                G[H][F] = E[H] * p[F]
            }
        }
        return h(G)
    };
    var v = function (H, F, G) {
        var K, L, E, M = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ],
            J, I;
        E = JXG.Math.matVecMult(F, G);
        K = JXG.Math.innerProduct(G, E);
        E = JXG.Math.matVecMult(H, G);
        L = JXG.Math.innerProduct(G, E);
        for (J = 0; J < 3; J++) {
            for (I = 0; I < 3; I++) {
                M[J][I] = K * H[J][I] - L * F[J][I]
            }
        }
        return M
    };
    var k = e.create("curve", [function (i) {
        return 0
    }, function (i) {
        return 0
    },
    0, 2 * Math.PI], q);
    var d = function (H, I) {
        var G, F, p, E;
        if (!I) {
            if (C) {
                for (G = 0; G < 5; G++) {
                    m[G] = t[G].coords.usrCoords
                }
                o = l(JXG.Math.crossProduct(m[0], m[1]), JXG.Math.crossProduct(m[2], m[3]));
                n = l(JXG.Math.crossProduct(m[0], m[2]), JXG.Math.crossProduct(m[1], m[3]));
                f = v(o, n, m[4])
            } else {
                for (G = 0; G < 3; G++) {
                    for (F = G; F < 3; F++) {
                        f[G][F] = r[G][F]();
                        if (F > G) {
                            f[F][G] = f[G][F]
                        }
                    }
                }
            }
            k.quadraticform = f;
            D = JXG.Math.Numerics.Jacobi(f);
            if (D[0][0][0] < 0) {
                D[0][0][0] *= (-1);
                D[0][1][1] *= (-1);
                D[0][2][2] *= (-1)
            }
            for (G = 0; G < 3; G++) {
                p = 0;
                for (F = 0; F < 3; F++) {
                    p += D[1][F][G] * D[1][F][G]
                }
                p = Math.sqrt(p);
                for (F = 0; F < 3; F++) {}
            }
            j = D[1];
            z = Math.sqrt(Math.abs(D[0][0][0]));
            B = Math.sqrt(Math.abs(D[0][1][1]));
            A = Math.sqrt(Math.abs(D[0][2][2]))
        }
        if (D[0][1][1] <= 0 && D[0][2][2] <= 0) {
            E = JXG.Math.matVecMult(j, [1 / z, Math.cos(H) / B, Math.sin(H) / A])
        } else {
            if (D[0][1][1] <= 0 && D[0][2][2] > 0) {
                E = JXG.Math.matVecMult(j, [Math.cos(H) / z, 1 / B, Math.sin(H) / A])
            } else {
                if (D[0][2][2] < 0) {
                    E = JXG.Math.matVecMult(j, [Math.sin(H) / z, Math.cos(H) / B, 1 / A])
                }
            }
        }
        E[1] /= E[0];
        E[2] /= E[0];
        E[0] = 1;
        return E
    };
    k.X = function (i, p) {
        return d(i, p)[1]
    };
    k.Y = function (i, p) {
        return d(i, p)[2]
    };
    k.midpoint = e.create("point", [function () {
        var i = k.quadraticform;
        return [i[1][1] * i[2][2] - i[1][2] * i[1][2], i[1][2] * i[0][2] - i[2][2] * i[0][1], i[0][1] * i[1][2] - i[1][1] * i[0][2]]
    }], s);
    k.type = JXG.OBJECT_TYPE_CONIC;
    return k
};
JXG.JSXGraph.registerElement("ellipse", JXG.createEllipse);
JXG.JSXGraph.registerElement("hyperbola", JXG.createHyperbola);
JXG.JSXGraph.registerElement("parabola", JXG.createParabola);
JXG.JSXGraph.registerElement("conic", JXG.createConic);
JXG.Polygon = function (h, f, e) {
    this.constructor(h, e, JXG.OBJECT_TYPE_POLYGON, JXG.OBJECT_CLASS_AREA);
    var g, k, d, j = JXG.copyAttributes(e, h.options, "polygon", "borders");
    this.withLines = e.withlines;
    this.attr_line = j;
    this.vertices = [];
    for (g = 0; g < f.length; g++) {
        k = JXG.getRef(this.board, f[g]);
        this.vertices[g] = k
    }
    if (this.vertices[this.vertices.length - 1] != this.vertices[0]) {
        this.vertices.push(this.vertices[0])
    }
    this.borders = [];
    if (this.withLines) {
        for (g = 0; g < this.vertices.length - 1; g++) {
            j.id = j.ids && j.ids[g];
            j.strokecolor = JXG.isArray(j.colors) && j.colors[g % j.colors.length] || j.strokecolor;
            if (j.strokecolor === false) {
                j.strokecolor = "none"
            }
            d = JXG.createSegment(h, [this.vertices[g], this.vertices[g + 1]], j);
            d.dump = false;
            this.borders[g] = d;
            d.parentPolygon = this
        }
    }
    for (g = 0; g < this.vertices.length - 1; g++) {
        k = JXG.getReference(this.board, this.vertices[g]);
        k.addChild(this)
    }
    this.createLabel();
    this.id = this.board.setId(this, "Py");
    this.board.renderer.drawPolygon(this);
    this.board.finalizeAdding(this);
    this.methodMap.borders = "borders";
    this.methodMap.vertices = "vertices";
    this.elType = "polygon"
};
JXG.Polygon.prototype = new JXG.GeometryElement;
JXG.extend(JXG.Polygon.prototype, {
    hasPoint: function (e, k) {
        var g, f, d, h = false;
        if (this.visProp.hasinnerpoints) {
            d = this.vertices.length;
            for (g = 0, f = d - 2; g < d - 1; f = g++) {
                if (((this.vertices[g].coords.scrCoords[2] > k) != (this.vertices[f].coords.scrCoords[2] > k)) && (e < (this.vertices[f].coords.scrCoords[1] - this.vertices[g].coords.scrCoords[1]) * (k - this.vertices[g].coords.scrCoords[2]) / (this.vertices[f].coords.scrCoords[2] - this.vertices[g].coords.scrCoords[2]) + this.vertices[g].coords.scrCoords[1])) {
                    h = !h
                }
            }
        } else {
            d = this.borders.length;
            for (g = 0; g < d; g++) {
                if (this.borders[g].hasPoint(e, k)) {
                    h = true;
                    break
                }
            }
        }
        return h
    },
    updateRenderer: function () {
        if (this.needsUpdate) {
            this.board.renderer.updatePolygon(this);
            this.needsUpdate = false
        }
        if (this.hasLabel && this.label.content.visProp.visible) {
            this.label.content.update();
            this.board.renderer.updateText(this.label.content)
        }
    },
    getTextAnchor: function () {
        var f = this.vertices[0].X(),
            e = this.vertices[0].Y(),
            d = f,
            h = e,
            g;
        for (g = 0; g < this.vertices.length; g++) {
            if (this.vertices[g].X() < f) {
                f = this.vertices[g].X()
            }
            if (this.vertices[g].X() > d) {
                d = this.vertices[g].X()
            }
            if (this.vertices[g].Y() > e) {
                e = this.vertices[g].Y()
            }
            if (this.vertices[g].Y() < h) {
                h = this.vertices[g].Y()
            }
        }
        return new JXG.Coords(JXG.COORDS_BY_USER, [(f + d) * 0.5, (e + h) * 0.5], this.board)
    },
    getLabelAnchor: JXG.shortcut(JXG.Polygon.prototype, "getTextAnchor"),
    cloneToBackground: function () {
        var e = {}, d;
        e.id = this.id + "T" + this.numTraces;
        this.numTraces++;
        e.vertices = this.vertices;
        e.visProp = JXG.deepCopy(this.visProp, this.visProp.traceattributes, true);
        e.visProp.layer = this.board.options.layer.trace;
        e.board = this.board;
        JXG.clearVisPropOld(e);
        d = this.board.renderer.enhancedRendering;
        this.board.renderer.enhancedRendering = true;
        this.board.renderer.drawPolygon(e);
        this.board.renderer.enhancedRendering = d;
        this.traces[e.id] = e.rendNode;
        return this
    },
    hideElement: function () {
        var d;
        this.visProp.visible = false;
        this.board.renderer.hide(this);
        for (d = 0; d < this.borders.length; d++) {
            this.borders[d].hideElement()
        }
        if (this.hasLabel && JXG.exists(this.label)) {
            this.label.hiddenByParent = true;
            if (this.label.content.visProp.visible) {
                this.board.renderer.hide(this.label.content)
            }
        }
    },
    showElement: function () {
        var d;
        this.visProp.visible = true;
        this.board.renderer.show(this);
        for (d = 0; d < this.borders.length; d++) {
            this.borders[d].showElement()
        }
        if (this.hasLabel && JXG.exists(this.label)) {
            if (this.label.content.visProp.visible) {
                this.board.renderer.show(this.label.content)
            }
        }
    },
    Area: function () {
        var e = 0,
            d;
        for (d = 0; d < this.vertices.length - 1; d++) {
            e += (this.vertices[d].X() * this.vertices[d + 1].Y() - this.vertices[d + 1].X() * this.vertices[d].Y())
        }
        e /= 2;
        return Math.abs(e)
    },
    remove: function () {
        var d;
        for (d = 0; d < this.borders.length; d++) {
            this.board.removeObject(this.borders[d])
        }
        this.board.renderer.remove(this.rendNode)
    },
    findPoint: function (e) {
        var d;
        if (!JXG.isPoint(e)) {
            return -1
        }
        for (d = 0; d < this.vertices.length; d++) {
            if (this.vertices[d].id === e.id) {
                return d
            }
        }
        return -1
    },
    addPoints: function () {
        var d = Array.prototype.slice.call(arguments);
        return this.insertPoints.apply(this, [this.vertices.length - 2].concat(d))
    },
    insertPoints: function () {
        var d, f, g = [],
            e;
        if (arguments.length === 0) {
            return this
        }
        d = arguments[0];
        if (d < 0 || d > this.vertices.length - 2) {
            return this
        }
        for (f = 1; f < arguments.length; f++) {
            if (JXG.isPoint(arguments[f])) {
                g.push(arguments[f])
            }
        }
        e = this.vertices.slice(0, d + 1).concat(g);
        this.vertices = e.concat(this.vertices.slice(d + 1));
        if (this.withLines) {
            e = this.borders.slice(0, d);
            this.board.removeObject(this.borders[d]);
            for (f = 0; f < g.length; f++) {
                e.push(JXG.createSegment(this.board, [this.vertices[d + f], this.vertices[d + f + 1]], this.attr_line))
            }
            e.push(JXG.createSegment(this.board, [this.vertices[d + g.length], this.vertices[d + g.length + 1]], this.attr_line));
            this.borders = e.concat(this.borders.slice(d))
        }
        this.board.update();
        return this
    },
    removePoints: function () {
        var k, g, e, h = [],
            l = [],
            d = [],
            f = [];
        this.vertices = this.vertices.slice(0, this.vertices.length - 1);
        for (k = 0; k < arguments.length; k++) {
            if (JXG.isPoint(arguments[k])) {
                e = this.findPoint(arguments[k])
            }
            if (JXG.isNumber(e) && e > -1 && e < this.vertices.length && JXG.indexOf(d, e) === -1) {
                d.push(e)
            }
        }
        d = d.sort();
        h = this.vertices.slice();
        l = this.borders.slice();
        if (this.withLines) {
            f.push([d[d.length - 1]])
        }
        for (k = d.length - 1; k > -1; k--) {
            h[d[k]] = -1;
            if (this.withLines && (d[k] - 1 > d[k - 1])) {
                f[f.length - 1][1] = d[k];
                f.push([d[k - 1]])
            }
        }
        if (this.withLines) {
            f[f.length - 1][1] = d[0]
        }
        this.vertices = [];
        for (k = 0; k < h.length; k++) {
            if (JXG.isPoint(h[k])) {
                this.vertices.push(h[k])
            }
        }
        if (this.vertices[this.vertices.length - 1].id !== this.vertices[0].id) {
            this.vertices.push(this.vertices[0])
        }
        if (this.withLines) {
            for (k = 0; k < f.length; k++) {
                for (g = f[k][1] - 1; g < f[k][0] + 1; g++) {
                    if (g < 0) {
                        g = 0;
                        this.board.removeObject(this.borders[l.length - 1]);
                        l[l.length - 1] = -1
                    } else {
                        if (g > l.length - 1) {
                            g = l.length - 1
                        }
                    }
                    this.board.removeObject(this.borders[g]);
                    l[g] = -1
                }
                if (f[k][1] !== 0 && f[k][0] !== h.length - 1) {
                    l[f[k][0] - 1] = JXG.createSegment(this.board, [h[Math.max(f[k][1] - 1, 0)], h[Math.min(f[k][0] + 1, this.vertices.length - 1)]], this.attr_line)
                }
            }
            this.borders = [];
            for (k = 0; k < l.length; k++) {
                if (l[k] !== -1) {
                    this.borders.push(l[k])
                }
            }
            if (f[0][1] === 5 || f[f.length - 1][1] === 0) {
                this.borders.push(JXG.createSegment(this.board, [this.vertices[0], this.vertices[this.vertices.length - 2]], this.attr_line))
            }
        }
        this.board.update();
        return this
    },
    getParents: function () {
        var e = [],
            d;
        for (d = 0; d < this.vertices.length; d++) {
            e.push(this.vertices[d].id)
        }
        return e
    },
    getAttributes: function () {
        var d = JXG.GeometryElement.prototype.getAttributes.call(this),
            e;
        if (this.withLines) {
            d.lines = d.lines || {};
            d.lines.ids = [];
            d.lines.colors = [];
            for (e = 0; e < this.borders.length; e++) {
                d.lines.ids.push(this.borders[e].id);
                d.lines.colors.push(this.borders[e].visProp.strokecolor)
            }
        }
        return d
    }
});
JXG.createPolygon = function (j, f, e) {
    var h, g, d = JXG.copyAttributes(e, j.options, "polygon");
    for (g = 0; g < f.length; g++) {
        f[g] = JXG.getReference(j, f[g]);
        if (!JXG.isPoint(f[g])) {
            throw new Error("JSXGraph: Can't create polygon with parent types other than 'point'.")
        }
    }
    h = new JXG.Polygon(j, f, d);
    return h
};
JXG.createRegularPolygon = function (m, r, h) {
    var f, j, g, d = [],
        e, q, k, o, l;
    if (JXG.isNumber(r[r.length - 1]) && r.length != 3) {
        throw new Error("JSXGraph: A regular polygon needs two points and a number as input.")
    }
    k = r.length;
    g = r[k - 1];
    if ((!JXG.isNumber(g) && !JXG.isPoint(JXG.getReference(m, g))) || g < 3) {
        throw new Error("JSXGraph: The third parameter has to be number greater than 2 or a point.")
    }
    if (JXG.isPoint(JXG.getReference(m, g))) {
        g = k;
        o = true
    } else {
        k--;
        o = false
    }
    for (j = 0; j < k; j++) {
        r[j] = JXG.getReference(m, r[j]);
        if (!JXG.isPoint(r[j])) {
            throw new Error("JSXGraph: Can't create regular polygon if the first two parameters aren't points.")
        }
    }
    d[0] = r[0];
    d[1] = r[1];
    l = JXG.copyAttributes(h, m.options, "polygon", "vertices");
    for (j = 2; j < g; j++) {
        e = m.create("transform", [Math.PI * (2 - (g - 2) / g), d[j - 1]], {
            type: "rotate"
        });
        if (o) {
            d[j] = r[j];
            d[j].addTransform(r[j - 2], e)
        } else {
            if (JXG.isArray(l.ids) && l.ids.length >= g - 2) {
                l.id = l.ids[j - 2]
            }
            d[j] = m.create("point", [d[j - 2], e], l);
            d[j].type = JXG.OBJECT_TYPE_CAS
        }
    }
    l = JXG.copyAttributes(h, m.options, "polygon");
    f = m.create("polygon", d, l);
    f.elType = "regularpolygon";
    return f
};
JXG.JSXGraph.registerElement("polygon", JXG.createPolygon);
JXG.JSXGraph.registerElement("regularpolygon", JXG.createRegularPolygon);
JXG.Curve = function (f, e, d) {
    this.constructor(f, d, JXG.OBJECT_TYPE_CURVE, JXG.OBJECT_CLASS_CURVE);
    this.points = [];
    this.numberPoints = this.visProp.numberpointshigh;
    this.bezierDegree = 1;
    this.dataX = null;
    this.dataY = null;
    if (e[0] != null) {
        this.varname = e[0]
    } else {
        this.varname = "x"
    }
    this.xterm = e[1];
    this.yterm = e[2];
    this.generateTerm(this.varname, this.xterm, this.yterm, e[3], e[4]);
    this.updateCurve();
    this.id = this.board.setId(this, "G");
    this.board.renderer.drawCurve(this);
    this.board.finalizeAdding(this);
    this.createGradient();
    this.elType = "curve";
    this.createLabel();
    if (typeof this.xterm == "string") {
        this.notifyParents(this.xterm)
    }
    if (typeof this.yterm == "string") {
        this.notifyParents(this.yterm)
    }
};
JXG.Curve.prototype = new JXG.GeometryElement;
JXG.extend(JXG.Curve.prototype, {
    minX: function () {
        if (this.visProp.curvetype == "polar") {
            return 0
        } else {
            var d = new JXG.Coords(JXG.COORDS_BY_SCREEN, [0, 0], this.board);
            return d.usrCoords[1]
        }
    },
    maxX: function () {
        var d;
        if (this.visProp.curvetype == "polar") {
            return 2 * Math.PI
        } else {
            d = new JXG.Coords(JXG.COORDS_BY_SCREEN, [this.board.canvasWidth, 0], this.board);
            return d.usrCoords[1]
        }
    },
    Z: function (d) {
        return 1
    },
    hasPoint: function (s, r, n) {
        var u, B = Infinity,
            J, m, D, C, w, v, z, f, K, A, p, H, l, G, h, o, q, F = this.visProp.numberpointslow,
            I = (this.maxX() - this.minX()) / F,
            e = this.board.options.precision.hasPoint / this.board.unitX,
            g, E, k = true;
        e = e * e;
        g = new JXG.Coords(JXG.COORDS_BY_SCREEN, [s, r], this.board);
        s = g.usrCoords[1];
        r = g.usrCoords[2];
        if (this.visProp.curvetype == "parameter" || this.visProp.curvetype == "polar" || this.visProp.curvetype == "functiongraph") {
            E = this.transformations.length;
            for (D = 0, u = this.minX(); D < F; D++) {
                w = this.X(u, k);
                v = this.Y(u, k);
                for (C = 0; C < E; C++) {
                    m = this.transformations[C];
                    m.update();
                    J = JXG.Math.matVecMult(m.matrix, [1, w, v]);
                    w = J[1];
                    v = J[2]
                }
                B = (s - w) * (s - w) + (r - v) * (r - v);
                if (B < e) {
                    return true
                }
                u += I
            }
        } else {
            if (this.visProp.curvetype == "plot") {
                if (!JXG.exists(n) || n < 0) {
                    n = 0
                }
                E = this.numberPoints;
                for (D = n; D < E - 1; D++) {
                    z = this.X(D);
                    f = this.X(D + 1);
                    K = this.Y(D);
                    A = this.Y(D + 1);
                    for (C = 0; C < this.transformations.length; C++) {
                        m = this.transformations[C];
                        m.update();
                        J = JXG.Math.matVecMult(m.matrix, [1, z, K]);
                        z = J[1];
                        K = J[2];
                        J = JXG.Math.matVecMult(m.matrix, [1, f, A]);
                        f = J[1];
                        A = J[2]
                    }
                    G = f - z;
                    h = A - K;
                    H = s - z;
                    l = r - K;
                    q = G * G + h * h;
                    if (q >= JXG.Math.eps) {
                        o = H * G + l * h;
                        p = o / q;
                        B = H * H + l * l - p * o
                    } else {
                        p = 0;
                        B = H * H + l * l
                    }
                    if (p >= 0 && p <= 1 && B < e) {
                        return true
                    }
                }
                return false
            }
        }
        return (B < e)
    },
    allocatePoints: function () {
        var e, d;
        d = this.numberPoints;
        if (this.points.length < this.numberPoints) {
            for (e = this.points.length; e < d; e++) {
                this.points[e] = new JXG.Coords(JXG.COORDS_BY_USER, [0, 0], this.board)
            }
        }
    },
    update: function () {
        if (this.needsUpdate && !this.board.needsFullUpdate && this.Y && this.Y.toJS) {
            if (this.Y.toJS() == this.YtoJS && this.Y.deps && JXG.keys(this.Y.deps, true).length === 0) {
                return this
            }
            this.YtoJS = this.Y.toJS()
        }
        if (this.needsUpdate) {
            if (this.visProp.trace) {
                this.cloneToBackground(true)
            }
            this.updateCurve()
        }
        return this
    },
    updateRenderer: function () {
        if (this.needsUpdate && this.visProp.visible) {
            this.board.renderer.updateCurve(this);
            this.needsUpdate = false;
            if (this.hasLabel && this.label.content.visProp.visible) {
                this.label.content.update();
                this.board.renderer.updateText(this.label.content)
            }
        }
        return this
    },
    updateDataArray: function () {},
    updateCurve: function () {
        var e, f, k, d, j, g, h = false;
        this.updateDataArray();
        f = this.minX();
        k = this.maxX();
        if (this.dataX != null) {
            this.numberPoints = this.dataX.length;
            e = this.numberPoints;
            this.allocatePoints();
            for (g = 0; g < e; g++) {
                d = g;
                if (this.dataY != null) {
                    j = g
                } else {
                    j = this.X(d)
                }
                this.points[g].setCoordinates(JXG.COORDS_BY_USER, [this.X(d, h), this.Y(j, h)], false);
                this.updateTransform(this.points[g]);
                h = true
            }
        } else {
            if (this.visProp.doadvancedplot) {
                this.updateParametricCurve(f, k, e)
            } else {
                if (this.board.updateQuality == this.board.BOARD_QUALITY_HIGH) {
                    this.numberPoints = this.visProp.numberpointshigh
                } else {
                    this.numberPoints = this.visProp.numberpointslow
                }
                this.allocatePoints();
                this.updateParametricCurveNaive(f, k, this.numberPoints)
            }
        }
        return this
    },
    updateParametricCurveNaive: function (f, k, e) {
        var h, g, j = false,
            d = (k - f) / e;
        for (h = 0; h < e; h++) {
            g = f + h * d;
            this.points[h].setCoordinates(JXG.COORDS_BY_USER, [this.X(g, j), this.Y(g, j)], false);
            this.updateTransform(this.points[h]);
            j = true
        }
        return this
    },
    updateParametricCurve: function (E, e) {
        var v, p, o, g = false,
            z = new JXG.Coords(JXG.COORDS_BY_USER, [0, 0], this.board),
            n, m, B, f, q, G, F, s, k, w = [],
            h = [],
            D = [],
            A = [],
            r = false,
            u = 0,
            C, l = function (M, L, N) {
                var t = N[1] - M[1],
                    K = N[2] - M[2],
                    j = L[0] - M[1],
                    I = L[1] - M[2],
                    J = j * j + I * I,
                    i, H;
                if (J >= JXG.Math.eps) {
                    i = (t * j + K * I) / J;
                    if (i > 0) {
                        if (i <= 1) {
                            t -= i * j;
                            K -= i * I
                        } else {
                            t -= j;
                            K -= I
                        }
                    }
                }
                H = t * t + K * K;
                return Math.sqrt(H)
            };
        if (this.board.updateQuality == this.board.BOARD_QUALITY_LOW) {
            F = 15;
            s = 10;
            k = 10
        } else {
            F = 21;
            s = 0.7;
            k = 0.7
        }
        A[0] = e - E;
        for (v = 1; v < F; v++) {
            A[v] = A[v - 1] * 0.5
        }
        v = 1;
        w[0] = 1;
        h[0] = 0;
        p = E;
        z.setCoordinates(JXG.COORDS_BY_USER, [this.X(p, g), this.Y(p, g)], false);
        g = true;
        B = z.scrCoords[1];
        f = z.scrCoords[2];
        o = p;
        p = e;
        z.setCoordinates(JXG.COORDS_BY_USER, [this.X(p, g), this.Y(p, g)], false);
        n = z.scrCoords[1];
        m = z.scrCoords[2];
        D[0] = [n, m];
        q = 1;
        G = 0;
        this.points = [];
        this.points[u++] = new JXG.Coords(JXG.COORDS_BY_SCREEN, [B, f], this.board);
        do {
            r = this.isDistOK(n - B, m - f, s, k) || this.isSegmentOutside(B, f, n, m);
            while (G < F && (!r || G < 3) && (G <= 7 || this.isSegmentDefined(B, f, n, m))) {
                w[q] = v;
                h[q] = G;
                D[q] = [n, m];
                q++;
                v = 2 * v - 1;
                G++;
                p = E + v * A[G];
                z.setCoordinates(JXG.COORDS_BY_USER, [this.X(p, g), this.Y(p, g)], false);
                n = z.scrCoords[1];
                m = z.scrCoords[2];
                r = this.isDistOK(n - B, m - f, s, k) || this.isSegmentOutside(B, f, n, m)
            }
            if (u > 1) {
                C = l(this.points[u - 2].scrCoords, [n, m], this.points[u - 1].scrCoords);
                if (C < 0.015) {
                    u--
                }
            }
            this.points[u] = new JXG.Coords(JXG.COORDS_BY_SCREEN, [n, m], this.board);
            this.updateTransform(this.points[u]);
            u++;
            B = n;
            f = m;
            o = p;
            q--;
            n = D[q][0];
            m = D[q][1];
            G = h[q] + 1;
            v = w[q] * 2
        } while (q > 0 && u < 500000);
        this.numberPoints = this.points.length;
        return this
    },
    isSegmentOutside: function (e, g, d, f) {
        return (g < 0 && f < 0) || (g > this.board.canvasHeight && f > this.board.canvasHeight) || (e < 0 && d < 0) || (e > this.board.canvasWidth && d > this.board.canvasWidth)
    },
    isDistOK: function (f, d, g, e) {
        return (Math.abs(f) < g && Math.abs(d) < e) && !isNaN(f + d)
    },
    isSegmentDefined: function (e, g, d, f) {
        return !(isNaN(e + g) && isNaN(d + f))
    },
    updateTransform: function (g) {
        var f, h, e, d = this.transformations.length;
        for (e = 0; e < d; e++) {
            f = this.transformations[e];
            f.update();
            h = JXG.Math.matVecMult(f.matrix, g.usrCoords);
            g.setCoordinates(JXG.COORDS_BY_USER, [h[1], h[2]])
        }
        return g
    },
    addTransform: function (e) {
        var f, g = JXG.isArray(e) ? e : [e],
            d = g.length;
        for (f = 0; f < d; f++) {
            this.transformations.push(g[f])
        }
        return this
    },
    setPosition: function (f, e) {
        var d;
        e = new JXG.Coords(f, e, this.board);
        d = this.board.create("transform", e.usrCoords.slice(1), {
            type: "translate"
        });
        if (this.transformations.length > 0 && this.transformations[this.transformations.length - 1].isNumericMatrix) {
            this.transformations[this.transformations.length - 1].melt(d)
        } else {
            this.addTransform(d)
        }
        return this
    },
    generateTerm: function (e, i, f, d, j) {
        var h, g;
        if (JXG.isArray(i)) {
            this.dataX = i;
            this.X = function (m) {
                var l = parseInt(Math.floor(m)),
                    k, n;
                if (m < 0) {
                    l = 0
                } else {
                    if (m > this.dataX.length - 2) {
                        l = this.dataX.length - 2
                    }
                }
                if (l == m) {
                    return this.dataX[l]
                } else {
                    k = this.dataX[l];
                    n = this.dataX[l + 1];
                    return k + (n - k) * (m - l)
                }
            };
            this.visProp.curvetype = "plot";
            this.numberPoints = this.dataX.length
        } else {
            this.X = JXG.createFunction(i, this.board, e);
            if (JXG.isString(i)) {
                this.visProp.curvetype = "functiongraph"
            } else {
                if (JXG.isFunction(i) || JXG.isNumber(i)) {
                    this.visProp.curvetype = "parameter"
                }
            }
        }
        if (JXG.isArray(f)) {
            this.dataY = f;
            this.Y = function (m) {
                var l = parseInt(Math.floor(m)),
                    k, n;
                if (m < 0) {
                    l = 0
                } else {
                    if (m > this.dataY.length - 2) {
                        l = this.dataY.length - 2
                    }
                }
                if (l == m) {
                    if (JXG.isFunction(this.dataY[l])) {
                        return this.dataY[l]()
                    } else {
                        return this.dataY[l]
                    }
                } else {
                    if (JXG.isFunction(this.dataY[l])) {
                        k = this.dataY[l]()
                    } else {
                        k = this.dataY[l]
                    }
                    if (JXG.isFunction(this.dataY[l + 1])) {
                        n = this.dataY[l + 1]()
                    } else {
                        n = this.dataY[l + 1]
                    }
                    return k + (n - k) * (m - l)
                }
            }
        } else {
            this.Y = JXG.createFunction(f, this.board, e)
        }
        if (JXG.isFunction(i) && JXG.isArray(f)) {
            h = JXG.createFunction(f[0], this.board, "");
            g = JXG.createFunction(f[1], this.board, "");
            this.X = function (k) {
                return (i)(k) * Math.cos(k) + h()
            };
            this.Y = function (k) {
                return (i)(k) * Math.sin(k) + g()
            };
            this.visProp.curvetype = "polar"
        }
        if (d != null) {
            this.minX = JXG.createFunction(d, this.board, "")
        }
        if (j != null) {
            this.maxX = JXG.createFunction(j, this.board, "")
        }
    },
    notifyParents: function (d) {
        JXG.GeonextParser.findDependencies(this, d, this.board)
    },
    getLabelAnchor: function () {
        var j, d, i, f = 0.05 * this.board.canvasWidth,
            e = 0.05 * this.board.canvasHeight,
            h = 0.95 * this.board.canvasWidth,
            g = 0.95 * this.board.canvasHeight;
        switch (this.visProp.label.position) {
            case "ulft":
                d = f;
                i = e;
                break;
            case "llft":
                d = f;
                i = g;
                break;
            case "rt":
                d = h;
                i = 0.5 * g;
                break;
            case "lrt":
                d = h;
                i = g;
                break;
            case "urt":
                d = h;
                i = e;
                break;
            case "top":
                d = 0.5 * h;
                i = e;
                break;
            case "bot":
                d = 0.5 * h;
                i = g;
                break;
            case "lft":
            default:
                d = f;
                i = 0.5 * g;
                break
        }
        j = new JXG.Coords(JXG.COORDS_BY_SCREEN, [d, i], this.board);
        return JXG.Math.Geometry.projectCoordsToCurve(j.usrCoords[1], j.usrCoords[2], 0, this, this.board)[0]
    },
    cloneToBackground: function () {
        var e = {}, d;
        e.id = this.id + "T" + this.numTraces;
        e.elementClass = JXG.OBJECT_CLASS_CURVE;
        this.numTraces++;
        e.points = this.points.slice(0);
        e.numberPoints = this.numberPoints;
        e.board = this.board;
        e.visProp = JXG.deepCopy(this.visProp, this.visProp.traceattributes, true);
        e.visProp.layer = this.board.options.layer.trace;
        e.visProp.curvetype = this.visProp.curvetype;
        JXG.clearVisPropOld(e);
        d = this.board.renderer.enhancedRendering;
        this.board.renderer.enhancedRendering = true;
        this.board.renderer.drawCurve(e);
        this.board.renderer.enhancedRendering = d;
        this.traces[e.id] = e.rendNode;
        return this
    },
    bounds: function () {
        var d = Infinity,
            h = -Infinity,
            j = Infinity,
            g = -Infinity,
            e = this.points.length,
            f;
        for (f = 0; f < e; f++) {
            if (d > this.points[f].usrCoords[1]) {
                d = this.points[f].usrCoords[1]
            }
            if (h < this.points[f].usrCoords[1]) {
                h = this.points[f].usrCoords[1]
            }
            if (j > this.points[f].usrCoords[2]) {
                j = this.points[f].usrCoords[2]
            }
            if (g < this.points[f].usrCoords[2]) {
                g = this.points[f].usrCoords[2]
            }
        }
        return [d, g, h, j]
    }
});
JXG.createCurve = function (g, f, e) {
    var d = JXG.copyAttributes(e, g.options, "curve");
    return new JXG.Curve(g, ["x"].concat(f), d)
};
JXG.JSXGraph.registerElement("curve", JXG.createCurve);
JXG.createFunctiongraph = function (h, f, e) {
    var d, g = ["x", "x"].concat(f);
    d = JXG.copyAttributes(e, h.options, "curve");
    d.curvetype = "functiongraph";
    return new JXG.Curve(h, g, d)
};
JXG.JSXGraph.registerElement("functiongraph", JXG.createFunctiongraph);
JXG.JSXGraph.registerElement("plot", JXG.createFunctiongraph);
JXG.createSpline = function (f, e, d) {
    var g;
    g = function () {
        var j, h = [],
            k = [];
        var i = function (o, n) {
            var m, l;
            if (!n) {
                h = [];
                k = [];
                if (e.length == 2 && JXG.isArray(e[0]) && JXG.isArray(e[1]) && e[0].length == e[1].length) {
                    for (m = 0; m < e[0].length; m++) {
                        if (typeof e[0][m] == "function") {
                            h.push(e[0][m]())
                        } else {
                            h.push(e[0][m])
                        }
                        if (typeof e[1][m] == "function") {
                            k.push(e[1][m]())
                        } else {
                            k.push(e[1][m])
                        }
                    }
                } else {
                    for (m = 0; m < e.length; m++) {
                        if (JXG.isPoint(e[m])) {
                            h.push(e[m].X());
                            k.push(e[m].Y())
                        } else {
                            if (JXG.isArray(e[m]) && e[m].length == 2) {
                                for (m = 0; m < e.length; m++) {
                                    if (typeof e[m][0] == "function") {
                                        h.push(e[m][0]())
                                    } else {
                                        h.push(e[m][0])
                                    }
                                    if (typeof e[m][1] == "function") {
                                        k.push(e[m][1]())
                                    } else {
                                        k.push(e[m][1])
                                    }
                                }
                            }
                        }
                    }
                }
                j = JXG.Math.Numerics.splineDef(h, k)
            }
            return JXG.Math.Numerics.splineEval(o, h, k, j)
        };
        return i
    };
    return f.create("curve", ["x", g()], d)
};
JXG.JSXGraph.registerElement("spline", JXG.createSpline);
JXG.createRiemannsum = function (i, m, e) {
    var d, l, g, j, k, h;
    h = JXG.copyAttributes(e, i.options, "riemannsum");
    h.curvetype = "plot";
    g = m[0];
    d = JXG.createFunction(m[1], i, "");
    if (d == null) {
        throw new Error("JSXGraph: JXG.createRiemannsum: argument '2' n has to be number or function.\nPossible parent types: [function,n:number|function,type,start:number|function,end:number|function]")
    }
    l = JXG.createFunction(m[2], i, "", false);
    if (l == null) {
        throw new Error("JSXGraph: JXG.createRiemannsum: argument 3 'type' has to be string or function.\nPossible parent types: [function,n:number|function,type,start:number|function,end:number|function]")
    }
    j = [
        [0],
        [0]
    ].concat(m.slice(3));
    k = i.create("curve", j, h);
    k.updateDataArray = function () {
        var f = JXG.Math.Numerics.riemann(g, d(), l(), this.minX(), this.maxX());
        this.dataX = f[0];
        this.dataY = f[1]
    };
    return k
};
JXG.JSXGraph.registerElement("riemannsum", JXG.createRiemannsum);
JXG.createTracecurve = function (g, f, e) {
    var j, i, h, d;
    if (f.length != 2) {
        throw new Error("JSXGraph: Can't create trace curve with given parent'\nPossible parent types: [glider, point]")
    }
    i = JXG.getRef(this.board, f[0]);
    h = JXG.getRef(this.board, f[1]);
    if (i.type != JXG.OBJECT_TYPE_GLIDER || !JXG.isPoint(h)) {
        throw new Error("JSXGraph: Can't create trace curve with parent types '" + (typeof f[0]) + "' and '" + (typeof f[1]) + "'.\nPossible parent types: [glider, point]")
    }
    d = JXG.copyAttributes(e, g.options, "tracecurve");
    d.curvetype = "plot";
    j = g.create("curve", [
        [0],
        [0]
    ], d);
    j.updateDataArray = function () {
        var o, n, C, l, r, u, s, B, k = d.numberpoints,
            w, m = i.position,
            q = i.slideObject,
            p = q.minX(),
            A = q.maxX(),
            z;
        n = (A - p) / k;
        this.dataX = [];
        this.dataY = [];
        if (q.elementClass != JXG.OBJECT_CLASS_CURVE) {
            k++
        }
        for (o = 0; o < k; o++) {
            C = p + o * n;
            u = q.X(C) / q.Z(C);
            s = q.Y(C) / q.Z(C);
            i.setPositionDirectly(JXG.COORDS_BY_USER, [u, s]);
            w = false;
            for (l in this.board.objects) {
                r = this.board.objects[l];
                if (r == i) {
                    w = true
                }
                if (!w) {
                    continue
                }
                if (!r.needsRegularUpdate) {
                    continue
                }
                z = r.visProp.trace;
                r.visProp.trace = false;
                r.needsUpdate = true;
                r.update(true);
                r.visProp.trace = z;
                if (r == h) {
                    break
                }
            }
            this.dataX[o] = h.X();
            this.dataY[o] = h.Y()
        }
        i.position = m;
        w = false;
        for (l in this.board.objects) {
            r = this.board.objects[l];
            if (r == i) {
                w = true
            }
            if (!w) {
                continue
            }
            if (!r.needsRegularUpdate) {
                continue
            }
            z = r.visProp.trace;
            r.visProp.trace = false;
            r.needsUpdate = true;
            r.update(true);
            r.visProp.trace = z;
            if (r == h) {
                break
            }
        }
    };
    return j
};
JXG.JSXGraph.registerElement("tracecurve", JXG.createTracecurve);
JXG.createArc = function (j, f, e) {
    var h, d, g;
    if (!(f = JXG.checkParents("arc", f, [
        [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT],
        [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT]
    ]))) {
        throw new Error("JSXGraph: Can't create Arc with parent types '" + (typeof f[0]) + "' and '" + (typeof f[1]) + "' and '" + (typeof f[2]) + "'.\nPossible parent types: [point,point,point]")
    }
    d = JXG.copyAttributes(e, j.options, "arc");
    h = j.create("curve", [
        [0],
        [0]
    ], d);
    h.elType = "arc";
    h.parents = [];
    for (g = 0; g < f.length; g++) {
        if (f[g].id) {
            h.parents.push(f[g].id)
        }
    }
    h.type = JXG.OBJECT_TYPE_ARC;
    h.center = JXG.getReference(j, f[0]);
    h.radiuspoint = JXG.getReference(j, f[1]);
    h.point2 = h.radiuspoint;
    h.anglepoint = JXG.getReference(j, f[2]);
    h.point3 = h.anglepoint;
    h.center.addChild(h);
    h.radiuspoint.addChild(h);
    h.anglepoint.addChild(h);
    h.useDirection = d.usedirection;
    h.updateDataArray = function () {
        var N = this.radiuspoint,
            M = this.center,
            L = this.anglepoint,
            V, w, W, P, q, Q, G = M.X(),
            E = M.Y(),
            D = M.Z(),
            I, t, s, J, U, p, o, n, l, O, H, F, S, R, T, K, u = 1,
            m = Math.PI * 0.5;
        q = JXG.Math.Geometry.rad(N, M, L);
        if ((this.visProp.type == "minor" && q > Math.PI) || (this.visProp.type == "major" && q < Math.PI)) {
            q = 2 * Math.PI - q;
            u = -1
        }
        if (this.useDirection) {
            s = f[1].coords.usrCoords;
            J = f[3].coords.usrCoords;
            U = f[2].coords.usrCoords;
            t = (s[1] - U[1]) * (s[2] - J[2]) - (s[2] - U[2]) * (s[1] - J[1]);
            if (t < 0) {
                this.radiuspoint = f[1];
                this.anglepoint = f[2]
            } else {
                this.radiuspoint = f[2];
                this.anglepoint = f[1]
            }
        }
        p = [N.Z(), N.X(), N.Y()];
        l = p.slice(0);
        K = M.Dist(N);
        G /= D;
        E /= D;
        this.dataX = [p[1] / p[0]];
        this.dataY = [p[2] / p[0]];
        while (q > JXG.Math.eps) {
            if (q >= m) {
                V = m;
                q -= m
            } else {
                V = q;
                q = 0
            }
            w = Math.cos(u * V);
            W = Math.sin(u * V);
            P = [
                [1, 0, 0],
                [G * (1 - w) + E * W, w, - W],
                [E * (1 - w) - G * W, W, w]
            ];
            I = JXG.Math.matVecMult(P, p);
            l = [I[0] / I[0], I[1] / I[0], I[2] / I[0]];
            H = p[1] - G;
            F = p[2] - E;
            S = l[1] - G;
            R = l[2] - E;
            T = Math.sqrt((H + S) * (H + S) + (F + R) * (F + R));
            if (Math.abs(R - F) > JXG.Math.eps) {
                O = (H + S) * (K / T - 0.5) / (R - F) * 8 / 3
            } else {
                O = (F + R) * (K / T - 0.5) / (H - S) * 8 / 3
            }
            o = [1, p[1] - O * F, p[2] + O * H];
            n = [1, l[1] + O * R, l[2] - O * S];
            this.dataX = this.dataX.concat([o[1], n[1], l[1]]);
            this.dataY = this.dataY.concat([o[2], n[2], l[2]]);
            p = l.slice(0)
        }
        this.bezierDegree = 3;
        this.updateStdform();
        this.updateQuadraticform()
    };
    h.Radius = function () {
        return this.radiuspoint.Dist(this.center)
    };
    h.getRadius = function () {
        return this.Radius()
    };
    h.hasPoint = function (q, p) {
        var k = this.board.options.precision.hasPoint / (this.board.unitX),
            n = new JXG.Coords(JXG.COORDS_BY_SCREEN, [q, p], this.board),
            i = this.Radius(),
            o = this.center.coords.distance(JXG.COORDS_BY_USER, n),
            t = (Math.abs(o - i) < k),
            l, m, s;
        if (t) {
            l = JXG.Math.Geometry.rad(this.radiuspoint, this.center, n.usrCoords.slice(1));
            m = 0;
            s = JXG.Math.Geometry.rad(this.radiuspoint, this.center, this.anglepoint);
            if ((this.visProp.type == "minor" && s > Math.PI) || (this.visProp.type == "major" && s < Math.PI)) {
                m = s;
                s = 2 * Math.PI
            }
            if (l < m || l > s) {
                t = false
            }
        }
        return t
    };
    h.hasPointSector = function (p, o) {
        var m = new JXG.Coords(JXG.COORDS_BY_SCREEN, [p, o], this.board),
            i = this.Radius(),
            n = this.center.coords.distance(JXG.COORDS_BY_USER, m),
            s = (n < i),
            k, l, q;
        if (s) {
            k = JXG.Math.Geometry.rad(this.radiuspoint, this.center, m.usrCoords.slice(1));
            l = 0;
            q = JXG.Math.Geometry.rad(this.radiuspoint, this.center, this.anglepoint);
            if ((this.visProp.type == "minor" && q > Math.PI) || (this.visProp.type == "major" && q < Math.PI)) {
                l = q;
                q = 2 * Math.PI
            }
            if (k < l || k > q) {
                s = false
            }
        }
        return s
    };
    h.getTextAnchor = function () {
        return this.center.coords
    };
    h.getLabelAnchor = function () {
        var l, t = 10 / (this.board.unitX),
            r = 10 / (this.board.unitY),
            p = this.point2.coords.usrCoords,
            i = this.center.coords.usrCoords,
            k = p[1] - i[1],
            s = p[2] - i[2],
            q, n, m, o;
        if (this.label.content != null) {
            this.label.content.relativeCoords = new JXG.Coords(JXG.COORDS_BY_SCREEN, [0, 0], this.board)
        }
        l = JXG.Math.Geometry.rad(this.radiuspoint, this.center, this.anglepoint);
        if ((this.visProp.type == "minor" && l > Math.PI) || (this.visProp.type == "major" && l < Math.PI)) {
            l = -(2 * Math.PI - l)
        }
        q = new JXG.Coords(JXG.COORDS_BY_USER, [i[1] + Math.cos(l * 0.5) * k - Math.sin(l * 0.5) * s, i[2] + Math.sin(l * 0.5) * k + Math.cos(l * 0.5) * s], this.board);
        n = q.usrCoords[1] - i[1];
        m = q.usrCoords[2] - i[2];
        o = Math.sqrt(n * n + m * m);
        n = n * (o + t) / o;
        m = m * (o + r) / o;
        return new JXG.Coords(JXG.COORDS_BY_USER, [i[1] + n, i[2] + m], this.board)
    };
    h.updateQuadraticform = function () {
        var i = this.center,
            n = i.X(),
            l = i.Y(),
            k = this.Radius();
        this.quadraticform = [
            [n * n + l * l - k * k, - n, - l],
            [-n, 1, 0],
            [-l, 0, 1]
        ]
    };
    h.updateStdform = function () {
        this.stdform[3] = 0.5;
        this.stdform[4] = this.Radius();
        this.stdform[1] = -this.center.coords.usrCoords[1];
        this.stdform[2] = -this.center.coords.usrCoords[2];
        this.normalize()
    };
    h.prepareUpdate().update();
    return h
};
JXG.JSXGraph.registerElement("arc", JXG.createArc);
JXG.createSemicircle = function (h, f, e) {
    var g, i, d;
    if ((JXG.isPoint(f[0])) && (JXG.isPoint(f[1]))) {
        d = JXG.copyAttributes(e, h.options, "semicircle", "midpoint");
        i = h.create("midpoint", [f[0], f[1]], d);
        i.dump = false;
        d = JXG.copyAttributes(e, h.options, "semicircle");
        g = h.create("arc", [i, f[1], f[0]], d);
        g.elType = "semicircle";
        g.parents = [f[0].id, f[1].id];
        g.subs = {
            midpoint: i
        };
        g.midpoint = i
    } else {
        throw new Error("JSXGraph: Can't create Semicircle with parent types '" + (typeof f[0]) + "' and '" + (typeof f[1]) + "'.\nPossible parent types: [point,point]")
    }
    return g
};
JXG.JSXGraph.registerElement("semicircle", JXG.createSemicircle);
JXG.createCircumcircleArc = function (h, f, e) {
    var g, i, d;
    if ((JXG.isPoint(f[0])) && (JXG.isPoint(f[1])) && (JXG.isPoint(f[2]))) {
        d = JXG.copyAttributes(e, h.options, "circumcirclearc", "center");
        i = h.create("circumcenter", [f[0], f[1], f[2]], d);
        i.dump = false;
        d = JXG.copyAttributes(e, h.options, "circumcirclearc");
        d.usedirection = true;
        g = h.create("arc", [i, f[0], f[2], f[1]], d);
        g.elType = "circumcirclearc";
        g.parents = [f[0].id, f[1].id, f[2].id];
        g.subs = {
            center: i
        };
        g.center = i
    } else {
        throw new Error("JSXGraph: create Circumcircle Arc with parent types '" + (typeof f[0]) + "' and '" + (typeof f[1]) + "' and '" + (typeof f[2]) + "'.\nPossible parent types: [point,point,point]")
    }
    return g
};
JXG.JSXGraph.registerElement("circumcirclearc", JXG.createCircumcircleArc);
JXG.createMinorArc = function (f, e, d) {
    d.type = "minor";
    return JXG.createArc(f, e, d)
};
JXG.JSXGraph.registerElement("minorarc", JXG.createMinorArc);
JXG.createMajorArc = function (f, e, d) {
    d.type = "major";
    return JXG.createArc(f, e, d)
};
JXG.JSXGraph.registerElement("majorarc", JXG.createMajorArc);
JXG.createSector = function (h, f, e) {
    var g, d;
    if (!(JXG.isPoint(f[0]) && JXG.isPoint(f[1]) && JXG.isPoint(f[2]))) {
        throw new Error("JSXGraph: Can't create Sector with parent types '" + (typeof f[0]) + "' and '" + (typeof f[1]) + "' and '" + (typeof f[2]) + "'.")
    }
    d = JXG.copyAttributes(e, h.options, "sector");
    g = h.create("curve", [
        [0],
        [0]
    ], d);
    g.type = JXG.OBJECT_TYPE_SECTOR;
    g.elType = "sector";
    g.parents = [f[0].id, f[1].id, f[2].id];
    g.point1 = JXG.getReference(h, f[0]);
    g.center = g.point1;
    g.point2 = JXG.getReference(h, f[1]);
    g.radiuspoint = g.point2;
    g.point3 = JXG.getReference(h, f[2]);
    g.anglepoint = g.point3;
    g.point1.addChild(g);
    g.point2.addChild(g);
    g.point3.addChild(g);
    g.useDirection = e.usedirection;
    g.updateDataArray = function () {
        var L = this.point2,
            K = this.point1,
            J = this.point3,
            T, t, U, N, p = JXG.Math.Geometry.rad(L, K, J),
            O, E = K.X(),
            w = K.Y(),
            u = K.Z(),
            G, s, q, H, S, o, n, m, j, M, F, D, Q, P, R, I, l = Math.PI * 0.5;
        if (this.useDirection) {
            q = f[1].coords.usrCoords, H = f[3].coords.usrCoords, S = f[2].coords.usrCoords;
            s = (q[1] - S[1]) * (q[2] - H[2]) - (q[2] - S[2]) * (q[1] - H[1]);
            if (s < 0) {
                this.point2 = f[1];
                this.point3 = f[2]
            } else {
                this.point2 = f[2];
                this.point3 = f[1]
            }
        }
        I = K.Dist(L);
        o = [L.Z(), L.X(), L.Y()];
        o[1] /= o[0];
        o[2] /= o[0];
        o[0] /= o[0];
        j = o.slice(0);
        E /= u;
        w /= u;
        this.dataX = [E, E + 0.333 * (o[1] - E), E + 0.666 * (o[1] - E), o[1]];
        this.dataY = [w, w + 0.333 * (o[2] - w), w + 0.666 * (o[2] - w), o[2]];
        while (p > JXG.Math.eps) {
            if (p >= l) {
                T = l;
                p -= l
            } else {
                T = p;
                p = 0
            }
            t = Math.cos(T);
            U = Math.sin(T);
            N = [
                [1, 0, 0],
                [E * (1 - t) + w * U, t, - U],
                [w * (1 - t) - E * U, U, t]
            ];
            G = JXG.Math.matVecMult(N, o);
            j = [G[0] / G[0], G[1] / G[0], G[2] / G[0]];
            F = o[1] - E;
            D = o[2] - w;
            Q = j[1] - E;
            P = j[2] - w;
            R = Math.sqrt((F + Q) * (F + Q) + (D + P) * (D + P));
            if (Math.abs(P - D) > JXG.Math.eps) {
                M = (F + Q) * (I / R - 0.5) / (P - D) * 8 / 3
            } else {
                M = (D + P) * (I / R - 0.5) / (F - Q) * 8 / 3
            }
            n = [1, o[1] - M * D, o[2] + M * F];
            m = [1, j[1] + M * P, j[2] - M * Q];
            this.dataX = this.dataX.concat([n[1], m[1], j[1]]);
            this.dataY = this.dataY.concat([n[2], m[2], j[2]]);
            o = j.slice(0)
        }
        this.dataX = this.dataX.concat([j[1] + 0.333 * (E - j[1]), j[1] + 0.666 * (E - j[1]), E]);
        this.dataY = this.dataY.concat([j[2] + 0.333 * (w - j[2]), j[2] + 0.666 * (w - j[2]), w]);
        this.bezierDegree = 3
    };
    g.Radius = function () {
        return this.point2.Dist(this.point1)
    };
    g.getRadius = function () {
        return this.Radius()
    };
    g.hasPoint = function (p, o) {
        var j = this.board.options.precision.hasPoint / (this.board.unitX),
            m = new JXG.Coords(JXG.COORDS_BY_SCREEN, [p, o], this.board),
            i = this.Radius(),
            n = this.center.coords.distance(JXG.COORDS_BY_USER, m),
            s = (Math.abs(n - i) < j),
            k, l, q;
        if (s) {
            k = JXG.Math.Geometry.rad(this.point2, this.center, m.usrCoords.slice(1));
            l = 0;
            q = JXG.Math.Geometry.rad(this.point2, this.center, this.point3);
            if (k < l || k > q) {
                s = false
            }
        }
        return s
    };
    g.hasPointSector = function (i, o) {
        var n = new JXG.Coords(JXG.COORDS_BY_SCREEN, [i, o], this.board),
            k = this.Radius(),
            m = this.point1.coords.distance(JXG.COORDS_BY_USER, n),
            j = (m < k),
            l;
        if (j) {
            l = JXG.Math.Geometry.rad(this.point2, this.point1, n.usrCoords.slice(1));
            if (l > JXG.Math.Geometry.rad(this.point2, this.point1, this.point3)) {
                j = false
            }
        }
        return j
    };
    g.getTextAnchor = function () {
        return this.point1.coords
    };
    g.getLabelAnchor = function () {
        var k = JXG.Math.Geometry.rad(this.point2, this.point1, this.point3),
            s = 13 / (this.board.unitX),
            q = 13 / (this.board.unitY),
            o = this.point2.coords.usrCoords,
            i = this.point1.coords.usrCoords,
            j = o[1] - i[1],
            r = o[2] - i[2],
            p, m, l, n;
        if (this.label.content != null) {
            this.label.content.relativeCoords = new JXG.Coords(JXG.COORDS_BY_SCREEN, [0, 0], this.board)
        }
        p = new JXG.Coords(JXG.COORDS_BY_USER, [i[1] + Math.cos(k * 0.5) * j - Math.sin(k * 0.5) * r, i[2] + Math.sin(k * 0.5) * j + Math.cos(k * 0.5) * r], this.board);
        m = p.usrCoords[1] - i[1];
        l = p.usrCoords[2] - i[2];
        n = Math.sqrt(m * m + l * l);
        m = m * (n + s) / n;
        l = l * (n + q) / n;
        return new JXG.Coords(JXG.COORDS_BY_USER, [i[1] + m, i[2] + l], this.board)
    };
    g.prepareUpdate().update();
    return g
};
JXG.JSXGraph.registerElement("sector", JXG.createSector);
JXG.createCircumcircleSector = function (h, f, e) {
    var g, i, d;
    if ((JXG.isPoint(f[0])) && (JXG.isPoint(f[1])) && (JXG.isPoint(f[2]))) {
        d = JXG.copyAttributes(e, h.options, "circumcirclesector", "center");
        i = h.create("circumcenter", [f[0], f[1], f[2]], d);
        i.dump = false;
        d = JXG.copyAttributes(e, h.options, "circumcirclesector");
        g = h.create("sector", [i, f[0], f[2], f[1]], d);
        g.elType = "circumcirclesector";
        g.parents = [f[0].id, f[1].id, f[2].id];
        g.center = i;
        g.subs = {
            center: i
        }
    } else {
        throw new Error("JSXGraph: Can't create circumcircle sector with parent types '" + (typeof f[0]) + "' and '" + (typeof f[1]) + "' and '" + (typeof f[2]) + "'.")
    }
    return g
};
JXG.JSXGraph.registerElement("circumcirclesector", JXG.createCircumcircleSector);
JXG.createAngle = function (l, n, j) {
    var g, f, e, o, m, h, k, d;
    if ((JXG.isPoint(n[0])) && (JXG.isPoint(n[1])) && (JXG.isPoint(n[2]))) {
        m = JXG.copyAttributes(j, l.options, "angle");
        o = m.name;
        if (typeof o == "undefined" || o == "") {
            o = l.generateName({
                type: JXG.OBJECT_TYPE_ANGLE
            });
            m.name = o
        }
        h = JXG.copyAttributes(j, l.options, "angle", "radiuspoint");
        f = l.create("point", [0, 1, 0], h);
        f.dump = false;
        h = JXG.copyAttributes(j, l.options, "angle", "pointsquare");
        e = l.create("point", [0, 1, 1], h);
        e.dump = false;
        g = l.create("sector", [n[1], f, n[2]], m);
        g.elType = "angle";
        g.parents = [n[0].id, n[1].id, n[2].id];
        g.subs = {
            point: f,
            pointsquare: e
        };
        g.updateDataArraySquare = function () {
            var s = n[1],
                q, p, i, t;
            q = JXG.Math.crossProduct(e.coords.usrCoords, s.coords.usrCoords);
            p = [-f.X() * q[1] - f.Y() * q[2], f.Z() * q[1], f.Z() * q[2]];
            q = JXG.Math.crossProduct(f.coords.usrCoords, s.coords.usrCoords);
            i = [-e.X() * q[1] - e.Y() * q[2], e.Z() * q[1], e.Z() * q[2]];
            t = JXG.Math.crossProduct(p, i);
            t[1] /= t[0];
            t[2] /= t[0];
            this.dataX = [s.X(), f.X(), t[1], e.X(), s.X()];
            this.dataY = [s.Y(), f.Y(), t[2], e.Y(), s.Y()];
            this.bezierDegree = 1
        };
        g.updateDataArrayNone = function () {
            this.dataX = [NaN];
            this.dataY = [NaN];
            this.bezierDegree = 1
        };
        g.updateDataArraySector = g.updateDataArray;
        g.updateDataArray = function () {
            var i = this.visProp.type,
                p = JXG.Math.Geometry.trueAngle(n[0], n[1], n[2]);
            if (Math.abs(p - 90) < this.visProp.orthosensitivity) {
                i = this.visProp.orthotype
            }
            if (i == "none") {
                this.updateDataArrayNone()
            } else {
                if (i === "square") {
                    this.updateDataArraySquare()
                } else {
                    if (i === "sector") {
                        this.updateDataArraySector()
                    } else {
                        if (i === "sectordot") {
                            this.updateDataArraySector();
                            if (this.dot.visProp.visible === false) {
                                this.dot.setProperty({
                                    visible: true
                                })
                            }
                        }
                    }
                }
            }
            if (i !== "sectordot" && this.dot.visProp.visible === true) {
                this.dot.setProperty({
                    visible: false
                })
            }
        };
        f.addConstraint([function () {
            var i = n[0],
                p = n[1],
                q = JXG.evaluate(g.visProp.radius),
                s = p.Dist(i);
            return [p.X() + (i.X() - p.X()) * q / s, p.Y() + (i.Y() - p.Y()) * q / s]
        }]);
        e.addConstraint([function () {
            var i = n[2],
                p = n[1],
                q = JXG.evaluate(g.visProp.radius),
                s = p.Dist(i);
            return [p.X() + (i.X() - p.X()) * q / s, p.Y() + (i.Y() - p.Y()) * q / s]
        }]);
        g.radiuspoint = f;
        g.point = f;
        g.pointsquare = e;
        d = JXG.copyAttributes(j, l.options, "angle", "dot");
        g.dot = l.create("point", [function () {
            if (JXG.exists(g.dot) && g.dot.visProp.visible === false) {
                return [0, 0]
            }
            var s = f.coords.usrCoords,
                p = JXG.Math.Geometry.rad(n[0], n[1], n[2]) * 0.5,
                i = n[1].X(),
                r = n[1].Y(),
                q = [
                    [1, 0, 0],
                    [i - 0.5 * i * Math.cos(p) + 0.5 * r * Math.sin(p), Math.cos(p) * 0.5, - Math.sin(p) * 0.5],
                    [r - 0.5 * i * Math.sin(p) - 0.5 * r * Math.cos(p), Math.sin(p) * 0.5, Math.cos(p) * 0.5]
                ];
            return JXG.Math.matVecMult(q, s)
        }], d);
        g.dot.dump = false;
        g.subs.dot = g.dot;
        for (k = 0; k < 3; k++) {
            JXG.getRef(l, n[k]).addChild(f);
            JXG.getRef(l, n[k]).addChild(g.dot)
        }
        g.type = JXG.OBJECT_TYPE_ANGLE;
        JXG.getRef(l, n[0]).addChild(g);
        g.rot = l.create("transform", [function () {
            return 0.5 * JXG.Math.Geometry.rad(g.point2, g.point1, g.point3)
        },
        g.point1], {
            type: "rotate"
        });
        g.getLabelAnchor = function () {
            var t = 12,
                s = 12,
                q = this.point1.coords.usrCoords,
                r, p, i, u;
            if (this.label.content != null) {
                this.label.content.relativeCoords = new JXG.Coords(JXG.COORDS_BY_SCREEN, [0, 0], this.board)
            }
            if (JXG.exists(this.visProp.label.fontSize)) {
                t = this.visProp.label.fontSize;
                s = this.visProp.label.fontSize
            }
            t /= this.board.unitX;
            s /= this.board.unitY;
            this.rot.update();
            u = JXG.Math.matVecMult(this.rot.matrix, this.point2.coords.usrCoords);
            r = u[1] - q[1];
            p = u[2] - q[2];
            i = Math.sqrt(r * r + p * p);
            r = r * (i + t) / i;
            p = p * (i + s) / i;
            return new JXG.Coords(JXG.COORDS_BY_USER, [q[1] + r, q[2] + p], this.board)
        };
        g.Value = function () {
            return JXG.Math.Geometry.rad(this.point2, this.point1, this.point3)
        };
        g.methodMap = JXG.deepCopy(g.methodMap, {
            Value: "Value"
        })
    } else {
        throw new Error("JSXGraph: Can't create angle with parent types '" + (typeof n[0]) + "' and '" + (typeof n[1]) + "' and '" + (typeof n[2]) + "'.")
    }
    return g
};
JXG.JSXGraph.registerElement("angle", JXG.createAngle);
JXG.Composition = function (h) {
    var g = ["setProperty", "prepareUpdate", "updateRenderer", "update", "highlight", "noHighlight"],
        d = function (e) {
            return function () {
                var j;
                for (j in f.elements) {
                    if (JXG.exists(f.elements[j][e])) {
                        f.elements[j][e].apply(f.elements[j], arguments)
                    }
                }
                return f
            }
        }, f = this,
        i;
    for (i = 0; i < g.length; i++) {
        this[g[i]] = d(g[i])
    }
    this.elements = {};
    for (i in h) {
        if (h.hasOwnProperty(i)) {
            this.add(i, h[i])
        }
    }
    this.dump = true;
    this.subs = {}
};
JXG.extend(JXG.Composition.prototype, {
    add: function (e, d) {
        if (!JXG.exists(this[e]) && JXG.exists(d)) {
            if (JXG.exists(d.id)) {
                this.elements[d.id] = d
            } else {
                this.elements[e] = d
            }
            this[e] = d;
            return true
        }
        return false
    },
    remove: function (g) {
        var d = false,
            f;
        for (f in this.elements) {
            if (this.elements[f].id === this[g].id) {
                d = true;
                break
            }
        }
        if (d) {
            delete this.elements[this[g].id];
            delete this[g]
        }
        return d
    },
    getParents: function () {
        return this.parents
    },
    getType: function () {
        return this.elType
    },
    getAttributes: function () {
        var d = {}, f;
        for (f in this.subs) {
            d[f] = this.subs[f].visProp
        }
        return this.attr
    }
});
JXG.createOrthogonalProjection = function (h, f, e) {
    var d, i, g, j;
    if (JXG.isPoint(f[0]) && f[1].elementClass == JXG.OBJECT_CLASS_LINE) {
        i = f[0];
        d = f[1]
    } else {
        if (JXG.isPoint(f[1]) && f[0].elementClass == JXG.OBJECT_CLASS_LINE) {
            i = f[1];
            d = f[0]
        } else {
            throw new Error("JSXGraph: Can't create perpendicular point with parent types '" + (typeof f[0]) + "' and '" + (typeof f[1]) + "'.\nPossible parent types: [point,line]")
        }
    }
    attr = JXG.copyAttributes(e, h.options, "orthogonalprojection");
    g = h.create("point", [function () {
        return JXG.Math.Geometry.projectPointToLine(i, d, h)
    }], e);
    i.addChild(g);
    d.addChild(g);
    g.elType = "orthogonalprojection";
    g.parents = [i.id, g.id];
    g.update();
    g.generatePolynomial = function () {
        var l = d.point1.symbolic.x;
        var k = d.point1.symbolic.y;
        var r = d.point2.symbolic.x;
        var q = d.point2.symbolic.y;
        var t = i.symbolic.x;
        var s = i.symbolic.y;
        var o = g.symbolic.x;
        var m = g.symbolic.y;
        var p = "(" + k + ")*(" + o + ")-(" + k + ")*(" + r + ")+(" + m + ")*(" + r + ")-(" + l + ")*(" + m + ")+(" + l + ")*(" + q + ")-(" + o + ")*(" + q + ")";
        var n = "(" + s + ")*(" + k + ")-(" + s + ")*(" + q + ")-(" + m + ")*(" + k + ")+(" + m + ")*(" + q + ")+(" + t + ")*(" + l + ")-(" + t + ")*(" + r + ")-(" + o + ")*(" + l + ")+(" + o + ")*(" + r + ")";
        return [p, n]
    };
    return g
};
JXG.createPerpendicular = function (i, h, g) {
    var j, e, f, d;
    h[0] = JXG.getReference(i, h[0]);
    h[1] = JXG.getReference(i, h[1]);
    if (JXG.isPoint(h[0]) && h[1].elementClass == JXG.OBJECT_CLASS_LINE) {
        e = h[1];
        j = h[0]
    } else {
        if (JXG.isPoint(h[1]) && h[0].elementClass == JXG.OBJECT_CLASS_LINE) {
            e = h[0];
            j = h[1]
        } else {
            throw new Error("JSXGraph: Can't create perpendicular with parent types '" + (typeof h[0]) + "' and '" + (typeof h[1]) + "'.\nPossible parent types: [line,point]")
        }
    }
    d = JXG.copyAttributes(g, i.options, "perpendicular");
    f = JXG.createLine(i, [function () {
        return e.stdform[2] * j.X() - e.stdform[1] * j.Y()
    }, function () {
        return -e.stdform[2] * j.Z()
    }, function () {
        return e.stdform[1] * j.Z()
    }], d);
    f.elType = "perpendicular";
    f.parents = [e.id, j.id];
    return f
};
JXG.createPerpendicularPoint = function (h, f, e) {
    var d, i, g;
    if (JXG.isPoint(f[0]) && f[1].elementClass == JXG.OBJECT_CLASS_LINE) {
        i = f[0];
        d = f[1]
    } else {
        if (JXG.isPoint(f[1]) && f[0].elementClass == JXG.OBJECT_CLASS_LINE) {
            i = f[1];
            d = f[0]
        } else {
            throw new Error("JSXGraph: Can't create perpendicular point with parent types '" + (typeof f[0]) + "' and '" + (typeof f[1]) + "'.\nPossible parent types: [point,line]")
        }
    }
    g = h.create("point", [function () {
        return JXG.Math.Geometry.perpendicular(d, i, h)[0]
    }], e);
    i.addChild(g);
    d.addChild(g);
    g.elType = "perpendicularpoint";
    g.parents = [i.id, d.id];
    g.update();
    g.generatePolynomial = function () {
        var k = d.point1.symbolic.x;
        var j = d.point1.symbolic.y;
        var q = d.point2.symbolic.x;
        var p = d.point2.symbolic.y;
        var s = i.symbolic.x;
        var r = i.symbolic.y;
        var n = g.symbolic.x;
        var l = g.symbolic.y;
        var o = "(" + j + ")*(" + n + ")-(" + j + ")*(" + q + ")+(" + l + ")*(" + q + ")-(" + k + ")*(" + l + ")+(" + k + ")*(" + p + ")-(" + n + ")*(" + p + ")";
        var m = "(" + r + ")*(" + j + ")-(" + r + ")*(" + p + ")-(" + l + ")*(" + j + ")+(" + l + ")*(" + p + ")+(" + s + ")*(" + k + ")-(" + s + ")*(" + q + ")-(" + n + ")*(" + k + ")+(" + n + ")*(" + q + ")";
        return [o, m]
    };
    return g
};
JXG.createPerpendicularSegment = function (j, h, g) {
    var k, e, f, i, d;
    h[0] = JXG.getReference(j, h[0]);
    h[1] = JXG.getReference(j, h[1]);
    if (JXG.isPoint(h[0]) && h[1].elementClass == JXG.OBJECT_CLASS_LINE) {
        e = h[1];
        k = h[0]
    } else {
        if (JXG.isPoint(h[1]) && h[0].elementClass == JXG.OBJECT_CLASS_LINE) {
            e = h[0];
            k = h[1]
        } else {
            throw new Error("JSXGraph: Can't create perpendicular with parent types '" + (typeof h[0]) + "' and '" + (typeof h[1]) + "'.\nPossible parent types: [line,point]")
        }
    }
    d = JXG.copyAttributes(g, j.options, "perpendicularsegment", "point");
    i = JXG.createPerpendicularPoint(j, [e, k], d);
    i.dump = false;
    if (!JXG.exists(g.layer)) {
        g.layer = j.options.layer.line
    }
    d = JXG.copyAttributes(g, j.options, "perpendicularsegment");
    f = JXG.createLine(j, [function () {
        return (JXG.Math.Geometry.perpendicular(e, k, j)[1] ? [i, k] : [k, i])
    }], d);
    f.point = i;
    f.elType = "perpendicularsegment";
    f.parents = [k.id, e.id];
    f.subs = {
        point: i
    };
    return f
};
JXG.createMidpoint = function (i, g, f) {
    var e, d, h;
    if (g.length == 2 && JXG.isPoint(g[0]) && JXG.isPoint(g[1])) {
        e = g[0];
        d = g[1]
    } else {
        if (g.length == 1 && g[0].elementClass == JXG.OBJECT_CLASS_LINE) {
            e = g[0].point1;
            d = g[0].point2
        } else {
            throw new Error("JSXGraph: Can't create midpoint.\nPossible parent types: [point,point], [line]")
        }
    }
    h = i.create("point", [function () {
        var j = e.coords.usrCoords[1] + d.coords.usrCoords[1];
        if (isNaN(j) || Math.abs(e.coords.usrCoords[0]) < JXG.Math.eps || Math.abs(d.coords.usrCoords[0]) < JXG.Math.eps) {
            return NaN
        } else {
            return j * 0.5
        }
    }, function () {
        var j = e.coords.usrCoords[2] + d.coords.usrCoords[2];
        if (isNaN(j) || Math.abs(e.coords.usrCoords[0]) < JXG.Math.eps || Math.abs(d.coords.usrCoords[0]) < JXG.Math.eps) {
            return NaN
        } else {
            return j * 0.5
        }
    }], f);
    e.addChild(h);
    d.addChild(h);
    h.elType = "midpoint";
    h.parents = [e.id, d.id];
    h.prepareUpdate().update();
    h.generatePolynomial = function () {
        var l = e.symbolic.x;
        var k = e.symbolic.y;
        var n = d.symbolic.x;
        var m = d.symbolic.y;
        var p = h.symbolic.x;
        var o = h.symbolic.y;
        var j = "(" + k + ")*(" + p + ")-(" + k + ")*(" + n + ")+(" + o + ")*(" + n + ")-(" + l + ")*(" + o + ")+(" + l + ")*(" + m + ")-(" + p + ")*(" + m + ")";
        var q = "(" + l + ")^2 - 2*(" + l + ")*(" + p + ")+(" + k + ")^2-2*(" + k + ")*(" + o + ")-(" + n + ")^2+2*(" + n + ")*(" + p + ")-(" + m + ")^2+2*(" + m + ")*(" + o + ")";
        return [j, q]
    };
    return h
};
JXG.createParallelPoint = function (h, g, f) {
    var e, d, j, i;
    if (g.length == 3 && g[0].elementClass == JXG.OBJECT_CLASS_POINT && g[1].elementClass == JXG.OBJECT_CLASS_POINT && g[2].elementClass == JXG.OBJECT_CLASS_POINT) {
        e = g[0];
        d = g[1];
        j = g[2]
    } else {
        if (g[0].elementClass == JXG.OBJECT_CLASS_POINT && g[1].elementClass == JXG.OBJECT_CLASS_LINE) {
            j = g[0];
            e = g[1].point1;
            d = g[1].point2
        } else {
            if (g[1].elementClass == JXG.OBJECT_CLASS_POINT && g[0].elementClass == JXG.OBJECT_CLASS_LINE) {
                j = g[1];
                e = g[0].point1;
                d = g[0].point2
            } else {
                throw new Error("JSXGraph: Can't create parallel point with parent types '" + (typeof g[0]) + "', '" + (typeof g[1]) + "' and '" + (typeof g[2]) + "'.\nPossible parent types: [line,point], [point,point,point]")
            }
        }
    }
    i = h.create("point", [function () {
        return j.coords.usrCoords[1] + d.coords.usrCoords[1] - e.coords.usrCoords[1]
    }, function () {
        return j.coords.usrCoords[2] + d.coords.usrCoords[2] - e.coords.usrCoords[2]
    }], f);
    e.addChild(i);
    d.addChild(i);
    j.addChild(i);
    i.elType = "parallelpoint";
    i.parents = [e.id, d.id, j.id];
    i.prepareUpdate().update();
    i.generatePolynomial = function () {
        var l = e.symbolic.x;
        var k = e.symbolic.y;
        var t = d.symbolic.x;
        var s = d.symbolic.y;
        var n = j.symbolic.x;
        var m = j.symbolic.y;
        var q = i.symbolic.x;
        var o = i.symbolic.y;
        var r = "(" + s + ")*(" + q + ")-(" + s + ")*(" + n + ")-(" + k + ")*(" + q + ")+(" + k + ")*(" + n + ")-(" + o + ")*(" + t + ")+(" + o + ")*(" + l + ")+(" + m + ")*(" + t + ")-(" + m + ")*(" + l + ")";
        var p = "(" + o + ")*(" + l + ")-(" + o + ")*(" + n + ")-(" + s + ")*(" + l + ")+(" + s + ")*(" + n + ")-(" + q + ")*(" + k + ")+(" + q + ")*(" + m + ")+(" + t + ")*(" + k + ")-(" + t + ")*(" + m + ")";
        return [r, p]
    };
    return i
};
JXG.createParallel = function (j, h, g) {
    var k, f, i, e, d;
    k = null;
    if (h.length == 3) {
        k = h[2];
        e = function () {
            return JXG.Math.crossProduct(h[0].coords.usrCoords, h[1].coords.usrCoords)
        }
    } else {
        if (h[0].elementClass == JXG.OBJECT_CLASS_POINT) {
            k = h[0];
            e = function () {
                return h[1].stdform
            }
        } else {
            if (h[1].elementClass == JXG.OBJECT_CLASS_POINT) {
                k = h[1];
                e = function () {
                    return h[0].stdform
                }
            }
        }
    }
    if (!JXG.exists(g.layer)) {
        g.layer = j.options.layer.line
    }
    d = JXG.copyAttributes(g, j.options, "parallel", "point");
    f = j.create("point", [function () {
        return JXG.Math.crossProduct([1, 0, 0], e())
    }], d);
    f.isDraggable = true;
    d = JXG.copyAttributes(g, j.options, "parallel");
    i = j.create("line", [k, f], d);
    i.elType = "parallel";
    i.parents = [h[0].id, h[1].id];
    if (h.length === 3) {
        i.parents.push(h[2].id)
    }
    i.point = f;
    return i
};
JXG.createArrowParallel = function (g, f, d) {
    var i;
    try {
        d.firstArrow = false;
        d.lastArrow = true;
        i = JXG.createParallel(g, f, d).setStraight(false, false);
        i.elType = "arrowparallel";
        return i
    } catch (h) {
        throw new Error("JSXGraph: Can't create arrowparallel with parent types '" + (typeof f[0]) + "' and '" + (typeof f[1]) + "'.\nPossible parent types: [line,point], [point,point,point]")
    }
};
JXG.createNormal = function (o, s, j) {
    var d, r, h, k, q, e, t;
    if (s.length == 1) {
        d = s[0];
        r = d.slideObject
    } else {
        if (s.length == 2) {
            if (JXG.isPoint(s[0])) {
                d = s[0];
                r = s[1]
            } else {
                if (JXG.isPoint(s[1])) {
                    r = s[0];
                    d = s[1]
                } else {
                    throw new Error("JSXGraph: Can't create normal with parent types '" + (typeof s[0]) + "' and '" + (typeof s[1]) + "'.\nPossible parent types: [point,line], [point,circle], [glider]")
                }
            }
        } else {
            throw new Error("JSXGraph: Can't create normal with parent types '" + (typeof s[0]) + "' and '" + (typeof s[1]) + "'.\nPossible parent types: [point,line], [point,circle], [glider]")
        }
    }
    q = JXG.copyAttributes(j, o.options, "normal");
    if (r.elementClass == JXG.OBJECT_CLASS_LINE) {
        t = JXG.copyAttributes(j, o.options, "normal", "point");
        e = o.create("point", [function () {
            var f = JXG.Math.crossProduct([1, 0, 0], r.stdform);
            return [f[0], - f[2], f[1]]
        }], t);
        e.isDraggable = true;
        h = o.create("line", [d, e], q);
        h.point = e
    } else {
        if (r.elementClass == JXG.OBJECT_CLASS_CIRCLE) {
            h = o.create("line", [r.midpoint, d], q)
        } else {
            if (r.elementClass == JXG.OBJECT_CLASS_CURVE) {
                if (r.visProp.curvetype != "plot") {
                    var m = r.X;
                    var n = r.Y;
                    h = o.create("line", [function () {
                        return -d.X() * o.D(m)(d.position) - d.Y() * o.D(n)(d.position)
                    }, function () {
                        return o.D(m)(d.position)
                    }, function () {
                        return o.D(n)(d.position)
                    }], q)
                } else {
                    h = o.create("line", [function () {
                        var g = Math.floor(d.position);
                        var f = d.position - g;
                        if (g == r.numberPoints - 1) {
                            g--;
                            f = 1
                        }
                        if (g < 0) {
                            return 1
                        }
                        return (r.Y(g) + f * (r.Y(g + 1) - r.Y(g))) * (r.Y(g) - r.Y(g + 1)) - (r.X(g) + f * (r.X(g + 1) - r.X(g))) * (r.X(g + 1) - r.X(g))
                    }, function () {
                        var f = Math.floor(d.position);
                        if (f == r.numberPoints - 1) {
                            f--
                        }
                        if (f < 0) {
                            return 0
                        }
                        return r.X(f + 1) - r.X(f)
                    }, function () {
                        var f = Math.floor(d.position);
                        if (f == r.numberPoints - 1) {
                            f--
                        }
                        if (f < 0) {
                            return 0
                        }
                        return r.Y(f + 1) - r.Y(f)
                    }], q)
                }
            } else {
                if (r.type == JXG.OBJECT_TYPE_TURTLE) {
                    h = o.create("line", [function () {
                        var l = Math.floor(d.position);
                        var f = d.position - l;
                        var p, g;
                        for (g = 0; g < r.objects.length; g++) {
                            p = r.objects[g];
                            if (p.type == JXG.OBJECT_TYPE_CURVE) {
                                if (l < p.numberPoints) {
                                    break
                                }
                                l -= p.numberPoints
                            }
                        }
                        if (l == p.numberPoints - 1) {
                            l--;
                            f = 1
                        }
                        if (l < 0) {
                            return 1
                        }
                        return (p.Y(l) + f * (p.Y(l + 1) - p.Y(l))) * (p.Y(l) - p.Y(l + 1)) - (p.X(l) + f * (p.X(l + 1) - p.X(l))) * (p.X(l + 1) - p.X(l))
                    }, function () {
                        var g = Math.floor(d.position);
                        var l, f;
                        for (f = 0; f < r.objects.length; f++) {
                            l = r.objects[f];
                            if (l.type == JXG.OBJECT_TYPE_CURVE) {
                                if (g < l.numberPoints) {
                                    break
                                }
                                g -= l.numberPoints
                            }
                        }
                        if (g == l.numberPoints - 1) {
                            g--
                        }
                        if (g < 0) {
                            return 0
                        }
                        return l.X(g + 1) - l.X(g)
                    }, function () {
                        var g = Math.floor(d.position);
                        var l, f;
                        for (f = 0; f < r.objects.length; f++) {
                            l = r.objects[f];
                            if (l.type == JXG.OBJECT_TYPE_CURVE) {
                                if (g < l.numberPoints) {
                                    break
                                }
                                g -= l.numberPoints
                            }
                        }
                        if (g == l.numberPoints - 1) {
                            g--
                        }
                        if (g < 0) {
                            return 0
                        }
                        return l.Y(g + 1) - l.Y(g)
                    }], q)
                } else {
                    throw new Error("JSXGraph: Can't create normal with parent types '" + (typeof s[0]) + "' and '" + (typeof s[1]) + "'.\nPossible parent types: [point,line], [point,circle], [glider]")
                }
            }
        }
    }
    h.parents = [];
    for (k = 0; k < s.length; k++) {
        h.parents.push(s[k].id)
    }
    h.elType = "normal";
    return h
};
JXG.createBisector = function (j, g, f) {
    var k, e, h, d;
    if (g[0].elementClass == JXG.OBJECT_CLASS_POINT && g[1].elementClass == JXG.OBJECT_CLASS_POINT && g[2].elementClass == JXG.OBJECT_CLASS_POINT) {
        d = JXG.copyAttributes(f, j.options, "bisector", "point");
        k = j.create("point", [function () {
            return JXG.Math.Geometry.angleBisector(g[0], g[1], g[2], j)
        }], d);
        k.dump = false;
        for (h = 0; h < 3; h++) {
            g[h].addChild(k)
        }
        if (!JXG.exists(f.layer)) {
            f.layer = j.options.layer.line
        }
        d = JXG.copyAttributes(f, j.options, "bisector");
        e = JXG.createLine(j, [g[1], k], d);
        e.point = k;
        e.elType = "bisector";
        e.parents = [g[0].id, g[1].id, g[2].id];
        e.subs = {
            point: k
        };
        return e
    } else {
        throw new Error("JSXGraph: Can't create angle bisector with parent types '" + (typeof g[0]) + "' and '" + (typeof g[1]) + "'.\nPossible parent types: [point,point,point]")
    }
};
JXG.createAngularBisectorsOfTwoLines = function (i, k, g) {
    var f = JXG.getReference(i, k[0]),
        e = JXG.getReference(i, k[1]),
        d, l, j, h;
    if (f.elementClass != JXG.OBJECT_CLASS_LINE || e.elementClass != JXG.OBJECT_CLASS_LINE) {
        throw new Error("JSXGraph: Can't create angle bisectors of two lines with parent types '" + (typeof k[0]) + "' and '" + (typeof k[1]) + "'.\nPossible parent types: [line,line]")
    }
    if (!JXG.exists(g.layer)) {
        g.layer = i.options.layer.line
    }
    j = JXG.copyAttributes(g, i.options, "bisectorlines", "line1");
    d = i.create("line", [function () {
        var n = Math.sqrt(f.stdform[1] * f.stdform[1] + f.stdform[2] * f.stdform[2]);
        var m = Math.sqrt(e.stdform[1] * e.stdform[1] + e.stdform[2] * e.stdform[2]);
        return f.stdform[0] / n - e.stdform[0] / m
    }, function () {
        var n = Math.sqrt(f.stdform[1] * f.stdform[1] + f.stdform[2] * f.stdform[2]);
        var m = Math.sqrt(e.stdform[1] * e.stdform[1] + e.stdform[2] * e.stdform[2]);
        return f.stdform[1] / n - e.stdform[1] / m
    }, function () {
        var n = Math.sqrt(f.stdform[1] * f.stdform[1] + f.stdform[2] * f.stdform[2]);
        var m = Math.sqrt(e.stdform[1] * e.stdform[1] + e.stdform[2] * e.stdform[2]);
        return f.stdform[2] / n - e.stdform[2] / m
    }], j);
    if (!JXG.exists(g.layer)) {
        g.layer = i.options.layer.line
    }
    j = JXG.copyAttributes(g, i.options, "bisectorlines", "line2");
    l = i.create("line", [function () {
        var n = Math.sqrt(f.stdform[1] * f.stdform[1] + f.stdform[2] * f.stdform[2]);
        var m = Math.sqrt(e.stdform[1] * e.stdform[1] + e.stdform[2] * e.stdform[2]);
        return f.stdform[0] / n + e.stdform[0] / m
    }, function () {
        var n = Math.sqrt(f.stdform[1] * f.stdform[1] + f.stdform[2] * f.stdform[2]);
        var m = Math.sqrt(e.stdform[1] * e.stdform[1] + e.stdform[2] * e.stdform[2]);
        return f.stdform[1] / n + e.stdform[1] / m
    }, function () {
        var n = Math.sqrt(f.stdform[1] * f.stdform[1] + f.stdform[2] * f.stdform[2]);
        var m = Math.sqrt(e.stdform[1] * e.stdform[1] + e.stdform[2] * e.stdform[2]);
        return f.stdform[2] / n + e.stdform[2] / m
    }], j);
    h = new JXG.Composition({
        line1: d,
        line2: l
    });
    d.dump = false;
    l.dump = false;
    h.elType = "bisectorlines";
    h.parents = [f.id, e.id];
    h.subs = {
        line1: d,
        line2: l
    };
    return h
};
JXG.createCircumcircleMidpoint = function (g, e, d) {
    var h, f;
    if (e[0].elementClass == JXG.OBJECT_CLASS_POINT && e[1].elementClass == JXG.OBJECT_CLASS_POINT && e[2].elementClass == JXG.OBJECT_CLASS_POINT) {
        h = JXG.createPoint(g, [function () {
            return JXG.Math.Geometry.circumcenterMidpoint(e[0], e[1], e[2], g)
        }], d);
        for (f = 0; f < 3; f++) {
            e[f].addChild(h)
        }
        h.elType = "circumcenter";
        h.parents = [e[0].id, e[1].id, e[2].id];
        h.generatePolynomial = function () {
            var j = a.symbolic.x;
            var i = a.symbolic.y;
            var r = b.symbolic.x;
            var q = b.symbolic.y;
            var l = c.symbolic.x;
            var k = c.symbolic.y;
            var o = h.symbolic.x;
            var m = h.symbolic.y;
            var p = ["((", o, ")-(", j, "))^2+((", m, ")-(", i, "))^2-((", o, ")-(", r, "))^2-((", m, ")-(", q, "))^2"].join("");
            var n = ["((", o, ")-(", j, "))^2+((", m, ")-(", i, "))^2-((", o, ")-(", l, "))^2-((", m, ")-(", k, "))^2"].join("");
            return [p, n]
        };
        return h
    } else {
        throw new Error("JSXGraph: Can't create circumcircle midpoint with parent types '" + (typeof e[0]) + "', '" + (typeof e[1]) + "' and '" + (typeof e[2]) + "'.\nPossible parent types: [point,point,point]")
    }
};
JXG.createIncenter = function (g, f, e) {
    var h, k, d, j, i;
    if (f.length >= 3 && JXG.isPoint(f[0]) && JXG.isPoint(f[1]) && JXG.isPoint(f[2])) {
        d = f[0];
        j = f[1];
        i = f[2];
        h = g.create("point", [function () {
            var m, l, n;
            m = Math.sqrt((j.X() - i.X()) * (j.X() - i.X()) + (j.Y() - i.Y()) * (j.Y() - i.Y()));
            l = Math.sqrt((d.X() - i.X()) * (d.X() - i.X()) + (d.Y() - i.Y()) * (d.Y() - i.Y()));
            n = Math.sqrt((j.X() - d.X()) * (j.X() - d.X()) + (j.Y() - d.Y()) * (j.Y() - d.Y()));
            return new JXG.Coords(JXG.COORDS_BY_USER, [(m * d.X() + l * j.X() + n * i.X()) / (m + l + n), (m * d.Y() + l * j.Y() + n * i.Y()) / (m + l + n)], g)
        }], e);
        h.elType = "incenter";
        h.parents = [f[0].id, f[1].id, f[2].id]
    } else {
        throw new Error("JSXGraph: Can't create incenter with parent types '" + (typeof f[0]) + "', '" + (typeof f[1]) + "' and '" + (typeof f[2]) + "'.\nPossible parent types: [point,point,point]")
    }
    return h
};
JXG.createCircumcircle = function (h, g, f) {
    var j, k, d;
    try {
        d = JXG.copyAttributes(f, h.options, "circumcircle", "center");
        j = JXG.createCircumcircleMidpoint(h, g, d);
        j.dump = false;
        if (!JXG.exists(f.layer)) {
            f.layer = h.options.layer.circle
        }
        d = JXG.copyAttributes(f, h.options, "circumcircle");
        k = JXG.createCircle(h, [j, g[0]], d);
        k.elType = "circumcircle";
        k.parents = [g[0].id, g[1].id, g[2].id];
        k.subs = {
            center: j
        }
    } catch (i) {
        throw new Error("JSXGraph: Can't create circumcircle with parent types '" + (typeof g[0]) + "', '" + (typeof g[1]) + "' and '" + (typeof g[2]) + "'.\nPossible parent types: [point,point,point]")
    }
    return k
};
JXG.createIncircle = function (i, h, f) {
    var k, l, d, g;
    try {
        d = JXG.copyAttributes(f, i.options, "incircle", "center");
        k = JXG.createIncenter(i, h, d);
        k.dump = false;
        if (!JXG.exists(f.layer)) {
            f.layer = i.options.layer.circle
        }
        d = JXG.copyAttributes(f, i.options, "incircle");
        l = JXG.createCircle(i, [k, function () {
            var m = Math.sqrt((h[1].X() - h[2].X()) * (h[1].X() - h[2].X()) + (h[1].Y() - h[2].Y()) * (h[1].Y() - h[2].Y())),
                e = Math.sqrt((h[0].X() - h[2].X()) * (h[0].X() - h[2].X()) + (h[0].Y() - h[2].Y()) * (h[0].Y() - h[2].Y())),
                o = Math.sqrt((h[1].X() - h[0].X()) * (h[1].X() - h[0].X()) + (h[1].Y() - h[0].Y()) * (h[1].Y() - h[0].Y())),
                n = (m + e + o) / 2;
            return Math.sqrt(((n - m) * (n - e) * (n - o)) / n)
        }], d);
        l.elType = "incircle";
        l.parents = [h[0].id, h[1].id, h[2].id];
        l.center = k;
        l.subs = {
            center: k
        }
    } catch (j) {
        throw new Error("JSXGraph: Can't create circumcircle with parent types '" + (typeof h[0]) + "', '" + (typeof h[1]) + "' and '" + (typeof h[2]) + "'.\nPossible parent types: [point,point,point]")
    }
    return l
};
JXG.createReflection = function (h, f, e) {
    var d, j, i, g;
    if (f[0].elementClass == JXG.OBJECT_CLASS_POINT && f[1].elementClass == JXG.OBJECT_CLASS_LINE) {
        j = f[0];
        d = f[1]
    } else {
        if (f[1].elementClass == JXG.OBJECT_CLASS_POINT && f[0].elementClass == JXG.OBJECT_CLASS_LINE) {
            j = f[1];
            d = f[0]
        } else {
            throw new Error("JSXGraph: Can't create reflection point with parent types '" + (typeof f[0]) + "' and '" + (typeof f[1]) + "'.\nPossible parent types: [line,point]")
        }
    }
    g = JXG.createTransform(h, [d], {
        type: "reflect"
    });
    i = JXG.createPoint(h, [j, g], e);
    j.addChild(i);
    d.addChild(i);
    i.elType = "reflection";
    i.parents = [f[0].id, f[1].id];
    i.prepareUpdate().update();
    i.generatePolynomial = function () {
        var l = d.point1.symbolic.x;
        var k = d.point1.symbolic.y;
        var r = d.point2.symbolic.x;
        var q = d.point2.symbolic.y;
        var t = j.symbolic.x;
        var s = j.symbolic.y;
        var n = i.symbolic.x;
        var m = i.symbolic.y;
        var p = ["((", m, ")-(", s, "))*((", k, ")-(", q, "))+((", l, ")-(", r, "))*((", n, ")-(", t, "))"].join("");
        var o = ["((", n, ")-(", l, "))^2+((", m, ")-(", k, "))^2-((", t, ")-(", l, "))^2-((", s, ")-(", k, "))^2"].join("");
        return [p, o]
    };
    return i
};
JXG.createMirrorPoint = function (g, e, d) {
    var h, f;
    if (JXG.isPoint(e[0]) && JXG.isPoint(e[1])) {
        h = JXG.createPoint(g, [function () {
            return JXG.Math.Geometry.rotation(e[0], e[1], Math.PI, g)
        }], d);
        for (f = 0; f < 2; f++) {
            e[f].addChild(h)
        }
        h.elType = "mirrorpoint";
        h.parents = [e[0].id, e[1].id]
    } else {
        throw new Error("JSXGraph: Can't create mirror point with parent types '" + (typeof e[0]) + "' and '" + (typeof e[1]) + "'.\nPossible parent types: [point,point]")
    }
    h.prepareUpdate().update();
    return h
};
JXG.createIntegral = function (i, z, m) {
    var w, r, u, g = 0,
        f = 0,
        e, d, l, k, q = 1,
        v, n, h, A, j, o, s;
    if (JXG.isArray(z[0]) && z[1].elementClass == JXG.OBJECT_CLASS_CURVE) {
        w = z[0];
        r = z[1]
    } else {
        if (JXG.isArray(z[1]) && z[0].elementClass == JXG.OBJECT_CLASS_CURVE) {
            w = z[1];
            r = z[0]
        } else {
            throw new Error("JSXGraph: Can't create integral with parent types '" + (typeof z[0]) + "' and '" + (typeof z[1]) + "'.\nPossible parent types: [[number|function,number|function],curve]")
        }
    }
    g = w[0];
    f = w[1];
    if (JXG.isFunction(g)) {
        e = g;
        d = function () {
            return r.Y(e())
        };
        g = e()
    } else {
        e = g;
        d = r.Y(g)
    }
    if (JXG.isFunction(g)) {
        l = f;
        k = function () {
            return r.Y(l())
        };
        f = l()
    } else {
        l = f;
        k = r.Y(f)
    }
    if (f < g) {
        q = -1
    }
    u = JXG.copyAttributes(m, i.options, "integral", "curveLeft");
    v = i.create("glider", [e, d, r], u);
    if (JXG.isFunction(e)) {
        v.hideElement()
    }
    u = JXG.copyAttributes(m, i.options, "integral", "baseLeft");
    n = i.create("point", [function () {
        return v.X()
    },
    0], u);
    u = JXG.copyAttributes(m, i.options, "integral", "curveRight");
    h = i.create("glider", [l, k, r], u);
    if (JXG.isFunction(l)) {
        h.hideElement()
    }
    u = JXG.copyAttributes(m, i.options, "integral", "baseRight");
    A = i.create("point", [function () {
        return h.X()
    },
    0], u);
    u = JXG.copyAttributes(m, i.options, "integral");
    if (u.withLabel !== false) {
        u = JXG.copyAttributes(m, i.options, "integral", "label");
        o = i.create("text", [function () {
            return h.X() + 0.2
        }, function () {
            return h.Y() - 0.8
        }, function () {
            var p = JXG.Math.Numerics.I([n.X(), A.X()], r.Y);
            return "&int; = " + (p).toFixed(4)
        }], u);
        o.dump = false;
        v.addChild(o);
        h.addChild(o)
    }
    u = JXG.copyAttributes(m, i.options, "integral");
    s = i.create("curve", [
        [0],
        [0]
    ], u);
    v.dump = false;
    n.dump = false;
    h.dump = false;
    A.dump = false;
    s.elType = "integral";
    s.parents = [r.id, w];
    s.subs = {
        curveLeft: v,
        baseLeft: n,
        curveRight: h,
        baseRight: A
    };
    if (u.withLabel) {
        s.subs.label = o
    }
    s.updateDataArray = function () {
        var p, D, B, C, t;
        if (n.X() < A.X()) {
            C = n.X();
            t = A.X()
        } else {
            C = A.X();
            t = n.X()
        }
        p = [C, C];
        D = [0, r.Y(C)];
        for (B = 0; B < r.numberPoints; B++) {
            if ((C <= r.points[B].usrCoords[1]) && (r.points[B].usrCoords[1] <= t)) {
                p.push(r.points[B].usrCoords[1]);
                D.push(r.points[B].usrCoords[2])
            }
        }
        p.push(t);
        D.push(r.Y(t));
        p.push(t);
        D.push(0);
        p.push(C);
        D.push(0);
        this.dataX = p;
        this.dataY = D
    };
    v.addChild(s);
    h.addChild(s);
    s.baseLeft = n;
    s.baseRight = A;
    s.curveLeft = v;
    s.curveRight = h;
    s.label = {
        content: o
    };
    return s
};
JXG.createLocus = function (f, e, d) {
    var h, g;
    if (JXG.isArray(e) && e.length == 1 && e[0].elementClass == JXG.OBJECT_CLASS_POINT) {
        g = e[0]
    } else {
        throw new Error("JSXGraph: Can't create locus with parent of type other than point.\nPossible parent types: [point]")
    }
    h = f.create("curve", [
        [null],
        [null]
    ], d);
    h.dontCallServer = false;
    h.elType = "locus";
    h.parents = [g.id];
    h.updateDataArray = function () {
        if (h.board.mode > 0) {
            return
        }
        var j = JXG.Math.Symbolic.generatePolynomials(f, g, true).join("|");
        if (j === h.spe) {
            return
        }
        h.spe = j;
        var i = function (m, o, l, n) {
            h.dataX = m;
            h.dataY = o;
            h.eq = l;
            h.ctime = n;
            h.generatePolynomial = (function (p) {
                return function (r) {
                    var q = "(" + r.symbolic.x + ")",
                        u = "(" + r.symbolic.y + ")",
                        t = [],
                        s;
                    for (s = 0; s < p.length; s++) {
                        t[s] = p[s].replace(/\*\*/g, "^").replace(/x/g, q).replace(/y/g, u)
                    }
                    return t
                }
            })(l)
        }, k = JXG.Math.Symbolic.geometricLocusByGroebnerBase(f, g, i);
        i(k.datax, k.datay, k.polynomial, k.exectime)
    };
    return h
};
JXG.createGrid = function (g, f, e) {
    var h, d;
    d = JXG.copyAttributes(e, g.options, "grid");
    h = g.create("curve", [
        [null],
        [null]
    ], d);
    h.elType = "grid";
    h.parents = [];
    h.type = JXG.OBJECT_TYPE_GRID;
    h.updateDataArray = function () {
        var j = this.visProp.gridx,
            n = this.visProp.gridy,
            m = new JXG.Coords(JXG.COORDS_BY_SCREEN, [0, 0], g),
            l = new JXG.Coords(JXG.COORDS_BY_SCREEN, [g.canvasWidth, g.canvasHeight], g),
            k;
        g.options.grid.hasGrid = true;
        m.setCoordinates(JXG.COORDS_BY_USER, [Math.floor(m.usrCoords[1] / j) * j, Math.ceil(m.usrCoords[2] / n) * n]);
        l.setCoordinates(JXG.COORDS_BY_USER, [Math.ceil(l.usrCoords[1] / j) * j, Math.floor(l.usrCoords[2] / n) * n]);
        h.dataX = [];
        h.dataY = [];
        for (k = m.usrCoords[2]; k > l.usrCoords[2] - n; k -= n) {
            h.dataX.push(m.usrCoords[1], l.usrCoords[1], NaN);
            h.dataY.push(k, k, NaN)
        }
        for (k = m.usrCoords[1]; k < l.usrCoords[1] + j; k += j) {
            h.dataX.push(k, k, NaN);
            h.dataY.push(m.usrCoords[2], l.usrCoords[2], NaN)
        }
    };
    h.hasPoint = function () {
        return false
    };
    g.grids.push(h);
    return h
};
JXG.JSXGraph.registerElement("arrowparallel", JXG.createArrowParallel);
JXG.JSXGraph.registerElement("bisector", JXG.createBisector);
JXG.JSXGraph.registerElement("bisectorlines", JXG.createAngularBisectorsOfTwoLines);
JXG.JSXGraph.registerElement("circumcircle", JXG.createCircumcircle);
JXG.JSXGraph.registerElement("circumcirclemidpoint", JXG.createCircumcircleMidpoint);
JXG.JSXGraph.registerElement("circumcenter", JXG.createCircumcircleMidpoint);
JXG.JSXGraph.registerElement("incenter", JXG.createIncenter);
JXG.JSXGraph.registerElement("incircle", JXG.createIncircle);
JXG.JSXGraph.registerElement("integral", JXG.createIntegral);
JXG.JSXGraph.registerElement("midpoint", JXG.createMidpoint);
JXG.JSXGraph.registerElement("mirrorpoint", JXG.createMirrorPoint);
JXG.JSXGraph.registerElement("normal", JXG.createNormal);
JXG.JSXGraph.registerElement("orthogonalprojection", JXG.createOrthogonalProjection);
JXG.JSXGraph.registerElement("parallel", JXG.createParallel);
JXG.JSXGraph.registerElement("parallelpoint", JXG.createParallelPoint);
JXG.JSXGraph.registerElement("perpendicular", JXG.createPerpendicular);
JXG.JSXGraph.registerElement("perpendicularpoint", JXG.createPerpendicularPoint);
JXG.JSXGraph.registerElement("perpendicularsegment", JXG.createPerpendicularSegment);
JXG.JSXGraph.registerElement("reflection", JXG.createReflection);
JXG.JSXGraph.registerElement("locus", JXG.createLocus);
JXG.JSXGraph.registerElement("grid", JXG.createGrid);
JXG.Text = function (h, j, k, e) {
    this.constructor(h, e, JXG.OBJECT_TYPE_TEXT, JXG.OBJECT_CLASS_OTHER);
    var g;
    this.content = j;
    this.plaintext = "";
    this.isDraggable = false;
    this.needsSizeUpdate = false;
    if ((this.element = JXG.getRef(this.board, e.anchor))) {
        var f;
        if (this.visProp.islabel) {
            this.relativeCoords = new JXG.Coords(JXG.COORDS_BY_SCREEN, [parseFloat(k[0]), parseFloat(k[1])], this.board)
        } else {
            this.relativeCoords = new JXG.Coords(JXG.COORDS_BY_USER, [parseFloat(k[0]), parseFloat(k[1])], this.board)
        }
        this.element.addChild(this);
        this.coords = new JXG.Coords(JXG.COORDS_BY_SCREEN, [0, 0], this.board);
        this.isDraggable = true
    } else {
        if (JXG.isNumber(k[0]) && JXG.isNumber(k[1])) {
            this.isDraggable = true
        }
        this.X = JXG.createFunction(k[0], this.board, null, true);
        this.Y = JXG.createFunction(k[1], this.board, null, true);
        this.coords = new JXG.Coords(JXG.COORDS_BY_USER, [this.X(), this.Y()], this.board);
        var d = "this.coords.setCoordinates(JXG.COORDS_BY_USER,[this.X(),this.Y()]);";
        this.updateCoords = new Function("", d)
    }
    if (typeof this.content === "function") {
        this.updateText = function () {
            this.plaintext = this.content()
        };
        this.needsSizeUpdate = true
    } else {
        if (JXG.isNumber(this.content)) {
            this.content = (this.content).toFixed(this.visProp.digits)
        } else {
            if (this.visProp.useasciimathml) {
                this.content = "'`" + this.content + "`'";
                this.needsSizeUpdate = true
            } else {
                this.content = this.generateTerm(this.content)
            }
        }
        this.updateText = new Function("this.plaintext = " + this.content + ";")
    }
    this.size = [1, 1];
    this.updateText();
    this.id = this.board.setId(this, "T");
    this.board.renderer.drawText(this);
    this.updateSize();
    if (!this.visProp.visible) {
        this.board.renderer.hide(this)
    }
    if (typeof this.content === "string") {
        this.notifyParents(this.content)
    }
    this.elType = "text";
    this.methodMap = JXG.deepCopy(this.methodMap, {
        setText: "setTextJessieCode",
        free: "free",
        move: "setCoords"
    });
    return this
};
JXG.Text.prototype = new JXG.GeometryElement();
JXG.extend(JXG.Text.prototype, {
    hasPoint: function (d, j) {
        var g, e, h, i, f = this.board.options.precision.hasPoint;
        if (this.visProp.anchorx === "right") {
            g = this.coords.scrCoords[1] - this.size[0]
        } else {
            if (this.visProp.anchorx === "middle") {
                g = this.coords.scrCoords[1] - 0.5 * this.size[0]
            } else {
                g = this.coords.scrCoords[1]
            }
        }
        e = g + this.size[0];
        if (this.visProp.anchory === "top") {
            i = this.coords.scrCoords[2] + this.size[1]
        } else {
            if (this.visProp.anchorx === "middle") {
                i = this.coords.scrCoords[2] + 0.5 * this.size[1]
            } else {
                i = this.coords.scrCoords[2]
            }
        }
        h = i - this.size[1];
        return (j >= h - f && j <= i + f) && ((d >= g - f && d <= g + 2 * f) || (d >= e - 2 * f && d <= e + f))
    },
    setTextJessieCode: function (e) {
        var d;
        this.visProp.castext = e;
        if (typeof e === "function") {
            d = function () {
                return e().replace(/</g, "&lt;").replace(/>/g, "&gt;")
            }
        } else {
            if (JXG.isNumber(e)) {
                d = e
            } else {
                d = e.replace(/</g, "&lt;").replace(/>/g, "&gt;")
            }
        }
        return this.setText(d)
    },
    setText: function (d) {
        if (typeof d === "function") {
            this.updateText = function () {
                this.plaintext = d()
            }
        } else {
            if (JXG.isNumber(d)) {
                this.content = (d).toFixed(this.visProp.digits)
            } else {
                if (this.visProp.useasciimathml) {
                    this.content = "'`" + d + "`'"
                } else {
                    this.content = this.generateTerm(d)
                }
            }
            this.updateText = new Function("this.plaintext = " + this.content + "; ")
        }
        this.updateText();
        this.prepareUpdate().update().updateRenderer();
        return this
    },
    updateSize: function () {
        var d;
        if (typeof document === "undefined") {
            return this
        }
        if (this.visProp.display == "html" && this.board.renderer.type != "vml") {
            this.size = [this.rendNode.offsetWidth, this.rendNode.offsetHeight]
        } else {
            if (this.visProp.display == "internal" && this.board.renderer.type == "svg") {
                try {
                    d = this.rendNode.getBBox();
                    this.size = [d.width, d.height]
                } catch (f) {}
            } else {
                if (this.board.renderer.type == "vml" || (this.visProp.display == "internal" && this.board.renderer.type == "canvas")) {
                    this.size = [parseFloat(this.visProp.fontsize) * this.plaintext.length * 0.45, parseFloat(this.visProp.fontsize) * 0.9]
                }
            }
        }
        return this
    },
    getSize: function () {
        return this.size
    },
    setCoords: function (d, e) {
        if (JXG.isArray(d) && d.length > 1) {
            e = d[1];
            d = d[0]
        }
        this.X = function () {
            return d
        };
        this.Y = function () {
            return e
        };
        this.coords = new JXG.Coords(JXG.COORDS_BY_USER, [d, e], this.board);
        this.prepareUpdate().update().updateRenderer();
        return this
    },
    free: function () {
        this.X = JXG.createFunction(this.X(), this.board, "");
        this.Y = JXG.createFunction(this.Y(), this.board, "");
        this.isDraggable = true
    },
    update: function () {
        var d, f, e;
        if (this.needsUpdate) {
            if (this.relativeCoords) {
                if (this.visProp.islabel) {
                    f = parseFloat(this.visProp.offset[0]);
                    e = -parseFloat(this.visProp.offset[1]);
                    d = this.element.getLabelAnchor();
                    this.coords.setCoordinates(JXG.COORDS_BY_SCREEN, [f + this.relativeCoords.scrCoords[1] + d.scrCoords[1], e + this.relativeCoords.scrCoords[2] + d.scrCoords[2]])
                } else {
                    d = this.element.getTextAnchor();
                    this.coords.setCoordinates(JXG.COORDS_BY_USER, [this.relativeCoords.usrCoords[1] + d.usrCoords[1], this.relativeCoords.usrCoords[2] + d.usrCoords[2]])
                }
            } else {
                this.updateCoords()
            }
            this.updateText();
            if (this.needsSizeUpdate) {
                this.updateSize()
            }
            this.updateTransform()
        }
        return this
    },
    updateRenderer: function () {
        if (this.needsUpdate) {
            this.board.renderer.updateText(this);
            this.needsUpdate = false
        }
        return this
    },
    updateTransform: function () {
        var d;
        if (this.transformations.length == 0) {
            return
        }
        for (d = 0; d < this.transformations.length; d++) {
            this.transformations[d].update()
        }
        return this
    },
    generateTerm: function (h) {
        var g, k = '""',
            f;
        h = h || "";
        h = h.replace(/\r/g, "");
        h = h.replace(/\n/g, "");
        h = h.replace(/\"/g, '\\"');
        h = h.replace(/\'/g, "\\'");
        h = h.replace(/&amp;arc;/g, "&ang;");
        h = h.replace(/<arc\s*\/>/g, "&ang;");
        h = h.replace(/<sqrt\s*\/>/g, "&radic;");
        var e;
        e = h.indexOf("<value>");
        var d = h.indexOf("</value>");
        if (e >= 0) {
            this.needsSizeUpdate = true;
            while (e >= 0) {
                k += ' + "' + JXG.GeonextParser.replaceSub(JXG.GeonextParser.replaceSup(h.slice(0, e))) + '"';
                f = h.slice(e + 7, d);
                g = JXG.GeonextParser.geonext2JS(f, this.board);
                g = g.replace(/\\"/g, '"');
                g = g.replace(/\\'/g, "'");
                if (g.indexOf("toFixed") < 0) {
                    if (JXG.isNumber((JXG.bind(new Function("return " + g + ";"), this))())) {
                        k += "+(" + g + ").toFixed(" + (this.visProp.digits) + ")"
                    } else {
                        k += "+(" + g + ")"
                    }
                } else {
                    k += "+(" + g + ")"
                }
                h = h.slice(d + 8);
                e = h.indexOf("<value>");
                d = h.indexOf("</value>")
            }
        }
        k += ' + "' + JXG.GeonextParser.replaceSub(JXG.GeonextParser.replaceSup(h)) + '"';
        k = k.replace(/<overline>/g, "<span style=text-decoration:overline>");
        k = k.replace(/<\/overline>/g, "</span>");
        k = k.replace(/<arrow>/g, "<span style=text-decoration:overline>");
        k = k.replace(/<\/arrow>/g, "</span>");
        k = k.replace(/&amp;/g, "&");
        return k
    },
    notifyParents: function (f) {
        var e = null;
        do {
            var d = /<value>([\w\s\*\/\^\-\+\(\)\[\],<>=!]+)<\/value>/;
            e = d.exec(f);
            if (e != null) {
                JXG.GeonextParser.findDependencies(this, e[1], this.board);
                f = f.substr(e.index);
                f = f.replace(d, "")
            }
        } while (e != null);
        return this
    },
    bounds: function () {
        var d = this.coords.usrCoords;
        return this.visProp.islabel ? [0, 0, 0, 0] : [d[1], d[2] + this.size[1], d[1] + this.size[0], d[2]]
    },
    setPositionDirectly: function (j, h, g) {
        var e, d, i, f;
        if (this.relativeCoords) {
            if (this.visProp.islabel) {
                f = new JXG.Coords(j, g, this.board);
                i = new JXG.Coords(j, h, this.board);
                e = i.scrCoords[1] - f.scrCoords[1];
                d = i.scrCoords[2] - f.scrCoords[2];
                this.relativeCoords.scrCoords[1] += e;
                this.relativeCoords.scrCoords[2] += d
            } else {
                f = new JXG.Coords(j, g, this.board);
                i = new JXG.Coords(j, h, this.board);
                e = i.usrCoords[1] - f.usrCoords[1];
                d = i.usrCoords[2] - f.usrCoords[2];
                this.relativeCoords.usrCoords[1] += e;
                this.relativeCoords.usrCoords[2] += d
            }
        } else {
            i = new JXG.Coords(j, h, this.board);
            this.X = JXG.createFunction(i.usrCoords[1], this.board, "");
            this.Y = JXG.createFunction(i.usrCoords[2], this.board, "")
        }
        return this
    }
});
JXG.createText = function (h, f, e) {
    var d, g, d = JXG.copyAttributes(e, h.options, "text");
    d.anchor = d.parent || d.anchor;
    g = new JXG.Text(h, f[f.length - 1], f, d);
    if (typeof f[f.length - 1] !== "function") {
        g.parents = f
    }
    if (JXG.evaluate(d.rotate) != 0 && d.display == "internal") {
        g.addRotation(JXG.evaluate(d.rotate))
    }
    return g
};
JXG.JSXGraph.registerElement("text", JXG.createText);
JXG.Image = function (g, e, h, f, d) {
    this.constructor(g, d, JXG.OBJECT_TYPE_IMAGE, JXG.OBJECT_CLASS_OTHER);
    this.initialCoords = new JXG.Coords(JXG.COORDS_BY_USER, h, this.board);
    if (!JXG.isFunction(h[0]) && !JXG.isFunction(h[1])) {
        this.isDraggable = true
    }
    this.X = JXG.createFunction(h[0], this.board, "");
    this.Y = JXG.createFunction(h[1], this.board, "");
    this.W = JXG.createFunction(f[0], this.board, "");
    this.H = JXG.createFunction(f[1], this.board, "");
    this.coords = new JXG.Coords(JXG.COORDS_BY_USER, [this.X(), this.Y()], this.board);
    this.updateCoords = new Function("", "this.coords.setCoordinates(JXG.COORDS_BY_USER,[this.X(),this.Y()]);");
    this.updateSize = new Function("", "this.coords.setCoordinates(JXG.COORDS_BY_USER,[this.W(),this.H()]);");
    this.usrSize = [this.W(), this.H()];
    this.size = [this.usrSize[0] * g.unitX, this.usrSize[1] * g.unitY];
    this.url = e;
    this.parent = JXG.getRef(d.anchor);
    this.id = this.board.setId(this, "Im");
    this.board.renderer.drawImage(this);
    if (!this.visProp.visible) {
        this.board.renderer.hide(this)
    }
};
JXG.Image.prototype = new JXG.GeometryElement;
JXG.extend(JXG.Image.prototype, {
    hasPoint: function (d, h) {
        var f = d - this.coords.scrCoords[1],
            e = this.coords.scrCoords[2] - h,
            g = this.board.options.precision.hasPoint;
        if (f >= -g && f <= 2 * g && e >= -g && e <= g) {
            return true
        } else {
            return false
        }
    },
    update: function () {
        if (this.needsUpdate) {
            this.updateCoords();
            this.usrSize = [this.W(), this.H()];
            this.size = [this.usrSize[0] * this.board.unitX, this.usrSize[1] * this.board.unitY];
            this.updateTransform()
        }
        return this
    },
    updateRenderer: function () {
        if (this.needsUpdate) {
            this.board.renderer.updateImage(this);
            this.needsUpdate = false
        }
        return this
    },
    updateTransform: function () {
        if (this.transformations.length == 0) {
            return
        }
        for (var d = 0; d < this.transformations.length; d++) {
            this.transformations[d].update()
        }
    },
    addTransform: function (d) {
        if (JXG.isArray(d)) {
            for (var e = 0; e < d.length; e++) {
                this.transformations.push(d[e])
            }
        } else {
            this.transformations.push(d)
        }
    },
    setPositionDirectly: function (e, d) {
        var d = new JXG.Coords(e, d, this.board);
        this.X = JXG.createFunction(d.usrCoords[1], this.board, "");
        this.Y = JXG.createFunction(d.usrCoords[2], this.board, "");
        return this
    }
});
JXG.createImage = function (i, h, f) {
    var g, d, e;
    d = JXG.copyAttributes(f, i.options, "image");
    e = new JXG.Image(i, h[0], h[1], h[2], d);
    if (JXG.evaluate(d.rotate) != 0) {
        e.addRotation(JXG.evaluate(d.rotate))
    }
    return e
};
JXG.JSXGraph.registerElement("image", JXG.createImage);
JXG.createSlider = function (o, D, p) {
    var j, i, C, k, E, q, f, e, A, F, l, h, g, d, z, v, r, m, u, s, w, B;
    j = D[0];
    i = D[1];
    C = D[2][0];
    k = D[2][1];
    E = D[2][2];
    q = E - C;
    w = JXG.copyAttributes(p, o.options, "slider");
    u = w.withticks;
    m = w.withlabel;
    s = w.snapwidth;
    B = w.precision;
    w = JXG.copyAttributes(p, o.options, "slider", "point1");
    f = o.create("point", j, w);
    w = JXG.copyAttributes(p, o.options, "slider", "point2");
    e = o.create("point", i, w);
    o.create("group", [f, e]);
    w = JXG.copyAttributes(p, o.options, "slider", "baseline");
    A = o.create("segment", [f, e], w);
    A.updateStdform();
    if (u) {
        w = JXG.copyAttributes(p, o.options, "slider", "ticks");
        F = 2;
        l = o.create("ticks", [A, e.Dist(f) / F], w)
    }
    h = j[0] + (i[0] - j[0]) * (k - C) / (E - C);
    g = j[1] + (i[1] - j[1]) * (k - C) / (E - C);
    w = JXG.copyAttributes(p, o.options, "slider");
    w.withLabel = false;
    d = o.create("glider", [h, g, A], w);
    d.setProperty({
        snapwidth: s
    });
    w = JXG.copyAttributes(p, o.options, "slider", "highline");
    z = o.create("segment", [f, d], w);
    d.Value = function () {
        return d.visProp.snapwidth === -1 ? this.position * q + C : Math.round((this.position * q + C) / this.visProp.snapwidth) * this.visProp.snapwidth
    };
    d.methodMap = JXG.deepCopy(d.methodMap, {
        Value: "Value"
    });
    d._smax = E;
    d._smin = C;
    if (m) {
        if (p.name && p.name != "") {
            v = p.name + " = "
        } else {
            v = ""
        }
        w = JXG.copyAttributes(p, o.options, "slider", "label");
        r = o.create("text", [function () {
            return (e.X() - f.X()) * 0.05 + e.X()
        }, function () {
            return (e.Y() - f.Y()) * 0.05 + e.Y()
        }, function () {
            return v + (d.Value()).toFixed(B)
        }], w);
        d.label.content = r
    }
    d.point1 = f;
    d.point2 = e;
    d.baseline = A;
    d.highline = z;
    if (u) {
        d.ticks = l
    }
    d.remove = function () {
        if (m) {
            o.removeObject(r)
        }
        o.removeObject(z);
        if (u) {
            A.removeTicks(l)
        }
        o.removeObject(A);
        o.removeObject(e);
        o.removeObject(f);
        JXG.Point.prototype.remove.call(d)
    };
    f.dump = false;
    e.dump = false;
    A.dump = false;
    z.dump = false;
    d.elType = "slider";
    d.parents = D;
    d.subs = {
        point1: f,
        point2: e,
        baseLine: A,
        highLine: z
    };
    if (u) {
        l.dump = false;
        d.subs.ticks = l
    }
    return d
};
JXG.JSXGraph.registerElement("slider", JXG.createSlider);
JXG.Chart = function (h, l, e) {
    this.constructor(h, e);
    var m, k, f, j, d, g;
    if (!JXG.isArray(l) || l.length === 0) {
        throw new Error("JSXGraph: Can't create a chart without data")
    }
    this.elements = [];
    if (JXG.isNumber(l[0])) {
        k = l;
        m = [];
        for (f = 0; f < k.length; f++) {
            m[f] = f + 1
        }
    } else {
        if (l.length === 1 && JXG.isArray(l[0])) {
            k = l[0];
            m = [];
            g = JXG.evaluate(k).length;
            for (f = 0; f < g; f++) {
                m[f] = f + 1
            }
        } else {
            if (l.length === 2) {
                g = Math.min(l[0].length, l[1].length);
                m = l[0].slice(0, g);
                k = l[1].slice(0, g)
            }
        }
    }
    if (JXG.isArray(k) && k.length === 0) {
        throw new Error("JSXGraph: Can't create charts without data.")
    }
    d = e.chartstyle.replace(/ /g, "").split(",");
    for (f = 0; f < d.length; f++) {
        switch (d[f]) {
            case "bar":
                j = this.drawBar(h, m, k, e);
                break;
            case "line":
                j = this.drawLine(h, m, k, e);
                break;
            case "fit":
                j = this.drawFit(h, m, k, e);
                break;
            case "spline":
                j = this.drawSpline(h, m, k, e);
                break;
            case "pie":
                j = this.drawPie(h, k, e);
                break;
            case "point":
                j = this.drawPoints(h, m, k, e);
                break;
            case "radar":
                j = this.drawRadar(h, l, e);
                break
        }
        this.elements.push(j)
    }
    this.id = this.board.setId(this, "Chart");
    return this.elements
};
JXG.Chart.prototype = new JXG.GeometryElement;
JXG.extend(JXG.Chart.prototype, {
    drawLine: function (f, d, g, e) {
        e.fillcolor = "none";
        e.highlightfillcolor = "none";
        return f.create("curve", [d, g], e)
    },
    drawSpline: function (f, d, g, e) {
        e.fillColor = "none";
        e.highlightfillcolor = "none";
        return f.create("spline", [d, g], e)
    },
    drawFit: function (f, d, h, e) {
        var g = e.degree;
        g = (!JXG.exists(g) || parseInt(g) == NaN || parseInt(g) < 1) ? 1 : parseInt(g), e.fillcolor = "none";
        e.highlightfillcolor = "none";
        return f.create("functiongraph", [JXG.Math.Numerics.regressionPolynomial(g, d, h)], e)
    },
    drawBar: function (e, l, h, f) {
        var u, g = [],
            r, t, d, q, n, o, m, k, v, j, s = [],
            z = {
                fixed: true,
                withLabel: false,
                visible: false,
                name: ""
            };
        if (!JXG.exists(f.fillopacity)) {
            f.fillopacity = 0.6
        }
        if (f && f.width) {
            n = f.width
        } else {
            if (l.length <= 1) {
                n = 1
            } else {
                n = l[1] - l[0];
                for (u = 1; u < l.length - 1; u++) {
                    n = (l[u + 1] - l[u] < n) ? l[u + 1] - l[u] : n
                }
            }
            n *= 0.8
        }
        t = f.fillcolor;
        d = parseFloat(e.options.text.fontSize);
        for (u = 0; u < l.length; u++) {
            if (isNaN(JXG.evaluate(l[u])) || isNaN(h[u])) {}
            if (JXG.isFunction(l[u])) {
                o = function () {
                    return l[u]() - n * 0.5
                };
                m = function () {
                    return l[u]()
                };
                k = function () {
                    return l[u]() + n * 0.5
                }
            } else {
                o = l[u] - n * 0.5;
                m = l[u];
                k = l[u] + n * 0.5
            }
            v = h[u];
            if (f.dir == "horizontal") {
                s[0] = e.create("point", [0, o], z);
                s[1] = e.create("point", [v, o], z);
                s[2] = e.create("point", [v, k], z);
                s[3] = e.create("point", [0, k], z);
                if (JXG.exists(f.labels) && JXG.exists(f.labels[u])) {
                    r = f.labels[u].toString().length;
                    r = 2 * r * d / e.unitX;
                    if (v >= 0) {
                        v += d * 0.5 / e.unitX
                    } else {
                        v -= d * r / e.unitX
                    }
                    m -= d * 0.2 / e.unitY;
                    q = e.create("text", [v, m, f.labels[u]], f)
                }
            } else {
                s[0] = e.create("point", [o, 0], z);
                s[1] = e.create("point", [o, v], z);
                s[2] = e.create("point", [k, v], z);
                s[3] = e.create("point", [k, 0], z);
                if (JXG.exists(f.labels) && JXG.exists(f.labels[u])) {
                    r = f.labels[u].toString().length;
                    r = 0.6 * r * d / e.unitX;
                    if (v >= 0) {
                        v += d * 0.5 / e.unitY
                    } else {
                        v -= d * 1 / e.unitY
                    }
                    q = e.create("text", [m - r * 0.5, v, f.labels[u]], f)
                }
            }
            f.withlines = false;
            if (JXG.exists(f.colors) && JXG.isArray(f.colors)) {
                j = f.colors;
                f.fillcolor = j[u % j.length]
            }
            g[u] = e.create("polygon", s, f);
            if (JXG.exists(f.labels) && JXG.exists(f.labels[u])) {
                g[u].text = q
            }
        }
        return g
    },
    drawPoints: function (j, d, k, f) {
        var g, h = [],
            e = f.infoboxarray;
        f.fixed = true;
        f.name = "";
        for (g = 0; g < d.length; g++) {
            f.infoboxtext = e ? e[g % e.length] : false;
            h[g] = j.create("point", [d[g], k[g]], f)
        }
        return h
    },
    drawPie: function (q, t, k) {
        var l, g = [],
            h = [],
            z = JXG.Math.Statistics.sum(t),
            v = k.colors,
            m = k.highlightcolors,
            f = k.labels,
            e = k.radius || 4,
            n = e,
            u = k.center || [0, 0],
            w = u[0],
            o = u[1],
            d, j = {
                fixed: true,
                withLabel: false,
                visible: false,
                name: ""
            };
        if (!JXG.isArray(f)) {
            f = [];
            for (l = 0; l < t.length; l++) {
                f[l] = ""
            }
        }
        if (!JXG.isFunction(e)) {
            n = function () {
                return e
            }
        }
        k.highlightonsector = k.highlightonsector || false;
        k.straightfirst = false;
        k.straightlast = false;
        d = q.create("point", [w, o], j);
        g[0] = q.create("point", [function () {
            return n() + w
        }, function () {
            return o
        }], j);
        for (l = 0; l < t.length; l++) {
            g[l + 1] = q.create("point", [(function (i) {
                return function () {
                    var B, A = 0,
                        r, p;
                    for (r = 0; r <= i; r++) {
                        A += parseFloat(JXG.evaluate(t[r]))
                    }
                    B = A;
                    for (r = i + 1; r < t.length; r++) {
                        B += parseFloat(JXG.evaluate(t[r]))
                    }
                    p = (B != 0) ? (2 * Math.PI * A / B) : 0;
                    return n() * Math.cos(p) + w
                }
            })(l), (function (i) {
                return function () {
                    var B, A = 0,
                        r, p;
                    for (r = 0; r <= i; r++) {
                        A += parseFloat(JXG.evaluate(t[r]))
                    }
                    B = A;
                    for (r = i + 1; r < t.length; r++) {
                        B += parseFloat(JXG.evaluate(t[r]))
                    }
                    p = (B != 0) ? (2 * Math.PI * A / B) : 0;
                    return n() * Math.sin(p) + o
                }
            })(l)], j);
            k.name = f[l];
            k.withlabel = k.name != "";
            k.fillcolor = v && v[l % v.length];
            k.labelcolor = v && v[l % v.length];
            k.highlightfillcolor = m && m[l % m.length];
            h[l] = q.create("sector", [d, g[l], g[l + 1]], k);
            if (k.highlightonsector) {
                h[l].hasPoint = h[l].hasPointSector
            }
            if (k.highlightbysize) {
                h[l].highlight = function () {
                    if (!this.highlighted) {
                        this.highlighted = true;
                        this.board.renderer.highlight(this);
                        var p = -this.point1.coords.usrCoords[1] + this.point2.coords.usrCoords[1],
                            i = -this.point1.coords.usrCoords[2] + this.point2.coords.usrCoords[2];
                        if (this.label.content != null) {
                            this.label.content.rendNode.style.fontSize = (2 * this.label.content.visProp.fontsize) + "px";
                            this.label.content.prepareUpdate().update().updateRenderer()
                        }
                        this.point2.coords = new JXG.Coords(JXG.COORDS_BY_USER, [this.point1.coords.usrCoords[1] + p * 1.1, this.point1.coords.usrCoords[2] + i * 1.1], this.board);
                        this.prepareUpdate().update().updateRenderer()
                    }
                };
                h[l].noHighlight = function () {
                    if (this.highlighted) {
                        this.highlighted = false;
                        this.board.renderer.noHighlight(this);
                        var p = -this.point1.coords.usrCoords[1] + this.point2.coords.usrCoords[1],
                            i = -this.point1.coords.usrCoords[2] + this.point2.coords.usrCoords[2];
                        if (this.label.content != null) {
                            this.label.content.rendNode.style.fontSize = (this.label.content.visProp.fontsize * 2) + "px";
                            this.label.content.prepareUpdate().update().updateRenderer()
                        }
                        this.point2.coords = new JXG.Coords(JXG.COORDS_BY_USER, [this.point1.coords.usrCoords[1] + p / 1.1, this.point1.coords.usrCoords[2] + i / 1.1], this.board);
                        this.prepareUpdate().update().updateRenderer()
                    }
                }
            }
        }
        return {
            sectors: h,
            points: g,
            midpoint: d
        }
    },
    drawRadar: function (n, R, M) {
        var aa, Y, ab, O, ad, H, D = R.length,
            L, s, f, N, E, A, F, C, g, Z, u, r, v, Q, w, W, S, G, d, m, e, V, l, P, q, U, ag, z, k, o, J, T, af, B, h;
        if (D <= 0) {
            JXG.debug("No data");
            return
        }
        ab = M.paramarray;
        if (!JXG.exists(ab)) {
            JXG.debug("Need paramArray attribute");
            return
        }
        O = ab.length;
        if (O <= 1) {
            JXG.debug("Need more than 1 param");
            return
        }
        for (aa = 0; aa < D; aa++) {
            if (O != R[aa].length) {
                JXG.debug("Use data length equal to number of params (" + R[aa].length + " != " + O + ")");
                return
            }
        }
        ad = new Array(O);
        H = new Array(O);
        for (Y = 0; Y < O; Y++) {
            ad[Y] = R[0][Y];
            H[Y] = ad[Y]
        }
        for (aa = 1; aa < D; aa++) {
            for (Y = 0; Y < O; Y++) {
                if (R[aa][Y] > ad[Y]) {
                    ad[Y] = R[aa][Y]
                }
                if (R[aa][Y] < H[Y]) {
                    H[Y] = R[aa][Y]
                }
            }
        }
        L = new Array(D);
        s = new Array(D);
        for (aa = 0; aa < D; aa++) {
            L[aa] = "";
            s[aa] = []
        }
        f = new Array(O);
        N = new Array(O);
        E = M.startshiftratio || 0;
        A = M.endshiftratio || 0;
        for (aa = 0; aa < O; aa++) {
            f[aa] = (ad[aa] - H[aa]) * E;
            N[aa] = (ad[aa] - H[aa]) * A
        }
        F = M.startshiftarray || f;
        C = M.endshiftarray || N;
        g = M.startarray || H;
        if (JXG.exists(M.start)) {
            for (aa = 0; aa < O; aa++) {
                g[aa] = M.start
            }
        }
        Z = M.endarray || ad;
        if (JXG.exists(M.end)) {
            for (aa = 0; aa < O; aa++) {
                Z[aa] = M.end
            }
        }
        if (F.length != O) {
            JXG.debug("Start shifts length is not equal to number of parameters");
            return
        }
        if (C.length != O) {
            JXG.debug("End shifts length is not equal to number of parameters");
            return
        }
        if (g.length != O) {
            JXG.debug("Starts length is not equal to number of parameters");
            return
        }
        if (Z.length != O) {
            JXG.debug("Ends length is not equal to number of parameters");
            return
        }
        u = M.labelarray || L;
        r = M.colors;
        v = M.highlightcolors;
        Q = M.radius || 10;
        w = {};
        if (!JXG.exists(M.highlightonsector)) {
            M.highlightonsector = false
        }
        w.name = M.name;
        w.id = M.id;
        w.strokewidth = M.strokewidth || 1;
        w.polystrokewidth = M.polystrokewidth || 2 * w.strokewidth;
        w.strokecolor = M.strokecolor || "black";
        w.straightfirst = false;
        w.straightlast = false;
        w.fillcolor = M.fillColor || "#FFFF88";
        w.fillopacity = M.fillOpacity || 0.4;
        w.highlightfillcolor = M.highlightFillColor || "#FF7400";
        w.highlightstrokecolor = M.highlightStrokeColor || "black";
        w.gradient = M.gradient || "none";
        W = M.center || [0, 0];
        S = W[0];
        G = W[1];
        d = n.create("point", [S, G], {
            name: "",
            fixed: true,
            withlabel: false,
            visible: false
        });
        m = Math.PI / 2 - Math.PI / O;
        if (M.startangle || M.startangle === 0) {
            m = M.startangle
        }
        e = m;
        V = [];
        l = [];
        var X = function () {
            var j, i, t, p, ah = this.visProp.label.offset.slice(0);
            j = this.point1.X();
            i = this.point2.X();
            t = this.point1.Y();
            p = this.point2.Y();
            if (i < j) {
                ah[0] = -ah[0]
            }
            if (p < t) {
                ah[1] = -ah[1]
            }
            this.setLabelRelativeCoords(ah);
            return new JXG.Coords(JXG.COORDS_BY_USER, [this.point2.X(), this.point2.Y()], this.board)
        };
        var K = function (aj, p) {
            var j;
            var ai;
            var ah;
            j = n.create("transform", [-(g[p] - F[p]), 0], {
                type: "translate"
            });
            ai = n.create("transform", [Q / ((Z[p] + C[p]) - (g[p] - F[p])), 1], {
                type: "scale"
            });
            j.melt(ai);
            ah = n.create("transform", [aj], {
                type: "rotate"
            });
            j.melt(ah);
            return j
        };
        for (aa = 0; aa < O; aa++) {
            e += 2 * Math.PI / O;
            q = Q * Math.cos(e) + S;
            U = Q * Math.sin(e) + G;
            V[aa] = n.create("point", [q, U], {
                name: "",
                fixed: true,
                withlabel: false,
                visible: false
            });
            l[aa] = n.create("line", [d, V[aa]], {
                name: ab[aa],
                strokeColor: w.strokecolor,
                strokeWidth: w.strokewidth,
                strokeOpacity: 1,
                straightFirst: false,
                straightLast: false,
                withLabel: true,
                highlightStrokeColor: w.highlightstrokecolor
            });
            l[aa].getLabelAnchor = X;
            P = K(e, aa);
            for (Y = 0; Y < R.length; Y++) {
                var ae = R[Y][aa];
                s[Y][aa] = n.create("point", [ae, 0], {
                    name: "",
                    fixed: true,
                    withlabel: false,
                    visible: false
                });
                s[Y][aa].addTransform(s[Y][aa], P)
            }
        }
        ag = new Array(D);
        for (aa = 0; aa < D; aa++) {
            w.labelcolor = r && r[aa % r.length];
            w.strokecolor = r && r[aa % r.length];
            w.fillcolor = r && r[aa % r.length];
            ag[aa] = n.create("polygon", s[aa], {
                withLines: true,
                withLabel: false,
                fillColor: w.fillcolor,
                fillOpacity: w.fillopacity,
                highlightFillColor: w.highlightfillcolor
            });
            for (Y = 0; Y < O; Y++) {
                ag[aa].borders[Y].setProperty("strokecolor:" + r[aa % r.length]);
                ag[aa].borders[Y].setProperty("strokewidth:" + w.polystrokewidth)
            }
        }
        z = M.legendposition || "none";
        switch (z) {
            case "right":
                var I = M.legendleftoffset || 2;
                var ac = M.legendtopoffset || 1;
                this.legend = n.create("legend", [S + Q + I, G + Q - ac], {
                    labelArray: u,
                    colorArray: r
                });
                break;
            case "none":
                break;
            default:
                JXG.debug("Unknown legend position")
        }
        k = [];
        if (M.showcircles != false) {
            o = [];
            for (aa = 0; aa < 6; aa++) {
                o[aa] = 20 * aa
            }
            o[0] = "0";
            J = M.circlelabelarray || o;
            T = J.length;
            if (T < 2) {
                alert("Too less circles");
                return
            }
            af = [];
            B = m + Math.PI / O;
            P = K(B, 0);
            w.fillcolor = "none";
            w.highlightfillcolor = "none";
            w.strokecolor = M.strokecolor || "black";
            w.strokewidth = M.circlestrokewidth || 0.5;
            w.layer = 0;
            h = (Z[0] - g[0]) / (T - 1);
            for (aa = 0; aa < T; aa++) {
                af[aa] = n.create("point", [g[0] + aa * h, 0], {
                    name: J[aa],
                    size: 0,
                    fixed: true,
                    withLabel: true,
                    visible: true
                });
                af[aa].addTransform(af[aa], P);
                k[aa] = n.create("circle", [d, af[aa]], w)
            }
        }
        this.rendNode = ag[0].rendNode;
        return {
            circles: k,
            lines: l,
            points: s,
            midpoint: d,
            polygons: ag
        }
    },
    updateRenderer: function () {
        return this
    },
    update: function () {
        if (this.needsUpdate) {
            this.updateDataArray()
        }
        return this
    },
    updateDataArray: function () {}
});
JXG.createChart = function (g, u, h) {
    if ((u.length == 1) && (typeof u[0] == "string")) {
        var t = document.getElementById(u[0]),
            B, f, q, p, e, s = [],
            l, k, A, z, C, n, d, o, v, r, m;
        if (JXG.exists(t)) {
            m = JXG.copyAttributes(h, g.options, "chart");
            t = (new JXG.DataSource()).loadFromTable(u[0], m.withheaders, m.withheaders);
            B = t.data;
            e = t.columnHeaders;
            f = t.rowHeaders;
            z = m.width;
            C = m.name;
            n = m.strokecolor;
            d = m.fillcolor;
            o = m.highlightstrokecolor;
            v = m.highlightfillcolor;
            g.suspendUpdate();
            r = B.length;
            A = [];
            if (m.rows && JXG.isArray(m.rows)) {
                for (q = 0; q < r; q++) {
                    for (p = 0; p < m.rows.length; p++) {
                        if ((m.rows[p] == q) || (m.withheaders && m.rows[p] == f[q])) {
                            A.push(B[q]);
                            break
                        }
                    }
                }
            } else {
                A = B
            }
            r = A.length;
            for (q = 0; q < r; q++) {
                k = [];
                if (m.chartstyle && m.chartstyle.indexOf("bar") != -1) {
                    if (z) {
                        l = z
                    } else {
                        l = 0.8
                    }
                    k.push(1 - l / 2 + (q + 0.5) * l / (1 * r));
                    for (p = 1; p < A[q].length; p++) {
                        k.push(k[p - 1] + 1)
                    }
                    m.width = l / (1 * r)
                }
                if (C && C.length == r) {
                    m.name = C[q]
                } else {
                    if (m.withheaders) {
                        m.name = e[q]
                    }
                }
                if (n && n.length == r) {
                    m.strokecolor = n[q]
                } else {
                    m.strokecolor = JXG.hsv2rgb(((q + 1) / (1 * r)) * 360, 0.9, 0.6)
                }
                if (d && d.length == r) {
                    m.fillcolor = d[q]
                } else {
                    m.fillcolor = JXG.hsv2rgb(((q + 1) / (1 * r)) * 360, 0.9, 1)
                }
                if (o && o.length == r) {
                    m.highlightstrokecolor = o[q]
                } else {
                    m.highlightstrokecolor = JXG.hsv2rgb(((q + 1) / (1 * r)) * 360, 0.9, 1)
                }
                if (v && v.length == r) {
                    m.highlightfillcolor = v[q]
                } else {
                    m.highlightfillcolor = JXG.hsv2rgb(((q + 1) / (1 * r)) * 360, 0.9, 0.6)
                }
                if (m.chartstyle && m.chartstyle.indexOf("bar") != -1) {
                    s.push(new JXG.Chart(g, [k, A[q]], m))
                } else {
                    s.push(new JXG.Chart(g, [A[q]], m))
                }
            }
            g.unsuspendUpdate()
        }
        return s
    } else {
        m = JXG.copyAttributes(h, g.options, "chart");
        return new JXG.Chart(g, u, m)
    }
};
JXG.JSXGraph.registerElement("chart", JXG.createChart);
JXG.Legend = function (f, g, e) {
    var d;
    this.constructor();
    d = JXG.copyAttributes(e, f.options, "legend");
    this.board = f;
    this.coords = new JXG.Coords(JXG.COORDS_BY_USER, g, this.board);
    this.myAtts = {};
    this.label_array = d.labelarray || d.labels;
    this.color_array = d.colorarray || d.colors;
    this.lines = [];
    this.myAtts.strokewidth = d.strokewidth || 5;
    this.myAtts.straightfirst = false;
    this.myAtts.straightlast = false;
    this.myAtts.withlabel = true;
    this.myAtts.fixed = true;
    this.style = d.legendstyle || d.style;
    switch (this.style) {
        case "vertical":
            this.drawVerticalLegend(f, d);
            break;
        default:
            throw new Error("JSXGraph: Unknown legend style: " + this.style);
            break
    }
};
JXG.Legend.prototype = new JXG.GeometryElement;
JXG.Legend.prototype.drawVerticalLegend = function (h, f) {
    var e = f.linelength || 1,
        d = (f.rowheight || 20) / this.board.unitY,
        g;
    for (g = 0; g < this.label_array.length; g++) {
        this.myAtts.strokecolor = this.color_array[g];
        this.myAtts.highlightstrokecolor = this.color_array[g];
        this.myAtts.name = this.label_array[g];
        this.myAtts.label = {
            offset: [40, 0],
            strokeColor: this.color_array[g],
            strokeWidth: this.myAtts.strokewidth
        };
        this.lines[g] = h.create("line", [
            [this.coords.usrCoords[1], this.coords.usrCoords[2] - g * d],
            [this.coords.usrCoords[1] + e, this.coords.usrCoords[2] - g * d]
        ], this.myAtts);
        this.lines[g].getLabelAnchor = function () {
            this.setLabelRelativeCoords(this.visProp.label.offset);
            return new JXG.Coords(JXG.COORDS_BY_USER, [this.point2.X(), this.point2.Y()], this.board)
        }
    }
};
JXG.createLegend = function (f, e, d) {
    var g = [0, 0];
    if (JXG.exists(e)) {
        if (e.length == 2) {
            g = e
        }
    }
    return new JXG.Legend(f, g, d)
};
JXG.JSXGraph.registerElement("legend", JXG.createLegend);
JXG.Transformation = function (e, d, f) {
    this.elementClass = JXG.OBJECT_CLASS_OTHER;
    this.matrix = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ];
    this.board = e;
    this.isNumericMatrix = false;
    this.setMatrix(e, d, f)
};
JXG.Transformation.prototype = {};
JXG.extend(JXG.Transformation.prototype, {
    update: function () {
        return this
    },
    setMatrix: function (f, e, g) {
        var d;
        this.isNumericMatrix = true;
        for (d = 0; d < g.length; d++) {
            if (typeof g[d] != "number") {
                this.isNumericMatrix = false;
                break
            }
        }
        if (e == "translate") {
            this.evalParam = JXG.createEvalFunction(f, g, 2);
            this.update = function () {
                this.matrix[1][0] = this.evalParam(0);
                this.matrix[2][0] = this.evalParam(1)
            }
        } else {
            if (e == "scale") {
                this.evalParam = JXG.createEvalFunction(f, g, 2);
                this.update = function () {
                    this.matrix[1][1] = this.evalParam(0);
                    this.matrix[2][2] = this.evalParam(1)
                }
            } else {
                if (e == "reflect") {
                    if (g.length < 4) {
                        g[0] = JXG.getReference(f, g[0])
                    }
                    if (g.length == 2) {
                        g[1] = JXG.getReference(f, g[1])
                    }
                    if (g.length == 4) {
                        this.evalParam = JXG.createEvalFunction(f, g, 4)
                    }
                    this.update = function () {
                        var h, o, n, i, m, l, j, k;
                        if (g.length == 1) {
                            j = g[0].stdform
                        } else {
                            if (g.length == 2) {
                                j = JXG.Math.crossProduct(g[1].coords.usrCoords, g[0].coords.usrCoords)
                            } else {
                                if (g.length == 4) {
                                    j = JXG.Math.crossProduct([1, this.evalParam(2), this.evalParam(3)], [1, this.evalParam(0), this.evalParam(1)])
                                }
                            }
                        }
                        h = j[1];
                        o = j[2];
                        n = j[0];
                        k = [-n * h, - n * o, h * h + o * o];
                        l = k[2];
                        i = k[0] / k[2];
                        m = k[1] / k[2];
                        h = -j[2];
                        o = j[1];
                        this.matrix[1][1] = (h * h - o * o) / l;
                        this.matrix[1][2] = 2 * h * o / l;
                        this.matrix[2][1] = this.matrix[1][2];
                        this.matrix[2][2] = -this.matrix[1][1];
                        this.matrix[1][0] = i * (1 - this.matrix[1][1]) - m * this.matrix[1][2];
                        this.matrix[2][0] = m * (1 - this.matrix[2][2]) - i * this.matrix[2][1]
                    }
                } else {
                    if (e == "rotate") {
                        if (g.length == 3) {
                            this.evalParam = JXG.createEvalFunction(f, g, 3)
                        } else {
                            if (g.length <= 2) {
                                this.evalParam = JXG.createEvalFunction(f, g, 1);
                                if (g.length == 2) {
                                    g[1] = JXG.getReference(f, g[1])
                                }
                            }
                        }
                        this.update = function () {
                            var j = this.evalParam(0),
                                h, l, k = Math.cos(j),
                                i = Math.sin(j);
                            this.matrix[1][1] = k;
                            this.matrix[1][2] = -i;
                            this.matrix[2][1] = i;
                            this.matrix[2][2] = k;
                            if (g.length > 1) {
                                if (g.length == 3) {
                                    h = this.evalParam(1);
                                    l = this.evalParam(2)
                                } else {
                                    h = g[1].X();
                                    l = g[1].Y()
                                }
                                this.matrix[1][0] = h * (1 - k) + l * i;
                                this.matrix[2][0] = l * (1 - k) - h * i
                            }
                        }
                    } else {
                        if (e == "shear") {
                            this.evalParam = JXG.createEvalFunction(f, g, 1);
                            this.update = function () {
                                var h = this.evalParam(0);
                                this.matrix[1][1] = Math.tan(h)
                            }
                        } else {
                            if (e == "generic") {
                                this.evalParam = JXG.createEvalFunction(f, g, 9);
                                this.update = function () {
                                    this.matrix[0][0] = this.evalParam(0);
                                    this.matrix[0][1] = this.evalParam(1);
                                    this.matrix[0][2] = this.evalParam(2);
                                    this.matrix[1][0] = this.evalParam(3);
                                    this.matrix[1][1] = this.evalParam(4);
                                    this.matrix[1][2] = this.evalParam(5);
                                    this.matrix[2][0] = this.evalParam(6);
                                    this.matrix[2][1] = this.evalParam(7);
                                    this.matrix[2][2] = this.evalParam(8)
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    apply: function (d) {
        this.update();
        if (arguments[1] != null) {
            return JXG.Math.matVecMult(this.matrix, d.initialCoords.usrCoords)
        } else {
            return JXG.Math.matVecMult(this.matrix, d.coords.usrCoords)
        }
    },
    applyOnce: function (f) {
        var g, d, e;
        if (!JXG.isArray(f)) {
            this.update();
            g = JXG.Math.matVecMult(this.matrix, f.coords.usrCoords);
            f.coords.setCoordinates(JXG.COORDS_BY_USER, g)
        } else {
            d = f.length;
            for (e = 0; e < d; e++) {
                this.update();
                g = JXG.Math.matVecMult(this.matrix, f[e].coords.usrCoords);
                f[e].coords.setCoordinates(JXG.COORDS_BY_USER, g)
            }
        }
    },
    bindTo: function (f) {
        var e, d;
        if (JXG.isArray(f)) {
            d = f.length;
            for (e = 0; e < d; e++) {
                f[e].transformations.push(this)
            }
        } else {
            f.transformations.push(this)
        }
    },
    setProperty: function (d) {},
    melt: function (m) {
        var l = [],
            h, d, g, e, n, f;
        d = m.matrix.length;
        g = this.matrix[0].length;
        for (h = 0; h < d; h++) {
            l[h] = []
        }
        this.update();
        m.update();
        for (h = 0; h < d; h++) {
            for (f = 0; f < g; f++) {
                n = 0;
                for (e = 0; e < d; e++) {
                    n += m.matrix[h][e] * this.matrix[e][f]
                }
                l[h][f] = n
            }
        }
        this.update = function () {
            var i = this.matrix.length,
                j = this.matrix[0].length;
            for (h = 0; h < i; h++) {
                for (f = 0; f < j; f++) {
                    this.matrix[h][f] = l[h][f]
                }
            }
        };
        return this
    }
});
JXG.createTransform = function (f, e, d) {
    return new JXG.Transformation(f, d.type, e)
};
JXG.JSXGraph.registerElement("transform", JXG.createTransform);
JXG.Turtle = function (h, g, e) {
    this.constructor(h, e, JXG.OBJECT_TYPE_TURTLE, JXG.OBJECT_CLASS_OTHER);
    var d, i, f;
    this.turtleIsHidden = false;
    this.board = h;
    this.visProp.curveType = "plot";
    this._attributes = JXG.copyAttributes(this.visProp, h.options, "turtle");
    delete(this._attributes.id);
    d = 0;
    i = 0;
    f = 90;
    if (g.length != 0) {
        if (g.length == 3) {
            d = g[0];
            i = g[1];
            f = g[2]
        } else {
            if (g.length == 2) {
                if (JXG.isArray(g[0])) {
                    d = g[0][0];
                    i = g[0][1];
                    f = g[1]
                } else {
                    d = g[0];
                    i = g[1]
                }
            } else {
                d = g[0][0];
                i = g[0][1]
            }
        }
    }
    this.init(d, i, f);
    return this
};
JXG.Turtle.prototype = new JXG.GeometryElement;
JXG.extend(JXG.Turtle.prototype, {
    init: function (d, f, e) {
        this.arrowLen = 20 / Math.sqrt(this.board.unitX * this.board.unitX + this.board.unitY * this.board.unitY);
        this.pos = [d, f];
        this.isPenDown = true;
        this.dir = 90;
        this.stack = [];
        this.objects = [];
        this.curve = this.board.create("curve", [
            [this.pos[0]],
            [this.pos[1]]
        ], this._attributes);
        this.objects.push(this.curve);
        this.turtle = this.board.create("point", this.pos, {
            fixed: true,
            name: " ",
            visible: false,
            withLabel: false
        });
        this.objects.push(this.turtle);
        this.turtle2 = this.board.create("point", [this.pos[0], this.pos[1] + this.arrowLen], {
            fixed: true,
            name: " ",
            visible: false,
            withLabel: false
        });
        this.objects.push(this.turtle2);
        this.visProp.arrow.lastArrow = true;
        this.visProp.arrow.straightFirst = false;
        this.visProp.arrow.straightLast = false;
        this.arrow = this.board.create("line", [this.turtle, this.turtle2], this.visProp.arrow);
        this.objects.push(this.arrow);
        this.right(90 - e);
        this.board.update()
    },
    forward: function (d) {
        if (d === 0) {
            return this
        }
        var f = d * Math.cos(this.dir * Math.PI / 180),
            e = d * Math.sin(this.dir * Math.PI / 180);
        if (!this.turtleIsHidden) {
            var g = this.board.create("transform", [f, e], {
                type: "translate"
            });
            g.applyOnce(this.turtle);
            g.applyOnce(this.turtle2)
        }
        if (this.isPenDown) {
            if (this.curve.dataX.length >= 8192) {
                this.curve = this.board.create("curve", [
                    [this.pos[0]],
                    [this.pos[1]]
                ], this._attributes);
                this.objects.push(this.curve)
            }
        }
        this.pos[0] += f;
        this.pos[1] += e;
        if (this.isPenDown) {
            this.curve.dataX.push(this.pos[0]);
            this.curve.dataY.push(this.pos[1])
        }
        this.board.update();
        return this
    },
    back: function (d) {
        return this.forward(-d)
    },
    right: function (e) {
        this.dir -= e;
        this.dir %= 360;
        if (!this.turtleIsHidden) {
            var d = this.board.create("transform", [-e * Math.PI / 180, this.turtle], {
                type: "rotate"
            });
            d.applyOnce(this.turtle2)
        }
        this.board.update();
        return this
    },
    left: function (d) {
        return this.right(-d)
    },
    penUp: function () {
        this.isPenDown = false;
        return this
    },
    penDown: function () {
        this.isPenDown = true;
        this.curve = this.board.create("curve", [
            [this.pos[0]],
            [this.pos[1]]
        ], this._attributes);
        this.objects.push(this.curve);
        return this
    },
    clean: function () {
        for (var d = 0; d < this.objects.length; d++) {
            var e = this.objects[d];
            if (e.type == JXG.OBJECT_TYPE_CURVE) {
                this.board.removeObject(e.id);
                this.objects.splice(d, 1)
            }
        }
        this.curve = this.board.create("curve", [
            [this.pos[0]],
            [this.pos[1]]
        ], this._attributes);
        this.objects.push(this.curve);
        this.board.update();
        return this
    },
    clearScreen: function () {
        for (var d = 0; d < this.objects.length; d++) {
            var e = this.objects[d];
            this.board.removeObject(e.id)
        }
        this.init(0, 0, 90);
        return this
    },
    setPos: function (d, f) {
        if (JXG.isArray(d)) {
            this.pos = d
        } else {
            this.pos = [d, f]
        }
        if (!this.turtleIsHidden) {
            this.turtle.setPositionDirectly(JXG.COORDS_BY_USER, [d, f]);
            this.turtle2.setPositionDirectly(JXG.COORDS_BY_USER, [d, f + this.arrowLen]);
            var e = this.board.create("transform", [-(this.dir - 90) * Math.PI / 180, this.turtle], {
                type: "rotate"
            });
            e.applyOnce(this.turtle2)
        }
        this.curve = this.board.create("curve", [
            [this.pos[0]],
            [this.pos[1]]
        ], this._attributes);
        this.objects.push(this.curve);
        this.board.update();
        return this
    },
    setPenSize: function (d) {
        this.curve = this.board.create("curve", [
            [this.pos[0]],
            [this.pos[1]]
        ], this.copyAttr("strokeWidth", d));
        this.objects.push(this.curve);
        return this
    },
    setPenColor: function (d) {
        this.curve = this.board.create("curve", [
            [this.pos[0]],
            [this.pos[1]]
        ], this.copyAttr("strokeColor", d));
        this.objects.push(this.curve);
        return this
    },
    setHighlightPenColor: function (d) {
        this.curve = this.board.create("curve", [
            [this.pos[0]],
            [this.pos[1]]
        ], this.copyAttr("highlightStrokeColor", d));
        this.objects.push(this.curve);
        return this
    },
    setProperty: function (e) {
        var g, h, d = this.objects.length,
            f;
        for (g = 0; g < d; g++) {
            h = this.objects[g];
            if (h.type == JXG.OBJECT_TYPE_CURVE) {
                h.setProperty(e)
            }
        }
        f = this.visProp.id;
        this.visProp = JXG.deepCopy(this.curve.visProp);
        this.visProp.id = f;
        this._attributes = JXG.deepCopy(this.visProp);
        delete(this._attributes.id);
        return this
    },
    copyAttr: function (d, e) {
        this._attributes[d.toLowerCase()] = e;
        return this._attributes
    },
    showTurtle: function () {
        this.turtleIsHidden = false;
        this.arrow.setProperty("visible:true");
        this.setPos(this.pos[0], this.pos[1]);
        this.board.update();
        return this
    },
    hideTurtle: function () {
        this.turtleIsHidden = true;
        this.arrow.setProperty("visible:false");
        this.setPos(this.pos[0], this.pos[1]);
        this.board.update();
        return this
    },
    home: function () {
        this.pos = [0, 0];
        this.setPos(this.pos[0], this.pos[1]);
        return this
    },
    pushTurtle: function () {
        this.stack.push([this.pos[0], this.pos[1], this.dir]);
        return this
    },
    popTurtle: function () {
        var d = this.stack.pop();
        this.pos[0] = d[0];
        this.pos[1] = d[1];
        this.dir = d[2];
        this.setPos(this.pos[0], this.pos[1]);
        return this
    },
    lookTo: function (h) {
        if (JXG.isArray(h)) {
            var e = this.pos[0];
            var d = this.pos[1];
            var i = h[0];
            var g = h[1];
            var f;
            f = Math.atan2(g - d, i - e);
            this.right(this.dir - (f * 180 / Math.PI))
        } else {
            if (JXG.isNumber(h)) {
                this.right(this.dir - (h))
            }
        }
        return this
    },
    moveTo: function (g) {
        if (JXG.isArray(g)) {
            var e = g[0] - this.pos[0];
            var d = g[1] - this.pos[1];
            if (!this.turtleIsHidden) {
                var f = this.board.create("transform", [e, d], {
                    type: "translate"
                });
                f.applyOnce(this.turtle);
                f.applyOnce(this.turtle2)
            }
            if (this.isPenDown) {
                if (this.curve.dataX.length >= 8192) {
                    this.curve = this.board.create("curve", [
                        [this.pos[0]],
                        [this.pos[1]]
                    ], this._attributes);
                    this.objects.push(this.curve)
                }
            }
            this.pos[0] = g[0];
            this.pos[1] = g[1];
            if (this.isPenDown) {
                this.curve.dataX.push(this.pos[0]);
                this.curve.dataY.push(this.pos[1])
            }
            this.board.update()
        }
        return this
    },
    fd: function (d) {
        return this.forward(d)
    },
    bk: function (d) {
        return this.back(d)
    },
    lt: function (d) {
        return this.left(d)
    },
    rt: function (d) {
        return this.right(d)
    },
    pu: function () {
        return this.penUp()
    },
    pd: function () {
        return this.penDown()
    },
    ht: function () {
        return this.hideTurtle()
    },
    st: function () {
        return this.showTurtle()
    },
    cs: function () {
        return this.clearScreen()
    },
    push: function () {
        return this.pushTurtle()
    },
    pop: function () {
        return this.popTurtle()
    },
    evalAt: function (h, l) {
        var g, f, k, e, d = this.objects.length;
        for (g = 0, f = 0; g < d; g++) {
            k = this.objects[g];
            if (k.elementClass == JXG.OBJECT_CLASS_CURVE) {
                if (f <= h && h < f + k.numberPoints) {
                    e = (h - f);
                    return k[l](e)
                }
                f += k.numberPoints
            }
        }
        return this[l]()
    },
    X: function (d) {
        if (typeof d == "undefined") {
            return this.pos[0]
        } else {
            return this.evalAt(d, "X")
        }
    },
    Y: function (d) {
        if (typeof d == "undefined") {
            return this.pos[1]
        } else {
            return this.evalAt(d, "Y")
        }
    },
    Z: function (d) {
        return 1
    },
    minX: function () {
        return 0
    },
    maxX: function () {
        var g = 0,
            e, d = this.objects.length,
            f;
        for (e = 0; e < d; e++) {
            f = this.objects[e];
            if (f.elementClass == JXG.OBJECT_CLASS_CURVE) {
                g += this.objects[e].numberPoints
            }
        }
        return g
    },
    hasPoint: function (d, g) {
        var e, f;
        for (e = 0; e < this.objects.length; e++) {
            f = this.objects[e];
            if (f.type == JXG.OBJECT_TYPE_CURVE) {
                if (f.hasPoint(d, g)) {
                    return true
                }
            }
        }
        return false
    }
});
JXG.createTurtle = function (g, f, e) {
    var d;
    f = f || [];
    d = JXG.copyAttributes(e, g.options, "turtle");
    return new JXG.Turtle(g, f, d)
};
JXG.JSXGraph.registerElement("turtle", JXG.createTurtle);
JXG.rgbParser = function () {
    var n, e = false,
        j, d, l, o;
    if (arguments.length === 0) {
        return []
    }
    if (arguments.length >= 3) {
        arguments[0] = [arguments[0], arguments[1], arguments[2]];
        arguments.length = 1
    }
    n = arguments[0];
    if (JXG.isArray(n)) {
        for (j = 0; j < 3; j++) {
            e |= /\./.test(arguments[0][j].toString())
        }
        for (j = 0; j < 3; j++) {
            e &= (arguments[0][j] >= 0) & (arguments[0][j] <= 1)
        }
        if (e) {
            return [Math.ceil(arguments[0][0] * 255), Math.ceil(arguments[0][1] * 255), Math.ceil(arguments[0][2] * 255)]
        } else {
            arguments[0].length = 3;
            return arguments[0]
        }
    } else {
        if (typeof arguments[0] === "string") {
            n = arguments[0]
        }
    }
    if (n.charAt(0) == "#") {
        n = n.substr(1, 6)
    }
    n = n.replace(/ /g, "").toLowerCase();
    var h = {
        aliceblue: "f0f8ff",
        antiquewhite: "faebd7",
        aqua: "00ffff",
        aquamarine: "7fffd4",
        azure: "f0ffff",
        beige: "f5f5dc",
        bisque: "ffe4c4",
        black: "000000",
        blanchedalmond: "ffebcd",
        blue: "0000ff",
        blueviolet: "8a2be2",
        brown: "a52a2a",
        burlywood: "deb887",
        cadetblue: "5f9ea0",
        chartreuse: "7fff00",
        chocolate: "d2691e",
        coral: "ff7f50",
        cornflowerblue: "6495ed",
        cornsilk: "fff8dc",
        crimson: "dc143c",
        cyan: "00ffff",
        darkblue: "00008b",
        darkcyan: "008b8b",
        darkgoldenrod: "b8860b",
        darkgray: "a9a9a9",
        darkgreen: "006400",
        darkkhaki: "bdb76b",
        darkmagenta: "8b008b",
        darkolivegreen: "556b2f",
        darkorange: "ff8c00",
        darkorchid: "9932cc",
        darkred: "8b0000",
        darksalmon: "e9967a",
        darkseagreen: "8fbc8f",
        darkslateblue: "483d8b",
        darkslategray: "2f4f4f",
        darkturquoise: "00ced1",
        darkviolet: "9400d3",
        deeppink: "ff1493",
        deepskyblue: "00bfff",
        dimgray: "696969",
        dodgerblue: "1e90ff",
        feldspar: "d19275",
        firebrick: "b22222",
        floralwhite: "fffaf0",
        forestgreen: "228b22",
        fuchsia: "ff00ff",
        gainsboro: "dcdcdc",
        ghostwhite: "f8f8ff",
        gold: "ffd700",
        goldenrod: "daa520",
        gray: "808080",
        green: "008000",
        greenyellow: "adff2f",
        honeydew: "f0fff0",
        hotpink: "ff69b4",
        indianred: "cd5c5c",
        indigo: "4b0082",
        ivory: "fffff0",
        khaki: "f0e68c",
        lavender: "e6e6fa",
        lavenderblush: "fff0f5",
        lawngreen: "7cfc00",
        lemonchiffon: "fffacd",
        lightblue: "add8e6",
        lightcoral: "f08080",
        lightcyan: "e0ffff",
        lightgoldenrodyellow: "fafad2",
        lightgrey: "d3d3d3",
        lightgreen: "90ee90",
        lightpink: "ffb6c1",
        lightsalmon: "ffa07a",
        lightseagreen: "20b2aa",
        lightskyblue: "87cefa",
        lightslateblue: "8470ff",
        lightslategray: "778899",
        lightsteelblue: "b0c4de",
        lightyellow: "ffffe0",
        lime: "00ff00",
        limegreen: "32cd32",
        linen: "faf0e6",
        magenta: "ff00ff",
        maroon: "800000",
        mediumaquamarine: "66cdaa",
        mediumblue: "0000cd",
        mediumorchid: "ba55d3",
        mediumpurple: "9370d8",
        mediumseagreen: "3cb371",
        mediumslateblue: "7b68ee",
        mediumspringgreen: "00fa9a",
        mediumturquoise: "48d1cc",
        mediumvioletred: "c71585",
        midnightblue: "191970",
        mintcream: "f5fffa",
        mistyrose: "ffe4e1",
        moccasin: "ffe4b5",
        navajowhite: "ffdead",
        navy: "000080",
        oldlace: "fdf5e6",
        olive: "808000",
        olivedrab: "6b8e23",
        orange: "ffa500",
        orangered: "ff4500",
        orchid: "da70d6",
        palegoldenrod: "eee8aa",
        palegreen: "98fb98",
        paleturquoise: "afeeee",
        palevioletred: "d87093",
        papayawhip: "ffefd5",
        peachpuff: "ffdab9",
        peru: "cd853f",
        pink: "ffc0cb",
        plum: "dda0dd",
        powderblue: "b0e0e6",
        purple: "800080",
        red: "ff0000",
        rosybrown: "bc8f8f",
        royalblue: "4169e1",
        saddlebrown: "8b4513",
        salmon: "fa8072",
        sandybrown: "f4a460",
        seagreen: "2e8b57",
        seashell: "fff5ee",
        sienna: "a0522d",
        silver: "c0c0c0",
        skyblue: "87ceeb",
        slateblue: "6a5acd",
        slategray: "708090",
        snow: "fffafa",
        springgreen: "00ff7f",
        steelblue: "4682b4",
        tan: "d2b48c",
        teal: "008080",
        thistle: "d8bfd8",
        tomato: "ff6347",
        turquoise: "40e0d0",
        violet: "ee82ee",
        violetred: "d02090",
        wheat: "f5deb3",
        white: "ffffff",
        whitesmoke: "f5f5f5",
        yellow: "ffff00",
        yellowgreen: "9acd32"
    };
    n = h[n] || n;
    var m = [{
        re: /^\s*rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([\d\.]{1,3})\s*\)\s*$/,
        example: ["rgba(123, 234, 45, 0.5)", "rgba(255,234,245,1.0)"],
        process: function (g) {
            return [parseInt(g[1]), parseInt(g[2]), parseInt(g[3])]
        }
    }, {
        re: /^\s*rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)\s*$/,
        example: ["rgb(123, 234, 45)", "rgb(255,234,245)"],
        process: function (g) {
            return [parseInt(g[1]), parseInt(g[2]), parseInt(g[3])]
        }
    }, {
        re: /^(\w{2})(\w{2})(\w{2})$/,
        example: ["#00ff00", "336699"],
        process: function (g) {
            return [parseInt(g[1], 16), parseInt(g[2], 16), parseInt(g[3], 16)]
        }
    }, {
        re: /^(\w{1})(\w{1})(\w{1})$/,
        example: ["#fb0", "f0f"],
        process: function (g) {
            return [parseInt(g[1] + g[1], 16), parseInt(g[2] + g[2], 16), parseInt(g[3] + g[3], 16)]
        }
    }];
    for (j = 0; j < m.length; j++) {
        var q = m[j].re,
            f = m[j].process,
            p = q.exec(n),
            k;
        if (p) {
            k = f(p);
            d = k[0];
            l = k[1];
            o = k[2]
        }
    }
    if (isNaN(d) || isNaN(l) || isNaN(o)) {
        return []
    }
    d = (d < 0 || isNaN(d)) ? 0 : ((d > 255) ? 255 : d);
    l = (l < 0 || isNaN(l)) ? 0 : ((l > 255) ? 255 : l);
    o = (o < 0 || isNaN(o)) ? 0 : ((o > 255) ? 255 : o);
    return [d, l, o]
};
JXG.rgb2css = function () {
    var f, e, d;
    f = JXG.rgbParser.apply(JXG.rgbParser, arguments);
    e = f[1];
    d = f[2];
    f = f[0];
    return "rgb(" + f + ", " + e + ", " + d + ")"
};
JXG.rgb2hex = function () {
    var f, e, d;
    f = JXG.rgbParser.apply(JXG.rgbParser, arguments);
    e = f[1];
    d = f[2];
    f = f[0];
    f = f.toString(16);
    e = e.toString(16);
    d = d.toString(16);
    if (f.length == 1) {
        f = "0" + f
    }
    if (e.length == 1) {
        e = "0" + e
    }
    if (d.length == 1) {
        d = "0" + d
    }
    return "#" + f + e + d
};
JXG.hex2rgb = function (h) {
    var f, e, d;
    if (h.charAt(0) == "#") {
        h = h.slice(1)
    }
    f = parseInt(h.substr(0, 2), 16);
    e = parseInt(h.substr(2, 2), 16);
    d = parseInt(h.substr(4, 2), 16);
    return "rgb(" + f + ", " + e + ", " + d + ")"
};
JXG.hsv2rgb = function (o, k, j) {
    var l, r, g, n, m, h, e, d, s;
    o = ((o % 360) + 360) % 360;
    if (k == 0) {
        if (isNaN(o) || o < JXG.Math.eps) {
            l = j;
            r = j;
            g = j
        } else {
            return "#ffffff"
        }
    } else {
        if (o >= 360) {
            h = 0
        } else {
            h = o
        }
        h = h / 60;
        m = Math.floor(h);
        n = h - m;
        e = j * (1 - k);
        d = j * (1 - (k * n));
        s = j * (1 - (k * (1 - n)));
        switch (m) {
            case 0:
                l = j;
                r = s;
                g = e;
                break;
            case 1:
                l = d;
                r = j;
                g = e;
                break;
            case 2:
                l = e;
                r = j;
                g = s;
                break;
            case 3:
                l = e;
                r = d;
                g = j;
                break;
            case 4:
                l = s;
                r = e;
                g = j;
                break;
            case 5:
                l = j;
                r = e;
                g = d;
                break
        }
    }
    l = Math.round(l * 255).toString(16);
    l = (l.length == 2) ? l : ((l.length == 1) ? "0" + l : "00");
    r = Math.round(r * 255).toString(16);
    r = (r.length == 2) ? r : ((r.length == 1) ? "0" + r : "00");
    g = Math.round(g * 255).toString(16);
    g = (g.length == 2) ? g : ((g.length == 1) ? "0" + g : "00");
    return ["#", l, r, g].join("")
};
JXG.rgb2hsv = function () {
    var d, m, p, n, e, i, f, q, l, u, t, o, j, k;
    d = JXG.rgbParser.apply(JXG.rgbParser, arguments);
    m = d[1];
    p = d[2];
    d = d[0];
    k = JXG.Math.Statistics;
    n = d / 255;
    e = m / 255;
    i = p / 255;
    o = k.max([d, m, p]);
    j = k.min([d, m, p]);
    f = o / 255;
    q = j / 255;
    t = f;
    u = 0;
    if (t > 0) {
        u = (t - q) / (t * 1)
    }
    l = 1 / (f - q);
    if (u > 0) {
        if (o == d) {
            l = (e - i) * l
        } else {
            if (o == m) {
                l = 2 + (i - n) * l
            } else {
                l = 4 + (n - e) * l
            }
        }
    }
    l *= 60;
    if (l < 0) {
        l += 360
    }
    if (o == j) {
        l = 0
    }
    return [l, u, t]
};
JXG.rgb2LMS = function () {
    var n, k, e, f, d, j, i, h = [
        [0.05059983, 0.08585369, 0.0095242],
        [0.01893033, 0.08925308, 0.01370054],
        [0.00292202, 0.00975732, 0.07145979]
    ];
    n = JXG.rgbParser.apply(JXG.rgbParser, arguments);
    k = n[1];
    e = n[2];
    n = n[0];
    n = Math.pow(n, 0.476190476);
    k = Math.pow(k, 0.476190476);
    e = Math.pow(e, 0.476190476);
    f = n * h[0][0] + k * h[0][1] + e * h[0][2];
    d = n * h[1][0] + k * h[1][1] + e * h[1][2];
    j = n * h[2][0] + k * h[2][1] + e * h[2][2];
    i = [f, d, j];
    i.l = f;
    i.m = d;
    i.s = j;
    return i
};
JXG.LMS2rgb = function (f, e, o) {
    var d, h, j, i, k = [
        [30.830854, - 29.832659, 1.610474],
        [-6.481468, 17.715578, - 2.532642],
        [-0.37569, - 1.199062, 14.273846]
    ];
    d = f * k[0][0] + e * k[0][1] + o * k[0][2];
    h = f * k[1][0] + e * k[1][1] + o * k[1][2];
    j = f * k[2][0] + e * k[2][1] + o * k[2][2];
    var n = function (l) {
        var m = 127,
            g = 64;
        while (g > 0) {
            if (Math.pow(m, 0.476190476) > l) {
                m -= g
            } else {
                if (Math.pow(m + 1, 0.476190476) > l) {
                    return m
                }
                m += g
            }
            g /= 2
        }
        if (m == 254 && 13.994955247 < l) {
            return 255
        }
        return m
    };
    d = n(d);
    h = n(h);
    j = n(j);
    i = [d, h, j];
    i.r = d;
    i.g = h;
    i.b = j;
    return i
};
JXG.rgba2rgbo = function (e) {
    var d;
    if (e.length == 9 && e.charAt(0) == "#") {
        d = parseInt(e.substr(7, 2).toUpperCase(), 16) / 255;
        e = e.substr(0, 7)
    } else {
        d = 1
    }
    return [e, d]
};
JXG.rgbo2rgba = function (d, f) {
    var e;
    if (d == "none") {
        return d
    }
    e = Math.round(f * 255).toString(16);
    if (e.length == 1) {
        e = "0" + e
    }
    return d + e
};
JXG.rgb2bw = function (f) {
    if (f == "none") {
        return f
    }
    var e, h = "0123456789ABCDEF",
        g, d;
    d = JXG.rgbParser(f);
    e = 0.3 * d[0] + 0.59 * d[1] + 0.11 * d[2];
    g = h.charAt((e >> 4) & 15) + h.charAt(e & 15);
    f = "#" + g + "" + g + "" + g;
    return f
};
JXG.rgb2cb = function (i, p) {
    if (i == "none") {
        return i
    }
    var r, h, g, v, q, n, f, u, k, e, t, j, o;
    q = JXG.rgb2LMS(i);
    h = q.l;
    g = q.m;
    v = q.s;
    p = p.toLowerCase();
    switch (p) {
        case "protanopia":
            f = -0.06150039994295001;
            u = 0.08277001656812001;
            k = -0.013200141220000003;
            e = 0.05858939668799999;
            t = -0.07934519995360001;
            j = 0.013289415272000003;
            o = 0.6903216543277437;
            n = v / g;
            if (n < o) {
                h = -(u * g + k * v) / f
            } else {
                h = -(t * g + j * v) / e
            }
            break;
        case "tritanopia":
            f = -0.00058973116217;
            u = 0.007690316482;
            k = -0.01011703519052;
            e = 0.025495080838999994;
            t = -0.0422740347;
            j = 0.017005316784;
            o = 0.8349489908460004;
            n = g / h;
            if (n < o) {
                v = -(f * h + u * g) / k
            } else {
                v = -(e * h + t * g) / j
            }
            break;
        default:
            f = -0.06150039994295001;
            u = 0.08277001656812001;
            k = -0.013200141220000003;
            e = 0.05858939668799999;
            t = -0.07934519995360001;
            j = 0.013289415272000003;
            o = 0.5763833686400911;
            n = v / h;
            if (n < o) {
                g = -(f * h + k * v) / u
            } else {
                g = -(e * h + j * v) / t
            }
            break
    }
    r = JXG.LMS2rgb(h, g, v);
    var d = "0123456789ABCDEF";
    n = d.charAt((r.r >> 4) & 15) + d.charAt(r.r & 15);
    i = "#" + n;
    n = d.charAt((r.g >> 4) & 15) + d.charAt(r.g & 15);
    i += n;
    n = d.charAt((r.b >> 4) & 15) + d.charAt(r.b & 15);
    i += n;
    return i
};
JXG.extend(JXG.Board.prototype, {
    angle: function (d, f, e) {
        return JXG.Math.Geometry.angle(d, f, e)
    },
    rad: function (d, f, e) {
        return JXG.Math.Geometry.rad(d, f, e)
    },
    distance: function (e, d) {
        return JXG.Math.Geometry.distance(e, d)
    },
    pow: function (e, d) {
        return JXG.Math.pow(e, d)
    },
    round: function (d, e) {
        return (d).toFixed(e)
    },
    cosh: function (d) {
        return JXG.Math.cosh(d)
    },
    sinh: function (d) {
        return JXG.Math.sinh(d)
    },
    sgn: function (d) {
        return (d == 0 ? 0 : d / (Math.abs(d)))
    },
    D: function (d, e) {
        return JXG.Math.Numerics.D(d, e)
    },
    I: function (d, e) {
        return JXG.Math.Numerics.I(d, e)
    },
    root: function (e, d, g) {
        return JXG.Math.Numerics.root(e, d, g)
    },
    lagrangePolynomial: function (d) {
        return JXG.Math.Numerics.lagrangePolynomial(d)
    },
    neville: function (d) {
        return JXG.Math.Numerics.Neville(d)
    },
    riemannsum: function (g, i, e, h, d) {
        return JXG.Math.Numerics.riemannsum(g, i, e, h, d)
    },
    abs: Math.abs,
    acos: Math.acos,
    asin: Math.asin,
    atan: Math.atan,
    ceil: Math.ceil,
    cos: Math.cos,
    exp: Math.exp,
    floor: Math.floor,
    log: Math.log,
    max: Math.max,
    min: Math.min,
    random: Math.random,
    sin: Math.sin,
    sqrt: Math.sqrt,
    tan: Math.tan,
    trunc: Math.ceil,
    factorial: function (d) {
        return JXG.Math.factorial(d)
    },
    binomial: function (e, d) {
        return JXG.Math.binomial(e, d)
    },
    getElement: function (d) {
        return JXG.getReference(this, d)
    },
    intersectionOptions: ["point", [
        [JXG.OBJECT_CLASS_LINE, JXG.OBJECT_CLASS_LINE],
        [JXG.OBJECT_CLASS_LINE, JXG.OBJECT_CLASS_CIRCLE],
        [JXG.OBJECT_CLASS_CIRCLE, JXG.OBJECT_CLASS_CIRCLE]
    ]],
    intersection: function (g, e, f, d) {
        g = JXG.getReference(this, g);
        e = JXG.getReference(this, e);
        if (g.elementClass == JXG.OBJECT_CLASS_CURVE && e.elementClass == JXG.OBJECT_CLASS_CURVE) {
            return function () {
                return JXG.Math.Geometry.meetCurveCurve(g, e, f, d, g.board)
            }
        } else {
            if ((g.type == JXG.OBJECT_TYPE_ARC && e.elementClass == JXG.OBJECT_CLASS_LINE) || (e.type == JXG.OBJECT_TYPE_ARC && g.elementClass == JXG.OBJECT_CLASS_LINE)) {
                return function () {
                    return JXG.Math.Geometry.meet(g.stdform, e.stdform, f, g.board)
                }
            } else {
                if ((g.elementClass == JXG.OBJECT_CLASS_CURVE && e.elementClass == JXG.OBJECT_CLASS_LINE) || (e.elementClass == JXG.OBJECT_CLASS_CURVE && g.elementClass == JXG.OBJECT_CLASS_LINE)) {
                    return function () {
                        return JXG.Math.Geometry.meetCurveLine(g, e, f, g.board)
                    }
                } else {
                    return function () {
                        return JXG.Math.Geometry.meet(g.stdform, e.stdform, f, g.board)
                    }
                }
            }
        }
    },
    intersectionFunc: function (g, e, f, d) {
        return this.intersection(g, e, f, d)
    },
    otherIntersection: function (e, d, f) {
        e = JXG.getReference(this, e);
        d = JXG.getReference(this, d);
        return function () {
            var g = JXG.Math.Geometry.meet(e.stdform, d.stdform, 0, e.board);
            if (Math.abs(f.X() - g.usrCoords[1]) > JXG.Math.eps || Math.abs(f.Y() - g.usrCoords[2]) > JXG.Math.eps || Math.abs(f.Z() - g.usrCoords[0]) > JXG.Math.eps) {
                return g
            } else {
                return JXG.Math.Geometry.meet(e.stdform, d.stdform, 1, e.board)
            }
        }
    },
    pointFunc: function () {
        return [null]
    },
    pointOptions: ["point", [
        [JXG.OBJECT_CLASS_POINT]
    ]],
    lineFunc: function () {
        return arguments
    },
    lineOptions: ["line", [
        [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT]
    ]],
    linesegmentFunc: function () {
        return arguments
    },
    linesegmentOptions: ["line", [
        [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT]
    ]],
    linesegmentAtts: {
        straightFirst: false,
        straightLast: false
    },
    arrowFunc: function () {
        return arguments
    },
    arrowOptions: ["arrow", [
        [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT]
    ]],
    circleFunc: function () {
        return arguments
    },
    circleOptions: ["circle", [
        [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT],
        [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_LINE],
        [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_CIRCLE]
    ]],
    arrowparallelOptions: ["arrowparallel", [
        [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_LINE]
    ]],
    arrowparallelFunc: function () {
        return arguments
    },
    bisectorOptions: ["bisector", [
        [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT]
    ]],
    bisectorFunc: function () {
        return arguments
    },
    circumcircleOptions: ["circumcircle", [
        [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT]
    ]],
    circumcircleFunc: function () {
        return arguments
    },
    circumcirclemidpointOptions: ["circumcirclemidpoint", [
        [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT]
    ]],
    circumcirclemidpointFunc: function () {
        return arguments
    },
    integralOptions: ["integral", [
        []
    ]],
    integralFunc: function () {
        return arguments
    },
    midpointOptions: ["midpoint", [
        [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT],
        [JXG.OBJECT_CLASS_LINE]
    ]],
    midpointFunc: function () {
        return arguments
    },
    mirrorpointOptions: ["mirrorpoint", [
        [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT]
    ]],
    mirrorpointFunc: function () {
        return arguments
    },
    normalOptions: ["normal", [
        [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_LINE]
    ]],
    normalFunc: function () {
        return arguments
    },
    parallelOptions: ["parallel", [
        [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_LINE]
    ]],
    parallelFunc: function () {
        return arguments
    },
    parallelpointOptions: ["parallelpoint", [
        [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT]
    ]],
    parallelpointFunc: function () {
        return arguments
    },
    perpendicularOptions: ["perpendicular", [
        [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_LINE]
    ]],
    perpendicularFunc: function () {
        return arguments
    },
    perpendicularpointOptions: ["perpendicularpoint", [
        [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_LINE]
    ]],
    perpendicularpointFunc: function () {
        return arguments
    },
    reflectionOptions: ["reflection", [
        [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_LINE]
    ]],
    reflectionFunc: function () {
        return arguments
    }
});
JXG.Point.prototype.setPositionX = function (f, d) {
    var e = (f == JXG.COORDS_BY_USER) ? this.coords.usrCoords[2] : this.coords.scrCoords[2];
    this.setPosition(f, [d, e])
};
JXG.Point.prototype.setPositionY = function (f, e) {
    var d = (f == JXG.COORDS_BY_USER) ? this.coords.usrCoords[1] : this.coords.scrCoords[1];
    this.setPosition(f, [d, e])
};
JXG.Ticks = function (d, f, e) {
    this.constructor(d.board, e, JXG.OBJECT_TYPE_TICKS, JXG.OBJECT_CLASS_OTHER);
    this.line = d;
    this.board = this.line.board;
    this.ticksFunction = null;
    this.fixedTicks = null;
    this.equidistant = false;
    if (JXG.isFunction(f)) {
        this.ticksFunction = f;
        throw new Error("Function arguments are no longer supported.")
    } else {
        if (JXG.isArray(f)) {
            this.fixedTicks = f
        } else {
            if (Math.abs(f) < JXG.Math.eps) {
                f = e.defaultdistance
            }
            this.ticksFunction = function (g) {
                return f
            };
            this.equidistant = true
        }
    }
    this.minTicksDistance = e.minticksdistance;
    this.maxTicksDistance = e.maxticksdistance;
    this.labels = [];
    this.id = this.line.addTicks(this);
    this.board.setId(this, "Ti")
};
JXG.Ticks.prototype = new JXG.GeometryElement();
JXG.extend(JXG.Ticks.prototype, {
    hasPoint: function (d, e) {
        return false
    },
    calculateTicksCoordinates: function () {
        var P = this.line.point1,
            O = this.line.point2,
            l = P.Dist(O),
            p = (O.coords.usrCoords[1] - P.coords.usrCoords[1]) / l,
            o = (O.coords.usrCoords[2] - P.coords.usrCoords[2]) / l,
            s = P.coords.distance(JXG.COORDS_BY_SCREEN, new JXG.Coords(JXG.COORDS_BY_USER, [P.coords.usrCoords[1] + p, P.coords.usrCoords[2] + o], this.board)),
            B = (this.equidistant ? this.ticksFunction(1) : 1),
            n, N, J = 5,
            w, q, r, K, I, D, k, G, H = 0,
            F = 0,
            g, t = 2,
            R = -1,
            e, Q, T, M, u = JXG.Math.eps,
            z, C, E, L = this.visProp.majorheight * 0.5,
            m = this.visProp.minorheight * 0.5,
            h, A, v, S;
        if (this.board.canvasWidth === 0 || this.board.canvasHeight === 0) {
            return
        }
        if (this.visProp.minorheight < 0) {
            this.minStyle = "infinite"
        } else {
            this.minStyle = "finite"
        }
        if (this.visProp.majorheight < 0) {
            this.majStyle = "infinite"
        } else {
            this.majStyle = "finite"
        }
        if (this.line.visProp.straightfirst) {
            C = Number.NEGATIVE_INFINITY
        } else {
            C = 0 + u
        }
        if (this.line.visProp.straightlast) {
            E = Number.POSITIVE_INFINITY
        } else {
            E = l - u
        }
        h = this.line.stdform[1];
        A = this.line.stdform[2];
        v = h;
        S = A;
        Q = Math.sqrt(h * h * this.board.unitX * this.board.unitX + A * A * this.board.unitY * this.board.unitY);
        h *= L / Q * this.board.unitX;
        A *= L / Q * this.board.unitY;
        v *= m / Q * this.board.unitX;
        S *= m / Q * this.board.unitY;
        this.removeTickLabels();
        this.ticks = [];
        this.labels = [];
        if (!this.equidistant) {
            for (K = 0; K < this.fixedTicks.length; K++) {
                H = P.coords.usrCoords[1] + this.fixedTicks[K] * p;
                F = P.coords.usrCoords[2] + this.fixedTicks[K] * o;
                w = new JXG.Coords(JXG.COORDS_BY_USER, [H, F], this.board);
                g = this._tickEndings(w, h, A, v, S, true);
                if (g.length == 2 && this.fixedTicks[K] >= C && this.fixedTicks[K] < E) {
                    this.ticks.push(g)
                }
                this.labels.push(this._makeLabel(this.visProp.labels[K] || this.fixedTicks[K], w, this.board, this.visProp.drawlabels, this.id, K))
            }
            return
        }
        n = B;
        B *= this.visProp.scale;
        if (this.visProp.insertticks && this.minTicksDistance > JXG.Math.eps) {
            N = this._adjustTickDistance(B, s, J, P.coords, p, o);
            B *= N;
            n *= N
        }
        if (!this.visProp.insertticks) {
            B /= this.visProp.minorticks + 1;
            n /= this.visProp.minorticks + 1
        }
        this.ticksDelta = B;
        this.symbTicksDelta = n;
        T = this.board.getBoundingBox();
        H = (T[0] + T[2]) * 0.5;
        F = (T[1] + T[3]) * 0.5;
        M = [H * this.line.stdform[2] - F * this.line.stdform[1], - this.line.stdform[2], this.line.stdform[1]];
        e = JXG.Math.crossProduct(this.line.stdform, M);
        e[1] /= e[0];
        e[2] /= e[0];
        e[0] = 1;
        w = new JXG.Coords(JXG.COORDS_BY_USER, e.slice(1), this.board);
        Q = P.coords.distance(JXG.COORDS_BY_USER, w);
        if ((O.X() - P.X()) * (e[1] - P.X()) < 0 || (O.Y() - P.Y()) * (e[2] - P.Y()) < 0) {
            Q *= -1
        }
        D = Math.round(Q / B) * B;
        if (Math.abs(D) > JXG.Math.eps) {
            R = Math.abs(D) / D
        }
        e[1] = P.coords.usrCoords[1] + p * D;
        e[2] = P.coords.usrCoords[2] + o * D;
        q = D;
        D = 0;
        k = 0;
        r = q / this.visProp.scale;
        H = e[1];
        F = e[2];
        K = 0;
        I = 0;
        do {
            w = new JXG.Coords(JXG.COORDS_BY_USER, [H, F], this.board);
            w.major = Math.round((R * D + q) / B) % (this.visProp.minorticks + 1) === 0;
            g = this._tickEndings(w, h, A, v, S, w.major);
            if (g.length == 2) {
                z = R * k + r;
                if ((Math.abs(z) <= u && this.visProp.drawzero) || (z > C && z < E)) {
                    this.ticks.push(g);
                    if (w.major) {
                        this.labels.push(this._makeLabel(z, w, this.board, this.visProp.drawlabels, this.id, K))
                    } else {
                        this.labels.push(null)
                    }
                    K++
                }
                if (t == 2) {
                    R *= (-1)
                }
                if (I % 2 === 0 || t === 1) {
                    D += B;
                    k += n
                }
            } else {
                R *= (-1);
                t--
            }
            I++;
            H = e[1] + R * p * D;
            F = e[2] + R * o * D
        } while (t > 0);
        this.needsUpdate = true;
        this.updateRenderer()
    },
    _adjustTickDistance: function (e, l, k, m, g, d) {
        var i, h, j = 1;
        while (l > 4 * this.minTicksDistance) {
            j /= 10;
            i = m.usrCoords[1] + g * e * j;
            h = m.usrCoords[2] + d * e * j;
            l = m.distance(JXG.COORDS_BY_SCREEN, new JXG.Coords(JXG.COORDS_BY_USER, [i, h], this.board))
        }
        while (l < this.minTicksDistance) {
            j *= k;
            k = (k == 5 ? 2 : 5);
            i = m.usrCoords[1] + g * e * j;
            h = m.usrCoords[2] + d * e * j;
            l = m.distance(JXG.COORDS_BY_SCREEN, new JXG.Coords(JXG.COORDS_BY_USER, [i, h], this.board))
        }
        return j
    },
    _tickEndings: function (u, A, e, p, t, q) {
        var v, z, f = this.board.canvasWidth,
            m = this.board.canvasHeight,
            j = [-1000 * f, - 1000 * m],
            h = [-1000 * f, - 1000 * m],
            l, k, r, d, o, w, g = 0,
            n = false;
        z = u.scrCoords;
        if (q) {
            l = A;
            k = e;
            w = this.majStyle
        } else {
            l = p;
            k = t;
            w = this.minStyle
        }
        r = l * this.board.unitX;
        d = k * this.board.unitY;
        if (Math.abs(l) < JXG.Math.eps) {
            j[0] = z[1];
            j[1] = z[1];
            h[0] = 0;
            h[1] = m
        } else {
            if (Math.abs(k) < JXG.Math.eps) {
                j[0] = 0;
                j[1] = f;
                h[0] = z[2];
                h[1] = z[2]
            } else {
                g = 0;
                o = JXG.Math.crossProduct([0, 0, 1], [-d * z[1] - r * z[2], d, r]);
                o[1] /= o[0];
                if (o[1] >= 0 && o[1] <= f) {
                    j[g] = o[1];
                    h[g] = 0;
                    g++
                }
                o = JXG.Math.crossProduct([0, 1, 0], [-d * z[1] - r * z[2], d, r]);
                o[2] /= o[0];
                if (o[2] >= 0 && o[2] <= m) {
                    j[g] = 0;
                    h[g] = o[2];
                    g++
                }
                if (g < 2) {
                    o = JXG.Math.crossProduct([m * m, 0, - m], [-d * z[1] - r * z[2], d, r]);
                    o[1] /= o[0];
                    if (o[1] >= 0 && o[1] <= f) {
                        j[g] = o[1];
                        h[g] = m;
                        g++
                    }
                }
                if (g < 2) {
                    o = JXG.Math.crossProduct([f * f, - f, 0], [-d * z[1] - r * z[2], d, r]);
                    o[2] /= o[0];
                    if (o[2] >= 0 && o[2] <= m) {
                        j[g] = f;
                        h[g] = o[2]
                    }
                }
            }
        }
        if ((j[0] >= 0 && j[0] <= f && h[0] >= 0 && h[0] <= m) || (j[1] >= 0 && j[1] <= f && h[1] >= 0 && h[1] <= m)) {
            n = true
        } else {
            n = false
        }
        if (w == "finite") {
            j[0] = z[1] + l;
            h[0] = z[2] - k;
            j[1] = z[1] - l;
            h[1] = z[2] + k
        }
        if (n) {
            return [j, h]
        } else {
            return []
        }
    },
    _makeLabel: function (m, d, l, f, e, h) {
        var g, n, k, j = typeof m === "number";
        if (!f) {
            return null
        }
        g = m.toString();
        if (Math.abs(m) < JXG.Math.eps) {
            g = "0"
        }
        if (j && (g.length > 5 || g.indexOf("e") != -1)) {
            g = m.toPrecision(3).toString()
        }
        if (j && g.indexOf(".") > -1) {
            g = g.replace(/0+$/, "");
            g = g.replace(/\.$/, "")
        }
        if (this.visProp.scalesymbol.length > 0 && g === "1") {
            g = this.visProp.scalesymbol
        } else {
            if (this.visProp.scalesymbol.length > 0 && g === "0") {
                g = "0"
            } else {
                g = g + this.visProp.scalesymbol
            }
        }
        k = {
            id: e + h + "Label",
            isLabel: true,
            layer: l.options.layer.line,
            highlightStrokeColor: l.options.text.strokeColor,
            highlightStrokeWidth: l.options.text.strokeWidth,
            highlightStrokeOpacity: l.options.text.strokeOpacity,
            visible: this.visProp.visible,
            priv: this.visProp.priv
        };
        k = JXG.deepCopy(k, this.visProp.label);
        n = JXG.createText(l, [d.usrCoords[1], d.usrCoords[2], g], k);
        n.isDraggable = false;
        n.dump = false;
        n.distanceX = this.visProp.label.offset[0];
        n.distanceY = this.visProp.label.offset[1];
        n.setCoords(d.usrCoords[1] + n.distanceX / (l.unitX), d.usrCoords[2] + n.distanceY / (l.unitY));
        n.visProp.visible = f;
        return n
    },
    removeTickLabels: function () {
        var d;
        if (this.labels != null) {
            if ((this.board.needsFullUpdate || this.needsRegularUpdate) && !(this.board.options.renderer == "canvas" && this.board.options.text.display == "internal")) {
                for (d = 0; d < this.labels.length; d++) {
                    if (this.labels[d] != null) {
                        this.board.removeObject(this.labels[d])
                    }
                }
            }
        }
    },
    update: function () {
        if (this.needsUpdate) {
            this.calculateTicksCoordinates()
        }
        return this
    },
    updateRenderer: function () {
        if (this.needsUpdate) {
            if (this.ticks) {
                this.board.renderer.updateTicks(this, this.dxMaj, this.dyMaj, this.dxMin, this.dyMin, this.minStyle, this.majStyle)
            }
            this.needsUpdate = false
        }
        return this
    },
    hideElement: function () {
        var d;
        this.visProp.visible = false;
        this.board.renderer.hide(this);
        for (d = 0; d < this.labels.length; d++) {
            if (JXG.exists(this.labels[d])) {
                this.labels[d].hideElement()
            }
        }
        return this
    },
    showElement: function () {
        var d;
        this.visProp.visible = true;
        this.board.renderer.show(this);
        for (d = 0; d < this.labels.length; d++) {
            if (JXG.exists(this.labels[d])) {
                this.labels[d].showElement()
            }
        }
        return this
    }
});
JXG.createTicks = function (h, f, e) {
    var g, i, d = JXG.copyAttributes(e, h.options, "ticks");
    if (f.length < 2) {
        i = e.ticksDistance
    } else {
        i = f[1]
    }
    if ((f[0].elementClass == JXG.OBJECT_CLASS_LINE) && (JXG.isFunction(f[1]) || JXG.isArray(f[1]) || JXG.isNumber(f[1]))) {
        g = new JXG.Ticks(f[0], i, d)
    } else {
        throw new Error("JSXGraph: Can't create Ticks with parent types '" + (typeof f[0]) + "' and '" + (typeof f[1]) + "'.")
    }
    return g
};
JXG.JSXGraph.registerElement("ticks", JXG.createTicks);
JXG.Util = {};
JXG.Util.Unzip = function (V) {
    var p = [],
        I = "",
        G = false,
        D, J = 0,
        S = [],
        t, k = new Array(32768),
        aa = 0,
        N = false,
        X, K, Z = [0, 128, 64, 192, 32, 160, 96, 224, 16, 144, 80, 208, 48, 176, 112, 240, 8, 136, 72, 200, 40, 168, 104, 232, 24, 152, 88, 216, 56, 184, 120, 248, 4, 132, 68, 196, 36, 164, 100, 228, 20, 148, 84, 212, 52, 180, 116, 244, 12, 140, 76, 204, 44, 172, 108, 236, 28, 156, 92, 220, 60, 188, 124, 252, 2, 130, 66, 194, 34, 162, 98, 226, 18, 146, 82, 210, 50, 178, 114, 242, 10, 138, 74, 202, 42, 170, 106, 234, 26, 154, 90, 218, 58, 186, 122, 250, 6, 134, 70, 198, 38, 166, 102, 230, 22, 150, 86, 214, 54, 182, 118, 246, 14, 142, 78, 206, 46, 174, 110, 238, 30, 158, 94, 222, 62, 190, 126, 254, 1, 129, 65, 193, 33, 161, 97, 225, 17, 145, 81, 209, 49, 177, 113, 241, 9, 137, 73, 201, 41, 169, 105, 233, 25, 153, 89, 217, 57, 185, 121, 249, 5, 133, 69, 197, 37, 165, 101, 229, 21, 149, 85, 213, 53, 181, 117, 245, 13, 141, 77, 205, 45, 173, 109, 237, 29, 157, 93, 221, 61, 189, 125, 253, 3, 131, 67, 195, 35, 163, 99, 227, 19, 147, 83, 211, 51, 179, 115, 243, 11, 139, 75, 203, 43, 171, 107, 235, 27, 155, 91, 219, 59, 187, 123, 251, 7, 135, 71, 199, 39, 167, 103, 231, 23, 151, 87, 215, 55, 183, 119, 247, 15, 143, 79, 207, 47, 175, 111, 239, 31, 159, 95, 223, 63, 191, 127, 255],
        ad = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
        U = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 99, 99],
        O = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577],
        C = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
        q = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
        z = V,
        e = 0,
        j = 0,
        ae = 1,
        d = 0,
        ac = 256,
        i = [],
        m;

    function g() {
        d += 8;
        if (e < z.length) {
            return z[e++]
        } else {
            return -1
        }
    }
    function r() {
        ae = 1
    }
    function Y() {
        var ag;
        d++;
        ag = (ae & 1);
        ae >>= 1;
        if (ae == 0) {
            ae = g();
            ag = (ae & 1);
            ae = (ae >> 1) | 128
        }
        return ag
    }
    function W(ag) {
        var ai = 0,
            ah = ag;
        while (ah--) {
            ai = (ai << 1) | Y()
        }
        if (ag) {
            ai = Z[ai] >> (8 - ag)
        }
        return ai
    }
    function f() {
        aa = 0
    }
    function A(ag) {
        K++;
        k[aa++] = ag;
        p.push(String.fromCharCode(ag));
        if (aa == 32768) {
            aa = 0
        }
    }
    function o() {
        this.b0 = 0;
        this.b1 = 0;
        this.jump = null;
        this.jumppos = -1
    }
    var h = 288;
    var w = new Array(h);
    var Q = new Array(32);
    var L = 0;
    var ab = null;
    var s = null;
    var P = new Array(64);
    var M = new Array(64);
    var B = 0;
    var F = new Array(17);
    F[0] = 0;
    var R;
    var v;

    function l() {
        while (1) {
            if (F[B] >= v) {
                return -1
            }
            if (R[F[B]] == B) {
                return F[B]++
            }
            F[B]++
        }
    }
    function H() {
        var ah = ab[L];
        var ag;
        if (G) {
            document.write("<br>len:" + B + " treepos:" + L)
        }
        if (B == 17) {
            return -1
        }
        L++;
        B++;
        ag = l();
        if (G) {
            document.write("<br>IsPat " + ag)
        }
        if (ag >= 0) {
            ah.b0 = ag;
            if (G) {
                document.write("<br>b0 " + ah.b0)
            }
        } else {
            ah.b0 = 32768;
            if (G) {
                document.write("<br>b0 " + ah.b0)
            }
            if (H()) {
                return -1
            }
        }
        ag = l();
        if (ag >= 0) {
            ah.b1 = ag;
            if (G) {
                document.write("<br>b1 " + ah.b1)
            }
            ah.jump = null
        } else {
            ah.b1 = 32768;
            if (G) {
                document.write("<br>b1 " + ah.b1)
            }
            ah.jump = ab[L];
            ah.jumppos = L;
            if (H()) {
                return -1
            }
        }
        B--;
        return 0
    }
    function n(ak, ai, al, ah) {
        var aj;
        if (G) {
            document.write("currentTree " + ak + " numval " + ai + " lengths " + al + " show " + ah)
        }
        ab = ak;
        L = 0;
        R = al;
        v = ai;
        for (aj = 0; aj < 17; aj++) {
            F[aj] = 0
        }
        B = 0;
        if (H()) {
            if (G) {
                alert("invalid huffman tree\n")
            }
            return -1
        }
        if (G) {
            document.write("<br>Tree: " + ab.length);
            for (var ag = 0; ag < 32; ag++) {
                document.write("Places[" + ag + "].b0=" + ab[ag].b0 + "<br>");
                document.write("Places[" + ag + "].b1=" + ab[ag].b1 + "<br>")
            }
        }
        return 0
    }
    function E(aj) {
        var ah, ai, al = 0,
            ak = aj[al],
            ag;
        while (1) {
            ag = Y();
            if (G) {
                document.write("b=" + ag)
            }
            if (ag) {
                if (!(ak.b1 & 32768)) {
                    if (G) {
                        document.write("ret1")
                    }
                    return ak.b1
                }
                ak = ak.jump;
                ah = aj.length;
                for (ai = 0; ai < ah; ai++) {
                    if (aj[ai] === ak) {
                        al = ai;
                        break
                    }
                }
            } else {
                if (!(ak.b0 & 32768)) {
                    if (G) {
                        document.write("ret2")
                    }
                    return ak.b0
                }
                al++;
                ak = aj[al]
            }
        }
        if (G) {
            document.write("ret3")
        }
        return -1
    }
    function af() {
        var ak, ax, ah, av, aw;
        do {
            ak = Y();
            ah = W(2);
            switch (ah) {
                case 0:
                    if (G) {
                        alert("Stored\n")
                    }
                    break;
                case 1:
                    if (G) {
                        alert("Fixed Huffman codes\n")
                    }
                    break;
                case 2:
                    if (G) {
                        alert("Dynamic Huffman codes\n")
                    }
                    break;
                case 3:
                    if (G) {
                        alert("Reserved block type!!\n")
                    }
                    break;
                default:
                    if (G) {
                        alert("Unexpected value %d!\n", ah)
                    }
                    break
            }
            if (ah == 0) {
                var at, ag;
                r();
                at = g();
                at |= (g() << 8);
                ag = g();
                ag |= (g() << 8);
                if (((at ^ ~ag) & 65535)) {
                    document.write("BlockLen checksum mismatch\n")
                }
                while (at--) {
                    ax = g();
                    A(ax)
                }
            } else {
                if (ah == 1) {
                    var au;
                    while (1) {
                        au = (Z[W(7)] >> 1);
                        if (au > 23) {
                            au = (au << 1) | Y();
                            if (au > 199) {
                                au -= 128;
                                au = (au << 1) | Y()
                            } else {
                                au -= 48;
                                if (au > 143) {
                                    au = au + 136
                                }
                            }
                        } else {
                            au += 256
                        }
                        if (au < 256) {
                            A(au)
                        } else {
                            if (au == 256) {
                                break
                            } else {
                                var aw, ap;
                                au -= 256 + 1;
                                aw = W(U[au]) + ad[au];
                                au = Z[W(5)] >> 3;
                                if (C[au] > 8) {
                                    ap = W(8);
                                    ap |= (W(C[au] - 8) << 8)
                                } else {
                                    ap = W(C[au])
                                }
                                ap += O[au];
                                for (au = 0; au < aw; au++) {
                                    var ax = k[(aa - ap) & 32767];
                                    A(ax)
                                }
                            }
                        }
                    }
                } else {
                    if (ah == 2) {
                        var au, aq, ai, an, ao;
                        var am = new Array(288 + 32);
                        ai = 257 + W(5);
                        an = 1 + W(5);
                        ao = 4 + W(4);
                        for (au = 0; au < 19; au++) {
                            am[au] = 0
                        }
                        for (au = 0; au < ao; au++) {
                            am[q[au]] = W(3)
                        }
                        aw = Q.length;
                        for (av = 0; av < aw; av++) {
                            Q[av] = new o()
                        }
                        if (n(Q, 19, am, 0)) {
                            f();
                            return 1
                        }
                        if (G) {
                            document.write("<br>distanceTree");
                            for (var ay = 0; ay < Q.length; ay++) {
                                document.write("<br>" + Q[ay].b0 + " " + Q[ay].b1 + " " + Q[ay].jump + " " + Q[ay].jumppos)
                            }
                        }
                        aq = ai + an;
                        av = 0;
                        var aj = -1;
                        if (G) {
                            document.write("<br>n=" + aq + " bits: " + d + "<br>")
                        }
                        while (av < aq) {
                            aj++;
                            au = E(Q);
                            if (G) {
                                document.write("<br>" + aj + " i:" + av + " decode: " + au + "    bits " + d + "<br>")
                            }
                            if (au < 16) {
                                am[av++] = au
                            } else {
                                if (au == 16) {
                                    var ar;
                                    au = 3 + W(2);
                                    if (av + au > aq) {
                                        f();
                                        return 1
                                    }
                                    ar = av ? am[av - 1] : 0;
                                    while (au--) {
                                        am[av++] = ar
                                    }
                                } else {
                                    if (au == 17) {
                                        au = 3 + W(3)
                                    } else {
                                        au = 11 + W(7)
                                    }
                                    if (av + au > aq) {
                                        f();
                                        return 1
                                    }
                                    while (au--) {
                                        am[av++] = 0
                                    }
                                }
                            }
                        }
                        aw = w.length;
                        for (av = 0; av < aw; av++) {
                            w[av] = new o()
                        }
                        if (n(w, ai, am, 0)) {
                            f();
                            return 1
                        }
                        aw = w.length;
                        for (av = 0; av < aw; av++) {
                            Q[av] = new o()
                        }
                        var al = new Array();
                        for (av = ai; av < am.length; av++) {
                            al[av - ai] = am[av]
                        }
                        if (n(Q, an, al, 0)) {
                            f();
                            return 1
                        }
                        if (G) {
                            document.write("<br>literalTree")
                        }
                        while (1) {
                            au = E(w);
                            if (au >= 256) {
                                var aw, ap;
                                au -= 256;
                                if (au == 0) {
                                    break
                                }
                                au--;
                                aw = W(U[au]) + ad[au];
                                au = E(Q);
                                if (C[au] > 8) {
                                    ap = W(8);
                                    ap |= (W(C[au] - 8) << 8)
                                } else {
                                    ap = W(C[au])
                                }
                                ap += O[au];
                                while (aw--) {
                                    var ax = k[(aa - ap) & 32767];
                                    A(ax)
                                }
                            } else {
                                A(au)
                            }
                        }
                    }
                }
            }
        } while (!ak);
        f();
        r();
        return 0
    }
    JXG.Util.Unzip.prototype.unzipFile = function (ag) {
        var ah;
        this.unzip();
        for (ah = 0; ah < S.length; ah++) {
            if (S[ah][1] == ag) {
                return S[ah][0]
            }
        }
    };
    JXG.Util.Unzip.prototype.unzip = function () {
        if (G) {
            alert(z)
        }
        u();
        return S
    };

    function u() {
        if (G) {
            alert("NEXTFILE")
        }
        p = [];
        var ak = [];
        N = false;
        ak[0] = g();
        ak[1] = g();
        if (G) {
            alert("type: " + ak[0] + " " + ak[1])
        }
        if (ak[0] == parseInt("78", 16) && ak[1] == parseInt("da", 16)) {
            if (G) {
                alert("GEONExT-GZIP")
            }
            af();
            if (G) {
                alert(p.join(""))
            }
            S[J] = new Array(2);
            S[J][0] = p.join("");
            S[J][1] = "geonext.gxt";
            J++
        }
        if (ak[0] == parseInt("1f", 16) && ak[1] == parseInt("8b", 16)) {
            if (G) {
                alert("GZIP")
            }
            T();
            if (G) {
                alert(p.join(""))
            }
            S[J] = new Array(2);
            S[J][0] = p.join("");
            S[J][1] = "file";
            J++
        }
        if (ak[0] == parseInt("50", 16) && ak[1] == parseInt("4b", 16)) {
            N = true;
            ak[2] = g();
            ak[3] = g();
            if (ak[2] == parseInt("3", 16) && ak[3] == parseInt("4", 16)) {
                ak[0] = g();
                ak[1] = g();
                if (G) {
                    alert("ZIP-Version: " + ak[1] + " " + ak[0] / 10 + "." + ak[0] % 10)
                }
                D = g();
                D |= (g() << 8);
                if (G) {
                    alert("gpflags: " + D)
                }
                var ag = g();
                ag |= (g() << 8);
                if (G) {
                    alert("method: " + ag)
                }
                g();
                g();
                g();
                g();
                var al = g();
                al |= (g() << 8);
                al |= (g() << 16);
                al |= (g() << 24);
                var aj = g();
                aj |= (g() << 8);
                aj |= (g() << 16);
                aj |= (g() << 24);
                var ao = g();
                ao |= (g() << 8);
                ao |= (g() << 16);
                ao |= (g() << 24);
                if (G) {
                    alert("local CRC: " + al + "\nlocal Size: " + ao + "\nlocal CompSize: " + aj)
                }
                var ah = g();
                ah |= (g() << 8);
                var an = g();
                an |= (g() << 8);
                if (G) {
                    alert("filelen " + ah)
                }
                ai = 0;
                i = [];
                while (ah--) {
                    var am = g();
                    if (am == "/" | am == ":") {
                        ai = 0
                    } else {
                        if (ai < ac - 1) {
                            i[ai++] = String.fromCharCode(am)
                        }
                    }
                }
                if (G) {
                    alert("nameBuf: " + i)
                }
                if (!m) {
                    m = i
                }
                var ai = 0;
                while (ai < an) {
                    am = g();
                    ai++
                }
                X = 4294967295;
                K = 0;
                if (ao = 0 && fileOut.charAt(m.length - 1) == "/") {
                    if (G) {
                        alert("skipdir")
                    }
                }
                if (ag == 8) {
                    af();
                    if (G) {
                        alert(p.join(""))
                    }
                    S[J] = new Array(2);
                    S[J][0] = p.join("");
                    S[J][1] = i.join("");
                    J++
                }
                T()
            }
        }
    }
    function T() {
        var al, ai = [],
            aj, ah, ak, ag, am;
        if ((D & 8)) {
            ai[0] = g();
            ai[1] = g();
            ai[2] = g();
            ai[3] = g();
            if (ai[0] == parseInt("50", 16) && ai[1] == parseInt("4b", 16) && ai[2] == parseInt("07", 16) && ai[3] == parseInt("08", 16)) {
                al = g();
                al |= (g() << 8);
                al |= (g() << 16);
                al |= (g() << 24)
            } else {
                al = ai[0] | (ai[1] << 8) | (ai[2] << 16) | (ai[3] << 24)
            }
            aj = g();
            aj |= (g() << 8);
            aj |= (g() << 16);
            aj |= (g() << 24);
            ah = g();
            ah |= (g() << 8);
            ah |= (g() << 16);
            ah |= (g() << 24);
            if (G) {
                alert("CRC:")
            }
        }
        if (N) {
            u()
        }
        ai[0] = g();
        if (ai[0] != 8) {
            if (G) {
                alert("Unknown compression method!")
            }
            return 0
        }
        D = g();
        if (G) {
            if ((D & ~ (parseInt("1f", 16)))) {
                alert("Unknown flags set!")
            }
        }
        g();
        g();
        g();
        g();
        g();
        ak = g();
        if ((D & 4)) {
            ai[0] = g();
            ai[2] = g();
            B = ai[0] + 256 * ai[1];
            if (G) {
                alert("Extra field size: " + B)
            }
            for (ag = 0; ag < B; ag++) {
                g()
            }
        }
        if ((D & 8)) {
            ag = 0;
            i = [];
            while (am = g()) {
                if (am == "7" || am == ":") {
                    ag = 0
                }
                if (ag < ac - 1) {
                    i[ag++] = am
                }
            }
            if (G) {
                alert("original file name: " + i)
            }
        }
        if ((D & 16)) {
            while (am = g()) {}
        }
        if ((D & 2)) {
            g();
            g()
        }
        af();
        al = g();
        al |= (g() << 8);
        al |= (g() << 16);
        al |= (g() << 24);
        ah = g();
        ah |= (g() << 8);
        ah |= (g() << 16);
        ah |= (g() << 24);
        if (N) {
            u()
        }
    }
};
JXG.Util.Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function (f) {
        var d = [],
            n, l, j, m, k, h, g, e = 0;
        f = JXG.Util.Base64._utf8_encode(f);
        while (e < f.length) {
            n = f.charCodeAt(e++);
            l = f.charCodeAt(e++);
            j = f.charCodeAt(e++);
            m = n >> 2;
            k = ((n & 3) << 4) | (l >> 4);
            h = ((l & 15) << 2) | (j >> 6);
            g = j & 63;
            if (isNaN(l)) {
                h = g = 64
            } else {
                if (isNaN(j)) {
                    g = 64
                }
            }
            d.push([this._keyStr.charAt(m), this._keyStr.charAt(k), this._keyStr.charAt(h), this._keyStr.charAt(g)].join(""))
        }
        return d.join("")
    },
    decode: function (g, f) {
        var d = [],
            o, m, k, n, l, j, h, e = 0;
        g = g.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (e < g.length) {
            n = this._keyStr.indexOf(g.charAt(e++));
            l = this._keyStr.indexOf(g.charAt(e++));
            j = this._keyStr.indexOf(g.charAt(e++));
            h = this._keyStr.indexOf(g.charAt(e++));
            o = (n << 2) | (l >> 4);
            m = ((l & 15) << 4) | (j >> 2);
            k = ((j & 3) << 6) | h;
            d.push(String.fromCharCode(o));
            if (j != 64) {
                d.push(String.fromCharCode(m))
            }
            if (h != 64) {
                d.push(String.fromCharCode(k))
            }
        }
        d = d.join("");
        if (f) {
            d = JXG.Util.Base64._utf8_decode(d)
        }
        return d
    },
    _utf8_encode: function (e) {
        e = e.replace(/\r\n/g, "\n");
        var d = "";
        for (var g = 0; g < e.length; g++) {
            var f = e.charCodeAt(g);
            if (f < 128) {
                d += String.fromCharCode(f)
            } else {
                if ((f > 127) && (f < 2048)) {
                    d += String.fromCharCode((f >> 6) | 192);
                    d += String.fromCharCode((f & 63) | 128)
                } else {
                    d += String.fromCharCode((f >> 12) | 224);
                    d += String.fromCharCode(((f >> 6) & 63) | 128);
                    d += String.fromCharCode((f & 63) | 128)
                }
            }
        }
        return d
    },
    _utf8_decode: function (d) {
        var f = [],
            h = 0,
            j = 0,
            g = 0,
            e = 0;
        while (h < d.length) {
            j = d.charCodeAt(h);
            if (j < 128) {
                f.push(String.fromCharCode(j));
                h++
            } else {
                if ((j > 191) && (j < 224)) {
                    g = d.charCodeAt(h + 1);
                    f.push(String.fromCharCode(((j & 31) << 6) | (g & 63)));
                    h += 2
                } else {
                    g = d.charCodeAt(h + 1);
                    e = d.charCodeAt(h + 2);
                    f.push(String.fromCharCode(((j & 15) << 12) | ((g & 63) << 6) | (e & 63)));
                    h += 3
                }
            }
        }
        return f.join("")
    },
    _destrip: function (j, g) {
        var e = [],
            h, f, d = [];
        if (g == null) {
            g = 76
        }
        j.replace(/ /g, "");
        h = j.length / g;
        for (f = 0; f < h; f++) {
            e[f] = j.substr(f * g, g)
        }
        if (h != j.length / g) {
            e[e.length] = j.substr(h * g, j.length - (h * g))
        }
        for (f = 0; f < e.length; f++) {
            d.push(e[f])
        }
        return d.join("\n")
    },
    decodeAsArray: function (e) {
        var g = this.decode(e),
            d = [],
            f;
        for (f = 0; f < g.length; f++) {
            d[f] = g.charCodeAt(f)
        }
        return d
    },
    decodeGEONExT: function (d) {
        return decodeAsArray(destrip(d), false)
    }
};
JXG.Util.asciiCharCodeAt = function (e, d) {
    var f = e.charCodeAt(d);
    if (f > 255) {
        switch (f) {
            case 8364:
                f = 128;
                break;
            case 8218:
                f = 130;
                break;
            case 402:
                f = 131;
                break;
            case 8222:
                f = 132;
                break;
            case 8230:
                f = 133;
                break;
            case 8224:
                f = 134;
                break;
            case 8225:
                f = 135;
                break;
            case 710:
                f = 136;
                break;
            case 8240:
                f = 137;
                break;
            case 352:
                f = 138;
                break;
            case 8249:
                f = 139;
                break;
            case 338:
                f = 140;
                break;
            case 381:
                f = 142;
                break;
            case 8216:
                f = 145;
                break;
            case 8217:
                f = 146;
                break;
            case 8220:
                f = 147;
                break;
            case 8221:
                f = 148;
                break;
            case 8226:
                f = 149;
                break;
            case 8211:
                f = 150;
                break;
            case 8212:
                f = 151;
                break;
            case 732:
                f = 152;
                break;
            case 8482:
                f = 153;
                break;
            case 353:
                f = 154;
                break;
            case 8250:
                f = 155;
                break;
            case 339:
                f = 156;
                break;
            case 382:
                f = 158;
                break;
            case 376:
                f = 159;
                break;
            default:
                break
        }
    }
    return f
};
JXG.Util.utf8Decode = function (d) {
    var f = [];
    var h = 0;
    var k = 0,
        j = 0,
        g = 0,
        e;
    if (!JXG.exists(d)) {
        return ""
    }
    while (h < d.length) {
        k = d.charCodeAt(h);
        if (k < 128) {
            f.push(String.fromCharCode(k));
            h++
        } else {
            if ((k > 191) && (k < 224)) {
                g = d.charCodeAt(h + 1);
                f.push(String.fromCharCode(((k & 31) << 6) | (g & 63)));
                h += 2
            } else {
                g = d.charCodeAt(h + 1);
                e = d.charCodeAt(h + 2);
                f.push(String.fromCharCode(((k & 15) << 12) | ((g & 63) << 6) | (e & 63)));
                h += 3
            }
        }
    }
    return f.join("")
};
JXG.Util.genUUID = function () {
    var h = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),
        f = new Array(36),
        e = 0,
        g;
    for (var d = 0; d < 36; d++) {
        if (d == 8 || d == 13 || d == 18 || d == 23) {
            f[d] = "-"
        } else {
            if (d == 14) {
                f[d] = "4"
            } else {
                if (e <= 2) {
                    e = 33554432 + (Math.random() * 16777216) | 0
                }
                g = e & 15;
                e = e >> 4;
                f[d] = h[(d == 19) ? (g & 3) | 8 : g]
            }
        }
    }
    return f.join("")
};
JXG.PsTricks = {
    convert: function (g) {
        var h = new JXG.Coords(JXG.COORDS_BY_SCREEN, [0, 0], g),
            j = new JXG.Coords(JXG.COORDS_BY_SCREEN, [g.canvasWidth, g.canvasHeight], g),
            e, f, d = [];
        d.push("\\begin{pspicture*}(" + h.usrCoords[1] + "," + j.usrCoords[2] + ")(" + j.usrCoords[1] + "," + h.usrCoords[2] + ")\n");
        for (e in g.objects) {
            f = g.objects[e];
            if (f.visProp.visible) {
                switch (f.elementClass) {
                    case JXG.OBJECT_CLASS_CIRCLE:
                        d.push(this.addCircle(f));
                        break;
                    case JXG.OBJECT_CLASS_LINE:
                        d.push(this.addLine(f));
                        break;
                    case JXG.OBJECT_CLASS_POINT:
                        d.push(this.addPoint(f));
                        break;
                    default:
                        switch (f.type) {
                            case JXG.OBJECT_TYPE_ARC:
                                d.push(this.addArc(f));
                                break;
                            case JXG.OBJECT_TYPE_SECTOR:
                                d.push(this.addArc(f));
                                d.push(this.addSector(f));
                                break;
                            case JXG.OBJECT_TYPE_POLYGON:
                                d.push(this.addPolygon(f));
                                break;
                            case JXG.OBJECT_TYPE_ANGLE:
                                d.push(this.addAngle(f));
                                break
                        }
                        break
                }
            }
        }
        d.push("\\end{pspicture*}");
        return d.join("\n")
    },
    setArrows: function (e) {
        var d = "";
        if (e.visProp.firstarrow && e.visProp.lastarrow) {
            d = "{<->}"
        } else {
            if (e.visProp.firstarrow) {
                d = "{<-}"
            } else {
                if (e.visProp.lastarrow) {
                    d = "{->}"
                }
            }
        }
        return d
    },
    drawWedge: function (f, g, h, e, j, i) {
        var d = "";
        if (f != "none" && g > 0) {
            d += "\\pswedge[linestyle=none, fillstyle=solid, fillcolor=" + this.parseColor(f) + ", opacity=" + g.toFixed(5) + "]";
            d += "(" + h.join(",") + "){" + e + "}{" + j + "}{" + i + "}\n"
        }
        return d
    },
    addPoint: function (f) {
        var d = "\\psdot[linecolor=" + this.parseColor(f.visProp.strokecolor) + ",dotstyle=",
            g = f.normalizeFace(f.visProp.face) || "o",
            e = f.visProp.size > 4 ? 4 : f.visProp.size,
            h = [0, 0, "2pt 2", "5pt 2", "5pt 3"];
        if (g == "x") {
            d += "x, dotsize=" + h[e]
        } else {
            if (g == "o") {
                d += "*, dotsize=";
                if (e == 1) {
                    d += "2pt 2"
                } else {
                    if (e == 2) {
                        d += "4pt 2"
                    } else {
                        if (e == 3) {
                            d += "6pt 2"
                        } else {
                            if (e == 4) {
                                d += "6pt 3"
                            }
                        }
                    }
                }
            } else {
                if (g == "[]") {
                    d += "square*, dotsize=" + h[e]
                } else {
                    if (g == "+") {
                        d += "+, dotsize=" + h[e]
                    }
                }
            }
        }
        d += "](" + f.coords.usrCoords.slice(1).join(",") + ")\n";
        d += "\\rput(" + (f.coords.usrCoords[1] + 15 / f.board.unitY) + "," + (f.coords.usrCoords[2] + 15 / f.board.unitY) + "){\\small $" + f.name + "$}\n";
        return d
    },
    addLine: function (g) {
        var f = new JXG.Coords(JXG.COORDS_BY_USER, g.point1.coords.usrCoords, g.board),
            e = new JXG.Coords(JXG.COORDS_BY_USER, g.point2.coords.usrCoords, g.board),
            d = "\\psline[linecolor=" + this.parseColor(g.visProp.strokecolor) + ", linewidth=" + g.visProp.strokewidth + "px]";
        if (g.visProp.straightfirst || g.visProp.straightlast) {
            JXG.Math.Geometry.calcStraight(g, f, e)
        }
        d += this.setArrows(g);
        d += "(" + f.usrCoords.slice(1).join(",") + ")(" + e.usrCoords.slice(2).join(",") + ")\n";
        return d
    },
    addCircle: function (f) {
        var e = f.Radius(),
            d = "\\pscircle[linecolor=" + this.parseColor(f.visProp.strokecolor) + ", linewidth=" + f.visProp.strokewidth + "px";
        if (f.visProp.fillcolor != "none" && f.visProp.fillopacity != 0) {
            d += ", fillstyle=solid, fillcolor=" + this.parseColor(f.visProp.fillcolor) + ", opacity=" + f.visProp.fillopacity.toFixed(5)
        }
        d += "](" + f.center.coords.usrCoords.slice(1).join("1") + "){" + e + "}\n";
        return d
    },
    addPolygon: function (f) {
        var d = "\\pspolygon[linestyle=none, fillstyle=solid, fillcolor=" + this.parseColor(f.visProp.fillcolor) + ", opacity=" + f.visProp.fillopacity.toFixed(5) + "]",
            e;
        for (e = 0; e < f.vertices.length; e++) {
            d += "(" + f.vertices[e].coords.usrCoords.slice(1).join(",") + ")"
        }
        d += "\n";
        return d
    },
    addArc: function (f) {
        var e = f.Radius(),
            h = {
                coords: new JXG.Coords(JXG.COORDS_BY_USER, [f.board.canvasWidth / (f.board.unitY), f.center.coords.usrCoords[2]], f.board)
            }, g = JXG.Math.Geometry.trueAngle(h, f.center, f.point2).toFixed(4),
            i = JXG.Math.Geometry.trueAngle(h, f.center, f.point3).toFixed(4),
            d = "\\psarc[linecolor=" + this.parseColor(f.visProp.strokecolor) + ", linewidth=" + f.visProp.strokewidth + "px]";
        d += this.setArrows(f);
        d += "(" + f.center.coords.usrCoords.slice(1).join(",") + "){" + e + "}{" + g + "}{" + i + "}\n";
        return d
    },
    addSector: function (e) {
        var d = e.Radius(),
            g = {
                coords: new JXG.Coords(JXG.COORDS_BY_USER, [e.board.canvasWidth / (e.board.unitY), e.point1.coords.usrCoords[2]], e.board)
            }, f = JXG.Math.Geometry.trueAngle(g, e.point1, e.point2).toFixed(4),
            h = JXG.Math.Geometry.trueAngle(g, e.point1, e.point3).toFixed(4);
        return this.drawWedge(e.visProp.fillcolor, e.visProp.fillopacity, e.point1.coords.usrCoords.slice(1), d, f, h)
    },
    addAngle: function (f) {
        var e = f.radius,
            h = {
                coords: new JXG.Coords(JXG.COORDS_BY_USER, [f.board.canvasWidth / (f.board.unitY), f.point2.coords.usrCoords[2]], f.board)
            }, g = JXG.Math.Geometry.trueAngle(h, f.point2, f.point1).toFixed(4),
            i = JXG.Math.Geometry.trueAngle(h, f.point2, f.point3).toFixed(4),
            d;
        d = this.drawWedge(f.visProp.fillcolor, f.visProp.fillopacity, f.point2.coords.usrCoords.slice(1), e, g, i);
        d += "\\psarc[linecolor=" + this.parseColor(f.visProp.strokecolor) + ", linewidth=" + f.visProp.strokewidth + "px]";
        d += "(" + f.point2.coords.usrCoords.slice(1).join(",") + "){" + e + "}{" + g + "}{" + i + "}\n";
        return d
    },
    parseColor: function (e) {
        var d = JXG.rgbParser(e);
        return "{[rgb]{" + d[0] / 255 + "," + d[1] / 255 + "," + d[2] / 255 + "}}"
    }
};
JXG.Server = function () {};
JXG.Server.modules = function () {};
JXG.Server.runningCalls = {};
JXG.Server.handleError = function (d) {
    alert("error occured, server says: " + d.message)
};
JXG.Server.callServer = function (h, o, i, m) {
    var n, e, l, g, d, j, f;
    m = m || false;
    g = "";
    for (f in i) {
        g += "&" + escape(f) + "=" + escape(i[f])
    }
    j = JXG.toJSON(i);
    do {
        d = h + Math.floor(Math.random() * 4096)
    } while (typeof this.runningCalls[d] != "undefined");
    this.runningCalls[d] = {
        action: h
    };
    if (typeof i.module != "undefined") {
        this.runningCalls[d].module = i.module
    }
    n = JXG.serverBase + "JXGServer.py";
    e = "action=" + escape(h) + "&id=" + d + "&dataJSON=" + escape(JXG.Util.Base64.encode(j));
    this.cbp = function (u) {
        var w, q, r, t, v, k, s, p;
        w = (new JXG.Util.Unzip(JXG.Util.Base64.decodeAsArray(u))).unzip();
        if (JXG.isArray(w) && w.length > 0) {
            w = w[0][0]
        }
        if (typeof w != "string") {
            return
        }
        q = window.JSON && window.JSON.parse ? window.JSON.parse(w) : (new Function("return " + w))();
        if (q.type == "error") {
            this.handleError(q)
        } else {
            if (q.type == "response") {
                k = q.id;
                for (s = 0; s < q.fields.length; s++) {
                    r = q.fields[s];
                    t = r.namespace + (typeof ((new Function("return " + r.namespace))()) == "object" ? "." : ".prototype.") + r.name + " = " + r.value;
                    (new Function(t))()
                }
                for (s = 0; s < q.handler.length; s++) {
                    r = q.handler[s];
                    v = [];
                    for (p = 0; p < r.parameters.length; p++) {
                        v[p] = '"' + r.parameters[p] + '": ' + r.parameters[p]
                    }
                    t = "if(typeof JXG.Server.modules." + this.runningCalls[k].module + ' == "undefined")JXG.Server.modules.' + this.runningCalls[k].module + " = {};";
                    t += "JXG.Server.modules." + this.runningCalls[k].module + "." + r.name + "_cb = " + r.callback + ";";
                    t += "JXG.Server.modules." + this.runningCalls[k].module + "." + r.name + " = function (" + r.parameters.join(",") + ', __JXGSERVER_CB__, __JXGSERVER_SYNC) {if(typeof __JXGSERVER_CB__ == "undefined") __JXGSERVER_CB__ = JXG.Server.modules.' + this.runningCalls[k].module + "." + r.name + "_cb;var __JXGSERVER_PAR__ = {" + v.join(",") + ', "module": "' + this.runningCalls[k].module + '", "handler": "' + r.name + '" };JXG.Server.callServer("exec", __JXGSERVER_CB__, __JXGSERVER_PAR__, __JXGSERVER_SYNC);};';
                    (new Function(t))()
                }
                delete this.runningCalls[k];
                o(q.data)
            }
        }
    };
    this.cb = JXG.bind(this.cbp, this);
    if (window.XMLHttpRequest) {
        l = new XMLHttpRequest();
        l.overrideMimeType("text/plain; charset=iso-8859-1")
    } else {
        l = new ActiveXObject("Microsoft.XMLHTTP")
    }
    if (l) {
        l.open("POST", n, !m);
        l.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        if (!m) {
            l.onreadystatechange = (function (k) {
                return function () {
                    switch (l.readyState) {
                        case 4:
                            if (l.status != 200) {} else {
                                k(l.responseText)
                            }
                            break;
                        default:
                            return false;
                            break
                    }
                }
            })(this.cb)
        }
        l.send(e);
        if (m) {
            this.cb(l.responseText)
        }
    } else {
        return false
    }
};
JXG.Server.loadModule_cb = function (e) {
    var d;
    for (d = 0; d < e.length; d++) {
        alert(e[d].name + ": " + e[d].value)
    }
};
JXG.Server.loadModule = function (d) {
    return JXG.Server.callServer("load", JXG.Server.loadModule_cb, {
        module: d
    }, true)
};
JXG.Server.load = JXG.Server.loadModule;
JXG.DataSource = function () {
    this.data = [];
    this.columnHeaders = [];
    this.rowHeaders = [];
    return this
};
JXG.extend(JXG.DataSource.prototype, {
    loadFromArray: function (h, k, g) {
        var f, e, d;
        if (typeof k == "undefined") {
            k = false
        }
        if (typeof g == "undefined") {
            g = false
        }
        if (JXG.isArray(k)) {
            this.columnHeaders = k;
            k = false
        }
        if (JXG.isArray(g)) {
            this.rowHeaders = g;
            g = false
        }
        this.data = [];
        if (k) {
            this.columnHeaders = []
        }
        if (g) {
            this.rowHeaders = []
        }
        if (typeof h != "undefined") {
            this.data = new Array(h.length);
            for (f = 0; f < h.length; f++) {
                this.data[f] = new Array(h[f].length);
                for (e = 0; e < h[f].length; e++) {
                    d = h[f][e];
                    if ("" + parseFloat(d) == d) {
                        this.data[f][e] = parseFloat(d)
                    } else {
                        if (d != "-") {
                            this.data[f][e] = d
                        } else {
                            this.data[f][e] = NaN
                        }
                    }
                }
            }
            if (k) {
                this.columnHeaders = this.data[0].slice(1);
                this.data = this.data.slice(1)
            }
            if (g) {
                this.rowHeaders = new Array();
                for (f = 0; f < this.data.length; f++) {
                    this.rowHeaders.push(this.data[f][0]);
                    this.data[f] = this.data[f].slice(1)
                }
            }
        }
        return this
    },
    loadFromTable: function (m, f, k) {
        var n, h, g, e, l, d;
        if (typeof f == "undefined") {
            f = false
        }
        if (typeof k == "undefined") {
            k = false
        }
        if (JXG.isArray(f)) {
            this.columnHeaders = f;
            f = false
        }
        if (JXG.isArray(k)) {
            this.rowHeaders = k;
            k = false
        }
        this.data = [];
        if (f) {
            this.columnHeaders = []
        }
        if (k) {
            this.rowHeaders = []
        }
        m = document.getElementById(m);
        if (typeof m != "undefined") {
            n = m.getElementsByTagName("tr");
            this.data = new Array(n.length);
            for (h = 0; h < n.length; h++) {
                e = n[h].getElementsByTagName("td");
                this.data[h] = new Array(e.length);
                for (g = 0; g < e.length; g++) {
                    l = e[g].innerHTML;
                    if ("" + parseFloat(l) == l) {
                        this.data[h][g] = parseFloat(l)
                    } else {
                        if (l != "-") {
                            this.data[h][g] = l
                        } else {
                            this.data[h][g] = NaN
                        }
                    }
                }
            }
            if (f) {
                this.columnHeaders = this.data[0].slice(1);
                this.data = this.data.slice(1)
            }
            if (k) {
                this.rowHeaders = new Array();
                for (h = 0; h < this.data.length; h++) {
                    this.rowHeaders.push(this.data[h][0]);
                    this.data[h] = this.data[h].slice(1)
                }
            }
        }
        return this
    },
    addColumn: function (d, f, e) {},
    addRow: function (d, f, e) {},
    getColumn: function (e) {
        var d = new Array(this.data.length),
            f;
        if (typeof e == "string") {
            for (f = 0; f < this.columnHeaders.length; f++) {
                if (e == this.columnHeaders[f]) {
                    e = f;
                    break
                }
            }
        }
        for (f = 0; f < this.data.length; f++) {
            if (this.data[f].length > e) {
                d[f] = parseFloat(this.data[f][e])
            }
        }
        return d
    },
    getRow: function (f) {
        var d, e;
        if (typeof f == "string") {
            for (e = 0; e < this.rowHeaders.length; e++) {
                if (f == this.rowHeaders[e]) {
                    f = e;
                    break
                }
            }
        }
        d = new Array(this.data[f].length);
        for (e = 0; e < this.data[f].length; e++) {
            d[e] = this.data[f][e]
        }
        return d
    }
});
JXG.JessieCode = function (f, e) {
    var d;
    this.sstack = [{}];
    this.scope = 0;
    this.pstack = [
        []
    ];
    this.dpstack = [
        []
    ];
    this.pscope = 0;
    this.propstack = [{}];
    this.propscope = 0;
    this.propobj = 0;
    this.lhs = [];
    this.isLHS = false;
    this.warnLog = "jcwarn";
    this.builtIn = this.defineBuiltIn();
    this.board = null;
    this.lineToElement = {};
    this.countLines = true;
    this.parCurLine = 1;
    this.parCurColumn = 0;
    this.line = 1;
    this.col = 1;
    this.maxRuntime = 10000;
    if (typeof f === "string") {
        this.parse(f)
    }
};
JXG.extend(JXG.JessieCode.prototype, {
    node: function (e, f, d) {
        return {
            type: e,
            value: f,
            children: d
        }
    },
    createNode: function (f, g, e) {
        var h = this.node(f, g, []),
            d;
        for (d = 2; d < arguments.length; d++) {
            h.children.push(arguments[d])
        }
        h.line = this.parCurLine;
        h.col = this.parCurColumn;
        return h
    },
    getElementById: function (d) {
        return this.board.objects[d]
    },
    creator: (function () {
        var e = {}, d;
        d = function (h) {
            var g;
            if (typeof e[this.board.id + h] === "function") {
                return e[this.board.id + h]
            } else {
                g = (function (f) {
                    return function (k, j) {
                        var i;
                        if (JXG.exists(j)) {
                            i = j
                        } else {
                            i = {
                                name: (f.lhs[f.scope] !== 0 ? f.lhs[f.scope] : "")
                            }
                        }
                        return f.board.create(h, k, i)
                    }
                })(this);
                g.creator = true;
                e[this.board.id + h] = g;
                return g
            }
        };
        d.clearCache = function () {
            e = {}
        };
        return d
    })(),
    letvar: function (e, d) {
        if (this.builtIn[e]) {
            this._warn('"' + e + '" is a predefined value.')
        }
        this.sstack[this.scope][e] = d
    },
    isLocalVariable: function (e) {
        var d;
        for (d = this.scope; d > -1; d--) {
            if (JXG.exists(this.sstack[d][e])) {
                return d
            }
        }
        return -1
    },
    isCreator: function (d) {
        return !!JXG.JSXGraph.elements[d]
    },
    isMathMethod: function (d) {
        return d !== "E" && !! Math[d]
    },
    isBuiltIn: function (d) {
        return !!this.builtIn[d]
    },
    getvar: function (g, d) {
        var f, e;
        d = JXG.def(d, false);
        f = this.isLocalVariable(g);
        if (f > -1) {
            return this.sstack[f][g]
        }
        if (this.isCreator(g)) {
            return this.creator(g)
        }
        if (this.isMathMethod(g)) {
            return Math[g]
        }
        if (this.isBuiltIn(g)) {
            return this.builtIn[g]
        }
        if (!d) {
            f = JXG.getRef(this.board, g);
            if (f !== g) {
                return f
            }
        }
        return e
    },
    getvarJS: function (g, d, f) {
        var e;
        d = JXG.def(d, false);
        f = JXG.def(f, false);
        if (JXG.indexOf(this.pstack[this.pscope], g) > -1) {
            return g
        }
        e = this.isLocalVariable(g);
        if (e > -1) {
            return "$jc$.sstack[" + e + "]['" + g + "']"
        }
        if (this.isCreator(g)) {
            return "(function () { var a = Array.prototype.slice.call(arguments, 0), props = " + (f ? "a.pop()" : "{}") + "; return $jc$.board.create.apply($jc$.board, ['" + g + "'].concat([a, props])); })"
        }
        if (this.isMathMethod(g)) {
            return "Math." + g
        }
        if (this.isBuiltIn(g)) {
            return this.builtIn[g].src || this.builtIn[g]
        }
        if (!d) {
            if (JXG.isId(this.board, g)) {
                return "$jc$.board.objects['" + g + "']"
            } else {
                if (JXG.isName(this.board, g)) {
                    return "$jc$.board.elementsByName['" + g + "']"
                } else {
                    if (JXG.isGroup(this.board, g)) {
                        return "$jc$.board.groups['" + g + "']"
                    }
                }
            }
        }
        return ""
    },
    setProp: function (h, g, f) {
        var e = {}, d, i;
        if (h.elementClass === JXG.OBJECT_CLASS_POINT && (g === "X" || g === "Y")) {
            g = g.toLowerCase();
            if (h.isDraggable && typeof f === "number") {
                d = g === "x" ? f : h.X();
                i = g === "y" ? f : h.Y();
                h.setPosition(JXG.COORDS_BY_USER, [d, i])
            } else {
                if (h.isDraggable && (typeof f === "function" || typeof f === "string")) {
                    d = g === "x" ? f : h.coords.usrCoords[1];
                    i = g === "y" ? f : h.coords.usrCoords[2];
                    h.addConstraint([d, i])
                } else {
                    if (!h.isDraggable) {
                        d = g === "x" ? f : h.XEval.origin;
                        i = g === "y" ? f : h.YEval.origin;
                        h.addConstraint([d, i])
                    }
                }
            }
            this.board.update()
        } else {
            if (h.type === JXG.OBJECT_TYPE_TEXT && (g === "X" || g === "Y")) {
                if (typeof f === "number") {
                    h[g] = function () {
                        return f
                    }
                } else {
                    if (typeof f === "function") {
                        h.isDraggable = false;
                        h[g] = f
                    } else {
                        if (typeof f === "string") {
                            h.isDraggable = false;
                            h[g] = JXG.createFunction(f, this.board, null, true);
                            h[g + "jc"] = f
                        }
                    }
                }
                h[g].origin = f;
                this.board.update()
            } else {
                if (h.type && h.elementClass && h.visProp) {
                    e[g] = f;
                    h.setProperty(e)
                } else {
                    h[g] = f
                }
            }
        }
    },
    utf8_encode: function (e) {
        var d = [],
            g, f;
        for (g = 0; g < e.length; g++) {
            f = e.charCodeAt(g);
            if (f < 128) {
                d.push(String.fromCharCode(f))
            } else {
                d.push("&#x" + f.toString(16) + ";")
            }
        }
        return d.join("")
    },
    parse: function (d, n) {
        var o = 0,
            p = [],
            e = [],
            m = this,
            r, k = ["Abs", "ACos", "ASin", "ATan", "Ceil", "Cos", "Exp", "Factorial", "Floor", "Log", "Max", "Min", "Random", "Round", "Sin", "Sqrt", "Tan", "Trunc", "If", "Deg", "Rad", "Dist"],
            q, l = d.replace(/\r\n/g, "\n").split("\n"),
            h, g, f = [];
        if (!JXG.exists(n)) {
            n = false
        }
        for (h = 0; h < l.length; h++) {
            if (!(JXG.trim(l[h])[0] === "/" && JXG.trim(l[h])[1] === "/")) {
                if (n) {
                    for (g = 0; g < k.length; g++) {
                        q = new RegExp(k[g] + "\\(", "g");
                        l[h] = l[h].replace(q, k[g].toLowerCase() + "(")
                    }
                }
                f.push(l[h])
            } else {
                f.push("")
            }
        }
        d = f.join("\n");
        d = this.utf8_encode(d);
        if ((o = this._parse(d, p, e)) > 0) {
            for (h = 0; h < o; h++) {
                this.line = p[h].line;
                this._error("Parse error in line " + p[h].line + " near >" + d.substr(p[h].offset, 30) + '<, expecting "' + e[h].join() + '"')
            }
        }
    },
    snippet: function (i, f, e, h) {
        var j, k, g, d;
        j = "jxg__tmp__intern_" + JXG.Util.genUUID().replace(/\-/g, "");
        if (!JXG.exists(f)) {
            f = true
        }
        if (!JXG.exists(e)) {
            e = ""
        }
        if (!JXG.exists(h)) {
            h = false
        }
        g = this.sstack[0][j];
        this.countLines = false;
        k = j + " = " + (f ? " function (" + e + ") { return " : "") + i + (f ? "; }" : "") + ";";
        this.parse(k, h);
        d = this.sstack[0][j];
        if (JXG.exists(g)) {
            this.sstack[0][j] = g
        } else {
            delete this.sstack[0][j]
        }
        this.countLines = true;
        return d
    },
    replaceIDs: function (f) {
        var e, d;
        if (f.replaced) {
            d = this.board.objects[f.children[1].children[0].value];
            if (JXG.exists(d) && JXG.exists(d) && d.name !== "") {
                f.type = "node_var";
                f.value = d.name;
                f.children.length = 0;
                delete f.replaced
            }
        }
        if (f.children) {
            for (e = f.children.length; e > 0; e--) {
                if (JXG.exists(f.children[e - 1])) {
                    f.children[e - 1] = this.replaceIDs(f.children[e - 1])
                }
            }
        }
        return f
    },
    replaceNames: function (f) {
        var e, d;
        d = f.value;
        if (f.type == "node_op" && d == "op_lhs" && f.children.length === 1) {
            this.isLHS = true
        } else {
            if (f.type == "node_var") {
                if (this.isLHS) {
                    this.letvar(d, true)
                } else {
                    if (!JXG.exists(this.getvar(d, true)) && JXG.exists(this.board.elementsByName[d])) {
                        f = this.createReplacementNode(f)
                    }
                }
            }
        }
        if (f.children) {
            for (e = f.children.length; e > 0; e--) {
                if (JXG.exists(f.children[e - 1])) {
                    f.children[e - 1] = this.replaceNames(f.children[e - 1])
                }
            }
        }
        if (f.type == "node_op" && f.value == "op_lhs" && f.children.length === 1) {
            this.isLHS = false
        }
        return f
    },
    createReplacementNode: function (f) {
        var d = f.value,
            e = this.board.elementsByName[d];
        f = this.createNode("node_op", "op_execfun", this.createNode("node_var", "$"), this.createNode("node_op", "op_param", this.createNode("node_str", e.id)));
        f.replaced = true;
        return f
    },
    collectDependencies: function (h, d) {
        var g, f, j;
        f = h.value;
        if (h.type == "node_var") {
            j = this.getvar(f);
            if (j && j.visProp && j.type && j.elementClass && j.id) {
                d[j.id] = j
            }
        }
        if (h.type == "node_op" && h.value == "op_execfun" && h.children.length > 1 && h.children[0].value == "$" && h.children[1].children.length > 0) {
            j = h.children[1].children[0].value;
            d[j] = this.board.objects[j]
        }
        if (h.children) {
            for (g = h.children.length; g > 0; g--) {
                if (JXG.exists(h.children[g - 1])) {
                    this.collectDependencies(h.children[g - 1], d)
                }
            }
        }
    },
    resolveProperty: function (g, d, f) {
        f = JXG.def(f, false);
        if (g && g.methodMap) {
            if (d === "label") {
                g = g.label;
                d = "content"
            } else {
                if (JXG.exists(g.subs) && JXG.exists(g.subs[d])) {
                    g = g.subs
                } else {
                    if (JXG.exists(g.methodMap[d])) {
                        d = g.methodMap[d]
                    } else {
                        g = g.visProp;
                        d = d.toLowerCase()
                    }
                }
            }
        }
        if (!JXG.exists(g)) {
            this._error(g + " is not an object")
        }
        if (!JXG.exists(g[d])) {
            this._error("unknown property " + d)
        }
        if (f && typeof g[d] === "function") {
            return function () {
                return g[d].apply(g, arguments)
            }
        }
        return g[d]
    },
    execute: function (node) {
        var ret, v, i, e, parents = [];
        ret = 0;
        if (this.cancel) {
            this._error("Max runtime exceeded")
        }
        if (!node) {
            return ret
        }
        this.line = node.line;
        this.col = node.col;
        switch (node.type) {
            case "node_op":
                switch (node.value) {
                    case "op_none":
                        if (node.children[0]) {
                            this.execute(node.children[0])
                        }
                        if (node.children[1]) {
                            ret = this.execute(node.children[1])
                        }
                        break;
                    case "op_assign":
                        v = this.execute(node.children[0]);
                        this.lhs[this.scope] = v[1];
                        if (v[0].type && v[0].elementClass && v[0].methodMap && v[1] === "label") {
                            this._error("Left-hand side of assignment is read-only.")
                        }
                        if (v[0] !== this.sstack[this.scope] || (JXG.isArray(v[0]) && typeof v[1] === "number")) {
                            this.setProp(v[0], v[1], this.execute(node.children[1]))
                        } else {
                            this.letvar(v[1], this.execute(node.children[1]))
                        }
                        this.lhs[this.scope] = 0;
                        break;
                    case "op_noassign":
                        ret = this.execute(node.children[0]);
                        break;
                    case "op_if":
                        if (this.execute(node.children[0])) {
                            ret = this.execute(node.children[1])
                        }
                        break;
                    case "op_if_else":
                        if (this.execute(node.children[0])) {
                            ret = this.execute(node.children[1])
                        } else {
                            ret = this.execute(node.children[2])
                        }
                        break;
                    case "op_while":
                        while (this.execute(node.children[0])) {
                            this.execute(node.children[1])
                        }
                        break;
                    case "op_do":
                        do {
                            this.execute(node.children[0])
                        } while (this.execute(node.children[1]));
                        break;
                    case "op_for":
                        for (this.execute(node.children[0]); this.execute(node.children[1]); this.execute(node.children[2])) {
                            this.execute(node.children[3])
                        }
                        break;
                    case "op_param":
                        if (node.children[1]) {
                            this.execute(node.children[1])
                        }
                        ret = node.children[0];
                        this.pstack[this.pscope].push(ret);
                        if (this.dpstack[this.pscope]) {
                            this.dpstack[this.pscope].push({
                                line: node.children[0].line,
                                col: node.children[0].col
                            })
                        }
                        break;
                    case "op_paramdef":
                        if (node.children[1]) {
                            this.execute(node.children[1])
                        }
                        ret = node.children[0];
                        this.pstack[this.pscope].push(ret);
                        break;
                    case "op_proplst":
                        if (node.children[0]) {
                            this.execute(node.children[0])
                        }
                        if (node.children[1]) {
                            this.execute(node.children[1])
                        }
                        break;
                    case "op_proplst_val":
                        this.propstack.push({});
                        this.propscope++;
                        this.execute(node.children[0]);
                        ret = this.propstack[this.propscope];
                        this.propstack.pop();
                        this.propscope--;
                        break;
                    case "op_prop":
                        this.propstack[this.propscope][node.children[0]] = this.execute(node.children[1]);
                        break;
                    case "op_array":
                        var l;
                        this.pstack.push([]);
                        this.pscope++;
                        this.execute(node.children[0]);
                        ret = [];
                        l = this.pstack[this.pscope].length;
                        for (i = 0; i < l; i++) {
                            ret.push(this.execute(this.pstack[this.pscope][i]))
                        }
                        this.pstack.pop();
                        this.pscope--;
                        break;
                    case "op_extvalue":
                        var undef;
                        ret = this.execute(node.children[0]);
                        i = this.execute(node.children[1]);
                        if (typeof i === "number" && Math.abs(Math.round(i) - i) < JXG.Math.eps) {
                            ret = ret[i]
                        } else {
                            ret = undef
                        }
                        break;
                    case "op_return":
                        if (this.scope === 0) {
                            this._error("Unexpected return.")
                        } else {
                            return this.execute(node.children[0])
                        }
                        break;
                    case "op_function":
                        this.pstack.push([]);
                        this.pscope++;
                        this.execute(node.children[0]);
                        if (this.board.options.jc.compile) {
                            this.sstack.push({});
                            this.scope++;
                            this.isLHS = false;
                            for (i = 0; i < this.pstack[this.pscope].length; i++) {
                                this.sstack[this.scope][this.pstack[this.pscope][i]] = this.pstack[this.pscope][i]
                            }
                            this.replaceNames(node.children[1]);
                            ret = (function ($jc$) {
                                var p = $jc$.pstack[$jc$.pscope].join(", "),
                                    str = "var f = function (" + p + ") {\n$jc$.sstack.push([]);\n$jc$.scope++;\nvar r = (function () {\n" + $jc$.compile(node.children[1], true) + "})();\n$jc$.sstack.pop();\n$jc$.scope--;\nreturn r;\n}; f;";
                                try {
                                    return eval(str)
                                } catch (e) {
                                    this._error("catch errors. super simple stuff.", str, e.toString());
                                    return function () {}
                                }
                            })(this);
                            this.sstack.pop();
                            this.scope--
                        } else {
                            ret = (function (_pstack, that) {
                                return function () {
                                    var r;
                                    that.sstack.push({});
                                    that.scope++;
                                    for (r = 0; r < _pstack.length; r++) {
                                        that.sstack[that.scope][_pstack[r]] = arguments[r]
                                    }
                                    r = that.execute(node.children[1]);
                                    that.sstack.pop();
                                    that.scope--;
                                    return r
                                }
                            })(this.pstack[this.pscope], this)
                        }
                        ret.node = node;
                        ret.toJS = ret.toString;
                        ret.toString = (function (_that) {
                            return function () {
                                return _that.compile(_that.replaceIDs(JXG.deepCopy(node)))
                            }
                        })(this);
                        ret.deps = {};
                        this.collectDependencies(node.children[1], ret.deps);
                        this.pstack.pop();
                        this.pscope--;
                        break;
                    case "op_execfun":
                        var fun, attr, sc;
                        this.pstack.push([]);
                        this.dpstack.push([]);
                        this.pscope++;
                        this.execute(node.children[1]);
                        if (typeof node.children[2] !== "undefined") {
                            if (node.children[3]) {
                                this.pstack.push([]);
                                this.dpstack.push([]);
                                this.pscope++;
                                this.execute(node.children[2]);
                                attr = {};
                                for (i = 0; i < this.pstack[this.pscope].length; i++) {
                                    attr = JXG.deepCopy(attr, this.execute(this.pstack[this.pscope][i]), true)
                                }
                                this.pscope--;
                                this.pstack.pop();
                                this.dpstack.pop()
                            } else {
                                attr = this.execute(node.children[2])
                            }
                        }
                        fun = this.execute(node.children[0]);
                        if (fun && fun.sc) {
                            sc = fun.sc
                        } else {
                            sc = this
                        }
                        for (i = 0; i < this.pstack[this.pscope].length; i++) {
                            parents[i] = this.execute(this.pstack[this.pscope][i])
                        }
                        if (typeof fun === "function" && !fun.creator) {
                            ret = fun.apply(sc, parents)
                        } else {
                            if (typeof fun === "function" && !! fun.creator) {
                                e = this.line;
                                try {
                                    ret = fun(parents, attr);
                                    ret.jcLineStart = e;
                                    ret.jcLineEnd = node.line;
                                    for (i = e; i <= node.line; i++) {
                                        this.lineToElement[i] = ret
                                    }
                                    ret.debugParents = this.dpstack[this.pscope]
                                } catch (ex) {
                                    this._error(ex.toString(), e)
                                }
                            } else {
                                this._error("Function '" + fun + "' is undefined.")
                            }
                        }
                        this.pstack.pop();
                        this.dpstack.pop();
                        this.pscope--;
                        break;
                    case "op_property":
                        e = this.execute(node.children[0]);
                        v = node.children[1];
                        ret = this.resolveProperty(e, v, false);
                        if (JXG.exists(ret)) {
                            ret.sc = e
                        }
                        break;
                    case "op_lhs":
                        v = node.children[0];
                        if (v.children && v.type && v.value) {
                            v = this.execute(v)
                        }
                        if (node.children.length === 1) {
                            e = this.sstack[this.scope]
                        } else {
                            e = this.execute(node.children[1]);
                            if (e.type && e.elementClass && v.toLowerCase && v.toLowerCase() !== "x" && v.toLowerCase() !== "y") {
                                v = v.toLowerCase()
                            }
                        }
                        ret = [e, v];
                        break;
                    case "op_use":
                        var found = false;
                        for (var b in JXG.JSXGraph.boards) {
                            if (JXG.JSXGraph.boards[b].container === node.children[0].toString()) {
                                this.use(JXG.JSXGraph.boards[b]);
                                found = true
                            }
                        }
                        if (!found) {
                            this._error("Board '" + node.children[0].toString() + "' not found!")
                        }
                        break;
                    case "op_delete":
                        v = this.getvar(node.children[0]);
                        if (typeof v === "object" && JXG.exists(v.type) && JXG.exists(v.elementClass)) {
                            this.board.removeObject(v)
                        }
                        break;
                    case "op_equ":
                        ret = this.execute(node.children[0]) == this.execute(node.children[1]);
                        break;
                    case "op_neq":
                        ret = this.execute(node.children[0]) != this.execute(node.children[1]);
                        break;
                    case "op_approx":
                        ret = Math.abs(this.execute(node.children[0]) - this.execute(node.children[1])) < JXG.Math.eps;
                        break;
                    case "op_grt":
                        ret = this.execute(node.children[0]) > this.execute(node.children[1]);
                        break;
                    case "op_lot":
                        ret = this.execute(node.children[0]) < this.execute(node.children[1]);
                        break;
                    case "op_gre":
                        ret = this.execute(node.children[0]) >= this.execute(node.children[1]);
                        break;
                    case "op_loe":
                        ret = this.execute(node.children[0]) <= this.execute(node.children[1]);
                        break;
                    case "op_or":
                        ret = this.execute(node.children[0]) || this.execute(node.children[1]);
                        break;
                    case "op_and":
                        ret = this.execute(node.children[0]) && this.execute(node.children[1]);
                        break;
                    case "op_not":
                        ret = !this.execute(node.children[0]);
                        break;
                    case "op_add":
                        ret = JXG.Math.Statistics.add(this.execute(node.children[0]), this.execute(node.children[1]));
                        break;
                    case "op_sub":
                        ret = JXG.Math.Statistics.subtract(this.execute(node.children[0]), this.execute(node.children[1]));
                        break;
                    case "op_div":
                        ret = JXG.Math.Statistics.div(this.execute(node.children[0]), this.execute(node.children[1]));
                        break;
                    case "op_mod":
                        ret = JXG.Math.Statistics.mod(this.execute(node.children[0]), this.execute(node.children[1]), true);
                        break;
                    case "op_mul":
                        ret = this.mul(this.execute(node.children[0]), this.execute(node.children[1]));
                        break;
                    case "op_exp":
                        ret = Math.pow(this.execute(node.children[0]), this.execute(node.children[1]));
                        break;
                    case "op_neg":
                        ret = this.execute(node.children[0]) * -1;
                        break
                }
                break;
            case "node_var":
                ret = this.getvar(node.value);
                break;
            case "node_const":
                ret = Number(node.value);
                break;
            case "node_const_bool":
                ret = node.value.toLowerCase() !== "false";
                break;
            case "node_str":
                ret = node.value;
                break
        }
        return ret
    },
    compile: function (h, k) {
        var f, g, j, d;
        f = "";
        if (!JXG.exists(k)) {
            k = false
        }
        if (!h) {
            return f
        }
        switch (h.type) {
            case "node_op":
                switch (h.value) {
                    case "op_none":
                        if (h.children[0]) {
                            f = this.compile(h.children[0], k)
                        }
                        if (h.children[1]) {
                            f += this.compile(h.children[1], k)
                        }
                        break;
                    case "op_assign":
                        j = this.compile(h.children[0], k);
                        if (k) {
                            if (JXG.isArray(j)) {
                                f = "$jc$.setProp(" + j[0] + ", '" + j[1] + "', " + this.compile(h.children[1], k) + ");\n"
                            } else {
                                if (this.isLocalVariable(j) !== this.scope) {
                                    this.sstack[this.scope][j] = true
                                }
                                f = "$jc$.sstack[" + this.scope + "]['" + j + "'] = " + this.compile(h.children[1], k) + ";\n"
                            }
                        } else {
                            f = j + " = " + this.compile(h.children[1], k) + ";\n"
                        }
                        break;
                    case "op_noassign":
                        f = this.compile(h.children[0], k) + ";\n";
                        break;
                    case "op_if":
                        f = " if (" + this.compile(h.children[0], k) + ") " + this.compile(h.children[1], k);
                        break;
                    case "op_if_else":
                        f = " if (" + this.compile(h.children[0], k) + ")" + this.compile(h.children[1], k);
                        f += " else " + this.compile(h.children[2], k);
                        break;
                    case "op_while":
                        f = " while (" + this.compile(h.children[0], k) + ") {\n" + this.compile(h.children[1], k) + "}\n";
                        break;
                    case "op_do":
                        f = " do {\n" + this.compile(h.children[0], k) + "} while (" + this.compile(h.children[1], k) + ");\n";
                        break;
                    case "op_for":
                        f = " for (" + this.compile(h.children[0], k) + "; " + this.compile(h.children[1], k) + "; " + this.compile(h.children[2], k) + ") {\n" + this.compile(h.children[3], k) + "\n}\n";
                        break;
                    case "op_param":
                        if (h.children[1]) {
                            f = this.compile(h.children[1], k) + ", "
                        }
                        f += this.compile(h.children[0], k);
                        break;
                    case "op_paramdef":
                        if (h.children[1]) {
                            f = this.compile(h.children[1], k) + ", "
                        }
                        f += h.children[0];
                        break;
                    case "op_proplst":
                        if (h.children[0]) {
                            f = this.compile(h.children[0], k) + ", "
                        }
                        f += this.compile(h.children[1], k);
                        break;
                    case "op_prop":
                        f = h.children[0] + ": " + this.compile(h.children[1], k);
                        break;
                    case "op_proplst_val":
                        f = this.compile(h.children[0], k);
                        break;
                    case "op_array":
                        f = "[" + this.compile(h.children[0], k) + "]";
                        break;
                    case "op_extvalue":
                        f = this.compile(h.children[0], k) + "[" + this.compile(h.children[1], k) + "]";
                        break;
                    case "op_return":
                        f = " return " + this.compile(h.children[0], k) + ";\n";
                        break;
                    case "op_function":
                        f = " function (" + this.compile(h.children[0], k) + ") {\n" + this.compile(h.children[1], k) + "}";
                        break;
                    case "op_execfun":
                        if (h.children[2]) {
                            j = (k ? "{" : "<<") + this.compile(h.children[2], k) + (k ? "}" : ">>")
                        }
                        h.children[0].withProps = !! h.children[2];
                        f = this.compile(h.children[0], k) + "(" + this.compile(h.children[1], k) + (h.children[2] ? ", " + j : "") + ")";
                        if (k && h.children[0].value === "$") {
                            f = "$jc$.board.objects[" + this.compile(h.children[1], k) + "]"
                        }
                        break;
                    case "op_property":
                        if (k && h.children[1] !== "X" && h.children[1] !== "Y") {
                            f = "$jc$.resolveProperty(" + this.compile(h.children[0], k) + ", '" + h.children[1] + "', true)"
                        } else {
                            f = this.compile(h.children[0], k) + "." + h.children[1]
                        }
                        break;
                    case "op_lhs":
                        if (h.children.length === 1) {
                            f = h.children[0]
                        } else {
                            if (h.children[2] === "dot") {
                                if (k) {
                                    f = [this.compile(h.children[1], k), h.children[0]]
                                } else {
                                    f = this.compile(h.children[1], k) + "." + h.children[0]
                                }
                            } else {
                                if (h.children[2] === "bracket") {
                                    if (k) {
                                        f = [this.compile(h.children[1], k), this.compile(h.children[0], k)]
                                    } else {
                                        f = this.compile(h.children[1], k) + "[" + this.compile(h.children[0], k) + "]"
                                    }
                                }
                            }
                        }
                        break;
                    case "op_use":
                        if (k) {
                            f = "$jc$.use(JXG.JSXGraph.boards['" + h.children[0] + "'])"
                        } else {
                            f = "use " + h.children[0] + ";"
                        }
                        break;
                    case "op_delete":
                        f = "delete " + h.children[0];
                        break;
                    case "op_equ":
                        f = "(" + this.compile(h.children[0], k) + " == " + this.compile(h.children[1], k) + ")";
                        break;
                    case "op_neq":
                        f = "(" + this.compile(h.children[0], k) + " != " + this.compile(h.children[1], k) + ")";
                        break;
                    case "op_approx":
                        f = "(" + this.compile(h.children[0], k) + " ~= " + this.compile(h.children[1], k) + ")";
                        break;
                    case "op_grt":
                        f = "(" + this.compile(h.children[0], k) + " > " + this.compile(h.children[1], k) + ")";
                        break;
                    case "op_lot":
                        f = "(" + this.compile(h.children[0], k) + " < " + this.compile(h.children[1], k) + ")";
                        break;
                    case "op_gre":
                        f = "(" + this.compile(h.children[0], k) + " >= " + this.compile(h.children[1], k) + ")";
                        break;
                    case "op_loe":
                        f = "(" + this.compile(h.children[0], k) + " <= " + this.compile(h.children[1], k) + ")";
                        break;
                    case "op_or":
                        f = "(" + this.compile(h.children[0], k) + " || " + this.compile(h.children[1], k) + ")";
                        break;
                    case "op_and":
                        f = "(" + this.compile(h.children[0], k) + " && " + this.compile(h.children[1], k) + ")";
                        break;
                    case "op_not":
                        f = "!(" + this.compile(h.children[0], k) + ")";
                        break;
                    case "op_add":
                        if (k) {
                            f = "JXG.Math.Statistics.add(" + this.compile(h.children[0], k) + ", " + this.compile(h.children[1], k) + ")"
                        } else {
                            f = "(" + this.compile(h.children[0], k) + " + " + this.compile(h.children[1], k) + ")"
                        }
                        break;
                    case "op_sub":
                        if (k) {
                            f = "JXG.Math.Statistics.subtract(" + this.compile(h.children[0], k) + ", " + this.compile(h.children[1], k) + ")"
                        } else {
                            f = "(" + this.compile(h.children[0], k) + " - " + this.compile(h.children[1], k) + ")"
                        }
                        break;
                    case "op_div":
                        if (k) {
                            f = "JXG.Math.Statistics.div(" + this.compile(h.children[0], k) + ", " + this.compile(h.children[1], k) + ")"
                        } else {
                            f = "(" + this.compile(h.children[0], k) + " / " + this.compile(h.children[1], k) + ")"
                        }
                        break;
                    case "op_mod":
                        if (k) {
                            f = "JXG.Math.mod(" + this.compile(h.children[0], k) + ", " + this.compile(h.children[1], k) + ", true)"
                        } else {
                            f = "(" + this.compile(h.children[0], k) + " % " + this.compile(h.children[1], k) + ")"
                        }
                        break;
                    case "op_mul":
                        if (k) {
                            f = "$jc$.mul(" + this.compile(h.children[0], k) + ", " + this.compile(h.children[1], k) + ")"
                        } else {
                            f = "(" + this.compile(h.children[0], k) + " * " + this.compile(h.children[1], k) + ")"
                        }
                        break;
                    case "op_exp":
                        if (k) {
                            f = "Math.pow(" + this.compile(h.children[0], k) + ", " + this.compile(h.children[1], k) + ")"
                        } else {
                            f = "(" + this.compile(h.children[0], k) + "^" + this.compile(h.children[1], k) + ")"
                        }
                        break;
                    case "op_neg":
                        f = "(-" + this.compile(h.children[0], k) + ")";
                        break
                }
                break;
            case "node_var":
                if (k) {
                    f = this.getvarJS(h.value, false, h.withProps)
                } else {
                    f = h.value
                }
                break;
            case "node_const":
                f = h.value;
                break;
            case "node_const_bool":
                f = h.value;
                break;
            case "node_str":
                f = "'" + h.value.replace(/'/g, "\\'") + "'";
                break
        }
        if (h.needsBrackets) {
            f = "{\n" + f + "}\n"
        }
        return f
    },
    X: function (d) {
        return d.X()
    },
    Y: function (d) {
        return d.Y()
    },
    V: function (d) {
        return d.Value()
    },
    L: function (d) {
        return d.L()
    },
    dist: function (e, d) {
        if (!JXG.exists(e) || !JXG.exists(e.Dist)) {
            this._error("Error: Can't calculate distance.")
        }
        return e.Dist(d)
    },
    mul: function (e, d) {
        if (JXG.isArray(e) * JXG.isArray(d)) {
            return JXG.Math.innerProduct(e, d, Math.min(e.length, d.length))
        } else {
            return JXG.Math.Statistics.multiply(e, d)
        }
    },
    use: function (d) {
        this.board = d;
        this.builtIn["$board"] = d;
        this.builtIn["$board"].src = "$jc$.board"
    },
    findSymbol: function (d, g) {
        var f, e;
        g = JXG.def(g, - 1);
        if (g === -1) {
            g = this.scope
        }
        for (f = g; f >= 0; f--) {
            for (e in this.sstack[f]) {
                if (this.sstack[f][e] === d) {
                    return [e, f]
                }
            }
        }
        return []
    },
    defineBuiltIn: function () {
        var d = this,
            e = {
                PI: Math.PI,
                EULER: Math.E,
                X: d.X,
                Y: d.Y,
                V: d.V,
                L: d.L,
                dist: d.dist,
                rad: JXG.Math.Geometry.rad,
                deg: JXG.Math.Geometry.trueAngle,
                factorial: JXG.Math.factorial,
                trunc: JXG.trunc,
                "$": d.getElementById,
                "$board": d.board
            };
        e.rad.sc = JXG.Math.Geometry;
        e.deg.sc = JXG.Math.Geometry;
        e.factorial.sc = JXG.Math;
        e.PI.src = "Math.PI";
        e.EULER.src = "Math.E";
        e.X.src = "$jc$.X";
        e.Y.src = "$jc$.Y";
        e.V.src = "$jc$.V";
        e.L.src = "$jc$.L";
        e.dist.src = "$jc$.dist";
        e.rad.src = "JXG.Math.Geometry.rad";
        e.deg.src = "JXG.Math.Geometry.trueAngle";
        e.factorial.src = "JXG.Math.factorial";
        e.trunc.src = "JXG.trunc";
        e["$"].src = "(function (n) { return JXG.getRef($jc$.board, n); })";
        if (e["$board"]) {
            e["$board"].src = "$jc$.board"
        }
        return e
    },
    _debug: function (d) {
        if (typeof console !== "undefined") {
            console.log(d)
        } else {
            if (document && document.getElementById("debug") !== null) {
                document.getElementById("debug").innerHTML += d + "<br />"
            }
        }
    },
    _error: function (f) {
        var d = new Error("Error(" + this.line + "): " + f);
        d.line = this.line;
        throw d
    },
    _warn: function (d) {
        if (typeof console !== "undefined") {
            console.log("Warning(" + this.line + "): " + d)
        } else {
            if (document && document.getElementById(this.warnLog) !== null) {
                document.getElementById(this.warnLog).innerHTML += "Warning(" + this.line + "): " + d + "<br />"
            }
        }
    },
    _log: function (d) {
        if (typeof window === "undefined" && typeof self !== "undefined" && self.postMessage) {
            self.postMessage({
                type: "log",
                msg: "Log: " + d.toString()
            })
        } else {
            console.log("Log: ", arguments)
        }
    }
});
JXG.extend(JXG.JessieCode.prototype, {
    _lex: function (d) {
        var h, e = -1,
            g = 0,
            j = 0,
            i, f;
        while (1) {
            h = 0;
            e = -1;
            g = 0;
            j = 0;
            i = d.offset + 1 + (g - j);
            do {
                i--;
                h = 0;
                e = -2;
                j = i;
                if (d.src.length <= j) {
                    return 67
                }
                do {
                    f = d.src.charCodeAt(i);
                    switch (h) {
                        case 0:
                            if ((f >= 9 && f <= 10) || f == 13 || f == 32) {
                                h = 1
                            } else {
                                if (f == 33) {
                                    h = 2
                                } else {
                                    if (f == 35) {
                                        h = 3
                                    } else {
                                        if (f == 36 || (f >= 65 && f <= 67) || (f >= 71 && f <= 72) || (f >= 74 && f <= 81) || f == 83 || f == 86 || (f >= 88 && f <= 90) || f == 95 || (f >= 97 && f <= 99) || (f >= 103 && f <= 104) || (f >= 106 && f <= 113) || f == 115 || f == 118 || (f >= 120 && f <= 122)) {
                                            h = 4
                                        } else {
                                            if (f == 37) {
                                                h = 5
                                            } else {
                                                if (f == 40) {
                                                    h = 6
                                                } else {
                                                    if (f == 41) {
                                                        h = 7
                                                    } else {
                                                        if (f == 42) {
                                                            h = 8
                                                        } else {
                                                            if (f == 43) {
                                                                h = 9
                                                            } else {
                                                                if (f == 44) {
                                                                    h = 10
                                                                } else {
                                                                    if (f == 45) {
                                                                        h = 11
                                                                    } else {
                                                                        if (f == 46) {
                                                                            h = 12
                                                                        } else {
                                                                            if (f == 47) {
                                                                                h = 13
                                                                            } else {
                                                                                if ((f >= 48 && f <= 57)) {
                                                                                    h = 14
                                                                                } else {
                                                                                    if (f == 58) {
                                                                                        h = 15
                                                                                    } else {
                                                                                        if (f == 59) {
                                                                                            h = 16
                                                                                        } else {
                                                                                            if (f == 60) {
                                                                                                h = 17
                                                                                            } else {
                                                                                                if (f == 61) {
                                                                                                    h = 18
                                                                                                } else {
                                                                                                    if (f == 62) {
                                                                                                        h = 19
                                                                                                    } else {
                                                                                                        if (f == 91) {
                                                                                                            h = 20
                                                                                                        } else {
                                                                                                            if (f == 93) {
                                                                                                                h = 21
                                                                                                            } else {
                                                                                                                if (f == 94) {
                                                                                                                    h = 22
                                                                                                                } else {
                                                                                                                    if (f == 123) {
                                                                                                                        h = 23
                                                                                                                    } else {
                                                                                                                        if (f == 124) {
                                                                                                                            h = 24
                                                                                                                        } else {
                                                                                                                            if (f == 125) {
                                                                                                                                h = 25
                                                                                                                            } else {
                                                                                                                                if (f == 38) {
                                                                                                                                    h = 48
                                                                                                                                } else {
                                                                                                                                    if (f == 68 || f == 100) {
                                                                                                                                        h = 49
                                                                                                                                    } else {
                                                                                                                                        if (f == 39) {
                                                                                                                                            h = 51
                                                                                                                                        } else {
                                                                                                                                            if (f == 73 || f == 105) {
                                                                                                                                                h = 52
                                                                                                                                            } else {
                                                                                                                                                if (f == 126) {
                                                                                                                                                    h = 53
                                                                                                                                                } else {
                                                                                                                                                    if (f == 70 || f == 102) {
                                                                                                                                                        h = 64
                                                                                                                                                    } else {
                                                                                                                                                        if (f == 85 || f == 117) {
                                                                                                                                                            h = 65
                                                                                                                                                        } else {
                                                                                                                                                            if (f == 69 || f == 101) {
                                                                                                                                                                h = 73
                                                                                                                                                            } else {
                                                                                                                                                                if (f == 84 || f == 116) {
                                                                                                                                                                    h = 74
                                                                                                                                                                } else {
                                                                                                                                                                    if (f == 87 || f == 119) {
                                                                                                                                                                        h = 80
                                                                                                                                                                    } else {
                                                                                                                                                                        if (f == 82 || f == 114) {
                                                                                                                                                                            h = 84
                                                                                                                                                                        } else {
                                                                                                                                                                            h = -1
                                                                                                                                                                        }
                                                                                                                                                                    }
                                                                                                                                                                }
                                                                                                                                                            }
                                                                                                                                                        }
                                                                                                                                                    }
                                                                                                                                                }
                                                                                                                                            }
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            break;
                        case 1:
                            h = -1;
                            e = 2;
                            g = i;
                            break;
                        case 2:
                            if (f == 61) {
                                h = 26
                            } else {
                                h = -1
                            }
                            e = 31;
                            g = i;
                            break;
                        case 3:
                            h = -1;
                            e = 41;
                            g = i;
                            break;
                        case 4:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 90) || f == 95 || (f >= 97 && f <= 122)) {
                                h = 4
                            } else {
                                h = -1
                            }
                            e = 45;
                            g = i;
                            break;
                        case 5:
                            h = -1;
                            e = 35;
                            g = i;
                            break;
                        case 6:
                            h = -1;
                            e = 38;
                            g = i;
                            break;
                        case 7:
                            h = -1;
                            e = 39;
                            g = i;
                            break;
                        case 8:
                            h = -1;
                            e = 36;
                            g = i;
                            break;
                        case 9:
                            h = -1;
                            e = 32;
                            g = i;
                            break;
                        case 10:
                            h = -1;
                            e = 40;
                            g = i;
                            break;
                        case 11:
                            h = -1;
                            e = 33;
                            g = i;
                            break;
                        case 12:
                            if ((f >= 48 && f <= 57)) {
                                h = 29
                            } else {
                                h = -1
                            }
                            e = 44;
                            g = i;
                            break;
                        case 13:
                            h = -1;
                            e = 34;
                            g = i;
                            break;
                        case 14:
                            if ((f >= 48 && f <= 57)) {
                                h = 14
                            } else {
                                if (f == 46) {
                                    h = 29
                                } else {
                                    h = -1
                                }
                            }
                            e = 47;
                            g = i;
                            break;
                        case 15:
                            h = -1;
                            e = 42;
                            g = i;
                            break;
                        case 16:
                            h = -1;
                            e = 20;
                            g = i;
                            break;
                        case 17:
                            if (f == 60) {
                                h = 30
                            } else {
                                if (f == 61) {
                                    h = 31
                                } else {
                                    h = -1
                                }
                            }
                            e = 28;
                            g = i;
                            break;
                        case 18:
                            if (f == 61) {
                                h = 32
                            } else {
                                h = -1
                            }
                            e = 21;
                            g = i;
                            break;
                        case 19:
                            if (f == 61) {
                                h = 33
                            } else {
                                if (f == 62) {
                                    h = 34
                                } else {
                                    h = -1
                                }
                            }
                            e = 27;
                            g = i;
                            break;
                        case 20:
                            h = -1;
                            e = 16;
                            g = i;
                            break;
                        case 21:
                            h = -1;
                            e = 17;
                            g = i;
                            break;
                        case 22:
                            h = -1;
                            e = 37;
                            g = i;
                            break;
                        case 23:
                            h = -1;
                            e = 18;
                            g = i;
                            break;
                        case 24:
                            if (f == 124) {
                                h = 37
                            } else {
                                h = -1
                            }
                            e = 43;
                            g = i;
                            break;
                        case 25:
                            h = -1;
                            e = 19;
                            g = i;
                            break;
                        case 26:
                            h = -1;
                            e = 23;
                            g = i;
                            break;
                        case 27:
                            h = -1;
                            e = 30;
                            g = i;
                            break;
                        case 28:
                            h = -1;
                            e = 46;
                            g = i;
                            break;
                        case 29:
                            if ((f >= 48 && f <= 57)) {
                                h = 29
                            } else {
                                h = -1
                            }
                            e = 48;
                            g = i;
                            break;
                        case 30:
                            h = -1;
                            e = 14;
                            g = i;
                            break;
                        case 31:
                            h = -1;
                            e = 25;
                            g = i;
                            break;
                        case 32:
                            h = -1;
                            e = 22;
                            g = i;
                            break;
                        case 33:
                            h = -1;
                            e = 26;
                            g = i;
                            break;
                        case 34:
                            h = -1;
                            e = 15;
                            g = i;
                            break;
                        case 35:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 90) || f == 95 || (f >= 97 && f <= 122)) {
                                h = 4
                            } else {
                                h = -1
                            }
                            e = 6;
                            g = i;
                            break;
                        case 36:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 90) || f == 95 || (f >= 97 && f <= 122)) {
                                h = 4
                            } else {
                                h = -1
                            }
                            e = 3;
                            g = i;
                            break;
                        case 37:
                            h = -1;
                            e = 29;
                            g = i;
                            break;
                        case 38:
                            h = -1;
                            e = 24;
                            g = i;
                            break;
                        case 39:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 90) || f == 95 || (f >= 97 && f <= 122)) {
                                h = 4
                            } else {
                                h = -1
                            }
                            e = 7;
                            g = i;
                            break;
                        case 40:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 90) || f == 95 || (f >= 97 && f <= 122)) {
                                h = 4
                            } else {
                                h = -1
                            }
                            e = 9;
                            g = i;
                            break;
                        case 41:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 90) || f == 95 || (f >= 97 && f <= 122)) {
                                h = 4
                            } else {
                                h = -1
                            }
                            e = 4;
                            g = i;
                            break;
                        case 42:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 90) || f == 95 || (f >= 97 && f <= 122)) {
                                h = 4
                            } else {
                                h = -1
                            }
                            e = 12;
                            g = i;
                            break;
                        case 43:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 90) || f == 95 || (f >= 97 && f <= 122)) {
                                h = 4
                            } else {
                                h = -1
                            }
                            e = 13;
                            g = i;
                            break;
                        case 44:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 90) || f == 95 || (f >= 97 && f <= 122)) {
                                h = 4
                            } else {
                                h = -1
                            }
                            e = 5;
                            g = i;
                            break;
                        case 45:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 90) || f == 95 || (f >= 97 && f <= 122)) {
                                h = 4
                            } else {
                                h = -1
                            }
                            e = 11;
                            g = i;
                            break;
                        case 46:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 90) || f == 95 || (f >= 97 && f <= 122)) {
                                h = 4
                            } else {
                                h = -1
                            }
                            e = 10;
                            g = i;
                            break;
                        case 47:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 90) || f == 95 || (f >= 97 && f <= 122)) {
                                h = 4
                            } else {
                                h = -1
                            }
                            e = 8;
                            g = i;
                            break;
                        case 48:
                            if (f == 38) {
                                h = 27
                            } else {
                                h = -1
                            }
                            break;
                        case 49:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 68) || (f >= 70 && f <= 78) || (f >= 80 && f <= 90) || f == 95 || (f >= 97 && f <= 100) || (f >= 102 && f <= 110) || (f >= 112 && f <= 122)) {
                                h = 4
                            } else {
                                if (f == 79 || f == 111) {
                                    h = 35
                                } else {
                                    if (f == 69 || f == 101) {
                                        h = 81
                                    } else {
                                        h = -1
                                    }
                                }
                            }
                            e = 45;
                            g = i;
                            break;
                        case 50:
                            if (f == 39) {
                                h = 28
                            } else {
                                if ((f >= 0 && f <= 38) || (f >= 40 && f <= 91) || (f >= 93 && f <= 254)) {
                                    h = 51
                                } else {
                                    if (f == 92) {
                                        h = 55
                                    } else {
                                        h = -1
                                    }
                                }
                            }
                            e = 46;
                            g = i;
                            break;
                        case 51:
                            if (f == 39) {
                                h = 28
                            } else {
                                if ((f >= 0 && f <= 38) || (f >= 40 && f <= 91) || (f >= 93 && f <= 254)) {
                                    h = 51
                                } else {
                                    if (f == 92) {
                                        h = 55
                                    } else {
                                        h = -1
                                    }
                                }
                            }
                            break;
                        case 52:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 69) || (f >= 71 && f <= 90) || f == 95 || (f >= 97 && f <= 101) || (f >= 103 && f <= 122)) {
                                h = 4
                            } else {
                                if (f == 70 || f == 102) {
                                    h = 36
                                } else {
                                    h = -1
                                }
                            }
                            e = 45;
                            g = i;
                            break;
                        case 53:
                            if (f == 61) {
                                h = 38
                            } else {
                                h = -1
                            }
                            break;
                        case 54:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 81) || (f >= 83 && f <= 90) || f == 95 || (f >= 97 && f <= 113) || (f >= 115 && f <= 122)) {
                                h = 4
                            } else {
                                if (f == 82 || f == 114) {
                                    h = 39
                                } else {
                                    h = -1
                                }
                            }
                            e = 45;
                            g = i;
                            break;
                        case 55:
                            if (f == 39) {
                                h = 50
                            } else {
                                if ((f >= 0 && f <= 38) || (f >= 40 && f <= 91) || (f >= 93 && f <= 254)) {
                                    h = 51
                                } else {
                                    if (f == 92) {
                                        h = 55
                                    } else {
                                        h = -1
                                    }
                                }
                            }
                            break;
                        case 56:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 68) || (f >= 70 && f <= 90) || f == 95 || (f >= 97 && f <= 100) || (f >= 102 && f <= 122)) {
                                h = 4
                            } else {
                                if (f == 69 || f == 101) {
                                    h = 40
                                } else {
                                    h = -1
                                }
                            }
                            e = 45;
                            g = i;
                            break;
                        case 57:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 68) || (f >= 70 && f <= 90) || f == 95 || (f >= 97 && f <= 100) || (f >= 102 && f <= 122)) {
                                h = 4
                            } else {
                                if (f == 69 || f == 101) {
                                    h = 41
                                } else {
                                    h = -1
                                }
                            }
                            e = 45;
                            g = i;
                            break;
                        case 58:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 68) || (f >= 70 && f <= 90) || f == 95 || (f >= 97 && f <= 100) || (f >= 102 && f <= 122)) {
                                h = 4
                            } else {
                                if (f == 69 || f == 101) {
                                    h = 42
                                } else {
                                    h = -1
                                }
                            }
                            e = 45;
                            g = i;
                            break;
                        case 59:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 68) || (f >= 70 && f <= 90) || f == 95 || (f >= 97 && f <= 100) || (f >= 102 && f <= 122)) {
                                h = 4
                            } else {
                                if (f == 69 || f == 101) {
                                    h = 43
                                } else {
                                    h = -1
                                }
                            }
                            e = 45;
                            g = i;
                            break;
                        case 60:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 68) || (f >= 70 && f <= 90) || f == 95 || (f >= 97 && f <= 100) || (f >= 102 && f <= 122)) {
                                h = 4
                            } else {
                                if (f == 69 || f == 101) {
                                    h = 44
                                } else {
                                    h = -1
                                }
                            }
                            e = 45;
                            g = i;
                            break;
                        case 61:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 68) || (f >= 70 && f <= 90) || f == 95 || (f >= 97 && f <= 100) || (f >= 102 && f <= 122)) {
                                h = 4
                            } else {
                                if (f == 69 || f == 101) {
                                    h = 45
                                } else {
                                    h = -1
                                }
                            }
                            e = 45;
                            g = i;
                            break;
                        case 62:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 77) || (f >= 79 && f <= 90) || f == 95 || (f >= 97 && f <= 109) || (f >= 111 && f <= 122)) {
                                h = 4
                            } else {
                                if (f == 78 || f == 110) {
                                    h = 46
                                } else {
                                    h = -1
                                }
                            }
                            e = 45;
                            g = i;
                            break;
                        case 63:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 77) || (f >= 79 && f <= 90) || f == 95 || (f >= 97 && f <= 109) || (f >= 111 && f <= 122)) {
                                h = 4
                            } else {
                                if (f == 78 || f == 110) {
                                    h = 47
                                } else {
                                    h = -1
                                }
                            }
                            e = 45;
                            g = i;
                            break;
                        case 64:
                            if ((f >= 48 && f <= 57) || (f >= 66 && f <= 78) || (f >= 80 && f <= 84) || (f >= 86 && f <= 90) || f == 95 || (f >= 98 && f <= 110) || (f >= 112 && f <= 116) || (f >= 118 && f <= 122)) {
                                h = 4
                            } else {
                                if (f == 79 || f == 111) {
                                    h = 54
                                } else {
                                    if (f == 65 || f == 97) {
                                        h = 75
                                    } else {
                                        if (f == 85 || f == 117) {
                                            h = 86
                                        } else {
                                            h = -1
                                        }
                                    }
                                }
                            }
                            e = 45;
                            g = i;
                            break;
                        case 65:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 82) || (f >= 84 && f <= 90) || f == 95 || (f >= 97 && f <= 114) || (f >= 116 && f <= 122)) {
                                h = 4
                            } else {
                                if (f == 83 || f == 115) {
                                    h = 56
                                } else {
                                    h = -1
                                }
                            }
                            e = 45;
                            g = i;
                            break;
                        case 66:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 82) || (f >= 84 && f <= 90) || f == 95 || (f >= 97 && f <= 114) || (f >= 116 && f <= 122)) {
                                h = 4
                            } else {
                                if (f == 83 || f == 115) {
                                    h = 57
                                } else {
                                    h = -1
                                }
                            }
                            e = 45;
                            g = i;
                            break;
                        case 67:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 84) || (f >= 86 && f <= 90) || f == 95 || (f >= 97 && f <= 116) || (f >= 118 && f <= 122)) {
                                h = 4
                            } else {
                                if (f == 85 || f == 117) {
                                    h = 58
                                } else {
                                    h = -1
                                }
                            }
                            e = 45;
                            g = i;
                            break;
                        case 68:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 82) || (f >= 84 && f <= 90) || f == 95 || (f >= 97 && f <= 114) || (f >= 116 && f <= 122)) {
                                h = 4
                            } else {
                                if (f == 83 || f == 115) {
                                    h = 59
                                } else {
                                    h = -1
                                }
                            }
                            e = 45;
                            g = i;
                            break;
                        case 69:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 75) || (f >= 77 && f <= 90) || f == 95 || (f >= 97 && f <= 107) || (f >= 109 && f <= 122)) {
                                h = 4
                            } else {
                                if (f == 76 || f == 108) {
                                    h = 60
                                } else {
                                    h = -1
                                }
                            }
                            e = 45;
                            g = i;
                            break;
                        case 70:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 83) || (f >= 85 && f <= 90) || f == 95 || (f >= 97 && f <= 115) || (f >= 117 && f <= 122)) {
                                h = 4
                            } else {
                                if (f == 84 || f == 116) {
                                    h = 61
                                } else {
                                    h = -1
                                }
                            }
                            e = 45;
                            g = i;
                            break;
                        case 71:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 81) || (f >= 83 && f <= 90) || f == 95 || (f >= 97 && f <= 113) || (f >= 115 && f <= 122)) {
                                h = 4
                            } else {
                                if (f == 82 || f == 114) {
                                    h = 62
                                } else {
                                    h = -1
                                }
                            }
                            e = 45;
                            g = i;
                            break;
                        case 72:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 78) || (f >= 80 && f <= 90) || f == 95 || (f >= 97 && f <= 110) || (f >= 112 && f <= 122)) {
                                h = 4
                            } else {
                                if (f == 79 || f == 111) {
                                    h = 63
                                } else {
                                    h = -1
                                }
                            }
                            e = 45;
                            g = i;
                            break;
                        case 73:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 75) || (f >= 77 && f <= 90) || f == 95 || (f >= 97 && f <= 107) || (f >= 109 && f <= 122)) {
                                h = 4
                            } else {
                                if (f == 76 || f == 108) {
                                    h = 66
                                } else {
                                    h = -1
                                }
                            }
                            e = 45;
                            g = i;
                            break;
                        case 74:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 81) || (f >= 83 && f <= 90) || f == 95 || (f >= 97 && f <= 113) || (f >= 115 && f <= 122)) {
                                h = 4
                            } else {
                                if (f == 82 || f == 114) {
                                    h = 67
                                } else {
                                    h = -1
                                }
                            }
                            e = 45;
                            g = i;
                            break;
                        case 75:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 75) || (f >= 77 && f <= 90) || f == 95 || (f >= 97 && f <= 107) || (f >= 109 && f <= 122)) {
                                h = 4
                            } else {
                                if (f == 76 || f == 108) {
                                    h = 68
                                } else {
                                    h = -1
                                }
                            }
                            e = 45;
                            g = i;
                            break;
                        case 76:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 72) || (f >= 74 && f <= 90) || f == 95 || (f >= 97 && f <= 104) || (f >= 106 && f <= 122)) {
                                h = 4
                            } else {
                                if (f == 73 || f == 105) {
                                    h = 69
                                } else {
                                    h = -1
                                }
                            }
                            e = 45;
                            g = i;
                            break;
                        case 77:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 68) || (f >= 70 && f <= 90) || f == 95 || (f >= 97 && f <= 100) || (f >= 102 && f <= 122)) {
                                h = 4
                            } else {
                                if (f == 69 || f == 101) {
                                    h = 70
                                } else {
                                    h = -1
                                }
                            }
                            e = 45;
                            g = i;
                            break;
                        case 78:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 84) || (f >= 86 && f <= 90) || f == 95 || (f >= 97 && f <= 116) || (f >= 118 && f <= 122)) {
                                h = 4
                            } else {
                                if (f == 85 || f == 117) {
                                    h = 71
                                } else {
                                    h = -1
                                }
                            }
                            e = 45;
                            g = i;
                            break;
                        case 79:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 72) || (f >= 74 && f <= 90) || f == 95 || (f >= 97 && f <= 104) || (f >= 106 && f <= 122)) {
                                h = 4
                            } else {
                                if (f == 73 || f == 105) {
                                    h = 72
                                } else {
                                    h = -1
                                }
                            }
                            e = 45;
                            g = i;
                            break;
                        case 80:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 71) || (f >= 73 && f <= 90) || f == 95 || (f >= 97 && f <= 103) || (f >= 105 && f <= 122)) {
                                h = 4
                            } else {
                                if (f == 72 || f == 104) {
                                    h = 76
                                } else {
                                    h = -1
                                }
                            }
                            e = 45;
                            g = i;
                            break;
                        case 81:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 75) || (f >= 77 && f <= 90) || f == 95 || (f >= 97 && f <= 107) || (f >= 109 && f <= 122)) {
                                h = 4
                            } else {
                                if (f == 76 || f == 108) {
                                    h = 77
                                } else {
                                    h = -1
                                }
                            }
                            e = 45;
                            g = i;
                            break;
                        case 82:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 83) || (f >= 85 && f <= 90) || f == 95 || (f >= 97 && f <= 115) || (f >= 117 && f <= 122)) {
                                h = 4
                            } else {
                                if (f == 84 || f == 116) {
                                    h = 78
                                } else {
                                    h = -1
                                }
                            }
                            e = 45;
                            g = i;
                            break;
                        case 83:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 83) || (f >= 85 && f <= 90) || f == 95 || (f >= 97 && f <= 115) || (f >= 117 && f <= 122)) {
                                h = 4
                            } else {
                                if (f == 84 || f == 116) {
                                    h = 79
                                } else {
                                    h = -1
                                }
                            }
                            e = 45;
                            g = i;
                            break;
                        case 84:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 68) || (f >= 70 && f <= 90) || f == 95 || (f >= 97 && f <= 100) || (f >= 102 && f <= 122)) {
                                h = 4
                            } else {
                                if (f == 69 || f == 101) {
                                    h = 82
                                } else {
                                    h = -1
                                }
                            }
                            e = 45;
                            g = i;
                            break;
                        case 85:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 66) || (f >= 68 && f <= 90) || f == 95 || (f >= 97 && f <= 98) || (f >= 100 && f <= 122)) {
                                h = 4
                            } else {
                                if (f == 67 || f == 99) {
                                    h = 83
                                } else {
                                    h = -1
                                }
                            }
                            e = 45;
                            g = i;
                            break;
                        case 86:
                            if ((f >= 48 && f <= 57) || (f >= 65 && f <= 77) || (f >= 79 && f <= 90) || f == 95 || (f >= 97 && f <= 109) || (f >= 111 && f <= 122)) {
                                h = 4
                            } else {
                                if (f == 78 || f == 110) {
                                    h = 85
                                } else {
                                    h = -1
                                }
                            }
                            e = 45;
                            g = i;
                            break
                    }
                    if (h > -1) {
                        if (f == 10) {
                            d.line++;
                            d.column = 0;
                            if (this.countLines) {
                                this.parCurLine = d.line
                            }
                        }
                        d.column++;
                        if (this.countLines) {
                            this.parCurColumn = d.column
                        }
                    }
                    i++
                } while (h > -1)
            } while (2 > -1 && e == 2);
            if (e > -1) {
                d.att = d.src.substr(j, g - j);
                d.offset = g;
                if (e == 46) {
                    d.att = d.att.substr(1, d.att.length - 2);
                    d.att = d.att.replace(/\\\'/g, "'")
                }
            } else {
                d.att = new String();
                e = -1
            }
            break
        }
        return e
    },
    _parse: function (d, j, g) {
        var s = [],
            r = [],
            k = 0,
            p, n, m, f = {
                la: 0,
                act: 0,
                offset: 0,
                src: d,
                att: "",
                line: 1,
                column: 1,
                error_step: 0
            };
        var l = new Array(new Array(0, 1), new Array(49, 2), new Array(49, 0), new Array(51, 2), new Array(51, 0), new Array(52, 3), new Array(52, 1), new Array(52, 0), new Array(54, 3), new Array(54, 1), new Array(54, 0), new Array(55, 3), new Array(56, 3), new Array(56, 1), new Array(56, 0), new Array(57, 3), new Array(57, 1), new Array(60, 3), new Array(50, 3), new Array(50, 5), new Array(50, 3), new Array(50, 5), new Array(50, 9), new Array(50, 3), new Array(50, 2), new Array(50, 2), new Array(50, 2), new Array(50, 2), new Array(50, 3), new Array(50, 1), new Array(59, 3), new Array(59, 4), new Array(59, 1), new Array(53, 3), new Array(53, 3), new Array(53, 3), new Array(53, 3), new Array(53, 3), new Array(53, 3), new Array(53, 3), new Array(53, 1), new Array(62, 3), new Array(62, 3), new Array(62, 2), new Array(62, 1), new Array(61, 3), new Array(61, 3), new Array(61, 1), new Array(63, 3), new Array(63, 3), new Array(63, 3), new Array(63, 1), new Array(65, 3), new Array(65, 1), new Array(64, 2), new Array(64, 2), new Array(64, 1), new Array(58, 4), new Array(58, 4), new Array(58, 5), new Array(58, 3), new Array(58, 1), new Array(66, 1), new Array(66, 1), new Array(66, 1), new Array(66, 3), new Array(66, 1), new Array(66, 7), new Array(66, 3), new Array(66, 3), new Array(66, 1), new Array(66, 1));
        var h = new Array(new Array(), new Array(3, 3, 5, 4, 6, 5, 7, 6, 9, 7, 11, 8, 10, 9, 18, 12, 20, 13, 45, 17, 31, 18, 47, 22, 48, 23, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30, 33, 32, 32, 33), new Array(), new Array(31, 18, 33, 32, 32, 33, 47, 22, 48, 23, 45, 37, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30), new Array(31, 18, 33, 32, 32, 33, 47, 22, 48, 23, 45, 37, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30), new Array(3, 3, 5, 4, 6, 5, 7, 6, 9, 7, 11, 8, 10, 9, 18, 12, 20, 13, 45, 17, 31, 18, 47, 22, 48, 23, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30, 33, 32, 32, 33), new Array(38, 40), new Array(45, 41), new Array(45, 42), new Array(3, 3, 5, 4, 6, 5, 7, 6, 9, 7, 11, 8, 10, 9, 18, 12, 20, 13, 45, 17, 31, 18, 47, 22, 48, 23, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30, 33, 32, 32, 33), new Array(20, 44), new Array(24, 45, 23, 46, 26, 47, 25, 48, 27, 49, 28, 50, 22, 51, 20, 52), new Array(), new Array(), new Array(21, 54), new Array(30, 55, 29, 56), new Array(44, 57, 38, 58, 16, 59, 37, 60), new Array(21, - 32), new Array(31, 18, 33, 32, 32, 33, 47, 22, 48, 23, 45, 37, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30), new Array(32, 62, 33, 63), new Array(), new Array(35, 64, 34, 65, 36, 66), new Array(), new Array(), new Array(31, 18, 33, 32, 32, 33, 47, 22, 48, 23, 45, 37, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30), new Array(), new Array(38, 68), new Array(45, 71), new Array(31, 18, 33, 32, 32, 33, 47, 22, 48, 23, 45, 37, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30), new Array(), new Array(), new Array(), new Array(47, 22, 48, 23, 45, 37, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30), new Array(47, 22, 48, 23, 45, 37, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30), new Array(), new Array(24, 45, 23, 46, 26, 47, 25, 48, 27, 49, 28, 50, 22, 51, 3, 3, 5, 4, 6, 5, 7, 6, 9, 7, 11, 8, 10, 9, 18, 12, 20, 13, 45, 17, 31, 18, 47, 22, 48, 23, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30, 33, 32, 32, 33), new Array(44, 77, 38, 58, 16, 78, 37, 60), new Array(), new Array(24, 45, 23, 46, 26, 47, 25, 48, 27, 49, 28, 50, 22, 51, 3, 3, 5, 4, 6, 5, 7, 6, 9, 7, 11, 8, 10, 9, 18, 12, 20, 13, 45, 17, 31, 18, 47, 22, 48, 23, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30, 33, 32, 32, 33), new Array(5, 80), new Array(45, 17, 47, 22, 48, 23, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30), new Array(20, 83), new Array(), new Array(), new Array(), new Array(31, 18, 33, 32, 32, 33, 47, 22, 48, 23, 45, 37, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30), new Array(31, 18, 33, 32, 32, 33, 47, 22, 48, 23, 45, 37, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30), new Array(31, 18, 33, 32, 32, 33, 47, 22, 48, 23, 45, 37, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30), new Array(31, 18, 33, 32, 32, 33, 47, 22, 48, 23, 45, 37, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30), new Array(31, 18, 33, 32, 32, 33, 47, 22, 48, 23, 45, 37, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30), new Array(31, 18, 33, 32, 32, 33, 47, 22, 48, 23, 45, 37, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30), new Array(31, 18, 33, 32, 32, 33, 47, 22, 48, 23, 45, 37, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30), new Array(), new Array(19, 91, 3, 3, 5, 4, 6, 5, 7, 6, 9, 7, 11, 8, 10, 9, 18, 12, 20, 13, 45, 17, 31, 18, 47, 22, 48, 23, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30, 33, 32, 32, 33), new Array(31, 18, 33, 32, 32, 33, 47, 22, 48, 23, 45, 37, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30), new Array(33, 32, 32, 33, 47, 22, 48, 23, 45, 37, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30), new Array(33, 32, 32, 33, 47, 22, 48, 23, 45, 37, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30), new Array(45, 96), new Array(31, 18, 33, 32, 32, 33, 47, 22, 48, 23, 45, 37, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30), new Array(33, 32, 32, 33, 47, 22, 48, 23, 45, 37, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30), new Array(47, 22, 48, 23, 45, 37, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30), new Array(30, 55, 29, 56), new Array(33, 32, 32, 33, 47, 22, 48, 23, 45, 37, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30), new Array(33, 32, 32, 33, 47, 22, 48, 23, 45, 37, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30), new Array(33, 32, 32, 33, 47, 22, 48, 23, 45, 37, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30), new Array(33, 32, 32, 33, 47, 22, 48, 23, 45, 37, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30), new Array(33, 32, 32, 33, 47, 22, 48, 23, 45, 37, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30), new Array(39, 105, 24, 45, 23, 46, 26, 47, 25, 48, 27, 49, 28, 50, 22, 51), new Array(45, 107), new Array(15, 108, 40, 109), new Array(), new Array(42, 110), new Array(17, 111, 40, 112), new Array(24, 45, 23, 46, 26, 47, 25, 48, 27, 49, 28, 50, 22, 51), new Array(), new Array(), new Array(4, 113), new Array(45, 114), new Array(33, 32, 32, 33, 47, 22, 48, 23, 45, 37, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30), new Array(), new Array(31, 18, 33, 32, 32, 33, 47, 22, 48, 23, 45, 37, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30), new Array(20, 117), new Array(44, 57, 38, 58, 16, 59), new Array(), new Array(30, 55, 29, 56), new Array(30, 55, 29, 56), new Array(30, 55, 29, 56), new Array(30, 55, 29, 56), new Array(30, 55, 29, 56), new Array(30, 55, 29, 56), new Array(30, 55, 29, 56), new Array(), new Array(), new Array(24, 45, 23, 46, 26, 47, 25, 48, 27, 49, 28, 50, 22, 51), new Array(32, 62, 33, 63), new Array(32, 62, 33, 63), new Array(21, - 30), new Array(39, 118, 40, 112), new Array(17, 119, 32, 62, 33, 63), new Array(), new Array(35, 64, 34, 65, 36, 66), new Array(35, 64, 34, 65, 36, 66), new Array(), new Array(), new Array(), new Array(), new Array(39, 120, 40, 121), new Array(), new Array(), new Array(45, 71), new Array(31, 18, 33, 32, 32, 33, 47, 22, 48, 23, 45, 37, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30), new Array(), new Array(31, 18, 33, 32, 32, 33, 47, 22, 48, 23, 45, 37, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30), new Array(3, 3, 5, 4, 6, 5, 7, 6, 9, 7, 11, 8, 10, 9, 18, 12, 20, 13, 45, 17, 31, 18, 47, 22, 48, 23, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30, 33, 32, 32, 33), new Array(), new Array(17, 126, 32, 62, 33, 63), new Array(24, 45, 23, 46, 26, 47, 25, 48, 27, 49, 28, 50, 22, 51, 20, 127), new Array(31, 18, 33, 32, 32, 33, 47, 22, 48, 23, 45, 37, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30), new Array(47, 22, 48, 23, 45, 37, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30), new Array(21, - 31), new Array(18, 131), new Array(45, 132), new Array(), new Array(24, 45, 23, 46, 26, 47, 25, 48, 27, 49, 28, 50, 22, 51), new Array(24, 45, 23, 46, 26, 47, 25, 48, 27, 49, 28, 50, 22, 51), new Array(), new Array(), new Array(), new Array(24, 45, 23, 46, 26, 47, 25, 48, 27, 49, 28, 50, 22, 51, 20, 133), new Array(40, 134), new Array(44, 77, 38, 58, 16, 78), new Array(), new Array(), new Array(45, 17, 47, 22, 48, 23, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30), new Array(47, 22, 48, 23, 45, 37, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30), new Array(19, 138, 3, 3, 5, 4, 6, 5, 7, 6, 9, 7, 11, 8, 10, 9, 18, 12, 20, 13, 45, 17, 31, 18, 47, 22, 48, 23, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30, 33, 32, 32, 33), new Array(39, 139), new Array(44, 77, 38, 58, 16, 78), new Array(), new Array(3, 3, 5, 4, 6, 5, 7, 6, 9, 7, 11, 8, 10, 9, 18, 12, 20, 13, 45, 17, 31, 18, 47, 22, 48, 23, 38, 24, 46, 25, 8, 26, 14, 27, 16, 28, 12, 29, 13, 30, 33, 32, 32, 33), new Array());
        var e = new Array(new Array(49, 1), new Array(50, 2, 60, 10, 53, 11, 59, 14, 62, 15, 58, 16, 61, 19, 66, 20, 63, 21, 64, 31, 65, 34), new Array(), new Array(53, 35, 62, 15, 61, 19, 63, 21, 64, 31, 65, 34, 58, 36, 66, 20), new Array(53, 38, 62, 15, 61, 19, 63, 21, 64, 31, 65, 34, 58, 36, 66, 20), new Array(50, 39, 60, 10, 53, 11, 59, 14, 62, 15, 58, 16, 61, 19, 66, 20, 63, 21, 64, 31, 65, 34), new Array(), new Array(), new Array(), new Array(50, 43, 60, 10, 53, 11, 59, 14, 62, 15, 58, 16, 61, 19, 66, 20, 63, 21, 64, 31, 65, 34), new Array(), new Array(), new Array(51, 53), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(62, 61, 61, 19, 63, 21, 64, 31, 65, 34, 58, 36, 66, 20), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(53, 67, 62, 15, 61, 19, 63, 21, 64, 31, 65, 34, 58, 36, 66, 20), new Array(), new Array(), new Array(54, 69, 55, 70), new Array(52, 72, 53, 73, 62, 15, 61, 19, 63, 21, 64, 31, 65, 34, 58, 36, 66, 20), new Array(), new Array(), new Array(), new Array(65, 74, 58, 36, 66, 20), new Array(65, 75, 58, 36, 66, 20), new Array(), new Array(50, 76, 60, 10, 53, 11, 59, 14, 62, 15, 58, 16, 61, 19, 66, 20, 63, 21, 64, 31, 65, 34), new Array(), new Array(), new Array(50, 79, 60, 10, 53, 11, 59, 14, 62, 15, 58, 16, 61, 19, 66, 20, 63, 21, 64, 31, 65, 34), new Array(), new Array(60, 81, 59, 14, 58, 82, 66, 20), new Array(), new Array(), new Array(), new Array(), new Array(62, 84, 61, 19, 63, 21, 64, 31, 65, 34, 58, 36, 66, 20), new Array(62, 85, 61, 19, 63, 21, 64, 31, 65, 34, 58, 36, 66, 20), new Array(62, 86, 61, 19, 63, 21, 64, 31, 65, 34, 58, 36, 66, 20), new Array(62, 87, 61, 19, 63, 21, 64, 31, 65, 34, 58, 36, 66, 20), new Array(62, 88, 61, 19, 63, 21, 64, 31, 65, 34, 58, 36, 66, 20), new Array(62, 89, 61, 19, 63, 21, 64, 31, 65, 34, 58, 36, 66, 20), new Array(62, 90, 61, 19, 63, 21, 64, 31, 65, 34, 58, 36, 66, 20), new Array(), new Array(50, 92, 60, 10, 53, 11, 59, 14, 62, 15, 58, 16, 61, 19, 66, 20, 63, 21, 64, 31, 65, 34), new Array(53, 93, 62, 15, 61, 19, 63, 21, 64, 31, 65, 34, 58, 36, 66, 20), new Array(61, 94, 63, 21, 64, 31, 65, 34, 58, 36, 66, 20), new Array(61, 95, 63, 21, 64, 31, 65, 34, 58, 36, 66, 20), new Array(), new Array(52, 97, 53, 73, 62, 15, 61, 19, 63, 21, 64, 31, 65, 34, 58, 36, 66, 20), new Array(61, 98, 63, 21, 64, 31, 65, 34, 58, 36, 66, 20), new Array(65, 99, 58, 36, 66, 20), new Array(), new Array(63, 100, 64, 31, 65, 34, 58, 36, 66, 20), new Array(63, 101, 64, 31, 65, 34, 58, 36, 66, 20), new Array(64, 102, 65, 34, 58, 36, 66, 20), new Array(64, 103, 65, 34, 58, 36, 66, 20), new Array(64, 104, 65, 34, 58, 36, 66, 20), new Array(), new Array(56, 106), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(61, 115, 63, 21, 64, 31, 65, 34, 58, 36, 66, 20), new Array(), new Array(53, 116, 62, 15, 61, 19, 63, 21, 64, 31, 65, 34, 58, 36, 66, 20), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(55, 122), new Array(53, 123, 62, 15, 61, 19, 63, 21, 64, 31, 65, 34, 58, 36, 66, 20), new Array(), new Array(53, 124, 62, 15, 61, 19, 63, 21, 64, 31, 65, 34, 58, 36, 66, 20), new Array(50, 125, 60, 10, 53, 11, 59, 14, 62, 15, 58, 16, 61, 19, 66, 20, 63, 21, 64, 31, 65, 34), new Array(), new Array(), new Array(), new Array(53, 128, 62, 15, 61, 19, 63, 21, 64, 31, 65, 34, 58, 36, 66, 20), new Array(57, 129, 58, 130, 66, 20), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(51, 135), new Array(), new Array(60, 136, 59, 14, 58, 82, 66, 20), new Array(58, 137, 66, 20), new Array(50, 92, 60, 10, 53, 11, 59, 14, 62, 15, 58, 16, 61, 19, 66, 20, 63, 21, 64, 31, 65, 34), new Array(), new Array(), new Array(), new Array(50, 140, 60, 10, 53, 11, 59, 14, 62, 15, 58, 16, 61, 19, 66, 20, 63, 21, 64, 31, 65, 34), new Array());
        var q = new Array(2, 0, 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, 4, 29, - 1, 40, 53, 64, - 1, 44, 61, 47, 62, 63, - 1, 66, - 1, 10, 7, 70, 71, 51, - 1, - 1, 56, - 1, 53, 64, - 1, - 1, - 1, - 1, 24, 25, 26, - 1, - 1, - 1, - 1, - 1, - 1, - 1, 27, - 1, - 1, - 1, - 1, - 1, 7, - 1, - 1, 43, - 1, - 1, - 1, - 1, - 1, - 1, 14, - 1, 9, - 1, - 1, 6, 54, 55, 18, - 1, - 1, 20, - 1, - 1, - 1, 23, 39, 38, 37, 36, 35, 34, 33, 28, 3, 17, 42, 41, 60, - 1, - 1, 52, 46, 45, 50, 49, 48, 65, - 1, 13, 68, - 1, - 1, 69, - 1, - 1, 60, - 1, - 1, - 1, 58, 57, - 1, - 1, 8, 11, 5, 19, 57, 21, - 1, 59, 16, 4, 12, - 1, - 1, - 1, - 1, 15, 67, - 1, 22);
        var o = new Array("Program'", "ERROR_RESYNC", "WHITESPACE", "IF", "ELSE", "WHILE", "DO", "FOR", "FUNCTION", "USE", "RETURN", "DELETE", "TRUE", "FALSE", "<<", ">>", "[", "]", "{", "}", ";", "=", "==", "!=", "~=", "<=", ">=", ">", "<", "||", "&&", "!", "+", "-", "/", "%", "*", "^", "(", ")", ",", "#", ":", "|", ".", "Identifier", "String", "Integer", "Float", "Program", "Stmt", "Stmt_List", "Param_List", "Expression", "Prop_List", "Prop", "Param_Def_List", "Attr_List", "ExtValue", "Lhs", "Assign", "AddSubExp", "LogExp", "MulDivExp", "NegExp", "ExpExp", "Value", "$");
        if (!j) {
            j = []
        }
        if (!g) {
            g = []
        }
        s.push(0);
        r.push(0);
        f.la = this._lex(f);
        while (true) {
            f.act = 142;
            for (m = 0; m < h[s[s.length - 1]].length; m += 2) {
                if (h[s[s.length - 1]][m] == f.la) {
                    f.act = h[s[s.length - 1]][m + 1];
                    break
                }
            }
            if (f.act == 142) {
                if ((f.act = q[s[s.length - 1]]) < 0) {
                    f.act = 142
                } else {
                    f.act *= -1
                }
            }
            if (f.act == 142) {
                if (f.error_step == 0) {
                    k++;
                    j.push({
                        offset: f.offset - f.att.length,
                        line: f.line
                    });
                    g.push([]);
                    for (m = 0; m < h[s[s.length - 1]].length; m += 2) {
                        g[g.length - 1].push(o[h[s[s.length - 1]][m]])
                    }
                }
                while (s.length > 1 && f.act == 142) {
                    s.pop();
                    r.pop();
                    for (m = 0; m < h[s[s.length - 1]].length; m += 2) {
                        if (h[s[s.length - 1]][m] == 1) {
                            f.act = h[s[s.length - 1]][m + 1];
                            s.push(f.act);
                            r.push("");
                            break
                        }
                    }
                }
                if (s.length > 1 && f.act != 142) {
                    while (f.la != 67) {
                        f.act = 142;
                        for (m = 0; m < h[s[s.length - 1]].length; m += 2) {
                            if (h[s[s.length - 1]][m] == f.la) {
                                f.act = h[s[s.length - 1]][m + 1];
                                break
                            }
                        }
                        if (f.act != 142) {
                            break
                        }
                        while ((f.la = this._lex(f)) < 0) {
                            f.offset++
                        }
                    }
                    while (f.la != 67 && f.act == 142) {}
                }
                if (f.act == 142 || f.la == 67) {
                    break
                }
                f.error_step = 3
            }
            if (f.act > 0) {
                s.push(f.act);
                r.push(f.att);
                f.la = this._lex(f);
                if (f.error_step > 0) {
                    f.error_step--
                }
            } else {
                p = f.act * -1;
                n = void(0);
                switch (p) {
                    case 0:
                        n = r[r.length - 1];
                        break;
                    case 1:
                        this.execute(r[r.length - 1]);
                        break;
                    case 2:
                        n = r[r.length - 0];
                        break;
                    case 3:
                        n = this.createNode("node_op", "op_none", r[r.length - 2], r[r.length - 1]);
                        break;
                    case 4:
                        n = r[r.length - 0];
                        break;
                    case 5:
                        n = this.createNode("node_op", "op_param", r[r.length - 1], r[r.length - 3]);
                        break;
                    case 6:
                        n = this.createNode("node_op", "op_param", r[r.length - 1]);
                        break;
                    case 7:
                        n = r[r.length - 0];
                        break;
                    case 8:
                        n = this.createNode("node_op", "op_proplst", r[r.length - 3], r[r.length - 1]);
                        break;
                    case 9:
                        n = r[r.length - 1];
                        break;
                    case 10:
                        n = r[r.length - 0];
                        break;
                    case 11:
                        n = this.createNode("node_op", "op_prop", r[r.length - 3], r[r.length - 1]);
                        break;
                    case 12:
                        n = this.createNode("node_op", "op_paramdef", r[r.length - 1], r[r.length - 3]);
                        break;
                    case 13:
                        n = this.createNode("node_op", "op_paramdef", r[r.length - 1]);
                        break;
                    case 14:
                        n = r[r.length - 0];
                        break;
                    case 15:
                        n = this.createNode("node_op", "op_param", r[r.length - 1], r[r.length - 3]);
                        break;
                    case 16:
                        n = this.createNode("node_op", "op_param", r[r.length - 1]);
                        break;
                    case 17:
                        n = this.createNode("node_op", "op_assign", r[r.length - 3], r[r.length - 1]);
                        break;
                    case 18:
                        n = this.createNode("node_op", "op_if", r[r.length - 2], r[r.length - 1]);
                        break;
                    case 19:
                        n = this.createNode("node_op", "op_if_else", r[r.length - 4], r[r.length - 3], r[r.length - 1]);
                        break;
                    case 20:
                        n = this.createNode("node_op", "op_while", r[r.length - 2], r[r.length - 1]);
                        break;
                    case 21:
                        n = this.createNode("node_op", "op_do", r[r.length - 4], r[r.length - 2]);
                        break;
                    case 22:
                        n = this.createNode("node_op", "op_for", r[r.length - 7], r[r.length - 5], r[r.length - 3], r[r.length - 1]);
                        break;
                    case 23:
                        n = this.createNode("node_op", "op_use", r[r.length - 2]);
                        break;
                    case 24:
                        n = this.createNode("node_op", "op_delete", r[r.length - 1]);
                        break;
                    case 25:
                        n = this.createNode("node_op", "op_return", r[r.length - 1]);
                        break;
                    case 26:
                        n = r[r.length - 2];
                        break;
                    case 27:
                        n = this.createNode("node_op", "op_noassign", r[r.length - 2]);
                        break;
                    case 28:
                        n = r[r.length - 2];
                        n.needsBrackets = true;
                        break;
                    case 29:
                        n = this.createNode("node_op", "op_none");
                        break;
                    case 30:
                        n = this.createNode("node_op", "op_lhs", r[r.length - 1], r[r.length - 3], "dot");
                        break;
                    case 31:
                        n = this.createNode("node_op", "op_lhs", r[r.length - 2], r[r.length - 4], "bracket");
                        break;
                    case 32:
                        n = this.createNode("node_op", "op_lhs", r[r.length - 1]);
                        break;
                    case 33:
                        n = this.createNode("node_op", "op_equ", r[r.length - 3], r[r.length - 1]);
                        break;
                    case 34:
                        n = this.createNode("node_op", "op_lot", r[r.length - 3], r[r.length - 1]);
                        break;
                    case 35:
                        n = this.createNode("node_op", "op_grt", r[r.length - 3], r[r.length - 1]);
                        break;
                    case 36:
                        n = this.createNode("node_op", "op_loe", r[r.length - 3], r[r.length - 1]);
                        break;
                    case 37:
                        n = this.createNode("node_op", "op_gre", r[r.length - 3], r[r.length - 1]);
                        break;
                    case 38:
                        n = this.createNode("node_op", "op_neq", r[r.length - 3], r[r.length - 1]);
                        break;
                    case 39:
                        n = this.createNode("node_op", "op_approx", r[r.length - 3], r[r.length - 1]);
                        break;
                    case 40:
                        n = r[r.length - 1];
                        break;
                    case 41:
                        n = this.createNode("node_op", "op_or", r[r.length - 3], r[r.length - 1]);
                        break;
                    case 42:
                        n = this.createNode("node_op", "op_and", r[r.length - 3], r[r.length - 1]);
                        break;
                    case 43:
                        n = this.createNode("node_op", "op_not", r[r.length - 1]);
                        break;
                    case 44:
                        n = r[r.length - 1];
                        break;
                    case 45:
                        n = this.createNode("node_op", "op_sub", r[r.length - 3], r[r.length - 1]);
                        break;
                    case 46:
                        n = this.createNode("node_op", "op_add", r[r.length - 3], r[r.length - 1]);
                        break;
                    case 47:
                        n = r[r.length - 1];
                        break;
                    case 48:
                        n = this.createNode("node_op", "op_mul", r[r.length - 3], r[r.length - 1]);
                        break;
                    case 49:
                        n = this.createNode("node_op", "op_div", r[r.length - 3], r[r.length - 1]);
                        break;
                    case 50:
                        n = this.createNode("node_op", "op_mod", r[r.length - 3], r[r.length - 1]);
                        break;
                    case 51:
                        n = r[r.length - 1];
                        break;
                    case 52:
                        n = this.createNode("node_op", "op_exp", r[r.length - 3], r[r.length - 1]);
                        break;
                    case 53:
                        n = r[r.length - 1];
                        break;
                    case 54:
                        n = this.createNode("node_op", "op_neg", r[r.length - 1]);
                        break;
                    case 55:
                        n = r[r.length - 1];
                        break;
                    case 56:
                        n = r[r.length - 1];
                        break;
                    case 57:
                        n = this.createNode("node_op", "op_extvalue", r[r.length - 4], r[r.length - 2]);
                        break;
                    case 58:
                        n = this.createNode("node_op", "op_execfun", r[r.length - 4], r[r.length - 2]);
                        break;
                    case 59:
                        n = this.createNode("node_op", "op_execfun", r[r.length - 5], r[r.length - 3], r[r.length - 1], true);
                        break;
                    case 60:
                        n = this.createNode("node_op", "op_property", r[r.length - 3], r[r.length - 1]);
                        break;
                    case 61:
                        n = r[r.length - 1];
                        break;
                    case 62:
                        n = this.createNode("node_const", r[r.length - 1]);
                        break;
                    case 63:
                        n = this.createNode("node_const", r[r.length - 1]);
                        break;
                    case 64:
                        n = this.createNode("node_var", r[r.length - 1]);
                        break;
                    case 65:
                        n = r[r.length - 2];
                        break;
                    case 66:
                        n = this.createNode("node_str", r[r.length - 1]);
                        break;
                    case 67:
                        n = this.createNode("node_op", "op_function", r[r.length - 5], r[r.length - 2]);
                        break;
                    case 68:
                        n = this.createNode("node_op", "op_proplst_val", r[r.length - 2]);
                        break;
                    case 69:
                        n = this.createNode("node_op", "op_array", r[r.length - 2]);
                        break;
                    case 70:
                        n = this.createNode("node_const_bool", r[r.length - 1]);
                        break;
                    case 71:
                        n = this.createNode("node_const_bool", r[r.length - 1]);
                        break
                }
                for (m = 0; m < l[p][1]; m++) {
                    s.pop();
                    r.pop()
                }
                f.act = 142;
                for (m = 0; m < e[s[s.length - 1]].length; m += 2) {
                    if (e[s[s.length - 1]][m] == l[p][0]) {
                        f.act = e[s[s.length - 1]][m + 1];
                        break
                    }
                }
                if (p == 0) {
                    break
                }
                s.push(f.act);
                r.push(n)
            }
        }
        return k
    }
});
JXG.Dump = {
    addMarkers: function (h, k, f) {
        var j, d, g;
        if (!JXG.isArray(k)) {
            k = [k]
        }
        if (!JXG.isArray(f)) {
            f = [f]
        }
        d = Math.min(k.length, f.length);
        k.length = d;
        f.length = d;
        for (j in h.objects) {
            for (g = 0; g < d; g++) {
                h.objects[j][k[g]] = f[g]
            }
        }
    },
    deleteMarkers: function (g, j) {
        var h, d, f;
        if (!JXG.isArray(j)) {
            j = [j]
        }
        d = j.length;
        j.length = d;
        for (h in g.objects) {
            for (f = 0; f < d; f++) {
                delete g.objects[h][j[f]]
            }
        }
    },
    str: function (d) {
        if (typeof d === "string" && d.substr(0, 7) !== "function") {
            d = "'" + d + "'"
        }
        return d
    },
    minimizeObject: function (d) {
        var h, f, j = JXG.deepCopy(d),
            g = [],
            e;
        for (e = 1; e < arguments.length; e++) {
            g.push(arguments[e])
        }
        for (e = 0; e < g.length; e++) {
            for (h in g[e]) {
                f = h.toLowerCase();
                if (typeof g[e][h] !== "object" && g[e][h] == j[f]) {
                    delete j[f]
                }
            }
        }
        return j
    },
    prepareAttributes: function (f, g) {
        var d, e;
        d = this.minimizeObject(g.getAttributes(), f.options[g.elType], f.options.elements);
        for (e in g.subs) {
            d[e] = this.minimizeObject(g.subs[e].getAttributes(), f.options[g.elType][e], f.options[g.subs[e].elType], f.options.elements);
            d[e].id = g.subs[e].id;
            d[e].name = g.subs[e].name
        }
        d.id = g.id;
        d.name = g.name;
        return d
    },
    dump: function (i) {
        var k, j, g, h, f = [],
            d = i.objectsList.length;
        this.addMarkers(i, "dumped", false);
        for (k = 0; k < d; k++) {
            j = i.objectsList[k];
            g = {};
            if (!j.dumped && j.dump) {
                g.type = j.getType();
                g.parents = j.getParents();
                if (g.type === "point" && g.parents[0] == 1) {
                    g.parents = g.parents.slice(1)
                }
                for (h = 0; h < g.parents.length; h++) {
                    if (typeof g.parents[h] === "string") {
                        g.parents[h] = "'" + g.parents[h] + "'"
                    }
                }
                g.attributes = this.prepareAttributes(i, j);
                f.push(g)
            }
        }
        this.deleteMarkers(i, "dumped");
        return f
    },
    toJSAN: function (g) {
        var e, d;
        switch (typeof g) {
            case "object":
                if (g) {
                    var f = [];
                    if (g instanceof Array) {
                        for (d = 0; d < g.length; d++) {
                            f.push(this.toJSAN(g[d]))
                        }
                        return "[" + f.join(",") + "]"
                    } else {
                        for (var h in g) {
                            f.push(h + ": " + this.toJSAN(g[h]))
                        }
                        return "<<" + f.join(", ") + ">> "
                    }
                } else {
                    return "null"
                }
            case "string":
                return "'" + g.replace(/(["'])/g, "\\$1") + "'";
            case "number":
            case "boolean":
                return new String(g);
            case "null":
                return "null"
        }
    },
    toJessie: function (f) {
        var g = this.dump(f),
            d = [],
            e;
        for (e = 0; e < g.length; e++) {
            if (g[e].attributes.name.length > 0) {
                d.push("// " + g[e].attributes.name)
            }
            d.push("s" + e + " = " + g[e].type + "(" + g[e].parents.join(", ") + ") " + this.toJSAN(g[e].attributes).replace(/\n/, "\\n") + ";");
            d.push("")
        }
        return d.join("\n")
    },
    toJavaScript: function (f) {
        var g = this.dump(f),
            d = [],
            e;
        for (e = 0; e < g.length; e++) {
            d.push('board.create("' + g[e].type + '", [' + g[e].parents.join(", ") + "], " + JXG.toJSON(g[e].attributes) + ");")
        }
        return d.join("\n")
    }
};
JXG.SVGRenderer = function (d) {
    var e;
    this.type = "svg";
    this.svgRoot = null;
    this.svgNamespace = "http://www.w3.org/2000/svg";
    this.xlinkNamespace = "http://www.w3.org/1999/xlink";
    this.container = d;
    this.container.style.MozUserSelect = "none";
    this.container.style.overflow = "hidden";
    if (this.container.style.position === "") {
        this.container.style.position = "relative"
    }
    this.svgRoot = this.container.ownerDocument.createElementNS(this.svgNamespace, "svg");
    this.svgRoot.style.overflow = "hidden";
    this.svgRoot.style.width = JXG.getStyle(this.container, "width");
    this.svgRoot.style.height = JXG.getStyle(this.container, "height");
    this.container.appendChild(this.svgRoot);
    this.defs = this.container.ownerDocument.createElementNS(this.svgNamespace, "defs");
    this.svgRoot.appendChild(this.defs);
    this.filter = this.container.ownerDocument.createElementNS(this.svgNamespace, "filter");
    this.filter.setAttributeNS(null, "id", this.container.id + "_f1");
    this.filter.setAttributeNS(null, "width", "300%");
    this.filter.setAttributeNS(null, "height", "300%");
    this.filter.setAttributeNS(null, "filterUnits", "userSpaceOnUse");
    this.feOffset = this.container.ownerDocument.createElementNS(this.svgNamespace, "feOffset");
    this.feOffset.setAttributeNS(null, "result", "offOut");
    this.feOffset.setAttributeNS(null, "in", "SourceAlpha");
    this.feOffset.setAttributeNS(null, "dx", "5");
    this.feOffset.setAttributeNS(null, "dy", "5");
    this.filter.appendChild(this.feOffset);
    this.feGaussianBlur = this.container.ownerDocument.createElementNS(this.svgNamespace, "feGaussianBlur");
    this.feGaussianBlur.setAttributeNS(null, "result", "blurOut");
    this.feGaussianBlur.setAttributeNS(null, "in", "offOut");
    this.feGaussianBlur.setAttributeNS(null, "stdDeviation", "3");
    this.filter.appendChild(this.feGaussianBlur);
    this.feBlend = this.container.ownerDocument.createElementNS(this.svgNamespace, "feBlend");
    this.feBlend.setAttributeNS(null, "in", "SourceGraphic");
    this.feBlend.setAttributeNS(null, "in2", "blurOut");
    this.feBlend.setAttributeNS(null, "mode", "normal");
    this.filter.appendChild(this.feBlend);
    this.defs.appendChild(this.filter);
    this.layer = [];
    for (e = 0; e < JXG.Options.layer.numlayers; e++) {
        this.layer[e] = this.container.ownerDocument.createElementNS(this.svgNamespace, "g");
        this.svgRoot.appendChild(this.layer[e])
    }
    this.dashArray = ["2, 2", "5, 5", "10, 10", "20, 20", "20, 10, 10, 10", "20, 5, 10, 5"]
};
JXG.SVGRenderer.prototype = new JXG.AbstractRenderer();
JXG.extend(JXG.SVGRenderer.prototype, {
    _createArrowHead: function (f, h) {
        var g = f.id + "Triangle",
            e, d;
        if (JXG.exists(h)) {
            g += h
        }
        e = this.createPrim("marker", g);
        e.setAttributeNS(null, "viewBox", "0 0 10 6");
        e.setAttributeNS(null, "refY", "3");
        e.setAttributeNS(null, "markerUnits", "userSpaceOnUse");
        e.setAttributeNS(null, "markerHeight", "12");
        e.setAttributeNS(null, "markerWidth", "10");
        e.setAttributeNS(null, "orient", "auto");
        e.setAttributeNS(null, "stroke", f.visProp.strokecolor);
        e.setAttributeNS(null, "stroke-opacity", f.visProp.strokeopacity);
        e.setAttributeNS(null, "fill", f.visProp.strokecolor);
        e.setAttributeNS(null, "fill-opacity", f.visProp.strokeopacity);
        d = this.container.ownerDocument.createElementNS(this.svgNamespace, "path");
        if (h === "End") {
            e.setAttributeNS(null, "refX", "0");
            d.setAttributeNS(null, "d", "M 0 3 L 10 6 L 10 0 z")
        } else {
            e.setAttributeNS(null, "refX", "10");
            d.setAttributeNS(null, "d", "M 0 0 L 10 3 L 0 6 z")
        }
        e.appendChild(d);
        return e
    },
    _setArrowAtts: function (g, d, e, f) {
        if (g) {
            g.setAttributeNS(null, "stroke", d);
            g.setAttributeNS(null, "stroke-opacity", e);
            g.setAttributeNS(null, "fill", d);
            g.setAttributeNS(null, "fill-opacity", e);
            g.setAttributeNS(null, "stroke-width", f)
        }
    },
    updateTicks: function (h, k, e, n, f, d, j) {
        var l = "",
            m, p, g, r, q, o = h.ticks.length;
        for (m = 0; m < o; m++) {
            p = h.ticks[m];
            r = p[0];
            q = p[1];
            if (typeof r[0] != "undefined" && typeof r[1] != "undefined") {
                l += "M " + (r[0]) + " " + (q[0]) + " L " + (r[1]) + " " + (q[1]) + " "
            }
        }
        for (m = 0; m < o; m++) {
            p = h.ticks[m].scrCoords;
            if (h.ticks[m].major && (h.board.needsFullUpdate || h.needsRegularUpdate) && h.labels[m] && h.labels[m].visProp.visible) {
                this.updateText(h.labels[m])
            }
        }
        g = this.getElementById(h.id);
        if (!JXG.exists(g)) {
            g = this.createPrim("path", h.id);
            this.appendChildPrim(g, h.visProp.layer);
            this.appendNodesToElement(h, "path")
        }
        g.setAttributeNS(null, "stroke", h.visProp.strokecolor);
        g.setAttributeNS(null, "stroke-opacity", h.visProp.strokeopacity);
        g.setAttributeNS(null, "stroke-width", h.visProp.strokewidth);
        this.updatePathPrim(g, l, h.board)
    },
    displayCopyright: function (f, g) {
        var e = this.createPrim("text", "licenseText"),
            d;
        e.setAttributeNS(null, "x", "20px");
        e.setAttributeNS(null, "y", (2 + g) + "px");
        e.setAttributeNS(null, "style", "font-family:Arial,Helvetica,sans-serif; font-size:" + g + "px; fill:#356AA0;  opacity:0.3;");
        d = document.createTextNode(f);
        e.appendChild(d);
        this.appendChildPrim(e, 0)
    },
    drawInternalText: function (d) {
        var e = this.createPrim("text", d.id);
        e.setAttributeNS(null, "class", d.visProp.cssclass);
        d.rendNodeText = document.createTextNode("");
        e.appendChild(d.rendNodeText);
        this.appendChildPrim(e, d.visProp.layer);
        return e
    },
    updateInternalText: function (d) {
        var e = d.plaintext;
        if (!isNaN(d.coords.scrCoords[1] + d.coords.scrCoords[2])) {
            d.rendNode.setAttributeNS(null, "x", d.coords.scrCoords[1] + "px");
            d.rendNode.setAttributeNS(null, "y", (d.coords.scrCoords[2] + this.vOffsetText * 0.5) + "px");
            if (d.visProp.anchorx === "right") {
                d.rendNode.setAttributeNS(null, "text-anchor", "end")
            } else {
                if (d.visProp.anchorx === "middle") {
                    d.rendNode.setAttributeNS(null, "text-anchor", "middle")
                }
            }
            if (d.visProp.anchory === "top") {
                d.rendNode.setAttributeNS(null, "dominant-baseline", "text-before-edge")
            } else {
                if (d.visProp.anchory === "middle") {
                    d.rendNode.setAttributeNS(null, "dominant-baseline", "middle")
                }
            }
        }
        if (d.htmlStr !== e) {
            d.rendNodeText.data = e;
            d.htmlStr = e
        }
        this.transformImage(d, d.transformations)
    },
    updateInternalTextStyle: function (e, f, d) {
        this.setObjectFillColor(e, f, d)
    },
    drawImage: function (d) {
        var e = this.createPrim("image", d.id);
        e.setAttributeNS(null, "preserveAspectRatio", "none");
        this.appendChildPrim(e, d.visProp.layer);
        d.rendNode = e;
        this.updateImage(d)
    },
    transformImage: function (h, f) {
        var i = h.rendNode,
            e, j = "",
            g, d = f.length;
        if (d > 0) {
            e = this.joinTransforms(h, f);
            g = [e[1][1], e[2][1], e[1][2], e[2][2], e[1][0], e[2][0]].join(",");
            j += " matrix(" + g + ") ";
            i.setAttributeNS(null, "transform", j)
        }
    },
    updateImageURL: function (e) {
        var d = JXG.evaluate(e.url);
        e.rendNode.setAttributeNS(this.xlinkNamespace, "xlink:href", d)
    },
    appendChildPrim: function (d, e) {
        if (!JXG.exists(e)) {
            e = 0
        } else {
            if (e >= JXG.Options.layer.numlayers) {
                e = JXG.Options.layer.numlayers - 1
            }
        }
        this.layer[e].appendChild(d)
    },
    appendNodesToElement: function (d) {
        d.rendNode = this.getElementById(d.id)
    },
    createPrim: function (d, f) {
        var e = this.container.ownerDocument.createElementNS(this.svgNamespace, d);
        e.setAttributeNS(null, "id", this.container.id + "_" + f);
        e.style.position = "absolute";
        if (d === "path") {
            e.setAttributeNS(null, "stroke-linecap", "butt");
            e.setAttributeNS(null, "stroke-linejoin", "round")
        }
        return e
    },
    remove: function (d) {
        if (JXG.exists(d) && JXG.exists(d.parentNode)) {
            d.parentNode.removeChild(d)
        }
    },
    makeArrows: function (e) {
        var d;
        if (e.visPropOld.firstarrow === e.visProp.firstarrow && e.visPropOld.lastarrow === e.visProp.lastarrow) {
            return
        }
        if (e.visProp.firstarrow) {
            d = e.rendNodeTriangleStart;
            if (!JXG.exists(d)) {
                d = this._createArrowHead(e, "End");
                this.defs.appendChild(d);
                e.rendNodeTriangleStart = d;
                e.rendNode.setAttributeNS(null, "marker-start", "url(#" + this.container.id + "_" + e.id + "TriangleEnd)")
            } else {
                this.defs.appendChild(d)
            }
        } else {
            d = e.rendNodeTriangleStart;
            if (JXG.exists(d)) {
                this.remove(d)
            }
        }
        if (e.visProp.lastarrow) {
            d = e.rendNodeTriangleEnd;
            if (!JXG.exists(d)) {
                d = this._createArrowHead(e, "Start");
                this.defs.appendChild(d);
                e.rendNodeTriangleEnd = d;
                e.rendNode.setAttributeNS(null, "marker-end", "url(#" + this.container.id + "_" + e.id + "TriangleStart)")
            } else {
                this.defs.appendChild(d)
            }
        } else {
            d = e.rendNodeTriangleEnd;
            if (JXG.exists(d)) {
                this.remove(d)
            }
        }
        e.visPropOld.firstarrow = e.visProp.firstarrow;
        e.visPropOld.lastarrow = e.visProp.lastarrow
    },
    updateEllipsePrim: function (e, d, h, g, f) {
        e.setAttributeNS(null, "cx", d);
        e.setAttributeNS(null, "cy", h);
        e.setAttributeNS(null, "rx", Math.abs(g));
        e.setAttributeNS(null, "ry", Math.abs(f))
    },
    updateLinePrim: function (h, e, d, g, f) {
        if (!isNaN(e + d + g + f)) {
            h.setAttributeNS(null, "x1", e);
            h.setAttributeNS(null, "y1", d);
            h.setAttributeNS(null, "x2", g);
            h.setAttributeNS(null, "y2", f)
        }
    },
    updatePathPrim: function (d, e) {
        if (e == "") {
            e = "M 0 0"
        }
        d.setAttributeNS(null, "d", e)
    },
    updatePathStringPoint: function (h, e, g) {
        var f = "",
            j = h.coords.scrCoords,
            i = e * Math.sqrt(3) * 0.5,
            d = e * 0.5;
        if (g === "x") {
            f = " M " + (j[1] - e) + " " + (j[2] - e) + " L " + (j[1] + e) + " " + (j[2] + e) + " M " + (j[1] + e) + " " + (j[2] - e) + " L " + (j[1] - e) + " " + (j[2] + e)
        } else {
            if (g === "+") {
                f = " M " + (j[1] - e) + " " + (j[2]) + " L " + (j[1] + e) + " " + (j[2]) + " M " + (j[1]) + " " + (j[2] - e) + " L " + (j[1]) + " " + (j[2] + e)
            } else {
                if (g === "<>") {
                    f = " M " + (j[1] - e) + " " + (j[2]) + " L " + (j[1]) + " " + (j[2] + e) + " L " + (j[1] + e) + " " + (j[2]) + " L " + (j[1]) + " " + (j[2] - e) + " Z "
                } else {
                    if (g === "^") {
                        f = " M " + (j[1]) + " " + (j[2] - e) + " L " + (j[1] - i) + " " + (j[2] + d) + " L " + (j[1] + i) + " " + (j[2] + d) + " Z "
                    } else {
                        if (g === "v") {
                            f = " M " + (j[1]) + " " + (j[2] + e) + " L " + (j[1] - i) + " " + (j[2] - d) + " L " + (j[1] + i) + " " + (j[2] - d) + " Z "
                        } else {
                            if (g === ">") {
                                f = " M " + (j[1] + e) + " " + (j[2]) + " L " + (j[1] - d) + " " + (j[2] - i) + " L " + (j[1] - d) + " " + (j[2] + i) + " Z "
                            } else {
                                if (g === "<") {
                                    f = " M " + (j[1] - e) + " " + (j[2]) + " L " + (j[1] + d) + " " + (j[2] - i) + " L " + (j[1] + d) + " " + (j[2] + i) + " Z "
                                }
                            }
                        }
                    }
                }
            }
        }
        return f
    },
    updatePathStringPrim: function (d) {
        var f = " M ",
            g = " L ",
            m = " C ",
            e = f,
            n = 5000,
            j = "",
            h, l, o = (d.visProp.curvetype !== "plot"),
            k;
        if (d.numberPoints <= 0) {
            return ""
        }
        k = Math.min(d.points.length, d.numberPoints);
        if (d.bezierDegree == 1) {
            if (o && d.board.options.curve.RDPsmoothing) {
                d.points = JXG.Math.Numerics.RamerDouglasPeuker(d.points, 0.5)
            }
            for (h = 0; h < k; h++) {
                l = d.points[h].scrCoords;
                if (isNaN(l[1]) || isNaN(l[2])) {
                    e = f
                } else {
                    if (l[1] > n) {
                        l[1] = n
                    } else {
                        if (l[1] < -n) {
                            l[1] = -n
                        }
                    }
                    if (l[2] > n) {
                        l[2] = n
                    } else {
                        if (l[2] < -n) {
                            l[2] = -n
                        }
                    }
                    j += e + l[1] + " " + l[2];
                    e = g
                }
            }
        } else {
            if (d.bezierDegree == 3) {
                h = 0;
                while (h < k) {
                    l = d.points[h].scrCoords;
                    if (isNaN(l[1]) || isNaN(l[2])) {
                        e = f
                    } else {
                        j += e + l[1] + " " + l[2];
                        if (e == m) {
                            h++;
                            l = d.points[h].scrCoords;
                            j += " " + l[1] + " " + l[2];
                            h++;
                            l = d.points[h].scrCoords;
                            j += " " + l[1] + " " + l[2]
                        }
                        e = m
                    }
                    h++
                }
            }
        }
        return j
    },
    updatePathStringBezierPrim: function (e) {
        var k = " M ",
            l = " C ",
            h = k,
            t = 5000,
            o = "",
            n, m, r, g, d, q = e.visProp.strokewidth,
            s = (e.visProp.curvetype !== "plot"),
            p;
        if (e.numberPoints <= 0) {
            return ""
        }
        if (s && e.board.options.curve.RDPsmoothing) {
            e.points = JXG.Math.Numerics.RamerDouglasPeuker(e.points, 0.5)
        }
        p = Math.min(e.points.length, e.numberPoints);
        for (m = 1; m < 3; m++) {
            h = k;
            for (n = 0; n < p; n++) {
                r = e.points[n].scrCoords;
                if (isNaN(r[1]) || isNaN(r[2])) {
                    h = k
                } else {
                    if (r[1] > t) {
                        r[1] = t
                    } else {
                        if (r[1] < -t) {
                            r[1] = -t
                        }
                    }
                    if (r[2] > t) {
                        r[2] = t
                    } else {
                        if (r[2] < -t) {
                            r[2] = -t
                        }
                    }
                    if (h == k) {
                        o += [h, r[1] + 0 * q * (2 * m * Math.random() - m), " ", r[2] + 0 * q * (2 * m * Math.random() - m)].join("")
                    } else {
                        o += [h, (g + (r[1] - g) * 0.333 + q * (2 * m * Math.random() - m)), " ", (d + (r[2] - d) * 0.333 + q * (2 * m * Math.random() - m)), " ", (g + 2 * (r[1] - g) * 0.333 + q * (2 * m * Math.random() - m)), " ", (d + 2 * (r[2] - d) * 0.333 + q * (2 * m * Math.random() - m)), " ", r[1], " ", r[2]].join("")
                    }
                    h = l;
                    g = r[1];
                    d = r[2]
                }
            }
        }
        return o
    },
    updatePolygonPrim: function (h, g) {
        var j = "",
            e, f, d = g.vertices.length;
        h.setAttributeNS(null, "stroke", "none");
        for (f = 0; f < d - 1; f++) {
            if (g.vertices[f].isReal) {
                e = g.vertices[f].coords.scrCoords;
                j = j + e[1] + "," + e[2]
            } else {
                h.setAttributeNS(null, "points", "");
                return
            }
            if (f < d - 2) {
                j += " "
            }
        }
        if (j.indexOf("NaN") == -1) {
            h.setAttributeNS(null, "points", j)
        }
    },
    updateRectPrim: function (g, d, i, e, f) {
        g.setAttributeNS(null, "x", d);
        g.setAttributeNS(null, "y", i);
        g.setAttributeNS(null, "width", e);
        g.setAttributeNS(null, "height", f)
    },
    setPropertyPrim: function (e, d, f) {
        if (d === "stroked") {
            return
        }
        e.setAttributeNS(null, d, f)
    },
    show: function (d) {
        var e;
        if (d && d.rendNode) {
            e = d.rendNode;
            e.setAttributeNS(null, "display", "inline");
            e.style.visibility = "inherit"
        }
    },
    hide: function (d) {
        var e;
        if (d && d.rendNode) {
            e = d.rendNode;
            e.setAttributeNS(null, "display", "none");
            e.style.visibility = "hidden"
        }
    },
    setBuffering: function (e, d) {
        e.rendNode.setAttribute("buffered-rendering", d)
    },
    setDashStyle: function (d) {
        var f = d.visProp.dash,
            e = d.rendNode;
        if (d.visProp.dash > 0) {
            e.setAttributeNS(null, "stroke-dasharray", this.dashArray[f - 1])
        } else {
            if (e.hasAttributeNS(null, "stroke-dasharray")) {
                e.removeAttributeNS(null, "stroke-dasharray")
            }
        }
    },
    setGradient: function (f) {
        var n = f.rendNode,
            g, i, h, m, l, e, d, k, j;
        i = JXG.evaluate(f.visProp.fillopacity);
        i = (i > 0) ? i : 0;
        g = JXG.evaluate(f.visProp.fillcolor);
        if (f.visProp.gradient === "linear") {
            h = this.createPrim("linearGradient", f.id + "_gradient");
            e = "0%";
            d = "100%";
            k = "0%";
            j = "0%";
            h.setAttributeNS(null, "x1", e);
            h.setAttributeNS(null, "x2", d);
            h.setAttributeNS(null, "y1", k);
            h.setAttributeNS(null, "y2", j);
            m = this.createPrim("stop", f.id + "_gradient1");
            m.setAttributeNS(null, "offset", "0%");
            m.setAttributeNS(null, "style", "stop-color:" + g + ";stop-opacity:" + i);
            l = this.createPrim("stop", f.id + "_gradient2");
            l.setAttributeNS(null, "offset", "100%");
            l.setAttributeNS(null, "style", "stop-color:" + f.visProp.gradientsecondcolor + ";stop-opacity:" + f.visProp.gradientsecondopacity);
            h.appendChild(m);
            h.appendChild(l);
            this.defs.appendChild(h);
            n.setAttributeNS(null, "style", "fill:url(#" + this.container.id + "_" + f.id + "_gradient)");
            f.gradNode1 = m;
            f.gradNode2 = l
        } else {
            if (f.visProp.gradient === "radial") {
                h = this.createPrim("radialGradient", f.id + "_gradient");
                h.setAttributeNS(null, "cx", "50%");
                h.setAttributeNS(null, "cy", "50%");
                h.setAttributeNS(null, "r", "50%");
                h.setAttributeNS(null, "fx", f.visProp.gradientpositionx * 100 + "%");
                h.setAttributeNS(null, "fy", f.visProp.gradientpositiony * 100 + "%");
                m = this.createPrim("stop", f.id + "_gradient1");
                m.setAttributeNS(null, "offset", "0%");
                m.setAttributeNS(null, "style", "stop-color:" + f.visProp.gradientsecondcolor + ";stop-opacity:" + f.visProp.gradientsecondopacity);
                l = this.createPrim("stop", f.id + "_gradient2");
                l.setAttributeNS(null, "offset", "100%");
                l.setAttributeNS(null, "style", "stop-color:" + g + ";stop-opacity:" + i);
                h.appendChild(m);
                h.appendChild(l);
                this.defs.appendChild(h);
                n.setAttributeNS(null, "style", "fill:url(#" + this.container.id + "_" + f.id + "_gradient)");
                f.gradNode1 = m;
                f.gradNode2 = l
            } else {
                n.removeAttributeNS(null, "style")
            }
        }
    },
    updateGradient: function (g) {
        var e = g.gradNode1,
            d = g.gradNode2,
            f, h;
        if (!JXG.exists(e) || !JXG.exists(d)) {
            return
        }
        h = JXG.evaluate(g.visProp.fillopacity);
        h = (h > 0) ? h : 0;
        f = JXG.evaluate(g.visProp.fillcolor);
        if (g.visProp.gradient === "linear") {
            e.setAttributeNS(null, "style", "stop-color:" + f + ";stop-opacity:" + h);
            d.setAttributeNS(null, "style", "stop-color:" + g.visProp.gradientsecondcolor + ";stop-opacity:" + g.visProp.gradientsecondopacity)
        } else {
            if (g.visProp.gradient === "radial") {
                e.setAttributeNS(null, "style", "stop-color:" + g.visProp.gradientsecondcolor + ";stop-opacity:" + g.visProp.gradientsecondopacity);
                d.setAttributeNS(null, "style", "stop-color:" + f + ";stop-opacity:" + h)
            }
        }
    },
    setObjectFillColor: function (e, h, j) {
        var f, g = JXG.evaluate(h),
            k, l, d = JXG.evaluate(j),
            i;
        d = (d > 0) ? d : 0;
        if (e.visPropOld.fillcolor === g && e.visPropOld.fillopacity === d) {
            return
        }
        if (JXG.exists(g) && g !== false) {
            if (g.length != 9) {
                k = g;
                i = d
            } else {
                l = JXG.rgba2rgbo(g);
                k = l[0];
                i = d * l[1]
            }
            f = e.rendNode;
            f.setAttributeNS(null, "fill", k);
            if (e.type === JXG.OBJECT_TYPE_IMAGE) {
                f.setAttributeNS(null, "opacity", i)
            } else {
                f.setAttributeNS(null, "fill-opacity", i)
            }
            if (JXG.exists(e.visProp.gradient)) {
                this.updateGradient(e)
            }
        }
        e.visPropOld.fillcolor = g;
        e.visPropOld.fillopacity = d
    },
    setObjectStrokeColor: function (e, h, i) {
        var g = JXG.evaluate(h),
            k, l, d = JXG.evaluate(i),
            j, f;
        d = (d > 0) ? d : 0;
        if (e.visPropOld.strokecolor === g && e.visPropOld.strokeopacity === d) {
            return
        }
        if (JXG.exists(g) && g !== false) {
            if (g.length != 9) {
                k = g;
                j = d
            } else {
                l = JXG.rgba2rgbo(g);
                k = l[0];
                j = d * l[1]
            }
            f = e.rendNode;
            if (e.type === JXG.OBJECT_TYPE_TEXT) {
                if (e.visProp.display === "html") {
                    f.style.color = k;
                    f.style.opacity = j
                } else {
                    f.setAttributeNS(null, "style", "fill:" + k);
                    f.setAttributeNS(null, "style", "fill-opacity:" + j)
                }
            } else {
                f.setAttributeNS(null, "stroke", k);
                f.setAttributeNS(null, "stroke-opacity", j)
            }
            if (e.type === JXG.OBJECT_TYPE_ARROW) {
                this._setArrowAtts(e.rendNodeTriangle, k, j, e.visProp.strokewidth)
            } else {
                if (e.elementClass === JXG.OBJECT_CLASS_CURVE || e.elementClass === JXG.OBJECT_CLASS_LINE) {
                    if (e.visProp.firstarrow) {
                        this._setArrowAtts(e.rendNodeTriangleStart, k, j, e.visProp.strokewidth)
                    }
                    if (e.visProp.lastarrow) {
                        this._setArrowAtts(e.rendNodeTriangleEnd, k, j, e.visProp.strokewidth)
                    }
                }
            }
        }
        e.visPropOld.strokecolor = g;
        e.visPropOld.strokeopacity = d
    },
    setObjectStrokeWidth: function (f, e) {
        var d = JXG.evaluate(e),
            g;
        if (f.visPropOld.strokewidth === d) {
            return
        }
        g = f.rendNode;
        this.setPropertyPrim(g, "stroked", "true");
        if (JXG.exists(d)) {
            this.setPropertyPrim(g, "stroke-width", d + "px");
            if (f.type === JXG.OBJECT_TYPE_ARROW) {
                this._setArrowAtts(f.rendNodeTriangle, f.visProp.strokecolor, f.visProp.strokeopacity, d)
            } else {
                if (f.elementClass === JXG.OBJECT_CLASS_CURVE || f.elementClass === JXG.OBJECT_CLASS_LINE) {
                    if (f.visProp.firstarrow) {
                        this._setArrowAtts(f.rendNodeTriangleStart, f.visProp.strokecolor, f.visProp.strokeopacity, d)
                    }
                    if (f.visProp.lastarrow) {
                        this._setArrowAtts(f.rendNodeTriangleEnd, f.visProp.strokecolor, f.visProp.strokeopacity, d)
                    }
                }
            }
        }
        f.visPropOld.strokewidth = d
    },
    setShadow: function (d) {
        if (d.visPropOld.shadow === d.visProp.shadow) {
            return
        }
        if (JXG.exists(d.rendNode)) {
            if (d.visProp.shadow) {
                d.rendNode.setAttributeNS(null, "filter", "url(#" + this.container.id + "_f1)")
            } else {
                d.rendNode.removeAttributeNS(null, "filter")
            }
        }
        d.visPropOld.shadow = d.visProp.shadow
    },
    suspendRedraw: function () {},
    unsuspendRedraw: function () {},
    resize: function (d, e) {
        this.svgRoot.style.width = parseFloat(d) + "px";
        this.svgRoot.style.height = parseFloat(e) + "px"
    }
});
JXG.VMLRenderer = function (d) {
    this.type = "vml";
    this.container = d;
    this.container.style.overflow = "hidden";
    this.container.onselectstart = function () {
        return false
    };
    this.resolution = 10;
    if (!JXG.exists(JXG.vmlStylesheet)) {
        d.ownerDocument.namespaces.add("jxgvml", "urn:schemas-microsoft-com:vml");
        JXG.vmlStylesheet = this.container.ownerDocument.createStyleSheet();
        JXG.vmlStylesheet.addRule(".jxgvml", "behavior:url(#default#VML)")
    }
    try {
        !d.ownerDocument.namespaces.jxgvml && d.ownerDocument.namespaces.add("jxgvml", "urn:schemas-microsoft-com:vml");
        this.createNode = function (e) {
            return d.ownerDocument.createElement("<jxgvml:" + e + ' class="jxgvml">')
        }
    } catch (f) {
        this.createNode = function (e) {
            return d.ownerDocument.createElement("<" + e + ' xmlns="urn:schemas-microsoft.com:vml" class="jxgvml">')
        }
    }
    this.dashArray = ["Solid", "1 1", "ShortDash", "Dash", "LongDash", "ShortDashDot", "LongDashDot"]
};
JXG.VMLRenderer.prototype = new JXG.AbstractRenderer();
JXG.extend(JXG.VMLRenderer.prototype, {
    _setAttr: function (g, f, i, d) {
        try {
            if (document.documentMode === 8) {
                g[f] = i
            } else {
                g.setAttribute(f, i, d)
            }
        } catch (h) {
            JXG.debug("_setAttr: " + f + " " + i + "<br>\n")
        }
    },
    updateTicks: function (h, j, e, k, g) {
        var f = [],
            l, m, n, o, d = this.resolution;
        m = h.ticks.length;
        for (l = 0; l < m; l++) {
            n = h.ticks[l];
            x = n[0];
            y = n[1];
            if (typeof x[0] != "undefined" && typeof x[1] != "undefined") {
                f.push(" m " + Math.round(d * x[0]) + ", " + Math.round(d * y[0]) + " l " + Math.round(d * x[1]) + ", " + Math.round(d * y[1]) + " ")
            }
        }
        for (l = 0; l < m; l++) {
            n = h.ticks[l].scrCoords;
            if (h.ticks[l].major && (h.board.needsFullUpdate || h.needsRegularUpdate) && h.labels[l] && h.labels[l].visProp.visible) {
                this.updateText(h.labels[l])
            }
        }
        if (!JXG.exists(h)) {
            o = this.createPrim("path", h.id);
            this.appendChildPrim(o, h.visProp.layer);
            this.appendNodesToElement(h, "path")
        }
        this._setAttr(h.rendNode, "stroked", "true");
        this._setAttr(h.rendNode, "strokecolor", h.visProp.strokecolor, 1);
        this._setAttr(h.rendNode, "strokeweight", h.visProp.strokewidth);
        this._setAttr(h.rendNodeStroke, "opacity", (h.visProp.strokeopacity * 100) + "%");
        this.updatePathPrim(h.rendNode, f, h.board)
    },
    displayCopyright: function (f, g) {
        var e, d;
        e = this.createNode("textbox");
        e.style.position = "absolute";
        this._setAttr(e, "id", this.container.id + "_licenseText");
        e.style.left = 20;
        e.style.top = 2;
        e.style.fontSize = g;
        e.style.color = "#356AA0";
        e.style.fontFamily = "Arial,Helvetica,sans-serif";
        this._setAttr(e, "opacity", "30%");
        e.style.filter = "alpha(opacity = 30)";
        d = document.createTextNode(f);
        e.appendChild(d);
        this.appendChildPrim(e, 0)
    },
    drawInternalText: function (d) {
        var e;
        e = this.createNode("textbox");
        e.style.position = "absolute";
        d.rendNodeText = document.createTextNode("");
        e.appendChild(d.rendNodeText);
        this.appendChildPrim(e, 9);
        return e
    },
    updateInternalText: function (d) {
        var e = d.plaintext;
        if (!isNaN(d.coords.scrCoords[1] + d.coords.scrCoords[2])) {
            if (d.visProp.anchorx === "right") {
                d.rendNode.style.right = parseInt(d.board.canvasWidth - d.coords.scrCoords[1]) + "px"
            } else {
                if (d.visProp.anchorx === "middle") {
                    d.rendNode.style.left = parseInt(d.coords.scrCoords[1] - 0.5 * d.size[0]) + "px"
                } else {
                    d.rendNode.style.left = parseInt(d.coords.scrCoords[1]) + "px"
                }
            }
            d.rendNode.style.top = parseInt(d.coords.scrCoords[2] - d.visProp.fontsize + this.vOffsetText) + "px";
            if (d.visProp.anchory === "top") {
                d.rendNode.style.top = parseInt(d.coords.scrCoords[2] + this.vOffsetText) + "px"
            } else {
                if (d.visProp.anchory === "middle") {
                    d.rendNode.style.top = parseInt(d.coords.scrCoords[2] - 0.5 * d.size[1] + this.vOffsetText) + "px"
                } else {
                    d.rendNode.style.top = parseInt(d.coords.scrCoords[2] - d.size[1] + this.vOffsetText) + "px"
                }
            }
        }
        if (d.htmlStr !== e) {
            d.rendNodeText.data = e;
            d.htmlStr = e
        }
        this.transformImage(d, d.transformations)
    },
    drawImage: function (d) {
        var e;
        e = this.container.ownerDocument.createElement("img");
        e.style.position = "absolute";
        this._setAttr(e, "id", this.container.id + "_" + d.id);
        this.container.appendChild(e);
        this.appendChildPrim(e, d.visProp.layer);
        e.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11='1.0', sizingMethod='auto expand')";
        d.rendNode = e;
        this.updateImage(d)
    },
    transformImage: function (g, r) {
        var j = g.rendNode,
            k, f = [],
            u, o = r.length,
            e, d, l, h, n, q;
        if (g.type === JXG.OBJECT_TYPE_TEXT) {
            g.updateSize()
        }
        if (o > 0) {
            q = g.rendNode.style.filter.toString();
            if (!q.match(/DXImageTransform/)) {
                j.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11='1.0', sizingMethod='auto expand') " + q
            }
            k = this.joinTransforms(g, r);
            f[0] = JXG.Math.matVecMult(k, g.coords.scrCoords);
            f[0][1] /= f[0][0];
            f[0][2] /= f[0][0];
            f[1] = JXG.Math.matVecMult(k, [1, g.coords.scrCoords[1] + g.size[0], g.coords.scrCoords[2]]);
            f[1][1] /= f[1][0];
            f[1][2] /= f[1][0];
            f[2] = JXG.Math.matVecMult(k, [1, g.coords.scrCoords[1] + g.size[0], g.coords.scrCoords[2] - g.size[1]]);
            f[2][1] /= f[2][0];
            f[2][2] /= f[2][0];
            f[3] = JXG.Math.matVecMult(k, [1, g.coords.scrCoords[1], g.coords.scrCoords[2] - g.size[1]]);
            f[3][1] /= f[3][0];
            f[3][2] /= f[3][0];
            e = f[0][1];
            l = f[0][1];
            d = f[0][2];
            h = f[0][2];
            for (n = 1; n < 4; n++) {
                e = Math.max(e, f[n][1]);
                l = Math.min(l, f[n][1]);
                d = Math.max(d, f[n][2]);
                h = Math.min(h, f[n][2])
            }
            j.style.left = parseInt(l) + "px";
            j.style.top = parseInt(h) + "px";
            j.filters.item(0).M11 = k[1][1];
            j.filters.item(0).M12 = k[1][2];
            j.filters.item(0).M21 = k[2][1];
            j.filters.item(0).M22 = k[2][2]
        }
    },
    updateImageURL: function (e) {
        var d = JXG.evaluate(e.url);
        this._setAttr(e.rendNode, "src", d)
    },
    appendChildPrim: function (d, e) {
        if (!JXG.exists(e)) {
            e = 0
        }
        d.style.zIndex = e;
        this.container.appendChild(d)
    },
    appendNodesToElement: function (d, e) {
        if (e === "shape" || e === "path" || e === "polygon") {
            d.rendNodePath = this.getElementById(d.id + "_path")
        }
        d.rendNodeFill = this.getElementById(d.id + "_fill");
        d.rendNodeStroke = this.getElementById(d.id + "_stroke");
        d.rendNodeShadow = this.getElementById(d.id + "_shadow");
        d.rendNode = this.getElementById(d.id)
    },
    createPrim: function (e, j) {
        var f, d = this.createNode("fill"),
            i = this.createNode("stroke"),
            h = this.createNode("shadow"),
            g;
        this._setAttr(d, "id", this.container.id + "_" + j + "_fill");
        this._setAttr(i, "id", this.container.id + "_" + j + "_stroke");
        this._setAttr(h, "id", this.container.id + "_" + j + "_shadow");
        if (e === "circle" || e === "ellipse") {
            f = this.createNode("oval");
            f.appendChild(d);
            f.appendChild(i);
            f.appendChild(h)
        } else {
            if (e === "polygon" || e === "path" || e === "shape" || e === "line") {
                f = this.createNode("shape");
                f.appendChild(d);
                f.appendChild(i);
                f.appendChild(h);
                g = this.createNode("path");
                this._setAttr(g, "id", this.container.id + "_" + j + "_path");
                f.appendChild(g)
            } else {
                f = this.createNode(e);
                f.appendChild(d);
                f.appendChild(i);
                f.appendChild(h)
            }
        }
        f.style.position = "absolute";
        f.style.left = "0px";
        f.style.top = "0px";
        this._setAttr(f, "id", this.container.id + "_" + j);
        return f
    },
    remove: function (d) {
        if (JXG.exists(d)) {
            d.removeNode(true)
        }
    },
    makeArrows: function (e) {
        var d;
        if (e.visPropOld.firstarrow === e.visProp.firstarrow && e.visPropOld.lastarrow === e.visProp.lastarrow) {
            return
        }
        if (e.visProp.firstarrow) {
            d = e.rendNodeStroke;
            this._setAttr(d, "startarrow", "block");
            this._setAttr(d, "startarrowlength", "long")
        } else {
            d = e.rendNodeStroke;
            if (JXG.exists(d)) {
                this._setAttr(d, "startarrow", "none")
            }
        }
        if (e.visProp.lastarrow) {
            d = e.rendNodeStroke;
            this._setAttr(d, "id", this.container.id + "_" + e.id + "stroke");
            this._setAttr(d, "endarrow", "block");
            this._setAttr(d, "endarrowlength", "long")
        } else {
            d = e.rendNodeStroke;
            if (JXG.exists(d)) {
                this._setAttr(d, "endarrow", "none")
            }
        }
        e.visPropOld.firstarrow = e.visProp.firstarrow;
        e.visPropOld.lastarrow = e.visProp.lastarrow
    },
    updateEllipsePrim: function (e, d, h, g, f) {
        e.style.left = parseInt(d - g) + "px";
        e.style.top = parseInt(h - f) + "px";
        e.style.width = parseInt(Math.abs(g) * 2) + "px";
        e.style.height = parseInt(Math.abs(f) * 2) + "px"
    },
    updateLinePrim: function (k, e, d, g, f, i) {
        var h, j = this.resolution;
        if (!isNaN(e + d + g + f)) {
            h = ["m ", parseInt(j * e), ", ", parseInt(j * d), " l ", parseInt(j * g), ", ", parseInt(j * f)];
            this.updatePathPrim(k, h, i)
        }
    },
    updatePathPrim: function (f, g, e) {
        var d = e.canvasWidth,
            h = e.canvasHeight;
        if (g.length <= 0) {
            g = ["m 0,0"]
        }
        f.style.width = d;
        f.style.height = h;
        this._setAttr(f, "coordsize", [parseInt(this.resolution * d), parseInt(this.resolution * h)].join(","));
        this._setAttr(f, "path", g.join(""))
    },
    updatePathStringPoint: function (e, k, h) {
        var j = [],
            f = Math.round,
            g = e.coords.scrCoords,
            i = k * Math.sqrt(3) * 0.5,
            l = k * 0.5,
            d = this.resolution;
        if (h === "x") {
            j.push([" m ", f(d * (g[1] - k)), ", ", f(d * (g[2] - k)), " l ", f(d * (g[1] + k)), ", ", f(d * (g[2] + k)), " m ", f(d * (g[1] + k)), ", ", f(d * (g[2] - k)), " l ", f(d * (g[1] - k)), ", ", f(d * (g[2] + k))].join(""))
        } else {
            if (h === "+") {
                j.push([" m ", f(d * (g[1] - k)), ", ", f(d * (g[2])), " l ", f(d * (g[1] + k)), ", ", f(d * (g[2])), " m ", f(d * (g[1])), ", ", f(d * (g[2] - k)), " l ", f(d * (g[1])), ", ", f(d * (g[2] + k))].join(""))
            } else {
                if (h === "<>") {
                    j.push([" m ", f(d * (g[1] - k)), ", ", f(d * (g[2])), " l ", f(d * (g[1])), ", ", f(d * (g[2] + k)), " l ", f(d * (g[1] + k)), ", ", f(d * (g[2])), " l ", f(d * (g[1])), ", ", f(d * (g[2] - k)), " x e "].join(""))
                } else {
                    if (h === "^") {
                        j.push([" m ", f(d * (g[1])), ", ", f(d * (g[2] - k)), " l ", f(d * (g[1] - i)), ", ", f(d * (g[2] + l)), " l ", f(d * (g[1] + i)), ", ", f(d * (g[2] + l)), " x e "].join(""))
                    } else {
                        if (h === "v") {
                            j.push([" m ", f(d * (g[1])), ", ", f(d * (g[2] + k)), " l ", f(d * (g[1] - i)), ", ", f(d * (g[2] - l)), " l ", f(d * (g[1] + i)), ", ", f(d * (g[2] - l)), " x e "].join(""))
                        } else {
                            if (h === ">") {
                                j.push([" m ", f(d * (g[1] + k)), ", ", f(d * (g[2])), " l ", f(d * (g[1] - l)), ", ", f(d * (g[2] - i)), " l ", f(d * (g[1] - l)), ", ", f(d * (g[2] + i)), " l ", f(d * (g[1] + k)), ", ", f(d * (g[2]))].join(""))
                            } else {
                                if (h === "<") {
                                    j.push([" m ", f(d * (g[1] - k)), ", ", f(d * (g[2])), " l ", f(d * (g[1] + l)), ", ", f(d * (g[2] - i)), " l ", f(d * (g[1] + l)), ", ", f(d * (g[2] + i)), " x e "].join(""))
                                }
                            }
                        }
                    }
                }
            }
        }
        return j
    },
    updatePathStringPrim: function (e) {
        var l = [],
            k, n, d = this.resolution,
            j = Math.round,
            g = " m ",
            h = " l ",
            o = " c ",
            f = g,
            p = (e.visProp.curvetype !== "plot"),
            m = Math.min(e.numberPoints, 8192);
        if (e.numberPoints <= 0) {
            return ""
        }
        m = Math.min(m, e.points.length);
        if (e.bezierDegree == 1) {
            if (p && e.board.options.curve.RDPsmoothing) {
                e.points = JXG.Math.Numerics.RamerDouglasPeuker(e.points, 1)
            }
            for (k = 0; k < m; k++) {
                n = e.points[k].scrCoords;
                if (isNaN(n[1]) || isNaN(n[2])) {
                    f = g
                } else {
                    if (n[1] > 20000) {
                        n[1] = 20000
                    } else {
                        if (n[1] < -20000) {
                            n[1] = -20000
                        }
                    }
                    if (n[2] > 20000) {
                        n[2] = 20000
                    } else {
                        if (n[2] < -20000) {
                            n[2] = -20000
                        }
                    }
                    l.push([f, j(d * n[1]), ", ", j(d * n[2])].join(""));
                    f = h
                }
            }
        } else {
            if (e.bezierDegree == 3) {
                k = 0;
                while (k < m) {
                    n = e.points[k].scrCoords;
                    if (isNaN(n[1]) || isNaN(n[2])) {
                        f = g
                    } else {
                        l.push([f, j(d * n[1]), ", ", j(d * n[2])].join(""));
                        if (f == o) {
                            k++;
                            n = e.points[k].scrCoords;
                            l.push([" ", j(d * n[1]), ", ", j(d * n[2])].join(""));
                            k++;
                            n = e.points[k].scrCoords;
                            l.push([" ", j(d * n[1]), ", ", j(d * n[2])].join(""))
                        }
                        f = o
                    }
                    k++
                }
            }
        }
        l.push(" e");
        return l
    },
    updatePathStringBezierPrim: function (g) {
        var q = [],
            p, o, u, k, e, t = g.visProp.strokewidth,
            d = this.resolution,
            n = Math.round,
            l = " m ",
            m = " c ",
            h = l,
            v = (g.visProp.curvetype !== "plot"),
            s = Math.min(g.numberPoints, 8192);
        if (g.numberPoints <= 0) {
            return ""
        }
        if (v && g.board.options.curve.RDPsmoothing) {
            g.points = JXG.Math.Numerics.RamerDouglasPeuker(g.points, 1)
        }
        s = Math.min(s, g.points.length);
        for (o = 1; o < 3; o++) {
            h = l;
            for (p = 0; p < s; p++) {
                u = g.points[p].scrCoords;
                if (isNaN(u[1]) || isNaN(u[2])) {
                    h = l
                } else {
                    if (u[1] > 20000) {
                        u[1] = 20000
                    } else {
                        if (u[1] < -20000) {
                            u[1] = -20000
                        }
                    }
                    if (u[2] > 20000) {
                        u[2] = 20000
                    } else {
                        if (u[2] < -20000) {
                            u[2] = -20000
                        }
                    }
                    if (h == l) {
                        q.push([h, n(d * (u[1] + 0 * t * (2 * o * Math.random() - o))), " ", n(d * (u[2] + 0 * t * (2 * o * Math.random() - o)))].join(""))
                    } else {
                        q.push([h, n(d * (k + (u[1] - k) * 0.333 + t * (2 * o * Math.random() - o))), " ", n(d * (e + (u[2] - e) * 0.333 + t * (2 * o * Math.random() - o))), " ", n(d * (k + 2 * (u[1] - k) * 0.333 + t * (2 * o * Math.random() - o))), " ", n(d * (e + 2 * (u[2] - e) * 0.333 + t * (2 * o * Math.random() - o))), " ", n(d * u[1]), " ", n(d * u[2])].join(""))
                    }
                    h = m;
                    k = u[1];
                    e = u[2]
                }
            }
        }
        q.push(" e");
        return q
    },
    updatePolygonPrim: function (h, f) {
        var e, d = f.vertices.length,
            g = this.resolution,
            j, k = [];
        this._setAttr(h, "stroked", "false");
        j = f.vertices[0].coords.scrCoords;
        if (isNaN(j[1] + j[2])) {
            return
        }
        k.push(["m ", parseInt(g * j[1]), ",", parseInt(g * j[2]), " l "].join(""));
        for (e = 1; e < d - 1; e++) {
            if (f.vertices[e].isReal) {
                j = f.vertices[e].coords.scrCoords;
                if (isNaN(j[1] + j[2])) {
                    return
                }
                k.push(parseInt(g * j[1]) + "," + parseInt(g * j[2]))
            } else {
                this.updatePathPrim(h, "", f.board);
                return
            }
            if (e < d - 2) {
                k.push(", ")
            }
        }
        k.push(" x e");
        this.updatePathPrim(h, k, f.board)
    },
    updateRectPrim: function (g, d, i, e, f) {
        g.style.left = parseInt(d) + "px";
        g.style.top = parseInt(i) + "px";
        if (e >= 0) {
            g.style.width = e + "px"
        }
        if (f >= 0) {
            g.style.height = f + "px"
        }
    },
    setPropertyPrim: function (g, f, h) {
        var e = "",
            d;
        switch (f) {
            case "stroke":
                e = "strokecolor";
                break;
            case "stroke-width":
                e = "strokeweight";
                break;
            case "stroke-dasharray":
                e = "dashstyle";
                break
        }
        if (e !== "") {
            d = JXG.evaluate(h);
            this._setAttr(g, e, d)
        }
    },
    show: function (d) {
        if (d && d.rendNode) {
            d.rendNode.style.visibility = "inherit"
        }
    },
    hide: function (d) {
        if (d && d.rendNode) {
            d.rendNode.style.visibility = "hidden"
        }
    },
    setDashStyle: function (e, d) {
        var f;
        if (d.dash >= 0) {
            f = e.rendNodeStroke;
            this._setAttr(f, "dashstyle", this.dashArray[d.dash])
        }
    },
    setGradient: function (e) {
        var d = e.rendNodeFill;
        if (e.visProp.gradient === "linear") {
            this._setAttr(d, "type", "gradient");
            this._setAttr(d, "color2", e.visProp.gradientsecondcolor);
            this._setAttr(d, "opacity2", e.visProp.gradientsecondopacity);
            this._setAttr(d, "angle", e.visProp.gradientangle)
        } else {
            if (e.visProp.gradient === "radial") {
                this._setAttr(d, "type", "gradientradial");
                this._setAttr(d, "color2", e.visProp.gradientsecondcolor);
                this._setAttr(d, "opacity2", e.visProp.gradientsecondopacity);
                this._setAttr(d, "focusposition", e.visProp.gradientpositionx * 100 + "%," + e.visProp.gradientpositiony * 100 + "%");
                this._setAttr(d, "focussize", "0,0")
            } else {
                this._setAttr(d, "type", "solid")
            }
        }
    },
    setObjectFillColor: function (e, h, i) {
        var g = JXG.evaluate(h),
            k, l, d = JXG.evaluate(i),
            j, f = e.rendNode,
            m;
        d = (d > 0) ? d : 0;
        if (e.visPropOld.fillcolor === g && e.visPropOld.fillopacity === d) {
            return
        }
        if (JXG.exists(g) && g !== false) {
            if (g.length != 9) {
                k = g;
                j = d
            } else {
                l = JXG.rgba2rgbo(g);
                k = l[0];
                j = d * l[1]
            }
            if (k === "none" || k === false) {
                this._setAttr(e.rendNode, "filled", "false")
            } else {
                this._setAttr(e.rendNode, "filled", "true");
                this._setAttr(e.rendNode, "fillcolor", k);
                if (JXG.exists(j) && e.rendNodeFill) {
                    this._setAttr(e.rendNodeFill, "opacity", (j * 100) + "%")
                }
            }
            if (e.type === JXG.OBJECT_TYPE_IMAGE) {
                m = e.rendNode.style.filter.toString();
                if (m.match(/alpha/)) {
                    e.rendNode.style.filter = m.replace(/alpha\(opacity *= *[0-9\.]+\)/, "alpha(opacity = " + (j * 100) + ")")
                } else {
                    e.rendNode.style.filter += " alpha(opacity = " + (j * 100) + ")"
                }
            }
        }
        e.visPropOld.fillcolor = g;
        e.visPropOld.fillopacity = d
    },
    setObjectStrokeColor: function (f, i, j) {
        var h = JXG.evaluate(i),
            l, m, e = JXG.evaluate(j),
            k, g = f.rendNode,
            d;
        e = (e > 0) ? e : 0;
        if (f.visPropOld.strokecolor === h && f.visPropOld.strokeopacity === e) {
            return
        }
        if (JXG.exists(h) && h !== false) {
            if (h.length != 9) {
                l = h;
                k = e
            } else {
                m = JXG.rgba2rgbo(h);
                l = m[0];
                k = e * m[1]
            }
            if (f.type === JXG.OBJECT_TYPE_TEXT) {
                k = Math.round(k * 100);
                g.style.filter = " alpha(opacity = " + k + ")";
                g.style.color = l
            } else {
                if (l !== false) {
                    this._setAttr(g, "stroked", "true");
                    this._setAttr(g, "strokecolor", l)
                }
                d = f.rendNodeStroke;
                if (JXG.exists(k) && f.type !== JXG.OBJECT_TYPE_IMAGE) {
                    this._setAttr(d, "opacity", (k * 100) + "%")
                }
            }
        }
        f.visPropOld.strokecolor = h;
        f.visPropOld.strokeopacity = e
    },
    setObjectStrokeWidth: function (f, e) {
        var d = JXG.evaluate(e),
            g;
        if (f.visPropOld.strokewidth === d) {
            return
        }
        g = f.rendNode;
        this.setPropertyPrim(g, "stroked", "true");
        if (JXG.exists(d)) {
            this.setPropertyPrim(g, "stroke-width", d)
        }
        f.visPropOld.strokewidth = d
    },
    setShadow: function (d) {
        var e = d.rendNodeShadow;
        if (!e || d.visPropOld.shadow === d.visProp.shadow) {
            return
        }
        if (d.visProp.shadow) {
            this._setAttr(e, "On", "True");
            this._setAttr(e, "Offset", "3pt,3pt");
            this._setAttr(e, "Opacity", "60%");
            this._setAttr(e, "Color", "#aaaaaa")
        } else {
            this._setAttr(e, "On", "False")
        }
        d.visPropOld.shadow = d.visProp.shadow
    },
    suspendRedraw: function () {
        this.container.style.display = "none"
    },
    unsuspendRedraw: function () {
        this.container.style.display = ""
    }
});
JXG.CanvasRenderer = function (d) {
    var e;
    this.type = "canvas";
    this.canvasRoot = null;
    this.suspendHandle = null;
    this.canvasId = JXG.Util.genUUID();
    this.canvasNamespace = null;
    this.container = d;
    this.container.style.MozUserSelect = "none";
    this.container.style.overflow = "hidden";
    if (this.container.style.position === "") {
        this.container.style.position = "relative"
    }
    this.container.innerHTML = ['<canvas id="', this.canvasId, '" width="', JXG.getStyle(this.container, "width"), '" height="', JXG.getStyle(this.container, "height"), '"><', "/canvas>"].join("");
    this.canvasRoot = document.getElementById(this.canvasId);
    this.context = this.canvasRoot.getContext("2d");
    this.dashArray = [
        [2, 2],
        [5, 5],
        [10, 10],
        [20, 20],
        [20, 10, 10, 10],
        [20, 5, 10, 5]
    ]
};
JXG.CanvasRenderer.prototype = new JXG.AbstractRenderer();
JXG.extend(JXG.CanvasRenderer.prototype, {
    _drawFilledPolygon: function (e) {
        var g, d = e.length,
            f = this.context;
        if (d > 0) {
            f.beginPath();
            f.moveTo(e[0][0], e[0][1]);
            for (g = 0; g < d; g++) {
                if (g > 0) {
                    f.lineTo(e[g][0], e[g][1])
                }
            }
            f.lineTo(e[0][0], e[0][1]);
            f.fill()
        }
    },
    _fill: function (e) {
        var d = this.context;
        d.save();
        if (this._setColor(e, "fill")) {
            d.fill()
        }
        d.restore()
    },
    _rotatePoint: function (e, d, f) {
        return [(d * Math.cos(e)) - (f * Math.sin(e)), (d * Math.sin(e)) + (f * Math.cos(e))]
    },
    _rotateShape: function (e, g) {
        var f, h = [],
            d = e.length;
        if (d <= 0) {
            return e
        }
        for (f = 0; f < d; f++) {
            h.push(this._rotatePoint(g, e[f][0], e[f][1]))
        }
        return h
    },
    _setColor: function (i, m, d) {
        var j = true,
            g = false,
            p = i.visProp,
            e, h, n, l, f, k;
        m = m || "stroke";
        d = d || m;
        if (!JXG.exists(i.board) || !JXG.exists(i.board.highlightedObjects)) {
            g = true
        }
        if (!g && JXG.exists(i.board.highlightedObjects[i.id])) {
            e = "highlight"
        } else {
            e = ""
        }
        h = JXG.evaluate(p[e + m + "color"]);
        if (h !== "none" && h !== false) {
            f = JXG.evaluate(p[e + m + "opacity"]);
            f = (f > 0) ? f : 0;
            if (h.length != 9) {
                l = h;
                k = f
            } else {
                n = JXG.rgba2rgbo(h);
                l = n[0];
                k = f * n[1]
            }
            this.context.globalAlpha = k;
            this.context[d + "Style"] = l
        } else {
            j = false
        }
        if (m === "stroke") {
            this.context.lineWidth = parseFloat(p.strokewidth)
        }
        return j
    },
    _stroke: function (e) {
        var d = this.context;
        d.save();
        if (e.visProp.dash > 0) {
            if (d.setLineDash) {
                d.setLineDash(this.dashArray[e.visProp.dash])
            }
        } else {
            this.context.lineDashArray = []
        }
        if (this._setColor(e, "stroke")) {
            d.stroke()
        }
        d.restore()
    },
    _translateShape: function (f, e, j) {
        var g, h = [],
            d = f.length;
        if (d <= 0) {
            return f
        }
        for (g = 0; g < d; g++) {
            h.push([f[g][0] + e, f[g][1] + j])
        }
        return h
    },
    drawPoint: function (i) {
        var j = i.visProp.face,
            h = i.visProp.size,
            l = i.coords.scrCoords,
            k = h * Math.sqrt(3) * 0.5,
            d = h * 0.5,
            e = parseFloat(i.visProp.strokewidth) / 2,
            g = this.context;
        switch (j) {
            case "cross":
            case "x":
                g.beginPath();
                g.moveTo(l[1] - h, l[2] - h);
                g.lineTo(l[1] + h, l[2] + h);
                g.moveTo(l[1] + h, l[2] - h);
                g.lineTo(l[1] - h, l[2] + h);
                g.closePath();
                this._stroke(i);
                break;
            case "circle":
            case "o":
                g.beginPath();
                g.arc(l[1], l[2], h + 1 + e, 0, 2 * Math.PI, false);
                g.closePath();
                this._fill(i);
                this._stroke(i);
                break;
            case "square":
            case "[]":
                if (h <= 0) {
                    break
                }
                g.save();
                if (this._setColor(i, "stroke", "fill")) {
                    g.fillRect(l[1] - h - e, l[2] - h - e, h * 2 + 3 * e, h * 2 + 3 * e)
                }
                g.restore();
                g.save();
                this._setColor(i, "fill");
                g.fillRect(l[1] - h + e, l[2] - h + e, h * 2 - e, h * 2 - e);
                g.restore();
                break;
            case "plus":
            case "+":
                g.beginPath();
                g.moveTo(l[1] - h, l[2]);
                g.lineTo(l[1] + h, l[2]);
                g.moveTo(l[1], l[2] - h);
                g.lineTo(l[1], l[2] + h);
                g.closePath();
                this._stroke(i);
                break;
            case "diamond":
            case "<>":
                g.beginPath();
                g.moveTo(l[1] - h, l[2]);
                g.lineTo(l[1], l[2] + h);
                g.lineTo(l[1] + h, l[2]);
                g.lineTo(l[1], l[2] - h);
                g.closePath();
                this._fill(i);
                this._stroke(i);
                break;
            case "triangleup":
            case "a":
            case "^":
                g.beginPath();
                g.moveTo(l[1], l[2] - h);
                g.lineTo(l[1] - k, l[2] + d);
                g.lineTo(l[1] + k, l[2] + d);
                g.closePath();
                this._fill(i);
                this._stroke(i);
                break;
            case "triangledown":
            case "v":
                g.beginPath();
                g.moveTo(l[1], l[2] + h);
                g.lineTo(l[1] - k, l[2] - d);
                g.lineTo(l[1] + k, l[2] - d);
                g.closePath();
                this._fill(i);
                this._stroke(i);
                break;
            case "triangleleft":
            case "<":
                g.beginPath();
                g.moveTo(l[1] - h, l[2]);
                g.lineTo(l[1] + d, l[2] - k);
                g.lineTo(l[1] + d, l[2] + k);
                g.closePath();
                this.fill(i);
                this._stroke(i);
                break;
            case "triangleright":
            case ">":
                g.beginPath();
                g.moveTo(l[1] + h, l[2]);
                g.lineTo(l[1] - d, l[2] - k);
                g.lineTo(l[1] - d, l[2] + k);
                g.closePath();
                this._fill(i);
                this._stroke(i);
                break
        }
    },
    updatePoint: function (d) {
        this.drawPoint(d)
    },
    drawLine: function (d) {
        var f = new JXG.Coords(JXG.COORDS_BY_USER, d.point1.coords.usrCoords, d.board),
            e = new JXG.Coords(JXG.COORDS_BY_USER, d.point2.coords.usrCoords, d.board);
        JXG.Math.Geometry.calcStraight(d, f, e);
        this.context.beginPath();
        this.context.moveTo(f.scrCoords[1], f.scrCoords[2]);
        this.context.lineTo(e.scrCoords[1], e.scrCoords[2]);
        this._stroke(d);
        this.makeArrows(d, f, e)
    },
    updateLine: function (d) {
        this.drawLine(d)
    },
    drawTicks: function () {},
    updateTicks: function (g, h, e, j, f) {
        var k, m, l = g.ticks.length,
            d = this.context;
        d.beginPath();
        for (k = 0; k < l; k++) {
            m = g.ticks[k];
            x = m[0];
            y = m[1];
            d.moveTo(x[0], y[0]);
            d.lineTo(x[1], y[1])
        }
        for (k = 0; k < l; k++) {
            m = g.ticks[k].scrCoords;
            if (g.ticks[k].major && (g.board.needsFullUpdate || g.needsRegularUpdate) && g.labels[k] && g.labels[k].visProp.visible) {
                this.updateText(g.labels[k])
            }
        }
        this._stroke(g)
    },
    drawCurve: function (d) {
        if (d.visProp.handdrawing) {
            this.updatePathStringBezierPrim(d)
        } else {
            this.updatePathStringPrim(d)
        }
    },
    updateCurve: function (d) {
        this.drawCurve(d)
    },
    drawEllipse: function (f) {
        var e = f.center.coords.scrCoords[1],
            d = f.center.coords.scrCoords[2],
            n = f.board.unitX,
            m = f.board.unitY,
            t = 2 * f.Radius(),
            s = 2 * f.Radius(),
            q = t * n,
            l = s * m,
            i = e - q / 2,
            h = d - l / 2,
            u = (q / 2) * 0.5522848,
            r = (l / 2) * 0.5522848,
            p = i + q,
            o = h + l,
            k = i + q / 2,
            j = h + l / 2,
            g = this.context;
        if (t > 0 && s > 0 && !isNaN(e + d)) {
            g.beginPath();
            g.moveTo(i, j);
            g.bezierCurveTo(i, j - r, k - u, h, k, h);
            g.bezierCurveTo(k + u, h, p, j - r, p, j);
            g.bezierCurveTo(p, j + r, k + u, o, k, o);
            g.bezierCurveTo(k - u, o, i, j + r, i, j);
            g.closePath();
            this._fill(f);
            this._stroke(f)
        }
    },
    updateEllipse: function (d) {
        return this.drawEllipse(d)
    },
    displayCopyright: function (f, e) {
        var d = this.context;
        d.save();
        d.font = e + "px Arial";
        d.fillStyle = "#aaa";
        d.lineWidth = 0.5;
        d.fillText(f, 10, 2 + e);
        d.restore()
    },
    drawInternalText: function (f) {
        var d, e = this.context;
        e.save();
        if (this._setColor(f, "stroke", "fill") && !isNaN(f.coords.scrCoords[1] + f.coords.scrCoords[2])) {
            if (f.visProp.fontsize) {
                if (typeof f.visProp.fontsize === "function") {
                    d = f.visProp.fontsize();
                    e.font = (d > 0 ? d : 0) + "px Arial"
                } else {
                    e.font = (f.visProp.fontsize) + "px Arial"
                }
            }
            this.transformImage(f, f.transformations);
            if (f.visProp.anchorx === "right") {
                e.textAlign = "right"
            } else {
                if (f.visProp.anchorx === "middle") {
                    e.textAlign = "center"
                }
            }
            if (f.visProp.anchory === "top") {
                e.textBaseline = "top"
            } else {
                if (f.visProp.anchory === "middle") {
                    e.textBaseline = "middle"
                }
            }
            e.fillText(f.plaintext, f.coords.scrCoords[1], f.coords.scrCoords[2])
        }
        e.restore();
        return null
    },
    updateInternalText: function (d) {
        this.drawInternalText(d)
    },
    setObjectStrokeColor: function (e, h, i) {
        var g = JXG.evaluate(h),
            k, l, d = JXG.evaluate(i),
            j, f;
        d = (d > 0) ? d : 0;
        if (e.visPropOld.strokecolor === g && e.visPropOld.strokeopacity === d) {
            return
        }
        if (JXG.exists(g) && g !== false) {
            if (g.length != 9) {
                k = g;
                j = d
            } else {
                l = JXG.rgba2rgbo(g);
                k = l[0];
                j = d * l[1]
            }
            f = e.rendNode;
            if (e.type === JXG.OBJECT_TYPE_TEXT && e.visProp.display === "html") {
                f.style.color = k;
                f.style.opacity = j
            }
        }
        e.visPropOld.strokecolor = g;
        e.visPropOld.strokeopacity = d
    },
    drawImage: function (d) {
        d.rendNode = new Image();
        d._src = "";
        this.updateImage(d)
    },
    updateImage: function (e) {
        var d = this.context,
            f = JXG.evaluate(e.visProp.fillopacity),
            g = JXG.bind(function () {
                e.imgIsLoaded = true;
                if (e.size[0] <= 0 || e.size[1] <= 0) {
                    return
                }
                d.save();
                d.globalAlpha = f;
                this.transformImage(e, e.transformations);
                d.drawImage(e.rendNode, e.coords.scrCoords[1], e.coords.scrCoords[2] - e.size[1], e.size[0], e.size[1]);
                d.restore()
            }, this);
        if (this.updateImageURL(e)) {
            e.rendNode.onload = g
        } else {
            if (e.imgIsLoaded) {
                g()
            }
        }
    },
    transformImage: function (h, g) {
        var e, d = g.length,
            f = this.context;
        if (d > 0) {
            e = this.joinTransforms(h, g);
            if (Math.abs(JXG.Math.Numerics.det(e)) >= JXG.Math.eps) {
                f.transform(e[1][1], e[2][1], e[1][2], e[2][2], e[1][0], e[2][0])
            }
        }
    },
    updateImageURL: function (e) {
        var d;
        d = JXG.evaluate(e.url);
        if (e._src !== d) {
            e.imgIsLoaded = false;
            e.rendNode.src = d;
            e._src = d;
            return true
        }
        return false
    },
    remove: function (d) {
        if (JXG.exists(d) && JXG.exists(d.parentNode)) {
            d.parentNode.removeChild(d)
        }
    },
    makeArrows: function (h, l, j) {
        var n = Math.min(h.visProp.strokewidth / 2, 3),
            f = [
                [2, 0],
                [-10, - 4 * n],
                [-10, 4 * n],
                [2, 0]
            ],
            o = [
                [-2, 0],
                [10, - 4 * n],
                [10, 4 * n]
            ],
            g, m, d, k, i, e = this.context;
        if (h.visProp.strokecolor !== "none" && (h.visProp.lastarrow || h.visProp.firstarrow)) {
            if (h.elementClass === JXG.OBJECT_CLASS_LINE) {
                g = l.scrCoords[1];
                m = l.scrCoords[2];
                d = j.scrCoords[1];
                k = j.scrCoords[2]
            } else {
                return
            }
            e.save();
            if (this._setColor(h, "stroke", "fill")) {
                i = Math.atan2(k - m, d - g);
                if (h.visProp.lastarrow) {
                    this._drawFilledPolygon(this._translateShape(this._rotateShape(f, i), d, k))
                }
                if (h.visProp.firstarrow) {
                    this._drawFilledPolygon(this._translateShape(this._rotateShape(o, i), g, m))
                }
            }
            e.restore()
        }
    },
    updatePathStringPrim: function (e) {
        var g = "M",
            h = "L",
            o = "C",
            f = g,
            p = 5000,
            j, l, n, m, q = (e.visProp.curvetype !== "plot"),
            k, d = this.context;
        if (e.numberPoints <= 0) {
            return
        }
        k = Math.min(e.points.length, e.numberPoints);
        d.beginPath();
        if (e.bezierDegree == 1) {
            if (q && e.board.options.curve.RDPsmoothing) {
                e.points = JXG.Math.Numerics.RamerDouglasPeuker(e.points, 0.5)
            }
            for (j = 0; j < k; j++) {
                l = e.points[j].scrCoords;
                if (isNaN(l[1]) || isNaN(l[2])) {
                    f = g
                } else {
                    if (l[1] > p) {
                        l[1] = p
                    } else {
                        if (l[1] < -p) {
                            l[1] = -p
                        }
                    }
                    if (l[2] > p) {
                        l[2] = p
                    } else {
                        if (l[2] < -p) {
                            l[2] = -p
                        }
                    }
                    if (f === g) {
                        d.moveTo(l[1], l[2])
                    } else {
                        d.lineTo(l[1], l[2])
                    }
                    f = h
                }
            }
        } else {
            if (e.bezierDegree == 3) {
                j = 0;
                while (j < k) {
                    l = e.points[j].scrCoords;
                    if (isNaN(l[1]) || isNaN(l[2])) {
                        f = g
                    } else {
                        if (f === g) {
                            d.moveTo(l[1], l[2])
                        } else {
                            j++;
                            n = e.points[j].scrCoords;
                            j++;
                            m = e.points[j].scrCoords;
                            d.bezierCurveTo(l[1], l[2], n[1], n[2], m[1], m[2])
                        }
                        f = o
                    }
                    j++
                }
            }
        }
        this._fill(e);
        this._stroke(e)
    },
    updatePathStringBezierPrim: function (g) {
        var l = "M",
            m = "C",
            k = l,
            t = 5000,
            o, n, r, h, e, q = g.visProp.strokewidth,
            s = (g.visProp.curvetype !== "plot"),
            p, d = this.context;
        if (g.numberPoints <= 0) {
            return
        }
        if (s && g.board.options.curve.RDPsmoothing) {
            g.points = JXG.Math.Numerics.RamerDouglasPeuker(g.points, 0.5)
        }
        p = Math.min(g.points.length, g.numberPoints);
        d.beginPath();
        for (n = 1; n < 3; n++) {
            k = l;
            for (o = 0; o < p; o++) {
                r = g.points[o].scrCoords;
                if (isNaN(r[1]) || isNaN(r[2])) {
                    k = l
                } else {
                    if (r[1] > t) {
                        r[1] = t
                    } else {
                        if (r[1] < -t) {
                            r[1] = -t
                        }
                    }
                    if (r[2] > t) {
                        r[2] = t
                    } else {
                        if (r[2] < -t) {
                            r[2] = -t
                        }
                    }
                    if (k == l) {
                        d.moveTo(r[1] + 0 * q * (2 * n * Math.random() - n), r[2] + 0 * q * (2 * n * Math.random() - n))
                    } else {
                        d.bezierCurveTo((h + (r[1] - h) * 0.333 + q * (2 * n * Math.random() - n)), (e + (r[2] - e) * 0.333 + q * (2 * n * Math.random() - n)), (h + 2 * (r[1] - h) * 0.333 + q * (2 * n * Math.random() - n)), (e + 2 * (r[2] - e) * 0.333 + q * (2 * n * Math.random() - n)), r[1], r[2])
                    }
                    k = m;
                    h = r[1];
                    e = r[2]
                }
            }
        }
        this._fill(g);
        this._stroke(g)
    },
    updatePolygonPrim: function (k, j) {
        var f, h, e = j.vertices.length,
            g = this.context,
            d = true;
        if (e <= 0) {
            return
        }
        g.beginPath();
        h = 0;
        while (!j.vertices[h].isReal && h < e - 1) {
            h++;
            d = false
        }
        f = j.vertices[h].coords.scrCoords;
        g.moveTo(f[1], f[2]);
        for (h = h; h < e - 1; h++) {
            if (!j.vertices[h].isReal) {
                d = false
            }
            f = j.vertices[h].coords.scrCoords;
            g.lineTo(f[1], f[2])
        }
        g.closePath();
        if (d) {
            this._fill(j)
        }
    },
    show: function (d) {
        if (JXG.exists(d.rendNode)) {
            d.rendNode.style.visibility = "inherit"
        }
    },
    hide: function (d) {
        if (JXG.exists(d.rendNode)) {
            d.rendNode.style.visibility = "hidden"
        }
    },
    setGradient: function (e) {
        var d, f;
        f = JXG.evaluate(e.visProp.fillopacity);
        f = (f > 0) ? f : 0;
        d = JXG.evaluate(e.visProp.fillcolor)
    },
    setShadow: function (d) {
        if (d.visPropOld.shadow === d.visProp.shadow) {
            return
        }
        d.visPropOld.shadow = d.visProp.shadow
    },
    highlight: function (d) {
        if (d.type === JXG.OBJECT_TYPE_TEXT && d.visProp.display === "html") {
            this.updateTextStyle(d, true)
        } else {
            d.board.prepareUpdate();
            d.board.renderer.suspendRedraw(d.board);
            d.board.updateRenderer();
            d.board.renderer.unsuspendRedraw()
        }
        return this
    },
    noHighlight: function (d) {
        if (d.type === JXG.OBJECT_TYPE_TEXT && d.visProp.display === "html") {
            this.updateTextStyle(d, false)
        } else {
            d.board.prepareUpdate();
            d.board.renderer.suspendRedraw(d.board);
            d.board.updateRenderer();
            d.board.renderer.unsuspendRedraw()
        }
        return this
    },
    suspendRedraw: function (d) {
        this.context.save();
        this.context.clearRect(0, 0, this.canvasRoot.width, this.canvasRoot.height);
        if (d && d.showCopyright) {
            this.displayCopyright(JXG.JSXGraph.licenseText, 12)
        }
    },
    unsuspendRedraw: function () {
        this.context.restore()
    },
    resize: function (d, e) {
        this.canvasRoot.style.width = parseFloat(d) + "px";
        this.canvasRoot.style.height = parseFloat(e) + "px";
        this.canvasRoot.setAttribute("width", parseFloat(d) + "px");
        this.canvasRoot.setAttribute("height", parseFloat(e) + "px")
    }
});