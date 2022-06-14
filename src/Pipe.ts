import { TupleLast } from './TupleT'

type PipeFn<A, B> = (a: A) => B

/**
 * Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.
 *
 * @example
 *
 * ```ts
 * const len = (s: string): number => s.length
 * const double = (n: number): number => n * 2
 *
 * // without flow
 * assert.strictEqual(double(len('aaa')), 6)
 * assert.strictEqual(double(len('b')), 2)
 *
 * // with flow
 * const f = flow(len, double)
 * assert.strictEqual(f('aaa'), 6)
 * assert.strictEqual(f('b'), 2)
 * ```
 */
export function flow<Args extends unknown[], A>(a: (...args: Args) => A): (...args: Args) => A
export function flow<Args extends unknown[], A, B>(a: (...args: Args) => A, ab: PipeFn<A, B>): (...args: Args) => B
export function flow<Args extends unknown[], A, B, C>(a: (...args: Args) => A, ab: PipeFn<A, B>, bc: PipeFn<B, C>): (...args: Args) => C
export function flow<Args extends unknown[], A, B, C, D>(a: (...args: Args) => A, ab: PipeFn<A, B>, bc: PipeFn<B, C>, cd: PipeFn<C, D>): (...args: Args) => D
export function flow<Args extends unknown[], A, B, C, D, E>(a: (...args: Args) => A, ab: PipeFn<A, B>, bc: PipeFn<B, C>, cd: PipeFn<C, D>, de: PipeFn<D, E>): (...args: Args) => E
export function flow<Args extends unknown[], A, B, C, D, E, F>(
  a: (...args: Args) => A,
  ab: PipeFn<A, B>,
  bc: PipeFn<B, C>,
  cd: PipeFn<C, D>,
  de: PipeFn<D, E>,
  ef: PipeFn<E, F>
): (...args: Args) => F
export function flow<Args extends unknown[], A, B, C, D, E, F, G>(
  a: (...args: Args) => A,
  ab: PipeFn<A, B>,
  bc: PipeFn<B, C>,
  cd: PipeFn<C, D>,
  de: PipeFn<D, E>,
  ef: PipeFn<E, F>,
  fg: PipeFn<F, G>,
): (...args: Args) => G
export function flow<Args extends unknown[], A, B, C, D, E, F, G, H>(
  a: (...args: Args) => A,
  ab: PipeFn<A, B>,
  bc: PipeFn<B, C>,
  cd: PipeFn<C, D>,
  de: PipeFn<D, E>,
  ef: PipeFn<E, F>,
  fg: PipeFn<F, G>,
  gh: PipeFn<G, H>
): (...args: Args) => H
export function flow<Args extends unknown[], A, B, C, D, E, F, G, H, I>(
  a: (...args: Args) => A,
  ab: PipeFn<A, B>,
  bc: PipeFn<B, C>,
  cd: PipeFn<C, D>,
  de: PipeFn<D, E>,
  ef: PipeFn<E, F>,
  fg: PipeFn<F, G>,
  gh: PipeFn<G, H>,
  hi: PipeFn<H, I>
): (...args: Args) => I
export function flow<Args extends unknown[], A, B, C, D, E, F, G, H, I, J>(
  a: (...args: Args) => A,
  ab: PipeFn<A, B>,
  bc: PipeFn<B, C>,
  cd: PipeFn<C, D>,
  de: PipeFn<D, E>,
  ef: PipeFn<E, F>,
  fg: PipeFn<F, G>,
  gh: PipeFn<G, H>,
  hi: PipeFn<H, I>,
  ij: PipeFn<I, J>
): (...args: Args) => J
export function flow<Args extends unknown[], A, B, C, D, E, F, G, H, I, J, K>(
  a: (...args: Args) => A,
  ab: PipeFn<A, B>,
  bc: PipeFn<B, C>,
  cd: PipeFn<C, D>,
  de: PipeFn<D, E>,
  ef: PipeFn<E, F>,
  fg: PipeFn<F, G>,
  gh: PipeFn<G, H>,
  hi: PipeFn<H, I>,
  ij: PipeFn<I, J>,
  jk: PipeFn<J, K>
): (...args: Args) => K
export function flow<Args extends unknown[], A, B, C, D, E, F, G, H, I, J, K, L>(
  a: (...args: Args) => A,
  ab: PipeFn<A, B>,
  bc: PipeFn<B, C>,
  cd: PipeFn<C, D>,
  de: PipeFn<D, E>,
  ef: PipeFn<E, F>,
  fg: PipeFn<F, G>,
  gh: PipeFn<G, H>,
  hi: PipeFn<H, I>,
  ij: PipeFn<I, J>,
  jk: PipeFn<J, K>,
  kl: PipeFn<K, L>
): (...args: Args) => L
export function flow<Args extends unknown[], A, B, C, D, E, F, G, H, I, J, K, L, M>(
  a: (...args: Args) => A,
  ab: PipeFn<A, B>,
  bc: PipeFn<B, C>,
  cd: PipeFn<C, D>,
  de: PipeFn<D, E>,
  ef: PipeFn<E, F>,
  fg: PipeFn<F, G>,
  gh: PipeFn<G, H>,
  hi: PipeFn<H, I>,
  ij: PipeFn<I, J>,
  jk: PipeFn<J, K>,
  kl: PipeFn<K, L>,
  lm: PipeFn<L, M>
): (...args: Args) => M
export function flow<Args extends unknown[], A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
  a: (...args: Args) => A,
  ab: PipeFn<A, B>,
  bc: PipeFn<B, C>,
  cd: PipeFn<C, D>,
  de: PipeFn<D, E>,
  ef: PipeFn<E, F>,
  fg: PipeFn<F, G>,
  gh: PipeFn<G, H>,
  hi: PipeFn<H, I>,
  ij: PipeFn<I, J>,
  jk: PipeFn<J, K>,
  kl: PipeFn<K, L>,
  lm: PipeFn<L, M>,
  mn: PipeFn<M, N>
): (...args: Args) => N
export function flow<Args extends unknown[], A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
  a: (...args: Args) => A,
  ab: PipeFn<A, B>,
  bc: PipeFn<B, C>,
  cd: PipeFn<C, D>,
  de: PipeFn<D, E>,
  ef: PipeFn<E, F>,
  fg: PipeFn<F, G>,
  gh: PipeFn<G, H>,
  hi: PipeFn<H, I>,
  ij: PipeFn<I, J>,
  jk: PipeFn<J, K>,
  kl: PipeFn<K, L>,
  lm: PipeFn<L, M>,
  mn: PipeFn<M, N>,
  no: PipeFn<N, O>
): (...args: Args) => O
export function flow<Args extends unknown[], A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(
  a: (...args: Args) => A,
  ab: PipeFn<A, B>,
  bc: PipeFn<B, C>,
  cd: PipeFn<C, D>,
  de: PipeFn<D, E>,
  ef: PipeFn<E, F>,
  fg: PipeFn<F, G>,
  gh: PipeFn<G, H>,
  hi: PipeFn<H, I>,
  ij: PipeFn<I, J>,
  jk: PipeFn<J, K>,
  kl: PipeFn<K, L>,
  lm: PipeFn<L, M>,
  mn: PipeFn<M, N>,
  no: PipeFn<N, O>,
  op: PipeFn<O, P>
): (...args: Args) => P
export function flow<Args extends unknown[], A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(
  a: (...args: Args) => A,
  ab: PipeFn<A, B>,
  bc: PipeFn<B, C>,
  cd: PipeFn<C, D>,
  de: PipeFn<D, E>,
  ef: PipeFn<E, F>,
  fg: PipeFn<F, G>,
  gh: PipeFn<G, H>,
  hi: PipeFn<H, I>,
  ij: PipeFn<I, J>,
  jk: PipeFn<J, K>,
  kl: PipeFn<K, L>,
  lm: PipeFn<L, M>,
  mn: PipeFn<M, N>,
  no: PipeFn<N, O>,
  op: PipeFn<O, P>,
  pq: PipeFn<P, Q>
): (...args: Args) => Q
export function flow<Args extends unknown[], A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(
  a: (...args: Args) => A,
  ab: PipeFn<A, B>,
  bc: PipeFn<B, C>,
  cd: PipeFn<C, D>,
  de: PipeFn<D, E>,
  ef: PipeFn<E, F>,
  fg: PipeFn<F, G>,
  gh: PipeFn<G, H>,
  hi: PipeFn<H, I>,
  ij: PipeFn<I, J>,
  jk: PipeFn<J, K>,
  kl: PipeFn<K, L>,
  lm: PipeFn<L, M>,
  mn: PipeFn<M, N>,
  no: PipeFn<N, O>,
  op: PipeFn<O, P>,
  pq: PipeFn<P, Q>,
  qr: PipeFn<Q, R>
): (...args: Args) => R
export function flow<Args extends unknown[], A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, Other extends PipeFn<any, any>[]>(
  a: (...args: Args) => A,
  ab: PipeFn<A, B>,
  bc: PipeFn<B, C>,
  cd: PipeFn<C, D>,
  de: PipeFn<D, E>,
  ef: PipeFn<E, F>,
  fg: PipeFn<F, G>,
  gh: PipeFn<G, H>,
  hi: PipeFn<H, I>,
  ij: PipeFn<I, J>,
  jk: PipeFn<J, K>,
  kl: PipeFn<K, L>,
  lm: PipeFn<L, M>,
  mn: PipeFn<M, N>,
  no: PipeFn<N, O>,
  op: PipeFn<O, P>,
  pq: PipeFn<P, Q>,
  qr: PipeFn<Q, R>,
  ...fns: Other
): (...args: Args) => ReturnType<TupleLast<Other>>
export function flow(
  f0: any,
  ...fns: any[]
) {
  return (...args: any[]) => fns.reduce((ret, fn) => fn(ret), f0(...args))
}

