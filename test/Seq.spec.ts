import { isEmpty, toArray, seq } from '../src/Seq'


it('isEmpty', () => {
  expect(isEmpty([])).toBeTruthy()
  expect(isEmpty(new Map())).toBeTruthy()
  expect(isEmpty(new Set())).toBeTruthy()
  expect(isEmpty({ [Symbol.iterator]: function*() { /*  */} })).toBeTruthy()
  expect(isEmpty({ [Symbol.iterator]: function*() { yield 1 } })).toBeFalsy()
})

describe('seq', () => {
  it('arr', () => {
    expect(seq([1, 2, 3]).arr).toEqual([1, 2, 3])
    expect(seq(new Map([[1, 2], [3, 4]])).arr).toEqual([[1, 2], [3, 4]])
  })

  it('isEmpty', () => {
    expect(seq([]).isEmpty()).toBeTruthy()
  })

  it('push', () => {
    expect(seq([1]).push(...[2, 3]).arr).toEqual([1, 2, 3])
  })

  it('unshift', () => {
    expect(seq([1]).unshift(...[2, 3]).arr).toEqual([2, 3, 1])
  })
})

