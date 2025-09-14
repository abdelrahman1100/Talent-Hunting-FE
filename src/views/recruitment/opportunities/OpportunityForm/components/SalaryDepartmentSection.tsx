import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps } from '../types'

type SalaryDepartmentSectionProps = FormSectionBaseProps & {
    departmentOptions: { value: number; label: string }[]
}

const SalaryDepartmentSection = ({
    control,
    errors,
    departmentOptions = [],
}: SalaryDepartmentSectionProps) => (
    <Card>
        <h4 className="mb-6">Salary & Department</h4>
        <FormItem
            label="Minimum Salary"
            invalid={Boolean(errors.salary_min)}
            errorMessage={errors.salary_min?.message}
        >
            <Controller
                name="salary_min"
                control={control}
                render={({ field }) => (
                    <Input
                        type="number"
                        autoComplete="off"
                        placeholder="Minimum Salary"
                        value={field.value ?? ''}
                        onChange={(e) => {
                            const val = e.target.value
                            field.onChange(val === '' ? undefined : Number(val))
                        }}
                    />
                )}
            />
        </FormItem>
        <FormItem
            label="Maximum Salary"
            invalid={Boolean(errors.salary_max)}
            errorMessage={errors.salary_max?.message}
        >
            <Controller
                name="salary_max"
                control={control}
                render={({ field }) => (
                    <Input
                        type="number"
                        autoComplete="off"
                        placeholder="Maximum Salary"
                        value={field.value ?? ''}
                        onChange={(e) => {
                            const val = e.target.value
                            field.onChange(val === '' ? undefined : Number(val))
                        }}
                    />
                )}
            />
        </FormItem>
        <FormItem
            label="Department"
            invalid={Boolean(errors.departmentId)}
            errorMessage={errors.departmentId?.message}
        >
            <Controller
                name="departmentId"
                control={control}
                render={({ field }) => (
                    <Select
                        options={departmentOptions}
                        value={departmentOptions.find(
                            (opt) => opt.value === field.value,
                        )}
                        onChange={(option) => field.onChange(option?.value)}
                    />
                )}
            />
        </FormItem>
    </Card>
)

export default SalaryDepartmentSection
