const utils = require('util')
const fs = require('fs')
const core = require('@actions/core')
const readFile = utils.promisify(fs.readFile)
const { parseEntry } = require('./parse-entry')
const { getEntries } = require('./get-entries')
const { getChangelogForVersion } = require('./get-changelog-for-version')
const { normalizeVersion } = require('./normalize-version')

exports.main = async function main() {
  try {
    const version = normalizeVersion(core.getInput('version'))
    const rawData = await readFile('./CHANGELOG.md')
    const changelogs = getEntries(rawData).map(parseEntry)
    const changelog = getChangelogForVersion(changelogs, version)

    if (version == null) {
      throw new Error(`No changelog found for version ${version}`)
    }

    core.setOutput('version', changelog.version)
    core.setOutput('date', changelog.date)
    core.setOutput('text', changelog.text)
  }
  catch (error) {
    core.setFailed(error.message)
  }
}
