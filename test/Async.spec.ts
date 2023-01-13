import { delay, microtask } from '../src/Delay'
import { AsyncQueue } from '../src/Async'

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

