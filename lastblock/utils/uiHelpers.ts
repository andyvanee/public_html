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
 * Renders the game over screen on the main canvas
 */
export function renderGameOver(ctx: CanvasRenderingContext2D, score: number): void {
    const canvas = ctx.canvas
    const width = canvas.width
    const gridHeight = config.gridSize * config.cellSize

    // Create semi-transparent overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
    ctx.fillRect(0, 0, width, gridHeight + config.pieceAreaHeight)

    // Draw game over text
    ctx.font = '36px Arial'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('Game Over!', width / 2, gridHeight / 3)

    // Draw score
    ctx.font = '28px Arial'
    ctx.fillText(`Final Score: ${score}`, width / 2, gridHeight / 2)
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
