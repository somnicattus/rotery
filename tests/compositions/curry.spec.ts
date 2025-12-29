import { curry } from '../../src/index.js';

const fn = (x: number, y: number, z: number): [number, number, number] => [x, y, z];
const expectation = [1, 2, 3];

describe('curry', () => {
    it('should curry by one level deep without specified nth.', () => {
        const result = curry(fn)(2, 3)(1);
        expect(result).toStrictEqual(expectation);
    });
    it('should curry by specified one level deep.', () => {
        const result = curry(fn, 1)(2, 3)(1);
        expect(result).toStrictEqual(expectation);
    });
    it('should curry by specified two levels deep.', () => {
        const result = curry(fn, 2)(3)(2)(1);
        expect(result).toStrictEqual(expectation);
    });
    it('should curry function with optional parameters.', () => {
        const result = curry((x: number, y: number, z?: number) => [x, y, z ?? 0])(2)(1);
        expect(result).toStrictEqual([1, 2, 0]);
    });
    it('should curry function with rest parameters.', () => {
        const result = curry((x: number, y: number, ...z: number[]) => [x, y, ...z], 4)(5, 6)(4)(3)(
            2,
        )(1);
        expect(result).toStrictEqual([1, 2, 3, 4, 5, 6]);
    });
});
