import DebouceInput from '@/components/shared/DebouceInput'
import { TbSearch, TbCloudDownload, TbPlus } from 'react-icons/tb'
import cloneDeep from 'lodash/cloneDeep'
import type { ChangeEvent } from 'react'
import useUserList from '../hooks/useUserlist'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { useNavigate } from 'react-router'
import { CSVLink } from 'react-csv'
import { ADMIN_PREFIX_PATH } from '@/constants/route.constant'
import { useState, useEffect } from 'react'
import { apiGetRolesList } from '@/services/RolesUserService'
import useSWR from 'swr'

type Option = {
    value: string
    label: string
    className?: string
}

const statusOptions: Option[] = [
    { value: '', label: 'All' },
    { value: 'active', label: 'Active', className: 'bg-emerald-500' },
    { value: 'inactive', label: 'Inactive', className: 'bg-red-500' },
]

const UserListTableTools = () => {
    const { tableData, setTableData, filterData, setFilterData, userList } =
        useUserList()
    const navigate = useNavigate()
    const [roleOptions, setRoleOptions] = useState<Option[]>([
        { value: '', label: 'All' },
    ])

    // Fetch roles for the role filter
    const { data: rolesData } = useSWR(
        '/api/roles',
        () =>
            apiGetRolesList<{ list: any[]; total: number }, {}>({
                pageIndex: 1,
                pageSize: 100,
                query: '',
                sort: { order: '', key: '' },
            }),
        { revalidateOnFocus: false },
    )

    useEffect(() => {
        if (rolesData?.list) {
            const options = [
                { value: '', label: 'All' },
                ...rolesData.list.map((role) => ({
                    value: role.id.toString(),
                    label: role.name,
                })),
            ]
            setRoleOptions(options)
        }
    }, [rolesData])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value
        const newTableData = cloneDeep(tableData)
        newTableData.query = val
        newTableData.pageIndex = 1
        if (typeof val === 'string' && val.length > 1) {
            setTableData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            setTableData(newTableData)
        }
    }

    const handleStatusChange = (value: string) => {
        const newFilterData = cloneDeep(filterData)
        newFilterData.status = value
        setFilterData(newFilterData)
    }

    const handleRoleChange = (value: string) => {
        const newFilterData = cloneDeep(filterData)
        newFilterData.role_ids = value ? [value] : []
        setFilterData(newFilterData)
    }

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Left side - Search and Filters */}
            <div className="flex items-center gap-3">
                {/* Search Bar */}
                <div className="w-64">
                    <DebouceInput
                        placeholder="Search..."
                        suffix={<TbSearch className="text-lg text-gray-400" />}
                        onChange={handleInputChange}
                        className="w-full"
                    />
                </div>

                {/* Status Filter */}
                <div className="w-32">
                    <Select
                        options={statusOptions}
                        value={
                            statusOptions.find(
                                (option) => option.value === filterData.status,
                            ) || statusOptions[0]
                        }
                        onChange={(option) =>
                            handleStatusChange(option?.value || '')
                        }
                        placeholder="All"
                        className="w-full"
                    />
                </div>

                {/* Role Filter */}
                <div className="w-32">
                    <Select
                        options={roleOptions}
                        value={
                            roleOptions.find(
                                (option) =>
                                    option.value ===
                                    (filterData.role_ids?.[0] || ''),
                            ) || roleOptions[0]
                        }
                        onChange={(option) =>
                            handleRoleChange(option?.value || '')
                        }
                        placeholder="All"
                        className="w-full"
                    />
                </div>
            </div>

            {/* Right side - Action Buttons */}
            <div className="flex items-center gap-3">
                {/* Download Button */}
                <CSVLink filename="userList.csv" data={userList}>
                    <Button
                        icon={<TbCloudDownload className="text-lg" />}
                        className="whitespace-nowrap"
                    >
                        Download
                    </Button>
                </CSVLink>

                {/* Add new User Button */}
                <Button
                    variant="solid"
                    icon={<TbPlus className="text-lg" />}
                    onClick={() =>
                        navigate(`${ADMIN_PREFIX_PATH}/user/user-create`)
                    }
                    className="whitespace-nowrap"
                >
                    Add new User
                </Button>
            </div>
        </div>
    )
}

export default UserListTableTools
