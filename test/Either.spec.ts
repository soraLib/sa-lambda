import {
  isLeft, left, right, isRight, map, of, fromPredicate, match, getOrElse, chain, orElse, exists, alt, getLeft, getRight,
  fromMaybe, tryCatch, swap, equals, ap, chainRec, extend, extract, reduce, traverse, filterOrElse } from '../src/Either'
import { flow, pipe } from '../src/Pipe'
import { none, some, Monad as MM } from '../src/Maybe'


test('isLeft', () => {
  expect(isLeft(left(0))).toBeTruthy()
  expect(isLeft(right(1))).toBeFalsy()
})

test('isRight', () => {
  expect(isRight(right(1))).toBeTruthy()
  expect(isRight(left(0))).toBeFalsy()
})

test('map', () => {
  const f = map((a: number) => a + 1)

  expect(f(left(0))).toEqual(left(0))
  expect(f(right(1))).toEqual(right(2))
})

test('of', () => {
  expect(of(1)).toEqual(right(1))
})

test('alt', () => {
  const f = flow(
    alt(() => right(1))
  )
  expect(f(right(2))).toEqual(right(2))
  expect(f(left(2))).toEqual(right(1))

  const f2 = flow(
    alt(() => left(1))
  )
  expect(f2(right(2))).toEqual(right(2))
  expect(f2(left(2))).toEqual(left(1))
})

test('ap', () => {
  const f1 = flow(
    ap(left(0))
  )
  expect(f1(left(1))).toEqual(left(1))
  expect(f1(right(n => n + 1))).toEqual(left(0))

  const f2 = flow(
    ap(right(0))
  )
  expect(f2(left(1))).toEqual(left(1))
  expect(f2(right(n => n + 1))).toEqual(right(1))
})

test('fromPredicate', () => {
  const f = fromPredicate((n: number) => n > 0, () => 'error')

  expect(f(1)).toEqual(right(1))
  expect(f(-1)).toEqual(left('error'))
})

test('fromMaybe', () => {
  const f = fromMaybe(() => 'error')

  expect(f(some(1))).toEqual(right(1))
  expect(f(none)).toEqual(left('error'))
})

test('match', () => {
  const f = match((n: number) => n - 1, (n: number) => n + 1)
  expect(f(left(1))).toBe(0)
  expect(f(right(1))).toBe(2)
})

test('getOrElse', () => {
  expect(getOrElse(() => 0)(left(1))).toBe(0)
  expect(getOrElse(() => 0)(right(1))).toBe(1)
})

test('getLeft', () => {
  expect(getLeft(right(1))).toEqual(none)
  expect(getLeft(left(1))).toEqual(some(1))
})

test('getRight', () => {
  expect(getRight(right(1))).toEqual(some(1))
  expect(getRight(left(1))).toEqual(none)
})

test('extract', () => {
  expect(extract(right(1))).toBe(1)
  expect(extract(left('err'))).toBe('err')
})


test('extend', () => {
  expect(pipe(right(1), extend(e => isRight(e) ? e.right + 1 : e.left))).toEqual(right(2))
  expect(pipe(left(1), extend(e => isRight(e) ? e.right + 1 : e.left))).toEqual(left(1))
})

test('chain', () => {
  expect(chain((n: number) => right(n + 1))(left(1))).toEqual(left(1))
  expect(chain((n: number) => right(n + 1))(right(1))).toEqual(right(2))
})

test('chainRec', () => {
  expect(
    pipe(
      1,
      chainRec(
        a => a < 5 ? right(left(a + 1)) : right(right(`${a}`)),
      )
    )
  ).toEqual(right('5'))

  expect(
    pipe(
      1,
      chainRec(
        () => left(0),
      )
    )
  ).toEqual(left(0))
})

test('reduce', () => {
  expect(pipe(right(1), reduce((acc, a) => acc + a, 1))).toBe(2)
  expect(pipe(left(0), reduce((acc, a) => acc + a, 1))).toBe(1)
})

test('traverse', () => {
  const f = traverse(MM)((n: number) => n > 0 ? some(n): none)
  expect(pipe(left('err'), f)).toEqual(some(left('err')))
  expect(pipe(right(1), f)).toEqual(some(right(1)))
  expect(pipe(right(-1), f)).toEqual(none)
})

test('orElse', () => {
  expect(orElse((n: number) => right(n + 1))(left(1))).toEqual(right(2))
  expect(orElse((n: number) => right(n + 1))(right(1))).toEqual(right(1))
})

test('exists', () => {
  expect(exists((n: number) => n > 0)(left(0))).toBeFalsy()
  expect(exists((n: number) => n > 0)(right(0))).toBeFalsy()
  expect(exists((n: number) => n > 0)(right(1))).toBeTruthy()
})

test('tryCatch', () => {
  const unsafeDiv = (top: number, bottom: number) => {
    if (bottom === 0) throw new Error('unsafe division')

    return top / bottom
  }

  const div = (top: number, bottom: number) =>
    tryCatch(() => unsafeDiv(top, bottom), () => 0)

  expect(div(2, 0)).toEqual(left(0))
  expect(div(2, 1)).toEqual(right(2))
})

test('swap', () => {
  expect(swap(right(1))).toEqual(left(1))
  expect(swap(left(1))).toEqual(right(1))
})

test('equals', () => {
  expect(equals(right(1), right(1))).toBeTruthy()
  expect(equals(right(2), right(1))).toBeFalsy()
  expect(equals(right(1), left(1))).toBeFalsy()
  expect(equals(left(1), left(1))).toBeTruthy()
  expect(equals(left(1), right(1))).toBeFalsy()
})

test('filterOrElse', () => {
  const f = filterOrElse(
    (n: number) => n > 0,
    () => 'err'
  )

  expect(pipe(right(1), f)).toEqual(right(1))
  expect(pipe(right(-1), f)).toEqual(left('err'))
  expect(pipe(left(1), f)).toEqual(left(1))
})

test('example1', () => {
  const parseJson = (s: string) =>
    tryCatch(() => JSON.parse(s), () => `Couldn't parse from ${s}.`)

  expect(pipe('{"name":"clyne"}', parseJson, getOrElse(() => ({ name: 'sora' })))).toEqual({ name: 'clyne' })
  expect(pipe('{"name""clyne"}', parseJson, getOrElse(() => ({ name: 'sora' })))).toEqual({ name: 'sora' })
})
