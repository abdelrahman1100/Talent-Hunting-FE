export type SignInCredential = {
    email: string
    password: string
}

export type SignInResponse = {
    accessToken: string
    refreshToken: string
    user?: {
        userId: string
        userName: string
        authority: string[]
        avatar: string
        email: string
    }
}

export type SignUpResponse = {
    id: number
    name: string
    email: string
    user_img: string | null
    gender_id: number
    nationality_id: number
    roles: string[]
}

export type SignUpCredential = {
    name: string
    email: string
    password: string
    user_img: string
    gender_id: 1 | 2
    nationality_id: number
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}

export type AuthRequestStatus = 'success' | 'failed' | ''

export type AuthResult = Promise<{
    status: AuthRequestStatus
    message: string
}>

export type User = {
    userId?: string | null
    avatar?: string | null
    userName?: string | null
    email?: string | null
    authority?: string[]


}

export type Token = {
    accessToken: string
    refereshToken?: string
}

export type OauthSignInCallbackPayload = {
    onSignIn: (tokens: Token, user?: User) => void
    redirect: () => void
}
