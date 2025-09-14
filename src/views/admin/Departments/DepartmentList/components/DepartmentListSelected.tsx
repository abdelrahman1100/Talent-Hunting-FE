import { useState } from 'react'
import StickyFooter from '@/components/shared/StickyFooter'
import Button from '@/components/ui/Button'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { TbChecks } from 'react-icons/tb'
import useDepartmentList from '../hooks/useDepartmentList'
import { useDeleteDepartment } from '../hooks/useDepartmentDelete'
// import { toast } from '@/components/ui'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
const DepartmentListSelected = () => {
    const { deleteDepartments, loading, error, success } = useDeleteDepartment()

    const {
        selectedDepartment,
        departmentList,
        mutate,
        departmentListTotal,
        setSelectAllDepartment,
    } = useDepartmentList()

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

    const handleDelete = () => {
        setDeleteConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }
    const handleConfirmDelete = () => {
        try {
            deleteDepartments(departmentList, selectedDepartment, (newList) => {
                mutate(
                    {
                        list: newList,
                        total: departmentListTotal - selectedDepartment.length,
                    },
                    false,
                )
                setSelectAllDepartment([])
                setDeleteConfirmationOpen(false)
            })

            setDeleteConfirmationOpen(false)
            toast.push(
                <Notification type="success">Department deleted!</Notification>,
                { placement: 'top-center' },
            )
        } catch (error) {
            toast.push(
                <Notification type="danger">
                    Failed to delete department
                </Notification>,
                { placement: 'top-center' },
            )
        }
    }

    return (
        <>
            {selectedDepartment.length > 0 && (
                <StickyFooter
                    className=" flex items-center justify-between py-4 bg-white dark:bg-gray-800"
                    stickyClass="-mx-4 sm:-mx-8 border-t border-gray-200 dark:border-gray-700 px-8"
                    defaultClass="container mx-auto px-8 rounded-xl border border-gray-200 dark:border-gray-600 mt-4"
                >
                    <div className="container mx-auto">
                        <div className="flex items-center justify-between">
                            <span>
                                {selectedDepartment.length > 0 && (
                                    <span className="flex items-center gap-2">
                                        <span className="text-lg text-primary">
                                            <TbChecks />
                                        </span>
                                        <span className="font-semibold flex items-center gap-1">
                                            <span className="heading-text">
                                                {selectedDepartment.length}{' '}
                                                Departments
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
                    Are you sure you want to remove these Departments? This action
                    can&apos;t be undo.{' '}
                </p>
            </ConfirmDialog>
        </>
    )
}

export default DepartmentListSelected
