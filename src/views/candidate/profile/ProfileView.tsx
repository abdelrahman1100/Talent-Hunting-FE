import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import DefaultAvatar from '@/components/shared/DefaultAvatar'
import BackButton from '@/components/shared/BackButton'
import { getProfile, deleteProfile } from '@/services/ProfileService'
import { useSessionUser } from '@/store/authStore'
import { HiOutlinePencilAlt, HiOutlineTrash, HiOutlineDocumentText, HiOutlineBriefcase, HiOutlineAcademicCap, HiOutlineStar } from 'react-icons/hi'
import { FaLinkedinIn } from 'react-icons/fa'
import type { Profile } from '@/@types/profile'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'

const ProfileView = () => {
    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    const { user } = useSessionUser()

    const fetchProfile = useCallback(async () => {
        try {
            setLoading(true)
            const profileData = await getProfile()
            setProfile(profileData || null)
            setError(null)
        } catch (err: unknown) {
            // If backend returns 404, treat as "no profile" instead of error
            const error = err as { response?: { status?: number } }
            if (error?.response?.status === 404) {
                setProfile(null)
                setError(null)
            } else {
                setError('Failed to load profile')
                console.error('Profile fetch error:', err)
            }
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchProfile()
    }, [fetchProfile])

    const handleEdit = () => navigate('/profile/edit')
    const handleCreate = () => navigate('/profile/create')

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const [deleting, setDeleting] = useState(false)

    const handleDelete = () => setDeleteConfirmationOpen(true)
    const handleCancelDelete = () => setDeleteConfirmationOpen(false)

    const handleConfirmDelete = async () => {
        setDeleting(true)
        try {
            await deleteProfile()
            toast.push(
                <Notification title="Success" type="success">
                    Profile deleted successfully!
                </Notification>
            )
            setProfile(null)
            setDeleteConfirmationOpen(false)
        } catch {
            toast.push(
                <Notification title="Error" type="danger">
                    Failed to delete profile. Please try again.
                </Notification>
            )
        } finally {
            setDeleting(false)
        }
    }

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
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                            <div>
                                <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-48"></div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }

    if (error) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <BackButton />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Profile</h1>
                    </div>
                </div>
                <Card className="p-6">
                    <div className="text-center">
                        <div className="text-red-500 mb-4">{error}</div>
                        <Button variant="solid" onClick={fetchProfile}>
                            Try Again
                        </Button>
                    </div>
                </Card>
            </div>
        )
    }

    if (!profile) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <BackButton />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Profile</h1>
                    </div>
                </div>
                <Card className="p-6">
                    <div className="text-center py-12">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <HiOutlineDocumentText className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                            No Profile Found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            You haven&apos;t created your profile yet. Create one to showcase your skills and experience.
                        </p>
                        <Button variant="solid" onClick={handleCreate}>
                            Create Profile
                        </Button>
                    </div>
                </Card>
            </div>
        )
    }

    return (
        <>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <BackButton />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Profile</h1>
                    </div>
                </div>

                <div className="flex flex-col xl:flex-row gap-4">
                    {/* Left Sidebar - User Info */}
                    <div className="min-w-[330px] 2xl:min-w-[400px]">
                        <Card className="w-full">
                            <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
                                {/* Header Section with Avatar and Name */}
                                <div className="flex xl:flex-col items-center gap-4 mt-6">
                                    <div className="relative">
                                        <DefaultAvatar
                                            src={user?.avatar}
                                            name={user?.userName}
                                            size={90}
                                            className="border-4 border-white shadow-lg"
                                        />
                                    </div>
                                    <div className="text-center xl:text-center">
                                        <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                                            {user?.userName || 'User'}
                                        </h4>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                                            {user?.email}
                                        </p>
                                        {/* LinkedIn Icon */}
                                        {profile.linkedinUrl && (
                                            <div className="flex justify-center">
                                                <a
                                                    href={profile.linkedinUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                                                    title="View LinkedIn Profile"
                                                >
                                                    <FaLinkedinIn className="text-[#155fb8] text-xl" />
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col gap-2 mt-6">
                                    <Button 
                                        variant="solid" 
                                        onClick={handleEdit}
                                        icon={<HiOutlinePencilAlt />}
                                        block
                                    >
                                        Edit Profile
                                    </Button>
                                    <Button 
                                        variant="plain" 
                                        onClick={handleDelete}
                                        icon={<HiOutlineTrash />}
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                        block
                                    >
                                        Delete Profile
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Content - Profile Details */}
                    <Card className="w-full">
                        <div className="p-6">
                            {/* Summary Section */}
                            {profile.summary && (
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                        <HiOutlineDocumentText className="w-5 h-5" />
                                        Professional Summary
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        {profile.summary}
                                    </p>
                                </div>
                            )}

                            {/* Skills Section */}
                            {profile.skills && profile.skills.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                        <HiOutlineStar className="w-5 h-5" />
                                        Skills
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {profile.skills.map((skill, index) => (
                                            <span 
                                                key={index}
                                                className="px-3 py-1 text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-900/20 rounded-md"
                                            >
                                                {skill.name}
                                                {skill.level && (
                                                    <span className="ml-1 text-xs opacity-75">
                                                        ({skill.level})
                                                    </span>
                                                )}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Experience Section */}
                            {profile.experiences && profile.experiences.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                        <HiOutlineBriefcase className="w-5 h-5" />
                                        Work Experience
                                    </h3>
                                    <div className="space-y-4">
                                        {profile.experiences.map((exp, index) => (
                                            <div key={index} className="border-l-4 border-primary pl-4">
                                                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                                    {exp.title}
                                                </h4>
                                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                    {exp.company}
                                                </p>
                                                {exp.years && (
                                                    <p className="text-gray-500 dark:text-gray-500 text-xs">
                                                        {exp.years} year{exp.years > 1 ? 's' : ''}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Education Section */}
                            {profile.educations && profile.educations.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                        <HiOutlineAcademicCap className="w-5 h-5" />
                                        Education
                                    </h3>
                                    <div className="space-y-4">
                                        {profile.educations.map((edu, index) => (
                                            <div key={index} className="border-l-4 border-primary pl-4">
                                                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                                    {edu.degree}
                                                </h4>
                                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                    {edu.university}
                                                </p>
                                                {edu.year && (
                                                    <p className="text-gray-500 dark:text-gray-500 text-xs">
                                                        {edu.year}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                isOpen={deleteConfirmationOpen}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                title="Delete Profile"
                confirmButtonProps={{ loading: deleting }}
            >
                Are you sure you want to delete your profile? This action cannot be undone.
            </ConfirmDialog>
        </>
    )
}

export default ProfileView