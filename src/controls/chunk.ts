import type { Curried } from '../compositions/curry.js';
import { type Purried, purry } from '../compositions/purry.js';
import { _isIterable } from './_guards.js';
import type { Chunked, Series, SyncSeries } from './types.js';

function* _syncChunk<T, L extends number>(input: SyncSeries<T>, size: L): Generator<Chunked<T, L>> {
    let accumulator: T[] = [];
    for (const value of input) {
        accumulator.push(value);
        if (accumulator.length >= size) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- Chunked cannot be safely typed
            yield accumulator as Chunked<T, L>;
            accumulator = [];
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- Chunked cannot be safely typed
    if (accumulator.length > 0) yield accumulator as Chunked<T, L>;
}

// eslint-disable-next-line complexity -- need blocks to yield values
async function* _asyncChunk<T, L extends number>(
    input: Series<T>,
    size: L,
): AsyncGenerator<Chunked<Awaited<T>, L>> {
    let accumulator: T[] = [];
    const awaited = await input;
    if (_isIterable(awaited)) {
        for (const value of awaited) {
            accumulator.push(await value);
            if (accumulator.length >= size) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- Chunked cannot be safely typed
                yield accumulator as Chunked<Awaited<T>, L>;
                accumulator = [];
            }
        }
    } else {
        for await (const value of awaited) {
            accumulator.push(value);
            if (accumulator.length >= size) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- Chunked cannot be safely typed
                yield accumulator as Chunked<Awaited<T>, L>;
                accumulator = [];
            }
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- Chunked cannot be safely typed
    if (accumulator.length > 0) yield accumulator as Chunked<Awaited<T>, L>;
}

/** Chunks a series into a series of chunks. Each chunk has a length equal to `size`, except the last chunk. */
export namespace chunk {
    export function sync<T, L extends number>(
        ...args: Parameters<typeof _syncChunk<T, L>>
    ): ReturnType<typeof _syncChunk<T, L>>;
    export function sync<T, L extends number>(
        ...args: Parameters<Curried<typeof _syncChunk<T, L>>>
    ): ReturnType<Curried<typeof _syncChunk<T, L>>>;
    export function sync<T, L extends number>(
        ...args: Parameters<Purried<typeof _syncChunk<T, L>>>
    ): ReturnType<Purried<typeof _syncChunk<T, L>>> {
        return purry(_syncChunk<T, L>)(...args);
    }

    export function async<T, L extends number>(
        ...args: Parameters<typeof _asyncChunk<T, L>>
    ): ReturnType<typeof _asyncChunk<T, L>>;
    export function async<T, L extends number>(
        ...args: Parameters<Curried<typeof _asyncChunk<T, L>>>
    ): ReturnType<Curried<typeof _asyncChunk<T, L>>>;
    export function async<T, L extends number>(
        ...args: Parameters<Purried<typeof _asyncChunk<T, L>>>
    ): ReturnType<Purried<typeof _asyncChunk<T, L>>> {
        return purry(_asyncChunk<T, L>)(...args);
    }
}
