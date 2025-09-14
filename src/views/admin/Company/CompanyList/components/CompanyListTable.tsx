import { useMemo } from 'react'
import Avatar from '@/components/ui/Avatar'
import Tag from '@/components/ui/Tag'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import { Link, useNavigate } from 'react-router'
import cloneDeep from 'lodash/cloneDeep'
import { TbPencil, TbEye } from 'react-icons/tb'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { Company } from '../types'
import type { TableQueries } from '@/@types/common'
import useCompanyList from '../hooks/useCompanylist'
import { ADMIN_PREFIX_PATH } from '@/constants/route.constant'

const statusColor: Record<string, string> = {
    active: 'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900',
    blocked: 'bg-red-200 dark:bg-red-200 text-gray-900 dark:text-gray-900',
}

const NameColumn = ({ row }: { row: Company }) => {
    console.log('after Update ', row.commercial_id)
    return (
        <div className="flex items-center">
            <Avatar size={40} shape="circle" src={`${row.commercial_id}`} />
            <Link
                className={`hover:text-primary ml-2 rtl:mr-2  text-gray-900 dark:text-gray-100 font-bold`}
                to={`${ADMIN_PREFIX_PATH}/company/company-details/${row.id}`}
            >
                {row.name}
            </Link>
        </div>
    )
}

const ActionColumn = ({
    onEdit,
    onViewDetail,
}: {
    onEdit: () => void
    onViewDetail: () => void
}) => {
    return (
        <div className="flex items-center gap-3">
            <Tooltip title="Edit">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={onEdit}
                >
                    <TbPencil />
                </div>
            </Tooltip>
            <Tooltip title="View">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={onViewDetail}
                >
                    <TbEye />
                </div>
            </Tooltip>
        </div>
    )
}

const CustomerListTable = () => {
    const navigate = useNavigate()

    const {
        companyList,
        companyListTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllCompany,
        setSelectedCompany,
        selectedCompany,
    } = useCompanyList()

    const handleEdit = (company: Company) => {
        navigate(`${ADMIN_PREFIX_PATH}/company/company-edit/${company.id}`)
    }

    const handleViewDetails = (company: Company) => {
        navigate(`${ADMIN_PREFIX_PATH}/company/company-details/${company.id}`)
    }

    const columns: ColumnDef<Company>[] = useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return <NameColumn row={row} />
                },
            },

            {
                header: 'Location',
                accessorKey: 'location',

                cell: (props) => {
                    const row = props.row.original
                    return <span className="font-semibold">{row.location}</span>
                },
            },

            {
                header: 'Category',
                accessorKey: 'category',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className="font-semibold">
                            {row.category?.name || 'No Category'}
                        </span>
                    )
                },
            },

            {
                header: 'Employees Count',
                accessorKey: 'employee_count',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex justify-center  ">
                            <span className="font-semibold">
                                {row.employee_count || 0}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <Tag className={statusColor[row.status]}>
                                <span className="capitalize">{row.status}</span>
                            </Tag>
                        </div>
                    )
                },
            },

            {
                header: '',
                id: 'action',
                cell: (props) => (
                    <ActionColumn
                        onEdit={() => handleEdit(props.row.original)}
                        onViewDetail={() =>
                            handleViewDetails(props.row.original)
                        }
                    />
                ),
            },
        ],

        [],
    )

    const handleSetTableData = (data: TableQueries) => {
        setTableData(data)
        if (selectedCompany.length > 0) {
            setSelectAllCompany([])
        }
    }

    const handlePaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        handleSetTableData(newTableData)
    }

    const handleSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        handleSetTableData(newTableData)
    }

    const handleSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        handleSetTableData(newTableData)
    }

    const handleRowSelect = (checked: boolean, row: Company) => {
        setSelectedCompany(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<Company>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllCompany(originalRows)
        } else {
            setSelectAllCompany([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={companyList}
            noData={!isLoading && companyList.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            pagingData={{
                total: companyListTotal,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            checkboxChecked={(row) =>
                selectedCompany.some((selected) => selected.id === row.id)
            }
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default CustomerListTable
