import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import CategoryForm from '../CategoryForm'
import ConfirmDialog from '@/components/shared/ConfirmDialog'

import { TbTrash } from 'react-icons/tb'
import { useNavigate } from 'react-router'
import { useCreateCategory } from '../CategoryList/hooks/useCategoryCreate'
import { createCategoryRequest } from '../CategoryList/types'
import { ADMIN_PREFIX_PATH } from '@/constants/route.constant'
import { AxiosError } from 'axios'

const CategoryCreate = () => {
    const navigate = useNavigate()

    const [discardConfirmationOpen, setDiscardConfirmationOpen] =
        useState(false)

    const { createCategory, isLoading } = useCreateCategory()

    const handleFormSubmit = async (values: createCategoryRequest) => {
        console.log('CategoryCreate received values:', values)
        try {
            const res = await createCategory(values)
            // console.log(res)
            toast.push(
                <Notification type="success">Category created!</Notification>,
                { placement: 'top-center' },
            )
            navigate(`${ADMIN_PREFIX_PATH}/category/category-list`)
        } catch (error) {
            const errorMessage =
                error instanceof AxiosError
                    ? error.response?.data?.message ||
                      error.message ||
                      'Unknown error occurred'
                    : 'Failed to create category'

            toast.push(
                <Notification type="danger">
                    Failed to create category: {errorMessage}
                </Notification>,
                { placement: 'top-center' },
            )
        }
    }

    const handleConfirmDiscard = () => {
        setDiscardConfirmationOpen(true)
        toast.push(
            <Notification type="success">Category discarded!</Notification>,
            { placement: 'top-center' },
        )
        navigate(`${ADMIN_PREFIX_PATH}/category/category-list`)
    }

    const handleDiscard = () => {
        setDiscardConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDiscardConfirmationOpen(false)
    }

    return (
        <>
            <CategoryForm
                newCategory
                defaultValues={{
                    name: '',
                    description: '',
                }}
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

export default CategoryCreate
