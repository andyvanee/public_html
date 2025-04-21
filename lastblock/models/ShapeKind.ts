/**
 * ShapeKind class representing the kind of block patterns
 * This class is responsible for the color and drawing pattern for blocks
 */

// Import sprites directly - will be bundled by Bun
import spriteData from '../assets/sprites/sprites.json'

// Sprite interface representing image data from the JSON file
interface Sprite {
    name: string
    base64: string
    width: number
    height: number
}

export class ShapeKind {
    name: string
    color: string
    private static spritesLoaded = false
    private static sprites: Record<string, Sprite> = {}
    private static spriteImages: Record<string, HTMLImageElement> = {}

    constructor(name: string, color: string) {
        this.name = name
        this.color = color
    }

    /**
     * Load sprites from the imported JSON data
     */
    private static async loadSprites(): Promise<void> {
        if (this.spritesLoaded) return

        try {
            // Use the directly imported sprite data instead of fetching
            const data = spriteData

            // Create a record of sprites by name for easy lookup
            data.sprites.forEach((sprite: Sprite) => {
                this.sprites[sprite.name] = sprite

                // Create HTMLImageElement for each sprite
                if (sprite.base64) {
                    // Only create an image if base64 data exists
                    const img = new Image()
                    img.src = `data:image/png;base64,${sprite.base64}`
                    this.spriteImages[sprite.name] = img
                }
            })

            this.spritesLoaded = true
        } catch (error) {
            console.error('Error loading sprites:', error)
            // If sprites fail to load, we'll fall back to drawing shapes with canvas
        }
    }

    /**
     * Get the sprite name for this ShapeKind
     */
    private getSpriteName(): string {
        switch (this.getPrimaryShapeType()) {
            case 'BarHorizontal':
                return 'bar_horizontal'
            case 'BarVertical':
                return 'bar_vertical'
            case 'Square':
                return 'square'
            case 'L':
                return 'l_shape'
            case 'T':
                return 't_shape'
            case 'Z':
                return 'z_shape'
            case 'Single':
                return 'single'
            default:
                return 'square' // Default fallback
        }
    }

    /**
     * Draw a symbol on the block face based on the shape type
     */
    async drawSymbolOnBlock(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): Promise<void> {
        // Make sure sprites are loaded
        await ShapeKind.loadSprites()

        const spriteName = this.getSpriteName()
        const sprite = ShapeKind.spriteImages[spriteName]

        // If we have a sprite image, draw it
        if (sprite && sprite.complete) {
            ctx.drawImage(sprite, x, y, size, size)
            return
        }

        // Fallback to drawing with canvas if sprites aren't available
        this.drawFallbackSymbol(ctx, x, y, size)
    }

