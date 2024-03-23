export type SyncSeries<T> = T[] | IterableIterator<T>;
export type Series<T> = MaybePromise<
    SyncSeries<MaybePromise<T>> | AsyncIterableIterator<MaybePromise<T>>
>;

export type MaybePromise<T> = T | Promise<T>;

type VariantLengthArray<T, L extends number, A extends T[] = [T]> = number extends L
    ? T[]
    : A['length'] extends L
      ? A
      : A | VariantLengthArray<T, L, [T, ...A]>;

export type Chunked<T, L extends number> = VariantLengthArray<T, L>;
