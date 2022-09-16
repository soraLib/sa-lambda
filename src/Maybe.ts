import { Either, left, right } from './Either'
import { constNull, constUndefined, identity, Lazy } from './function'
import { Alternative1 } from './Functors/Alternative'
import { Applicative } from './Functors/Applicative'
import { Chain1 } from './Functors/Chain'
import { Extend1 } from './Functors/Extend'
import { HKT } from './Functors/HKT'
import { Monad1 } from './Functors/Monad'
import { PipeableTraverse1, Traversable1 } from './Functors/Traversable'
import { pipe } from './Pipe'
import { Predicate } from './Predicate'

export interface None {
  readonly _tag: 'None'
}

export interface Some<A> {
  readonly _tag: 'Some'
  readonly value: A
}

export type Maybe<A> = None | Some<A>

export const MaybeKind = Symbol('Maybe')
export type MaybeKind = typeof MaybeKind

declare module './Functors/HKT' {
  interface Kinded<T> {
    readonly [MaybeKind]: Maybe<T[0]>
  }
}

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
 * Alias of `empty`.
 */
export const zero = empty

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
 * Returns none if the `Maybe` is a `None`, otherwise returns the result of the applying function and wrapped in a `Some`.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(pipe(some(1), extend(getOrElse(zero))), some(1))
 * assert.deepStrictEqual(pipe(none, extend(getOrElse(zero))), none)
 * ```
 */
export const extend = <A, B>(f: (a: Maybe<A>) => B) => (ma: Maybe<A>): Maybe<B> =>
  isNone(ma) ? none : some(f(ma))

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
 * Extracts the value out of `Maybe` if it exists, otherwise returns `null`.
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
 * Extracts the value out of `Maybe` if it exists, otherwise returns `undefined`.
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
 * Extracts the value of `Maybe` if it exists, otherwise returns then default onNone value.
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
 * Returns a `Maybe` from a function that might throw.
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
 * Maps each element of a `HKT` structure to an action, and collects the results wrapped in `Some`.
 *
 * Returns a `HKT` contains a none if the `Maybe` is a `None`.
 *
 * @example
 *
 * ```ts
 * const f = traverse(Maybe.Monad)((n: number) => n > 0 ? some(n): none)
 * assert.deepStrictEqual(pipe(some(1), f), some(some(1)))
 * assert.deepStrictEqual(pipe(none, f), some(none))
 * assert.deepStrictEqual(pipe(some(-1), f), none)
 * ```
 */
export const traverse: PipeableTraverse1<MaybeKind> = /* TODO: expect a better case, use iter */
  <F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>) => (ma: Maybe<A>) => HKT<F, Maybe<B>> =>
    f => ma => isNone(ma) ? F.of(none) : F.map(f(ma.value), some)


/**
 * Takes a function and an initial value and returns the initial value if `Maybe` is `none`,
 * otherwise returns the result of applying the function to the initial value and the value inside `Maybe`.
 *
 * @example
 *
 * ```ts
 * assert.deepStrictEqual(pipe(some(1), reduce((acc, a) => acc + a, 1), 2)
 * assert.deepStrictEqual(pipe(none, reduce((acc, a) => acc + a, 1), 1)
 * ```
 */
export const reduce = <A, B>(f: (acc: B, a: A) => B, b: B) => (ma: Maybe<A>): B =>
  isNone(ma) ? b : f(b, ma.value)

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

// none-pipeables
const _map: Monad1<MaybeKind>['map'] = (ma, f) => pipe(ma, map(f))
const _ap: Monad1<MaybeKind>['ap'] = (fab, fa) => pipe(fab, ap(fa))
const _chain: Monad1<MaybeKind>['chain'] = (ma, f) => pipe(ma, chain(f))
const _alt: Alternative1<MaybeKind>['alt'] = (fa, that) => pipe(fa, alt(that))
const _extend: Extend1<MaybeKind>['extend'] = (ma, f) => pipe(ma, extend(f))
const _reduce: Traversable1<MaybeKind>['reduce'] = (ma, b, f) => pipe(ma, reduce(f, b))
const _traverse: Traversable1<MaybeKind>['traverse'] = <F>(F: Applicative<F>) => <A, B>(ma: Maybe<A>, f: (a: A) => HKT<F, B>): HKT<F, Maybe<B>> => pipe(ma, traverse(F)(f))

/**
 * Alternative Functor
 */
export const Alternative: Alternative1<MaybeKind> = {
  URI: MaybeKind,
  map: _map,
  ap: _ap,
  of,
  alt: _alt,
  zero
}

/**
 * Monad Functor
 */
export const Monad: Monad1<MaybeKind> = {
  URI: MaybeKind,
  of,
  map: _map,
  ap: _ap,
  chain: _chain
}

/**
 * Chain Functor
 */
export const Chain: Chain1<MaybeKind> = {
  URI: MaybeKind,
  map: _map,
  ap: _ap,
  chain: _chain
}

/**
 * Extend Functor
 */
export const Extend: Extend1<MaybeKind> = {
  URI: MaybeKind,
  map: _map,
  extend: _extend
}

/**
 * Traversable Functor
 */
export const Traversable: Traversable1<MaybeKind> = {
  URI: MaybeKind,
  map: _map,
  reduce: _reduce,
  traverse: _traverse
}
