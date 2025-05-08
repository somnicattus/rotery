import type { Curried } from '../../compositions/curry.js';
import { type Purried, purry } from '../../compositions/purry.js';
import type { Series, StaticSeries, SyncSeries } from '../../controls/types.js';
import { filterAsync, filterSync } from '../filters/filter.js';
import { _toSet } from './_to-set.js';

const _syncIntersection = <T, U>(
    input: SyncSeries<T>,
    other: StaticSeries<U>,
): Generator<T & U> => {
    const otherSet = _toSet<T | U>(other);
    return filterSync(input, (value): value is T & U => otherSet.has(value));
};
const _asyncIntersection = <T, U>(
    input: Series<T>,
    other: StaticSeries<U>,
): AsyncGenerator<Awaited<T> & U> => {
    const otherSet = _toSet<Awaited<T> | U>(other);
    return filterAsync(input, (value): value is Awaited<T> & U => otherSet.has(value));
};

export function intersectionSync<T, U>(
    ...args: Parameters<typeof _syncIntersection<T, U>>
): ReturnType<typeof _syncIntersection<T, U>>;
export function intersectionSync<T, U>(
    ...args: Parameters<Curried<typeof _syncIntersection<T, U>>>
): ReturnType<Curried<typeof _syncIntersection<T, U>>>;
export function intersectionSync<T, U>(
    ...args: Parameters<Purried<typeof _syncIntersection<T, U>>>
): ReturnType<Purried<typeof _syncIntersection<T, U>>> {
    return purry(_syncIntersection<T, U>)(...args);
}

export function intersectionAsync<T, U>(
    ...args: Parameters<typeof _asyncIntersection<T, U>>
): ReturnType<typeof _asyncIntersection<T, U>>;
export function intersectionAsync<T, U>(
    ...args: Parameters<Curried<typeof _asyncIntersection<T, U>>>
): ReturnType<Curried<typeof _asyncIntersection<T, U>>>;
export function intersectionAsync<T, U>(
    ...args: Parameters<Purried<typeof _asyncIntersection<T, U>>>
): ReturnType<Purried<typeof _asyncIntersection<T, U>>> {
    return purry(_asyncIntersection<T, U>)(...args);
}

export namespace intersection {
    export const sync = intersectionSync;
    export const async = intersectionAsync;
}
