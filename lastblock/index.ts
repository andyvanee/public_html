import { $, ShellError } from 'bun'
import { generateIcons } from './icons/generate-icons'
import * as fs from 'fs'
import * as path from 'path'

process.chdir(import.meta.dirname)

// Generate a timestamp-based version for cache busting
const buildVersion = Date.now().toString()
console.log(`Build version: ${buildVersion}`)

const target = '../docs/lastblock'
const sources = ['favicon.svg', 'main.css', 'manifest.json', 'service-worker.js']
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

    // Special handling for HTML file with cache-busting URLs
    const htmlContent = fs.readFileSync('index.html', 'utf8')

    // Add version parameter to script and CSS references
    const updatedHtml = htmlContent
        .replace(/main\.css(\?v=[\d]+)?/g, `main.css?v=${buildVersion}`)
        .replace(/entrypoint\.js(\?v=[\d]+)?/g, `entrypoint.js?v=${buildVersion}`)
        .replace(/service-worker\.js(\?v=[\d]+)?/g, `service-worker.js?v=${buildVersion}`)
        .replace(/manifest\.json(\?v=[\d]+)?/g, `manifest.json?v=${buildVersion}`)

    fs.writeFileSync(path.join(target, 'index.html'), updatedHtml)

    // Also update service worker to include version
    const swContent = fs.readFileSync('service-worker.js', 'utf8')
    const updatedSw = swContent.replace(
        /const CACHE_NAME = ['"]lastblock-cache-v\d+['"]/g,
        `const CACHE_NAME = 'lastblock-cache-v${buildVersion}'`,
    )

    fs.writeFileSync(path.join(target, 'service-worker.js'), updatedSw)

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

console.log(`Build successful! Files copied to ${target} with version ${buildVersion}.`)
