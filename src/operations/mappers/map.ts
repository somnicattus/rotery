import { type Curried } from '../../compositions/curry.js';
import { type Purried, purry } from '../../compositions/purry.js';
import { isIterable } from '../../controls/guards.js';
import { type Series, type SyncSeries } from '../../controls/types.js';

function* _syncMap<I, O>(input: SyncSeries<I>, mapper: (value: I) => O): Generator<O> {
    for (const value of input) {
        yield mapper(value);
    }
}

async function* _asyncMap<I, O>(
    input: Series<I>,
    mapper: (value: Awaited<I>) => O | Promise<O>,
): AsyncGenerator<Awaited<O>> {
    const awaited = await input;
    if (isIterable(awaited)) {
        for (const value of awaited) {
            yield mapper(await value);
        }
    } else {
        for await (const value of awaited) {
            yield mapper(value);
        }
    }
}

/** Maps each element by the specified mapper. */
export namespace map {
    export function sync<I, O>(
        ...args: Parameters<typeof _syncMap<I, O>>
    ): ReturnType<typeof _syncMap<I, O>>;
    export function sync<I, O>(
        ...args: Parameters<Curried<typeof _syncMap<I, O>>>
    ): ReturnType<Curried<typeof _syncMap<I, O>>>;
    export function sync<I, O>(
        ...args: Parameters<Purried<typeof _syncMap<I, O>>>
    ): ReturnType<Purried<typeof _syncMap<I, O>>> {
        return purry(_syncMap<I, O>)(...args);
    }

    export function async<I, O>(
        ...args: Parameters<typeof _asyncMap<I, O>>
    ): ReturnType<typeof _asyncMap<I, O>>;
    export function async<I, O>(
        ...args: Parameters<Curried<typeof _asyncMap<I, O>>>
    ): ReturnType<Curried<typeof _asyncMap<I, O>>>;
    export function async<I, O>(
        ...args: Parameters<Purried<typeof _asyncMap<I, O>>>
    ): ReturnType<Purried<typeof _asyncMap<I, O>>> {
        return purry(_asyncMap<I, O>)(...args);
    }
}
