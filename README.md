# Rotery

A utility library for iterative processes, with asynchronous support, type safety, and functional programming style.

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
import { dataAccess } from './some-asynchronous-data-access.js';

const result = await Rt.pipe(
    userIds,
    // Process each unit of 100 ids in parallel.
    Rt.chunk.sync(100),
    Rt.map.async(async ids => await dataAccess.findUsersByIds(ids)),
    Rt.flatten.async,
    Rt.filter.async(user => user.age >= 20),
    // Find first 10 matched items, then abort rest iterative process.
    Rt.take.async(10),
    Rt.accumulate.async,
);
```

## Features

-   Utility functions (including `map`, `filter`, `reduce`) for `Iterator`s and `AsyncIterator`s.
-   Explicit lazy evaluation by JavaScript iterator feature.
-   Type safe function currying and type safe function composition.
-   Controllable asynchronous iterative processes in both parallel and serial, even with specified concurrency.

## Want more general utility functions?

Rotery doesn't have utilities for non-iterative processes. For more general utility, [Remeda](https://remedajs.com/) is the first choice you may want.

Rotery is greatly inspired by Remeda's features: overridden "data-first" and "data-last" functions, "lazy evaluation", and "type-safe" function pipelining.

You can smoothly use Remeda with Rotery combined, because Rotery has compatible pipelining system with Remeda!

## Throttling (concurrent async processes)

`throttle` allows asynchronous processes to be run in a specified level of concurrency.

The results are generated asynchronously in the order of completion, not in the order of input (the first completed result will be emitted first). Please keep in mind that the order of results differs from the order of input.

```ts
const responses = await Rt.pipe(
    urls,
    Rt.map.sync(async url => {
        const response = await fetch(url);
        return await response.json();
    }),
    Rt.throttle(5), // This maintains up to 5 concurrent HTTP fetch requests.
    Rt.toArray(), // The results are ordered by the completion time.
);
```

## With Node.js stream

You can create `Transform` stream instances from functions.

```ts
import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import * as Rt from 'rotery';

const findDataFromDb = Transform.from(
    Rt.compose(
        Rt.map.async(async id => await db.find(id)),
        Rt.filter.async(data => data.value >= 20),
    ),
);

await pipeline(incomingIdStream, findDataFromDb, outgoingDataStream);
```
