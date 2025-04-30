import type { Series, SyncSeries } from '../../controls/types.js';
import { _uniqueContext } from './_unique-context.js';
import { filterAsync, filterSync } from './filter.js';

export const uniqueSync = <T>(input: SyncSeries<T>): Generator<T> =>
    filterSync(input, _uniqueContext());

export const uniqueAsync = <T>(input: Series<T>): AsyncGenerator<Awaited<T>> =>
    filterAsync(input, _uniqueContext());

/** Creates a series without duplicated elements. */
export namespace unique {
    export const sync = uniqueSync;
    export const async = uniqueAsync;
}
