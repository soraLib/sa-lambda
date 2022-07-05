/**
 * Category
 *
 * 1. a.compose(C.id()) is equivalent to a (right identity)
 * 2. C.id().compose(a) is equivalent to a (left identity)
 *
 * compose :: Category c => c i j ~> c j k -> c i k
 */

import { HKT, URIS, KindOf } from './HKT'

export interface Category<F> {
  readonly id: <A>() => HKT<F, A>
}

export interface Category1<F extends URIS> {
  readonly id: <A>() => KindOf<F, [A]>
}

export interface Category2<F extends URIS> {
  readonly id: <E, A>() => KindOf<F, [E, A]>
}
