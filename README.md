# Sa Lambda

[![NPM](https://img.shields.io/npm/v/sa-lambda)](https://www.npmjs.com/package/sa-lambda)
![MIT](https://img.shields.io/github/license/soraLib/sa-lambda)
[![Github](https://img.shields.io/badge/Github-232323?logo=github)](https://github.com/soraLib/sa-lambda)
[![codecov](https://codecov.io/gh/soraLib/sa-lambda/branch/main/graph/badge.svg?token=RaeLDeLgm1)](https://codecov.io/gh/soraLib/sa-lambda)
[![ApiDoc](https://img.shields.io/badge/ApiDoc-fcfcfc?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAA21BMVEUAAAD///+WAP8MNk+ZzP+WAP8MNk+ZzP+WAP8MNk+ZzP+WAP8MNk+ZzP+WAP+ZzP8MNk+WAP8MNk+ZzP+WAP8MNk+ZzP+WAP8MNk+ZzP+WAP8MNk+ZzP+WAP+ZzP8MNk+WAP8MNk+ZzP8MNk+ZzP+WAP8VM1q1TP+ubP+FB+mNA/SaCv+zR/+zVP9IHpygrP+iHf+ipP+eE/+gGP9AIpGYBf8vKXsdL2WbxP+cr/+dvP+knP+mJv+nK/+njP+pMP+phP+rfP+tOf90DtOxQ/+yXP9RG6diFL1rEcjgV5TeAAAAI3RSTlMAABAQECAgIEBAQGBgYICAgI+Pj5+fn7+/v8/Pz9/f3+/v765wmakAAADxSURBVHhehdPXUsMwEIZR4yTgFJwEAoE0nOzKTu/03nn/J4o0Yw07Yr18d5o9l/q9vX8ywCP5Pn39BWEUhQIod5WuW84AQUultQIGBE1FagYOKDSUU6NAgF9XTHXfgjBSbFGYgsdLHoznKUimDwwZf8VgQZJMly74jgF+ge5jQ8HPNegIML2tLXi/AmCAJhMDRvZMge15MtoCCOD1NgYBDO8QIRsMF4gC+FwhCmB2jyiA2dMNSuBFn0VQHfCgX0uBlz/mwFGOfLmDUxec7Du7KJ1TcFZkdlHqWNAuZgznsGfARUWYXnXQr4nb9PI5ZrxiO45CUxeYFr2zAAAAAElFTkSuQmCC)](https://soralib.github.io/sa-lambda/modules.html)

![JS](https://img.shields.io/badge/JS-232323?logo=javascript)
![JS](https://img.shields.io/badge/TS-fcfcfc?logo=typescript)

Typescript library for functional programming.

[Document](https://soralib.github.io/sa-lambda/)

## TODO

- [ ] Either
- [ ] Maybe
- [ ] Iterator
- [x] Pipe & Flow
- [ ] Task (Promise-Like)
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
