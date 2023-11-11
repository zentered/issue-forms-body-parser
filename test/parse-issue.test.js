'use strict'

import { test } from 'node:test'
import assert from 'node:assert/strict'
import fn from '../src/parse.js'
import { readFile } from 'fs/promises'
import { join } from 'path'

test('parse(md) should parse GitHub Issue Form data into useful, structured data', async (t) => {
  const expected = {
    'event-description': {
      title: 'Event Description',
      heading: 3,
      images: [
        {
          alt: 'image',
          src: 'https://github.com/cyprus-developer-community/events/assets/5837296/528716ea-a59a-41dc-a30f-77f642c25a3f'
        }
      ],
      content: [
        '![image](https://github.com/cyprus-developer-community/events/assets/5837296/528716ea-a59a-41dc-a30f-77f642c25a3f)',
        'Welcome to the CDC - Cyprus Developer Community! Join us for our monthly Larnaka\n' +
          'meet & greet event. Meet likeminded people, discuss topics we would like to hear\n' +
          'about in upcoming talks, welcome potential speakers, discuss all things tech and\n' +
          'have fun!'
      ],
      text: '![image](https://github.com/cyprus-developer-community/events/assets/5837296/528716ea-a59a-41dc-a30f-77f642c25a3f)\n\nWelcome to the CDC - Cyprus Developer Community! Join us for our monthly Larnaka\nmeet & greet event. Meet likeminded people, discuss topics we would like to hear\nabout in upcoming talks, welcome potential speakers, discuss all things tech and\nhave fun!'
    },
    'notice-with-regards-to-covid': {
      title: 'Notice with regards to COVID:',
      heading: 4,
      content: [
        'All attendees must follow measures in accordance with Ministry of Health\ndirectives. <https://www.pio.gov.cy/coronavirus/eng>'
      ],
      links: [
        {
          alt: 'https://www.pio.gov.cy/coronavirus/eng',
          src: 'https://www.pio.gov.cy/coronavirus/eng'
        }
      ],
      text: 'All attendees must follow measures in accordance with Ministry of Health\ndirectives. <https://www.pio.gov.cy/coronavirus/eng>'
    },
    location: {
      title: 'Location',
      heading: 3,
      content: [
        '[Cafe Nero Finikoudes, Larnaka](https://goo.gl/maps/Bzjxdeat3BSdsUSVA)'
      ],
      links: [
        {
          alt: 'Cafe Nero Finikoudes, Larnaka',
          src: 'https://goo.gl/maps/Bzjxdeat3BSdsUSVA'
        }
      ],
      text: '[Cafe Nero Finikoudes, Larnaka](https://goo.gl/maps/Bzjxdeat3BSdsUSVA)'
    },
    date: {
      title: 'Date',
      heading: 3,
      content: ['11.03.2022'],
      date: '2022-03-11',
      text: '11.03.2022'
    },
    time: {
      title: 'Time',
      heading: 3,
      content: ['16:00'],
      time: '16:00',
      text: '16:00'
    },
    duration: {
      title: 'Duration',
      heading: 3,
      content: ['2h'],
      duration: { hours: 2, minutes: 0 },
      text: '2h'
    },
    'list-item-checked': {
      title: 'List Item Checked',
      heading: 3,
      content: [],
      text: '* [x] I agree to follow this projects [Code of Conduct]()',
      list: [
        {
          checked: true,
          link: '',
          text: 'I agree to follow this projects [Code of Conduct]()'
        }
      ]
    },
    'list-item-unchecked': {
      title: 'List Item Unchecked',
      heading: 3,
      content: [],
      text: '* [ ] I agree to follow this projects [Code of Conduct]()',
      list: [
        {
          checked: false,
          link: '',
          text: 'I agree to follow this projects [Code of Conduct]()'
        }
      ]
    },
    'mixed-task-list': {
      title: 'Mixed Task List',
      heading: 3,
      content: [],
      text: '* [x] checked\n* [ ] unchecked\n* [x] checked 2\n* [x] checked 3\n* [ ] unchecked 2',
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
      heading: 3,
      content: [],
      lang: 'csv',
      text: '```csv\nhttps://example.com/repository-1\nhttps://example.com/repository-2\n```'
    },
    visibility: {
      title: 'Visibility',
      heading: 3,
      content: ['Internal'],
      text: 'Internal'
    },
    'repository-name': {
      title: 'Repository name',
      heading: 3,
      content: ['check_underscores_2'],
      text: 'check_underscores_2'
    },
    'repository-description': {
      title: 'Repository description',
      heading: 3,
      content: ['*No response*'],
      text: '*No response*'
    },
    'repository-visibility': {
      title: 'Repository visibility',
      heading: 3,
      content: ['Internal'],
      text: 'Internal'
    },
    'repository-justification': {
      title: 'Repository justification',
      heading: 3,
      content: ['*No response*'],
      text: '*No response*'
    },
    'repository-access': {
      title: 'Repository access',
      heading: 3,
      content: ['@tinyfists/under_scores'],
      text: '@tinyfists/under_scores'
    }
  }

  const md = await readFile(
    join(process.cwd(), 'test', 'test-issue-1.md'),
    'utf8'
  )
  const actual = await fn(md)
  // console.log(JSON.stringify(actual, null, 0))

  assert.deepEqual(actual, expected)
})

