import ApiService from './ApiService'

//  Get Roles List
export async function apiGetRolesList<T, U extends Record<string, unknown>>(params: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/roles`,
        method: 'get',
        params,
    })
}

//  Get Single User
export async function apiGetRole<T, U extends Record<string, unknown>>({
    id,
    ...params
}: U & { id: string }) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/roles/${id}`,
        method: 'get',
        params,
    })
}

//  Create Role
export async function apiCreateRole<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/roles`,
        method: 'post',
        data,
    })
}

//  Update Role
export async function apiUpdateRole<T, U extends Record<string, unknown>>(
    id: string,
    data: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/roles/${id}`,
        method: 'patch',
        data,
    })
}

// Delete Role
export async function apiDeleteRole<T>(id: any) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/roles/${id}`,
        method: 'delete',
    })
}
