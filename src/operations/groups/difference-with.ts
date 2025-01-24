import type { Curried } from '../../compositions/curry.js';
import { type Purried, purry } from '../../compositions/purry.js';
import type { MaybePromise, Series, StaticSeries, SyncSeries } from '../../controls/types.js';
import { filter } from '../filters/filter.js';
import { _asyncDifferentWith, _syncDifferentWith } from './_different-with.js';

const _syncDifferenceWith = <T, U>(
    input: SyncSeries<T>,
    other: StaticSeries<U>,
    equals: (value: T, otherValue: U) => boolean,
): Generator<T> => filter.sync(input, _syncDifferentWith(other, equals));

const _asyncDifferenceWith = <T, U>(
    input: Series<T>,
    other: StaticSeries<U>,
    equals: (value: Awaited<T>, otherValue: U) => MaybePromise<boolean>,
): AsyncGenerator<Awaited<T>> => filter.async(input, _asyncDifferentWith(other, equals));

export namespace differenceWith {
    export function sync<T, U>(
        ...args: Parameters<typeof _syncDifferenceWith<T, U>>
    ): ReturnType<typeof _syncDifferenceWith<T, U>>;
    export function sync<T, U>(
        ...args: Parameters<Curried<typeof _syncDifferenceWith<T, U>>>
    ): ReturnType<Curried<typeof _syncDifferenceWith<T, U>>>;
    export function sync<T, U>(
        ...args: Parameters<Purried<typeof _syncDifferenceWith<T, U>>>
    ): ReturnType<Purried<typeof _syncDifferenceWith<T, U>>> {
        return purry(_syncDifferenceWith<T, U>)(...args);
    }

    export function async<T, U>(
        ...args: Parameters<typeof _asyncDifferenceWith<T, U>>
    ): ReturnType<typeof _asyncDifferenceWith<T, U>>;
    export function async<T, U>(
        ...args: Parameters<Curried<typeof _asyncDifferenceWith<T, U>>>
    ): ReturnType<Curried<typeof _asyncDifferenceWith<T, U>>>;
    export function async<T, U>(
        ...args: Parameters<Purried<typeof _asyncDifferenceWith<T, U>>>
    ): ReturnType<Purried<typeof _asyncDifferenceWith<T, U>>> {
        return purry(_asyncDifferenceWith<T, U>)(...args);
    }
}
