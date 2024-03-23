import { type Curried } from '../compositions/curry.js';
import { pipe } from '../compositions/pipe.js';
import { type Purried, purry } from '../compositions/purry.js';
import { map } from '../operations/index.js';
import { chunk } from './chunk.js';
import { type Series } from './types.js';

function _withConcurrency<I, O>(
    input: Series<I>,
    concurrency: number,
    operation: (value: Awaited<I>[]) => O,
): AsyncGenerator<Awaited<O>> {
    return pipe(input, chunk.async(concurrency), map.async(operation));
}

/** Applies the specified operation to each chunk. */
export function withConcurrency<I, O>(
    ...args: Parameters<typeof _withConcurrency<I, O>>
): ReturnType<typeof _withConcurrency<I, O>>;
export function withConcurrency<I, O>(
    ...args: Parameters<Curried<typeof _withConcurrency<I, O>>>
): ReturnType<Curried<typeof _withConcurrency<I, O>>>;
export function withConcurrency<I, O>(
    ...args: Parameters<Purried<typeof _withConcurrency<I, O>>>
): ReturnType<Purried<typeof _withConcurrency<I, O>>> {
    return purry(_withConcurrency<I, O>)(...args);
}
