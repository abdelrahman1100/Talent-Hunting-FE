import { useState } from 'react'
import Button from '@/components/ui/Button'
import Drawer from '@/components/ui/Drawer'
import Select, { Option as DefaultOption } from '@/components/ui/Select'
import { Form, FormItem } from '@/components/ui/Form'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Input from '@/components/ui/Input/Input'
import { TbFilter } from 'react-icons/tb'
import useCompanyList from '../hooks/useUserlist'
import { apiGetCategoriesList } from '@/services/CategoryService'
import useSWR from 'swr'
import { TableQueries } from '@/@types/common'
import { apiGetUserList } from '@/services/UserService'
import { GetUserResponse } from '../types'

type Option = {
    value: number | string
    label: string
    className?: string
}

const statusOption: Option[] = [
    { value: 'active', label: 'Active', className: 'bg-emerald-500' },
    { value: 'inactive', label: 'Inactive', className: 'bg-red-500' },
]

const CustomSelectOption = (props: any) => {
    return (
        <DefaultOption
            {...props}
            customLabel={(data: any, label: string) => (
                <span className="flex items-center gap-2">
                    {data.className && (
                        <span
                            className={`w-2 h-2 rounded-full ${data.className}`}
                        />
                    )}
                    <span className="ml-2 rtl:mr-2">{label}</span>
                </span>
            )}
        />
    )
}

const validationSchema = z.object({
    name: z.string().optional(),
    // location: z.string().optional(),
    status: z.string().optional(),
    // employee_count: z.string().optional(),
    // department_id: z.string().optional(),
})

type FormSchema = z.infer<typeof validationSchema>

const userListFilter = () => {
    const [filterIsOpen, setFilterIsOpen] = useState(false)
    const { filterData, setFilterData } = useCompanyList()
    const { handleSubmit, control } = useForm<FormSchema>({
        defaultValues: filterData,
        resolver: zodResolver(validationSchema),
    })

    const onSubmit = (values: FormSchema) => {
        setFilterData(values)
        setFilterIsOpen(false)
    }

    const { data: userResp } = useSWR(
        [
            '/api/users',
            {
                pageIndex: 1,
                pageSize: 100,
                query: '',
                sort: { order: '', key: '' },
            } as TableQueries,
        ],
        ([_, params]) =>
            apiGetUserList<GetUserResponse, TableQueries>(
                params,
            ),
        { revalidateOnFocus: false },
    )

    const userOptions: Option[] =
        userResp?.list?.map((c: any) => ({
            label: c.name,
            value: String(c.id),
        })) || []

    return (
        <>
            <Button icon={<TbFilter />} onClick={() => setFilterIsOpen(true)}>
                Filter
            </Button>
            <Drawer
                title="Filter"
                isOpen={filterIsOpen}
                onClose={() => setFilterIsOpen(false)}
                onRequestClose={() => setFilterIsOpen(false)}
            >
                <Form
                    className="h-full"
                    containerClassName="flex flex-col justify-between h-full"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="space-y-4">
                        <FormItem label="Category Name">
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

                        {/* <FormItem label="Cop">
                            <Controller
                                name="location"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="text"
                                        autoComplete="off"
                                        placeholder="Search by category location"
                                        {...field}
                                    />
                                )}
                            />
                        </FormItem> */}

                        <FormItem label="Status">
                            <Controller
                                name="status"
                                control={control}
                                render={({ field }) => (
                                    <Select<Option>
                                        {...field}
                                        options={statusOption}
                                        value={
                                            statusOption.find(
                                                (o) => o.value === field.value,
                                            ) || null
                                        }
                                        components={{
                                            Option: CustomSelectOption,
                                        }}
                                        onChange={(option) =>
                                            field.onChange(option?.value)
                                        }
                                        placeholder="Select Status"
                                    />
                                )}
                            />
                        </FormItem>

                        {/* <FormItem label="Category">
                            <Controller
                                name="category_id"
                                control={control}
                                render={({ field }) => (
                                    <Select<Option>
                                        {...field}
                                        options={categoryOptions}
                                        value={
                                            categoryOptions.find(
                                                (o) => o.value === field.value,
                                            ) || null
                                        }
                                        onChange={(option) =>
                                            field.onChange(option?.value)
                                        }
                                        placeholder="Select Category"
                                    />
                                )}
                            />
                        </FormItem> */}

                        {/* <FormItem label="Employee Count">
                            <Controller
                                name="employee_count"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="number"
                                        placeholder="Employee count"
                                        onChange={(e) =>
                                            field.onChange(e.target.value)
                                        }
                                    />
                                )}
                            />
                        </FormItem> */}
                    </div>

                    <Button variant="solid" type="submit" className="mt-4">
                        Query
                    </Button>
                </Form>
            </Drawer>
        </>
    )
}

export default userListFilter
