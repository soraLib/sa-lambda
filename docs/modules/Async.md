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