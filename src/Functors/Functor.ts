/**
 * Functor
 *
 * 1. u.map(a => a) is equivalent to u (identity)
 * 2. u.map(x => f(g(x))) is equivalent to u.map(g).map(f) (composition)
 *
 * map :: Functor f => f a ~> (a -> b) -> f b
 */

import { HKT, KindOf, URIS } from './HKT'

export interface Functor<F> {
  readonly map: <A, B>(ma: HKT<F, A>, f: (a: A) => B) => HKT<F, B>
}

export interface Functor1<F extends URIS> {
  readonly map: <A, B>(ma: KindOf<F, [A]>, f: (a: A) => B) => KindOf<F, [B]>
}

export interface Functor2<F extends URIS> {
  readonly map: <E, A, B>(ma: KindOf<F, [E, A]>, f: (a: A) => B) => KindOf<F, [E, B]>
}
