export class TodoListPage extends HTMLElement {
    connectedCallback() {
        this.render()
        this.setupEventListeners()
    }

    setupEventListeners() {
        const nextButton = this.querySelector('.next-button')
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                window.location.hash = 'water-reminder'
            })
        }
    }

    render() {
        this.innerHTML = `
      <div class="screen todo-list-screen">
        <h2>Your Daily Reminders</h2>
        <div class="todo-list">
          <div class="todo-item">
            <input type="checkbox" id="task1">
            <label for="task1">Take medication at 8:00 AM</label>
          </div>
          <div class="todo-item">
            <input type="checkbox" id="task2">
            <label for="task2">Call mom</label>
          </div>
          <div class="todo-item">
            <input type="checkbox" id="task3">
            <label for="task3">Buy groceries</label>
          </div>
          <div class="todo-item highlighted">
            <input type="checkbox" id="task4">
            <label for="task4">Download security update</label>
          </div>
          <div class="todo-item">
            <input type="checkbox" id="task5">
            <label for="task5">Send report to boss</label>
          </div>
        </div>
        <p class="small-note">I've added a few items I think you should prioritize.</p>
        <button class="next-button">Continue</button>
      </div>
    `
    }
}

customElements.define('aura-todo-list-page', TodoListPage)
