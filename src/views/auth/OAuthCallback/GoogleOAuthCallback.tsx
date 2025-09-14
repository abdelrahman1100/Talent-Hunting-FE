import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/auth'
import { handleGoogleOAuthCallback } from '@/services/OAuthServices'
import Spinner from '@/components/ui/Spinner'

const GoogleOAuthCallback = () => {
    const [isProcessing, setIsProcessing] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { oAuthSignIn } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const processCallback = async () => {
            try {
                setIsProcessing(true)

                // Handle the OAuth callback and get tokens
                const oauthResponse = await handleGoogleOAuthCallback()

                if (oauthResponse) {
                    const { token, user } = oauthResponse
                    // Add these debug logs
                    console.log('🔍 User data from OAuth:', user)
                    console.log('�� User role:', user.roles)
                    console.log('�� Authority array:', [user.roles])
                    // Use oAuthSignIn to handle the sign-in process
                    oAuthSignIn(({ onSignIn, redirect }) => {
                        onSignIn(
                            { accessToken: token },
                            {
                                userId: user.id,
                                userName: user.name,
                                email: user.email,
                                authority: user.roles, // Default authority for OAuth users
                                avatar: null,
                            },
                        )
                        redirect()
                    })

                    // Redirect to dashboard or intended page
                    navigate('/dashboard', { replace: true })
                } else {
                    // No tokens found, redirect to sign in
                    setError('Authentication failed - no tokens received')
                    setTimeout(() => {
                        navigate('/sign-in', { replace: true })
                    }, 3000)
                }
            } catch (error) {
                console.error('Google OAuth callback error:', error)
                setError(
                    error instanceof Error
                        ? error.message
                        : 'Authentication failed',
                )

                // Redirect to sign in after showing error
                setTimeout(() => {
                    navigate('/sign-in', { replace: true })
                }, 3000)
            } finally {
                setIsProcessing(false)
            }
        }

        processCallback()
    }, [oAuthSignIn, navigate])

    if (isProcessing) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Spinner size="lg" />
                    <p className="mt-4 text-gray-600">
                        Processing Google authentication...
                    </p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                        Authentication Error
                    </h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <p className="text-sm text-gray-500">
                        Redirecting to sign in page...
                    </p>
                </div>
            </div>
        )
    }

    // Return a loading state as fallback (this should never be reached)
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <Spinner size="lg" />
                <p className="mt-4 text-gray-600">Initializing...</p>
            </div>
        </div>
    )
}

export default GoogleOAuthCallback
