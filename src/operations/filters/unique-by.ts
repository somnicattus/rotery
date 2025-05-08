import type { Curried } from '../../compositions/curry.js';
import { type Purried, purry } from '../../compositions/purry.js';
import type { MaybePromise, Series, SyncSeries } from '../../controls/types.js';
import { _uniqueContext } from './_unique-context.js';
import { filterAsync, filterSync } from './filter.js';

const _syncUniqueBy = <T>(input: SyncSeries<T>, key: (value: T) => unknown): Generator<T> => {
    const isUnique = _uniqueContext();
    return filterSync(input, value => isUnique(key(value)));
};
const _asyncUniqueBy = <T>(
    input: Series<T>,
    key: (value: Awaited<T>) => MaybePromise<unknown>,
): AsyncGenerator<Awaited<T>> => {
    const isUnique = _uniqueContext();
    return filterAsync(input, async value => isUnique(await key(value)));
};

export function uniqueBySync<T>(
    ...args: Parameters<typeof _syncUniqueBy<T>>
): ReturnType<typeof _syncUniqueBy<T>>;
export function uniqueBySync<T>(
    ...args: Parameters<Curried<typeof _syncUniqueBy<T>>>
): ReturnType<Curried<typeof _syncUniqueBy<T>>>;
export function uniqueBySync<T>(
    ...args: Parameters<Purried<typeof _syncUniqueBy<T>>>
): ReturnType<Purried<typeof _syncUniqueBy<T>>> {
    return purry(_syncUniqueBy<T>)(...args);
}

export function uniqueByAsync<T>(
    ...args: Parameters<typeof _asyncUniqueBy<T>>
): ReturnType<typeof _asyncUniqueBy<T>>;
export function uniqueByAsync<T>(
    ...args: Parameters<Curried<typeof _asyncUniqueBy<T>>>
): ReturnType<Curried<typeof _asyncUniqueBy<T>>>;
export function uniqueByAsync<T>(
    ...args: Parameters<Purried<typeof _asyncUniqueBy<T>>>
): ReturnType<Purried<typeof _asyncUniqueBy<T>>> {
    return purry(_asyncUniqueBy<T>)(...args);
}

export namespace uniqueBy {
    export const sync = uniqueBySync;
    export const async = uniqueByAsync;
}
