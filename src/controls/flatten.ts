import { type Series, type SyncSeries } from './types.js';

/** Flattens a series of series by one level deep. */
export namespace flatten {
    export function* sync<T>(input: SyncSeries<SyncSeries<T>>): Generator<T> {
        for (const pool of input) {
            for (const value of pool) {
                yield value;
            }
        }
    }

    export async function* async<T>(input: Series<Series<T>>): AsyncGenerator<Awaited<T>> {
        for await (const pool of await input) {
            for await (const value of pool) {
                yield value;
            }
        }
    }
}
