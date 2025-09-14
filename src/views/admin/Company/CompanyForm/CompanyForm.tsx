import { useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Affix from '@/components/shared/Affix'
import Card from '@/components/ui/Card'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import Navigator from './components/Navigator'
import { useCompanyFormStore } from './store/CompanyFormStore'
import useLayoutGap from '@/utils/hooks/useLayoutGap'
import useResponsive from '@/utils/hooks/useResponsive'
import useSWR from 'swr'
import isEmpty from 'lodash/isEmpty'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { ReactNode } from 'react'
import type { CompanyFormSchema2, selectedCategory } from './types'
import type { TableQueries, CommonProps } from '@/@types/common'
import { apiGetCompaniesList } from '@/services/CompanyService'
import { apiGetCategoriesList } from '@/services/CategoryService'
import { GetCategoriesListResponse } from '@/views/admin/category/CategoryList/types'
// import { CategoryFormSchema } from '@/admin/views/category/CategoryForm/types'
import ProductSelectSection from './components/CategorySelectSection'
import ImageSection from './components/CompanyImageSection'
import { Company } from '../CompanyList/types'
import CategorySelectSection from './components/CategorySelectSection'
import CompanyDetailSection from './components/CustomerDetailSection'

type CompanyFormProps = {
    children: ReactNode
    onFormSubmit: (values: CompanyFormSchema) => void
    defaultValues?: CompanyFormSchema2
    defaultCategories?: selectedCategory[]
    newOrder?: boolean
} & CommonProps

const validationSchema = z.object({
    name: z
        .string()
        .min(1, { message: 'Company name is required!' })
        .min(2, { message: 'Company name must be at least 2 characters!' })
        .max(100, { message: 'Company name must not exceed 100 characters!' })
        .regex(/^[a-zA-Z0-9\s\-_&().]+$/, {
            message:
                'Company name can only contain letters, numbers, spaces, and common punctuation!',
        }),
    location: z
        .string()
        .min(1, { message: 'Location is required!' })
        .min(2, { message: 'Location must be at least 2 characters!' })
        .max(200, { message: 'Location must not exceed 200 characters!' })
        .regex(/^[a-zA-Z0-9\s\-_,.()]+$/, {
            message:
                'Location can only contain letters, numbers, spaces, and common punctuation!',
        }),
    commercial_id: z
        .string()
        .min(1, { message: 'Commercial image is required!' }),
    category_id: z.number().optional().nullable(),
})

export type CompanyFormSchema = z.infer<typeof validationSchema>

const CompanyForm = (props: CompanyFormProps) => {
    const { onFormSubmit, children, defaultValues, defaultCategories } = props

    const { setCategoryOption, setCategoryList, setSelectedCategory } =
        useCompanyFormStore()

    const { getTopGapValue } = useLayoutGap()

    const { larger } = useResponsive()

    useSWR(
        [
            '/api/categories',
            {
                pageIndex: 1,
                pageSize: 10,
                query: '',
                sort: {
                    order: '',
                    key: '',
                },
            } as TableQueries,
        ],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) =>
            apiGetCategoriesList<GetCategoriesListResponse, TableQueries>(
                params,
            ),
        {
            revalidateOnFocus: false,
            onSuccess: (resp) => {
                const list = resp.list.map(({ id, name, status }) => ({
                    label: name,
                    value: id,
                    // img: `data:image/jpeg;base64,${commercial_id}`,
                    status: status,
                }))
                setCategoryList(resp.list)
                setCategoryOption(list)
            },
        },
    )

    const {
        handleSubmit,
        reset,
        watch,
        formState: { errors },
        control,
    } = useForm<CompanyFormSchema>({
        resolver: zodResolver(validationSchema),
        defaultValues: defaultValues
            ? {
                  ...defaultValues,
                  category_id: defaultValues?.category?.id || undefined,
                  commercial_id: defaultValues.commercial_id, // Base64
              }
            : {
                  name: '',
                  location: '',
                  commercial_id: '',
                  category_id: undefined,
              },
    })

    useEffect(() => {
        console.log('defaultCategories', defaultValues)
        if (defaultCategories) {
            setSelectedCategory(defaultCategories)
        }
        if (!isEmpty(defaultValues)) {
            let base64String = ''
            if (
                defaultValues.commercial_id &&
                typeof defaultValues.commercial_id !== 'string'
            ) {
                const buffer = new Uint8Array(
                    defaultValues.commercial_id as ArrayLike<number>,
                )
                base64String = btoa(String.fromCharCode(...buffer))
            } else if (typeof defaultValues.commercial_id === 'string') {
                base64String = defaultValues.commercial_id
            }
            reset({
                ...defaultValues,
                category_id: defaultValues.category?.id || undefined,
                commercial_id: base64String,
            })
        }
        return () => {
            setSelectedCategory([])
        }
    }, [defaultCategories, defaultValues, reset, setSelectedCategory])

    const onSubmit = (values: CompanyFormSchema) => {
        console.log('CompanyForm onSubmit values:', values)
        console.log('Category ID value:', values.category_id)
        console.log('Category ID type:', typeof values.category_id)

        // Clean up the values - remove undefined category_id
        const cleanedValues = {
            ...values,
            ...(values.category_id !== undefined && {
                category_id: values.category_id,
            }),
        }

        // If category_id is undefined, don't include it in the submission
        if (values.category_id === undefined) {
            const { category_id, ...valuesWithoutCategory } = cleanedValues
            console.log('Submitting without category:', valuesWithoutCategory)
            onFormSubmit?.(valuesWithoutCategory as CompanyFormSchema)
        } else {
            console.log('Submitting with category:', cleanedValues)
            onFormSubmit?.(cleanedValues)
        }
    }

    // const selectedPaymentMethod = watch('paymentMethod', '')

    return (
        <div className="flex">
            <Form
                className="flex-1 flex flex-col overflow-hidden"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Container>
                    <div className="flex gap-4">
                        {larger.xl && (
                            <div className="w-[360px]">
                                <Affix offset={getTopGapValue()}>
                                    <Card>
                                        <Navigator />
                                    </Card>
                                </Affix>
                            </div>
                        )}

                        <div className="flex-1">
                            <div className="flex flex-col gap-4">
                                <ImageSection
                                    control={control}
                                    errors={errors}
                                />
                                <CompanyDetailSection
                                    control={control}
                                    errors={errors}
                                />
                                <CategorySelectSection
                                    control={control}
                                    errors={errors}
                                />

                                {/* <PaymentMethodSection
                                    control={control}
                                    errors={errors}
                                    // selectedPaymentMethod={
                                    //     selectedPaymentMethod
                                    // }
                                /> */}
                            </div>
                        </div>
                    </div>
                </Container>
                <BottomStickyBar>{children}</BottomStickyBar>
            </Form>
        </div>
    )
}

export default CompanyForm
