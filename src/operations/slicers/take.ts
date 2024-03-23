import { type Curried } from '../../compositions/curry.js';
import { type Purried, purry } from '../../compositions/purry.js';
import { type Series, type SyncSeries } from '../../controls/types.js';

function* _syncTake<T>(input: SyncSeries<T>, take: number): Generator<T> {
    let leftTake = take;
    for (const value of input) {
        if (leftTake <= 0) {
            break;
        }
        yield value;
        leftTake--;
    }
}

async function* _asyncTake<T>(input: Series<T>, take: number): AsyncGenerator<T> {
    let leftTake = take;
    for await (const value of await input) {
        if (leftTake <= 0) {
            break;
        }
        yield value;
        leftTake--;
    }
}

/** Takes the first n elements. */
export namespace take {
    export function sync<T>(
        ...args: Parameters<typeof _syncTake<T>>
    ): ReturnType<typeof _syncTake<T>>;
    export function sync<T>(
        ...args: Parameters<Curried<typeof _syncTake<T>>>
    ): ReturnType<Curried<typeof _syncTake<T>>>;
    export function sync<T>(
        ...args: Parameters<Purried<typeof _syncTake<T>>>
    ): ReturnType<Purried<typeof _syncTake<T>>> {
        return purry(_syncTake<T>)(...args);
    }

    export function async<T>(
        ...args: Parameters<typeof _asyncTake<T>>
    ): ReturnType<typeof _asyncTake<T>>;
    export function async<T>(
        ...args: Parameters<Curried<typeof _asyncTake<T>>>
    ): ReturnType<Curried<typeof _asyncTake<T>>>;
    export function async<T>(
        ...args: Parameters<Purried<typeof _asyncTake<T>>>
    ): ReturnType<Purried<typeof _asyncTake<T>>> {
        return purry(_asyncTake<T>)(...args);
    }
}
