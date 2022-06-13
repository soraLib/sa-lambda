# Sa Lambda

[![NPM](https://img.shields.io/npm/v/sa-lambda)](https://www.npmjs.com/package/sa-lambda)
![MIT](https://img.shields.io/github/license/soraLib/sa-lambda)
[![Github](https://img.shields.io/badge/Github-232323?logo=github)](https://github.com/soraLib/sa-lambda)
[![codecov](https://codecov.io/gh/soraLib/sa-lambda/branch/main/graph/badge.svg?token=RaeLDeLgm1)](https://codecov.io/gh/soraLib/sa-lambda)

![JS](https://img.shields.io/badge/JS-232323?logo=javascript)
![JS](https://img.shields.io/badge/TS-fcfcfc?logo=typescript)

Typescript library for functional programming.

[Document](http://www.sa-lambda.soralib.com)

## TODO

- [x] Either
- [x] Maybe
- [ ] Iterator
- [x] Pipe & Flow
- [ ] Task (Promise-Like)
- [ ] Docs
- [ ] some math utils

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
