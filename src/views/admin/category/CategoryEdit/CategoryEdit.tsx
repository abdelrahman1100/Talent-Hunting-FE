import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { apiDeleteCategory, apiGetCategory } from '@/services/CategoryService'
import { CategoryFormSchema } from '../CategoryForm/types'
import NoUserFound from '@/assets/svg/NoUserFound'
import { TbTrash, TbArrowNarrowLeft } from 'react-icons/tb'
import { useParams, useNavigate } from 'react-router'
import useSWR from 'swr'
import type { Category, UpdateCategoryRequest  } from '../CategoryList/types'
import CategoryForm from '../CategoryForm/CategoryForm'
import { useUpdateCategory } from '../CategoryList/hooks/useCategoryUpdate'
import { ADMIN_PREFIX_PATH } from '@/constants/route.constant'
const CustomerEdit = () => {
    const { id } = useParams()

    const navigate = useNavigate()
const { UpdateCategory, Loading } = useUpdateCategory()

    const { data, isLoading } = useSWR(
        [`/api/categories${id}`, { id: id as string }],
        ([_, params]) => apiGetCategory<Category, { id: string }>(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        },
    )

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

const handleFormSubmit = async (values: UpdateCategoryRequest) => {
  try {
    if (!id) {
      toast.push(
        <Notification type="danger">Category ID is required for update</Notification>,
        { placement: "top-center" }
      )
      return
    }
    setIsSubmiting(true)
    const res = await UpdateCategory(id, values)
  
    toast.push(
      <Notification type="success">Category updated!</Notification>,
      { placement: "top-center" }
    )
    setIsSubmiting(false)
    navigate(`${ADMIN_PREFIX_PATH}/category/category-list`)
  } catch {
    setIsSubmiting(false)
    toast.push(
      <Notification type="danger">Failed to update category</Notification>,
      { placement: "top-center" }
    )
  }
}
    const getDefaultValues = () => {
        if (data) {
            const { name, description } = data

            return {
              name,
              description
            }
        }

        return {}
    }

    const handleConfirmDelete = async() => {
        setDeleteConfirmationOpen(true)
        try {
            await apiDeleteCategory(id)
             setDeleteConfirmationOpen(false)
            toast.push(
                <Notification type="success">Category deleted!</Notification>,
                { placement: 'top-center' },
            )
           
            navigate(`${ADMIN_PREFIX_PATH}/category/category-list`)
        } catch {
            toast.push(
                <Notification type="danger">Failed to delete category</Notification>,
                { placement: 'top-center' },
            )
        }
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
                    <CategoryForm
                        defaultValues={getDefaultValues() as CategoryFormSchema}
                        newCategory={false}
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
                                    >
                                        Update
                                    </Button>
                                </div>
                            </div>
                        </Container>
                    </CategoryForm>
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

export default CustomerEdit
