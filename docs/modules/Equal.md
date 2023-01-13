# Equal

Makes a equivalent comparison among some values.

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

### notEqOr

```ts
<A>(self: A): A
(self: unknown, ...others: unknown[]): boolean
```

Checks if value is *loose not equal* to any other value.

Returns self directly if others is empty.

```ts
notEqOr(1)         ➔ 1
notEqOr(1, '1', 1) ➔ false
notEqOr(1, 1, 2)   ➔ true
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

### strictNotEqOr

```ts
<A>(self: A): A
(self: unknown, ...others: unknown[]): boolean
```

Checks if value is *strict not equal* to any other value.

Returns self directly if others is empty.

```ts
strictNotEqOr(1)         ➔ 1
strictNotEqOr(1, 1, 1)   ➔ false
strictNotEqOr(1, 2, 3)   ➔ true
strictNotEqOr(1, '1', 1) ➔ true
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

### notEqAnd

```ts
<A>(self: A): A
(self: unknown, ...others: unknown[]): boolean
```

Checks if value is *loose not equal* to every other value.

Returns self directly if others is empty.

```ts
notEqAnd(1)         ➔ 1
notEqAnd(1, 2, 3)   ➔ true
notEqAnd(1, '1', 3) ➔ false
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

### strictNotEqAnd

```ts
<A>(self: A): A
(self: unknown, ...others: unknown[]): boolean
```

Checks if value is *strict not equal* to every other value.

Returns self directly if others is empty.

```ts
strictNotEqAnd(1, 2, 3)   ➔ true
strictNotEqAnd(1, '1', 2) ➔ true
strictNotEqAnd(1, 1, 1)   ➔ false
```