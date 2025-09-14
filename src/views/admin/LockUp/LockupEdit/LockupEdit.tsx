import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import NoUserFound from '@/assets/svg/NoUserFound'
import { TbTrash, TbArrowNarrowLeft } from 'react-icons/tb'
import { useParams, useNavigate } from 'react-router'
import useSWR from 'swr'
import { useUpdateLockup } from '../LockupList/hooks/uselockupUpdate'
import { apiGetLockup } from '@/services/LockUp'
import { UpdateLockupRequest } from '../LockupList/types'
import { Lockup, LockupFormSchema2 } from '../LockupForm/types'
import LockupForm from '../LockupForm/LockUpForm'
import { ADMIN_PREFIX_PATH } from '@/constants/route.constant'
import { set } from 'lodash'
const lockupEdit = () => {
    const { id } = useParams()

    const navigate = useNavigate()
    const { UpdateLockup, Loading } = useUpdateLockup()

    const { data, isLoading } = useSWR(
        [`/api/lookups/masters${id}`, { id: id as string }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) => apiGetLockup<Lockup, { id: string }>(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: true,
        },
    )

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const handleFormSubmit = async (values: UpdateLockupRequest) => {
        setIsSubmiting(true)
        try {
            if (!id) {
                toast.push(
                    <Notification type="danger">
                        Lockup ID is required for update
                    </Notification>,
                    { placement: 'top-center' },
                )
                return
            }
            const res = await UpdateLockup(id, values)
            // console.log(res)
            toast.push(
                <Notification type="success">Lockup updated!</Notification>,
                { placement: 'top-center' },
            )
            setIsSubmiting(false)
            navigate(`${ADMIN_PREFIX_PATH}/lockup/lockup-list`)
        } catch {
            setIsSubmiting(false)
            toast.push(
                <Notification type="danger">
                    Failed to update lockup
                </Notification>,
                { placement: 'top-center' },
            )
        }
    }
    const getDefaultValues = () => {
        if (data) {
            const {name ,label, details} = data

            return {
                name,
                label,
                details,
            }
        }

        return {}
    }

    const handleConfirmDelete = () => {
        setDeleteConfirmationOpen(true)
        toast.push(
            <Notification type="success">Lockup deleted!</Notification>,
            { placement: 'top-center' },
        )
        navigate(`${ADMIN_PREFIX_PATH}/lockup/lockup-list`)
    }

    const handleDelete = () => {
        setDeleteConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }

    const handleBack = () => {
        history.back()
    }

    return (
        <>
            {!isLoading && !data && (
                <div className="h-full flex flex-col items-center justify-center">
                    <NoUserFound height={280} width={280} />
                    <h3 className="mt-8">No Category found!</h3>
                </div>
            )}
            {!isLoading && data && (
                <>
                    <LockupForm
                        defaultValues={getDefaultValues() as LockupFormSchema2}
                        newOrder={false}
                        onFormSubmit={handleFormSubmit}
                    >
                        <Container>
                            <div className="flex items-center justify-between px-8">
                                <Button
                                    className="ltr:mr-3 rtl:ml-3"
                                    type="button"
                                    variant="plain"
                                    icon={<TbArrowNarrowLeft />}
                                    onClick={handleBack}
                                >
                                    Back
                                </Button>
                                <div className="flex items-center">
                                    <Button
                                        className="ltr:mr-3 rtl:ml-3"
                                        type="button"
                                        customColorClass={() =>
                                            'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                                        }
                                        icon={<TbTrash />}
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        variant="solid"
                                        type="submit"
                                        loading={isSubmiting}
                                        // onClick={handleFormSubmit}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </Container>
                    </LockupForm>
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
                            Are you sure you want to remove this Category? This
                            action can&apos;t be undo.{' '}
                        </p>
                    </ConfirmDialog>
                </>
            )}
        </>
    )
}

export default lockupEdit
