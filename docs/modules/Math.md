# Math

## API

### max

```ts
(...as: NonEmptyArray<number>): number
(...as: NonEmptyArray<bigint>): bigint
```

Returns the largest number of a set of number.

```ts
max(1, 2, 3) ➔ 3
```

### min

```ts
(...as: NonEmptyArray<number>): number;
(...as: NonEmptyArray<bigint>): bigint;
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
(a: bigint, b: bigint): -1n | 0n | 1n;
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
