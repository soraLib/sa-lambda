import { Predicate } from './Predicate'

export interface None {
  readonly _tag: 'None'
}

export interface Some<A> {
  readonly _tag: 'Some'
  readonly value: A
}

export type Maybe<A> = None | Some<A>

export const isNone = <A>(m: Maybe<A>): m is Some<A> => m._tag === 'None'
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
