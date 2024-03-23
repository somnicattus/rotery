import { type Curried } from '../../compositions/curry.js';
import { type Purried, purry } from '../../compositions/purry.js';
import { type Series, type SyncSeries } from '../../controls/types.js';

function _syncReduce<T, R>(
    input: SyncSeries<T>,
    reducer: (accumulator: R, value: T) => R,
    initialValue: R,
): R {
    let returnValue: R = initialValue;
    for (const value of input) {
        returnValue = reducer(returnValue, value);
    }
    return returnValue;
}

async function _asyncReduce<T, R>(
    input: Series<T>,
    reducer: (accumulator: Awaited<R>, value: Awaited<T>) => R | Promise<R>,
    initialValue: R | Promise<R>,
): Promise<Awaited<R>> {
    let returnValue: Awaited<R> = await initialValue;
    for await (const value of await input) {
        returnValue = await reducer(returnValue, value);
    }
    return returnValue;
}

/** Reduce elements into one accumulated value by the specified reducer.  */
export namespace reduce {
    export function sync<T, R>(
        ...args: Parameters<typeof _syncReduce<T, R>>
    ): ReturnType<typeof _syncReduce<T, R>>;
    export function sync<T, R>(
        ...args: Parameters<Curried<typeof _syncReduce<T, R>>>
    ): ReturnType<Curried<typeof _syncReduce<T, R>>>;
    export function sync<T, R>(
        ...args: Parameters<Purried<typeof _syncReduce<T, R>>>
    ): ReturnType<Purried<typeof _syncReduce<T, R>>> {
        return purry(_syncReduce<T, R>)(...args);
    }

    export function async<T, R>(
        ...args: Parameters<typeof _asyncReduce<T, R>>
    ): ReturnType<typeof _asyncReduce<T, R>>;
    export function async<T, R>(
        ...args: Parameters<Curried<typeof _asyncReduce<T, R>>>
    ): ReturnType<Curried<typeof _asyncReduce<T, R>>>;
    export function async<T, R>(
        ...args: Parameters<Purried<typeof _asyncReduce<T, R>>>
    ): ReturnType<Purried<typeof _asyncReduce<T, R>>> {
        return purry(_asyncReduce<T, R>)(...args);
    }
}
