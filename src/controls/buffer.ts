import type { Curried } from '../compositions/curry.js';
import { type Purried, purry } from '../compositions/purry.js';
import type { Series } from './types.js';

const isNotEmptyElement = (): true => true;

async function* _buffer<T>(input: Series<T>, size: number): AsyncGenerator<Awaited<T>> {
    if (size <= 0 || !Number.isInteger(size))
        throw new RangeError(`"size" must be a positive integer (got ${size.toString()}).`);

    const awaited = await input;
    const iterator = (Array.isArray as (v: unknown) => v is readonly unknown[])(awaited)
        ? awaited.values()
        : awaited;

    const work = async (
        k: number,
    ): Promise<{
        k: number;
        result: IteratorResult<Awaited<T>>;
    }> => {
        const next = iterator.next();
        // HACK: ignoring return results
        const result =
            next instanceof Promise
                ? ((await next) as IteratorResult<Awaited<T>>)
                : ({
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                      value: await next.value,
                      done: next.done,
                  } as const as IteratorResult<Awaited<T>>);
        return { k, result };
    };

    const workers = Array.from({ length: size }, async (_, k) => await work(k));

    // eslint-disable-next-line unicorn/no-array-callback-reference, @typescript-eslint/no-unnecessary-condition
    while (workers.some(isNotEmptyElement)) {
        // eslint-disable-next-line unicorn/no-array-callback-reference, @typescript-eslint/no-unnecessary-condition
        const item = await Promise.race(workers.filter(isNotEmptyElement));
        if (item.result.done === true) {
            // eslint-disable-next-line @typescript-eslint/no-array-delete, @typescript-eslint/no-dynamic-delete, sonarjs/no-array-delete
            delete workers[item.k];
            continue;
        }
        yield item.result.value;
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        workers.splice(item.k, 1, work(item.k));
    }
}

/**
 * Buffers specified number of items and generates results in the resolution order.
 *
 * If the input is a synchronous iterator which generates promises, the promises are executed in parallel and throttled.
 */
export function buffer<T>(...args: Parameters<typeof _buffer<T>>): ReturnType<typeof _buffer<T>>;
export function buffer<T>(
    ...args: Parameters<Curried<typeof _buffer<T>>>
): ReturnType<Curried<typeof _buffer<T>>>;
export function buffer<T>(
    ...args: Parameters<Purried<typeof _buffer<T>>>
): ReturnType<Purried<typeof _buffer<T>>> {
    return purry(_buffer<T>)(...args);
}

/**
 * The promises generated by the given synchronous iterator are executed in parallel and throttled.
 * Alias of {@link buffer}.
 *
 * The results are generated asynchronously in the order of completion, not in the order of input (the first completed result will be emitted first). Please keep in mind that the order of results differs from the order of input.
 *
 * @example
 * ```ts
 * const responses = await Rt.pipe(
 *     urls,
 *     Rt.map.sync(async url => {
 *         const response = await fetch(url);
 *         return await response.json();
 *     }),
 *     Rt.throttle(5), // This maintains up to 5 concurrent HTTP fetch requests.
 *     Rt.accumulate.async, // The results are ordered by the completion time.
 * );
 * ```
 */
export const throttle = buffer;
