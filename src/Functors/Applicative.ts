/**
 * Applicative
 *
 * 1. v.ap(A.of(x => x)) is equivalent to v (identity)
 * 2. A.of(x).ap(A.of(f)) is equivalent to A.of(f(x)) (homomorphism)
 * 3. A.of(y).ap(u) is equivalent to u.ap(A.of(f => f(y))) (interchange)
 *
 * of :: Applicative f => a -> f a
 */

import { Apply, Apply1, Apply2 } from './Apply'
import { HKT, KindOf, URIS } from './HKT'

export interface Applicative<F> extends Apply<F> {
  readonly of: <A>(ma: A) => HKT<F, A>
}

export interface Applicative1<F extends URIS> extends Apply1<F> {
  readonly of: <A>(ma: A) => KindOf<F, [A]>
}

export interface Applicative2<F extends URIS> extends Apply2<F> {
  readonly of: <E, A>(ma: A) => KindOf<F, [E, A]>
}
