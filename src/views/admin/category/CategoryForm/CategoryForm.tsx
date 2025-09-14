import { useEffect, forwardRef, useImperativeHandle } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import GeneralSection from './components/GeneralSection'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import isEmpty from 'lodash/isEmpty'
import type { CommonProps } from '@/@types/common'
import { CategoryFormSchema } from './types'

// Validation schema
export const validationSchema = z.object({
    name: z
        .string()
        .min(1, { message: 'Category name is required!' })
        .min(2, { message: 'Category name must be at least 2 characters!' })
        .max(100, { message: 'Category name must not exceed 100 characters!' })
        .regex(/^[a-zA-Z0-9\s\-_&()]+$/, {
            message:
                'Category name can only contain letters, numbers, spaces, hyphens, underscores, ampersands, and parentheses!',
        }),
    description: z
        .string()
        .min(5, { message: 'Description must be at least 5 characters!' })
        .max(500, { message: 'Description must not exceed 500 characters!' })
        .optional()
        .or(z.literal('')),
})

type CategoryFormProps = {
    onFormSubmit: (values: CategoryFormSchema) => void
    defaultValues?: Partial<CategoryFormSchema>
    newCategory?: boolean
} & CommonProps

const CategoryForm = forwardRef<{ resetForm: () => void }, CategoryFormProps>(
    (
        {
            onFormSubmit,
            defaultValues = {
                name: '',
                description: '',
            },
            children,
        },
        ref,
    ) => {
        const {
            handleSubmit,
            reset,
            formState: { errors },
            control,
        } = useForm<CategoryFormSchema>({
            defaultValues,
            resolver: zodResolver(validationSchema),
        })

        useImperativeHandle(ref, () => ({
            resetForm: () => {
                console.log('Resetting form to default values')
                reset({
                    name: '',
                    description: '',
                })
            },
        }))

        useEffect(() => {
            if (!isEmpty(defaultValues)) {
                reset(defaultValues)
            }
        }, [defaultValues, reset])

        const onSubmit = (values: CategoryFormSchema) => {
            console.log('Form submitted with values:', values)
            onFormSubmit(values)
        }

        return (
            <Form
                className="flex w-full h-full"
                containerClassName="flex flex-col w-full justify-between"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Container>
                    <div className="flex flex-col xl:flex-row gap-4">
                        <div className="gap-4 flex flex-col flex-auto">
                            <GeneralSection control={control} errors={errors} />
                        </div>
                        {/* <div className="lg:min-w-[440px] 2xl:w-[500px] gap-4 flex flex-col">
                        <ImageSection control={control} errors={errors} />
                    </div> */}
                    </div>
                </Container>
                <BottomStickyBar>{children}</BottomStickyBar>
            </Form>
        )
    },
)

CategoryForm.displayName = 'CategoryForm'

export default CategoryForm
