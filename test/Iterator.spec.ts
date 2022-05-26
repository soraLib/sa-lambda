import { isEmpty, iter, Iter, collect, to, map, flatten, replicate, chain, join, chainWithIndex, filter } from '../src/Iterator'
import { flow } from '../src/function'

it('isEmpty', () => {
  expect(isEmpty([])).toBeTruthy()
  expect(isEmpty(new Map())).toBeTruthy()
  expect(isEmpty(new Set())).toBeTruthy()
  expect(isEmpty({ [Symbol.iterator]: function*() { /*  */} })).toBeTruthy()
  expect(isEmpty({ [Symbol.iterator]: function*() { yield 1 } })).toBeFalsy()
})

describe('iter', () => {
  it('iterator', () => {
    expect(flow(iter, collect)([1, 2, 3])).toEqual([1, 2, 3])
  })

  it('arr', () => {
    expect(iter([1, 2, 3]).arr).toEqual([1, 2, 3])
    expect(iter(new Map([[1, 2], [3, 4]])).arr).toEqual([[1, 2], [3, 4]])
  })

  it('isEmpty', () => {
    expect(iter([]).isEmpty()).toBeTruthy()
  })

  it('push', () => {
    expect(iter([1]).push(...[2, 3]).collect()).toEqual([1, 2, 3])
  })

  it('unshift', () => {
    expect(iter([1]).unshift(...[2, 3]).collect()).toEqual([2, 3, 1])
  })

  it('of', () => {
    expect(Iter.of(1, 2).collect()).toEqual([1, 2])
  })

  it('to', () => {
    expect(Iter.to(3).collect()).toEqual([0, 1, 2])
    expect(Iter.to(3, 0).collect()).toEqual([0, 1, 2])
    expect(Iter.to(6, 2).collect()).toEqual([0, 2, 4])
  })

  it('range', () => {
    expect(Iter.range(1, 3, -1).collect()).toEqual([1, 2])
    expect(Iter.range(1, 6, 2).collect()).toEqual([1, 3, 5])
    expect(Iter.range(3, 1, 1).collect()).toEqual([3, 2])
  })

  it('replicate', () => {
    expect(Iter.replicate('a', 2).collect()).toEqual(['a', 'a'])
  })

  it('makeBy', () => {
    expect(Iter.makeBy(3, n => n * 2).collect()).toEqual([0, 2, 4])
  })

  it('collect', () => {
    expect(iter([1, 2, 3]).collect()).toEqual([1, 2, 3])
    expect(new Iter(function* () {
      for(let i = 1; i <= 3; i++) yield i
    }).collect()).toEqual([1, 2, 3])
  })

  it('join', () => {
    expect(flow(join('-'))(['a', 'b', 'c'])).toBe('a-b-c')
    expect(iter(['a', 'b', 'c']).join('-')).toBe('a-b-c')
    expect(new Iter(function* () {
      yield 'a'
      yield 'b'
      yield 'c'
    }).join('-')).toBe('a-b-c')
  })

  it('count', () => {
    expect(iter([1, 2, 3]).count()).toBe(3)
    expect(new Iter(function* () {
      yield 1
      yield 2
      yield 3
    }).count()).toBe(3)
    expect(iter(new Set([1, 2, 3])).count()).toBe(3)
  })

  it('filter', () => {
    const f = flow(
      filter((a: number) => a % 2 === 0),
      collect
    )

    expect(f([1, 2, 3, 4])).toEqual([2, 4])
  })

  it('zipWith', () => {
    expect(iter([1, 2, 3]).zipWith([0, 1], (a, b) => a + b).collect()).toEqual([1, 3])
    expect(iter([1, 2]).zipWith([0, 1, 2], (a, b) => a + b).collect()).toEqual([1, 3])
    expect(new Iter(function* () {
      yield 1
      yield 2
      yield 3
    }).zipWith([0, 1], (a, b) => a + b).collect()).toEqual([1, 3])
  })

  it('zip', () => {
    expect(iter([1, 2, 3]).zip([0, 1]).collect()).toEqual([[1, 0], [2, 1]])
    expect(iter([1, 2]).zip([0, 1, 2]).collect()).toEqual([[1, 0], [2, 1]])
    expect(new Iter(function* () {
      yield 1
      yield 2
      yield 3
    }).zip([0, 1]).collect()).toEqual([[1, 0], [2, 1]])
  })

  it('unzip', () => {
    expect(iter([[1, 'a'], [2, 'b']]).unzip().collect()).toEqual([[1, 2], ['a', 'b']])
  })

  it('map', () => {
    expect(iter([1, 2, 3]).map(n => n * 2).collect()).toEqual([2, 4, 6])
  })

  it('flatten', () => {
    expect(iter([[1], [2, 3]]).flatten().collect()).toEqual([1, 2, 3])
  })

  it('replicate', () => {
    expect(flow(replicate, collect)('a', 2)).toEqual(['a', 'a'])
  })

  it('chainWithIndex', () => {
    expect(flow(chainWithIndex((i, a) => [i, a]), collect)(['a', 'b'])).toEqual([0, 'a', 1, 'b'])
  })

  it('chain', () => {
    const f = (n: number) => flow(replicate, collect)(`${n}`, n)

    expect(flow(map(f), collect)([1, 2, 3])).toEqual([['1'], ['2', '2'], ['3', '3', '3']])
    expect(flow(chain(f), collect)([1, 2, 3])).toEqual(['1', '2', '2', '3', '3', '3'])
  })

  it('compose1', () => {
    const f = flow(
      to,
      map(a => iter(to(2)).map(b => [a, b]).collect()),
      flatten,
      collect,
    )

    expect(f(2)).toEqual([[0, 0], [0, 1], [1, 0], [1, 1]])
  })
})
