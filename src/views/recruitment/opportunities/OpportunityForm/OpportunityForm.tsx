import { useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import GeneralSection from './components/GeneralSection'
import DetailsSection from './components/DetailsSection'
import SalaryDepartmentSection from './components/SalaryDepartmentSection'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import isEmpty from 'lodash/isEmpty'
import type { OpportunityFormSchema } from './types'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'

type OpportunityFormProps = {
    onFormSubmit: (values: OpportunityFormSchema) => void
    defaultValues?: OpportunityFormSchema
    departmentOptions: { value: number; label: string }[]
    newOpportunity?: boolean
} & CommonProps

const validationSchema: ZodType<OpportunityFormSchema> = z.object({
    title: z.string().min(1, { message: 'Title required!' }),
    description: z.string().min(1, { message: 'Description required!' }),
    jobType: z.string().min(1, { message: 'Job type required!' }),
    salary_min: z.number().min(1, { message: 'Minimum salary required!' }),
    salary_max: z.number().min(1, { message: 'Maximum salary required!' }),
    departmentId: z.number({ invalid_type_error: 'Department required!' }),
    publishScope: z.string().min(1, { message: 'Publish scope required!' }),
})

const OpportunitiesForm = (props: OpportunityFormProps) => {
    const {
        onFormSubmit,
        defaultValues = {},
        departmentOptions = [],
        children,
    } = props

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = useForm<OpportunityFormSchema>({
        defaultValues: {
            ...defaultValues,
        },
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
    }, [JSON.stringify(defaultValues)])

    const onSubmit = (values: OpportunityFormSchema) => {
        onFormSubmit?.(values)
    }

    return (
        <Form
            className="flex w-full h-full"
            containerClassName="flex flex-col w-full justify-between"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Container>
                <div className="flex flex-col xl:flex-row gap-4">
                    {/* Left column: General & Details */}
                    <div className="flex flex-col gap-4 flex-[2] min-w-0">
                        <GeneralSection control={control} errors={errors} />
                        <DetailsSection control={control} errors={errors} />
                    </div>
                    {/* Right column: Salary & Department */}
                    <div className="flex flex-col gap-4 flex-1 min-w-[320px] xl:max-w-[400px]">
                        <SalaryDepartmentSection
                            control={control}
                            errors={errors}
                            departmentOptions={departmentOptions}
                        />
                    </div>
                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default OpportunitiesForm
