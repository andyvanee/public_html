import { $ } from 'bun'

$.cwd(import.meta.dirname)
await $`bun run aura/index.ts`
await $`bun run lastblock/index.ts`

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

console.log(`Server running at http://localhost:${server.port}`)
