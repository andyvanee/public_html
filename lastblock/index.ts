import { $, ShellError } from 'bun'

process.chdir(import.meta.dirname)

const target = '../docs/lastblock'
const sources = ['index.html', 'favicon.svg', 'main.css']

try {
    await $`mkdir -p ${target}`

    for (const source of sources) {
        await $`cp ${source} ${target}/${source}`
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
