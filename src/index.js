'use strict'

import github from '@actions/github'
import core from '@actions/core'
import parse from './parse.js'

async function run() {
  core.info('Parsing issue body ...')

  try {
    const parsedContent = await parse(github.context.payload.issue.body)

    if (parsedContent !== undefined) {
      core.setOutput('data', parsedContent)
    } else {
      core.setFailed(`There was no valid payload found in the issue.`)
    }
  } catch (err) {
    core.setFailed(err)
  }
}

run()
