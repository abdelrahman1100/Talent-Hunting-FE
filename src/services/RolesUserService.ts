import ApiService from './ApiService'

// Get Roles List
export async function apiGetRolesList<T, U extends Record<string, unknown>>(
    params?: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/roles',
        method: 'get',
        params,
    })
}

// Get Single Role
export async function apiGetRole<T>(id: string) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/roles/${id}`,
        method: 'get',
    })
}

// Create Role
export async function apiCreateRole<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/roles`,
        method: 'post',
        data,
    })
}

// Update Role
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

// Assign Roles to User
export async function apiAssignRolesToUser<
    T,
    U extends Record<string, unknown>,
>(userId: string, data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/users/${userId}`,
        method: 'patch',
        data,
    })
}

// Get User Roles
export async function apiGetUserRoles<T>(userId: string) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/users/${userId}/roles`,
        method: 'get',
    })
}

// Remove Role from User
export async function apiRemoveRoleFromUser<T>(userId: string, roleId: string) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/users/${userId}/roles/${roleId}`,
        method: 'delete',
    })
}

// Get Users by Single Role
export async function apiGetUsersByRole<T, U extends Record<string, unknown>>(
    roleId: string,
    params?: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/users/role/${roleId}`,
        method: 'get',
        params,
    })
}

// Get Users by Multiple Roles
export async function apiGetUsersByRoles<T, U extends Record<string, unknown>>(
    params: U & { role_ids: string | string[] },
) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/users/by-roles',
        method: 'get',
        params,
    })
}
