# Sa Lambda

[![NPM](https://img.shields.io/npm/v/sa-lambda)](https://www.npmjs.com/package/sa-lambda)
![MIT](https://img.shields.io/github/license/soraLib/sa-lambda)
[![Github](https://img.shields.io/badge/Github-232323?logo=github)](https://github.com/soraLib/sa-lambda)
[![codecov](https://codecov.io/gh/soraLib/sa-lambda/branch/main/graph/badge.svg?token=RaeLDeLgm1)](https://codecov.io/gh/soraLib/sa-lambda)
[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)

![JS](https://img.shields.io/badge/JS-232323?logo=javascript)
![JS](https://img.shields.io/badge/TS-fcfcfc?logo=typescript)

Typescript library for functional programming.

[Document](https://www.sa-lambda.soralib.com)

## Modules

⚠️ `sa-lambda` is currently working in progress. ⚠️

- [x] Either
- [x] Maybe
- [x] Iterator
- [x] Pipe & Flow
- [x] Equal
- [x] Effect
- [x] Math
- [x] Async (Promise-Like)
- [ ] Docs
- [ ] Functors

## Installation

### npm

```sh
npm install sa-lambda
```

### yarn

```sh
yarn add sa-lambda
```

### pnpm

```sh
pnpm add sa-lambda
```

## Use

```ts
import { pipe } from "sa-lambda";

pipe(
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

## Functors

![dependencies](https://raw.githubusercontent.com/soraLib/sa-lambda/main/docs/dependencies.png)

## Inspired by

- [fp-ts](https://github.com/gcanti/fp-ts) - Functional programming in TypeScript
- [fantasy-land](https://github.com/fantasyland/fantasy-land) - Specification for interoperability of common algebraic structures in JavaScript
- [sugar.js](https://github.com/libsugar/sugar.js) - Like syntactic sugar, but is library

## License

The MIT License (MIT)
