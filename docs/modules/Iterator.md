# Iterator

Provides some methods for iterable object.

## Example

Without **Iterator**

```ts
[{ name: 'foo' }][2].name // error: Cannot read properties of undefined
```

With **Iterator**

```ts
import { nth } from 'sa-lambda/Iterator'

pipe([{ name: 'foo' }], nth(2), Maybe.map(v => v.name))
```

## API

### isEmpty

```ts
<A>(ma: Iterable<A>) => boolean
```

Returns whether an iterator is empty.

```ts
isEmpty([])        ➔ true
isEmpty(new Map()) ➔ true
isEmpty(new Set()) ➔ true
isEmpty({ [Symbol.iterator]: function*() {} }) ➔ true
```

### toArray

```ts
<A>(ma: Iterable<A>) => A[]
```

Returns if the iterator is instanceof `Array`, otherwise returns a new array created by `Array.from`.

```ts
toArray([1, 2, 3])          ➔ [1, 2, 3]
toArray(new Set([1, 2, 3])) ➔ [1, 2, 3]
```

### push

```ts
<A>(a: Iterable<A>, ...as: A[]): Iterable<A>
```

Returns an iterator with the elements at last.

### unshift

```ts
<T>(a: Iterable<T>, ...items: T[]): Iterable<T>
```

Returns an iterator with the elements at start.

### of

```ts
<A>(...as: A[]): Iterable<A>
```

Creates an iterator with an array.


### empty

```ts
<A>() => Iterable<A>
```

Returns an empty list.

### zero

```ts
<A>() => Iterable<A>
```

### isOutOfBounds

```ts
(index: number) => <A>(as: Iterable<A>) => boolean
```

Returns whether the index is out of bounds.

```ts
pipe([1, 2, 3], isOutOfBounds(1))  ➔ false
pipe([1, 2, 3], isOutOfBounds(-1)) ➔ true
pipe([1, 2, 3], isOutOfBounds(3))  ➔ true
```

### nth

```
(index: number) => <A>(as: Iterable<A>) => Maybe<A>
```

Returns the value at the index of a iterator and wrapped in a Some if the index is not out of bounds. Otherwise returns a none.

```ts
pipe([1, 2, 3], nth(1))  ➔ some(2)
pipe([1, 2, 3], nth(-1)) ➔ some(3)
pipe([1, 2, 3], nth(3))  ➔ none
```

Alias of `empty`.

### map 

```ts
<A, B>(f: (a: A) => B) => (ma: Iterable<A>) => Iterable<B>
```

Calls a callback function on each element of the iterator, and returns an iterator contains the results.

```ts
map([1, 2, 3], map(n => n * 2), collect) ➔ [2, 4, 6]
```

### range

```ts
(from: number, end: number, step?: number): Iterable<number>
```

Creates an iterator from a given range with step.

```ts
flow(range, collect)(1, 3)    ➔ [1, 2]
flow(range, collect)(1, 6, 2) ➔ [1, 3, 5]
flow(range, collect)(3, 1)    ➔ [3, 2]
```

### to

```ts
(end: number, step?: number) => Iterable<number>
```

Creates an iterator from a range starting from `0` to end with step.

```ts
flow(to, collect)(3)    ➔ [1, 2]
flow(to, collect)(6, 2) ➔ [0, 2, 4]
```

### makeBy

```ts
<A>(n: number, f: (i: number) => A): Iterable<A>
```

Creates an iterator of length `n` initialized with `f(i)`.

```ts
flow(makeBy, collect)(3, n => n * 2) ➔ [0, 2, 4]
```

### replicate

```ts
<A>(ma: A, n: number) => Iterable<A>
```

Creates an iterator from a value repeated the specified number of times.

```ts
flow(replicate, collect)('a', 2) ➔ ['a', 'a']
```

### collect

```ts
<A>(ma: Iterable<A>) => A[]
```
Creates an array from an iterator.

```ts
collect([1, 2, 3]) ➔ [1, 2, 3]
collect(function* () {
  for(let i = 1; i <=3; i++) yield i
}) ➔ [1, 2, 3]
```

### join

```ts
(seperator?: string | undefined) => <A>(ma: Iterable<A>) => string
```

Adds all the elements of an iterator into a string, separated by the specified separator string.

