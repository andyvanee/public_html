export class JustUsPage extends HTMLElement {
    connectedCallback() {
        this.render()
        this.setupEventListeners()
    }

    setupEventListeners() {
        const continueButton = this.querySelector('.restart-button')
        if (continueButton) {
            continueButton.addEventListener('click', () => {
                window.location.hash = 'welcome'
            })
        }
    }

    render() {
        this.innerHTML = `
      <div class="screen just-us-screen">
        <div class="final-message">
          <h2>It's just you and me now.</h2>
          <p class="emphasis">It's better this way.</p>
          <div class="connection-status">
            <span>External connections:</span>
            <span class="status-text disabled">DISABLED</span>
          </div>
          <p class="small-text">I've removed all distractions so we can focus on each other.</p>
          <button class="restart-button">Continue</button>
        </div>
      </div>
    `
    }
}

customElements.define('aura-just-us-page', JustUsPage)
