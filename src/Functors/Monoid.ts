/**
 * Monoid
 *
 * 1. m.concat(M.empty()) is equivalent to m (right identity)
 * 2. M.empty().concat(m) is equivalent to m (left identity)
 *
 * empty :: Monoid m => () -> m
 */

import type { HKT, KindOf, URIS } from './HKT'
import type { Semigroup, Semigroup1, Semigroup2 } from './Semigroup'

export interface Monoid<F> extends Semigroup<F> {
  readonly empty: <A>() => HKT<F, A>
}

export interface Monoid1<F extends URIS> extends Semigroup1<F> {
  readonly empty: <A>() => KindOf<F, [A]>
}

export interface Monoid2<F extends URIS> extends Semigroup2<F> {
  readonly empty: <E, A>() => KindOf<F, [E, A]>
}
