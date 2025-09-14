import { useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Affix from '@/components/shared/Affix'
import Card from '@/components/ui/Card'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import Navigator from './components/Navigator'
import { useUserFormStore } from './store/UserFormStore'
import useLayoutGap from '@/utils/hooks/useLayoutGap'
import useResponsive from '@/utils/hooks/useResponsive'
import useSWR from 'swr'
import isEmpty from 'lodash/isEmpty'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import type { ReactNode } from 'react'

import type { TableQueries, CommonProps } from '@/@types/common'

import DepartmentRoleSelectSection from './components/DepartmentRoleSelectSection'
import CompanyDetailSection from './components/CustomerDetailSection'
import { GetRolesListResponse, UserFormSchema2 } from './types'
import { apiGetDepartmentsList } from '@/services/DepartmrntServices'
import {
    Department,
    GetDepartmentsListResponse,
} from '../../Departments/DepartmentList/types'
import { apiGetLockup, apiGetLockupDetails } from '@/services/LockUp'
import {
    detail,
    GetLockupListResponse,
    Lockup,
} from '../../LockUp/LockupForm/types'
import { apiGetRolesList } from '@/services/Roles_UserService'
import { Role } from '../UserList/types'
// import DepartmentSelectSection from './components/DepartmentSelectSection'
import ProfileImage from './components/ProfileImageSection'
import UserDetailSection from './components/CustomerDetailSection'
import GenderNationSelectSection from './components/GenderNationSelectSection'

type UserFormProps = {
    children: ReactNode
    onFormSubmit: (values: UserFormSchema) => void
    defaultValues?: UserFormSchema2
    defaultDepartment?: Department[]
    defaultGender?: detail[]
    defaultNationality?: detail[]
    defaultRole?: Role[]
    // newOrder?: boolean
} & CommonProps

// Function to create validation schema based on edit mode
const createValidationSchema = (isEditMode: boolean) =>
    z.object({
        // Required fields with strong validation
        name: z
            .string()
            .min(2, { message: 'Name must be at least 2 characters long' })
            .max(100, { message: 'Name cannot exceed 100 characters' })
            .regex(/^[a-zA-Z\s]+$/, {
                message: 'Name can only contain letters and spaces',
            })
            .trim(),

        email: z
            .string()
            .min(1, { message: 'Email is required' })
            .email({ message: 'Please enter a valid email address' })
            .max(255, { message: 'Email cannot exceed 255 characters' })
            .toLowerCase()
            .trim(),

        password: isEditMode
            ? z.string().optional() // Optional when editing
            : z
                  .string()
                  .min(8, {
                      message: 'Password must be at least 8 characters long',
                  })
                  .max(128, {
                      message: 'Password cannot exceed 128 characters',
                  })
                  .regex(
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                      {
                          message:
                              'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)',
                      },
                  ), // Required when creating with strong validation

        // Optional fields with validation when provided
        user_img: z
            .string()
            .nullable()
            .optional()
            .refine(
                (val) =>
                    val === null || val === undefined || !val || val.length > 0,
                {
                    message: 'User image URL cannot be empty if provided',
                },
            ),

        gender_id: z
            .number()
            .optional()
            .refine((val) => !val || val > 0, {
                message: 'Gender ID must be a positive number if provided',
            }),

        nationality_id: z
            .number()
            .optional()
            .refine((val) => !val || val > 0, {
                message: 'Nationality ID must be a positive number if provided',
            }),

        department_id: z
            .number()
            .nullable()
            .optional()
            .refine((val) => val === null || val === undefined || val > 0, {
                message: 'Department ID must be a positive number if provided',
            }),

        role_ids: isEditMode
            ? z
                  .array(
                      z.number().min(1, {
                          message: 'Role ID must be a positive number',
                      }),
                  )
                  .optional()
                  .refine((val) => !val || val.length > 0, {
                      message:
                          'At least one role must be selected if roles are provided',
                  })
            : z
                  .array(
                      z.number().min(1, {
                          message: 'Role ID must be a positive number',
                      }),
                  )
                  .min(1, {
                      message: 'At least one role must be assigned to the user',
                  })
                  .refine((val) => val && val.length > 0, {
                      message: 'At least one role must be assigned to the user',
                  }),
    })

export type UserFormSchema = z.infer<ReturnType<typeof createValidationSchema>>

const UserForm = (props: UserFormProps) => {
    const {
        onFormSubmit,
        children,
        defaultValues,
        defaultDepartment,
        defaultGender,
        defaultNationality,
        defaultRole,
    } = props

    // Create dynamic validation schema based on whether we're editing
    const isEditMode = !isEmpty(defaultValues)
    const validationSchema = createValidationSchema(isEditMode)

    const {
        departmentList,
        departmentOption,
        selectedDepartment,
        setDepartmentList,
        setDepartmentOption,
        setSelectedDepartment,
        genderList,
        genderOption,
        selectedGender,
        setGenderList,
        setGenderOption,
        setSelectedGender,
        roleList,
        roleOption,
        selectedRole,
        setRoleList,
        setRoleOption,
        setSelectedRole,
        nationalityList,
        nationalityOption,
        selectedNationality,
        setNationalityList,
        setNationalityOption,
        setSelectedNationality,
    } = useUserFormStore()

    const { getTopGapValue } = useLayoutGap()

    const { larger } = useResponsive()

    useSWR(
        [
            '/api/departments',
            {
                // i need to get all pages
                pageIndex: 1,
                pageSize: 10,
                query: '',
                all: true,
                sort: {
                    order: '',
                    key: '',
                },
            } as TableQueries,
        ],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) =>
            apiGetDepartmentsList<GetDepartmentsListResponse, TableQueries>({
                ...params,
            }),
        {
            revalidateOnFocus: false,
            // revalidateOnMount: true,
            onSuccess: (resp) => {
                const list = resp.list.map(({ id, name, status }) => ({
                    label: name,
                    value: id,
                    // img: `data:image/jpeg;base64,${commercial_id}`,
                    status: status,
                }))
                setDepartmentList(resp.list)
                setDepartmentOption(list)
            },
        },
    )

    useSWR(
        [
            `/api/lookups/details/${1}`,
            {
                pageIndex: 1,
                pageSize: 10,
                all: true,
                query: '',
                sort: {
                    order: '',
                    key: '',
                },
            } as TableQueries,
        ],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) =>
            apiGetLockupDetails<GetLockupListResponse, TableQueries>({
                id: '1',
                ...params,
            }),
        {
            revalidateOnFocus: false,
            onSuccess: (resp) => {
                const list = resp.list.map(({ id, value, label, status }) => ({
                    label: label,
                    value: value,
                    id: id,
                    // img: `data:image/jpeg;base64,${commercial_id}`,
                    status: status,
                }))
                setGenderList(
                    resp.list.map((item) => ({
                        ...item,
                        id: item.id, // number
                        label: item.label,
                        value: item.value,
                    })),
                )
                setGenderOption(list)
            },
        },
    )
    useSWR(
        [
            `/api/lookups/details/${2}`,
            {
                pageIndex: 1,
                pageSize: 10,
                all: true,
                query: '',
                sort: {
                    order: '',
                    key: '',
                },
            } as TableQueries,
        ],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) =>
            apiGetLockupDetails<GetLockupListResponse, TableQueries>({
                id: '2',
                ...params,
            }),
        {
            revalidateOnFocus: false,
            onSuccess: (resp) => {
                const list = resp.list.map(({ id, value, label, status }) => ({
                    label: label,
                    id: id,
                    value: value,
                    // img: `data:image/jpeg;base64,${commercial_id}`,
                    status: status,
                }))
                setNationalityList(
                    resp.list.map((item) => ({
                        ...item,
                        id: item.id,
                        value: item.value,
                        label: item.label,
                    })),
                )
                setNationalityOption(list)
            },
        },
    )

    useSWR(
        [
            `/api/roles`,
            {
                pageIndex: 1,
                pageSize: 10,
                query: '',
                sort: {
                    order: '',
                    key: '',
                },
            } as TableQueries,
        ],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) =>
            apiGetRolesList<GetRolesListResponse, TableQueries>({
                ...params,
            }),
        {
            revalidateOnFocus: false,
            onSuccess: (resp) => {
                const list = resp.list.map(({ id, name, status }) => ({
                    label: name,
                    value: id,
                    // img: `data:image/jpeg;base64,${commercial_id}`,
                    status: status,
                }))
                setRoleList(resp.list)
                setRoleOption(list)
            },
        },
    )
    // console.log(nationalityList,'nationalityList'

    // )
    const {
        handleSubmit,
        reset,
        watch,
        formState: { errors },
        control,
    } = useForm<UserFormSchema>({
        resolver: zodResolver(validationSchema),
        defaultValues: defaultValues
            ? {
                  ...defaultValues,
                  gender_id: defaultValues?.gender
                      ? defaultValues.gender.id
                      : undefined,

                  nationality_id: defaultValues?.nationality
                      ? defaultValues.nationality.id
                      : undefined,

                  department_id: defaultValues?.department
                      ? defaultValues.department.id
                      : null,
                  role_ids: defaultValues?.roles
                      ? defaultValues.roles.map((role) => role.id)
                      : [],
              }
            : undefined,
    })

    useEffect(() => {
        // console.log('defaultDepartment', defaultValues)
        if (defaultDepartment) {
            setSelectedDepartment(defaultDepartment)
        }
        if (defaultGender) {
            setSelectedGender(defaultGender)
        }
        if (defaultNationality) {
            setSelectedNationality(defaultNationality)
        }
        if (defaultRole) {
            setSelectedRole(defaultRole)
        }
        if (!isEmpty(defaultValues)) {
            let base64String = ''
            if (
                defaultValues.user_img &&
                typeof defaultValues.user_img !== 'string'
            ) {
                const buffer = new Uint8Array(
                    defaultValues.user_img as ArrayLike<number>,
                )
                base64String = btoa(String.fromCharCode(...buffer))
            } else if (typeof defaultValues.user_img === 'string') {
                base64String = defaultValues.user_img
            }
            console.log('Form default values:', defaultValues)

            // Build reset object with only existing values
            const resetData: any = {
                name: defaultValues.name,
                email: defaultValues.email,
                password: '', // Clear password when editing
            }

            // Only add optional fields if they exist
            if (base64String) {
                resetData.user_img = base64String
            }

            // Always set department_id, use null if no department
            resetData.department_id = defaultValues?.department?.id || null

            if (defaultValues?.gender?.id) {
                resetData.gender_id = defaultValues.gender.id
            }

            if (defaultValues?.nationality?.id) {
                resetData.nationality_id = defaultValues.nationality.id
            }

            if (defaultValues?.roles && defaultValues.roles.length > 0) {
                resetData.role_ids = defaultValues.roles.map((role) => role.id)
            }

            reset(resetData)
        }
        return () => {
            setSelectedDepartment([])
            setSelectedGender([])
            setSelectedNationality([])
            setSelectedRole([])
        }
    }, [
        defaultGender,
        defaultNationality,
        defaultRole,
        defaultDepartment,
        defaultValues,
        reset,
        setSelectedDepartment,
        setSelectedGender,
        setSelectedNationality,
        setSelectedRole,
    ])

    const onSubmit = (values: UserFormSchema) => {
        // Clean up the values by removing undefined/empty optional fields
        const cleanedValues = { ...values }

        // Remove password if editing and it's empty
        if (
            isEditMode &&
            (!cleanedValues.password || cleanedValues.password.trim() === '')
        ) {
            delete cleanedValues.password
        }

        // Remove optional fields that are undefined or empty
        if (
            !cleanedValues.user_img ||
            cleanedValues.user_img === null ||
            (typeof cleanedValues.user_img === 'string' &&
                cleanedValues.user_img.trim() === '')
        ) {
            delete cleanedValues.user_img
        }

        if (!cleanedValues.gender_id) {
            delete cleanedValues.gender_id
        }

        if (!cleanedValues.nationality_id) {
            delete cleanedValues.nationality_id
        }

        if (!cleanedValues.department_id) {
            delete cleanedValues.department_id
        }

        if (!cleanedValues.role_ids || cleanedValues.role_ids.length === 0) {
            delete cleanedValues.role_ids
        }

        // Submit the cleaned values
        onFormSubmit?.(cleanedValues)
    }

    // const selectedPaymentMethod = watch('paymentMethod', '')

    return (
        <div className="flex">
            <Form
                className="flex-1 flex flex-col overflow-hidden"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Container>
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-7 flex flex-col gap-6">
                            <UserDetailSection
                                control={control}
                                errors={errors}
                                isEditMode={!isEmpty(defaultValues)}
                            />

                            <DepartmentRoleSelectSection
                                control={control}
                                errors={errors}
                                isEditMode={isEditMode}
                            />
                        </div>

                        <div className="col-span-5 flex flex-col gap-6">
                            <ProfileImage control={control} errors={errors} />

                            <div className="">
                                <GenderNationSelectSection
                                    control={control}
                                    errors={errors}
                                />

                                {/* <NationalitySelectSection control={control} errors={errors} /> */}
                            </div>
                        </div>
                    </div>
                </Container>
                <BottomStickyBar>{children}</BottomStickyBar>
            </Form>
        </div>
    )
}

export default UserForm
