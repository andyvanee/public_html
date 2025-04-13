import { $ } from 'bun'

process.chdir(import.meta.dirname)

const target = '../docs/aura'
const sources = ['index.html', 'favicon.svg', 'main.css', 'manifest.json', 'service-worker.js']
const assets = ['assets/aura-cover.jpeg']
const icons = [
    'icons/aura-icon.svg',
    'icons/icon-72x72.png',
    'icons/icon-96x96.png',
    'icons/icon-128x128.png',
    'icons/icon-144x144.png',
    'icons/icon-152x152.png',
    'icons/icon-192x192.png',
    'icons/icon-384x384.png',
    'icons/icon-512x512.png'
]

// Copy main source files
for (const source of sources) {
    await $`cp ${source} ${target}/${source}`
}

// Ensure assets directory exists and copy assets
await $`mkdir -p ${target}/assets`
for (const asset of assets) {
    await $`cp ${asset} ${target}/${asset}`
}

// Ensure icons directory exists and copy icons
await $`mkdir -p ${target}/icons`
for (const icon of icons) {
    await $`cp ${icon} ${target}/${icon}`
}

const build = await Bun.build({
    entrypoints: ['entrypoint.ts'],
    minify: true,
})

const entrypoint = build.outputs.at(0)

if (!(build.success && entrypoint)) {
    console.error(build.logs)
    process.exit(1)
}

await Bun.write(`${target}/entrypoint.js`, entrypoint)
