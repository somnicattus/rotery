import type { Series, SyncSeries } from '../../controls/types.js';
import { filter } from './filter.js';

/** Creates a series without duplicated elements. */
export namespace unique {
    export function sync<T>(input: SyncSeries<T>): Generator<T> {
        const set = new Set<T>();
        return filter.sync(input, value => (set.has(value) ? false : (set.add(value), true)));
    }

    export function async<T>(input: Series<T>): AsyncGenerator<Awaited<T>> {
        const set = new Set<Awaited<T>>();
        return filter.async(input, value => (set.has(value) ? false : (set.add(value), true)));
    }
}
