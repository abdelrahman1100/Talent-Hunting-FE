import { create } from 'zustand'
import type { TableQueries } from '@/@types/common'
import type { Department, DepartmentFilter } from '../types'

export const initialTableData: TableQueries = {
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export const initialFilterData: DepartmentFilter = {
    name: '',
    status: '',
}

export type DepartmentListState = {
    tableData: TableQueries
    filterData: DepartmentFilter
    selectedDepartment: Partial<Department>[]
}

type DepartmentListAction = {
    setFilterData: (payload: DepartmentFilter) => void
    setTableData: (payload: TableQueries) => void
    setSelectedDepartment: (checked: boolean, department: Department) => void
    setSelectAllDepartment: (departments: Department[]) => void
}

const initialState: DepartmentListState = {
    tableData: initialTableData,
    filterData: initialFilterData,
    selectedDepartment: [],
}

export const useDepartmentListStore = create<
    DepartmentListState & DepartmentListAction
>((set) => ({
    ...initialState,
    setFilterData: (payload) => set(() => ({ filterData: payload })),
    setTableData: (payload) => set(() => ({ tableData: payload })),
    setSelectedDepartment: (checked, row) =>
        set((state) => {
            const prevData = state.selectedDepartment
            if (checked) {
                return { selectedDepartment: [...prevData, row] }
            } else {
                return {
                    selectedDepartment: prevData.filter(
                        (prevDepartment) => prevDepartment.id !== row.id,
                    ),
                }
            }
        }),
    setSelectAllDepartment: (rows) => set(() => ({ selectedDepartment: rows })),
}))
