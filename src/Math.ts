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

export function max(...as: NonEmptyArray<number>): number
export function max(...as: NonEmptyArray<bigint>): bigint
export function max(...as: NonEmptyArray<any>): any {
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
export function min(...as: NonEmptyArray<number>): number
export function min(...as: NonEmptyArray<bigint>): bigint
export function min(...as: NonEmptyArray<any>): any {
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
 */
export function cmp(a: number, b: number): -1 | 0 | 1
export function cmp(a: bigint, b: bigint): -1n | 0n | 1n
export function cmp(a: any, b: any): any {
  if(typeof a === 'bigint') return a > b ? 1n : a < b ? -1n : 0n

  return a > b ? 1 : a < b ? -1 : 0
}
