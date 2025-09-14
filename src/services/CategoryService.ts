import ApiService from './ApiService'

//  Get Categories List
export async function apiGetCategoriesList<T, U extends Record<string, unknown>>(params: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/categories`,
        method: 'get',
        params,
    })
}

//  Get Single Category
export async function apiGetCategory<T, U extends Record<string, unknown>>({
    id,
    ...params
}: U & { id: string }) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/categories/${id}`,
        method: 'get',
        params,
    })
}

//  Create Category
export async function apiCreateCategory<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/categories`,
        method: 'post',
        data,
    })
}

//  Update Category
export async function apiUpdateCategory<T, U extends Record<string, unknown>>(
    id: string,
    data: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/categories/${id}`,
        method: 'patch',
        data,
    })
}

// Delete Category
export async function apiDeleteCategory<T>(id: any) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/categories/${id}`,
        method: 'delete',
    })
}
