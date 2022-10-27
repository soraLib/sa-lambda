import { pipe } from '../src/Pipe'
import { also, map, match, use } from '../src/Effect'


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
