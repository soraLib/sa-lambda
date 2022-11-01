/**
 * Maps a value.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(pipe(1, map(n => n + 1)), 2)
 * ```
 */
export const map = <A, B>(f: (a: A) => B) => (a: A) => f(a)


/**
 * Uses a value to make a mapping.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(used(1, n => n + 1), 2)
 * ```
 */
export const use = <A, B>(a: A, f: (a: A) => B): B => f(a)

/**
 * Uses a value to do something extra.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(also(1, () => void 0), 1)
 * ```
 */
export const also = <A>(a: A, f: (a: A) => void): A => (f(a), a)


/**
 * Returns onTrue result if the condition is Truthy, otherwise returns the onFalse result.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(pipe(true, match(() => 1, () => 0)), 1)
 * assert.deepStrictEqual(pipe(false, match(() => 1, () => 0)), 0)
 * ```
 */
export const match = <A, B>(onTrue: () => A, onFalse: () => B) => (condition: boolean): A | B => condition ? onTrue() : onFalse()

/**
 * Gets a value from source by the given key.
 *
 * Sets a value with the initial function if source doesn't [has](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn) the key.
 *
 * @example
 *
 * ```ts
 * const source: Record<string, number> = { a: 0 }
 * assert.deepStrictEqual(getOrSet(source, 'a', () => 1), 0)
 * assert.deepStrictEqual(getOrSet(source, 'b', () => 1), 1)
 * assert.deepStrictEqual(source['b']), 1)
 * ```
 */
export const getOrSet = <T extends Record<string, unknown>, K extends keyof T>(
  source: T,
  key: K,
  initialValue: () => T[K]
): T[K] => Object.hasOwn(source, key) ? source[key] : (source[key] = initialValue())
