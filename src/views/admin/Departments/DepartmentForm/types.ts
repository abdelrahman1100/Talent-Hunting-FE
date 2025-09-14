import { Department } from './../DepartmentList/types'
// import type { Control, FieldErrors } from 'react-hook-form'

import { z } from 'zod'
// import { validationSchema } from './DepartmentForm'
import type { Control, FieldErrors } from 'react-hook-form'
// import { validationSchema } from './DepartmentForm';
import { Category } from '@/views/admin/category/CategoryList/types'
import { DepartmentFormSchema } from './DepartmentForm'

// import { Category } from '@/views/category/CategoryList/types';

// // user types
// export type User = {
//     id: string
//     name: string
//     email: string
//     password: string
//     user_img: string
//     gender_id: number
//     nationality_id: number
//     department_id: number
//     role_ids: number[]
// }

// // general fields
// export type GeneralUserFields = {
//     name: string
//     email: string
//     password: string
//     user_img: string
// }

// // attributes fields
// export type AttributeUserFields = {
//     gender_id: number
//     nationality_id: number
//     department_id: number
//     role_ids: number[]
// }

// // all user fields
// export type DepartmentFormSchema = z.infer<typeof validationSchema>

// // form section base props
export type FormSectionBaseProps = {
    control: Control<DepartmentFormSchema>
    errors: FieldErrors<DepartmentFormSchema>
}

export type Company = {
    id: number
    status: 'active'
    created_by: number
    last_updated_by: number | null
    generated_date: string
    last_updated_date: string
    name: string
    location: string
    employee_count: number
    commercial_id: string
    category: Category
}

export type GetCompanyListResponse = {
    list: Company[]
    total: number
}

export type Companies = Company[]

export type GetCompaniesListResponse = {
    list: Companies
    total: number
}

export type CompanyOption = {
    label: string
    // img: string
    value: number
    status: string
}

// export type SelectedProduct = Company & { quantity: number }
export type selectedCompany = Company

// export type FormSectionBaseProps = {
//     control: Control<DepartmentFormSchema>
//     errors: FieldErrors<DepartmentFormSchema>
// }

const CompanyFormSchema2 = z.object({
    name: z.string().min(2).max(100),
    // location: z.string().min(2).max(100),
    // commercial_id: z.string().min(2).max(100),
    category: z.string().min(2).max(100),
})

export type DepartmentFormSchema2 = {
    name: string
    // location: string
    // commercial_id: string
    company: Company
}
