import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('game-header')
export class GameHeader extends LitElement {
    @property({ type: Number })
    score = 0

    static styles = css`
        :host {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 10px;
            border-bottom: 1px solid var(--border-color, #53493f);
            width: 100%;
        }

        h1 {
            color: var(--text-color, #d4af91);
            margin: 0;
            font-size: 18px;
            font-weight: 400;
            font-family: var(--font-family);
        }

        .score-container {
            font-size: 18px;
            color: var(--text-color, #d4af91);
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 400;
        }

        .menu-button-container {
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }

        .menu-button {
            background: transparent;
            border: none;
            cursor: pointer;
            color: var(--text-color, #d4af91);
            font-size: 1.6rem;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px;
            transition: transform 0.2s;
        }

        .menu-button:hover {
            transform: scale(1.1);
        }

        .header-content {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            align-items: center;
            width: 100%;
            padding: 0.5rem 0;
        }
    `

    constructor() {
        super()
        // Listen for score update events (now on document as they cross Shadow DOM)
        document.addEventListener('score-updated', this.handleScoreUpdate.bind(this) as EventListener)
    }

    connectedCallback(): void {
        super.connectedCallback()
        // Request current score when connected to DOM
        document.dispatchEvent(new CustomEvent('request-score-update'))
    }

    disconnectedCallback(): void {
        super.disconnectedCallback()
        // Clean up the event listener when component is removed
        document.removeEventListener('score-updated', this.handleScoreUpdate.bind(this) as EventListener)
    }

    private handleMenuClick(): void {
        // Dispatch a custom event that will be handled to show the info screen
        const event = new CustomEvent('toggle-info-screen', {
            bubbles: true,
            composed: true,
        })
        this.dispatchEvent(event)
    }

    private handleScoreUpdate(event: CustomEvent): void {
        if (event.detail && typeof event.detail.score === 'number') {
            this.score = event.detail.score
        }
    }

    // For backwards compatibility
    getScoreElement(): HTMLElement {
        return this.renderRoot.querySelector('#score') as HTMLElement
    }

    render() {
        return html`
            <div class="header-content">
                <h1>Lastblock</h1>
                <div class="score-container">Score: <span id="score">${this.score}</span></div>
                <div class="menu-button-container">
                    <button class="menu-button" @click=${this.handleMenuClick} aria-label="Open Information">
                        &#9776;
                    </button>
                </div>
            </div>
        `
    }
}
