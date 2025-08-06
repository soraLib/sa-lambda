import { expect, it } from 'vitest'
import { AsyncQueue, deferred, retry } from '../src/Async'
import { delay, microtask } from '../src/Delay'
import { max } from '../src/Math'

it('delay', () => {
  let num = 0
  delay(10).then(() => {
    num = 1
    expect(num).toBe(1)
  })
  expect(num).toBe(0)
})

it('microtask', () => {
  let num = 0
  microtask().then(() => {
    num = 1
    expect(num).toBe(1)
  })
  expect(num).toBe(0)
})

it('async queue size', async () => {
  const aqueue = new AsyncQueue(1)

  aqueue.run(delay)
  expect(aqueue.size).toEqual(1)
  aqueue.run(delay)
  expect(aqueue.size).toEqual(2)
})

it('async queue with limit 1', async () => {
  const aqueue = new AsyncQueue(1)

  const seq: number[] = []
  const res = await Promise.all([
    aqueue.run(() => new Promise(then => delay(200).then(() => { then(200); seq.push(200) }))),
    aqueue.run(() => new Promise(then => delay(100).then(() => { then(100); seq.push(100) }))),
    aqueue.run(() => new Promise(then => delay(150).then(() => { then(150); seq.push(150) }))),
  ])
  expect(aqueue.size).toEqual(0)
  expect(seq).toEqual([200, 100, 150])
  expect(res).toEqual([200, 100, 150])
})

it('async queue with limit 2', async () => {
  const aqueue = new AsyncQueue(2)

  const seq: number[] = []
  const res = await Promise.all([
    aqueue.run(() => new Promise(then => delay(200).then(() => { then(200); seq.push(200) }))),
    aqueue.run(() => new Promise(then => delay(100).then(() => { then(100); seq.push(100) }))),
    aqueue.run(() => new Promise(then => delay(150).then(() => { then(150); seq.push(150) }))),
  ])
  expect(seq).toEqual([100, 200, 150])
  expect(res).toEqual([200, 100, 150])
})

it('async queue without limit', async () => {
  const aqueue = new AsyncQueue()

  const seq: number[] = []
  const res = await Promise.all([
    aqueue.run(() => new Promise(then => delay(200).then(() => { then(200); seq.push(200) }))),
    aqueue.run(() => new Promise(then => delay(100).then(() => { then(100); seq.push(100) }))),
    aqueue.run(() => new Promise(then => delay(150).then(() => { then(150); seq.push(150) }))),
  ])
  expect(seq).toEqual([100, 150, 200])
  expect(res).toEqual([200, 100, 150])
})

it('retry', async () => {
  retry(() => 1).then(r => expect(r).toBe(1))
  retry(() => 2, 3).then(r => expect(r).toBe(2))
  retry(() => new Promise(r => r(3))).then(r => expect(r).toBe(3))
  retry(() => new Promise(r => r(4)), { interval: 200 }).then(r => expect(r).toBe(4))
  retry(retry => new Promise((_, e) => e(retry)), { times: 2 }).catch(e => expect(e).toBe(2))
  retry(retry => new Promise((then, error) => {
    if (retry === 3)
      return then(retry)
    error(new Error('-1'))
  }), { times: 3, interval: 200 }).catch(e => expect(e).toBe(3))
})

it('deferred', async () => {
  deferred(() => 1).execute().then(r => expect(r).toBe(1))
  deferred(max).execute(1, 2, 3).then(r => expect(r).toBe(3))
  deferred(() => 1, {
    delay: 100,
    onSuccess: r => expect(r).toBe(1),
  }).execute().then(r => expect(r).toBe(1))
  deferred(() => { throw 0 }, {
    onError: err => expect(err).toBe(0),
  }).execute().catch(err => expect(err).toBe(0))
})
