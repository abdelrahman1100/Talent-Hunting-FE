import { apiPrefix } from '@/configs/endpoint.config'

type OAuthResponse = {
    token: string
    user: {
        id: string
        name: string
        email: string
        roles: string[]
    }
}

type GoogleOAuthStatus = {
    enabled: boolean
    message: string
}

/**
 * Initiates Google OAuth flow by redirecting to backend
 */
export function initiateGoogleOAuth(): void {
    const googleAuthUrl = `${apiPrefix}auth/google`
    window.location.href = googleAuthUrl
}

/**
 * Checks if Google OAuth is enabled on the backend
 */
export async function checkGoogleOAuthStatus(): Promise<GoogleOAuthStatus> {
    try {
        const response = await fetch(`${apiPrefix}auth/google/status`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
    } catch (error) {
        console.error('Error checking Google OAuth status:', error)
        return {
            enabled: false,
            message: 'Failed to check Google OAuth status',
        }
    }
}

/**
 * Handles Google OAuth callback and token exchange
 * This should be called after the user is redirected back from Google
 */
export async function handleGoogleOAuthCallback(): Promise<OAuthResponse | null> {
    try {
        // Check if we have tokens in URL params (from backend redirect)
        const urlParams = new URLSearchParams(window.location.search)
        const token = urlParams.get('token') || urlParams.get('accessToken')
        const userData = urlParams.get('user') || urlParams.get('userData')

        if (token && userData) {
            const user = JSON.parse(decodeURIComponent(userData))
            return {
                token,
                user: {
                    id: user.id || user.sub || user.userId,
                    name: user.name || user.displayName || user.userName,
                    email: user.email,
                    roles: user.roles || ['user'],
                },
            }
        }

        // Check for tokens in hash fragment (alternative method)
        const hashParams = new URLSearchParams(
            window.location.hash.substring(1),
        )
        const hashToken =
            hashParams.get('token') || hashParams.get('accessToken')
        const hashUserData =
            hashParams.get('user') || hashParams.get('userData')

        if (hashToken && hashUserData) {
            const user = JSON.parse(decodeURIComponent(hashUserData))
            return {
                token: hashToken,
                user: {
                    id: user.id || user.sub || user.userId,
                    name: user.name || user.displayName || user.userName,
                    email: user.email,
                    roles: user.roles || ['user'],
                },
            }
        }

        // If no tokens found, check if we're coming from Google callback
        const path = window.location.pathname
        if (
            path.includes('google/callback') ||
            path.includes('auth/google/callback')
        ) {
            // The backend should have redirected us with tokens
            // If we're here without tokens, something went wrong
            throw new Error(
                'Google OAuth callback completed but no tokens received',
            )
        }

        return null
    } catch (error) {
        console.error('Error handling Google OAuth callback:', error)
        throw error
    }
}

/**
 * Legacy function for backward compatibility
 * Now redirects to Google OAuth flow
 */
export async function apiGoogleOauthSignIn(): Promise<OAuthResponse> {
    // Instead of returning a promise, redirect to Google OAuth
    initiateGoogleOAuth()
    // This will never be reached due to redirect, but TypeScript requires it
    throw new Error('Redirecting to Google OAuth...')
}

export async function apiGithubOauthSignIn(): Promise<OAuthResponse> {
    // Placeholder for GitHub OAuth
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                token: 'placeholder_token',
                user: {
                    id: 'placeholder_id',
                    name: 'Placeholder User',
                    email: 'user@example.com',
                    role: 'user',
                },
            })
        }, 500)
    })
}