    /**
     * Fallback method to draw symbols when sprites aren't available
     */
    private drawFallbackSymbol(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void {
        const borderPadding = size * 0.1
        const symbolPadding = size * 0.33
        const symbolSize = size - symbolPadding * 2

        // Calculate colors for the pattern
        const isLightColor = this.isLightColor(this.color)
        const lineColor = isLightColor ? this.darkenColor(this.color, 30) : this.lightenColor(this.color, 30)

        ctx.strokeStyle = lineColor
        ctx.fillStyle = lineColor
        ctx.lineWidth = 1.5

        // Draw decorative border (rectangle)
        ctx.strokeRect(x + borderPadding, y + borderPadding, size - borderPadding * 2, size - borderPadding * 2)

        // Add square dots around the border
        this.drawSquareDotsAround(ctx, x, y, size, borderPadding, lineColor)

        // Draw the main shape symbol (centered in middle 2/3)
        this.drawCenteredShapeSymbol(ctx, x, y, size, symbolPadding, lineColor)
    }

    /**
     * Draw square dots around the border (fallback)
     */
    private drawSquareDotsAround(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        size: number,
        borderPadding: number,
        color: string,
    ): void {
        ctx.fillStyle = color

        const dotSize = size * 0.05
        const spacing = size / 5
        const offset = borderPadding / 2

        // Draw dots along all four sides

        // Top edge
        for (let i = 0; i < 5; i++) {
            ctx.fillRect(x + borderPadding + i * spacing, y + borderPadding - offset, dotSize, dotSize)
        }

        // Bottom edge
        for (let i = 0; i < 5; i++) {
            ctx.fillRect(x + borderPadding + i * spacing, y + size - borderPadding - offset, dotSize, dotSize)
        }

        // Left edge
        for (let i = 0; i < 5; i++) {
            ctx.fillRect(x + borderPadding - offset, y + borderPadding + i * spacing, dotSize, dotSize)
        }

        // Right edge
        for (let i = 0; i < 5; i++) {
            ctx.fillRect(x + size - borderPadding - offset, y + borderPadding + i * spacing, dotSize, dotSize)
        }
    }

    /**
     * Draw the centered shape symbol (fallback)
     */
    private drawCenteredShapeSymbol(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        size: number,
        padding: number,
        color: string,
    ): void {
        const symbolX = x + padding
        const symbolY = y + padding
        const symbolSize = size - padding * 2

        ctx.fillStyle = color
        ctx.strokeStyle = color
        ctx.lineWidth = 2

        // Draw different symbols based on the primary shape category
        switch (this.getPrimaryShapeType()) {
            case 'BarHorizontal':
                // Draw a simple horizontal line
                ctx.beginPath()
                ctx.moveTo(symbolX, symbolY + symbolSize / 2)
                ctx.lineTo(symbolX + symbolSize, symbolY + symbolSize / 2)
                ctx.stroke()
                break

            case 'BarVertical':
                // Draw a simple vertical line
                ctx.beginPath()
                ctx.moveTo(symbolX + symbolSize / 2, symbolY)
                ctx.lineTo(symbolX + symbolSize / 2, symbolY + symbolSize)
                ctx.stroke()
                break

            case 'Square':
                // Draw a simple square
                ctx.strokeRect(symbolX, symbolY, symbolSize, symbolSize)
                break

            case 'L':
                // Draw a standard L symbol
                ctx.beginPath()
                ctx.moveTo(symbolX + symbolSize * 0.3, symbolY)
                ctx.lineTo(symbolX + symbolSize * 0.3, symbolY + symbolSize * 0.7)
                ctx.lineTo(symbolX + symbolSize, symbolY + symbolSize * 0.7)
                ctx.stroke()
                break

            case 'T':
                // Draw a standard T symbol
                ctx.beginPath()
                ctx.moveTo(symbolX, symbolY + symbolSize * 0.3)
                ctx.lineTo(symbolX + symbolSize, symbolY + symbolSize * 0.3)
                ctx.moveTo(symbolX + symbolSize / 2, symbolY + symbolSize * 0.3)
                ctx.lineTo(symbolX + symbolSize / 2, symbolY + symbolSize)
                ctx.stroke()
                break

            case 'Z':
                // Draw a standard Z symbol
                ctx.beginPath()
                ctx.moveTo(symbolX, symbolY + symbolSize * 0.3)
                ctx.lineTo(symbolX + symbolSize, symbolY + symbolSize * 0.3)
                ctx.lineTo(symbolX, symbolY + symbolSize * 0.7)
                ctx.lineTo(symbolX + symbolSize, symbolY + symbolSize * 0.7)
                ctx.stroke()
                break

            case 'Single':
                // Draw a circle
                ctx.beginPath()
                ctx.arc(symbolX + symbolSize / 2, symbolY + symbolSize / 2, symbolSize / 3, 0, Math.PI * 2)
                ctx.fill()
                break

            default:
                // Draw a circle for any other shapes
                ctx.beginPath()
                ctx.arc(symbolX + symbolSize / 2, symbolY + symbolSize / 2, symbolSize / 3, 0, Math.PI * 2)
                ctx.stroke()
        }
    }

    // Helper method to get the primary shape type from the name
    private getPrimaryShapeType(): string {
        // Horizontal bars (any width)
        if (
            (this.name.includes('Line') && !this.name.includes('Vertical')) ||
            (this.name.includes('Bar') && !this.name.includes('Vertical'))
        ) {
            return 'BarHorizontal'
        }

        // Vertical bars (any height)
        if (this.name.includes('Vertical')) {
            return 'BarVertical'
        }

        // All square variants
        if (this.name.includes('Square')) {
            return 'Square'
        }

        // All L-shapes
        if (this.name.includes('LShape') || this.name === 'SmallL' || this.name.includes('SmallL')) {
            return 'L'
        }

        // All T-shapes
        if (this.name.includes('TShape')) {
            return 'T'
        }

        // All Z-shapes
        if (this.name.includes('ZShape')) {
            return 'Z'
        }

        // 1x1 blocks
        if (this.name === 'Single') {
            return 'Single'
        }

        return 'Unknown'
    }

    // Helper method to lighten a color
    lightenColor(color: string, percent: number): string {
        const hex = color.replace('#', '')
        const r = parseInt(hex.substr(0, 2), 16)
        const g = parseInt(hex.substr(2, 2), 16)
        const b = parseInt(hex.substr(4, 2), 16)

        const lightenR = Math.min(Math.floor(r * (1 + percent / 100)), 255)
        const lightenG = Math.min(Math.floor(g * (1 + percent / 100)), 255)
        const lightenB = Math.min(Math.floor(b * (1 + percent / 100)), 255)

        return `rgb(${lightenR}, ${lightenG}, ${lightenB})`
    }

    // Helper method to darken a color
    darkenColor(color: string, percent: number): string {
        const hex = color.replace('#', '')
        const r = parseInt(hex.substr(0, 2), 16)
        const g = parseInt(hex.substr(2, 2), 16)
        const b = parseInt(hex.substr(4, 2), 16)

        const darkenR = Math.max(Math.floor(r * (1 - percent / 100)), 0)
        const darkenG = Math.max(Math.floor(g * (1 - percent / 100)), 0)
        const darkenB = Math.max(Math.floor(b * (1 - percent / 100)), 0)

        return `rgb(${darkenR}, ${darkenG}, ${darkenB})`
    }

    // Helper to check if a color is light
    isLightColor(color: string): boolean {
        const hex = color.replace('#', '')
        const r = parseInt(hex.substr(0, 2), 16)
        const g = parseInt(hex.substr(2, 2), 16)
        const b = parseInt(hex.substr(4, 2), 16)

        // Calculate perceived brightness
        const brightness = (r * 299 + g * 587 + b * 114) / 1000
        return brightness > 125
    }

    /**
     * Static mapping of shape kinds for quick access
     */
    private static kinds: Map<string, ShapeKind> = new Map()
    private static kindsByType: Map<string, ShapeKind> = new Map()

    /**
     * Get a ShapeKind instance by name
     */
    static getByName(name: string): ShapeKind {
        if (!this.kinds.has(name)) {
            // Try to get by primary type instead
            const tempKind = new ShapeKind(name, '#000000')
            const primaryType = tempKind.getPrimaryShapeType()

            if (this.kindsByType.has(primaryType)) {
                return this.kindsByType.get(primaryType)!
            }

            throw new Error(`ShapeKind ${name} not found`)
        }
        return this.kinds.get(name)!
    }

    /**
     * Register a new shape kind
     */
    static register(name: string, color: string, isPrimary: boolean = false): ShapeKind {
        const kind = new ShapeKind(name, color)
        this.kinds.set(name, kind)

        // If this is a primary type, store it in the types map
        if (isPrimary) {
            this.kindsByType.set(kind.getPrimaryShapeType(), kind)
        }

        return kind
    }

    /**
     * Get a shape kind by color
     */
    static getByColor(color: string): ShapeKind | undefined {
        for (const kind of this.kinds.values()) {
            if (kind.color === color) {
                return kind
            }
        }
        return undefined
    }

    /**
     * Initialize all the shape kinds with distinct colors for each shape type
     */
    static initialize(): void {
        if (this.kinds.size > 0) return // Already initialized

        // Register primary shape kinds with colors more reminiscent of Mayan stone artifacts

        // Horizontal bars (terracotta/clay color)
        this.register('Line', '#A45A3E', true) // Terracotta

        // Vertical bars (same as horizontal for consistency)
        this.register('LineVertical', '#A45A3E', true) // Terracotta

        // Square blocks (sandstone color)
        this.register('Square2x2', '#D2B48C', true) // Tan/Sandstone

        // T-Shapes (jade color)
        this.register('TShape', '#4E8975', true) // Jade Green

        // L-Shapes (stone gray-green)
        this.register('LShape', '#707C74', true) // Stone Gray-Green

        // Z-Shapes (clay red)
        this.register('ZShape', '#A74F45', true) // Clay Red

        // Single (turquoise)
        this.register('Single', '#4AB3A0', true) // Turquoise

        // Register all other variants to map to the primary types
        // Horizontal bars
        this.register('Line2', '#A45A3E')
        this.register('Line3', '#A45A3E')
        this.register('Line5', '#A45A3E')

        // Vertical bars
        this.register('LineVertical2', '#A45A3E')
        this.register('LineVertical3', '#A45A3E')
        this.register('LineVertical5', '#A45A3E')

        // Larger square
        this.register('Square3x3', '#D2B48C')

        // T-Shape variants
        this.register('TShapeFlipped', '#4E8975')
        this.register('TShapeRight', '#4E8975')
        this.register('TShapeLeft', '#4E8975')

        // L-Shape variants
        this.register('LShapeRight', '#707C74')
        this.register('LShapeUpside', '#707C74')
        this.register('LShapeLeft', '#707C74')
        this.register('SmallL', '#707C74')
        this.register('SmallLRight', '#707C74')
        this.register('SmallLUpside', '#707C74')
        this.register('SmallLLeft', '#707C74')

        // Z-Shape variants
        this.register('ZShapeReflected', '#A74F45')
        this.register('ZShapeVertical', '#A74F45')
        this.register('ZShapeVerticalReflected', '#A74F45')

        // Start loading the sprites
        this.loadSprites()
    }
}
