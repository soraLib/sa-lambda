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
  private size = 0
  private queue: AsyncTaskQueue = []

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
      this.size += 1

      return await a()
    } finally {
      this.size -= 1
      this.afterProcess()
    }
  }

  private async afterProcess() {
    if(isEmpty(this.queue)) return
    if(isNullable(this.limit) || (this.limit && this.size < this.limit) ) {
      const { f, then, err } = this.queue.shift()!
      this.process(f).then(then, err)
    }
  }

  /**
   * Runs a asynchronous task in the async queue.
   */
  async run<A>(f: () => Promise<A>): Promise<A> {
    if(isNullable(this.limit) || (this.limit && this.size < this.limit) ) {
      return await this.process(f)
    } else {
      return await new Promise<A>((then, err) => this.queue.push({ f, then, err }))
    }
  }
}
