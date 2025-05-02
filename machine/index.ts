import { $ } from 'bun'

Bun.build({
    entrypoints: ['./entrypoint.ts', './kernel.ts'],
    outdir: '../docs/machine/',
    format: 'esm',
    target: 'browser',
    minify: true,
})

await $`cp index.html main.css favicon.svg ../docs/machine/`
