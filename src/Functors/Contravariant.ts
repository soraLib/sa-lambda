/**
 * Contravariant
 *
 * 1. u.contramap(a => a) is equivalent to u (identity)
 * 2. u.contramap(x => f(g(x))) is equivalent to u.contramap(f).contramap(g) (composition)
 *
 * contramap :: Contravariant f => f a ~> (b -> a) -> f b
 */

import { HKT, URIS, KindOf } from './HKT'

export interface Contravariant<F> {
  readonly URI: F
  readonly contramap: <A, B>(fa: HKT<F, A>, f: (b: B) => A) => HKT<F, B>
}

export interface Contravariant1<F extends URIS> {
  readonly URI: F
  readonly contramap: <A, B>(fa: KindOf<F, [A]>, f: (b: B) => A) => KindOf<F, [B]>
}

export interface Contravariant2<F extends URIS> {
  readonly URI: F
  readonly contramap: <E, A, B>(fa: KindOf<F, [E, A]>, f: (b: B) => A) => KindOf<F, [E, B]>
}
