---
title: Getting Started | Guide
---

# Getting Started

Sa Lambda is a typescript library for functional programming. Its purpose is to allow developers to use popular patterns and abstractions that are available in most functional languages.

## Installation

Add `sa-lambda` dependency to your project as a `dependency`:

With **NPM**

```shell
npm install sa-lambda -S
```

With **yarn**

```shell
yarn add sa-lambda -S
```

With **pnpm**

```shell
pnpm add sa-lambda -S
```

## Use

```ts
import { pipe } from "sa-lambda";

function_.pipe(
  1,
  (num: number) => num + 1,
  (num: number) => num + 2
);
```

```ts
import { flow } from "sa-lambda/pipe";

const f = flow(
  (num: number) => num + 1,
  (num: number) => num + 2
);

f(1);
f(2);
```
