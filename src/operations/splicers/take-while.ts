import { type Purried, purry } from '../../compositions/purry.js';
import { _isIterable } from '../../controls/_guards.js';
import type { MaybePromise, Series, SyncSeries } from '../../controls/types.js';

function* _syncTakeWhile<T, S extends T>(
    input: SyncSeries<T>,
    test: ((value: T) => value is S) | ((value: T) => boolean),
): Generator<T | S> {
    for (const value of input) {
        if (!test(value)) {
            break;
        }
        yield value;
    }
}

async function* _asyncTakeWhile<T, S extends Awaited<T>>(
    input: Series<T>,
    test: ((value: Awaited<T>) => value is S) | ((value: Awaited<T>) => MaybePromise<boolean>),
): AsyncGenerator<T | S> {
    const awaited = await input;
    if (_isIterable(awaited)) {
        for (const value of awaited) {
            if (!(await test(await value))) {
                break;
            }
            yield await value;
        }
    } else {
        for await (const value of awaited) {
            if (!(await test(value))) {
                break;
            }
            yield value;
        }
    }
}

export function takeWhileSync<T, S extends T>(
    input: SyncSeries<T>,
    test: (value: T) => value is S,
): Generator<S>;
export function takeWhileSync<T, S extends T>(
    test: (value: T) => value is S,
): (input: SyncSeries<T>) => Generator<S>;
export function takeWhileSync<T>(input: SyncSeries<T>, test: (value: T) => boolean): Generator<T>;
export function takeWhileSync<T>(
    test: (value: T) => boolean,
): (input: SyncSeries<T>) => Generator<T>;
export function takeWhileSync<T, S extends T>(
    ...args: Parameters<Purried<typeof _syncTakeWhile<T, S>>>
): ReturnType<Purried<typeof _syncTakeWhile<T, S>>> {
    return purry(_syncTakeWhile<T, S>)(...args);
}

export function takeWhileAsync<T, S extends Awaited<T>>(
    input: Series<T>,
    test: (value: Awaited<T>) => value is S,
): AsyncGenerator<S>;
export function takeWhileAsync<T, S extends Awaited<T>>(
    test: (value: Awaited<T>) => value is S,
): (input: Series<T>) => AsyncGenerator<S>;
export function takeWhileAsync<T>(
    input: Series<T>,
    test: (value: Awaited<T>) => MaybePromise<boolean>,
): AsyncGenerator<Awaited<T>>;
export function takeWhileAsync<T>(
    test: (value: Awaited<T>) => MaybePromise<boolean>,
): (input: Series<T>) => AsyncGenerator<Awaited<T>>;
export function takeWhileAsync<T, S extends Awaited<T>>(
    ...args: Parameters<Purried<typeof _asyncTakeWhile<T, S>>>
): ReturnType<Purried<typeof _asyncTakeWhile<T, S>>> {
    return purry(_asyncTakeWhile<T, S>)(...args);
}

/** Takes elements while the test returns true, stops at the first false. */
export namespace takeWhile {
    export const sync = takeWhileSync;
    export const async = takeWhileAsync;
}
