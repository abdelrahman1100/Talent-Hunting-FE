import { useMemo } from 'react'
import Dropdown from '@/components/ui/Dropdown'
import Tag from '@/components/ui/Tag'
import { TbChevronDown } from 'react-icons/tb'
import {
    apiDeleteApplication,
    apiUpdateApplicationStatus,
} from '@/services/ApplicationsService'
import DataTable from '@/components/shared/DataTable'
import { Link, useNavigate } from 'react-router'
import cloneDeep from 'lodash/cloneDeep'
import { TbTrash, TbEye } from 'react-icons/tb'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { Application } from '../types'
import type { TableQueries } from '@/@types/common'
import { RECRUITMENT_PREFIX_PATH } from '@/constants/route.constant'
import useApplicationList from '../hooks/useApplicationList'
import { formatDate } from '@fullcalendar/core'
import Tooltip from '@/components/ui/Tooltip'

const statusColor: Record<string, string> = {
    pending: 'bg-amber-200 dark:bg-amber-200 text-gray-900 dark:text-gray-900',
    accepted:
        'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900',
    rejected: 'bg-red-200 dark:bg-red-200 text-gray-900 dark:text-gray-900',
}

const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'rejected', label: 'Rejected' },
]

const TitleColumn = ({ row }: { row: Application }) => {
    return (
        <div className="flex items-center">
            <Link
                className="hover:text-primary ml-2 rtl:mr-2 font-semibold text-gray-900 dark:text-gray-100"
                to={`${RECRUITMENT_PREFIX_PATH}/candidates/candidate-details/${row.profile.id}`}
            >
                Application #{row.id}
            </Link>
        </div>
    )
}

type ApplicationListTableProps = {
    opportunityId?: string
}

const ApplicationListTable = ({ opportunityId }: ApplicationListTableProps) => {
    const navigate = useNavigate()

    const {
        applicationList,
        applicationListTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllApplication,
        setSelectedApplication,
        selectedApplication,
    } = useApplicationList(opportunityId)

    const handleViewDetails = (application: Application) => {
        navigate(
            `${RECRUITMENT_PREFIX_PATH}/candidates/candidate-details/${application.profile.id}`,
        )
    }

    const handleStatusChange = async (newStatus: string, id: number) => {
        // Update backend
        await apiUpdateApplicationStatus({ id, application_status: newStatus })
        setSelectAllApplication([])
        // Reload the page to show updated status
        window.location.reload()
    }

    const handleDelete = (id: number) => {
        apiDeleteApplication({ id })
    }

    const ActionColumn = ({ row }: { row: Application }) => {
        const onView = () => {
            handleViewDetails(row)
        }
        const onDelete = () => {
            handleDelete(row.id)
        }
        return (
            <div className="flex justify-end text-lg gap-1">
                <Tooltip wrapperClass="flex" title="View">
                    <span className={`cursor-pointer p-2`} onClick={onView}>
                        <TbEye />
                    </span>
                </Tooltip>
                <Tooltip wrapperClass="flex" title="Delete">
                    <span
                        className="cursor-pointer p-2 hover:text-red-500"
                        onClick={onDelete}
                    >
                        <TbTrash />
                    </span>
                </Tooltip>
            </div>
        )
    }

    const columns: ColumnDef<Application>[] = useMemo(
        () => [
            {
                header: 'Application',
                accessorKey: 'id',
                cell: (props) => {
                    const row = props.row.original
                    return <TitleColumn row={row} />
                },
            },
            {
                header: 'Application Status',
                accessorKey: 'application_status',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <Dropdown
                            renderTitle={
                                <div
                                    className="inline-flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                    role="button"
                                >
                                    <Tag
                                        className={
                                            statusColor[row.application_status]
                                        }
                                    >
                                        <span className="capitalize">
                                            {row.application_status}
                                        </span>
                                    </Tag>
                                    <TbChevronDown />
                                </div>
                            }
                        >
                            {statusOptions
                                .filter(
                                    (opt) =>
                                        opt.value !== row.application_status,
                                )
                                .map((opt) => (
                                    <Dropdown.Item
                                        key={opt.value}
                                        eventKey={opt.value}
                                        onClick={() =>
                                            handleStatusChange(
                                                opt.value,
                                                row.id,
                                            )
                                        }
                                    >
                                        {opt.label}
                                    </Dropdown.Item>
                                ))}
                        </Dropdown>
                    )
                },
            },
            {
                header: 'Date',
                accessorKey: 'generated_date',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <span>{formatDate(row.generated_date)}</span>
                        </div>
                    )
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        [applicationList],
    )

    const handleSetTableData = (data: TableQueries) => {
        setTableData(data)
        if (selectedApplication.length > 0) {
            setSelectAllApplication([])
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

    const handleRowSelect = (checked: boolean, row: Application) => {
        setSelectedApplication(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<Application>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllApplication(originalRows)
        } else {
            setSelectAllApplication([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={applicationList}
            noData={!isLoading && applicationList.length === 0}
            loading={isLoading}
            pagingData={{
                total: applicationListTotal,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            checkboxChecked={(row) =>
                selectedApplication.some((selected) => selected.id === row.id)
            }
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default ApplicationListTable
