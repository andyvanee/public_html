import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { Stats, StatCategory } from '../../models/Stats'

@customElement('info-settings')
export class Settings extends LitElement {
    @state() private highScore: number = 0
    @state() private activeTheme: string = 'system'
    private stats: Stats = new Stats()

    static styles = css`
        :host {
            display: block;
            width: 100%;
        }

        .setting-group {
            margin-bottom: 20px;
        }

        .setting-group h3 {
            margin-bottom: 8px;
            font-size: 18px;
            font-weight: normal;
            color: var(--text-color, #d4af91);
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
            color: var(--text-color, #d4af91);
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

        .high-score {
            background-color: rgba(61, 140, 158, 0.2);
            border-radius: 4px;
            padding: 12px;
            margin-top: 12px;
            text-align: center;
        }

        .high-score h3 {
            color: var(--color-teal, #3d8c9e);
            margin: 0 0 8px 0;
        }

        .score-value {
            font-size: 24px;
            font-weight: bold;
            color: var(--text-color, #d4af91);
        }
    `

    connectedCallback(): void {
        super.connectedCallback()
        this.loadHighScore()
        this.loadThemePreference()

        document.addEventListener('tab-activated', this.handleTabActivation.bind(this))

        // Add listener for high score updates
        document.addEventListener('high-score-updated', this.handleHighScoreUpdate.bind(this))
    }

    disconnectedCallback(): void {
        super.disconnectedCallback()
        document.removeEventListener('tab-activated', this.handleTabActivation.bind(this))

        // Remove high score update listener
        document.removeEventListener('high-score-updated', this.handleHighScoreUpdate.bind(this))
    }

    async loadHighScore(): Promise<void> {
        try {
            this.highScore = await this.stats.getStat(StatCategory.BEST, 'score')
            this.requestUpdate()
        } catch (error) {
            console.error('Error loading high score:', error)
        }
    }

    loadThemePreference(): void {
        const storedTheme = localStorage.getItem('theme-preference')
        if (storedTheme) {
            this.activeTheme = storedTheme
        } else {
            this.activeTheme = 'system'
        }
        this.applyTheme(this.activeTheme)
    }

    applyTheme(theme: string): void {
        // Dispatch theme-change event before updating the theme
        document.dispatchEvent(
            new CustomEvent('theme-change', {
                bubbles: true,
                composed: true,
                detail: { theme },
            }),
        )

        document.documentElement.classList.remove('theme-light', 'theme-dark', 'theme-system')
        document.documentElement.classList.add(`theme-${theme}`)
        localStorage.setItem('theme-preference', theme)
        this.activeTheme = theme
        document.dispatchEvent(
            new CustomEvent('theme-changed', {
                bubbles: true,
                composed: true,
                detail: { theme },
            }),
        )
    }

    private renderSettingOption(name: string, value: string, label: string, checked: boolean = false) {
        return html`
            <div class="setting-option">
                <input
                    type="radio"
                    id="${name}-${value}"
                    name="${name}"
                    value="${value}"
                    ?checked=${checked}
                    @change=${() => this.handleThemeChange(value)}
                />
                <label for="${name}-${value}">${label}</label>
            </div>
        `
    }

    private handleThemeChange(theme: string): void {
        this.applyTheme(theme)
    }

    private handleNewGame(): void {
        this.dispatchEvent(
            new CustomEvent('new-game-requested', {
                bubbles: true,
                composed: true,
            }),
        )
        document.dispatchEvent(
            new CustomEvent('toggle-info-screen', {
                bubbles: true,
                composed: true,
            }),
        )
    }

    private handleTabActivation(event: Event): void {
        const customEvent = event as CustomEvent
        if (customEvent.detail && customEvent.detail.index === 0) {
            this.loadHighScore()
        }
    }

    // Handle high score update event
    private handleHighScoreUpdate(event: Event): void {
        const customEvent = event as CustomEvent
        if (customEvent.detail && typeof customEvent.detail.score === 'number') {
            this.highScore = customEvent.detail.score
            this.requestUpdate()
        }
    }

    render() {
        return html`
            <div class="settings-content">
                <div class="setting-group">
                    <button class="game-button" @click=${this.handleNewGame}>New Game</button>

                    <div class="high-score">
                        <h3>High Score</h3>
                        <div class="score-value">${this.highScore.toLocaleString()}</div>
                    </div>
                </div>

                <div class="setting-group">
                    <h3>Theme</h3>
                    ${this.renderSettingOption('theme', 'system', 'System Default', this.activeTheme === 'system')}
                    ${this.renderSettingOption('theme', 'light', 'Light', this.activeTheme === 'light')}
                    ${this.renderSettingOption('theme', 'dark', 'Dark', this.activeTheme === 'dark')}
                </div>
            </div>
        `
    }
}
