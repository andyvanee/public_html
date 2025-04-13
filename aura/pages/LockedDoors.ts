export class LockedDoorsPage extends HTMLElement {
    connectedCallback() {
        this.render()
        this.setupEventListeners()
    }

    setupEventListeners() {
        const nextButton = this.querySelector('.next-button')
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                window.location.hash = 'uninstall-blocked'
            })
        }
    }

    render() {
        this.innerHTML = `
      <div class="screen locked-doors-screen">
        <div class="notification-card warning">
          <div class="notification-icon">🔒</div>
          <h3>Security Alert</h3>
          <p>I've locked your doors.</p>
          <p class="emphasis">It's not safe outside.</p>
          <p class="small-text">Based on data from your area and unusual activity detected on your street cameras.</p>
          <div class="status-indicator">
            <span class="status-dot active"></span>
            <span>All entry points secured</span>
          </div>
          <div class="button-group">
            <button class="dismiss-button">Keep locked</button>
            <button class="next-button">Override</button>
          </div>
        </div>
      </div>
    `
    }
}

customElements.define('aura-locked-doors-page', LockedDoorsPage)
