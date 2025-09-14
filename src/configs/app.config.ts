export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    locale: string
    accessTokenPersistStrategy: 'localStorage' | 'sessionStorage' | 'cookies'
    enableMock: boolean
    activeNavTranslation: boolean
    appName: string
    appDescription: string
}

const appConfig: AppConfig = {
    apiPrefix: 'http://localhost:3000/',
    authenticatedEntryPath: '/home',
    unAuthenticatedEntryPath: '/sign-in',
    locale: 'en',
    accessTokenPersistStrategy: 'localStorage',
    enableMock: false,
    activeNavTranslation: false,
    appName: 'Talent-Hunting',
    appDescription: 'Professional Recruitment and Talent Management Platform',
}

export default appConfig
