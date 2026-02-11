import type { Curried } from '../../compositions/curry.js';
import { type Purried, purry } from '../../compositions/purry.js';
import { _isIterable } from '../../controls/_guards.js';
import type { MaybePromise, Series, SyncSeries } from '../../controls/types.js';

function* _syncDropWhile<T>(input: SyncSeries<T>, test: (value: T) => boolean): Generator<T> {
    let dropping = true;
    for (const value of input) {
        if (dropping && test(value)) {
            continue;
        }
        dropping = false;
        yield value;
    }
}

async function* _asyncDropWhile<T>(
    input: Series<T>,
    test: (value: Awaited<T>) => MaybePromise<boolean>,
): AsyncGenerator<Awaited<T>> {
    let dropping = true;
    const awaited = await input;
    if (_isIterable(awaited)) {
        for (const value of awaited) {
            const awaitedValue = await value;
            if (dropping && (await test(awaitedValue))) {
                continue;
            }
            dropping = false;
            yield awaitedValue;
        }
    } else {
        for await (const value of awaited) {
            if (dropping && (await test(value))) {
                continue;
            }
            dropping = false;
            yield value;
        }
    }
}

export function dropWhileSync<T>(
    ...args: Parameters<typeof _syncDropWhile<T>>
): ReturnType<typeof _syncDropWhile<T>>;
export function dropWhileSync<T>(
    ...args: Parameters<Curried<typeof _syncDropWhile<T>>>
): ReturnType<Curried<typeof _syncDropWhile<T>>>;
export function dropWhileSync<T>(
    ...args: Parameters<Purried<typeof _syncDropWhile<T>>>
): ReturnType<Purried<typeof _syncDropWhile<T>>> {
    return purry(_syncDropWhile<T>)(...args);
}

export function dropWhileAsync<T>(
    ...args: Parameters<typeof _asyncDropWhile<T>>
): ReturnType<typeof _asyncDropWhile<T>>;
export function dropWhileAsync<T>(
    ...args: Parameters<Curried<typeof _asyncDropWhile<T>>>
): ReturnType<Curried<typeof _asyncDropWhile<T>>>;
export function dropWhileAsync<T>(
    ...args: Parameters<Purried<typeof _asyncDropWhile<T>>>
): ReturnType<Purried<typeof _asyncDropWhile<T>>> {
    return purry(_asyncDropWhile<T>)(...args);
}

/** Drops elements while the test returns true, starts yielding after the first false. */
export namespace dropWhile {
    export const sync = dropWhileSync;
    export const async = dropWhileAsync;
}
