import { LitElement, html, css } from 'lit'
import type { TemplateResult } from 'lit'
import { customElement, query, state } from 'lit/decorators.js'
import { GameState } from '../game/GameState'
import { TestModeUI } from './TestModeUI'
import { updateScoreDisplay } from '../utils/uiHelpers'
import './GameHeader'
import './InfoScreen'

/**
 * Shell component that manages the game state and TestModeUI
 */
@customElement('game-shell')
export class Shell extends LitElement {
    @state() private game: GameState | null = null
    @state() private isTestModeEnabled = TestModeUI.isTestModeEnabled()

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
            flex-direction: column;
            align-items: center;
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
    `

    connectedCallback(): void {
        super.connectedCallback()
        this.addEventListener('new-game-requested', this.handleNewGame.bind(this))
    }

    disconnectedCallback(): void {
        super.disconnectedCallback()
        this.removeEventListener('new-game-requested', this.handleNewGame.bind(this))
    }

    firstUpdated(): void {
        // Initialize game with canvas references
        this.game = new GameState(this.mainCanvas, this.overlayCanvas)
        this.game.initialize()

        // Initialize test mode UI if enabled
        if (this.isTestModeEnabled) {
            const testModeUI = this.shadowRoot?.querySelector('test-mode-ui') as TestModeUI
            if (testModeUI && this.game) {
                testModeUI.setGameState(this.game)
            }
        }

        // Dispatch an initial score update event
        updateScoreDisplay(0)
    }

    private handleNewGame(): void {
        if (this.game) {
            this.game.newGame()
        }
    }

    private renderTestModeUI(): TemplateResult {
        if (!this.isTestModeEnabled) {
            return html``
        }

        return html` <test-mode-ui> </test-mode-ui> `
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
                        <canvas id="overlay-canvas" width="400" height="550"></canvas>
                    </div>
                </div>
            </div>
        `
    }
}
