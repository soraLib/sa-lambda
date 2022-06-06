import { Predicate } from './Predicate'
import { Lazy, constNull, identity, constUndefined } from './function'
import { Either, right, left } from './Either'

export interface None {
  readonly _tag: 'None'
}

export interface Some<A> {
  readonly _tag: 'Some'
  readonly value: A
}

export type Maybe<A> = None | Some<A>

/**
 * Returns whether the maybe is `None` or not.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(isNone(none), true)
 * assert.deepStrictEqual(isNone(some(1)), false)
 * ```
 */
export const isNone = <A>(ma: Maybe<A>): ma is None => ma._tag === 'None'

/**
 * Returns whether the maybe is `Some` or not.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(isSome(some(1)), true)
 * assert.deepStrictEqual(isSome(none), false)
 * ```
 */
export const isSome = <A>(ma: Maybe<A>): ma is Some<A> => ma._tag === 'Some'

/**
 * `None` value. Represents a missing value.
 */
export const none: Maybe<never> = { _tag: 'None' }
/**
 * Constructs a `Some`. Represents an optional value that exists.
 */
export const some = <A>(value: A): Maybe<A> => ({ _tag: 'Some', value })

/**
 * Returns `Some` or `None` based on the given predicate.
 *
 * @example
 *
 * ```ts
 * const getMaybe = fromPredicate((n: number) => n > 0)
 *
 * assert.deepStrictEqual(getMaybe(-1), none)
 * assert.deepStrictEqual(getMaybe(1), some(1))
 * ```
 */
export function fromPredicate<A>(predicate: Predicate<A>): <B extends A>(b: B) => Maybe<B>
export function fromPredicate<A>(predicate: Predicate<A>): (a: A) => Maybe<A>
export function fromPredicate<A>(predicate: Predicate<A>): (a: A) => Maybe<A> {
  return (a) => (predicate(a) ? some(a) : none)
}

/**
 * Transforms the `Maybe` with a given function. Returns `None` if the `Maybe` is `None`.
 */
export const map = <A, B>(f: (a: A) => B) => (fa: Maybe<A>): Maybe<B> =>
  isNone(fa) ? none : some(f(fa.value))

/**
 * Takes a value and wraps it into a `Some`.
 */
export const of = some

/**
 * Returns the `Maybe` if it is `Some`, otherwise returns the function result.
 */
export const alt = <B>(that: Lazy<Maybe<B>>) => <A>(ma: Maybe< A>): Maybe<A | B> =>
  isNone(ma) ? that() : ma

/**
 * Applies a `Some` function over a `Some` value. Returns `None` if the `Maybe` or the function is `None`.
 */
export const ap = <A>(ma: Maybe<A>) => <B>(fab: Maybe<(a: A) => B>): Maybe<B> =>
  isNone(fab) ? none : isNone(ma) ? none : some(fab.value(ma.value))

/**
 * Returns `None`.
 */
export const empty = () => none

/**
 * Takes a predicate function and a `Maybe`, returns the `Maybe` if it's `Some` and the predicate returns true, otherwise returns `None`.
 *
 * @example
 *
 * ```ts
 * const f = flow(
 *  filter((n: number) => n > 0)
 * )
 *
 * assert.deepStrictEqual(f(some(1)), some(1))
 * assert.deepStrictEqual(f(some(0)), none)
 * assert.deepStrictEqual(none, none)
 * ```
 */
export const filter = <A>(predicate: Predicate<A>) => (ma: Maybe<A>): Maybe<A> =>
  isNone(ma) ? none : predicate(ma.value) ? ma : none

/**
 * Returns the callback function result, if the `Maybe` is `Some`, otherwise returns undefined.
 *
 * @example
 *
 * ```ts
 * const f = flow(
 *   then((n: number) => n + 1)
 * )
 *
 * assert.deepStrictEqual(f(some(1)), 2)
 * assert.deepStrictEqual(f(none), undefined)
 * ```
 */
export const then = <A, B>(f: (a: A) => B) => (ma: Maybe<A>): B | undefined =>
  isNone(ma) ? constUndefined() : f(ma.value)

/**
 * Returns the onNone default value if the `Maybe` is `None`, otherwise returns the onSome function result with `Maybe`.
 *
 * @example
 *
 * ```ts
 * const f = flow(
 *   match(() => 0, (n: number) => n + 1)
 * )
 *
 * assert.deepStrictEqual(f(some(1)), 2)
 * assert.deepStrictEqual(f(none), 1)
 * ```
 */
