import { Department } from '../../Departments/DepartmentList/types'
import { detail } from '../../LockUp/LockupForm/types'

export type Filter = {
    name?: string
    department_id?: string
    status?: string
    role_ids?: string[]
}

export type DetailsLockup = {
    id: number
    status: string
    created_by: number | null
    last_updated_by: number | null
    generated_date: string
    last_updated_date: string
    value: string
    label: string
}

export type Lookup = {
    id: number
    status: string
    created_by: number | null
    last_updated_by: number | null
    generated_date: string
    last_updated_date: string
    name: string
    label: string
    details: DetailsLockup[]
}

export type Role = {
    id: number
    status: string
    created_by: number | null
    last_updated_by: number | null
    generated_date: string
    last_updated_date: string
    name: string
    description: string
    privileges?: number[]
}

export type User = {
    id: number
    status: 'active'
    created_by: number
    last_updated_by: number | null
    generated_date: string
    last_updated_date: string
    name: string
    email: string
    password: string
    user_img: string | null
    gender: detail
    nationality: detail
    department: Department
    roles: Role[]
}

export type GetUserResponse = {
    list: User[]
    total: number
}

export type UpdateUserRequest = {
    name: string
    email: string
    password: string
    user_img: string | null
    gender_id: number
    nationality_id: number
    department_id: number
    role_ids: number[]
}

// Types for role users functionality
export type RoleUser = {
    id: number
    name: string
    email: string
    status: string
    user_img: string | null
    department: {
        id: number
        name: string
    } | null
    company: {
        id: number
        name: string
    } | null
}

export type GetUsersByRoleResponse = {
    list: RoleUser[]
    total: number
    pageIndex: number
    pageSize: number
}
