'use strict'

import { parse, isMatch } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz/esm'

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

export default function parseDate(text) {
  const match = commonDateFormats.map((format) => {
    return isMatch(text, format)
  })
  if (match.indexOf(true) > -1) {
    const date = zonedTimeToUtc(
      parse(text, commonDateFormats[match.indexOf(true)], new Date()),
      loc
    ).toJSON()
    return date.split('T')[0]
  } else {
    return null
  }
}
