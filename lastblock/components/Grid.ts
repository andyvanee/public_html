import { config } from '../config/gameConfig'
import { Block } from './Block'
import { Board } from '../models/Board'
import { updateScoreDisplay } from '../utils/uiHelpers'

// Grid class to represent the game grid
export class Grid {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    board: Board
    score: number
    private isChallengeMode: boolean = false
    private challengeOutlineColor: string = '#FFD700' // Gold color
    private challengeOutlineWidth: number = 4

    constructor(canvas: HTMLCanvasElement, initialScore: number = 0) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        this.score = initialScore

        // Initialize board
        this.board = new Board()

        this.render()
    }

    // Method to set Challenge mode on/off
    setChallengeMode(isActive: boolean): void {
        this.isChallengeMode = isActive
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
                const color = this.board.cells[y][x]
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

        // If in challenge mode, draw gold outline around the grid
        if (this.isChallengeMode) {
            ctx.beginPath()
            ctx.strokeStyle = this.challengeOutlineColor
            ctx.lineWidth = this.challengeOutlineWidth

            // Draw border slightly inside the grid edges to avoid clipping
            const offset = this.challengeOutlineWidth / 2
            ctx.strokeRect(
                offset,
                offset,
                config.gridSize * cellSize - this.challengeOutlineWidth,
                config.gridSize * cellSize - this.challengeOutlineWidth,
            )
        }

        // Draw divider line between grid and pieces area
        ctx.beginPath()
        ctx.strokeStyle = config.borderColor
        ctx.lineWidth = 2
        ctx.moveTo(0, gridHeight)
        ctx.lineTo(this.canvas.width, gridHeight)
        ctx.stroke()

        // Draw "Available Pieces" text with background to ensure visibility
        const textY = gridHeight + 20
        const text = 'Available Pieces'
        ctx.font = '16px Arial'
        ctx.textAlign = 'center'

        // Draw text background/shadow for better visibility
        ctx.fillStyle = 'rgba(30, 28, 25, 0.7)' // Semi-transparent background
        const textWidth = ctx.measureText(text).width + 10
        const textHeight = 20
        ctx.fillRect(this.canvas.width / 2 - textWidth / 2, textY - textHeight + 4, textWidth, textHeight)

        // Draw the text
        ctx.fillStyle = config.textColor
        ctx.fillText(text, this.canvas.width / 2, textY)
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
                    if (this.board.cells[targetY][targetX] !== null) {
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

        // Count squares placed for scoring
        let squaresPlaced = 0

        // Place the piece on the grid
        for (let y = 0; y < piece.shape.length; y++) {
            for (let x = 0; x < piece.shape[y].length; x++) {
                if (piece.shape[y][x]) {
                    this.board.cells[gridY + y][gridX + x] = piece.color
                    squaresPlaced++
                }
            }
        }

        // Add 15 points per square placed
        this.score += squaresPlaced * 15
        updateScoreDisplay(this.score)

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
        // Create a set to track cells that should be cleared
        const cellsToClear = new Set<string>()

        // First pass: Mark cells to clear by checking rows
        for (let y = 0; y < config.gridSize; y++) {
            if (this.board.cells[y].every((cell) => cell !== null)) {
                // Mark row for clearing
                for (let x = 0; x < config.gridSize; x++) {
                    cellsToClear.add(`${y},${x}`)
                }
                linesCleared++
            }
        }

        // First pass: Mark cells to clear by checking columns
        for (let x = 0; x < config.gridSize; x++) {
            const column = this.board.cells.map((row) => row[x])
            if (column.every((cell) => cell !== null)) {
                // Mark column for clearing
                for (let y = 0; y < config.gridSize; y++) {
                    cellsToClear.add(`${y},${x}`)
                }
                linesCleared++
            }
        }

        // Second pass: Clear all marked cells
        if (cellsToClear.size > 0) {
            cellsToClear.forEach((cell) => {
                const [y, x] = cell.split(',').map(Number)
                this.board.cells[y][x] = null
            })

            // Apply new scoring system:
            // - 250 points per line cleared
            // - Multiplier for multi-line clears
            const pointsPerLine = 250
            const multiplier = linesCleared > 1 ? linesCleared : 1 // Multiplier only applies for multiple lines

            // Update score - 250 points per line with multiplier for multiple lines
            this.score += pointsPerLine * linesCleared * multiplier

            // Show bonus information
            if (linesCleared > 1) {
                this.showMultiLineBonus(linesCleared)
            }

            updateScoreDisplay(this.score)
            this.render()
        }

        return linesCleared
    }

    // Show a visual notification of the multi-line bonus
    private showMultiLineBonus(linesCleared: number): void {
        // Use the Toast component to show the multiplier message
        const message = `${linesCleared}x MULTIPLIER!`

        // Dispatch a toast event
        document.dispatchEvent(
            new CustomEvent('game-toast', {
                detail: {
                    message,
                    type: 'bonus',
                },
                bubbles: true,
                composed: true,
            }),
        )
    }

    // Method to set up a specific cell state
    setCellState(x: number, y: number, color: string | null): void {
        this.board.setCellState(x, y, color)
    }

    // Set the entire board from a board state
    setBoard(boardState: Board): void {
        this.board = boardState
        this.render()
    }

    // Clear the grid completely
    clearGrid(): void {
        this.board.reset()
        this.render()
    }

    // Get the current board state
    getBoard(): Board {
        return this.board
    }
}
