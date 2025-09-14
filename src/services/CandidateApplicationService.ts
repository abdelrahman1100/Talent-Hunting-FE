import ApiService from './ApiService'
import type {
    CandidateApplication,
    GetCandidateApplicationsResponse,
} from '@/@types/application'
import { getProfile } from './ProfileService'

/**
 * Get all applications for the current candidate
 */
export async function getCandidateApplications(): Promise<
    CandidateApplication[]
> {
    try {
        // First get the profile to get the profile ID
        const profile = await getProfile()
        if (!profile || !profile.id) {
            console.log('No profile found for user')
            return []
        }

        const response =
            await ApiService.fetchDataWithAxios<GetCandidateApplicationsResponse>(
                {
                    url: `recruitment/application/profile/${profile.id}`,
                    method: 'get',
                },
            )

        // If backend returns array directly
        if (Array.isArray(response)) return response
        // If backend returns { list: [...] }
        if (response && Array.isArray(response.list)) return response.list
        return []
    } catch (error) {
        console.error('Error fetching candidate applications:', error)
        return []
    }
}

/**
 * Withdraw an application
 */
export async function withdrawApplication(
    applicationId: number,
): Promise<void> {
    return ApiService.fetchDataWithAxios<void>({
        url: `recruitment/application/${applicationId}`,
        method: 'delete',
    })
}

/**
 * Get application details
 */
export async function getApplicationDetails(
    applicationId: number,
): Promise<CandidateApplication> {
    // First get the profile to get the profile ID
    const profile = await getProfile()
    if (!profile || !profile.id) {
        throw new Error('No profile found for user')
    }

    return ApiService.fetchDataWithAxios<CandidateApplication>({
        url: `recruitment/application/${applicationId}/${profile.id}`,
        method: 'get',
    })
}
