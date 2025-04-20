import { watch } from 'fs'
import { $ } from 'bun'

$.cwd(import.meta.dirname)

// List of projects to build and watch
const projects = ['lastblock', 'aura', 'shortest-path']

// Function to build a single project
async function buildProject(project: string) {
    console.log(`Building ${project}...`)
    try {
        await $`cd ${project} && make`
        return true
    } catch (error) {
        console.error(`Error in ${project} build: ${error}`)
        return false
    }
}

// Function to lint a single project
async function lintProject(project: string) {
    console.log(`Linting ${project}...`)
    try {
        // Run tsc in noEmit mode to check for TypeScript errors
        const result = await $`cd ${project} && bun x tsc --noEmit`
        console.log(`✓ ${project} - No TypeScript errors found.`)
        return true
    } catch (error) {
        console.error(`✗ ${project} - TypeScript errors found:`)
        console.error(error.stderr || error)
        return false
    }
}

// Build all projects
async function buildAll() {
    console.log('Running builds for all projects...')
    const results = await Promise.all(projects.map(buildProject))
    const successful = results.filter((result) => result).length
    console.log(`Build completed: ${successful}/${projects.length} projects built successfully`)
}

// Lint all projects
async function lintAll() {
    console.log('Checking TypeScript in all projects...')
    const results = await Promise.all(projects.map(lintProject))
    const successful = results.filter((result) => result).length

    if (successful === projects.length) {
        console.log(`✅ All projects (${successful}/${projects.length}) passed TypeScript checks!`)
        return true
    } else {
        console.error(`❌ Some projects failed TypeScript checks: ${successful}/${projects.length} passed.`)
        return false
    }
}

// Setup the development server
function setupServer(port: number = 3000) {
    console.log(`Setting up server on port ${port}...`)

    const fouroFour = () => new Response('Not Found', { status: 404 })

    const server = Bun.serve({
        port,
        async fetch(request) {
            const pathname = new URL(request.url, `http://localhost`).pathname
            const route = pathname.replace(/\/$/, '/index.html')
            try {
                const file = Bun.file(`docs${route}`)
                if (await file.exists()) {
                    return new Response(file)
                }
                return fouroFour()
            } catch (e) {
                return fouroFour()
            }
        },
    })

    console.log(`Server running at http://localhost:${server.port}`)
    return server
}

// Setup file watching for projects
function setupWatchers() {
    console.log('Setting up file watchers...')

    // Get file extensions to watch
    const watchExtensions = ['.ts', '.js', '.html', '.css', '.json', '.svg']

    // Set up watchers for all projects
    for (const project of projects) {
        watch(`./${project}`, { recursive: true }, async (event, filename) => {
            if (!filename) return

            // Check if the file matches any of the watch extensions
            if (!watchExtensions.some((ext) => filename.endsWith(ext))) {
                return
            }

            console.log(`File changed in ${project}: ${filename}`)

            try {
                await $`cd ${project} && make`
            } catch (error) {
                console.error(`Error in ${project} build: ${error}`)
            }
        })

        console.log(`Watching ${project} for changes...`)
    }
}

// Parse command line arguments
const args = process.argv.slice(2)
const command = args[0] || 'serve'
const port = parseInt(process.env.PORT || '3000')

// Execute the specified command
async function main() {
    try {
        switch (command) {
            case 'build':
                await buildAll()
                break

            case 'lint':
                const lintSuccess = await lintAll()
                if (!lintSuccess) {
                    process.exit(1)
                }
                break

            case 'serve':
                // Build all projects first
                await buildAll()
                // Setup the server
                setupServer(port)
                // Setup file watchers
                setupWatchers()
                break

            case 'watch':
                // Only setup watchers without server
                setupWatchers()
                break

            default:
                console.log(`
Unknown command: ${command}
Available commands:
  build   - Build all projects
  lint    - Check TypeScript files in all projects for errors
  serve   - Build all projects, start the server, and watch for changes
  watch   - Only watch for changes without starting the server
                `)
                process.exit(1)
        }
    } catch (error) {
        console.error('Error:', error)
        process.exit(1)
    }
}

main()
