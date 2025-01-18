import type { Series } from './types.js';

const isSyncIterableIterator = (
    value: Awaited<Series<unknown>>,
): value is IterableIterator<unknown> => Symbol.iterator in value;

export const _isIterable = (
    value: Awaited<Series<unknown>>,
): value is IterableIterator<unknown> | readonly unknown[] | unknown[] =>
    isSyncIterableIterator(value) || Array.isArray(value);

export const _isReadonlySet = <T>(value: Series<T> | ReadonlySet<T>): value is ReadonlySet<T> =>
    value instanceof Set;
