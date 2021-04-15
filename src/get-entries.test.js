const { getEntries } = require('./get-entries')

const CHANGELOG = `
# Release Notes

## 3.1.7 (2020-04-15)

### What's new
- Alfa
- Bravo

### What's improved
- Charlie
- Delta

### What's fixed
- Echo
- Foxtrot



## 3.1.6 (2020-04-12)

### What's new
- Golf
- Hotel

### What's improved
- India
- Juliett

### What's fixed
- Kilo
- Lima


## 3.1.0-beta.3 (2020-03-04)

### What's new
- Mike
- November

### What's improved
- Oscar
- Papa

### What's fixed
- Quebec
- Romeo
`

test('retrieve entries', () => {
  const output = getEntries(CHANGELOG)

  expect(output.length).toEqual(3)
  expect(output[0].split('\n')[0]).toMatch('3.1.7 (2020-04-15)')
  expect(output[1].split('\n')[0]).toMatch('3.1.6 (2020-04-12)')
  expect(output[2].split('\n')[0]).toMatch('3.1.0-beta.3 (2020-03-04)')
})
