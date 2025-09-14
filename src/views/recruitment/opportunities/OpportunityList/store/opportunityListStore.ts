import { create } from 'zustand'
import type { TableQueries } from '@/@types/common'
import type { Opportunity, OpportunityFilter } from '../types'

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

export const initialFilterData: OpportunityFilter = {
    // title: '',
    status: '',
    jobType: '',
    department_id: undefined,
    // publishScope: '',
}

export type OpportunitiesListState = {
    tableData: TableQueries
    filterData: OpportunityFilter
    selectedOpportunity: Partial<Opportunity>[]
}

type OpportunitiesListAction = {
    setFilterData: (payload: OpportunityFilter) => void
    setTableData: (payload: TableQueries) => void
    setSelectedOpportunity: (checked: boolean, opportunity: Opportunity) => void
    setSelectAllOpportunity: (opportunity: Opportunity[]) => void
}

const initialState: OpportunitiesListState = {
    tableData: initialTableData,
    filterData: initialFilterData,
    selectedOpportunity: [],
}

export const useOpportunityListStore = create<
    OpportunitiesListState & OpportunitiesListAction
>((set) => ({
    ...initialState,
    setFilterData: (payload) => set(() => ({ filterData: payload })),
    setTableData: (payload) => set(() => ({ tableData: payload })),
    setSelectedOpportunity: (checked, row) =>
        set((state) => {
            const prevData = state.selectedOpportunity
            if (checked) {
                return { selectedOpportunity: [...prevData, ...[row]] }
            } else {
                if (
                    prevData.some(
                        (prevOpportunity) => row.id === prevOpportunity.id,
                    )
                ) {
                    return {
                        selectedOpportunity: prevData.filter(
                            (prevOpportunity) => prevOpportunity.id !== row.id,
                        ),
                    }
                }
                return { selectedOpportunity: prevData }
            }
        }),
    setSelectAllOpportunity: (row) => set(() => ({ selectedOpportunity: row })),
}))
