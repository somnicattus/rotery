import { compose } from '../../compositions/compose.js';
import type { Curried } from '../../compositions/curry.js';
import { pipe } from '../../compositions/pipe.js';
import { type Purried, purry } from '../../compositions/purry.js';
import { awaitAll } from '../../controls/accumulate.js';
import type { Series } from '../../controls/types.js';
import { withConcurrency } from '../../controls/with-concurrency.js';

async function _concurrentForEach<T>(
    input: Series<T>,
    concurrency: number,
    action: (value: Awaited<T>) => Promise<void>,
): Promise<void> {
    await pipe(
        input,
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        withConcurrency(
            concurrency,
            compose(
                values =>
                    values.map(async value => {
                        await action(value);
                    }),
                async promises => await Promise.all(promises),
            ),
        ),
        awaitAll,
    );
}

/**
 * Performs the specified asynchronous action for each element with the specified concurrency.
 * @deprecated use `input => map.async(chunk.async(input, concurrency), forEach,sync(operation)))` instead.
 */
export function concurrentForEach<T>(
    ...args: Parameters<typeof _concurrentForEach<T>>
): ReturnType<typeof _concurrentForEach<T>>;
/**
 * Performs the specified asynchronous action for each element with the specified concurrency.
 * @deprecated use `input => map.async(chunk.async(input, concurrency), forEach,sync(operation)))` instead.
 */
export function concurrentForEach<T>(
    ...args: Parameters<Curried<typeof _concurrentForEach<T>>>
): ReturnType<Curried<typeof _concurrentForEach<T>>>;
// eslint-disable-next-line @typescript-eslint/promise-function-async
export function concurrentForEach<T>(
    ...args: Parameters<Purried<typeof _concurrentForEach<T>>>
): ReturnType<Purried<typeof _concurrentForEach<T>>> {
    return purry(_concurrentForEach<T>)(...args);
}
