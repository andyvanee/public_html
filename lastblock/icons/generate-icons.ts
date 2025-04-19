// This is a TypeScript script to generate PNG icons from our SVG
// You can run it with: bun run generate-icons

import * as fs from 'fs'
import * as path from 'path'
import sharp from 'sharp'

const sizes: number[] = [72, 96, 128, 144, 152, 192, 384, 512]
const svgPath: string = path.join(__dirname, 'lastblock-icon.svg')
const svgBuffer: Buffer = fs.readFileSync(svgPath)

async function generateIcons(): Promise<void> {
    console.log('Generating icons from SVG...')

    for (const size of sizes) {
        const outputPath: string = path.join(__dirname, `icon-${size}x${size}.png`)

        try {
            await sharp(svgBuffer).resize(size, size).png().toFile(outputPath)

            console.log(`Created icon: ${outputPath}`)
        } catch (error) {
            console.error(`Error creating ${size}x${size} icon:`, error)
        }
    }

    console.log('Icon generation complete!')
}

// Execute the function if this script is run directly
if (require.main === module) {
    generateIcons().catch((error) => {
        console.error('Icon generation failed:', error)
        process.exit(1)
    })
}

export { generateIcons }
