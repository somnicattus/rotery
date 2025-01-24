import { _isIterable } from './_guards.js';
import type { Series, SyncSeries } from './types.js';

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
        const awaited = await input;
        if (_isIterable(awaited)) {
            for (const pool of awaited) {
                const innerAwaited = await pool;
                if (_isIterable(innerAwaited)) {
                    for (const value of innerAwaited) {
                        yield value;
                    }
                } else {
                    for await (const value of innerAwaited) {
                        yield value;
                    }
                }
            }
        } else {
            for await (const pool of awaited) {
                if (_isIterable(pool)) {
                    for (const value of pool) {
                        yield value;
                    }
                } else {
                    for await (const value of pool) {
                        yield value;
                    }
                }
            }
        }
    }
}
