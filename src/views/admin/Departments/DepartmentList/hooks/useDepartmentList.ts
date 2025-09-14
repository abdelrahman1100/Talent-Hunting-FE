// import { Category } from './../types';
import { apiGetCategoriesList } from '@/services/CategoryService'
import useSWR from 'swr'
import { useDepartmentListStore } from '../store/DepartmentListStore'
import type { Department, GetDepartmentsListResponse } from '../types'
import type { TableQueries } from '@/@types/common'
import { apiGetDepartmentsList } from '@/services/DepartmrntServices'

export default function useDepartmentList() {
    const {
        tableData,
        filterData,
        setTableData,
        selectedDepartment,
        setSelectedDepartment,
        setSelectAllDepartment,
        setFilterData,
    } = useDepartmentListStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/categories', { ...tableData, ...filterData }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) =>
            apiGetDepartmentsList<GetDepartmentsListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )


      const departmentList: Department[] = data?.list || []


        console.log('Department List:', data)

    const departmentListTotal = data?.total || 0

    return {
        departmentList,
        departmentListTotal,
        error,
        isLoading,
        tableData,
        filterData,
        mutate,
        setTableData,
        selectedDepartment,
        setSelectedDepartment,
        setSelectAllDepartment,
        setFilterData,
    }
}
