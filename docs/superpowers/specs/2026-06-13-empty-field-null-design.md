# Design: Return `null` for empty ("No response") fields

Related issue:
[#40](https://github.com/zentered/issue-forms-body-parser/issues/40)

## Problem

GitHub Issue Forms render an optional field that was left blank as the literal
markdown `_No response_`. The parser currently treats this like any other
paragraph, producing:

```json
"field": {
  "title": "field",
  "heading": 3,
  "content": ["*No response*"],
  "text": "*No response*"
}
```

This leaks an internal markdown placeholder into the structured output, forcing
consumers to special-case the string `*No response*`.

## Solution

In `src/parse.js`, inside the `paragraph` branch, after computing `cleanText`:

1. If `cleanText === '*No response*'`, treat the field as empty:
   - Do not run date/time/duration/links/images parsing on it.
   - Do not push it into `obj.content`.
   - Set `obj.text = null` directly.
2. Otherwise, process the paragraph as today.

### Why this is sufficient

The closing loop in `parse.js` (the `for (const key in structuredResponse)`
block) only overwrites `token.text` when `content.length > 0`. Since the
`*No response*` paragraph is never pushed to `content`, `content` stays `[]`,
and the explicit `obj.text = null` set above is preserved.

### Resulting shape

```json
"field": {
  "title": "field",
  "heading": 3,
  "content": [],
  "text": null
}
```

## Edge cases

- **Checkbox / task lists**: GitHub always renders a checked/unchecked state for
  these, never `_No response_`. No change needed in the `list` branch.
- **Code-block fields** (e.g. fields with a code-language hint): an empty
  textarea renders as a `_No response_` paragraph, not an empty code block.
  Already covered by the paragraph branch.
- **Multiple paragraphs under one heading where only one is `*No response*`**
  (unlikely in practice, since GitHub Issue Forms map one field to one
  paragraph): only the `*No response*` paragraph is skipped; remaining
  paragraphs are joined normally.

## Testing

Update `test/parse-issue.test.js` expectations for:

- `repository-description` (currently
  `content: ['*No response*'], text: '*No response*'`)
- `repository-justification` (same)

Both become `content: [], text: null`.

## Versioning

This changes the type of `.text` for previously-empty fields from `string` to
`null`. Consumers calling string methods on `.text` for an empty field would
break. Commit as `fix!:` with a `BREAKING CHANGE:` footer, triggering a major
version bump per semantic-release.
