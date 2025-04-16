export class GameHeader extends HTMLElement {
    private menuButton: HTMLButtonElement
    private scoreElement: HTMLElement

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })

        // Create styles
        const style = document.createElement('style')
        style.textContent = `
            :host {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-bottom: 10px;
                border-bottom: 1px solid var(--border-color, #53493F);
                width: 100%;
            }
            
            h1 {
                color: var(--text-color, #D4AF91);
                margin: 0;
                font-size: 18px;
                font-weight: 400;
                font-family: var(--font-family);
            }
            
            .score-container {
                font-size: 18px;
                color: var(--text-color, #D4AF91);
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
                color: var(--text-color, #D4AF91);
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

        // Create header structure
        const headerContent = document.createElement('div')
        headerContent.className = 'header-content'

        // Add title
        const title = document.createElement('h1')
        title.textContent = 'Lastblock'

        // Create middle section with score
        const scoreContainer = document.createElement('div')
        scoreContainer.className = 'score-container'
        this.scoreElement = document.createElement('span')
        this.scoreElement.id = 'score'
        this.scoreElement.textContent = '0'
        scoreContainer.innerHTML = 'Score: '
        scoreContainer.appendChild(this.scoreElement)

        // Create menu button with container
        const menuButtonContainer = document.createElement('div')
        menuButtonContainer.className = 'menu-button-container'

        this.menuButton = document.createElement('button')
        this.menuButton.className = 'menu-button'
        this.menuButton.innerHTML = '&#9776;' // Hamburger menu icon
        this.menuButton.setAttribute('aria-label', 'Open Information')
        this.menuButton.addEventListener('click', this.handleMenuClick.bind(this))

        menuButtonContainer.appendChild(this.menuButton)

        // Add elements to header
        headerContent.appendChild(title)
        headerContent.appendChild(scoreContainer)
        headerContent.appendChild(menuButtonContainer)

        // Add to shadow root
        this.shadowRoot!.appendChild(style)
        this.shadowRoot!.appendChild(headerContent)

        // Listen for score update events
        document.addEventListener('score-updated', this.handleScoreUpdate.bind(this) as EventListener)
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
            this.scoreElement.textContent = event.detail.score.toString()
        }
    }

    connectedCallback(): void {
        // Request current score when connected to DOM
        document.dispatchEvent(new CustomEvent('request-score-update'))
    }

    // For backwards compatibility
    getScoreElement(): HTMLElement {
        return this.scoreElement
    }
}
