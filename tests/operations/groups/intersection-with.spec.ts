import { awaitAll, intersectionWith, pipe } from '../../../src/index.js';
import { testAsyncValues, testSyncValues } from '../../test-util.js';

const values1 = [1.1, 1.11, 2.1, 3.1, 4.1, 4.11, 5.1, 5.11];
const values2 = [3.2, 4.2, 5.2, 5.21, 6.2];
const equals = (v1: number, v2: number): boolean => Math.round(v1) === Math.round(v2);
const asyncEquals = async (v1: number, v2: number): Promise<boolean> =>
    await Promise.resolve(Math.round(v1) === Math.round(v2));
const expectation = new Set([3.1, 4.1, 4.11, 5.1, 5.11]);

describe('intersectionWith', () => {
    describe('sync', () => {
        it.each(testSyncValues(values1))('should get intersection of $type with array.', ({
            data,
        }) => {
            const result = intersectionWith.sync(data, values2, equals);

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.iterator]).toBeTypeOf('function');
            expect(new Set(result)).toStrictEqual(expectation);
        });
        it.each(
            testSyncValues(values1),
        )('should get intersection of $type with array through pipe.', ({ data }) => {
            const result = pipe(data, intersectionWith.sync(values2, equals));

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.iterator]).toBeTypeOf('function');
            expect(new Set(result)).toStrictEqual(expectation);
        });
        it.each(testSyncValues(values1))('should get intersection of $type with set.', ({
            data,
        }) => {
            const result = intersectionWith.sync(data, new Set(values2), equals);

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.iterator]).toBeTypeOf('function');
            expect(new Set(result)).toStrictEqual(expectation);
        });
        it.each(
            testSyncValues(values1),
        )('should get intersection of $type with set through pipe.', ({ data }) => {
            const result = pipe(data, intersectionWith.sync(new Set(values2), equals));

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.iterator]).toBeTypeOf('function');
            expect(new Set(result)).toStrictEqual(expectation);
        });
    });

    describe('async', () => {
        it.each(testAsyncValues(values1))('should get intersection of $type with array.', async ({
            data,
        }) => {
            const result = intersectionWith.async(data, values2, equals);

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(new Set(await awaitAll(result))).toStrictEqual(expectation);
        });
        it.each(
            testAsyncValues(values1),
        )('should get intersection of $type with array through pipe.', async ({ data }) => {
            const result = pipe(data, intersectionWith.async(values2, equals));

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(new Set(await awaitAll(result))).toStrictEqual(expectation);
        });
        it.each(testAsyncValues(values1))('should get intersection of $type with set.', async ({
            data,
        }) => {
            const result = intersectionWith.async(data, new Set(values2), equals);

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(new Set(await awaitAll(result))).toStrictEqual(expectation);
        });
        it.each(
            testAsyncValues(values1),
        )('should get intersection of $type with set through pipe.', async ({ data }) => {
            const result = pipe(data, intersectionWith.async(new Set(values2), equals));

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(new Set(await awaitAll(result))).toStrictEqual(expectation);
        });
        it.each(
            testAsyncValues(values1),
        )('should get intersection of $type with array with async equals.', async ({ data }) => {
            const result = intersectionWith.async(data, values2, asyncEquals);

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(new Set(await awaitAll(result))).toStrictEqual(expectation);
        });
        it.each(
            testAsyncValues(values1),
        )('should get intersection of $type with array with async equals through pipe.', async ({
            data,
        }) => {
            const result = pipe(data, intersectionWith.async(values2, asyncEquals));

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(new Set(await awaitAll(result))).toStrictEqual(expectation);
        });
        it.each(
            testAsyncValues(values1),
        )('should get intersection of $type with set with async equals.', async ({ data }) => {
            const result = intersectionWith.async(data, new Set(values2), asyncEquals);

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(new Set(await awaitAll(result))).toStrictEqual(expectation);
        });
        it.each(
            testAsyncValues(values1),
        )('should get intersection of $type with set with async equals through pipe.', async ({
            data,
        }) => {
            const result = pipe(data, intersectionWith.async(new Set(values2), asyncEquals));

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(new Set(await awaitAll(result))).toStrictEqual(expectation);
        });
    });
});
