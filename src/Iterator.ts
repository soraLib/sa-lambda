import { flow, pipe } from './Pipe'
import { Predicate } from './Predicate'
import { some, none, getOrElse } from './Maybe'
import { Alternative1 } from './Functors/Alternative'
import { Lazy } from './function'
import { Monad1 } from './Functors/Monad'
import { ChainRec1 } from './Functors/ChainRec'
import { Either, isLeft } from './Either'


export const IterKind = Symbol('Iterator')
export type IterKind = typeof IterKind

declare module './Functors/HKT' {
  interface Kinded<T> {
    readonly [IterKind]: Iterable<T[0]>
  }
}

/**
 * Returns whether an iterator is empty.
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const _ of ma) return false

  return true
}

/**
 * Returns if the iterator is instanceof `Array`, otherwise returns a new array created by `Array.from`.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(toArray([1, 2, 3]), [1, 2, 3])
 * assert.deepStrictEqual(toArray(new Set([1, 2, 3])), [1, 2, 3])
 * ```
 */
export const toArray = <A>(ma: Iterable<A>): A[] => ma instanceof Array ? ma : Array.from(ma)

/**
 * Returns an iterator with the elements at last.
 */
export function* push<A>(a: Iterable<A>, ...as: A[]): Iterable<A> {
  yield* a
  yield* as
}

/**
 * Returns an iterator with the elements at start.
 */
export function* unshift<T>(a: Iterable<T>, ...items: T[]): Iterable<T> {
  yield* items
  yield* a
}

/**
 * Creates an iterator with an array.
 */
export function* of<A>(...as: A[]): Iterable<A> {
  for(const a of as) {
    yield a
  }
}

/**
 * Returns an empty list.
 * @returns
 */
export const empty = <A>(): Iterable<A> => []
/**
 * Alias of `empty`.
 */
export const zero = empty

/**
 * Calls a callback function on each element of the iterator, and returns an iterator contains the results.
 */
