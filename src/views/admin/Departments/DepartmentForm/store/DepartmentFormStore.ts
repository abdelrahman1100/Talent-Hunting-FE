import { create } from 'zustand'
import type { CompanyOption, Companies, selectedCompany } from '../types'

export type DepartmentFormState = {
    companyList: Companies
    companyOption: CompanyOption[]
    selectedCompany: selectedCompany[]
}

type DepartmentFormAction = {
    setCompanyList: (payload: Companies) => void
    setCompanyOption: (payload: CompanyOption[]) => void
    setSelectedCompany: (payload: selectedCompany[]) => void
}

const initialState: DepartmentFormState = {
    companyList: [],
    companyOption: [],
    selectedCompany: [],
}

export const useDepartmentFormStore = create<
    DepartmentFormState & DepartmentFormAction
>((set) => ({
    ...initialState,
    setCompanyOption: (payload) => set(() => ({ companyOption: payload })),
    setCompanyList: (payload) => set(() => ({ companyList: payload })),
    setSelectedCompany: (payload) => set(() => ({ selectedCompany: payload })),
}))
