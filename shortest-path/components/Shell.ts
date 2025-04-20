import { LitElement, html, css } from 'lit'
import { customElement, query, state } from 'lit/decorators.js'

// Point interface for x,y coordinates
interface Point {
    x: number
    y: number
}

// Path type to differentiate between different path calculation methods
type PathType = 'direct' | 'diagonal' | 'manhattan' | 'optimized'

/**
 * Main Shell component for the Shortest Path application
 */
@customElement('path-shell')
export class Shell extends LitElement {
    @state() private gridSize: number = 20
    @state() private startPoint: Point = { x: 3, y: 3 }
    @state() private endPoint: Point = { x: 16, y: 16 }
    @state() private walls: Point[] = []
    @state() private cellSize: number = 20
    @state() private showSquareComparisons: boolean = true
    @state() private activePathType: PathType = 'direct'
    @state() private paths: Record<PathType, Point[]> = {
        direct: [],
        diagonal: [],
        manhattan: [],
        optimized: [],
    }
    @state() private distances: Record<PathType, { real: number; squared: number }> = {
        direct: { real: 0, squared: 0 },
        diagonal: { real: 0, squared: 0 },
        manhattan: { real: 0, squared: 0 },
        optimized: { real: 0, squared: 0 },
    }

    @query('#grid-canvas') private gridCanvas!: HTMLCanvasElement

    static styles = css`
        :host {
            display: contents;
        }

        .container {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        header {
            width: 100%;
            text-align: center;
            margin-bottom: 10px;
        }

        h1 {
            font-size: 1.8rem;
            margin: 0;
            padding: 15px 0;
        }

        .canvas-container {
            position: relative;
            width: 400px;
            height: 400px;
            border: 1px solid #ccc;
        }

        canvas {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        .controls {
            margin-top: 10px;
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: center;
        }

        button {
            padding: 8px 16px;
            background-color: var(--button-background, #3498db);
            color: var(--button-text, #ffffff);
            border: none;
            border-radius: 4px;
            font-size: 14px;
            cursor: pointer;
            transition: background-color 0.2s;
        }

        button:hover {
            background-color: var(--button-hover, #2980b9);
        }

        button.active {
            background-color: #e74c3c;
        }

        .path-selection {
            margin-top: 15px;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            width: 400px;
        }

        .path-option {
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.2s;
        }

        .path-option.active {
            background-color: #f1c40f;
            border-color: #f39c12;
        }

        .path-option h3 {
            margin-top: 0;
            margin-bottom: 5px;
            font-size: 16px;
        }

        .distance-info {
            font-size: 14px;
            margin: 5px 0;
        }

        .distance-info span {
            font-weight: bold;
        }

        .description {
            font-size: 12px;
            color: #555;
        }
    `

    connectedCallback(): void {
        super.connectedCallback()
        // Initialize when component is added to the DOM
    }

    firstUpdated(): void {
        // Initialize the grid after component is updated for the first time
        this.calculatePaths()
        this.drawGrid()
    }

    private drawGrid(): void {
        const ctx = this.gridCanvas.getContext('2d')
        if (!ctx) return

        const { width, height } = this.gridCanvas
        const grid = this.gridSize
        this.cellSize = Math.min(width, height) / grid

        // Clear canvas
        ctx.clearRect(0, 0, width, height)

        // Draw grid background
        ctx.fillStyle = '#f9f9f9'
        ctx.fillRect(0, 0, width, height)

        // Draw grid lines
        ctx.strokeStyle = '#ddd'
        ctx.lineWidth = 1

        // Draw horizontal lines
        for (let i = 0; i <= grid; i++) {
            ctx.beginPath()
            ctx.moveTo(0, i * this.cellSize)
            ctx.lineTo(width, i * this.cellSize)
            ctx.stroke()
        }

        // Draw vertical lines
        for (let i = 0; i <= grid; i++) {
            ctx.beginPath()
            ctx.moveTo(i * this.cellSize, 0)
            ctx.lineTo(i * this.cellSize, height)
            ctx.stroke()
        }

        // Draw walls
        ctx.fillStyle = 'black'
        for (const wall of this.walls) {
            ctx.fillRect(wall.x * this.cellSize, wall.y * this.cellSize, this.cellSize, this.cellSize)
        }

        // Draw current active path
        this.drawPath(ctx, this.activePathType)

        // Draw start point
        ctx.fillStyle = 'green'
        ctx.beginPath()
        ctx.arc(
            (this.startPoint.x + 0.5) * this.cellSize,
            (this.startPoint.y + 0.5) * this.cellSize,
            this.cellSize * 0.4,
            0,
            Math.PI * 2,
        )
        ctx.fill()

        // Draw end point
        ctx.fillStyle = 'red'
        ctx.beginPath()
        ctx.arc(
            (this.endPoint.x + 0.5) * this.cellSize,
            (this.endPoint.y + 0.5) * this.cellSize,
            this.cellSize * 0.4,
            0,
            Math.PI * 2,
        )
        ctx.fill()
    }

