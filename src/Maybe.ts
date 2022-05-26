import { Predicate } from './Predicate'
import { Lazy, constNull, identity, constUndefined } from './function'

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
export const isNone = <A>(m: Maybe<A>): m is None => m._tag === 'None'

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
export const isSome = <A>(m: Maybe<A>): m is Some<A> => m._tag === 'Some'

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
 * instance `map` operation.
 */
export const map = <A, B>(f: (a: A) => B) => (fa: Maybe<A>): Maybe<B> =>
  isNone(fa) ? none : some(f(fa.value))

/**
 * instance `of` operation
 */
export const of = some

/**
 * Returns the onNone default value if the `Maybe` is `None`, otherwise returns the onSome function result with `Maybe`.
 *
 * @example
 *
 * ```ts
 * const f = flow(
 *  match(() => 0, (n: number) => n + 1)
 * )
 *
 * assert.deepStrictEqual(f(some(1)), 2)
 * assert.deepStrictEqual(f(none), 1)
 * ```
 */
export const match = <B, A, C>(onNone: Lazy<B>, onSome: (a: A) => C) => (ma: Maybe<A>): B | C =>
  isNone(ma) ? onNone() : onSome(ma.value)

/**
 * Composes computations in sequence
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
