/**
 * Alt
 *
 * 1. a.alt(b).alt(c) is equivalent to a.alt(b.alt(c)) (associativity)
 * 2. a.alt(b).map(f) is equivalent to a.map(f).alt(b.map(f)) (distributivity)
 *
 * alt :: Alt f => f a ~> f a -> f a
 */

import { Lazy } from '../function'
import { Functor, Functor1, Functor2 } from './Functor'
import { HKT, KindOf, URIS } from './HKT'

export interface Alt<F> extends Functor<F> {
  readonly alt: <A, B>(fa: HKT<F, A>, that: Lazy<HKT<F, B>>) => HKT<F, A | B>
}

export interface Alt1<F extends URIS> extends Functor1<F> {
  readonly alt: <A, B>(fa: KindOf<F, [A]>, that: Lazy<KindOf<F, [B]>>) => KindOf<F, [A | B]>
}

export interface Alt2<F extends URIS> extends Functor2<F> {
  readonly alt: <E, A, B>(fa: KindOf<F, [E, A]>, that: Lazy<KindOf<F, [E, B]>>) => KindOf<F, [E, A | B]>
}
