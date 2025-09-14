import { create } from 'zustand'
import type { TableQueries } from '@/@types/common'
import type { Category,CategoryFilter} from '../../CategoryList/types'




export const initialTableData: TableQueries = {
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export const initialFilterData: CategoryFilter = {
    name: '',
    status: '',
}

export type CategoryListState = {
    tableData: TableQueries
    filterData: CategoryFilter
    selectedCategory: Partial<Category>[]
}

type CategoryListAction = {
    setFilterData: (payload: CategoryFilter) => void
    setTableData: (payload: TableQueries) => void
    setSelectedCategory: (checked: boolean, category: Category) => void
    setSelectAllCategory: (categories: Category[]) => void
}

const initialState: CategoryListState = {
    tableData: initialTableData,
    filterData: initialFilterData,
    selectedCategory: [],
}

export const useCategoryListStore = create<
    CategoryListState & CategoryListAction
>((set) => ({
    ...initialState,
    setFilterData: (payload) => set(() => ({ filterData: payload })),
    setTableData: (payload) => set(() => ({ tableData: payload })),
    setSelectedCategory: (checked, row) =>
        set((state) => {
            const prevData = state.selectedCategory
            if (checked) {
                return { selectedCategory: [...prevData, row] }
            } else {
                return {
                    selectedCategory: prevData.filter(
                        (prevCategory) => prevCategory.id !== row.id,
                    ),
                }
            }
        }),
    setSelectAllCategory: (rows) =>
        set(() => ({ selectedCategory: rows })),
}))
