import { awaitAll, uniqueWith } from '../../../index.js';
import { testAsyncValues, testSyncValues } from '../../test-util.js';
const values = [1.1, 2.1, 3.1, 1.2, 4.1, 1.3, 2.2];
const expectation = [1.1, 2.1, 3.1, 4.1];
const equals = (v1: number, v2: number): boolean => Math.round(v1) === Math.round(v2);
const asyncEquals = async (v1: number, v2: number): Promise<boolean> =>
    await Promise.resolve(Math.round(v1) === Math.round(v2));

describe('uniqueWith', () => {
    describe('sync', () => {
        it.each(testSyncValues(values))('should create a unique series from $type.', ({ data }) => {
            const result = uniqueWith.sync(data, equals);

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.iterator]).toBeTypeOf('function');
            expect([...result]).toStrictEqual(expectation);
        });
    });

    describe('async', () => {
        it.each(testAsyncValues(values))(
            'should create a unique series from $type.',
            async ({ data }) => {
                const result = uniqueWith.async(data, equals);

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
                expect(await awaitAll(result)).toStrictEqual(expectation);
            },
        );
        it.each(testAsyncValues(values))(
            'should create a unique series from $type with async equals.',
            async ({ data }) => {
                const result = uniqueWith.async(data, asyncEquals);

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
                expect(await awaitAll(result)).toStrictEqual(expectation);
            },
        );
    });
});
