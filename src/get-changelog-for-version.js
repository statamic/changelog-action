exports.getChangelogForVersion = (changelogs, version) => {
  return changelogs.find(changelog => changelog.version === version)
}
