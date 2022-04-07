export default function parseDuration(text) {
  const duration = {
    hours: 0,
    minutes: 0
  }

  const pieces = text.replace('m', '').split('h')
  duration.hours = parseInt(pieces[0]) ? parseInt(pieces[0]) : 0
  duration.minutes = parseInt(pieces[1]) ? parseInt(pieces[1]) : 0
  return duration
}
