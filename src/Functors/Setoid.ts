/**
 * Setoid
 *
 * 1. a.equals(a) === true (reflexivity)
 * 2. a.equals(b) === b.equals(a) (symmetry)
 * 3. If a.equals(b) and b.equals(c), then a.equals(c) (transitivity)
 *
 * equals :: Setoid a => a ~> a -> Boolean
 */

import { HKT, KindOf, URIS } from './HKT'

export interface Setoid<F> {
  readonly URI: F
  readonly equals: <A>(a: HKT<F, A>, b: HKT<F, A>) => boolean
}

export interface Setoid1<F extends URIS> {
  readonly URI: F
  readonly equals: <A>(a: KindOf<F, [A]>, b: KindOf<F, [A]>) => boolean
}

export interface Setoid2<F extends URIS> {
  readonly URI: F
  readonly equals: <E, A>(a: KindOf<F, [E, A]>, b: KindOf<F, [E, A]>) => boolean
}
