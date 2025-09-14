import Alert from '@/components/ui/Alert'
import SignUpForm from './components/SignUpForm'
import OauthSignIn from '../SignIn/components/OauthSignIn'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { useState, useEffect } from 'react'

type SignUpProps = {
    disableSubmit?: boolean
    signInUrl?: string
}

type MessageType = 'success' | 'error'

export const SignUpBase = ({
    signInUrl = '/sign-in',
    disableSubmit,
}: SignUpProps) => {
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState<MessageType>('error')

    const handleSetMessage = (msg: string, type: MessageType = 'error') => {
        setMessage(msg)
        setMessageType(type)

        // Auto-clear success messages after 3 seconds
        if (type === 'success') {
            setTimeout(() => {
                setMessage('')
            }, 3000)
        }
    }

    return (
        <>
            <div className="mt-28 mb-8">
                <h3 className="mb-1">Create Your Account</h3>
                <p className="font-semibold heading-text">
                    Join Talent-Hunting and start your career journey
                </p>
            </div>
            {message && (
                <Alert
                    showIcon
                    className="mb-4"
                    type={messageType === 'success' ? 'success' : 'danger'}
                >
                    <span className="break-all">{message}</span>
                </Alert>
            )}
            <SignUpForm
                disableSubmit={disableSubmit}
                setMessage={handleSetMessage}
            />

            {/* OAuth Sign Up */}
            <div className="mt-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="border-t border-gray-200 dark:border-gray-700 flex-1" />
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        or sign up with
                    </p>
                    <div className="border-t border-gray-200 dark:border-gray-700 flex-1" />
                </div>
                <OauthSignIn
                    disableSubmit={disableSubmit}
                    setMessage={handleSetMessage}
                />
            </div>

            <div>
                <div className="mt-12 text-center">
                    <span>Already have an account? </span>
                    <ActionLink
                        to={signInUrl}
                        className="heading-text font-bold"
                        themeColor={false}
                    >
                        Sign in
                    </ActionLink>
                </div>
            </div>
        </>
    )
}

const SignUp = () => {
    return <SignUpBase />
}

export default SignUp
