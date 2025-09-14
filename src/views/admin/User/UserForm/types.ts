import type { Control, FieldErrors } from 'react-hook-form'
import { Lookup, Role, User } from '../UserList/types'
import { UserFormSchema } from './UserForm'
import { Department } from '../../Departments/DepartmentList/types'
import { detail } from '../../LockUp/LockupForm/types'

export type Users = User[]

export type GetUsersListResponse = {
    list: Users
    total: number
}

export type GetRolesListResponse = {
    list: Role[]
    total: number
}

export type DepartmentOption = {
    label: string
    value: number
    status: string
}

export type selectedUser = User

export type FormSectionBaseProps = {
    control: Control<UserFormSchema>
    errors: FieldErrors<UserFormSchema>
}

export type UserFormSchema2 = {
    name: string
    email: string
    password?: string // Optional since it's not required when editing
    user_img: string | null
    gender: detail
    nationality: detail
    department: Department
    roles: Role[]
}
