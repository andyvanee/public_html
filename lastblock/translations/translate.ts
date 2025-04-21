/**
 * Translation utility for the lastblock game
 * Provides functions to load and use localized strings
 */

// Import default English translations
import enTranslations from './en.json'

// Type for translations object
type TranslationsMap = Record<string, Record<string, any>>

// Cache for loaded translations
const translationsCache: TranslationsMap = {
    en: enTranslations,
}

let currentLanguage: string = 'en'

/**
 * Initialize the translation system with the specified language
 * @param language The language code to use (e.g., 'en', 'fr', etc.)
 */
export function initTranslations(language: string = 'en'): void {
    try {
        // If the requested language is not available, use English as fallback
        if (!translationsCache[language]) {
            console.warn(`Translations for ${language} not available, using English as fallback`)
            language = 'en'
        }

        currentLanguage = language
    } catch (error) {
        console.error('Error initializing translations:', error)
        // Ensure we always have a valid language set
        currentLanguage = 'en'
    }
}

/**
 * Get a translated string by its key path
 * @param keyPath Dot notation path to the translation key (e.g., 'challenge.activated')
 * @param replacements Object containing replacement values for placeholders
 * @returns The translated string with replacements applied
 */
export function t(keyPath: string, replacements: Record<string, any> = {}): string {
    // Get the currently active translations
    const translations = translationsCache[currentLanguage] || translationsCache.en

    // Navigate through the nested translations object using the key path
    const keys = keyPath.split('.')
    let value: any = translations

    for (const key of keys) {
        if (value === undefined || value === null) {
            console.warn(`Translation key not found: ${keyPath}`)
            return keyPath // Return the key path as fallback
        }
        value = value[key]
    }

    if (typeof value !== 'string') {
        console.warn(`Translation key doesn't point to a string: ${keyPath}`)
        return keyPath // Return the key path as fallback
    }

    // Replace placeholders with values
    return value.replace(/\{([^}]+)\}/g, (match, placeholder) => {
        return replacements[placeholder] !== undefined ? replacements[placeholder].toString() : match
    })
}

/**
 * Get the current language code
 * @returns The current language code
 */
export function getCurrentLanguage(): string {
    return currentLanguage
}

/**
 * Add a new language translation to the system
 * @param language The language code (e.g., 'fr', 'es')
 * @param translations The translations object
 */
export function addTranslations(language: string, translations: Record<string, any>): void {
    translationsCache[language] = translations
    console.log(`Added translations for ${language}`)
}

// Initialize with English by default
initTranslations('en')
