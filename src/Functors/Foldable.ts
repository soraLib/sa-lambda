/**
 * Foldable
 *
 * 1. u.reduce is equivalent to u.reduce((acc, x) => acc.concat([x]), []).reduce
 *
 * reduce :: Foldable f => f a ~> (b, (b, a) -> b) -> b
 */

import type { HKT, KindOf, URIS } from './HKT'

export interface Foldable<F> {
  readonly URI: F
  readonly reduce: <A, B>(fa: HKT<F, A>, b: B, f: (b: B, a: A) => B) => B
}

export interface Foldable1<F extends URIS> {
  readonly URI: F
  readonly reduce: <A, B>(fa: KindOf<F, [A]>, b: B, f: (b: B, a: A) => B) => B
}

export interface Foldable2<F extends URIS> {
  readonly URI: F
  readonly reduce: <E, A, B>(fa: KindOf<F, [E, A]>, b: B, f: (b: B, a: A) => B) => B
}
