import { type Curried, curry } from './curry.js';

export type Purried<
    F extends (...args: Parameters<F>) => ReturnType<F>,
    P extends Parameters<F> | Parameters<Curried<F>> = Parameters<F> | Parameters<Curried<F>>,
    // Disallow rest parameters and optional parameters
> = Parameters<F> & Parameters<Curried<F>> extends never
    ? // Disallow no parameters
      Parameters<F> extends [unknown, unknown, ...unknown[]]
        ? // Generic types
          P extends Parameters<F>
            ? F
            : Curried<F>
        : never
    : never;

/**
 * Curries a function by one level deep and overloads the original function.
 * Returned function can be called with both curried and non-curried parameters.
 * Rest parameters and optional parameters are not supported.
 *
 * @example
 * // ---- For non-generic typed functions ----
 * // Manually type to be generic.
 * const pow: <P extends Parameters<Purried<typeof Math.pow>>>(
 *     ...args: P
 * ) => ReturnType<Purried<typeof Math.pow, P>> = purry(Math.pow);
 *
 * const result1 = pow(2, 3); // 8
 * const result2 = pow(3)(2); // 8
 *
 * @example
 * // ---- For generic typed functions ----
 * const _map = <T, U>(arr: T[], mapper: (v: T) => U): U[] => arr.map(v => mapper(v));
 *
 * // Manually declare overloaded function to be generic.
 * function map<T, U>(
 *     ...args: Parameters<typeof _map<T,U>>
 * ): ReturnType<typeof _map<T,U>>;
 * function map<T, U>(
 *     ...args: Parameters<Curried<typeof _map<T,U>>>
 * ): ReturnType<Curried<typeof _map<T,U>>>;
 * function map<T, U>(
 *     ...args: Parameters<Purried<typeof _map<T, U>>>
 * ): ReturnType<Purried<typeof _map<T, U>>> {
 *     return purry(_map<T, U>)(...args);
 * }
 *
 * const result1 = map([1, 2], x => x * 2); // [2, 4]
 * const result2 = map((x: number) => x * 2)([1, 2]); // [2, 4]
 */
export function purry<F extends (...args: never[]) => ReturnType<F>>(
    fn: F,
): Purried<F> extends never
    ? never
    : <P extends Parameters<Purried<F>>>(...args: P) => ReturnType<Purried<F, P>> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- purry cannot be safely typed
    return ((...args: never[]) =>
        fn.length === args.length ? fn(...args) : curry(fn)(...args)) as Purried<F> extends never
        ? never
        : <P extends Parameters<Purried<F>>>(...args: P) => ReturnType<Purried<F, P>>;
}
