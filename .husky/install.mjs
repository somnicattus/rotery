// Skip Husky install in production and CI
if (process.env['NODE_ENV'] === 'production' || process.env['CI'] === 'true') {
    process.exit(0);
}
const { default: husky } = await import('husky');
// eslint-disable-next-line no-console -- this is configuration file
console.log(husky());
