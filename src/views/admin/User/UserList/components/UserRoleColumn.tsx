import { useState } from 'react'
import { Select } from '@/components/ui'
import { User, Role } from '../types'
import { apiGetRolesList } from '@/services/RolesUserService'
import { apiAssignRolesToUser } from '@/services/RolesUserService'
import useSWR from 'swr'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { TbChevronDown, TbCheck } from 'react-icons/tb'

interface UserRoleColumnProps {
    user: User
    onRoleUpdate: () => void
}

const UserRoleColumn = ({ user, onRoleUpdate }: UserRoleColumnProps) => {
    const [selectedRoles, setSelectedRoles] = useState<number[]>(
        user.roles?.map((role) => role.id) || [],
    )
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    // Fetch available roles
    const { data: rolesData } = useSWR<{ list: Role[]; total: number }>(
        '/api/roles',
        () => apiGetRolesList<{ list: Role[]; total: number }, {}>(),
        {
            revalidateOnFocus: false,
        },
    )

    const availableRoles = rolesData?.list || []

    const handleRoleChange = async (roleIds: number[]) => {
        if (roleIds.length === 0) {
            toast.push(
                <Notification type="danger">
                    User must have at least one role assigned
                </Notification>,
                { placement: 'top-center' },
            )
            return
        }

        setIsSubmitting(true)
        try {
            await apiAssignRolesToUser(user.id.toString(), {
                role_ids: roleIds,
            })

            setSelectedRoles(roleIds)
            onRoleUpdate()

            toast.push(
                <Notification type="success">
                    User roles updated successfully!
                </Notification>,
                { placement: 'top-center' },
            )
        } catch (error: any) {
            console.error('Error updating user roles:', error)
            const errorMessage =
                error.response?.data?.message || 'Failed to update user roles'
            toast.push(
                <Notification type="danger">{errorMessage}</Notification>,
                { placement: 'top-center' },
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    const toggleRole = async (roleId: number) => {
        const newSelectedRoles = selectedRoles.includes(roleId)
            ? selectedRoles.filter((id) => id !== roleId)
            : [...selectedRoles, roleId]

        await handleRoleChange(newSelectedRoles)
    }

    const selectedRoleNames = availableRoles
        .filter((role) => selectedRoles.includes(role.id))
        .map((role) => role.name)

    return (
        <div className="relative w-full">
            {/* Collapsed State - Shows count */}
            <div
                className="flex items-center justify-between px-3 py-1.5 border border-gray-300 rounded-md cursor-pointer hover:border-blue-500 transition-colors min-w-[120px]"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-sm text-gray-600">
                    {selectedRoles.length}{' '}
                    {selectedRoles.length === 1 ? 'role' : 'roles'}
                </span>
                <div className="flex items-center gap-2">
                    {isSubmitting && (
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-500"></div>
                    )}
                    <TbChevronDown
                        className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                </div>
            </div>

            {/* Expanded State - Shows role list */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto w-full">
                    <div className="py-1">
                        {availableRoles.map((role) => {
                            const isSelected = selectedRoles.includes(role.id)
                            return (
                                <div
                                    key={role.id}
                                    className={`flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors ${
                                        isSelected
                                            ? 'bg-blue-50 border-l-4 border-blue-500'
                                            : ''
                                    }`}
                                    onClick={() => toggleRole(role.id)}
                                >
                                    <span
                                        className={`text-sm ${isSelected ? 'text-blue-700 font-medium' : 'text-gray-700'}`}
                                    >
                                        {role.name}
                                    </span>
                                    {isSelected && (
                                        <TbCheck className="text-blue-500 text-sm" />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Click outside to close */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-0"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    )
}

export default UserRoleColumn
