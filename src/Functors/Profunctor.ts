/**
 * Profunctor
 *
 * 1. p.promap(a => a, b => b) is equivalent to p (identity)
 * 2. p.promap(a => f(g(a)), b => h(i(b))) is equivalent to p.promap(f, i).promap(g, h) (composition)
 *
 * promap :: Profunctor p => p b c ~> (a -> b, c -> d) -> p a d
 */

import type { Functor2 } from './Functor'
import type { KindOf, URIS } from './HKT'

export interface Profunctor2<F extends URIS> extends Functor2<F> {
  readonly promap: <E, A, D, B>(fea: KindOf<F, [E, A]>, f: (d: D) => E, g: (a: A) => B) => KindOf<F, [D, B]>
}
