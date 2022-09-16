import { eqAnd, eqOr, isEqual, isStrictEqual, strictEqAnd, strictEqOr } from '../src/Equal'

it('loose equal', () => {
  expect(isEqual(1, 2)).toBeFalsy()
  expect(isEqual(1, '2')).toBeFalsy()
  expect(isEqual(1, '1')).toBeTruthy()
  expect(isEqual(true, '1')).toBeTruthy()
})

it('strict equal', () => {
  expect(isStrictEqual(1, 2)).toBeFalsy()
  expect(isStrictEqual(1, '1')).toBeFalsy()
  expect(isStrictEqual(1, 1)).toBeTruthy()
})

it('loose equal or', () => {
  expect(eqOr(1)).toBeTruthy()
  expect(eqOr(1, 2, 3)).toBeFalsy()
  expect(eqOr(1, '1', 3)).toBeTruthy()
})

it('strict equal or', () => {
  expect(strictEqOr(1)).toBeTruthy()
  expect(strictEqOr(1, 2, 3)).toBeFalsy()
  expect(strictEqOr(1, '1', 3)).toBeFalsy()
  expect(strictEqOr(1, 1, 3)).toBeTruthy()
})

it('loose equal and', () => {
  expect(eqAnd(1)).toBeTruthy()
  expect(eqAnd(1, 2, 3)).toBeFalsy()
  expect(eqAnd(1, '1', 3)).toBeFalsy()
  expect(eqAnd(1, '1', true)).toBeTruthy()
})

it('strict equal and', () => {
  expect(strictEqAnd(1)).toBeTruthy()
  expect(strictEqAnd(1, 2, 3)).toBeFalsy()
  expect(strictEqAnd(1, 1, 2)).toBeFalsy()
  expect(strictEqAnd(1, 1, 1)).toBeTruthy()
})
