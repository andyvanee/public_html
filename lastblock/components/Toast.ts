/**
 * Toast.ts - Component to show temporary messages during gameplay
 */
export class Toast {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private messages: ToastMessage[] = []
    private animationFrameId: number | null = null

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')!

        // Listen for toast events
        document.addEventListener('game-toast', this.onToastEvent.bind(this) as EventListener)
    }

    /**
     * Handle toast events and display messages
     */
    private onToastEvent(event: CustomEvent): void {
        const { message, type = 'info' } = event.detail

        if (!message) return

        // Add new message to queue
        this.messages.push({
            text: message,
            type: type,
            opacity: 1,
            timestamp: Date.now(),
        })

        // Start animation loop if not already running
        if (this.animationFrameId === null) {
            this.animationFrameId = requestAnimationFrame(this.render.bind(this))
        }
    }

    /**
     * Render all active toast messages
     */
    private render(): void {
        const now = Date.now()
        const fadeStartTime = 500 // Start fading after 500ms
        const totalDuration = 1500 // Total lifespan of 1.5 seconds

        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        // Filter expired messages
        this.messages = this.messages.filter((msg) => {
            const elapsed = now - msg.timestamp
            return elapsed < totalDuration
        })

        // Render remaining messages
        this.messages.forEach((msg, index) => {
            const elapsed = now - msg.timestamp

            // Calculate opacity based on elapsed time
            if (elapsed > fadeStartTime) {
                const fadeElapsed = elapsed - fadeStartTime
                const fadePercentage = fadeElapsed / (totalDuration - fadeStartTime)
                msg.opacity = 1 - fadePercentage
            }

            this.renderMessage(msg, index)
        })

        // Continue animation if there are messages, otherwise stop
        if (this.messages.length > 0) {
            this.animationFrameId = requestAnimationFrame(this.render.bind(this))
        } else {
            this.animationFrameId = null
        }
    }

    /**
     * Render a single toast message
     */
    private renderMessage(message: ToastMessage, index: number): void {
        const ctx = this.ctx

        // Save the current state
        ctx.save()

        // Position the message at 75% of the screen height
        const posY = this.canvas.height * 0.4
        let posX = this.canvas.width / 2

        // Set styles based on message type
        ctx.globalAlpha = message.opacity
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        switch (message.type) {
            case 'challenge':
                // Gold color for challenges
                ctx.fillStyle = '#FFD700'
                ctx.font = `900 38px 'Source Sans 3'`
                ctx.shadowColor = 'rgba(0,0,0,0.7)'
                break
            case 'bonus':
                // Green color for bonuses
                ctx.fillStyle = '#4CAF50'
                ctx.font = `900 38px 'Source Sans 3'`
                ctx.shadowColor = 'rgba(0,0,0,0.7)'
                break
            default:
                // Default style
                ctx.fillStyle = '#FFFFFF'
                ctx.font = `900 34px 'Source Sans 3'`
                ctx.shadowColor = 'rgba(0,0,0,0.5)'
        }

        // Add shadow for better visibility
        ctx.shadowBlur = 8
        ctx.shadowOffsetX = 2
        ctx.shadowOffsetY = 2

        // Draw the text
        ctx.fillText(message.text, posX, posY - index * 40)

        // Restore the context
        ctx.restore()
    }

    /**
     * Utility method to show a toast directly
     */
    public static showToast(message: string, type: ToastType = 'info'): void {
        document.dispatchEvent(
            new CustomEvent('game-toast', {
                detail: { message, type },
                bubbles: true,
                composed: true,
            }),
        )
    }
}

// Types for toast messages
export type ToastType = 'info' | 'challenge' | 'bonus'

interface ToastMessage {
    text: string
    type: ToastType
    opacity: number
    timestamp: number
}
