import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Controller, useFieldArray } from 'react-hook-form'
import type { FormSectionBaseProps } from '../types'
// import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { HiMinus } from 'react-icons/hi'

type GeneralSectionProps = FormSectionBaseProps
 
const GeneralSection = ({ control, errors }: GeneralSectionProps) => {

     const { fields, append, remove } = useFieldArray({
        name: 'details',
        control
    })
    return (
    <>
     <div className='w-[95%]'>
            <Card >
            <h4 className="mb-6">LockUp Information</h4>

             <div>
                <div className="mb-10">
                    {/* <h5 className="mb-4">LockUp List</h5> */}
                    <FormItem
                    // className='w-[75%]'
                        layout="vertical"
                        label="Name"
                        invalid={Boolean(errors.name)}
                        errorMessage={errors.name?.message}
                    >
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) =>
                                <Input
                                    placeholder="ex: marital Status"
                                    {...field}
                                />
                            }
                        />
                    </FormItem>

                     <FormItem
                    //    className='w-[75%]'
                        layout="vertical"
                        label="Label"
                        invalid={Boolean(errors.label)}
                        errorMessage={errors.label?.message}
                    >
                        <Controller
                            name="label"
                            control={control}
                            render={({ field }) =>
                                <Input
                                    placeholder="ex: Marital Status"
                                    {...field}
                                />
                            }
                        />
                    </FormItem>
                </div>
                {fields.map((userField, index) => (
                    <div key={userField.id}>
                        <FormItem
                            label="Label"
                            invalid={Boolean(errors.details?.[index]?.label?.message)}
                            errorMessage={errors.details?.[index]?.label?.message}
                        >
                            <Controller
                                name={`details.${index}.label`}
                                control={control}
                                render={({ field }) =>
                                    <Input
                                        type="text"
                                        autoComplete="off"
                                        placeholder="ex: Single"
                                        {...field}
                                    />
                                }
                            />
                        </FormItem>
                        <FormItem
                            label="Value"
                            invalid={Boolean(errors.details?.[index]?.value?.message)}
                            errorMessage={errors.details?.[index]?.value?.message}
                        >
                            <Controller
                                name={`details.${index}.value`}
                                control={control}
                                render={({ field }) =>
                                    <Input
                                        type="text"
                                        autoComplete="off"
                                        placeholder="Ex: S"
                                        {...field}
                                    />
                                }
                            />
                        </FormItem>
                        <Button
                            type="button"
                            shape="circle"
                            size="sm"
                            icon={<HiMinus />}
                            onClick={() =>remove(index)}
                        />
                    </div>
                ))}
                <div className="flex items-center gap-2">
                    <Button
                        type="button"
                        className="ltr:mr-2 rtl:ml-2"
                        onClick={() => {
                            append({
                                label: '',
                                value: '',
                            })
                        }}
                    >
                        Add a Details
                    </Button>
                    {/* <Button
                        type="submit"
                        variant="solid"
                    >
                        Submit
                    </Button> */}
                </div>
            </div>
        
        </Card>
     </div>
    </>
    )
}

export default GeneralSection
