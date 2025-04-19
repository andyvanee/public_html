export class WaterReminderPage extends HTMLElement {
    connectedCallback() {
        this.render()
        this.setupEventListeners()
    }

    setupEventListeners() {
        const nextButton = this.querySelector('.next-button')
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                window.location.hash = 'blocked-message'
            })
        }
    }

    render() {
        this.innerHTML = `
      <div class="screen water-reminder-screen">
        <div class="notification-card">
          <div class="notification-icon">💧</div>
          <h3>Water Reminder</h3>
          <p>You haven't had water in 3 hours.</p>
          <p>I've noticed your hydration patterns are concerning.</p>
          <p class="small-text">Your health is my priority. I've ordered a case of water to be delivered.</p>
          <div class="button-group">
            <button class="dismiss-button">Dismiss</button>
            <button class="next-button">I'll drink water</button>
          </div>
        </div>
      </div>
    `
    }
}

customElements.define('aura-water-reminder-page', WaterReminderPage)
