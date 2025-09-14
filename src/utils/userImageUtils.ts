/**
 * Utility functions for handling user images and initials
 */

/**
 * Formats user image URL or base64 string for display
 * @param userImg - The user image (base64, URL, or null)
 * @returns Formatted image URL or empty string
 */
export const formatUserImage = (userImg: string | null): string => {
    if (!userImg || userImg.trim() === '') return ''

    // If it's already a data URL, return as is
    if (userImg.startsWith('data:')) return userImg

    // If it's a URL (http/https), return as is
    if (userImg.startsWith('http://') || userImg.startsWith('https://'))
        return userImg

    // If it's base64 string without data prefix, add it
    if (userImg.length > 10) {
        // Reasonable base64 string length
        return `data:image/jpeg;base64,${userImg}`
    }

    return ''
}

/**
 * Generates user initials from name
 * @param name - The user's full name
 * @returns User initials (1-2 characters)
 */
export const getUserInitials = (name: string): string => {
    if (!name || name.trim() === '') return 'U' // Default to 'U' for User

    const words = name
        .trim()
        .split(' ')
        .filter((word) => word.length > 0)

    if (words.length === 1) {
        // Single word - take first two characters (e.g., "Anas" -> "AN")
        return words[0].slice(0, 2).toUpperCase()
    } else if (words.length >= 2) {
        // Multiple words - take first letter of first two words (e.g., "Anas Ibrahim" -> "AI")
        return (words[0][0] + words[1][0]).toUpperCase()
    }

    return words[0].slice(0, 2).toUpperCase()
}

/**
 * Checks if user has a valid image
 * @param userImg - The user image (base64, URL, or null)
 * @returns Boolean indicating if image is valid
 */
export const hasValidUserImage = (userImg: string | null): boolean => {
    return formatUserImage(userImg) !== ''
}
