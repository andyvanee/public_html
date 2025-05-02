import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import './Status'

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

        .score-container {
            font-size: 16px;
            font-family: 'Source Sans 3', sans-serif;
            font-weight: 900;
            color: var(--text-color, #d4af91);
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 15px;
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
            padding: 5px 15px 5px 5px;
            transition: transform 0.2s;
        }

        .menu-button:hover {
            transform: scale(1.1);
        }

        .header-content {
            display: flex;
            align-items: center;
            width: 100%;
            padding: 0.5rem 0;
        }

        .score-value {
            color: var(--color-gold, #c6aa11);
            margin-left: 5px;
        }
    `

    constructor() {
        super()
        document.addEventListener('score-updated', this.handleScoreUpdate.bind(this) as EventListener)

        setTimeout(() => {
            document.dispatchEvent(new CustomEvent('request-score-update'))
        }, 0)
    }

    connectedCallback(): void {
        super.connectedCallback()
        document.dispatchEvent(new CustomEvent('request-score-update'))
    }

    disconnectedCallback(): void {
        super.disconnectedCallback()
        document.removeEventListener('score-updated', this.handleScoreUpdate.bind(this) as EventListener)
    }

    private handleMenuClick(): void {
        this.dispatchEvent(
            new CustomEvent('toggle-info-screen', {
                bubbles: true,
                composed: true,
            }),
        )
    }

    private handleScoreUpdate(event: CustomEvent): void {
        if (event.detail && typeof event.detail.score === 'number') {
            this.score = event.detail.score
        }
    }

    getScoreElement(): HTMLElement {
        return this.renderRoot.querySelector('#score') as HTMLElement
    }

    render() {
        return html`
            <div class="header-content">
                <game-status></game-status>
                <div class="score-container">Score: <span id="score" class="score-value">${this.score}</span></div>
                <div class="menu-button-container">
                    <button class="menu-button" @click=${this.handleMenuClick} aria-label="Open Information">
                        &#9776;
                    </button>
                </div>
            </div>
        `
    }
}
