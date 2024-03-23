import { type Series, type SyncSeries } from '../../controls/types.js';

/** Creates a series without duplicated elements. */
export namespace unique {
    export function* sync<T>(input: SyncSeries<T>): Generator<T> {
        const set = new Set<T>();
        for (const value of input) {
            if (!set.has(value)) {
                set.add(value);
                yield value;
            }
        }
    }

    export async function* async<T>(input: Series<T>): AsyncGenerator<Awaited<T>> {
        const set = new Set<Awaited<T>>();
        for await (const value of await input) {
            if (!set.has(value)) {
                set.add(value);
                yield value;
            }
        }
    }
}
