import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import './InfoScreen/Instructions'
import './InfoScreen/Settings'

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

        .close-button {
            background-color: var(--button-background, #be9b7b);
            color: var(--button-text, #2a2723);
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            margin: 0 20px 20px;
            transition: background-color 0.2s;
            font-weight: bold;
        }

        .close-button:hover {
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

    render() {
        return html`
            <div class="info-container ${this.isVisible ? 'visible' : ''}">
                <div class="tabs">
                    <button
                        class="tab-button ${this.activeTab === 0 ? 'active' : ''}"
                        @click=${() => this.switchTab(0)}
                    >
                        Settings
                    </button>
                    <button
                        class="tab-button ${this.activeTab === 1 ? 'active' : ''}"
                        @click=${() => this.switchTab(1)}
                    >
                        How to Play
                    </button>
                </div>

                <div class="tab-content ${this.activeTab === 0 ? 'active' : ''}">
                    <info-settings></info-settings>
                </div>

                <div class="tab-content ${this.activeTab === 1 ? 'active' : ''}">
                    <info-instructions></info-instructions>
                </div>

                <button class="close-button" @click=${this.toggle}>Close</button>
            </div>
        `
    }
}
