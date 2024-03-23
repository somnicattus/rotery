import { type Purried, purry } from '../../compositions/purry.js';
import { type Series, type SyncSeries } from '../../controls/types.js';

function _syncFind<T, S extends T>(
    input: SyncSeries<T>,
    test: (value: T) => value is S,
): S | undefined {
    for (const value of input) {
        if (test(value)) return value;
    }
    return undefined;
}

async function _asyncFind<T, S extends Awaited<T>>(
    input: Series<T>,
    test: ((value: Awaited<T>) => value is S) | ((value: Awaited<T>) => Promise<boolean>),
): Promise<S | undefined> {
    for await (const value of await input) {
        if (await test(value)) return value as S;
    }
    return undefined;
}

/** Returns the first met element with the specified test, and undefined otherwise. */
export namespace find {
    export function sync<T, S extends T>(
        input: SyncSeries<T>,
        test: (value: T) => value is S,
    ): S | undefined;
    export function sync<T, S extends T>(
        test: (value: T) => value is S,
    ): (input: SyncSeries<T>) => S | undefined;
    export function sync<T, S extends T>(
        ...args: Parameters<Purried<typeof _syncFind<T, S>>>
    ): ReturnType<Purried<typeof _syncFind<T, S>>> {
        return purry(_syncFind<T, S>)(...args);
    }

    export function async<T, S extends Awaited<T>>(
        input: Series<T>,
        test: ((value: Awaited<T>) => value is S) | ((value: Awaited<T>) => Promise<boolean>),
    ): Promise<S | undefined>;
    export function async<T, S extends Awaited<T>>(
        test: ((value: Awaited<T>) => value is S) | ((value: Awaited<T>) => Promise<boolean>),
    ): (input: Series<T>) => Promise<S | undefined>;
    export function async<T, S extends Awaited<T>>(
        ...args: Parameters<Purried<typeof _asyncFind<T, S>>>
    ): ReturnType<Purried<typeof _asyncFind<T, S>>> {
        return purry(_asyncFind<T, S>)(...args);
    }
}
