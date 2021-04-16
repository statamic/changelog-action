exports.parseEntry = entry => {
  const [title, ...other] = entry
    .trim()
    .split('\n')

  const [version, date] = title.substr(0, title.length-1).split(' (')

  let text = other
    .map(line => line.replace(/^### /, '## '))
    .join('\n')
    .trim()

  return { version: `v${version}`, date, text }
}
