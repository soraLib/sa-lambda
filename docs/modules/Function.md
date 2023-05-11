# Function

Some useful utils.

## API

### lazy

```ts
Lazy<A> = () => A
```

Creates a lazy function.

```ts
lazy(1) ➔ () => 1
```

### noop

```ts
() => void
```

A no-operation funciton.

```ts
noop() ➔ undefined
```

### identity

```ts
<A>(a: A) => A
```

Identity.

```ts
identity(1) ➔ 1
```

### constant

```ts
<A>(a: A) => Lazy<A>
```

A thunk returns self.

```ts
constant(1)() ➔ 1
```

### constTrue

```ts
Lazy<boolean>
```

A thunk returns always `true`.

```ts
constTrue() ➔ true
```

### constFalse

```ts
Lazy<boolean>
```

A thunk returns always `false`.

```ts
constFalse() ➔ false
```

### constNull

```ts
Lazy<null>
```

A thunk returns always `null`.

```ts
constNull() ➔ null
```

### constUndefined

```ts
Lazy<undefined>
```

A thunk returns always `undefined`.

```ts
constUndefined() ➔ undefined
```

### constVoid

```ts
Lazy<void>
```

A thunk returns always `void`.

```ts
constVoid() ➔ undefined
```

### isNullable

```ts
(a: unknown) => a is null | undefined
```

Returns whether the value is null or undefined.

```ts
isNullable(null)      ➔ true
isNullable(undefined) ➔ true
isNullable(0)         ➔ false
```

### isNonNullable

```ts
// Exclude null and undefined from T
type NonNullable<T> = T & {}
<A>(a: A) => a is NonNullable<A>
```

Returns whether the value is `NonNullable`.

```ts
isNonNullable(null)      ➔ false
isNonNullable(undefined) ➔ false
isNonNullable(0)         ➔ true
```
