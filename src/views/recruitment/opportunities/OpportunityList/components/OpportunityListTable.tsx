import { useMemo } from 'react'
import Tag from '@/components/ui/Tag'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import useOpportunityList from '../hooks/useOpportunityList'
import { Link, useNavigate } from 'react-router'
import cloneDeep from 'lodash/cloneDeep'
import { TbPencil, TbEye } from 'react-icons/tb'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { Opportunity } from '../types'
import type { TableQueries } from '@/@types/common'
import { RECRUITMENT_PREFIX_PATH } from '@/constants/route.constant'

const statusColor: Record<string, string> = {
    active: 'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900',
    inactive: 'bg-red-200 dark:bg-red-200 text-gray-900 dark:text-gray-900',
}

const TitleColumn = ({ row }: { row: Opportunity }) => {
    return (
        <div className="flex items-center">
            <Link
                className="hover:text-primary ml-2 rtl:mr-2 font-semibold text-gray-900 dark:text-gray-100"
                to={`${RECRUITMENT_PREFIX_PATH}/opportunities/opportunity-details/${row.id}`}
            >
                {row.title}
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
                    className="text-xl cursor-pointer select-none font-semibold"
                    role="button"
                    onClick={onEdit}
                >
                    <TbPencil />
                </div>
            </Tooltip>
            <Tooltip title="View">
                <div
                    className="text-xl cursor-pointer select-none font-semibold"
                    role="button"
                    onClick={onViewDetail}
                >
                    <TbEye />
                </div>
            </Tooltip>
        </div>
    )
}

const OpportunityListTable = () => {
    const navigate = useNavigate()

    const {
        opportunityList,
        opportunityListTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllOpportunity,
        setSelectedOpportunity,
        selectedOpportunity,
    } = useOpportunityList()

    const handleEdit = (opportunity: Opportunity) => {
        navigate(
            `${RECRUITMENT_PREFIX_PATH}/opportunities/opportunity-edit/${opportunity.id}`,
        )
    }

    const handleViewDetails = (opportunity: Opportunity) => {
        navigate(
            `${RECRUITMENT_PREFIX_PATH}/opportunities/opportunity-details/${opportunity.id}`,
        )
    }

    const columns: ColumnDef<Opportunity>[] = useMemo(
        () => [
            {
                header: 'Title',
                accessorKey: 'title',
                cell: (props) => {
                    const row = props.row.original
                    return <TitleColumn row={row} />
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
                header: 'Job Type',
                accessorKey: 'jobType',
            },
            {
                header: 'Department',
                accessorKey: 'department.name',
            },
            {
                header: 'Salary Range',
                accessorKey: 'salary_min',
                cell: (props) => {
                    const { salary_min, salary_max } = props.row.original
                    return (
                        <span>
                            {salary_min} - {salary_max}
                        </span>
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
        if (selectedOpportunity.length > 0) {
            setSelectAllOpportunity([])
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

    const handleRowSelect = (checked: boolean, row: Opportunity) => {
        setSelectedOpportunity(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<Opportunity>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllOpportunity(originalRows)
        } else {
            setSelectAllOpportunity([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={opportunityList}
            noData={!isLoading && opportunityList.length === 0}
            loading={isLoading}
            pagingData={{
                total: opportunityListTotal,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            checkboxChecked={(row) =>
                selectedOpportunity.some((selected) => selected.id === row.id)
            }
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default OpportunityListTable
