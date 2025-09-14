
import { create } from 'zustand'
import type { TableQueries } from '@/@types/common'
import type {  LockupFilter } from '../types'
import { Lockup } from '../../LockupForm/types'

export const initialTableData: TableQueries = {
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export const initialFilterData: LockupFilter = {
    name: '',
    status: '',
}

export type LockupListState = {
    tableData: TableQueries
    filterData: LockupFilter
    selectedLockups: Partial<Lockup>[]
}

type LockupListAction = {
    setFilterData: (payload: LockupFilter) => void
    setTableData: (payload: TableQueries) => void
    setSelectedLockup: (checked: boolean, lockup: Lockup) => void
    setSelectAllLockups: (lockups: Lockup[]) => void
}

const initialState: LockupListState = {
    tableData: initialTableData,
    filterData: initialFilterData,
    selectedLockups: [],
}

export const useLockUpListStore = create<
    LockupListState & LockupListAction
>((set) => ({
    ...initialState,
    setFilterData: (payload) => set(() => ({ filterData: payload })),
    setTableData: (payload) => set(() => ({ tableData: payload })),
    setSelectedLockup: (checked, row) =>
        set((state) => {
            const prevData = state.selectedLockups
            if (checked) {
                return { selectedLockups: [...prevData, row] }
            } else {
                return {
                    selectedLockups: prevData.filter(
                        (prevLockup) => prevLockup.id !== row.id,
                    ),
                }
            }
        }),
    setSelectAllLockups: (rows) => set(() => ({ selectedLockups: rows })),
}))
