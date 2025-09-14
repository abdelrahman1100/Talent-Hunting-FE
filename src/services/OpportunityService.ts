import ApiService from './ApiService'
import type { JobOpportunity } from '@/@types/opportunity'

type GetOpportunitiesListResponse = {
    list: JobOpportunity[]
    total: number
}

/**
 * Fetch a list of opportunities for candidates.
 * Adjust params as needed (pagination/filtering).
 */
export async function getOpportunities(): Promise<JobOpportunity[]> {
    const response =
        await ApiService.fetchDataWithAxios<GetOpportunitiesListResponse>({
            url: 'recruitment/opportunity',
            method: 'get',
            params: {
                page: 1,
                pageSize: 100,
            },
        })

    // If backend returns array directly
    if (Array.isArray(response)) return response
    // If backend returns { list: [...] }
    if (response && Array.isArray(response.list)) return response.list
    return []
}

/**
 * Apply to an opportunity.
 * The payload is aligned with your ApplyForm usage.
 */
export async function applyToOpportunity(data: {
    opportunity_id: number | null
}) {
    return ApiService.fetchDataWithAxios({
        url: 'recruitment/application',
        method: 'post',
        data: data,
    })
}
