import { useState, useEffect } from 'react'
import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { TbX, TbTrash } from 'react-icons/tb'
import type { Role } from '../types'
import type {
    CreateRoleRequest,
    UpdateRoleRequest,
} from '../hooks/useUserRoles'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import useUserRoles from '../hooks/useUserRoles'

type UserRoleDialogProps = {
    open: boolean
    type: 'create' | 'edit' | null
    role: Role | null
    onClose: () => void
}

const UserRoleDialog = ({ open, type, role, onClose }: UserRoleDialogProps) => {
    const { createRole, updateRole, deleteRole } = useUserRoles()
    const [formData, setFormData] = useState<CreateRoleRequest>({
        name: '',
        description: '',
        // privileges: [],
    })
    const [loading, setLoading] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

    useEffect(() => {
        if (role && type === 'edit') {
            setFormData({
                name: role.name,
                description: role.description,
                // privileges: role.privileges || [],
            })
        } else {
            setFormData({
                name: '',
                description: '',
                // privileges: [],
            })
        }
    }, [role, type])

    const handleSubmit = async () => {
        if (!formData.name.trim() || !formData.description.trim()) {
            toast.push(
                <Notification type="danger">
                    Please fill in all required fields
                </Notification>,
                { placement: 'top-center' },
            )
            return
        }

        setLoading(true)
        try {
            if (type === 'create') {
                await createRole(formData)
                toast.push(
                    <Notification type="success">
                        Role created successfully!
                    </Notification>,
                    { placement: 'top-center' },
                )
            } else if (type === 'edit' && role) {
                const updateData: UpdateRoleRequest = {
                    name: formData.name,
                    description: formData.description,
                    privileges: formData.privileges,
                }
                await updateRole(role.id, updateData)
                toast.push(
                    <Notification type="success">
                        Role updated successfully!
                    </Notification>,
                    { placement: 'top-center' },
                )
            }
            onClose()
        } catch (error: any) {
            console.error('Error saving role:', error.message)
            toast.push(
                <Notification type="danger">
                    Failed to save role. Please try again.
                </Notification>,
                { placement: 'top-center' },
            )
        } finally {
            setLoading(false)
        }
    }

    const handleClose = () => {
        if (!loading) {
            onClose()
        }
    }

    const handleDelete = async () => {
        if (!role) return

        setLoading(true)
        try {
            await deleteRole(role.id)
            toast.push(
                <Notification type="success">
                    Role deleted successfully!
                </Notification>,
                { placement: 'top-center' },
            )
            setShowDeleteConfirm(false)
            onClose()
        } catch (error: any) {
            console.error('Error deleting role:', error.message)
            toast.push(
                <Notification type="danger">
                    Failed to delete role. Please try again.
                </Notification>,
                { placement: 'top-center' },
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog
            isOpen={open}
            onClose={handleClose}
            onRequestClose={handleClose}
            className="max-w-md"
        >
            <div className="">
                <div className="flex items-center justify-between mb-6">
                    <h4 className="text-lg font-semibold">
                        {type === 'create' ? 'Create New Role' : 'Edit Role'}
                    </h4>
                 
                </div>

                <div className="space-y-4">
                    <FormItem label="Role Name">
                        <Input
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                            placeholder="Enter role name"
                            disabled={loading}
                        />
                    </FormItem>

                    <FormItem label="Description">
                        <Input
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value,
                                })
                            }
                            placeholder="Enter role description"
                            textArea
                            disabled={loading}
                        />
                    </FormItem>

                    <div className="flex justify-between items-center pt-4">
                        {/* Delete button - only show when editing */}
                        {type === 'edit' && role && (
                            <Button
                                variant="plain"
                                size="sm"
                                icon={<TbTrash />}
                                onClick={() => setShowDeleteConfirm(true)}
                                disabled={loading}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                                Delete Role
                            </Button>
                        )}

                        <div className="flex gap-2 ml-auto">
                            <Button
                                variant="plain"
                                onClick={handleClose}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="solid"
                                onClick={handleSubmit}
                                loading={loading}
                            >
                                {type === 'create'
                                    ? 'Create Role'
                                    : 'Update Role'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onCancel={() => setShowDeleteConfirm(false)}
                onConfirm={handleDelete}
                title="Delete Role"
                confirmText="Delete"
                cancelText="Cancel"
                type="danger"
            >
                Are you sure you want to delete the role "{role?.name}"? This
                action cannot be undone.
            </ConfirmDialog>
        </Dialog>
    )
}

export default UserRoleDialog
