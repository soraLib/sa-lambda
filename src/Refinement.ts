
/**
 * Narrows type A to the type B.
 */
export type Refinement<A, B extends A> = (a: A) => a is B
