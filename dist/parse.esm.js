import t from '@actions/github'
import n from '@actions/core'
import { unified as e } from 'unified'
import r from 'remark-parse'
import i from 'remark-gfm'
import o from '@sindresorhus/slugify'
import u from 'remark-stringify'
import a from 'strip-final-newline'
import { isMatch as f, parse as c } from 'date-fns'
import { zonedTimeToUtc as h, formatInTimeZone as s } from 'date-fns-tz/esm'
function l(t, n) {
  ;(null == n || n > t.length) && (n = t.length)
  for (var e = 0, r = new Array(n); e < n; e++) r[e] = t[e]
  return r
}
var d = [
    'yyyy-MM-dd',
    'dd/MM/yyyy',
    'dd/MM/yy',
    'dd-MM-yyyy',
    'dd-MM-yy',
    'dd.MM.yyyy',
    'dd.MM.yy'
  ],
  m = ['HH:mm', 'HH.mm', 'hh:mm a', 'hh:mm A'],
  y = function t(n) {
    return n.children
      .map(function (e) {
        var r = {}
        return 'list' === e.type
          ? t(n)
          : 'listItem' === e.type
          ? ((r.checked = e.checked),
            e.children
              .map(function (t) {
                if ('paragraph' === t.type)
                  return (
                    (r.text = t.children
                      .map(function (t) {
                        return 'link' === t.type ? t.children[0].value : t.value
                      })
                      .filter(function (t) {
                        return !!t
                      })
                      .join('')),
                    r
                  )
              })
              .filter(function (t) {
                return !!t
              }))
          : void 0
      })
      .filter(function (t) {
        return !!t
      })
  }
