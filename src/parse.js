'use strict'

import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import slugify from '@sindresorhus/slugify'
import remarkStringify from 'remark-stringify'
import { parse, isMatch } from 'date-fns'
// if the system time is not UTC, we need to convert it to UTC
import { zonedTimeToUtc, formatInTimeZone } from 'date-fns-tz/esm'
const loc = 'UTC'

const commonDateFormats = [
  'yyyy-MM-dd',
  'dd/MM/yyyy',
  'dd/MM/yy',
  'dd-MM-yyyy',
  'dd-MM-yy',
  'dd.MM.yyyy',
  'dd.MM.yy'
]

const commonTimeFormats = ['HH:mm', 'hh:mm a', 'hh:mm A']

function parseDate(text) {
  const match = commonDateFormats.map((format) => {
    return isMatch(text, format)
  })
  if (match.indexOf(true) > -1) {
    return zonedTimeToUtc(
      parse(text, commonDateFormats[match.indexOf(true)], new Date()),
      loc
    ).toJSON()
  } else {
    return null
  }
}

function parseTime(text) {
  const match = commonTimeFormats.map((format) => {
    return isMatch(text, format)
  })
  if (match.indexOf(true) > -1) {
    const time = zonedTimeToUtc(
      parse(text, commonTimeFormats[match.indexOf(true)], new Date()),
      loc
    )
    return formatInTimeZone(time, loc, 'HH:mm')
  } else {
    return null
  }
}

function parseList(list) {
  return list.children
    .map((item) => {
      const listItem = {}
      if (item.type === 'list') {
        return parseList(list)
      } else if (item.type === 'listItem') {
        listItem.checked = item.checked
        return item.children
          .map((child) => {
            if (child.type === 'paragraph') {
              listItem.text = child.children
                .map((c) => {
                  if (c.type === 'link') {
                    return c.children[0].value
                  } else {
                    return c.value
                  }
                })
                .filter((x) => !!x)
                .join('')
              return listItem
            }
          })
          .filter((x) => !!x)
      }
    })
    .filter((x) => !!x)
}

export default async function parseMD(body) {
  const tokens = await unified().use(remarkParse).use(remarkGfm).parse(body)
  if (!tokens) {
    return []
  }

  const r = []
  for (let idx = 0; idx < tokens.children.length; idx = idx + 2) {
    const current = tokens.children[idx]
    const hasNext = idx + 1 < tokens.children.length

    if (current.type === 'heading') {
      // issue-form answers start with a h3 heading, ignore everything else
      const obj = {
        id: slugify(current.children[0].value),
        title: current.children[0].value
      }
      if (hasNext) {
        const next = tokens.children[idx + 1]
        if (next.type === 'list') {
          obj.list = parseList(next).flat()
        }
        obj.text = await unified()
          .use(remarkGfm)
          .use(remarkStringify)
          .stringify(next)
        const date = parseDate(obj.text)
        const time = parseTime(obj.text)
        if (date) {
          obj.date = date
        }
        if (time) {
          obj.time = time
        }
      }
      r.push(obj)
    }
  }

  return r
}
