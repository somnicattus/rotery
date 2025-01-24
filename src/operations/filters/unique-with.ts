import type { Curried } from '../../compositions/curry.js';
import { type Purried, purry } from '../../compositions/purry.js';
import type { MaybePromise, Series, SyncSeries } from '../../controls/types.js';
import { some } from '../reducers/some.js';
import { filter } from './filter.js';

const _syncUniqueWith = <T>(
    input: SyncSeries<T>,
    equals: (value1: T, value2: T) => boolean,
): Generator<T> => {
    const array: T[] = [];
    return filter.sync(input, value1 =>
        array.some(value2 => equals(value1, value2)) ? false : (array.push(value1), true),
    );
};
const _asyncUniqueWith = <T>(
    input: Series<T>,
    equals: (value1: Awaited<T>, value2: Awaited<T>) => MaybePromise<boolean>,
): AsyncGenerator<Awaited<T>> => {
    const array: Array<Awaited<T>> = [];
    return filter.async(input, async value1 =>
        (await some.async(array, async value2 => await equals(value1, value2)))
            ? false
            : (array.push(value1), true),
    );
};

export namespace uniqueWith {
    export function sync<T>(
        ...args: Parameters<typeof _syncUniqueWith<T>>
    ): ReturnType<typeof _syncUniqueWith<T>>;
    export function sync<T>(
        ...args: Parameters<Curried<typeof _syncUniqueWith<T>>>
    ): ReturnType<Curried<typeof _syncUniqueWith<T>>>;
    export function sync<T>(
        ...args: Parameters<Purried<typeof _syncUniqueWith<T>>>
    ): ReturnType<Purried<typeof _syncUniqueWith<T>>> {
        return purry(_syncUniqueWith<T>)(...args);
    }

    export function async<T>(
        ...args: Parameters<typeof _asyncUniqueWith<T>>
    ): ReturnType<typeof _asyncUniqueWith<T>>;
    export function async<T>(
        ...args: Parameters<Curried<typeof _asyncUniqueWith<T>>>
    ): ReturnType<Curried<typeof _asyncUniqueWith<T>>>;
    export function async<T>(
        ...args: Parameters<Purried<typeof _asyncUniqueWith<T>>>
    ): ReturnType<Purried<typeof _asyncUniqueWith<T>>> {
        return purry(_asyncUniqueWith<T>)(...args);
    }
}
