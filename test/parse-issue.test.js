'use strict'

import t from 'tap'
import fn from '../src/parse.js'
import { readFile } from 'fs/promises'
import { join } from 'path'

const test = t.test

test('parse(md) should parse GitHub Issue Form data into useful, structured data', async (t) => {
  const expected = {
    'event-description': {
      title: 'Event Description',
      content: [
        'Welcome to the CDC - Cyprus Developer Community! Join us for our monthly Larnaka\nmeet & greet event. Meet likeminded people, discuss topics we would like to hear\nabout in upcoming talks, welcome potential speakers, discuss all things tech and\nhave fun!',
        'Notice with regards to COVID:',
        'All attendees must follow measures in accordance with Ministry of Health\ndirectives. <https://www.pio.gov.cy/coronavirus/eng>'
      ],
      text: 'Welcome to the CDC - Cyprus Developer Community! Join us for our monthly Larnaka\nmeet & greet event. Meet likeminded people, discuss topics we would like to hear\nabout in upcoming talks, welcome potential speakers, discuss all things tech and\nhave fun!\n\nNotice with regards to COVID:\n\nAll attendees must follow measures in accordance with Ministry of Health\ndirectives. <https://www.pio.gov.cy/coronavirus/eng>'
    },
    location: {
      title: 'Location',
      content: [
        '[Cafe Nero Finikoudes, Larnaka](https://goo.gl/maps/Bzjxdeat3BSdsUSVA)'
      ],
      text: '[Cafe Nero Finikoudes, Larnaka](https://goo.gl/maps/Bzjxdeat3BSdsUSVA)'
    },
    date: {
      title: 'Date',
      content: ['11.03.2022'],
      date: '2022-03-11',
      text: '11.03.2022'
    },
    time: { title: 'Time', content: ['16:00'], time: '16:00', text: '16:00' },
    duration: {
      title: 'Duration',
      content: ['2h'],
      duration: { hours: 2, minutes: 0 },
      text: '2h'
    },
    'list-item-checked': {
      title: 'List Item Checked',
      content: [],
      text: "*   [x] I agree to follow this project's\n    [Code of Conduct](https://berlincodeofconduct.org)",
      list: [
        {
          checked: true,
          text: "I agree to follow this project's\nCode of Conduct"
        }
      ]
    },
    'list-item-unchecked': {
      title: 'List Item Unchecked',
      content: [],
      text: "*   [ ] I agree to follow this project's\n    [Code of Conduct](https://berlincodeofconduct.org)",
      list: [
        {
          checked: false,
          text: "I agree to follow this project's\nCode of Conduct"
        }
      ]
    },
    'mixed-task-list': {
      title: 'Mixed Task List',
      content: [],
      text: '*   [x] checked\n*   [ ] unchecked\n*   [x] checked 2\n*   [x] checked 3\n*   [ ] unchecked 2',
      list: [
        { checked: true, text: 'checked' },
        { checked: false, text: 'unchecked' },
        { checked: true, text: 'checked 2' },
        { checked: true, text: 'checked 3' },
        { checked: false, text: 'unchecked 2' }
      ]
    },
    repositories: {
      title: 'Repositories',
      content: [],
      lang: 'csv',
      text: '```csv\nhttps://example.com/repository-1\nhttps://example.com/repository-2\n```'
    },
    visibility: { title: 'Visibility', content: ['Internal'], text: 'Internal' }
  }

  const md = await readFile(
    join(process.cwd(), 'test', 'test-issue-1.md'),
    'utf8'
  )
  const actual = await fn(md)
  // console.log(JSON.stringify(actual, null, 0))

  t.same(actual, expected)
})

test('parse(md) return nothing', async (t) => {
  const expected = {}

  const md = await readFile(
    join(process.cwd(), 'test', 'test-issue-2.md'),
    'utf8'
  )
  const actual = await fn(md)
  // console.log(JSON.stringify(actual, null, 0))
  t.same(actual, expected)
})
