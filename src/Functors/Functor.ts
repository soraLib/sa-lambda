import { HKT, KindOf, URIS } from './HKT'

export interface Functor<F> {
  readonly URI: F
  readonly map: <A, B>(ma: HKT<F, A>, f: (a: A) => B) => HKT<F, B>
}

export interface Functor1<F extends URIS> {
  readonly URI: F
  readonly map: <A, B>(ma: KindOf<F, [A]>, f: (a: A) => B) => KindOf<F, [B]>
}

export interface Functor2<F extends URIS> {
  readonly URI: F
  readonly map: <E, A, B>(ma: KindOf<F, [E, A]>, f: (a: A) => B) => KindOf<F, [E, B]>
}

/**
 * `map` composition.
 */
export function map<F, G extends URIS>(
  F: Functor<F>,
  G: Functor2<G>
): <A, B>(f: (a: A) => B) => <E>(ma: HKT<F, KindOf<G, [E, A]>>) => HKT<F, KindOf<G, [E, B]>>
export function map<F, G extends URIS>(
  F: Functor<F>,
  G: Functor1<G>
): <A, B>(f: (a: A) => B) => (ma: HKT<F, KindOf<G, [A]>>) => HKT<F, KindOf<G, [B]>>
export function map<F, G>(
  F: Functor<F>,
  G: Functor<G>
): <A, B>(f: (a: A) => B) => (ma: HKT<F, HKT<G, A>>) => HKT<F, HKT<G, B>> {
  return (f) => (ma) => F.map(ma, (a) => G.map(a, f))
}
