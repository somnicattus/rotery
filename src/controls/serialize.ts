import { type Series, type SyncSeries } from './types.js';

/** Serializes a series into an iterator. */
export namespace serialize {
    export function sync<T>(input: SyncSeries<T>): IterableIterator<T> {
        return input[Symbol.iterator]();
    }

    export async function* async<T>(input: Series<T>): AsyncGenerator<Awaited<T>> {
        for await (const value of await input) yield value;
    }
}

/** Create an iterator from a series. Alias of {@link serialize} */
export const toIterator = serialize;
