/**
 * Plus
 *
 * 1. x.alt(A.zero()) is equivalent to x (right identity)
 * 2. A.zero().alt(x) is equivalent to x (left identity)
 * 3. A.zero().map(f) is equivalent to A.zero() (annihilation)
 *
 * zero :: Plus f => () -> f a
 */

import { HKT, URIS, KindOf } from './HKT'
import { Alt, Alt2, Alt1 } from './Alt'

export interface Plus<F> extends Alt<F> {
  readonly zero: <A>() => HKT<F, A>
}

export interface Plus1<F extends URIS> extends Alt1<F> {
  readonly zero: <A>() => KindOf<F, [A]>
}

export interface Plus2<F extends URIS> extends Alt2<F> {
  readonly zero: <E, A>() => KindOf<F, [E, A]>
}
