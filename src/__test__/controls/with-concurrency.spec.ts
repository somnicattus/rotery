import { awaitAll, pipe, withConcurrency } from '../../index.js';
import { testAsyncValues } from '../test-util.js';
const size = 3;
const values1 = [1, 2, 3, 4, 5, 6];
const values2 = [1, 2, 3, 4, 5, 6, 7];
const expectation1 = ['1,2,3', '4,5,6'];
const expectation2 = ['1,2,3', '4,5,6', '7'];
describe('withConcurrency', () => {
    it.each(testAsyncValues(values1))(
        'should apply operation for each chunk from $type.',
        async ({ data }) => {
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            const result = withConcurrency(data, size, values => values.join(','));

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(await awaitAll(result)).toStrictEqual(expectation1);
        },
    );
    it.each(testAsyncValues(values2))(
        'should apply operation for each chunk from $type through pipe.',
        async ({ data }) => {
            const result = pipe(
                data,
                // eslint-disable-next-line @typescript-eslint/no-deprecated
                withConcurrency(size, values => values.join(',')),
            );

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(await awaitAll(result)).toStrictEqual(expectation2);
        },
    );
    it.each(testAsyncValues(values1))(
        'should apply async operation for each chunk from $type.',
        async ({ data }) => {
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            const result = withConcurrency(
                data,
                size,
                async values => await Promise.resolve(values.join(',')),
            );

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(await awaitAll(result)).toStrictEqual(expectation1);
        },
    );
    it.each(testAsyncValues(values2))(
        'should apply async operation for each chunk from $type through pipe.',
        async ({ data }) => {
            const result = pipe(
                data,
                // eslint-disable-next-line @typescript-eslint/no-deprecated
                withConcurrency(size, async values => await Promise.resolve(values.join(','))),
            );

            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(await awaitAll(result)).toStrictEqual(expectation2);
        },
    );
});
