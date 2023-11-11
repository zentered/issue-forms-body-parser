'use strict'

export default function parseImage(props) {
  return props
    .filter((p) => p.type === 'image')
    .map((p) => {
      return {
        src: p.url,
        alt: p.alt
      }
    })
}
