import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'


import ConfirmDialog from '@/components/shared/ConfirmDialog'

import { TbTrash } from 'react-icons/tb'
import { useNavigate } from 'react-router'
import useDepartmentList from '../DepartmentList/hooks/useDepartmentList'
import { createDepartmentRequest } from '../DepartmentList/types'
import { ADMIN_PREFIX_PATH } from '@/constants/route.constant'
import DepartmentForm from '../DepartmentForm/DepartmentForm'

import { apiCreateDepartment } from '@/services/DepartmrntServices'
import { DepartmentFormSchema } from '../DepartmentForm/DepartmentForm'
import { useCreateDepartment } from '../DepartmentList/hooks/useDepartmentCreate'
// import type {  } from '../CategoryForm/types'

const DepartmentCreate = () => {
    const navigate = useNavigate()

    const [discardConfirmationOpen, setDiscardConfirmationOpen] =
        useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const { createDepartment, isLoading } = useCreateDepartment()

    const handleFormSubmit = async (values: DepartmentFormSchema) => {
        try {
            const res = await createDepartment(values)
            // console.log(res)
            toast.push(
                <Notification type="success">Department created!</Notification>,
                { placement: 'top-center' },
            )
            navigate(`${ADMIN_PREFIX_PATH}/department/department-list`)
        } catch {
            toast.push(
                <Notification type="danger">
                    Failed to create department
                </Notification>,
                { placement: 'top-center' },
            )
        }
    }

    const handleConfirmDiscard = () => {
        setDiscardConfirmationOpen(true)
        toast.push(
            <Notification type="success">Department discarded!</Notification>,
            { placement: 'top-center' },
        )
        navigate(`${ADMIN_PREFIX_PATH}/department/department-list`)
    }

    const handleDiscard = () => {
        setDiscardConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDiscardConfirmationOpen(false)
    }

    return (
        <>
            <DepartmentForm
                // newDepartment
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
                                loading={isLoading}
                            >
                                Create
                            </Button>
                        </div>
                    </div>
                </Container>
            </DepartmentForm>
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

export default DepartmentCreate
