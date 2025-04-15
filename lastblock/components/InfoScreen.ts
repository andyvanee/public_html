export class InfoScreen extends HTMLElement {
    private isVisible: boolean = false
    private container: HTMLDivElement
    private tabButtons: HTMLButtonElement[] = []
    private tabContents: HTMLDivElement[] = []
    private activeTab: number = 0

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })

        // Create styles
        const style = document.createElement('style')
        style.textContent = `
            :host {
                display: block;
                width: 100%;
            }
            
            .info-container {
                background-color: var(--container-background, #2A2723);
                border: 1px solid var(--border-color, #53493F);
                border-radius: 8px;
                padding: 0;
                margin: 10px 0;
                color: var(--text-color, #D4AF91);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.3s ease-out, opacity 0.3s ease;
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
                border-bottom: 1px solid var(--border-color, #53493F);
            }
            
            .tab-button {
                background: transparent;
                border: none;
                color: var(--text-color, #D4AF91);
                padding: 12px 20px;
                cursor: pointer;
                font-size: 16px;
                opacity: 0.7;
                transition: opacity 0.2s, background-color 0.2s;
                flex: 1;
            }
            
            .tab-button:hover {
                background-color: rgba(255, 255, 255, 0.05);
            }
            
            .tab-button.active {
                opacity: 1;
                border-bottom: 2px solid var(--color-teal, #3D8C9E);
            }
            
            .tab-content {
                display: none;
                padding: 20px;
            }
            
            .tab-content.active {
                display: block;
            }
            
            h2 {
                color: var(--text-color, #D4AF91);
                margin-top: 0;
                margin-bottom: 12px;
                border-bottom: 1px solid var(--border-color, #53493F);
                padding-bottom: 8px;
            }
            
            p {
                margin-bottom: 12px;
                line-height: 1.5;
            }
            
            .close-button {
                background-color: var(--button-background, #BE9B7B);
                color: var(--button-text, #2A2723);
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
                background-color: var(--button-hover, #D4AF91);
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
        `

        // Create info container
        this.container = document.createElement('div')
        this.container.className = 'info-container'

        // Create tabs
        const tabsContainer = document.createElement('div')
        tabsContainer.className = 'tabs'

        // Create Info tab
        const infoTabButton = document.createElement('button')
        infoTabButton.className = 'tab-button active'
        infoTabButton.textContent = 'How to Play'
        infoTabButton.addEventListener('click', () => this.switchTab(0))
        this.tabButtons.push(infoTabButton)

        // Create Settings tab
        const settingsTabButton = document.createElement('button')
        settingsTabButton.className = 'tab-button'
        settingsTabButton.textContent = 'Settings'
        settingsTabButton.addEventListener('click', () => this.switchTab(1))
        this.tabButtons.push(settingsTabButton)

        // Add tab buttons to tabs container
        tabsContainer.appendChild(infoTabButton)
        tabsContainer.appendChild(settingsTabButton)

        // Create tab contents
        // Info tab content
        const infoContent = document.createElement('div')
        infoContent.className = 'tab-content active'

        const instructions1 = document.createElement('p')
        instructions1.textContent =
            'Drag and drop blocks onto the grid. Complete rows or columns to clear them and score points. Game over when no more pieces can be placed.'

        const instructions2 = document.createElement('p')
        instructions2.textContent = 'Clear multiple lines at once for a bigger bonus!'

        infoContent.appendChild(instructions1)
        infoContent.appendChild(instructions2)
        this.tabContents.push(infoContent)

        // Settings tab content
        const settingsContent = document.createElement('div')
        settingsContent.className = 'tab-content'

        // Theme setting
        const themeGroup = document.createElement('div')
        themeGroup.className = 'setting-group'

        const themeHeading = document.createElement('h3')
        themeHeading.textContent = 'Theme'
        themeGroup.appendChild(themeHeading)

        // Theme options (placeholder for future implementation)
        const themeOption1 = this.createSettingOption('theme', 'default', 'Default', true)
        const themeOption2 = this.createSettingOption('theme', 'dark', 'Dark')

        themeGroup.appendChild(themeOption1)
        themeGroup.appendChild(themeOption2)

        settingsContent.appendChild(themeGroup)

        // Sound setting
        const soundGroup = document.createElement('div')
        soundGroup.className = 'setting-group'

        const soundHeading = document.createElement('h3')
        soundHeading.textContent = 'Sound'
        soundGroup.appendChild(soundHeading)

        // Sound options (placeholder for future implementation)
        const soundOption1 = this.createSettingOption('sound', 'on', 'On', true)
        const soundOption2 = this.createSettingOption('sound', 'off', 'Off')

        soundGroup.appendChild(soundOption1)
        soundGroup.appendChild(soundOption2)

        settingsContent.appendChild(soundGroup)
        this.tabContents.push(settingsContent)

        // Create close button
        const closeButton = document.createElement('button')
        closeButton.className = 'close-button'
        closeButton.textContent = 'Close'
        closeButton.addEventListener('click', this.toggle.bind(this))

        // Add all elements to container
        this.container.appendChild(tabsContainer)
        this.container.appendChild(infoContent)
        this.container.appendChild(settingsContent)
        this.container.appendChild(closeButton)

        // Add to shadow DOM
        this.shadowRoot!.appendChild(style)
        this.shadowRoot!.appendChild(this.container)

        // Listen for toggle event
        document.addEventListener('toggle-info-screen', this.toggle.bind(this))
    }

    toggle(): void {
        this.isVisible = !this.isVisible
        if (this.isVisible) {
            this.container.classList.add('visible')
        } else {
            this.container.classList.remove('visible')
        }
    }

    switchTab(index: number): void {
        // Update tab buttons
        this.tabButtons.forEach((button, i) => {
            if (i === index) {
                button.classList.add('active')
            } else {
                button.classList.remove('active')
            }
        })

        // Update tab contents
        this.tabContents.forEach((content, i) => {
            if (i === index) {
                content.classList.add('active')
            } else {
                content.classList.remove('active')
            }
        })

        this.activeTab = index
    }

    createSettingOption(name: string, value: string, label: string, checked: boolean = false): HTMLDivElement {
        const optionDiv = document.createElement('div')
        optionDiv.className = 'setting-option'

        const radio = document.createElement('input')
        radio.type = 'radio'
        radio.id = `${name}-${value}`
        radio.name = name
        radio.value = value
        radio.checked = checked

        const labelEl = document.createElement('label')
        labelEl.htmlFor = `${name}-${value}`
        labelEl.textContent = label

        optionDiv.appendChild(radio)
        optionDiv.appendChild(labelEl)

        return optionDiv
    }

    // For manually triggering visibility
    show(): void {
        this.isVisible = true
        this.container.classList.add('visible')
    }

    hide(): void {
        this.isVisible = false
        this.container.classList.remove('visible')
    }
}
