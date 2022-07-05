/**
 * Traversable
 *
 * 1. t(u.traverse(F, x => x)) is equivalent to u.traverse(G, t) for any t such that
 *    t(a).map(f) is equivalent to t(a.map(f)) (naturality)
 * 2. u.traverse(F, F.of) is equivalent to F.of(u) for any Applicative F (identity)
 * 3. u.traverse(Compose, x => new Compose(x)) is equivalent to new Compose(u.traverse(F, x => x).map(x => x.traverse(G, x => x)))
 *    for Compose defined below and any Applicatives F and G (composition)
 *
 * traverse :: Applicative f, Traversable t => t a ~> (TypeRep f, a -> f b) -> f (t b)
 */

import { HKT, KindOf, URIS } from './HKT'
import { Functor, Functor1, Functor2 } from './Functor'
import { Foldable, Foldable1, Foldable2 } from './Foldable'
import { Applicative } from './Applicative'

export interface Traversable<F> extends Functor<F>, Foldable<F> {
  readonly traverse: <T>(A: Applicative<T>) => <A, B>(ma: HKT<F, A>, f: (a: A) => HKT<T, B>) => HKT<F, B>
}

export interface Traversable1<F extends URIS> extends Functor1<F>, Foldable1<F> {
  readonly traverse: <T extends URIS>(A: Applicative<T>) => <A, B>(ma: KindOf<F, [A]>, f: (a: A) => KindOf<T, [B]>) => KindOf<F, [B]>
}

export interface Traversable2<F extends URIS> extends Functor2<F>, Foldable2<F> {
  readonly traverse: <T extends URIS>(A: Applicative<T>) => <E, A, B>(ma: KindOf<F, [E, A]>, f: (a: A) => KindOf<T, [E, B]>) => KindOf<F, [E, B]>
}
