/**
 * Monad
 *
 * 1. M.of(a).chain(f) is equivalent to f(a) (left identity)
 * 2. m.chain(M.of) is equivalent to m (right identity)
 */

import { URIS } from './HKT'
import { Applicative, Applicative1, Applicative2 } from './Applicative'
import { Chain, Chain1, Chain2 } from './Chain'

export interface Monad<F> extends Applicative<F>, Chain<F> {}

export interface Monad1<F extends URIS> extends Applicative1<F>, Chain1<F> {}

export interface Monad2<F extends URIS> extends Applicative2<F>, Chain2<F> {}
