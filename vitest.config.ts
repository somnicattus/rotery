import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: ['src/**/*.spec.ts'],
        globals: true,
        reporters: ['default', 'html'],
        outputFile: {
            html: 'report/report.html',
        },
        coverage: {
            include: ['src/**/*'],
            exclude: ['src/**/*.bench.ts', 'src/test/**/*'],
            enabled: true,
            reportsDirectory: 'report/coverage',
            reporter: ['text', 'html'],
        },
        benchmark: {
            include: ['**/*.bench.ts'],
        },
    },
});
