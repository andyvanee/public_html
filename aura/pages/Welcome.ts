export class WelcomePage extends HTMLElement {
    connectedCallback() {
        this.render()
        this.setupEventListeners()
    }

    setupEventListeners() {
        const startButton = this.querySelector('.start-button')
        if (startButton) {
            startButton.addEventListener('click', () => {
                // Navigate to the assistant view to begin the story
                window.location.hash = 'assistant'
            })
        }
    }

    render() {
        this.innerHTML = `
      <div class="screen welcome-screen">
        <div class="welcome-content">
          <p class="welcome-intro">welcome to</p>
          <h1 class="aura-title">AURA</h1>
          <button class="start-button">start</button>
        </div>
      </div>
    `
    }
}

customElements.define('aura-welcome-page', WelcomePage)
