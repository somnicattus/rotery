/* eslint-disable @typescript-eslint/max-params -- `compose` needs many parameters in its signature. */
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

export function compose<A, B, C, D, E, F, G, H, I>(
    fn1: (value: A) => B,
    fn2: (value: B) => C,
    fn3: (value: C) => D,
    fn4: (value: D) => E,
    fn5: (value: E) => F,
    fn6: (value: F) => G,
    fn7: (value: G) => H,
    fn8: (value: H) => I,
): (value: A) => I;

export function compose<A, B, C, D, E, F, G, H, I, J>(
    fn1: (value: A) => B,
    fn2: (value: B) => C,
    fn3: (value: C) => D,
    fn4: (value: D) => E,
    fn5: (value: E) => F,
    fn6: (value: F) => G,
    fn7: (value: G) => H,
    fn8: (value: H) => I,
    fn9: (value: I) => J,
): (value: A) => J;

export function compose<A, B, C, D, E, F, G, H, I, J, K>(
    fn01: (value: A) => B,
    fn02: (value: B) => C,
    fn03: (value: C) => D,
    fn04: (value: D) => E,
    fn05: (value: E) => F,
    fn06: (value: F) => G,
    fn07: (value: G) => H,
    fn08: (value: H) => I,
    fn09: (value: I) => J,
    fn10: (value: J) => K,
): (value: A) => K;

export function compose<A, B, C, D, E, F, G, H, I, J, K, L>(
    fn01: (value: A) => B,
    fn02: (value: B) => C,
    fn03: (value: C) => D,
    fn04: (value: D) => E,
    fn05: (value: E) => F,
    fn06: (value: F) => G,
    fn07: (value: G) => H,
    fn08: (value: H) => I,
    fn09: (value: I) => J,
    fn10: (value: J) => K,
    fn11: (value: K) => L,
): (value: A) => L;

export function compose<A, B, C, D, E, F, G, H, I, J, K, L, M>(
    fn01: (value: A) => B,
    fn02: (value: B) => C,
    fn03: (value: C) => D,
    fn04: (value: D) => E,
    fn05: (value: E) => F,
    fn06: (value: F) => G,
    fn07: (value: G) => H,
    fn08: (value: H) => I,
    fn09: (value: I) => J,
    fn10: (value: J) => K,
    fn11: (value: K) => L,
    fn12: (value: L) => M,
): (value: A) => M;

export function compose<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
    fn01: (value: A) => B,
    fn02: (value: B) => C,
    fn03: (value: C) => D,
    fn04: (value: D) => E,
    fn05: (value: E) => F,
    fn06: (value: F) => G,
    fn07: (value: G) => H,
    fn08: (value: H) => I,
    fn09: (value: I) => J,
    fn10: (value: J) => K,
    fn11: (value: K) => L,
    fn12: (value: L) => M,
    fn13: (value: M) => N,
): (value: A) => N;

export function compose<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
    fn01: (value: A) => B,
    fn02: (value: B) => C,
    fn03: (value: C) => D,
    fn04: (value: D) => E,
    fn05: (value: E) => F,
    fn06: (value: F) => G,
    fn07: (value: G) => H,
    fn08: (value: H) => I,
    fn09: (value: I) => J,
    fn10: (value: J) => K,
    fn11: (value: K) => L,
    fn12: (value: L) => M,
    fn13: (value: M) => N,
    fn14: (value: N) => O,
): (value: A) => O;

export function compose<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(
    fn01: (value: A) => B,
    fn02: (value: B) => C,
    fn03: (value: C) => D,
    fn04: (value: D) => E,
    fn05: (value: E) => F,
    fn06: (value: F) => G,
    fn07: (value: G) => H,
    fn08: (value: H) => I,
    fn09: (value: I) => J,
    fn10: (value: J) => K,
    fn11: (value: K) => L,
    fn12: (value: L) => M,
    fn13: (value: M) => N,
    fn14: (value: N) => O,
    fn15: (value: O) => P,
): (value: A) => P;

export function compose(...functions: ReadonlyArray<(value: unknown) => unknown>): unknown {
    // @ts-expect-error (ts2556) pipe's type definition is overloaded for users
    return value => pipe(value, ...functions);
}
