import useSWR from 'swr'
import { useLockUpListStore } from '../store/LockupListStore'
import type { TableQueries } from '@/@types/common'
import { apiGetLockupList } from '@/services/LockUp'
import { GetLockupListResponse, Lockup } from '../../LockupForm/types'
export default function useLockUpList() {
    const {
        tableData,
        filterData,
        setTableData,
        selectedLockups,
        setSelectedLockup,
        setSelectAllLockups,
        setFilterData,
    } = useLockUpListStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/lockups/masters', { ...tableData, ...filterData }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) =>
            apiGetLockupList<GetLockupListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )

    const lockupList: Lockup[] = data?.list || []
    console.log('Lockup List:', data?.list)

    const lockupListTotal = data?.total || 0

    return {
        lockupList,
        lockupListTotal,
        error,
        isLoading,
        tableData,
        filterData,
        mutate,
        setTableData,
        selectedLockups,
        setSelectedLockup,
        setSelectAllLockups,
        setFilterData,
    }
}
