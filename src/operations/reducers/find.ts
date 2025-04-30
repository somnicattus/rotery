import { type Purried, purry } from '../../compositions/purry.js';
import { _isIterable } from '../../controls/_guards.js';
import type { MaybePromise, Series, SyncSeries } from '../../controls/types.js';

function _syncFind<T, S extends T>(
    input: SyncSeries<T>,
    test: ((value: T) => value is S) | ((value: T) => boolean),
): S | T | undefined {
    for (const value of input) {
        if (test(value)) return value;
    }
    return undefined;
}

async function _asyncFind<T, S extends Awaited<T>>(
    input: Series<T>,
    test: ((value: Awaited<T>) => value is S) | ((value: Awaited<T>) => MaybePromise<boolean>),
): Promise<S | T | undefined> {
    const awaited = await input;
    if (_isIterable(awaited)) {
        for (const value of awaited) {
            if (await test(await value)) return await value;
        }
    } else {
        for await (const value of awaited) {
            if (await test(value)) return value;
        }
    }

    return undefined;
}

export function findSync<T, S extends T>(
    input: SyncSeries<T>,
    test: (value: T) => value is S,
): S | undefined;
export function findSync<T, S extends T>(
    test: (value: T) => value is S,
): (input: SyncSeries<T>) => S | undefined;
export function findSync<T>(input: SyncSeries<T>, test: (value: T) => boolean): T | undefined;
export function findSync<T>(test: (value: T) => boolean): (input: SyncSeries<T>) => T | undefined;
export function findSync<T, S extends T>(
    ...args: Parameters<Purried<typeof _syncFind<T, S>>>
): ReturnType<Purried<typeof _syncFind<T, S>>> {
    return purry(_syncFind<T, S>)(...args);
}

export function findAsync<T, S extends Awaited<T>>(
    input: Series<T>,
    test: ((value: Awaited<T>) => value is S) | ((value: Awaited<T>) => Promise<boolean>),
): Promise<S | undefined>;
export function findAsync<T, S extends Awaited<T>>(
    test: ((value: Awaited<T>) => value is S) | ((value: Awaited<T>) => Promise<boolean>),
): (input: Series<T>) => Promise<S | undefined>;
export function findAsync<T>(
    input: Series<T>,
    test: (value: Awaited<T>) => MaybePromise<boolean>,
): Promise<T | undefined>;
export function findAsync<T>(
    test: (value: Awaited<T>) => MaybePromise<boolean>,
): (input: Series<T>) => Promise<T | undefined>;
export function findAsync<T, S extends Awaited<T>>(
    ...args: Parameters<Purried<typeof _asyncFind<T, S>>>
): ReturnType<Purried<typeof _asyncFind<T, S>>> {
    return purry(_asyncFind<T, S>)(...args);
}

/** Returns the first met element with the specified test, and undefined otherwise. */
export namespace find {
    export const sync = findSync;
    export const async = findAsync;
}
