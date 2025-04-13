import { GameState } from './game/GameState'
import { TestModeUI } from './components/TestModeUI'

// Initialize game when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    // Create and initialize game
    const game = new GameState()
    game.initialize()

    // Check if test mode is enabled (via ?testmode query parameter)
    if (TestModeUI.isTestModeEnabled()) {
        // Get container for test mode UI
        const container = document.getElementById('test-mode-container')

        if (container) {
            // Create and insert the test mode UI component
            const testModeUI = document.createElement('test-mode-ui')
            container.appendChild(testModeUI)

            // Set the game state reference to enable scenario loading
            testModeUI.setGameState(game)
        }
    }
})
