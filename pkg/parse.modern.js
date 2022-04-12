import t from '@actions/github'
import e from '@actions/core'
import { unified as n } from 'unified'
import i from 'remark-parse'
import o from 'remark-gfm'
import r from '@sindresorhus/slugify'
import s from 'remark-stringify'
import a from 'strip-final-newline'
import { isMatch as l, parse as c } from 'date-fns'
import { zonedTimeToUtc as d, formatInTimeZone as m } from 'date-fns-tz/esm'
const u = [
    'yyyy-MM-dd',
    'dd/MM/yyyy',
    'dd/MM/yy',
    'dd-MM-yyyy',
    'dd-MM-yy',
    'dd.MM.yyyy',
    'dd.MM.yy'
  ],
  f = ['HH:mm', 'HH.mm', 'hh:mm a', 'hh:mm A'],
  p = function (t) {
    const e = u.map((e) => l(t, e))
    return e.indexOf(!0) > -1
      ? d(c(t, u[e.indexOf(!0)], new Date()), 'UTC')
          .toJSON()
          .split('T')[0]
      : null
  },
  y = function (t) {
    const e = f.map((e) => l(t, e))
    if (e.indexOf(!0) > -1) {
      const n = d(c(t, f[e.indexOf(!0)], new Date()), 'UTC')
      return m(n, 'UTC', 'HH:mm')
    }
    return null
  },
  h = function (t) {
    let e = !1
    const n = { hours: 0, minutes: 0 },
      i = new RegExp(/([0-9]+)h([0-9]+)m/),
      o = new RegExp(/([0-9]+)h/)
    if (t.match(i)) {
      e = !0
      const [, o, r] = t.match(i)
      ;(n.hours = parseInt(o)), (n.minutes = parseInt(r))
    } else if (t.match(o)) {
      e = !0
      const [, i] = t.match(o)
      ;(n.hours = parseInt(i)), (n.minutes = 0)
    }
    return e ? n : null
  },
  g = function t(e) {
    return e.children
      .map((n) => {
        const i = {}
        return 'list' === n.type
          ? t(e)
          : 'listItem' === n.type
          ? ((i.checked = n.checked),
            n.children
              .map((t) => {
                if ('paragraph' === t.type)
                  return (
                    (i.text = t.children
                      .map((t) =>
                        'link' === t.type ? t.children[0].value : t.value
                      )
                      .filter((t) => !!t)
                      .join('')),
                    i
                  )
              })
              .filter((t) => !!t))
          : void 0
      })
      .filter((t) => !!t)
  }
!(async function () {
  e.info('Parsing issue body ...')
  try {
    const l = await (async function (t) {
      const e = await n().use(i).use(o).parse(t)
      if (!e) return []
      const l = {}
      let c = null
      for (const t of e.children) {
        const e = await n().use(o).use(s).stringify(t),
          i = a(e)
        if ('heading' === t.type && 3 === t.depth)
          (c = r(t.children[0].value)),
            (l[c] = { title: t.children[0].value, content: [] })
        else if ('paragraph' === t.type && c) {
          const t = l[c],
            e = p(i),
            n = y(i),
            o = h(i)
          e && (t.date = e),
            n && (t.time = n),
            o && (t.duration = o),
            t.content.push(i)
        } else if ('list' === t.type) {
          const e = l[c]
          ;(e.text = i), (e.list = g(t).flat())
        } else if ('html' === t.type) l[c].content.push(t.html)
        else if ('code' === t.type) {
          const e = l[c]
          ;(e.lang = t.lang), (e.text = i)
        } else
          'heading' === t.type && t.depth > 3
            ? l[c].content.push(t.children[0].value)
            : (console.log('unhandled token type'), console.log(t))
      }
      for (const t in l) {
        const e = l[t],
          n = e.content.filter(Boolean)
        n &&
          n.length > 0 &&
          (1 === n.length && (e.text = n[0]), (e.text = n.join('\n\n'))),
          (e.content = n)
      }
      return l
    })(t.context.payload.issue.body)
    void 0 !== l
      ? e.setOutput('data', l)
      : e.setFailed('There was no valid payload found in the issue.')
  } catch (t) {
    e.setFailed(t)
  }
})()
//# sourceMappingURL=parse.modern.js.map
