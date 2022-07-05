/**
 * Comonad
 *
 * 1. w.extend(_w => _w.extract()) is equivalent to w (left identity)
 * 2. w.extend(f).extract() is equivalent to f(w) (right identity)
 *
 * extract :: Comonad w => w a ~> () -> a
 */

import { HKT, URIS, KindOf } from './HKT'
import { Extend, Extend1, Extend2 } from './Extend'

export interface Comonad<W> extends Extend<W> {
  readonly extract: <A>(wa: HKT<W, A>) => A
}

export interface Comonad1<W extends URIS> extends Extend1<W> {
  readonly extract: <A>(wa: KindOf<W, [A]>) => A
}

export interface Comonad2<W extends URIS> extends Extend2<W> {
  readonly extract: <E, A>(wa: KindOf<W, [E, A]>) => A
}
