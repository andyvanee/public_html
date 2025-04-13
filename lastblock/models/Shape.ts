/**
 * Interface for a Shape model
 */
export interface IShape {
    name: string
    pattern: boolean[][]
}

/**
 * Shape namespace with static accessors for shape patterns
 */
export namespace Shape {
    // Define all available shapes
    const shapes: IShape[] = [
        {
            name: 'Line',
            pattern: [[true, true, true, true]],
        },
        {
            name: 'Square2x2',
            pattern: [
                [true, true],
                [true, true],
            ],
        },
        {
            name: 'TShape',
            pattern: [
                [false, true, false],
                [true, true, true],
            ],
        },
        {
            name: 'LShape',
            pattern: [
                [true, false],
                [true, false],
                [true, true],
            ],
        },
        {
            name: 'ZShape',
            pattern: [
                [true, true, false],
                [false, true, true],
            ],
        },
        {
            name: 'Single',
            pattern: [[true]],
        },
        {
            name: 'SmallL',
            pattern: [
                [true, false],
                [true, true],
            ],
        },
        {
            name: 'Square3x3',
            pattern: [
                [true, true, true],
                [true, true, true],
                [true, true, true],
            ],
        },
    ]

    /**
     * Returns all available shapes
     */
    export function all(): IShape[] {
        return [...shapes]
    }

    /**
     * Returns a random shape from the available shapes
     */
    export function random(): IShape {
        return shapes[Math.floor(Math.random() * shapes.length)]
    }

    /**
     * Returns a shape by name
     */
    export function byName(name: string): IShape | undefined {
        return shapes.find((shape) => shape.name === name)
    }

    /**
     * Returns just the pattern of a random shape (for backward compatibility)
     */
    export function randomPattern(): boolean[][] {
        return random().pattern
    }
}
