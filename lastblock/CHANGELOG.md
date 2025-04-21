# Lastblock Changelog

## Lastblock v0.0.5

### Features

- **Unified Status Component**: Replaced the Toast component with a new Status component that displays messages in a fixed header area instead of floating over the game board
- **Translation System**:
    - Added a translation system with support for multiple languages
    - Created English translations file at `translations/en.json`
    - Added utility functions in `translations/translate.ts` for accessing translations
    - Implemented string interpolation for dynamic messages
- **Game Model Improvements**:
    - Added proper game state management via a dedicated Game class
    - Implemented persistent statistics tracking with IndexedDB
    - Added high score tracking and notifications
- **UI Enhancements**:
    - Brightened the default "lastblock" text in the status area for better visibility
    - Added gold color to score display
    - Improved responsive layout of header elements
    - Added New Game button to the settings menu
- **Code Organization**:
    - Improved separation of concerns between UI and game logic
    - Added type safety for message handling

## v0.0.5

### Features

- Sprite based block rendering based on ShapeKind
- Dark / Light mode setting actually works
- InfoScreen extracted to subcomponents for future development
