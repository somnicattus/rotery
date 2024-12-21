/* eslint-disable @typescript-eslint/max-params -- `pipe` needs many parameters in its signature. */
/**
 * Pipes a value to a series of operations. Operations are applied left-to-right.
 * @example
 * pipe(
 *   [1, 2, 3, 4],
 *   arr => arr.map(x => x * 2),
 *   arr => arr.join(','),
 * ); // => '2,4,6,8'
 */
export function pipe<A, B>(value: A, op1: (value: A) => B): B;
export function pipe<A, B, C>(value: A, op1: (value: A) => B, op2: (value: B) => C): C;

export function pipe<A, B, C, D>(
    value: A,
    op1: (value: A) => B,
    op2: (value: B) => C,
    op3: (value: C) => D,
): D;

export function pipe<A, B, C, D, E>(
    value: A,
    op1: (value: A) => B,
    op2: (value: B) => C,
    op3: (value: C) => D,
    op4: (value: D) => E,
): E;

export function pipe<A, B, C, D, E, F>(
    value: A,
    op1: (value: A) => B,
    op2: (value: B) => C,
    op3: (value: C) => D,
    op4: (value: D) => E,
    op5: (value: E) => F,
): F;

export function pipe<A, B, C, D, E, F, G>(
    value: A,
    op1: (value: A) => B,
    op2: (value: B) => C,
    op3: (value: C) => D,
    op4: (value: D) => E,
    op5: (value: E) => F,
    op6: (value: F) => G,
): G;

export function pipe<A, B, C, D, E, F, G, H>(
    value: A,
    op1: (value: A) => B,
    op2: (value: B) => C,
    op3: (value: C) => D,
    op4: (value: D) => E,
    op5: (value: E) => F,
    op6: (value: F) => G,
    op7: (value: G) => H,
): H;

export function pipe<A, B, C, D, E, F, G, H, I>(
    value: A,
    op1: (value: A) => B,
    op2: (value: B) => C,
    op3: (value: C) => D,
    op4: (value: D) => E,
    op5: (value: E) => F,
    op6: (value: F) => G,
    op7: (value: G) => H,
    op8: (value: H) => I,
): I;

export function pipe<A, B, C, D, E, F, G, H, I, J>(
    value: A,
    op1: (value: A) => B,
    op2: (value: B) => C,
    op3: (value: C) => D,
    op4: (value: D) => E,
    op5: (value: E) => F,
    op6: (value: F) => G,
    op7: (value: G) => H,
    op8: (value: H) => I,
    op9: (value: I) => J,
): J;

export function pipe<A, B, C, D, E, F, G, H, I, J, K>(
    value: A,
    op01: (value: A) => B,
    op02: (value: B) => C,
    op03: (value: C) => D,
    op04: (value: D) => E,
    op05: (value: E) => F,
    op06: (value: F) => G,
    op07: (value: G) => H,
    op08: (value: H) => I,
    op09: (value: I) => J,
    op10: (value: J) => K,
): K;

export function pipe<A, B, C, D, E, F, G, H, I, J, K, L>(
    value: A,
    op01: (value: A) => B,
    op02: (value: B) => C,
    op03: (value: C) => D,
    op04: (value: D) => E,
    op05: (value: E) => F,
    op06: (value: F) => G,
    op07: (value: G) => H,
    op08: (value: H) => I,
    op09: (value: I) => J,
    op10: (value: J) => K,
    op11: (value: K) => L,
): L;

export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M>(
    value: A,
    op01: (value: A) => B,
    op02: (value: B) => C,
    op03: (value: C) => D,
    op04: (value: D) => E,
    op05: (value: E) => F,
    op06: (value: F) => G,
    op07: (value: G) => H,
    op08: (value: H) => I,
    op09: (value: I) => J,
    op10: (value: J) => K,
    op11: (value: K) => L,
    op12: (value: L) => M,
): M;

export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
    value: A,
    op01: (value: A) => B,
    op02: (value: B) => C,
    op03: (value: C) => D,
    op04: (value: D) => E,
    op05: (value: E) => F,
    op06: (value: F) => G,
    op07: (value: G) => H,
    op08: (value: H) => I,
    op09: (value: I) => J,
    op10: (value: J) => K,
    op11: (value: K) => L,
    op12: (value: L) => M,
    op13: (value: M) => N,
): N;

export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
    value: A,
    op01: (value: A) => B,
    op02: (value: B) => C,
    op03: (value: C) => D,
    op04: (value: D) => E,
    op05: (value: E) => F,
    op06: (value: F) => G,
    op07: (value: G) => H,
    op08: (value: H) => I,
    op09: (value: I) => J,
    op10: (value: J) => K,
    op11: (value: K) => L,
    op12: (value: L) => M,
    op13: (value: M) => N,
    op14: (value: N) => O,
): O;

export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(
    value: A,
    op01: (value: A) => B,
    op02: (value: B) => C,
    op03: (value: C) => D,
    op04: (value: D) => E,
    op05: (value: E) => F,
    op06: (value: F) => G,
    op07: (value: G) => H,
    op08: (value: H) => I,
    op09: (value: I) => J,
    op10: (value: J) => K,
    op11: (value: K) => L,
    op12: (value: L) => M,
    op13: (value: M) => N,
    op14: (value: N) => O,
    op15: (value: O) => P,
): P;

export function pipe(
    value: unknown,
    ...operations: ReadonlyArray<(value: unknown) => unknown>
): unknown {
    let result = value;
    for (const operation of operations) {
        result = operation(result);
    }
    return result;
}
