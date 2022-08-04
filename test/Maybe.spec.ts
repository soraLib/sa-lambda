import { isSome, some, isNone, none, fromPredicate, getOrElse, of, map, chain, match,
  alt, ap, tryCatch, equals, orElse, toEither, toNullable, toUndefined, empty, filter, extend, zero } from '../src/Maybe'
import { pipe, flow } from '../src/Pipe'
import { left, right } from '../src/Either'

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


test('toEither', () => {
  const f = flow(
    toEither(() => 0)
  )

  expect(f(some(1))).toEqual(right(1))
  expect(f(none)).toEqual(left(0))
})

test('toNullable', () => {
  const f = flow(
    toNullable
  )

  expect(f(some(1))).toEqual(1)
  expect(f(none)).toEqual(null)
})

test('toUndefined', () => {
  const f = flow(
    toUndefined
  )

  expect(f(some(1))).toEqual(1)
  expect(f(none)).toEqual(undefined)
})

test('getOrElse', () => {
  const f = flow(
    getOrElse(() => 0)
  )

  expect(f(some(1))).toBe(1)
  expect(f(none)).toBe(0)
})

test('orElse', () => {
  const f = flow(
    orElse(() => some('0'))
  )

  expect(f(none)).toEqual(some('0'))
  expect(f(some(1))).toEqual(some(1))
})

test('empty', () => {
  expect(empty()).toEqual(none)
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
  expect(pipe(some((n: number) => n + 1), ap(some(1)))).toEqual(some(2))
  expect(pipe(none, ap(some(1)))).toEqual(none)
  expect(pipe(some((n: number) => n + 1), ap(none))).toEqual(none)
})

test('filter', () => {
  const f = flow(
    filter((n: number) => n > 0)
  )
  expect(f(some(1))).toEqual(some(1))
  expect(f(some(0))).toEqual(none)
  expect(f(none)).toEqual(none)
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

test('extend', () => {
  expect(pipe(some(1), extend(getOrElse(zero)))).toEqual(some(1))
  expect(pipe(none, extend(getOrElse(zero)))).toEqual(none)
})

test('match', () => {
  const f = flow(
    match(() => 0, (n: number) => n + 1)
  )

  expect(f(some(1))).toBe(2)
  expect(f(none)).toBe(0)
})

test('tryCatch', () => {
  const unsafeDiv = (top: number, bottom: number) => {
    if(bottom === 0) throw new Error('unsafe division')

    return top / bottom
  }

  const div = (top: number, bottom: number) =>
    tryCatch(() => unsafeDiv(top, bottom))

  expect(div(2, 0)).toEqual(none)
  expect(div(2, 1)).toEqual(some(2))
})

test('equals', () => {
  expect(equals(some(1), some(1))).toBeTruthy()
  expect(equals(some(2), some(1))).toBeFalsy()
  expect(equals(some(1), none)).toBeFalsy()
  expect(equals(none, none)).toBeTruthy()
  expect(equals(none, some(1))).toBeFalsy()
})

test('example1', () => {
  const f = flow(
    map((n: number) => n + 1),
    match(() => '', (n: number) => `${n}`),
  )

  expect(f(some(1))).toBe('2')
  expect(f(none)).toBe('')
})
