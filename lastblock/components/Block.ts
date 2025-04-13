import { config } from '../config/gameConfig'
import { Shape } from '../models/Shape'

// Block class to represent tetromino pieces
export class Block {
    shape: boolean[][]
    color: string
    x: number
    y: number
    isAvailable: boolean
    shapeName: string

    constructor(shape?: boolean[][], position?: number, color?: string) {
        this.x = 0
        this.y = 0
        this.isAvailable = true

        // If shape is provided, use it, otherwise get a random one
        if (shape) {
            this.shape = shape
            this.shapeName = 'custom'
            // Use provided color or default to a random color
            this.color = color || config.colors[Math.floor(Math.random() * config.colors.length)]
        } else {
            // Get a random shape from the Shape class
            const randomShape = Shape.random()
            this.shape = randomShape.pattern
            this.shapeName = randomShape.name
            // Use the color defined in the Shape class
            this.color = randomShape.color
        }

        if (position !== undefined) {
            // Position this piece in the available pieces area
            const canvasWidth = config.gridSize * config.cellSize
            const pieceWidth = this.shape[0].length * config.cellSize

            // Calculate the x position based on the piece's index
            const spacing = canvasWidth / config.maxAvailablePieces
            this.x = spacing / 2 - pieceWidth / 2 + position * spacing

            // Calculate the y position (bottom area of the canvas)
            const gridHeight = config.gridSize * config.cellSize
            const pieceHeight = this.shape.length * config.cellSize
            this.y = gridHeight + config.pieceAreaHeight / 2 - pieceHeight / 2
        }
    }

    generateRandomShape(): boolean[][] {
        // Use the Shape namespace to get a random shape pattern
        return Shape.randomPattern()
    }

    contains(px: number, py: number): boolean {
        const cellSize = config.cellSize

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
        const cellSize = config.cellSize

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

    // New method to draw a block with 3D effect and symbol
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

        // Draw a symbol on the block based on the shape type (similar to concept art)
        this.drawSymbolOnBlock(ctx, x, y, size)
    }

    // Method to draw a symbol on the block
    drawSymbolOnBlock(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void {
        const padding = size * 0.2
        const symbolSize = size - padding * 2

        // Draw in a contrasting color
        const isLightColor = this.isLightColor(this.color)
        ctx.fillStyle = isLightColor ? this.darkenColor(this.color, 30) : this.lightenColor(this.color, 30)
        ctx.strokeStyle = isLightColor ? this.darkenColor(this.color, 30) : this.lightenColor(this.color, 30)
        ctx.lineWidth = 2

        // Draw different symbols based on shape name
        switch (this.shapeName) {
            case 'Line':
                // Draw a horizontal line symbol
                ctx.beginPath()
                ctx.moveTo(x + padding, y + size / 2)
                ctx.lineTo(x + size - padding, y + size / 2)
                ctx.stroke()
                break

            case 'Square2x2':
                // Draw a square symbol
                ctx.strokeRect(x + padding, y + padding, symbolSize, symbolSize)
                break

            case 'TShape':
                // Draw a T symbol
                ctx.beginPath()
                ctx.moveTo(x + size / 2, y + padding)
                ctx.lineTo(x + size / 2, y + size - padding)
                ctx.moveTo(x + padding, y + padding)
                ctx.lineTo(x + size - padding, y + padding)
                ctx.stroke()
                break

            case 'LShape':
                // Draw an L symbol
                ctx.beginPath()
                ctx.moveTo(x + padding + symbolSize / 3, y + padding)
                ctx.lineTo(x + padding + symbolSize / 3, y + size - padding)
                ctx.lineTo(x + size - padding, y + size - padding)
                ctx.stroke()
                break

            case 'ZShape':
                // Draw a Z symbol
                ctx.beginPath()
                ctx.moveTo(x + padding, y + padding)
                ctx.lineTo(x + size - padding, y + padding)
                ctx.lineTo(x + padding, y + size - padding)
                ctx.lineTo(x + size - padding, y + size - padding)
                ctx.stroke()
                break

            case 'Single':
                // Draw a dot symbol
                ctx.beginPath()
                ctx.arc(x + size / 2, y + size / 2, symbolSize / 5, 0, Math.PI * 2)
                ctx.fill()
                break

            case 'SmallL':
                // Draw a small L symbol
                ctx.beginPath()
                ctx.moveTo(x + padding + symbolSize / 3, y + padding)
                ctx.lineTo(x + padding + symbolSize / 3, y + size - padding)
                ctx.lineTo(x + size - padding, y + size - padding)
                ctx.stroke()
                break

            case 'Square3x3':
                // Draw concentric squares
                ctx.strokeRect(x + padding, y + padding, symbolSize, symbolSize)
                ctx.strokeRect(
                    x + padding + symbolSize / 4,
                    y + padding + symbolSize / 4,
                    symbolSize / 2,
                    symbolSize / 2,
                )
                break

            default:
                // Draw a circle for any other shapes
                ctx.beginPath()
                ctx.arc(x + size / 2, y + size / 2, symbolSize / 3, 0, Math.PI * 2)
                ctx.stroke()
        }
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
