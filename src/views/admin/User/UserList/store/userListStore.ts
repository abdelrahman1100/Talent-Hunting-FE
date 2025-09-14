import { create } from 'zustand'
import type { TableQueries } from '@/@types/common'
import type { User, Filter } from '../types'

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
    // location: '',
    department_id: '',
    status: '',
    // employee_count: '',
}

export type UserListState = {
    tableData: TableQueries
    filterData: Filter
    // UserList: User[]
    selectedUser: Partial<User>[]
}

type UserListAction = {
    setFilterData: (payload: Filter) => void
    setTableData: (payload: TableQueries) => void
    setSelectedUser: (checked: boolean, user: User) => void
    setSelectAllUser: (users: User[]) => void
}

const initialState: UserListState = {
    tableData: initialTableData,
    filterData: initialFilterData,
    // UserList: [],
    selectedUser: [],
}

export const useUserListStore = create<UserListState & UserListAction>(
    (set) => ({
        ...initialState,
        setFilterData: (payload) => set(() => ({ filterData: payload })),
        setTableData: (payload) => set(() => ({ tableData: payload })),
        setSelectedUser: (checked, row) =>
            set((state) => {
                const prevData = state.selectedUser
                if (checked) {
                    return { selectedUser: [...prevData, row] }
                } else {
                    return {
                        selectedUser: prevData.filter(
                            (prevUser) => prevUser.id !== row.id,
                        ),
                    }
                }
            }),
        setSelectAllUser: (rows) => set(() => ({ selectedUser: rows })),
    }),
)
