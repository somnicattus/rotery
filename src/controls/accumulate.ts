import { type Series, type SyncSeries } from './types.js';

/** Accumulates a series into an array. */
export namespace accumulate {
    export function sync<T>(input: SyncSeries<T>): T[] {
        return [...input];
    }

    export async function async<T>(input: Series<T>): Promise<Awaited<T>[]> {
        const accumulator: Awaited<T>[] = [];
        for await (const value of await input) accumulator.push(value);
        return accumulator;
    }
}

/** Executes all reserved processes. Alias of {@link accumulate}. */
export const executeAll = accumulate;

/** Creates an array from an series. Alias of {@link accumulate}. */
export const toArray = accumulate;

/** Awaits all promises in a series. Alias of {@link accumulate.async} */
export const awaitAll = accumulate.async;
