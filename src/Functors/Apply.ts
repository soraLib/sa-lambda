/**
 * Apply
 *
 * 1. v.ap(u.ap(a.map(f => g => x => f(g(x))))) is equivalent to v.ap(u).ap(a) (composition)
 *
 * ap :: Apply f => f a ~> f (a -> b) -> f b
 */

import type { Functor, Functor1, Functor2 } from './Functor'
import type { HKT, KindOf, URIS } from './HKT'

export interface Apply<F> extends Functor<F> {
  readonly ap: <A, B>(fab: HKT<F, (a: A) => B>, fa: HKT<F, A>) => HKT<F, B>
}

export interface Apply1<F extends URIS> extends Functor1<F> {
  readonly ap: <A, B>(fab: KindOf<F, [(a: A) => B]>, fa: KindOf<F, [A]>) => KindOf<F, [B]>
}

export interface Apply2<F extends URIS> extends Functor2<F> {
  readonly ap: <E, A, B>(fab: KindOf<F, [E, (a: A) => B]>, fa: KindOf<F, [E, A]>) => KindOf<F, [E, B]>
}
