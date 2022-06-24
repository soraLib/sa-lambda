import { HKT, KindOf, URIS } from './HKT'

export interface Pointed<F> {
  readonly URI: F
  readonly of: <A>(a: A) => HKT<F, A>
}

export interface Pointed1<F extends URIS> {
  readonly URI: F
  readonly of: <A>(a: A) => KindOf<F, [A]>
}

export interface Pointed2<F extends URIS> {
  readonly URI: F
  readonly of: <E, A>(a: A) => KindOf<F, [E, A]>
}
