/**
 * Chain
 *
 * 1. m.chain(f).chain(g) is equivalent to m.chain(x => f(x).chain(g)) (associativity)
 *
 * chain :: Chain m => m a ~> (a -> m b) -> m b
 */

import { HKT, URIS, KindOf } from './HKT'
import { Apply, Apply1, Apply2 } from './Apply'

export interface Chain<F> extends Apply<F> {
  readonly chain: <A, B>(fa: HKT<F, A>, f: (a: A) => HKT<F, B>) => HKT<F, B>
}

export interface Chain1<F extends URIS> extends Apply1<F> {
  readonly chain: <A, B>(fa: KindOf<F, [A]>, f: (a: A) => KindOf<F, [B]>) => KindOf<F, [B]>
}

export interface Chain2<F extends URIS> extends Apply2<F> {
  readonly chain: <E, A, B>(fa: KindOf<F, [E, A]>, f: (a: A) => KindOf<F, [E, B]>) => KindOf<F, [E, B]>
}
