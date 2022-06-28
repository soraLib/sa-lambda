# Maybe

```ts
type Maybe<A> = None | Some<A>
```

The `Maybe` is a container for an optional value, it represents missing values or the effect of a possibly failing computation. The `Some` data constructor is used for wrapping present values while the `None` constructor is used when a value is absent.

## Example

Without **Maybe**

```ts
const plusOne = (n?: number) => {
  if (n === undefined) return n

  return n + 1
}

const num2Str = (n?: number) => {
  if (n === undefined) return ''

  return String(v)
}

num2Str(plusOne(1)) // => '2'
num2Str(plusOne())  // => ''
```

With **Maybe**

```ts
const f = flow(
  map((n: number) => n + 1),
  match(() => '', (n: number) => `${n}`),
)

f(some(1)) // => '2'
f(none)    // => ''
```

## API

### some

```ts
<A>(value: A) => Maybe<A>
```

Constructs a `Some`. Represents an optional value that exists.

```ts
some(1) ➔ { readonly _tag: 'Some', readonly value: A }
```

### none

```ts
Maybe<never>
```

`None` value. Represents a missing value.

```ts
none ➔ { readonly _tag: 'None' }
```

### isSome

```ts
<A>(ma: Maybe<A>) => ma is Some<A>
```

Returns whether the `Maybe` is `Some` or not.

```ts
isSome(some(1)) ➔ true
isSome(none)    ➔ false
```

### isNone

```ts
<A>(ma: Maybe<A>) => ma is None
```

Returns whether the `Maybe` is `None` or not.

```ts
isNone(some(1)) ➔ false
isNone(none)    ➔ true
```

### of

```ts
<A>(value: A) => Maybe<A>
```

Takes a value and wraps it into a `Some`.

```ts
of(1) ➔ some(1)
```

### map

```ts
<A, B>(f: (a: A) => B) => (fa: Maybe<A>) => Maybe<B>
```

Transforms the `Maybe` with a given function. Returns `None` if the `Maybe` is `None`.

```ts
pipe(some(1), (n: number) => n + 1) ➔ some(2)
pipe(none, (n: number) => n + 1)    ➔ none
```

### alt

```ts
<B>(that: Lazy<Maybe<B>>) => <A>(ma: Maybe< A>): Maybe<A | B>
```

Returns the `Maybe` if it is `Some`, otherwise returns the function result.

```ts
pipe(some(0), alt(() => some(1))) ➔ some(0)
pipe(none, alt(() => some(1)))    ➔ some(1)
```

### ap

```ts
<A>(ma: Maybe<A>) => <B>(fab: Maybe<(a: A) => B>) => Maybe<B>
```

Applies a `Some` function over a `Some` value. Returns `None` if the `Maybe` or the function is `None`.

```ts
pipe(some((n: number) => n + 1), ap(some(1))) ➔ some(2)
pipe(none, ap(some(1)))                       ➔ none
pipe(some((n: number) => n + 1), ap(none))    ➔ none
```

### match

```ts
<B, A, C>(onNone: Lazy<B>, onSome: (a: A) => C) => (ma: Maybe<A>) => B | C
```

Returns the onNone default value if the `Maybe` is `None`, otherwise returns the onSome function result with `Maybe`.

```ts
pipe(some(1), match(() => 0, (n: number) => n + 1)) ➔ 2
pipe(none, match(() => 0, (n: number) => n + 1))    ➔ 0
```

### chain

```ts
<A, B>(f: (a: A) => Maybe<B>) => (ma: Maybe<A>) => Maybe<B>
```

Composes computations in sequence. Useful for chaining many computations that may result in a missing value.

```ts
pipe(some(1), chain((n: number) => n > 0 ? some(n) : none)) ➔ some(1)
pipe(some(0), chain((n: number) => n > 0 ? some(n) : none)) ➔ none
pipe(none, chain((n: number) => n > 0 ? some(n) : none))    ➔ none
```

### filter

```ts
<A>(predicate: Predicate<A>) => (ma: Maybe<A>) => Maybe<A>
```

Takes a predicate function and a `Maybe`, returns the `Maybe` if it's `Some` and the predicate returns true, otherwise returns `None`.

```ts
pipe(some(1), filter((n: number) => n > 0)) ➔ some(1)
pipe(some(0), filter((n: number) => n > 0)) ➔ none
pipe(none, filter((n: number) => n > 0))    ➔ none
```

### getOrElse

```ts
<A>(onNone: Lazy<A>) => <B>(ma: Maybe<B>) => A | B
```

Extracts the value of `Maybe , otherwise returns then default onNone value.

```ts
pipe(some(1), getOrElse(() => 0)) ➔ 1
pipe(none, getOrElse(() => 0))    ➔ 0
```

### orElse

```ts
<B>(onNone: Lazy<Maybe<B>>) => <A>(ma: Maybe<A>) => Maybe<B | A>
```

Returns `Maybe` if it's a `Some`, otherwise returns onNone result.

```ts
pipe(some(1), orElse(() => some(0))) ➔ some(1)
pipe(none, orElse(() => some(0)))    ➔ some(0)
```

### equals

```ts
<A>(a: Maybe<A>, b: Maybe<A>) => boolean
```

Compares one `Maybe` to another `Maybe`. Returns false if maybes or the wrapped values are different.

```ts
equals(some(1), some(1)) ➔ true
equals(some(1), some(2)) ➔ false
equals(some(1), none)    ➔ false
equals(none, none)       ➔ true
```

### tryCatch

```ts
<A>(f: Lazy<A>) => Maybe<A>
```

Returns a `Maybe` from a function that might throw.

```ts
const unsafeDiv = (top: number, bottom: number) => {
  if (bottom === 0) throw new Error('unsafe division')

  return top / bottom
}

const div = (top: number, bottom: number) => tryCatch(() => unsafeDiv(top, bottom), () => 0)

div(2, 1) ➔ some(2)
div(2, 0) ➔ none
```

### empty

```ts
() => None
```

Returns `None`.

```ts
empty() ➔ none
```

### fromPredicate

```ts
<A>(predicate: Predicate<A>): <B extends A>(b: B) => Maybe<B>
<A>(predicate: Predicate<A>): (a: A) => Maybe<A>
```

Returns `Some` or `None` based on the given predicate.

```ts
pipe(1, fromPredicate((n: number) => n > 0)) ➔ some(1)
pipe(0, fromPredicate((n: number) => n > 0)) ➔ none
```

### toEither

```ts
<E>(f: Lazy<E>) => <A>(ma: Maybe<A>) => Either<E, A>
```

Returns a `Right` from a `Some` or a `Left` with a default left value if `Maybe` is `None`.

```ts
pipe(some(1), toEither(() => 0)) ➔ right(1)
pipe(none, toEither(() => 0))    ➔ left(0)
```

### toNullable

```ts
<A>(ma: Maybe<A>) => A | null
```

Extracts the value out of `Maybe` if it exists, otherwise returns `null`.

```ts
pipe(some(1), toNullable) ➔ 1
pipe(none, toNullable)    ➔ null
```

### toUndefined

```ts
<A>(ma: Maybe<A>) => A | undefined
```

Extracts the value out of `Maybe` if it exists, otherwise returns `undefined`.

```ts
pipe(some(1), toUndefined) ➔ 1
pipe(none, toUndefined)    ➔ undefined
```