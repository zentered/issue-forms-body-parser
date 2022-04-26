# GitHub Issue Forms Body Parser

![Test](https://github.com/zentered/issue-forms-body-parser/workflows/Test/badge.svg)
![Release](https://github.com/zentered/issue-forms-body-parser/workflows/Publish/badge.svg)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![zentered.co](https://img.shields.io/badge/%3E-zentered.co-blue.svg?style=flat)](https://zentered.co)

[Issue Forms](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository#creating-issue-forms)
is a great way to structure GitHub Issues to an expected format, and to make it
easier to capture information from the user. Unfortunately, the schema only
defined the input of the data, not the output. So the markdown body needs to be
parsed to extract the information in a structured way and to make further
processing easier.

We use this Action at the
[Cyprus Developer Community](https://github.com/cyprus-developer-community) to
[create issues with event data](https://github.com/cyprus-developer-community/events/issues/new?assignees=&labels=Event+%3Asparkles%3A&template=event.yml&title=Event+Title)
for upcoming meetups etc. The parser extracts the information from the issues
and provides structured data to create calendar entries (ie `.ics` files for
[calendar subscriptions with GitEvents](https://github.com/gitevents/ics)),
calling 3rd party APIs, etc.

_Inspired by:
[Peter Murray's Issue Forms Body Parser](https://github.com/peter-murray/issue-forms-body-parser)
with valuable feedback from [Steffen](https://gist.github.com/steffen)_

## Features

- :white_check_mark: npm version available
  `npm i @zentered/issue-forms-body-parser`
- :white_check_mark: parse question/answer format into title/text as JSON
- :white_check_mark: parse line items and "tasks" with separate `checked`
  attributes
- :white_check_mark: slugify title to id to find data
- :white_check_mark: parse dates and times into separate `date` and `time`
  fields
- :negative_squared_cross_mark: no tokens/input required
- :negative_squared_cross_mark: zero configuration

Transforms markdown from GitHub Issue Forms:

```markdown
### Event Description

Let's meet for coffee and chat about tech, coding, Cyprus and the newly formed
CDC (Cyprus Developer Community).

### Location

Cafe Nero Finikoudes, Larnaka

### Date

11.03.2022

### Time

16:00
```

to structured, usable data:

```json
{
  "event-description": {
    "order": 0,
    "title": "Event Description",
    "text": "Let's meet for coffee and chat about tech, coding, Cyprus and the newly formed\nCDC (Cyprus Developer Community)."
  },
  "location": {
    "order": 1,
    "title": "Location",
    "text": "Cafe Nero Finikoudes, Larnaka"
  },
  "date": {
    "order": 2,
    "title": "Date",
    "text": "11.03.2022",
    "date": "2022-03-11"
  },
  "time": {
    "order": 3,
    "title": "Time",
    "text": "16:00",
    "time": "16:00"
  }
}
```

See more examples in [md test cases](./test/test-issue-1.md) and
[test results](./test/parse-issue-test.md]).

### Parsers

- `date`: checks if the value matches a
  [common date format](https://github.com/zentered/issue-forms-body-parser/blob/main/src/parsers/date.js#L7)
  and returns a formatted `date` field (in UTC).
- `time`: checks if the value matches a
  [common time format](https://github.com/zentered/issue-forms-body-parser/blob/main/src/parsers/time.js#L7)
  and returns a formatted `time` field.
- `lists`: automatically returns lists as arrays
- `duration`: currently only the format `XXhYYm` is supported as duration, ie.
  `1h30m` returns a `duration` object with `hours` and `minutes`.

## Installation & Usage

### GitHub Actions

```yml
name: Issue Forms Body Parser

on: issues

jobs:
  process:
    runs-on: ubuntu-latest
    steps:
      - name: Issue Forms Body Parser
        id: parse
        uses: zentered/issue-forms-body-parser@v1.4.3
      - run: echo "${{ JSON.stringify(steps.parse.outputs.data) }}"
```

### NPM

The parser is available as a standalone library:

```
    npm i @zentered/issue-forms-body-parser
    # OR yarn add @zentered/issue-forms-body-parser
```

Usage:

```
import bodyParser from '@zentered/issue-forms-body-parser'
const issueData = await bodyParser(issue.body)
```

## Development & Testing

You can use [act](https://github.com/nektos/act) to test this Action locally.

`npm run build && act issue -e test/issue.json`

or run:

`npm test`

to test the parser.

## Links

- [Creating issue forms](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository#creating-issue-forms)
- [Syntax for GitHub's form schema](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-githubs-form-schema)

## License

Licensed under [MIT](./LICENSE).

Here is a list of all the licenses of our
[production dependencies](./dist/licenses.txt)
