import { useMemo, useState } from 'react'
import Avatar from '@/components/ui/Avatar'
import Tag from '@/components/ui/Tag'
import Tooltip from '@/components/ui/Tooltip'
import DataTable, {
    ColumnDef,
    OnSortParam,
    Row,
} from '@/components/shared/DataTable'
import { Link, useNavigate } from 'react-router'
import cloneDeep from 'lodash/cloneDeep'
import { TbPencil, TbEye } from 'react-icons/tb'
import { PiUserDuotone } from 'react-icons/pi'

import type { TableQueries } from '@/@types/common'
import useCompanyList from '../hooks/useUserlist'
import { ADMIN_PREFIX_PATH } from '@/constants/route.constant'
import { User } from '../types'
import { formatUserImage, getUserInitials } from '@/utils/userImageUtils'
import UserRoleColumn from './UserRoleColumn'

const statusColor: Record<string, string> = {
    active: 'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900',
    blocked: 'bg-red-200 dark:bg-red-200 text-gray-900 dark:text-gray-900',
}

const NameColumn = ({ row }: { row: User }) => {
    const userImage = formatUserImage(row.user_img)
    const initials = getUserInitials(row.name)

    return (
        <div className="flex items-center">
            <Avatar
                size={40}
                shape="circle"
                src={userImage || undefined}
                className="mr-3"
            >
                {!userImage && initials}
            </Avatar>
            <Link
                className="hover:text-primary text-gray-900 dark:text-gray-100 font-bold"
                to={`${ADMIN_PREFIX_PATH}/user/user-details/${row.id}`}
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

const UserListTable = () => {
    const navigate = useNavigate()

    const {
        userList,
        userListTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllUser,
        setSelectedUser,
        selectedUser,
    } = useCompanyList()

    const handleEdit = (user: User) => {
        navigate(`${ADMIN_PREFIX_PATH}/user/user-edit/${user.id}`)
    }

    const handleViewDetails = (user: User) => {
        navigate(`${ADMIN_PREFIX_PATH}/user/user-details/${user.id}`)
    }

    const columns: ColumnDef<User>[] = useMemo(
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
                header: 'Email',
                accessorKey: 'email',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="font-semibold">{row.email}</span>
                },
            },

            {
                header: 'Company Name',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className="font-semibold">
                            {row.department
                                ? row.department.company?.name
                                : 'No Company'}
                        </span>
                    )
                },
            },

            {
                header: 'Department ',
                accessorKey: 'department',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className="font-semibold">
                            {row.department
                                ? row.department.name
                                : 'No Department'}
                        </span>
                    )
                },
            },

            {
                header: 'Role',
                accessorKey: 'role',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <UserRoleColumn
                            user={row}
                            onRoleUpdate={() => {
                                // This will trigger a re-fetch of the user list
                                // The useCompanyList hook will handle the refresh
                            }}
                        />
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
        if (selectedUser.length > 0) {
            setSelectAllUser([])
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

    const handleRowSelect = (checked: boolean, row: User) => {
        setSelectedUser(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<User>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllUser(originalRows)
        } else {
            setSelectAllUser([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={userList}
            noData={!isLoading && userList.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            pagingData={{
                total: userListTotal,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            checkboxChecked={(row) =>
                selectedUser.some((selected) => selected.id === row.id)
            }
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default UserListTable
