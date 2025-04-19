import { config } from '../config/gameConfig'

// Define a type for a test scenario
export interface TestScenario {
    name: string
    description: string
    // 2D array where each cell contains a color string or empty string for empty cells
    boardState: string[][]
    // Array of piece shapes to use for available pieces
    availablePieces: {
        shape: boolean[][]
        color: string
    }[]
}

// Get a color from config by index
const getColor = (index: number): string => config.colors[index % config.colors.length]

// Define the test scenarios
export const scenarios: Record<string, TestScenario> = {
    rowColClear: {
        name: 'Row & Column Clear Test',
        description: 'Test clearing both a row and column simultaneously',
        boardState: Array(config.gridSize)
            .fill('')
            .map((_, y) =>
                Array(config.gridSize)
                    .fill('')
                    .map((_, x) => {
                        // Fill all cells in row 5 except for position (5, 5)
                        if (y === 5 && x !== 5) return getColor(0)
                        // Fill all cells in column 5 except for position (5, 5)
                        if (x === 5 && y !== 5) return getColor(1)
                        return ''
                    }),
            ),
        availablePieces: [
            {
                // 1x1 piece that will complete both the row and column
                shape: [[true]],
                color: getColor(0),
            },
        ],
    },

    multiRowClear: {
        name: 'Multi-Row Clear Test',
        description: 'Test clearing multiple rows simultaneously',
        boardState: Array(config.gridSize)
            .fill('')
            .map((_, y) =>
                Array(config.gridSize)
                    .fill('')
                    .map((_, x) => {
                        // Two almost complete rows
                        if (y === 3 && x < config.gridSize - 1) return getColor(0)
                        if (y === 5 && x < config.gridSize - 1) return getColor(1)
                        return ''
                    }),
            ),
        availablePieces: [
            {
                // Vertical 2x1 piece that will complete both rows
                shape: [[true], [true]],
                color: getColor(0),
            },
        ],
    },

    customPieces: {
        name: 'Custom Test Pieces',
        description: 'Empty board with custom test pieces',
        boardState: Array(config.gridSize)
            .fill('')
            .map(() => Array(config.gridSize).fill('')),
        availablePieces: [
            {
                // 1x1 piece
                shape: [[true]],
                color: getColor(0),
            },
            {
                // L-shaped piece
                shape: [
                    [true, false],
                    [true, true],
                ],
                color: getColor(1),
            },
            {
                // T-shaped piece
                shape: [
                    [true, true, true],
                    [false, true, false],
                ],
                color: getColor(0),
            },
        ],
    },

    complexClears: {
        name: 'Complex Clear Scenarios',
        description: 'Complex test scenario with multiple potential line clears',
        boardState: Array(config.gridSize)
            .fill('')
            .map((_, y) =>
                Array(config.gridSize)
                    .fill('')
                    .map((_, x) => {
                        // Almost complete rows
                        if (y === 2 && x < config.gridSize - 2) return getColor(0)
                        if (y === 5 && x > 0 && x < config.gridSize - 1) return getColor(1)

                        // Almost complete columns
                        if (x === 2 && y < config.gridSize - 2) return getColor(1)
                        if (x === 5 && y > 0 && y < config.gridSize - 1) return getColor(0)

                        return ''
                    }),
            ),
        availablePieces: [
            {
                // L-shaped piece that could complete a row and column
                shape: [
                    [true, true],
                    [true, false],
                ],
                color: getColor(0),
            },
            {
                // 2x2 square piece
                shape: [
                    [true, true],
                    [true, true],
                ],
                color: getColor(1),
            },
            {
                // Line piece
                shape: [[true, true, true]],
                color: getColor(0),
            },
        ],
    },
}
