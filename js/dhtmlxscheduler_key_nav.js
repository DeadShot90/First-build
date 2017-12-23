/*
@license
dhtmlxScheduler v.4.4.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
! function() {
  function e(e) {
    function t(t) {
      var a = {
        minicalButton: e.$keyboardNavigation.MinicalButton,
        minicalDate: e.$keyboardNavigation.MinicalCell,
        scheduler: e.$keyboardNavigation.SchedulerNode,
        dataArea: e.$keyboardNavigation.DataArea,
        timeSlot: e.$keyboardNavigation.TimeSlot,
        event: e.$keyboardNavigation.Event
      };
      return a[t] || a.scheduler
    }
    e.config.key_nav = !0, e.config.key_nav_step = 30, e.addShortcut = function(e, a, i) {
        var r = t(i);
        r && r.prototype.bind(e, a)
      }, e.removeShortcut = function(e, a) {
        var i = t(a);
        i && i.prototype.unbind(e);
      }, e.focus = function() {
        if (e.config.key_nav) {
          var t = e.$keyboardNavigation.dispatcher;
          t.enable();
          var a = t.getActiveNode();
          !a || a instanceof e.$keyboardNavigation.MinicalButton || a instanceof e.$keyboardNavigation.MinicalCell ? t.setDefaultNode() : t.focusNode(t.getActiveNode())
        }
      }, e.$keyboardNavigation = {}, e._compose = function() {
        for (var e = Array.prototype.slice.call(arguments, 0), t = {}, a = 0; a < e.length; a++) {
          var i = e[a];
          "function" == typeof i && (i = new i);
          for (var r in i) t[r] = i[r]
        }
        return t
      }, e.$keyboardNavigation.shortcuts = {
        createCommand: function() {
          return {
            modifiers: {
              shift: !1,
              alt: !1,
              ctrl: !1,
              meta: !1
            },
            keyCode: null
          }
        },
        parse: function(e) {
          for (var t = [], a = this.getExpressions(this.trim(e)), i = 0; i < a.length; i++) {
            for (var r = this.getWords(a[i]), n = this.createCommand(), s = 0; s < r.length; s++) this.commandKeys[r[s]] ? n.modifiers[r[s]] = !0 : this.specialKeys[r[s]] ? n.keyCode = this.specialKeys[r[s]] : n.keyCode = r[s].charCodeAt(0);
            t.push(n)
          }
          return t
        },
        getCommandFromEvent: function(e) {
          var t = this.createCommand();
          t.modifiers.shift = !!e.shiftKey, t.modifiers.alt = !!e.altKey,
            t.modifiers.ctrl = !!e.ctrlKey, t.modifiers.meta = !!e.metaKey, t.keyCode = e.which || e.keyCode;
          var a = String.fromCharCode(t.keyCode);
          return a && (t.keyCode = a.toLowerCase().charCodeAt(0)), t
        },
        getHashFromEvent: function(e) {
          return this.getHash(this.getCommandFromEvent(e))
        },
        getHash: function(e) {
          var t = [];
          for (var a in e.modifiers) e.modifiers[a] && t.push(a);
          return t.push(e.keyCode), t.join(this.junctionChar)
        },
        getExpressions: function(e) {
          return e.split(this.junctionChar)
        },
        getWords: function(e) {
          return e.split(this.combinationChar);
        },
        trim: function(e) {
          return e.replace(/\s/g, "")
        },
        junctionChar: ",",
        combinationChar: "+",
        commandKeys: {
          shift: 16,
          alt: 18,
          ctrl: 17,
          meta: !0
        },
        specialKeys: {
          backspace: 8,
          tab: 9,
          enter: 13,
          esc: 27,
          space: 32,
          up: 38,
          down: 40,
          left: 37,
          right: 39,
          home: 36,
          end: 35,
          pageup: 33,
          pagedown: 34,
          "delete": 46,
          insert: 45,
          plus: 107,
          f1: 112,
          f2: 113,
          f3: 114,
          f4: 115,
          f5: 116,
          f6: 117,
          f7: 118,
          f8: 119,
          f9: 120,
          f10: 121,
          f11: 122,
          f12: 123
        }
      }, e.$keyboardNavigation.EventHandler = {
        _handlers: null,
        findHandler: function(t) {
          this._handlers || (this._handlers = {});
          var a = e.$keyboardNavigation.shortcuts,
            i = a.getHash(t);
          return this._handlers[i]
        },
        doAction: function(e, t) {
          var a = this.findHandler(e);
          a && (a.call(this, t), t.preventDefault ? t.preventDefault() : t.returnValue = !1)
        },
        bind: function(t, a) {
          this._handlers || (this._handlers = {});
          for (var i = e.$keyboardNavigation.shortcuts, r = i.parse(t), n = 0; n < r.length; n++) this._handlers[i.getHash(r[n])] = a
        },
        unbind: function(t) {
          for (var a = e.$keyboardNavigation.shortcuts, i = a.parse(t), r = 0; r < i.length; r++) this._handlers[a.getHash(i[r])] && delete this._handlers[a.getHash(i[r])]
        },
        bindAll: function(e) {
          for (var t in e) this.bind(t, e[t]);
        },
        initKeys: function() {
          this._handlers || (this._handlers = {}), this.keys && this.bindAll(this.keys)
        }
      },
      function() {
        e.$keyboardNavigation.getFocusableNodes = e._getFocusableNodes, e.$keyboardNavigation.trapFocus = function(t, a) {
          if (9 != a.keyCode) return !1;
          for (var i = e.$keyboardNavigation.getFocusableNodes(t), r = document.activeElement, n = -1, s = 0; s < i.length; s++)
            if (i[s] == r) {
              n = s;
              break
            }
          var d, o;
          if (a.shiftKey) {
            if (d = 0 >= n ? i[i.length - 1] : n - 1, o = i[d]) return o.focus(), a.preventDefault(), !0
          } else if (d = n >= i.length - 1 ? 0 : n + 1, o = i[d]) return o.focus(),
            a.preventDefault(), !0;
          return !1
        }
      }(), e.$keyboardNavigation.marker = {
        clear: function() {
          for (var t = e.$container.querySelectorAll(".dhx_focus_slot"), a = 0; a < t.length; a++) t[a].parentNode.removeChild(t[a])
        },
        createElement: function() {
          var e = document.createElement("DIV");
          return e.setAttribute("tabindex", -1), e.className = "dhx_focus_slot", e
        },
        renderMultiple: function(t, a, i) {
          for (var r = [], n = new Date(t), s = new Date(Math.min(a.valueOf(), e.date.add(e.date.day_start(new Date(t)), 1, "day").valueOf())); n.valueOf() < a.valueOf();) r = r.concat(i.call(this, n, new Date(Math.min(s.valueOf(), a.valueOf())))),
            n = e.date.day_start(e.date.add(n, 1, "day")), s = e.date.day_start(e.date.add(n, 1, "day")), s = new Date(Math.min(s.valueOf(), a.valueOf()));
          return r
        },
        render: function(t, a, i) {
          this.clear();
          var r = [],
            n = e.$keyboardNavigation.TimeSlot.prototype._modes,
            s = e.$keyboardNavigation.TimeSlot.prototype._getMode();
          switch (s) {
            case n.units:
              r = this.renderVerticalMarker(t, a, i);
              break;
            case n.timeline:
              r = this.renderTimelineMarker(t, a, i);
              break;
            case n.year:
              r = r.concat(this.renderMultiple(t, a, this.renderYearMarker));
              break;
            case n.month:
              r = this.renderMonthMarker(t, a);
              break;
            case n.weekAgenda:
              r = r.concat(this.renderMultiple(t, a, this.renderWeekAgendaMarker));
              break;
            case n.list:
              r = this.renderAgendaMarker(t, a);
              break;
            case n.dayColumns:
              r = r.concat(this.renderMultiple(t, a, this.renderVerticalMarker))
          }
          this.addWaiAriaLabel(r, t, a, i), this.addDataAttributes(r, t, a, i);
          for (var d = r.length - 1; d >= 0; d--)
            if (r[d].offsetWidth) return r[d];
          return null
        },
        addDataAttributes: function(t, a, i, r) {
          for (var n = e.date.date_to_str(e.config.api_date), s = n(a), d = n(i), o = 0; o < t.length; o++) t[o].setAttribute("data-start-date", s),
            t[o].setAttribute("data-end-date", d), r && t[o].setAttribute("data-section", r)
        },
        addWaiAriaLabel: function(t, a, i, r) {
          var n = "",
            s = e.getState(),
            d = s.mode,
            o = !1;
          n += e.templates.day_date(a), e.date.day_start(new Date(a)).valueOf() != a.valueOf() && (n += " " + e.templates.hour_scale(a), o = !0), e.date.day_start(new Date(a)).valueOf() != e.date.day_start(new Date(i)).valueOf() && (n += " - " + e.templates.day_date(i), (o || e.date.day_start(new Date(i)).valueOf() != i.valueOf()) && (n += " " + e.templates.hour_scale(i))), r && (e.matrix && e.matrix[d] ? n += ", " + e.templates[d + "_scale_label"](r.key, r.label, r) : e._props && e._props[d] && (n += ", " + e.templates[d + "_scale_text"](r.key, r.label, r)));
          for (var l = 0; l < t.length; l++) e._waiAria.setAttributes(t[l], {
            "aria-label": n,
            "aria-live": "polite"
          })
        },
        renderWeekAgendaMarker: function(t, a) {
          for (var i = e.$container.querySelectorAll(".dhx_wa_day_cont .dhx_wa_scale_bar"), r = e.date.week_start(new Date(e.getState().min_date)), n = -1, s = e.date.day_start(new Date(t)), d = 0; d < i.length && (n++, e.date.day_start(new Date(r)).valueOf() != s.valueOf()); d++) r = e.date.add(r, 1, "day");
          return -1 != n ? this._wrapDiv(i[n]) : []
        },
        _wrapDiv: function(e) {
          var t = this.createElement();
          return t.style.top = e.offsetTop + "px",
            t.style.left = e.offsetLeft + "px", t.style.width = e.offsetWidth + "px", t.style.height = e.offsetHeight + "px", e.appendChild(t), [t]
        },
        renderYearMarker: function(t, a) {
          var i = e._get_year_cell(t);
          i.style.position = "relative";
          var r = this.createElement();
          return r.style.top = "0px", r.style.left = "0px", r.style.width = "100%", r.style.height = "100%", i.appendChild(r), [r]
        },
        renderAgendaMarker: function(t, a) {
          var i = this.createElement();
          return i.style.height = "1px", i.style.width = "100%", i.style.opacity = 1, i.style.top = "0px", i.style.left = "0px",
            e.$container.querySelector(".dhx_cal_data").appendChild(i), [i]
        },
        renderTimelineMarker: function(t, a, i) {
          var r = e._lame_copy({}, e.matrix[e._mode]),
            n = r._scales;
          r.round_position = !1;
          var s = [],
            d = t ? new Date(t) : e._min_date,
            o = a ? new Date(a) : e._max_date;
          if (d.valueOf() < e._min_date.valueOf() && (d = new Date(e._min_date)), o.valueOf() > e._max_date.valueOf() && (o = new Date(e._max_date)), !r._trace_x) return s;
          for (var l = 0; l < r._trace_x.length && !e._is_column_visible(r._trace_x[l]); l++);
          if (l == r._trace_x.length) return s;
          var c = n[i];
          if (!(a > d && o > t)) return s;
          var h = this.createElement(),
            _ = e._timeline_getX({
              start_date: t
            }, !1, r) - 1,
            u = e._timeline_getX({
              start_date: a
            }, !1, r) - 1,
            v = r._section_height[i] - 1 || r.dy - 1,
            g = 0;
          e._isRender("cell") && (g = c.offsetTop, _ += r.dx, u += r.dx, c = e.$container.querySelector(".dhx_cal_data"));
          var f = Math.max(1, u - _ - 1);
          return h.style.cssText = "height: " + v + "px; left: " + _ + "px; width: " + f + "px; top: " + g + "px;", c.insertBefore(h, c.firstChild), s.push(h), s
        },
        renderMonthCell: function(t) {
          for (var a = e.$container.querySelectorAll(".dhx_month_head"), i = [], r = 0; r < a.length; r++) i.push(a[r].parentNode);
          for (var n = e.date.week_start(new Date(e.getState().min_date)), s = -1, d = 0, o = -1, l = n, c = e.date.day_start(new Date(t)), r = 0; r < i.length && (s++, 6 == o ? (d++, o = 0) : o++, e.date.day_start(new Date(l)).valueOf() != c.valueOf()); r++) l = e.date.add(l, 1, "day");
          if (-1 == s) return [];
          var h = e._colsS[o],
            _ = e._colsS.heights[d],
            u = this.createElement();
          u.style.top = _ + "px", u.style.left = h + "px", u.style.width = e._cols[o] + "px", u.style.height = (e._colsS.heights[d + 1] - _ || e._colsS.height) + "px";
          var v = e.$container.querySelector(".dhx_cal_data"),
            g = v.querySelector("table");
          return g.nextSibling ? v.insertBefore(u, g.nextSibling) : v.appendChild(u), u
        },
        renderMonthMarker: function(t, a) {
          for (var i = [], r = t; r.valueOf() < a.valueOf();) i.push(this.renderMonthCell(r)), r = e.date.add(r, 1, "day");
          return i
        },
        renderVerticalMarker: function(t, a, i) {
          var r = e.locate_holder_day(t),
            n = [],
            s = null,
            d = e.config;
          if (e._ignores[r]) return n;
          if (e._props && e._props[e._mode] && i) {
            var o = e._props[e._mode];
            r = o.order[i];
            var l = o.order[i];
            o.days > 1 ? r = e.locate_holder_day(t) + l : (r = l, o.size && r > o.position + o.size && (r = 0))
          }
          if (s = e.locate_holder(r), !s || s.querySelector(".dhx_scale_hour")) return document.createElement("div");
          var c = Math.max(60 * t.getHours() + t.getMinutes(), 60 * d.first_hour),
            h = Math.min(60 * a.getHours() + a.getMinutes(), 60 * d.last_hour);
          if (!h && e.date.day_start(new Date(a)).valueOf() > e.date.day_start(new Date(t)).valueOf() && (h = 60 * d.last_hour), c >= h) return [];
          var _ = this.createElement(),
            u = e.config.hour_size_px * d.last_hour + 1,
            v = 36e5;
          return _.style.top = Math.round((60 * c * 1e3 - e.config.first_hour * v) * e.config.hour_size_px / v) % u + "px", _.style.lineHeight = _.style.height = Math.max(Math.round(60 * (h - c) * 1e3 * e.config.hour_size_px / v) % u, 1) + "px",
            _.style.width = "100%", s.appendChild(_), n.push(_), n[0]
        }
      }, e.$keyboardNavigation.SchedulerNode = function() {}, e.$keyboardNavigation.SchedulerNode.prototype = e._compose(e.$keyboardNavigation.EventHandler, {
        getDefaultNode: function() {
          var t = new e.$keyboardNavigation.TimeSlot;
          return t.isValid() || (t = t.fallback()), t
        },
        _modes: {
          month: "month",
          year: "year",
          dayColumns: "dayColumns",
          timeline: "timeline",
          units: "units",
          weekAgenda: "weekAgenda",
          list: "list"
        },
        getMode: function() {
          var t = e.getState(),
            a = t.mode;
          return e.matrix && e.matrix[a] ? this._modes.timeline : e._props && e._props[a] ? this._modes.units : "month" == a ? this._modes.month : "year" == a ? this._modes.year : "week_agenda" == a ? this._modes.weekAgenda : "map" == a || "agenda" == a || e._grid && e["grid_" + a] ? this._modes.list : this._modes.dayColumns;
        },
        focus: function() {
          e.focus()
        },
        blur: function() {},
        disable: function() {
          e.$container.setAttribute("tabindex", "0")
        },
        enable: function() {
          e.$container && e.$container.removeAttribute("tabindex")
        },
        isEnabled: function() {
          return e.$container.hasAttribute("tabindex")
        },
        _compareEvents: function(e, t) {
          return e.start_date.valueOf() == t.start_date.valueOf() ? e.id > t.id ? 1 : -1 : e.start_date.valueOf() > t.start_date.valueOf() ? 1 : -1
        },
        _pickEvent: function(t, a, i, r) {
          var n = e.getState();
          t = new Date(Math.max(n.min_date.valueOf(), t.valueOf())),
            a = new Date(Math.min(n.max_date.valueOf(), a.valueOf()));
          var s = e.getEvents(t, a);
          s.sort(this._compareEvents), r && (s = s.reverse());
          for (var d = !!i, o = 0; o < s.length && d; o++) s[o].id == i && (d = !1), s.splice(o, 1), o--;
          return s[0]
        },
        nextEventHandler: function(t) {
          var a = e.$keyboardNavigation.dispatcher.activeNode,
            i = t || a && a.eventId,
            r = null;
          if (i && e.getEvent(i)) {
            var n = e.getEvent(i);
            r = e.$keyboardNavigation.SchedulerNode.prototype._pickEvent(n.start_date, e.date.add(n.start_date, 1, "year"), n.id, !1)
          }
          if (!r && !t) {
            var s = e.getState();
            r = e.$keyboardNavigation.SchedulerNode.prototype._pickEvent(s.min_date, e.date.add(s.min_date, 1, "year"), null, !1);
          }
          if (r) {
            var d = new e.$keyboardNavigation.Event(r.id);
            d.isValid() ? (a && a.blur(), e.$keyboardNavigation.dispatcher.setActiveNode(d)) : this.nextEventHandler(r.id)
          }
        },
        prevEventHandler: function(t) {
          var a = e.$keyboardNavigation.dispatcher.activeNode,
            i = t || a && a.eventId,
            r = null;
          if (i && e.getEvent(i)) {
            var n = e.getEvent(i);
            r = e.$keyboardNavigation.SchedulerNode.prototype._pickEvent(e.date.add(n.end_date, -1, "year"), n.end_date, n.id, !0)
          }
          if (!r && !t) {
            var s = e.getState();
            r = e.$keyboardNavigation.SchedulerNode.prototype._pickEvent(e.date.add(s.max_date, -1, "year"), s.max_date, null, !0);
          }
          if (r) {
            var d = new e.$keyboardNavigation.Event(r.id);
            d.isValid() ? (a && a.blur(), e.$keyboardNavigation.dispatcher.setActiveNode(d)) : this.prevEventHandler(r.id)
          }
        },
        keys: {
          "alt+1, alt+2, alt+3, alt+4, alt+5, alt+6, alt+7, alt+8, alt+9": function(t) {
            var a = e.$keyboardNavigation.HeaderCell.prototype.getNodes(".dhx_cal_navline .dhx_cal_tab"),
              i = t.key;
            void 0 === i && (i = t.keyCode - 48), a[1 * i - 1] && a[1 * i - 1].click()
          },
          "ctrl+left,meta+left": function(t) {
            e._click.dhx_cal_prev_button()
          },
          "ctrl+right,meta+right": function(t) {
            e._click.dhx_cal_next_button();
          },
          "ctrl+up,meta+up": function(t) {
            var a = e.$container.querySelector(".dhx_cal_data");
            a.scrollTop -= 20
          },
          "ctrl+down,meta+down": function(t) {
            var a = e.$container.querySelector(".dhx_cal_data");
            a.scrollTop += 20
          },
          e: function() {
            this.nextEventHandler()
          },
          home: function() {
            e.setCurrentView(new Date)
          },
          "shift+e": function() {
            this.prevEventHandler()
          },
          "ctrl+enter,meta+enter": function() {
            e.addEventNow({
              start_date: new Date(e.getState().date)
            })
          },
          "ctrl+c,meta+c": function(t) {
            e._key_nav_copy_paste(t)
          },
          "ctrl+v,meta+v": function(t) {
            e._key_nav_copy_paste(t)
          },
          "ctrl+x,meta+x": function(t) {
            e._key_nav_copy_paste(t)
          }
        }
      }), e.$keyboardNavigation.SchedulerNode.prototype.bindAll(e.$keyboardNavigation.SchedulerNode.prototype.keys), e.$keyboardNavigation.KeyNavNode = function() {}, e.$keyboardNavigation.KeyNavNode.prototype = e._compose(e.$keyboardNavigation.EventHandler, {
        isValid: function() {
          return !0
        },
        fallback: function() {
          return null
        },
        moveTo: function(t) {
          e.$keyboardNavigation.dispatcher.setActiveNode(t)
        },
        compareTo: function(e) {
          if (!e) return !1;
          for (var t in this) {
            if (!!this[t] != !!e[t]) return !1;
            var a = !(!this[t] || !this[t].toString),
              i = !(!e[t] || !e[t].toString);
            if (i != a) return !1;
            if (i && a) {
              if (e[t].toString() != this[t].toString()) return !1
            } else if (e[t] != this[t]) return !1
          }
          return !0
        },
        getNode: function() {},
        focus: function() {
          var e = this.getNode();
          e && (e.setAttribute("tabindex", "-1"), e.focus && e.focus())
        },
        blur: function() {
          var e = this.getNode();
          e && e.setAttribute("tabindex", "-1")
        }
      }), e.$keyboardNavigation.HeaderCell = function(e) {
        this.index = e || 0
      }, e.$keyboardNavigation.HeaderCell.prototype = e._compose(e.$keyboardNavigation.KeyNavNode, {
        getNode: function(e) {
          e = e || this.index || 0;
          var t = this.getNodes();
          return t[e] ? t[e] : void 0
        },
        getNodes: function(t) {
          t = t || [".dhx_cal_navline .dhx_cal_prev_button", ".dhx_cal_navline .dhx_cal_next_button", ".dhx_cal_navline .dhx_cal_today_button", ".dhx_cal_navline .dhx_cal_tab"].join(", ");
          var a = Array.prototype.slice.call(e.$container.querySelectorAll(t));
          return a.sort(function(e, t) {
            return e.offsetLeft - t.offsetLeft
          }), a
        },
        _handlers: null,
        isValid: function() {
          return !!this.getNode(this.index)
        },
        fallback: function() {
          var t = this.getNode(0);
          return t || (t = new e.$keyboardNavigation.TimeSlot), t
        },
        keys: {
          left: function() {
            var t = this.index - 1;
            0 > t && (t = this.getNodes().length - 1), this.moveTo(new e.$keyboardNavigation.HeaderCell(t))
          },
          right: function() {
            var t = this.index + 1;
            t >= this.getNodes().length && (t = 0), this.moveTo(new e.$keyboardNavigation.HeaderCell(t))
          },
          down: function() {
            this.moveTo(new e.$keyboardNavigation.TimeSlot)
          },
          enter: function() {
            var e = this.getNode();
            e && e.click()
          }
        }
      }), e.$keyboardNavigation.HeaderCell.prototype.bindAll(e.$keyboardNavigation.HeaderCell.prototype.keys),
      e.$keyboardNavigation.Event = function(t) {
        if (this.eventId = null, e.getEvent(t)) {
          var a = e.getEvent(t);
          this.start = new Date(a.start_date), this.end = new Date(a.end_date), this.section = this._getSection(a), this.eventId = t
        }
      }, e.$keyboardNavigation.Event.prototype = e._compose(e.$keyboardNavigation.KeyNavNode, {
        _getNodes: function() {
          return Array.prototype.slice.call(e.$container.querySelectorAll("[event_id]"))
        },
        _modes: e.$keyboardNavigation.SchedulerNode.prototype._modes,
        getMode: e.$keyboardNavigation.SchedulerNode.prototype.getMode,
        _handlers: null,
        isValid: function() {
          return !(!e.getEvent(this.eventId) || !this.getNode())
        },
        fallback: function() {
          var t = this._getNodes()[0],
            a = null;
          if (t && e._locate_event(t)) {
            var i = e._locate_event(t);
            a = new e.$keyboardNavigation.Event(i)
          } else a = new e.$keyboardNavigation.TimeSlot;
          return a
        },
        getNode: function() {
          return e.$container.querySelector("[event_id='" + this.eventId + "']")
        },
        focus: function() {
          var t = e.getEvent(this.eventId),
            a = e.getState();
          (t.start_date.valueOf() > a.max_date.valueOf() || t.end_date.valueOf() <= a.min_date.valueOf()) && e.setCurrentView(t.start_date),
            e.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this)
        },
        blur: function() {
          e.$keyboardNavigation.KeyNavNode.prototype.blur.apply(this)
        },
        _getSection: function(t) {
          var a = null,
            i = e.getState().mode;
          if (e.matrix && e.matrix[i]) {
            var r = e.matrix[e.getState().mode];
            a = t[r.y_property]
          } else if (e._props && e._props[i]) {
            var n = e._props[i];
            a = t[n.map_to]
          }
          return a
        },
        _moveToSlot: function(t) {
          var a = e.getEvent(this.eventId);
          if (a) {
            var i = this._getSection(a),
              r = new e.$keyboardNavigation.TimeSlot(a.start_date, null, i);
            this.moveTo(r.nextSlot(r, t));
          } else this.moveTo(new e.$keyboardNavigation.TimeSlot)
        },
        keys: {
          left: function() {
            this._moveToSlot("left")
          },
          right: function() {
            this._moveToSlot("right")
          },
          down: function() {
            this.getMode() == this._modes.list ? e.$keyboardNavigation.SchedulerNode.prototype.nextEventHandler() : this._moveToSlot("down")
          },
          space: function() {
            var t = this.getNode();
            t && t.click ? t.click() : this.moveTo(new e.$keyboardNavigation.TimeSlot)
          },
          up: function() {
            this.getMode() == this._modes.list ? e.$keyboardNavigation.SchedulerNode.prototype.prevEventHandler() : this._moveToSlot("up");
          },
          "delete": function() {
            e.getEvent(this.eventId) ? e._click.buttons["delete"](this.eventId) : this.moveTo(new e.$keyboardNavigation.TimeSlot)
          },
          enter: function() {
            e.getEvent(this.eventId) ? e.showLightbox(this.eventId) : this.moveTo(new e.$keyboardNavigation.TimeSlot)
          }
        }
      }), e.$keyboardNavigation.Event.prototype.bindAll(e.$keyboardNavigation.Event.prototype.keys), e.$keyboardNavigation.TimeSlot = function(t, a, i, r) {
        var n = e.getState(),
          s = e.matrix && e.matrix[n.mode];
        t || (s ? (t = e.date[s.name + "_start"](new Date(n.date)), t = this.findVisibleColumn(t)) : (t = new Date(e.getState().min_date),
          t = this.findVisibleColumn(t), t.setHours(e.config.first_hour))), a || (a = s ? e.date.add(t, s.x_step, s.x_unit) : e.date.add(t, e.config.key_nav_step, "minute")), this.section = i || this._getDefaultSection(), this.start_date = new Date(t), this.end_date = new Date(a), this.movingDate = r || null
      }, e.$keyboardNavigation.TimeSlot.prototype = e._compose(e.$keyboardNavigation.KeyNavNode, {
        _handlers: null,
        clone: function(t) {
          return new e.$keyboardNavigation.TimeSlot(t.start_date, t.end_date, t.section, t.movingDate)
        },
        _getMultisectionView: function() {
          var t, a = e.getState();
          return e._props && e._props[a.mode] ? t = e._props[a.mode] : e.matrix && e.matrix[a.mode] && (t = e.matrix[a.mode]), t
        },
        _getDefaultSection: function() {
          var e = null,
            t = this._getMultisectionView();
          return t && !e && (e = this._getNextSection()), e
        },
        _getNextSection: function(e, t) {
          var a = this._getMultisectionView(),
            i = a.order[e],
            r = i;
          r = void 0 !== i ? i + t : a.size && a.position ? a.position : 0, r = 0 > r ? r = (a.options || a.y_unit).length - 1 : r;
          var n = a.options || a.y_unit;
          return n[r] ? n[r].key : null
        },
        isValid: function() {
          var t = e.getState(),
            a = !(this.start_date.valueOf() < t.min_date.valueOf() || this.start_date.valueOf() >= t.max_date.valueOf());
          if (!a) return !1;
          if (!this.isVisible(this.start_date, this.end_date)) return !1;
          var i = this._getMultisectionView();
          return i ? void 0 !== i.order[this.section] : !0
        },
        fallback: function() {
          var t = new e.$keyboardNavigation.TimeSlot;
          return t.isValid() ? t : new e.$keyboardNavigation.DataArea
        },
        getNodes: function() {
          return Array.prototype.slice.call(e.$container.querySelectorAll(".dhx_focus_slot"))
        },
        getNode: function() {
          return this.getNodes()[0]
        },
        focus: function() {
          e.$keyboardNavigation.marker.render(this.start_date, this.end_date, this.section),
            e.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this), e.$keyboardNavigation._pasteDate = this.start_date, e.$keyboardNavigation._pasteSection = this.section
        },
        blur: function() {
          e.$keyboardNavigation.KeyNavNode.prototype.blur.apply(this), e.$keyboardNavigation.marker.clear()
        },
        _modes: e.$keyboardNavigation.SchedulerNode.prototype._modes,
        _getMode: e.$keyboardNavigation.SchedulerNode.prototype.getMode,
        addMonthDate: function(t, a, i) {
          var r;
          switch (a) {
            case "up":
              r = e.date.add(t, -1, "week");
              break;
            case "down":
              r = e.date.add(t, 1, "week");
              break;
            case "left":
              r = e.date.day_start(e.date.add(t, -1, "day")), r = this.findVisibleColumn(r, -1);
              break;
            case "right":
              r = e.date.day_start(e.date.add(t, 1, "day")), r = this.findVisibleColumn(r, 1);
              break;
            default:
              r = e.date.day_start(new Date(t))
          }
          var n = e.getState();
          return (t.valueOf() < n.min_date.valueOf() || !i && t.valueOf() >= n.max_date.valueOf()) && (r = new Date(n.min_date)), r
        },
        nextMonthSlot: function(t, a, i) {
          var r, n;
          return r = this.addMonthDate(t.start_date, a, i), r.setHours(e.config.first_hour), n = new Date(r), n.setHours(e.config.last_hour), {
            start_date: r,
            end_date: n
          }
        },
        _alignTimeSlot: function(t, a, i, r) {
          for (var n = new Date(a); n.valueOf() < t.valueOf();) n = e.date.add(n, r, i);
          return n.valueOf() > t.valueOf() && (n = e.date.add(n, -r, i)), n
        },
        nextTimelineSlot: function(t, a, i) {
          var r = e.getState(),
            n = e.matrix[r.mode],
            s = this._alignTimeSlot(t.start_date, e.date[n.name + "_start"](new Date(t.start_date)), n.x_unit, n.x_step),
            d = this._alignTimeSlot(t.end_date, e.date[n.name + "_start"](new Date(t.end_date)), n.x_unit, n.x_step);
          d.valueOf() <= s.valueOf() && (d = e.date.add(s, n.x_step, n.x_unit));
          var o = this.clone(t);
          switch (o.start_date = s, o.end_date = d, o.section = t.section || this._getNextSection(), a) {
            case "up":
              o.section = this._getNextSection(t.section, -1);
              break;
            case "down":
              o.section = this._getNextSection(t.section, 1);
              break;
            case "left":
              o.start_date = this.findVisibleColumn(e.date.add(o.start_date, -n.x_step, n.x_unit), -1), o.end_date = e.date.add(o.start_date, n.x_step, n.x_unit);
              break;
            case "right":
              o.start_date = this.findVisibleColumn(e.date.add(o.start_date, n.x_step, n.x_unit), 1), o.end_date = e.date.add(o.start_date, n.x_step, n.x_unit);
          }
          return (o.start_date.valueOf() < r.min_date.valueOf() || o.start_date.valueOf() >= r.max_date.valueOf()) && (i && o.start_date.valueOf() >= r.max_date.valueOf() ? o.start_date = new Date(r.max_date) : (o.start_date = e.date[r.mode + "_start"](e.date.add(r.date, "left" == a ? -1 : 1, r.mode)), o.end_date = e.date.add(o.start_date, n.x_step, n.x_unit))), o
        },
        nextUnitsSlot: function(t, a, i) {
          var r = this.clone(t);
          r.section = t.section || this._getNextSection();
          var n = t.section || this._getNextSection(),
            s = e.getState(),
            d = e._props[s.mode];
          switch (a) {
            case "left":
              n = this._getNextSection(t.section, -1);
              var o = d.size ? d.size - 1 : d.options.length;
              d.days > 1 && d.order[n] == o - 1 && e.date.add(t.start_date, -1, "day").valueOf() >= s.min_date.valueOf() && (r = this.nextDaySlot(t, a, i));
              break;
            case "right":
              n = this._getNextSection(t.section, 1), d.days > 1 && !d.order[n] && e.date.add(t.start_date, 1, "day").valueOf() < s.max_date.valueOf() && (r = this.nextDaySlot(t, a, i));
              break;
            default:
              r = this.nextDaySlot(t, a, i), n = t.section
          }
          return r.section = n, r
        },
        _moveDate: function(t, a) {
          var i = this.findVisibleColumn(e.date.add(t, a, "day"), a);
          return i.setHours(t.getHours()), i.setMinutes(t.getMinutes()), i
        },
        isBeforeLastHour: function(t, a) {
          var i = t.getMinutes(),
            r = t.getHours(),
            n = e.config.last_hour;
          return n > r || !a && (24 == n || r == n) && !i
        },
        isAfterFirstHour: function(t, a) {
          var i = t.getMinutes(),
            r = t.getHours(),
            n = e.config.first_hour,
            s = e.config.last_hour;
          return r >= n || !a && !i && (!r && 24 == s || r == s)
        },
        isInVisibleDayTime: function(e, t) {
          return this.isBeforeLastHour(e, t) && this.isAfterFirstHour(e, t)
        },
        nextDaySlot: function(t, a, i) {
          var r, n, s = e.config.key_nav_step,
            d = this._alignTimeSlot(t.start_date, e.date.day_start(new Date(t.start_date)), "minute", s),
            o = t.start_date;
          switch (a) {
            case "up":
              if (r = e.date.add(d, -s, "minute"), !this.isInVisibleDayTime(r, !0) && (!i || this.isInVisibleDayTime(o, !0))) {
                var l = !0;
                i && e.date.date_part(new Date(r)).valueOf() != e.date.date_part(new Date(o)).valueOf() && (l = !1), l && (r = this.findVisibleColumn(e.date.add(t.start_date, -1, "day"), -1)), r.setHours(e.config.last_hour), r.setMinutes(0), r = e.date.add(r, -s, "minute")
              }
              n = e.date.add(r, s, "minute");
              break;
            case "down":
              r = e.date.add(d, s, "minute");
              var c = i ? r : e.date.add(r, s, "minute");
              if (!this.isInVisibleDayTime(c, !1) && (!i || this.isInVisibleDayTime(o, !1)))
                if (i) {
                  var l = !0;
                  e.date.date_part(new Date(o)).valueOf() == o.valueOf() && (l = !1), l && (r = this.findVisibleColumn(e.date.add(t.start_date, 1, "day"), 1)), r.setHours(e.config.first_hour), r.setMinutes(0), r = e.date.add(r, s, "minute")
                } else r = this.findVisibleColumn(e.date.add(t.start_date, 1, "day"), 1), r.setHours(e.config.first_hour), r.setMinutes(0);
              n = e.date.add(r, s, "minute");
              break;
            case "left":
              r = this._moveDate(t.start_date, -1), n = this._moveDate(t.end_date, -1);
              break;
            case "right":
              r = this._moveDate(t.start_date, 1), n = this._moveDate(t.end_date, 1);
              break;
            default:
              r = d, n = e.date.add(r, s, "minute")
          }
          return {
            start_date: r,
            end_date: n
          }
        },
        nextWeekAgendaSlot: function(t, a) {
          var i, r, n = e.getState();
          switch (a) {
            case "down":
            case "left":
              i = e.date.day_start(e.date.add(t.start_date, -1, "day")), i = this.findVisibleColumn(i, -1);
              break;
            case "up":
            case "right":
              i = e.date.day_start(e.date.add(t.start_date, 1, "day")), i = this.findVisibleColumn(i, 1);
              break;
            default:
              i = e.date.day_start(t.start_date)
          }
          return (t.start_date.valueOf() < n.min_date.valueOf() || t.start_date.valueOf() >= n.max_date.valueOf()) && (i = new Date(n.min_date)),
            r = new Date(i), r.setHours(e.config.last_hour), {
              start_date: i,
              end_date: r
            }
        },
        nextAgendaSlot: function(e, t) {
          return {
            start_date: e.start_date,
            end_date: e.end_date
          }
        },
        isDateVisible: function(t) {
          if (!e._ignores_detected) return !0;
          var a, i = e.matrix && e.matrix[e.getState().mode];
          return a = i ? e._get_date_index(i, t) : e.locate_holder_day(t), !e._ignores[a]
        },
        findVisibleColumn: function(t, a) {
          var i = t;
          a = a || 1;
          for (var r = e.getState(); !this.isDateVisible(i) && (a > 0 && i.valueOf() <= r.max_date.valueOf() || 0 > a && i.valueOf() >= r.min_date.valueOf());) i = this.nextDateColumn(i, a);
          return i
        },
        nextDateColumn: function(t, a) {
          a = a || 1;
          var i, r = e.matrix && e.matrix[e.getState().mode];
          return i = r ? e.date.add(t, a * r.x_step, r.x_unit) : e.date.day_start(e.date.add(t, a, "day"))
        },
        isVisible: function(t, a) {
          if (!e._ignores_detected) return !0;
          for (var i = new Date(t); i.valueOf() < a.valueOf();) {
            if (this.isDateVisible(i)) return !0;
            i = this.nextDateColumn(i)
          }
          return !1
        },
        nextSlot: function(t, a, i, r) {
          var n;
          i = i || this._getMode();
          var s = e.$keyboardNavigation.TimeSlot.prototype.clone(t);
          switch (i) {
            case this._modes.units:
              n = this.nextUnitsSlot(s, a, r);
              break;
            case this._modes.timeline:
              n = this.nextTimelineSlot(s, a, r);
              break;
            case this._modes.year:
              n = this.nextMonthSlot(s, a, r);
              break;
            case this._modes.month:
              n = this.nextMonthSlot(s, a, r);
              break;
            case this._modes.weekAgenda:
              n = this.nextWeekAgendaSlot(s, a, r);
              break;
            case this._modes.list:
              n = this.nextAgendaSlot(s, a, r);
              break;
            case this._modes.dayColumns:
              n = this.nextDaySlot(s, a, r)
          }
          return n.start_date.valueOf() >= n.end_date.valueOf() && (n = this.nextSlot(n, a, i)), e.$keyboardNavigation.TimeSlot.prototype.clone(n)
        },
        extendSlot: function(t, a) {
          var i, r = this._getMode();
          switch (r) {
            case this._modes.units:
              i = "left" == a || "right" == a ? this.nextUnitsSlot(t, a) : this.extendUnitsSlot(t, a);
              break;
            case this._modes.timeline:
              i = "down" == a || "up" == a ? this.nextTimelineSlot(t, a) : this.extendTimelineSlot(t, a);
              break;
            case this._modes.year:
              i = this.extendMonthSlot(t, a);
              break;
            case this._modes.month:
              i = this.extendMonthSlot(t, a);
              break;
            case this._modes.dayColumns:
              i = this.extendDaySlot(t, a);
              break;
            case this._modes.weekAgenda:
              i = this.extendWeekAgendaSlot(t, a);
              break;
            default:
              i = t
          }
          var n = e.getState();
          return i.start_date.valueOf() < n.min_date.valueOf() && (i.start_date = this.findVisibleColumn(n.min_date), i.start_date.setHours(e.config.first_hour)), i.end_date.valueOf() > n.max_date.valueOf() && (i.end_date = this.findVisibleColumn(n.max_date, -1)), e.$keyboardNavigation.TimeSlot.prototype.clone(i)
        },
        extendTimelineSlot: function(e, t) {
          return this.extendGenericSlot({
            left: "start_date",
            right: "end_date"
          }, e, t, "timeline")
        },
        extendWeekAgendaSlot: function(e, t) {
          return this.extendGenericSlot({
            left: "start_date",
            right: "end_date"
          }, e, t, "weekAgenda")
        },
        extendGenericSlot: function(t, a, i, r) {
          var n, s = a.movingDate;
          if (s || (s = t[i]), !s || !t[i]) return a;
          if (!i) return e.$keyboardNavigation.TimeSlot.prototype.clone(a);
          n = this.nextSlot({
            start_date: a[s],
            section: a.section
          }, i, r, !0), n.start_date.valueOf() == a.start_date.valueOf() && (n = this.nextSlot({
            start_date: n.start_date,
            section: n.section
          }, i, r, !0)), n.movingDate = s;
          var d = this.extendSlotDates(a, n, n.movingDate);
          return d.end_date.valueOf() <= d.start_date.valueOf() && (n.movingDate = "end_date" == n.movingDate ? "start_date" : "end_date"),
            d = this.extendSlotDates(a, n, n.movingDate), n.start_date = d.start_date, n.end_date = d.end_date, n
        },
        extendSlotDates: function(e, t, a) {
          var i = {
            start_date: null,
            end_date: null
          };
          return "start_date" == a ? (i.start_date = t.start_date, i.end_date = e.end_date) : (i.start_date = e.start_date, i.end_date = t.start_date), i
        },
        extendMonthSlot: function(t, a) {
          var t = this.extendGenericSlot({
            up: "start_date",
            down: "end_date",
            left: "start_date",
            right: "end_date"
          }, t, a, "month");
          return t.start_date.setHours(e.config.first_hour), t.end_date = e.date.add(t.end_date, -1, "day"),
            t.end_date.setHours(e.config.last_hour), t
        },
        extendUnitsSlot: function(e, t) {
          var a;
          switch (t) {
            case "down":
            case "up":
              a = this.extendDaySlot(e, t);
              break;
            default:
              a = e
          }
          return a.section = e.section, a
        },
        extendDaySlot: function(e, t) {
          return this.extendGenericSlot({
            up: "start_date",
            down: "end_date",
            left: "start_date",
            right: "end_date"
          }, e, t, "dayColumns")
        },
        scrollSlot: function(t) {
          var a = e.getState(),
            i = this.nextSlot(this, t);
          (i.start_date.valueOf() < a.min_date.valueOf() || i.start_date.valueOf() >= a.max_date.valueOf()) && e.setCurrentView(new Date(i.start_date)),
            this.moveTo(i)
        },
        keys: {
          left: function() {
            this.scrollSlot("left")
          },
          right: function() {
            this.scrollSlot("right")
          },
          down: function() {
            var t = this._getMode();
            t == this._modes.list ? e.$keyboardNavigation.SchedulerNode.prototype.nextEventHandler() : this.scrollSlot("down")
          },
          up: function() {
            var t = this._getMode();
            t == this._modes.list ? e.$keyboardNavigation.SchedulerNode.prototype.prevEventHandler() : this.scrollSlot("up")
          },
          "shift+down": function() {
            this.moveTo(this.extendSlot(this, "down"))
          },
          "shift+up": function() {
            this.moveTo(this.extendSlot(this, "up"));
          },
          "shift+right": function() {
            this.moveTo(this.extendSlot(this, "right"))
          },
          "shift+left": function() {
            this.moveTo(this.extendSlot(this, "left"))
          },
          enter: function() {
            var t = {
                start_date: new Date(this.start_date),
                end_date: new Date(this.end_date)
              },
              a = e.getState().mode;
            if (e.matrix && e.matrix[a]) {
              var i = e.matrix[e.getState().mode];
              t[i.y_property] = this.section
            } else if (e._props && e._props[a]) {
              var r = e._props[a];
              t[r.map_to] = this.section
            }
            e.addEventNow(t)
          }
        }
      }), e.$keyboardNavigation.TimeSlot.prototype.bindAll(e.$keyboardNavigation.TimeSlot.prototype.keys),
      e.$keyboardNavigation.MinicalButton = function(e, t) {
        this.container = e, this.index = t || 0
      }, e.$keyboardNavigation.MinicalButton.prototype = e._compose(e.$keyboardNavigation.KeyNavNode, {
        isValid: function() {
          return !0
        },
        focus: function() {
          e.$keyboardNavigation.dispatcher.globalNode.disable(), this.container.removeAttribute("tabindex"), e.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this)
        },
        blur: function() {
          this.container.setAttribute("tabindex", "0"), e.$keyboardNavigation.KeyNavNode.prototype.blur.apply(this)
        },
        getNode: function() {
          return this.index ? this.container.querySelector(".dhx_cal_next_button") : this.container.querySelector(".dhx_cal_prev_button")
        },
        keys: {
          right: function(t) {
            this.moveTo(new e.$keyboardNavigation.MinicalButton(this.container, this.index ? 0 : 1))
          },
          left: function(t) {
            this.moveTo(new e.$keyboardNavigation.MinicalButton(this.container, this.index ? 0 : 1))
          },
          down: function() {
            var t = new e.$keyboardNavigation.MinicalCell(this.container, 0, 0);
            t && !t.isValid() && (t = t.fallback()), this.moveTo(t)
          },
          enter: function(e) {
            this.getNode().click()
          }
        }
      }), e.$keyboardNavigation.MinicalButton.prototype.bindAll(e.$keyboardNavigation.MinicalButton.prototype.keys), e.$keyboardNavigation.MinicalCell = function(e, t, a) {
        this.container = e, this.row = t || 0, this.col = a || 0
      }, e.$keyboardNavigation.MinicalCell.prototype = e._compose(e.$keyboardNavigation.KeyNavNode, {
        isValid: function() {
          var e = this._getGrid();
          return !(!e[this.row] || !e[this.row][this.col])
        },
        fallback: function() {
          var t = this.row,
            a = this.col,
            i = this._getGrid();
          i[t] || (t = 0);
          var r = !0;
          if (t > i.length / 2 && (r = !1),
            r) {
            for (var n = a; n < i[t].length; n++)
              if (i[t][n] || n != i[t].length - 1 || (t++, a = 0), i[t][n]) return new e.$keyboardNavigation.MinicalCell(this.container, t, n)
          } else
            for (var n = a; n < i[t].length; n--)
              if (i[t][n] || n || (t--, a = i[t].length - 1), i[t][n]) return new e.$keyboardNavigation.MinicalCell(this.container, t, n);
          return new e.$keyboardNavigation.MinicalButton(this.container, 0)
        },
        focus: function() {
          e.$keyboardNavigation.dispatcher.globalNode.disable(), this.container.removeAttribute("tabindex"), e.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this);
        },
        blur: function() {
          this.container.setAttribute("tabindex", "0"), e.$keyboardNavigation.KeyNavNode.prototype.blur.apply(this)
        },
        _getNode: function(e, t) {
          return this.container.querySelector(".dhx_year_body tr:nth-child(" + (e + 1) + ") td:nth-child(" + (t + 1) + ")")
        },
        getNode: function() {
          return this._getNode(this.row, this.col)
        },
        _getGrid: function() {
          for (var t = this.container.querySelectorAll(".dhx_year_body tr"), a = [], i = 0; i < t.length; i++) {
            a[i] = [];
            for (var r = t[i], n = r.querySelectorAll("td"), s = 0; s < n.length; s++) {
              var d = n[s],
                o = !0,
                l = e._getClassName(d);
              (l.indexOf("dhx_after") > -1 || l.indexOf("dhx_before") > -1 || l.indexOf("dhx_scale_ignore") > -1) && (o = !1), a[i][s] = o
            }
          }
          return a
        },
        keys: {
          right: function(t) {
            var a = this._getGrid(),
              i = this.row,
              r = this.col + 1;
            a[i] && a[i][r] || (a[i + 1] ? (i += 1, r = 0) : r = this.col);
            var n = new e.$keyboardNavigation.MinicalCell(this.container, i, r);
            n.isValid() || (n = n.fallback()), this.moveTo(n)
          },
          left: function(t) {
            var a = this._getGrid(),
              i = this.row,
              r = this.col - 1;
            a[i] && a[i][r] || (a[i - 1] ? (i -= 1, r = a[i].length - 1) : r = this.col);
            var n = new e.$keyboardNavigation.MinicalCell(this.container, i, r);
            n.isValid() || (n = n.fallback()), this.moveTo(n)
          },
          down: function() {
            var t = this._getGrid(),
              a = this.row + 1,
              i = this.col;
            t[a] && t[a][i] || (a = this.row);
            var r = new e.$keyboardNavigation.MinicalCell(this.container, a, i);
            r.isValid() || (r = r.fallback()), this.moveTo(r)
          },
          up: function() {
            var t = this._getGrid(),
              a = this.row - 1,
              i = this.col;
            if (t[a] && t[a][i]) {
              var r = new e.$keyboardNavigation.MinicalCell(this.container, a, i);
              r.isValid() || (r = r.fallback()), this.moveTo(r)
            } else {
              var n = 0;
              this.col > t[this.row].length / 2 && (n = 1), this.moveTo(new e.$keyboardNavigation.MinicalButton(this.container, n));
            }
          },
          enter: function(e) {
            this.getNode().querySelector(".dhx_month_head").click()
          }
        }
      }), e.$keyboardNavigation.MinicalCell.prototype.bindAll(e.$keyboardNavigation.MinicalCell.prototype.keys), e.$keyboardNavigation.DataArea = function(e) {
        this.index = e || 0
      }, e.$keyboardNavigation.DataArea.prototype = e._compose(e.$keyboardNavigation.KeyNavNode, {
        getNode: function(t) {
          return e.$container.querySelector(".dhx_cal_data")
        },
        _handlers: null,
        isValid: function() {
          return !0
        },
        fallback: function() {
          return this
        },
        keys: {
          "up,down,right,left": function() {
            this.moveTo(new e.$keyboardNavigation.TimeSlot)
          }
        }
      }), e.$keyboardNavigation.DataArea.prototype.bindAll(e.$keyboardNavigation.DataArea.prototype.keys), dhtmlx._modalsStack || (dhtmlx._modalsStack = []),
      function() {
        function t() {
          return !(!l.length && !dhtmlx._modalsStack.length)
        }

        function a(e, t) {
          for (; e && e != t;) e = e.parentNode;
          return !(e != t)
        }

        function i(i) {
          setTimeout(function() {
            t() || a(document.activeElement, e.$container) || e.focus()
          }, 1)
        }

        function r(t) {
          e.eventRemove(t, "keydown", d), e.event(t, "keydown", d), l.push(t)
        }

        function n() {
          var t = l.pop();
          t && e.eventRemove(t, "keydown", d), i(t)
        }

        function s(e) {
          return dhtmlx._modalsStack.length ? e == dhtmlx._modalsStack[dhtmlx._modalsStack.length - 1] : e == l[l.length - 1]
        }

        function d(t) {
          var t = t || window.event,
            a = t.currentTarget;
          s(a) && e.$keyboardNavigation.trapFocus(a, t)
        }

        function o() {
          r(e.getLightbox())
        }
        var l = [];
        if (e.attachEvent("onLightbox", o), e.attachEvent("onAfterLightbox", n), e.attachEvent("onAfterQuickInfo", function() {
            i()
          }), !dhtmlx._keyNavMessagePopup) {
          dhtmlx._keyNavMessagePopup = !0;
          var c = null,
            h = null;
          dhtmlx.attachEvent("onMessagePopup", function(t) {
            for (c = document.activeElement, h = c; h && e._getClassName(h).indexOf("dhx_cal_data") < 0;) h = h.parentNode;
            h && (h = h.parentNode), e.eventRemove(t, "keydown", d), e.event(t, "keydown", d), dhtmlx._modalsStack.push(t)
          }), dhtmlx.attachEvent("onAfterMessagePopup", function() {
            var t = dhtmlx._modalsStack.pop();
            t && e.eventRemove(t, "keydown", d), setTimeout(function() {
              for (var t = document.activeElement; t && e._getClassName(t).indexOf("dhx_cal_light") < 0;) t = t.parentNode;
              t || (c && c.parentNode ? c.focus() : h && h.parentNode && h.focus(),
                c = null, h = null)
            }, 1)
          })
        }
        e.$keyboardNavigation.isModal = t
      }(), e.$keyboardNavigation.dispatcher = {
        isActive: !1,
        activeNode: null,
        globalNode: new e.$keyboardNavigation.SchedulerNode,
        enable: function() {
          this.isActive = !0, this.globalNode.enable(), this.setActiveNode(this.getActiveNode())
        },
        disable: function() {
          this.isActive = !1, this.globalNode.disable()
        },
        isEnabled: function() {
          return !!this.isActive
        },
        getDefaultNode: function() {
          return this.globalNode.getDefaultNode()
        },
        setDefaultNode: function() {
          this.setActiveNode(this.getDefaultNode());
        },
        getActiveNode: function() {
          var e = this.activeNode;
          return e && !e.isValid() && (e = e.fallback()), e
        },
        focusGlobalNode: function() {
          this.blurNode(this.globalNode), this.focusNode(this.globalNode)
        },
        setActiveNode: function(e) {
          e && e.isValid() && (this.activeNode && this.activeNode.compareTo(e) || this.isEnabled() && (this.blurNode(this.activeNode), this.activeNode = e, this.focusNode(this.activeNode)))
        },
        focusNode: function(t) {
          t && t.focus && (t.focus(), t.getNode && document.activeElement != t.getNode() && this.setActiveNode(new e.$keyboardNavigation.DataArea));
        },
        blurNode: function(e) {
          e && e.blur && e.blur()
        },
        keyDownHandler: function(t) {
          var a = this.getActiveNode();
          if ((!e.$keyboardNavigation.isModal() || a && a.container && e._locate_css({
              target: a.container
            }, "dhx_minical_popup", !1)) && this.isEnabled()) {
            t = t || window.event;
            var i = this.globalNode,
              r = e.$keyboardNavigation.shortcuts.getCommandFromEvent(t);
            a ? a.findHandler(r) ? a.doAction(r, t) : i.findHandler(r) && i.doAction(r, t) : this.setDefaultNode()
          }
        }
      }, e._temp_key_scope = function() {
        function t(e) {
          e = e || window.event, s.x = e.clientX, s.y = e.clientY;
        }

        function a() {
          for (var t = !1, a = !1, i = document.elementFromPoint(s.x, s.y); i && i != e._obj;) i = i.parentNode;
          return t = !(i != e._obj), a = e.$keyboardNavigation.dispatcher.isEnabled(), t || a
        }

        function i(e) {
          delete e.rec_type, delete e.rec_pattern, delete e.event_pid, delete e.event_length
        }

        function r() {
          var t = e.$keyboardNavigation.dispatcher.getActiveNode();
          return t && t.eventId ? t.eventId : e._select_id
        }
        e.config.key_nav = !0, e.$keyboardNavigation._pasteDate = null, e.$keyboardNavigation._pasteSection = null;
        var n = null,
          s = {};
        document.body ? dhtmlxEvent(document.body, "mousemove", t) : dhtmlxEvent(window, "load", function() {
          dhtmlxEvent(document.body, "mousemove", t)
        }), e.attachEvent("onMouseMove", function(t, a) {
          var i = e.getState();
          if (i.mode && i.min_date) {
            var r = e.getActionData(a);
            e.$keyboardNavigation._pasteDate = r.date, e.$keyboardNavigation._pasteSection = r.section
          }
        }), e._make_pasted_event = function(t) {
          var a = e.$keyboardNavigation._pasteDate,
            r = e.$keyboardNavigation._pasteSection,
            n = t.end_date - t.start_date,
            s = e._lame_copy({}, t);
          if (i(s), s.start_date = new Date(a), s.end_date = new Date(s.start_date.valueOf() + n), r) {
            var d = e._get_section_property();
            e.config.multisection ? s[d] = t[d] : s[d] = r
          }
          return s
        }, e._do_paste = function(t, a, i) {
          e.addEvent(a), e.callEvent("onEventPasted", [t, a, i])
        }, e._is_key_nav_active = function() {
          return this._is_initialized() && !this._is_lightbox_open() && this.config.key_nav ? !0 : !1
        }, e._key_nav_copy_paste = function(t) {
          if (!e._is_key_nav_active()) return !0;
          if (t = t || event, 37 == t.keyCode || 39 == t.keyCode) {
            t.cancelBubble = !0;
            var i = e.date.add(e._date, 37 == t.keyCode ? -1 : 1, e._mode);
            return e.setCurrentView(i), !0
          }
          var s = r();
          if ((t.ctrlKey || t.metaKey) && 67 == t.keyCode) return s && (e._buffer_id = s,
            n = !0, e.callEvent("onEventCopied", [e.getEvent(s)])), !0;
          if ((t.ctrlKey || t.metaKey) && 88 == t.keyCode && s) {
            n = !1, e._buffer_id = s;
            var d = e.getEvent(s);
            e.updateEvent(d.id), e.callEvent("onEventCut", [d])
          }
          if ((t.ctrlKey || t.metaKey) && 86 == t.keyCode && a(t)) {
            var d = e.getEvent(e._buffer_id);
            if (d) {
              var o = e._make_pasted_event(d);
              if (n) o.id = e.uid(), e._do_paste(n, o, d);
              else {
                var l = e.callEvent("onBeforeEventChanged", [o, t, !1, d]);
                l && (e._do_paste(n, o, d), n = !0)
              }
            }
            return !0
          }
        }
      }, e._temp_key_scope(),
      function() {
        function t(e) {
          clearTimeout(_),
            _ = setTimeout(e, 1)
        }

        function a(t) {
          if (e.config.key_nav && l.isEnabled()) {
            var a = t,
              i = new e.$keyboardNavigation.Event(a.eventId);
            if (!i.isValid()) {
              var r = i.start || a.start,
                n = i.end || a.end,
                s = i.section || a.section;
              i = new e.$keyboardNavigation.TimeSlot(r, n, s), i.isValid() || (i = new e.$keyboardNavigation.TimeSlot)
            }
            l.setActiveNode(i);
            var d = l.getActiveNode();
            d && d.getNode && document.activeElement != d.getNode() && l.focusNode(l.getActiveNode())
          }
        }

        function i(e, t) {
          for (; e && e != t;) e = e.parentNode;
          return !(e != t)
        }

        function r(e) {
          for (var t = 0; t < v.length; t++)
            if (i(e, v[t])) return !0;
          return !1
        }

        function n(t) {
          var a = t.target;
          l.enable(), l.setActiveNode(new e.$keyboardNavigation.MinicalButton(a, 0))
        }

        function s(a) {
          var i = a.target || a.srcElement,
            r = e._locate_css(a, "dhx_cal_prev_button", !1),
            n = e._locate_css(a, "dhx_cal_next_button", !1),
            s = e._locate_css(a, "dhx_year_body", !1),
            d = 0,
            o = 0;
          if (s) {
            for (var c, h, _ = i; _ && "td" != _.tagName.toLowerCase();) _ = _.parentNode;
            if (_ && (h = _, c = h.parentNode), c && h) {
              for (var u = c.parentNode.querySelectorAll("tr"), v = 0; v < u.length; v++)
                if (u[v] == c) {
                  d = v;
                  break
                }
              for (var g = c.querySelectorAll("td"), v = 0; v < g.length; v++)
                if (g[v] == h) {
                  o = v;
                  break
                }
            }
          }
          var f = a.currentTarget;
          t(function() {
            (r || n || s) && (l.enable(), l.activeNode = null), r ? l.setActiveNode(new e.$keyboardNavigation.MinicalButton(f, 0)) : n ? l.setActiveNode(new e.$keyboardNavigation.MinicalButton(f, 1)) : s && l.setActiveNode(new e.$keyboardNavigation.MinicalCell(f, d, o))
          })
        }

        function d() {
          if (e.config.key_nav) {
            var t, a = document.activeElement;
            return t = !a || e._locate_css(a, "dhx_cal_quick_info", !1) ? !1 : i(a, e.$container) || r(a)
          }
        }

        function o(e) {
          e && !l.isEnabled() ? l.enable() : !e && l.isEnabled() && l.disable();
        }
        var l = e.$keyboardNavigation.dispatcher,
          c = function(t) {
            return e.config.key_nav && !e._edit_id ? l.keyDownHandler(t) : void 0
          },
          h = function() {
            l.focusGlobalNode()
          };
        e.attachEvent("onDataRender", function() {
          if (e.config.key_nav && l.isEnabled() && !e.getState().editor_id) {
            var t = l.getActiveNode();
            if (t instanceof e.$keyboardNavigation.MinicalButton || t instanceof e.$keyboardNavigation.MinicalCell) return;
            t.isValid() ? l.focusNode(t) : l.setActiveNode(t.fallback()), l.focusNode(l.getActiveNode())
          }
        }), e.attachEvent("onSchedulerReady", function() {
          var t = e.$container;
          e.eventRemove(document, "keydown", c), e.eventRemove(t, "focus", h), e.config.key_nav ? (e.event(document, "keydown", c), e.event(t, "focus", h), t.setAttribute("tabindex", "0")) : t.removeAttribute("tabindex")
        });
        var _ = null;
        e.attachEvent("onEventAdded", function(i, r) {
          if (!e.config.key_nav) return !0;
          if (l.isEnabled()) {
            var n = new e.$keyboardNavigation.Event(i);
            t(function() {
              a(n)
            })
          }
        });
        var u = e.updateEvent;
        e.updateEvent = function(i) {
          var r = !1,
            n = document.activeElement;
          n && e._getClassName(n).indexOf("dhx_cal_editor") > -1 && (r = !0);
          var s = u.apply(this, arguments);
          if (e.config.key_nav && l.isEnabled()) {
            var d = l.getActiveNode();
            if (d.eventId == i || r) {
              var o = new e.$keyboardNavigation.Event(i);
              r ? (l.disable(), t(function() {
                l.enable(), a(o)
              })) : a(o)
            }
          }
          return s
        }, e.attachEvent("onEventDeleted", function(t) {
          if (!e.config.key_nav) return !0;
          if (l.isEnabled()) {
            var a = l.getActiveNode();
            a.eventId == t && l.setActiveNode(new e.$keyboardNavigation.TimeSlot)
          }
          return !0
        }), e.attachEvent("onClearAll", function() {
          return e.config.key_nav ? void(l.isEnabled() && l.getActiveNode() instanceof e.$keyboardNavigation.Event && l.setActiveNode(new e.$keyboardNavigation.TimeSlot)) : !0;
        }), e.attachEvent("onClick", function(i) {
          if (!e.config.key_nav) return !0;
          var r = new e.$keyboardNavigation.Event(i);
          return t(function() {
            e.getEvent(i) && (l.enable(), a(r))
          }), !0
        }), e.attachEvent("onEmptyClick", function(t, a) {
          if (!e.config.key_nav) return !0;
          if (l.isEnabled() || l.enable(), l.isEnabled()) {
            var i = e.getActionData(a);
            if (i.date) {
              var r = e.$keyboardNavigation.TimeSlot;
              l.setActiveNode(r.prototype.nextSlot(new r(i.date, null, i.section)))
            }
          }
        });
        var v = [],
          g = e.renderCalendar;
        e.renderCalendar = function() {
          var t = g.apply(this, arguments);
          t._key_nav_click || (t._key_nav_click = !0, e.event(t, "click", s)), t._key_nav_focus || (t._key_nav_focus = !0, e.event(t, "focus", n));
          for (var a = !1, i = 0; i < v.length; i++)
            if (v[i] == t) {
              a = !0;
              break
            }
          if (a || v.push(t), l.isEnabled()) {
            var r = l.getActiveNode();
            r.container == t ? l.focusNode(r) : t.setAttribute("tabindex", "0")
          } else t.setAttribute("tabindex", "0");
          return t
        };
        var f = e.destroyCalendar;
        e.destroyCalendar = function(t) {
          for (var a = 0; a < v.length; a++) v[a] == t && (e.eventRemove(v[a], "focus", n), v[a].splice(a, 1), a--);
          return f.apply(this, arguments);
        }, setInterval(function() {
          var t = d();
          t ? o(t) : !t && l.isEnabled() && setTimeout(function() {
            e.config.key_nav ? o(d()) : e.$container.removeAttribute("tabindex")
          }, 20)
        }, 500)
      }()
  }
  window.Scheduler ? window.Scheduler.plugin(e) : e(window.scheduler)
}();
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_key_nav.js.map
