import { awaitAll, differenceBy, pipe } from '../../../index.js';
import { testAsyncValues, testSyncValues } from '../../test-util.js';
const values1 = [1.1, 1.11, 2.1, 3.1, 4.1, 4.11, 5.1, 5.11];
const values2 = [3, 4, 5, 5, 6];
const key = (value: number): number => Math.round(value);
const asyncKey = async (value: number): Promise<number> => await Promise.resolve(Math.round(value));
const expectation = new Set([1.1, 1.11, 2.1]);

describe('differenceBy', () => {
    describe('sync', () => {
        it.each(testSyncValues(values1))(
            'should get difference of $type with array.',
            ({ data }) => {
                const result = differenceBy.sync(data, values2, key);

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.iterator]).toBeTypeOf('function');
                expect(new Set(result)).toStrictEqual(expectation);
            },
        );
        it.each(testSyncValues(values1))(
            'should get difference of $type with array through pipe.',
            ({ data }) => {
                const result = pipe(data, differenceBy.sync(values2, key));

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.iterator]).toBeTypeOf('function');
                expect(new Set(result)).toStrictEqual(expectation);
            },
        );
        it.each(testSyncValues(values1))('should get difference of $type with set.', ({ data }) => {
            const result = differenceBy.sync(data, new Set(values2), key);

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.iterator]).toBeTypeOf('function');
            expect(new Set(result)).toStrictEqual(expectation);
        });
        it.each(testSyncValues(values1))(
            'should get difference of $type with set through pipe.',
            ({ data }) => {
                const result = pipe(data, differenceBy.sync(new Set(values2), key));

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.iterator]).toBeTypeOf('function');
                expect(new Set(result)).toStrictEqual(expectation);
            },
        );
    });

    describe('async', () => {
        it.each(testAsyncValues(values1))(
            'should get difference of $type with array.',
            async ({ data }) => {
                const result = differenceBy.async(data, values2, key);

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
                expect(new Set(await awaitAll(result))).toStrictEqual(expectation);
            },
        );
        it.each(testAsyncValues(values1))(
            'should get difference of $type with array through pipe.',
            async ({ data }) => {
                const result = pipe(data, differenceBy.async(values2, key));

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
                expect(new Set(await awaitAll(result))).toStrictEqual(expectation);
            },
        );
        it.each(testAsyncValues(values1))(
            'should get difference of $type with set.',
            async ({ data }) => {
                const result = differenceBy.async(data, new Set(values2), key);

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
                expect(new Set(await awaitAll(result))).toStrictEqual(expectation);
            },
        );
        it.each(testAsyncValues(values1))(
            'should get difference of $type with set through pipe.',
            async ({ data }) => {
                const result = pipe(data, differenceBy.async(new Set(values2), key));

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
                expect(new Set(await awaitAll(result))).toStrictEqual(expectation);
            },
        );
        it.each(testAsyncValues(values1))(
            'should get difference of $type with array by async key.',
            async ({ data }) => {
                const result = differenceBy.async(data, values2, asyncKey);

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
                expect(new Set(await awaitAll(result))).toStrictEqual(expectation);
            },
        );
        it.each(testAsyncValues(values1))(
            'should get difference of $type with array by async key through pipe.',
            async ({ data }) => {
                const result = pipe(data, differenceBy.async(values2, asyncKey));

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
                expect(new Set(await awaitAll(result))).toStrictEqual(expectation);
            },
        );
        it.each(testAsyncValues(values1))(
            'should get difference of $type with set by async key.',
            async ({ data }) => {
                const result = differenceBy.async(data, new Set(values2), asyncKey);

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
                expect(new Set(await awaitAll(result))).toStrictEqual(expectation);
            },
        );
        it.each(testAsyncValues(values1))(
            'should get difference of $type with set by async key through pipe.',
            async ({ data }) => {
                const result = pipe(data, differenceBy.async(new Set(values2), asyncKey));

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
                expect(new Set(await awaitAll(result))).toStrictEqual(expectation);
            },
        );
    });
});
