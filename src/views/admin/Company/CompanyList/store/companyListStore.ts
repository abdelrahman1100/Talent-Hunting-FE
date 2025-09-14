import { create } from 'zustand'
import type { TableQueries } from '@/@types/common'
import type { Company, Filter } from '../types'

export const initialTableData: TableQueries = {
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export const initialFilterData = {
    name: '',
    location: '',
    category_id: '',
    status: '',
    employee_count: '',
}

export type CompanyListState = {
    tableData: TableQueries
    filterData: Filter
    // companyList: Company[]
    selectedCompany: Partial<Company>[]
}

type CompanyListAction = {
    setFilterData: (payload: Filter) => void
    setTableData: (payload: TableQueries) => void
    setSelectedCompany: (checked: boolean, company: Company) => void
    setSelectAllCompany: (companies: Company[]) => void
}

const initialState: CompanyListState = {
    tableData: initialTableData,
    filterData: initialFilterData,
    // companyList: [],
    selectedCompany: [],
}

export const useCompanyListStore = create<CompanyListState & CompanyListAction>(
    (set) => ({
        ...initialState,
        setFilterData: (payload) => set(() => ({ filterData: payload })),
        setTableData: (payload) => set(() => ({ tableData: payload })),
        setSelectedCompany: (checked, row) =>
            set((state) => {
                const prevData = state.selectedCompany
                if (checked) {
                    return { selectedCompany: [...prevData, row] }
                } else {
                    return {
                        selectedCompany: prevData.filter(
                            (prevCompany) => prevCompany.id !== row.id,
                        ),
                    }
                }
            }),
        setSelectAllCompany: (rows) => set(() => ({ selectedCompany: rows })),
    }),
)
