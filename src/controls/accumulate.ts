import { _isIterable } from './_guards.js';
import type { Series, SyncSeries } from './types.js';

export function accumulateSync<T>(input: SyncSeries<T>): T[] {
    return [...input];
}

export async function accumulateAsync<T>(input: Series<T>): Promise<Array<Awaited<T>>> {
    const accumulator: Array<Awaited<T>> = [];
    const awaited = await input;
    if (_isIterable(awaited)) {
        for (const value of awaited) {
            accumulator.push(await value);
        }
    } else {
        for await (const value of awaited) accumulator.push(value);
    }
    return accumulator;
}

/** Accumulates a series into an array. */
export namespace accumulate {
    export const sync = accumulateSync;
    export const async = accumulateAsync;
}

export const executeSync = accumulateSync;
export const executeAsync = accumulateAsync;
/** Executes all reserved processes. Alias of {@link accumulate}. */
export const executeAll = accumulate;

export const toArraySync = accumulateSync;
export const toArrayAsync = accumulateAsync;
/** Creates an array from an series. Alias of {@link accumulate}. */
export const toArray = accumulate;

/** Awaits all promises in a series. Alias of {@link accumulate.async} */
export const awaitAll = accumulateAsync;
