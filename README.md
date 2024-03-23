# Rotery

A type safe utility library for handling iterative and asynchronous processes within functional programming style.

## Installation

```bash
npm i rotery
yarn add rotery
pnpm add rotery
```

Then in .js or .ts

```ts
import * as Rt from 'rotery'; // tree-shaking supported!
```

## Usage

```ts
import * as Rt from 'rotery';
import { db } from './some-asynchronous-module.js';

const userNames = ['john', 'marry', 'samara', 'paula', 'bill'];

const result = await Rt.pipe(
    userNames,
    Rt.withConcurrency.async(
        2,
        // As a result, db access will be performed only once.
        Rt.map.async(async names => await db.findUsersByNames(names)),
    ),
    Rt.flatten,
    // Finds the first met user, then abort the rest upstream iterations.
    Rt.find.async(user => user.age > 20),
);
// This will find `{ name: 'marry', age: 22, gender: 'f' }`
```

## Features

-   Utility functions (including `map`, `filter`, `reduce`) for `Iterator`s and `AsyncIterator`s.
-   Explicit lazy evaluation by iterator features.
-   Type safe function currying and type safe function composition.
-   Controlled parallel and serial asynchronous processes, even with specified concurrency.

## Wanna more general utility functions?

Rotery doesn't have utilities for non-iterative processes. For more general utility, [Remeda](https://remedajs.com/) is the first choice you may want.

Rotery is greatly inspired by Remeda's features: overridden "data-first" and "data-last" functions, "lazy evaluation", and "type-safe" function pipelining.

You can smoothly use Remeda with Rotery combined, because Rotery has compatible pipelining system with Remeda!

## With Node.js stream

You can create `Transform` stream instances from functions.

```ts
import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import * as Rt from 'rotery';

const findDataFromDb = Transform.from(Rt.map.async(async ids => await db.find(id)));

await pipeline(incomingIdStream, findDataFromDb, outgoingDataStream);
```
