import ApiService from './ApiService'

//  Get Lockup List
export async function apiGetLockupList<T, U extends Record<string, unknown>>(params: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/lookups/masters`,
        method: 'get',
        params,
    })
}

//  Get Single Lockup
export async function apiGetLockup<T, U extends Record<string, unknown>>({
    id,
    ...params
}: U & { id: string }) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/lookups/masters/${id}`,
        method: 'get',
        params,
    })
}

export async function apiGetLockupDetails<T, U extends Record<string, unknown>>({
    id,
    ...params
}: U & { id: string }) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/lookups/details/${id}`,
        method: 'get',
        params,
    })
}

//  Create Lockup
export async function apiCreateLockup<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/lookups/masters`,
        method: 'post',
        data,
    })
}

//  Update Lockup
export async function apiUpdateLockup<T, U extends Record<string, unknown>>(
    id: string,
    data: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/lookups/masters/${id}`,
        method: 'patch',
        data,
    })
}

// Delete Lockup
export async function apiDeleteLockup<T>(id: any) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/lookups/masters/${id}`,
        method: 'delete',
    })
}
