import useSWR from 'swr'
import { useCompanyListStore } from '../store/companyListStore'
import type { Company, GetCompanyResponse } from '../types'
import type { TableQueries } from '@/@types/common'
import { apiGetCompaniesList } from '@/services/CompanyService'

export default function useCompanyList() {
    const {
        setSelectAllCompany,
        selectedCompany,
        setSelectedCompany,
        tableData,
        filterData,
        setTableData,
        setFilterData,
    } = useCompanyListStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/companies', { ...tableData, ...filterData }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) =>
            apiGetCompaniesList<GetCompanyResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )

    const companyList: Company[] = data?.list || []
    console.log('Company List:', companyList)

    const companyListTotal = data?.total || 0

    return {
        companyList,
        companyListTotal,
        error,
        isLoading,
        tableData,
        filterData,
        mutate,
        setTableData,
        setFilterData,
        selectedCompany,
        setSelectedCompany,
        setSelectAllCompany,
    }
}
