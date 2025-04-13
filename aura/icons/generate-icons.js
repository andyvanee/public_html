// This is a simple script to generate PNG icons from our SVG
// You can run it with: node generate-icons.js
// It requires the 'sharp' package

const fs = require('fs')
const sharp = require('sharp')
const path = require('path')

const sizes = [72, 96, 128, 144, 152, 192, 384, 512]
const svgPath = path.join(__dirname, 'aura-icon.svg')
const svgBuffer = fs.readFileSync(svgPath)

async function generateIcons() {
    console.log('Generating icons from SVG...')

    for (const size of sizes) {
        const outputPath = path.join(__dirname, `icon-${size}x${size}.png`)

        try {
            await sharp(svgBuffer).resize(size, size).png().toFile(outputPath)

            console.log(`Created icon: ${outputPath}`)
        } catch (error) {
            console.error(`Error creating ${size}x${size} icon:`, error)
        }
    }

    console.log('Icon generation complete!')
}

generateIcons()
