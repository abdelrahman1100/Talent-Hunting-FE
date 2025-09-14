export interface JobOpportunity {
    id: number
    status: string
    generated_date: string
    last_updated_date?: string
    title: string
    description: string
    jobType: string
    salary_min: number
    salary_max: number
    publishScope: string
    department_id?: number
    company?: string
    location?: string
}
