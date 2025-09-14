export interface CandidateApplication {
    id: number
    status: string
    created_by: number
    last_updated_by: number
    generated_date: string
    last_updated_date: string
    application_status: string
    opportunity: {
        id: number
        title: string
        description: string
        jobType: string
        salary_min: number
        salary_max: number
        location?: string
        company?: string
        status: string
        generated_date: string
    }
}

export type GetCandidateApplicationsResponse = {
    list: CandidateApplication[]
    total: number
}

export type ApplicationStatus =
    | 'pending'
    | 'accepted'
    | 'rejected'
    | 'withdrawn'
