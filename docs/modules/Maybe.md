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