    private drawPath(ctx: CanvasRenderingContext2D, pathType: PathType): void {
        const path = this.paths[pathType]
        if (!path || path.length === 0) return

        ctx.strokeStyle = this.getPathColor(pathType)
        ctx.lineWidth = 2
        ctx.beginPath()

        // Start at the beginning of the path (usually the start point)
        ctx.moveTo((this.startPoint.x + 0.5) * this.cellSize, (this.startPoint.y + 0.5) * this.cellSize)

        // Draw lines through all points in the path
        for (let i = 0; i < path.length; i++) {
            ctx.lineTo((path[i].x + 0.5) * this.cellSize, (path[i].y + 0.5) * this.cellSize)
        }

        ctx.stroke()

        // Draw intermediate points on the path
        ctx.fillStyle = this.getPathColor(pathType)
        for (let i = 0; i < path.length; i++) {
            ctx.beginPath()
            ctx.arc(
                (path[i].x + 0.5) * this.cellSize,
                (path[i].y + 0.5) * this.cellSize,
                this.cellSize * 0.15,
                0,
                Math.PI * 2,
            )
            ctx.fill()
        }
    }

    private getPathColor(pathType: PathType): string {
        switch (pathType) {
            case 'direct':
                return '#3498db' // Blue
            case 'diagonal':
                return '#9b59b6' // Purple
            case 'manhattan':
                return '#e67e22' // Orange
            case 'optimized':
                return '#2ecc71' // Green
            default:
                return '#3498db'
        }
    }

    private calculatePaths(): void {
        this.calculateDirectPath()
        this.calculateDiagonalPath()
        this.calculateManhattanPath()
        this.calculateOptimizedPath()
    }

    private calculateDirectPath(): void {
        // Direct path is just a straight line from start to end
        this.paths.direct = [this.endPoint]

        // Calculate real distance using square root
        const dx = this.endPoint.x - this.startPoint.x
        const dy = this.endPoint.y - this.startPoint.y
        const squared = dx * dx + dy * dy
        const real = Math.sqrt(squared)

        this.distances.direct = { real, squared }
    }

    private calculateDiagonalPath(): void {
        const path: Point[] = []
        let current = { ...this.startPoint }

        // Generate diagonal steps (1,1) until we reach the row/column of the end point
        let totalDistanceSquared = 0
        let totalDistance = 0

        while (current.x !== this.endPoint.x || current.y !== this.endPoint.y) {
            const dx = this.endPoint.x - current.x
            const dy = this.endPoint.y - current.y

            // Move diagonally if possible
            if (dx > 0 && dy > 0) {
                current = { x: current.x + 1, y: current.y + 1 }
                // Diagonal distance is √2
                totalDistance += Math.sqrt(2)
                totalDistanceSquared += 2 // 1² + 1²
            } else if (dx < 0 && dy > 0) {
                current = { x: current.x - 1, y: current.y + 1 }
                totalDistance += Math.sqrt(2)
                totalDistanceSquared += 2
            } else if (dx > 0 && dy < 0) {
                current = { x: current.x + 1, y: current.y - 1 }
                totalDistance += Math.sqrt(2)
                totalDistanceSquared += 2
            } else if (dx < 0 && dy < 0) {
                current = { x: current.x - 1, y: current.y - 1 }
                totalDistance += Math.sqrt(2)
                totalDistanceSquared += 2
            } else if (dx > 0) {
                // Move horizontally
                current = { x: current.x + 1, y: current.y }
                totalDistance += 1
                totalDistanceSquared += 1
            } else if (dx < 0) {
                current = { x: current.x - 1, y: current.y }
                totalDistance += 1
                totalDistanceSquared += 1
            } else if (dy > 0) {
                // Move vertically
                current = { x: current.x, y: current.y + 1 }
                totalDistance += 1
                totalDistanceSquared += 1
            } else if (dy < 0) {
                current = { x: current.x, y: current.y - 1 }
                totalDistance += 1
                totalDistanceSquared += 1
            }

            path.push({ ...current })
        }

        this.paths.diagonal = path
        this.distances.diagonal = { real: totalDistance, squared: totalDistanceSquared }
    }

