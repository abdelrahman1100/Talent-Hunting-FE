import { useState } from 'react'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import Container from '@/components/shared/Container'
import Loading from '@/components/shared/Loading'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import useSWR from 'swr'
import { useParams, useNavigate } from 'react-router'
import { TbTrash } from 'react-icons/tb'

import { apiGetCompany, apiUpdateCompany } from '@/services/CompanyService'
import { UpdateUserRequest, User } from '../UserList/types'

import { ADMIN_PREFIX_PATH } from '@/constants/route.constant'
import UserForm from '../UserForm/UserForm'
import { UserFormSchema2 } from '../UserForm/types'
import { apiGetUser, apiUpdateUser } from '@/services/UserService'
import { useUpdateUser } from '../UserList/hooks/useUserUpdate'

const UserEdit = () => {
    const { id } = useParams()

    const navigate = useNavigate()
    const { UpdateUser, Loading: loading } = useUpdateUser()

    const { data, isLoading } = useSWR(
        [`/api/users/${id}`, { id: id as string }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) => apiGetUser<User, { id: string }>(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnReconnect: false,
        },
    )
    console.log('Fetched user default valuses:', data)
    const [discardConfirmationOpen, setDiscardConfirmationOpen] =
        useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const handleFormSubmit = async (values: any) => {
        console.log('Submitted values', values)
        setIsSubmiting(true)
        try {
            if (!id) {
                toast.push(
                    <Notification type="danger">
                        Company ID is required for update
                    </Notification>,
                    { placement: 'top-center' },
                )
                return
            }
            console.log('----------------------------------------------')
            const res = await UpdateUser(id, values)
            // console.log(res)
            toast.push(
                <Notification type="success">User updated!</Notification>,
                { placement: 'top-center' },
            )
            navigate(`${ADMIN_PREFIX_PATH}/user/user-list`)
        } catch (error) {
            toast.push(
                <Notification type="danger">
                    Failed to update company
                </Notification>,
                { placement: 'top-center' },
            )
        } finally {
            setIsSubmiting(false)
        }
    }

    const handleConfirmDiscard = () => {
        setDiscardConfirmationOpen(true)
        toast.push(
            <Notification type="success">Company deleted!</Notification>,
            {
                placement: 'top-center',
            },
        )
        navigate(`${ADMIN_PREFIX_PATH}/company/company-list`)
    }

    const handleDelete = () => {
        setDiscardConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDiscardConfirmationOpen(false)
    }

    const getDefaultValues = () => {
        if (data) {
            const {
                name,
                email,
                user_img,
                gender,
                nationality,
                roles,
                department,
            } = data

            return {
                name,
                email,
                user_img,
                gender,
                nationality,
                roles,
                department,
            }
        }

        return {}
    }

    return (
        <Loading loading={loading}>
            <UserForm
                onFormSubmit={handleFormSubmit}
                defaultValues={getDefaultValues() as UserFormSchema2}
                //  newOrder={false}
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
            </UserForm>
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
                    Are you sure you want delete this? This action can&apos;t be
                    undo.{' '}
                </p>
            </ConfirmDialog>
        </Loading>
    )
}

export default UserEdit





