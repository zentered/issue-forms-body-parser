'use strict'

import t from 'tap'
import fn from '../src/parse.js'
import { readFile } from 'fs/promises'
import { join } from 'path'

const test = t.test

test('parse(md) should parse GitHub Issue Form data into useful, structured data', async (t) => {
  const expected = [
    {
      id: 'event-description',
      title: 'Event Description',
      text: "Let's meet for coffee and chat about tech, coding, Cyprus and the newly formed\nCDC (Cyprus Developer Community).\n"
    },
    {
      id: 'location',
      title: 'Location',
      text: '[Cafe Nero Finikoudes, Larnaka](https://goo.gl/maps/Bzjxdeat3BSdsUSVA)\n'
    },
    {
      id: 'date',
      title: 'Date',
      text: '11.03.2022\n',
      date: '2022-03-11'
    },
    { id: 'time', title: 'Time', text: '16:00\n', time: '16:00' },
    { id: 'duration', title: 'Duration', text: '2h\n' },
    {
      id: 'list-item-checked',
      title: 'List Item Checked',
      list: [
        {
          checked: true,
          text: "I agree to follow this project's\nCode of Conduct"
        }
      ],
      text: "*   [x] I agree to follow this project's\n    [Code of Conduct](https://berlincodeofconduct.org)\n"
    },
    {
      id: 'list-item-unchecked',
      title: 'List Item Unchecked',
      list: [
        {
          checked: false,
          text: "I agree to follow this project's\nCode of Conduct"
        }
      ],
      text: "*   [ ] I agree to follow this project's\n    [Code of Conduct](https://berlincodeofconduct.org)\n"
    },
    {
      id: 'mixed-task-list',
      title: 'Mixed Task List',
      list: [
        { checked: true, text: 'checked' },
        { checked: false, text: 'unchecked' },
        { checked: true, text: 'checked 2' },
        { checked: true, text: 'checked 3' },
        { checked: false, text: 'unchecked 2' }
      ],
      text: '*   [x] checked\n*   [ ] unchecked\n*   [x] checked 2\n*   [x] checked 3\n*   [ ] unchecked 2\n'
    },
    {
      id: 'complex-list',
      title: 'Complex List',
      list: [
        { checked: null, text: 'one' },
        { checked: null, text: 'two' }
      ],
      text: '*   one\n*   two\n    *   three\n    *   four\n        1.  five\n        2.  six\n'
    },
    {
      id: 'repositories',
      title: 'Repositories',
      text: '```csv\nhttps://example.com/repository-1\nhttps://example.com/repository-2\n```\n'
    },
    {
      id: 'visibility',
      title: 'Visibility',
      text: 'Internal\n'
    }
  ]

  const md = await readFile(
    join(process.cwd(), 'test', 'test-issue-1.md'),
    'utf8'
  )
  const actual = await fn(md)
  // console.log(JSON.stringify(actual, null, 0))
  t.deepEqual(actual, expected)
})

test('parse(md) return nothing', async (t) => {
  const expected = []

  const md = await readFile(
    join(process.cwd(), 'test', 'test-issue-2.md'),
    'utf8'
  )
  const actual = await fn(md)
  // console.log(JSON.stringify(actual, null, 0))
  t.deepEqual(actual, expected)
})
