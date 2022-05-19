import { isSome, some, isNone, none, fromPredicate, getOrElse } from '../src/Maybe'

test('isSome', () => {
  expect(isSome(some(1))).toBeTruthy()
  expect(isSome(none)).toBeFalsy()
})

test('isNone', () => {
  expect(isNone(some(1))).toBeFalsy()
  expect(isNone(none)).toBeTruthy()
})

test('fromPredicate', () => {
  const getMaybe = fromPredicate((n: number) => n > 0)

  expect(getMaybe(1)).toEqual(some(1))
  expect(getMaybe(0)).toEqual(none)
})


test('getOrElse', () => {
  expect(getOrElse(() => 0)(some(1))).toBe(1)
  expect(getOrElse(() => 0)(none)).toBe(0)
})
