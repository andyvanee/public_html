/**
 * Shape class representing block patterns
 */
import { ShapeKind } from './ShapeKind'

// Initialize all the shape kinds
ShapeKind.initialize()

export class Shape {
    name: string
    pattern: boolean[][]
    kind: ShapeKind
    frequency: number

    constructor(name: string, pattern: boolean[][], kind: ShapeKind, frequency: number = 1.0) {
        this.name = name
        this.pattern = pattern
        this.kind = kind
        this.frequency = Math.max(0, Math.min(1, frequency)) // Ensure frequency is between 0 and 1
    }

    /**
     * Get the color associated with this shape
     */
    get color(): string {
        return this.kind.color
    }

    /**
     * Static array of all available shapes
     */
    private static shapes: Shape[] = [
        // Lines - different colors for different lengths
        // Total frequency: 1.6 (0.2 each for 8 variants)

        // 5-length lines (Teal)
        new Shape('Line5', [[true, true, true, true, true]], ShapeKind.getByName('Line5'), 0.2),
        new Shape('LineVertical5', [[true], [true], [true], [true], [true]], ShapeKind.getByName('LineVertical5'), 0.2),

        // 4-length lines (Blue)
        new Shape('Line', [[true, true, true, true]], ShapeKind.getByName('Line'), 0.2),
        new Shape('LineVertical', [[true], [true], [true], [true]], ShapeKind.getByName('LineVertical'), 0.2),

        // 3-length lines (Purple-blue)
        new Shape('Line3', [[true, true, true]], ShapeKind.getByName('Line3'), 0.2),
        new Shape('LineVertical3', [[true], [true], [true]], ShapeKind.getByName('LineVertical3'), 0.2),

        // 2-length lines (Slate blue)
        new Shape('Line2', [[true, true]], ShapeKind.getByName('Line2'), 0.2),
        new Shape('LineVertical2', [[true], [true]], ShapeKind.getByName('LineVertical2'), 0.2),

        // Squares - different colors by size
        // Total frequency: 1.0 (0.7 + 0.3)
        new Shape(
            'Square2x2',
            [
                [true, true],
                [true, true],
            ],
            ShapeKind.getByName('Square2x2'),
            0.7,
        ),
        new Shape(
            'Square3x3',
            [
                [true, true, true],
                [true, true, true],
                [true, true, true],
            ],
            ShapeKind.getByName('Square3x3'),
            0.3,
        ),

        // T-Shapes (Purple - muted)
        // Total frequency: 1.0 (0.25 each)
        new Shape(
            'TShape',
            [
                [false, true, false],
                [true, true, true],
            ],
            ShapeKind.getByName('TShape'),
            0.25,
        ),
        new Shape(
            'TShapeFlipped',
            [
                [true, true, true],
                [false, true, false],
            ],
            ShapeKind.getByName('TShapeFlipped'),
            0.25,
        ),
        new Shape(
            'TShapeRight',
            [
                [false, true],
                [true, true],
                [false, true],
            ],
            ShapeKind.getByName('TShapeRight'),
            0.25,
        ),
        new Shape(
            'TShapeLeft',
            [
                [true, false],
                [true, true],
                [true, false],
            ],
            ShapeKind.getByName('TShapeLeft'),
            0.25,
        ),

        // L-Shapes (Orange/Copper - muted)
        // Total frequency: 1.0 (0.25 each)
        new Shape(
            'LShape',
            [
                [true, false],
                [true, false],
                [true, true],
            ],
            ShapeKind.getByName('LShape'),
            0.25,
        ),
        new Shape(
            'LShapeRight',
            [
                [true, true, true],
                [true, false, false],
            ],
            ShapeKind.getByName('LShapeRight'),
            0.25,
        ),
        new Shape(
            'LShapeUpside',
            [
                [true, true],
                [false, true],
                [false, true],
            ],
            ShapeKind.getByName('LShapeUpside'),
            0.25,
        ),
        new Shape(
            'LShapeLeft',
            [
                [false, false, true],
                [true, true, true],
            ],
            ShapeKind.getByName('LShapeLeft'),
            0.25,
        ),

        // Z-Shapes (Red - muted/soft)
        // Total frequency: 1.0 (0.25 each)
        new Shape(
            'ZShape',
            [
                [true, true, false],
                [false, true, true],
            ],
            ShapeKind.getByName('ZShape'),
            0.25,
        ),
        new Shape(
            'ZShapeReflected',
            [
                [false, true, true],
                [true, true, false],
            ],
            ShapeKind.getByName('ZShapeReflected'),
            0.25,
        ),
        new Shape(
            'ZShapeVertical',
            [
                [false, true],
                [true, true],
                [true, false],
            ],
            ShapeKind.getByName('ZShapeVertical'),
            0.25,
        ),
        new Shape(
            'ZShapeVerticalReflected',
            [
                [true, false],
                [true, true],
                [false, true],
            ],
            ShapeKind.getByName('ZShapeVerticalReflected'),
            0.25,
        ),

        // Small-L Shapes (Green - muted/soft)
        // Total frequency: 1.0 (0.25 each)
        new Shape(
            'SmallL',
            [
                [true, false],
                [true, true],
            ],
            ShapeKind.getByName('SmallL'),
            0.25,
        ),
        new Shape(
            'SmallLRight',
            [
                [true, true],
                [true, false],
            ],
            ShapeKind.getByName('SmallLRight'),
            0.25,
        ),
        new Shape(
            'SmallLUpside',
            [
                [true, true],
                [false, true],
            ],
            ShapeKind.getByName('SmallLUpside'),
            0.25,
        ),
        new Shape(
            'SmallLLeft',
            [
                [false, true],
                [true, true],
            ],
            ShapeKind.getByName('SmallLLeft'),
            0.25,
        ),

        // Single (Light blue - softer)
        // Total frequency: 1.0
        new Shape('Single', [[true]], ShapeKind.getByName('Single'), 1.0),
    ]

    /**
     * Returns all available shapes
     */
    static all(): Shape[] {
        return [...this.shapes]
    }

    /**
     * Returns a random shape from the available shapes, weighted by frequency
     */
    static random(): Shape {
        // Calculate total weight (sum of all frequencies)
        const totalWeight = this.shapes.reduce((sum, shape) => sum + shape.frequency, 0)

        // Get a random value between 0 and total weight
        let random = Math.random() * totalWeight

        // Find the shape that corresponds to the random value
        for (const shape of this.shapes) {
            random -= shape.frequency
            if (random <= 0) {
                return shape
            }
        }

        // Fallback (should never reach here if frequencies are positive)
        return this.shapes[0]
    }

    /**
     * Returns a shape by name
     */
    static byName(name: string): Shape | undefined {
        return this.shapes.find((shape) => shape.name === name)
    }

    /**
     * Returns just the pattern of a random shape (for backward compatibility)
     */
    static randomPattern(): boolean[][] {
        return this.random().pattern
    }
}
