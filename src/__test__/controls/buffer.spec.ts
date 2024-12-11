import * as R from 'remeda';

import { accumulate, buffer } from '../../index.js';
import { testAsyncValues } from '../test-util.js';

const sleep = async (msec: number): Promise<void> => {
    await new Promise<void>(resolve =>
        setTimeout(() => {
            resolve();
        }, msec),
    );
};

describe('buffer', () => {
    describe('input types', () => {
        const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const expectation = values;
        it.each(testAsyncValues(values))(
            'should buffer $type into async iterator.',
            async ({ data }) => {
                const result = buffer(data, { size: 3 });
                expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
                expect(R.sortBy(await accumulate.async(result), R.identity())).toStrictEqual(
                    expectation,
                );
            },
        );
    });

    describe('generation order', () => {
        const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const shuffled = R.shuffle(values);

        it('should generate values in resolved order', async () => {
            const input = shuffled.map(async v => {
                await sleep(v * 5);
                return v;
            });

            const result = buffer(input, { size: 10 });

            expect(await accumulate.async(result)).toStrictEqual(values);
        });

        it('should generate values in input order with fifo mode.', async () => {
            const input = shuffled.map(async v => {
                await sleep(v * 5);
                return v;
            });

            const result = buffer(input, { size: 10, mode: 'fifo' });

            expect(await accumulate.async(result)).toStrictEqual(shuffled);
        });
    });

    describe('error handling', () => {
        it('should throw error when input promise rejects', async () => {
            const input = [Promise.reject(new Error('test error'))];

            const result = buffer(input, { size: 10 });

            await expect(async () => await accumulate.async(result)).rejects.toBeInstanceOf(Error);
        });
    });
});
