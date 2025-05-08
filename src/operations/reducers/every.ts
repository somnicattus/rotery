import type { Curried } from '../../compositions/curry.js';
import { type Purried, purry } from '../../compositions/purry.js';
import { _isIterable } from '../../controls/_guards.js';
import type { MaybePromise, Series, SyncSeries } from '../../controls/types.js';

function _syncEvery<T, S extends T>(
    input: SyncSeries<T>,
    test: ((value: T) => value is S) | ((value: T) => boolean),
): input is SyncSeries<S> {
    for (const value of input) {
        if (!test(value)) return false;
    }
    return true;
}

async function _asyncEvery<T>(
    input: Series<T>,
    test: (value: Awaited<T>) => MaybePromise<boolean>,
): Promise<boolean> {
    const awaited = await input;
    if (_isIterable(awaited)) {
        for (const value of awaited) {
            if (!(await test(await value))) return false;
        }
    } else {
        for await (const value of awaited) {
            if (!(await test(value))) return false;
        }
    }

    return true;
}

export function everySync<T, S extends T>(
    input: SyncSeries<T>,
    test: (value: T) => value is S,
): input is SyncSeries<S>;
export function everySync<T, S extends T>(
    test: (value: T) => value is S,
): (input: SyncSeries<T>) => input is SyncSeries<S>;
export function everySync<T>(input: SyncSeries<T>, test: (value: T) => boolean): boolean;
export function everySync<T>(test: (value: T) => boolean): (input: SyncSeries<T>) => boolean;
export function everySync<T, S extends T>(
    ...args: Parameters<Purried<typeof _syncEvery<T, S>>>
): ReturnType<Purried<typeof _syncEvery<T, S>>> {
    return purry(_syncEvery<T, S>)(...args);
}

export function everyAsync<T>(
    ...args: Parameters<typeof _asyncEvery<T>>
): ReturnType<typeof _asyncEvery<T>>;
export function everyAsync<T>(
    ...args: Parameters<Curried<typeof _asyncEvery<T>>>
): ReturnType<Curried<typeof _asyncEvery<T>>>;
export function everyAsync<T>(
    ...args: Parameters<Purried<typeof _asyncEvery<T>>>
): ReturnType<Purried<typeof _asyncEvery<T>>> {
    return purry(_asyncEvery<T>)(...args);
}

/** Determines whether every element satisfies the specified test. */
export namespace every {
    export const sync = everySync;
    export const async = everyAsync;
}
