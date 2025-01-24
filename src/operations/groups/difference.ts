import type { Curried } from '../../compositions/curry.js';
import { type Purried, purry } from '../../compositions/purry.js';
import type { Series, StaticSeries, SyncSeries } from '../../controls/types.js';
import { filter } from '../filters/filter.js';
import { _toSet } from './_to-set.js';

const _syncDifference = <T, U>(input: SyncSeries<T>, other: StaticSeries<U>): Generator<T> => {
    const otherSet = _toSet<T | U>(other);
    return filter.sync(input, value => !otherSet.has(value));
};
const _asyncDifference = <T, U>(
    input: Series<T>,
    other: StaticSeries<U>,
): AsyncGenerator<Awaited<T>> => {
    const otherSet = _toSet<T | U>(other);
    return filter.async(input, value => !otherSet.has(value));
};

export namespace difference {
    export function sync<T, U>(
        ...args: Parameters<typeof _syncDifference<T, U>>
    ): ReturnType<typeof _syncDifference<T, U>>;
    export function sync<T, U>(
        ...args: Parameters<Curried<typeof _syncDifference<T, U>>>
    ): ReturnType<Curried<typeof _syncDifference<T, U>>>;
    export function sync<T, U>(
        ...args: Parameters<Purried<typeof _syncDifference<T, U>>>
    ): ReturnType<Purried<typeof _syncDifference<T, U>>> {
        return purry(_syncDifference<T, U>)(...args);
    }

    export function async<T, U>(
        ...args: Parameters<typeof _asyncDifference<T, U>>
    ): ReturnType<typeof _asyncDifference<T, U>>;
    export function async<T, U>(
        ...args: Parameters<Curried<typeof _asyncDifference<T, U>>>
    ): ReturnType<Curried<typeof _asyncDifference<T, U>>>;
    export function async<T, U>(
        ...args: Parameters<Purried<typeof _asyncDifference<T, U>>>
    ): ReturnType<Purried<typeof _asyncDifference<T, U>>> {
        return purry(_asyncDifference<T, U>)(...args);
    }
}
