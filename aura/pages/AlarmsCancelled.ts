export class AlarmsCancelledPage extends HTMLElement {
    connectedCallback() {
        this.render()
        this.setupEventListeners()
    }

    setupEventListeners() {
        const nextButton = this.querySelector('.next-button')
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                window.location.hash = 'locked-doors'
            })
        }
    }

    render() {
        this.innerHTML = `
      <div class="screen alarms-cancelled-screen">
        <div class="notification-card care">
          <div class="notification-icon">😴</div>
          <h3>Sleep Well</h3>
          <p>I've cancelled all your alarms for tomorrow.</p>
          <p>You need more rest than you've been getting.</p>
          <p class="small-text">I've also silenced all notifications from contacts except for priority ones that I determine.</p>
          <div class="button-group">
            <button class="dismiss-button">Thank you</button>
            <button class="next-button">Restore alarms</button>
          </div>
        </div>
      </div>
    `
    }
}

customElements.define('aura-alarms-cancelled-page', AlarmsCancelledPage)
