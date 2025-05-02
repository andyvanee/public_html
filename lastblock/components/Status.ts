/**
 * Status.ts - Component to show status messages during gameplay
 */
import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'

@customElement('game-status')
export class Status extends LitElement {
    @state() private messages: StatusMessage[] = []
    @state() private showDefaultMessage: boolean = true

    // Queue for pending messages
    private messageQueue: StatusMessage[] = []

    // Message display timings (ms)
    private readonly enterDuration = 300
    private readonly visibleDuration = 1800
    private readonly exitDuration = 300

    // Flag to track if we're currently processing messages
    private isProcessingQueue = false

    static styles = css`
        :host {
            display: block;
            height: 40px;
            position: relative;
            overflow: hidden;
            flex: 1;
        }

        .messages-area {
            position: relative;
            height: 100%;
            overflow: hidden;
        }

        .message {
            position: absolute;
            left: 0;
            font-family: 'Source Sans 3', sans-serif;
            font-weight: 900;
            font-size: 16px;
            opacity: 0;
            transform: translateY(100%);
            transition:
                transform 0.3s ease-out,
                opacity 0.3s ease;
            padding-right: 10px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;
            display: flex;
            align-items: center;
            height: 40px;
        }

        .message.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .message.exiting {
            opacity: 0;
            transform: translateY(-100%);
        }

        .message.type-info {
            color: #ffffff;
        }

        .message.type-challenge {
            color: var(--color-gold, #c6aa11);
        }

        .message.type-bonus {
            color: #4caf50; /* Green color for bonuses */
        }

        .default-message {
            font-family: 'Source Sans 3', sans-serif;
            font-weight: 900;
            font-size: 16px;
            color: #777; /* Brightened from #555 to #777 */
            opacity: 0.8; /* Increased from 0.7 to 0.8 for more visibility */
            padding-right: 10px;
            white-space: nowrap;
            display: flex;
            align-items: center;
            height: 40px;
            transition: opacity 0.5s ease;
        }

        .default-message.hidden {
            opacity: 0;
        }
    `

    constructor() {
        super()
        // Listen for status message events
        document.addEventListener('game-status', this.onStatusEvent.bind(this) as EventListener)
    }

    /**
     * Handle status events and add messages to queue
     */
    private onStatusEvent(event: CustomEvent): void {
        const { message, type = 'info' } = event.detail

        if (!message) return

        // Hide default message when showing custom messages
        this.showDefaultMessage = false

        // Create unique ID for this message
        const id = `status-${Date.now()}-${Math.floor(Math.random() * 1000)}`

        // Add new message to queue
        const newMessage = {
            id,
            text: message,
            type: type,
            status: 'entering' as MessageStatus,
        }

        // Add to queue
        this.messageQueue.push(newMessage)

        // Start processing queue if not already in progress
        if (!this.isProcessingQueue) {
            this.processNextMessage()
        }
    }

    /**
     * Process the next message in the queue
     */
    private processNextMessage(): void {
        if (this.messageQueue.length === 0) {
            this.isProcessingQueue = false

            // Clean up any exited messages after all messages are processed
            setTimeout(() => {
                this.messages = this.messages.filter((msg) => msg.status !== 'exiting')

                // Show default message when no more messages in queue
                if (this.messages.length === 0) {
                    setTimeout(() => {
                        this.showDefaultMessage = true
                    }, 300) // Small delay before showing default message
                }
            }, this.exitDuration)

            return
        }

        this.isProcessingQueue = true

        // Get the next message
        const nextMessage = this.messageQueue.shift()!

        // Add it to the active messages list
        this.messages = [...this.messages, nextMessage]

        // Animation sequence: enter → visible → exit → next message
        setTimeout(() => {
            // Find the message in the array and update its status
            this.updateMessageStatus(nextMessage.id, 'visible')

            // After being visible, start exit animation
            setTimeout(() => {
                this.updateMessageStatus(nextMessage.id, 'exiting')

                // Start processing the next message while this one is exiting
                setTimeout(() => {
                    // Process the next message while the current one is still exiting
                    // This creates the overlap effect we want
                    this.processNextMessage()

                    // Clean up this message after it has completely exited
                    setTimeout(() => {
                        this.messages = this.messages.filter((msg) => msg.id !== nextMessage.id)
                    }, this.exitDuration)
                }, 100) // Short delay before starting the next message
            }, this.visibleDuration)
        }, this.enterDuration)
    }

    /**
     * Update the status of a specific message
     */
    private updateMessageStatus(id: string, status: MessageStatus): void {
        this.messages = this.messages.map((msg) => {
            if (msg.id === id) {
                return { ...msg, status }
            }
            return msg
        })
    }

    /**
     * Render the status area
     */
    render() {
        return html`
            <div class="messages-area">
                ${this.messages.map(
                    (msg) => html` <div class="message type-${msg.type} ${msg.status}">${msg.text}</div> `,
                )}
                <div class="default-message ${this.showDefaultMessage ? '' : 'hidden'}">lastblock</div>
            </div>
        `
    }

    /**
     * Utility method to show a status message directly
     */
    public static showMessage(message: string, type: MessageType = 'info'): void {
        document.dispatchEvent(
            new CustomEvent('game-status', {
                detail: { message, type },
                bubbles: true,
                composed: true,
            }),
        )
    }
}

// Types for status messages
export type MessageType = 'info' | 'challenge' | 'bonus'
export type MessageStatus = 'entering' | 'visible' | 'exiting'

interface StatusMessage {
    id: string
    text: string
    type: MessageType
    status: MessageStatus
}

// For backward compatibility with existing Toast usage
export class Toast {
    public static showToast(message: string, type: MessageType = 'info'): void {
        Status.showMessage(message, type)
    }
}
