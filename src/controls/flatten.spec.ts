import { testAsyncValues, testSyncValues } from '../__test__/test-util.js';
import { awaitAll, flatten } from '../index.js';
const values1 = [
    [1, 2, 3],
    [4, 5, 6],
];
const values2 = [[1, 2, 3], [4, 5, 6], [7]];
const expectation1 = [1, 2, 3, 4, 5, 6];
const expectation2 = [1, 2, 3, 4, 5, 6, 7];
describe('flatten', () => {
    describe('sync', () => {
        it.each(testSyncValues(values1))('should flatten $type into iterator.', ({ data }) => {
            const result = flatten.sync(data);

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.iterator]).toBeTypeOf('function');
            expect([...result]).toStrictEqual(expectation1);
        });
    });

    describe('async', () => {
        it.each(testAsyncValues(values2))(
            'should flatten $type into async iterator.',
            async ({ data }) => {
                const result = flatten.async(data);

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
                expect(await awaitAll(result)).toStrictEqual(expectation2);
            },
        );
    });
});
