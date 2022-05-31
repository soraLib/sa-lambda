---
title: Getting Started | Guide
---

# Getting Started

Typescript library for functional programming.

## Installation

### npm

```
npm install sa-lambda
```

### yarn

```
yarn add sa-lambda
```

### pnpm

```
pnpm add sa-lambda
```

## Use

```ts
import { function_ } from "sa-lambda";

function_.pipe(
  1,
  (num: number) => num + 1,
  (num: number) => num + 2
);
```

```ts
import { flow } from "sa-lambda/function";

const f = flow(
  (num: number) => num + 1,
  (num: number) => num + 2
);

f(1);
```
