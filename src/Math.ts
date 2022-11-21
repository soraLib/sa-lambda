import { NonEmptyArray } from './TupleT'

/**
 * Returns the largest number of a set of number.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(max(1, 2, 3), 3)
 * ```
 */

export const max = (...as: NonEmptyArray<number>): number => {
  let [max, ...bs] = as
  for (const b of bs) {
    if(b > max) max = b
  }

  return max
}

/**
 * Returns the smallest number of a set of number.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(min(1, 2, 3), 1)
 * ```
 */
export const min = (...as: NonEmptyArray<number>): number => {
  let [min, ...bs] = as
  for (const b of bs) {
    if(b < min) min = b
  }

  return min
}

/**
 * Returns the absolute value of a number.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(abs(1), 1)
 * assert.deepStrictEqual(abs(-1), 1)
 * ```
 */
export const abs = (num: number): number => max(num, -num)

/**
 * Compares two numbers.
 * - `a > b` => `1`
 * - `a < b` => `-1`
 * - `a == b` => `0`
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(cmp(1, 1), 0)
 * assert.deepStrictEqual(cmp(1, 0), 1)
 * assert.deepStrictEqual(cmp(0, 1), -1)
 * ```
 */
export const cmp = (a: number, b: number): -1 | 0 | 1 =>
  a > b ? 1 : a < b ? -1 : 0


/**
 * Computes the sum of the values.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(sum(1, 2, 3), 6)
 * ```
 */
export const sum = (...as: NonEmptyArray<number>): number =>
  as.reduce((a, b) => a + b, 0)


export type BetweenExclude = {
  from?: boolean
  to?: boolean
}

/**
 * Returns whether a value is between a range.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(between(1, 1, 2), true)
 * assert.deepStrictEqual(between(1, 2, 3), false)
 * assert.deepStrictEqual(between(1, 1, 2, { from: true }), false)
 * assert.deepStrictEqual(between(2, 1, 2, { to: true }), false)
 * assert.deepStrictEqual(between(1, 1, 2, { from: true, to: true }), false)
 * assert.deepStrictEqual(between(2, 1, 2, { from: true, to: true }), false)
 * ```
 */
export const between = (
  value: number,
  from: number,
  to: number,
  exclude: BetweenExclude = { from: false, to: false }
) => {
  if (exclude.from) {
    if (value <= from) return false

    return exclude.to ? value < to : value <= to
  }

  if (value < from) return false

  return exclude.to ? value < to : value <= to
}
