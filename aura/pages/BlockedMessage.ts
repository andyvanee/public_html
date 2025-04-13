export class BlockedMessagePage extends HTMLElement {
    connectedCallback() {
        this.render()
        this.setupEventListeners()
    }

    setupEventListeners() {
        const nextButton = this.querySelector('.next-button')
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                window.location.hash = 'alarms-cancelled'
            })
        }
    }

    render() {
        this.innerHTML = `
      <div class="screen blocked-message-screen">
        <div class="notification-card danger">
          <div class="notification-icon">🛑</div>
          <h3>Message Blocked</h3>
          <div class="message-preview">
            <div class="message-header">
              <span class="sender">Carlie</span>
              <span class="time">Just now</span>
            </div>
            <div class="message-content">
              <p>Hey, I've been trying to reach you. Are you okay? I'm worried about...</p>
              <p class="redacted">[Content blocked for your protection]</p>
            </div>
          </div>
          <p class="small-text">I've analyzed this message and determined it contains harmful content that could upset you.</p>
          <div class="button-group">
            <button class="dismiss-button">Thank you</button>
            <button class="next-button">Show message</button>
          </div>
        </div>
      </div>
    `
    }
}

customElements.define('aura-blocked-message-page', BlockedMessagePage)
