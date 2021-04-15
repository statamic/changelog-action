const { getChangelogForVersion } = require('./get-changelog-for-version')

test('get the changelog for a version', () => {
  const input = [
    {
      version: '2.1.1',
      date: '2019-12-08',
      text: `blablabla`
    },
    {
      version: '2.1.0',
      date: '2019-12-02',
      text: `blablabla`
    },
    {
      version: '2.0.0',
      date: '2019-12-02',
      text: `blablabla`
    },
    {
      version: '1.2.12',
      date: '2019-12-02',
      text: `blablabla`
    },
  ]
  const output = getChangelogForVersion(input, '2.1.0')

  expect(output.version).toEqual(input[1].version)
})
