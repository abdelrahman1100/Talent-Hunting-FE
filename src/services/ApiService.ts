import AxiosBase from './axios/AxiosBase'
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

const ApiService = {
    fetchDataWithAxios<Response = unknown, Request = Record<string, unknown>>(
        param: AxiosRequestConfig<Request>,
    ) {
        console.log(
            'Sending request:',
            param.method,
            param.baseURL ? `${param.baseURL}${param.url}` : param.url,
            param.params,
        )
        return new Promise<Response>((resolve, reject) => {
            AxiosBase(param)
                .then((response: AxiosResponse<Response>) => {
                    console.log('Response status:', response.status)
                    console.log('Response data:', response.data)
                    resolve(response.data)
                })
                .catch((errors: AxiosError) => {
                    // debug log
                    try {
                        console.error(
                            'API request failed:',
                            errors?.response?.status,
                            errors?.response?.data,
                        )
                    } catch {
                        // ignore
                    }
                    reject(errors)
                })
            console.log(param)
        })
    },
}

export default ApiService
