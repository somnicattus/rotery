import type { Curried } from '../../compositions/curry.js';
import { type Purried, purry } from '../../compositions/purry.js';
import type { Series, SyncSeries } from '../../controls/types.js';

function* _syncConcat<T>(preceding: SyncSeries<T>, following: SyncSeries<T>): Generator<T> {
    yield* preceding;
    yield* following;
}

async function* _asyncConcat<T>(preceding: Series<T>, following: Series<T>): AsyncGenerator<T> {
    yield* await preceding;
    yield* await following;
}

export function concatSync<T>(
    ...args: Parameters<typeof _syncConcat<T>>
): ReturnType<typeof _syncConcat<T>>;
export function concatSync<T>(
    ...args: Parameters<Curried<typeof _syncConcat<T>>>
): ReturnType<Curried<typeof _syncConcat<T>>>;
export function concatSync<T>(
    ...args: Parameters<Purried<typeof _syncConcat<T>>>
): ReturnType<Purried<typeof _syncConcat<T>>> {
    return purry(_syncConcat<T>)(...args);
}

export function concatAsync<T>(
    ...args: Parameters<typeof _asyncConcat<T>>
): ReturnType<typeof _asyncConcat<T>>;
export function concatAsync<T>(
    ...args: Parameters<Curried<typeof _asyncConcat<T>>>
): ReturnType<Curried<typeof _asyncConcat<T>>>;
export function concatAsync<T>(
    ...args: Parameters<Purried<typeof _asyncConcat<T>>>
): ReturnType<Purried<typeof _asyncConcat<T>>> {
    return purry(_asyncConcat<T>)(...args);
}

/**
 * Concatenates two series into one series.
 *
 * You can invert the order for curried call by `following => concat.sync(preceding, following)`
 */
export namespace concat {
    export const sync = concatSync;
    export const async = concatAsync;
}
