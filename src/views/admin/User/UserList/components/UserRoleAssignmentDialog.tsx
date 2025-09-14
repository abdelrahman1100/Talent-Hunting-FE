import { useState, useEffect } from 'react'
import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import { Select } from '@/components/ui'
import { FormItem } from '@/components/ui/Form'
import { TbX } from 'react-icons/tb'
import type { Role } from '../types'
import { User } from '../types'
import { apiGetUserList } from '@/services/UserService'
import { apiAssignRolesToUser } from '@/services/RolesUserService'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'

type UserRoleAssignmentDialogProps = {
    open: boolean
    role: Role | null
    onClose: () => void
}

const UserRoleAssignmentDialog = ({
    open,
    role,
    onClose,
}: UserRoleAssignmentDialogProps) => {
    const [users, setUsers] = useState<User[]>([])
    const [selectedUserIds, setSelectedUserIds] = useState<number[]>([])
    const [loading, setLoading] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        if (open) {
            fetchUsers()
        }
    }, [open])

    const fetchUsers = async () => {
        try {
            setLoading(true)
            const response = await apiGetUserList<
                { list: User[]; total: number },
                {}
            >({
                pageIndex: 1,
                pageSize: 100,
            })
            setUsers(response.list || [])
        } catch (error) {
            console.error('Error fetching users:', error)
            toast.push('Failed to fetch users')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async () => {
        if (!role || selectedUserIds.length === 0) {
            toast.push(
                <Notification type="danger">
                    Please select at least one user to assign to this role
                </Notification>,
                { placement: 'top-center' },
            )
            return
        }

        setSubmitting(true)
        try {
            await apiAssignRolesToUser(role.id.toString(), {
                role_ids: [role.id],
                user_ids: selectedUserIds,
            })

            toast.push(
                <Notification type="success">
                    Users assigned to role successfully!
                </Notification>,
                { placement: 'top-center' },
            )
            onClose()
        } catch (error: any) {
            console.error('Error assigning users to role:', error)
            const errorMessage =
                error.response?.data?.message ||
                'Failed to assign users to role'
            toast.push(
                <Notification type="danger">{errorMessage}</Notification>,
                { placement: 'top-center' },
            )
        } finally {
            setSubmitting(false)
        }
    }

    const handleClose = () => {
        if (!submitting) {
            setSelectedUserIds([])
            onClose()
        }
    }

    if (!role) return null

    return (
        <Dialog
            isOpen={open}
            onClose={handleClose}
            onRequestClose={handleClose}
            className="max-w-lg"
        >
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h4 className="text-lg font-semibold">
                        Assign Users to Role: {role.name}
                    </h4>
                    <Button
                        variant="plain"
                        size="sm"
                        icon={<TbX />}
                        onClick={handleClose}
                        disabled={submitting}
                    />
                </div>

                <div className="space-y-4">
                    <FormItem label="Select Users">
                        <Select
                            isMulti
                            placeholder="Select users to assign to this role"
                            options={users.map((user) => ({
                                value: user.id,
                                label: user.name,
                                status: user.status,
                            }))}
                            value={users
                                .filter((user) =>
                                    selectedUserIds.includes(user.id),
                                )
                                .map((user) => ({
                                    value: user.id,
                                    label: user.name,
                                    status: user.status,
                                }))}
                            onChange={(options) =>
                                setSelectedUserIds(
                                    options ? options.map((o) => o.value) : [],
                                )
                            }
                            isDisabled={loading || submitting}
                        />
                    </FormItem>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            variant="plain"
                            onClick={handleClose}
                            disabled={submitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="solid"
                            onClick={handleSubmit}
                            loading={submitting}
                            disabled={selectedUserIds.length === 0}
                        >
                            Assign Users
                        </Button>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default UserRoleAssignmentDialog
