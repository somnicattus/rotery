import { type Purried, purry } from '../../compositions/purry.js';
import { _isIterable } from '../../controls/_guards.js';
import type { MaybePromise, Series, SyncSeries } from '../../controls/types.js';

function* _syncFilter<T, S extends T>(
    input: SyncSeries<T>,
    test: ((value: T) => value is S) | ((value: T) => boolean),
): Generator<T | S> {
    for (const value of input) {
        if (test(value)) yield value;
    }
}

async function* _asyncFilter<T, S extends Awaited<T>>(
    input: Series<T>,
    test: ((value: Awaited<T>) => value is S) | ((value: Awaited<T>) => MaybePromise<boolean>),
): AsyncGenerator<T | S> {
    const awaited = await input;
    if (_isIterable(awaited)) {
        for (const value of awaited) {
            if (await test(await value)) yield value;
        }
    } else {
        for await (const value of awaited) {
            if (await test(value)) yield value;
        }
    }
}

/** Filters the elements by the specified test. */
export namespace filter {
    export function sync<T, S extends T>(
        input: SyncSeries<T>,
        test: (value: T) => value is S,
    ): Generator<S>;
    export function sync<T, S extends T>(
        test: (value: T) => value is S,
    ): (input: SyncSeries<T>) => Generator<S>;
    export function sync<T>(input: SyncSeries<T>, test: (value: T) => boolean): Generator<T>;
    export function sync<T>(test: (value: T) => boolean): (input: SyncSeries<T>) => Generator<T>;
    export function sync<T, S extends T>(
        ...args: Parameters<Purried<typeof _syncFilter<T, S>>>
    ): ReturnType<Purried<typeof _syncFilter<T, S>>> {
        return purry(_syncFilter<T, S>)(...args);
    }

    export function async<T, S extends Awaited<T>>(
        input: Series<T>,
        test: (value: Awaited<T>) => value is S,
    ): AsyncGenerator<S>;
    export function async<T, S extends Awaited<T>>(
        test: (value: Awaited<T>) => value is S,
    ): (input: Series<T>) => AsyncGenerator<S>;
    export function async<T>(
        input: Series<T>,
        test: (value: Awaited<T>) => MaybePromise<boolean>,
    ): AsyncGenerator<Awaited<T>>;
    export function async<T>(
        test: (value: Awaited<T>) => MaybePromise<boolean>,
    ): (input: Series<T>) => AsyncGenerator<Awaited<T>>;
    export function async<T, S extends Awaited<T>>(
        ...args: Parameters<Purried<typeof _asyncFilter<T, S>>>
    ): ReturnType<Purried<typeof _asyncFilter<T, S>>> {
        return purry(_asyncFilter<T, S>)(...args);
    }
}
