/**
 * Group
 *
 * 1. g.concat(g.invert()) is equivalent to g.constructor.empty() (right inverse)
 * 2. g.invert().concat(g) is equivalent to g.constructor.empty() (left inverse)
 *
 * invert :: Group g => g ~> () -> g
 */

import { HKT, URIS, KindOf } from './HKT'
import { Monoid, Monoid1, Monoid2 } from './Monoid'

export interface Group<F> extends Monoid<F> {
  readonly invert: <A>() => HKT<F, A>
}

export interface Group1<F extends URIS> extends Monoid1<F> {
  readonly invert: <A>() => KindOf<F, [A]>
}

export interface Group2<F extends URIS> extends Monoid2<F> {
  readonly invert: <E, A>() => KindOf<F, [E, A]>
}
