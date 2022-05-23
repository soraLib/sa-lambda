

/**
 * Returns whether the array-like object is empty.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(isEmpty([]), true)
 * assert.deepStrictEqual(isEmpty(new Map()), true)
 * assert.deepStrictEqual(isEmpty(new Set()), true)
 * assert.deepStrictEqual(isEmpty({ [Symbol.iterator]: function*() {} }), true)
 * ```
 */
export const isEmpty = <A>(ma: Iterable<A>): boolean => {
  if ('length' in ma) return (ma as any).length == 0
  if ('size' in ma) return (ma as any).size == 0
  for (const _ of ma) return false

  return true
}

/**
 * Returns if it's instanceof `Array`, otherwise returns a new array created by `Array.from`.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(toArray([1, 2, 3]), [1, 2, 3])
 * ```
 */
export const toArray = <A>(ma: Iterable<A>): A[] => ma instanceof Array ? ma : Array.from(ma)

export function* push<A>(a: Iterable<A>, ...as: A[]): Iterable<A> {
  yield* a
  yield* as
}

export function* unshift<T>(a: Iterable<T>, ...items: T[]): Iterable<T> {
  yield* items
  yield* a
}

export class Seq<A> implements Iterable<A> {
  constructor(public readonly iter: () => Iterable<A>) {}

  [Symbol.iterator](): Iterator<A> {
    return this.iter()[Symbol.iterator]()
  }

  get arr() {
    return this.toArray()
  }

  toArray(): A[] {
    return toArray(this.iter())
  }

  isEmpty() {
    return isEmpty(this.iter())
  }

  push(...as: A[]): Seq<A> {
    return new Seq(() => push(this, ...as))
  }

  unshift(...as: A[]): Seq<A> {
    return new Seq(() => unshift(this, ...as))
  }
}

export const seq = <A>(ma: Iterable<A>): Seq<A> => new Seq(() => ma)
