import ApiService from './ApiService'
import endpointConfig from '@/configs/endpoint.config'
import type { ProfileRequest, ProfileResponse } from '@/@types/profile'
import { isAxiosError } from 'axios'
import { useSessionUser } from '@/store/authStore'

// Convert File to base64 string without data URL prefix
async function fileToBase64(file: File): Promise<string> {
    const dataUrl: string = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
    // Strip data URL prefix (e.g., "data:application/pdf;base64,")
    const commaIndex = dataUrl.indexOf(',')
    return commaIndex !== -1 ? dataUrl.substring(commaIndex + 1) : dataUrl
}

// Get user ID from auth store
function getUserId(): number {
    const { user } = useSessionUser.getState()
    if (!user?.userId) {
        throw new Error('User not authenticated')
    }
    return Number(user.userId)
}

export async function getProfile(): Promise<ProfileResponse | null> {
    try {
        const userId = getUserId()
        return await ApiService.fetchDataWithAxios<ProfileResponse>({
            url: `${endpointConfig.profile}/${userId}`,
            method: 'get',
        })
    } catch (err) {
        if (isAxiosError(err) && err.response?.status === 404) {
            // No profile exists for this user
            return null
        }
        throw err
    }
}

export async function getProfileById(id: number): Promise<ProfileResponse> {
    return ApiService.fetchDataWithAxios<ProfileResponse>({
        url: `${endpointConfig.profile}/${id}`,
        method: 'get',
    })
}

// You can align this with the form's limit to ensure consistency
const MAX_CV_BYTES = Math.floor(0.7 * 1024 * 1024) // ~0.7MB

export async function createProfile(
    data: ProfileRequest,
): Promise<ProfileResponse> {
    // Block oversized CV to avoid creating huge JSON payload
    if (data.cvFile instanceof File && data.cvFile.size > MAX_CV_BYTES) {
        throw new Error('CV file too large. Please upload <= 0.7MB.')
    }

    // Transform to backend-expected payload
    const cvBase64 =
        data.cvFile instanceof File
            ? await fileToBase64(data.cvFile)
            : data.cvFile // If it's already a base64 string, use it directly

    const payload = {
        summary: data.summary,
        cvFile: cvBase64,
        linkedinUrl: data.linkedinUrl,
        // Map skills directly without parsing
        skills: (data.skills || []).map((s) => ({
            name: s.name || '',
            level: s.level || 'Intermediate',
        })),
        // Map experiences directly
        experiences: (data.experiences || []).map((e) => ({
            title: e.title || '',
            company: e.company || '',
            years: Number(e.years ?? 0) || 1,
        })),
        educations: (data.educations || []).map((ed) => ({
            degree: ed.degree || '',
            university: ed.university || '',
            year: Number(ed.year) || undefined,
        })),
    }

    try {
        // Use POST method for creating new profile
        return await ApiService.fetchDataWithAxios<ProfileResponse>({
            url: endpointConfig.profile,
            method: 'post',
            data: payload,
        })
    } catch (err) {
        if (isAxiosError(err) && err.response?.status === 413) {
            throw new Error(
                'Request entity too large. Please upload a smaller CV (<= 0.7MB) or compress it.',
            )
        }
        throw err
    }
}

export async function updateProfile(
    id: number,
    data: ProfileRequest,
): Promise<ProfileResponse> {
    if (data.cvFile instanceof File && data.cvFile.size > MAX_CV_BYTES) {
        throw new Error('CV file too large. Please upload <= 0.7MB.')
    }

    const cvBase64 =
        data.cvFile instanceof File
            ? await fileToBase64(data.cvFile)
            : data.cvFile // If it's already a base64 string, use it directly

    const payload = {
        summary: data.summary,
        cvFile: cvBase64,
        linkedinUrl: data.linkedinUrl,
        skills: (data.skills || []).map((s) => ({
            name: s.name || '',
            level: s.level || 'Intermediate',
        })),
        experiences: (data.experiences || []).map((e) => ({
            title: e.title || '',
            company: e.company || '',
            years: Number(e.years ?? 0) || 1,
        })),
        educations: (data.educations || []).map((ed) => ({
            degree: ed.degree || '',
            university: ed.university || '',
            year: Number(ed.year) || undefined,
        })),
    }

    try {
        return await ApiService.fetchDataWithAxios<ProfileResponse>({
            url: `${endpointConfig.profile}/${id}`,
            method: 'patch',
            data: payload,
        })
    } catch (err) {
        if (isAxiosError(err) && err.response?.status === 413) {
            throw new Error(
                'Request entity too large. Please upload a smaller CV (<= 0.7MB) or compress it.',
            )
        }
        throw err
    }
}

export async function deleteProfile(): Promise<void> {
    const userId = getUserId()
    return ApiService.fetchDataWithAxios<void>({
        url: `${endpointConfig.profile}/${userId}`,
        method: 'delete',
    })
}

export async function apiGetProfile<T, U extends Record<string, unknown>>({
    id,
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `recruitment/profile/by-profile/${id}`,
        method: 'get',
        params,
    })
}
