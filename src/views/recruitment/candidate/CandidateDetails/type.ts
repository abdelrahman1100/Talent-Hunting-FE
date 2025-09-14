export type Skill = {
    id: number
    name: string
    level: string
}

export type Experience = {
    id: number
    title: string
    company: string
    years: number
}

export type Education = {
    id: number
    degree: string
    university: string
    year: number
}

export type User = {
    id: number
    status: string
    created_by: number
    last_updated_by: number | null
    generated_date: string
    last_updated_date: string
    name: string
    email: string
    password: string
    user_img: string | null
    tokenVersion: number
}

export type CandidateProfile = {
    id: number
    status: string
    created_by: number
    last_updated_by: number
    generated_date: string
    last_updated_date: string
    summary: string
    cvFile: string
    linkedinUrl: string
    skills: Skill[]
    experiences: Experience[]
    educations: Education[]
    user: User
}
