'use strict'

export default function parseList(list) {
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
                    listItem.link = c.url
                    return `[${c.children[0].value}](${c.url})`
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
