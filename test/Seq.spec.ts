import { isEmpty, seq, Seq, collect, to, map, zip, unzip, flatten } from '../src/Seq'
import { pipe } from '../src/function'


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

  it('of', () => {
    expect(Seq.of(1, 2).arr).toEqual([1, 2])
  })

  it('to', () => {
    expect(Seq.to(3).arr).toEqual([0, 1, 2])
    expect(Seq.to(3, 0).arr).toEqual([0, 1, 2])
    expect(Seq.to(6, 2).arr).toEqual([0, 2, 4])
  })

  it('range', () => {
    expect(Seq.range(1, 3, -1).arr).toEqual([1, 2])
    expect(Seq.range(1, 6, 2).arr).toEqual([1, 3, 5])
    expect(Seq.range(3, 1, 1).arr).toEqual([3, 2])
  })

  it('replicate', () => {
    expect(Seq.replicate('a', 2).arr).toEqual(['a', 'a'])
  })

  it('makeBy', () => {
    expect(Seq.makeBy(3, n => n * 2).arr).toEqual([0, 2, 4])
  })

  it('collect', () => {
    expect(seq([1, 2, 3]).collect()).toEqual([1, 2, 3])
    expect(new Seq(function* () {
      for(let i = 1; i <= 3; i++) yield i
    }).collect()).toEqual([1, 2, 3])
  })

  it('join', () => {
    expect(seq(['a', 'b', 'c']).join('-')).toBe('a-b-c')
    expect(new Seq(function* () {
      yield 'a'
      yield 'b'
      yield 'c'
    }).join('-')).toBe('a-b-c')
  })

  it('count', () => {
    expect(seq([1, 2, 3]).count()).toBe(3)
    expect(new Seq(function* () {
      yield 1
      yield 2
      yield 3
    }).count()).toBe(3)
    expect(seq(new Set([1, 2, 3])).count()).toBe(3)
  })

  it('zipWith', () => {
    expect(seq([1, 2, 3]).zipWith([0, 1], (a, b) => a + b).arr).toEqual([1, 3])
    expect(seq([1, 2]).zipWith([0, 1, 2], (a, b) => a + b).arr).toEqual([1, 3])
    expect(new Seq(function* () {
      yield 1
      yield 2
      yield 3
    }).zipWith([0, 1], (a, b) => a + b).arr).toEqual([1, 3])
  })

  it('zip', () => {
    expect(seq([1, 2, 3]).zip([0, 1]).arr).toEqual([[1, 0], [2, 1]])
    expect(seq([1, 2]).zip([0, 1, 2]).arr).toEqual([[1, 0], [2, 1]])
    expect(new Seq(function* () {
      yield 1
      yield 2
      yield 3
    }).zip([0, 1]).arr).toEqual([[1, 0], [2, 1]])
  })

  it('unzip', () => {
    expect(seq([[1, 'a'], [2, 'b']]).unzip()).toEqual([[1, 2], ['a', 'b']])
  })

  it('map', () => {
    expect(seq([1, 2, 3]).map(n => n * 2).arr).toEqual([2, 4, 6])
  })

  it('flatten', () => {
    expect(seq([[1], [2, 3]]).flatten().arr).toEqual([1, 2, 3])
  })

  it('compose1', () => {
    const f = pipe(
      (a: number) => to(a),
      (as) => map(as, a => to(2).map(b => [a, b])),
      flatten,
      collect,
    )

    expect(f(2)).toEqual([[0, 0], [0, 1], [1, 0], [1, 1]])
  })

})
