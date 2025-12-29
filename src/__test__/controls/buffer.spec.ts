import { promisify } from 'node:util';

import * as R from 'remeda';

import { accumulate, buffer } from '../../index.js';
import { testAsyncValues } from '../test-util.js';

const sleep = promisify(
    (arg1: Parameters<typeof setTimeout>[1], callback: Parameters<typeof setTimeout>[0]) => {
        setTimeout(callback, arg1);
    },
);

describe('buffer', () => {
    describe('input types', () => {
        const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const expectation = values;
        it.each(testAsyncValues(values))('should buffer $type into async iterator.', async ({
            data,
        }) => {
            const result = buffer(data, { size: 3 });
            expect(result[Symbol.asyncIterator]).toBeTypeOf('function');
            expect(R.sortBy(await accumulate.async(result), R.identity())).toStrictEqual(
                expectation,
            );
        });
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

            let error: unknown = null;
            try {
                await accumulate.async(result);
            } catch (err) {
                error = err;
            }
            expect(error).toBeInstanceOf(Error);
        });
    });

    describe('validation', () => {
        it.each(
            ([-1, 1.5, Infinity, NaN] as number[]).map(size => ({ size })),
        )('should throw RangeError if the size is not positive integer (size: $size)', async ({
            size,
        }) => {
            let error: unknown = null;
            try {
                await accumulate.async(buffer([1, 2, 3], { size }));
            } catch (err) {
                error = err;
            }
            expect(error).toBeInstanceOf(RangeError);
        });
    });
});
