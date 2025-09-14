import { useState } from 'react'
import {
    apiGetRolesList,
    apiCreateRole,
    apiUpdateRole,
    apiDeleteRole,
} from '@/services/RolesUserService'
import { Role } from '../types'
import toast from '@/components/ui/toast'

export type CreateRoleRequest = {
    name: string
    description: string
    privileges?: number[]
}

export type UpdateRoleRequest = {
    name: string
    description: string
    privileges?: number[]
}

const useUserRoles = () => {
    const [roleList, setRoleList] = useState<Role[]>([])
    const [loading, setLoading] = useState(false)

    const fetchRoles = async () => {
        try {
            setLoading(true)
            const response = await apiGetRolesList<
                { list: Role[]; total: number },
                {}
            >()
            setRoleList(response.list || [])
        } catch (error) {
            console.error('Error fetching roles:', error)
            toast.push('Failed to fetch roles')
        } finally {
            setLoading(false)
        }
    }

    const createRole = async (data: CreateRoleRequest) => {
        try {
            setLoading(true)
            await apiCreateRole(data)
            toast.push('Role created successfully')
            await fetchRoles()
            return true
        } catch (error: any) {
            console.error('Error creating role:', error)
            const errorMessage =
                error.response?.data?.message || 'Failed to create role'
            toast.push(errorMessage)
            return false
        } finally {
            setLoading(false)
        }
    }

    const updateRole = async (id: number, data: UpdateRoleRequest) => {
        try {
            setLoading(true)
            await apiUpdateRole(id.toString(), data)
            toast.push('Role updated successfully')
            await fetchRoles()
            return true
        } catch (error: any) {
            console.error('Error updating role:', error)
            const errorMessage =
                error.response?.data?.message || 'Failed to update role'
            toast.push(errorMessage)
            return false
        } finally {
            setLoading(false)
        }
    }

    const deleteRole = async (id: number) => {
        try {
            setLoading(true)
            await apiDeleteRole(id.toString())
            toast.push('Role deleted successfully')
            await fetchRoles()
            return true
        } catch (error: any) {
            console.error('Error deleting role:', error)
            const errorMessage =
                error.response?.data?.message || 'Failed to delete role'
            toast.push(errorMessage)
            return false
        } finally {
            setLoading(false)
        }
    }

    // Initialize roles on mount
    if (roleList.length === 0 && !loading) {
        fetchRoles()
    }

    return {
        roleList,
        loading,
        createRole,
        updateRole,
        deleteRole,
        fetchRoles,
    }
}

export default useUserRoles
