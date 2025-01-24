import type { Series, SyncSeries } from '../../controls/types.js';
import { _uniqueContext } from './_unique-context.js';
import { filter } from './filter.js';

/** Creates a series without duplicated elements. */
export namespace unique {
    export const sync = <T>(input: SyncSeries<T>): Generator<T> =>
        filter.sync(input, _uniqueContext());

    export const async = <T>(input: Series<T>): AsyncGenerator<Awaited<T>> =>
        filter.async(input, _uniqueContext());
}
