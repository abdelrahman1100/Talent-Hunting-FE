import Card from '@/components/ui/Card'
import Select from '@/components/ui/Select'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps } from '../types'

const jobTypeOptions = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'remote', label: 'Remote' },
    { value: 'internship', label: 'Internship' },
    { value: 'hybrid', label: 'Hybrid' },
]
const publishScopeOptions = [
    { value: 'internal', label: 'Internal' },
    { value: 'external', label: 'External' },
]

const DetailsSection = ({ control, errors }: FormSectionBaseProps) => (
    <Card>
        <h4 className="mb-6">Details</h4>
        <FormItem
            label="Job Type"
            invalid={Boolean(errors.jobType)}
            errorMessage={errors.jobType?.message}
        >
            <Controller
                name="jobType"
                control={control}
                render={({ field }) => (
                    <Select
                        options={jobTypeOptions}
                        value={jobTypeOptions.find(
                            (opt) => opt.value === field.value,
                        )}
                        onChange={(option) => field.onChange(option?.value)}
                    />
                )}
            />
        </FormItem>
        <FormItem
            label="Publish Scope"
            invalid={Boolean(errors.publishScope)}
            errorMessage={errors.publishScope?.message}
        >
            <Controller
                name="publishScope"
                control={control}
                render={({ field }) => (
                    <Select
                        options={publishScopeOptions}
                        value={publishScopeOptions.find(
                            (opt) => opt.value === field.value,
                        )}
                        onChange={(option) => field.onChange(option?.value)}
                    />
                )}
            />
        </FormItem>
    </Card>
)

export default DetailsSection
