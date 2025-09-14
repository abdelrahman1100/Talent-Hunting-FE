// import { Category } from './../types';
import { apiGetCategoriesList } from '@/services/CategoryService'
import useSWR from 'swr'
import { useCategoryListStore } from '../../CategoryList/store/CategoryListStore'
import type { Category, GetCategoriesListResponse } from '../types'
import type { TableQueries } from '@/@types/common'

export default function useCategoryList() {
    const {
        tableData,
        filterData,
        setTableData,
        selectedCategory,
        setSelectedCategory,
        setSelectAllCategory,
        setFilterData,
    } = useCategoryListStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/categories', { ...tableData, ...filterData }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) =>
            apiGetCategoriesList<GetCategoriesListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )


      const categoryList: Category[] = data?.list || []


        console.log('Category List:', data)

    const categoryListTotal = data?.total || 0

    return {
        categoryList,
        categoryListTotal,
        error,
        isLoading,
        tableData,
        filterData,
        mutate,
        setTableData,
        selectedCategory,
        setSelectedCategory,
        setSelectAllCategory,
        setFilterData,
    }
}
