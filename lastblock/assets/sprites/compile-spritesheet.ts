// This script slices a spritesheet image into individual sprites and saves them as base64 data in a JSON file
// Run with: bun run compile-spritesheet.ts

import * as fs from 'fs'
import * as path from 'path'
import sharp from 'sharp'

// Configuration for the spritesheet
interface SpriteConfig {
    name: string
    x: number
    y: number
    width: number
    height: number
}

// Define the sprite regions to extract from the spritesheet
// The spritesheet is expected to have 7 64x64 tiles in a row
const sprites: SpriteConfig[] = [
    { name: 'bar_horizontal', x: 0, y: 0, width: 64, height: 64 },
    { name: 'bar_vertical', x: 64, y: 0, width: 64, height: 64 },
    { name: 'square', x: 128, y: 0, width: 64, height: 64 },
    { name: 'l_shape', x: 192, y: 0, width: 64, height: 64 },
    { name: 't_shape', x: 256, y: 0, width: 64, height: 64 },
    { name: 'z_shape', x: 320, y: 0, width: 64, height: 64 },
    { name: 'single', x: 384, y: 0, width: 64, height: 64 },
]

// Output data structure
interface SpriteData {
    name: string
    base64: string
    width: number
    height: number
}

/**
 * Extract sprites from the spritesheet and convert to base64 data
 */
async function compileSpritesheet(): Promise<void> {
    console.log('Compiling spritesheet...')

    const spritesheetPath = path.join(__dirname, 'spritesheet.png')
    const outputPath = path.join(__dirname, 'sprites.json')

    if (!fs.existsSync(spritesheetPath)) {
        console.error(`Error: Spritesheet not found at ${spritesheetPath}`)
        console.log('Please create a spritesheet image before running this script.')
        return
    }

    try {
        const result: { sprites: SpriteData[] } = { sprites: [] }

        // Process each sprite
        for (const sprite of sprites) {
            console.log(`Processing sprite: ${sprite.name}`)

            // Extract the region
            const buffer = await sharp(spritesheetPath)
                .extract({
                    left: sprite.x,
                    top: sprite.y,
                    width: sprite.width,
                    height: sprite.height,
                })
                .png()
                .toBuffer()

            // Convert to base64
            const base64Data = buffer.toString('base64')

            // Add to result
            result.sprites.push({
                name: sprite.name,
                base64: base64Data,
                width: sprite.width,
                height: sprite.height,
            })
        }

        // Write the result to the output file
        fs.writeFileSync(outputPath, JSON.stringify(result, null, 2))
        console.log(`Sprites extracted and saved to ${outputPath}`)
    } catch (error) {
        console.error('Error compiling spritesheet:', error)
    }
}

// Execute the function if this script is run directly
if (require.main === module) {
    compileSpritesheet().catch((error) => {
        console.error('Spritesheet compilation failed:', error)
        process.exit(1)
    })
}

export { compileSpritesheet }
