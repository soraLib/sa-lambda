import { expect, it } from 'vitest'
import { identity } from '../src/function'
import { flow, pipe } from '../src/Pipe'

it('identity', () => {
  expect(identity(1)).toBe(1)
})

it('flow1', () => {
  const f = flow(
    (a: number) => a + 1,
  )
  expect(f(1)).toBe(1 + 1)
})

it('flow2', () => {
  const f = flow(
    (a: number) => a + 1,
    (a: number) => a + 2,
  )
  expect(f(1)).toBe(4)
})

it('flow3', () => {
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

it('flow4', () => {
  const f = flow(
    (a: number, b: number) => a + b,
    (a: number) => a + 2,
  )
  expect(f(1, 2)).toBe(1 + 2 + 2)
})

it('pipe1', () => {
  expect(
    pipe(
      1,
      (a: number) => a + 1,
      (a: number) => a + 2,
    ),
  ).toBe(1 + 1 + 2)
})

it('pipe2', () => {
  expect(
    pipe(
      1,
      (a: number) => a + 1,
      (a: number) => a + 2,
      (a: number) => a + 3,
      (a: number) => a + 4,
      (a: number) => a + 5,
      (a: number) => a + 6,
    ),
  ).toBe(1 + 1 + 2 + 3 + 4 + 5 + 6)
})
