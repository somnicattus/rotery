import { $, nanoseconds } from 'bun';

await $`rm -r dist`;
console.log('Cleaned dist directory.');

const build = await Promise.all([
    $`bun run build:esm`.quiet(),
    $`bun run build:cjs`.quiet(),
    $`bun run build:types:esm`.quiet(),
    $`bun run build:types:cjs`.quiet(),
]);
const text = build
    .map(b => b.text())
    .filter(Boolean)
    .join('\n');
if (text) console.log(text);
if (build.some(b => b.exitCode !== 0)) {
    console.error('Build failed.');
    process.exit(1);
}
console.log('Build completed successfully.');

const copyPackageJson = await $`cp package.cjs.json dist/cjs/package.json`;

if (copyPackageJson.exitCode !== 0) {
    console.error('Failed to copy package.cjs.json to dist/cjs/package.json.');
    process.exit(1);
}
console.log('Copied package.cjs.json to dist/cjs/package.json.');
console.log(`All tasks completed successfully in ${(nanoseconds() / 1e9).toFixed(2)} seconds.`);
