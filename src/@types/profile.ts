export interface ProfileExperience {
    id?: number
    company: string
    title: string
    years?: number
}

export interface ProfileEducation {
    id?: number
    university: string
    degree: string
    year?: number
}

export interface ProfileSkill {
    id?: number
    name: string
    level?: string
}

export interface Profile {
    id?: number
    user_id?: number
    summary: string
    skills: ProfileSkill[]
    experiences: ProfileExperience[]
    educations: ProfileEducation[]
    linkedinUrl?: string
    cvFile?: string
    created_at?: string
    updated_at?: string
}

export interface ProfileRequest {
    summary: string
    skills: ProfileSkill[]
    experiences: ProfileExperience[]
    educations: ProfileEducation[]
    linkedinUrl?: string
    cvFile?: File | string // Can be either a File object or base64 string
}

export interface ProfileResponse extends Profile {}
