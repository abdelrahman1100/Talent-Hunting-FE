export type Department = {
    id: number
    status: string
    created_by: number | null
    last_updated_by: number | null
    generated_date: string
    last_updated_date: string
    name: string
}

export type Opportunity = {
    id: number
    status: string
    created_by: number
    last_updated_by: number | null
    generated_date: string
    last_updated_date: string
    title: string
    description: string
    jobType: string
    salary_min: number
    salary_max: number
    publishScope: string
    department_id: number
    department: Department
}

export type GetOpportunitiesListResponse = {
    list: Opportunity[]
    total: number
}

export type OpportunityFilter = {
    // title?: string
    status?: string
    jobType?: string
    department_id?: number
    // publishScope?: string
}
