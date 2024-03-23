import { testAsyncValues, testSyncValues } from '../__test__/test-util.js';
import { awaitAll, chunk, pipe } from '../index.js';
const size = 3;
const values1 = [1, 2, 3, 4, 5, 6];
const values2 = [1, 2, 3, 4, 5, 6, 7];
const expectation1 = [
    [1, 2, 3],
    [4, 5, 6],
];
const expectation2 = [[1, 2, 3], [4, 5, 6], [7]];
describe('chunk', () => {
    describe('sync', () => {
        it.each(testSyncValues(values1))('should chunk $type into iterator.', ({ data }) => {
            const result = chunk.sync(data, size);

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.iterator]).toBeTypeOf('function');
            expect([...result]).toStrictEqual(expectation1);
        });
        it.each(testSyncValues(values2))(
            'should chunk $type into iterator through pipe.',
            ({ data }) => {
                const result = pipe(data, chunk.sync(size));

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.iterator]).toBeTypeOf('function');
                expect([...result]).toStrictEqual(expectation2);
            },
        );
    });

    describe('async', () => {
        it.each(testAsyncValues(values1))(
            'should chunk $type into async iterator.',
            async ({ data }) => {
                const result = chunk.async(data, size);

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
                expect(await awaitAll(result)).toStrictEqual(expectation1);
            },
        );
        it.each(testAsyncValues(values2))(
            'should chunk $type into async iterator through pipe.',
            async ({ data }) => {
                const result = pipe(data, chunk.async(size));

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
                expect(await awaitAll(result)).toStrictEqual(expectation2);
            },
        );
    });
});
