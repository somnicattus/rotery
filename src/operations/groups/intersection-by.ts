import type { Curried } from '../../compositions/curry.js';
import { type Purried, purry } from '../../compositions/purry.js';
import type { MaybePromise, Series, StaticSeries, SyncSeries } from '../../controls/types.js';
import { filter } from '../filters/filter.js';
import { _toSet } from './_to-set.js';

const _syncIntersectionBy = <T, U>(
    input: SyncSeries<T>,
    other: StaticSeries<U>,
    key: (value: T) => U,
): Generator<T> => {
    const otherSet = _toSet<T | U>(other);
    return filter.sync(input, value => otherSet.has(key(value)));
};
const _asyncIntersectionBy = <T, U>(
    input: Series<T>,
    other: StaticSeries<U>,
    key: (value: Awaited<T>) => MaybePromise<U>,
): AsyncGenerator<Awaited<T>> => {
    const otherSet = _toSet<Awaited<T> | U>(other);
    return filter.async(input, async value => otherSet.has(await key(value)));
};

export namespace intersectionBy {
    export function sync<T, U>(
        ...args: Parameters<typeof _syncIntersectionBy<T, U>>
    ): ReturnType<typeof _syncIntersectionBy<T, U>>;
    export function sync<T, U>(
        ...args: Parameters<Curried<typeof _syncIntersectionBy<T, U>>>
    ): ReturnType<Curried<typeof _syncIntersectionBy<T, U>>>;
    export function sync<T, U>(
        ...args: Parameters<Purried<typeof _syncIntersectionBy<T, U>>>
    ): ReturnType<Purried<typeof _syncIntersectionBy<T, U>>> {
        return purry(_syncIntersectionBy<T, U>)(...args);
    }

    export function async<T, U>(
        ...args: Parameters<typeof _asyncIntersectionBy<T, U>>
    ): ReturnType<typeof _asyncIntersectionBy<T, U>>;
    export function async<T, U>(
        ...args: Parameters<Curried<typeof _asyncIntersectionBy<T, U>>>
    ): ReturnType<Curried<typeof _asyncIntersectionBy<T, U>>>;
    export function async<T, U>(
        ...args: Parameters<Purried<typeof _asyncIntersectionBy<T, U>>>
    ): ReturnType<Purried<typeof _asyncIntersectionBy<T, U>>> {
        return purry(_asyncIntersectionBy<T, U>)(...args);
    }
}
