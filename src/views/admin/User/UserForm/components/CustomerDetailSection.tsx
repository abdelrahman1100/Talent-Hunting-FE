import { Controller } from 'react-hook-form'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import type { FormSectionBaseProps } from '../types'

type CustomerDetailSectionProps = FormSectionBaseProps & {
    isEditMode?: boolean
}

const UserDetailSection = ({
    control,
    errors,
    isEditMode = false,
}: CustomerDetailSectionProps) => {
    return (
        <Card id="userInformation">
            <h4 className="mb-6">User Information</h4>

            {/* Name */}
            <FormItem
                label="Name *"
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
                            placeholder="Enter full name"
                            {...field}
                        />
                    )}
                />
            </FormItem>

            {/* email */}
            <FormItem
                label="Email *"
                invalid={Boolean(errors.email)}
                errorMessage={errors.email?.message}
            >
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="email"
                            autoComplete="email"
                            placeholder="Enter email address"
                            {...field}
                        />
                    )}
                />
            </FormItem>

            {/* Password - Only show when creating a new user */}
            {!isEditMode && (
                <FormItem
                    label="Password"
                    invalid={Boolean(errors.password)}
                    errorMessage={errors.password?.message}
                >
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="password"
                                autoComplete="new-password"
                                placeholder="Password"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
            )}
        </Card>
    )
}

export default UserDetailSection
