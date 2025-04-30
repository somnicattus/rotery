import { _isIterable } from './_guards.js';
import type { Series, SyncSeries } from './types.js';

export function serializeSync<T>(input: SyncSeries<T>): IterableIterator<T> {
    return input[Symbol.iterator]();
}

export async function* serializeAsync<T>(input: Series<T>): AsyncGenerator<Awaited<T>> {
    const awaited = await input;
    if (_isIterable(awaited)) {
        for (const value of awaited) yield value;
    } else {
        for await (const value of awaited) yield value;
    }
}

/** Serializes a series into an iterator. */
export namespace serialize {
    export const sync = serializeSync;
    export const async = serializeAsync;
}

export const toIteratorSync = serializeSync;
export const toIteratorAsync = serializeAsync;
/** Create an iterator from a series. Alias of {@link serialize} */
export const toIterator = serialize;
