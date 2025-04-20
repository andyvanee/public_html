import { config } from '../config/gameConfig'
import { Block } from '../components/Block'

/**
 * Updates the score display in the UI using custom events
 */
export function updateScoreDisplay(score: number): void {
    // Dispatch a custom event with the score that will work through shadow DOM
    document.dispatchEvent(
        new CustomEvent('score-updated', {
            detail: { score },
            bubbles: true,
            composed: true, // This is crucial for crossing Shadow DOM boundaries
        }),
    )

    // Removed outdated document.getElementById approach that won't work with Shadow DOM
}

/**
 * Renders all available pieces on the canvas
 */
export function renderAvailablePieces(ctx: CanvasRenderingContext2D, pieces: Block[]): void {
    for (let i = 0; i < pieces.length; i++) {
        if (pieces[i].isAvailable) {
            pieces[i].render(ctx)
        }
    }
}

/**
 * Render the game over screen
 */
export function renderGameOver(ctx: CanvasRenderingContext2D, score: number): void {
    const canvasWidth = ctx.canvas.width
    const canvasHeight = ctx.canvas.height

    // Clear the canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Draw the dark overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Set up the text style
    ctx.font = 'bold 40px Arial'
    ctx.fillStyle = '#FFFFFF'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // Draw the main game over text
    ctx.fillText('GAME OVER', canvasWidth / 2, canvasHeight / 3)

    // Draw the score
    ctx.font = '30px Arial'
    ctx.fillText(`Score: ${score}`, canvasWidth / 2, canvasHeight / 2)

    // Note: High score message is now shown as a toast notification instead
}

/**
 * Renders a button on the overlay canvas with hover effect
 */
export function renderPlayAgainButton(ctx: CanvasRenderingContext2D, isHovering: boolean) {
    const canvas = ctx.canvas
    const width = canvas.width
    const gridHeight = config.gridSize * config.cellSize

    const buttonConfig = config.gameOverButton
    const buttonX = (width - buttonConfig.width) / 2
    const buttonY = gridHeight * 0.65

    // Draw button background
    ctx.fillStyle = isHovering ? buttonConfig.hoverColor : buttonConfig.color
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)'
    ctx.lineWidth = 2

    // Rounded rectangle for button
    const radius = 8
    ctx.beginPath()
    ctx.moveTo(buttonX + radius, buttonY)
    ctx.lineTo(buttonX + buttonConfig.width - radius, buttonY)
    ctx.quadraticCurveTo(buttonX + buttonConfig.width, buttonY, buttonX + buttonConfig.width, buttonY + radius)
    ctx.lineTo(buttonX + buttonConfig.width, buttonY + buttonConfig.height - radius)
    ctx.quadraticCurveTo(
        buttonX + buttonConfig.width,
        buttonY + buttonConfig.height,
        buttonX + buttonConfig.width - radius,
        buttonY + buttonConfig.height,
    )
    ctx.lineTo(buttonX + radius, buttonY + buttonConfig.height)
    ctx.quadraticCurveTo(buttonX, buttonY + buttonConfig.height, buttonX, buttonY + buttonConfig.height - radius)
    ctx.lineTo(buttonX, buttonY + radius)
    ctx.quadraticCurveTo(buttonX, buttonY, buttonX + radius, buttonY)
    ctx.closePath()

    ctx.fill()
    ctx.stroke()

    // Draw button text
    ctx.font = buttonConfig.font
    ctx.fillStyle = buttonConfig.textColor
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(buttonConfig.text, buttonX + buttonConfig.width / 2, buttonY + buttonConfig.height / 2)

    // Return button boundaries for hit testing
    return {
        x: buttonX,
        y: buttonY,
        width: buttonConfig.width,
        height: buttonConfig.height,
    }
}

/**
 * Checks if a point is inside a rectangle
 */
export function pointInRect(x: number, y: number, rectX: number, rectY: number, rectW: number, rectH: number): boolean {
    return x >= rectX && x <= rectX + rectW && y >= rectY && y <= rectY + rectH
}
