export interface Opportunity {
    id: number
    status: string
    created_by: number
    last_updated_by: number
    generated_date: string
    last_updated_date: string
    title: string
    description: string
    jobType: string
    salary_min: number
    salary_max: number
    publishScope: string
    department_id: number
}

export interface Profile {
    id: number
    status: string
    created_by: number
    last_updated_by: number
    generated_date: string
    last_updated_date: string
    summary: string
    cvFile: string
    linkedinUrl?: string
}

export interface Application {
    id: number
    status: string
    created_by: number
    last_updated_by: number
    generated_date: string
    last_updated_date: string
    application_status: string
    opportunity: Opportunity
    profile: Profile
}

export type GetApplicationsListResponse = {
    list: Application[]
    total: number
}

export type ApplicationFilter = {
    // title?: string
    status?: string
    // jobType?: string
    // department_id?: number
    // publishScope?: string
}
