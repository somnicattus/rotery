import type { SyncSeries } from '../../controls/types.js';

export const _toSet = <T>(input: SyncSeries<T>): ReadonlySet<T> =>
    input instanceof Set ? input : new Set(input);
