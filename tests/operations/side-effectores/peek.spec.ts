import { awaitAll, peek, pipe } from '../../../src/index.js';
import { testAsyncValues, testSyncValues } from '../../test-util.js';

const values = [1, 2, 3];
const action = (value: number): void => {
    sideResult.push(value * 2);
};
const asyncAction = async (v: number): Promise<void> => {
    action(v);
    await Promise.resolve();
};
const expectation = [2, 4, 6];
let sideResult: number[] = [];
beforeEach(() => {
    sideResult = [];
});
describe('peek', () => {
    describe('sync', () => {
        it.each(
            testSyncValues(values),
        )('should perform side effect and pass through input values with $type.', ({ data }) => {
            const result = peek.sync(data, action);
            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.iterator]).toBeTypeOf('function');
            expect([...result]).toStrictEqual(values);
            expect(sideResult).toStrictEqual(expectation);
        });
        it.each(
            testSyncValues(values),
        )('should perform side effect and pass through input values with $type through pipe.', ({
            data,
        }) => {
            const result = pipe(data, peek.sync(action));
            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.iterator]).toBeTypeOf('function');
            expect([...result]).toStrictEqual(values);
            expect(sideResult).toStrictEqual(expectation);
        });
    });

    describe('async', () => {
        it.each(
            testAsyncValues(values),
        )('should perform side effect and pass through input values with $type.', async ({
            data,
        }) => {
            const result = peek.async(data, action);
            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(await awaitAll(result)).toStrictEqual(values);
            expect(sideResult).toStrictEqual(expectation);
        });
        it.each(
            testAsyncValues(values),
        )('should perform side effect and pass through input values with $type through pipe.', async ({
            data,
        }) => {
            const result = pipe(data, peek.async(action));
            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(await awaitAll(result)).toStrictEqual(values);
            expect(sideResult).toStrictEqual(expectation);
        });
        it.each(
            testAsyncValues(values),
        )('should perform async side effect and pass through input values with $type.', async ({
            data,
        }) => {
            const result = peek.async(data, asyncAction);
            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(await awaitAll(result)).toStrictEqual(values);
            expect(sideResult).toStrictEqual(expectation);
        });
        it.each(
            testAsyncValues(values),
        )('should perform async side effect and pass through input values with $type through pipe.', async ({
            data,
        }) => {
            const result = pipe(data, peek.async(asyncAction));
            expect(result.next.bind(result)).toBeTypeOf('function');
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(await awaitAll(result)).toStrictEqual(values);
            expect(sideResult).toStrictEqual(expectation);
        });
    });
});
