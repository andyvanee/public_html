import { $, ShellError } from 'bun'
import { generateIcons } from './icons/generate-icons'

process.chdir(import.meta.dirname)

const target = '../docs/lastblock'
const sources = ['index.html', 'favicon.svg', 'main.css', 'manifest.json', 'service-worker.js']
const icons = [
    'icons/lastblock-icon.svg',
    'icons/icon-72x72.png',
    'icons/icon-96x96.png',
    'icons/icon-128x128.png',
    'icons/icon-144x144.png',
    'icons/icon-152x152.png',
    'icons/icon-192x192.png',
    'icons/icon-384x384.png',
    'icons/icon-512x512.png',
]

// Generate icon files first
try {
    await generateIcons()
    console.log('Icon generation completed successfully')
} catch (e) {
    console.error('Error generating icons:', e)
    process.exit(1)
}

try {
    await $`mkdir -p ${target}`

    // Copy main source files
    for (const source of sources) {
        await $`cp ${source} ${target}/${source}`
    }

    // Ensure icons directory exists and copy icons
    await $`mkdir -p ${target}/icons`
    for (const icon of icons) {
        await $`cp ${icon} ${target}/${icon}`
    }
} catch (e) {
    if (e instanceof ShellError) {
        console.error(e.stderr.toString())
    } else {
        console.error('Error creating target directory or copying files:', e)
    }
    process.exit(1)
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

console.log(`Build successful! Files copied to ${target}.`)
