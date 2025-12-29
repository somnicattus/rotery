import { awaitAll, map, pipe } from '../../../index.js';
import { testAsyncValues, testSyncValues } from '../../test-util.js';

const values = [1, 2];
const operation = (v: number): number => v * 2;
const asyncOperation = async (v: number): Promise<number> => await Promise.resolve(operation(v));
const expectation = [2, 4];
describe('map', () => {
    describe('sync', () => {
        it.each(testSyncValues(values))('should map $type into iterator.', ({ data }) => {
            const result = map.sync(data, operation);

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.iterator]).toBeTypeOf('function');
            expect([...result]).toStrictEqual(expectation);
        });
        it.each(testSyncValues(values))('should map $type into iterator through pipe.', ({
            data,
        }) => {
            const result = pipe(data, map.sync(operation));

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.iterator]).toBeTypeOf('function');
            expect([...result]).toStrictEqual(expectation);
        });
    });

    describe('async', () => {
        it.each(testAsyncValues(values))('should map $type into async iterator.', async ({
            data,
        }) => {
            const result = map.async(data, operation);

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(await awaitAll(result)).toStrictEqual(expectation);
        });
        it.each(
            testAsyncValues(values),
        )('should map $type into async iterator through pipe.', async ({ data }) => {
            const result = pipe(data, map.async(operation));

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(await awaitAll(result)).toStrictEqual(expectation);
        });
        it.each(
            testAsyncValues(values),
        )('should map $type into async iterator by async operation.', async ({ data }) => {
            const result = map.async(data, asyncOperation);

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(await awaitAll(result)).toStrictEqual(expectation);
        });
        it.each(
            testAsyncValues(values),
        )('should map $type into async iterator through pipe by async operation.', async ({
            data,
        }) => {
            const result = pipe(data, map.async(asyncOperation));

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(await awaitAll(result)).toStrictEqual(expectation);
        });
    });
});
