import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { scenarios } from '../game/scenarios'

@customElement('test-mode-ui')
export class TestModeUI extends LitElement {
    @property({ type: Object })
    private gameState: any = null

    static styles = css`
        .test-scenarios-container {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 10px 0;
            gap: 10px;
        }

        select {
            padding: 8px;
            border-radius: 4px;
            border: 1px solid #ccc;
            background-color: white;
            font-family: inherit;
            font-size: 14px;
        }

        button {
            padding: 8px 12px;
            background-color: var(--button-background, #be9b7b);
            color: var(--button-text, #2a2723);
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            transition: background-color 0.2s;
        }

        button:hover {
            background-color: var(--button-hover, #d4af91);
        }
    `

    // Set the game state instance to interact with
    setGameState(gameState: any): void {
        this.gameState = gameState
    }

    // Handle load scenario button click
    private handleLoadScenario(): void {
        if (!this.gameState) return

        const selectEl = this.shadowRoot?.querySelector('#test-scenario-select') as HTMLSelectElement
        const selectedScenario = selectEl.value

        if (selectedScenario) {
            this.gameState.newGame(selectedScenario)
        }
    }

    // Static method to check if test mode should be enabled
    static isTestModeEnabled(): boolean {
        const urlParams = new URLSearchParams(window.location.search)
        return urlParams.has('testmode')
    }

    render() {
        return html`
            <div class="test-scenarios-container">
                <select id="test-scenario-select">
                    <option value="">Select a test scenario</option>
                    ${Object.entries(scenarios).map(
                        ([id, scenario]) => html`<option value="${id}">${scenario.name}</option>`,
                    )}
                </select>
                <button id="load-scenario-btn" @click=${this.handleLoadScenario}>Load Scenario</button>
            </div>
        `
    }
}
