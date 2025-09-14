import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import { FormItem, Form } from '@/components/ui/Form'
import { toast, Notification } from '@/components/ui'
import { useAuth } from '@/auth'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import { useNavigate } from 'react-router'

interface SignUpFormProps extends CommonProps {
    disableSubmit?: boolean
    setMessage?: (message: string, type?: 'success' | 'error') => void
}

type SignUpFormSchema = {
    name: string
    password: string
    email: string
    confirmPassword: string
    imageFile: FileList
    gender_id: 1 | 2
    nationality_id: number
}

// Strong password validation
const passwordValidation = z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')

const validationSchema: ZodType<SignUpFormSchema> = z
    .object({
        email: z.string()
            .email('Please enter a valid email address')
            .min(1, 'Please enter your email'),
        name: z.string()
            .min(2, 'Name must be at least 2 characters')
            .max(50, 'Name must be less than 50 characters'),
        password: passwordValidation,
        confirmPassword: z.string({
            required_error: 'Confirm Password Required',
        }),
        imageFile: z
            .any()
            .refine((files) => files && files.length > 0, 'Profile image is required')
            .refine((files) => {
                if (!files || files.length === 0) return false
                const file = files[0]
                const maxSize = 1 * 1024 * 1024 // 1MB
                return file.size <= maxSize
            }, 'Image size must be less than 1MB')
            .refine((files) => {
                if (!files || files.length === 0) return false
                const file = files[0]
                return file.type.startsWith('image/')
            }, 'Please upload a valid image file'),
        gender_id: z.union([z.literal(1), z.literal(2)]),
        nationality_id: z.number().default(1),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    })

