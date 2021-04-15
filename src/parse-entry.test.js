const { parseEntry } = require('./parse-entry')

const CHANGELOG = `
3.1.0-beta.3 (2020-03-04)

### What's new
- Alfa
- Bravo

### What's improved
- Charlie
- Delta

### What's fixed
- Echo
- Foxtrot
`

test('parses a changelog entry', () => {
  const output = parseEntry(CHANGELOG)

  expect(output.version).toEqual('3.1.0-beta.3')
  expect(output.date).toEqual('2020-03-04')
  expect(output.text).toEqual(`
## What's new
- Alfa
- Bravo

## What's improved
- Charlie
- Delta

## What's fixed
- Echo
- Foxtrot
    `.trim())
})
