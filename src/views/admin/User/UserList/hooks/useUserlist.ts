import useSWR from 'swr'
import { useUserListStore } from '../store/userListStore'
// import type { Company, GetCompanyResponse } from '../types'
import type { TableQueries } from '@/@types/common'
import { apiGetUserList } from '@/services/UserService'
import { GetUserResponse, User } from '../types'

// import { User, GetUserResponse } from 

export default function useUserList() {
    const {
        setSelectAllUser,
        selectedUser,
        setSelectedUser,
        tableData,
        filterData,
        setTableData,
        setFilterData,
    } = useUserListStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/users', { ...tableData, ...filterData }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) =>
            apiGetUserList<GetUserResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )

    const userList = data?.list || []
    console.log('User List:', data)

    const userListTotal = data?.total || 0

    return {
        userList,
        userListTotal,
        error,
        isLoading,
        tableData,
        filterData,
        mutate,
        setTableData,
        setFilterData,
        selectedUser,
        setSelectedUser,
        setSelectAllUser,
    }
}