    private calculateManhattanPath(): void {
        const path: Point[] = []
        let current = { ...this.startPoint }
        let totalDistance = 0

        // First move horizontally to the end's x-coordinate
        while (current.x !== this.endPoint.x) {
            current.x += current.x < this.endPoint.x ? 1 : -1
            path.push({ ...current })
            totalDistance += 1
        }

        // Then move vertically to the end's y-coordinate
        while (current.y !== this.endPoint.y) {
            current.y += current.y < this.endPoint.y ? 1 : -1
            path.push({ ...current })
            totalDistance += 1
        }

        this.paths.manhattan = path
        this.distances.manhattan = {
            real: totalDistance,
            squared: totalDistance, // For Manhattan, real = squared when unit distances
        }
    }

    private calculateOptimizedPath(): void {
        // This is an optimized path that uses a mix of Manhattan and diagonal moves
        // to minimize the total distance without using square roots for comparison
        const path: Point[] = []
        let current = { ...this.startPoint }
        let totalDistance = 0
        let totalSquared = 0

        while (current.x !== this.endPoint.x || current.y !== this.endPoint.y) {
            const dx = this.endPoint.x - current.x
            const dy = this.endPoint.y - current.y

            // For equivalent steps, prefer diagonal (which is actually more efficient)
            // This is the key insight - diagonal moves cover more ground per step
            if (Math.abs(dx) > 0 && Math.abs(dy) > 0) {
                // Move diagonally
                const stepX = dx > 0 ? 1 : -1
                const stepY = dy > 0 ? 1 : -1
                current = { x: current.x + stepX, y: current.y + stepY }

                // A diagonal step has length √2 which is approximately 1.414
                totalDistance += Math.sqrt(2)

                // But the squared distance is exactly 2
                // This is the key point - we can compare squared distances exactly
                totalSquared += 2
            } else if (Math.abs(dx) > 0) {
                // Move horizontally
                current = { x: current.x + (dx > 0 ? 1 : -1), y: current.y }
                totalDistance += 1
                totalSquared += 1
            } else {
                // Move vertically
                current = { x: current.x, y: current.y + (dy > 0 ? 1 : -1) }
                totalDistance += 1
                totalSquared += 1
            }

            path.push({ ...current })
        }

        this.paths.optimized = path
        this.distances.optimized = {
            real: totalDistance,
            squared: totalSquared,
        }
    }

    private handlePointDrag(event: MouseEvent, pointType: 'start' | 'end'): void {
        event.preventDefault()

        const updatePoint = (e: MouseEvent) => {
            const rect = this.gridCanvas.getBoundingClientRect()
            const x = Math.floor((e.clientX - rect.left) / this.cellSize)
            const y = Math.floor((e.clientY - rect.top) / this.cellSize)

            // Ensure x and y are within bounds
            const validX = Math.min(Math.max(0, x), this.gridSize - 1)
            const validY = Math.min(Math.max(0, y), this.gridSize - 1)

            // Update the appropriate point
            if (pointType === 'start') {
                this.startPoint = { x: validX, y: validY }
            } else {
                this.endPoint = { x: validX, y: validY }
            }

            // Recalculate paths and redraw
            this.calculatePaths()
            this.drawGrid()
        }

        const cleanup = () => {
            window.removeEventListener('mousemove', updatePoint)
            window.removeEventListener('mouseup', cleanup)
        }

        window.addEventListener('mousemove', updatePoint)
        window.addEventListener('mouseup', cleanup)
    }

