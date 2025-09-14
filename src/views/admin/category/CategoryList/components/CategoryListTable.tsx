import { useMemo } from 'react'
import Avatar from '@/components/ui/Avatar'
import Tag from '@/components/ui/Tag'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import useCustomerList from '../hooks/useCategoryList'
import { Link, useNavigate } from 'react-router'
import cloneDeep from 'lodash/cloneDeep'
import { TbPencil, TbEye } from 'react-icons/tb'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { Category } from '../types'
import type { TableQueries } from '@/@types/common'
import useCategoryList from '../hooks/useCategoryList'
import { ADMIN_PREFIX_PATH } from '@/constants/route.constant'

const statusColor: Record<string, string> = {
    active: 'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900',
    blocked: 'bg-red-200 dark:bg-red-200 text-gray-900 dark:text-gray-900',
}

const NameColumn = ({ row }: { row: Category }) => {
    return (
        <div className="flex items-center">
            {/* <Avatar size={40} shape="circle" src={row.img} /> */}
            <Link
                className={`hover:text-primary ml-2 rtl:mr-2 font-semibold text-gray-900 dark:text-gray-100`}
                to={`${ADMIN_PREFIX_PATH}/category/category-details/${row.id}`}
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

const CategoryListTable = () => {
    const navigate = useNavigate()

    const {
        categoryList,
        categoryListTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllCategory,
        setSelectedCategory,
        selectedCategory,
    } = useCategoryList()
    if (!isLoading) {
        console.log('Loading...', categoryList)
        //return <div>Loading...</div>; // أو سبينر
    }

    // if (error) {
    //   return <div>Something went wrong!</div>;
    // }

    console.log('Table Data:', categoryList)
    const handleEdit = (category: Category) => {
        navigate(`${ADMIN_PREFIX_PATH}/category/category-edit/${category.id}`)
    }

    const handleViewDetails = (category: Category) => {
        navigate(
            `${ADMIN_PREFIX_PATH}/category/category-details/${category.id}`,
        )
    }

    const columns: ColumnDef<Category>[] = useMemo(
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
        if (selectedCategory.length > 0) {
            setSelectAllCategory([])
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

    const handleRowSelect = (checked: boolean, row: Category) => {
        setSelectedCategory(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<Category>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllCategory(originalRows)
        } else {
            setSelectAllCategory([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={categoryList}
            noData={!isLoading && categoryList.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            pagingData={{
                total: categoryListTotal,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            checkboxChecked={(row) =>
                selectedCategory.some((selected) => selected.id === row.id)
            }
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default CategoryListTable
