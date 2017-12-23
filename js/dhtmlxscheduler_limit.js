/*
@license
dhtmlxScheduler v.4.4.9 Professional

This software can be used only as part of dhtmlx.com site.
You are not allowed to use it on any other site

(c) Dinamenta, UAB.


*/
Scheduler.plugin(function(e) {
  e.config.limit_start = null, e.config.limit_end = null, e.config.limit_view = !1, e.config.check_limits = !0, e.config.mark_now = !0, e.config.display_marked_timespans = !0, e._temp_limit_scope = function() {
    function t(t, a, i, n, r) {
      var s = e,
        d = [],
        o = {
          _props: "map_to",
          matrix: "y_property"
        };
      for (var l in o) {
        var _ = o[l];
        if (s[l])
          for (var c in s[l]) {
            var h = s[l][c],
              u = h[_];
            t[u] && (d = s._add_timespan_zones(d, e._get_blocked_zones(a[c], t[u], i, n, r)))
          }
      }
      return d = s._add_timespan_zones(d, e._get_blocked_zones(a, "global", i, n, r));
    }
    var a = null,
      i = "dhx_time_block",
      n = "default",
      r = function(e, t, a) {
        return t instanceof Date && a instanceof Date ? (e.start_date = t, e.end_date = a) : (e.days = t, e.zones = a), e
      },
      s = function(e, t, a) {
        var n = "object" == typeof e ? e : {
          days: e
        };
        return n.type = i, n.css = "", t && (a && (n.sections = a), n = r(n, e, t)), n
      };
    e.blockTime = function(t, a, i) {
      var n = s(t, a, i);
      return e.addMarkedTimespan(n)
    }, e.unblockTime = function(t, a, i) {
      a = a || "fullday";
      var n = s(t, a, i);
      return e.deleteMarkedTimespan(n)
    }, e.attachEvent("onBeforeViewChange", function(t, a, i, n) {
      function r(t, a) {
        var i = e.config.limit_start,
          n = e.config.limit_end,
          r = e.date.add(t, 1, a);
        return t.valueOf() > n.valueOf() || r <= i.valueOf()
      }
      return e.config.limit_view && (n = n || a, i = i || t, r(n, i) && a.valueOf() != n.valueOf()) ? (setTimeout(function() {
        var t = r(a, i) ? e.config.limit_start : a;
        e.setCurrentView(r(t, i) ? null : t, i)
      }, 1), !1) : !0
    }), e.checkInMarkedTimespan = function(a, i, r) {
      i = i || n;
      for (var s = !0, d = new Date(a.start_date.valueOf()), o = e.date.add(d, 1, "day"), l = e._marked_timespans; d < a.end_date; d = e.date.date_part(o), o = e.date.add(d, 1, "day")) {
        var _ = +e.date.date_part(new Date(d)),
          c = d.getDay(),
          h = t(a, l, c, _, i);
        if (h)
          for (var u = 0; u < h.length; u += 2) {
            var v = e._get_zone_minutes(d),
              f = a.end_date > o || a.end_date.getDate() != d.getDate() ? 1440 : e._get_zone_minutes(a.end_date),
              g = h[u],
              m = h[u + 1];
            if (f > g && m > v && (s = "function" == typeof r ? r(a, v, f, g, m) : !1, !s)) break
          }
      }
      return !s
    };
    var d = e.checkLimitViolation = function(t) {
      if (!t) return !0;
      if (!e.config.check_limits) return !0;
      var a = e,
        n = a.config,
        r = [];
      if (t.rec_type)
        for (var s = e.getRecDates(t), d = 0; d < s.length; d++) {
          var o = e._copy_event(t);
          e._lame_copy(o, s[d]), r.push(o)
        } else r = [t];
      for (var l = !0, _ = 0; _ < r.length; _++) {
        var c = !0,
          o = r[_];
        o._timed = e.isOneDayEvent(o), c = n.limit_start && n.limit_end ? o.start_date.valueOf() >= n.limit_start.valueOf() && o.end_date.valueOf() <= n.limit_end.valueOf() : !0, c && (c = !e.checkInMarkedTimespan(o, i, function(e, t, i, n, r) {
          var s = !0;
          return r >= t && t >= n && ((1440 == r || r > i) && (s = !1), e._timed && a._drag_id && "new-size" == a._drag_mode ? (e.start_date.setHours(0), e.start_date.setMinutes(r)) : s = !1), (i >= n && r > i || n > t && i > r) && (e._timed && a._drag_id && "new-size" == a._drag_mode ? (e.end_date.setHours(0), e.end_date.setMinutes(n)) : s = !1),
            s
        })), c || (c = a.checkEvent("onLimitViolation") ? a.callEvent("onLimitViolation", [o.id, o]) : c), l = l && c
      }
      return l || (a._drag_id = null, a._drag_mode = null), l
    };
    e._get_blocked_zones = function(e, t, a, i, n) {
        var r = [];
        if (e && e[t])
          for (var s = e[t], d = this._get_relevant_blocked_zones(a, i, s, n), o = 0; o < d.length; o++) r = this._add_timespan_zones(r, d[o].zones);
        return r
      }, e._get_relevant_blocked_zones = function(e, t, a, i) {
        var n = a[t] && a[t][i] ? a[t][i] : a[e] && a[e][i] ? a[e][i] : [];
        return n
      }, e.attachEvent("onMouseDown", function(e) {
        return !(e == i)
      }),
      e.attachEvent("onBeforeDrag", function(t) {
        return t ? d(e.getEvent(t)) : !0
      }), e.attachEvent("onClick", function(t, a) {
        return d(e.getEvent(t))
      }), e.attachEvent("onBeforeLightbox", function(t) {
        var i = e.getEvent(t);
        return a = [i.start_date, i.end_date], d(i)
      }), e.attachEvent("onEventSave", function(t, a, i) {
        if (!a.start_date || !a.end_date) {
          var n = e.getEvent(t);
          a.start_date = new Date(n.start_date), a.end_date = new Date(n.end_date)
        }
        if (a.rec_type) {
          var r = e._lame_clone(a);
          return e._roll_back_dates(r), d(r)
        }
        return d(a)
      }), e.attachEvent("onEventAdded", function(t) {
        if (!t) return !0;
        var a = e.getEvent(t);
        return !d(a) && e.config.limit_start && e.config.limit_end && (a.start_date < e.config.limit_start && (a.start_date = new Date(e.config.limit_start)), a.start_date.valueOf() >= e.config.limit_end.valueOf() && (a.start_date = this.date.add(e.config.limit_end, -1, "day")), a.end_date < e.config.limit_start && (a.end_date = new Date(e.config.limit_start)), a.end_date.valueOf() >= e.config.limit_end.valueOf() && (a.end_date = this.date.add(e.config.limit_end, -1, "day")), a.start_date.valueOf() >= a.end_date.valueOf() && (a.end_date = this.date.add(a.start_date, this.config.event_duration || this.config.time_step, "minute")),
          a._timed = this.isOneDayEvent(a)), !0
      }), e.attachEvent("onEventChanged", function(t) {
        if (!t) return !0;
        var i = e.getEvent(t);
        if (!d(i)) {
          if (!a) return !1;
          i.start_date = a[0], i.end_date = a[1], i._timed = this.isOneDayEvent(i)
        }
        return !0
      }), e.attachEvent("onBeforeEventChanged", function(e, t, a) {
        return d(e)
      }), e.attachEvent("onBeforeEventCreated", function(t) {
        var a = e.getActionData(t).date,
          i = {
            _timed: !0,
            start_date: a,
            end_date: e.date.add(a, e.config.time_step, "minute")
          };
        return d(i)
      }), e.attachEvent("onViewChange", function() {
        e._mark_now();
      }), e.attachEvent("onSchedulerResize", function() {
        return window.setTimeout(function() {
          e._mark_now()
        }, 1), !0
      }), e.attachEvent("onTemplatesReady", function() {
        e._mark_now_timer = window.setInterval(function() {
          e._is_initialized() && e._mark_now()
        }, 6e4)
      }), e._mark_now = function(t) {
        var a = "dhx_now_time";
        this._els[a] || (this._els[a] = []);
        var i = e._currentDate(),
          n = this.config;
        if (e._remove_mark_now(), !t && n.mark_now && i < this._max_date && i > this._min_date && i.getHours() >= n.first_hour && i.getHours() < n.last_hour) {
          var r = this.locate_holder_day(i);
          this._els[a] = e._append_mark_now(r, i)
        }
      }, e._append_mark_now = function(t, a) {
        var i = "dhx_now_time",
          n = e._get_zone_minutes(a),
          r = {
            zones: [n, n + 1],
            css: i,
            type: i
          };
        if (!this._table_view) {
          if (this._props && this._props[this._mode]) {
            var s, d, o = this._props[this._mode],
              l = o.size || o.options.length;
            o.days > 1 ? (s = t, d = t + l) : (s = 0, d = s + l);
            for (var _ = [], c = s; d > c; c++) {
              var h = c;
              r.days = h;
              var u = e._render_marked_timespan(r, null, h)[0];
              _.push(u)
            }
            return _
          }
          return r.days = t, e._render_marked_timespan(r, null, t)
        }
        return "month" == this._mode ? (r.days = +e.date.date_part(a),
          e._render_marked_timespan(r, null, null)) : void 0
      }, e._remove_mark_now = function() {
        for (var e = "dhx_now_time", t = this._els[e], a = 0; a < t.length; a++) {
          var i = t[a],
            n = i.parentNode;
          n && n.removeChild(i)
        }
        this._els[e] = []
      }, e._marked_timespans = {
        global: {}
      }, e._get_zone_minutes = function(e) {
        return 60 * e.getHours() + e.getMinutes()
      }, e._prepare_timespan_options = function(t) {
        var a = [],
          i = [];
        if ("fullweek" == t.days && (t.days = [0, 1, 2, 3, 4, 5, 6]), t.days instanceof Array) {
          for (var r = t.days.slice(), s = 0; s < r.length; s++) {
            var d = e._lame_clone(t);
            d.days = r[s],
              a.push.apply(a, e._prepare_timespan_options(d))
          }
          return a
        }
        if (!t || !(t.start_date && t.end_date && t.end_date > t.start_date || void 0 !== t.days && t.zones) && !t.type) return a;
        var o = 0,
          l = 1440;
        "fullday" == t.zones && (t.zones = [o, l]), t.zones && t.invert_zones && (t.zones = e.invertZones(t.zones)), t.id = e.uid(), t.css = t.css || "", t.type = t.type || n;
        var _ = t.sections;
        if (_) {
          for (var c in _)
            if (_.hasOwnProperty(c)) {
              var h = _[c];
              h instanceof Array || (h = [h]);
              for (var s = 0; s < h.length; s++) {
                var u = e._lame_copy({}, t);
                u.sections = {}, u.sections[c] = h[s],
                  i.push(u)
              }
            }
        } else i.push(t);
        for (var v = 0; v < i.length; v++) {
          var f = i[v],
            g = f.start_date,
            m = f.end_date;
          if (g && m)
            for (var p = e.date.date_part(new Date(g)), y = e.date.add(p, 1, "day"); m > p;) {
              var u = e._lame_copy({}, f);
              delete u.start_date, delete u.end_date, u.days = p.valueOf();
              var b = g > p ? e._get_zone_minutes(g) : o,
                x = m > y || m.getDate() != p.getDate() ? l : e._get_zone_minutes(m);
              u.zones = [b, x], a.push(u), p = y, y = e.date.add(y, 1, "day")
            } else f.days instanceof Date && (f.days = e.date.date_part(f.days).valueOf()), f.zones = t.zones.slice(), a.push(f);
        }
        return a
      }, e._get_dates_by_index = function(t, a, i) {
        var n = [];
        a = e.date.date_part(new Date(a || e._min_date)), i = new Date(i || e._max_date);
        for (var r = a.getDay(), s = t - r >= 0 ? t - r : 7 - a.getDay() + t, d = e.date.add(a, s, "day"); i > d; d = e.date.add(d, 1, "week")) n.push(d);
        return n
      }, e._get_css_classes_by_config = function(e) {
        var t = [];
        return e.type == i && (t.push(i), e.css && t.push(i + "_reset")), t.push("dhx_marked_timespan", e.css), t.join(" ")
      }, e._get_block_by_config = function(e) {
        var t = document.createElement("DIV");
        return e.html && ("string" == typeof e.html ? t.innerHTML = e.html : t.appendChild(e.html)),
          t
      }, e._render_marked_timespan = function(t, a, i) {
        var n = [],
          r = e.config,
          s = this._min_date,
          d = this._max_date,
          o = !1;
        if (!r.display_marked_timespans) return n;
        if (!i && 0 !== i) {
          if (t.days < 7) i = t.days;
          else {
            var l = new Date(t.days);
            if (o = +l, !(+d > +l && +l >= +s)) return n;
            i = l.getDay()
          }
          var _ = s.getDay();
          _ > i ? i = 7 - (_ - i) : i -= _
        }
        var c = t.zones,
          h = e._get_css_classes_by_config(t);
        if (e._table_view && "month" == e._mode) {
          var u = [],
            v = [];
          if (a) u.push(a), v.push(i);
          else {
            v = o ? [o] : e._get_dates_by_index(i);
            for (var f = 0; f < v.length; f++) u.push(this._scales[v[f]]);
          }
          for (var f = 0; f < u.length; f++) {
            a = u[f], i = v[f];
            var g = Math.floor((this._correct_shift(i, 1) - s.valueOf()) / (864e5 * this._cols.length)),
              m = this.locate_holder_day(i, !1) % this._cols.length;
            if (!this._ignores[m]) {
              var p = e._get_block_by_config(t),
                y = Math.max(a.offsetHeight - 1, 0),
                b = Math.max(a.offsetWidth - 1, 0),
                x = this._colsS[m],
                w = this._colsS.heights[g] + (this._colsS.height ? this.xy.month_scale_height + 2 : 2) - 1;
              p.className = h, p.style.top = w + "px", p.style.lineHeight = p.style.height = y + "px";
              for (var k = 0; k < c.length; k += 2) {
                var E = c[f],
                  D = c[f + 1];
                if (E >= D) return [];
                var N = p.cloneNode(!0);
                N.style.left = x + Math.round(E / 1440 * b) + "px", N.style.width = Math.round((D - E) / 1440 * b) + "px", a.appendChild(N), n.push(N)
              }
            }
          }
        } else {
          var S = i;
          if (this._ignores[this.locate_holder_day(i, !1)]) return n;
          if (this._props && this._props[this._mode] && t.sections && t.sections[this._mode]) {
            var A = this._props[this._mode];
            S = A.order[t.sections[this._mode]];
            var M = A.order[t.sections[this._mode]];
            if (A.days > 1) {
              var C = A.size || A.options.length;
              S = S * C + M
            } else S = M, A.size && S > A.position + A.size && (S = 0)
          }
          a = a ? a : e.locate_holder(S);
          for (var f = 0; f < c.length; f += 2) {
            var E = Math.max(c[f], 60 * r.first_hour),
              D = Math.min(c[f + 1], 60 * r.last_hour);
            if (E >= D) {
              if (f + 2 < c.length) continue;
              return []
            }
            var N = e._get_block_by_config(t);
            N.className = h;
            var O = 24 * this.config.hour_size_px + 1,
              T = 36e5;
            N.style.top = Math.round((60 * E * 1e3 - this.config.first_hour * T) * this.config.hour_size_px / T) % O + "px", N.style.lineHeight = N.style.height = Math.max(Math.round(60 * (D - E) * 1e3 * this.config.hour_size_px / T) % O, 1) + "px", a.appendChild(N), n.push(N)
          }
        }
        return n
      }, e._mark_timespans = function() {
        var t = this._els.dhx_cal_data[0],
          a = [];
        if (e._table_view && "month" == e._mode)
          for (var i in this._scales) {
            var n = new Date(+i);
            a.push.apply(a, e._on_scale_add_marker(this._scales[i], n))
          } else
            for (var n = new Date(e._min_date), r = 0, s = t.childNodes.length; s > r; r++) {
              var d = t.childNodes[r];
              d.firstChild && e._getClassName(d.firstChild).indexOf("dhx_scale_hour") > -1 || (a.push.apply(a, e._on_scale_add_marker(d, n)), n = e.date.add(n, 1, "day"))
            }
        return a
      }, e.markTimespan = function(t) {
        var a = !1;
        this._els.dhx_cal_data || (e.get_elements(), a = !0);
        var i = e._marked_timespans_ids,
          n = e._marked_timespans_types,
          r = e._marked_timespans;
        e.deleteMarkedTimespan(), e.addMarkedTimespan(t);
        var s = e._mark_timespans();
        return a && (e._els = []), e._marked_timespans_ids = i, e._marked_timespans_types = n, e._marked_timespans = r, s
      }, e.unmarkTimespan = function(e) {
        if (e)
          for (var t = 0; t < e.length; t++) {
            var a = e[t];
            a.parentNode && a.parentNode.removeChild(a)
          }
      }, e._addMarkerTimespanConfig = function(t) {
        var a = "global",
          i = e._marked_timespans,
          n = t.id,
          r = e._marked_timespans_ids;
        r[n] || (r[n] = []);
        var s = t.days,
          d = t.sections,
          o = t.type;
        if (t.id = n, d) {
          for (var l in d)
            if (d.hasOwnProperty(l)) {
              i[l] || (i[l] = {});
              var _ = d[l],
                c = i[l];
              c[_] || (c[_] = {}), c[_][s] || (c[_][s] = {}), c[_][s][o] || (c[_][s][o] = [], e._marked_timespans_types || (e._marked_timespans_types = {}), e._marked_timespans_types[o] || (e._marked_timespans_types[o] = !0));
              var h = c[_][s][o];
              t._array = h, h.push(t), r[n].push(t)
            }
        } else {
          i[a][s] || (i[a][s] = {}), i[a][s][o] || (i[a][s][o] = []), e._marked_timespans_types || (e._marked_timespans_types = {}), e._marked_timespans_types[o] || (e._marked_timespans_types[o] = !0);
          var h = i[a][s][o];
          t._array = h, h.push(t), r[n].push(t);
        }
      }, e._marked_timespans_ids = {}, e.addMarkedTimespan = function(t) {
        var a = e._prepare_timespan_options(t);
        if (a.length) {
          for (var i = a[0].id, n = 0; n < a.length; n++) e._addMarkerTimespanConfig(a[n]);
          return i
        }
      }, e._add_timespan_zones = function(e, t) {
        var a = e.slice();
        if (t = t.slice(), !a.length) return t;
        for (var i = 0; i < a.length; i += 2)
          for (var n = a[i], r = a[i + 1], s = i + 2 == a.length, d = 0; d < t.length; d += 2) {
            var o = t[d],
              l = t[d + 1];
            if (l > r && r >= o || n > o && l >= n) a[i] = Math.min(n, o), a[i + 1] = Math.max(r, l), i -= 2;
            else {
              if (!s) continue;
              var _ = n > o ? 0 : 2;
              a.splice(i + _, 0, o, l);
            }
            t.splice(d--, 2);
            break
          }
        return a
      }, e._subtract_timespan_zones = function(e, t) {
        for (var a = e.slice(), i = 0; i < a.length; i += 2)
          for (var n = a[i], r = a[i + 1], s = 0; s < t.length; s += 2) {
            var d = t[s],
              o = t[s + 1];
            if (o > n && r > d) {
              var l = !1;
              n >= d && o >= r && a.splice(i, 2), d > n && (a.splice(i, 2, n, d), l = !0), r > o && a.splice(l ? i + 2 : i, l ? 0 : 2, o, r), i -= 2;
              break
            }
          }
        return a
      }, e.invertZones = function(t) {
        return e._subtract_timespan_zones([0, 1440], t.slice())
      }, e._delete_marked_timespan_by_id = function(t) {
        var a = e._marked_timespans_ids[t];
        if (a)
          for (var i = 0; i < a.length; i++)
            for (var n = a[i], r = n._array, s = 0; s < r.length; s++)
              if (r[s] == n) {
                r.splice(s, 1);
                break
              }
      }, e._delete_marked_timespan_by_config = function(t) {
        var a, i = e._marked_timespans,
          r = t.sections,
          s = t.days,
          d = t.type || n;
        if (r) {
          for (var o in r)
            if (r.hasOwnProperty(o) && i[o]) {
              var l = r[o];
              i[o][l] && (a = i[o][l])
            }
        } else a = i.global;
        if (a)
          if (void 0 !== s) a[s] && a[s][d] && (e._addMarkerTimespanConfig(t), e._delete_marked_timespans_list(a[s][d], t));
          else
            for (var _ in a)
              if (a[_][d]) {
                var c = e._lame_clone(t);
                t.days = _, e._addMarkerTimespanConfig(c), e._delete_marked_timespans_list(a[_][d], t)
              }
      }, e._delete_marked_timespans_list = function(t, a) {
        for (var i = 0; i < t.length; i++) {
          var n = t[i],
            r = e._subtract_timespan_zones(n.zones, a.zones);
          if (r.length) n.zones = r;
          else {
            t.splice(i, 1), i--;
            for (var s = e._marked_timespans_ids[n.id], d = 0; d < s.length; d++)
              if (s[d] == n) {
                s.splice(d, 1);
                break
              }
          }
        }
      }, e.deleteMarkedTimespan = function(t) {
        if (arguments.length || (e._marked_timespans = {
            global: {}
          }, e._marked_timespans_ids = {}, e._marked_timespans_types = {}), "object" != typeof t) e._delete_marked_timespan_by_id(t);
        else {
          t.start_date && t.end_date || (void 0 !== t.days || t.type || (t.days = "fullweek"),
            t.zones || (t.zones = "fullday"));
          var a = [];
          if (t.type) a.push(t.type);
          else
            for (var i in e._marked_timespans_types) a.push(i);
          for (var n = e._prepare_timespan_options(t), r = 0; r < n.length; r++)
            for (var s = n[r], d = 0; d < a.length; d++) {
              var o = e._lame_clone(s);
              o.type = a[d], e._delete_marked_timespan_by_config(o)
            }
        }
      }, e._get_types_to_render = function(t, a) {
        var i = t ? e._lame_copy({}, t) : {};
        for (var n in a || {}) a.hasOwnProperty(n) && (i[n] = a[n]);
        return i
      }, e._get_configs_to_render = function(e) {
        var t = [];
        for (var a in e) e.hasOwnProperty(a) && t.push.apply(t, e[a]);
        return t
      }, e._on_scale_add_marker = function(t, a) {
        if (!e._table_view || "month" == e._mode) {
          var i = a.getDay(),
            n = a.valueOf(),
            r = this._mode,
            s = e._marked_timespans,
            d = [],
            o = [];
          if (this._props && this._props[r]) {
            var l = this._props[r],
              _ = l.options,
              c = e._get_unit_index(l, a),
              h = _[c];
            if (l.days > 1) {
              var u = 864e5,
                v = Math.round((a - e._min_date) / u);
              a = e.date.add(e._min_date, Math.floor(v / _.length), "day"), a = e.date.date_part(a)
            } else a = e.date.date_part(new Date(this._date));
            if (i = a.getDay(), n = a.valueOf(), s[r] && s[r][h.key]) {
              var f = s[r][h.key],
                g = e._get_types_to_render(f[i], f[n]);
              d.push.apply(d, e._get_configs_to_render(g))
            }
          }
          var m = s.global,
            p = m[n] || m[i];
          d.push.apply(d, e._get_configs_to_render(p));
          for (var y = 0; y < d.length; y++) o.push.apply(o, e._render_marked_timespan(d[y], t, a));
          return o
        }
      }, e.attachEvent("onScaleAdd", function() {
        e._on_scale_add_marker.apply(e, arguments)
      }), e.dblclick_dhx_marked_timespan = function(t, a) {
        e.callEvent("onScaleDblClick", [e.getActionData(t).date, a, t]), e.config.dblclick_create && e.addEventNow(e.getActionData(t).date, null, t)
      }
  }, e._temp_limit_scope()
});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_limit.js.map
