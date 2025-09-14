import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { apiGetCategory } from '@/services/CategoryService'
import { DepartmentFormSchema } from '../DepartmentForm/DepartmentForm'
import sleep from '@/utils/sleep'
import NoUserFound from '@/assets/svg/NoUserFound'
import { TbTrash, TbArrowNarrowLeft } from 'react-icons/tb'
import { useParams, useNavigate } from 'react-router'
import useSWR from 'swr'

import type { Department, UpdateDepartmentRequest } from '../DepartmentList/types'
import CategoryForm from '../DepartmentForm/DepartmentForm'
// import { useUpdateCategory } from '../CategoryList/hooks/useCategoryUpdate'
import { useUpdateDepartment } from '../DepartmentList/hooks/useDepartmentUpdate'
import { ADMIN_PREFIX_PATH } from '@/constants/route.constant'
import { apiGetDepartment } from '@/services/DepartmrntServices'
import { DepartmentFormSchema2 } from '../DepartmentForm/types'
const CustomerEdit = () => {
    const { id } = useParams()

    const navigate = useNavigate()
    const { UpdateDepartment, Loading } = useUpdateDepartment()

    const { data, isLoading } = useSWR(
        [`/api/departments${id}`, { id: id as string }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) => apiGetDepartment<Department, { id: string }>(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        },
    )

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const handleFormSubmit = async (values: UpdateDepartmentRequest) => {
        try {
            if (!id) {
                toast.push(
                    <Notification type="danger">
                        Department ID is required for update
                    </Notification>,
                    { placement: 'top-center' },
                )
                return
            }
            const res = await UpdateDepartment(id, values)
            // console.log(res)
            toast.push(
                <Notification type="success">Department updated!</Notification>,
                { placement: 'top-center' },
            )
            navigate(`${ADMIN_PREFIX_PATH}/department/department-list`)
        } catch {
            toast.push(
                <Notification type="danger">
                    Failed to update department
                </Notification>,
                { placement: 'top-center' },
            )
        }
    }
    const getDefaultValues = () => {
        if (data) {
            const { name , company } = data

            return {
                name,
                company,
            }
        }

        return {}
    }

    const handleConfirmDelete = () => {
        setDeleteConfirmationOpen(true)
        toast.push(
            <Notification type="success">Department deleted!</Notification>,
            { placement: 'top-center' },
        )
        navigate(`${ADMIN_PREFIX_PATH}/department/department-list`)
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
                        defaultValues={getDefaultValues() as DepartmentFormSchema2}
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
                                        loading={Loading}
                                    >
                                        Save
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
