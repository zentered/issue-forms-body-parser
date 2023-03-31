'use strict'

import { parse, isMatch } from 'date-fns'
import { zonedTimeToUtc, formatInTimeZone } from 'date-fns-tz'

const loc = 'UTC'
const commonTimeFormats = [
  'HH:mm',
  'HH.mm',
  'hh:mm aaa',
  'hh:mm a..aa',
  'hh:mm aaaa'
]

export default function parseTime(text) {
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
