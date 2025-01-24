import { find, pipe } from '../../../index.js';
import { testAsyncValues, testSyncValues } from '../../test-util.js';
const positiveTarget = [1, 2, 3];
const negativeTarget = [1, 4, 5];
const test = (value: number): value is 2 => value === 2;
const asyncTest = async (v: number): Promise<boolean> => await Promise.resolve(test(v));
const expectation = 2;
describe('some', () => {
    describe('sync', () => {
        it.each(testSyncValues(positiveTarget))(
            'should return value with a positive target $type.',
            ({ data }) => {
                const result = find.sync(data, test);
                expect(result).toBe(expectation);
            },
        );
        it.each(testSyncValues(negativeTarget))(
            'should return false with a negative target $type through pipe.',
            ({ data }) => {
                const result = pipe(data, find.sync(test));
                expect(result).toBeUndefined();
            },
        );
    });

    describe('async', () => {
        it.each(testAsyncValues(positiveTarget))(
            'should return value with a positive target $type.',
            async ({ data }) => {
                const result = find.async(data, test);
                expect(await result).toBe(expectation);
            },
        );
        it.each(testAsyncValues(negativeTarget))(
            'should return false with a negative target $type through pipe.',
            async ({ data }) => {
                const result = pipe(data, find.async(test));
                expect(await result).toBeUndefined();
            },
        );
        it.each(testAsyncValues(positiveTarget))(
            'should return value with a positive target $type by async operation.',
            async ({ data }) => {
                const result = find.async(data, asyncTest);
                expect(await result).toBe(expectation);
            },
        );
        it.each(testAsyncValues(negativeTarget))(
            'should return false with a negative target $type by async operation through pipe.',
            async ({ data }) => {
                const result = pipe(data, find.async(asyncTest));
                expect(await result).toBeUndefined();
            },
        );
    });
});
