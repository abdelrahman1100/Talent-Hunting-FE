import { useState } from 'react'
import StickyFooter from '@/components/shared/StickyFooter'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
// import useOpportunityList from '../hooks/useOpportunityList'
import { TbChecks } from 'react-icons/tb'
import useApplicationList from '../hooks/useApplicationList'
import { apiDeleteApplication } from '@/services/ApplicationsService'

const ApplicationListSelected = () => {
    const {
        selectedApplication,
        applicationList,
        mutate,
        applicationListTotal,
        setSelectAllApplication,
    } = useApplicationList()

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const [deleting, setDeleting] = useState(false)

    const handleDelete = () => {
        setDeleteConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }

    const handleConfirmDelete = async () => {
        setDeleting(true)
        try {
            // Call API to delete each selected application
            await Promise.all(
                selectedApplication
                    .filter((application) => typeof application.id === 'number')
                    .map((application) =>
                        apiDeleteApplication({ id: application.id as number }),
                    ),
            )
            // Remove from local list
            const newApplicationList = applicationList.filter((application) => {
                return !selectedApplication.some(
                    (selected) => selected.id === application.id,
                )
            })
            setSelectAllApplication([])
            mutate(
                {
                    list: newApplicationList,
                    total: applicationListTotal - selectedApplication.length,
                },
                false,
            )
            toast.push(
                <Notification type="success">
                    Opportunities deleted!
                </Notification>,
                { placement: 'top-center' },
            )
        } catch (error) {
            toast.push(
                <Notification type="danger">
                    Failed to delete opportunities!
                </Notification>,
                { placement: 'top-center' },
            )
        }
        setDeleting(false)
        setDeleteConfirmationOpen(false)
    }

    return (
        <>
            {selectedApplication.length > 0 && (
                <StickyFooter
                    className=" flex items-center justify-between py-4 bg-white dark:bg-gray-800"
                    stickyClass="-mx-4 sm:-mx-8 border-t border-gray-200 dark:border-gray-700 px-8"
                    defaultClass="container mx-auto px-8 rounded-xl border border-gray-200 dark:border-gray-600 mt-4"
                >
                    <div className="container mx-auto">
                        <div className="flex items-center justify-between">
                            <span>
                                {selectedApplication.length > 0 && (
                                    <span className="flex items-center gap-2">
                                        <span className="text-lg text-primary">
                                            <TbChecks />
                                        </span>
                                        <span className="font-semibold flex items-center gap-1">
                                            <span className="heading-text">
                                                {selectedApplication.length}{' '}
                                                Applications
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
                                    loading={deleting}
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
                title="Remove opportunities"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDelete}
            >
                <p>
                    {' '}
                    Are you sure you want to remove these opportunities? This
                    action can&apos;t be undone.{' '}
                </p>
            </ConfirmDialog>
        </>
    )
}

export default ApplicationListSelected
