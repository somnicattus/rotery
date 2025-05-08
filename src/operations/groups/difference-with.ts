import type { Curried } from '../../compositions/curry.js';
import { type Purried, purry } from '../../compositions/purry.js';
import type { MaybePromise, Series, StaticSeries, SyncSeries } from '../../controls/types.js';
import { filterAsync, filterSync } from '../filters/filter.js';
import { _asyncDifferentWith, _syncDifferentWith } from './_different-with.js';

const _syncDifferenceWith = <T, U>(
    input: SyncSeries<T>,
    other: StaticSeries<U>,
    equals: (value: T, otherValue: U) => boolean,
): Generator<T> => filterSync(input, _syncDifferentWith(other, equals));

const _asyncDifferenceWith = <T, U>(
    input: Series<T>,
    other: StaticSeries<U>,
    equals: (value: Awaited<T>, otherValue: U) => MaybePromise<boolean>,
): AsyncGenerator<Awaited<T>> => filterAsync(input, _asyncDifferentWith(other, equals));

export function differenceWithSync<T, U>(
    ...args: Parameters<typeof _syncDifferenceWith<T, U>>
): ReturnType<typeof _syncDifferenceWith<T, U>>;
export function differenceWithSync<T, U>(
    ...args: Parameters<Curried<typeof _syncDifferenceWith<T, U>>>
): ReturnType<Curried<typeof _syncDifferenceWith<T, U>>>;
export function differenceWithSync<T, U>(
    ...args: Parameters<Purried<typeof _syncDifferenceWith<T, U>>>
): ReturnType<Purried<typeof _syncDifferenceWith<T, U>>> {
    return purry(_syncDifferenceWith<T, U>)(...args);
}

export function differenceWithAsync<T, U>(
    ...args: Parameters<typeof _asyncDifferenceWith<T, U>>
): ReturnType<typeof _asyncDifferenceWith<T, U>>;
export function differenceWithAsync<T, U>(
    ...args: Parameters<Curried<typeof _asyncDifferenceWith<T, U>>>
): ReturnType<Curried<typeof _asyncDifferenceWith<T, U>>>;
export function differenceWithAsync<T, U>(
    ...args: Parameters<Purried<typeof _asyncDifferenceWith<T, U>>>
): ReturnType<Purried<typeof _asyncDifferenceWith<T, U>>> {
    return purry(_asyncDifferenceWith<T, U>)(...args);
}

export namespace differenceWith {
    export const sync = differenceWithSync;
    export const async = differenceWithAsync;
}
