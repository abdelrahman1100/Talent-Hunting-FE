import { useState } from 'react'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import Container from '@/components/shared/Container'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { useNavigate } from 'react-router'
import { TbTrash } from 'react-icons/tb'
import type { CompanyFormSchema } from '../CompanyForm'
import CategoryForm from '../CompanyForm'
import { ADMIN_PREFIX_PATH } from '@/constants/route.constant'
import { useCreateCompany } from '../CompanyList/hooks/useCompanyCreate'

const CompanyCreate = () => {
    const navigate = useNavigate()

    const [discardConfirmationOpen, setDiscardConfirmationOpen] =
        useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const { createCompany, isLoading } = useCreateCompany()

    const handleFormSubmit = async (values: CompanyFormSchema) => {
        try {
            console.log('Submitted values', values)
            const res = await createCompany(values)
            // setIsSubmiting(true)
            // await sleep(800)
            // setIsSubmiting(false)
            toast.push(
                <Notification type="success">Company created!</Notification>,
                { placement: 'top-center' },
            )
        } catch (error) {
            toast.push(
                <Notification type="danger">
                    Failed to create company
                </Notification>,
                { placement: 'top-center' },
            )
        }

        // toast.push(<Notification type="success">Company created!</Notification>, {
        //     placement: 'top-center',
        // })
        navigate(`${ADMIN_PREFIX_PATH}/company/company-list`)
    }

    const handleConfirmDiscard = () => {
        setDiscardConfirmationOpen(true)
        toast.push(
            <Notification type="success">Company discarded!</Notification>,
            { placement: 'top-center' },
        )
        navigate(`${ADMIN_PREFIX_PATH}/company/company-list`)
    }

    const handleDiscard = () => {
        setDiscardConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDiscardConfirmationOpen(false)
    }

    return (
        <>
            <CategoryForm onFormSubmit={handleFormSubmit}>
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
            </CategoryForm>
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

export default CompanyCreate
