export class NotFoundPage extends HTMLElement {
    connectedCallback() {
        this.render()
    }

    render() {
        this.innerHTML = `
      <div class="screen not-found-screen">
        <h2>Screen not found</h2>
        <a href="#welcome">Go to Welcome</a>
      </div>
    `
    }
}

customElements.define('aura-not-found-page', NotFoundPage)
