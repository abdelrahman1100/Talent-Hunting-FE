import ApiService from './ApiService'
export async function apiGetApplications<T, U extends Record<string, unknown>>(
    params: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'recruitment/application',
        method: 'get',
        params,
    })
}
export async function apiGetApplicationsForOpportunity<
    T,
    U extends Record<string, unknown>,
>({ id, ...params }: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `recruitment/application/opportunity/${id}`,
        method: 'get',
        params,
    })
}
export async function apiDeleteApplication<
    T,
    U extends Record<string, unknown>,
>({ id, ...params }: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `recruitment/application/${id}`,
        method: 'delete',
        params,
    })
}

export async function apiUpdateApplicationStatus<
    T,
    U extends Record<string, unknown>,
>({ id, ...data }: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `recruitment/application/${id}`,
        method: 'patch',
        data,
    })
}
export async function apiGetApplicationsForProfile<
    T,
    U extends Record<string, unknown>,
>({ id, ...params }: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `recruitment/application/profile/${id}`,
        method: 'get',
        params,
    })
}
