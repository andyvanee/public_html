// Game Configuration
import { css } from '../utils/cssUtils'

export const config = {
    gridSize: 10, // 10x10 grid
    cellSize: 40, // 40px per cell

    // Colors now reference CSS variables
    get colors() {
        return [css.get('color-teal'), css.get('color-light-brown')] // Teal and tan
    },
    get highlightColor() {
        return css.get('highlight-color')
    },
    get invalidColor() {
        return css.get('invalid-color')
    },

    pieceAreaHeight: 150, // Height for the area for available pieces at the bottom
    pieceSize: 80, // Size of each available piece display
    pieceMargin: 20, // Margin between available pieces
    maxAvailablePieces: 3, // Number of available pieces to show

    gameOverButton: {
        width: 200,
        height: 60,
        get color() {
            return css.get('button-background')
        },
        get hoverColor() {
            return css.get('button-hover')
        },
        get textColor() {
            return css.get('button-text')
        },
        font: '20px Arial',
        text: 'Play Again',
    },

    // UI colors
    get backgroundColor() {
        return css.get('background-color')
    },
    get gridLineColor() {
        return css.get('grid-line-color')
    },
    get textColor() {
        return css.get('text-color')
    },
    get borderColor() {
        return css.get('border-color')
    },
}
