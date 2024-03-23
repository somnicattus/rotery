import { purry } from '../../index.js';

const fn = (x: number, y: number, z: number): [number, number, number] => [x, y, z];
describe('purry', () => {
    it('should purry by one level deep without specified nth.', () => {
        const result1 = purry(fn)(2, 3)(1);
        expect(result1).toStrictEqual([1, 2, 3]);
        const result2 = purry(fn)(1, 2, 3);
        expect(result2).toStrictEqual([1, 2, 3]);
    });
});
