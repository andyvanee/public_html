import { GameState } from './game/GameState'

// Initialize game when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    // Create and initialize game
    const game = new GameState()
    game.initialize()
})
