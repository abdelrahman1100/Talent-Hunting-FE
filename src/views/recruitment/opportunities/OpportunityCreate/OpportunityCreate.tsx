import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import OpportunitiesForm from '../OpportunityForm/OpportunityForm'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { TbTrash } from 'react-icons/tb'
import { useNavigate } from 'react-router'
import { apiCreateOpportunity } from '@/services/OpportunitiesService'
import type { OpportunityFormSchema } from '../OpportunityForm/types'
import { useDepartmentOptions } from '@/hooks/useDepartmentOptions'
import { RECRUITMENT_PREFIX_PATH } from '@/constants/route.constant'

const OpportunityCreate = () => {
    const { departmentOptions } = useDepartmentOptions()
    const navigate = useNavigate()
    const [discardConfirmationOpen, setDiscardConfirmationOpen] =
        useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleFormSubmit = async (values: OpportunityFormSchema) => {
        setIsSubmitting(true)
        try {
            await apiCreateOpportunity(values)
            toast.push(
                <Notification type="success">
                    Opportunity created!
                </Notification>,
                { placement: 'top-center' },
            )
            navigate(
                `${RECRUITMENT_PREFIX_PATH}/opportunities/opportunities-list`,
            )
        } catch (error) {
            toast.push(
                <Notification type="danger">
                    Failed to create opportunity!
                </Notification>,
                { placement: 'top-center' },
            )
        }
        setIsSubmitting(false)
    }

    const handleConfirmDiscard = () => {
        setDiscardConfirmationOpen(true)
        toast.push(
            <Notification type="success">Opportunity discarded!</Notification>,
            { placement: 'top-center' },
        )
        navigate(`${RECRUITMENT_PREFIX_PATH}/opportunities/opportunities-list`)
    }

    const handleDiscard = () => {
        setDiscardConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDiscardConfirmationOpen(false)
    }

    return (
        <>
            <OpportunitiesForm
                newOpportunity
                defaultValues={{
                    title: '',
                    description: '',
                    jobType: '',
                    salary_min: 0,
                    salary_max: 0,
                    departmentId: departmentOptions[0]?.value || 1,
                    publishScope: '',
                }}
                departmentOptions={departmentOptions}
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
                                loading={isSubmitting}
                            >
                                Create
                            </Button>
                        </div>
                    </div>
                </Container>
            </OpportunitiesForm>
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
                    Are you sure you want to discard this? This action
                    can&apos;t be undone.
                </p>
            </ConfirmDialog>
        </>
    )
}

export default OpportunityCreate
