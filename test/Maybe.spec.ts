import { isSome, some, isNone, none } from '../src/Maybe'

test('isSome', () => {
  expect(isSome(some(1))).toBe(true)
  expect(isSome(none)).toBe(false)
})

test('isNone', () => {
  expect(isNone(some(1))).toBe(false)
  expect(isNone(none)).toBe(true)
})
