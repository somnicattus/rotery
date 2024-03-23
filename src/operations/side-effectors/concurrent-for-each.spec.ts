import { testAsyncValues } from '../../__test__/test-util.js';
import { concurrentForEach, pipe } from '../../index.js';
const size = 3;
const values1 = [1, 2, 3, 4, 5, 6];
const values2 = [1, 2, 3, 4, 5, 6, 7];
describe('concurrentForEach', () => {
    it.each(testAsyncValues(values1))(
        'should perform action for each values from $type.',
        async ({ data }) => {
            const result: number[] = [];
            await concurrentForEach(data, size, async x => {
                result.push(x);
                await Promise.resolve();
            });

            expect(result).toStrictEqual(values1);
        },
    );
    it.each(testAsyncValues(values2))(
        'should perform action for each values from $type.',
        async ({ data }) => {
            const result: number[] = [];
            await pipe(
                data,
                concurrentForEach(size, async x => {
                    result.push(x);
                    await Promise.resolve();
                }),
            );

            expect(result).toStrictEqual(values2);
        },
    );
});