const SignUpForm = (props: SignUpFormProps) => {
    const [isSubmitting, setSubmitting] = useState<boolean>(false)
    const navigate = useNavigate()

    const { disableSubmit = false, className, setMessage } = props

    const { signUp } = useAuth()

    const {
        handleSubmit,
        formState: { errors },
        control,
        watch,
    } = useForm<SignUpFormSchema>({
        resolver: zodResolver(validationSchema),
        defaultValues: { gender_id: 1, nationality_id: 1 } as unknown as SignUpFormSchema,
    })

    const watchedPassword = watch('password')

    // Max file size: 1MB
    const MAX_FILE_SIZE = 1 * 1024 * 1024 // 1MB in bytes

    const compressImage = (file: File): Promise<File> => {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            const img = new Image()
            
            img.onload = () => {
                // Calculate new dimensions (max 500px width/height)
                const maxSize = 500
                let { width, height } = img
                
                if (width > height) {
                    if (width > maxSize) {
                        height = (height * maxSize) / width
                        width = maxSize
                    }
                } else {
                    if (height > maxSize) {
                        width = (width * maxSize) / height
                        height = maxSize
                    }
                }
                
                canvas.width = width
                canvas.height = height
                
                // Draw and compress
                ctx?.drawImage(img, 0, 0, width, height)
                canvas.toBlob((blob) => {
                    if (blob) {
                        const compressedFile = new File([blob], file.name, {
                            type: 'image/jpeg',
                            lastModified: Date.now(),
                        })
                        resolve(compressedFile)
                    } else {
                        resolve(file)
                    }
                }, 'image/jpeg', 0.7) // 70% quality
            }
            
            img.src = URL.createObjectURL(file)
        })
    }

    const fileToBase64 = async (file: File): Promise<string> => {
        // Check file size
        if (file.size > MAX_FILE_SIZE) {
            throw new Error(`File size must be less than 1MB. Current size: ${(file.size / 1024 / 1024).toFixed(2)}MB`)
        }

        // Compress image if it's an image file
        let processedFile = file
        if (file.type.startsWith('image/')) {
            processedFile = await compressImage(file)
        }

        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => {
                const result = String(reader.result)
                // Remove data URL prefix to get just the base64 string
                const base64 = result.split(',')[1] || result
                resolve(base64)
            }
            reader.onerror = (e) => reject(e)
            reader.readAsDataURL(processedFile)
        })
    }

    const onSignUp = async (values: SignUpFormSchema) => {
        const { name, password, email, imageFile, gender_id, nationality_id } = values

        if (!disableSubmit) {
            setSubmitting(true)
            try {
                // Convert image to base64 with compression
                const base64 = await fileToBase64(imageFile[0])
                
                const result = await signUp({
                    name,
                    password,
                    email,
                    user_img: base64,
                    gender_id,
                    nationality_id,
                })

                if (result?.status === 'success') {
                    // Show success notification
                    toast.push(
                        <Notification title="Success" type="success">
                            Account created successfully! Welcome to Talent-Hunting! 🎉
                        </Notification>
                    )
                    
                    setMessage?.('Account created successfully! Redirecting to sign in...', 'success')
                    setTimeout(() => {
                        navigate('/sign-in')
                    }, 2000)
                } else if (result?.status === 'failed') {
                    // Show error notification
                    toast.push(
                        <Notification title="Error" type="danger">
                            {result.message || 'Failed to create account. Please try again.'}
                        </Notification>
                    )
                    setMessage?.(result.message, 'error')
                }
            } catch (error) {
                console.error('Signup error:', error)
                const errorMessage = error instanceof Error ? error.message : 'An error occurred during sign up. Please try again.'
                
                // Show error notification
                toast.push(
                    <Notification title="Error" type="danger">
                        {errorMessage}
                    </Notification>
                )
                
                setMessage?.(errorMessage, 'error')
            } finally {
                setSubmitting(false)
            }
        }
    }

    // Password strength indicator
    const getPasswordStrength = (password: string) => {
        if (!password) return { strength: 0, color: 'text-gray-400', text: '' }
        
        let strength = 0
        if (password.length >= 8) strength++
        if (/[A-Z]/.test(password)) strength++
        if (/[a-z]/.test(password)) strength++
        if (/[0-9]/.test(password)) strength++
        if (/[^A-Za-z0-9]/.test(password)) strength++

        const colors = ['text-red-500', 'text-orange-500', 'text-yellow-500', 'text-blue-500', 'text-green-500']
        const texts = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong']
        
        return {
            strength,
            color: colors[strength - 1] || 'text-gray-400',
            text: texts[strength - 1] || ''
        }
    }

    const passwordStrength = getPasswordStrength(watchedPassword)

    return (
        <div className={`w-full pt-20 ${className}`}>
            <Form onSubmit={handleSubmit(onSignUp)} className="space-y-4 w-full">
                <FormItem
                    label="Full Name"
                    invalid={Boolean(errors.name)}
                    errorMessage={errors.name?.message}
                    className="w-full"
                >
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                placeholder="Enter your full name"
                                autoComplete="name"
                                className="w-full"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                
                <FormItem
                    label="Email Address"
                    invalid={Boolean(errors.email)}
                    errorMessage={errors.email?.message}
                    className="w-full"
                >
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="email"
                                placeholder="Enter your email address"
                                autoComplete="email"
                                className="w-full"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Password"
                    invalid={Boolean(errors.password)}
                    errorMessage={errors.password?.message}
                >
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <div className="space-y-2">
                                <Input
                                    type="password"
                                    autoComplete="new-password"
                                    placeholder="Create a strong password"
                                    className="w-full"
                                    {...field}
                                />
                                {watchedPassword && (
                                    <div className="text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className={passwordStrength.color}>
                                                {passwordStrength.text}
                                            </span>
                                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                <div 
                                                    className={`h-2 rounded-full transition-all duration-300 ${
                                                        passwordStrength.strength <= 2 ? 'bg-red-500' :
                                                        passwordStrength.strength === 3 ? 'bg-yellow-500' :
                                                        passwordStrength.strength === 4 ? 'bg-blue-500' : 'bg-green-500'
                                                    }`}
                                                    style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Confirm Password"
                    invalid={Boolean(errors.confirmPassword)}
                    errorMessage={errors.confirmPassword?.message}
                >
                    <Controller
                        name="confirmPassword"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="password"
                                autoComplete="new-password"
                                placeholder="Confirm your password"
                                className="w-full"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Profile Image"
                    invalid={Boolean(errors.imageFile)}
                    errorMessage={errors.imageFile?.message as string}
                >
                    <Controller
                        name="imageFile"
                        control={control}
                        render={({ field }) => (
                            <div className="space-y-3">
                                <Input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={(e) => field.onChange(e.target.files)}
                                    className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/20 dark:file:text-blue-400"
                                />
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    Maximum file size: 1MB. Supported formats: JPG, PNG, GIF
                                </div>
                                {field.value && field.value.length > 0 && (
                                    <div className="text-xs text-blue-600 dark:text-blue-400">
                                        Selected: {field.value[0].name} ({(field.value[0].size / 1024 / 1024).toFixed(2)}MB)
                                    </div>
                                )}
                            </div>
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Gender"
                    invalid={Boolean(errors.gender_id)}
                    errorMessage={errors.gender_id?.message as string}
                    className="w-full"
                >
                    <Controller
                        name="gender_id"
                        control={control}
                        render={({ field }) => {
                            const options = [
                                { value: 1, label: 'Male' },
                                { value: 2, label: 'Female' },
                            ]
                            const selected = options.find(o => o.value === field.value) || options[0]
                            return (
                                <Select
                                    value={selected}
                                    onChange={(option: any) => field.onChange(option?.value)}
                                    options={options}
                                    className="w-full"
                                />
                            )
                        }}
                    />
                </FormItem>

                <FormItem
                    label="Nationality"
                    invalid={Boolean(errors.nationality_id)}
                    errorMessage={errors.nationality_id?.message as string}
                >
                    <Controller
                        name="nationality_id"
                        control={control}
                        render={({ field }) => {
                            const options = [
                                { value: 1, label: 'Egypt' },
                                { value: 2, label: 'United States' },
                                { value: 3, label: 'United Kingdom' },
                                { value: 4, label: 'Canada' },
                                { value: 5, label: 'Australia' },
                                { value: 6, label: 'Germany' },
                                { value: 7, label: 'France' },
                                { value: 8, label: 'Other' },
                            ]
                            const selected = options.find(o => o.value === field.value) || options[0]
                            return (
                                <Select
                                    value={selected}
                                    onChange={(option: any) => field.onChange(option?.value)}
                                    options={options}
                                />
                            )
                        }}
                    />
                </FormItem>

                <Button
                    block
                    loading={isSubmitting}
                    variant="solid"
                    type="submit"
                    className="mt-8"
                >
                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </Button>
            </Form>
        </div>
    )
}

export default SignUpForm
