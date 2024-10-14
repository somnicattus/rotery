import { Series } from './types.js';

const isSyncIterableIterator = (
    value: Awaited<Series<unknown>>,
): value is IterableIterator<unknown> => Symbol.iterator in value;

export const isIterable = (
    value: Awaited<Series<unknown>>,
): value is IterableIterator<unknown> | readonly unknown[] | unknown[] =>
    isSyncIterableIterator(value) || Array.isArray(value);
