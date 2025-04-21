import { config } from '../config/gameConfig'
import { ShapeKind } from './ShapeKind'

// Board class to represent the game board state
export class Board {
    cells: (ShapeKind | null)[][]

    constructor() {
        // Initialize the board with empty cells
        this.cells = Array(config.gridSize)
            .fill(null)
            .map(() => Array(config.gridSize).fill(null))
    }

    // Reset the board to an empty state
    reset(): void {
        for (let y = 0; y < config.gridSize; y++) {
            for (let x = 0; x < config.gridSize; x++) {
                this.cells[y][x] = null
            }
        }
    }

    // Set a specific cell's state
    setCellState(x: number, y: number, color: string | null): void {
        if (x < 0 || x >= config.gridSize || y < 0 || y >= config.gridSize) {
            console.error('Invalid cell coordinates:', x, y)
            return
        }

        if (color === null) {
            this.cells[y][x] = null
        } else {
            // Try to find a ShapeKind with this color or create a generic one
            const shapeKind = ShapeKind.getByColor(color) || new ShapeKind('custom', color)
            this.cells[y][x] = shapeKind
        }
    }

    // Get the color of a specific cell
    getCellColor(x: number, y: number): string | null {
        if (x < 0 || x >= config.gridSize || y < 0 || y >= config.gridSize) {
            return null
        }
        return this.cells[y][x]?.color || null
    }

    // Count filled cells on the board
    countFilledCells(): number {
        let count = 0
        for (let y = 0; y < config.gridSize; y++) {
            for (let x = 0; x < config.gridSize; x++) {
                if (this.cells[y][x] !== null) {
                    count++
                }
            }
        }
        return count
    }

    // Clone the board
    clone(): Board {
        const newBoard = new Board()
        for (let y = 0; y < config.gridSize; y++) {
            for (let x = 0; x < config.gridSize; x++) {
                const shapeKind = this.cells[y][x]
                if (shapeKind) {
                    const color = shapeKind.color
                    newBoard.setCellState(x, y, color)
                }
            }
        }
        return newBoard
    }
}
