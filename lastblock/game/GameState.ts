import { config } from '../config/gameConfig'
import { Block } from '../components/Block'
import { Grid } from '../components/Grid'
import { Board } from '../models/Board'
import { Game } from '../models/Game'
import { Status } from '../components/Status'
import { t } from '../translations/translate'
import {
    renderAvailablePieces,
    renderGameOver,
    renderPlayAgainButton,
    pointInRect,
    updateScoreDisplay,
} from '../utils/uiHelpers'
import { scenarios } from './scenarios'

const PIECES_STORAGE_KEY = 'lastblock_available_pieces'
const GAME_STATE_KEY = 'lastblock_game_state'

export class GameState {
    isDragging: boolean = false
    activePiece: Block | null = null
    dragStartX: number = 0
    dragStartY: number = 0
    dragCurrentX: number = 0
    dragCurrentY: number = 0
    animationFrameId: number | null = null
    availablePieces: Block[] = []
    isGameOver: boolean = false
    finalScore: number = 0
    hoveringPlayButton: boolean = false
    grid: Grid
    mainCanvas: HTMLCanvasElement
    overlayCanvas: HTMLCanvasElement
    mainCtx: CanvasRenderingContext2D
    overlayCtx: CanvasRenderingContext2D
    private cursorOffset: number = 40
    game: Game

    constructor(mainCanvas: HTMLCanvasElement, overlayCanvas: HTMLCanvasElement) {
        this.mainCanvas = mainCanvas
        this.overlayCanvas = overlayCanvas

        this.mainCtx = this.mainCanvas.getContext('2d') as CanvasRenderingContext2D
        this.overlayCtx = this.overlayCanvas.getContext('2d') as CanvasRenderingContext2D

        this.game = new Game()

        const totalHeight = config.gridSize * config.cellSize + config.pieceAreaHeight
        this.mainCanvas.width = config.gridSize * config.cellSize
        this.mainCanvas.height = totalHeight
        this.overlayCanvas.width = config.gridSize * config.cellSize
        this.overlayCanvas.height = totalHeight

        this.grid = new Grid(this.mainCanvas, this.game)
        this.loadGameState()

        this.setupEventListeners()
        document.addEventListener('request-score-update', this.onScoreUpdateRequest.bind(this))
    }

    initialize(): void {
        if (this.availablePieces.length === 0) {
            this.generateInitialPieces()
        } else {
            this.repositionAvailablePieces()
        }

        this.overlayCtx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height)
        renderAvailablePieces(this.overlayCtx, this.availablePieces)
        updateScoreDisplay(this.game.score)

