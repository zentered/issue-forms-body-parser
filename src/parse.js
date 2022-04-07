'use strict'

import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import slugify from '@sindresorhus/slugify'
import remarkStringify from 'remark-stringify'
import stripFinalNewline from 'strip-final-newline'
import {
  parseDate,
  parseTime,
  parseDuration,
  parseList
} from './parsers/index.js'

export default async function parseMD(body) {
  const tokens = await unified().use(remarkParse).use(remarkGfm).parse(body)
  if (!tokens) {
    return []
  }

  const r = {}
  let counter = 0
  for (let idx = 0; idx < tokens.children.length; idx = idx + 2) {
    const current = tokens.children[idx]
    const hasNext = idx + 1 < tokens.children.length

    if (current.type === 'heading') {
      const key = slugify(current.children[0].value)

      // issue-form answers start with a h3 heading, ignore everything else for now
      const obj = {
        title: current.children[0].value,
        order: counter++
      }

      if (hasNext) {
        const next = tokens.children[idx + 1]
        if (next.type === 'list') {
          obj.list = parseList(next).flat()
        }
        const text = await unified()
          .use(remarkGfm)
          .use(remarkStringify)
          .stringify(next)
        obj.text = stripFinalNewline(text)

        const date = parseDate(obj.text)
        const time = parseTime(obj.text)

        if (date) {
          obj.date = date
        }

        if (time) {
          obj.time = time
        }

        if (key === 'duration') {
          obj.duration = parseDuration(obj.text)
        }

        r[key] = obj
      }
    }
  }

  return r
}
