import { every, pipe } from '../../../src/index.js';
import { testAsyncValues, testSyncValues } from '../../test-util.js';

const positiveTarget = [1, 2, 3];
const negativeTarget = [1, 4, 5];
const test = (value: number): value is 1 | 2 | 3 => [1, 2, 3].includes(value);
const asyncTest = async (v: number): Promise<boolean> => await Promise.resolve(test(v));
describe('every', () => {
    describe('sync', () => {
        it.each(
            testSyncValues(positiveTarget),
        )('should return true with a positive target $type.', ({ data }) => {
            const result = every.sync(data, test);
            expect(result).toBeTruthy();
        });
        it.each(
            testSyncValues(negativeTarget),
        )('should return false with a negative target $type through pipe.', ({ data }) => {
            const result = pipe(data, every.sync(test));
            expect(result).toBeFalsy();
        });
    });

    describe('async', () => {
        it.each(
            testAsyncValues(positiveTarget),
        )('should return true with a positive target $type.', async ({ data }) => {
            const result = every.async(data, test);
            expect(await result).toBeTruthy();
        });
        it.each(
            testAsyncValues(negativeTarget),
        )('should return false with a negative target $type through pipe.', async ({ data }) => {
            const result = pipe(data, every.async(test));
            expect(await result).toBeFalsy();
        });
        it.each(
            testAsyncValues(positiveTarget),
        )('should return true with a positive target $type by async operation.', async ({
            data,
        }) => {
            const result = every.async(data, asyncTest);
            expect(await result).toBeTruthy();
        });
        it.each(
            testAsyncValues(negativeTarget),
        )('should return false with a negative target $type by async operation through pipe.', async ({
            data,
        }) => {
            const result = pipe(data, every.async(asyncTest));
            expect(await result).toBeFalsy();
        });
    });
});
