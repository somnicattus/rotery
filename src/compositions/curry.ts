export type Curried<F extends (...args: readonly never[]) => unknown> =
    Parameters<F> extends readonly [infer T, ...infer R extends unknown[]]
        ? (...args: R) => (arg: T) => ReturnType<F>
        : // Allow parameters only with rest parameters
          Parameters<F> extends (infer T)[]
          ? (...args: T[]) => (arg: T) => ReturnType<F>
          : never;

export type NthCurried<
    N extends number,
    F extends (...args: readonly never[]) => unknown,
    A extends never[] = [never],
> = A['length'] extends N ? Curried<F> : NthCurried<N, Curried<F>, [never, ...A]>;

/**
 * Curries a function's parameters by the specified depth.
 *
 * @example
 * // ---- For non-generic typed functions ----
 * const pow = curry(Math.pow);
 *
 * const result1 = Math.pow(2, 3); // 8
 * const result2 = pow(3)(2); // 8
 *
 * @example
 * // ---- For generic typed functions ----
 * const _map = <T, U>(arr: T[], mapper: (v: T) => U): U[] => arr.map(v => mapper(v));
 *
 * // Manually declare generic typed function.
 * const map = <I, O>(
 *     ...args: Parameters<Curried<typeof _map<I, O>>>
 * ): ReturnType<Curried<typeof _map<I, O>>> => curry(_map<I, O>)(...args);
 *
 * const result1 = _map([1, 2], x => x * 2); // [2, 4]
 * const result2 = map((x: number) => x * 2)([1, 2]); // [2, 4]
 *
 * @example
 * // ---- For type guard functions ----
 * const _filter = <T, S extends T>(array: T[], test: (v: T) => v is S): S[] =>
 *     array.filter((v): v is S => test(v));
 *
 * // Manually declare parameters.
 * const filter = <T, S extends T>(test: (value: T) => value is S): ((values: T[]) => S[]) =>
 *     curry(_filter<T, S>)(test);
 *
 * const test = (x: unknown): x is number => typeof x === 'number';
 * const result1 = _filter([1, 'two', 'three', 4], test); // [1, 4]
 * const result2 = filter(test)([1, 'two', 'three', 4]); // [1, 4]
 */
export function curry<F extends (...args: readonly never[]) => unknown, N extends number = 1>(
    fn: F,
    nth?: N,
): NthCurried<N, F> {
    const curried = ((...args: never[]) =>
        (a0: never) =>
            fn(a0, ...args)) as Curried<F>;

    return (nth === undefined || nth <= 1 ? curried : curry(curried, nth - 1)) as NthCurried<N, F>;
}
