import { OpportunityFormSchema } from '@/views/recruitment/opportunities/OpportunityForm/types'
import ApiService from './ApiService'
export async function apiGetOpportunitiesList<
    T,
    U extends Record<string, unknown>,
>(params: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'recruitment/opportunity',
        method: 'get',
        params,
    })
}
export async function apiDeleteOpportunity({ id }: { id: number }) {
    return ApiService.fetchDataWithAxios({
        url: `recruitment/opportunity/${id}`,
        method: 'delete',
    })
}

export async function apiCreateOpportunity(data: OpportunityFormSchema) {
    return ApiService.fetchDataWithAxios({
        url: 'recruitment/opportunity',
        method: 'post',
        data,
    })
}

export async function apiUpdateOpportunity({
    id,
    ...data
}: { id: string | number } & OpportunityFormSchema) {
    return ApiService.fetchDataWithAxios({
        url: `recruitment/opportunity/${id}`,
        method: 'patch',
        data,
    })
}
export async function apiGetOpportunity<T, U extends Record<string, unknown>>({
    id,
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `recruitment/opportunity/${id}`,
        method: 'get',
        params,
    })
}
