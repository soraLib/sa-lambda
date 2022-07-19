import { Lazy } from './function'
import { Predicate } from './Predicate'
import { isNone, Maybe, none, some } from './Maybe'
import { pipe } from './Pipe'
import { Alternative2 } from './Functors/Alternative'
import { Monad2 } from './Functors/Monad'
import { Alt2 } from './Functors/Alt'
import { ChainRec2 } from './Functors/ChainRec'

export interface Left<E> {
  readonly _tag: 'Left'
  readonly left: E
}

export interface Right<A> {
  readonly _tag: 'Right'
  readonly right: A
}

export type Either<E, B> = Left<E> | Right<B>

export const EitherKind = Symbol('Either')
export type EitherKind = typeof EitherKind

declare module './Functors/HKT' {
  interface Kinded<T> {
    readonly [EitherKind]: Either<T[0], T[1]>
  }
}

/**
 * Constructs a new `Either` holding a `Left` value. Represents a failure value.
 */
export const left = <E, A = never>(e: E): Either<E, A> => ({ _tag: 'Left', left: e })
/**
 * Constructs a new `Either` holding a `Right` value. Represents a successful value.
 */
export const right = <A, E = never>(a: A): Either<E, A> => ({ _tag: 'Right', right: a })

/**
 * Returns whether the `Either` is `Left` or not.
 *
 * ```ts
 * assert.deepStrictEqual(isLeft(left(0)), true)
 * assert.deepStrictEqual(isLeft(right(1)), false)
 * ```
 */
export const isLeft = <E>(ma: Either<E, unknown>): ma is Left<E> => ma._tag === 'Left'
/**
 * Returns whether the `Either` is `Right` or not.
 *
 * ```ts
 * assert.deepStrictEqual(isRight(right(1)), true)
 * assert.deepStrictEqual(isRight(left(0)), false)
 * ```
 */
export const isRight = <A>(ma: Either<unknown, A>): ma is Right<A> => ma._tag === 'Right'

/**
 * Maps the `Right` value.
 */
export const map = <A, B>(f: (a: A) => B) => <E>(ma: Either<E, A>) => isLeft(ma) ? ma : right(f(ma.right))

/**
 * Takes a value and wraps it into a `Right`.
 */
export const of = right

/**
 * Returns the `Either` if it is `Right`, otherwise returns the function result.
 */
export const alt = <E2, B>(that: Lazy<Either<E2, B>>) => <E1, A>(ma: Either<E1, A>): Either<E2, A | B> =>
  isLeft(ma) ? that() : ma

/**
 * Applies a `Right` function over a `Right` value. Returns `Left` if the `Either` or the function is `Left`.
 */
export const ap = <E2, A>(ma: Either<E2, A>) => <E1, B>(fab: Either<E1, (a: A) => B>): Either<E1 | E2, B> =>
  isLeft(fab) ? fab : isLeft(ma) ? ma : right(fab.right(ma.right))

/**
 * Constructs a `Left` or `Right` based on the given predicate.
 *
 * @example
 *
 * ```ts
 * const getEither = fromPredicate((n: number) => n > 0, () => 'error')
 *
 * assert.deepStrictEqual(getEither(1), right(1))
 * assert.deepStrictEqual(getEither(-1), left('error'))
 * ```
 */
export function fromPredicate<A, E>(predicate: Predicate<A>, onFalse: Lazy<E>): <B extends A>(b: B) => Either<E, B>
export function fromPredicate<A, E>(predicate: Predicate<A>, onFalse: Lazy<E>): (a: A) => Either<E, A>
export function fromPredicate<A, E>(predicate: Predicate<A>, onFalse: Lazy<E>): (a: A) => Either<E, A> {
  return (a) => predicate(a) ? right(a) : left(onFalse())
}

/**
 * Returns `Left` or `Right` based on the given `Maybe`.
 *
 * @example
 *
 * ```ts
 * const f = flow(
 *   fromMaybe(() => 'error')
 * )
 *
 * assert.deepStrictEqual(f(some(1)), right(1))
 * assert.deepStrictEqual(f(none), left('error'))
 * ```
 */
export const fromMaybe = <E>(onNone: Lazy<E>) => <A>(ma: Maybe<A>) => isNone(ma) ? left(onNone()) : right(ma.value)

/**
 * Takes two functions and an `Either` value, if the value is `Left`,
 * returns the `onLeft` function result, if the value is `Right`, returns the `onRight` function result.
 *
 * @example
 *
 * ```ts
 * const f = match((n: number) => n - 1, (n: number) => n + 1)
 *
 * assert.deepStrictEqual(f(left(1)), 0)
 * assert.deepStrictEqual(f(right(1)), 2)
 * ```
 */
export const match = <E, B, A, C>(onLeft: (e: E) => B, onRight: (a: A) => C) => (ma: Either<E, A>): B | C =>
  isLeft(ma) ? onLeft(ma.left) : onRight(ma.right)

/**
 * Returns the `Either` value if it's a `Right` or a default `onLeft` result value if it's a `Left`.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(getOrElse(() => 0)(left(1)), 0)
 * assert.deepStrictEqual(getOrElse(() => 0)(right(1)), 1)
 * ```
 */
