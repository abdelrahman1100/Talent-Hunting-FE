// import { Category } from './../../category/CategoryList/types';
export type Order = {
    id: string
    date: number
    customer: string
    status: number
    paymentMehod: string
    paymentIdendifier: string
    totalAmount: number
}

export type Orders = Order[]

export type Filter = {
    name?: string
    location?: string
    category_id?: string
    status?: string
    employee_count?: string
}

export type Category = {
    id: number
    status: string
    created_by: number | null
    last_updated_by: number | null
    generated_date: string
    last_updated_date: string
    name: string
    description: string
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
    category?: Category
}

export type GetCompanyResponse = {
    list: Company[]
    total: number
}

export type UpdateCompanyRequest = {
    commercial_id?: string
    name?: string
    location?: string
    category?: Category
    // employee_count: number
}