        this.checkGameOver()
    }

    setupEventListeners(): void {
        this.overlayCanvas.addEventListener('mousedown', this.onCanvasMouseDown.bind(this))
        this.overlayCanvas.addEventListener('touchstart', this.onCanvasTouchStart.bind(this), { passive: false })

        this.setupGameOverEvents()

        document.getElementById('new-game-btn')?.addEventListener('click', () => this.newGame())
    }

    generateInitialPieces(): void {
        for (let i = 0; i < config.maxAvailablePieces; i++) {
            this.generateNewPiece()
        }
    }

    generateNewPiece(): void {
        for (let i = 0; i < config.maxAvailablePieces; i++) {
            if (!this.availablePieces[i] || !this.availablePieces[i].isAvailable) {
                const newPiece = new Block(undefined, i)

                if (i < this.availablePieces.length) {
                    this.availablePieces[i] = newPiece
                } else {
                    this.availablePieces.push(newPiece)
                }

                this.saveGameState()
                return
            }
        }
    }

    findPieceAtPosition(x: number, y: number): Block | null {
        const canvasWidth = this.overlayCanvas.width
        const gridHeight = config.gridSize * config.cellSize

        if (y > gridHeight) {
            const third = Math.floor((x / canvasWidth) * config.maxAvailablePieces)
            const boundedThird = Math.max(0, Math.min(config.maxAvailablePieces - 1, third))

            if (this.availablePieces[boundedThird] && this.availablePieces[boundedThird].isAvailable) {
                return this.availablePieces[boundedThird]
            }
        } else {
            for (let i = this.availablePieces.length - 1; i >= 0; i--) {
                const piece = this.availablePieces[i]
                if (piece.isAvailable && piece.contains(x, y)) {
                    return piece
                }
            }
        }
        return null
    }

    animateDrag(): void {
        this.overlayCtx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height)
        renderAvailablePieces(this.overlayCtx, this.availablePieces)

        if (this.isDragging && this.activePiece) {
            const cellSize = config.cellSize
            const offsetX = this.dragCurrentX - this.dragStartX
            const offsetY = this.dragCurrentY - this.dragStartY

            this.activePiece.x += offsetX
            this.activePiece.y += offsetY

            this.dragStartX = this.dragCurrentX
            this.dragStartY = this.dragCurrentY

            if (this.activePiece.scaleFactor && this.activePiece.scaleFactor < 1) {
                const oldScaleFactor = this.activePiece.scaleFactor
                const pieceWidth = this.activePiece.shape[0].length * cellSize * oldScaleFactor
                const pieceHeight = this.activePiece.shape.length * cellSize * oldScaleFactor

                const pieceCenterX = this.activePiece.x + pieceWidth / 2
                const pieceCenterY = this.activePiece.y + pieceHeight / 2

                this.activePiece.scaleFactor = 1.0

                const newPieceWidth = this.activePiece.shape[0].length * cellSize
                const newPieceHeight = this.activePiece.shape.length * cellSize

                this.activePiece.x = pieceCenterX - newPieceWidth / 2
                this.activePiece.y = pieceCenterY - newPieceHeight / 2
            }

            const pieceWidth = this.activePiece.shape[0].length
            const pieceHeight = this.activePiece.shape.length

            const pieceTopLeftX = this.activePiece.x
            const pieceTopLeftY = this.activePiece.y

            const gridX = Math.floor((pieceTopLeftX + cellSize / 2) / cellSize)
            const gridY = Math.floor((pieceTopLeftY + cellSize / 2) / cellSize)

            const isInGridArea =
                gridY >= 0 &&
                gridY + pieceHeight <= config.gridSize &&
                gridX >= 0 &&
                gridX + pieceWidth <= config.gridSize

            this.activePiece.render(this.overlayCtx)

            if (isInGridArea) {
                this.grid.highlightValidPlacement(this.activePiece, gridX, gridY, this.overlayCtx)
            }

            this.animationFrameId = requestAnimationFrame(this.animateDrag.bind(this))
        } else if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId)
            this.animationFrameId = null
        }
    }

    tryPlacePiece(gridX: number, gridY: number): void {
        if (!this.activePiece) return

        const placed = this.grid.placePiece(this.activePiece, gridX, gridY)

        if (placed) {
            this.activePiece.isAvailable = false
            updateScoreDisplay(this.game.score)
            this.game.incrementMoveCount()

            if (this.game.shouldActivateChallengeMode()) {
                this.activateChallengeMode()
            }

            if (this.game.isChallengeMode) {
                this.checkChallengeCompletion()
            } else {
                this.generateNewPiece()
            }

            this.saveGameState()
            this.checkGameOver()
        } else {
            this.repositionAvailablePieces()
        }
    }

    repositionAvailablePieces(): void {
        for (let i = 0; i < this.availablePieces.length; i++) {
            if (this.availablePieces[i].isAvailable) {
                const canvasWidth = config.gridSize * config.cellSize
                const pieceWidth = this.availablePieces[i].shape[0].length * config.cellSize

                const availableCount = this.availablePieces.filter((p) => p.isAvailable).length
                const spacing = canvasWidth / config.maxAvailablePieces
                this.availablePieces[i].x = spacing / 2 - pieceWidth / 2 + i * spacing

                const gridHeight = config.gridSize * config.cellSize
                const pieceHeight = this.availablePieces[i].shape.length * config.cellSize
                this.availablePieces[i].y = gridHeight + config.pieceAreaHeight / 2 - pieceHeight / 2
            }
        }
    }

    checkGameOver(): void {
        let possibleMoves = false

        for (const piece of this.availablePieces) {
            if (!piece.isAvailable) continue

            for (let y = 0; y < config.gridSize; y++) {
                for (let x = 0; x < config.gridSize; x++) {
                    if (this.grid.canPlacePiece(piece, x, y)) {
                        possibleMoves = true
                        return
                    }
                }
            }
        }

        if (!possibleMoves) {
            this.isGameOver = true
            this.finalScore = this.game.score

            this.game.handleGameOver().then((isNewHighScore) => {
                this.clearSavedGameState()
                localStorage.removeItem('lastblock_board_state')
                localStorage.removeItem('lastblock_score')

                this.grid.clearGrid()
                this.availablePieces = []
                this.game.reset()

                renderGameOver(this.mainCtx, this.finalScore)

                this.overlayCtx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height)
                renderPlayAgainButton(this.overlayCtx, false)

                if (isNewHighScore) {
                    Status.showMessage(t('highScore.newHighScore', { score: this.finalScore }), 'challenge')

                    document.dispatchEvent(
                        new CustomEvent('high-score-updated', {
                            bubbles: true,
                            composed: true,
                            detail: { score: this.finalScore },
                        }),
                    )
                }
            })

            if (this.animationFrameId !== null) {
                cancelAnimationFrame(this.animationFrameId)
                this.animationFrameId = null
            }
        }
    }

    loadTestScenario(scenarioId: string): void {
        if (!scenarios[scenarioId]) {
            console.error(`Scenario "${scenarioId}" not found.`)
            return
        }

        this.grid.clearGrid()
        this.game.score = 0

        const scenario = scenarios[scenarioId]
        const board = new Board()
        scenario.boardState.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell) {
                    board.setCellState(x, y, cell)
                }
            })
        })

        this.grid.setBoard(board)
        this.availablePieces = []

        scenario.availablePieces.forEach((pieceConfig, index) => {
            if (index < config.maxAvailablePieces) {
                const newPiece = new Block(pieceConfig.shape, index)
                newPiece.color = pieceConfig.color
                this.availablePieces.push(newPiece)
            }
        })

        while (this.availablePieces.length < config.maxAvailablePieces) {
            this.generateNewPiece()
        }

        this.grid.render()
        this.overlayCtx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height)
        renderAvailablePieces(this.overlayCtx, this.availablePieces)

        updateScoreDisplay(this.game.score)
    }

    async newGame(scenarioId?: string): Promise<void> {
        await this.game.initGame()
        this.isGameOver = false

        // Clear ALL game state from localStorage
        this.clearSavedGameState()
        localStorage.removeItem('lastblock_board_state')
        localStorage.removeItem('lastblock_score')

        // Reset the game score
        this.game.score = 0
        updateScoreDisplay(this.game.score)

        // Re-create the grid to get a fresh board
        this.grid = new Grid(this.mainCanvas, this.game)
        this.availablePieces = []

        for (let i = 0; i < config.maxAvailablePieces; i++) {
            this.generateNewPiece()
        }

        if (scenarioId) {
            this.loadTestScenario(scenarioId)
        } else {
            this.overlayCtx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height)
            renderAvailablePieces(this.overlayCtx, this.availablePieces)
        }

        // Notify that a new game has started
        Status.showMessage(t('game.newGameStarted'), 'info')
    }

    setupGameOverEvents(): void {
        this.overlayCanvas.addEventListener('mousemove', this.onCanvasMouseMove.bind(this))
        this.overlayCanvas.addEventListener('click', this.onCanvasClick.bind(this))
    }

    private setInitialPiecePosition(piece: Block, x: number, y: number): void {
        const cellSize = config.cellSize * (piece.scaleFactor || 1)
        const pieceWidth = piece.shape[0].length * cellSize
        const pieceHeight = piece.shape.length * cellSize

        piece.x = x - pieceWidth / 2
        piece.y = y - pieceHeight - this.cursorOffset
    }

    private saveGameState(): void {
        try {
            const serializedPieces = this.serializePieces()
            localStorage.setItem(PIECES_STORAGE_KEY, serializedPieces)

            const gameState = {
                isGameOver: this.isGameOver,
                isChallengeMode: this.game.isChallengeMode,
                moveCount: this.game.moveCount,
                challengesCompleted: this.game.challengesCompleted,
                challengeBonus: this.game.challengeBonus,
            }
            localStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameState))
        } catch (e) {
            console.error('Failed to save game state to localStorage:', e)
        }
    }

    private loadGameState(): void {
        try {
            const savedPieces = localStorage.getItem(PIECES_STORAGE_KEY)
            if (savedPieces) {
                this.deserializePieces(savedPieces)
                this.repositionAvailablePieces()
            }

            const savedGameState = localStorage.getItem(GAME_STATE_KEY)
            if (savedGameState) {
                const gameState = JSON.parse(savedGameState)
                this.isGameOver = gameState.isGameOver || false
                this.game.isChallengeMode = gameState.isChallengeMode || false
                this.game.moveCount = gameState.moveCount || 0
                this.game.challengesCompleted = gameState.challengesCompleted || 0
                this.game.challengeBonus = gameState.challengeBonus || 0

                if (this.game.isChallengeMode) {
                    this.grid.setChallengeMode(true)
                }
            }

            try {
                const savedScore = localStorage.getItem('lastblock_score')
                if (savedScore !== null) {
                    const score = parseInt(savedScore, 10) || 0
                    this.game.score = score
                }
            } catch (e) {
                console.error('Failed to load score from localStorage:', e)
            }
        } catch (e) {
            console.error('Failed to load game state from localStorage:', e)
        }
    }

    private clearSavedGameState(): void {
        try {
            localStorage.removeItem(PIECES_STORAGE_KEY)
            localStorage.removeItem(GAME_STATE_KEY)
        } catch (e) {
            console.error('Failed to clear saved game state:', e)
        }
    }

    private serializePieces(): string {
        try {
            const piecesData = this.availablePieces.map((piece, idx) => ({
                position: idx,
                isAvailable: piece.isAvailable,
                shape: piece.shape,
                colorValue: piece.color,
                shapeName: piece.shapeName,
            }))
            return JSON.stringify(piecesData)
        } catch (e) {
            console.error('Error serializing pieces:', e)
            return '[]'
        }
    }

    private deserializePieces(serializedData: string): void {
        try {
            const piecesData = JSON.parse(serializedData)
            this.availablePieces = []

            if (Array.isArray(piecesData)) {
                piecesData.forEach((pieceData) => {
                    if (pieceData && pieceData.shape) {
                        const position = typeof pieceData.position === 'number' ? pieceData.position : 0
                        const piece = new Block(pieceData.shape, position, pieceData.colorValue)
                        piece.isAvailable = pieceData.isAvailable
                        this.availablePieces.push(piece)
                    }
                })
            }
        } catch (e) {
            console.error('Failed to deserialize pieces data:', e)
            this.availablePieces = []
        }
    }

    private onScoreUpdateRequest(): void {
        const currentScore = this.game.score

        if (this.game.score !== currentScore) {
            this.game.score = currentScore
        }

        updateScoreDisplay(currentScore)
    }

    private onCanvasMouseMove(e: MouseEvent): void {
        if (!this.isGameOver) return

        const rect = this.overlayCanvas.getBoundingClientRect()
        const x = (e.clientX - rect.left) * (this.overlayCanvas.width / rect.width)
        const y = (e.clientY - rect.top) * (this.overlayCanvas.height / rect.height)

        const buttonBounds = renderPlayAgainButton(this.overlayCtx, false)
        const isHovering = pointInRect(x, y, buttonBounds.x, buttonBounds.y, buttonBounds.width, buttonBounds.height)

        if (isHovering !== this.hoveringPlayButton) {
            this.hoveringPlayButton = isHovering
            this.overlayCtx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height)
            renderPlayAgainButton(this.overlayCtx, isHovering)
        }
    }

    private onCanvasClick(e: MouseEvent): void {
        if (!this.isGameOver) return

        const rect = this.overlayCanvas.getBoundingClientRect()
        const x = (e.clientX - rect.left) * (this.overlayCanvas.width / rect.width)
        const y = (e.clientY - rect.top) * (this.overlayCanvas.height / rect.height)

        const buttonBounds = renderPlayAgainButton(this.overlayCtx, false)
        const isHovering = pointInRect(x, y, buttonBounds.x, buttonBounds.y, buttonBounds.width, buttonBounds.height)

        if (isHovering) {
            this.newGame()
        }
    }

    private onCanvasMouseDown(e: MouseEvent): void {
        if (this.isGameOver) return

        const rect = this.overlayCanvas.getBoundingClientRect()
        const x = (e.clientX - rect.left) * (this.overlayCanvas.width / rect.width)
        const y = (e.clientY - rect.top) * (this.overlayCanvas.height / rect.height)

        const piece = this.findPieceAtPosition(x, y)

        if (piece) {
            e.preventDefault()
            this.activePiece = piece
            this.isDragging = true

            this.dragStartX = x
            this.dragStartY = y
            this.dragCurrentX = x
            this.dragCurrentY = y

            this.setInitialPiecePosition(piece, x, y)

            if (this.animationFrameId === null) {
                this.animationFrameId = requestAnimationFrame(this.animateDrag.bind(this))
            }

            document.addEventListener('mousemove', this.onDocumentMouseMove.bind(this))
            document.addEventListener('mouseup', this.onDocumentMouseUp.bind(this))
        }
    }

    private onDocumentMouseMove(e: MouseEvent): void {
        if (this.isDragging && this.activePiece) {
            const rect = this.overlayCanvas.getBoundingClientRect()

            document.body.style.cursor = 'grabbing'
            this.dragCurrentX = (e.clientX - rect.left) * (this.overlayCanvas.width / rect.width)
            this.dragCurrentY = (e.clientY - rect.top) * (this.overlayCanvas.height / rect.height)
        }
    }

    private onDocumentMouseUp(e: MouseEvent): void {
        if (this.isDragging && this.activePiece) {
            const cellSize = config.cellSize

            const pieceWidth = this.activePiece.shape[0].length
            const pieceHeight = this.activePiece.shape.length

            const pieceTopLeftX = this.activePiece.x
            const pieceTopLeftY = this.activePiece.y

            const gridX = Math.floor((pieceTopLeftX + cellSize / 2) / cellSize)
            const gridY = Math.floor((pieceTopLeftY + cellSize / 2) / cellSize)

            const isInGridArea =
                gridY >= 0 &&
                gridY + pieceHeight <= config.gridSize &&
                gridX >= 0 &&
                gridX + pieceWidth <= config.gridSize

            if (isInGridArea) {
                this.tryPlacePiece(gridX, gridY)
            } else {
                this.repositionAvailablePieces()
            }

            document.body.style.cursor = 'default'
            this.isDragging = false
            this.activePiece = null

            this.overlayCtx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height)
            renderAvailablePieces(this.overlayCtx, this.availablePieces)

            document.removeEventListener('mousemove', this.onDocumentMouseMove.bind(this))
            document.removeEventListener('mouseup', this.onDocumentMouseUp.bind(this))
        }
    }

    private onCanvasTouchStart(e: TouchEvent): void {
        if (e.touches.length > 0) {
            const rect = this.overlayCanvas.getBoundingClientRect()
            const touch = e.touches[0]
            const x = (touch.clientX - rect.left) * (this.overlayCanvas.width / rect.width)
            const y = (touch.clientY - rect.top) * (this.overlayCanvas.height / rect.height)

            const piece = this.findPieceAtPosition(x, y)

            if (piece) {
                e.preventDefault()
                this.activePiece = piece
                this.isDragging = true

                this.dragStartX = x
                this.dragStartY = y
                this.dragCurrentX = x
                this.dragCurrentY = y

                this.setInitialPiecePosition(piece, x, y)

                if (this.animationFrameId === null) {
                    this.animationFrameId = requestAnimationFrame(this.animateDrag.bind(this))
                }

                document.addEventListener('touchmove', this.onDocumentTouchMove.bind(this), { passive: false })
                document.addEventListener('touchend', this.onDocumentTouchEnd.bind(this))
            }
        }
    }

    private onDocumentTouchMove(e: TouchEvent): void {
        if (e.touches.length > 0 && this.isDragging && this.activePiece) {
            e.preventDefault()
            const touch = e.touches[0]
            const rect = this.overlayCanvas.getBoundingClientRect()

            this.dragCurrentX = (touch.clientX - rect.left) * (this.overlayCanvas.width / rect.width)
            this.dragCurrentY = (touch.clientY - rect.top) * (this.overlayCanvas.height / rect.height)
        }
    }

    private onDocumentTouchEnd(e: TouchEvent): void {
        if (this.isDragging && this.activePiece) {
            const cellSize = config.cellSize

            const pieceWidth = this.activePiece.shape[0].length
            const pieceHeight = this.activePiece.shape.length

            const pieceTopLeftX = this.activePiece.x
            const pieceTopLeftY = this.activePiece.y

            const gridX = Math.floor((pieceTopLeftX + cellSize / 2) / cellSize)
            const gridY = Math.floor((pieceTopLeftY + cellSize / 2) / cellSize)

            const isInGridArea =
                gridY >= 0 &&
                gridY + pieceHeight <= config.gridSize &&
                gridX >= 0 &&
                gridX + pieceWidth <= config.gridSize

            if (isInGridArea) {
                this.tryPlacePiece(gridX, gridY)
            } else {
                this.repositionAvailablePieces()
            }

            this.isDragging = false
            this.activePiece = null

            this.overlayCtx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height)
            renderAvailablePieces(this.overlayCtx, this.availablePieces)

            document.removeEventListener('touchmove', this.onDocumentTouchMove.bind(this))
            document.removeEventListener('touchend', this.onDocumentTouchEnd.bind(this))
        }
    }

    private activateChallengeMode(): void {
        this.game.isChallengeMode = true
        this.grid.setChallengeMode(true)
        this.grid.render()
        Status.showMessage(t('challenge.activated'), 'challenge')
    }

    private completeChallengeMode(): void {
        this.game.addChallengeBonus()
        updateScoreDisplay(this.game.score)

        this.game.isChallengeMode = false
        this.grid.setChallengeMode(false)

        this.generateInitialPieces()

        this.grid.render()
        this.overlayCtx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height)
        renderAvailablePieces(this.overlayCtx, this.availablePieces)

        Status.showMessage(t('challenge.completed', { bonusPoints: this.game.challengeBonusPoints }), 'bonus')
    }

    private checkChallengeCompletion(): void {
        const availablePieces = this.availablePieces.filter((piece) => piece.isAvailable)
        if (availablePieces.length === 0) this.completeChallengeMode()
    }
}
