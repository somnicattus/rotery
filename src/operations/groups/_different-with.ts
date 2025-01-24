import type { MaybePromise } from '../../controls/types.js';
import { _asyncIntersectWith, _syncIntersectWith } from './_intersect-with.js';

const _syncNot =
    <T extends (...args: never[]) => boolean>(fn: T) =>
    (...args: Parameters<T>) =>
        !fn(...args);

const _asyncNot =
    <T extends (...args: never[]) => MaybePromise<boolean>>(fn: T) =>
    async (...args: Parameters<T>) =>
        !(await fn(...args));

export const _syncDifferentWith = <U, T = unknown>(
    other: readonly U[] | ReadonlySet<U>,
    equals: (value: T, otherValue: U) => boolean,
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- type inference is preferred
) => _syncNot(_syncIntersectWith(other, equals));

export const _asyncDifferentWith = <U, T = unknown>(
    other: readonly U[] | ReadonlySet<U>,
    equals: (value: T, otherValue: U) => MaybePromise<boolean>,
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- type inference is preferred
) => _asyncNot(_asyncIntersectWith(other, equals));
