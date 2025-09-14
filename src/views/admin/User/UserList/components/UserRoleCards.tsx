import { useState } from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { TbPlus, TbEdit, TbTrash } from 'react-icons/tb'
import { toUpper } from 'lodash'
import type { Role } from '../types'
import UserRoleDialog from './UserRoleDialog'
import UserRoleAssignmentDialog from './UserRoleAssignmentDialog'

import useUserRoles from '../hooks/useUserRoles'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import Notification from '@/components/ui/Notification'
import UserAvatars from '@/components/shared/UserAvatars'
import { useRoleUsersPreview } from '@/hooks/useRoleUsers'
import toast from '@/components/ui/toast'
type UserRoleCardsProps = {
    roleList: Role[]
    onRoleUpdate: () => void
}

type RoleCardProps = {
    role: Role
    onEdit: (role: Role) => void
}

const RoleCard = ({ role, onEdit }: RoleCardProps) => {
    const { users, total, isLoading } = useRoleUsersPreview(role.id, 4)

    return (
        <div className="group relative rounded-2xl p-6 bg-[#f5f5f5] border border-gray-200 hover:shadow-lg transition-all duration-200 min-h-[200px] flex flex-col">
            {/* Header with role name */}
            <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {role.name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3 flex-1 leading-relaxed">
                    {role.description ||
                        'Temporary access to limited features. Ideal for visitors or temporary users.'}
                </p>
            </div>

            {/* User avatars section */}
            <div className="flex-1 flex flex-col justify-end">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                        {isLoading ? (
                            <div className="flex items-center text-gray-400">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400 mr-2"></div>
                                <span className="text-xs">Loading...</span>
                            </div>
                        ) : (
                            <UserAvatars
                                users={users}
                                total={total}
                                maxDisplay={3}
                                size="sm"
                                showNames={false}
                                className=""
                                roleId={role.id}
                                showStatusDots={false}
                            />
                        )}
                    </div>

                    {/* Edit role button */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant="plain"
                            size="sm"
                            onClick={() => onEdit(role)}
                            className="text-gray-600 hover:text-gray-800 font-bold text-base flex items-center gap-2 px-0 py-0 transition-colors"
                        >
                            Edit role
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                            </svg>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const UserRoleCards = ({ roleList, onRoleUpdate }: UserRoleCardsProps) => {
    const { deleteRole } = useUserRoles()
    const [roleDialog, setRoleDialog] = useState<{
        type: 'create' | 'edit' | null
        role: Role | null
        open: boolean
    }>({
        type: null,
        role: null,
        open: false,
    })

    const [assignmentDialog, setAssignmentDialog] = useState<{
        open: boolean
        role: Role | null
    }>({
        open: false,
        role: null,
    })

    const [deleteDialog, setDeleteDialog] = useState<{
        open: boolean
        role: Role | null
    }>({
        open: false,
        role: null,
    })

    const handleCreateRole = () => {
        setRoleDialog({
            type: 'create',
            role: null,
            open: true,
        })
    }

    const handleEditRole = (role: Role) => {
        setRoleDialog({
            type: 'edit',
            role,
            open: true,
        })
    }

    const handleAssignRole = (role: Role) => {
        setAssignmentDialog({
            open: true,
            role,
        })
    }

    const handleCloseRoleDialog = () => {
        setRoleDialog({
            type: null,
            role: null,
            open: false,
        })
        onRoleUpdate()
    }

    const handleCloseAssignmentDialog = () => {
        setAssignmentDialog({
            open: false,
            role: null,
        })
    }

    const handleDeleteRole = (role: Role) => {
        setDeleteDialog({
            open: true,
            role,
        })
    }

    const handleConfirmDelete = async () => {
        if (!deleteDialog.role) return

        try {
            await deleteRole(deleteDialog.role.id)
            toast.push(
                <Notification type="success">Role deleted!</Notification>,
                { placement: 'top-center' },
            )
            onRoleUpdate()
        } catch (error: any) {
            toast.push(
                <Notification type="danger">
                    Failed to delete role!
                </Notification>,
                { placement: 'top-center' },
            )
        } finally {
            setDeleteDialog({
                open: false,
                role: null,
            })
        }
    }

    const handleCloseDeleteDialog = () => {
        setDeleteDialog({
            open: false,
            role: null,
        })
    }

    return (
        <>
            <Card className="mb-10 border-none ">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold">Available Roles</h4>
                    <Button
                        variant="solid"
                        size="sm"
                        icon={<TbPlus />}
                        onClick={handleCreateRole}
                    >
                        Create New Role
                    </Button>
                </div>

                <div className="   grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {roleList.map((role) => (
                        <RoleCard
                            key={role.id}
                            role={role}
                            onEdit={handleEditRole}
                        />
                    ))}
                </div>
            </Card>

            {/* Role Management Dialog */}
            <UserRoleDialog
                open={roleDialog.open}
                type={roleDialog.type}
                role={roleDialog.role}
                onClose={handleCloseRoleDialog}
            />

            {/* Role Assignment Dialog */}
            <UserRoleAssignmentDialog
                open={assignmentDialog.open}
                role={assignmentDialog.role}
                onClose={handleCloseAssignmentDialog}
            />

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                isOpen={deleteDialog.open}
                onClose={handleCloseDeleteDialog}
                onCancel={handleCloseDeleteDialog}
                onConfirm={handleConfirmDelete}
                title="Delete Role"
                confirmText="Delete"
                cancelText="Cancel"
                type="danger"
            >
                Are you sure you want to delete the role "
                {deleteDialog.role?.name}"? This action cannot be undone.
            </ConfirmDialog>
        </>
    )
}

export default UserRoleCards
