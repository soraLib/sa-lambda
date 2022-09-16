/**
 * Extend
 *
 * 1. w.extend(g).extend(f) is equivalent to w.extend(_w => f(_w.extend(g)))
 *
 * extend :: Extend w => w a ~> (w a -> b) -> w b
 */

import { Functor, Functor1, Functor2 } from './Functor'
import { HKT, KindOf, URIS } from './HKT'

export interface Extend<W> extends Functor<W> {
  readonly extend: <A, B>(wa: HKT<W, A>, f: (wa: HKT<W, A>) => B) => HKT<W, B>
}

export interface Extend1<W extends URIS> extends Functor1<W> {
  readonly extend: <A, B>(wa: KindOf<W, [A]>, f: (wa: KindOf<W, [A]>) => B) => KindOf<W, [B]>
}

export interface Extend2<W extends URIS> extends Functor2<W> {
  readonly extend: <E, A, B>(wa: KindOf<W, [E, A]>, f: (wa: KindOf<W, [E, A]>) => B) => KindOf<W, [E, B]>
}
