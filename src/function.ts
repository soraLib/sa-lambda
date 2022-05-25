import { TupleLast } from './TupleT'

/**
 * A lazy `thunk`
 */
export type Lazy<A> = () => A

/**
 * Identity
 */
export const identity = <A>(a: A): A => a


type PipeFn<A, B> = (a: A) => B

export function pipe<Args extends unknown[], A>(a: (...args: Args) => A): (...args: Args) => A
export function pipe<Args extends unknown[], A, B>(a: (...args: Args) => A, ab: PipeFn<A, B>): (...args: Args) => B
export function pipe<Args extends unknown[], A, B, C>(a: (...args: Args) => A, ab: PipeFn<A, B>, bc: PipeFn<B, C>): (...args: Args) => C
export function pipe<Args extends unknown[], A, B, C, D>(a: (...args: Args) => A, ab: PipeFn<A, B>, bc: PipeFn<B, C>, cd: PipeFn<C, D>): (...args: Args) => D
export function pipe<Args extends unknown[], A, B, C, D, E>(a: (...args: Args) => A, ab: PipeFn<A, B>, bc: PipeFn<B, C>, cd: PipeFn<C, D>, de: PipeFn<D, E>): (...args: Args) => E
export function pipe<Args extends unknown[], A, B, C, D, E, F>(
  a: (...args: Args) => A,
  ab: PipeFn<A, B>,
  bc: PipeFn<B, C>,
  cd: PipeFn<C, D>,
  de: PipeFn<D, E>,
  ef: PipeFn<E, F>
): (...args: Args) => F
export function pipe<Args extends unknown[], A, B, C, D, E, F, G>(
  a: (...args: Args) => A,
  ab: PipeFn<A, B>,
  bc: PipeFn<B, C>,
  cd: PipeFn<C, D>,
  de: PipeFn<D, E>,
  ef: PipeFn<E, F>,
  fg: PipeFn<F, G>,
): (...args: Args) => G
export function pipe<Args extends unknown[], A, B, C, D, E, F, G, H>(
  a: (...args: Args) => A,
  ab: PipeFn<A, B>,
  bc: PipeFn<B, C>,
  cd: PipeFn<C, D>,
  de: PipeFn<D, E>,
  ef: PipeFn<E, F>,
  fg: PipeFn<F, G>,
  gh: PipeFn<G, H>
): (...args: Args) => H
export function pipe<Args extends unknown[], A, B, C, D, E, F, G, H, I>(
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
export function pipe<Args extends unknown[], A, B, C, D, E, F, G, H, I, J>(
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
export function pipe<Args extends unknown[], A, B, C, D, E, F, G, H, I, J, K>(
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
export function pipe<Args extends unknown[], A, B, C, D, E, F, G, H, I, J, K, L>(
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
export function pipe<Args extends unknown[], A, B, C, D, E, F, G, H, I, J, K, L, M>(
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
export function pipe<Args extends unknown[], A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
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
export function pipe<Args extends unknown[], A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
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
export function pipe<Args extends unknown[], A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(
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
export function pipe<Args extends unknown[], A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(
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
export function pipe<Args extends unknown[], A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(
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
export function pipe<Args extends unknown[], A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, Other extends PipeFn<any, any>[]>(
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
export function pipe(
  f0: any,
  ...fns: any[]
) {
  return (...args: any[]) => fns.reduce((ret, fn) => fn(ret), f0(...args))
}
