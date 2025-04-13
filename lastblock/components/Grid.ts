import { config } from '../config/gameConfig'
import { Block } from './Block'
import { updateScoreDisplay } from '../utils/uiHelpers'

// Grid class to represent the game grid
export class Grid {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    cells: (string | null)[][]
    score: number

    constructor(canvas: HTMLCanvasElement, initialScore: number = 0) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        this.score = initialScore

        // Initialize empty grid
        this.cells = Array(config.gridSize)
            .fill(null)
            .map(() => Array(config.gridSize).fill(null))

        this.render()
    }

    render(): void {
        const ctx = this.ctx
        const cellSize = config.cellSize
        const gridHeight = config.gridSize * cellSize

        // Clear canvas with background color
        ctx.fillStyle = config.backgroundColor
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        // Draw grid
        ctx.strokeStyle = config.gridLineColor
        ctx.lineWidth = 1

        for (let i = 0; i <= config.gridSize; i++) {
            // Draw horizontal line
            ctx.beginPath()
            ctx.moveTo(0, i * cellSize)
            ctx.lineTo(this.canvas.width, i * cellSize)
            ctx.stroke()

            // Draw vertical line
            ctx.beginPath()
            ctx.moveTo(i * cellSize, 0)
            ctx.lineTo(i * cellSize, gridHeight)
            ctx.stroke()
        }

        // Draw filled cells
        for (let y = 0; y < config.gridSize; y++) {
            for (let x = 0; x < config.gridSize; x++) {
                const color = this.cells[y][x]
                if (color) {
                    ctx.fillStyle = color
                    ctx.strokeStyle = '#3F3A33' // Slightly darker than the block for outline
                    ctx.lineWidth = 2

                    // Draw block with slight 3D effect (like in the concept art)
                    const blockX = x * cellSize
                    const blockY = y * cellSize

                    // Draw main block face
                    ctx.fillRect(blockX, blockY, cellSize, cellSize)

                    // Draw top highlight
                    ctx.fillStyle = this.lightenColor(color, 15)
                    ctx.beginPath()
                    ctx.moveTo(blockX, blockY)
                    ctx.lineTo(blockX + cellSize, blockY)
                    ctx.lineTo(blockX + cellSize - 4, blockY + 4)
                    ctx.lineTo(blockX + 4, blockY + 4)
                    ctx.closePath()
                    ctx.fill()

                    // Draw right shadow
                    ctx.fillStyle = this.darkenColor(color, 15)
                    ctx.beginPath()
                    ctx.moveTo(blockX + cellSize, blockY)
                    ctx.lineTo(blockX + cellSize, blockY + cellSize)
                    ctx.lineTo(blockX + cellSize - 4, blockY + cellSize - 4)
                    ctx.lineTo(blockX + cellSize - 4, blockY + 4)
                    ctx.closePath()
                    ctx.fill()

                    // Draw block outline
                    ctx.strokeRect(blockX, blockY, cellSize, cellSize)
                }
            }
        }

        // Draw divider line between grid and pieces area
        ctx.beginPath()
        ctx.strokeStyle = config.borderColor
        ctx.lineWidth = 2
        ctx.moveTo(0, gridHeight)
        ctx.lineTo(this.canvas.width, gridHeight)
        ctx.stroke()

        // Draw "Available Pieces" text
        ctx.font = '16px Arial'
        ctx.fillStyle = config.textColor
        ctx.textAlign = 'center'
        ctx.fillText('Available Pieces', this.canvas.width / 2, gridHeight + 20)
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

    canPlacePiece(piece: Block, gridX: number, gridY: number): boolean {
        for (let y = 0; y < piece.shape.length; y++) {
            for (let x = 0; x < piece.shape[y].length; x++) {
                if (piece.shape[y][x]) {
                    const targetX = gridX + x
                    const targetY = gridY + y

                    // Check if out of bounds
                    if (targetX < 0 || targetX >= config.gridSize || targetY < 0 || targetY >= config.gridSize) {
                        return false
                    }

                    // Check if cell is already occupied
                    if (this.cells[targetY][targetX] !== null) {
                        return false
                    }
                }
            }
        }

        return true
    }

    placePiece(piece: Block, gridX: number, gridY: number): boolean {
        if (!this.canPlacePiece(piece, gridX, gridY)) {
            return false
        }

        // Place the piece on the grid
        for (let y = 0; y < piece.shape.length; y++) {
            for (let x = 0; x < piece.shape[y].length; x++) {
                if (piece.shape[y][x]) {
                    this.cells[gridY + y][gridX + x] = piece.color
                }
            }
        }

        // Update the display
        this.render()

        // Check for filled rows/columns and update score
        this.checkForCompleteLines()

        return true
    }

    highlightValidPlacement(piece: Block, gridX: number, gridY: number, piecesCtx: CanvasRenderingContext2D): void {
        if (!piece) return

        const cellSize = config.cellSize
        const isValid = this.canPlacePiece(piece, gridX, gridY)

        // Highlight the area where the piece would be placed
        piecesCtx.globalAlpha = 0.3
        piecesCtx.fillStyle = isValid ? config.highlightColor : config.invalidColor

        for (let y = 0; y < piece.shape.length; y++) {
            for (let x = 0; x < piece.shape[y].length; x++) {
                if (piece.shape[y][x]) {
                    const cellX = gridX * cellSize + x * cellSize
                    const cellY = gridY * cellSize + y * cellSize

                    piecesCtx.fillRect(cellX, cellY, cellSize, cellSize)
                }
            }
        }

        piecesCtx.globalAlpha = 1.0
    }

    checkForCompleteLines(): number {
        let linesCleared = 0

        // Check rows
        for (let y = 0; y < config.gridSize; y++) {
            if (this.cells[y].every((cell) => cell !== null)) {
                // Clear row
                this.cells[y] = Array(config.gridSize).fill(null)
                linesCleared++
            }
        }

        // Check columns
        for (let x = 0; x < config.gridSize; x++) {
            const column = this.cells.map((row) => row[x])
            if (column.every((cell) => cell !== null)) {
                // Clear column
                for (let y = 0; y < config.gridSize; y++) {
                    this.cells[y][x] = null
                }
                linesCleared++
            }
        }

        // Update score
        if (linesCleared > 0) {
            // Score increases exponentially with more lines cleared simultaneously
            this.score += Math.pow(linesCleared, 2) * 100
            updateScoreDisplay(this.score)
            this.render()
        }

        return linesCleared
    }
}
