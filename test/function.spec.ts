import { identity, flow, pipe } from '../src/function'

test('identity', () => {
  expect(identity(1)).toBe(1)
})

test('flow1', () => {
  const f = flow(
    (a: number) => a + 1,
  )
  expect(f(1)).toBe(1 + 1)
})

test('flow2', () => {
  const f = flow(
    (a: number) => a + 1,
    (a: number) => a + 2,
  )
  expect(f(1)).toBe(4)
})

test('flow3', () => {
  const f = flow(
    (a: number) => a + 1,
    (a: number) => a + 2,
    (a: number) => a + 3,
    (a: number) => a + 4,
    (a: number) => a + 5,
    (a: number) => a + 6,
  )
  expect(f(1)).toBe(1 + 1 + 2 + 3 + 4 + 5 + 6)
})

test('flow4', () => {
  const f = flow(
    (a: number, b: number) => a + b,
    (a: number) => a + 2,
  )
  expect(f(1, 2)).toBe(1 + 2 + 2)
})

test('pipe1', () => {
  expect(
    pipe(
      1,
      (a: number) => a + 1,
      (a: number) => a + 2,
    )).toBe(1 + 1 + 2)
})

test('pipe2', () => {
  expect(
    pipe(
      1,
      (a: number) => a + 1,
      (a: number) => a + 2,
      (a: number) => a + 3,
      (a: number) => a + 4,
      (a: number) => a + 5,
      (a: number) => a + 6,
    )).toBe(1 + 1 + 2 + 3 + 4 + 5 + 6)
})
