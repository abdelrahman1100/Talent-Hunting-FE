import { useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Affix from '@/components/shared/Affix'
import Card from '@/components/ui/Card'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
// import Navigator from './components/Navigator'
import { useDepartmentFormStore } from './store/DepartmentFormStore'
import useLayoutGap from '@/utils/hooks/useLayoutGap'
import useResponsive from '@/utils/hooks/useResponsive'
import useSWR from 'swr'
import isEmpty from 'lodash/isEmpty'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ReactNode } from 'react'
import type {
    DepartmentFormSchema2,
    GetCompanyListResponse,
    selectedCompany,
} from './types'
import type { TableQueries, CommonProps } from '@/@types/common'
import { apiGetCompaniesList } from '@/services/CompanyService'
import GeneralSection from './components/GeneralSection'
import DepartmentSelectSection from './components/CategorySelectSection'

type DepartmentFormProps = {
    children: ReactNode
    onFormSubmit: (values: DepartmentFormSchema) => void
    defaultValues?: DepartmentFormSchema2
    defaultCompanies?: selectedCompany[]
    newOrder?: boolean
} & CommonProps

const validationSchema = z.object({
    name: z.string().min(1, { message: ' name required' }),
    company_id: z.number().min(1, { message: ' Department required' }),
})

export type DepartmentFormSchema = z.infer<typeof validationSchema>

const DepartmentForm = (props: DepartmentFormProps) => {
    const { onFormSubmit, children, defaultValues, defaultCompanies } = props

    const { setCompanyOption, setCompanyList, setSelectedCompany } =
        useDepartmentFormStore()

    const { getTopGapValue } = useLayoutGap()

    const { larger } = useResponsive()

    useSWR(
        [
            '/api/companies',
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
            apiGetCompaniesList<GetCompanyListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
            onSuccess: (resp) => {
                const list = resp.list.map(({ id, name, status }) => ({
                    label: name,
                    value: id,
                    // img: `data:image/jpeg;base64,${commercial_id}`,
                    status: status,
                }))
                setCompanyList(resp.list)
                setCompanyOption(list)
            },
        },
    )

    const {
        handleSubmit,
        reset,
        watch,
        formState: { errors },
        control,
    } = useForm<DepartmentFormSchema>({
        resolver: zodResolver(validationSchema),
        defaultValues: defaultValues
            ? {
                  ...defaultValues,
                  company_id: defaultValues?.company
                      ? defaultValues.company.id
                      : undefined,
                  //   commercial_id: defaultValues.commercial_id, // Base64
              }
            : undefined,
    })

    useEffect(() => {
        console.log('defaultCategories', defaultValues)
        if (defaultCompanies) {
            setSelectedCompany(defaultCompanies)
        }
        if (!isEmpty(defaultValues)) {
            reset({
                ...defaultValues,
                company_id: defaultValues.company
                    ? defaultValues.company.id
                    : undefined,
                // commercial_id: base64String,
            })
        }
        return () => {
            setSelectedCompany([])
        }
    }, [defaultCompanies, defaultValues, reset, setSelectedCompany])

    const onSubmit = (values: DepartmentFormSchema) => {
        onFormSubmit?.(values)
    }

    // const selectedPaymentMethod = watch('paymentMethod', '')

    return (
        <div className="flex">
            <Form
                className="flex-1 flex flex-col overflow-hidden"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Container>
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1">
                            <GeneralSection control={control} errors={errors} />
                        </div>
                        <div className="flex-1">
                            <DepartmentSelectSection
                                control={control}
                                errors={errors}
                            />
                        </div>
                    </div>
                </Container>
                <BottomStickyBar>{children}</BottomStickyBar>
            </Form>
        </div>
    )
}

export default DepartmentForm
