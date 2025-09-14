import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { FormItem } from '@/components/ui/Form'
import { Steps } from '@/components/ui/Steps'
import Upload from '@/components/ui/Upload'
import BackButton from '@/components/shared/BackButton'
import { toast, Notification } from '@/components/ui'
import { createProfile, getProfile, updateProfile } from '@/services/ProfileService'
import type { ProfileRequest, Profile } from '@/@types/profile'


// Helper function to convert File to base64
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
            const result = reader.result as string
            // Strip data URL prefix (e.g., "data:application/pdf;base64,")
            const commaIndex = result.indexOf(',')
            const base64 = commaIndex !== -1 ? result.substring(commaIndex + 1) : result
            resolve(base64)
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
}

// Define skill levels and zod schema for skills
const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'] as const

const skillSchema = z.object({
    name: z.string().min(1, 'Skill name is required').max(50, 'Skill name must be less than 50 characters'),
    level: z.enum(SKILL_LEVELS).default('Intermediate'),
})

const experienceSchema = z.object({
    company: z.string().min(1, 'Company name is required').max(100, 'Company name must be less than 100 characters'),
    position: z.string().min(1, 'Position title is required').max(100, 'Position title must be less than 100 characters'),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description must be less than 500 characters'),
}).refine((data) => {
    if (data.startDate && data.endDate) {
        return new Date(data.endDate) >= new Date(data.startDate)
    }
    return true
}, {
    message: "End date must be after start date",
    path: ["endDate"]
})

const educationSchema = z.object({
    institution: z.string().min(1, 'Institution name is required').max(100, 'Institution name must be less than 100 characters'),
    degree: z.string().min(1, 'Degree is required').max(100, 'Degree must be less than 100 characters'),
    fieldOfStudy: z.string().min(1, 'Field of study is required').max(100, 'Field of study must be less than 100 characters'),
    graduationYear: z.string().min(1, 'Graduation year is required').regex(/^\d{4}$/, 'Please enter a valid 4-digit year'),
})

const validationSchema = z.object({
    summary: z.string()
        .min(20, 'Summary must be at least 20 characters')
        .max(1000, 'Summary must be less than 1000 characters'),
    skills: z.array(skillSchema).min(1, 'At least one skill is required'),
    experience: z.array(experienceSchema).min(1, 'At least one work experience is required'),
    education: z.array(educationSchema).min(1, 'At least one education entry is required'),
    linkedinUrl: z.string()
        .url('Please enter a valid LinkedIn URL')
        .optional()
        .or(z.literal('')),
    cvFile: z.any().optional(),
})

