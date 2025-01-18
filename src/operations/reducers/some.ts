import type { Curried } from '../../compositions/curry.js';
import { type Purried, purry } from '../../compositions/purry.js';
import { _isIterable } from '../../controls/_guards.js';
import type { Series, SyncSeries } from '../../controls/types.js';

function _syncSome<T>(input: SyncSeries<T>, test: (value: T) => boolean): boolean {
    for (const value of input) {
        if (test(value)) return true;
    }
    return false;
}

// eslint-disable-next-line complexity -- need blocks to return value
async function _asyncSome<T>(
    input: Series<T>,
    test: (value: Awaited<T>) => boolean | Promise<boolean>,
): Promise<boolean> {
    const awaited = await input;
    if (_isIterable(awaited)) {
        for (const value of awaited) {
            if (await test(await value)) return true;
        }
    } else {
        for await (const value of awaited) {
            if (await test(value)) return true;
        }
    }

    return false;
}

/** Determines whether at least one elements satisfy the specified test. */
export namespace some {
    export function sync<T>(
        ...args: Parameters<typeof _syncSome<T>>
    ): ReturnType<typeof _syncSome<T>>;
    export function sync<T>(
        ...args: Parameters<Curried<typeof _syncSome<T>>>
    ): ReturnType<Curried<typeof _syncSome<T>>>;
    export function sync<T>(
        ...args: Parameters<Purried<typeof _syncSome<T>>>
    ): ReturnType<Purried<typeof _syncSome<T>>> {
        return purry(_syncSome<T>)(...args);
    }

    export function async<T>(
        ...args: Parameters<typeof _asyncSome<T>>
    ): ReturnType<typeof _asyncSome<T>>;
    export function async<T>(
        ...args: Parameters<Curried<typeof _asyncSome<T>>>
    ): ReturnType<Curried<typeof _asyncSome<T>>>;

    export function async<T>(
        ...args: Parameters<Purried<typeof _asyncSome<T>>>
    ): ReturnType<Purried<typeof _asyncSome<T>>> {
        return purry(_asyncSome<T>)(...args);
    }
}
