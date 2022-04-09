'use strict'

export default function parseDuration(text) {
  let matched = false
  const duration = {
    hours: 0,
    minutes: 0
  }

  const hoursAndMinutes = new RegExp(/([0-9]+)h([0-9]+)m/)
  const hours = new RegExp(/([0-9]+)h/)

  if (text.match(hoursAndMinutes)) {
    matched = true
    const [, h, m] = text.match(hoursAndMinutes)
    duration.hours = parseInt(h)
    duration.minutes = parseInt(m)
  } else if (text.match(hours)) {
    matched = true
    const [, h] = text.match(hours)
    duration.hours = parseInt(h)
    duration.minutes = 0
  }

  if (matched) {
    return duration
  } else {
    return null
  }
}
