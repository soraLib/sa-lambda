import { Predicate } from './Predicate'
import { Lazy } from './function'

export interface None {
  readonly _tag: 'None'
}

export interface Some<A> {
  readonly _tag: 'Some'
  readonly value: A
}

export type Maybe<A> = None | Some<A>

/**
 * Return whether the maybe is `None` or not.
 *
 * ```ts
 * assert.deepStrictEqual(isNone(none), true)
 * assert.deepStrictEqual(isNone(some(1)), false)
 * ```
 */
export const isNone = <A>(m: Maybe<A>): m is None => m._tag === 'None'

/**
 * Return whether the maybe is `Some` or not.
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
 * Return `Some` or `None` based on the given predicate.
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
 * Extracts the value of `Maybe`, if it exists. Otherwise return then default onNone value.
 *
 * ```ts
 * assert.deepStrictEqual(getOrElse(() => 0)(some(1)), 1)
 * assert.deepStrictEqual(getOrElse(() => 0)(none)), 0)
 * ```
 */
export const getOrElse = <A>(onNone: Lazy<A>) => <B>(ma: Maybe<B>): A | B => isNone(ma) ? onNone() : ma.value
