# Security Policy

## Reporting a Vulnerability

Please report security vulnerabilities privately through GitHub's
[private vulnerability reporting](https://github.com/zentered/issue-forms-body-parser/security/advisories/new)
rather than opening a public issue. We will acknowledge receipt and work with
you on a fix and coordinated disclosure.

## Threat Model

This action and the `@zentered/issue-forms-body-parser` package parse a GitHub
issue body into structured data. The issue body is **untrusted input**: on
`issues`-triggered workflows, anyone who can open an issue in your repository
controls its full content.

The parser itself does not execute, evaluate, or shell out to anything in the
issue body - it only walks a Markdown AST and returns a plain object. The
security boundary therefore sits in **how a consuming workflow uses the parsed
output**, not in the action's runtime.

### What the action guarantees

- It never runs `eval`, a shell, or a subprocess on issue content.
- It emits its result through `@actions/core` `setOutput`, which uses a
  random-delimiter guard. An attacker cannot break out of the `data` value to
  inject additional step outputs or workflow commands.

### What the action cannot guarantee

- The **content** of `data` is the user's parsed text by design (an event
  description may legitimately contain `$`, backticks, or quotes). It is not and
  cannot be sanitized into a "safe" string without corrupting the data.
- What your workflow does with that output is outside the action's control.

## Using the output safely

Treat every field of `outputs.data` (including `links`/`images` URLs) as
attacker-controlled.

**Never** interpolate the output directly into a `run:` script. GitHub Actions
expands `${{ }}` into the script text _before_ the shell runs, and `toJSON()`
escapes JSON metacharacters but **not** shell metacharacters - so a value
containing `$(...)` or backticks executes as a command:

```yml
# UNSAFE - command injection
- run: echo ${{ toJSON(steps.parse.outputs.data) }}
```

**Always** pass the output through an `env:` variable and reference it with a
quoted shell variable. Values set via `env:` are passed to the runner as literal
environment variables and are not re-interpolated into the script:

```yml
# SAFE
- name: Print parsed data
  env:
    DATA: ${{ toJSON(steps.parse.outputs.data) }}
  run: echo "$DATA"
```

The same applies to any other sink. Do not place parsed values into a `ref:`
parameter, a `gh`/API call, a database query, or HTML without validating or
encoding them for that context first.

## Token permissions

Workflows that run this action on `issues` execute in the trusted base-repo
context. Apply least privilege so a mistake cannot be leveraged into a
supply-chain foothold:

```yml
permissions:
  contents: read
```

If the job does not push or create releases, keep the default `GITHUB_TOKEN`
read-only and set `persist-credentials: false` on `actions/checkout` so the
token is not written to `.git/config`.
