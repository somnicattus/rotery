// Skip Husky install in production and CI
if (process.env['NODE_ENV'] === 'production' || process.env['CI'] === 'true') {
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(0);
}
const { default: husky } = await import('husky');
console.log(husky());
