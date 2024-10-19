import { awaitAll, concat, pipe, serialize } from '../../../index.js';
import { testAsyncValues, testSyncValues } from '../../test-util.js';
const values = [1, 2];
const following = [3, 4];
const expectation = [1, 2, 3, 4];
describe('concat', () => {
    describe('sync', () => {
        it.each(testSyncValues(values))('should concatenate $type with an array.', ({ data }) => {
            const result = concat.sync(data, following);

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.iterator]).toBeTypeOf('function');
            expect([...result]).toStrictEqual(expectation);
        });
        it.each(testSyncValues(values))(
            'should concatenate $type with an array through pipe.',
            ({ data }) => {
                const result = pipe(data, concat.sync(following));

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.iterator]).toBeTypeOf('function');
                expect([...result]).toStrictEqual(expectation);
            },
        );
    });

    describe('async', () => {
        it.each(testAsyncValues(values))(
            'should concatenate $type with an array.',
            async ({ data }) => {
                const result = concat.async(data, following);

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
                expect(await awaitAll(result)).toStrictEqual(expectation);
            },
        );
        it.each(testAsyncValues(values))(
            'should concatenate $type with an array through pipe.',
            async ({ data }) => {
                const result = pipe(data, concat.async(following));

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
                expect(await awaitAll(result)).toStrictEqual(expectation);
            },
        );
        it.each(testAsyncValues(values))(
            'should concatenate $type with an async iterator.',
            async ({ data }) => {
                const result = concat.async(data, serialize.async(following));

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
                expect(await awaitAll(result)).toStrictEqual(expectation);
            },
        );
    });
});
