/**
 * Game model that holds game configuration and stats
 */
import { Stats, StatCategory } from './Stats'

export class Game {
    // Game state
    score: number = 0
    moveCount: number = 0

    // Challenge mode configuration
    isChallengeMode: boolean = false
    challengeModeInterval: number = 10 // Trigger challenge mode every 10 moves
    challengeBonusPoints: number = 300 // Bonus points for completing a challenge
    challengesCompleted: number = 0
    challengeBonus: number = 0

    // Stats manager
    private stats: Stats

    constructor() {
        // Initialize game state
        this.stats = new Stats()
        this.initGame()
    }

    // Initialize a new game
    async initGame(): Promise<void> {
        // Reset memory state
        this.reset()

        // Reset stats for current game
        await this.stats.newGame()
    }

    // Method to reset the game state
    reset(): void {
        this.score = 0
        this.moveCount = 0
        this.isChallengeMode = false
        this.challengesCompleted = 0
        this.challengeBonus = 0
    }

    // Method to increment the move count
    incrementMoveCount(): number {
        this.moveCount++
        // Update the move count stat
        this.stats.updateStat(StatCategory.CURRENT, 'moveCount', this.moveCount)
        return this.moveCount
    }

    // Method to check if it's time for challenge mode
    shouldActivateChallengeMode(): boolean {
        return !this.isChallengeMode && this.moveCount % this.challengeModeInterval === 0 && this.moveCount > 0
    }

    // Method to add bonus points
    addChallengeBonus(): void {
        this.score += this.challengeBonusPoints
        this.challengeBonus += this.challengeBonusPoints
        this.challengesCompleted++

        // Update stats
        this.stats.updateStat(StatCategory.CURRENT, 'challengeBonus', this.challengeBonus)
        this.stats.updateStat(StatCategory.CURRENT, 'challengesCompleted', this.challengesCompleted)
        this.stats.updateStat(StatCategory.CURRENT, 'score', this.score)
    }

    // Update score
    updateScore(score: number): void {
        this.score = score
        // Update the score stat
        this.stats.updateStat(StatCategory.CURRENT, 'score', this.score)
    }

    // Handle game over
    async handleGameOver(): Promise<boolean> {
        // Record game completion and return if it's a new high score
        return await this.stats.recordGameComplete()
    }

    // Get stats for a category
    async getStats(category: StatCategory) {
        return await this.stats.getStats(category)
    }
}
