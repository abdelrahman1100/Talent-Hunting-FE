import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import RichTextEditor from '@/components/shared/RichTextEditor'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps } from '../types'

const GeneralSection = ({ control, errors }: FormSectionBaseProps) => (
    <Card>
        <h4 className="mb-6">General Information</h4>
        <FormItem
            label="Title"
            invalid={Boolean(errors.title)}
            errorMessage={errors.title?.message}
        >
            <Controller
                name="title"
                control={control}
                render={({ field }) => (
                    <Input
                        type="text"
                        autoComplete="off"
                        placeholder="Opportunity Title"
                        {...field}
                    />
                )}
            />
        </FormItem>
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
                        content={field.value}
                        invalid={Boolean(errors.description)}
                        onChange={({ html }) => {
                            field.onChange(html)
                        }}
                    />
                )}
            />
        </FormItem>
    </Card>
)

export default GeneralSection
