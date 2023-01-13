# Delay

Creates a delay.

## Example

Without **Delay**

```ts
await new Promise((then) => setTimeout(then, 2000))
```

With **Delay**

```ts
import { delay } from 'sa-lambda/Delay'

await delay(2000)
```

## API

### delay

```ts
(ms?: number) => Promise<void>
```

Returns a promise waiting with [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout).

```ts
await delay()
await delay(1000)
```

### microtask

```ts
() => Promise<void>
```

Returns a promise waiting with [microtask](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide).

```ts
await microtask()
```