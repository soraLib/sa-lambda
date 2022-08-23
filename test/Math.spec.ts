import { max, min, abs, cmp } from '../src/Math'

it('max', () => {
  expect(max(1, 2, 3)).toBe(3)
  expect(max(1)).toBe(1)
})

it('min', () => {
  expect(min(1, 2, 3)).toBe(1)
  expect(min(1)).toBe(1)
})

it('abs', () => {
  expect(abs(1)).toBe(1)
  expect(abs(-1)).toBe(1)
  expect(abs(0)).toBe(0)
})

it('cmp', () => {
  expect(cmp(1, 1)).toBe(0)
  expect(cmp(1, 0)).toBe(1)
  expect(cmp(0, 1)).toBe(-1)

  expect(cmp(1n, 1n)).toBe(0n)
  expect(cmp(1n, 0n)).toBe(1n)
  expect(cmp(0n, 1n)).toBe(-1n)
})
