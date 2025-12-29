import { awaitAll, differenceWith, pipe } from '../../../index.js';
import { testAsyncValues, testSyncValues } from '../../test-util.js';

const values1 = [1.1, 1.11, 2.1, 3.1, 4.1, 4.11, 5.1, 5.11];
const values2 = [3.2, 4.2, 5.2, 5.21, 6.2];
const equals = (v1: number, v2: number): boolean => Math.round(v1) === Math.round(v2);
const asyncEquals = async (v1: number, v2: number): Promise<boolean> =>
    await Promise.resolve(Math.round(v1) === Math.round(v2));
const expectation = new Set([1.1, 1.11, 2.1]);

describe('differenceWith', () => {
    describe('sync', () => {
        it.each(testSyncValues(values1))('should get difference of $type with array.', ({
            data,
        }) => {
            const result = differenceWith.sync(data, values2, equals);

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.iterator]).toBeTypeOf('function');
            expect(new Set(result)).toStrictEqual(expectation);
        });
        it.each(
            testSyncValues(values1),
        )('should get difference of $type with array through pipe.', ({ data }) => {
            const result = pipe(data, differenceWith.sync(values2, equals));

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.iterator]).toBeTypeOf('function');
            expect(new Set(result)).toStrictEqual(expectation);
        });
        it.each(testSyncValues(values1))('should get difference of $type with set.', ({ data }) => {
            const result = differenceWith.sync(data, new Set(values2), equals);

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.iterator]).toBeTypeOf('function');
            expect(new Set(result)).toStrictEqual(expectation);
        });
        it.each(testSyncValues(values1))('should get difference of $type with set through pipe.', ({
            data,
        }) => {
            const result = pipe(data, differenceWith.sync(new Set(values2), equals));

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.iterator]).toBeTypeOf('function');
            expect(new Set(result)).toStrictEqual(expectation);
        });
    });

    describe('async', () => {
        it.each(testAsyncValues(values1))('should get difference of $type with array.', async ({
            data,
        }) => {
            const result = differenceWith.async(data, values2, equals);

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(new Set(await awaitAll(result))).toStrictEqual(expectation);
        });
        it.each(
            testAsyncValues(values1),
        )('should get difference of $type with array through pipe.', async ({ data }) => {
            const result = pipe(data, differenceWith.async(values2, equals));

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(new Set(await awaitAll(result))).toStrictEqual(expectation);
        });
        it.each(testAsyncValues(values1))('should get difference of $type with set.', async ({
            data,
        }) => {
            const result = differenceWith.async(data, new Set(values2), equals);

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(new Set(await awaitAll(result))).toStrictEqual(expectation);
        });
        it.each(
            testAsyncValues(values1),
        )('should get difference of $type with set through pipe.', async ({ data }) => {
            const result = pipe(data, differenceWith.async(new Set(values2), equals));

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(new Set(await awaitAll(result))).toStrictEqual(expectation);
        });
        it.each(
            testAsyncValues(values1),
        )('should get difference of $type with array with async equals.', async ({ data }) => {
            const result = differenceWith.async(data, values2, asyncEquals);

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(new Set(await awaitAll(result))).toStrictEqual(expectation);
        });
        it.each(
            testAsyncValues(values1),
        )('should get difference of $type with array with async equals through pipe.', async ({
            data,
        }) => {
            const result = pipe(data, differenceWith.async(values2, asyncEquals));

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(new Set(await awaitAll(result))).toStrictEqual(expectation);
        });
        it.each(
            testAsyncValues(values1),
        )('should get difference of $type with set with async equals.', async ({ data }) => {
            const result = differenceWith.async(data, new Set(values2), asyncEquals);

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(new Set(await awaitAll(result))).toStrictEqual(expectation);
        });
        it.each(
            testAsyncValues(values1),
        )('should get difference of $type with set with async equals through pipe.', async ({
            data,
        }) => {
            const result = pipe(data, differenceWith.async(new Set(values2), asyncEquals));

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(new Set(await awaitAll(result))).toStrictEqual(expectation);
        });
    });
});
