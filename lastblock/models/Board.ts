import { config } from '../config/gameConfig'

// Board class represents the state of the game grid
export class Board {
    cells: (string | null)[][] = []

    constructor() {
        // Initialize empty grid
        this.reset()
    }

    // Reset the board to empty state
    reset(): void {
        this.cells = Array(config.gridSize)
            .fill(null)
            .map(() => Array(config.gridSize).fill(null))
    }

    // Set the state of a specific cell
    setCellState(x: number, y: number, color: string | null): void {
        if (x >= 0 && x < config.gridSize && y >= 0 && y < config.gridSize) {
            this.cells[y][x] = color
        }
    }

    // Serialize the board to a string representation
    serialize(): string[][] {
        return this.cells.map((row) => row.map((cell) => cell || ''))
    }

    // Create a board from a serialized representation
    static deserialize(serialized: string[][]): Board {
        const board = new Board()

        // Ensure proper dimensions
        const height = Math.min(serialized.length, config.gridSize)

        for (let y = 0; y < height; y++) {
            const row = serialized[y]
            const width = Math.min(row.length, config.gridSize)

            for (let x = 0; x < width; x++) {
                // Empty string represents null (empty cell)
                board.cells[y][x] = row[x] || null
            }
        }

        return board
    }

    // Check if the cell at (x, y) is occupied
    isCellOccupied(x: number, y: number): boolean {
        if (x < 0 || y < 0 || x >= config.gridSize || y >= config.gridSize) {
            return true // Out of bounds cells are considered occupied
        }
        return this.cells[y][x] !== null
    }

    // Clone the current board
    clone(): Board {
        const newBoard = new Board()
        newBoard.cells = this.cells.map((row) => [...row])
        return newBoard
    }
}
