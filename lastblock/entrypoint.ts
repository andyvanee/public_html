import { GameState } from './game/GameState'
import { TestModeUI } from './components/TestModeUI'

window.addEventListener('DOMContentLoaded', () => {
    const game = new GameState()
    game.initialize()

    if (TestModeUI.isTestModeEnabled()) {
        // Get container for test mode UI
        const container = document.getElementById('test-mode-container')

        if (container) {
            const testModeUI = document.createElement('test-mode-ui') as TestModeUI
            container.appendChild(testModeUI)

            // Set the game state reference to enable scenario loading
            testModeUI.setGameState(game)
        }
    }
})
