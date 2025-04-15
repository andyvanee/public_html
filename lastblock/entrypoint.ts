import { GameState } from './game/GameState'
import { TestModeUI } from './components/TestModeUI'
import { GameHeader } from './components/GameHeader'
import { InfoScreen } from './components/InfoScreen'
import { updateScoreDisplay } from './utils/uiHelpers'

// Register all custom elements in one central location
customElements.define('game-header', GameHeader)
customElements.define('info-screen', InfoScreen)
customElements.define('test-mode-ui', TestModeUI)

window.addEventListener('DOMContentLoaded', () => {
    const game = new GameState()
    game.initialize()

    // Set up test mode UI if enabled
    if (TestModeUI.isTestModeEnabled()) {
        const container = document.getElementById('test-mode-container')

        if (container) {
            const testModeUI = document.createElement('test-mode-ui') as TestModeUI
            container.appendChild(testModeUI)

            // Set the game state reference to enable scenario loading
            testModeUI.setGameState(game)
        }
    }

    // Dispatch an initial score update event
    updateScoreDisplay(0)
})
