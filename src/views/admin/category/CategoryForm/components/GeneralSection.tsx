import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps } from '../types'
import { RichTextEditor } from '@/components/shared'

type GeneralSectionProps = FormSectionBaseProps

const GeneralSection = ({ control, errors }: GeneralSectionProps) => {
    return (
        <Card>
            <h4 className="mb-6">Category Information</h4>

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
                            placeholder="Enter category name"
                            {...field}
                        />
                    )}
                />
            </FormItem>

            {/* Email */}
            <FormItem
                label="Description"
                invalid={Boolean(errors.description)}
                errorMessage={errors.description?.message}
            >
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <RichTextEditor
                            content={field.value || ''}
                            invalid={Boolean(errors.description)}
                            onChange={({ html }) => {
                                console.log('RichTextEditor onChange:', html)
                                field.onChange(html || '')
                            }}
                            placeholder="Enter category description..."
                        />
                    )}
                />
            </FormItem>
        </Card>
    )
}

export default GeneralSection