const ProfileForm = () => {
    const [currentStep, setCurrentStep] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [existingProfile, setExistingProfile] = useState<Profile | null>(null)
    const [cvFiles, setCvFiles] = useState<File[]>([])
    const [cvError, setCvError] = useState<string>('')
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()


    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        trigger,
    } = useForm<z.infer<typeof validationSchema>>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            summary: '',
            skills: [{ name: '', level: 'Intermediate' }],
            experience: [{ company: '', position: '', startDate: '', endDate: '', description: '' }],
            education: [{ institution: '', degree: '', fieldOfStudy: '', graduationYear: '' }],
            linkedinUrl: '',
        },
    })

    // Field arrays
    const {
        fields: skillFields,
        append: appendSkill,
        remove: removeSkill,
    } = useFieldArray({
        control,
        name: 'skills',
    })

    const {
        fields: experienceFields,
        append: appendExperience,
        remove: removeExperience,
    } = useFieldArray({
        control,
        name: 'experience',
    })

    const {
        fields: educationFields,
        append: appendEducation,
        remove: removeEducation,
    } = useFieldArray({
        control,
        name: 'education',
    })

    useEffect(() => {
        const fetchExistingProfile = async () => {
            try {
                setLoading(true)
                const profileData = await getProfile()
                if (profileData) {
                    setExistingProfile(profileData)
                    setValue('summary', profileData.summary || '')
                    setValue('skills', profileData.skills?.map(s => ({ name: s.name, level: (s.level || 'Intermediate') as 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' })) || [{ name: '', level: 'Intermediate' }])
                    setValue('experience', profileData.experiences?.map(e => ({
                        company: e.company || '',
                        position: e.title || '',
                        startDate: '2020-01-01', // Default start date
                        endDate: '2023-01-01', // Default end date
                        description: 'Work experience at ' + (e.company || 'company')
                    })) || [{ company: '', position: '', startDate: '', endDate: '', description: '' }])
                    setValue('education', profileData.educations?.map(ed => ({
                        institution: ed.university || '',
                        degree: ed.degree || '',
                        fieldOfStudy: ed.degree || '', // Use degree as field of study
                        graduationYear: ed.year?.toString() || ''
                    })) || [{ institution: '', degree: '', fieldOfStudy: '', graduationYear: '' }])
                    setValue('linkedinUrl', profileData.linkedinUrl || '')
                }
            } catch {
                console.log('No existing profile found, creating new one')
            } finally {
                setLoading(false)
            }
        }

        fetchExistingProfile()
    }, [setValue])

    // Show loading state
    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <BackButton />
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-48"></div>
                    </div>
                </div>
                <Card className="p-6">
                    <div className="animate-pulse space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </Card>
            </div>
        )
    }

    const steps = [
        { title: 'Summary & Skills' },
        { title: 'Experience' },
        { title: 'Education' },
        { title: 'Additional Info' },
    ]

    const nextStep = async () => {
        let fieldsToValidate: (keyof z.infer<typeof validationSchema>)[] = []
        
        switch (currentStep) {
            case 0:
                fieldsToValidate = ['summary', 'skills']
                break
            case 1:
                fieldsToValidate = ['experience']
                break
            case 2:
                fieldsToValidate = ['education']
                break
            case 3:
                fieldsToValidate = ['linkedinUrl']
                break
        }

        const isValid = await trigger(fieldsToValidate)
        
        if (isValid && currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1)
        }
    }

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    // Max CV size: 0.7MB
    const MAX_CV_SIZE_MB = 0.7
    const MAX_CV_BYTES = Math.floor(MAX_CV_SIZE_MB * 1024 * 1024)

    const isCvSizeValid = (file?: File) => {
        if (file && file.size > MAX_CV_BYTES) {
            return false
        }
        return true
    }

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="space-y-6">
                        <FormItem
                            label="Professional Summary"
                            invalid={Boolean(errors.summary)}
                            errorMessage={errors.summary?.message}
                        >
                            <Controller
                                name="summary"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        textArea
                                        rows={4}
                                        placeholder="Tell us about your professional background, skills, and career goals..."
                                    />
                                )}
                            />
                        </FormItem>

                        <FormItem
                            label="Skills"
                            invalid={Boolean(errors.skills)}
                            errorMessage={errors.skills?.message}
                        >
                            <div className="space-y-4">
                                {skillFields.map((field, index) => (
                                    <div key={field.id} className="flex gap-4">
                                        <div className="flex-1">
                                            <Controller
                                                name={`skills.${index}.name`}
                                                control={control}
                                                render={({ field }) => (
                                                    <Input {...field} placeholder="Skill name" />
                                                )}
                                            />
                                        </div>
                                        <div className="w-40">
                                            <Controller
                                                name={`skills.${index}.level`}
                                                control={control}
                                                render={({ field }) => {
                                                    const options = SKILL_LEVELS.map(level => ({ value: level, label: level }))
                                                    const selected = options.find(o => o.value === field.value) || options[1] // Default to Intermediate
                                                    return (
                                                        <Select
                                                            value={selected}
                                                            onChange={(option: { value: string } | null) => field.onChange(option?.value)}
                                                            options={options}
                                                        />
                                                    )
                                                }}
                                            />
                                        </div>
                                        {skillFields.length > 1 && (
                                            <Button
                                                size="sm"
                                                variant="plain"
                                                onClick={() => removeSkill(index)}
                                                className="text-red-600"
                                            >
                                                Remove
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="plain"
                                    onClick={() => appendSkill({ name: '', level: 'Intermediate' })}
                                >
                                    Add Skill
                                </Button>
                            </div>
                        </FormItem>
                    </div>
                )

            case 1:
                return (
                    <div className="space-y-6">
                        <FormItem
                            label="Work Experience"
                            invalid={Boolean(errors.experience)}
                            errorMessage={errors.experience?.message}
                        >
                            <div className="space-y-6">
                                {experienceFields.map((field, index) => (
                                    <Card key={field.id} className="p-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <FormItem
                                                label="Company"
                                                invalid={Boolean(errors.experience?.[index]?.company)}
                                                errorMessage={errors.experience?.[index]?.company?.message}
                                            >
                                                <Controller
                                                    name={`experience.${index}.company`}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input {...field} placeholder="Company name" />
                                                    )}
                                                />
                                            </FormItem>
                                            <FormItem
                                                label="Position"
                                                invalid={Boolean(errors.experience?.[index]?.position)}
                                                errorMessage={errors.experience?.[index]?.position?.message}
                                            >
                                                <Controller
                                                    name={`experience.${index}.position`}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input {...field} placeholder="Job title" />
                                                    )}
                                                />
                                            </FormItem>
                                            <FormItem
                                                label="Start Date"
                                                invalid={Boolean(errors.experience?.[index]?.startDate)}
                                                errorMessage={errors.experience?.[index]?.startDate?.message}
                                            >
                                                <Controller
                                                    name={`experience.${index}.startDate`}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input {...field} type="date" />
                                                    )}
                                                />
                                            </FormItem>
                                            <FormItem
                                                label="End Date"
                                                invalid={Boolean(errors.experience?.[index]?.endDate)}
                                                errorMessage={errors.experience?.[index]?.endDate?.message}
                                            >
                                                <Controller
                                                    name={`experience.${index}.endDate`}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input {...field} type="date" />
                                                    )}
                                                />
                                            </FormItem>
                                        </div>
                                        <FormItem
                                            label="Description"
                                            invalid={Boolean(errors.experience?.[index]?.description)}
                                            errorMessage={errors.experience?.[index]?.description?.message}
                                        >
                                            <Controller
                                                name={`experience.${index}.description`}
                                                control={control}
                                                render={({ field }) => (
                                                    <Input
                                                        {...field}
                                                        textArea
                                                        rows={3}
                                                        placeholder="Describe your role, responsibilities, and achievements..."
                                                    />
                                                )}
                                            />
                                        </FormItem>
                                        {experienceFields.length > 1 && (
                                            <Button
                                                size="sm"
                                                variant="plain"
                                                onClick={() => removeExperience(index)}
                                                className="text-red-600"
                                            >
                                                Remove Experience
                                            </Button>
                                        )}
                                    </Card>
                                ))}
                                <Button
                                    type="button"
                                    variant="plain"
                                    onClick={() => appendExperience({ company: '', position: '', startDate: '', endDate: '', description: '' })}
                                >
                                    Add Experience
                                </Button>
                            </div>
                        </FormItem>
                    </div>
                )

            case 2:
                return (
                    <div className="space-y-6">
                        <FormItem
                            label="Education"
                            invalid={Boolean(errors.education)}
                            errorMessage={errors.education?.message}
                        >
                            <div className="space-y-6">
                                {educationFields.map((field, index) => (
                                    <Card key={field.id} className="p-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <FormItem
                                                label="Institution"
                                                invalid={Boolean(errors.education?.[index]?.institution)}
                                                errorMessage={errors.education?.[index]?.institution?.message}
                                            >
                                                <Controller
                                                    name={`education.${index}.institution`}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input {...field} placeholder="University/College name" />
                                                    )}
                                                />
                                            </FormItem>
                                            <FormItem
                                                label="Degree"
                                                invalid={Boolean(errors.education?.[index]?.degree)}
                                                errorMessage={errors.education?.[index]?.degree?.message}
                                            >
                                                <Controller
                                                    name={`education.${index}.degree`}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input {...field} placeholder="e.g., Bachelor's, Master's" />
                                                    )}
                                                />
                                            </FormItem>
                                            <FormItem
                                                label="Field of Study"
                                                invalid={Boolean(errors.education?.[index]?.fieldOfStudy)}
                                                errorMessage={errors.education?.[index]?.fieldOfStudy?.message}
                                            >
                                                <Controller
                                                    name={`education.${index}.fieldOfStudy`}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input {...field} placeholder="e.g., Computer Science" />
                                                    )}
                                                />
                                            </FormItem>
                                            <FormItem
                                                label="Graduation Year"
                                                invalid={Boolean(errors.education?.[index]?.graduationYear)}
                                                errorMessage={errors.education?.[index]?.graduationYear?.message}
                                            >
                                                <Controller
                                                    name={`education.${index}.graduationYear`}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input {...field} placeholder="YYYY" />
                                                    )}
                                                />
                                            </FormItem>
                                        </div>
                                        {educationFields.length > 1 && (
                                            <Button
                                                size="sm"
                                                variant="plain"
                                                onClick={() => removeEducation(index)}
                                                className="text-red-600"
                                            >
                                                Remove Education
                                            </Button>
                                        )}
                                    </Card>
                                ))}
                                <Button
                                    type="button"
                                    variant="plain"
                                    onClick={() => appendEducation({ institution: '', degree: '', fieldOfStudy: '', graduationYear: '' })}
                                >
                                    Add Education
                                </Button>
                            </div>
                        </FormItem>
                    </div>
                )

            case 3:
                return (
                    <div className="space-y-6">
                        <FormItem
                            label="LinkedIn Profile URL"
                            invalid={Boolean(errors.linkedinUrl)}
                            errorMessage={errors.linkedinUrl?.message}
                        >
                            <Controller
                                name="linkedinUrl"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        placeholder="https://linkedin.com/in/your-profile"
                                        type="url"
                                    />
                                )}
                            />
                        </FormItem>

                        <FormItem
                            label="CV/Resume"
                            invalid={Boolean(cvError)}
                            errorMessage={cvError}
                        >
                            <Upload
                                accept=".pdf,.doc,.docx"
                                onChange={(files: File[]) => {
                                    setCvFiles(files)
                                    setCvError('')
                                }}
                                tip={`Accepted formats: PDF, DOC, DOCX (Max size: ${MAX_CV_SIZE_MB}MB)`}
                            />
                        </FormItem>
                    </div>
                )

            default:
                return null
        }
    }

    const onSubmit = async (data: z.infer<typeof validationSchema>) => {
        setIsSubmitting(true)
        try {
            // Block oversize CV upfront to avoid 413 without showing popups
            if (cvFiles[0] && !isCvSizeValid(cvFiles[0])) {
                setCvError(`CV must be <= ${MAX_CV_SIZE_MB}MB`)
                setIsSubmitting(false)
                return
            }

            // Convert CV file to base64 if present
            let cvBase64: string | undefined
            if (cvFiles[0]) {
                try {
                    cvBase64 = await fileToBase64(cvFiles[0])
                } catch (error) {
                    console.error('Error converting CV to base64:', error)
                    toast.push(
                        <Notification title="Error" type="danger">
                            Failed to process CV file. Please try again.
                        </Notification>
                    )
                    setIsSubmitting(false)
                    return
                }
            }

            // Build payload matching ProfileRequest types
            const profileData: ProfileRequest = {
                summary: data.summary,
                skills: (data.skills || []).map((s) => ({ name: s.name, level: s.level })),
                experiences: (data.experience || []).map((e) => ({
                    company: e.company,
                    title: e.position,
                    years: 1,
                })),
                educations: (data.education || []).map((ed) => ({
                    university: ed.institution,
                    degree: ed.degree,
                    year: ed.graduationYear ? Number(ed.graduationYear) : undefined,
                })),
                linkedinUrl: data.linkedinUrl,
                cvFile: cvBase64,
            }



            // Use appropriate function based on whether profile exists
            if (existingProfile) {
                await updateProfile(existingProfile.id!, profileData)
            } else {
                await createProfile(profileData)
            }

            toast.push(
                <Notification title="Success" type="success">
                    {existingProfile ? 'Profile updated successfully!' : 'Profile created successfully!'}
                </Notification>
            )

            navigate('/profile')
        } catch (unknownErr) {
            // Narrow unknown to a reasonable shape for messaging
            console.error('Save error:', unknownErr)
            const err = unknownErr as { response?: { status?: number; data?: { message?: string } }; message?: string }
            const status = err?.response?.status
            const errorMessage =
                status === 413
                    ? `Request entity too large. Please upload a smaller CV (<= ${MAX_CV_SIZE_MB}MB) or compress it.`
                    : err?.response?.data?.message || err?.message || 'Failed to save profile. Please try again.'

            toast.push(
                <Notification title="Error" type="danger">
                    {errorMessage}
                </Notification>
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <BackButton />
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {existingProfile ? 'Edit Profile' : 'Create Profile'}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {existingProfile ? 'Update your professional profile' : 'Build your professional profile to showcase your skills and experience'}
                    </p>
                </div>
            </div>

            {/* Steps Progress */}
            <div className="mb-6">
                <Steps current={currentStep}>
                    {steps.map((step, index) => (
                        <Steps.Item key={index} title={step.title} />
                    ))}
                </Steps>
            </div>

            <div>
                <Card className="p-6">
                    {renderStepContent()}
                </Card>

                <div className="flex items-center justify-between mt-6">
                    {currentStep > 0 ? (
                        <Button type="button" variant="plain" onClick={prevStep}>
                            Previous
                        </Button>
                    ) : (
                        <span />
                    )}

                    {currentStep < steps.length - 1 ? (
                        <Button type="button" variant="solid" onClick={nextStep}>
                            Next
                        </Button>
                    ) : (
                        <Button 
                            type="button" 
                            variant="solid" 
                            loading={isSubmitting}
                            onClick={handleSubmit(onSubmit)}
                        >
                            {existingProfile ? 'Update Profile' : 'Create Profile'}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProfileForm