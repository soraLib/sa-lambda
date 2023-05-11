# Async

`AsyncQueue` used to ensure that the asynchronous tasks processed in sequence and do not exceed the maximum concurrency limit.

Of course, the limit is a a customizable number, we can set any positive integer in the `AsyncQueue`.

In addition, we can also remove the maximum concurrency limit by not setting a specific value.

## Example

```ts
import { AsyncQueue } from 'sa-lambda/Async'

const aqueue = new AsyncQueue(1)
aqueue.run(() => fetch('foo'))
aqueue.run(() => fetch('boo'))
```

## API

### AsyncQueue

```ts
declare class AsyncQueue {
  private limit;
  private size;
  private queue;
  /**
   * @param limit Maximum concurrency limit
   */
  constructor(limit?: number);
  /**
   * @param option Asynchronous Queue options
   */
  constructor(option?: {
  /**
   * Maximum concurrency limit
   */
    limit?: number;
  });
  private process;
  private afterProcess;
  /**
   * Runs a asynchronous task in the async queue.
   */
  run<A>(f: () => Promise<A>): Promise<A>;
}
```

Queues the asynchronous tasks then processes sequentially under the maximum restriction.

```ts
const aqueue = new AsyncQueue(1)
const seq: number[] = []
const res = await Promise.all([
  aqueue.run(() => new Promise(then => delay(200).then(() => { then(200); seq.push(200) }))),
  aqueue.run(() => new Promise(then => delay(100).then(() => { then(100); seq.push(100) }))),
  aqueue.run(() => new Promise(then => delay(150).then(() => { then(150); seq.push(150) })))
])

seq ➔ [200, 100, 150]
res ➔ [200, 100, 150]
```

### retry

```ts
RetryOption = {
  /**
   * The time to wait between retries, in milliseconds. The default is 0.
   */
  interval?: number;
  /**
   * The number of attempts to make before giving up. The default is 3.
   */
  times?: number;
}

<A>(fn: ((times: number) => Promise<A>) | (() => A), times?: number): Promise<A>;
<A>(fn: ((times: number) => Promise<A>) | (() => A), options: RetryOption): Promise<A>;
```

Attempts to get a successful response from task no more than times times before returning an error.

```ts
await retry(() => new Promise(r => r(1)), 3)       ➔ 1
await retry(() => 2), { times: 3, interval: 300 }) ➔ 2
```

### deferred

```ts
type Thenable<Params extends any[], Data> = (
  (...args: Params) => Promise<Data>)  | ((...args: Params) => Data);
interface DeferredOptions<D = any> {
  /**
   * Optional delay in milliseconds before executing the function.
   *
   * @default 0
   */
  delay?: number;
  onError?: (e: unknown) => void;
  onSuccess?: (data: D) => void;
}
interface DeferredReturn<Data, Params extends any[]> {
  execute: (delay?: number, ...args: Params) => Promise<Data>;
}
/**
 * @param promise The promise or thenable function to be executed.
 * @param options Optional configuration for the deferred function.
 * @returns An object with the execute method that can be called to execute the deferred function.
 */
<Data, Params extends any[] = []>(
  promise: Promise<Data> | Thenable<Params, Data>,
  options?: DeferredOptions<Data> | undefined) => DeferredReturn<Data, Params>;
```

Creates a deferred function that wraps a promise or a thenable function, allowing delayed execution and handling of success and error cases.

```ts
deferred(() => 1).execute().then(r => expect(r).toBe(1))
deferred(() => { throw 0 }).execute().catch(err => expect(err).toBe(0))
```