export const map = <A, B>(f: (a: A) => B) => function* (ma: Iterable<A>): Iterable<B> {
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
 * Creates an iterator from a given range with step.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(flow(range, collect)(1, 3), [1, 2])
 * assert.deepStrictEqual(flow(range, collect)(1, 6, 2), [1, 3, 5])
 * assert.deepStrictEqual(flow(range, collect)(3, 1), [3, 2])
 * ```
 */
export function* range(from: number, end: number, step = 1): Iterable<number> {
  step = _getStep(step)

  if(from > end) {
    for (let i = from; i > end; i -= step) {
      yield i
    }
  } else {
    for (let i = from; i < end; i += step) {
      yield i
    }
  }
}

/**
 * Creates an iterator from a range starting from `0` to end with step.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(flow(to, collect)(3), [1, 2])
 * assert.deepStrictEqual(flow(to, collect)(6, 2), [0, 2, 4])
 * ```
 */
export const to = (end: number, step = 1): Iterable<number> => range(0, end, step)


/**
 * Creates an iterator of length `n` initialized with `f(i)`.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(flow(makeBy, collect)(3, n => n * 2), [0, 2, 4])
 * ```
 */
export function* makeBy<A>(n: number, f: (i: number) => A): Iterable<A> {
  for(let i = 0; i < n; i++) {
    yield f(i)
  }
}

/**
 * Creates an iterator from a value repeated the specified number of times.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(flow(replicate, collect)('a', 2), ['a', 'a'])
 * ```
 */
export const replicate = <A>(ma: A, n: number): Iterable<A> => makeBy(n, () => ma)

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
 * Adds all the elements of an iterator into a string, separated by the specified separator string.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(pipe(['a', 'b', 'c'], join('-')), 'a-b-c')
 * ```
 */
export const join = (seperator?: string) => <A>(ma: Iterable<A>): string => collect(ma).join(seperator)

/**
 * Returns the length or size of an iterator.
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
 * Returns an iterator that elements meet the condition specified in a predicate function.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3, 4],
 *     filter(a => a % 2 === 0)
 *   ),
 *   [2, 4]
 * )
 * ```
 */
export const filter = <A>(predicate: Predicate<A>) => function* (ma: Iterable<A>): Iterable<A> {
  for(const a of ma) {
    if(predicate(a)) {
      yield a
    }
  }
}

/**
 * Concats two iterators that have different types.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(pipe([1], alt(() => ['2', '3']), collect), [1, '2', '3'])
 * ```
 */
export const alt = <B>(that: Lazy<Iterable<B>>) => <A>(ma: Iterable<A>): Iterable<A | B> => pipe(ma, concat(that()))

/**
 * Chains the result of the applying function to the iterator with the other.
 *
 * @example
 *
 * ```ts
 * const f = (s: string) => (n: number) => s + n
 * assert.deepStrictEqual(pipe(['a', 'b'], map(f), ap([1, 2]), collect), ['a1', 'a2', 'b1', 'b2'])
 * ```
 */
export const ap: <A>(ma: Iterable<A>) => <B>(f: Iterable<(a: A) => B>) => Iterable<B> = ma => chain(f => pipe(ma, map(f)))

/**
 * Calls the specified callback function for all the elements in an iterator.
 * The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(
 *   pipe([2, 3, 4], reduce((acc: number, cur: number) => acc + cur, 1)), 10
 * )
 * ```
 */
export function reduce<A>(f:(b: A, a: A, i: number, as: Iterable<A>) => A): (as: Iterable<A>) => A
export function reduce<A>(f:(b: A, a: A, i: number, as: Iterable<A>) => A, b: A): (as: Iterable<A>) => A
export function reduce<A, B>(f:(b: B, a: A, i: number, as: Iterable<A>) => B, b: B): (as: Iterable<A>) => B
export function reduce<A, B>(f:(b: B, a: A, i: number, as: Iterable<A>) => B, b?: B): (as: Iterable<A>) => B {
  return (as: Iterable<A>) => {
    let cur = 0
    let ret: B

    if(arguments.length === 1) {
      ret = pipe(as, head, getOrElse(() => { throw '[ERR]: Reduce of empty iterator with no initial value ' })) as unknown as B
      cur = 1
      let i = 0

      for(const a of as) {
        if(i === cur) {
          ret = f(ret, a, i, as)
          cur++
        }
        i++
      }
    } else {
      ret = b!
      for(const a of as) {
        ret = f(ret, a, cur, as)
        cur++
      }
    }

    return ret
  }
}

/**
 * Returns `Some` the first element of an iterable if it exists, otherwise returns `None`.
 *
 * @example
 *
 * assert.deepStrictEqual(head([1, 2, 3]), some(1))
 * assert.deepStrictEqual(head([]), none)
 */
export const head = <A>(ma: Iterable<A>) => {
  for(const a of ma) {
    return some(a)
  }

  return none
}

/**
 * Returns `Some` the last element of an iterable if it exists, otherwise returns `None`.
 *
 * @example
 *
 * assert.deepStrictEqual(tail([1, 2, 3]), some(3))
 * assert.deepStrictEqual(tail([]), none)
 */
export const tail = <A>(ma: Iterable<A>) => {
  let i = 1
  const len = count(ma)
  for(const a of ma) {
    if(i === len) return some(a)
    i++
  }

  return none
}

/**
 * Combines two or more iterators.
 *
 * @example
 *
 * assert.deepStrictEqual(pipe([1], concat([2, 3], [4, 5]), collect), [1, 2, 3, 4, 5])
 */
export const concat = <A>(...items: Iterable<A>[]) => function*<B>(ma: Iterable<B>): Iterable<A | B> {
  for(const a of ma) {
    yield a
  }
  for(const item of items) {
    for(const b of item) {
      yield b
    }
  }
}


/**
 * Takes two iterator and returns an iterator of the function results. If one iterator is short, excess items of the longer iterator are discarded.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(flow(zipWith, collect)([1, 2], [1, 2], (a, b) => a + b), [2, 4])
 * assert.deepStrictEqual(flow(zipWith, collect)(function* () { yield 1 }, [1, 2], (a, b) => a + b), [2])
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
 * assert.deepStrictEqual(flow(zip, collect)([1, 2], [1, 2]), [[1, 1], [2, 2]])
 * assert.deepStrictEqual(flow(zip, collect)(function* () { yield 1 }, [1, 2]), [[1, 1]])
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
export const unzip = <A, B>(as: Iterable<[A, B]>): [A[], B[]] => {
  const fa: A[] = []
  const fb: B[] = []
  for (const a of as) {
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
export function* flatten<A>(as: Iterable<Iterable<A>>): Iterable<A> {
  for (const a of as) {
    yield* a
  }
}

/**
 * Returns an iterator that concatenates the function result into a single interator (like [`flatten`](#flatten)).
 *
 * @example
 *
 * ```ts
 * const f = (n: number) => flow(replicate, collect)(`${n}`, n)
 *
 * assert.deepStrictEqual(pipe([1,2,3], map(f), collect), [['1'],['2','2'],['3','3','3']])
 * assert.deepStrictEqual(pipe([1,2,3], chain(f), collect), ['1','2','2','3','3','3'])
 * ```
 */
export const chain = <A, B>(f: (a: A, i: number) => Iterable<B>) => function* (as: Iterable<A>): Iterable<B> {
  let i = 0
  for (const item of as) {
    yield* f(item, i)
    i++
  }
}

/**
 * Depth-first chainRec.
 *
 * Chains until the next iterable is empty.
 *
 * @example
 *
 * ```ts
 * const f = (n: number) => n < 5 ? [right(n), left(n + 1)] : [right(n)]
 * assert.deepStrictEqual(pipe(1, chainRec(f), collect), [1, 2, 3, 4, 5])
 *
 * const f2 = (n: number) => n < 5 ? [left(n + 1), right(n)] : [right(n)]
 * assert.deepStrictEqual(pipe(1, chainRec(f2), collect), [5, 4, 3, 2, 1])
 * ```
 */
export const chainRec = <A, B>(f: (a: A) => Iterable<Either<A, B>>) => function* (a: A): Iterable<B> {
  const next: Array<Either<A, B>> = collect(f(a))
  const out: Array<B> = []

  while (count(next)) {
    const e = next.shift()!
    if (isLeft(e)) {
      next.unshift(...f(e.left))
    } else {
      out.push(e.right)
    }
  }

  return yield* out
}

/**
 * Creates an `Iter` from an iterator.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(iter([1]), new Iter(() => [1]))
 * ```
 */
export const iter = <A>(ma: Iterable<A>): Iter<A> => new Iter(() => ma)

/**
 * Iter
 */
export class Iter<A> implements Iterable<A> {
  constructor(private readonly _iter: () => Iterable<A>) {}

  [Symbol.iterator](): Iterator<A> {
    return this._iter()[Symbol.iterator]()
  }

  get arr() {
    return this.toArray()
  }

  static zero = flow(zero, iter)
  static of = flow(of, iter)
  static to = flow(to, iter)
  static range = flow(range, iter)
  static makeBy = flow(makeBy, iter)
  static replicate = flow(replicate, iter)

  head = () => head(this._iter())
  tail = () => tail(this._iter())
  map = <B>(f: (a: A) => B) => pipe(this._iter(), map(f), iter)
  toArray = (): A[] => toArray(this._iter())
  isEmpty= (): boolean => isEmpty(this._iter())
  push = (...as: A[]): Iter<A> => flow(push, iter)(this._iter(), ...as)
  unshift = (...as: A[]) => flow(unshift, iter)(this._iter(), ...as)
  filter = (predicate: Predicate<A>) => pipe(this._iter(), filter(predicate), iter)
  reduce = <B>(f:(b: B, a: A) => B, b: B) => pipe(this._iter(), reduce(f, b))
  collect = (): A[] => collect(this._iter())
  join = (seperator?: string) => pipe(this._iter(), join(seperator))
  count = () => count(this._iter())
  zipWith = <B, C>(b: Iterable<B>, f: (a: A, b: B) => C) => flow(zipWith, iter)(this._iter(), b, f)
  zip = <B>(b: Iterable<B>) => flow(zip, iter)(this._iter(), b)
  unzip = (): Iter<[
    (A extends [infer X, any] | readonly [infer X, any] | (infer X)[] ? X : unknown)[],
    (A extends [any, infer Y] | readonly [any, infer Y] | (infer Y)[] ? Y : unknown)[],
  ]> => flow(unzip, iter)(this._iter() as any) as any
  flatten = (): A extends Iterable<infer R> ? Iter<R> : never => pipe(this._iter() as any, flatten, iter) as any
  chain = <B>(f: (a: A, i: number) => Iterable<B>) => pipe(this._iter(), chain(f), iter)
  concat = <B>(...items: Iterable<B>[]) => pipe(this._iter(), concat(items), iter)
  ap = <B>(ma: A extends (a: B) => any ? Iterable<B> : never): Iter<A extends (a: B) => any ? ReturnType<A> : never> => pipe(this._iter() as any, ap(ma), iter) as any
  alt = <B>(that: Lazy<Iterable<B>>) => pipe(this._iter(), alt(that), iter)
}

// none-pipeables
const _map: Alternative1<IterKind>['map'] = (ma, f) => pipe(ma, map(f))
const _alt: Alternative1<IterKind>['alt'] = (ma, f) => pipe(ma, alt(f))
const _ap: Alternative1<IterKind>['ap'] = (f, ma) => pipe(f, ap(ma))
const _chain: Monad1<IterKind>['chain'] = (ma, f) => pipe(ma, chain(f))
const _chainRec: ChainRec1<IterKind>['chainRec'] = (ma, f) => pipe(ma, chainRec(f))

/**
 * Alternative Functor
 */
export const Alternative: Alternative1<IterKind> = {
  URI: IterKind,
  of,
  zero,
  map: _map,
  alt: _alt,
  ap: _ap
}

/**
 * Monad Functor
 */
export const Monad: Monad1<IterKind> = {
  URI: IterKind,
  of,
  ap: _ap,
  map: _map,
  chain: _chain
}

/**
 * ChainRec Functor
 */
export const ChainRec: ChainRec1<IterKind> = {
  URI: IterKind,
  ap: _ap,
  map: _map,
  chain: _chain,
  chainRec: _chainRec
}
