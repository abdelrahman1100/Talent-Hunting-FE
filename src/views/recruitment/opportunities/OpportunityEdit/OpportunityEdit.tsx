import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import OpportunitiesForm from '../OpportunityForm/OpportunityForm'
import NoDataFound from '@/assets/svg/NoDataFound'
import {
    apiGetOpportunity,
    apiUpdateOpportunity,
    apiDeleteOpportunity,
} from '@/services/OpportunitiesService'
import { useParams, useNavigate } from 'react-router'
import useSWR from 'swr'
import type { OpportunityFormSchema } from '../OpportunityForm/types'
import type { Opportunity } from '../OpportunityList/types'
import { useDepartmentOptions } from '@/hooks/useDepartmentOptions'
import { RECRUITMENT_PREFIX_PATH } from '@/constants/route.constant'

const OpportunityEdit = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const { data, isLoading } = useSWR(
        [`recruitment/opportunity/${id}`, { id: id as string }],
        ([_, params]) => apiGetOpportunity<Opportunity, { id: string }>(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        },
    )
    const { departmentOptions } = useDepartmentOptions()

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const getDefaultValues = () => {
        if (data) {
            const {
                title,
                description,
                jobType,
                salary_min,
                salary_max,
                department_id,
                publishScope,
                department,
            } = data

            return {
                title,
                description,
                jobType,
                salary_min,
                salary_max,
                departmentId: department_id,
                publishScope,
            }
        }
        return {}
    }

    const handleFormSubmit = async (values: OpportunityFormSchema) => {
        setIsSubmitting(true)
        if (!id) {
            toast.push(
                <Notification type="danger">
                    Opportunity ID is missing!
                </Notification>,
                {
                    placement: 'top-center',
                },
            )
            setIsSubmitting(false)
            return
        }
        try {
            await apiUpdateOpportunity({ id, ...values })
            toast.push(
                <Notification type="success">Changes Saved!</Notification>,
                {
                    placement: 'top-center',
                },
            )
            navigate(
                `${RECRUITMENT_PREFIX_PATH}/opportunities/opportunities-list`,
            )
        } catch (error) {
            toast.push(
                <Notification type="danger">
                    Failed to save changes!
                </Notification>,
                {
                    placement: 'top-center',
                },
            )
        }
        setIsSubmitting(false)
    }

    const handleDelete = () => {
        setDeleteConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }

    const handleBack = () => {
        navigate(`${RECRUITMENT_PREFIX_PATH}/opportunities/opportunities-list`)
    }

    const handleConfirmDelete = async () => {
        setDeleteConfirmationOpen(true)
        const numericId = id ? Number(id) : undefined
        if (typeof numericId !== 'number' || isNaN(numericId)) {
            toast.push(
                <Notification type="danger">
                    Opportunity ID is invalid!
                </Notification>,
                { placement: 'top-center' },
            )
            setDeleteConfirmationOpen(false)
            return
        }
        try {
            await apiDeleteOpportunity({ id: numericId })
            toast.push(
                <Notification type="success">
                    Opportunity deleted!
                </Notification>,
                { placement: 'top-center' },
            )
            navigate(
                `${RECRUITMENT_PREFIX_PATH}/opportunities/opportunities-list`,
            )
        } catch (error) {
            toast.push(
                <Notification type="danger">
                    Failed to delete opportunity!
                </Notification>,
                { placement: 'top-center' },
            )
        }
        setDeleteConfirmationOpen(false)
    }

    return (
        <>
            {!isLoading && !data && (
                <div className="h-full flex flex-col items-center justify-center">
                    <NoDataFound height={280} width={280} />
                    <h3 className="mt-8">No opportunity found!</h3>
                </div>
            )}
            {!isLoading && data && (
                <>
                    <OpportunitiesForm
                        defaultValues={
                            getDefaultValues() as OpportunityFormSchema
                        }
                        newOpportunity={false}
                        departmentOptions={departmentOptions}
                        onFormSubmit={handleFormSubmit}
                    >
                        <Container>
                            <div className="flex items-center justify-between px-8">
                                <Button
                                    className="ltr:mr-3 rtl:ml-3"
                                    type="button"
                                    variant="plain"
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
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        variant="solid"
                                        type="submit"
                                        loading={isSubmitting}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </Container>
                    </OpportunitiesForm>
                    <ConfirmDialog
                        isOpen={deleteConfirmationOpen}
                        type="danger"
                        title="Remove opportunity"
                        onClose={handleCancel}
                        onRequestClose={handleCancel}
                        onCancel={handleCancel}
                        onConfirm={handleConfirmDelete}
                    >
                        <p>
                            Are you sure you want to remove this opportunity?
                            This action can&apos;t be undone.
                        </p>
                    </ConfirmDialog>
                </>
            )}
        </>
    )
}

export default OpportunityEdit
