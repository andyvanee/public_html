/**
 * Stats model for tracking game statistics using IndexedDB
 */

// Enum for different stat categories
export enum StatCategory {
    CURRENT = 'current',
    LIFETIME = 'lifetime',
    BEST = 'best',
}

// Interface for stat entry
export interface StatEntry {
    id: string
    category: StatCategory
    name: string
    value: number
}

export class Stats {
    private dbName = 'LastBlockDB'
    private storeName = 'stats'
    private dbVersion = 1
    private db: IDBDatabase | null = null

    // Default stats that we track
    private readonly statDefinitions = [
        { id: 'score', name: 'Score' },
        { id: 'moveCount', name: 'Moves' },
        { id: 'challengesCompleted', name: 'Challenges' },
        { id: 'challengeBonus', name: 'Challenge Bonus' },
        { id: 'gamesPlayed', name: 'Games Played' },
    ]

    constructor() {
        this.initDB()
    }

    /**
     * Initialize the IndexedDB database
     */
    private initDB(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            if (this.db) {
                resolve(this.db)
                return
            }

            const request = indexedDB.open(this.dbName, this.dbVersion)

            request.onerror = (event) => {
                console.error('Error opening IndexedDB', event)
                reject('Error opening IndexedDB')
            }

            request.onsuccess = () => {
                this.db = request.result
                resolve(this.db)
            }

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result

                // Create object store if it doesn't exist
                if (!db.objectStoreNames.contains(this.storeName)) {
                    // Create store with composite key of id+category
                    const store = db.createObjectStore(this.storeName, { keyPath: ['id', 'category'] })

                    // Create indexes for faster queries
                    store.createIndex('category', 'category', { unique: false })
                    store.createIndex('id', 'id', { unique: false })

                    // Initialize default stats for each category
                    this.initializeDefaultStats(store)
                }
            }
        })
    }

    /**
     * Initialize default stats for each category
     */
    private initializeDefaultStats(store: IDBObjectStore) {
        // Initialize current stats
        this.statDefinitions.forEach((stat) => {
            store.add({
                id: stat.id,
                category: StatCategory.CURRENT,
                name: stat.name,
                value: 0,
            })
        })

        // Initialize lifetime stats
        this.statDefinitions.forEach((stat) => {
            store.add({
                id: stat.id,
                category: StatCategory.LIFETIME,
                name: stat.name,
                value: 0,
            })
        })

        // Initialize best game stats
        this.statDefinitions.forEach((stat) => {
            store.add({
                id: stat.id,
                category: StatCategory.BEST,
                name: stat.name,
                value: 0,
            })
        })
    }

    /**
     * Get all stats for a specific category
     */
    async getStats(category: StatCategory): Promise<StatEntry[]> {
        await this.initDB()

        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject('Database not initialized')
                return
            }

            const transaction = this.db.transaction([this.storeName], 'readonly')
            const store = transaction.objectStore(this.storeName)
            const index = store.index('category')
            const request = index.getAll(category)

            request.onsuccess = () => {
                resolve(request.result)
            }

            request.onerror = (event) => {
                console.error(`Error getting ${category} stats`, event)
                reject(`Error getting ${category} stats`)
            }
        })
    }

    /**
     * Get a specific stat value
     */
    async getStat(category: StatCategory, id: string): Promise<number> {
        await this.initDB()

        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject('Database not initialized')
                return
            }

            const transaction = this.db.transaction([this.storeName], 'readonly')
            const store = transaction.objectStore(this.storeName)
            const request = store.get([id, category])

            request.onsuccess = () => {
                if (request.result) {
                    resolve(request.result.value)
                } else {
                    resolve(0)
                }
            }

            request.onerror = (event) => {
                console.error(`Error getting stat: ${id} in ${category}`, event)
                reject(`Error getting stat: ${id} in ${category}`)
            }
        })
    }

    /**
     * Update a specific stat value
     */
    async updateStat(category: StatCategory, id: string, value: number): Promise<void> {
        await this.initDB()

        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject('Database not initialized')
                return
            }

            const transaction = this.db.transaction([this.storeName], 'readwrite')
            const store = transaction.objectStore(this.storeName)
            const getRequest = store.get([id, category])

            getRequest.onsuccess = () => {
                if (getRequest.result) {
                    const data = getRequest.result
                    data.value = value

                    const updateRequest = store.put(data)

                    updateRequest.onsuccess = () => {
                        resolve()
                    }

                    updateRequest.onerror = (event) => {
                        console.error(`Error updating stat: ${id} in ${category}`, event)
                        reject(`Error updating stat: ${id} in ${category}`)
                    }
                } else {
                    // Find the name for this stat
                    const stat = this.statDefinitions.find((s) => s.id === id)
                    if (!stat) {
                        reject(`Unknown stat: ${id}`)
                        return
                    }

                    // Create the stat if it doesn't exist
                    const newStat: StatEntry = {
                        id,
                        category,
                        name: stat.name,
                        value,
                    }

                    const addRequest = store.add(newStat)

                    addRequest.onsuccess = () => {
                        resolve()
                    }

                    addRequest.onerror = (event) => {
                        console.error(`Error creating stat: ${id} in ${category}`, event)
                        reject(`Error creating stat: ${id} in ${category}`)
                    }
                }
            }

            getRequest.onerror = (event) => {
                console.error(`Error reading stat: ${id} in ${category}`, event)
                reject(`Error reading stat: ${id} in ${category}`)
            }
        })
    }

    /**
     * Increment a specific stat value
     */
    async incrementStat(category: StatCategory, id: string, increment: number = 1): Promise<void> {
        await this.initDB()

        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject('Database not initialized')
                return
            }

            const transaction = this.db.transaction([this.storeName], 'readwrite')
            const store = transaction.objectStore(this.storeName)
            const getRequest = store.get([id, category])

            getRequest.onsuccess = () => {
                if (getRequest.result) {
                    const data = getRequest.result
                    data.value += increment

                    const updateRequest = store.put(data)

                    updateRequest.onsuccess = () => {
                        resolve()
                    }

                    updateRequest.onerror = (event) => {
                        console.error(`Error incrementing stat: ${id} in ${category}`, event)
                        reject(`Error incrementing stat: ${id} in ${category}`)
                    }
                } else {
                    // Find the name for this stat
                    const stat = this.statDefinitions.find((s) => s.id === id)
                    if (!stat) {
                        reject(`Unknown stat: ${id}`)
                        return
                    }

                    // Create the stat if it doesn't exist
                    const newStat: StatEntry = {
                        id,
                        category,
                        name: stat.name,
                        value: increment,
                    }

                    const addRequest = store.add(newStat)

                    addRequest.onsuccess = () => {
                        resolve()
                    }

                    addRequest.onerror = (event) => {
                        console.error(`Error creating stat: ${id} in ${category}`, event)
                        reject(`Error creating stat: ${id} in ${category}`)
                    }
                }
            }

            getRequest.onerror = (event) => {
                console.error(`Error reading stat: ${id} in ${category}`, event)
                reject(`Error reading stat: ${id} in ${category}`)
            }
        })
    }

    /**
     * Reset all stats in a category
     */
    async resetStats(category: StatCategory): Promise<void> {
        await this.initDB()

        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject('Database not initialized')
                return
            }

            const transaction = this.db.transaction([this.storeName], 'readwrite')
            const store = transaction.objectStore(this.storeName)
            const index = store.index('category')
            const request = index.getAll(category)

            request.onsuccess = () => {
                const stats = request.result

                // Reset each stat to zero
                stats.forEach((stat) => {
                    stat.value = 0
                    store.put(stat)
                })

                transaction.oncomplete = () => {
                    resolve()
                }

                transaction.onerror = (event) => {
                    console.error(`Error resetting ${category} stats`, event)
                    reject(`Error resetting ${category} stats`)
                }
            }

            request.onerror = (event) => {
                console.error(`Error getting ${category} stats for reset`, event)
                reject(`Error getting ${category} stats for reset`)
            }
        })
    }

    /**
     * Update best stats if current stats are better
     */
    async updateBestStats(): Promise<boolean> {
        const currentStats = await this.getStats(StatCategory.CURRENT)
        const bestStats = await this.getStats(StatCategory.BEST)

        // Get current score
        const currentScore = currentStats.find((stat) => stat.id === 'score')?.value || 0
        const bestScore = bestStats.find((stat) => stat.id === 'score')?.value || 0

        // Check if we have a new high score
        if (currentScore > bestScore) {
            // Update all best stats from current stats
            await Promise.all(currentStats.map((stat) => this.updateStat(StatCategory.BEST, stat.id, stat.value)))
            return true
        }

        return false
    }

    /**
     * Record game completion - updates lifetime stats and checks for best score
     */
    async recordGameComplete(): Promise<boolean> {
        // Increment games played in lifetime stats
        await this.incrementStat(StatCategory.LIFETIME, 'gamesPlayed')

        // Get all current stats to add to lifetime stats
        const currentStats = await this.getStats(StatCategory.CURRENT)

        // Update lifetime stats with current game stats (except gamesPlayed which was already incremented)
        await Promise.all(
            currentStats
                .filter((stat) => stat.id !== 'gamesPlayed')
                .map((stat) => this.incrementStat(StatCategory.LIFETIME, stat.id, stat.value)),
        )

        // Check if current game is a high score and update best stats if so
        return this.updateBestStats()
    }

    /**
     * Start a new game by resetting current stats
     */
    async newGame(): Promise<void> {
        return this.resetStats(StatCategory.CURRENT)
    }
}
