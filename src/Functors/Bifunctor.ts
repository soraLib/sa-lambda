/**
 * Bifunctor
 *
 * 1. p.bimap(a => a, b => b) is equivalent to p (identity)
 * 2. p.bimap(a => f(g(a)), b => h(i(b)) is equivalent to p.bimap(g, i).bimap(f, h) (composition)
 *
 * bimap :: Bifunctor f => f a c ~> (a -> b, c -> d) -> f b d
 */

import type { Functor2 } from './Functor'
import type { KindOf, URIS } from './HKT'

export interface Bifunctor2<F extends URIS> extends Functor2<F> {
  readonly bimap: <E, A, G, B>(fea: KindOf<F, [E, A]>, f: (e: E) => G, g: (a: A) => B) => KindOf<F, [G, B]>
}
