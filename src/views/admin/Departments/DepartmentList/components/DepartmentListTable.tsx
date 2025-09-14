import { useMemo } from 'react'
import Avatar from '@/components/ui/Avatar'
import Tag from '@/components/ui/Tag'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
// import useCustomerList from '../../CategoryList/hooks/useCategoryList'
import useDepartmentList from '../hooks/useDepartmentList'
import { Link, useNavigate } from 'react-router'
import cloneDeep from 'lodash/cloneDeep'
import { TbPencil, TbEye } from 'react-icons/tb'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { Department } from '../types'
import type { TableQueries } from '@/@types/common'
// import useCategoryList from '../../CategoryList/hooks/useCategoryList'
import { ADMIN_PREFIX_PATH } from '@/constants/route.constant'

const statusColor: Record<string, string> = {
    active: 'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900',
    blocked: 'bg-red-200 dark:bg-red-200 text-gray-900 dark:text-gray-900',
}

const NameColumn = ({ row }: { row: Department }) => {
    return (
        <div className="flex items-center">
            {/* <Avatar size={40} shape="circle" src={row.img} /> */}
            <Link
                className={`hover:text-primary ml-2 rtl:mr-2 font-semibold text-gray-900 dark:text-gray-100`}
                to={`${ADMIN_PREFIX_PATH}/department/department-details/${row.id}`}
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

const DepartmentListTable = () => {
    const navigate = useNavigate()

    const {
        departmentList,
        departmentListTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllDepartment,
        setSelectedDepartment,
        selectedDepartment,
    } = useDepartmentList()
    if (!isLoading) {
        console.log('Loading...', departmentList)
        //return <div>Loading...</div>; // أو سبينر
    }

    // if (error) {
    //   return <div>Something went wrong!</div>;
    // }

    console.log('Table Data:', departmentList)
    const handleEdit = (department: Department) => {
        navigate(`${ADMIN_PREFIX_PATH}/department/department-edit/${department.id}`)
    }

    const handleViewDetails = (department: Department) => {
        navigate(
            `${ADMIN_PREFIX_PATH}/department/department-details/${department.id}`,
        )
    }

    const columns: ColumnDef<Department>[] = useMemo(
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
                
                header: 'Company Name',
                accessorKey: 'company.name',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="text-gray-700 dark:text-gray-300">{row.company? row.company.name : 'No Company'}</span>
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
                header: 'action',
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    )

    const handleSetTableData = (data: TableQueries) => {
        setTableData(data)
        if (selectedDepartment.length > 0) {
            setSelectAllDepartment([])
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

    const handleRowSelect = (checked: boolean, row: Department) => {
        setSelectedDepartment(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<Department>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllDepartment(originalRows)
        } else {
            setSelectAllDepartment([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={departmentList}
            noData={!isLoading && departmentList.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            pagingData={{
                total: departmentListTotal,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            checkboxChecked={(row) =>
                selectedDepartment.some((selected) => selected.id === row.id)
            }
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default DepartmentListTable
