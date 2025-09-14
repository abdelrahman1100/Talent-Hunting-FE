import ApiService from './ApiService'

//  Get Users List
export async function apiGetUserList<T, U extends Record<string, unknown>>(params: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/users`,
        method: 'get',
        params,
    })
}

//  Get Single User
export async function apiGetUser<T, U extends Record<string, unknown>>({
    id,
    ...params
}: U & { id: string }) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/users/${id}`,
        method: 'get',
        params,
    })
}

//  Create Company
export async function apiCreateUser<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/users`,
        method: 'post',
        data,
    })
}

//  Update User
export async function apiUpdateUser<T, U extends Record<string, unknown>>(
    id: string,
    data: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/users/${id}`,
        method: 'patch',
        data,
    })
}

// Delete User
export async function apiDeleteUser<T>(id: any) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/users/${id}`,
        method: 'delete',
    })
}