```ts
pipe(['a', 'b', 'c'], join('-')) ➔ 'a-b-c'
```

### count

```ts
<A>(ma: Iterable<A>) => number
```

Returns the length or size of an iterator.

```ts
count([1, 2, 3]) ➔ 3
count(function* () {
  yield 1
  yield 2
  yield 3
}) ➔ 3
```

### filter

```ts
<A>(predicate: Predicate<A>) => (ma: Iterable<A>) => Iterable<A>
```

Returns an iterator that elements meet the condition specified in a predicate function.

```ts
pipe([1, 2, 3, 4], filter(a => a % 2 === 0)) ➔ [2, 4]
```

### alt

```ts
<B>(that: Lazy<Iterable<B>>) => <A>(ma: Iterable<A>) => Iterable<B | A>
```

Concats two iterators that have different types.

```ts
pipe([1], alt(() => ['2', '3']), collect) ➔ [1, '2', '3']
```

### ap

```ts
<A>(ma: Iterable<A>) => <B>(f: Iterable<(a: A) => B>) => Iterable<B>
```

Chains the result of the applying function to the iterator with the other.

```ts
const f = (s: string) => (n: number) => s + n
pipe(['a', 'b'], map(f), ap([1, 2]), collect) ➔ ['a1', 'a2', 'b1', 'b2']
```

### reduce

```ts
<A>(f: (b: A, a: A, i: number, as: Iterable<A>) => A): (as: Iterable<A>) => A
<A>(f: (b: A, a: A, i: number, as: Iterable<A>) => A, b: A): (as: Iterable<A>) => A
<A, B>(f: (b: B, a: A, i: number, as: Iterable<A>) => B, b: B): (as: Iterable<A>) => B
```

Calls the specified callback function for all the elements in an iterator.
The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

```ts
pipe([2, 3, 4], reduce((acc: number, cur: number) => acc + cur, 1)) ➔ 10
```

### head

```ts
<A>(ma: Iterable<A>) => None | Some<A>
```

Returns `Some` the first element of an iterable if it exists, otherwise returns `None`.

```ts
head([1, 2, 3]) ➔ some(1)
head([])        ➔ none
```

### tryHead

```ts
<A>(ma: Iterable<A>) => A | undefined
```
Try to return the first element of an iterator.

```ts
tryHead([1, 2, 3]) ➔ 1
tryHead([])        ➔ undefined
```

### tail

```ts
<A>(ma: Iterable<A>) => None | Some<A>
```

Returns `Some` the last element of an iterable if it exists, otherwise returns `None`.

```ts
tail([1, 2, 3]) ➔ some(3)
tail([])        ➔ none
```

### tryTail

```ts
<A>(ma: Iterable<A>) => A | undefined
```

Try to return the last element of an iterator.

```
tryTail([1, 2, 3]) ➔ 3
tryTail([])        ➔ undefined
```

### concat

```ts
<A>(...items: Iterable<A>[]) => <B>(ma: Iterable<B>) => Iterable<A | B>
```

Combines two or more iterators.

```ts
pipe([1], concat([2, 3], [4, 5]), collect) ➔ [1, 2, 3, 4, 5]
```

### group

``` ts
<T>(ma: Iterable<T>, size: number) => Iterable<Iterable<T>>
```

Splits an iterator into a group of iterators by the size of per group.

```ts
group([1, 2, 3, 4, 5, 6, 7], 2) ➔ [[1, 2], [3, 4], [5, 6], [7]]
group([1, 2, 3, 4, 5, 6, 7], 3) ➔ [[1, 2, 3], [4, 5, 6], [7]]
```

### zipWith

```ts
<A, B, C>(a: Iterable<A>, b: Iterable<B>, f: (a: A, b: B) => C): Iterable<C>
```

Takes two iterator and returns an iterator of the function results. If one iterator is short, excess items of the longer iterator are discarded.

```ts
flow(zipWith, collect)([1, 2], [1, 2], (a, b) => a + b)                   ➔ [2, 4]
flow(zipWith, collect)(function* () { yield 1 }, [1, 2], (a, b) => a + b) ➔ [2]
```

### zip

```ts
<A, B>(a: Iterable<A>, b: Iterable<B>): Iterable<[A, B]>
```

Takes two iterator and returns an iterator of corresponding pairs. If one iterator is short, excess items of the longer iterator are discarded.

