import appConfig from '@/configs/app.config'
import {
    TOKEN_TYPE,
    REQUEST_HEADER_AUTH_KEY,
    TOKEN_NAME_IN_STORAGE,
} from '@/constants/api.constant'
import type { InternalAxiosRequestConfig } from 'axios'

const AxiosRequestIntrceptorConfigCallback = (
    config: InternalAxiosRequestConfig,
) => {
    const storage = appConfig.accessTokenPersistStrategy

    if (storage === 'localStorage' || storage === 'sessionStorage') {
        let accessToken = ''

        if (storage === 'localStorage') {
            accessToken = localStorage.getItem(TOKEN_NAME_IN_STORAGE) || ''
        }

        if (storage === 'sessionStorage') {
            accessToken = sessionStorage.getItem(TOKEN_NAME_IN_STORAGE) || ''
        }

        if (accessToken) {
            // attach auth header
            config.headers[REQUEST_HEADER_AUTH_KEY] =
                `${TOKEN_TYPE}${accessToken}`
            // DEBUG: log whether token is attached (avoid printing raw token in production)
            try {
                // show masked token for debugging
                const masked =
                    accessToken.length > 10
                        ? `${accessToken.substring(0, 6)}...${accessToken.substring(accessToken.length - 4)}`
                        : accessToken
                console.info(
                    '[AxiosRequestInterceptor] attaching Authorization header, token=',
                    masked,
                )
            } catch {
                // ignore
            }
        }
    }

    return config
}

export default AxiosRequestIntrceptorConfigCallback
