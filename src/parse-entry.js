exports.parseEntry = entry => {
  let [title, ...other] = entry
    .trim()
    .split('\n')

  if (!title.startsWith('v')) title = `v${title}`

  const [version, date] = title.substr(0, title.length-1).split(' (')

  let text = other
    .map(line => line.replace(/^### /, '## '))
    .join('\n')
    .trim()

  return { version, date, text }
}
