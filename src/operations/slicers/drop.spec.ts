import { testAsyncValues, testSyncValues } from '../../__test__/test-util.js';
import { awaitAll, drop, pipe } from '../../index.js';
const values = [1, 2, 3, 4];
const count = 2;
const expectation = [3, 4];
describe('drop', () => {
    describe('sync', () => {
        it.each(testSyncValues(values))('should drop elements from $type .', ({ data }) => {
            const result = drop.sync(data, count);

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.iterator]).toBeTypeOf('function');
            expect([...result]).toStrictEqual(expectation);
        });
        it.each(testSyncValues(values))(
            'should drop elements from $type through pipe.',
            ({ data }) => {
                const result = pipe(data, drop.sync(count));

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.iterator]).toBeTypeOf('function');
                expect([...result]).toStrictEqual(expectation);
            },
        );
    });

    describe('async', () => {
        it.each(testAsyncValues(values))('should drop elements from $type .', async ({ data }) => {
            const result = drop.async(data, count);

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(await awaitAll(result)).toStrictEqual(expectation);
        });
        it.each(testAsyncValues(values))(
            'should drop elements from $type through pipe.',
            async ({ data }) => {
                const result = pipe(data, drop.async(count));

                expect(result.next.bind(result)).toBeTypeOf('function');
                expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
                expect(await awaitAll(result)).toStrictEqual(expectation);
            },
        );
    });
});
