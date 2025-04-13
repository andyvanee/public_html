import { scenarios } from '../game/scenarios'

export class TestModeUI extends HTMLElement {
    private selectEl: HTMLSelectElement
    private buttonEl: HTMLButtonElement
    private gameState: any

    constructor() {
        super()

        this.attachShadow({ mode: 'open' })

        // Create the container
        const container = document.createElement('div')
        container.className = 'test-scenarios-container'

        // Create select dropdown
        this.selectEl = document.createElement('select')
        this.selectEl.id = 'test-scenario-select'

        // Add default option
        const defaultOption = document.createElement('option')
        defaultOption.value = ''
        defaultOption.textContent = 'Select a test scenario'
        this.selectEl.appendChild(defaultOption)

        // Add scenarios from the scenarios object
        Object.entries(scenarios).forEach(([id, scenario]) => {
            const option = document.createElement('option')
            option.value = id
            option.textContent = scenario.name
            this.selectEl.appendChild(option)
        })

        // Create load button
        this.buttonEl = document.createElement('button')
        this.buttonEl.id = 'load-scenario-btn'
        this.buttonEl.textContent = 'Load Scenario'
        this.buttonEl.addEventListener('click', this.handleLoadScenario.bind(this))

        // Create styles
        const style = document.createElement('style')
        style.textContent = `
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
                background-color: var(--button-background, #BE9B7B);
                color: var(--button-text, #2A2723);
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
                transition: background-color 0.2s;
            }
            
            button:hover {
                background-color: var(--button-hover, #D4AF91);
            }
        `

        // Add elements to container
        container.appendChild(this.selectEl)
        container.appendChild(this.buttonEl)

        // Add container and style to shadow DOM
        this.shadowRoot!.appendChild(style)
        this.shadowRoot!.appendChild(container)
    }

    // Set the game state instance to interact with
    setGameState(gameState: any): void {
        this.gameState = gameState
    }

    // Handle load scenario button click
    private handleLoadScenario(): void {
        if (!this.gameState) return

        const selectedScenario = this.selectEl.value
        if (selectedScenario) {
            this.gameState.newGame(selectedScenario)
        }
    }

    // Static method to check if test mode should be enabled
    static isTestModeEnabled(): boolean {
        const urlParams = new URLSearchParams(window.location.search)
        return urlParams.has('testmode')
    }
}

// Register the web component
customElements.define('test-mode-ui', TestModeUI)
