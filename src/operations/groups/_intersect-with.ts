import type { MaybePromise } from '../../controls/types.js';

export const _syncIntersectWith =
    <U, T = unknown>(
        other: readonly U[] | ReadonlySet<U>,
        equals: (value: T, otherValue: U) => boolean,
    ) =>
    (value: T) => {
        for (const otherValue of other) {
            if (equals(value, otherValue)) return true;
        }
        return false;
    };

export const _asyncIntersectWith =
    <U, T = unknown>(
        other: readonly U[] | ReadonlySet<U>,
        equals: (value: T, otherValue: U) => MaybePromise<boolean>,
    ) =>
    async (value: T) => {
        for (const otherValue of other) {
            if (await equals(value, otherValue)) return true;
        }
        return false;
    };
