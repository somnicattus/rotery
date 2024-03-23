import { pipe } from '../../compositions/pipe.js';

describe('pipe', () => {
    it('should pipe into two functions.', () => {
        const result = pipe(
            2,
            x => x * 2,
            x => x.toString(),
        );
        expect(result).toBe('4');
    });
    it('can pipe into even one function.', () => {
        const result = pipe(2, x => x * 2);
        expect(result).toBe(4);
    });
});
