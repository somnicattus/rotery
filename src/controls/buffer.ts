import type { Curried } from '../compositions/curry.js';
import { type Purried, purry } from '../compositions/purry.js';
import type { Series, StaticSeries } from './types.js';

const isNotEmptyElement = (): true => true;

const isArrayOrSet = <T>(
    awaited: Awaited<Series<T>>,
): awaited is Extract<Awaited<Series<T>>, StaticSeries<unknown>> =>
    Array.isArray(awaited) || awaited instanceof Set;

type AwaitedIterator<T> = Exclude<Awaited<Series<T>>, StaticSeries<unknown>>;
const toAwaitedIterator = async <T>(input: Series<T>): Promise<AwaitedIterator<T>> => {
    const awaited = await input;
    return isArrayOrSet(awaited) ? awaited.values() : awaited;
};

interface Worker<T> {
    k: number;
    result: IteratorResult<Awaited<T>>;
}
const constructWorkFunction =
    <T>(iterator: AwaitedIterator<T>) =>
    async (k: number): Promise<Worker<T>> => {
        const next = iterator.next();
        // HACK: ignoring return results
        const result =
            next instanceof Promise
                ? // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- TReturn is not considered
                  ((await next) as IteratorResult<Awaited<T>>)
                : ({
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- TReturn is not considered
                      value: (await next.value) as Awaited<T>,
                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- undefined is not considered
                      done: next.done!,
                  } as const);
        return { k, result };
    };

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- Return type is defined by the actual values
const constructWorker = async <T>(input: Series<T>, size: number, mode: 'frfo' | 'fifo') => {
    const work = constructWorkFunction(await toAwaitedIterator(input));
    const workers = Array.from({ length: size }, async (_, k) => await work(k));

    let fifoIndex = 0;
    const next =
        mode === 'fifo'
            ? async () => {
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- `fifoIndex` always indicates an existing element in fifo mode.
                  const { k, result } = await workers[fifoIndex]!;
                  // eslint-disable-next-line @typescript-eslint/no-array-delete, @typescript-eslint/no-dynamic-delete -- HACK: empty elements mean no more workers
                  if (result.done === true) delete workers[k];
                  // eslint-disable-next-line @typescript-eslint/no-floating-promises -- workers contain promises
                  else workers.splice(k, 1, work(k));
                  fifoIndex = (fifoIndex + 1) % size;
                  return result;
              }
            : async () => {
                  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- HACK: empty elements is not evaluated as true
                  const { k, result } = await Promise.race(workers.filter(isNotEmptyElement));
                  // eslint-disable-next-line @typescript-eslint/no-array-delete, @typescript-eslint/no-dynamic-delete -- HACK: empty elements mean no more workers
                  if (result.done === true) delete workers[k];
                  // eslint-disable-next-line @typescript-eslint/no-floating-promises -- workers contain promises
                  else workers.splice(k, 1, work(k));
                  return result;
              };

    return {
        next,
        get isActive() {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- HACK: empty elements is not evaluated as true
            return workers.some(isNotEmptyElement);
        },
    } as const;
};

async function* _buffer<T>(
    input: Series<T>,
    options: {
        /** Number of items buffered. */
        size: number;
        /**
         * - `'frfo'` (default) : first resolved will be first output.
         * - `'fifo'` : first input will be first output.
         */
        mode?: 'frfo' | 'fifo';
    },
): AsyncGenerator<Awaited<T>> {
    const { size, mode } = { mode: 'frfo', ...options } as const;
    if (size <= 0 || !Number.isInteger(size))
        throw new RangeError(`"size" must be a positive integer (got ${size.toString()}).`);

    const worker = await constructWorker(input, size, mode);

    while (worker.isActive) {
        const result = await worker.next();
        if (result.done === true) continue;
        yield result.value;
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
 * @example
 * ```ts
 * const responses = await Rt.pipe(
 *     urls,
 *     Rt.map.sync(async url => {
 *         const response = await fetch(url);
 *         return await response.json();
 *     }),
 *     Rt.throttle({ size: 5 }), // Maintain up to 5 concurrent HTTP fetch requests.
 *     Rt.accumulate.async, // The results are in resolution order.
 * );
 * ```
 */
export const throttle = buffer;
/**
 * The promises generated by the given synchronous iterator are executed in parallel and kept in defined concurrency level.
 * Alias of {@link buffer}.
 *
 * @example
 * ```ts
 * const responses = await Rt.pipe(
 *     urls,
 *     Rt.map.sync(async url => {
 *         const response = await fetch(url);
 *         return await response.json();
 *     }),
 *     Rt.concurrency({ size: 5 }), // Maintain up to 5 concurrent HTTP fetch requests.
 *     Rt.accumulate.async, // The results are in resolution order.
 * );
 * ```
 */
export const concurrency = throttle;
