import type { Series } from './types.js';

export const _isIterable = (
    value: Awaited<Series<unknown>>,
): value is Awaited<Series<unknown>> & Iterable<unknown> =>
    Symbol.iterator in value && typeof value[Symbol.iterator] === 'function';
