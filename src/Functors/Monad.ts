import { HKT, URIS } from './HKT'
import { Pointed, Pointed2, Pointed1 } from './Pointed'

export interface Monad<F> extends Pointed<F> {
  ap: <A, B>(fab: HKT<F, (a: A) => B>, fa: HKT<F, A>) => HKT<F, B>
}
