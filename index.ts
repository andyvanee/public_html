import { watch } from 'fs'
import { $ } from 'bun'

$.cwd(import.meta.dirname)

// List of projects to build and watch
const projects = ['lastblock', 'aura']

// Initial builds
console.log('Running initial builds...')
for (const project of projects) {
    console.log(`Building ${project}...`)
    try {
        await $`cd ${project} && make`
    } catch (error) {
        console.error(`Error in ${project} build: ${error}`)
    }
}

const port = parseInt(process.env.PORT || '3000')

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

console.log(`Server running at http://localhost:${server.port}`)
