import { _isIterable } from '../controls/_guards.js';
import type { Series } from '../controls/types.js';

/** Create a generator function from the given Node.js `stream.Duplex` instance. */
export const fromNodeDuplex = <T, U>(
    duplex: {
        write: (chunk: Awaited<T>) => void;
        end: () => void;
        destroy: (error?: Error) => void;
    } & AsyncIterable<U>,
) =>
    async function* (input: Series<T>): AsyncGenerator<U> {
        const awaited = await input;

        async function writeToDuplex(): Promise<void> {
            try {
                if (_isIterable(awaited)) {
                    for (const chunk of awaited) {
                        duplex.write(await chunk);
                    }
                } else {
                    for await (const chunk of awaited) {
                        duplex.write(chunk);
                    }
                }
                duplex.end();
            } catch (error) {
                // @ts-expect-error -- ignore type check
                duplex.destroy(error);
                // eslint-disable-next-line @typescript-eslint/only-throw-error -- ignore type check
                throw error;
            }
        }

        const writePromise = writeToDuplex();

        try {
            for await (const value of duplex) {
                yield value;
            }
        } catch (error) {
            // @ts-expect-error -- ignore type check
            duplex.destroy(error);
            // eslint-disable-next-line @typescript-eslint/only-throw-error -- ignore type check
            throw error;
        } finally {
            await writePromise;
            duplex.destroy();
        }
    };
