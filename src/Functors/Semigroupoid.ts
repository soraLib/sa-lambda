/**
 * Semigroupoid
 *
 * 1. a.compose(b).compose(c) === a.compose(b.compose(c)) (associativity)
 *
 * compose :: Semigroupoid c => c i j ~> c j k -> c i k
 */

import { HKT, URIS, KindOf } from './HKT'

export interface Semigroupoid<F> {
  readonly URI: F
  readonly compose: <A>(a: HKT<F, A>, b: HKT<F, A>) => HKT<F, A>
}

export interface Semigroupoid1<F extends URIS> {
  readonly URI: F
  readonly compose: <A>(a: KindOf<F, [A]>, b: KindOf<F, [A]>) => KindOf<F, [A]>
}

export interface Semigroupoid2<F extends URIS> {
  readonly URI: F
  readonly compose: <E, A>(a: KindOf<F, [E, A]>, b: KindOf<F, [E, A]>) => KindOf<F, [E, A]>
}
