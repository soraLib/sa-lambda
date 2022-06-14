# Either

```ts
type Either<E, B> = Left<E> | Right<B>
```

`Either` is a data type with two sides (`Left` and `Right`). It is most commonly used for error handling similar as [Maybe](Maybe.md).

It is also important to note that `Either` is right-biased which means that `map`, `chain` and other similar methods will operate on the right side.

## Example

Without **Either**

```ts
function parseJson(s: string): never | Record<string, unknown> {
  try {
    return JSON.parse(s)
  } catch (e) {
    throw new Error(`Couldn't parse from ${s}.`)
  }
}

let parsed: Record<string, unknown>

try {
  parsed = parseJson(/* some content that may not be parsed */)
} catch(e) {
  parsed = {/* set default value */}
}
```

With **Either**

```ts
import { tryCatch, getOrElse } from 'sa-lambda/either'
import { pipe } from 'sa-lambda/pipe'

const parseJson = (s: string) => 
  tryCatch(() => JSON.parse(s), () => `Couldn't parse from ${s}.`)

let parsed = pipe(/* some content */, parseJson, getOrElse(() => ({/* default value */})))
```

## API

### left

```ts
<E, A = never>(e: E) => Either<E, A>
```

Constructs a new `Either` holding a `Left` value. Represents a failure value.

```ts
left(1) ➔ { readonly _tag: 'Left', readonly left: 1 }
```

### right

```ts
<A, E = never>(a: A) => Either<E, A>
```

Constructs a new `Either` holding a `Right` value. Represents a successful value.

```ts
right(1) ➔ { readonly _tag: 'Right', readonly right: 1 }
```

### isLeft

```ts
<E>(ma: Either<E, unknown>) => ma is Left<E>
```

Returns whether the `Either` is `Left` or not.

```ts
isLeft(left(1))  ➔ true
isLeft(right(1)) ➔ false
```

### isRight

```ts
<A>(ma: Either<unknown, A>) => ma is Right<A>
```

Returns whether the `Either` is `Right` or not.

```ts
isRight(left(1))  ➔ false
isRight(right(1)) ➔ true
```

### of

```ts
<A, E = never>(a: A) => Either<E, A>
```

Takes a value and wraps it into a `Right`.

```ts
of(1) ➔ right(1)
```

### map

```ts
<A, B>(f: (a: A) => B) => <E>(ma: Either<E, A>) => Left<E> | Right<B>
```

Maps the `Right` value.

```ts
pipe(left(1), map((n: number) => n + 1))  ➔ left(1)
pipe(right(1), map((n: number) => n + 1)) ➔ right(2)
```

### alt

```ts
<E2, B>(that: Lazy<Either<E2, B>>) => <E1, A>(ma: Either<E1, A>) => Either<E2, B | A>
```

Returns the `Either` if it is `Right`, otherwise returns the function result.

```ts
pipe(right(2), alt(() => right(1))) ➔ right(2)
pipe(left(2), alt(() => right(1)))  ➔ right(1)
pipe(right(2), alt(() => left(1)))  ➔ right(2)
pipe(left(2), alt(() => left(1)))   ➔ left(1)
```

### ap

```ts
<E2, A>(ma: Either<E2, A>) => <E1, B>(fab: Either<E1, (a: A) => B>) => Either<E2 | E1, B>
```

Applies a `Right` function over a `Right` value. Returns `Left` if the `Either` or the function is `Left`.

```ts
pipe(left(1), ap(left(0)))                      ➔ left(1)
pipe(left(1), ap(right(0)))                     ➔ left(1)
pipe(right((n: number) => n + 1)), ap(left(0))  ➔ left(0)
pipe(right((n: number) => n + 1)), ap(right(0)) ➔ right(1)
```

### match

```ts
<E, B, A, C>(onLeft: (e: E) => B, onRight: (a: A) => C) => (ma: Either<E, A>) => B | C
```

Takes two functions and an `Either` value, if the value is `Left`,
returns the `onLeft` function result, if the value is `Right`, returns the `onRight` function result.

```ts
pipe(left(1), match((n: number) => n -1), (n: number) => n + 1)  ➔ 0
pipe(right(1), match((n: number) => n -1), (n: number) => n + 1) ➔ 2
```

### chain

```ts
<E2, A, B>(f: (a: A) => Either<E2, B>) => <E1>(ma: Either<E1, A>) => Either<E2 | E1, B>
```

Composes computations in sequence. Useful for chaining many computations that may fail.

```ts
pipe(left(1), chain((n: number) => right(n + 1)))  ➔ left(1)
pipe(right(1), chain((n: number) => right(n + 1))) ➔ right(2)
```

### swap

```ts
<E, A>(ma: Either<E, A>) => Either<A, E>
```

Returns Right if `Either` is `Left` and vice versa.

```ts
swap(right(1)) ➔ left(1)
swap(left(1))  ➔ right(1)
```

### equals

```ts
<E, A>(a: Either<E, A>, b: Either<E, A>) => boolean
```

Compares one `Either` to another `Either`. Returns false if eithers or the wrapped values are different.

```ts
equals(right(1), right(1)) ➔ true
equals(right(1), left(1))  ➔ false
equals(left(1), left(1))   ➔ true
equals(left(1), right(1))  ➔ false
```

### exists

```ts
<A>(predicate: Predicate<A>) => <E>(ma: Either<E, A>) => boolean
```

Returns `false` if `Either` is a `Left`, otherwise returns the predicate result.

```ts
pipe(left(0), exists((n: number) => n > 0))  ➔ false
pipe(right(0), exists((n: number) => n > 0)) ➔ false
pipe(left(1), exists((n: number) => n > 0))  ➔ false
pipe(right(1), exists((n: number) => n > 0)) ➔ true
```

### tryCatch

```ts
<E, A>(f: Lazy<A>, onThrow: (e: unknown) => E) => Either<E, A>
```

Returns a `Either` from a function that might throw.

```ts
const unsafeDiv = (top: number, bottom: number) => {
  if (bottom === 0) throw new Error('unsafe division')

  return top / bottom
}

