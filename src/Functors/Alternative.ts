/**
 * Alternative
 *
 * 1. x.ap(f.alt(g)) is equivalent to x.ap(f).alt(x.ap(g)) (distributivity)
 * 2. x.ap(A.zero()) is equivalent to A.zero() (annihilation)
 */

import { URIS } from './HKT'
import { Plus, Plus1, Plus2 } from './Plus'
import { Applicative, Applicative1, Applicative2 } from './Applicative'

export interface Alternative<F> extends Plus<F>, Applicative<F> {}

export interface Alternative1<F extends URIS> extends Plus1<F>, Applicative1<F> {}

export interface Alternative2<F extends URIS> extends Plus2<F>, Applicative2<F> {}
