/**
 * Comonad
 *
 * 1. w.extend(_w => _w.extract()) is equivalent to w (left identity)
 * 2. w.extend(f).extract() is equivalent to f(w) (right identity)
 *
 * extract :: Comonad w => w a ~> () -> a
 */

import { Extend, Extend1, Extend2 } from './Extend'
import { HKT, KindOf, URIS } from './HKT'

export interface Comonad<F> extends Extend<F> {
  readonly extract: <A>(ma: HKT<F, A>) => A
}

export interface Comonad1<F extends URIS> extends Extend1<F> {
  readonly extract: <A>(ma: KindOf<F, [A]>) => A
}

export interface Comonad2<F extends URIS> extends Extend2<F> {
  readonly extract: <E, A>(ma: KindOf<F, [E, A]>) => E | A
}