/**
 * Pipes the value of an expression into a pipeline of functions.
 *
 * @example
 *
 * ```ts
 * const len = (s: string): number => s.length
 * const double = (n: number): number => n * 2
 *
 * // without pipe
 * assert.strictEqual(double(len('aaa')), 6)
 *
 * // with pipe
 * assert.strictEqual(pipe('aaa', len, double)), 6)
 * ```
 */
export function pipe<A, B>(a: A, ab: PipeFn<A, B>): B
export function pipe<A, B, C>(a: A, ab: PipeFn<A, B>, bc: PipeFn<B, C>): C
export function pipe<A, B, C, D>(a: A, ab: PipeFn<A, B>, bc: PipeFn<B, C>, cd: PipeFn<C, D>): D
export function pipe<A, B, C, D, E>(a: A, ab: PipeFn<A, B>, bc: PipeFn<B, C>, cd: PipeFn<C, D>, de: PipeFn<D, E>): E
export function pipe<A, B, C, D, E, F>(
  a: A,
  ab: PipeFn<A, B>,
  bc: PipeFn<B, C>,
  cd: PipeFn<C, D>,
  de: PipeFn<D, E>,
  ef: PipeFn<E, F>
): F
export function pipe<A, B, C, D, E, F, G>(
  a: A,
  ab: PipeFn<A, B>,
  bc: PipeFn<B, C>,
  cd: PipeFn<C, D>,
  de: PipeFn<D, E>,
  ef: PipeFn<E, F>,
  fg: PipeFn<F, G>,
): G
export function pipe<A, B, C, D, E, F, G, H>(
  a: A,
  ab: PipeFn<A, B>,
  bc: PipeFn<B, C>,
  cd: PipeFn<C, D>,
  de: PipeFn<D, E>,
  ef: PipeFn<E, F>,
  fg: PipeFn<F, G>,
  gh: PipeFn<G, H>
): H
export function pipe<A, B, C, D, E, F, G, H, I>(
  a: A,
  ab: PipeFn<A, B>,
  bc: PipeFn<B, C>,
  cd: PipeFn<C, D>,
  de: PipeFn<D, E>,
  ef: PipeFn<E, F>,
  fg: PipeFn<F, G>,
  gh: PipeFn<G, H>,
  hi: PipeFn<H, I>
): I
export function pipe<A, B, C, D, E, F, G, H, I, J>(
  a: A,
  ab: PipeFn<A, B>,
  bc: PipeFn<B, C>,
  cd: PipeFn<C, D>,
  de: PipeFn<D, E>,
  ef: PipeFn<E, F>,
  fg: PipeFn<F, G>,
  gh: PipeFn<G, H>,
  hi: PipeFn<H, I>,
  ij: PipeFn<I, J>
): J
export function pipe<A, B, C, D, E, F, G, H, I, J, K>(
  a: A,
  ab: PipeFn<A, B>,
  bc: PipeFn<B, C>,
  cd: PipeFn<C, D>,
  de: PipeFn<D, E>,
  ef: PipeFn<E, F>,
  fg: PipeFn<F, G>,
  gh: PipeFn<G, H>,
  hi: PipeFn<H, I>,
  ij: PipeFn<I, J>,
  jk: PipeFn<J, K>
): K
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L>(
  a: A,
  ab: PipeFn<A, B>,
  bc: PipeFn<B, C>,
  cd: PipeFn<C, D>,
  de: PipeFn<D, E>,
  ef: PipeFn<E, F>,
  fg: PipeFn<F, G>,
  gh: PipeFn<G, H>,
  hi: PipeFn<H, I>,
  ij: PipeFn<I, J>,
  jk: PipeFn<J, K>,
  kl: PipeFn<K, L>
): L
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M>(
  a: A,
  ab: PipeFn<A, B>,
  bc: PipeFn<B, C>,
  cd: PipeFn<C, D>,
  de: PipeFn<D, E>,
  ef: PipeFn<E, F>,
  fg: PipeFn<F, G>,
  gh: PipeFn<G, H>,
  hi: PipeFn<H, I>,
  ij: PipeFn<I, J>,
  jk: PipeFn<J, K>,
  kl: PipeFn<K, L>,
  lm: PipeFn<L, M>
): M
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
  a: A,
  ab: PipeFn<A, B>,
  bc: PipeFn<B, C>,
  cd: PipeFn<C, D>,
  de: PipeFn<D, E>,
  ef: PipeFn<E, F>,
  fg: PipeFn<F, G>,
  gh: PipeFn<G, H>,
  hi: PipeFn<H, I>,
  ij: PipeFn<I, J>,
  jk: PipeFn<J, K>,
  kl: PipeFn<K, L>,
  lm: PipeFn<L, M>,
  mn: PipeFn<M, N>
): N
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
  a: A,
  ab: PipeFn<A, B>,
  bc: PipeFn<B, C>,
  cd: PipeFn<C, D>,
  de: PipeFn<D, E>,
  ef: PipeFn<E, F>,
  fg: PipeFn<F, G>,
  gh: PipeFn<G, H>,
  hi: PipeFn<H, I>,
  ij: PipeFn<I, J>,
  jk: PipeFn<J, K>,
  kl: PipeFn<K, L>,
  lm: PipeFn<L, M>,
  mn: PipeFn<M, N>,
  no: PipeFn<N, O>
): O
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(
  a: A,
  ab: PipeFn<A, B>,
  bc: PipeFn<B, C>,
  cd: PipeFn<C, D>,
  de: PipeFn<D, E>,
  ef: PipeFn<E, F>,
  fg: PipeFn<F, G>,
  gh: PipeFn<G, H>,
  hi: PipeFn<H, I>,
  ij: PipeFn<I, J>,
  jk: PipeFn<J, K>,
  kl: PipeFn<K, L>,
  lm: PipeFn<L, M>,
  mn: PipeFn<M, N>,
  no: PipeFn<N, O>,
  op: PipeFn<O, P>
): P
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(
  a: A,
  ab: PipeFn<A, B>,
  bc: PipeFn<B, C>,
  cd: PipeFn<C, D>,
  de: PipeFn<D, E>,
  ef: PipeFn<E, F>,
  fg: PipeFn<F, G>,
  gh: PipeFn<G, H>,
  hi: PipeFn<H, I>,
  ij: PipeFn<I, J>,
  jk: PipeFn<J, K>,
  kl: PipeFn<K, L>,
  lm: PipeFn<L, M>,
  mn: PipeFn<M, N>,
  no: PipeFn<N, O>,
  op: PipeFn<O, P>,
  pq: PipeFn<P, Q>
): Q
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(
  a: A,
  ab: PipeFn<A, B>,
  bc: PipeFn<B, C>,
  cd: PipeFn<C, D>,
  de: PipeFn<D, E>,
  ef: PipeFn<E, F>,
  fg: PipeFn<F, G>,
  gh: PipeFn<G, H>,
  hi: PipeFn<H, I>,
  ij: PipeFn<I, J>,
  jk: PipeFn<J, K>,
  kl: PipeFn<K, L>,
  lm: PipeFn<L, M>,
  mn: PipeFn<M, N>,
  no: PipeFn<N, O>,
  op: PipeFn<O, P>,
  pq: PipeFn<P, Q>,
  qr: PipeFn<Q, R>
): R
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, Other extends PipeFn<any, any>[]>(
  a: A,
  ab: PipeFn<A, B>,
  bc: PipeFn<B, C>,
  cd: PipeFn<C, D>,
  de: PipeFn<D, E>,
  ef: PipeFn<E, F>,
  fg: PipeFn<F, G>,
  gh: PipeFn<G, H>,
  hi: PipeFn<H, I>,
  ij: PipeFn<I, J>,
  jk: PipeFn<J, K>,
  kl: PipeFn<K, L>,
  lm: PipeFn<L, M>,
  mn: PipeFn<M, N>,
  no: PipeFn<N, O>,
  op: PipeFn<O, P>,
  pq: PipeFn<P, Q>,
  qr: PipeFn<Q, R>,
  ...fns: Other
): ReturnType<TupleLast<Other>>
export function pipe(
  a: any,
  ...fns: any[]
) {
  return fns.reduce((ret, fn) => fn(ret), a)
}
