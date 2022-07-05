/**
 * Filterable
 *
 * 1. v.filter(x => p(x) && q(x)) is equivalent to v.filter(p).filter(q) (distributivity)
 * 2. v.filter(x => true) is equivalent to v (identity)
 * 3. v.filter(x => false) is equivalent to w.filter(x => false) if v and w are values of the same Filterable (annihilation)
 *
 * filter :: Filterable f => f a ~> (a -> Boolean) -> f a
 */

import { HKT, URIS, KindOf } from './HKT'
import { Predicate } from '../Predicate'

export interface Filterable<F> {
  readonly filter: <A>(ma: HKT<F, A>, predicate: Predicate<A>) => HKT<F, A>
}

export interface Filterable1<F extends URIS> {
  readonly filter: <A>(ma: KindOf<F, [A]>, predicate: Predicate<A>) => KindOf<F, [A]>
}

export interface Filterable2<F extends URIS> {
  readonly filter: <E, A>(ma: KindOf<F, [E, A]>, predicate: Predicate<A>) => KindOf<F, [E, A]>
}