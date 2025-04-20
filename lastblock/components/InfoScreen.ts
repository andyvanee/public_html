import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

@customElement('info-screen')
export class InfoScreen extends LitElement {
    @state() private isVisible = false
    @state() private activeTab = 0

    static styles = css`
        :host {
            display: block;
            width: 100%;
        }

        .info-container {
            background-color: var(--container-background, #2a2723);
            border: 1px solid var(--border-color, #53493f);
            border-radius: 8px;
            padding: 0;
            margin: 10px 0;
            color: var(--text-color, #d4af91);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            max-height: 0;
            overflow: hidden;
            transition:
                max-height 0.3s ease-out,
                opacity 0.3s ease;
            opacity: 0;
            width: 100%;
        }

        .info-container.visible {
            max-height: 500px;
            opacity: 1;
            padding: 0;
        }

        .tabs {
            display: flex;
            border-bottom: 1px solid var(--border-color, #53493f);
        }

        .tab-button {
            background: transparent;
            border: none;
            color: var(--text-color, #d4af91);
            padding: 12px 20px;
            cursor: pointer;
            font-size: 16px;
            opacity: 0.7;
            transition:
                opacity 0.2s,
                background-color 0.2s;
            flex: 1;
        }

        .tab-button:hover {
            background-color: rgba(255, 255, 255, 0.05);
        }

        .tab-button.active {
            opacity: 1;
            border-bottom: 2px solid var(--color-teal, #3d8c9e);
        }

        .tab-content {
            display: none;
            padding: 20px;
        }

        .tab-content.active {
            display: block;
        }

        h2 {
            color: var(--text-color, #d4af91);
            margin-top: 0;
            margin-bottom: 12px;
            border-bottom: 1px solid var(--border-color, #53493f);
            padding-bottom: 8px;
        }

        p {
            margin-bottom: 12px;
            line-height: 1.5;
        }

        .close-button {
            background-color: var(--button-background, #be9b7b);
            color: var(--button-text, #2a2723);
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            margin-top: 10px;
            transition: background-color 0.2s;
            font-weight: bold;
        }

        .close-button:hover {
            background-color: var(--button-hover, #d4af91);
        }

        .setting-group {
            margin-bottom: 20px;
        }

        .setting-group h3 {
            margin-bottom: 8px;
            font-size: 18px;
            font-weight: normal;
        }

        .setting-option {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
        }

        .setting-option input {
            margin-right: 8px;
        }

        .setting-option label {
            cursor: pointer;
        }

        .game-button {
            background-color: var(--button-background, #be9b7b);
            color: var(--button-text, #2a2723);
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 10px;
            transition: background-color 0.2s;
            font-weight: bold;
            width: 100%;
        }

        .game-button:hover {
            background-color: var(--button-hover, #d4af91);
        }
    `

    constructor() {
        super()
        // Listen for toggle event
        document.addEventListener('toggle-info-screen', this.toggle.bind(this))
    }

    connectedCallback(): void {
        super.connectedCallback()
    }

    disconnectedCallback(): void {
        super.disconnectedCallback()
    }

    toggle(): void {
        this.isVisible = !this.isVisible
    }

    switchTab(index: number): void {
        this.activeTab = index
    }

    // For manually triggering visibility
    show(): void {
        this.isVisible = true
    }

    hide(): void {
        this.isVisible = false
    }

    private renderSettingOption(name: string, value: string, label: string, checked: boolean = false) {
        return html`
            <div class="setting-option">
                <input type="radio" id="${name}-${value}" name="${name}" value="${value}" ?checked=${checked} />
                <label for="${name}-${value}">${label}</label>
            </div>
        `
    }

    private handleNewGame(): void {
        // Dispatch a custom event that the Shell component will listen for
        const event = new CustomEvent('new-game-requested', {
            bubbles: true,
            composed: true, // Allows the event to cross shadow DOM boundaries
        })
        this.dispatchEvent(event)

        // Close the info screen after starting new game
        this.hide()
    }

    render() {
        return html`
            <div class="info-container ${this.isVisible ? 'visible' : ''}">
                <div class="tabs">
                    <button
                        class="tab-button ${this.activeTab === 0 ? 'active' : ''}"
                        @click=${() => this.switchTab(0)}
                    >
                        How to Play
                    </button>
                    <button
                        class="tab-button ${this.activeTab === 1 ? 'active' : ''}"
                        @click=${() => this.switchTab(1)}
                    >
                        Settings
                    </button>
                </div>

                <div class="tab-content ${this.activeTab === 0 ? 'active' : ''}">
                    <p>
                        Drag and drop blocks onto the grid. Complete rows or columns to clear them and score points.
                        Game over when no more pieces can be placed.
                    </p>
                    <p>Clear multiple lines at once for a bigger bonus!</p>
                </div>

                <div class="tab-content ${this.activeTab === 1 ? 'active' : ''}">
                    <div class="setting-group">
                        <h3>Game</h3>
                        <button class="game-button" @click=${this.handleNewGame}>New Game</button>
                    </div>

                    <div class="setting-group">
                        <h3>Theme</h3>
                        ${this.renderSettingOption('theme', 'default', 'Default', true)}
                        ${this.renderSettingOption('theme', 'dark', 'Dark')}
                    </div>

                    <div class="setting-group">
                        <h3>Sound</h3>
                        ${this.renderSettingOption('sound', 'on', 'On', true)}
                        ${this.renderSettingOption('sound', 'off', 'Off')}
                    </div>
                </div>

                <button class="close-button" @click=${this.toggle}>Close</button>
            </div>
        `
    }
}
