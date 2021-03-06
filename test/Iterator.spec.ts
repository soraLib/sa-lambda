import { isEmpty, iter, Iter, collect, to, map, replicate, chain, join, filter, reduce } from '../src/Iterator'
import { none, some } from '../src/Maybe'
import { flow, pipe } from '../src/Pipe'

describe('iter', () => {
  it('constructor', () => {
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
    expect(iter([1]).push(2, 3).collect()).toEqual([1, 2, 3])
  })

  it('toArray', () => {
    expect(iter([1, 2, 3]).toArray()).toEqual([1, 2, 3])
    expect(iter(new Set([1, 2, 3])).toArray()).toEqual([1, 2, 3])
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

  it('collect', () => {
    expect(iter([1, 2, 3]).collect()).toEqual([1, 2, 3])
    expect(new Iter(function* () {
      for(let i = 1; i <= 3; i++) yield i
    }).collect()).toEqual([1, 2, 3])
  })

  it('join', () => {
    expect(flow(join('-'))(['a', 'b', 'c'])).toBe('a-b-c')
    expect(iter(['a', 'b', 'c']).join('-')).toBe('a-b-c')
    expect(iter(['a', 'b', 'c']).join()).toBe('a,b,c')
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
    expect(iter([1, 2, 3, 4].filter((a: number) => a % 2 === 0)).collect()).toEqual([2, 4])
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

  it('makeBy', () => {
    expect(Iter.makeBy(3, (n) => `${n}`).collect()).toEqual(['0', '1', '2'])
  })

  it('replicate', () => {
    expect(flow(replicate, collect)('a', 2)).toEqual(['a', 'a'])
    expect(Iter.replicate('a', 2).collect()).toEqual(['a', 'a'])
  })

  it('chain', () => {
    const f = (n: number) => flow(replicate, collect)(`${n}`, n)

    expect(flow(map(f), collect)([1, 2, 3])).toEqual([['1'], ['2', '2'], ['3', '3', '3']])
    expect(iter([1, 2, 3]).chain(f).collect()).toEqual(['1', '2', '2', '3', '3', '3'])
  })

  it('isEmpty', () => {
    expect(isEmpty([])).toBeTruthy()
    expect(isEmpty(new Map())).toBeTruthy()
    expect(isEmpty(new Set())).toBeTruthy()
    expect(isEmpty({ [Symbol.iterator]: function*() { /*  */} })).toBeTruthy()
    expect(isEmpty({ [Symbol.iterator]: function*() { yield 1 } })).toBeFalsy()
    expect(iter([1]).isEmpty()).toBeFalsy()
  })

  it('reduce', () => {
    const f = flow(
      reduce((prev: number, cur: number) => prev + cur, 1)
    )

    expect(f([2, 3, 4])).toBe(10)
    expect(iter([2, 3, 4]).reduce((prev: number, cur: number) => prev + cur, 1)).toBe(10)

    const f2 = flow(
      reduce((prev: number, cur: number) => prev + cur)
    )

    expect(f2([2])).toBe(2)
    expect(f2([2, 3, 4])).toBe(9)
    expect(f2(new Set([2, 3, 4]))).toBe(9)
    expect(() => f2([])).toThrow(/ERR/)
  })

  it('head', () => {
    expect(iter([1, 2, 3]).head()).toEqual(some(1))
    expect(iter([]).head()).toEqual(none)
  })

  it('tail', () => {
    expect(iter([1, 2, 3]).tail()).toEqual(some(3))
    expect(iter([]).tail()).toEqual(none)
  })
})

it('compose1', () => {
  const size = 2

  const f = flow(
    to,
    chain(
      x => pipe(
        size,
        to,
        map(y => [x, y])
      )
    ),
    collect,
  )

  expect(f(size)).toEqual([[0, 0], [0, 1], [1, 0], [1, 1]])
})
