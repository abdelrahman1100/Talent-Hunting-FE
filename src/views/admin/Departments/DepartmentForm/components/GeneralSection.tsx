import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps } from '../types'

type GeneralSectionProps = FormSectionBaseProps

const GeneralSection = ({ control, errors }: GeneralSectionProps) => {
    return (
        <Card className="h-80">
            <h4 className="mb-6">Department Information</h4>

            {/* Name */}
            <FormItem
                className=""
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
                            placeholder="Enter user name"
                            {...field}
                        />
                    )}
                />
            </FormItem>

            {/* Email
            <FormItem
                label="Company ID"
                invalid={Boolean(errors.company_id)}
                errorMessage={errors.company_id?.message}
            >
                <Controller
                    name="company_id"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="Enter company ID"
                            {...field}
                        />
                    )}
                />
            </FormItem> */}
        </Card>
    )
}

export default GeneralSection
