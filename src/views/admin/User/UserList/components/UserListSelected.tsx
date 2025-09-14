import { useState } from 'react'
import StickyFooter from '@/components/shared/StickyFooter'
import Button from '@/components/ui/Button'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { TbChecks } from 'react-icons/tb'
import useCompanyList from '../hooks/useUserlist'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import {  useDeleteUser } from '../hooks/useDeleteUser'
const UserListSelected = () => {
    const { deleteUsers, loading, error, success } = useDeleteUser()

    const {
        selectedUser,
        userList,
        mutate,
        userListTotal,
        setSelectAllUser,
    } = useCompanyList()

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

    const handleDelete = () => {
        setDeleteConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }
    const handleConfirmDelete = () => {
        try {
            deleteUsers(userList, selectedUser, (newList) => {
                mutate(
                    {
                        list: newList,
                        total: userListTotal - selectedUser.length,
                    },
                    false,
                )
                setSelectAllUser([])
                setDeleteConfirmationOpen(false)
            })

            setDeleteConfirmationOpen(false)
            toast.push(
                <Notification type="success">User deleted!</Notification>,
                { placement: 'top-center' },
            )
        } catch (error) {
            toast.push(
                <Notification type="danger">
                    Failed to delete user
                </Notification>,
                { placement: 'top-center' },
            )
        }
    }

    return (
        <>
            {selectedUser.length > 0 && (
                <StickyFooter
                    className=" flex items-center justify-between py-4 bg-white dark:bg-gray-800"
                    stickyClass="-mx-4 sm:-mx-8 border-t border-gray-200 dark:border-gray-700 px-8"
                    defaultClass="container mx-auto px-8 rounded-xl border border-gray-200 dark:border-gray-600 mt-4"
                >
                    <div className="container mx-auto">
                        <div className="flex items-center justify-between">
                            <span>
                                {selectedUser.length > 0 && (
                                    <span className="flex items-center gap-2">
                                        <span className="text-lg text-primary">
                                            <TbChecks />
                                        </span>
                                        <span className="font-semibold flex items-center gap-1">
                                            <span className="heading-text">
                                                {selectedUser.length}{' '}
                                                Users
                                            </span>
                                            <span>selected</span>
                                        </span>
                                    </span>
                                )}
                            </span>

                            <div className="flex items-center">
                                <Button
                                    size="sm"
                                    className="ltr:mr-3 rtl:ml-3"
                                    type="button"
                                    customColorClass={() =>
                                        'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error'
                                    }
                                    onClick={handleDelete}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                </StickyFooter>
            )}
            <ConfirmDialog
                isOpen={deleteConfirmationOpen}
                type="danger"
                title="Remove customers"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDelete}
            >
                <p>
                    {' '}
                    Are you sure you want to remove these users? This action
                    can&apos;t be undo.{' '}
                </p>
            </ConfirmDialog>
        </>
    )
}

export default UserListSelected
