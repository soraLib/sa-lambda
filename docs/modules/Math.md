# Math

Some helpful mathematical functions.

## API

### max

```ts
(...as: NonEmptyArray<number>): number
```

Returns the largest number of a set of number.

```ts
max(1, 2, 3) ➔ 3
```

### min

```ts
(...as: NonEmptyArray<number>): number;
```

Returns the smallest number of a set of number.

```ts
min(1, 2, 3) ➔ 1
```

### abs

```ts
(num: number) => number
```

Returns the absolute value of a number.

```ts
abs(1)  ➔ 1
abs(-1) ➔ 1
```

### cmp

``` ts
(a: number, b: number): -1 | 0 | 1;
```

Compares two numbers.
- `a > b` => `1`
- `a < b` => `-1`
- `a == b` => `0`

```ts
cmp(1, 1) ➔ 0
cmp(1, 0) ➔ 1
cmp(0, 1) ➔ -1
```

### sum

```ts
(a: number, ...as: number[]) => number
```

Computes the sum of the values.

```ts
sum(1, 2, 3) ➔ 6
```

### between

```ts
(value: number, from: number, to: number, exclude?: BetweenExclude) => boolean
```

Returns whether a value is between a range.

```ts
between(1, 1, 2)                           ➔ true
between(1, 2, 3)                           ➔ false
between(1, 1, 2, { from: true })           ➔ false
between(2, 1, 2, { to: true })             ➔ false
between(1, 1, 2, { from: true, to: true }) ➔ false
between(2, 1, 2, { from: true, to: true }) ➔ false
```

### randrange

```
(min: number, max: number) => number
```

Returns a random integer from min to max (includes min and excludes max).

```ts
randrange(0, 100) ➔ 50 // a random number between 0 and 100
```