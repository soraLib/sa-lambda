import { isLeft, left, right, isRight, map, of, fromPredicate } from '../src/Either'

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
