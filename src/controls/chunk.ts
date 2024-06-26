import { type Curried } from '../compositions/curry.js';
import { type Purried, purry } from '../compositions/purry.js';
import { type Chunked, type Series, type SyncSeries } from './types.js';

function* _syncChunk<T, L extends number>(input: SyncSeries<T>, size: L): Generator<Chunked<T, L>> {
    let accumulator: T[] = [];
    for (const value of input) {
        accumulator.push(value);
        if (accumulator.length >= size) {
            yield accumulator as Chunked<T, L>;
            accumulator = [];
        }
    }
    if (accumulator.length > 0) yield accumulator as Chunked<T, L>;
}

async function* _asyncChunk<T, L extends number>(
    input: Series<T>,
    size: L,
): AsyncGenerator<Chunked<Awaited<T>, L>> {
    let accumulator: T[] = [];
    for await (const value of await input) {
        accumulator.push(value);
        if (accumulator.length >= size) {
            yield accumulator as Chunked<Awaited<T>, L>;
            accumulator = [];
        }
    }
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
