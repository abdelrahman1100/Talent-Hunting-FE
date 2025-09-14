import ApiService from './ApiService'

//  Get Companies List
export async function apiGetCompaniesList<T, U extends Record<string, unknown>>(
    params: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/companies`,
        method: 'get',
        params,
    })
}

//  Get Single Company
export async function apiGetCompany<T, U extends Record<string, unknown>>({
    id,
    ...params
}: U & { id: string }) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/companies/${id}`,
        method: 'get',
        params,
    })
}

//  Create Company
export async function apiCreateCompany<T, U extends Record<string, unknown>>(
    data: U,
) {
    console.log('apiCreateCompany - Raw data received:', data)
    console.log('apiCreateCompany - Data keys:', Object.keys(data))
    console.log(
        'apiCreateCompany - category_id present:',
        'category_id' in data,
    )
    console.log(
        'apiCreateCompany - category_id value:',
        (data as any).category_id,
    )

    return ApiService.fetchDataWithAxios<T>({
        url: `/companies`,
        method: 'post',
        data,
    })
}

//  Update Company
export async function apiUpdateCompany<T, U extends Record<string, unknown>>(
    id: string,
    data: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/companies/${id}`,
        method: 'patch',
        data,
    })
}

// Delete Company
export async function apiDeleteCompany<T>(id: any) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/companies/${id}`,
        method: 'delete',
    })
}
