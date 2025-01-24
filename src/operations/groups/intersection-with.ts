import type { Curried } from '../../compositions/curry.js';
import { type Purried, purry } from '../../compositions/purry.js';
import type { MaybePromise, Series, StaticSeries, SyncSeries } from '../../controls/types.js';
import { filter } from '../filters/filter.js';
import { _asyncIntersectWith, _syncIntersectWith } from './_intersect-with.js';

const _syncIntersectionWith = <T, U>(
    input: SyncSeries<T>,
    other: StaticSeries<U>,
    equals: (value: T, otherValue: U) => boolean,
): Generator<T> => filter.sync(input, _syncIntersectWith(other, equals));

const _asyncIntersectionWith = <T, U>(
    input: Series<T>,
    other: StaticSeries<U>,
    equals: (value: Awaited<T>, otherValue: U) => MaybePromise<boolean>,
): AsyncGenerator<Awaited<T>> => filter.async(input, _asyncIntersectWith(other, equals));

export namespace intersectionWith {
    export function sync<T, U>(
        ...args: Parameters<typeof _syncIntersectionWith<T, U>>
    ): ReturnType<typeof _syncIntersectionWith<T, U>>;
    export function sync<T, U>(
        ...args: Parameters<Curried<typeof _syncIntersectionWith<T, U>>>
    ): ReturnType<Curried<typeof _syncIntersectionWith<T, U>>>;
    export function sync<T, U>(
        ...args: Parameters<Purried<typeof _syncIntersectionWith<T, U>>>
    ): ReturnType<Purried<typeof _syncIntersectionWith<T, U>>> {
        return purry(_syncIntersectionWith<T, U>)(...args);
    }

    export function async<T, U>(
        ...args: Parameters<typeof _asyncIntersectionWith<T, U>>
    ): ReturnType<typeof _asyncIntersectionWith<T, U>>;
    export function async<T, U>(
        ...args: Parameters<Curried<typeof _asyncIntersectionWith<T, U>>>
    ): ReturnType<Curried<typeof _asyncIntersectionWith<T, U>>>;
    export function async<T, U>(
        ...args: Parameters<Purried<typeof _asyncIntersectionWith<T, U>>>
    ): ReturnType<Purried<typeof _asyncIntersectionWith<T, U>>> {
        return purry(_asyncIntersectionWith<T, U>)(...args);
    }
}