```ts
flow(zip, collect)([1, 2], [1, 2])                   ➔ [[1, 1] [2, 2]]
flow(zip, collect)(function* () { yield 1 }, [1, 2]) ➔ [[1, 1]]
```

### unzip

```ts
<A, B>(as: Iterable<[A, B]>) => [A[], B[]]
```

Similar as reverse of `zip`. Takes an iterator of pairs but returns two corresponding arrarys.

```ts
unzip([[1, 2], [3, 4]]) ➔ [[1, 3], [2, 4]]
```

### flatten

```ts
<A>(as: Iterable<Iterable<A>>): Iterable<A>
```

Takes an iterator of iterators of `A` and flattens them into an iterator of `A`

```ts
flatten([["a"], ["b", "c"], ["d", "e", "f"]]) ➔ ["a", "b", "c", "d", "e", "f"]
```

### chain

```ts
<A, B>(f: (a: A, i: number) => Iterable<B>) => (as: Iterable<A>) => Iterable<B>
```

Returns an iterator that concatenates the function result into a single interator (like [`flatten`](#flatten)).

```ts
pipe([1,2,3], map(f), collect)   ➔ [['1'],['2','2'],['3','3','3']]
pipe([1,2,3], chain(f), collect) ➔ ['1','2','2','3','3','3']
```

### chainRec

```ts
<A, B>(f: (a: A) => Iterable<Either<A, B>>) => (a: A) => Iterable<B>
```

Depth-first chainRec.

Chains until the next iterable is empty.

```ts
const f = (n: number) => n < 5 ? [right(n), left(n + 1)] : [right(n)]
pipe(1, chainRec(f), collect) ➔ [1, 2, 3, 4, 5]

const f2 = (n: number) => n < 5 ? [left(n + 1), right(n)] : [right(n)]
pipe(1, chainRec(f2), collect) ➔ [5, 4, 3, 2, 1]
```
### iter

```ts
<A>(ma: Iterable<A>) => Iter<A>
```
Creates an `Iter` from an iterator.

```ts
class Iter<A> implements Iterable<A> {
  private readonly _iter;
  constructor(_iter: () => Iterable<A>)
  [Symbol.iterator](): Iterator<A>
  get arr(): A[]
  static zero: <A_1>() => Iter<A_1>
  static of: <A_1>(...args: A_1[]) => Iter<A_1>
  static to: (end: number, step?: number | undefined) => Iter<number>
  static range: (from: number, end: number, step?: number | undefined) => Iter<number>
  static makeBy: <A_1>(n: number, f: (i: number) => A_1) => Iter<A_1>
  static replicate: <A_1>(ma: A_1, n: number) => Iter<A_1>
  head: () => import("./Maybe").None | import("./Maybe").Some<A>
  tryHead: () => A | undefined
  tail: () => Maybe<A>
  tryTail: () => A | undefined
  map: <B>(f: (a: A) => B) => Iter<B>
  toArray: () => A[]
  isEmpty: () => boolean
  push: (...as: A[]) => Iter<A>
  unshift: (...as: A[]) => Iter<A>
  filter: (predicate: Predicate<A>) => Iter<A>
  reduce: <B>(f: (b: B, a: A) => B, b: B) => B
  collect: () => A[]
  join: (seperator?: string) => string
  count: () => number
  zipWith: <B, C>(b: Iterable<B>, f: (a: A, b: B) => C) => Iter<C>
  zip: <B>(b: Iterable<B>) => Iter<[A, B]>
  unzip: () => Iter<[(A extends [infer X, any] | readonly [infer X, any] | (infer X)[] ? X : unknown)[], (A extends [any, infer Y] | readonly [any, infer Y] | (infer Y)[] ? Y : unknown)[]]>
  flatten: () => A extends Iterable<infer R> ? Iter<R> : never
  group: (size: number) => Iter<Iterable<A>>
  chain: <B>(f: (a: A, i: number) => Iterable<B>) => Iter<B>
  concat: <B>(...items: Iterable<B>[]) => Iter<A | Iterable<B>>
  ap: <B>(ma: A extends (a: B) => any ? Iterable<B> : never) => Iter<A extends (a: B) => any ? ReturnType<A> : never>
  alt: <B>(that: Lazy<Iterable<B>>) => Iter<A | B>
}
```
