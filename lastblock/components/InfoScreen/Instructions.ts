import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('info-instructions')
export class Instructions extends LitElement {
    static styles = css`
        :host {
            display: block;
            width: 100%;
        }

        p {
            margin-bottom: 12px;
            line-height: 1.5;
            color: var(--text-color, #d4af91);
        }
    `

    render() {
        return html`
            <div class="instructions-content">
                <p>
                    Drag and drop blocks onto the grid. Complete rows or columns to clear them and score points. Game
                    over when no more pieces can be placed.
                </p>
                <p>Clear multiple lines at once for a bigger bonus!</p>
            </div>
        `
    }
}
