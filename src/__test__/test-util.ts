import { serialize } from '../index.js';

export const testSyncValues = <T>(values: T[]) =>
    [
        { type: 'iterator', data: values.values() },
        { type: 'array', data: values },
    ] as const;

export const testAsyncValues = <T>(values: T[]) =>
    [
        { type: 'iterator', data: values.values() },
        { type: 'array', data: values },
        { type: 'async iterator', data: serialize.async(values) },
        { type: 'promise of array', data: Promise.resolve(values) },
        { type: 'array of promise', data: values.map(async x => await Promise.resolve(x)) },
    ] as const;
