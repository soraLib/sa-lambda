

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

/**
 * instance `of` operation.
 */
export const of = <A>(...as: A[]): Seq<A> => seq(as)

/**
 * instance `map` operation.
 */
export function* map<A, B>(ma: Iterable<A>, f: (a: A) => B): Iterable<B> {
  for (const a of ma) {
    yield f(a)
  }
}

/**
 * @internal
 */
const _getStep = (step: number): number => {
  step = Math.abs(step)

  return step <= 0 ? 1 : step
}

/**
 * Creates a `Seq` from a range starting from 0 and to the with step.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(to(3).arr, [1, 2])
 * assert.deepStrictEqual(to(6, 2).arr, [0, 2, 4])
 * ```
 */
export const to = (end: number, step = 1): Seq<number> => {
  step = _getStep(step)

  return new Seq(function* () {
    for (let i = 0; i < end; i += step) {
      yield i
    }
  })
}

/**
 * Creates a `Seq` from a given range with step.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(range(1, 3).arr, [1, 2])
 * assert.deepStrictEqual(range(1, 6, 2).arr, [1, 3, 5])
 * assert.deepStrictEqual(range(3, 1).arr, [3, 2])
 * ```
 */
export const range = (from: number, end: number, step = 1): Seq<number> => {
  step = _getStep(step)

  return new Seq(function* () {
    if(from > end) {
      for (let i = from; i > end; i -= step) {
        yield i
      }
    } else {
      for (let i = from; i < end; i += step) {
        yield i
      }
    }
  })
}

/**
 * Creates a `Seq` from values initialized with `f(i)`.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(makeBy(3, n => n * 2).arr, [0, 2, 4])
 * ```
 */
export const makeBy = <A>(n: number, f: (i: number) => A): Seq<A> => {
  return new Seq(function* () {
    for(let i = 0; i < n; i++) {
      yield f(i)
    }
  })
}

/**
 * Creates a `Seq` from a value repeated the specified number of times.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(replicate('a', 2).arr, ['a', 'a'])
 * ```
 */
export const replicate = <A>(a: A, n: number): Seq<A> => {
  return new Seq(function* () {
    for (let i = 0; i < n; i++) {
      yield a
    }
  })
}

/**
 * Creates an array from an iterator.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual([1, 2, 3], [1, 2, 3]))
 * assert.deepStrictEqual(function* () {
 *  for(let i = 1; i <=3; i++) yield i
 * }, [1, 2, 3]))
 * ```
 */
export const collect = <A>(ma: Iterable<A>): A[] => [...ma]

/**
 * Returns a string with all the item of an iterator, separated by the specified separator string.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(join(['a', 'b', 'c'], '-')), 'a-b-c')
 * ```
 */
export const join = <A>(ma: Iterable<A>, seperator?: string): string => collect(ma).join(seperator)


/**
 * Returns the count of the iterator.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(count([1, 2, 3]), 3)
 * assert.deepStrictEqual(function* () {
 *  yield 1
 *  yield 2
 *  yield 3
 * }, 3)
 * ```
 */
export const count = <A>(ma: Iterable<A>): number => {
  if ('length' in ma) return (ma as A[]).length
  if ('size' in ma) return (ma as any).size

  return collect(ma).length
}

/**
 * Takes two iterator and returns an iterator of the function results. If one iterator is short, excess items of the longer iterator are discarded.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(zipWith([1, 2], [1, 2], (a, b) => a + b), [2, 4])
 * assert.deepStrictEqual(zipWith(function* () { yield 1 }, [1, 2], (a, b) => a + b), [2])
 * ```
 */
export function* zipWith<A, B, C>(a: Iterable<A>, b: Iterable<B>, f: (a: A, b: B) => C): Iterable<C> {
  const ai = a[Symbol.iterator]()
  const bi = b[Symbol.iterator]()

  for(;;) {
    const a = ai.next()
    if(a.done) return
    const b = bi.next()
    if(b.done) return

    yield f(a.value, b.value)
  }
}

/**
 * Takes two iterator and returns an iterator of corresponding pairs. If one iterator is short, excess items of the longer iterator are discarded.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(zip([1, 2], [1, 2]), [[1, 1], [2, 2]])
 * assert.deepStrictEqual(zip(function* () { yield 1 }, [1, 2]), [[1, 1]])
 * ```
 */
export function* zip<A, B>(a: Iterable<A>, b: Iterable<B>): Iterable<[A, B]> {
  const ai = a[Symbol.iterator]()
  const bi = b[Symbol.iterator]()

  for(;;) {
    const a = ai.next()
    if(a.done) return
    const b = bi.next()
    if(b.done) return

    yield [a.value, b.value]
  }
}

/**
 * Similar as reverse of `zip`. Takes an iterator of pairs but returns two corresponding arrarys.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(unzip([[1, 2], [3, 4]]), [[1, 3], [2, 4]])
 * ```
 */
export const unzip = <A, B>(ma: Iterable<[A, B]>): [A[], B[]] => {
  const fa: A[] = []
  const fb: B[] = []
  for (const a of ma) {
    fa.push(a[0])
    fb.push(a[1])
  }

  return [fa, fb]
}

/**
 * Takes an iterator of iterators of `A` and flattens them into an iterator of `A`.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(flatten([["a"], ["b", "c"], ["d", "e", "f"]]), ["a", "b", "c", "d", "e", "f"])
 * ```
 */
export function* flatten<A>(ma: Iterable<Iterable<A>>): Iterable<A> {
  for (const item of ma) {
    yield* item
  }
}

export class Seq<A> implements Iterable<A> {
  constructor(public readonly iter: () => Iterable<A>) {}

  [Symbol.iterator](): Iterator<A> {
    return this.iter()[Symbol.iterator]()
  }

  get arr() {
    return this.toArray()
  }

  static of = of
  static to = to
  static range = range
  static makeBy = makeBy
  static replicate = replicate

  map = <B>(f: (a: A) => B) => seq(map(this.iter(), f))
  toArray = (): A[] => toArray(this.iter())
  isEmpty= (): boolean => isEmpty(this.iter())
  push = (...as: A[]): Seq<A> => seq(push(this.iter(), ...as))
  unshift = (...as: A[]): Seq<A> => seq(unshift(this.iter(), ...as))
  collect = (): A[] => collect(this.iter())
  join = (seperator?: string) => join(this.iter(), seperator)
  count = () => count(this.iter())
  zipWith = <B, C>(b: Iterable<B>, f: (a: A, b: B) => C) => seq(zipWith(this.iter(), b, f))
  zip = <B>(b: Iterable<B>) => seq(zip(this.iter(), b))
  unzip = (): [
    (A extends [infer X, any] | readonly [infer X, any] | (infer X)[] ? X : unknown)[],
    (A extends [any, infer Y] | readonly [any, infer Y] | (infer Y)[] ? Y : unknown)[],
  ] => unzip(this.iter() as any)
  flatten = (): A extends Iterable<infer R> ? Seq<R> : never => seq(flatten(this.iter() as any)) as any
}

/**
 * Creates a `Seq` from an iterator.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(seq([1]), new Seq(() => [1]))
 * ```
 */
export const seq = <A>(ma: Iterable<A>): Seq<A> => new Seq(() => ma)
