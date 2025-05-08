import type { Curried } from '../../compositions/curry.js';
import { type Purried, purry } from '../../compositions/purry.js';
import { _isIterable } from '../../controls/_guards.js';
import type { Series, SyncSeries } from '../../controls/types.js';

function _syncForEach<T>(input: SyncSeries<T>, action: (value: T) => void): void {
    for (const value of input) {
        action(value);
    }
}

async function _asyncForEach<T>(
    input: Series<T>,
    action: (value: Awaited<T>) => void | Promise<void>,
): Promise<void> {
    const awaited = await input;
    if (_isIterable(awaited)) {
        for (const value of awaited) {
            await action(await value);
        }
    } else {
        for await (const value of awaited) {
            await action(value);
        }
    }
}

export function forEachSync<T>(
    ...args: Parameters<typeof _syncForEach<T>>
): ReturnType<typeof _syncForEach<T>>;
export function forEachSync<T>(
    ...args: Parameters<Curried<typeof _syncForEach<T>>>
): ReturnType<Curried<typeof _syncForEach<T>>>;
export function forEachSync<T>(
    ...args: Parameters<Purried<typeof _syncForEach<T>>>
): ReturnType<Purried<typeof _syncForEach<T>>> {
    return purry(_syncForEach<T>)(...args);
}

export function forEachAsync<T>(
    ...args: Parameters<typeof _asyncForEach<T>>
): ReturnType<typeof _asyncForEach<T>>;
export function forEachAsync<T>(
    ...args: Parameters<Curried<typeof _asyncForEach<T>>>
): ReturnType<Curried<typeof _asyncForEach<T>>>;

export function forEachAsync<T>(
    ...args: Parameters<Purried<typeof _asyncForEach<T>>>
): ReturnType<Purried<typeof _asyncForEach<T>>> {
    return purry(_asyncForEach<T>)(...args);
}

/** Performs the specified action for each element.  */
export namespace forEach {
    export const sync = forEachSync;
    export const async = forEachAsync;
}