const div = (top: number, bottom: number) => tryCatch(() => unsafeDiv(top, bottom), () => 0)

div(2, 0) ➔ left(0)
div(2, 1) ➔ right(2)
```

### orElse

```ts
<E1, E2, B>(onLeft: (e: E1) => Either<E2, B>) => <A>(ma: Either<E1, A>) => Either<E2, B | A>
```

Returns `Either` if it's a `Right`, otherwise returns onLeft result.

```ts
pipe(left(1), orElse((n: number) => right(n + 1)))  ➔ right(2)
pipe(right(1), orElse((n: number) => right(n + 1))) ➔ right(1)
```

### getLeft

```ts
<E, A>(ma: Either<E, A>) => Maybe<E>
```

Returns the `Left` value of an `Either` if possible.

```ts
pipe(right(1), getLeft) ➔ none
pipe(left(1), getLeft)  ➔ some(1)
```

### getRight

```ts
<E, A>(ma: Either<E, A>) => Maybe<A>
```

Returns the `Right` value of an `Either` if possible.

```ts
pipe(right(1), getRight) ➔ some(1)
pipe(left(1), getRight)  ➔ none
```

### getOrElse

```ts
<E, B>(onLeft: (e: E) => B) => <A>(ma: Either<E, A>) => B | A
```

Returns the `Either` value if it's a `Right` or a default `onLeft` result value if it's a `Left`.

```ts
pipe(left(1), getOrElse(() => 0))  ➔ 0
pipe(right(1), getOrElse(() => 0)) ➔ 1
```

### fromPredicate

```ts
<A, E>(predicate: Predicate<A>, onFalse: Lazy<E>): (a: A) => Either<E, A>
```

Constructs a `Left` or `Right` based on the given predicate.

```ts
pipe(1, fromPredicate((n: number) => n > 0, () => 'error')) ➔ right(1)
pipe(0, fromPredicate((n: number) => n > 0, () => 'error')) ➔ left('error')
```

### fromMaybe

```ts
<E>(onNone: Lazy<E>) => <A>(ma: Maybe<A>) => Left<E> | Right<A>
```

Returns `Left` or `Right` based on the given `Maybe`.

```ts
pipe(some(1), fromMaybe(() => 'error')) ➔ right(1)
pipe(none, fromMaybe(() => 'error'))    ➔ left('error')
```