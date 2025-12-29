import { _isIterable } from './_guards.js';
import type { Series, SyncSeries } from './types.js';

export function* flattenSync<T>(input: SyncSeries<SyncSeries<T>>): Generator<T> {
    for (const pool of input) {
        yield* pool;
    }
}

export async function* flattenAsync<T>(input: Series<Series<T>>): AsyncGenerator<Awaited<T>> {
    const awaited = await input;
    if (_isIterable(awaited)) {
        for (const pool of awaited) {
            yield* await pool;
        }
    } else {
        for await (const pool of awaited) {
            yield* pool;
        }
    }
}

/** Flattens a series of series by one level deep. */
export namespace flatten {
    export const sync = flattenSync;
    export const async = flattenAsync;
}
