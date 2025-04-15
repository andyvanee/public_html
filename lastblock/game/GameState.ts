import { config } from '../config/gameConfig'
import { Block } from '../components/Block'
import { Grid } from '../components/Grid'
import { Board } from '../models/Board'
import {
    renderAvailablePieces,
    renderGameOver,
    renderPlayAgainButton,
    pointInRect,
    updateScoreDisplay,
} from '../utils/uiHelpers'
import { scenarios } from './scenarios'

export class GameState {
    score: number = 0
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
    private cursorOffset: number = 40 // Reduced from 50px to 40px for better placement

    constructor() {
        // Get canvas references
        this.mainCanvas = document.getElementById('main-canvas') as HTMLCanvasElement
        this.overlayCanvas = document.getElementById('overlay-canvas') as HTMLCanvasElement

        this.mainCtx = this.mainCanvas.getContext('2d') as CanvasRenderingContext2D
        this.overlayCtx = this.overlayCanvas.getContext('2d') as CanvasRenderingContext2D

        // Set canvas dimensions
        const totalHeight = config.gridSize * config.cellSize + config.pieceAreaHeight
        this.mainCanvas.width = config.gridSize * config.cellSize
        this.mainCanvas.height = totalHeight
        this.overlayCanvas.width = config.gridSize * config.cellSize
        this.overlayCanvas.height = totalHeight

        // Initialize grid
        this.grid = new Grid(this.mainCanvas, this.score)

        // Setup event listeners
        this.setupEventListeners()

        // Listen for request-score-update events
        document.addEventListener('request-score-update', () => {
            updateScoreDisplay(this.score)
        })
    }

    initialize(): void {
        // Generate initial pieces
        this.generateInitialPieces()

        // Render the available pieces
        renderAvailablePieces(this.overlayCtx, this.availablePieces)
    }

