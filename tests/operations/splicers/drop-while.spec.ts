import { awaitAll, dropWhile, pipe } from '../../../src/index.js';
import { testAsyncValues, testSyncValues } from '../../test-util.js';

const values = [1, 2, 3, 4, 5];
const operation = (v: number): boolean => v <= 2;
const asyncOperation = async (v: number): Promise<boolean> => await Promise.resolve(v <= 2);
const expectation = [3, 4, 5];

describe('dropWhile', () => {
    describe('sync', () => {
        it.each(
            testSyncValues(values),
        )('should drop elements from $type while condition is true.', ({ data }) => {
            const result = dropWhile.sync(data, operation);

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.iterator]).toBeTypeOf('function');
            expect([...result]).toStrictEqual(expectation);
        });
        it.each(
            testSyncValues(values),
        )('should drop elements from $type through pipe while condition is true.', ({ data }) => {
            const result = pipe(data, dropWhile.sync(operation));

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.iterator]).toBeTypeOf('function');
            expect([...result]).toStrictEqual(expectation);
        });
        it('should start yielding after first false condition', () => {
            const result = dropWhile.sync([1, 2, 3, 4, 5], v => v < 3);
            expect([...result]).toStrictEqual([3, 4, 5]);
        });
        it('should return all elements for immediately false condition', () => {
            const result = dropWhile.sync([1, 2, 3, 4, 5], v => v > 10);
            expect([...result]).toStrictEqual([1, 2, 3, 4, 5]);
        });
        it('should return empty when condition is always true', () => {
            const result = dropWhile.sync([1, 2, 3], v => v > 0);
            expect([...result]).toStrictEqual([]);
        });
        it('should continue yielding after condition becomes false', () => {
            const result = dropWhile.sync([1, 2, 5, 1, 2], v => v < 3);
            expect([...result]).toStrictEqual([5, 1, 2]);
        });
    });

    describe('async', () => {
        it.each(
            testAsyncValues(values),
        )('should drop elements from $type while condition is true.', async ({ data }) => {
            const result = dropWhile.async(data, operation);

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(await awaitAll(result)).toStrictEqual(expectation);
        });
        it.each(
            testAsyncValues(values),
        )('should drop elements from $type through pipe while condition is true.', async ({
            data,
        }) => {
            const result = pipe(data, dropWhile.async(operation));

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(await awaitAll(result)).toStrictEqual(expectation);
        });
        it.each(
            testAsyncValues(values),
        )('should drop elements from $type by async operation while condition is true.', async ({
            data,
        }) => {
            const result = dropWhile.async(data, asyncOperation);

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(await awaitAll(result)).toStrictEqual(expectation);
        });
        it.each(
            testAsyncValues(values),
        )('should drop elements from $type through pipe by async operation while condition is true.', async ({
            data,
        }) => {
            const result = pipe(data, dropWhile.async(asyncOperation));

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(await awaitAll(result)).toStrictEqual(expectation);
        });
        it('should start yielding after first false condition', async () => {
            const result = dropWhile.async([1, 2, 3, 4, 5], v => v < 3);
            expect(await awaitAll(result)).toStrictEqual([3, 4, 5]);
        });
        it('should return all elements for immediately false condition', async () => {
            const result = dropWhile.async([1, 2, 3, 4, 5], v => v > 10);
            expect(await awaitAll(result)).toStrictEqual([1, 2, 3, 4, 5]);
        });
        it('should return empty when condition is always true', async () => {
            const result = dropWhile.async([1, 2, 3], v => v > 0);
            expect(await awaitAll(result)).toStrictEqual([]);
        });
        it('should continue yielding after condition becomes false', async () => {
            const result = dropWhile.async([1, 2, 5, 1, 2], v => v < 3);
            expect(await awaitAll(result)).toStrictEqual([5, 1, 2]);
        });
    });
});
