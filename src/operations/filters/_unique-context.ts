export const _uniqueContext = <T>() => {
    const set = new Set<T>();
    // biome-ignore lint/complexity/noCommaOperator: comma operator for side effect
    return Object.assign((value: T) => (set.has(value) ? false : (set.add(value), true)), { set });
};
