import { pipe, reduce } from '../../../src/index.js';
import { testAsyncValues, testSyncValues } from '../../test-util.js';

const values = [1, 2, 3];
const reducer = (accumulator: number, value: number): number => accumulator + value;
const initialValue = 0;
const asyncReducer = async (accumulator: number, v: number): Promise<number> =>
    await Promise.resolve(reducer(accumulator, v));
const expectation = 6;
describe('reduce', () => {
    describe('sync', () => {
        it.each(testSyncValues(values))('should reduce $type into value.', ({ data }) => {
            const result = reduce.sync(data, reducer, initialValue);
            expect(result).toStrictEqual(expectation);
        });
        it.each(testSyncValues(values))('should reduce $type into value through pipe.', ({
            data,
        }) => {
            const result = pipe(data, reduce.sync(reducer, initialValue));
            expect(result).toStrictEqual(expectation);
        });
    });

    describe('async', () => {
        it.each(testAsyncValues(values))('should reduce $type into promise.', async ({ data }) => {
            const result = reduce.async(data, reducer, initialValue);
            expect(await result).toBe(expectation);
        });
        it.each(testAsyncValues(values))('should reduce $type into promise through pipe.', async ({
            data,
        }) => {
            const result = pipe(data, reduce.async(reducer, initialValue));
            expect(await result).toBe(expectation);
        });
        it.each(
            testAsyncValues(values),
        )('should reduce $type into promise by async operation.', async ({ data }) => {
            const result = reduce.async(data, asyncReducer, initialValue);
            expect(await result).toBe(expectation);
        });
        it.each(
            testAsyncValues(values),
        )('should reduce $type into promise through pipe by async operation.', async ({ data }) => {
            const result = pipe(data, reduce.async(asyncReducer, initialValue));
            expect(await result).toBe(expectation);
        });
    });
});
