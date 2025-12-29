import { awaitAll, pipe, take } from '../../../index.js';
import { testAsyncValues, testSyncValues } from '../../test-util.js';

const values = [1, 2, 3, 4];
const count = 2;
const expectation = [1, 2];
describe('take', () => {
    describe('sync', () => {
        it.each(testSyncValues(values))('should take elements from $type.', ({ data }) => {
            const result = take.sync(data, count);

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.iterator]).toBeTypeOf('function');
            expect([...result]).toStrictEqual(expectation);
        });
        it.each(testSyncValues(values))('should take elements from $type through pipe.', ({
            data,
        }) => {
            const result = pipe(data, take.sync(count));

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.iterator]).toBeTypeOf('function');
            expect([...result]).toStrictEqual(expectation);
        });
    });

    describe('async', () => {
        it.each(testAsyncValues(values))('should take elements from $type.', async ({ data }) => {
            const result = take.async(data, count);

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(await awaitAll(result)).toStrictEqual(expectation);
        });
        it.each(testAsyncValues(values))('should take elements from $type through pipe.', async ({
            data,
        }) => {
            const result = pipe(data, take.async(count));

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(await awaitAll(result)).toStrictEqual(expectation);
        });
    });
});
