import { config } from '../config/gameConfig'
import { Shape } from '../models/Shape'
import { ShapeKind } from '../models/ShapeKind'

// Block class to represent tetromino pieces
export class Block {
    shape: boolean[][]
    shapeKind: ShapeKind
    x: number
    y: number
    isAvailable: boolean
    shapeName: string
    scaleFactor!: number

    constructor(shape?: boolean[][], position?: number, color?: string) {
        this.x = 0
        this.y = 0
        this.isAvailable = true

        // If shape is provided, use it, otherwise get a random one
        if (shape) {
            this.shape = shape
            this.shapeName = 'custom'
            // Use provided color or default to a random color
            if (color) {
                // Try to find a ShapeKind with this color or create a generic one
                this.shapeKind = ShapeKind.getByColor(color) || new ShapeKind('custom', color)
            } else {
                // Pick a random color from config
                const randomColor = config.colors[Math.floor(Math.random() * config.colors.length)]
                this.shapeKind = new ShapeKind('custom', randomColor)
            }
        } else {
            // Get a random shape from the Shape class
            const randomShape = Shape.random()
            this.shape = randomShape.pattern
            this.shapeName = randomShape.name
            // Use the ShapeKind from the Shape class
            this.shapeKind = randomShape.kind
        }

        if (position !== undefined) {
            // Position this piece in the available pieces area
            const canvasWidth = config.gridSize * config.cellSize

            // Get piece dimensions and calculate the scale factor for large pieces
            const pieceWidth = this.shape[0].length
            const pieceHeight = this.shape.length

            // Determine if this is a large piece that needs scaling
            // We'll scale down pieces that are wider than 4 tiles
            const maxNormalWidth = 4
            const scaleFactor = pieceWidth > maxNormalWidth ? maxNormalWidth / pieceWidth : 1

            // Apply the scale factor to the effective cell size for this piece
            const effectiveCellSize = config.cellSize * scaleFactor

            // Calculate the scaled piece dimensions
            const scaledPieceWidth = pieceWidth * effectiveCellSize
            const scaledPieceHeight = pieceHeight * effectiveCellSize

            // Calculate the x position based on the piece's index
            const spacing = canvasWidth / config.maxAvailablePieces
            this.x = spacing / 2 - scaledPieceWidth / 2 + position * spacing

            // Calculate the y position (bottom area of the canvas)
            const gridHeight = config.gridSize * config.cellSize
            this.y = gridHeight + config.pieceAreaHeight / 2 - scaledPieceHeight / 2

            // Store the scale factor as a property so render() can use it
            this.scaleFactor = scaleFactor
        }
    }

    /**
     * Get the color of this block
     */
    get color(): string {
        return this.shapeKind.color
    }

    generateRandomShape(): boolean[][] {
        // Use the Shape namespace to get a random shape pattern
        return Shape.randomPattern()
    }

    contains(px: number, py: number): boolean {
        const cellSize = config.cellSize * (this.scaleFactor || 1)

        // Calculate the boundaries of this piece
        const left = this.x
        const right = this.x + this.shape[0].length * cellSize
        const top = this.y
        const bottom = this.y + this.shape.length * cellSize

        // Check if the point is within the rough boundaries
        if (px >= left && px < right && py >= top && py < bottom) {
            // Calculate the specific cell
            const cellX = Math.floor((px - this.x) / cellSize)
            const cellY = Math.floor((py - this.y) / cellSize)

            // Make sure the cell coordinates are valid
            if (cellX >= 0 && cellX < this.shape[0].length && cellY >= 0 && cellY < this.shape.length) {
                // Return true only if this cell is filled
                return this.shape[cellY][cellX]
            }
        }

        return false
    }

    render(ctx: CanvasRenderingContext2D): void {
        const cellSize = config.cellSize * (this.scaleFactor || 1)

        for (let y = 0; y < this.shape.length; y++) {
            for (let x = 0; x < this.shape[y].length; x++) {
                if (this.shape[y][x]) {
                    const pixelX = this.x + x * cellSize
                    const pixelY = this.y + y * cellSize

                    // Draw with 3D effect similar to concept art
                    this.drawBlockWithEffect(ctx, pixelX, pixelY, cellSize)
                }
            }
        }
    }

    // Method to draw a block with 3D effect
    drawBlockWithEffect(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void {
        // Main block face
        ctx.fillStyle = this.color
        ctx.fillRect(x, y, size, size)

        // Draw top highlight (bevel effect)
        ctx.fillStyle = this.lightenColor(this.color, 15)
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + size, y)
        ctx.lineTo(x + size - 4, y + 4)
        ctx.lineTo(x + 4, y + 4)
        ctx.closePath()
        ctx.fill()

        // Draw right shadow
        ctx.fillStyle = this.darkenColor(this.color, 15)
        ctx.beginPath()
        ctx.moveTo(x + size, y)
        ctx.lineTo(x + size, y + size)
        ctx.lineTo(x + size - 4, y + size - 4)
        ctx.lineTo(x + size - 4, y + 4)
        ctx.closePath()
        ctx.fill()

        // Draw bottom shadow
        ctx.fillStyle = this.darkenColor(this.color, 25)
        ctx.beginPath()
        ctx.moveTo(x, y + size)
        ctx.lineTo(x + size, y + size)
        ctx.lineTo(x + size - 4, y + size - 4)
        ctx.lineTo(x + 4, y + size - 4)
        ctx.closePath()
        ctx.fill()

        // Draw left highlight
        ctx.fillStyle = this.lightenColor(this.color, 5)
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x, y + size)
        ctx.lineTo(x + 4, y + size - 4)
        ctx.lineTo(x + 4, y + 4)
        ctx.closePath()
        ctx.fill()

        // Draw block outline
        ctx.strokeStyle = '#3F3A33'
        ctx.lineWidth = 1
        ctx.strokeRect(x, y, size, size)

        // Draw a symbol on the block using the ShapeKind
        this.shapeKind.drawSymbolOnBlock(ctx, x, y, size)
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
}
