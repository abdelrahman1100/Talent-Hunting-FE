import { useRef, useImperativeHandle, useState } from 'react'
import AuthContext from './AuthContext'
import appConfig from '@/configs/app.config'
import { useSessionUser, useToken } from '@/store/authStore'
import { apiSignIn, apiSignOut, apiSignUp } from '@/services/AuthService'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { useNavigate } from 'react-router'
import type {
    SignInCredential,
    SignUpCredential,
    AuthResult,
    OauthSignInCallbackPayload,
    User,
    Token,
} from '@/@types/auth'
import type { ReactNode, Ref } from 'react'
import type { NavigateFunction } from 'react-router'

type AuthProviderProps = { children: ReactNode }

export type IsolatedNavigatorRef = {
    navigate: NavigateFunction
}

const IsolatedNavigator = ({ ref }: { ref: Ref<IsolatedNavigatorRef> }) => {
    const navigate = useNavigate()

    useImperativeHandle(ref, () => {
        return {
            navigate,
        }
    }, [navigate])

    return <></>
}

function AuthProvider({ children }: AuthProviderProps) {
    const signedIn = useSessionUser((state) => state.session.signedIn)
    const user = useSessionUser((state) => state.user)
    const setUser = useSessionUser((state) => state.setUser)
    const setSessionSignedIn = useSessionUser(
        (state) => state.setSessionSignedIn,
    )
    const { token, setToken } = useToken()
    const [tokenState, setTokenState] = useState(token)

    const authenticated = Boolean(tokenState && signedIn)

    const navigatorRef = useRef<IsolatedNavigatorRef>(null)

    const redirect = () => {
        const search = window.location.search
        const params = new URLSearchParams(search)
        const redirectUrl = params.get(REDIRECT_URL_KEY)

        navigatorRef.current?.navigate(
            redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath,
        )
    }

    const handleSignIn = (tokens: Token, user?: User) => {
        const accessToken = tokens?.accessToken || ''
        // tokens may have refreshToken or refereshToken (typo) depending on caller
        // support both names and also raw response shape
    const tok = tokens as unknown as Record<string, unknown>
    const refreshToken = (tok?.refreshToken as string) || (tok?.refereshToken as string) || ''

        setToken(accessToken)
        setTokenState(accessToken)
        if (refreshToken) {
            try {
                localStorage.setItem('refreshToken', refreshToken)
            } catch {
                // ignore
            }
        }

        setSessionSignedIn(true)

        if (user) {
            // backend user may be { id, name, email, user_img, roles }
            const backendUser = user as unknown as Record<string, unknown>
            const mapped = {
                userId: backendUser.id ? String(backendUser.id) : (backendUser.userId as string) || '',
                avatar: (backendUser.user_img as string) || (backendUser.avatar as string) || '',
                userName: (backendUser.name as string) || (backendUser.userName as string) || '',
                email: (backendUser.email as string) || '',
                authority: (backendUser.roles as unknown as string[]) || (backendUser.authority as unknown as string[]) || [],
            }

            setUser(mapped as unknown as User)

            // also persist raw user for parts of app that read it directly
            try {
                localStorage.setItem('user', JSON.stringify(backendUser))
            } catch {
                // ignore
            }
        }
    }

    const handleSignOut = () => {
        setToken('')
        setUser({})
        setSessionSignedIn(false)
        try {
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('user')
        } catch {
            // ignore
        }
    }

    const signIn = async (values: SignInCredential): AuthResult => {
        try {
            const resp = await apiSignIn(values)
            if (resp) {
                handleSignIn({ accessToken: resp.accessToken, refereshToken: resp.refreshToken }, resp.user)
                redirect()
                return {
                    status: 'success',
                    message: '',
                }
            }
            return {
                status: 'failed',
                message: 'Unable to sign in',
            }
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const signUp = async (values: SignUpCredential): AuthResult => {
        try {
            const resp = await apiSignUp(values)
            if (resp) {
                // For signup, we need to sign in the user after successful registration
                // The backend returns user data, so we'll redirect to sign in
                // or you can implement auto-login if your backend supports it
                return {
                    status: 'success',
                    message: 'Account created successfully! Please sign in.',
                }
            }
            return {
                status: 'failed',
                message: 'Unable to sign up',
            }
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const signOut = async () => {
        try {
            await apiSignOut()
        } finally {
            handleSignOut()
            navigatorRef.current?.navigate('/')
        }
    }
    const oAuthSignIn = (
        callback: (payload: OauthSignInCallbackPayload) => void,
    ) => {
        callback({
            onSignIn: handleSignIn,
            redirect,
        })
    }

    return (
        <AuthContext.Provider
            value={{
                authenticated,
                user,
                signIn,
                signUp,
                signOut,
                oAuthSignIn,
            }}
        >
            {children}
            <IsolatedNavigator ref={navigatorRef} />
        </AuthContext.Provider>
    )
}

export default AuthProvider
