import { testAsyncValues, testSyncValues } from '../../__test__/test-util.js';
import { pipe, some } from '../../index.js';
const positiveTarget = [1, 2, 3];
const negativeTarget = [1, 4, 5];
const test = (value: number): value is 2 => value === 2;
const asyncTest = async (v: number): Promise<boolean> => await Promise.resolve(test(v));
describe('find', () => {
    describe('sync', () => {
        it.each(testSyncValues(positiveTarget))(
            'should return true with a positive target $type .',
            ({ data }) => {
                const result = some.sync(data, test);
                expect(result).toBeTruthy();
            },
        );
        it.each(testSyncValues(negativeTarget))(
            'should return undefined with a negative target $type through pipe.',
            ({ data }) => {
                const result = pipe(data, some.sync(test));
                expect(result).toBeFalsy();
            },
        );
    });

    describe('async', () => {
        it.each(testAsyncValues(positiveTarget))(
            'should return true with a positive target $type .',
            async ({ data }) => {
                const result = some.async(data, test);
                expect(await result).toBeTruthy();
            },
        );
        it.each(testAsyncValues(negativeTarget))(
            'should return undefined with a negative target $type through pipe.',
            async ({ data }) => {
                const result = pipe(data, some.async(test));
                expect(await result).toBeFalsy();
            },
        );
        it.each(testAsyncValues(positiveTarget))(
            'should return true with a positive target $type by async operation.',
            async ({ data }) => {
                const result = some.async(data, asyncTest);
                expect(await result).toBeTruthy();
            },
        );
        it.each(testAsyncValues(negativeTarget))(
            'should return undefined with a negative target $type by async operation through pipe.',
            async ({ data }) => {
                const result = pipe(data, some.async(asyncTest));
                expect(await result).toBeFalsy();
            },
        );
    });
});
