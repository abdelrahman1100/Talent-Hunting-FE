import { detail, Lockup } from '../../../LockUp/LockupForm/types'
import { create } from 'zustand'
import { LockupOption } from '@/views/admin/LockUp/LockupForm/types'
// import { Department } from '@/views/recruitment/opportunities/OpportunityList/types'
// import { DepartmentOption } from '@/hooks/useDepartmentOptions'
import { Role } from '../../UserList/types'
import { Department } from '@/views/admin/Departments/DepartmentList/types'
import { DepartmentOption } from '../types'

type selectedNationality = detail
type selectedGender = detail
type selectedDepartment = Department

type selectedRole = Role
type RoleOption = DepartmentOption
export type N_G_DFormState = {
    // nationality
    nationalityList: detail[]
    nationalityOption: LockupOption[]
    selectedNationality: selectedNationality[]
    // gender
    genderList: detail[]
    genderOption: LockupOption[]
    selectedGender: selectedGender[]

    // department
    departmentList: Department[]
    departmentOption: DepartmentOption[]
    selectedDepartment: selectedDepartment[]

    // roles

    roleList: Role[]
    roleOption: RoleOption[]
    selectedRole: selectedRole[]
}

type N_G_DFormAction = {
    setNationalityList: (payload: detail[]) => void
    setNationalityOption: (payload: LockupOption[]) => void
    setSelectedNationality: (payload: selectedNationality[]) => void

    setGenderList: (payload: detail[]) => void
    setGenderOption: (payload: LockupOption[]) => void
    setSelectedGender: (payload: selectedGender[]) => void

    setDepartmentList: (payload: Department[]) => void
    setDepartmentOption: (payload: DepartmentOption[]) => void
    setSelectedDepartment: (payload: selectedDepartment[]) => void

    setRoleList: (payload: Role[]) => void
    setRoleOption: (payload: RoleOption[]) => void
    setSelectedRole: (payload: selectedRole[]) => void
}

const initialState: N_G_DFormState = {
    nationalityList: [],
    nationalityOption: [],
    selectedNationality: [],
    genderList: [],
    genderOption: [],
    selectedGender: [],
    departmentList: [],
    departmentOption: [],
    selectedDepartment: [],
    roleList: [],
    roleOption: [],
    selectedRole: [],
}

export const useUserFormStore = create<N_G_DFormState & N_G_DFormAction>(
    (set) => ({
        ...initialState,
        setNationalityOption: (payload) =>
            set(() => ({ nationalityOption: payload })),
        setNationalityList: (payload) =>
            set(() => ({ nationalityList: payload })),
        setSelectedNationality: (payload) =>
            set(() => ({ selectedNationality: payload })),
        setGenderOption: (payload) => set(() => ({ genderOption: payload })),
        setGenderList: (payload) => set(() => ({ genderList: payload })),
        setSelectedGender: (payload) =>
            set(() => ({ selectedGender: payload })),
        setDepartmentOption: (payload) =>
            set(() => ({ departmentOption: payload })),
        setDepartmentList: (payload) =>
            set(() => ({ departmentList: payload })),
        setSelectedDepartment: (payload) =>
            set(() => ({ selectedDepartment: payload })),
        setRoleOption: (payload) => set(() => ({ roleOption: payload })),
        setRoleList: (payload) => set(() => ({ roleList: payload })),
        setSelectedRole: (payload) => set(() => ({ selectedRole: payload })),
    }),
)
