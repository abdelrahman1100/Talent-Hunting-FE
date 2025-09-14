import useSWR from 'swr'
import { apiGetUsersByRole } from '@/services/RolesUserService'

export type RoleUser = {
    id: number
    name: string
    email: string
    user_img: string | null
    status: 'active' | 'inactive'
    department: {
        id: number
        name: string
    } | null
    company: {
        id: number
        name: string
    } | null
}

export type GetUsersByRoleResponse = {
    list: RoleUser[]
    total: number
}

export type UseRoleUsersParams = {
    pageIndex?: number
    pageSize?: number
    query?: string
    name?: string
    status?: string
    department_id?: string
    sort?: {
        order?: 'ASC' | 'DESC'
        key?: string
    }
}

export function useRoleUsers(
    roleId: string | number | null,
    params: UseRoleUsersParams = {},
) {
    const { pageIndex = 1, pageSize = 10, ...otherParams } = params

    const queryParams = {
        pageIndex,
        pageSize,
        ...otherParams,
    }

    const { data, error, isLoading, mutate } = useSWR(
        roleId ? [`/roles/${roleId}/users`, queryParams] : null,
        ([_, params]) =>
            apiGetUsersByRole<GetUsersByRoleResponse>(String(roleId), params),
        {
            revalidateOnFocus: false,
        },
    )

    return {
        users: data?.list || [],
        total: data?.total || 0,
        isLoading,
        error,
        mutate,
    }
}

// Hook for getting a small number of users for display purposes (like avatars in cards)
export function useRoleUsersPreview(
    roleId: string | number,
    limit: number = 5,
) {
    return useRoleUsers(roleId, {
        pageIndex: 1,
        pageSize: limit,
        sort: { order: 'ASC', key: 'name' },
    })
}