export const match = <B, A, C>(onNone: Lazy<B>, onSome: (a: A) => C) => (ma: Maybe<A>): B | C =>
  isNone(ma) ? onNone() : onSome(ma.value)

/**
 * Composes computations in sequence. Useful for chaining many computations that may result in a missing value.
 *
 * @example
 *
 * ```ts
 * const f = flow(
 *   chain((n: number) => some(n + 1)
 * )
 *
 * assert.deepStrictEqual(f(some(1)), some(2))
 * assert.deepStrictEqual(f(none), none)
 * ```
 */
export const chain = <A, B>(f: (a: A) => Maybe<B>) => (ma: Maybe<A>): Maybe<B> =>
  isNone(ma) ? none : f(ma.value)

/**
 * Returns a `Right` from a `Some` or a `Left` with a default left value if `Maybe` is `None`.
 *
 * @example
 *
 * ```ts
 * const f = flow(
 *   () => 0
 * )
 *
 * assert.deepStrictEqual(f(some(1)), right(1))
 * assert.deepStrictEqual(f(none), left(0))
 * ```
 */
export const toEither = <E>(f: Lazy<E>) => <A>(ma: Maybe<A>): Either<E, A> =>
  isNone(ma) ? left(f()) : right(ma.value)

/**
 * Extracts the value out of `Maybe`, if it exists. Otherwise returns `null`.
 *
 * @example
 *
 * ```ts
 * const f = flow(
 *   toNullable
 * )
 *
 * assert.deepStrictEqual(f(some(1)), 1)
 * assert.deepStrictEqual(f(none), null)
 * ```
 */
export const toNullable: <A>(ma: Maybe<A>) => A | null = match(constNull, identity)

/**
 * Extracts the value out of `Maybe`, if it exists. Otherwise returns `undefined`.
 *
 * @example
 *
 * ```ts
 * const f = flow(
 *   toUndefined
 * )
 *
 * assert.deepStrictEqual(f(some(1)), 1)
 * assert.deepStrictEqual(f(none), undefined)
 * ```
 */
export const toUndefined: <A>(ma: Maybe<A>) => A | undefined = match(constUndefined, identity)

/**
 * Extracts the value of `Maybe`, if it exists. Otherwise return then default onNone value.
 *
 * @example
 *
 * ```ts
 * const f = flow(
 *   getOrElse(() => 0)
 * )
 *
 * assert.deepStrictEqual(f(some(1)), 1)
 * assert.deepStrictEqual(f(none)), 0)
 * ```
 */
export const getOrElse = <A>(onNone: Lazy<A>) => <B>(ma: Maybe<B>): A | B => isNone(ma) ? onNone() : ma.value


/**
 * Returns `Maybe` if it's a `Some`, otherwise returns onNone result.
 *
 * @example
 * const f = flow(
 *   orElse(() => some(1))
 * )
 *
 * assert.deepStrictEqual(f(some(0)), some(0))
 * assert.deepStrictEqual(f(none), some(1))
 */
export const orElse = <B>(onNone: Lazy<Maybe<B>>) => <A>(ma: Maybe<A>): Maybe<A | B> =>
  isNone(ma) ? onNone() : ma

/**
 *  Returns a `Maybe` from a function that might throw.
 *
 * @example
 *
 * ```ts
 * const unsafeDiv = (top: number, bottom: number) => {
 *   if(bottom === 0) throw new Error('unsafe division')
 *   return top / bottom
 * }
 * const div = (top: number, bottom: number) =>
 *   tryCatch(() => unsafeDiv(top, bottom))
 *
 * assert.deepStrictEqual(div(2, 0), none)
 * assert.deepStrictEqual(div(2, 1), some(2))
 * ```
 */
export const tryCatch = <A>(f: Lazy<A>): Maybe<A> => {
  try {
    return some(f())
  } catch (_) {
    return none
  }
}

/**
 * Compares one `Maybe` to another `Maybe`. Returns false if maybes or the wrapped values are different.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(equals(some(1), some(1)), true)
 * assert.deepStrictEqual(equals(some(2), some(1)), false)
 * assert.deepStrictEqual(equals(some(1), none), false)
 * assert.deepStrictEqual(equals(none, none), true)
 * assert.deepStrictEqual(equals(none, right(1)), false)
 * ```
 */
export const equals = <A>(a: Maybe<A>, b: Maybe<A>): boolean =>
  a === b || (isNone(a) ? isNone(b) : isSome(b) && a.value === b.value)
