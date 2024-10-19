import { pipe } from './pipe.js';

/**
 * Composes functions left-to-right. The parameter of the first function must be annotated.
 *
 * @example
 * compose(
 *   (arr: number[]) => arr.map(x => x * 2),
 *   arr => arr.join(','),
 * )([1, 2, 3, 4]); // => '2,4,6,8'
 */
export function compose<A, B>(fn1: (value: A) => B): (value: A) => B;
export function compose<A, B, C>(fn1: (value: A) => B, fn2: (value: B) => C): (value: A) => C;

export function compose<A, B, C, D>(
    fn1: (value: A) => B,
    fn2: (value: B) => C,
    fn3: (value: C) => D,
): (value: A) => D;

export function compose<A, B, C, D, E>(
    fn1: (value: A) => B,
    fn2: (value: B) => C,
    fn3: (value: C) => D,
    fn4: (value: D) => E,
): (value: A) => E;

export function compose<A, B, C, D, E, F>(
    fn1: (value: A) => B,
    fn2: (value: B) => C,
    fn3: (value: C) => D,
    fn4: (value: D) => E,
    fn5: (value: E) => F,
): (value: A) => F;

export function compose<A, B, C, D, E, F, G>(
    fn1: (value: A) => B,
    fn2: (value: B) => C,
    fn3: (value: C) => D,
    fn4: (value: D) => E,
    fn5: (value: E) => F,
    fn6: (value: F) => G,
): (value: A) => G;

export function compose<A, B, C, D, E, F, G, H>(
    fn1: (value: A) => B,
    fn2: (value: B) => C,
    fn3: (value: C) => D,
    fn4: (value: D) => E,
    fn5: (value: E) => F,
    fn6: (value: F) => G,
    fn7: (value: G) => H,
): (value: A) => H;

export function compose(...functions: ReadonlyArray<(value: unknown) => unknown>): unknown {
    // @ts-expect-error (ts2556) pipe's type definition is overloaded for users
    return value => pipe(value, ...functions);
}
