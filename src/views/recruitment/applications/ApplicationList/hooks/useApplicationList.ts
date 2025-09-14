import { apiGetApplicationsForOpportunity } from '@/services/ApplicationsService'
import useSWR from 'swr'
import type { TableQueries } from '@/@types/common'
import { useApplicationListStore } from '../store/applicationListStore'
import { GetApplicationsListResponse } from '../types'

export default function useApplicationList(opportunityId?: string) {
    const {
        tableData,
        filterData,
        setTableData,
        selectedApplication,
        setSelectedApplication,
        setSelectAllApplication,
        setFilterData,
    } = useApplicationListStore((state) => state)

    // Flatten sort object for backend compatibility
    const getApiParams = () => {
        const params: any = { ...tableData, ...filterData }
        if (params.sort) {
            params.sortBy = params.sort.key
            if (params.sort.order)
                params.order = params.sort.order.toUpperCase()
            delete params.sort
        }
        return params
    }

    const shouldFetch =
        opportunityId !== undefined &&
        opportunityId !== null &&
        opportunityId !== ''
    const { data, error, isLoading, mutate } = useSWR(
        shouldFetch
            ? [
                  `recruitment/application/opportunity/${opportunityId}`,
                  { ...getApiParams(), id: opportunityId },
              ]
            : null,
        shouldFetch
            ? ([_, params]) =>
                  apiGetApplicationsForOpportunity<
                      GetApplicationsListResponse,
                      TableQueries
                  >(params)
            : null,
        {
            revalidateOnFocus: false,
        },
    )

    // Support both array and object API responses
    let applicationList: any[] = []
    let applicationListTotal = 0
    if (Array.isArray(data)) {
        applicationList = data
        applicationListTotal = data.length
    } else if (data) {
        applicationList = data.list || []
        applicationListTotal = data.total || applicationList.length || 0
    }

    return {
        applicationList,
        applicationListTotal,
        error,
        isLoading,
        tableData,
        filterData,
        mutate,
        setTableData,
        selectedApplication,
        setSelectedApplication,
        setSelectAllApplication,
        setFilterData,
    }
}
