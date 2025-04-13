/**
 * Shape class representing block patterns
 */
export class Shape {
    name: string
    color: string
    pattern: boolean[][]

    constructor(name: string, pattern: boolean[][], color: string) {
        this.name = name
        this.pattern = pattern
        this.color = color
    }

    /**
     * Static array of all available shapes
     */
    private static shapes: Shape[] = [
        // Lines (Teal - similar to the color in the screenshot)
        new Shape('Line', [[true, true, true, true]], '#3D8C9E'),
        new Shape('LineVertical', [[true], [true], [true], [true]], '#3D8C9E'),

        // Squares (Beige/Tan - from the screenshot)
        new Shape(
            'Square2x2',
            [
                [true, true],
                [true, true],
            ],
            '#D4AF91',
        ),
        new Shape(
            'Square3x3',
            [
                [true, true, true],
                [true, true, true],
                [true, true, true],
            ],
            '#D4AF91',
        ),

        // T-Shapes (Purple - muted)
        new Shape(
            'TShape',
            [
                [false, true, false],
                [true, true, true],
            ],
            '#9370DB',
        ),
        new Shape(
            'TShapeFlipped',
            [
                [true, true, true],
                [false, true, false],
            ],
            '#9370DB',
        ),
        new Shape(
            'TShapeRight',
            [
                [false, true],
                [true, true],
                [false, true],
            ],
            '#9370DB',
        ),
        new Shape(
            'TShapeLeft',
            [
                [true, false],
                [true, true],
                [true, false],
            ],
            '#9370DB',
        ),

        // L-Shapes (Orange/Copper - muted)
        new Shape(
            'LShape',
            [
                [true, false],
                [true, false],
                [true, true],
            ],
            '#CD7F32',
        ),
        new Shape(
            'LShapeRight',
            [
                [true, true, true],
                [true, false, false],
            ],
            '#CD7F32',
        ),
        new Shape(
            'LShapeUpside',
            [
                [true, true],
                [false, true],
                [false, true],
            ],
            '#CD7F32',
        ),
        new Shape(
            'LShapeLeft',
            [
                [false, false, true],
                [true, true, true],
            ],
            '#CD7F32',
        ),

        // Z-Shapes (Red - muted/soft)
        new Shape(
            'ZShape',
            [
                [true, true, false],
                [false, true, true],
            ],
            '#B22222',
        ),
        new Shape(
            'ZShapeReflected',
            [
                [false, true, true],
                [true, true, false],
            ],
            '#B22222',
        ),
        new Shape(
            'ZShapeVertical',
            [
                [false, true],
                [true, true],
                [true, false],
            ],
            '#B22222',
        ),
        new Shape(
            'ZShapeVerticalReflected',
            [
                [true, false],
                [true, true],
                [false, true],
            ],
            '#B22222',
        ),

        // Small-L Shapes (Green - muted/soft)
        new Shape(
            'SmallL',
            [
                [true, false],
                [true, true],
            ],
            '#6B8E23',
        ),
        new Shape(
            'SmallLRight',
            [
                [true, true],
                [true, false],
            ],
            '#6B8E23',
        ),
        new Shape(
            'SmallLUpside',
            [
                [true, true],
                [false, true],
            ],
            '#6B8E23',
        ),
        new Shape(
            'SmallLLeft',
            [
                [false, true],
                [true, true],
            ],
            '#6B8E23',
        ),

        // Single (Light Blue - softer)
        new Shape('Single', [[true]], '#4682B4'),
    ]

    /**
     * Returns all available shapes
     */
    static all(): Shape[] {
        return [...this.shapes]
    }

    /**
     * Returns a random shape from the available shapes
     */
    static random(): Shape {
        return this.shapes[Math.floor(Math.random() * this.shapes.length)]
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
