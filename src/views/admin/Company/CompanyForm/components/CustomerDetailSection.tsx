import { Controller } from 'react-hook-form'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import type { FormSectionBaseProps } from '../types'

type CustomerDetailSectionProps = FormSectionBaseProps

const CompanyDetailSection = ({
    control,
    errors,
}: CustomerDetailSectionProps) => {
    return (
        <Card id="companyInformation">
            <h4 className="mb-6">Company Information</h4>

            {/* Name */}
            <FormItem
                label="Name"
                invalid={Boolean(errors.name)}
                errorMessage={errors.name?.message}
            >
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="Enter company name (e.g., Tech Solutions Inc.)"
                            {...field}
                        />
                    )}
                />
            </FormItem>

            {/* Location */}
            <FormItem
                label="Location"
                invalid={Boolean(errors.location)}
                errorMessage={errors.location?.message}
            >
                <Controller
                    name="location"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="Enter location (e.g., New York, NY, USA)"
                            {...field}
                        />
                    )}
                />
            </FormItem>
        </Card>
    )
}

export default CompanyDetailSection
