import type { Control, FieldErrors } from 'react-hook-form'
export type OpportunityFormSchema = {
    title: string
    description: string
    jobType: string
    salary_min: number
    salary_max: number
    departmentId: number
    publishScope: string
}

export type FormSectionBaseProps = {
    control: Control<OpportunityFormSchema>
    errors: FieldErrors<OpportunityFormSchema>
}
