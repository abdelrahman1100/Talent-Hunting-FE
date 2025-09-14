import type { Control, FieldErrors } from 'react-hook-form'
import { Category, Company } from '../CompanyList/types'
import { CompanyFormSchema } from './CompanyForm'
import { z } from 'zod'

export type categories = Category[]

export type GetCategoriesListResponse = {
    list: categories
    total: number
}

export type CategoryOption = {
    label: string
    // img: string
    value: number
    status: string
}

// export type SelectedProduct = Company & { quantity: number }
export type selectedCategory = Category

export type FormSectionBaseProps = {
    control: Control<CompanyFormSchema>
    errors: FieldErrors<CompanyFormSchema>
}

// const CompanyFormSchema2 = z.object({
//     name: z.string().min(2).max(100),
//     location: z.string().min(2).max(100),
//     commercial_id: z.string().min(2).max(100),
//     category: z.string().min(2).max(100),
// })

export type CompanyFormSchema2 = {
    name: string
    location: string
    commercial_id: string
    category: Category
}
