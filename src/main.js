const utils = require('util')
const fs = require('fs')
const core = require('@actions/core')

const { parseEntry } = require('./parse-entry')
const { getEntries } = require('./get-entries')
const { getChangelogForVersion } = require('./get-changelog-for-version')
const { normalizeVersion } = require('./normalize-version')

const readFile = utils.promisify(fs.readFile)

exports.main = async function main() {
  try {
    const changelogPath = './CHANGELOG.md'
    const targetVersion = normalizeVersion(core.getInput('version'))
    core.debug(`targetVersion: ${targetVersion}`)

    core.startGroup('Parse data')
    const rawData = await readFile(changelogPath)
    const versions = getEntries(rawData).map(parseEntry)
    core.debug(`${versions.length} version logs found`)
    core.endGroup()

    const version = getChangelogForVersion(versions, targetVersion)

    if (version == null) {
      throw new Error(`No changelog found for version ${targetVersion}`)
    }

    core.setOutput('version', version.id)
    core.setOutput('date', version.date)
    core.setOutput('text', version.text)
  }
  catch (error) {
    core.setFailed(error.message)
  }
}
