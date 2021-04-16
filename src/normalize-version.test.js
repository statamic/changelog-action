const { normalizeVersion } = require('./normalize-version')

test('leaves valid versions alone', () => {
  expect(normalizeVersion('v1.2.3')).toEqual('v1.2.3')
})

test('adds the v prefix', () => {
  expect(normalizeVersion('1.2.3')).toEqual('v1.2.3')
})

test('removes the refs/tags/ prefix', () => {
  expect(normalizeVersion('refs/tags/1.2.3')).toEqual('v1.2.3')
  expect(normalizeVersion('refs/tags/v1.2.3')).toEqual('v1.2.3')
})
