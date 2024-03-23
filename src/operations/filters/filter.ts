import { type Purried, purry } from '../../compositions/purry.js';
import { type Series, type SyncSeries } from '../../controls/types.js';

function* _syncFilter<T, S extends T>(
    input: SyncSeries<T>,
    test: (value: T) => value is S,
): Generator<S> {
    for (const value of input) {
        if (test(value)) yield value;
    }
}

async function* _asyncFilter<T, S extends Awaited<T>>(
    input: Series<T>,
    test: ((value: Awaited<T>) => value is S) | ((value: Awaited<T>) => Promise<boolean>),
): AsyncGenerator<S> {
    for await (const value of await input) {
        if (await test(value)) yield value as S;
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
    export function sync<T, S extends T>(
        ...args: Parameters<Purried<typeof _syncFilter<T, S>>>
    ): ReturnType<Purried<typeof _syncFilter<T, S>>> {
        return purry(_syncFilter<T, S>)(...args);
    }

    export function async<T, S extends Awaited<T>>(
        input: Series<T>,
        test: ((value: Awaited<T>) => value is S) | ((value: Awaited<T>) => Promise<boolean>),
    ): AsyncGenerator<S>;
    export function async<T, S extends Awaited<T>>(
        test: ((value: Awaited<T>) => value is S) | ((value: Awaited<T>) => Promise<boolean>),
    ): (input: Series<T>) => AsyncGenerator<S>;
    export function async<T, S extends Awaited<T>>(
        ...args: Parameters<Purried<typeof _asyncFilter<T, S>>>
    ): ReturnType<Purried<typeof _asyncFilter<T, S>>> {
        return purry(_asyncFilter<T, S>)(...args);
    }
}
