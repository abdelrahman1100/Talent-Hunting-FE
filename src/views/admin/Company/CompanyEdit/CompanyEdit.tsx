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
import CompanyForm from '../CompanyForm'
import { apiGetCompany, apiUpdateCompany } from '@/services/CompanyService'
import { Company, UpdateCompanyRequest } from '../CompanyList/types'

import { CompanyFormSchema2 } from '../CompanyForm/types'
import { ADMIN_PREFIX_PATH } from '@/constants/route.constant'

const CompanyEdit = () => {
    const { id } = useParams()

    const navigate = useNavigate()

    const { data, isLoading } = useSWR(
        [`/api/companies/${id}`, { id: id as string }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) => apiGetCompany<Company, { id: string }>(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnReconnect: false,
        },
    )
    const [discardConfirmationOpen, setDiscardConfirmationOpen] =
        useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const handleFormSubmit = async (values: UpdateCompanyRequest) => {
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
            const res = await apiUpdateCompany(id, values)
            console.log(res)
            toast.push(
                <Notification type="success">Company updated!</Notification>,
                { placement: 'top-center' },
            )
            navigate(`${ADMIN_PREFIX_PATH}/company/company-list`)
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

    // const orderFormProps = useMemo(() => {
    //     const products = data
    //         ? data.product.map(
    //               ({ id, name, productCode, img, price, quantity }) => {
    //                   return {
    //                       id,
    //                       name,
    //                       productCode,
    //                       img,
    //                       price,
    //                       quantity,
    //                       stock: 0,
    //                   }
    //               },
    //           )
    //         : []

    //     const defaultValues = {
    //         firstName: data?.customer.name || '',
    //         lastName: data?.customer.lastName || '',
    //         email: data?.customer.email || '',
    //         dialCode: data?.customer.dialCode || '',
    //         phoneNumber: data?.customer.phoneNumber || '',
    //         country: data?.customer.country || '',
    //         address: data?.customer.address || '',
    //         postcode: data?.customer.postcode || '',
    //         city: data?.customer.city || '',
    //         paymentMethod: 'paypal',
    //         paypalEmail: data?.customer.email,
    //     } as OrderFormSchema

    //     return {
    //         defaultProducts: products,
    //         defaultValues,
    //     }
    // }, [data])
    const getDefaultValues = () => {
        if (data) {
            const { category, commercial_id, name, location } = data

            return {
                name,
                location,
                commercial_id,
                category,
            }
        }

        return {}
    }

    return (
        <Loading loading={isLoading}>
            <CompanyForm
                onFormSubmit={handleFormSubmit}
                defaultValues={getDefaultValues() as CompanyFormSchema2}
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
            </CompanyForm>
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

export default CompanyEdit
