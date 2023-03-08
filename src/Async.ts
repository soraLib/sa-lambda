import { isNullable } from './function'
import { isEmpty } from './Iterator'

/** Asynchronous tasks queued for execution */
type AsyncTaskQueue = { f: () => Promise<any>, then: (v: any) => void, err: (e: any) => void }[]

export type AsyncQueueOption = {
  /**
   * Maximum concurrency limit
   */
  limit?: number
}

/**
 * Queues the asynchronous tasks then processes sequentially under the maximum restriction.
 *
 * @example
 *
 * ```ts
 * const aqueue = new AsyncQueue(1)
 * const seq: number[] = []
 * const res = await Promise.all([
 *   aqueue.run(() => new Promise(then => delay(200).then(() => { then(200); seq.push(200) }))),
 *   aqueue.run(() => new Promise(then => delay(100).then(() => { then(100); seq.push(100) }))),
 *   aqueue.run(() => new Promise(then => delay(150).then(() => { then(150); seq.push(150) })))
 * ])
 * assert.deepStrictEqual(seq, [200, 100, 150])
 * assert.deepStrictEqual(res, [200, 100, 150])
 * ```
 */
export class AsyncQueue {
  private limit: number | undefined
  private count = 0
  private queue: AsyncTaskQueue = []

  /**
   * Returns the total number of tasks currently being executed and in the waiting queue.
   */
  get size() {
    return this.queue.length + this.count
  }
  /**
   * Alias of `size`.
   */
  get length() {
    return this.size
  }

  /**
   * @param limit Maximum concurrency limit
   */
  constructor(limit?: number)
  /**
   * @param option Asynchronous Queue options
   */
  constructor(option?: AsyncQueueOption)
  constructor(option?: AsyncQueueOption | number) {
    this.limit = typeof option === 'number' ? option : option?.limit
  }

  private async process<A>(a: () => PromiseLike<A>) {
    try {
      this.count += 1

      return await a()
    } finally {
      this.count -= 1
      this.afterProcess()
    }
  }

  private async afterProcess() {
    if(isEmpty(this.queue)) return
    if(isNullable(this.limit) || (this.limit && this.count < this.limit) ) {
      const { f, then, err } = this.queue.shift()!
      this.process(f).then(then, err)
    }
  }

  /**
   * Runs a asynchronous task in the async queue.
   */
  async run<A>(f: () => Promise<A>): Promise<A> {
    if(isNullable(this.limit) || (this.limit && this.count < this.limit) ) {
      return await this.process(f)
    } else {
      return await new Promise<A>((then, err) => this.queue.push({ f, then, err }))
    }
  }
}


export type RetryOption = {
  /**
   * The time to wait between retries, in milliseconds. The default is 0.
   */
  interval?: number
  /**
   * The number of attempts to make before giving up. The default is 3.
   */
  times?: number
}
type Fn<A> = ((times: number) => Promise<A>) | (() => A)
/**
 * Attempts to get a successful response from task no more than times times before returning an error.
 *
 * @example
 *
 * ```ts
 * const res = await retry(() => new Promise(r => r(1)), 3)
 * assert.deepStrictEqual(res, 1)
 *
 * const res = await retry(() => 2), { times: 3, interval: 300 })
 * assert.deepStrictEqual(res, 2)
 * ```
 */
export async function retry<A>(fn: Fn<A>, times?: number): Promise<A>
export async function retry<A>(fn: Fn<A>, options: RetryOption): Promise<A>
export async function retry<A>(fn: Fn<A>, options: number | RetryOption = 1): Promise<A> {
  let interval: number
  let times: number
  let retry = 1

  if(typeof options === 'number') {
    times = options
  } else {
    times = options.times ?? 1
    interval = options.interval ?? 0
  }

  return new Promise((resolve, reject) => {
    const attempt = async () => {
      try {
        const res = await fn(retry)
        resolve(res)
      } catch(error) {
        if (retry < times) {
          retry++
          interval ? setTimeout(attempt, interval) : attempt()
        } else {
          reject(error)
        }
      }
    }
    attempt()
  })
}
