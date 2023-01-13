# Effect

Do something, sometimes it causes side effects.

## Example

Without **Effect**

```ts
const source: Record<string, number> = {}

let target: number | undefined
if (source['a']) {
  target = source['a']
} else {
  source['a'] = 1
  target = source['a']
}
```

With **Effect**

```ts
import { getOrSet } from 'sa-lambda/Effect'

getOrSet(source, 'a', () => 1))
```

## API

### map

```ts
<A, B>(f: (a: A) => B) => (a: A) => B
```

Maps a value.

```
pipe(1, map(n => n + 1)) ➔ 2
```

### use

```ts
<A, B>(a: A, f: (a: A) => B) => B
```

Uses a value to make a mapping.

```ts
use(1, n => n + 1) ➔ 2
```

### also

```ts
<A>(a: A, f: (a: A) => void) => A
```

Uses a value to do something extra.

```ts
also(1, (a) => { console.log(a) }), 1
```

### match

```ts
<A, B>(onTrue: () => A, onFalse: () => B) => (condition: boolean) => A | B
```

Returns onTrue result if the condition is Truthy, otherwise returns the onFalse result.

```ts
pipe(true, match(() => 1, () => 0))  ➔ 1
pipe(false, match(() => 1, () => 0)) ➔ 0
```

### getOrSet

```ts
<T extends Record<string, unknown>, K extends keyof T>(source: T, key: K, initialValue: () => T[K]) => T[K]
```

Gets a value from source by the given key.

Sets a value with the initial function if source doesn't [has](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn) the key.

```ts
const source: Record<string, number> = { a: 0 }
getOrSet(source, 'a', () => 1) ➔ 0
getOrSet(source, 'b', () => 1) ➔ 1
source['b']                    ➔ 1
```