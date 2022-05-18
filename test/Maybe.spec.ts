import { isSome, some, isNone, none, fromPredicate } from '../src/Maybe'

test('isSome', () => {
  expect(isSome(some(1))).toBe(true)
  expect(isSome(none)).toBe(false)
})

test('isNone', () => {
  expect(isNone(some(1))).toBe(false)
  expect(isNone(none)).toBe(true)
})

test('fromPredicate', () => {
  const getMaybe = fromPredicate((n: number) => n > 0)

  expect(getMaybe(1)).toEqual(some(1))
  expect(getMaybe(0)).toEqual(none)
})
