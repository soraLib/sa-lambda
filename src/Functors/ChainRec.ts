/**
 * ChainRec
 *
 * 1. M.chainRec((next, done, v) => p(v) ? d(v).map(done) : n(v).map(next), i) is equivalent to
 *    (function step(v) { return p(v) ? d(v) : n(v).chain(step); }(i)) (equivalence)
 * 2. Stack usage of M.chainRec(f, i) must be at most a constant multiple of the stack usage of f itself
 *
 * chainRec :: ChainRec m => ((a -> c, b -> c, a) -> m c, a) -> m b
 */

import { HKT, URIS, KindOf } from './HKT'
import { Chain, Chain1, Chain2 } from './Chain'
import { Predicate } from '../Predicate'

// TODO:

export interface ChainRec<F> extends Chain<F> {
  readonly chainRec: <A, B>(init: A, f: (a: A) => HKT<F, A>) => HKT<F, B>
}

export interface ChainRec1<F extends URIS> extends Chain1<F> {
  readonly chainRec: <A, B>(init: A, f: (a: A) => KindOf<F, [A, B]>) => KindOf<F, [B]>
}

export interface ChainRec2<F extends URIS> extends Chain2<F> {
  readonly chainRec: <E, A, B, C>(loop: (a: A) => C, done: Predicate<B>, init: KindOf<F, [E, A]>) => KindOf<F, [E, B]>
}
