import { expect, it } from 'vitest'
import { isNonNullable, isNullable } from '../src/function'

it('is nullable', () => {
  expect(isNullable(0)).toBe(false)
  expect(isNullable(1)).toBe(false)
  expect(isNullable(null)).toBe(true)
  expect(isNullable(undefined)).toBe(true)
})

it('is nonnullable', () => {
  expect(isNonNullable(0)).toBe(true)
  expect(isNonNullable(1)).toBe(true)
  expect(isNonNullable(null)).toBe(false)
  expect(isNonNullable(undefined)).toBe(false)
})
