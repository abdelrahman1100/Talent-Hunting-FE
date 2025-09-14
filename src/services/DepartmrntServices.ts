import ApiService from './ApiService'

//  Get Departments List
export async function apiGetDepartmentsList<T, U extends Record<string, unknown>>(params: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/departments`,
        method: 'get',
        params,
    })
}

// export async function apiGetDepartmentsList2<T>() {
//     return ApiService.fetchDataWithAxios<T>({
//         url: `/departments`,
//         method: 'get',
    
//     })
// }

//  Get Single Department
export async function apiGetDepartment<T, U extends Record<string, unknown>>({
    id,
    ...params
}: U & { id: string }) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/departments/${id}`,
        method: 'get',
        params,
    })
}

//  Create Department
export async function apiCreateDepartment<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/departments`,
        method: 'post',
        data,
    })
}

//  Update Department
export async function apiUpdateDepartment<T, U extends Record<string, unknown>>(
    id: string,
    data: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/departments/${id}`,
        method: 'patch',
        data,
    })
}

// Delete Department
export async function apiDeleteDepartment<T>(id: any) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/departments/${id}`,
        method: 'delete',
    })
}
