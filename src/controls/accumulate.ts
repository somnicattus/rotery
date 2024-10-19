import { isIterable } from './guards.js';
import type { Series, SyncSeries } from './types.js';

/** Accumulates a series into an array. */
export namespace accumulate {
    export function sync<T>(input: SyncSeries<T>): T[] {
        return [...input];
    }

    export async function async<T>(input: Series<T>): Promise<Array<Awaited<T>>> {
        const accumulator: Array<Awaited<T>> = [];
        const awaited = await input;
        if (isIterable(awaited)) {
            for (const value of awaited) {
                accumulator.push(await value);
            }
        } else {
            for await (const value of awaited) accumulator.push(value);
        }
        return accumulator;
    }
}

/** Executes all reserved processes. Alias of {@link accumulate}. */
export const executeAll = accumulate;

/** Creates an array from an series. Alias of {@link accumulate}. */
export const toArray = accumulate;

/** Awaits all promises in a series. Alias of {@link accumulate.async} */
export const awaitAll = accumulate.async;
