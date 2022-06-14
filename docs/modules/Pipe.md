# Pipe

Performs left-to-right function composition. Each function takes the output of the previous one and ouput the result at last.

Every function's arguments must be unary except the first `flow` argument.

## Example

Without **pipe**

```ts
const plusOne = (n: number) => n + 1
const mulTwo = (n: number) => n * 2
const subThree = (n: number) => n - 3

subThree(mulTwo(plusOne(1))) // (1 + 1) * 2 - 3
subThree(mulTwo(plusOne(2))) // (2 + 1) * 2 - 3
```

With **pipe** and **flow**

```ts
import { pipe } from 'sa-lambda/pipe'

pipe(
  1,
  plusOne,
  mulTwo,
  subThree
)

const f = flow(
  plusOne,
  mulTwo,
  subThree
)

f(1)
f(2)
```

## API

### pipe

```ts
function pipe<A, B>(a: A, ab: PipeFn<A, B>): B
function pipe<A, B, C>(a: A, ab: PipeFn<A, B>, bc: PipeFn<B, C>): C
function pipe<A, B, C, D>(a: A, ab: PipeFn<A, B>, bc: PipeFn<B, C>, cd: PipeFn<C, D>): D
// and so on...
function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(
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
function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, Other extends PipeFn<any, any>[]>(
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
```

Takes a value as the first function arguement, then chain the subsequent functions with each previous output in left-to-right sequence.

```ts
pipe(0, n => n + 1, n => n + 2) ➔ 0 + 1 + 2
```

### flow

```ts
function flow<Args extends unknown[], A>(a: (...args: Args) => A): (...args: Args) => A
function flow<Args extends unknown[], A, B>(a: (...args: Args) => A, ab: PipeFn<A, B>): (...args: Args) => B
function flow<Args extends unknown[], A, B, C>(a: (...args: Args) => A, ab: PipeFn<A, B>, bc: PipeFn<B, C>): (...args: Args) => C
// and so on...
function flow<Args extends unknown[], A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(
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
function flow<Args extends unknown[], A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, Other extends PipeFn<any, any>[]>(
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
```

The `flow` operator is similar as [pipe](#pipe), but the first function in `flow` is allowed to have arguements more than one.

The most different thing is the `flow` creates a curry pipe function so it has the ability to accpect the input arguments later.
So according to this, it is often used to create a pipe that may be called many times with different input arguments.

```ts
const f = flow(
  (a: number, b: number) => a + b,
  (n: number) => n + 1,
  (n: number) => n + 2
)

f(1, 2)
f(2, 3)
```