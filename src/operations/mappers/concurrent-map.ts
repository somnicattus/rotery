import { type Curried } from '../../compositions/curry.js';
import { pipe } from '../../compositions/pipe.js';
import { type Purried, purry } from '../../compositions/purry.js';
import { flatten } from '../../controls/flatten.js';
import { type Series } from '../../controls/types.js';
import { withConcurrency } from '../../controls/with-concurrency.js';

function _concurrentMap<I, O>(
    input: Series<I>,
    concurrency: number,
    mapper: (value: I) => Promise<O>,
): AsyncGenerator<Awaited<O>> {
    return pipe(
        input,
        withConcurrency(concurrency, values => values.map(async value => await mapper(value))),
        flatten.async,
    );
}

/** Maps each element by the specified asynchronous mapper with the specified concurrency.  */
export function concurrentMap<I, O>(
    ...args: Parameters<typeof _concurrentMap<I, O>>
): ReturnType<typeof _concurrentMap<I, O>>;
export function concurrentMap<I, O>(
    ...args: Parameters<Curried<typeof _concurrentMap<I, O>>>
): ReturnType<Curried<typeof _concurrentMap<I, O>>>;
export function concurrentMap<I, O>(
    ...args: Parameters<Purried<typeof _concurrentMap<I, O>>>
): ReturnType<Purried<typeof _concurrentMap<I, O>>> {
    return purry(_concurrentMap<I, O>)(...args);
}
