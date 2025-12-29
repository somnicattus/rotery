import { serialize } from '../src/index.js';

export const testSyncValues = <T>(values: T[]) =>
    [
        { type: 'iterator', data: values.values() },
        { type: 'array', data: values },
        { type: 'set', data: new Set(values) },
    ] as const;

export const testAsyncValues = <T>(values: T[]) =>
    [
        ...testSyncValues(values),
        { type: 'promise of iterator', data: Promise.resolve(serialize.sync(values)) },
        {
            type: 'iterator of promise',
            data: serialize.sync(values.map(async x => await Promise.resolve(x))),
        },
        { type: 'promise of array', data: Promise.resolve(values) },
        { type: 'array of promise', data: values.map(async x => await Promise.resolve(x)) },
        { type: 'promise of set', data: Promise.resolve(new Set(values)) },
        { type: 'set of promise', data: new Set(values.map(async x => await Promise.resolve(x))) },
        { type: 'async iterator', data: serialize.async(values) },
        { type: 'promise of async iterator', data: Promise.resolve(serialize.async(values)) },
    ] as const;
