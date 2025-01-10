import type { Curried } from '../../compositions/curry.js';
import { type Purried, purry } from '../../compositions/purry.js';
import { isIterable } from '../../controls/guards.js';
import type { Series, SyncSeries } from '../../controls/types.js';

function _syncReduce<T, R, I>(
    input: SyncSeries<T>,
    reducer: (accumulator: R | I, value: T) => R,
    initialValue: I,
): I | R {
    let returnValue: I | R = initialValue;
    for (const value of input) {
        returnValue = reducer(returnValue, value);
    }
    return returnValue;
}

async function _asyncReduce<T, R, I>(
    input: Series<T>,
    reducer: (accumulator: Awaited<R | I>, value: Awaited<T>) => R | Promise<R>,
    initialValue: I | Promise<I>,
): Promise<Awaited<R> | Awaited<I>> {
    let returnValue: Awaited<I> | Awaited<R> = await initialValue;
    const awaited = await input;
    if (isIterable(awaited)) {
        for (const value of awaited) {
            returnValue = await reducer(returnValue, await value);
        }
    } else {
        for await (const value of awaited) {
            returnValue = await reducer(returnValue, value);
        }
    }

    return returnValue;
}

/** Reduce elements into one accumulated value by the specified reducer.  */
export namespace reduce {
    export function sync<T, R, I>(
        ...args: Parameters<typeof _syncReduce<T, R, I>>
    ): ReturnType<typeof _syncReduce<T, R, I>>;
    export function sync<T, R, I>(
        ...args: Parameters<Curried<typeof _syncReduce<T, R, I>>>
    ): ReturnType<Curried<typeof _syncReduce<T, R, I>>>;
    export function sync<T, R, I>(
        ...args: Parameters<Purried<typeof _syncReduce<T, R, I>>>
    ): ReturnType<Purried<typeof _syncReduce<T, R, I>>> {
        return purry(_syncReduce<T, R, I>)(...args);
    }

    export function async<T, R, I>(
        ...args: Parameters<typeof _asyncReduce<T, R, I>>
    ): ReturnType<typeof _asyncReduce<T, R, I>>;
    export function async<T, R, I>(
        ...args: Parameters<Curried<typeof _asyncReduce<T, R, I>>>
    ): ReturnType<Curried<typeof _asyncReduce<T, R, I>>>;

    export function async<T, R, I>(
        ...args: Parameters<Purried<typeof _asyncReduce<T, R, I>>>
    ): ReturnType<Purried<typeof _asyncReduce<T, R, I>>> {
        return purry(_asyncReduce<T, R, I>)(...args);
    }
}
