import { useState } from 'react'
import StickyFooter from '@/components/shared/StickyFooter'
import Button from '@/components/ui/Button'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { TbChecks } from 'react-icons/tb'
import useDepartmentList from '../hooks/useLockUpList'
import { useDeleteLockup } from '../hooks/useLockupDelete'
// import { toast } from '@/components/ui'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import useLockUpList from '../hooks/useLockUpList'
const LockupListSelected = () => {
    const { deleteLockups, loading, error, success } = useDeleteLockup()

    const {
        selectedLockups,
        lockupList,
        mutate,
        lockupListTotal,
        setSelectAllLockups,
    } = useLockUpList()

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

    const handleDelete = () => {
        setDeleteConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }
    const handleConfirmDelete = () => {
        try {
            deleteLockups(lockupList, selectedLockups, (newList) => {
                mutate(
                    {
                        list: newList,
                        total: lockupListTotal - selectedLockups.length,
                    },
                    false,
                )
                setSelectAllLockups([])
                setDeleteConfirmationOpen(false)
            })

            setDeleteConfirmationOpen(false)
            toast.push(
                <Notification type="success">Lockup deleted!</Notification>,
                { placement: 'top-center' },
            )
        } catch (error) {
            toast.push(
                <Notification type="danger">
                    Failed to delete lockup
                </Notification>,
                { placement: 'top-center' },
            )
        }
    }

    return (
        <>
            {selectedLockups.length > 0 && (
                <StickyFooter
                    className=" flex items-center justify-between py-4 bg-white dark:bg-gray-800"
                    stickyClass="-mx-4 sm:-mx-8 border-t border-gray-200 dark:border-gray-700 px-8"
                    defaultClass="container mx-auto px-8 rounded-xl border border-gray-200 dark:border-gray-600 mt-4"
                >
                    <div className="container mx-auto">
                        <div className="flex items-center justify-between">
                            <span>
                                {selectedLockups.length > 0 && (
                                    <span className="flex items-center gap-2">
                                        <span className="text-lg text-primary">
                                            <TbChecks />
                                        </span>
                                        <span className="font-semibold flex items-center gap-1">
                                            <span className="heading-text">
                                                {selectedLockups.length} Lockups
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
                    Are you sure you want to remove these Lockups? This action
                    can&apos;t be undo.{' '}
                </p>
            </ConfirmDialog>
        </>
    )
}

export default LockupListSelected