function v(t, n, e) {
  if (!t.s) {
    if (e instanceof p) {
      if (!e.s) return void (e.o = v.bind(null, t, n))
      1 & n && (n = e.s), (e = e.v)
    }
    if (e && e.then) return void e.then(v.bind(null, t, n), v.bind(null, t, 2))
    ;(t.s = n), (t.v = e)
    var r = t.o
    r && r(t)
  }
}
const p = /*#__PURE__*/ (function () {
  function t() {}
  return (
    (t.prototype.then = function (n, e) {
      const r = new t(),
        i = this.s
      if (i) {
        const t = 1 & i ? n : e
        if (t) {
          try {
            v(r, 1, t(this.v))
          } catch (t) {
            v(r, 2, t)
          }
          return r
        }
        return this
      }
      return (
        (this.o = function (t) {
          try {
            const i = t.v
            1 & t.s ? v(r, 1, n ? n(i) : i) : e ? v(r, 1, e(i)) : v(r, 2, i)
          } catch (t) {
            v(r, 2, t)
          }
        }),
        r
      )
    }),
    t
  )
})()
function g(t) {
  return t instanceof p && 1 & t.s
}
!(function () {
  try {
    n.info('Parsing issue body ...')
    var b = (function (b, M) {
      try {
        var x = Promise.resolve(
          (function (t) {
            try {
              var n, b, M, x, w, k, O, j, A, I, P, H, S
              return Promise.resolve(e().use(r).use(i).parse(t)).then(function (
                t
              ) {
                function r() {
                  for (P in T)
                    (S = (H = T[P]).content.filter(Boolean)) &&
                      S.length > 0 &&
                      (1 === S.length && (H.text = S[0]),
                      (H.text = S.join('\n\n'))),
                      (H.content = S)
                  return T
                }
                if (!t) return []
                var T = {},
                  C = null
                n = (function (t, n) {
                  var e =
                    ('undefined' != typeof Symbol && t[Symbol.iterator]) ||
                    t['@@iterator']
                  if (e) return (e = e.call(t)).next.bind(e)
                  if (
                    Array.isArray(t) ||
                    (e = (function (t, n) {
                      if (t) {
                        if ('string' == typeof t) return l(t, n)
                        var e = Object.prototype.toString.call(t).slice(8, -1)
                        return (
                          'Object' === e &&
                            t.constructor &&
                            (e = t.constructor.name),
                          'Map' === e || 'Set' === e
                            ? Array.from(t)
                            : 'Arguments' === e ||
                              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)
                            ? l(t, n)
                            : void 0
                        )
                      }
                    })(t))
                  ) {
                    e && (t = e)
                    var r = 0
                    return function () {
                      return r >= t.length
                        ? { done: !0 }
                        : { done: !1, value: t[r++] }
                    }
                  }
                  throw new TypeError(
                    'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
                  )
                })(t.children)
                var U = (function (t, n, e) {
                  for (var r; ; ) {
                    var i = t()
                    if ((g(i) && (i = i.v), !i)) return o
                    if (i.then) {
                      r = 0
                      break
                    }
                    var o = e()
                    if (o && o.then) {
                      if (!g(o)) {
                        r = 1
                        break
                      }
                      o = o.s
                    }
                  }
                  var u = new p(),
                    a = v.bind(null, u, 2)
                  return (
                    (0 === r
                      ? i.then(c)
                      : 1 === r
                      ? o.then(f)
                      : (void 0).then(function () {
                          ;(i = t())
                            ? i.then
                              ? i.then(c).then(void 0, a)
                              : c(i)
                            : v(u, 1, o)
                        })
                    ).then(void 0, a),
                    u
                  )
                  function f(n) {
                    o = n
                    do {
                      if (!(i = t()) || (g(i) && !i.v)) return void v(u, 1, o)
                      if (i.then) return void i.then(c).then(void 0, a)
                      g((o = e())) && (o = o.v)
                    } while (!o || !o.then)
                    o.then(f).then(void 0, a)
                  }
                  function c(t) {
                    t
                      ? (o = e()) && o.then
                        ? o.then(f).then(void 0, a)
                        : f(o)
                      : v(u, 1, o)
                  }
                })(
                  function () {
                    return !(b = n()).done
                  },
                  0,
                  function () {
                    return (
                      (M = b.value),
                      Promise.resolve(e().use(i).use(u).stringify(M)).then(
                        function (t) {
                          var n, e
                          ;(x = a(t)),
                            'heading' === M.type && 3 === M.depth
                              ? ((C = o(M.children[0].value)),
                                (T[C] = {
                                  title: M.children[0].value,
                                  content: []
                                }))
                              : 'paragraph' === M.type && C
                              ? ((w = T[C]),
                                (n = x),
                                (e = d.map(function (t) {
                                  return f(n, t)
                                })),
                                (k =
                                  e.indexOf(!0) > -1
                                    ? h(
                                        c(n, d[e.indexOf(!0)], new Date()),
                                        'UTC'
                                      )
                                        .toJSON()
                                        .split('T')[0]
                                    : null),
                                (O = (function (t) {
                                  var n = m.map(function (n) {
                                    return f(t, n)
                                  })
                                  if (n.indexOf(!0) > -1) {
                                    var e = h(
                                      c(t, m[n.indexOf(!0)], new Date()),
                                      'UTC'
                                    )
                                    return s(e, 'UTC', 'HH:mm')
                                  }
                                  return null
                                })(x)),
                                (j = (function (t) {
                                  var n = !1,
                                    e = { hours: 0, minutes: 0 },
                                    r = new RegExp(/([0-9]+)h([0-9]+)m/),
                                    i = new RegExp(/([0-9]+)h/)
                                  if (t.match(r)) {
                                    n = !0
                                    var o = t.match(r),
                                      u = o[2]
                                    ;(e.hours = parseInt(o[1])),
                                      (e.minutes = parseInt(u))
                                  } else if (t.match(i)) {
                                    n = !0
                                    var a = t.match(i)
                                    ;(e.hours = parseInt(a[1])), (e.minutes = 0)
                                  }
                                  return n ? e : null
                                })(x)),
                                k && (w.date = k),
                                O && (w.time = O),
                                j && (w.duration = j),
                                w.content.push(x))
                              : 'list' === M.type
                              ? (((A = T[C]).text = x), (A.list = y(M).flat()))
                              : 'html' === M.type
                              ? T[C].content.push(M.html)
                              : 'code' === M.type
                              ? (((I = T[C]).lang = M.lang), (I.text = x))
                              : 'heading' === M.type && M.depth > 3
                              ? T[C].content.push(M.children[0].value)
                              : (console.log('unhandled token type'),
                                console.log(M))
                        }
                      )
                    )
                  }
                )
                return U && U.then ? U.then(r) : r()
              })
            } catch (t) {
              return Promise.reject(t)
            }
          })(t.context.payload.issue.body)
        ).then(function (t) {
          void 0 !== t
            ? n.setOutput('data', t)
            : n.setFailed('There was no valid payload found in the issue.')
        })
      } catch (t) {
        return M(t)
      }
      return x && x.then ? x.then(void 0, M) : x
    })(0, function (t) {
      n.setFailed(t)
    })
    Promise.resolve(b && b.then ? b.then(function () {}) : void 0)
  } catch (t) {
    return Promise.reject(t)
  }
})()
//# sourceMappingURL=parse.esm.js.map