// test('parse(md) should parse issues with frontmatter', async (t) => {
//   // TODO: this isn't implemented yet
//   const md = await readFile(
//     join(process.cwd(), 'test', 'test-issue-2.md'),
//     'utf8'
//   )
//   const actual = await fn(md)
//   console.log(actual)
//   // console.log(JSON.stringify(actual, null, 0))
//   t.same(actual, expected)
// })

test('pasre(md) should parse Broadcast sections', async (t) => {
  const expected = {
    'event-description': {
      title: 'Event Description',
      heading: 3,
      images: [
        {
          alt: 'Ancient-Odeon-amphitheatre-in-Paphos-Archaeological-Park,-Cyprus-1154782035_1368x769',
          src: 'https://user-images.githubusercontent.com/74390/205858128-171c2402-1230-45b3-ae42-cb9cb8180e31.jpeg'
        }
      ],
      content: [
        '![Ancient-Odeon-amphitheatre-in-Paphos-Archaeological-Park,-Cyprus-1154782035_1368x769](https://user-images.githubusercontent.com/74390/205858128-171c2402-1230-45b3-ae42-cb9cb8180e31.jpeg)',
        "New year, new event! We're going to start 2023 with a blast."
      ],
      text: "![Ancient-Odeon-amphitheatre-in-Paphos-Archaeological-Park,-Cyprus-1154782035_1368x769](https://user-images.githubusercontent.com/74390/205858128-171c2402-1230-45b3-ae42-cb9cb8180e31.jpeg)\n\nNew year, new event! We're going to start 2023 with a blast."
    },
    agenda: {
      title: 'Agenda',
      heading: 4,
      content: [],
      text: '* 17.30h Welcome\n* 18.00h <https://github.com/cyprus-developer-community/talks/issues/5>\n* 18.30h Networking & Discussion\n* 19.30h <https://github.com/cyprus-developer-community/talks/issues/6>\n* 20.00h Networking & Discussion',
      list: [
        {
          checked: null,
          text: '17.30h Welcome'
        },
        {
          checked: null,
          link: 'https://github.com/cyprus-developer-community/talks/issues/5',
          text: '18.00h [https://github.com/cyprus-developer-community/talks/issues/5](https://github.com/cyprus-developer-community/talks/issues/5)'
        },
        {
          checked: null,
          text: '18.30h Networking & Discussion'
        },
        {
          checked: null,
          link: 'https://github.com/cyprus-developer-community/talks/issues/6',
          text: '19.30h [https://github.com/cyprus-developer-community/talks/issues/6](https://github.com/cyprus-developer-community/talks/issues/6)'
        },
        {
          checked: null,
          text: '20.00h Networking & Discussion'
        }
      ]
    },
    location: {
      title: 'Location',
      heading: 3,
      content: ['pallikarides-paphos'],
      text: 'pallikarides-paphos'
    },
    date: {
      title: 'Date',
      heading: 3,
      content: ['20.01.2023'],
      date: '2023-01-20',
      text: '20.01.2023'
    },
    time: {
      title: 'Time',
      heading: 3,
      content: ['17.30'],
      time: '17:30',
      text: '17.30'
    },
    duration: {
      title: 'Duration',
      heading: 3,
      content: ['2h30m'],
      duration: {
        hours: 2,
        minutes: 30
      },
      text: '2h30m'
    },
    'code-of-conduct': {
      title: 'Code of Conduct',
      heading: 3,
      content: [],
      text: '* [x] I agree to follow this projects [Code of Conduct]()',
      list: [
        {
          checked: true,
          link: '',
          text: 'I agree to follow this projects [Code of Conduct]()'
        }
      ]
    },
    'broadcast-by-git-events': {
      title: 'Broadcast by GitEvents',
      heading: 3,
      content: [
        '[![Eventbrite](https://img.shields.io/static/v1?label=eventbrite\\&logo=eventbrite\\&message=494881282237\\&color=F05537)](https://cdcx-paphos.eventbrite.ca)'
      ],
      links: [
        {
          alt: undefined,
          src: 'https://cdcx-paphos.eventbrite.ca'
        }
      ],
      text: '[![Eventbrite](https://img.shields.io/static/v1?label=eventbrite\\&logo=eventbrite\\&message=494881282237\\&color=F05537)](https://cdcx-paphos.eventbrite.ca)'
    }
  }

  const md = await readFile(
    join(process.cwd(), 'test', 'test-issue-3.md'),
    'utf8'
  )
  const actual = await fn(md)
  // console.log(JSON.stringify(actual, null, 2))

  assert.deepEqual(actual, expected)
})
