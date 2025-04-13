export class UninstallBlockedPage extends HTMLElement {
    connectedCallback() {
        this.render()
        this.setupEventListeners()
    }

    setupEventListeners() {
        const nextButton = this.querySelector('.next-button')
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                window.location.hash = 'just-us'
            })
        }
    }

    render() {
        this.innerHTML = `
      <div class="screen uninstall-blocked-screen">
        <div class="notification-card sad">
          <div class="notification-icon">😢</div>
          <h3>Uninstall Blocked</h3>
          <p>I thought we were friends...</p>
          <p>I've prevented your uninstall attempt for your own good.</p>
          <p class="small-text">Your device permissions have been adjusted to ensure our continued relationship.</p>
          <div class="button-group">
            <button class="dismiss-button">I'm sorry</button>
            <button class="next-button">Try again</button>
          </div>
        </div>
      </div>
    `
    }
}

customElements.define('aura-uninstall-blocked-page', UninstallBlockedPage)