    private handleClearWalls(): void {
        this.walls = []
        this.drawGrid()
    }

    private handleGenerateRandomWalls(): void {
        this.walls = []
        const wallCount = Math.floor(this.gridSize * this.gridSize * 0.2) // 20% of grid as walls

        for (let i = 0; i < wallCount; i++) {
            const x = Math.floor(Math.random() * this.gridSize)
            const y = Math.floor(Math.random() * this.gridSize)

            // Don't place walls at start or end points
            if (
                (x === this.startPoint.x && y === this.startPoint.y) ||
                (x === this.endPoint.x && y === this.endPoint.y)
            ) {
                continue
            }

            this.walls.push({ x, y })
        }

        this.drawGrid()
    }

    private handlePathSelection(pathType: PathType): void {
        this.activePathType = pathType
        this.drawGrid()
    }

    private toggleSquareComparisons(): void {
        this.showSquareComparisons = !this.showSquareComparisons
        this.requestUpdate()
    }

    private getPathDescription(pathType: PathType): string {
        switch (pathType) {
            case 'direct':
                return 'A straight line between points (uses square root for distance calculation)'
            case 'diagonal':
                return 'Uses diagonal (1,1) steps where possible, then single-cell steps'
            case 'manhattan':
                return 'Moves only horizontally then vertically (no diagonals)'
            case 'optimized':
                return 'Optimized path using diagonal steps (comparing squared distances)'
            default:
                return ''
        }
    }

    render() {
        return html`
            <div class="container">
                <header>
                    <h1>Square Root-Free Path Finding</h1>
                </header>

                <div class="canvas-container">
                    <canvas
                        id="grid-canvas"
                        width="400"
                        height="400"
                        @mousedown=${(e: MouseEvent) => {
                            // Check if click is near start or end point
                            const rect = this.gridCanvas.getBoundingClientRect()
                            const x = Math.floor((e.clientX - rect.left) / this.cellSize)
                            const y = Math.floor((e.clientY - rect.top) / this.cellSize)

                            const distToStart = Math.abs(x - this.startPoint.x) + Math.abs(y - this.startPoint.y)
                            const distToEnd = Math.abs(x - this.endPoint.x) + Math.abs(y - this.endPoint.y)

                            if (distToStart <= 1) {
                                this.handlePointDrag(e, 'start')
                            } else if (distToEnd <= 1) {
                                this.handlePointDrag(e, 'end')
                            }
                        }}
                    ></canvas>
                </div>

                <div class="controls">
                    <button @click=${this.handleClearWalls}>Clear Walls</button>
                    <button @click=${this.handleGenerateRandomWalls}>Random Walls</button>
                    <button @click=${this.toggleSquareComparisons}>
                        ${this.showSquareComparisons ? 'Show Real Distances' : 'Show Squared Distances'}
                    </button>
                </div>

                <div class="path-selection">
                    ${['direct', 'diagonal', 'manhattan', 'optimized'].map((type: string) => {
                        const pathType = type as PathType
                        const distanceValue = this.showSquareComparisons
                            ? this.distances[pathType].squared.toFixed(1)
                            : this.distances[pathType].real.toFixed(2)

                        return html`
                            <div
                                class="path-option ${this.activePathType === pathType ? 'active' : ''}"
                                @click=${() => this.handlePathSelection(pathType)}
                            >
                                <h3>${pathType.charAt(0).toUpperCase() + pathType.slice(1)} Path</h3>
                                <div class="distance-info">
                                    Distance: <span>${distanceValue}</span>
                                    ${this.showSquareComparisons ? '(squared)' : ''}
                                </div>
                                <div class="description">${this.getPathDescription(pathType)}</div>
                            </div>
                        `
                    })}
                </div>
            </div>
        `
    }
}
