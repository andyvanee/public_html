import { LitElement, html, css } from 'lit'
import type { TemplateResult } from 'lit'
import { customElement, query, state } from 'lit/decorators.js'
import { GameState } from '../game/GameState'
import { Toast } from './Toast'
import { TestModeUI } from './TestModeUI'
import { updateScoreDisplay } from '../utils/uiHelpers'
import './GameHeader'
import './InfoScreen'

/**
 * Shell component that manages the game state, toast, and TestModeUI
 */
@customElement('game-shell')
export class Shell extends LitElement {
    @state() private game: GameState = new GameState()
    @state() private toast: Toast | null = null
    @state() private isTestModeEnabled = TestModeUI.isTestModeEnabled()

    @query('#toast-canvas') private toastCanvas!: HTMLCanvasElement
    @query('#main-canvas') private mainCanvas!: HTMLCanvasElement
    @query('#overlay-canvas') private overlayCanvas!: HTMLCanvasElement

    static styles = css`
        :host {
            display: contents;
        }

        .game-container {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .game-area {
            width: 100%;
            display: flex;
            justify-content: center;
            padding: 10px 0;
        }

        .canvas-container {
            position: relative;
            width: 400px;
            height: 550px;
        }

        canvas {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        .controls {
            width: 100%;
            display: flex;
            justify-content: center;
            padding: 10px 0;
        }

        button {
            padding: 10px 20px;
            background-color: var(--button-background, #be9b7b);
            color: var(--button-text, #2a2723);
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.2s;
        }

        button:hover {
            background-color: var(--button-hover, #d4af91);
        }
    `

    connectedCallback(): void {
        super.connectedCallback()
        // We'll initialize the game in firstUpdated
    }

    firstUpdated(): void {
        // Initialize Toast component
        this.toast = new Toast(this.toastCanvas)

        // Initialize game
        this.game.initialize()

        // Dispatch an initial score update event
        updateScoreDisplay(0)
    }

    private handleNewGame(): void {
        this.game.newGame()
    }

    private renderTestModeUI(): TemplateResult {
        if (!this.isTestModeEnabled) {
            return html``
        }

        return html` <test-mode-ui .gameState=${this.game}> </test-mode-ui> `
    }

    render() {
        return html`
            <game-header></game-header>

            <div id="test-mode-container">${this.renderTestModeUI()}</div>

            <info-screen></info-screen>

            <div class="game-container">
                <div class="game-area">
                    <div class="canvas-container">
                        <canvas id="main-canvas" width="400" height="550"></canvas>
                        <canvas id="toast-canvas" width="400" height="550"></canvas>
                        <canvas id="overlay-canvas" width="400" height="550"></canvas>
                    </div>
                </div>
            </div>

            <div class="controls">
                <button id="new-game-btn" @click=${this.handleNewGame}>New Game</button>
            </div>
        `
    }
}
