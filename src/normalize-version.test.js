const { normalizeVersion } = require('./normalize-version')

test('leaves valid versions alone', () => {
  expect(normalizeVersion('1.2.3')).toEqual('1.2.3')
})

test('removes the v prefix', () => {
  expect(normalizeVersion('v1.2.3')).toEqual('1.2.3')
})

test('removes the refs/tags/ prefix', () => {
  expect(normalizeVersion('refs/tags/1.2.3')).toEqual('1.2.3')
  expect(normalizeVersion('refs/tags/v1.2.3')).toEqual('1.2.3')
})
