'use strict'

import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import slugify from '@sindresorhus/slugify'
import remarkStringify from 'remark-stringify'
import stripFinalNewline from 'strip-final-newline'
import createDebug from 'debug'
const debug = createDebug('body-parser')

import {
  parseDate,
  parseTime,
  parseDuration,
  parseList,
  parseImages,
  parseLinks
} from './parsers/index.js'

export default async function parseMD(body) {
  debug('parseMD()')
  const tokens = await unified().use(remarkParse).use(remarkGfm).parse(body)
  if (!tokens) {
    return []
  }

  const structuredResponse = {}
  let currentHeading = null

  for (const token of tokens.children) {
    const text = await unified()
      .use(remarkGfm)
      .use(remarkStringify)
      .stringify(token)
    let cleanText = stripFinalNewline(text)

    // remove `\\_`
    if (cleanText.indexOf('\\_') > -1) {
      cleanText = cleanText.replace(/\\_/g, '_')
    }

    // issue forms uses h3 as a heading
    if (token.type === 'heading') {
      currentHeading = slugify(token.children[0].value)
      structuredResponse[currentHeading] = {
        title: token.children[0].value,
        heading: token.depth,
        content: []
      }
    } else if (token.type === 'paragraph' && currentHeading) {
      const obj = structuredResponse[currentHeading]

      const date = parseDate(cleanText)
      const images = parseImages(token.children)
      const links = parseLinks(token.children)
      const time = parseTime(cleanText)
      const duration = parseDuration(cleanText)

      if (date) {
        obj.date = date
      }

      if (time) {
        obj.time = time
      }

      if (duration) {
        obj.duration = duration
      }

      if (links && links.length > 0) {
        obj.links = links
      }

      if (images && images.length > 0) {
        obj.images = images
      }

      obj.content.push(cleanText)
    } else if (token.type === 'list') {
      const obj = structuredResponse[currentHeading]
      obj.text = cleanText
      obj.list = parseList(token).flat()
    } else if (token.type === 'html') {
      const obj = structuredResponse[currentHeading]
      obj.content.push(token.html)
    } else if (token.type === 'code') {
      const obj = structuredResponse[currentHeading]
      obj.lang = token.lang
      obj.text = cleanText
    } else {
      debug('unhandled token type')
      debug(token)
    }
  }

  for (const key in structuredResponse) {
    const token = structuredResponse[key]
    const content = token.content.filter(Boolean)
    if (content && content.length > 0) {
      if (content.length === 1) {
        token.text = content[0]
      }
      token.text = content.join('\n\n')
    }
    token.content = content
  }

  return structuredResponse
}
