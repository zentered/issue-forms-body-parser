'use strict'

export default function parseLinks(props) {
  return props
    .filter((p) => p.type === 'link')
    .map((p) => {
      return {
        src: p.url,
        alt: p.children[0].value
      }
    })
}
