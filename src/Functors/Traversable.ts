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
import { Applicative, Applicative1, Applicative2 } from './Applicative'

export interface Traversable<F> extends Functor<F>, Foldable<F> {
  readonly traverse: <T>(A: Applicative<T>) => <A, B>(ma: HKT<F, A>, f: (a: A) => HKT<T, B>) => HKT<F, B>
}

export interface Traversable1<F extends URIS> extends Functor1<F>, Foldable1<F> {
  readonly traverse: Traverse<F>
}

export interface Traversable2<F extends URIS> extends Functor2<F>, Foldable2<F> {
  readonly traverse: Traverse2<F>
}

export interface Traverse<T extends URIS> {
  <F extends URIS>(F: Applicative2<F>): <A, E, B>(ma: KindOf<T, [A]>, f: (a: A) => KindOf<F, [E, B]>) => KindOf<F, [E, KindOf<T, [B]>]>
  <F extends URIS>(F: Applicative1<F>): <A, B>(ma: KindOf<T, [A]>, f: (a: A) => KindOf<F, [B]>) => KindOf<F, [KindOf<T, [B]>]>
  <F>(F: Applicative<F>): <A, B>(ma: KindOf<T, [A]>, f: (a: A) => HKT<F, B>) => HKT<F, KindOf<T, [B]>>
}

export interface Traverse2<T extends URIS> {
  <F extends URIS>(F: Applicative2<F>): <E, A, FE, B>(ma: KindOf<T, [E, A]>, f: (a: A) => KindOf<F, [FE, B]>) => KindOf<F, [FE, KindOf<T, [E, B]>]>
  <F extends URIS>(F: Applicative1<F>): <E, A, B>(ma: KindOf<T, [E, A]>, f: (a: A) => KindOf<F, [B]>) => KindOf<F, [KindOf<T, [E, B]>]>
  <F>(F: Applicative<F>): <E, A, B>(ma: KindOf<T, [E, A]>, f: (a: A) => HKT<F, B>) => HKT<F, KindOf<T, [E, B]>>
}

export interface PipeableTraverse1<T extends URIS> {
  <F extends URIS>(F: Applicative2<F>): <A, FE, B>(f: (a: A) => KindOf<F, [FE, B]>) => (ta: KindOf<T, [A]>) => KindOf<F, [FE, KindOf<T, [B]>]>
  <F extends URIS>(F: Applicative1<F>): <A, B>(f: (a: A) => KindOf<F, [B]>) => (ta: KindOf<T, [A]>) => KindOf<F, [KindOf<T, [B]>]>
  <F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>) => (ta: KindOf<T, [A]>) => HKT<F, KindOf<T, [B]>>
}

export interface PipeableTraverse2<T extends URIS> {
  <F extends URIS>(F: Applicative2<F>): <A, FE, B>(f: (a: A) => KindOf<F, [FE, B]>) => <TE>(ta: KindOf<T, [TE, A]>) => KindOf<F, [FE, KindOf<T, [TE, B]>]>
  <F extends URIS>(F: Applicative1<F>): <A, B>(f: (a: A) => KindOf<F, [B]>) => <TE>(ta: KindOf<T, [TE, A]>) => KindOf<F, [KindOf<T, [TE, B]>]>
  <F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>) => <TE>(ta: KindOf<T, [TE, A]>) => HKT<F, KindOf<T, [TE, B]>>
}
