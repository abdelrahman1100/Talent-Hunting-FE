import Card from '@/components/ui/Card'
import { Controller } from 'react-hook-form'
import { FormItem } from '@/components/ui/Form'
import { useUserFormStore } from '../store/UserFormStore'
import { Select } from '@/components/ui'
import type { FormSectionBaseProps } from '../types'

const GenderNationSelectSection = ({
    control,
    errors,
}: FormSectionBaseProps) => {
    const { genderList, nationalityList } = useUserFormStore()

    console.log(genderList, nationalityList)

    return (
        <Card id="">
            <h4 className="mb-6">Select Gender and Nationality (Optional)</h4>

            {/* Gender Select */}
            <Controller
                name="gender_id"
                control={control}
                render={({ field }) => {
                    return (
                        <FormItem
                            label="Gender (Optional)"
                            invalid={Boolean(errors.gender_id)}
                            errorMessage={errors.gender_id?.message}
                            className="mb-4"
                        >
                            <Select
                                placeholder="Please Select Gender (Optional)"
                                options={genderList.map((gender) => ({
                                    value: gender.id,
                                    label: gender.label,
                                }))}
                                value={
                                    genderList
                                        .map((gender) => ({
                                            value: gender.id,
                                            label: gender.label,
                                        }))
                                        .find(
                                            (opt) => opt.value === field.value,
                                        ) || null
                                }
                                onChange={(option) =>
                                    field.onChange(option?.value)
                                }
                            />
                        </FormItem>
                    )
                }}
            />

            {/* Nationality Select */}
            <Controller
                name="nationality_id"
                control={control}
                render={({ field }) => {
                    return (
                        <FormItem
                            label="Nationality (Optional)"
                            invalid={Boolean(errors.nationality_id)}
                            errorMessage={errors.nationality_id?.message}
                            className="mb-4"
                        >
                            <Select
                                placeholder="Please Select Nationality (Optional)"
                                options={nationalityList.map((nationality) => ({
                                    value: nationality.id,
                                    label: nationality.label,
                                }))}
                                value={
                                    nationalityList
                                        .map((nationality) => ({
                                            value: nationality.id,
                                            label: nationality.label,
                                        }))
                                        .find(
                                            (opt) => opt.value === field.value,
                                        ) || null
                                }
                                onChange={(option) =>
                                    field.onChange(option?.value)
                                }
                            />
                        </FormItem>
                    )
                }}
            />
        </Card>
    )
}

export default GenderNationSelectSection
