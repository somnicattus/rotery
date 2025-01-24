import { awaitAll, uniqueBy } from '../../../index.js';
import { testAsyncValues, testSyncValues } from '../../test-util.js';
const values = [1.1, 2.1, 3.1, 1.2, 4.1, 1.3, 2.2];
const expectation = [1.1, 2.1, 3.1, 4.1];
const key = (value: number): number => Math.round(value);

describe('uniqueBy', () => {
    describe('sync', () => {
        it.each(testSyncValues(values))(
            'should create a unique series from $type .',
            ({ data }) => {
                const result = uniqueBy.sync(data, key);

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
                const result = uniqueBy.async(data, key);

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
                expect(await awaitAll(result)).toStrictEqual(expectation);
            },
        );
    });
});
