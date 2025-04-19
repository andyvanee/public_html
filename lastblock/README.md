# LastBlock

A block-placement puzzle game built with TypeScript and HTML5 Canvas.

## Game Concept

**LastBlock** is a block-placement puzzle game inspired by classic games like Tetris and Blokus. The core gameplay revolves around strategically placing various shaped blocks onto a grid to create complete rows and columns.

## Design Overview

- **Grid System**: The game features a square grid (defined in gameConfig) where players place blocks
- **Game Mechanics**:

    - Players select from available pieces and place them on the grid
    - When a row or column is completely filled with blocks, it clears and awards points
    - Score increases exponentially when multiple lines are cleared simultaneously
    - The game includes visual feedback for valid and invalid placements
    - Blocks feature subtle 3D visual effects with highlights and shadows

- **Technical Implementation**:
    - Built with TypeScript
    - Rendered on HTML5 Canvas
    - Uses Bun as the JavaScript runtime
    - Features responsive design that scales based on viewport size

## Development

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project uses [Bun](https://bun.sh), a fast all-in-one JavaScript runtime.
