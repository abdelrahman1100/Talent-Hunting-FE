import { useState } from 'react'
import Button from '@/components/ui/Button'
import Select, { Option as DefaultOption } from '@/components/ui/Select'
import { Form, FormItem } from '@/components/ui/Form'
// import useOpportunityList from '../hooks/useOpportunityList'
import { TbFilter } from 'react-icons/tb'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ZodType } from 'zod'
import Drawer from '@/components/ui/Drawer'
import useApplicationList from '../hooks/useApplicationList'

type FormSchema = {
    // title: string
    status: string
    // jobType: string
    // department_id: number | undefined
    // publishScope: string
}

type Option = {
    value: string
    label: string
}

const statusOptions: Option[] = [
    { value: 'pending', label: 'Pending' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'accepted', label: 'Accepted' },
]

const validationSchema: ZodType<FormSchema> = z.object({
    // title: z.string(),
    status: z.string(),
    // jobType: z.string(),
    // department_id: z.number().optional(),
    // publishScope: z.string(),
})

const ApplicationTableFilter = () => {
    const [dialogIsOpen, setIsOpen] = useState(false)
    const { filterData, setFilterData } = useApplicationList()

    const openDialog = () => setIsOpen(true)
    const onDialogClose = () => setIsOpen(false)

    const { handleSubmit, control } = useForm<FormSchema>({
        defaultValues: filterData,
        resolver: zodResolver(validationSchema),
    })

    const onSubmit = (values: FormSchema) => {
        setFilterData(values)
        setIsOpen(false)
    }

    return (
        <>
            <Button icon={<TbFilter />} onClick={openDialog}>
                Filter
            </Button>
            <Drawer
                title="Filter"
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <Form
                    className="h-full"
                    containerClassName="flex flex-col justify-between h-full"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div>
                        <FormItem label="Status">
                            <Controller
                                name="status"
                                control={control}
                                render={({ field }) => (
                                    <Select<Option>
                                        options={statusOptions}
                                        {...field}
                                        value={statusOptions.find(
                                            (option) =>
                                                option.value === field.value,
                                        )}
                                        onChange={(option) =>
                                            field.onChange(option?.value)
                                        }
                                    />
                                )}
                            />
                        </FormItem>
                    </div>
                    <Button variant="solid" type="submit">
                        Query
                    </Button>
                </Form>
            </Drawer>
        </>
    )
}

export default ApplicationTableFilter
