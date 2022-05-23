import { Predicate } from './Predicate'

export interface Left<E> {
  readonly _tag: 'Left'
  readonly left: E
}

export interface Right<A> {
  readonly _tag: 'Right'
  readonly right: A
}

export type Either<E, B> = Left<E> | Right<B>

/**
 * Constructs a new `Either` holding a `Left` value. Represents a failure value.
 */
export const left = <E, A = never>(e: E): Either<E, A> => ({ _tag: 'Left', left: e })
/**
 * Constructs a new `Either` holding a `Right` value. Represents a successful value.
 */
export const right = <A, E = never>(a: A): Either<E, A> => ({ _tag: 'Right', right: a })

/**
 * Returns whether the Either is `Left` or not.
 *
 * ```ts
 * assert.deepStrictEqual(isLeft(left(0)), true)
 * assert.deepStrictEqual(isLeft(right(1)), false)
 * ```
 */
export const isLeft = <E>(ma: Either<E, unknown>): ma is Left<E> => ma._tag === 'Left'
/**
 * Returns whether the Either is `Right` or not.
 *
 * ```ts
 * assert.deepStrictEqual(isRight(right(1)), true)
 * assert.deepStrictEqual(isRight(left(0)), false)
 * ```
 */
export const isRight = <A>(ma: Either<unknown, A>): ma is Right<A> => ma._tag === 'Right'

/**
 * instance `map` operation.
 */
export const map = <A, B>(f: (a: A) => B) => <E>(ma: Either<E, A>) => isLeft(ma) ? ma : right(f(ma.right))

/**
 * instance `of` operation.
 */
export const of = right

/**
 * Returns `Left` or `Right` based on the given predicate.
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
export function fromPredicate<A, E>(predicate: Predicate<A>, onFalse: () => E): <B extends A>(b: B) => Either<E, B>
export function fromPredicate<A, E>(predicate: Predicate<A>, onFalse: () => E): (a: A) => Either<E, A>
export function fromPredicate<A, E>(predicate: Predicate<A>, onFalse: () => E): (a: A) => Either<E, A> {
  return (a) => predicate(a) ? right(a) : left(onFalse())
}

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
