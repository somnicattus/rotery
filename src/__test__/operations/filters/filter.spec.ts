import { awaitAll, filter, pipe } from '../../../index.js';
import { testAsyncValues, testSyncValues } from '../../test-util.js';
const values = [1, 2, 3, 4];
const operation = (v: number): v is 1 | 3 => v === 1 || v === 3;
const asyncOperation = async (v: number): Promise<boolean> => await Promise.resolve(operation(v));
const expectation = [1, 3];
describe('filter', () => {
    describe('sync', () => {
        it.each(testSyncValues(values))('should filter $type.', ({ data }) => {
            const result = filter.sync(data, operation);

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.iterator]).toBeTypeOf('function');
            expect([...result]).toStrictEqual(expectation);
        });
        it.each(testSyncValues(values))('should filter $type through pipe.', ({ data }) => {
            const result = pipe(data, filter.sync(operation));

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.iterator]).toBeTypeOf('function');
            expect([...result]).toStrictEqual(expectation);
        });
    });

    describe('async', () => {
        it.each(testAsyncValues(values))('should filter $type.', async ({ data }) => {
            const result = filter.async(data, operation);

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(await awaitAll(result)).toStrictEqual(expectation);
        });
        it.each(testAsyncValues(values))('should filter $type through pipe.', async ({ data }) => {
            const result = pipe(data, filter.async(operation));

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(await awaitAll(result)).toStrictEqual(expectation);
        });
        it.each(testAsyncValues(values))(
            'should filter $type by async operation.',
            async ({ data }) => {
                const result = filter.async(data, asyncOperation);

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
                expect(await awaitAll(result)).toStrictEqual(expectation);
            },
        );
        it.each(testAsyncValues(values))(
            'should filter $type through pipe by async operation.',
            async ({ data }) => {
                const result = pipe(data, filter.async(asyncOperation));

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
                expect(await awaitAll(result)).toStrictEqual(expectation);
            },
        );
    });
});
