// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- inferred type is more appropriate
export const _uniqueContext = <T>() => {
    const set = new Set<T>();
    return Object.assign((value: T) => (set.has(value) ? false : (set.add(value), true)), { set });
};
