/**
 * CSS Utility functions for accessing and manipulating CSS variables
 */

export type Color = string

// Cache for storing CSS variable values to avoid repeated getComputedStyle calls
const colorCache: Map<string, string> = new Map()

// Initialize event listener for theme changes
document.addEventListener('theme-change', () => {
    // Clear cache when theme is about to change
    colorCache.clear()
})

export const css = {
    /**
     * Get a CSS variable value from the :root element
     * @param name - The CSS variable name (with or without leading --)
     * @returns The CSS variable value as a string
     */
    get: (name: string): Color => {
        // Ensure the name has leading --
        const varName = name.startsWith('--') ? name : `--${name}`

        // Check if the value is in the cache
        if (colorCache.has(varName)) {
            return colorCache.get(varName) as Color
        }

        // Get the value from CSS
        const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim()

        // Cache the value for future use
        colorCache.set(varName, value)

        return value
    },

    /**
     * Set a CSS variable value on the :root element
     * @param name - The CSS variable name (with or without leading --)
     * @param value - The value to set
     */
    set: (name: string, value: string): void => {
        // Ensure the name has leading --
        const varName = name.startsWith('--') ? name : `--${name}`

        // Set the CSS variable on :root
        document.documentElement.style.setProperty(varName, value)

        // Update the cache with the new value
        colorCache.set(varName, value)
    },

    /**
     * Clear the CSS variable cache
     * This should be called whenever theme changes are made
     */
    clearCache: (): void => {
        colorCache.clear()
    },

    /**
     * Convert a hex color to RGB object
     * @param hex - The hex color string (with or without #)
     * @returns Object with r, g, b values from 0-255
     */
    hexToRgb: (hex: Color) => {
        hex = hex.replace(/^#/, '')

        // Handle 3-digit hex
        if (hex.length === 3) {
            hex = hex
                .split('')
                .map((char) => char + char)
                .join('')
        }

        const num = parseInt(hex, 16)
        return {
            r: (num >> 16) & 255,
            g: (num >> 8) & 255,
            b: num & 255,
        }
    },

    /**
     * Lighten a color by a percentage
     * @param color - The color to lighten (hex format)
     * @param percent - The percentage to lighten by
     * @returns The lightened color as a string
     */
    lightenColor: (color: Color, percent: number): string => {
        const hex = color.replace('#', '')
        const r = parseInt(hex.substr(0, 2), 16)
        const g = parseInt(hex.substr(2, 2), 16)
        const b = parseInt(hex.substr(4, 2), 16)

        const lightenR = Math.min(Math.floor(r * (1 + percent / 100)), 255)
        const lightenG = Math.min(Math.floor(g * (1 + percent / 100)), 255)
        const lightenB = Math.min(Math.floor(b * (1 + percent / 100)), 255)

        return `rgb(${lightenR}, ${lightenG}, ${lightenB})`
    },

    /**
     * Darken a color by a percentage
     * @param color - The color to darken (hex format)
     * @param percent - The percentage to darken by
     * @returns The darkened color as a string
     */
    darkenColor: (color: Color, percent: number): string => {
        const hex = color.replace('#', '')
        const r = parseInt(hex.substr(0, 2), 16)
        const g = parseInt(hex.substr(2, 2), 16)
        const b = parseInt(hex.substr(4, 2), 16)

        const darkenR = Math.max(Math.floor(r * (1 - percent / 100)), 0)
        const darkenG = Math.max(Math.floor(g * (1 - percent / 100)), 0)
        const darkenB = Math.max(Math.floor(b * (1 - percent / 100)), 0)

        return `rgb(${darkenR}, ${darkenG}, ${darkenB})`
    },

    /**
     * Check if a color is considered "light"
     * @param color - The color to check (hex format)
     * @returns Boolean indicating if the color is light
     */
    isLightColor: (color: Color): boolean => {
        const hex = color.replace('#', '')
        const r = parseInt(hex.substr(0, 2), 16)
        const g = parseInt(hex.substr(2, 2), 16)
        const b = parseInt(hex.substr(4, 2), 16)

        // Calculate perceived brightness
        const brightness = (r * 299 + g * 587 + b * 114) / 1000
        return brightness > 125
    },
}

document.addEventListener('theme-changed', (event) => {
    const detail = (event as CustomEvent).detail
    css.clearCache()

    document.dispatchEvent(
        new CustomEvent('on-theme-change', {
            bubbles: true,
            composed: true,
        }),
    )
})
