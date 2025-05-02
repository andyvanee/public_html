import { config } from '../config/gameConfig'
import { Block } from './Block'
import { Board } from '../models/Board'
import { updateScoreDisplay } from '../utils/uiHelpers'
import { t } from '../translations/translate'
import { ShapeKind } from '../models/ShapeKind'
import { css } from '../utils/cssUtils'
import { Game } from '../models/Game'

const BOARD_STORAGE_KEY = 'lastblock_board_state'

ShapeKind.initialize()

export class Grid {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    board: Board
    private game: Game
    private isChallengeMode: boolean = false
    private challengeOutlineColor: string = css.get('color-gold')
    private challengeOutlineWidth: number = 4

    constructor(canvas: HTMLCanvasElement, game: Game) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        this.game = game

        try {
            const savedBoardState = localStorage.getItem(BOARD_STORAGE_KEY)
            if (savedBoardState) {
                this.board = Board.deserialize(savedBoardState)
            } else {
                this.board = new Board()
            }
        } catch (e) {
            console.error('Failed to load board state from localStorage:', e)
            this.board = new Board()
        }

        this.addEventListeners()

        this.render()
    }

    addEventListeners(): void {
        document.addEventListener('on-theme-change', (event) => {
            this.render()
        })
    }

    setChallengeMode(isActive: boolean): void {
        this.isChallengeMode = isActive
    }

    render(): void {
        const ctx = this.ctx
        const cellSize = config.cellSize
        const gridHeight = config.gridSize * cellSize

        ctx.fillStyle = config.backgroundColor
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        ctx.strokeStyle = config.gridLineColor
        ctx.lineWidth = 1

        for (let i = 0; i <= config.gridSize; i++) {
            ctx.beginPath()
            ctx.moveTo(0, i * cellSize)
            ctx.lineTo(this.canvas.width, i * cellSize)
            ctx.stroke()

            ctx.beginPath()
            ctx.moveTo(i * cellSize, 0)
            ctx.lineTo(i * cellSize, gridHeight)
            ctx.stroke()
        }

        for (let y = 0; y < config.gridSize; y++) {
            for (let x = 0; x < config.gridSize; x++) {
                const shapeKind = this.board.cells[y][x]
                if (shapeKind) {
                    this.drawBlockWithPattern(x, y, shapeKind)
                }
            }
        }

        if (this.isChallengeMode) {
            ctx.beginPath()
            ctx.strokeStyle = this.challengeOutlineColor
            ctx.lineWidth = this.challengeOutlineWidth

            const offset = this.challengeOutlineWidth / 2
            ctx.strokeRect(
                offset,
                offset,
                config.gridSize * cellSize - this.challengeOutlineWidth,
                config.gridSize * cellSize - this.challengeOutlineWidth,
            )
        }

        ctx.beginPath()
        ctx.strokeStyle = config.borderColor
        ctx.lineWidth = 2
        ctx.moveTo(0, gridHeight)
        ctx.lineTo(this.canvas.width, gridHeight)
        ctx.stroke()
    }

    drawBlockWithPattern(x: number, y: number, shapeKind: ShapeKind): void {
        const ctx = this.ctx
        const cellSize = config.cellSize
        const blockX = x * cellSize
        const blockY = y * cellSize

        ctx.fillStyle = shapeKind.color
        ctx.fillRect(blockX, blockY, cellSize, cellSize)

        ctx.fillStyle = shapeKind.lightenColor(shapeKind.color, 15)
        ctx.beginPath()
        ctx.moveTo(blockX, blockY)
        ctx.lineTo(blockX + cellSize, blockY)
        ctx.lineTo(blockX + cellSize - 4, blockY + 4)
        ctx.lineTo(blockX + 4, blockY + 4)
        ctx.closePath()
        ctx.fill()

        ctx.fillStyle = shapeKind.darkenColor(shapeKind.color, 15)
        ctx.beginPath()
        ctx.moveTo(blockX + cellSize, blockY)
        ctx.lineTo(blockX + cellSize, blockY + cellSize)
        ctx.lineTo(blockX + cellSize - 4, blockY + cellSize - 4)
        ctx.lineTo(blockX + cellSize - 4, blockY + 4)
        ctx.closePath()
        ctx.fill()

        ctx.fillStyle = shapeKind.darkenColor(shapeKind.color, 25)
        ctx.beginPath()
        ctx.moveTo(blockX, blockY + cellSize)
        ctx.lineTo(blockX + cellSize, blockY + cellSize)
        ctx.lineTo(blockX + cellSize - 4, blockY + cellSize - 4)
        ctx.lineTo(blockX + 4, blockY + cellSize - 4)
        ctx.closePath()
        ctx.fill()

        ctx.fillStyle = shapeKind.lightenColor(shapeKind.color, 5)
        ctx.beginPath()
        ctx.moveTo(blockX, blockY)
        ctx.lineTo(blockX, blockY + cellSize)
        ctx.lineTo(blockX + 4, blockY + cellSize - 4)
        ctx.lineTo(blockX + 4, blockY + 4)
        ctx.closePath()
        ctx.fill()

        ctx.strokeStyle = '#3F3A33'
        ctx.lineWidth = 2
        ctx.strokeRect(blockX, blockY, cellSize, cellSize)

        shapeKind.drawSymbolOnBlock(ctx, blockX, blockY, cellSize)
    }

    canPlacePiece(piece: Block, gridX: number, gridY: number): boolean {
        for (let y = 0; y < piece.shape.length; y++) {
            for (let x = 0; x < piece.shape[y].length; x++) {
                if (piece.shape[y][x]) {
                    const targetX = gridX + x
                    const targetY = gridY + y

                    if (targetX < 0 || targetX >= config.gridSize || targetY < 0 || targetY >= config.gridSize) {
                        return false
                    }

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

        let squaresPlaced = 0

        for (let y = 0; y < piece.shape.length; y++) {
            for (let x = 0; x < piece.shape[y].length; x++) {
                if (piece.shape[y][x]) {
                    this.board.cells[gridY + y][gridX + x] = piece.shapeKind
                    squaresPlaced++
                }
            }
        }

        this.game.score += squaresPlaced * 15
        updateScoreDisplay(this.game.score)

        this.saveScoreToLocalStorage()
        this.saveBoardToLocalStorage()

        this.checkForCompleteLines()

        this.render()

        return true
    }

    highlightValidPlacement(piece: Block, gridX: number, gridY: number, piecesCtx: CanvasRenderingContext2D): void {
        if (!piece) return

        const cellSize = config.cellSize
        const isValid = this.canPlacePiece(piece, gridX, gridY)

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
        const cellsToClear = new Set<string>()

        for (let y = 0; y < config.gridSize; y++) {
            if (this.board.cells[y].every((cell) => cell !== null)) {
                for (let x = 0; x < config.gridSize; x++) {
                    cellsToClear.add(`${y},${x}`)
                }
                linesCleared++
            }
        }

        for (let x = 0; x < config.gridSize; x++) {
            const column = this.board.cells.map((row) => row[x])
            if (column.every((cell) => cell !== null)) {
                for (let y = 0; y < config.gridSize; y++) {
                    cellsToClear.add(`${y},${x}`)
                }
                linesCleared++
            }
        }

        if (cellsToClear.size > 0) {
            cellsToClear.forEach((cell) => {
                const [y, x] = cell.split(',').map(Number)
                this.board.cells[y][x] = null
            })

            const pointsPerLine = 250
            const multiplier = linesCleared > 1 ? linesCleared : 1

            this.game.score += pointsPerLine * linesCleared * multiplier

            if (linesCleared > 1) {
                this.showMultiLineBonus(linesCleared)
            }

            updateScoreDisplay(this.game.score)
            this.saveScoreToLocalStorage()
            this.saveBoardToLocalStorage()
            this.render()
        }

        return linesCleared
    }

    private showMultiLineBonus(linesCleared: number): void {
        const message = t('multiplier.message', { multiplier: linesCleared })

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

    setCellState(x: number, y: number, color: string | null): void {
        this.board.setCellState(x, y, color)
        this.saveBoardToLocalStorage()
    }

    setBoard(boardState: Board): void {
        this.board = boardState
        this.saveBoardToLocalStorage()
        this.render()
    }

    clearGrid(): void {
        this.board.reset()
        this.saveBoardToLocalStorage()
        this.render()
    }

    getBoard(): Board {
        return this.board
    }

    private saveBoardToLocalStorage(): void {
        try {
            const serializedBoard = this.board.serialize()
            localStorage.setItem(BOARD_STORAGE_KEY, serializedBoard)
        } catch (e) {
            console.error('Failed to save board state to localStorage:', e)
        }
    }

    private saveScoreToLocalStorage(): void {
        try {
            localStorage.setItem('lastblock_score', this.game.score.toString())
        } catch (e) {
            console.error('Failed to save score to localStorage:', e)
        }
    }
}
