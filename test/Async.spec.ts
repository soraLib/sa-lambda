import { delay, microtask } from '../src/Delay'
import { AsyncQueue, retry } from '../src/Async'

test('delay', () => {
  let num = 0
  delay(10).then(() => {
    num = 1
    expect(num).toBe(1)
  })
  expect(num).toBe(0)
})

test('microtask', () => {
  let num = 0
  microtask().then(() => {
    num = 1
    expect(num).toBe(1)
  })
  expect(num).toBe(0)
})

test('async queue with limit 1', async () => {
  const aqueue = new AsyncQueue(1)

  const seq: number[] = []
  const res = await Promise.all([
    aqueue.run(() => new Promise(then => delay(200).then(() => { then(200); seq.push(200) }))),
    aqueue.run(() => new Promise(then => delay(100).then(() => { then(100); seq.push(100) }))),
    aqueue.run(() => new Promise(then => delay(150).then(() => { then(150); seq.push(150) })))
  ])
  expect(seq).toEqual([200, 100, 150])
  expect(res).toEqual([200, 100, 150])
})

test('async queue with limit 2', async () => {
  const aqueue = new AsyncQueue(2)

  const seq: number[] = []
  const res = await Promise.all([
    aqueue.run(() => new Promise(then => delay(200).then(() => { then(200); seq.push(200) }))),
    aqueue.run(() => new Promise(then => delay(100).then(() => { then(100); seq.push(100) }))),
    aqueue.run(() => new Promise(then => delay(150).then(() => { then(150); seq.push(150) })))
  ])
  expect(seq).toEqual([100, 200, 150])
  expect(res).toEqual([200, 100, 150])
})

test('async queue without limit', async () => {
  const aqueue = new AsyncQueue()

  const seq: number[] = []
  const res = await Promise.all([
    aqueue.run(() => new Promise(then => delay(200).then(() => { then(200); seq.push(200) }))),
    aqueue.run(() => new Promise(then => delay(100).then(() => { then(100); seq.push(100) }))),
    aqueue.run(() => new Promise(then => delay(150).then(() => { then(150); seq.push(150) })))
  ])
  expect(seq).toEqual([100, 150, 200])
  expect(res).toEqual([200, 100, 150])
})

test('retry', async () => {
  retry(() => 1).then(r => expect(r).toBe(1))
  retry(() => 2, 3).then(r => expect(r).toBe(2))
  retry(() => new Promise(r => r(3))).then(r => expect(r).toBe(3))
  retry(() => new Promise(r => r(4)), { interval: 200 }).then(r => expect(r).toBe(4))
  retry((retry) => new Promise((_, e) => e(retry)), { times: 2 }).catch(e => expect(e).toBe(2))
  retry((retry) => new Promise((then, error) => {
    if (retry === 3) return then(retry)
    error(-1)
  }), { times: 3, interval: 200 }).catch(e => expect(e).toBe(3))
})
