import { pipe } from '../src/Pipe'
import { also, map, match, use, getOrSet, tryWithCallback } from '../src/Effect'


test('map', () => {
  expect(pipe(1, map(n => n + 1))).toBe(2)
})

test('use', () => {
  expect(use(1, n => n + 1)).toBe(2)
})

test('also', () => {
  let a = 0
  const b = also(1, (n) => a = n + 1)
  expect(a).toBe(2)
  expect(b).toBe(1)

  expect(also(1, () => void 0)).toBe(1)
})

test('match', () => {
  const m = match(
    () => 1,
    () => 0
  )

  expect(m(true)).toBe(1)
  expect(m(false)).toBe(0)
})

test('ge or set', () => {
  const source: Record<string, number> = {
    a: 0
  }

  expect(getOrSet(source, 'a', () => 1)).toBe(0)
  expect(getOrSet(source, 'b', () => 1)).toBe(1)
  expect(source['b']).toBe(1)
})


test('try with callback', () => {
  expect(tryWithCallback(() => 1, () => 2)).toBe(1)
  expect(tryWithCallback((): number => { throw 'error' }, () => 2)).toBe(2)
})
