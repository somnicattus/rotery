import { type Curried } from '../../compositions/curry.js';
import { type Purried, purry } from '../../compositions/purry.js';
import { type Series, type SyncSeries } from '../../controls/types.js';

function* _syncConcat<T>(preceding: SyncSeries<T>, following: SyncSeries<T>): Generator<T> {
    for (const value of preceding) {
        yield value;
    }
    for (const value of following) {
        yield value;
    }
}

async function* _asyncConcat<T>(preceding: Series<T>, following: Series<T>): AsyncGenerator<T> {
    for await (const value of await preceding) {
        yield value;
    }
    for await (const value of await following) {
        yield value;
    }
}

/**
 * Concatenates two series into one series.
 *
 * You can invert the order for curried call by `following => concat.sync(preceding, following)`
 */
export namespace concat {
    export function sync<T>(
        ...args: Parameters<typeof _syncConcat<T>>
    ): ReturnType<typeof _syncConcat<T>>;
    export function sync<T>(
        ...args: Parameters<Curried<typeof _syncConcat<T>>>
    ): ReturnType<Curried<typeof _syncConcat<T>>>;
    export function sync<T>(
        ...args: Parameters<Purried<typeof _syncConcat<T>>>
    ): ReturnType<Purried<typeof _syncConcat<T>>> {
        return purry(_syncConcat<T>)(...args);
    }

    export function async<T>(
        ...args: Parameters<typeof _asyncConcat<T>>
    ): ReturnType<typeof _asyncConcat<T>>;
    export function async<T>(
        ...args: Parameters<Curried<typeof _asyncConcat<T>>>
    ): ReturnType<Curried<typeof _asyncConcat<T>>>;
    export function async<T>(
        ...args: Parameters<Purried<typeof _asyncConcat<T>>>
    ): ReturnType<Purried<typeof _asyncConcat<T>>> {
        return purry(_asyncConcat<T>)(...args);
    }
}
