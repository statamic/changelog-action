exports.normalizeVersion = version => {
  return version
    .replace(/^refs\/tags\//, '')
    .replace(/^v/, '')
}
