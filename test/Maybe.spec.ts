import { isSome, some, isNone, none, fromPredicate, getOrElse, of, map, chain, match, alt, then, ap } from '../src/Maybe'
import { flow } from '../src/function'

test('isSome', () => {
  expect(isSome(some(1))).toBeTruthy()
  expect(isSome(none)).toBeFalsy()
})

test('isNone', () => {
  expect(isNone(some(1))).toBeFalsy()
  expect(isNone(none)).toBeTruthy()
})

test('fromPredicate', () => {
  const f = flow(
    fromPredicate((n: number) => n > 0)
  )

  expect(f(1)).toEqual(some(1))
  expect(f(0)).toEqual(none)
})

test('getOrElse', () => {
  const f = flow(
    getOrElse(() => 0)
  )

  expect(f(some(1))).toBe(1)
  expect(f(none)).toBe(0)
})

test('of', () => {
  expect(of(1)).toEqual(some(1))
})

test('alt', () => {
  const f = flow(
    alt(() => some(1))
  )
  expect(f(some(2))).toEqual(some(2))
  expect(f(none)).toEqual(some(1))

  const f2 = flow(
    alt(() => none)
  )
  expect(f2(some(2))).toEqual(some(2))
  expect(f2(none)).toEqual(none)
})

test('ap', () => {
  const f = flow(
    ap((n: number) => n + 1)
  )
  expect(f(some(1))).toEqual(some(2))
  expect(f(none)).toEqual(none)
})

test('then', () => {
  const f = flow(
    then((n: number) => n + 1)
  )
  expect(f(some(1))).toBe(2)
  expect(f(none)).toBeUndefined()
})

test('map', () => {
  const f = flow(
    map((n: number) => n + 1),
    getOrElse(() => 0)
  )
  expect(f(some(1))).toEqual(2)
  expect(f(none)).toEqual(0)
})

test('chain', () => {
  const f = flow(
    chain((n: number) => n > 0 ? some(n) : none),
    getOrElse(() => 0)
  )

  expect(f(some(1))).toEqual(1)
  expect(f(some(-1))).toEqual(0)
  expect(f(none)).toEqual(0)
})

test('match', () => {
  const f = flow(
    match(() => 0, (n: number) => n + 1)
  )

  expect(f(some(1))).toBe(2)
  expect(f(none)).toBe(0)
})
