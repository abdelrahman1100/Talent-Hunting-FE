import { useState, useEffect, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Progress from '@/components/ui/Progress'
import DefaultAvatar from '@/components/shared/DefaultAvatar'
import { getProfile } from '@/services/ProfileService'
import { useSessionUser } from '@/store/authStore'
import { HiOutlineCheckCircle, HiOutlineXCircle, HiOutlinePencilAlt } from 'react-icons/hi'
import type { Profile } from '@/@types/profile'

const ProfileCompleteness = () => {
    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { user } = useSessionUser()
    const navigate = useNavigate()

    const fetchProfile = useCallback(async () => {
        try {
            setLoading(true)
            const data = await getProfile()
            setProfile(data || null)
            setError(null)
        } catch (err: unknown) {
            const status = (err as { response?: { status?: number } })?.response?.status
            if (status === 404) {
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

    const completeness = useMemo(() => {
        if (!profile) return 0
        
        const sections = [
            profile.summary && profile.summary.trim().length > 0 ? 1 : 0,
            profile.skills && profile.skills.length > 0 ? 1 : 0,
            profile.experiences && profile.experiences.length > 0 ? 1 : 0,
            profile.educations && profile.educations.length > 0 ? 1 : 0,
            profile.linkedinUrl && profile.linkedinUrl.trim().length > 0 ? 1 : 0,
            profile.cvFile && profile.cvFile.trim().length > 0 ? 1 : 0,
        ]
        
        const completedSections = sections.reduce((sum, section) => sum + section, 0)
        return Math.round((completedSections / sections.length) * 100)
    }, [profile])

    const missingItems = useMemo(() => {
        if (!profile) {
            return [
                'Profile Summary',
                'Skills',
                'Work Experience',
                'Education',
                'LinkedIn Profile',
                'CV/Resume'
            ]
        }
        
        const items = []
        if (!profile.summary) items.push('Profile Summary')
        if (!profile.skills || profile.skills.length === 0) items.push('Skills')
        if (!profile.experiences || profile.experiences.length === 0) items.push('Work Experience')
        if (!profile.educations || profile.educations.length === 0) items.push('Education')
        if (!profile.linkedinUrl) items.push('LinkedIn Profile')
        if (!profile.cvFile) items.push('CV/Resume')
        
        return items
    }, [profile])

    const completedItems = useMemo(() => {
        if (!profile) return []
        
        const items = []
        if (profile.summary) items.push('Profile Summary')
        if (profile.skills && profile.skills.length > 0) items.push('Skills')
        if (profile.experiences && profile.experiences.length > 0) items.push('Work Experience')
        if (profile.educations && profile.educations.length > 0) items.push('Education')
        if (profile.linkedinUrl) items.push('LinkedIn Profile')
        if (profile.cvFile) items.push('CV/Resume')
        
        return items
    }, [profile])

    if (loading) {
        return (
            <div className="space-y-6">
                <Card className="p-6">
                    <div className="animate-pulse">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                                <div>
                                    <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-48"></div>
                                </div>
                            </div>
                            <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }

    if (error) {
        return (
            <Card className="p-6">
                <div className="text-center">
                    <HiOutlineXCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Profile</h3>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <Button variant="solid" onClick={fetchProfile}>
                        Try Again
                    </Button>
                </div>
            </Card>
        )
    }

    const getProgressColor = (percent: number) => {
        if (percent >= 80) return 'text-green-600'
        if (percent >= 60) return 'text-blue-600'
        if (percent >= 40) return 'text-yellow-600'
        return 'text-red-600'
    }

    const getProgressVariant = (percent: number) => {
        if (percent >= 80) return 'success'
        if (percent >= 60) return 'primary'
        if (percent >= 40) return 'warning'
        return 'danger'
    }

    return (
        <div className="space-y-6">
            {/* Header Card */}
            <Card className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <DefaultAvatar
                            src={user?.avatar}
                            name={user?.userName}
                            size={80}
                            className="border-4 border-white shadow-lg"
                        />
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                {user?.userName || 'User'}
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                                    completeness >= 80 
                                        ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20'
                                        : completeness >= 60 
                                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                        : completeness >= 40 
                                        ? 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20'
                                        : 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
                                }`}>
                                    {completeness >= 80 ? 'Profile Complete' : 
                                     completeness >= 60 ? 'Profile Good' : 
                                     completeness >= 40 ? 'Profile Fair' : 'Profile Incomplete'}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-col items-center gap-4">
                        <div className="text-center">
                            <Progress 
                                variant="circle" 
                                percent={completeness} 
                                width={120} 
                                showInfo={true}
                                customColorClass={getProgressColor(completeness)}
                            />
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                {completeness}%
                            </div>
                            <div className="text-sm text-gray-500">Complete</div>
                        </div>
                        <Button 
                            variant="solid" 
                            onClick={() => navigate(profile ? '/profile/edit' : '/profile/create')}
                            icon={<HiOutlinePencilAlt />}
                        >
                            {profile ? 'Edit Profile' : 'Create Profile'}
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Progress Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Completed Sections */}
                <Card className="p-6">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <HiOutlineCheckCircle className="text-green-500" />
                        Completed Sections
                    </h2>
                    {completedItems.length === 0 ? (
                        <p className="text-gray-500 italic">No sections completed yet</p>
                    ) : (
                        <ul className="space-y-3">
                            {completedItems.map((item) => (
                                <li key={item} className="flex items-center gap-3">
                                    <HiOutlineCheckCircle className="text-green-500 flex-shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </Card>

                {/* Missing Sections */}
                <Card className="p-6">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <HiOutlineXCircle className="text-red-500" />
                        Missing Sections
                    </h2>
                    {missingItems.length === 0 ? (
                        <div className="text-center py-4">
                            <HiOutlineCheckCircle className="mx-auto h-12 w-12 text-green-500 mb-2" />
                            <p className="text-green-600 font-medium">Your profile looks complete! 🎉</p>
                        </div>
                    ) : (
                        <ul className="space-y-3">
                            {missingItems.map((item) => (
                                <li key={item} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <HiOutlineXCircle className="text-red-500 flex-shrink-0" />
                                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                    </div>
                                    <Button 
                                        size="sm" 
                                        variant="plain" 
                                        onClick={() => navigate(profile ? '/profile/edit' : '/profile/create')}
                                    >
                                        Complete
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    )}
                </Card>
            </div>

            {/* Tips Card */}
            <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Profile Tips</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">Complete Profile</h3>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Add a compelling summary</li>
                            <li>• Include relevant skills</li>
                            <li>• List your work experience</li>
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">Stand Out</h3>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Upload a professional CV</li>
                            <li>• Connect your LinkedIn profile</li>
                            <li>• Keep information up to date</li>
                        </ul>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default ProfileCompleteness
