import type { Curried } from '../../compositions/curry.js';
import { type Purried, purry } from '../../compositions/purry.js';
import type { MaybePromise, Series, StaticSeries, SyncSeries } from '../../controls/types.js';
import { filter } from '../filters/filter.js';
import { _toSet } from './_to-set.js';

const _syncDifferenceBy = <T, U>(
    input: SyncSeries<T>,
    other: StaticSeries<U>,
    key: (value: T) => U,
): Generator<T> => {
    const otherSet = _toSet<T | U>(other);
    return filter.sync(input, value => !otherSet.has(key(value)));
};
const _asyncDifferenceBy = <T, U>(
    input: Series<T>,
    other: StaticSeries<U>,
    key: (value: Awaited<T>) => MaybePromise<U>,
): AsyncGenerator<Awaited<T>> => {
    const otherSet = _toSet<T | U>(other);
    return filter.async(input, async value => !otherSet.has(await key(value)));
};

export namespace differenceBy {
    export function sync<T, U>(
        ...args: Parameters<typeof _syncDifferenceBy<T, U>>
    ): ReturnType<typeof _syncDifferenceBy<T, U>>;
    export function sync<T, U>(
        ...args: Parameters<Curried<typeof _syncDifferenceBy<T, U>>>
    ): ReturnType<Curried<typeof _syncDifferenceBy<T, U>>>;
    export function sync<T, U>(
        ...args: Parameters<Purried<typeof _syncDifferenceBy<T, U>>>
    ): ReturnType<Purried<typeof _syncDifferenceBy<T, U>>> {
        return purry(_syncDifferenceBy<T, U>)(...args);
    }

    export function async<T, U>(
        ...args: Parameters<typeof _asyncDifferenceBy<T, U>>
    ): ReturnType<typeof _asyncDifferenceBy<T, U>>;
    export function async<T, U>(
        ...args: Parameters<Curried<typeof _asyncDifferenceBy<T, U>>>
    ): ReturnType<Curried<typeof _asyncDifferenceBy<T, U>>>;
    export function async<T, U>(
        ...args: Parameters<Purried<typeof _asyncDifferenceBy<T, U>>>
    ): ReturnType<Purried<typeof _asyncDifferenceBy<T, U>>> {
        return purry(_asyncDifferenceBy<T, U>)(...args);
    }
}
