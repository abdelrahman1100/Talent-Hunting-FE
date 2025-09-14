import { apiGetOpportunitiesList } from '@/services/OpportunitiesService'
import useSWR from 'swr'
import { useOpportunityListStore } from '../store/opportunityListStore'
import type { GetOpportunitiesListResponse } from '../types'
import type { TableQueries } from '@/@types/common'

export default function useOpportunityList() {
    const {
        tableData,
        filterData,
        setTableData,
        selectedOpportunity,
        setSelectedOpportunity,
        setSelectAllOpportunity,
        setFilterData,
    } = useOpportunityListStore((state) => state)

    // Flatten sort object for backend compatibility
    const getApiParams = () => {
        const params: any = { ...tableData, ...filterData }
        if (params.sort) {
            // Fix: ensure department column uses dot notation
            if (params.sort.key === 'department_name') {
                params.sortBy = 'department.name'
            } else if (params.sort.key) {
                params.sortBy = params.sort.key
            }
            if (params.sort.order)
                params.order = params.sort.order.toUpperCase()
            delete params.sort
        }
        return params
    }

    const { data, error, isLoading, mutate } = useSWR(
        ['recruitment/opportunity', getApiParams()],
        ([_, params]) =>
            apiGetOpportunitiesList<GetOpportunitiesListResponse, TableQueries>(
                params,
            ),
        {
            revalidateOnFocus: false,
        },
    )

    // Support both array and object API responses
    let opportunityList: any[] = []
    let opportunityListTotal = 0
    if (Array.isArray(data)) {
        opportunityList = data
        opportunityListTotal = data.length
    } else if (data) {
        opportunityList = data.list || []
        opportunityListTotal = data.total || opportunityList.length || 0
    }

    return {
        opportunityList,
        opportunityListTotal,
        error,
        isLoading,
        tableData,
        filterData,
        mutate,
        setTableData,
        selectedOpportunity,
        setSelectedOpportunity,
        setSelectAllOpportunity,
        setFilterData,
    }
}
