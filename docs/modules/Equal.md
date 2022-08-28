# Equal

## Example

Without **Equal**

```ts
let result = a === b || a === c || a === d
```

With **Equal**

```ts
import { strictEqOr } from 'sa-lambda/Equal'

let result = strictEqOr(a, b, c, d)
```

## API

### isEqual

```ts
(self: unknown, other: unknown) => boolean
```

Loose equality compares two values for equality.

Equals to `a == b`.

```ts
isEqual(1, 1)   ➔ true
isEqual(1, '1') ➔ true
```

### isStrictEqual

```ts
(self: unknown, other: unknown) => boolean
```

Strict equality compares two values for equality.

Equals to `a === b`.

```ts
isStrictEqual(1, 1)   ➔ true
isStrictEqual(1, '1') ➔ false
```

### eqOr

```ts
<A>(self: A): A
(self: unknown, ...others: unknown[]): boolean
```

Checks if value is *loose equal* to any other value.

Returns self directly if others is empty.

```ts
eqOr(1, 2, 3)   ➔ false
eqOr(1, '1', 3) ➔ true
```

### strictEqOr

```ts
<A>(self: A): A
(self: unknown, ...others: unknown[]): boolean
```

Checks if value is *strict equal* to any other value.

Returns self directly if others is empty.

```ts
strictEqOr(1, 2, 3)   ➔ false
strictEqOr(1, '1', 3) ➔ false
strictEqOr(1, 1, 3)   ➔ true
```

### eqAnd

```ts
<A>(self: A): A
(self: unknown, ...others: unknown[]): boolean
```

Checks if value is *loose equal* to every other value.

Returns self directly if others is empty.

```ts
eqAnd(1, 2, 3)      ➔ false
eqAnd(1, '1', 3)    ➔ false
eqAnd(1, '1', true) ➔ true
```

### strictEqAnd

```ts
<A>(self: A): A;
(self: unknown, ...others: unknown[]): boolean;
```

Checks if value is *strict equal* to every other value.

Returns self directly if others is empty.

```ts
strictEqAnd(1, 2, 3) ➔ false
strictEqAnd(1, 1, 2) ➔ false
strictEqAnd(1, 1, 1) ➔ true
```
