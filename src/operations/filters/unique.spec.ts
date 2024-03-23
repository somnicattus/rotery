import { testAsyncValues, testSyncValues } from '../../__test__/test-util.js';
import { awaitAll, unique } from '../../index.js';
const values = [1, 2, 3, 1, 4, 1, 2];
const expectation = [1, 2, 3, 4];
describe('unique', () => {
    describe('sync', () => {
        it.each(testSyncValues(values))(
            'should create a unique series from $type .',
            ({ data }) => {
                const result = unique.sync(data);

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.iterator]).toBeTypeOf('function');
                expect([...result]).toStrictEqual(expectation);
            },
        );
    });

    describe('async', () => {
        it.each(testAsyncValues(values))(
            'should create a unique series from $type .',
            async ({ data }) => {
                const result = unique.async(data);

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
                expect(await awaitAll(result)).toStrictEqual(expectation);
            },
        );
    });
});