    setupEventListeners(): void {
        // Add event listeners to the overlay canvas
        this.overlayCanvas.addEventListener('mousedown', this.handleMouseDown.bind(this))
        this.overlayCanvas.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false })

        // Setup game over event handlers
        this.setupGameOverEvents()

        // Set up new game button
        document.getElementById('new-game-btn')?.addEventListener('click', () => this.newGame())
    }

    generateInitialPieces(): void {
        for (let i = 0; i < config.maxAvailablePieces; i++) {
            this.generateNewPiece()
        }
    }

    generateNewPiece(): void {
        // Find the first unavailable piece slot
        for (let i = 0; i < config.maxAvailablePieces; i++) {
            if (!this.availablePieces[i] || !this.availablePieces[i].isAvailable) {
                // Create a new piece
                const newPiece = new Block(undefined, i)

                // If the slot exists, replace it; otherwise add a new one
                if (i < this.availablePieces.length) {
                    this.availablePieces[i] = newPiece
                } else {
                    this.availablePieces.push(newPiece)
                }

                return
            }
        }
    }

    findPieceAtPosition(x: number, y: number): Block | null {
        const canvasWidth = this.overlayCanvas.width
        const gridHeight = config.gridSize * config.cellSize

        // Check if the click is in the pieces area (bottom row)
        if (y > gridHeight) {
            // Determine which third of the screen was clicked
            const third = Math.floor((x / canvasWidth) * config.maxAvailablePieces)

            // Bound the third to valid indices (0 to maxAvailablePieces-1)
            const boundedThird = Math.max(0, Math.min(config.maxAvailablePieces - 1, third))

            // Get the piece at this position if available
            if (this.availablePieces[boundedThird] && this.availablePieces[boundedThird].isAvailable) {
                return this.availablePieces[boundedThird]
            }
        } else {
            // Traditional hit testing for pieces dragged onto the grid
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
        // Clear the canvas
        this.overlayCtx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height)

        // Draw all available pieces first
        renderAvailablePieces(this.overlayCtx, this.availablePieces)

        if (this.isDragging && this.activePiece) {
            // Calculate the current position of the dragged piece
            const cellSize = config.cellSize
            const offsetX = this.dragCurrentX - this.dragStartX
            const offsetY = this.dragCurrentY - this.dragStartY

            // Update the piece position without adding the cursor offset again
            this.activePiece.x += offsetX
            this.activePiece.y += offsetY // Removed the cursor offset here to prevent continuous drift

            // Update drag start point for next frame
            this.dragStartX = this.dragCurrentX
            this.dragStartY = this.dragCurrentY

            // When dragging a piece, we need to reset its scale factor to 1
            // so it appears at full size on the grid
            if (this.activePiece.scaleFactor && this.activePiece.scaleFactor < 1) {
                // Adjust the piece position to account for scaling up
                // Center the piece around the cursor
                const oldScaleFactor = this.activePiece.scaleFactor
                const pieceWidth = this.activePiece.shape[0].length * cellSize * oldScaleFactor
                const pieceHeight = this.activePiece.shape.length * cellSize * oldScaleFactor

                // Calculate center of piece
                const pieceCenterX = this.activePiece.x + pieceWidth / 2
                const pieceCenterY = this.activePiece.y + pieceHeight / 2

                // Reset scale factor to full size
                this.activePiece.scaleFactor = 1.0

                // Recalculate new size
                const newPieceWidth = this.activePiece.shape[0].length * cellSize
                const newPieceHeight = this.activePiece.shape.length * cellSize

                // Set new position to maintain the same center point
                this.activePiece.x = pieceCenterX - newPieceWidth / 2
                this.activePiece.y = pieceCenterY - newPieceHeight / 2
            }

            // Get piece dimensions
            const pieceWidth = this.activePiece.shape[0].length
            const pieceHeight = this.activePiece.shape.length

            // Get the top-left corner of the piece
            const pieceTopLeftX = this.activePiece.x
            const pieceTopLeftY = this.activePiece.y

            // Calculate grid position based on the top-left corner of the piece
            // Adjust the position by adding 0.5 cells for proper snapping
            const gridX = Math.floor((pieceTopLeftX + cellSize / 2) / cellSize)
            const gridY = Math.floor((pieceTopLeftY + cellSize / 2) / cellSize)

            // Check if within the grid area
            const isInGridArea =
                gridY >= 0 &&
                gridY + pieceHeight <= config.gridSize &&
                gridX >= 0 &&
                gridX + pieceWidth <= config.gridSize

            // Draw the dragged piece
            this.activePiece.render(this.overlayCtx)

            // If in grid area, show placement highlight
            if (isInGridArea) {
                this.grid.highlightValidPlacement(this.activePiece, gridX, gridY, this.overlayCtx)
            }

            // Request the next animation frame
            this.animationFrameId = requestAnimationFrame(this.animateDrag.bind(this))
        } else if (this.animationFrameId !== null) {
            // Cancel animation if not dragging
            cancelAnimationFrame(this.animationFrameId)
            this.animationFrameId = null
        }
    }

    tryPlacePiece(gridX: number, gridY: number): void {
        if (!this.activePiece) return

        // Try to place the piece on the grid
        const placed = this.grid.placePiece(this.activePiece, gridX, gridY)

        if (placed) {
            // Mark the piece as no longer available
            this.activePiece.isAvailable = false

            // Update the score reference
            this.score = this.grid.score

            // Update the score display in the UI
            updateScoreDisplay(this.score)

            // Create a new piece to replace the placed one
            this.generateNewPiece()

            // Check if game over
            this.checkGameOver()
        } else {
            // Return the piece to its original position
            this.repositionAvailablePieces()
        }
    }

    repositionAvailablePieces(): void {
        // Reset positions of all available pieces
        for (let i = 0; i < this.availablePieces.length; i++) {
            if (this.availablePieces[i].isAvailable) {
                const canvasWidth = config.gridSize * config.cellSize
                const pieceWidth = this.availablePieces[i].shape[0].length * config.cellSize

                // Calculate the x position based on the piece's index
                const availableCount = this.availablePieces.filter((p) => p.isAvailable).length
                const spacing = canvasWidth / config.maxAvailablePieces
                this.availablePieces[i].x = spacing / 2 - pieceWidth / 2 + i * spacing

                // Calculate the y position (bottom area of the canvas)
                const gridHeight = config.gridSize * config.cellSize
                const pieceHeight = this.availablePieces[i].shape.length * config.cellSize
                this.availablePieces[i].y = gridHeight + config.pieceAreaHeight / 2 - pieceHeight / 2
            }
        }
    }

    checkGameOver(): void {
        // Check if any of the available pieces can be placed somewhere on the grid
        let possibleMoves = false

        for (const piece of this.availablePieces) {
            if (!piece.isAvailable) continue

            // Check all possible positions
            for (let y = 0; y < config.gridSize; y++) {
                for (let x = 0; x < config.gridSize; x++) {
                    if (this.grid.canPlacePiece(piece, x, y)) {
                        possibleMoves = true
                        return // Exit early once we find a valid move
                    }
                }
            }
        }

        if (!possibleMoves) {
            // Set game over state
            this.isGameOver = true
            this.finalScore = this.score

            // Render game over screen
            renderGameOver(this.mainCtx, this.finalScore)

            // Render play again button on overlay
            this.overlayCtx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height)
            renderPlayAgainButton(this.overlayCtx, false)

            // Remove any ongoing animations
            if (this.animationFrameId !== null) {
                cancelAnimationFrame(this.animationFrameId)
                this.animationFrameId = null
            }
        }
    }

    // Load a predefined test scenario
    loadTestScenario(scenarioId: string): void {
        // Check if the scenario exists
        if (!scenarios[scenarioId]) {
            console.error(`Scenario "${scenarioId}" not found.`)
            return
        }

        // Reset the board first
        this.grid.clearGrid()
        this.score = 0

        const scenario = scenarios[scenarioId]

        // Apply the board state from the scenario
        const board = new Board()
        scenario.boardState.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell) {
                    board.setCellState(x, y, cell)
                }
            })
        })

        this.grid.setBoard(board)

        // Configure available pieces
        this.availablePieces = []

        scenario.availablePieces.forEach((pieceConfig, index) => {
            if (index < config.maxAvailablePieces) {
                const newPiece = new Block(pieceConfig.shape, index)
                newPiece.color = pieceConfig.color
                this.availablePieces.push(newPiece)
            }
        })

        // If we don't have enough pieces, generate random ones to fill the slots
        while (this.availablePieces.length < config.maxAvailablePieces) {
            this.generateNewPiece()
        }

        // Update the display
        this.grid.render()
        this.overlayCtx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height)
        renderAvailablePieces(this.overlayCtx, this.availablePieces)

        // Update score display
        updateScoreDisplay(this.score)
    }

    // Extend newGame to accept an optional scenario ID
    newGame(scenarioId?: string): void {
        // Reset game state
        this.score = 0
        this.isGameOver = false

        // Update UI
        updateScoreDisplay(this.score)

        // Create new grid
        this.grid = new Grid(this.mainCanvas, this.score)

        // Clear available pieces
        this.availablePieces = []

        // Generate new pieces
        for (let i = 0; i < config.maxAvailablePieces; i++) {
            this.generateNewPiece()
        }

        // Load test scenario if specified
        if (scenarioId) {
            this.loadTestScenario(scenarioId)
        } else {
            // Redraw the overlay canvas
            this.overlayCtx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height)
            renderAvailablePieces(this.overlayCtx, this.availablePieces)
        }
    }

    setupGameOverEvents(): void {
        // Handle mouse movement for hover effects
        this.overlayCanvas.addEventListener('mousemove', (e) => {
            if (!this.isGameOver) return

            const rect = this.overlayCanvas.getBoundingClientRect()
            const x = (e.clientX - rect.left) * (this.overlayCanvas.width / rect.width)
            const y = (e.clientY - rect.top) * (this.overlayCanvas.height / rect.height)

            const buttonBounds = renderPlayAgainButton(this.overlayCtx, false)
            const isHovering = pointInRect(
                x,
                y,
                buttonBounds.x,
                buttonBounds.y,
                buttonBounds.width,
                buttonBounds.height,
            )

            if (isHovering !== this.hoveringPlayButton) {
                this.hoveringPlayButton = isHovering
                this.overlayCtx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height)
                renderPlayAgainButton(this.overlayCtx, isHovering)
            }
        })

        // Handle click to restart game
        this.overlayCanvas.addEventListener('click', (e) => {
            if (!this.isGameOver) return

            const rect = this.overlayCanvas.getBoundingClientRect()
            const x = (e.clientX - rect.left) * (this.overlayCanvas.width / rect.width)
            const y = (e.clientY - rect.top) * (this.overlayCanvas.height / rect.height)

            const buttonBounds = renderPlayAgainButton(this.overlayCtx, false)
            const isHovering = pointInRect(
                x,
                y,
                buttonBounds.x,
                buttonBounds.y,
                buttonBounds.width,
                buttonBounds.height,
            )

            if (isHovering) {
                this.newGame()
            }
        })
    }

    // Helper method to set initial piece position when dragging starts
    private setInitialPiecePosition(piece: Block, x: number, y: number): void {
        const cellSize = config.cellSize * (piece.scaleFactor || 1)
        const pieceWidth = piece.shape[0].length * cellSize
        const pieceHeight = piece.shape.length * cellSize

        // Position the piece with its center horizontally aligned with the finger/cursor
        // and vertically positioned above the finger/cursor by the offset amount
        piece.x = x - pieceWidth / 2
        piece.y = y - pieceHeight - this.cursorOffset
    }

    // Event handlers
    handleMouseDown(e: MouseEvent): void {
        // Skip if game is over
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

            // Set initial position with improved positioning
            this.setInitialPiecePosition(piece, x, y)

            // Start animation loop
            if (this.animationFrameId === null) {
                this.animationFrameId = requestAnimationFrame(this.animateDrag.bind(this))
            }

            document.addEventListener('mousemove', this.handleMouseMove.bind(this))
            document.addEventListener('mouseup', this.handleMouseUp.bind(this))
        }
    }

    handleMouseMove(e: MouseEvent): void {
        if (this.isDragging && this.activePiece) {
            const rect = this.overlayCanvas.getBoundingClientRect()

            document.body.style.cursor = 'grabbing'
            this.dragCurrentX = (e.clientX - rect.left) * (this.overlayCanvas.width / rect.width)
            this.dragCurrentY = (e.clientY - rect.top) * (this.overlayCanvas.height / rect.height)
        }
    }

    handleMouseUp(e: MouseEvent): void {
        if (this.isDragging && this.activePiece) {
            const cellSize = config.cellSize

            // Get piece dimensions
            const pieceWidth = this.activePiece.shape[0].length
            const pieceHeight = this.activePiece.shape.length

            // Get the top-left corner of the piece
            const pieceTopLeftX = this.activePiece.x
            const pieceTopLeftY = this.activePiece.y

            // Calculate grid position based on the top-left corner of the piece
            // Adjust the position by adding 0.5 cells for proper snapping
            const gridX = Math.floor((pieceTopLeftX + cellSize / 2) / cellSize)
            const gridY = Math.floor((pieceTopLeftY + cellSize / 2) / cellSize)

            // Check if piece is within grid area
            const isInGridArea =
                gridY >= 0 &&
                gridY + pieceHeight <= config.gridSize &&
                gridX >= 0 &&
                gridX + pieceWidth <= config.gridSize

            if (isInGridArea) {
                // Try to place the piece
                this.tryPlacePiece(gridX, gridY)
            } else {
                // Return the piece to its original position
                this.repositionAvailablePieces()
            }

            // Reset drag state
            document.body.style.cursor = 'default'
            this.isDragging = false
            this.activePiece = null

            // Redraw the pieces canvas
            this.overlayCtx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height)
            renderAvailablePieces(this.overlayCtx, this.availablePieces)

            // Remove event listeners
            document.removeEventListener('mousemove', this.handleMouseMove.bind(this))
            document.removeEventListener('mouseup', this.handleMouseUp.bind(this))
        }
    }

    handleTouchStart(e: TouchEvent): void {
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

                // Set initial position with improved positioning
                this.setInitialPiecePosition(piece, x, y)

                // Start animation loop
                if (this.animationFrameId === null) {
                    this.animationFrameId = requestAnimationFrame(this.animateDrag.bind(this))
                }

                document.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false })
                document.addEventListener('touchend', this.handleTouchEnd.bind(this))
            }
        }
    }

    handleTouchMove(e: TouchEvent): void {
        if (e.touches.length > 0 && this.isDragging && this.activePiece) {
            e.preventDefault()
            const touch = e.touches[0]
            const rect = this.overlayCanvas.getBoundingClientRect()

            this.dragCurrentX = (touch.clientX - rect.left) * (this.overlayCanvas.width / rect.width)
            this.dragCurrentY = (touch.clientY - rect.top) * (this.overlayCanvas.height / rect.height)
        }
    }

    handleTouchEnd(e: TouchEvent): void {
        if (this.isDragging && this.activePiece) {
            const cellSize = config.cellSize

            // Get piece dimensions
            const pieceWidth = this.activePiece.shape[0].length
            const pieceHeight = this.activePiece.shape.length

            // Get the top-left corner of the piece
            const pieceTopLeftX = this.activePiece.x
            const pieceTopLeftY = this.activePiece.y

            // Calculate grid position based on the top-left corner of the piece
            // Adjust the position by adding 0.5 cells for proper snapping
            const gridX = Math.floor((pieceTopLeftX + cellSize / 2) / cellSize)
            const gridY = Math.floor((pieceTopLeftY + cellSize / 2) / cellSize)

            // Check if piece is within grid area
            const isInGridArea =
                gridY >= 0 &&
                gridY + pieceHeight <= config.gridSize &&
                gridX >= 0 &&
                gridX + pieceWidth <= config.gridSize

            if (isInGridArea) {
                // Try to place the piece
                this.tryPlacePiece(gridX, gridY)
            } else {
                // Return the piece to its original position
                this.repositionAvailablePieces()
            }

            // Reset drag state
            this.isDragging = false
            this.activePiece = null

            // Redraw the pieces canvas
            this.overlayCtx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height)
            renderAvailablePieces(this.overlayCtx, this.availablePieces)

            // Remove event listeners
            document.removeEventListener('touchmove', this.handleTouchMove.bind(this))
            document.removeEventListener('touchend', this.handleTouchEnd.bind(this))
        }
    }
}
