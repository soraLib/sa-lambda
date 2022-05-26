import { isSome, some, isNone, none, fromPredicate, getOrElse, of, map, chain, match } from '../src/Maybe'
import { pipe } from '../src/function'

test('isSome', () => {
  expect(isSome(some(1))).toBeTruthy()
  expect(isSome(none)).toBeFalsy()
})

test('isNone', () => {
  expect(isNone(some(1))).toBeFalsy()
  expect(isNone(none)).toBeTruthy()
})

test('fromPredicate', () => {
  const f = pipe(
    fromPredicate((n: number) => n > 0)
  )

  expect(f(1)).toEqual(some(1))
  expect(f(0)).toEqual(none)
})

test('getOrElse', () => {
  const f = pipe(
    getOrElse(() => 0)
  )

  expect(f(some(1))).toBe(1)
  expect(f(none)).toBe(0)
})

test('of', () => {
  expect(of(1)).toEqual(some(1))
})

test('map', () => {
  const f = pipe(
    map((n: number) => n + 1),
    getOrElse(() => 0)
  )
  expect(f(some(1))).toEqual(2)
  expect(f(none)).toEqual(0)
})

test('chain', () => {
  const f = pipe(
    chain((n: number) => n > 0 ? some(n) : none),
    getOrElse(() => 0)
  )

  expect(f(some(1))).toEqual(1)
  expect(f(some(-1))).toEqual(0)
  expect(f(none)).toEqual(0)
})

test('match', () => {
  const f = pipe(
    match(() => 0, (n: number) => n + 1)
  )

  expect(f(some(1))).toBe(2)
  expect(f(none)).toBe(0)
})
