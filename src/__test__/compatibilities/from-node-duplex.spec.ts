import { createGunzip, createGzip } from 'node:zlib';

import { toArray } from '../../controls/accumulate.js';
import { fromNodeDuplex } from '../../index.js';
import { testAsyncValues } from '../test-util.js';

const input = ['hello', 'world'];
const expectedOutput = 'helloworld';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- allow type inference
const getGenerators = () => {
    const gzip = createGzip();
    const gunzip = createGunzip();
    const gzipGenerator = fromNodeDuplex(gzip as typeof gzip & AsyncIterable<Buffer>);
    const gunzipGenerator = fromNodeDuplex(gunzip as typeof gunzip & AsyncIterable<Buffer>);
    return { gzip, gunzip, gzipGenerator, gunzipGenerator } as const;
};

describe('fromNodeDuplex', () => {
    it.each(testAsyncValues(input))(
        'should correctly process data through a gzip stream with $type',
        async ({ data }) => {
            const { gzipGenerator, gunzipGenerator } = getGenerators();

            const compressed = gzipGenerator(data);
            const decompressed = gunzipGenerator(compressed);

            const result = await toArray.async(decompressed);

            expect(result.join()).toEqual(expectedOutput);
        },
    );

    it('should handle errors in upstream process correctly', async () => {
        const { gzip, gunzip, gzipGenerator, gunzipGenerator } = getGenerators();

        // Simulate an error in the gzip stream
        gzip.destroy(new Error('Test error'));

        const compressed = gzipGenerator(input);
        const decompressed = gunzipGenerator(compressed);

        await expect(toArray.async(decompressed)).rejects.toThrow('Test error');
        expect(gzip.destroyed).toBe(true);
        expect(gunzip.destroyed).toBe(true);
    });

    it('should handle errors in downstream process correctly', async () => {
        const { gzip, gunzip, gzipGenerator, gunzipGenerator } = getGenerators();

        // Simulate an error in the gunzip stream
        gunzip.destroy(new Error('Test error'));

        const compressed = gzipGenerator(input);
        const decompressed = gunzipGenerator(compressed);

        await expect(toArray.async(decompressed)).rejects.toThrow('Test error');
        expect(gzip.destroyed).toBe(true);
        expect(gunzip.destroyed).toBe(true);
    });
});
