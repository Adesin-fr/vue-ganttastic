import z from "dayjs";
import { inject as Le, computed as G, defineComponent as se, openBlock as S, createElementBlock as F, Fragment as ge, renderList as we, unref as B, normalizeStyle as U, renderSlot as j, createElementVNode as N, toDisplayString as ie, createTextVNode as xe, createCommentVNode as te, toRefs as ke, ref as L, watch as $e, nextTick as Ze, createBlock as ve, Teleport as ht, createVNode as Fe, Transition as vt, withCtx as re, getCurrentScope as gt, onScopeDispose as pt, getCurrentInstance as bt, onMounted as He, useSlots as yt, onUnmounted as wt, provide as Ce, normalizeClass as Ge, withModifiers as xt, mergeProps as kt, TransitionGroup as Et } from "vue";
var ce = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ke = { exports: {} };
(function(e, m) {
  (function(t, r) {
    e.exports = r();
  })(ce, function() {
    var t = "day";
    return function(r, g, f) {
      var u = function(s) {
        return s.add(4 - s.isoWeekday(), t);
      }, o = g.prototype;
      o.isoWeekYear = function() {
        return u(this).year();
      }, o.isoWeek = function(s) {
        if (!this.$utils().u(s))
          return this.add(7 * (s - this.isoWeek()), t);
        var a, c, h, b, w = u(this), D = (a = this.isoWeekYear(), c = this.$u, h = (c ? f.utc : f)().year(a).startOf("year"), b = 4 - h.isoWeekday(), h.isoWeekday() > 4 && (b += 7), h.add(b, t));
        return w.diff(D, "week") + 1;
      }, o.isoWeekday = function(s) {
        return this.$utils().u(s) ? this.day() || 7 : this.day(this.day() % 7 ? s : s - 7);
      };
      var i = o.startOf;
      o.startOf = function(s, a) {
        var c = this.$utils(), h = !!c.u(a) || a;
        return c.p(s) === "isoweek" ? h ? this.date(this.date() - (this.isoWeekday() - 1)).startOf("day") : this.date(this.date() - 1 - (this.isoWeekday() - 1) + 7).endOf("day") : i.bind(this)(s, a);
      };
    };
  });
})(Ke);
const Dt = Ke.exports;
var Je = { exports: {} };
(function(e, m) {
  (function(t, r) {
    e.exports = r();
  })(ce, function() {
    return function(t, r) {
      r.prototype.isSameOrBefore = function(g, f) {
        return this.isSame(g, f) || this.isBefore(g, f);
      };
    };
  });
})(Je);
const Bt = Je.exports;
var et = { exports: {} };
(function(e, m) {
  (function(t, r) {
    e.exports = r();
  })(ce, function() {
    return function(t, r) {
      r.prototype.isSameOrAfter = function(g, f) {
        return this.isSame(g, f) || this.isAfter(g, f);
      };
    };
  });
})(et);
const _t = et.exports;
var tt = { exports: {} };
(function(e, m) {
  (function(t, r) {
    e.exports = r();
  })(ce, function() {
    return function(t, r, g) {
      r.prototype.isBetween = function(f, u, o, i) {
        var s = g(f), a = g(u), c = (i = i || "()")[0] === "(", h = i[1] === ")";
        return (c ? this.isAfter(s, o) : !this.isBefore(s, o)) && (h ? this.isBefore(a, o) : !this.isAfter(a, o)) || (c ? this.isBefore(s, o) : !this.isAfter(s, o)) && (h ? this.isAfter(a, o) : !this.isBefore(a, o));
      };
    };
  });
})(tt);
const Tt = tt.exports;
var nt = { exports: {} };
(function(e, m) {
  (function(t, r) {
    e.exports = r();
  })(ce, function() {
    var t = "week", r = "year";
    return function(g, f, u) {
      var o = f.prototype;
      o.week = function(i) {
        if (i === void 0 && (i = null), i !== null)
          return this.add(7 * (i - this.week()), "day");
        var s = this.$locale().yearStart || 1;
        if (this.month() === 11 && this.date() > 25) {
          var a = u(this).startOf(r).add(1, r).date(s), c = u(this).endOf(t);
          if (a.isBefore(c))
            return 1;
        }
        var h = u(this).startOf(r).date(s).startOf(t).subtract(1, "millisecond"), b = this.diff(h, t, !0);
        return b < 0 ? u(this).startOf("week").week() : Math.ceil(b);
      }, o.weeks = function(i) {
        return i === void 0 && (i = null), this.week(i);
      };
    };
  });
})(nt);
const Ot = nt.exports;
var rt = { exports: {} };
(function(e, m) {
  (function(t, r) {
    e.exports = r();
  })(ce, function() {
    return function(t, r) {
      var g = r.prototype, f = g.format;
      g.format = function(u) {
        var o = this, i = this.$locale();
        if (!this.isValid())
          return f.bind(this)(u);
        var s = this.$utils(), a = (u || "YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g, function(c) {
          switch (c) {
            case "Q":
              return Math.ceil((o.$M + 1) / 3);
            case "Do":
              return i.ordinal(o.$D);
            case "gggg":
              return o.weekYear();
            case "GGGG":
              return o.isoWeekYear();
            case "wo":
              return i.ordinal(o.week(), "W");
            case "w":
            case "ww":
              return s.s(o.week(), c === "w" ? 1 : 2, "0");
            case "W":
            case "WW":
              return s.s(o.isoWeek(), c === "W" ? 1 : 2, "0");
            case "k":
            case "kk":
              return s.s(String(o.$H === 0 ? 24 : o.$H), c === "k" ? 1 : 2, "0");
            case "X":
              return Math.floor(o.$d.getTime() / 1e3);
            case "x":
              return o.$d.getTime();
            case "z":
              return "[" + o.offsetName() + "]";
            case "zzz":
              return "[" + o.offsetName("long") + "]";
            default:
              return c;
          }
        });
        return f.bind(this)(a);
      };
    };
  });
})(rt);
const Mt = rt.exports;
var at = { exports: {} };
(function(e, m) {
  (function(t, r) {
    e.exports = r();
  })(ce, function() {
    var t = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, r = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, g = /\d/, f = /\d\d/, u = /\d\d?/, o = /\d*[^-_:/,()\s\d]+/, i = {}, s = function(l) {
      return (l = +l) + (l > 68 ? 1900 : 2e3);
    }, a = function(l) {
      return function(x) {
        this[l] = +x;
      };
    }, c = [/[+-]\d\d:?(\d\d)?|Z/, function(l) {
      (this.zone || (this.zone = {})).offset = function(x) {
        if (!x || x === "Z")
          return 0;
        var k = x.match(/([+-]|\d\d)/g), p = 60 * k[1] + (+k[2] || 0);
        return p === 0 ? 0 : k[0] === "+" ? -p : p;
      }(l);
    }], h = function(l) {
      var x = i[l];
      return x && (x.indexOf ? x : x.s.concat(x.f));
    }, b = function(l, x) {
      var k, p = i.meridiem;
      if (p) {
        for (var O = 1; O <= 24; O += 1)
          if (l.indexOf(p(O, 0, x)) > -1) {
            k = O > 12;
            break;
          }
      } else
        k = l === (x ? "pm" : "PM");
      return k;
    }, w = { A: [o, function(l) {
      this.afternoon = b(l, !1);
    }], a: [o, function(l) {
      this.afternoon = b(l, !0);
    }], Q: [g, function(l) {
      this.month = 3 * (l - 1) + 1;
    }], S: [g, function(l) {
      this.milliseconds = 100 * +l;
    }], SS: [f, function(l) {
      this.milliseconds = 10 * +l;
    }], SSS: [/\d{3}/, function(l) {
      this.milliseconds = +l;
    }], s: [u, a("seconds")], ss: [u, a("seconds")], m: [u, a("minutes")], mm: [u, a("minutes")], H: [u, a("hours")], h: [u, a("hours")], HH: [u, a("hours")], hh: [u, a("hours")], D: [u, a("day")], DD: [f, a("day")], Do: [o, function(l) {
      var x = i.ordinal, k = l.match(/\d+/);
      if (this.day = k[0], x)
        for (var p = 1; p <= 31; p += 1)
          x(p).replace(/\[|\]/g, "") === l && (this.day = p);
    }], w: [u, a("week")], ww: [f, a("week")], M: [u, a("month")], MM: [f, a("month")], MMM: [o, function(l) {
      var x = h("months"), k = (h("monthsShort") || x.map(function(p) {
        return p.slice(0, 3);
      })).indexOf(l) + 1;
      if (k < 1)
        throw new Error();
      this.month = k % 12 || k;
    }], MMMM: [o, function(l) {
      var x = h("months").indexOf(l) + 1;
      if (x < 1)
        throw new Error();
      this.month = x % 12 || x;
    }], Y: [/[+-]?\d+/, a("year")], YY: [f, function(l) {
      this.year = s(l);
    }], YYYY: [/\d{4}/, a("year")], Z: c, ZZ: c };
    function D(l) {
      var x, k;
      x = l, k = i && i.formats;
      for (var p = (l = x.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(R, $, A) {
        var I = A && A.toUpperCase();
        return $ || k[A] || t[A] || k[I].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(Q, q, Y) {
          return q || Y.slice(1);
        });
      })).match(r), O = p.length, d = 0; d < O; d += 1) {
        var y = p[d], v = w[y], E = v && v[0], _ = v && v[1];
        p[d] = _ ? { regex: E, parser: _ } : y.replace(/^\[|\]$/g, "");
      }
      return function(R) {
        for (var $ = {}, A = 0, I = 0; A < O; A += 1) {
          var Q = p[A];
          if (typeof Q == "string")
            I += Q.length;
          else {
            var q = Q.regex, Y = Q.parser, P = R.slice(I), W = q.exec(P)[0];
            Y.call($, W), R = R.replace(W, "");
          }
        }
        return function(J) {
          var de = J.afternoon;
          if (de !== void 0) {
            var X = J.hours;
            de ? X < 12 && (J.hours += 12) : X === 12 && (J.hours = 0), delete J.afternoon;
          }
        }($), $;
      };
    }
    return function(l, x, k) {
      k.p.customParseFormat = !0, l && l.parseTwoDigitYear && (s = l.parseTwoDigitYear);
      var p = x.prototype, O = p.parse;
      p.parse = function(d) {
        var y = d.date, v = d.utc, E = d.args;
        this.$u = v;
        var _ = E[1];
        if (typeof _ == "string") {
          var R = E[2] === !0, $ = E[3] === !0, A = R || $, I = E[2];
          $ && (I = E[2]), i = this.$locale(), !R && I && (i = k.Ls[I]), this.$d = function(P, W, J, de) {
            try {
              if (["x", "X"].indexOf(W) > -1)
                return new Date((W === "X" ? 1e3 : 1) * P);
              var X = D(W)(P), fe = X.year, ue = X.month, Be = X.day, _e = X.hours, Te = X.minutes, Oe = X.seconds, Me = X.milliseconds, pe = X.zone, be = X.week, me = new Date(), ae = Be || (fe || ue ? 1 : me.getDate()), ye = fe || me.getFullYear(), he = 0;
              fe && !ue || (he = ue > 0 ? ue - 1 : me.getMonth());
              var n, M = _e || 0, T = Te || 0, C = Oe || 0, H = Me || 0;
              return pe ? new Date(Date.UTC(ye, he, ae, M, T, C, H + 60 * pe.offset * 1e3)) : J ? new Date(Date.UTC(ye, he, ae, M, T, C, H)) : (n = new Date(ye, he, ae, M, T, C, H), be && (n = de(n).week(be).toDate()), n);
            } catch {
              return new Date("");
            }
          }(y, _, v, k), this.init(), I && I !== !0 && (this.$L = this.locale(I).$L), A && y != this.format(_) && (this.$d = new Date("")), i = {};
        } else if (_ instanceof Array)
          for (var Q = _.length, q = 1; q <= Q; q += 1) {
            E[1] = _[q - 1];
            var Y = k.apply(this, E);
            if (Y.isValid()) {
              this.$d = Y.$d, this.$L = Y.$L, this.init();
              break;
            }
            q === Q && (this.$d = new Date(""));
          }
        else
          O.call(this, d);
      };
    };
  });
})(at);
const Ct = at.exports, ot = Symbol("CHART_ROWS_KEY"), it = Symbol("CONFIG_KEY"), st = Symbol("EMIT_BAR_EVENT_KEY"), lt = Symbol("BAR_CONTAINER_KEY");
function Z() {
  const e = Le(it);
  if (!e)
    throw Error("Failed to inject config!");
  return e;
}
const oe = "YYYY-MM-DD HH:mm";
function Ee(e = Z()) {
  const { chartStart: m, chartEnd: t, barStart: r, barEnd: g, dateFormat: f } = e, u = G(() => i(m.value)), o = G(() => i(t.value)), i = (a, c) => {
    let h;
    if (c !== void 0 && typeof a != "string" && !(a instanceof Date) && (h = c === "start" ? a[r.value] : a[g.value]), typeof a == "string")
      h = a;
    else if (a instanceof Date)
      return z(a);
    const b = f.value || oe;
    return z(h, b, !0);
  };
  return {
    chartStartDayjs: u,
    chartEndDayjs: o,
    toDayjs: i,
    format: (a, c) => c === !1 ? a instanceof Date ? a : z(a).toDate() : (typeof a == "string" || a instanceof Date ? i(a) : a).format(c)
  };
}
function ut() {
  const { precision: e } = Z(), { chartStartDayjs: m, chartEndDayjs: t } = Ee(), r = G(() => {
    switch (e == null ? void 0 : e.value) {
      case "hour":
        return "day";
      case "day":
        return "month";
      case "date":
      case "week":
        return "month";
      case "month":
        return "year";
      default:
        throw new Error(
          "Precision prop incorrect. Must be one of the following: 'hour', 'day', 'date', 'week', 'month'"
        );
    }
  }), g = G(() => {
    switch (e.value) {
      case "date":
        return "day";
      case "week":
        return "isoWeek";
      default:
        return e.value;
    }
  }), f = {
    hour: "HH",
    date: "DD.MMM",
    day: "DD.MMM",
    week: "WW",
    month: "MMMM YYYY",
    year: "YYYY"
  };
  return {
    timeaxisUnits: G(() => {
      const o = [], i = [], s = t.value.diff(m.value, "minutes", !0), a = r.value, c = g.value;
      let h = m.value, b = m.value;
      for (; b.isSameOrBefore(t.value); ) {
        const w = b.endOf(c), l = w.isAfter(t.value) ? t.value.diff(b, "minutes", !0) / s * 100 : w.diff(b, "minutes", !0) / s * 100;
        i.push({
          label: b.format(f[e == null ? void 0 : e.value]),
          value: String(b),
          date: b.toDate(),
          width: String(l) + "%"
        }), b = w.add(1, c === "isoWeek" ? "week" : c).startOf(c);
      }
      for (; h.isSameOrBefore(t.value); ) {
        const w = h.endOf(a), l = w.isAfter(t.value) ? t.value.diff(h, "minutes", !0) / s * 100 : w.diff(h, "minutes", !0) / s * 100;
        o.push({
          label: h.format(f[a]),
          value: String(h),
          date: h.toDate(),
          width: String(l) + "%"
        }), h = w.add(1, a).startOf(a);
      }
      return { upperUnits: o, lowerUnits: i };
    })
  };
}
const St = { class: "g-grid-container" }, Lt = /* @__PURE__ */ se({
  __name: "GGanttGrid",
  props: {
    highlightedUnits: {}
  },
  setup(e) {
    const { colors: m } = Z(), { timeaxisUnits: t } = ut();
    return (r, g) => (S(), F("div", St, [
      (S(!0), F(ge, null, we(B(t).lowerUnits, ({ label: f, value: u, width: o }) => {
        var i;
        return S(), F("div", {
          key: f,
          class: "g-grid-line",
          style: U({
            width: o,
            background: (i = e.highlightedUnits) != null && i.includes(Number(u)) ? B(m).hoverHighlight : void 0
          })
        }, null, 4);
      }), 128))
    ]));
  }
});
function Ae() {
  const e = Le(ot);
  if (!e)
    throw Error("Failed to inject getChartRows!");
  return e;
}
const $t = { class: "g-label-column-rows" }, Yt = /* @__PURE__ */ se({
  __name: "GGanttLabelColumn",
  setup(e) {
    const { font: m, colors: t, labelColumnTitle: r, rowHeight: g } = Z(), f = Ae();
    return (u, o) => (S(), F("div", {
      class: "g-label-column",
      style: U({ fontFamily: B(m), color: B(t).text })
    }, [
      j(u.$slots, "label-column-title", {}, () => [
        N("div", {
          class: "g-label-column-header",
          style: U({ background: B(t).primary })
        }, ie(B(r)), 5)
      ]),
      N("div", $t, [
        (S(!0), F(ge, null, we(B(f)(), ({ label: i }, s) => (S(), F("div", {
          key: `${i}_${s}`,
          class: "g-label-column-row",
          style: U({
            background: s % 2 === 0 ? B(t).ternary : B(t).quartenary,
            height: `${B(g)}px`
          })
        }, [
          j(u.$slots, "label-column-row", { label: i }, () => [
            N("span", null, ie(i), 1)
          ])
        ], 4))), 128))
      ])
    ], 4));
  }
});
const Gt = { class: "g-timeaxis" }, Rt = { class: "g-timeunits-container" }, It = { class: "g-timeunits-container" }, Ft = /* @__PURE__ */ se({
  __name: "GGanttTimeaxis",
  setup(e) {
    const { precision: m, colors: t } = Z(), { timeaxisUnits: r } = ut();
    return (g, f) => (S(), F("div", Gt, [
      N("div", Rt, [
        (S(!0), F(ge, null, we(B(r).upperUnits, ({ label: u, value: o, date: i, width: s }, a) => (S(), F("div", {
          key: u,
          class: "g-upper-timeunit",
          style: U({
            background: a % 2 === 0 ? B(t).primary : B(t).secondary,
            color: B(t).text,
            width: s
          })
        }, [
          j(g.$slots, "upper-timeunit", {
            label: u,
            value: o,
            date: i
          }, () => [
            xe(ie(u), 1)
          ])
        ], 4))), 128))
      ]),
      N("div", It, [
        (S(!0), F(ge, null, we(B(r).lowerUnits, ({ label: u, value: o, date: i, width: s }, a) => (S(), F("div", {
          key: u,
          class: "g-timeunit",
          style: U({
            background: a % 2 === 0 ? B(t).ternary : B(t).quartenary,
            color: B(t).text,
            flexDirection: B(m) === "hour" ? "column" : "row",
            alignItems: B(m) === "hour" ? "" : "center",
            width: s
          })
        }, [
          j(g.$slots, "timeunit", {
            label: u,
            value: o,
            date: i
          }, () => [
            xe(ie(u), 1)
          ]),
          B(m) === "hour" ? (S(), F("div", {
            key: 0,
            class: "g-timeaxis-hour-pin",
            style: U({ background: B(t).text })
          }, null, 4)) : te("", !0)
        ], 4))), 128))
      ])
    ]));
  }
});
const Ht = "cadetblue", At = /* @__PURE__ */ se({
  __name: "GGanttBarTooltip",
  props: {
    bar: {},
    modelValue: { type: Boolean }
  },
  setup(e) {
    const m = {
      hour: "HH:mm",
      day: "DD. MMM HH:mm",
      date: "DD. MMMM YYYY",
      month: "DD. MMMM YYYY",
      week: "DD. MMMM YYYY (WW)"
    }, t = e, { bar: r } = ke(t), { precision: g, font: f, barStart: u, barEnd: o, rowHeight: i } = Z(), s = L("0px"), a = L("0px");
    $e(
      () => t.bar,
      async () => {
        var d;
        await Ze();
        const l = ((d = r == null ? void 0 : r.value) == null ? void 0 : d.id) || "";
        if (!l)
          return;
        const x = document.getElementById(l), { top: k, left: p } = (x == null ? void 0 : x.getBoundingClientRect()) || {
          top: 0,
          left: 0
        }, O = Math.max(p, 10);
        s.value = `${k + i.value - 10}px`, a.value = `${O}px`;
      },
      { deep: !0, immediate: !0 }
    );
    const c = G(() => {
      var l, x;
      return ((x = (l = r == null ? void 0 : r.value) == null ? void 0 : l.style) == null ? void 0 : x.background) || Ht;
    }), { toDayjs: h } = Ee(), b = G(() => {
      var l;
      return (l = r.value) == null ? void 0 : l[u.value];
    }), w = G(() => {
      var l;
      return (l = r.value) == null ? void 0 : l[o.value];
    }), D = G(() => {
      if (!(r != null && r.value))
        return "";
      const l = m[g.value], x = h(b.value).format(l), k = h(w.value).format(l);
      return `${x} \u2013 ${k}`;
    });
    return (l, x) => (S(), ve(ht, { to: "body" }, [
      Fe(vt, {
        name: "g-fade",
        mode: "out-in"
      }, {
        default: re(() => [
          e.modelValue ? (S(), F("div", {
            key: 0,
            class: "g-gantt-tooltip",
            style: U({
              top: s.value,
              left: a.value,
              fontFamily: B(f)
            })
          }, [
            N("div", {
              class: "g-gantt-tooltip-color-dot",
              style: U({ background: c.value })
            }, null, 4),
            j(l.$slots, "default", {
              bar: B(r),
              barStart: b.value,
              barEnd: w.value
            }, () => [
              xe(ie(D.value), 1)
            ])
          ], 4)) : te("", !0)
        ]),
        _: 3
      })
    ]));
  }
});
function Ye(e = Z()) {
  const { dateFormat: m, chartSize: t } = e, { chartStartDayjs: r, chartEndDayjs: g, toDayjs: f, format: u } = Ee(e), o = G(() => g.value.diff(r.value, "minutes"));
  return {
    mapTimeToPosition: (a) => {
      const c = t.width.value || 0, h = f(a).diff(r.value, "minutes", !0);
      return Math.ceil(h / o.value * c);
    },
    mapPositionToTime: (a) => {
      const c = t.width.value || 0, h = a / c * o.value;
      return u(r.value.add(h, "minutes"), m.value);
    }
  };
}
const Pt = /* @__PURE__ */ se({
  __name: "GGanttCurrentTime",
  setup(e) {
    const { mapTimeToPosition: m } = Ye(), t = L(z()), { colors: r, dateFormat: g, currentTimeLabel: f } = Z(), u = G(() => {
      const o = g.value || "YYYY-MM-DD HH:mm";
      return m(z(t.value, o).format(o));
    });
    return (o, i) => (S(), F("div", {
      class: "g-grid-current-time",
      style: U({
        left: `${u.value}px`
      })
    }, [
      N("div", {
        class: "g-grid-current-time-marker",
        style: U({
          border: `1px dashed ${B(r).markerCurrentTime}`
        })
      }, null, 4),
      N("span", {
        class: "g-grid-current-time-text",
        style: U({ color: B(r).markerCurrentTime })
      }, [
        j(o.$slots, "current-time-label", {}, () => [
          xe(ie(B(f)), 1)
        ])
      ], 4)
    ], 4));
  }
});
var We;
const De = typeof window < "u";
De && ((We = window == null ? void 0 : window.navigator) == null ? void 0 : We.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function Wt(e) {
  return typeof e == "function" ? e() : B(e);
}
function zt(e) {
  return e;
}
function jt(e) {
  return gt() ? (pt(e), !0) : !1;
}
function Ut(e, m = !0) {
  bt() ? He(e) : m ? e() : Ze(e);
}
function Se(e) {
  var m;
  const t = Wt(e);
  return (m = t == null ? void 0 : t.$el) != null ? m : t;
}
const ct = De ? window : void 0;
De && window.document;
De && window.navigator;
De && window.location;
function Nt(e, m = !1) {
  const t = L(), r = () => t.value = Boolean(e());
  return r(), Ut(r, m), t;
}
const Re = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ie = "__vueuse_ssr_handlers__";
Re[Ie] = Re[Ie] || {};
Re[Ie];
var ze = Object.getOwnPropertySymbols, Xt = Object.prototype.hasOwnProperty, Vt = Object.prototype.propertyIsEnumerable, qt = (e, m) => {
  var t = {};
  for (var r in e)
    Xt.call(e, r) && m.indexOf(r) < 0 && (t[r] = e[r]);
  if (e != null && ze)
    for (var r of ze(e))
      m.indexOf(r) < 0 && Vt.call(e, r) && (t[r] = e[r]);
  return t;
};
function Qt(e, m, t = {}) {
  const r = t, { window: g = ct } = r, f = qt(r, ["window"]);
  let u;
  const o = Nt(() => g && "ResizeObserver" in g), i = () => {
    u && (u.disconnect(), u = void 0);
  }, s = $e(() => Se(e), (c) => {
    i(), o.value && g && c && (u = new ResizeObserver(m), u.observe(c, f));
  }, { immediate: !0, flush: "post" }), a = () => {
    i(), s();
  };
  return jt(a), {
    isSupported: o,
    stop: a
  };
}
function Zt(e, m = { width: 0, height: 0 }, t = {}) {
  const { window: r = ct, box: g = "content-box" } = t, f = G(() => {
    var i, s;
    return (s = (i = Se(e)) == null ? void 0 : i.namespaceURI) == null ? void 0 : s.includes("svg");
  }), u = L(m.width), o = L(m.height);
  return Qt(e, ([i]) => {
    const s = g === "border-box" ? i.borderBoxSize : g === "content-box" ? i.contentBoxSize : i.devicePixelContentBoxSize;
    if (r && f.value) {
      const a = Se(e);
      if (a) {
        const c = r.getComputedStyle(a);
        u.value = parseFloat(c.width), o.value = parseFloat(c.height);
      }
    } else if (s) {
      const a = Array.isArray(s) ? s : [s];
      u.value = a.reduce((c, { inlineSize: h }) => c + h, 0), o.value = a.reduce((c, { blockSize: h }) => c + h, 0);
    } else
      u.value = i.contentRect.width, o.value = i.contentRect.height;
  }, t), $e(() => Se(e), (i) => {
    u.value = i ? m.width : 0, o.value = i ? m.height : 0;
  }), {
    width: u,
    height: o
  };
}
var je;
(function(e) {
  e.UP = "UP", e.RIGHT = "RIGHT", e.DOWN = "DOWN", e.LEFT = "LEFT", e.NONE = "NONE";
})(je || (je = {}));
var Kt = Object.defineProperty, Ue = Object.getOwnPropertySymbols, Jt = Object.prototype.hasOwnProperty, en = Object.prototype.propertyIsEnumerable, Ne = (e, m, t) => m in e ? Kt(e, m, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[m] = t, tn = (e, m) => {
  for (var t in m || (m = {}))
    Jt.call(m, t) && Ne(e, t, m[t]);
  if (Ue)
    for (var t of Ue(m))
      en.call(m, t) && Ne(e, t, m[t]);
  return e;
};
const nn = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
tn({
  linear: zt
}, nn);
const Xe = {
  default: {
    primary: "#eeeeee",
    secondary: "#E0E0E0",
    ternary: "#F5F5F5",
    quartenary: "#ededed",
    hoverHighlight: "rgba(204, 216, 219, 0.5)",
    markerCurrentTime: "#000",
    text: "#404040",
    background: "white"
  },
  creamy: {
    primary: "#ffe8d9",
    secondary: "#fcdcc5",
    ternary: "#fff6f0",
    quartenary: "#f7ece6",
    hoverHighlight: "rgba(230, 221, 202, 0.5)",
    markerCurrentTime: "#000",
    text: "#542d05",
    background: "white"
  },
  crimson: {
    primary: "#a82039",
    secondary: "#c41238",
    ternary: "#db4f56",
    quartenary: "#ce5f64",
    hoverHighlight: "rgba(196, 141, 141, 0.5)",
    markerCurrentTime: "#000",
    text: "white",
    background: "white"
  },
  dark: {
    primary: "#404040",
    secondary: "#303030",
    ternary: "#353535",
    quartenary: "#383838",
    hoverHighlight: "rgba(159, 160, 161, 0.5)",
    markerCurrentTime: "#fff",
    text: "white",
    background: "#525252",
    toast: "#1f1f1f"
  },
  flare: {
    primary: "#e08a38",
    secondary: "#e67912",
    ternary: "#5e5145",
    quartenary: "#665648",
    hoverHighlight: "rgba(196, 141, 141, 0.5)",
    markerCurrentTime: "#000",
    text: "white",
    background: "white"
  },
  fuchsia: {
    primary: "#de1d5a",
    secondary: "#b50b41",
    ternary: "#ff7da6",
    quartenary: "#f2799f",
    hoverHighlight: "rgba(196, 141, 141, 0.5)",
    markerCurrentTime: "#000",
    text: "white",
    background: "white"
  },
  grove: {
    primary: "#3d9960",
    secondary: "#288542",
    ternary: "#72b585",
    quartenary: "#65a577",
    hoverHighlight: "rgba(160, 219, 171, 0.5)",
    markerCurrentTime: "#000",
    text: "white",
    background: "white"
  },
  "material-blue": {
    primary: "#0D47A1",
    secondary: "#1565C0",
    ternary: "#42a5f5",
    quartenary: "#409fed",
    hoverHighlight: "rgba(110, 165, 196, 0.5)",
    markerCurrentTime: "#000",
    text: "white",
    background: "white"
  },
  sky: {
    primary: "#b5e3ff",
    secondary: "#a1d6f7",
    ternary: "#d6f7ff",
    quartenary: "#d0edf4",
    hoverHighlight: "rgba(193, 202, 214, 0.5)",
    markerCurrentTime: "#000",
    text: "#022c47",
    background: "white"
  },
  slumber: {
    primary: "#2a2f42",
    secondary: "#2f3447",
    ternary: "#35394d",
    quartenary: "#2c3044",
    hoverHighlight: "rgba(179, 162, 127, 0.5)",
    markerCurrentTime: "#fff",
    text: "#ffe0b3",
    background: "#38383b",
    toast: "#1f1f1f"
  },
  vue: {
    primary: "#258a5d",
    secondary: "#41B883",
    ternary: "#35495E",
    quartenary: "#2a3d51",
    hoverHighlight: "rgba(160, 219, 171, 0.5)",
    markerCurrentTime: "#000",
    text: "white",
    background: "white"
  }
}, rn = { class: "g-gantt-rows-container" }, an = 250, Ve = 0.05, qe = 10, on = 250, sn = /* @__PURE__ */ se({
  __name: "GGanttChart",
  props: {
    chartStart: {},
    chartEnd: {},
    precision: { default: "day" },
    barStart: {},
    barEnd: {},
    currentTime: { type: Boolean },
    currentTimeLabel: { default: "" },
    dateFormat: { type: [String, Boolean], default: oe },
    width: { default: "100%" },
    hideTimeaxis: { type: Boolean, default: !1 },
    colorScheme: { default: "default" },
    grid: { type: Boolean, default: !1 },
    pushOnOverlap: { type: Boolean, default: !1 },
    noOverlap: { type: Boolean, default: !1 },
    rowHeight: { default: 40 },
    highlightedUnits: { default: () => [] },
    font: { default: "inherit" },
    labelColumnTitle: { default: "" },
    labelColumnWidth: { default: "150px" }
  },
  emits: ["click-bar", "mousedown-bar", "mouseup-bar", "dblclick-bar", "mouseenter-bar", "mouseleave-bar", "dragstart-bar", "drag-bar", "dragend-bar", "contextmenu-bar", "click-chart", "dblclick-chart"],
  setup(e, { emit: m }) {
    const t = e, r = m, { width: g, font: f, colorScheme: u } = ke(t), o = yt(), i = G(
      () => typeof u.value != "string" ? u.value : Xe[u.value] || Xe.default
    ), s = () => {
      var T;
      const n = (T = o.default) == null ? void 0 : T.call(o), M = [];
      return n && n.forEach((C) => {
        var H;
        if ((H = C.props) != null && H.bars) {
          const { label: ee, bars: V } = C.props;
          M.push({ label: ee, bars: V });
        } else
          Array.isArray(C.children) && C.children.forEach((ee) => {
            var K;
            const V = ee;
            if ((K = V == null ? void 0 : V.props) != null && K.bars) {
              const { label: ne, bars: Pe } = V.props;
              M.push({ label: ne, bars: Pe });
            }
          });
      }), M;
    }, a = L(!1), c = L(!1), h = L(void 0);
    let b;
    const w = (n) => {
      b && clearTimeout(b), b = setTimeout(() => {
        a.value = !0;
      }, 800), h.value = n;
    }, D = () => {
      clearTimeout(b), a.value = !1;
    };
    let l = null;
    const x = (n, M, T, C) => {
      switch (n.type) {
        case "click":
          l && clearTimeout(l), l = setTimeout(() => {
            r("click-bar", { bar: M, e: n, datetime: T }), l = null;
          }, an);
          break;
        case "mousedown":
          r("mousedown-bar", { bar: M, e: n, datetime: T });
          break;
        case "mouseup":
          r("mouseup-bar", { bar: M, e: n, datetime: T });
          break;
        case "dblclick":
          l && (clearTimeout(l), l = null), r("dblclick-bar", { bar: M, e: n, datetime: T });
          break;
        case "mouseenter":
          w(M), r("mouseenter-bar", { bar: M, e: n });
          break;
        case "mouseleave":
          D(), r("mouseleave-bar", { bar: M, e: n });
          break;
        case "dragstart":
          c.value = !0, r("dragstart-bar", { bar: M, e: n });
          break;
        case "drag":
          r("drag-bar", { bar: M, e: n });
          break;
        case "dragend":
          c.value = !1, r("dragend-bar", { bar: M, e: n, movedBars: C });
          break;
        case "contextmenu":
          r("contextmenu-bar", { bar: M, e: n, datetime: T });
          break;
      }
    }, k = L(null), p = Zt(k), O = L(1), d = L(!1), y = L(0), v = L(0), E = L(!1);
    let _ = null;
    const R = L(0), $ = L(0), A = L(!1), I = G(() => {
      const n = t.dateFormat || oe;
      return t.chartStart instanceof Date ? z(t.chartStart) : typeof n == "string" ? z(t.chartStart, n, !0) : z(t.chartStart);
    }), Q = G(() => {
      const n = t.dateFormat || oe;
      return t.chartEnd instanceof Date ? z(t.chartEnd) : typeof n == "string" ? z(t.chartEnd, n, !0) : z(t.chartEnd);
    }), q = G(() => Q.value.diff(I.value, "minute")), Y = L(0), P = G(() => q.value / O.value), W = G(() => I.value.add(Y.value, "minute")), J = G(() => W.value.add(P.value, "minute")), de = G(() => {
      const n = P.value / 1440;
      return n < 1 ? "hour" : n < 60 ? "day" : n < 365 ? "week" : "month";
    }), X = (n) => {
      if (n.ctrlKey || n.metaKey) {
        n.preventDefault();
        const M = P.value * 0.02, T = n.deltaY > 0 ? M : -M;
        Y.value += T;
      } else {
        n.preventDefault();
        const M = n.deltaY > 0 ? -0.05 : 0.05, T = Math.max(Ve, Math.min(qe, O.value + M)), C = k.value;
        if (C) {
          const H = C.getBoundingClientRect(), V = (n.clientX - H.left + C.scrollLeft) / (p.width.value || 1), K = W.value.add(V * P.value, "minute");
          O.value = T;
          const ne = q.value / T, mt = K.diff(I.value, "minute") - V * ne;
          Y.value = mt;
        }
      }
    }, fe = (n) => {
      n.target.closest(".g-gantt-bar") || E.value || (_ && clearTimeout(_), _ = setTimeout(() => {
        const T = k.value;
        if (!T)
          return;
        const C = T.getBoundingClientRect(), H = n.clientX - C.left, ee = (p.width.value || 1) / P.value, V = H / ee, K = W.value.add(V, "minute"), ne = t.chartStart instanceof Date ? K.toDate() : K.format(t.dateFormat || oe);
        r("click-chart", { e: n, datetime: ne }), _ = null;
      }, on));
    }, ue = (n) => {
      if (n.target.closest(".g-gantt-bar"))
        return;
      _ && (clearTimeout(_), _ = null);
      const T = k.value;
      if (!T)
        return;
      const C = T.getBoundingClientRect(), H = n.clientX - C.left, ee = (p.width.value || 1) / P.value, V = H / ee, K = W.value.add(V, "minute"), ne = t.chartStart instanceof Date ? K.toDate() : K.format(t.dateFormat || oe);
      r("dblclick-chart", { e: n, datetime: ne });
    }, Be = (n) => {
      n.button !== 0 || n.target.closest(".g-gantt-bar") || (d.value = !0, E.value = !1, y.value = n.clientX, v.value = Y.value, n.preventDefault());
    }, _e = (n) => {
      if (!d.value || !k.value)
        return;
      const T = n.clientX - y.value;
      Math.abs(T) > 3 && (E.value = !0);
      const C = (p.width.value || 1) / P.value, H = -T / C;
      Y.value = v.value + H;
    }, Te = () => {
      d.value = !1;
    }, Oe = () => {
      d.value = !1;
    }, Me = (n) => {
      const M = n[0].clientX - n[1].clientX, T = n[0].clientY - n[1].clientY;
      return Math.sqrt(M * M + T * T);
    }, pe = (n) => (n[0].clientX + n[1].clientX) / 2, be = (n) => {
      n.target.closest(".g-gantt-bar") || (n.touches.length === 2 ? (n.preventDefault(), A.value = !0, R.value = Me(n.touches), $.value = pe(n.touches), v.value = Y.value) : n.touches.length === 1 && (A.value = !0, y.value = n.touches[0].clientX, v.value = Y.value));
    }, me = (n) => {
      if (!!A.value) {
        if (n.touches.length === 2) {
          n.preventDefault();
          const M = Me(n.touches), T = pe(n.touches), H = (M / R.value - 1) * 0.5, ee = Math.max(Ve, Math.min(qe, O.value * (1 + H))), V = T - $.value, K = (p.width.value || 1) / P.value, ne = -V / K;
          O.value = ee, Y.value = v.value + ne, R.value = M, $.value = T, v.value = Y.value;
        } else if (n.touches.length === 1) {
          n.preventDefault();
          const M = n.touches[0].clientX - y.value, T = (p.width.value || 1) / P.value, C = -M / T;
          Y.value = v.value + C;
        }
      }
    }, ae = () => {
      A.value = !1;
    };
    He(() => {
      const n = k.value;
      n && (n.addEventListener("wheel", X, { passive: !1 }), n.addEventListener("mousedown", Be), n.addEventListener("mousemove", _e), n.addEventListener("mouseup", Te), n.addEventListener("mouseleave", Oe), n.addEventListener("click", fe), n.addEventListener("dblclick", ue), n.addEventListener("touchstart", be, { passive: !1 }), n.addEventListener("touchmove", me, { passive: !1 }), n.addEventListener("touchend", ae), n.addEventListener("touchcancel", ae));
    }), wt(() => {
      _ && (clearTimeout(_), _ = null), l && (clearTimeout(l), l = null);
      const n = k.value;
      n && (n.removeEventListener("wheel", X), n.removeEventListener("mousedown", Be), n.removeEventListener("mousemove", _e), n.removeEventListener("mouseup", Te), n.removeEventListener("mouseleave", Oe), n.removeEventListener("click", fe), n.removeEventListener("dblclick", ue), n.removeEventListener("touchstart", be), n.removeEventListener("touchmove", me), n.removeEventListener("touchend", ae), n.removeEventListener("touchcancel", ae));
    });
    const ye = G(() => {
      if (t.chartStart instanceof Date)
        return W.value.toDate();
      const n = t.dateFormat || oe;
      return typeof n == "string" ? W.value.format(n) : W.value.toDate();
    }), he = G(() => {
      if (t.chartEnd instanceof Date)
        return J.value.toDate();
      const n = t.dateFormat || oe;
      return typeof n == "string" ? J.value.format(n) : J.value.toDate();
    });
    return Ce(ot, s), Ce(it, {
      ...ke(t),
      precision: de,
      chartStart: ye,
      chartEnd: he,
      colors: i,
      chartSize: p
    }), Ce(st, x), (n, M) => (S(), F("div", null, [
      N("div", {
        class: Ge([{ "labels-in-column": !!e.labelColumnTitle }])
      }, [
        e.labelColumnTitle ? (S(), ve(Yt, {
          key: 0,
          style: U({ width: e.labelColumnWidth })
        }, {
          "label-column-title": re(() => [
            j(n.$slots, "label-column-title")
          ]),
          "label-column-row": re(({ label: T }) => [
            j(n.$slots, "label-column-row", { label: T })
          ]),
          _: 3
        }, 8, ["style"])) : te("", !0),
        N("div", {
          ref_key: "ganttChart",
          ref: k,
          class: Ge(["g-gantt-chart", { "with-column": e.labelColumnTitle, "is-dragging": d.value }]),
          style: U({ width: B(g), background: i.value.background, fontFamily: B(f) })
        }, [
          e.hideTimeaxis ? te("", !0) : (S(), ve(Ft, { key: 0 }, {
            "upper-timeunit": re(({ label: T, value: C, date: H }) => [
              j(n.$slots, "upper-timeunit", {
                label: T,
                value: C,
                date: H
              })
            ]),
            timeunit: re(({ label: T, value: C, date: H }) => [
              j(n.$slots, "timeunit", {
                label: T,
                value: C,
                date: H
              })
            ]),
            _: 3
          })),
          e.grid ? (S(), ve(Lt, {
            key: 1,
            "highlighted-units": e.highlightedUnits
          }, null, 8, ["highlighted-units"])) : te("", !0),
          e.currentTime ? (S(), ve(Pt, { key: 2 }, {
            "current-time-label": re(() => [
              j(n.$slots, "current-time-label")
            ]),
            _: 3
          })) : te("", !0),
          N("div", rn, [
            j(n.$slots, "default")
          ])
        ], 6)
      ], 2),
      Fe(At, {
        "model-value": a.value || c.value,
        bar: h.value
      }, {
        default: re(() => [
          j(n.$slots, "bar-tooltip", { bar: h.value })
        ]),
        _: 3
      }, 8, ["model-value", "bar"])
    ]));
  }
});
function Qe(e, m = () => null, t = () => null, r = Z()) {
  const { barStart: g, barEnd: f, pushOnOverlap: u } = r, o = L(!1);
  let i = 0, s;
  const { mapPositionToTime: a } = Ye(r), { toDayjs: c } = Ee(r), h = (p) => {
    const O = document.getElementById(e.id);
    if (!O)
      return;
    switch (i = p.clientX - (O.getBoundingClientRect().left || 0), p.target.className) {
      case "g-gantt-bar-handle-left":
        document.body.style.cursor = "ew-resize", s = D;
        break;
      case "g-gantt-bar-handle-right":
        document.body.style.cursor = "ew-resize", s = l;
        break;
      default:
        s = w;
    }
    o.value = !0, window.addEventListener("mousemove", s), window.addEventListener("mouseup", k);
  }, b = () => {
    var d;
    const p = document.getElementById(e.id), O = (d = p == null ? void 0 : p.closest(".g-gantt-row-bars-container")) == null ? void 0 : d.getBoundingClientRect();
    return { barElement: p, barContainer: O };
  }, w = (p) => {
    const { barElement: O, barContainer: d } = b();
    if (!O || !d)
      return;
    const y = O.getBoundingClientRect().width, v = p.clientX - d.left - i, E = v + y;
    x(v, E) || (e[g.value] = a(v), e[f.value] = a(E), m(p, e));
  }, D = (p) => {
    const { barElement: O, barContainer: d } = b();
    if (!O || !d)
      return;
    const y = p.clientX - d.left, v = a(y);
    c(v).isSameOrAfter(c(e, "end")) || (e[g.value] = v, m(p, e));
  }, l = (p) => {
    const { barElement: O, barContainer: d } = b();
    if (!O || !d)
      return;
    const y = p.clientX - d.left, v = a(y);
    c(v).isSameOrBefore(c(e, "start")) || (e[f.value] = v, m(p, e));
  }, x = (p, O) => {
    if (!u.value)
      return !1;
    const d = e.dragLimitLeft, y = e.dragLimitRight;
    return p && d != null && p < d || O && y != null && O > y;
  }, k = (p) => {
    o.value = !1, document.body.style.cursor = "", window.removeEventListener("mousemove", s), window.removeEventListener("mouseup", k), t(p, e);
  };
  return {
    isDragging: o,
    initDrag: h
  };
}
function dt() {
  const e = Le(st);
  if (!e)
    throw Error("Failed to inject emitBarEvent!");
  return e;
}
function ln() {
  const e = Z(), m = Ae(), t = dt(), { pushOnOverlap: r, barStart: g, barEnd: f, noOverlap: u, dateFormat: o } = e, i = /* @__PURE__ */ new Map(), { toDayjs: s, format: a } = Ee(), c = (d, y) => {
    const { initDrag: v } = Qe(d, b, k, e);
    t({ ...y, type: "dragstart" }, d), v(y), p(d);
  }, h = (d, y) => {
    const v = d.bundle;
    v != null && (m().forEach((E) => {
      E.bars.forEach((_) => {
        if (_.bundle === v) {
          const R = _ === d ? k : () => null, { initDrag: $ } = Qe(_, b, R, e);
          $(y), p(_);
        }
      });
    }), t({ ...y, type: "dragstart" }, d));
  }, b = (d, y) => {
    t({ ...d, type: "drag" }, y), w(y);
  }, w = (d) => {
    if (!(r != null && r.value))
      return;
    let y = d, { overlapBar: v, overlapType: E } = D(y);
    for (; v; ) {
      p(v);
      const _ = s(y[g.value]), R = s(y[f.value]), $ = s(v[g.value]), A = s(v[f.value]);
      let I;
      switch (E) {
        case "left":
          I = A.diff(_, "minutes", !0), v[f.value] = a(y[g.value], o.value), v[g.value] = a(
            $.subtract(I, "minutes"),
            o.value
          );
          break;
        case "right":
          I = R.diff($, "minutes", !0), v[g.value] = a(R, o.value), v[f.value] = a(
            A.add(I, "minutes"),
            o.value
          );
          break;
        default:
          console.warn(
            "Vue-Ganttastic: One bar is inside of the other one! This should never occur while push-on-overlap is active!"
          );
          return;
      }
      v && (E === "left" || E === "right") && l(v, I, E), y = v, { overlapBar: v, overlapType: E } = D(v);
    }
  }, D = (d) => {
    var Q, q;
    let y, v, E;
    const _ = (q = (Q = m().find((Y) => Y.bars.includes(d))) == null ? void 0 : Q.bars) != null ? q : [], R = s(d[g.value]), $ = s(d[f.value]);
    return { overlapBar: _.find((Y) => {
      if (Y === d)
        return !1;
      const P = s(Y[g.value]), W = s(Y[f.value]);
      return y = R.isBetween(P, W), v = $.isBetween(P, W), E = P.isBetween(R, $) || W.isBetween(R, $), y || v || E;
    }), overlapType: y ? "left" : v ? "right" : E ? "between" : null };
  }, l = (d, y, v) => {
    p(d), d.bundle && m().forEach((E) => {
      E.bars.forEach((_) => {
        _.bundle === d.bundle && _ !== d && (p(_), x(_, y, v));
      });
    });
  }, x = (d, y, v) => {
    switch (v) {
      case "left":
        d[g.value] = a(
          s(d, "start").subtract(y, "minutes"),
          o.value
        ), d[f.value] = a(
          s(d, "end").subtract(y, "minutes"),
          o.value
        );
        break;
      case "right":
        d[g.value] = a(
          s(d, "start").add(y, "minutes"),
          o.value
        ), d[f.value] = a(s(d, "end").add(y, "minutes"), o.value);
    }
    w(d);
  }, k = (d, y) => {
    O();
    const v = {
      ...d,
      type: "dragend"
    };
    t(v, y, void 0, new Map(i)), i.clear();
  }, p = (d) => {
    if (!i.has(d)) {
      const y = d[g.value], v = d[f.value];
      i.set(d, { oldStart: y, oldEnd: v });
    }
  }, O = () => {
    if (r.value || !u.value)
      return;
    let d = !1;
    i.forEach((y, v) => {
      const { overlapBar: E } = D(v);
      E != null && (d = !0);
    }), d && i.forEach(({ oldStart: y, oldEnd: v }, E) => {
      E[g.value] = y, E[f.value] = v;
    });
  };
  return {
    initDragOfBar: c,
    initDragOfBundle: h
  };
}
function un() {
  const { pushOnOverlap: e } = Z(), m = Ae(), t = (u) => {
    const o = [];
    return u != null && m().forEach((i) => {
      i.bars.forEach((s) => {
        s.bundle === u && o.push(s);
      });
    }), o;
  }, r = (u) => {
    if (!e.value || u.pushOnOverlap === !1)
      return;
    for (const i of ["left", "right"]) {
      const s = i, { gapDistanceSoFar: a, bundleBarsAndGapDist: c } = g(
        u,
        0,
        s
      );
      let h = a;
      const b = c;
      if (!b)
        continue;
      for (let D = 0; D < b.length; D++) {
        const l = b[D].bar, x = b[D].gapDistance;
        t(l.bundle).filter(
          (p) => p !== l
        ).forEach((p) => {
          const O = g(p, x, s), d = O.gapDistanceSoFar, y = O.bundleBarsAndGapDist;
          d != null && (!h || d < h) && (h = d), y.forEach((v) => {
            b.find((E) => E.bar === v.bar) || b.push(v);
          });
        });
      }
      const w = document.getElementById(u.id);
      h != null && s === "left" ? u.dragLimitLeft = w.offsetLeft - h : h != null && s === "right" && (u.dragLimitRight = w.offsetLeft + w.offsetWidth + h);
    }
    t(u.bundle).forEach((i) => {
      i.dragLimitLeft = u.dragLimitLeft, i.dragLimitRight = u.dragLimitRight;
    });
  }, g = (u, o = 0, i) => {
    const s = u.bundle ? [{ bar: u, gapDistance: o }] : [];
    let a = u, c = f(a, i);
    if (i === "left")
      for (; c; ) {
        const h = document.getElementById(a.id), b = document.getElementById(c.id), w = b.offsetLeft + b.offsetWidth;
        if (o += h.offsetLeft - w, c.immobile)
          return { gapDistanceSoFar: o, bundleBarsAndGapDist: s };
        c.bundle && s.push({
          bar: c,
          gapDistance: o
        }), a = c, c = f(c, "left");
      }
    if (i === "right")
      for (; c; ) {
        const h = document.getElementById(a.id), b = document.getElementById(c.id), w = h.offsetLeft + h.offsetWidth;
        if (o += b.offsetLeft - w, c.immobile)
          return { gapDistanceSoFar: o, bundleBarsAndGapDist: s };
        c.bundle && s.push({
          bar: c,
          gapDistance: o
        }), a = c, c = f(c, "right");
      }
    return { gapDistanceSoFar: null, bundleBarsAndGapDist: s };
  }, f = (u, o) => {
    var c, h;
    const i = document.getElementById(u.id), s = (h = (c = m().find((b) => b.bars.includes(u))) == null ? void 0 : c.bars) != null ? h : [];
    let a = [];
    return o === "left" ? a = s.filter((b) => {
      const w = document.getElementById(b.id);
      return w && w.offsetLeft < i.offsetLeft && b.pushOnOverlap !== !1;
    }) : a = s.filter((b) => {
      const w = document.getElementById(b.id);
      return w && w.offsetLeft > i.offsetLeft && b.pushOnOverlap !== !1;
    }), a.length > 0 ? a.reduce((b, w) => {
      const D = document.getElementById(b.id), l = document.getElementById(w.id), x = Math.abs(D.offsetLeft - i.offsetLeft), k = Math.abs(l.offsetLeft - i.offsetLeft);
      return x < k ? b : w;
    }, a[0]) : null;
  };
  return {
    setDragLimitsOfGanttBar: r
  };
}
const cn = ["id"], dn = { class: "g-gantt-bar-label" }, fn = ["innerHTML"], ft = /* @__PURE__ */ se({
  __name: "GGanttBar",
  props: {
    bar: {}
  },
  setup(e) {
    const m = e, t = dt(), r = Z(), { rowHeight: g } = r, { bar: f } = ke(m), { mapTimeToPosition: u, mapPositionToTime: o } = Ye(), { initDragOfBar: i, initDragOfBundle: s } = ln(), { setDragLimitsOfGanttBar: a } = un(), c = L(!1);
    function h(E) {
      m.bar.bundle != null ? s(f.value, E) : i(f.value, E), c.value = !0;
    }
    const b = () => {
      a(f.value), !m.bar.immobile && (window.addEventListener("mousemove", h, {
        once: !0
      }), window.addEventListener(
        "mouseup",
        () => {
          window.removeEventListener("mousemove", h), c.value = !1;
        },
        { once: !0 }
      ));
    }, w = Le(lt), D = (E) => {
      var $;
      E.preventDefault(), E.type === "mousedown" && b();
      const _ = ($ = w == null ? void 0 : w.value) == null ? void 0 : $.getBoundingClientRect();
      if (!_)
        return;
      const R = o(E.clientX - _.left);
      t(E, f.value, R);
    }, { barStart: l, barEnd: x, width: k, chartStart: p, chartEnd: O, chartSize: d } = r, y = L(0), v = L(0);
    return He(() => {
      $e(
        [f, k, p, O, d.width],
        () => {
          y.value = u(f.value[l.value]), v.value = u(f.value[x.value]);
        },
        { deep: !0, immediate: !0 }
      );
    }), (E, _) => (S(), F("div", {
      id: B(f).id,
      class: Ge(["g-gantt-bar", B(f).class || ""]),
      style: U({
        ...B(f).style,
        position: "absolute",
        top: `${B(g) * 0.1}px`,
        left: `${y.value}px`,
        width: `${v.value - y.value}px`,
        height: `${B(g) * 0.8}px`,
        zIndex: c.value ? 3 : 2
      }),
      onMousedown: D,
      onClick: D,
      onDblclick: D,
      onMouseenter: D,
      onMouseleave: D,
      onContextmenu: D
    }, [
      N("div", dn, [
        j(E.$slots, "default", { bar: B(f) }, () => [
          N("div", null, ie(B(f).label || ""), 1),
          B(f).html ? (S(), F("div", {
            key: 0,
            innerHTML: B(f).html
          }, null, 8, fn)) : te("", !0)
        ])
      ]),
      B(f).hasHandles ? (S(), F(ge, { key: 0 }, [
        _[0] || (_[0] = N("div", { class: "g-gantt-bar-handle-left" }, null, -1)),
        _[1] || (_[1] = N("div", { class: "g-gantt-bar-handle-right" }, null, -1))
      ], 64)) : te("", !0)
    ], 46, cn));
  }
});
const mn = /* @__PURE__ */ se({
  __name: "GGanttRow",
  props: {
    label: {},
    bars: {},
    highlightOnHover: { type: Boolean }
  },
  emits: ["drop"],
  setup(e, { emit: m }) {
    const t = e, r = m, { rowHeight: g, colors: f, labelColumnTitle: u } = Z(), { highlightOnHover: o } = ke(t), i = L(!1), s = G(() => ({
      height: `${g.value}px`,
      background: (o == null ? void 0 : o.value) && i.value ? f.value.hoverHighlight : null
    })), { mapPositionToTime: a } = Ye(), c = L(null);
    Ce(lt, c);
    const h = (w) => {
      var k;
      const D = (k = c.value) == null ? void 0 : k.getBoundingClientRect();
      if (!D) {
        console.error("Vue-Ganttastic: failed to find bar container element for row.");
        return;
      }
      const l = w.clientX - D.left, x = a(l);
      r("drop", { e: w, datetime: x });
    }, b = (w) => !w || /^\s*$/.test(w);
    return (w, D) => (S(), F("div", {
      class: "g-gantt-row",
      style: U(s.value),
      onDragover: D[0] || (D[0] = xt((l) => i.value = !0, ["prevent"])),
      onDragleave: D[1] || (D[1] = (l) => i.value = !1),
      onDrop: D[2] || (D[2] = (l) => h(l)),
      onMouseover: D[3] || (D[3] = (l) => i.value = !0),
      onMouseleave: D[4] || (D[4] = (l) => i.value = !1)
    }, [
      !b(e.label) && !B(u) ? (S(), F("div", {
        key: 0,
        class: "g-gantt-row-label",
        style: U({ background: B(f).primary, color: B(f).text })
      }, [
        j(w.$slots, "label", {}, () => [
          xe(ie(e.label), 1)
        ])
      ], 4)) : te("", !0),
      N("div", kt({
        ref_key: "barContainer",
        ref: c,
        class: "g-gantt-row-bars-container"
      }, w.$attrs), [
        Fe(Et, {
          name: "bar-transition",
          tag: "div"
        }, {
          default: re(() => [
            e.bars ? (S(!0), F(ge, { key: 0 }, we(e.bars, (l) => (S(), ve(ft, {
              key: l.id,
              bar: l
            }, {
              default: re(() => [
                j(w.$slots, "bar-label", { bar: l })
              ]),
              _: 2
            }, 1032, ["bar"]))), 128)) : te("", !0),
            j(w.$slots, "default")
          ]),
          _: 3
        })
      ], 16)
    ], 36));
  }
});
function hn() {
  z.extend(Bt), z.extend(_t), z.extend(Tt), z.extend(Ct), z.extend(Ot), z.extend(Dt), z.extend(Mt);
}
const pn = {
  install(e, m) {
    hn(), e.component("GGanttChart", sn), e.component("GGanttRow", mn), e.component("GGanttBar", ft);
  }
};
function le(e, m = "top") {
  if (!e || typeof document > "u")
    return;
  const t = document.head, r = document.createElement("style");
  m === "top" && t.firstChild ? t.insertBefore(r, t.firstChild) : t.appendChild(r), r.appendChild(document.createTextNode(e));
}
le(`
.g-gantt-row {
  width: 100%;
  transition: background 0.4s;
  position: relative;
}
.g-gantt-row > .g-gantt-row-bars-container {
  position: relative;
  border-top: 1px solid #eaeaea;
  width: 100%;
  border-bottom: 1px solid #eaeaea;
}
.g-gantt-row-label {
  position: absolute;
  top: 0;
  left: 0px;
  padding: 0px 8px;
  display: flex;
  align-items: center;
  height: 60%;
  min-height: 20px;
  font-size: 0.8em;
  font-weight: bold;
  border-bottom-right-radius: 6px;
  background: #f2f2f2;
  z-index: 3;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.6);
}
.bar-transition-leave-active,
.bar-transition-enter-active {
  transition: all 0.2s;
}
.bar-transition-enter-from,
.bar-transition-leave-to {
  transform: scale(0.8);
  opacity: 0;
}
`, "top");
le(`
.g-gantt-chart {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
  border-radius: 5px;
  cursor: grab;
}
.g-gantt-chart.is-dragging {
  cursor: grabbing;
}
.with-column {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.g-gantt-rows-container {
  position: relative;
}
.labels-in-column {
  display: flex;
  flex-direction: row;
}
`, "top");
le(`
.g-gantt-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  background: cadetblue;
  overflow: hidden;
}
.g-gantt-bar-label {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 14px 0 14px; /* 14px is the width of the handle */
  display: flex;
  justify-content: center;
  align-items: center;
}
.g-gantt-bar-label > * {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.g-gantt-bar-handle-left,
.g-gantt-bar-handle-right {
  position: absolute;
  width: 10px;
  height: 100%;
  background: white;
  opacity: 0.7;
  border-radius: 0px;
  cursor: ew-resize;
  top: 0;
}
.g-gantt-bar-handle-left {
  left: 0;
}
.g-gantt-bar-handle-right {
  right: 0;
}
.g-gantt-bar-label img {
  pointer-events: none;
}
`, "top");
le(`
.g-grid-container {
  position: absolute;
  top: 0;
  left: 0%;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
.g-grid-line {
  width: 1px;
  height: 100%;
  border-left: 1px solid #eaeaea;
}
`, "top");
le(`
.g-label-column {
  display: flex;
  align-items: center;
  flex-direction: column;
  color: rgb(64, 64, 64);
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
  font-size: 0.9em;
}
.g-label-column-header {
  width: 100%;
  height: 80px;
  min-height: 80px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 5px;
}
.g-label-column-rows {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-bottom-left-radius: 5px;
}
.g-label-column-row {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0.1rem 0.3rem;
  overflow: hidden;
  white-space: normal;
  box-sizing: border-box;
  text-align: center;
  align-items: center;
  justify-content: center;
}
.g-label-column-row:last-child {
  border-bottom-left-radius: 5px;
}
`, "top");
le(`
.g-timeaxis {
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  background: white;
  z-index: 4;
  display: flex;
  flex-direction: column;
}
.g-timeunits-container {
  display: flex;
  width: 100%;
  height: 50%;
}
.g-timeunit {
  height: 100%;
  font-size: 65%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.g-upper-timeunit {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}
.g-timeaxis-hour-pin {
  width: 1px;
  height: 10px;
}
`, "top");
le(`
.g-gantt-tooltip {
  position: fixed;
  background: black;
  color: white;
  z-index: 4;
  font-size: 0.85em;
  padding: 5px;
  border-radius: 3px;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
}
.g-gantt-tooltip:before {
  content: "";
  position: absolute;
  top: 0;
  left: 10%;
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-bottom-color: black;
  border-top: 0;
  margin-left: -5px;
  margin-top: -5px;
}
.g-gantt-tooltip-color-dot {
  width: 8px;
  height: 8px;
  border-radius: 100%;
  margin-right: 4px;
}
.g-fade-enter-active,
.g-fade-leave-active {
  transition: opacity 0.3s ease;
}
.g-fade-enter-from,
.g-fade-leave-to {
  opacity: 0;
}
`, "top");
le(`
.g-grid-current-time {
  position: absolute;
  height: 100%;
  display: flex;
  z-index: 5;
  pointer-events: none;
}
.g-grid-current-time-marker {
  width: 0px;
  height: calc(100% - 2px);
  display: flex;
}
.g-grid-current-time-text {
  font-size: x-small;
}
`, "top");
export {
  ft as GGanttBar,
  sn as GGanttChart,
  mn as GGanttRow,
  pn as default,
  hn as extendDayjs,
  pn as ganttastic
};
