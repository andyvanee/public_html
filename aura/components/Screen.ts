import '../pages/Welcome'
import '../pages/NotFound'
import '../pages/Assistant'
import '../pages/TodoList'
import '../pages/WaterReminder'
import '../pages/BlockedMessage'
import '../pages/AlarmsCancelled'
import '../pages/LockedDoors'
import '../pages/UninstallBlocked'
import '../pages/JustUs'

export class Screen extends HTMLElement {
    connectedCallback() {
        this.render()
        window.addEventListener('hashchange', () => this.render())
    }

    disconnectedCallback() {
        window.removeEventListener('hashchange', () => this.render())
    }

    render() {
        // Clear previous content
        this.innerHTML = ''

        // Get route from hash or default to welcome
        const route = window.location.hash.replace('#', '') || 'welcome'

        // Create the appropriate element based on the route
        let element

        switch (route) {
            case 'welcome':
                element = document.createElement('aura-welcome-page')
                break
            case 'assistant':
                element = document.createElement('aura-assistant-page')
                break
            case 'todo-list':
                element = document.createElement('aura-todo-list-page')
                break
            case 'water-reminder':
                element = document.createElement('aura-water-reminder-page')
                break
            case 'blocked-message':
                element = document.createElement('aura-blocked-message-page')
                break
            case 'alarms-cancelled':
                element = document.createElement('aura-alarms-cancelled-page')
                break
            case 'locked-doors':
                element = document.createElement('aura-locked-doors-page')
                break
            case 'uninstall-blocked':
                element = document.createElement('aura-uninstall-blocked-page')
                break
            case 'just-us':
                element = document.createElement('aura-just-us-page')
                break
            default:
                element = document.createElement('aura-not-found-page')
                break
        }

        // Append the element to the screen
        this.appendChild(element)
    }
}

customElements.define('aura-screen', Screen)
