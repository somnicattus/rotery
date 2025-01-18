import { _isIterable } from './_guards.js';
import type { Series, SyncSeries } from './types.js';

/** Serializes a series into an iterator. */
export namespace serialize {
    export function sync<T>(input: SyncSeries<T>): IterableIterator<T> {
        return input[Symbol.iterator]();
    }

    export async function* async<T>(input: Series<T>): AsyncGenerator<Awaited<T>> {
        const awaited = await input;
        if (_isIterable(awaited)) {
            for (const value of awaited) yield value;
        } else {
            for await (const value of awaited) yield value;
        }
    }
}

/** Create an iterator from a series. Alias of {@link serialize} */
export const toIterator = serialize;
