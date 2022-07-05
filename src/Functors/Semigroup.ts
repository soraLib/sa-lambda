/**
 * Semigroup
 *
 * 1. a.concat(b).concat(c) is equivalent to a.concat(b.concat(c)) (associativity)
 *
 * concat :: Semigroup a => a ~> a -> a
 */

import { HKT, URIS, KindOf } from './HKT'

export interface Semigroup<F> {
  readonly concat: <A>(a: HKT<F, A>, b: HKT<F, A>) => HKT<F, A>
}

export interface Semigroup1<F extends URIS> {
  readonly concat: <A>(a: KindOf<F, [A]>, b: KindOf<F, [A]>) => KindOf<F, [A]>
}

export interface Semigroup2<F extends URIS> {
  readonly concat: <E, A>(a: KindOf<F, [E, A]>, b: KindOf<F, [E, A]>) => KindOf<F, [E, A]>
}

