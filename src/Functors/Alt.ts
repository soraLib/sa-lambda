/**
 * Alt
 *
 * 1. a.alt(b).alt(c) is equivalent to a.alt(b.alt(c)) (associativity)
 * 2. a.alt(b).map(f) is equivalent to a.map(f).alt(b.map(f)) (distributivity)
 *
 * alt :: Alt f => f a ~> f a -> f a
 */

import { HKT, URIS, KindOf } from './HKT'
import { Functor, Functor1, Functor2 } from './Functor'
import { Lazy } from '../function'

export interface Alt<F> extends Functor<F> {
  readonly alt: <A>(fa: HKT<F, A>, that: Lazy<HKT<F, A>>) => HKT<F, A>
}

export interface Alt1<F extends URIS> extends Functor1<F> {
  readonly alt: <A>(fa: KindOf<F, [A]>, that: Lazy<KindOf<F, [A]>>) => KindOf<F, [A]>
}

export interface Alt2<F extends URIS> extends Functor2<F> {
  readonly alt: <E, A>(fa: KindOf<F, [E, A]>, that: Lazy<KindOf<F, [E, A]>>) => KindOf<F, [E, A]>
}
