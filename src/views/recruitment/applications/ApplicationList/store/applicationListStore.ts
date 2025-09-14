import { Application } from './../types'
import { create } from 'zustand'
import type { TableQueries } from '@/@types/common'
import { ApplicationFilter } from '../types'
// import type { Opportunity, OpportunityFilter } from '../types'

export const initialTableData: TableQueries = {
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
    search: '',
}

export const initialFilterData: ApplicationFilter = {
    // title: '',
    status: '',
    // jobType: '',
    // department_id: undefined,
    // publishScope: '',
}

export type ApplicationListState = {
    tableData: TableQueries
    filterData: ApplicationFilter
    selectedApplication: Application[]
}

type ApplicationListAction = {
    setFilterData: (payload: ApplicationFilter) => void
    setTableData: (payload: TableQueries) => void
    setSelectedApplication: (checked: boolean, application: Application) => void
    setSelectAllApplication: (application: Application[]) => void
}

const initialState: ApplicationListState = {
    tableData: initialTableData,
    filterData: initialFilterData,
    selectedApplication: [],
}

export const useApplicationListStore = create<
    ApplicationListState & ApplicationListAction
>((set) => ({
    ...initialState,
    setFilterData: (payload) => set(() => ({ filterData: payload })),
    setTableData: (payload) => set(() => ({ tableData: payload })),
    setSelectedApplication: (checked, row) =>
        set((state) => {
            const prevData = state.selectedApplication
            if (checked) {
                return { selectedApplication: [...prevData, ...[row]] }
            } else {
                if (
                    prevData.some(
                        (prevApplication) => row.id === prevApplication.id,
                    )
                ) {
                    return {
                        selectedApplication: prevData.filter(
                            (prevApplication) => prevApplication.id !== row.id,
                        ),
                    }
                }
                return { selectedApplication: prevData }
            }
        }),
    setSelectAllApplication: (row) => set(() => ({ selectedApplication: row })),
}))
