import { type Purried, purry } from '../../compositions/purry.js';
import { isIterable } from '../../controls/guards.js';
import type { Series, SyncSeries } from '../../controls/types.js';

function* _syncFilter<T, S extends T>(
    input: SyncSeries<T>,
    test: (value: T) => value is S,
): Generator<S> {
    for (const value of input) {
        if (test(value)) yield value;
    }
}

// eslint-disable-next-line complexity -- need blocks to yield values
async function* _asyncFilter<T, S extends Awaited<T>>(
    input: Series<T>,
    test: ((value: Awaited<T>) => value is S) | ((value: Awaited<T>) => Promise<boolean>),
): AsyncGenerator<S> {
    const awaited = await input;
    if (isIterable(awaited)) {
        for (const value of awaited) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- Promise can't be type guard
            if (await test(await value)) yield value as S;
        }
    } else {
        for await (const value of awaited) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- Promise can't be type guard
            if (await test(value)) yield value as S;
        }
    }
}

/** Filters the elements by the specified test. */
export namespace filter {
    export function sync<T, S extends T>(
        input: SyncSeries<T>,
        test: (value: T) => value is S,
    ): Generator<S>;
    // @ts-expect-error support both type narrowing and boolean
    export function sync<T>(input: SyncSeries<T>, test: (value: T) => boolean): Generator<T>;
    export function sync<T, S extends T>(
        test: (value: T) => value is S,
    ): (input: SyncSeries<T>) => Generator<S>;
    export function sync<T>(test: (value: T) => boolean): (input: SyncSeries<T>) => Generator<T>;
    export function sync<T, S extends T>(
        ...args: Parameters<Purried<typeof _syncFilter<T, S>>>
    ): ReturnType<Purried<typeof _syncFilter<T, S>>> {
        return purry(_syncFilter<T, S>)(...args);
    }

    // @ts-expect-error support both type narrowing and boolean
    export function async<T, S extends Awaited<T>>(
        input: Series<T>,
        test:
            | ((value: Awaited<T>) => value is S)
            | ((value: Awaited<T>) => boolean | Promise<boolean>),
    ): AsyncGenerator<S>;
    export function async<T, S extends Awaited<T>>(
        test:
            | ((value: Awaited<T>) => value is S)
            | ((value: Awaited<T>) => boolean | Promise<boolean>),
    ): (input: Series<T>) => AsyncGenerator<S>;
    export function async<T, S extends Awaited<T>>(
        ...args: Parameters<Purried<typeof _asyncFilter<T, S>>>
    ): ReturnType<Purried<typeof _asyncFilter<T, S>>> {
        return purry(_asyncFilter<T, S>)(...args);
    }
}
