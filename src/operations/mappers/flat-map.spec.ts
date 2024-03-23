import { testAsyncValues, testSyncValues } from '../../__test__/test-util.js';
import { awaitAll, flatMap, pipe } from '../../index.js';
const values = [1, 2];
const operation = (v: number): number[] => [v * 2, v * 3];
const asyncOperation = async (v: number): Promise<number[]> => await Promise.resolve(operation(v));
const expectation = [2, 3, 4, 6];
describe('flatMap', () => {
    describe('sync', () => {
        it.each(testSyncValues(values))('should flatMap $type into iterator.', ({ data }) => {
            const result = flatMap.sync(data, operation);

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.iterator]).toBeTypeOf('function');
            expect([...result]).toStrictEqual(expectation);
        });
        it.each(testSyncValues(values))(
            'should flatMap $type into iterator through pipe.',
            ({ data }) => {
                const result = pipe(data, flatMap.sync(operation));

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.iterator]).toBeTypeOf('function');
                expect([...result]).toStrictEqual(expectation);
            },
        );
    });

    describe('async', () => {
        it.each(testAsyncValues(values))(
            'should flatMap $type into async iterator.',
            async ({ data }) => {
                const result = flatMap.async(data, operation);

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
                expect(await awaitAll(result)).toStrictEqual(expectation);
            },
        );
        it.each(testAsyncValues(values))(
            'should flatMap $type into async iterator through pipe.',
            async ({ data }) => {
                const result = pipe(data, flatMap.async(operation));

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
                expect(await awaitAll(result)).toStrictEqual(expectation);
            },
        );
        it.each(testAsyncValues(values))(
            'should flatMap $type into async iterator by async operation.',
            async ({ data }) => {
                const result = flatMap.async(data, asyncOperation);

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
                expect(await awaitAll(result)).toStrictEqual(expectation);
            },
        );
        it.each(testAsyncValues(values))(
            'should flatMap $type into async iterator through pipe by async operation.',
            async ({ data }) => {
                const result = pipe(data, flatMap.async(asyncOperation));

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
                expect(await awaitAll(result)).toStrictEqual(expectation);
            },
        );
    });
});
