import { config } from '../config/gameConfig'
import { Block } from './Block'
import { Board } from '../models/Board'
import { updateScoreDisplay } from '../utils/uiHelpers'
import { t } from '../translations/translate'
import { ShapeKind } from '../models/ShapeKind'
import { css } from '../utils/cssUtils'

// Initialize the ShapeKinds
ShapeKind.initialize()

// Grid class to represent the game grid
export class Grid {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    board: Board
    score: number
    private isChallengeMode: boolean = false
    private challengeOutlineColor: string = css.get('color-gold')
    private challengeOutlineWidth: number = 4

    constructor(canvas: HTMLCanvasElement, initialScore: number = 0) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        this.score = initialScore

        // Initialize board
        this.board = new Board()

        this.addEventListeners()

        this.render()
    }

    addEventListeners(): void {
        document.addEventListener('on-theme-change', (event) => {
            this.render()
        })
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
                const shapeKind = this.board.cells[y][x]
                if (shapeKind) {
                    // Draw block with 3D effect and pattern
                    this.drawBlockWithPattern(x, y, shapeKind)
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
    }

    // Method to draw a block with pattern using ShapeKind
    drawBlockWithPattern(x: number, y: number, shapeKind: ShapeKind): void {
        const ctx = this.ctx
        const cellSize = config.cellSize
        const blockX = x * cellSize
        const blockY = y * cellSize

        // Main block face
        ctx.fillStyle = shapeKind.color
        ctx.fillRect(blockX, blockY, cellSize, cellSize)

        // Draw top highlight (bevel effect)
        ctx.fillStyle = shapeKind.lightenColor(shapeKind.color, 15)
        ctx.beginPath()
        ctx.moveTo(blockX, blockY)
        ctx.lineTo(blockX + cellSize, blockY)
        ctx.lineTo(blockX + cellSize - 4, blockY + 4)
        ctx.lineTo(blockX + 4, blockY + 4)
        ctx.closePath()
        ctx.fill()

        // Draw right shadow
        ctx.fillStyle = shapeKind.darkenColor(shapeKind.color, 15)
        ctx.beginPath()
        ctx.moveTo(blockX + cellSize, blockY)
        ctx.lineTo(blockX + cellSize, blockY + cellSize)
        ctx.lineTo(blockX + cellSize - 4, blockY + cellSize - 4)
        ctx.lineTo(blockX + cellSize - 4, blockY + 4)
        ctx.closePath()
        ctx.fill()

        // Draw bottom shadow
        ctx.fillStyle = shapeKind.darkenColor(shapeKind.color, 25)
        ctx.beginPath()
        ctx.moveTo(blockX, blockY + cellSize)
        ctx.lineTo(blockX + cellSize, blockY + cellSize)
        ctx.lineTo(blockX + cellSize - 4, blockY + cellSize - 4)
        ctx.lineTo(blockX + 4, blockY + cellSize - 4)
        ctx.closePath()
        ctx.fill()

        // Draw left highlight
        ctx.fillStyle = shapeKind.lightenColor(shapeKind.color, 5)
        ctx.beginPath()
        ctx.moveTo(blockX, blockY)
        ctx.lineTo(blockX, blockY + cellSize)
        ctx.lineTo(blockX + 4, blockY + cellSize - 4)
        ctx.lineTo(blockX + 4, blockY + 4)
        ctx.closePath()
        ctx.fill()

        // Draw block outline
        ctx.strokeStyle = '#3F3A33' // Slightly darker than the block for outline
        ctx.lineWidth = 2
        ctx.strokeRect(blockX, blockY, cellSize, cellSize)

        // Draw pattern on the block using the ShapeKind
        shapeKind.drawSymbolOnBlock(ctx, blockX, blockY, cellSize)
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
                    this.board.cells[gridY + y][gridX + x] = piece.shapeKind
                    squaresPlaced++
                }
            }
        }

        // Add 15 points per square placed
        this.score += squaresPlaced * 15
        updateScoreDisplay(this.score)

        // Check for filled rows/columns and update score before rendering
        // This ensures the lines are cleared visually before the next piece is placed
        this.checkForCompleteLines()

        // Update the display - already called in checkForCompleteLines if lines were cleared
        this.render()

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
        // Use the Status component to show the multiplier message with translations
        const message = t('multiplier.message', { multiplier: linesCleared })

        // Dispatch a status event
        document.dispatchEvent(
            new CustomEvent('game-status', {
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
