import { isIterable } from '../../controls/guards.js';
import type { Series, SyncSeries } from '../../controls/types.js';

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

    // eslint-disable-next-line complexity -- need blocks to yield values
    export async function* async<T>(input: Series<T>): AsyncGenerator<Awaited<T>> {
        const set = new Set<Awaited<T>>();
        const awaited = await input;
        if (isIterable(awaited)) {
            for (const value of awaited) {
                const v = await value;
                if (!set.has(v)) {
                    set.add(v);
                    yield v;
                }
            }
        } else {
            for await (const value of awaited) {
                if (!set.has(value)) {
                    set.add(value);
                    yield value;
                }
            }
        }
    }
}
