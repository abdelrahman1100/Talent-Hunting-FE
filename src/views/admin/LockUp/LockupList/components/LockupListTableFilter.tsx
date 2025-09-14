import { useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import Input from '@/components/ui/Input'
import { Form, FormItem } from '@/components/ui/Form'
// import useCategoryList from '../../CategoryList/hooks/useCategoryList'
import useDepartmentList from '../hooks/useLockUpList'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
// import Select from '@/components/ui/Select'
import { OptionProps } from 'react-select/dist/declarations/src/components/Option'
import Badge from '@/components/ui/Badge'
import Select, { Option as DefaultOption } from '@/components/ui/Select'

import { TbFilter, TbMinus } from 'react-icons/tb'
import useLockUpList from '../hooks/useLockUpList'

const validationSchema = z.object({
    name: z.string().optional(),
    status: z.string().optional(), // Assuming status is a string, adjust as necessary
})

type FormSchema = z.infer<typeof validationSchema>

const LockupListTableFilter = () => {
    const [dialogIsOpen, setIsOpen] = useState(false)

    const { filterData, setFilterData } = useLockUpList()

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = () => {
        setIsOpen(false)
    }

    const { handleSubmit, reset, control } = useForm<FormSchema>({
        defaultValues: filterData,
        resolver: zodResolver(validationSchema),
    })

    const onSubmit = (values: FormSchema) => {
        setFilterData(values)
        setIsOpen(false)
    }
    type Option = {
        value: string
        label: string
        className: string
    }

    const LockupStatusOption: Option[] = [
        { value: 'active', label: 'Active', className: 'bg-emerald-500' },
        { value: 'inactive', label: 'Inactive', className: 'bg-red-500' },
    ]

    const CustomSelectOption = (props: OptionProps<Option>) => {
        return (
            <DefaultOption<Option>
                {...props}
                customLabel={(data, label) => (
                    <span className="flex items-center gap-2">
                        <Badge className={data.className} />
                        <span className="ml-2 rtl:mr-2">{label}</span>
                    </span>
                )}
            />
        )
    }

    return (
        <>
            <Button icon={<TbFilter />} onClick={openDialog}>
                Filter
            </Button>
            <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <h4 className="mb-4">Filter Lockups</h4>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormItem label="Lockup Name">
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Search by category name"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>

                    {/* i need stats multi  select active or in active */}
                    <FormItem label="Lockup status">
                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <Select<Option>
                                    options={LockupStatusOption}
                                    {...field}
                                    value={LockupStatusOption.filter(
                                        (option) =>
                                            option.value === field.value,
                                    )}
                                    components={{
                                        Option: CustomSelectOption,
                                        // Control: CustomControl,
                                    }}
                                    onChange={(option) =>
                                        field.onChange(option?.value)
                                    }
                                />
                            )}
                        />
                    </FormItem>
                    <div className="flex justify-end items-center gap-2 mt-4">
                        <Button type="button" onClick={() => reset()}>
                            Reset
                        </Button>
                        <Button type="submit" variant="solid">
                            Apply
                        </Button>
                    </div>
                </Form>
            </Dialog>
        </>
    )
}

export default LockupListTableFilter
