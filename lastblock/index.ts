import { $ } from 'bun'
import fs from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'

process.chdir(import.meta.dirname)

const OUTPUT_DIR = '../docs/lastblock'
const BUILD_VERSION = Date.now().toString()

// Ensure output directory exists
async function ensureDir(dirPath: string) {
    if (!existsSync(dirPath)) {
        await fs.mkdir(dirPath, { recursive: true })
    }
}

async function generateIcons() {
    console.log('Generating icons...')
    await $`bun run ./icons/generate-icons.ts`
}

async function copyStatic(files: string[]) {
    console.log('Copying static files...')
    await ensureDir(OUTPUT_DIR)
    await ensureDir(path.join(OUTPUT_DIR, 'icons'))

    // Copy specified static files
    for (const file of files) {
        await fs.copyFile(file, path.join(OUTPUT_DIR, path.basename(file)))
    }

    // Copy icon files
    const iconFiles = await fs.readdir('./icons')
    for (const file of iconFiles.filter((f) => f.endsWith('.png') || f.endsWith('.svg'))) {
        await fs.copyFile(path.join('./icons', file), path.join(OUTPUT_DIR, 'icons', file))
    }
}

async function copyHtml(files: string[]) {
    console.log('Processing HTML with cache busting...')
    await ensureDir(OUTPUT_DIR)

    for (const file of files) {
        let content = await fs.readFile(file, 'utf8')

        // Add cache busting parameters
        content = content
            .replace(/main\.css(\?v=[0-9]*){0,1}/g, `main.css?v=${BUILD_VERSION}`)
            .replace(/entrypoint\.js(\?v=[0-9]*){0,1}/g, `entrypoint.js?v=${BUILD_VERSION}`)
            .replace(/service-worker\.js(\?v=[0-9]*){0,1}/g, `service-worker.js?v=${BUILD_VERSION}`)
            .replace(/manifest\.json(\?v=[0-9]*){0,1}/g, `manifest.json?v=${BUILD_VERSION}`)

        await fs.writeFile(path.join(OUTPUT_DIR, path.basename(file)), content)
    }

    // Process service worker with cache version
    if (existsSync('./service-worker.js')) {
        let swContent = await fs.readFile('./service-worker.js', 'utf8')
        swContent = swContent.replace(
            /const CACHE_NAME = .*/g,
            `const CACHE_NAME = "lastblock-cache-v${BUILD_VERSION}";`,
        )
        await fs.writeFile(path.join(OUTPUT_DIR, 'service-worker.js'), swContent)
    }
}

async function bundleJs(files: string[]) {
    console.log('Bundling JavaScript...')
    await ensureDir(OUTPUT_DIR)

    for (const file of files) {
        await $`bun build ${file} --outdir ${OUTPUT_DIR} --minify`
    }
}

async function clean() {
    console.log('Cleaning output directory...')
    if (existsSync(OUTPUT_DIR)) {
        await fs.rm(OUTPUT_DIR, { recursive: true })
    }
}

async function runAll() {
    await clean()
    await generateIcons()
    await copyStatic(['favicon.svg', 'main.css', 'manifest.json', 'service-worker.js'])
    await copyHtml(['index.html'])
    await bundleJs(['entrypoint.ts'])
}

// Parse command line arguments
const args = process.argv.slice(2)
const command = args[0]
const commandArgs = args.slice(1)

// Execute the specified command
try {
    switch (command) {
        case 'icons':
            await generateIcons()
            break
        case 'copy-static':
            await copyStatic(
                commandArgs.length > 0
                    ? commandArgs
                    : ['favicon.svg', 'main.css', 'manifest.json', 'service-worker.js'],
            )
            break
        case 'copy-html':
            await copyHtml(commandArgs.length > 0 ? commandArgs : ['index.html'])
            break
        case 'bundle-js':
            await bundleJs(commandArgs.length > 0 ? commandArgs : ['entrypoint.ts'])
            break
        case 'clean':
            await clean()
            break
        default:
            // Run all build steps if no specific command is provided
            await runAll()
            break
    }

    console.log('Build task completed successfully')
} catch (e) {
    console.error('Build failed:', e)
    process.exit(1)
}
