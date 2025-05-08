import type { Curried } from '../../compositions/curry.js';
import { type Purried, purry } from '../../compositions/purry.js';
import { _isIterable } from '../../controls/_guards.js';
import type { MaybePromise, Series, SyncSeries } from '../../controls/types.js';

function* _syncPeek<T>(input: SyncSeries<T>, action: (value: T) => void): Generator<T> {
    for (const value of input) {
        action(value);
        yield value;
    }
}

async function* _asyncPeek<T>(
    input: Series<T>,
    action: (value: Awaited<T>) => MaybePromise<void>,
): AsyncGenerator<Awaited<T>> {
    const awaited = await input;
    if (_isIterable(awaited)) {
        for (const value of awaited) {
            await action(await value);
            yield value;
        }
    } else {
        for await (const value of awaited) {
            await action(value);
            yield value;
        }
    }
}

export function peekSync<T>(
    ...args: Parameters<typeof _syncPeek<T>>
): ReturnType<typeof _syncPeek<T>>;
export function peekSync<T>(
    ...args: Parameters<Curried<typeof _syncPeek<T>>>
): ReturnType<Curried<typeof _syncPeek<T>>>;
export function peekSync<T>(
    ...args: Parameters<Purried<typeof _syncPeek<T>>>
): ReturnType<Purried<typeof _syncPeek<T>>> {
    return purry(_syncPeek<T>)(...args);
}

export function peekAsync<T>(
    ...args: Parameters<typeof _asyncPeek<T>>
): ReturnType<typeof _asyncPeek<T>>;
export function peekAsync<T>(
    ...args: Parameters<Curried<typeof _asyncPeek<T>>>
): ReturnType<Curried<typeof _asyncPeek<T>>>;

export function peekAsync<T>(
    ...args: Parameters<Purried<typeof _asyncPeek<T>>>
): ReturnType<Purried<typeof _asyncPeek<T>>> {
    return purry(_asyncPeek<T>)(...args);
}

/** Performs the specified action for each element and passes it through.  */
export namespace peek {
    export const sync = peekSync;
    export const async = peekAsync;
}
