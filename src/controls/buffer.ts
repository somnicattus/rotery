import { Curried } from '../compositions/curry.js';
import { Purried, purry } from '../compositions/purry.js';
import { MaybePromise, Series } from './types.js';

const isNotEmptyElement = (..._args: unknown[]) => true;

async function* _buffer<T>(input: Series<T>, size: number): AsyncGenerator<Awaited<T>> {
    if (size <= 0) throw new RangeError(`"size" must be positive (got ${size.toString()}).`);

    const awaited = await input;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const iterator = (Array.isArray as (v: unknown) => v is readonly any[])(awaited)
        ? awaited.values()
        : awaited;

    const pull = async (): Promise<IteratorResult<MaybePromise<T>>> => {
        const next = iterator.next();
        return await (next instanceof Promise
            ? next
            : // eslint-disable-next-line unicorn/no-unreadable-iife
              (async (): Promise<IteratorResult<Awaited<T>, unknown>> =>
                  ({
                      value: await next.value,
                      done: next.done,
                  }) as IteratorResult<Awaited<T>, unknown>)());
    };

    const pullers = Array.from({ length: size }, (_, k) =>
        (async () => {
            return { k, result: await pull() };
        })(),
    );

    // eslint-disable-next-line unicorn/no-array-callback-reference
    while (pullers.some(isNotEmptyElement)) {
        // eslint-disable-next-line unicorn/no-array-callback-reference
        const item = await Promise.race(pullers.filter(isNotEmptyElement));
        if (item.result.done) {
            // eslint-disable-next-line @typescript-eslint/no-array-delete, @typescript-eslint/no-dynamic-delete
            delete pullers[item.k];
            continue;
        }
        yield await item.result.value;
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        pullers.splice(
            item.k,
            1,
            (async () => {
                return { k: item.k, result: await pull() };
            })(),
        );
    }
}

/**
 * Buffers specified number of items and generates results in the resolution order.
 *
 * If the input is a synchronous iterator and generates promises, the promises are executed in parallel and throttled.
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
 *     Rt.toArray(), // The results are ordered by the completion time.
 * );
 * ```
 */
export const throttle = buffer;
