import { compose } from '../index.js';

describe('compose', () => {
    it('should compose two functions.', () => {
        const result = compose(
            (x: number) => x * 2,
            x => x.toString(),
        )(2);
        expect(result).toBe('4');
    });
    it('can compose even one function.', () => {
        const result = compose((x: number) => x * 2)(2);
        expect(result).toBe(4);
    });
});
