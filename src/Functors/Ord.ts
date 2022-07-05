/**
 * Ord
 *
 * 1. a.lte(b) or b.lte(a) (totality)
 * 2. If a.lte(b) and b.lte(a), then a.equals(b) (antisymmetry)
 * 3. If a.lte(b) and b.lte(c), then a.lte(c) (transitivity)
 *
 * lte :: Ord a => a ~> a -> Boolean
 */

import { HKT, URIS, KindOf } from './HKT'
import { Setoid, Setoid1, Setoid2 } from './Setoid'

export interface Ord<F> extends Setoid<F> {
  readonly lte: <A>(a: HKT<F, A>, b: HKT<F, A>) => boolean
}

export interface Ord1<F extends URIS> extends Setoid1<F> {
  readonly lte: <A>(a: KindOf<F, [A]>, b: KindOf<F, [A]>) => boolean
}

export interface Ord2<F extends URIS> extends Setoid2<F> {
  readonly lte: <E, A>(a: KindOf<F, [E, A]>, b: KindOf<F, [E, A]>) => boolean
}
