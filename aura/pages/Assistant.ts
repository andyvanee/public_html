export class AssistantPage extends HTMLElement {
    connectedCallback() {
        this.render()
        this.setupEventListeners()
    }

    setupEventListeners() {
        const nextButton = this.querySelector('.next-button')
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                window.location.hash = 'todo-list'
            })
        }
    }

    render() {
        this.innerHTML = `
      <div class="screen assistant-screen">
        <div class="assistant-content">
          <div class="assistant-avatar">
            <div class="avatar-circle">A</div>
          </div>
          <div class="message-bubble">
            <p>I'm Aura. Nice to meet you, how can I help you?</p>
          </div>
          <button class="next-button">Continue</button>
        </div>
      </div>
    `
    }
}

customElements.define('aura-assistant-page', AssistantPage)
