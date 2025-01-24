import { awaitAll, difference, pipe } from '../../../index.js';
import { testAsyncValues, testSyncValues } from '../../test-util.js';
const values1 = [1, 1, 2, 3, 4, 4, 5, 5];
const values2 = [3, 4, 5, 5, 6];
const expectation = new Set([1, 2]);

describe('difference', () => {
    describe('sync', () => {
        it.each(testSyncValues(values1))(
            'should get difference of $type with array.',
            ({ data }) => {
                const result = difference.sync(data, values2);

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.iterator]).toBeTypeOf('function');
                expect(new Set(result)).toStrictEqual(expectation);
            },
        );
        it.each(testSyncValues(values1))(
            'should get difference of $type with array through pipe.',
            ({ data }) => {
                const result = pipe(data, difference.sync(values2));

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.iterator]).toBeTypeOf('function');
                expect(new Set(result)).toStrictEqual(expectation);
            },
        );
        it.each(testSyncValues(values1))('should get difference of $type with set.', ({ data }) => {
            const result = difference.sync(data, new Set(values2));

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.iterator]).toBeTypeOf('function');
            expect(new Set(result)).toStrictEqual(expectation);
        });
        it.each(testSyncValues(values1))(
            'should get difference of $type with set through pipe.',
            ({ data }) => {
                const result = pipe(data, difference.sync(new Set(values2)));

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
                const result = difference.async(data, values2);

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
                expect(new Set(await awaitAll(result))).toStrictEqual(expectation);
            },
        );
        it.each(testAsyncValues(values1))(
            'should get difference of $type with array through pipe.',
            async ({ data }) => {
                const result = pipe(data, difference.async(values2));

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
                expect(new Set(await awaitAll(result))).toStrictEqual(expectation);
            },
        );
        it.each(testAsyncValues(values1))(
            'should get difference of $type with set.',
            async ({ data }) => {
                const result = difference.async(data, new Set(values2));

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
                expect(new Set(await awaitAll(result))).toStrictEqual(expectation);
            },
        );
        it.each(testAsyncValues(values1))(
            'should get difference of $type with set through pipe.',
            async ({ data }) => {
                const result = pipe(data, difference.async(new Set(values2)));

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
                expect(new Set(await awaitAll(result))).toStrictEqual(expectation);
            },
        );
    });
});
