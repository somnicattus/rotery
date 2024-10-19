import type { Curried } from '../../compositions/curry.js';
import { type Purried, purry } from '../../compositions/purry.js';
import { isIterable } from '../../controls/guards.js';
import type { Series, SyncSeries } from '../../controls/types.js';

function* _syncFlatMap<I, O>(
    input: SyncSeries<I>,
    mapper: (value: I) => SyncSeries<O>,
): Generator<O> {
    for (const value of input) {
        for (const output of mapper(value)) {
            yield output;
        }
    }
}

// eslint-disable-next-line sonarjs/cognitive-complexity
async function* _asyncFlatMap<I, O>(
    input: Series<I>,
    mapper: (value: Awaited<I>) => Series<O>,
): AsyncGenerator<Awaited<O>> {
    const awaited = await input;
    if (isIterable(awaited)) {
        for (const value of awaited) {
            const results = await mapper(await value);
            if (isIterable(results)) {
                for (const output of results) {
                    yield output;
                }
            } else {
                for await (const output of results) {
                    yield output;
                }
            }
        }
    } else {
        for await (const value of awaited) {
            const results = await mapper(value);
            if (isIterable(results)) {
                for (const output of results) {
                    yield output;
                }
            } else {
                for await (const output of results) {
                    yield output;
                }
            }
        }
    }
}

/** Identical to a map followed by flatten. */
export namespace flatMap {
    export function sync<I, O>(
        ...args: Parameters<typeof _syncFlatMap<I, O>>
    ): ReturnType<typeof _syncFlatMap<I, O>>;
    export function sync<I, O>(
        ...args: Parameters<Curried<typeof _syncFlatMap<I, O>>>
    ): ReturnType<Curried<typeof _syncFlatMap<I, O>>>;
    export function sync<I, O>(
        ...args: Parameters<Purried<typeof _syncFlatMap<I, O>>>
    ): ReturnType<Purried<typeof _syncFlatMap<I, O>>> {
        return purry(_syncFlatMap<I, O>)(...args);
    }

    export function async<I, O>(
        ...args: Parameters<typeof _asyncFlatMap<I, O>>
    ): ReturnType<typeof _asyncFlatMap<I, O>>;
    export function async<I, O>(
        ...args: Parameters<Curried<typeof _asyncFlatMap<I, O>>>
    ): ReturnType<Curried<typeof _asyncFlatMap<I, O>>>;
    export function async<I, O>(
        ...args: Parameters<Purried<typeof _asyncFlatMap<I, O>>>
    ): ReturnType<Purried<typeof _asyncFlatMap<I, O>>> {
        return purry(_asyncFlatMap<I, O>)(...args);
    }
}
