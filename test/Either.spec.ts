import { isLeft, left, right, isRight, map, of, fromPredicate, match, getOrElse, chain } from '../src/Either'

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

test('fromPredicate', () => {
  const f = fromPredicate((n: number) => n > 0, () => 'error')

  expect(f(1)).toEqual(right(1))
  expect(f(-1)).toEqual(left('error'))
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

test('chain', () => {
  expect(chain((n: number) => right(n + 1))(left(1))).toEqual(left(1))
  expect(chain((n: number) => right(n + 1))(right(1))).toEqual(right(2))
})
