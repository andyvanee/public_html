# Project Boilerplate Documentation

This document outlines the structure and setup of projects in this workspace, based on the LastBlock project implementation. Use this as a reference when creating new projects with similar architecture.

## Project Structure

```
project-name/
├── entrypoint.ts         # Main entry point for the application
├── favicon.svg           # Favicon for the web app
├── index.html            # Main HTML file
├── index.ts              # Build script
├── main.css              # Main stylesheet
├── Makefile              # Build automation
├── manifest.json         # PWA manifest
├── README.md             # Project documentation
├── service-worker.js     # PWA service worker
├── tsconfig.json         # TypeScript configuration
├── components/           # Lit components
│   └── Shell.ts          # Main application shell component
├── icons/                # PWA icons
│   ├── generate-icons.ts # Icon generation script
│   ├── project-icon.svg  # Source SVG icon
│   └── icon-*.png        # Generated icons in various sizes
└── [other project-specific directories]
```

## Key Features

### 1. Web Components with Lit

Components are built using Lit, organized in the `components/` directory:

- Components are defined using TypeScript classes with the `@customElement` decorator
- Each component exports a class that extends LitElement
- Components are imported and registered in the application via the entrypoint file

### 2. TypeScript Integration

- Codebase is written in TypeScript
- Entry point is `entrypoint.ts` which loads all necessary components
- TypeScript files are bundled and minified during build

### 3. Build System

#### Makefile Automation

The Makefile defines the build process with targets for:

- Generating icons
- Copying static files
- Processing HTML with cache busting
- Bundling JavaScript
- Cleaning output directories

#### Build Script (index.ts)

The TypeScript build script provides functions for:

- Generating PWA icons from SVG
- Adding cache busting to static resources
- Bundling and minifying JavaScript
- Cleaning output directories
- Copying static files to output directory

#### Output Structure

Built files are placed in the `../docs/project-name/` directory, which allows for:

- GitHub Pages hosting
- Easy access from the development server
- Clear separation between source and distribution files

### 4. PWA Support

Projects include Progressive Web App features:

- Service worker for offline support
- Manifest file for installation
- Icons in various sizes
- Appropriate meta tags in HTML

### 5. Development Server

The root `index.ts` file provides:

- A Bun-based development server
- File watching for automatic rebuilds
- Serving files from the `docs/` directory

## How to Create a New Project

1. Create a new directory for your project
2. Copy the basic structure from an existing project
3. Update project-specific files:
    - Replace project name in manifest.json
    - Update icon SVGs
    - Modify HTML meta tags
4. **Important**: Add your project name to the `projects` array in the root `index.ts` file:
    ```js
    // List of projects to build and watch
    const projects = ['lastblock', 'aura', 'your-new-project']
    ```
    This ensures your project will be built, watched for changes, and served by the development server.

## Build Scripts

### Icon Generation

The `icons/generate-icons.ts` script:

- Takes an SVG source file
- Generates PNG icons in multiple sizes (72, 96, 128, 144, 152, 192, 384, 512)
- Uses the sharp library for image processing

### Build Process

The build process is initiated with `bun run index.ts` or through the Makefile:

```bash
# Full build
make

# Specific tasks
make icons         # Generate icons only
make clean         # Clean output directory
```

## Development Workflow

1. Write code in the source directories
2. Run `bun run ../index.ts` to start the development server
3. Access the application at http://localhost:3000/project-name/
4. Changes to source files trigger automatic rebuilds
5. Built files are placed in the `docs/project-name/` directory
