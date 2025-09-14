import Card from '@/components/ui/Card'
import Table from '@/components/ui/Table'
import { Controller } from 'react-hook-form'
import { FormItem } from '@/components/ui/Form'

import { useUserFormStore } from '../store/UserFormStore'

import { Select } from '@/components/ui'
import useResponsive from '@/utils/hooks/useResponsive'

import type { FormSectionBaseProps } from '../types'
import isEmpty from 'lodash/isEmpty'

const DepartmentRoleSelectSection = ({
    control,
    errors,
    isEditMode = false,
}: FormSectionBaseProps & { isEditMode?: boolean }) => {
    const { departmentList, roleList } = useUserFormStore()

    return (
        <Card id="selectedCategories">
            <h4 className="mb-6">Select Department and Roles</h4>

            {/* Department Select */}
            <Controller
                name="department_id"
                control={control}
                render={({ field }) => {
                    const selected = departmentList.find(
                        (c) => c.id === field.value,
                    )

                    const handleSelectChange = (
                        option: {
                            value: number
                            label: string
                            status: string
                        } | null,
                    ) => {
                        if (!option) {
                            field.onChange(null)
                            return
                        }

                        const dept = departmentList.find(
                            (c) => c.id === option.value,
                        )
                        field.onChange(dept ? dept.id : null)
                    }

                    return (
                        <FormItem
                            label="Department (Optional)"
                            invalid={Boolean(errors.department_id)}
                            errorMessage={errors.department_id?.message}
                            className="mb-4"
                        >
                            <Select
                                placeholder="Please Select Department (Optional)"
                                options={departmentList.map((dept) => ({
                                    value: dept.id,
                                    label: dept.name,
                                    status: dept.status ?? '',
                                }))}
                                value={
                                    field.value
                                        ? {
                                              value:
                                                  selected?.id ?? field.value,
                                              label: selected?.name || '',
                                              status: selected?.status || '',
                                          }
                                        : null
                                }
                                onChange={(option) =>
                                    handleSelectChange(option!)
                                }
                            />
                        </FormItem>
                    )
                }}
            />

            {/* Roles Multi Select */}
            <Controller
                name="role_ids"
                control={control}
                render={({ field }) => {
                    return (
                        <FormItem
                            label={
                                isEditMode
                                    ? 'Select Roles (Optional)'
                                    : 'Select Roles *'
                            }
                            invalid={Boolean(errors.role_ids)}
                            errorMessage={errors.role_ids?.message}
                            className="mt-6"
                        >
                            <Select
                                isMulti
                                placeholder={
                                    isEditMode
                                        ? 'Select Roles (Optional)'
                                        : 'Please select at least one role *'
                                }
                                options={roleList.map((role) => ({
                                    value: role.id,
                                    label: role.name,
                                    status: role.status ?? '',
                                }))}
                                value={roleList
                                    .filter((r) => field.value?.includes(r.id))
                                    .map((r) => ({
                                        value: r.id,
                                        label: r.name,
                                        status: r.status,
                                    }))}
                                onChange={(options) =>
                                    field.onChange(
                                        options
                                            ? options.map((o) => o.value)
                                            : [],
                                    )
                                }
                            />
                        </FormItem>
                    )
                }}
            />
        </Card>
    )
}

export default DepartmentRoleSelectSection
