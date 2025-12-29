/**
 * A type that represents a static series of values.
 */
export type StaticSeries<T> = readonly T[] | ReadonlySet<T>;

/**
 * A type that represents a synchronous series of values.
 */
export type SyncSeries<T> = StaticSeries<T> | IterableIterator<T>;

/**
 * A type that can be either a synchronous series or an asynchronous series.
 */
export type Series<T> = MaybePromise<
    SyncSeries<MaybePromise<T>> | AsyncIterableIterator<MaybePromise<T>>
>;

/**
 * A type that can be either T or a Promise resolving to T.
 */
export type MaybePromise<T> = T | Promise<T>;

/**
 * An array with a variant length up to L.
 */
export type VariantLengthArray<T, L extends number, A extends T[] = []> = number extends L
    ? T[]
    : A['length'] extends L
      ? A
      : A | VariantLengthArray<T, L, [T, ...A]>;

/**
 * An array with a fixed chunk size.
 *
 * Tails can be shorter if the total number of elements is not divisible by the chunk size.
 */
export type Chunked<T, L extends number> = VariantLengthArray<T, L, [T]>;