export const getOrElse = <E, B>(onLeft: (e: E) => B) => <A>(ma: Either<E, A>): A | B =>
  isLeft(ma) ? onLeft(ma.left) : ma.right

/**
 * Returns the `Left` value of an `Either` if possible.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(getLeft(right(1)), none)
 * assert.deepStrictEqual(getLeft(left(1)), some(1))
 * ```
 */
export const getLeft = <E, A>(ma: Either<E, A>): Maybe<E> =>
  isRight(ma) ? none : some(ma.left)

/**
 * Returns the `Right` value of an `Either` if possible.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(getRight(right(1)), some(1))
 * assert.deepStrictEqual(getRight(left(1)), none)
 * ```
 */
export const getRight = <E, A>(ma: Either<E, A>): Maybe<A> =>
  isRight(ma) ? some(ma.right) : none

/**
 * Composes computations in sequence. Useful for chaining many computations that may fail.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(chain((n: number) => right(n + 1))(left(1)), left(1))
 * assert.deepStrictEqual(chain((n: number) => right(n + 1))(right(1)), right(2))
 * ```
 */
export const chain = <E2, A, B>(f: (a: A) => Either<E2, B>) => <E1>(ma: Either<E1, A>): Either<E1 | E2, B> =>
  isLeft(ma) ? ma : f(ma.right)

/**
 * Returns `Either` if it's a `Right`, otherwise returns onLeft result.
 *
 * @example
 *
 * assert.deepStrictEqual(orElse((n: number) => right(n + 1))(left(1)), right(2))
 * assert.deepStrictEqual(orElse((n: number) => right(n + 1))(right(1)), right(1))
 */
export const orElse = <E1, E2, B>(onLeft: (e: E1) => Either<E2, B>) => <A>(ma: Either<E1, A>): Either<E2, A | B> =>
  isLeft(ma) ? onLeft(ma.left) : ma

/**
 * Returns `false` if `Either` is a `Left`, otherwise returns the predicate result.
 *
 * @example
 *
 * assert.deepStrictEqual(exists((n: number) => n > 0)(left(0)), false)
 * assert.deepStrictEqual(exists((n: number) => n > 0)(right(0)), false)
 * assert.deepStrictEqual(exists((n: number) => n > 0)(right(1)), true)
 */
export const exists = <A>(predicate: Predicate<A>) => <E>(ma: Either<E, A>): boolean =>
  isLeft(ma) ? false : predicate(ma.right)

/**
 *  Returns a `Either` from a function that might throw.
 *
 * @example
 *
 * ```ts
 * const unsafeDiv = (top: number, bottom: number) => {
 *   if(bottom === 0) throw new Error('unsafe division')
 *   return top / bottom
 * }
 * const div = (top: number, bottom: number) =>
 *   tryCatch(() => unsafeDiv(top, bottom), () => 0)
 *
 * assert.deepStrictEqual(div(2, 0), left(0))
 * assert.deepStrictEqual(div(2, 1), right(2))
 * ```
 */
export const tryCatch = <E, A>(f: Lazy<A>, onThrow: (e: unknown) => E): Either<E, A> => {
  try {
    return right(f())
  } catch (e) {
    return left(onThrow(e))
  }
}

/**
 * Returns Right if `Either` is `Left` and vice versa.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(swap(right(1)), left(1))
 * assert.deepStrictEqual(swap(left(1)), right(1))
 * ```
 */
export const swap = <E, A>(ma: Either<E, A>): Either<A, E> =>
  isLeft(ma) ? right(ma.left) : left(ma.right)

/**
 * Compares one `Either` to another `Either`. Returns false if eithers or the wrapped values are different.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(equals(right(1), right(1)), true)
 * assert.deepStrictEqual(equals(right(2), right(1)), true)
 * assert.deepStrictEqual(equals(right(1), left(1)), false)
 * assert.deepStrictEqual(equals(left(1), left(1)), true)
 * assert.deepStrictEqual(equals(left(1), right(1)), false)
 * ```
 */
export const equals = <E, A>(a: Either<E, A>, b: Either<E, A>): boolean =>
  a === b || (isLeft(a) ? isLeft(b) && a.left === b.left : isRight(b) && a.right === b.right)


/**
 * Alias of `left`.
 */
export const zero = left

// none-pipeables
const _ap: Monad2<EitherKind>['ap'] = (fab, fa) => pipe(fab, ap(fa))
const _map: Monad2<EitherKind>['map'] = (ma, f) => pipe(ma, map(f))
const _alt: Alternative2<EitherKind>['alt'] = (ma, f) => pipe(ma, alt(f))
const _chain: Monad2<EitherKind>['chain'] = (ma, f) => pipe(ma, chain(f))

/**
 * Alt Functor
 */
export const Alt: Alt2<EitherKind> = {
  URI: EitherKind,
  map: _map,
  alt: _alt
}

/**
 * Monad Functor
 */
export const Monad: Monad2<EitherKind> = {
  URI: EitherKind,
  of,
  map: _map,
  ap: _ap,
  chain: _chain
}
