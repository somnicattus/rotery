import { awaitAll, pipe, takeWhile } from '../../../src/index.js';
import { testAsyncValues, testSyncValues } from '../../test-util.js';

const values = [1, 2, 3, 4, 5];
const operation = (v: number): v is 1 | 2 => v <= 2;
const asyncOperation = async (v: number): Promise<boolean> => await Promise.resolve(v <= 2);
const expectation = [1, 2];

describe('takeWhile', () => {
    describe('sync', () => {
        it.each(
            testSyncValues(values),
        )('should take elements from $type while condition is true.', ({ data }) => {
            const result = takeWhile.sync(data, operation);

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.iterator]).toBeTypeOf('function');
            expect([...result]).toStrictEqual(expectation);
        });
        it.each(
            testSyncValues(values),
        )('should take elements from $type through pipe while condition is true.', ({ data }) => {
            const result = pipe(data, takeWhile.sync(operation));

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.iterator]).toBeTypeOf('function');
            expect([...result]).toStrictEqual(expectation);
        });
        it('should stop at first false condition', () => {
            const result = takeWhile.sync([1, 2, 3, 4, 5], v => v < 3);
            expect([...result]).toStrictEqual([1, 2]);
        });
        it('should return empty for immediately false condition', () => {
            const result = takeWhile.sync([1, 2, 3, 4, 5], v => v > 10);
            expect([...result]).toStrictEqual([]);
        });
        it('should return all elements when condition is always true', () => {
            const result = takeWhile.sync([1, 2, 3], v => v > 0);
            expect([...result]).toStrictEqual([1, 2, 3]);
        });
    });

    describe('async', () => {
        it.each(
            testAsyncValues(values),
        )('should take elements from $type while condition is true.', async ({ data }) => {
            const result = takeWhile.async(data, operation);

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(await awaitAll(result)).toStrictEqual(expectation);
        });
        it.each(
            testAsyncValues(values),
        )('should take elements from $type through pipe while condition is true.', async ({
            data,
        }) => {
            const result = pipe(data, takeWhile.async(operation));

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(await awaitAll(result)).toStrictEqual(expectation);
        });
        it.each(
            testAsyncValues(values),
        )('should take elements from $type by async operation while condition is true.', async ({
            data,
        }) => {
            const result = takeWhile.async(data, asyncOperation);

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(await awaitAll(result)).toStrictEqual(expectation);
        });
        it.each(
            testAsyncValues(values),
        )('should take elements from $type through pipe by async operation while condition is true.', async ({
            data,
        }) => {
            const result = pipe(data, takeWhile.async(asyncOperation));

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(await awaitAll(result)).toStrictEqual(expectation);
        });
        it('should stop at first false condition', async () => {
            const result = takeWhile.async([1, 2, 3, 4, 5], v => v < 3);
            expect(await awaitAll(result)).toStrictEqual([1, 2]);
        });
        it('should return empty for immediately false condition', async () => {
            const result = takeWhile.async([1, 2, 3, 4, 5], v => v > 10);
            expect(await awaitAll(result)).toStrictEqual([]);
        });
        it('should return all elements when condition is always true', async () => {
            const result = takeWhile.async([1, 2, 3], v => v > 0);
            expect(await awaitAll(result)).toStrictEqual([1, 2, 3]);
        });
    });
});
