import { isEmpty } from './Iterator'
/**
 * Loose equality compares two values for equality.
 *
 * Equals to `a == b`.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(isEqual(1, 1), true)
 * assert.deepStrictEqual(isEqual(1, '1'), true)
 * ```
 */
export const isEqual = (self: unknown, other: unknown): boolean => self == other

/**
 * Strict equality compares two values for equality.
 *
 * Equals to `a === b`.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(isStrictEqual(1, 1), true)
 * assert.deepStrictEqual(isStrictEqual(1, '1'), false)
 * ```
 */
export const isStrictEqual = (self: unknown, other: unknown): boolean => self === other

/**
 * Checks if value is *loose equal* to any other value.
 *
 * Returns self directly if others is empty.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(eqOr(1, 2, 3), false)
 * assert.deepStrictEqual(eqOr(1, '1', 3), true)
 * ```
 */
export function eqOr<A>(self: A): A
export function eqOr(self: unknown, ...others: unknown[]): boolean
export function eqOr<A>(self: A, ...others: unknown[]): A | boolean {
  if(isEmpty(others)) return self

  return others.some(other => isEqual(self, other))
}

/**
 * Checks if value is *loose not equal* to any other value.
 *
 * Returns self directly if others is empty.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(notEqOr(1, '1', 1), false)
 * assert.deepStrictEqual(notEqOr(1, 1, 2), true)
 * ```
 */
export function notEqOr<A>(self: A): A
export function notEqOr(self: unknown, ...others: unknown[]): boolean
export function notEqOr<A>(self: A, ...others: unknown[]): A | boolean {
  if(isEmpty(others)) return self

  return others.some(other => !isEqual(self, other))
}

/**
 * Checks if value is *strict equal* to any other value.
 *
 * Returns self directly if others is empty.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(strictEqOr(1, 2, 3), false)
 * assert.deepStrictEqual(strictEqOr(1, '1', 3), false)
 * assert.deepStrictEqual(strictEqOr(1, 1, 3), true)
 * ```
 */
export function strictEqOr<A>(self: A): A
export function strictEqOr(self: unknown, ...others: unknown[]): boolean
export function strictEqOr<A>(self: A, ...others: unknown[]): A | boolean {
  if(isEmpty(others)) return self

  return others.some(other => isStrictEqual(self, other))
}

/**
 * Checks if value is *strict not equal* to any other value.
 *
 * Returns self directly if others is empty.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(strictNotEqOr(1, 1, 1), false)
 * assert.deepStrictEqual(strictNotEqOr(1, 2, 3), true)
 * assert.deepStrictEqual(strictNotEqOr(1, '1', 1), true)
 * ```
 */
export function strictNotEqOr<A>(self: A): A
export function strictNotEqOr(self: unknown, ...others: unknown[]): boolean
export function strictNotEqOr<A>(self: A, ...others: unknown[]): A | boolean {
  if(isEmpty(others)) return self

  return others.some(other => !isStrictEqual(self, other))
}

/**
 * Checks if value is *loose equal* to every other value.
 *
 * Returns self directly if others is empty.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(eqAnd(1, 2, 3), false)
 * assert.deepStrictEqual(eqAnd(1, '1', 3), false)
 * assert.deepStrictEqual(eqAnd(1, '1', true), true)
 * ```
 */
export function eqAnd<A>(self: A): A
export function eqAnd(self: unknown, ...others: unknown[]): boolean
export function eqAnd<A>(self: A, ...others: unknown[]): A | boolean {
  if(isEmpty(others)) return self

  return others.every(other => isEqual(self, other))
}

/**
 * Checks if value is *loose not equal* to every other value.
 *
 * Returns self directly if others is empty.
 *
 * @example
 *
 * ```ts
  assert.deepStrictEqual(notEqAnd(1), 1)
  assert.deepStrictEqual(notEqAnd(1, 2, 3), true)
  assert.deepStrictEqual(notEqAnd(1, '1', 3), false)
 * ```
 */
export function notEqAnd<A>(self: A): A
export function notEqAnd(self: unknown, ...others: unknown[]): boolean
export function notEqAnd<A>(self: A, ...others: unknown[]): A | boolean {
  if(isEmpty(others)) return self

  return others.every(other => !isEqual(self, other))
}


/**
  * Checks if value is *strict equal* to every other value.
  *
  * Returns self directly if others is empty.
  *
  * @example
  *
  * ```ts
  * assert.deepStrictEqual(strictEqAnd(1, 2, 3), false)
  * assert.deepStrictEqual(strictEqAnd(1, 1, 2), false)
  * assert.deepStrictEqual(strictEqAnd(1, 1, 1), true)
  * ```
  */
export function strictEqAnd<A>(self: A): A
export function strictEqAnd(self: unknown, ...others: unknown[]): boolean
export function strictEqAnd<A>(self: A, ...others: unknown[]): A | boolean {
  if(isEmpty(others)) return self

  return others.every(other => isStrictEqual(self, other))
}

/**
  * Checks if value is *strict not equal* to every other value.
  *
  * Returns self directly if others is empty.
  *
  * @example
  *
  * ```ts
  assert.deepStrictEqual(strictNotEqAnd(1, 2, 3), true)
  assert.deepStrictEqual(strictNotEqAnd(1, '1', 2), true)
  assert.deepStrictEqual(strictNotEqAnd(1, 1, 1), false)
  * ```
  */
export function strictNotEqAnd<A>(self: A): A
export function strictNotEqAnd(self: unknown, ...others: unknown[]): boolean
export function strictNotEqAnd<A>(self: A, ...others: unknown[]): A | boolean {
  if(isEmpty(others)) return self

  return others.every(other => !isStrictEqual(self, other))
}
