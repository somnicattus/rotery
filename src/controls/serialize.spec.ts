import { testAsyncValues, testSyncValues } from '../__test__/test-util.js';
import { awaitAll, serialize } from '../index.js';
const values = [1, 2, 3];
const expectation = values;
describe('serialize', () => {
    describe('sync', () => {
        it.each(testSyncValues(values))('should serialize $type into iterator.', ({ data }) => {
            const result = serialize.sync(data);

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.iterator]).toBeTypeOf('function');
            expect([...result]).toStrictEqual(expectation);
        });
    });

    describe('async', () => {
        it.each(testAsyncValues(values))(
            'should serialize $type into async iterator.',
            async ({ data }) => {
                const result = serialize.async(data);

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
                expect(await awaitAll(result)).toStrictEqual(expectation);
            },
        );
    });
});
