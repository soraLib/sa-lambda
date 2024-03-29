import { abs, between, cmp, max, min, sum, randrange } from '../src/Math'

it('max', () => {
  expect(max(1, 2, 3)).toBe(3)
  expect(max(1)).toBe(1)
})

it('min', () => {
  expect(min(1, 2, 3)).toBe(1)
  expect(min(3, 2, 1)).toBe(1)
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
})

it('sum', () => {
  expect(sum(1)).toBe(1)
  expect(sum(1, 2, 3)).toBe(6)
})

it('between', () => {
  expect(between(1, 1, 2)).toBe(true)
  expect(between(1, 2, 3)).toBe(false)
  expect(between(4, 2, 3)).toBe(false)
  expect(between(1, 1, 2, { from: true })).toBe(false)
  expect(between(2, 1, 2, { to: true })).toBe(false)
  expect(between(1, 1, 2, { from: true, to: true })).toBe(false)
  expect(between(2, 1, 2, { from: true, to: true })).toBe(false)
})

it('randrange', () => {
  const rand = randrange(0, 100)
  expect(rand).toBeGreaterThanOrEqual(0)
  expect(rand).toBeLessThanOrEqual(100)
})
