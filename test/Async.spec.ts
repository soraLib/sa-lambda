import { delay, microtask } from '../src/delay'

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
