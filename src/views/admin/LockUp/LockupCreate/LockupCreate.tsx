import { use, useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
// import  from '../CategoryForm'

import ConfirmDialog from '@/components/shared/ConfirmDialog'

import { TbTrash } from 'react-icons/tb'
import { useNavigate } from 'react-router'

import { ADMIN_PREFIX_PATH } from '@/constants/route.constant'

import LockupForm, { LockupFormSchema } from '../LockupForm/LockUpForm'
import { apiCreateLockup } from '@/services/LockUp'
import useLockUpList from '../LockupList/hooks/useLockUpList'
// import type {  } from '../CategoryForm/types'

const LockupCreate = () => {
    const navigate = useNavigate()

    const [discardConfirmationOpen, setDiscardConfirmationOpen] =
        useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const { lockupList, isLoading } = useLockUpList()

    const handleFormSubmit = async (values: LockupFormSchema) => {
        console.log('Form Values:', values)
        try {
            const res = await apiCreateLockup(values)
            // console.log(res)
            toast.push(
                <Notification type="success">Lockup created!</Notification>,
                { placement: 'top-center' },
            )
            navigate(`${ADMIN_PREFIX_PATH}/lockup/lockup-list`)
        } catch {
            toast.push(
                <Notification type="danger">
                    Failed to create lockup
                </Notification>,
                { placement: 'top-center' },
            )
        }
    }

    const handleConfirmDiscard = () => {
        setDiscardConfirmationOpen(true)
        toast.push(
            <Notification type="success">LockUp discarded!</Notification>,
            { placement: 'top-center' },
        )
        navigate(`${ADMIN_PREFIX_PATH}/lockup/lockup-list`)
    }

    const handleDiscard = () => {
        setDiscardConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDiscardConfirmationOpen(false)
    }

    return (
        <>
            <LockupForm
                // newLockup
                // defaultValues={{
                //     name: '',
                //     : '',
                // }}
                onFormSubmit={handleFormSubmit}
            >
                <Container>
                    <div className="flex items-center justify-between px-8">
                        <span></span>
                        <div className="flex items-center">
                            <Button
                                className="ltr:mr-3 rtl:ml-3"
                                type="button"
                                customColorClass={() =>
                                    'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                                }
                                icon={<TbTrash />}
                                onClick={handleDiscard}
                            >
                                Discard
                            </Button>
                            <Button
                                variant="solid"
                                type="submit"
                                loading={isSubmiting}
                            >
                                Create
                            </Button>
                        </div>
                    </div>
                </Container>
            </LockupForm>
            <ConfirmDialog
                isOpen={discardConfirmationOpen}
                type="danger"
                title="Discard changes"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDiscard}
            >
                <p>
                    Are you sure you want discard this? This action can&apos;t
                    be undo.{' '}
                </p>
            </ConfirmDialog>
        </>
    )
}

export default LockupCreate
