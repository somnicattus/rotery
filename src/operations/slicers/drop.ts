import type { Curried } from '../../compositions/curry.js';
import { type Purried, purry } from '../../compositions/purry.js';
import { isIterable } from '../../controls/guards.js';
import type { Series, SyncSeries } from '../../controls/types.js';

function* _syncDrop<T>(input: SyncSeries<T>, drop: number): Generator<T> {
    let leftDrop = drop;
    for (const value of input) {
        if (leftDrop > 0) {
            leftDrop--;
            continue;
        }
        yield value;
    }
}

async function* _asyncDrop<T>(input: Series<T>, drop: number): AsyncGenerator<T> {
    let leftDrop = drop;
    const awaited = await input;
    if (isIterable(awaited)) {
        for (const value of awaited) {
            if (leftDrop > 0) {
                leftDrop--;
                continue;
            }
            yield value;
        }
    } else {
        for await (const value of awaited) {
            if (leftDrop > 0) {
                leftDrop--;
                continue;
            }
            yield value;
        }
    }
}

/** Drops the first n elements. */
export namespace drop {
    export function sync<T>(
        ...args: Parameters<typeof _syncDrop<T>>
    ): ReturnType<typeof _syncDrop<T>>;
    export function sync<T>(
        ...args: Parameters<Curried<typeof _syncDrop<T>>>
    ): ReturnType<Curried<typeof _syncDrop<T>>>;
    export function sync<T>(
        ...args: Parameters<Purried<typeof _syncDrop<T>>>
    ): ReturnType<Purried<typeof _syncDrop<T>>> {
        return purry(_syncDrop<T>)(...args);
    }

    export function async<T>(
        ...args: Parameters<typeof _asyncDrop<T>>
    ): ReturnType<typeof _asyncDrop<T>>;
    export function async<T>(
        ...args: Parameters<Curried<typeof _asyncDrop<T>>>
    ): ReturnType<Curried<typeof _asyncDrop<T>>>;
    export function async<T>(
        ...args: Parameters<Purried<typeof _asyncDrop<T>>>
    ): ReturnType<Purried<typeof _asyncDrop<T>>> {
        return purry(_asyncDrop<T>)(...args);
    }
}
