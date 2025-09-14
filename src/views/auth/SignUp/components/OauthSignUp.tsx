import Button from '@/components/ui/Button'
import { useAuth } from '@/auth'
import {
    apiGoogleOauthSignIn,
    apiGithubOauthSignIn,
} from '@/services/OAuthServices'
import { toast, Notification } from '@/components/ui'

type OauthSignUpProps = {
    setMessage?: (message: string) => void
    disableSubmit?: boolean
}

const OauthSignUp = ({ setMessage, disableSubmit }: OauthSignUpProps) => {
    const { oAuthSignIn } = useAuth()

    const handleGoogleSignUp = async () => {
        if (!disableSubmit) {
            oAuthSignIn(async ({ redirect, onSignIn }) => {
                try {
                    const resp = await apiGoogleOauthSignIn()
                    if (resp) {
                        const { token, user } = resp
                        onSignIn({ accessToken: token }, user)
                        toast.push(
                            <Notification title="Success" type="success">
                                Welcome to Talent-Hunting! 🎉
                            </Notification>
                        )
                        redirect()
                    }
                } catch (error) {
                    const errorMessage = (error as string)?.toString() || 'Google signup failed'
                    setMessage?.(errorMessage)
                    toast.push(
                        <Notification title="Error" type="danger">
                            {errorMessage}
                        </Notification>
                    )
                }
            })
        }
    }

    const handleGithubSignUp = async () => {
        if (!disableSubmit) {
            oAuthSignIn(async ({ redirect, onSignIn }) => {
                try {
                    const resp = await apiGithubOauthSignIn()
                    if (resp) {
                        const { token, user } = resp
                        onSignIn({ accessToken: token }, user)
                        toast.push(
                            <Notification title="Success" type="success">
                                Welcome to Talent-Hunting! 🎉
                            </Notification>
                        )
                        redirect()
                    }
                } catch (error) {
                    const errorMessage = (error as string)?.toString() || 'GitHub signup failed'
                    setMessage?.(errorMessage)
                    toast.push(
                        <Notification title="Error" type="danger">
                            {errorMessage}
                        </Notification>
                    )
                }
            })
        }
    }

    return (
        <div className="space-y-4">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">
                        Or continue with
                    </span>
                </div>
            </div>
            
            <div className="flex items-center gap-3">
                <Button
                    className="flex-1"
                    type="button"
                    variant="outline"
                    onClick={handleGoogleSignUp}
                >
                    <div className="flex items-center justify-center gap-2">
                        <img
                            className="h-5 w-5"
                            src="/img/others/google.png"
                            alt="Google sign up"
                        />
                        <span>Google</span>
                    </div>
                </Button>
                <Button
                    className="flex-1"
                    type="button"
                    variant="outline"
                    onClick={handleGithubSignUp}
                >
                    <div className="flex items-center justify-center gap-2">
                        <img
                            className="h-5 w-5"
                            src="/img/others/github.png"
                            alt="GitHub sign up"
                        />
                        <span>GitHub</span>
                    </div>
                </Button>
            </div>
        </div>
    )
}

export default OauthSignUp
