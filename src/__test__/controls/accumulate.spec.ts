import { accumulate } from '../../index.js';
import { testAsyncValues, testSyncValues } from '../test-util.js';
const values = [1, 2, 3];
const expectation = values;
describe('accumulate', () => {
    describe('sync', () => {
        it.each(testSyncValues(values))('should accumulate $type into array.', ({ data }) => {
            const result = accumulate.sync(data);
            expect(result).toStrictEqual(expectation);
        });
    });

    describe('async', () => {
        it.each(testAsyncValues(values))(
            'should accumulate $type into promise of array.',
            async ({ data }) => {
                const result = accumulate.async(data);
                expect(result).toBeInstanceOf(Promise);
                expect(await result).toStrictEqual(expectation);
            },
        );
    });
});
