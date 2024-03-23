import { testAsyncValues } from '../../__test__/test-util.js';
import { awaitAll, concurrentMap, pipe } from '../../index.js';
const size = 3;
const values1 = [1, 2, 3, 4, 5, 6];
const values2 = [1, 2, 3, 4, 5, 6, 7];
const expectation1 = [2, 4, 6, 8, 10, 12];
const expectation2 = [2, 4, 6, 8, 10, 12, 14];
describe('concurrentMap', () => {
    it.each(testAsyncValues(values1))('should map values from $type.', async ({ data }) => {
        const result = concurrentMap(data, size, async x => await Promise.resolve(x * 2));

        expect(result.next.bind(result)).toBeTypeOf('function');
        expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
        expect(await awaitAll(result)).toStrictEqual(expectation1);
    });
    it.each(testAsyncValues(values2))(
        'should map values from $type through pipe.',
        async ({ data }) => {
            const result = pipe(
                data,
                concurrentMap(size, async x => await Promise.resolve(x * 2)),
            );

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(await awaitAll(result)).toStrictEqual(expectation2);
        },
    );
});
