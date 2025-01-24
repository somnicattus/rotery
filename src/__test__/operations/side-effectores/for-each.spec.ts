import { forEach, pipe } from '../../../index.js';
import { testAsyncValues, testSyncValues } from '../../test-util.js';
const values = [1, 2, 3];
const action = (value: number): void => {
    result.push(value * 2);
};
const asyncAction = async (v: number): Promise<void> => {
    action(v);
    await Promise.resolve();
};
const expectation = [2, 4, 6];
let result: number[] = [];
beforeEach(() => {
    result = [];
});
describe('forEach', () => {
    describe('sync', () => {
        it.each(testSyncValues(values))('should perform side effect with $type.', ({ data }) => {
            forEach.sync(data, action);
            expect(result).toStrictEqual(expectation);
        });
        it.each(testSyncValues(values))(
            'should perform side effect with $type through pipe.',
            ({ data }) => {
                pipe(data, forEach.sync(action));
                expect(result).toStrictEqual(expectation);
            },
        );
    });

    describe('async', () => {
        it.each(testAsyncValues(values))(
            'should perform side effect with $type.',
            async ({ data }) => {
                await forEach.async(data, action);
                expect(result).toStrictEqual(expectation);
            },
        );
        it.each(testAsyncValues(values))(
            'should perform side effect with $type through pipe.',
            async ({ data }) => {
                await pipe(data, forEach.async(action));
                expect(result).toStrictEqual(expectation);
            },
        );
        it.each(testAsyncValues(values))(
            'should perform async side effect with $type.',
            async ({ data }) => {
                await forEach.async(data, asyncAction);
                expect(result).toStrictEqual(expectation);
            },
        );
        it.each(testAsyncValues(values))(
            'should perform async side effect with $type through pipe.',
            async ({ data }) => {
                await pipe(data, forEach.async(asyncAction));
                expect(result).toStrictEqual(expectation);
            },
        );
    });
});
