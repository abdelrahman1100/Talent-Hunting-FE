import React, { useState, useEffect } from 'react'
import { 
    Card, 
    Button, 
    Progress, 
    Avatar,
    Alert
} from '@/components/ui'
import { 
    HiOutlineBriefcase, 
    HiOutlineUser, 
    HiOutlineDocumentText,
    HiOutlineCheckCircle,
    HiOutlineClock,
    HiOutlineTrendingUp,
    HiOutlinePlus,
    HiOutlineEye
} from 'react-icons/hi'
import { useNavigate } from 'react-router'
import { getProfile } from '@/services/ProfileService'
import { getOpportunities } from '@/services/OpportunityService'
import { getCandidateApplications } from '@/services/CandidateApplicationService'
import { useSessionUser } from '@/store/authStore'
import DefaultAvatar from '@/components/shared/DefaultAvatar'
import RecruiterDashboard from '@/views/recruitment/RecruiterDashboard'
import AdminDashboard from '@/views/admin/Dashboard/index'
import type { Profile } from '@/@types/profile'
import type { JobOpportunity } from '@/@types/opportunity'
import type { CandidateApplication } from '@/@types/application'

const Home = () => {
    const navigate = useNavigate()
    const { user } = useSessionUser()
    const [profile, setProfile] = useState<Profile | null>(null)
    const [opportunities, setOpportunities] = useState<JobOpportunity[]>([])
    const [applications, setApplications] = useState<CandidateApplication[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Determine user role and show appropriate dashboard
    const userRole = user?.authority || 'USER'
    
    // Show different dashboards based on user role
    if (userRole.includes('admin')) {
        return <AdminDashboard />
    }
    
    if (userRole.includes('recruiter')) {
        return <RecruiterDashboard />
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const [profileData, opportunitiesData, applicationsData] = await Promise.all([
                    getProfile().catch(() => null),
                    getOpportunities(),
                    getCandidateApplications().catch(() => [])
                ])
                
                setProfile(profileData)
                setOpportunities(opportunitiesData.slice(0, 5)) // Get latest 5 opportunities
                setApplications(applicationsData)
            } catch (err) {
                console.error('Error fetching dashboard data:', err)
                setError('Failed to load dashboard data')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const calculateCompleteness = (profile: Profile | null) => {
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
    }

    const getProgressColor = (percent: number) => {
        if (percent >= 80) return 'text-emerald-600'
        if (percent >= 60) return 'text-blue-600'
        if (percent >= 40) return 'text-orange-600'
        return 'text-red-600'
    }

    const getProgressVariant = (percent: number) => {
        if (percent >= 80) return 'success'
        if (percent >= 60) return 'primary'
        if (percent >= 40) return 'warning'
        return 'danger'
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="h-64 bg-gray-200 rounded"></div>
                        <div className="h-64 bg-gray-200 rounded"></div>
                        <div className="h-64 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <Alert showIcon type="danger" className="mb-4">
                {error}
            </Alert>
        )
    }

    const completeness = calculateCompleteness(profile)
    const activeOpportunities = opportunities.filter(opp => opp.status === 'active')
    const pendingApplications = applications.filter(app => app.application_status === 'pending')
    const totalApplications = applications.length

    return (
        <div className="space-y-6">
            {/* Welcome Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        Welcome back, {user?.userName || 'User'}! 👋
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Here's what's happening with your job search
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <DefaultAvatar 
                        size="lg"
                        userName={user?.userName || 'User'}
                        userEmail={user?.email || ''}
                    />
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Profile Completeness</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{completeness}%</p>
                        </div>
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                            <HiOutlineUser className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                    <Progress 
                        percent={completeness} 
                        variant={getProgressVariant(completeness)}
                        className="mt-4"
                    />
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Opportunities</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{activeOpportunities.length}</p>
                        </div>
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-full">
                            <HiOutlineBriefcase className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Available positions to apply</p>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">My Applications</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalApplications}</p>
                        </div>
                        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-full">
                            <HiOutlineDocumentText className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        {pendingApplications.length} pending
                    </p>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Profile Status</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                {profile ? 'Complete' : 'Incomplete'}
                            </p>
                        </div>
                        <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-full">
                            <HiOutlineCheckCircle className="w-6 h-6 text-orange-600" />
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        {profile ? 'Ready to apply' : 'Complete your profile'}
                    </p>
                </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Completeness */}
                <div className="lg:col-span-2">
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                Profile Completeness
                            </h2>
                            <Button 
                                size="sm" 
                                variant="solid"
                                onClick={() => navigate(profile ? '/profile/edit' : '/profile/create')}
                            >
                                {profile ? 'Edit Profile' : 'Create Profile'}
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Profile Summary</span>
                                <span className={`text-sm font-medium ${
                                    profile?.summary && profile.summary.trim().length > 0 
                                        ? 'text-emerald-600' 
                                        : 'text-red-600'
                                }`}>
                                    {profile?.summary && profile.summary.trim().length > 0 ? 'Complete' : 'Missing'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Skills</span>
                                <span className={`text-sm font-medium ${
                                    profile?.skills && profile.skills.length > 0 
                                        ? 'text-emerald-600' 
                                        : 'text-red-600'
                                }`}>
                                    {profile?.skills && profile.skills.length > 0 ? 'Complete' : 'Missing'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Work Experience</span>
                                <span className={`text-sm font-medium ${
                                    profile?.experiences && profile.experiences.length > 0 
                                        ? 'text-emerald-600' 
                                        : 'text-red-600'
                                }`}>
                                    {profile?.experiences && profile.experiences.length > 0 ? 'Complete' : 'Missing'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Education</span>
                                <span className={`text-sm font-medium ${
                                    profile?.educations && profile.educations.length > 0 
                                        ? 'text-emerald-600' 
                                        : 'text-red-600'
                                }`}>
                                    {profile?.educations && profile.educations.length > 0 ? 'Complete' : 'Missing'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">LinkedIn Profile</span>
                                <span className={`text-sm font-medium ${
                                    profile?.linkedinUrl && profile.linkedinUrl.trim().length > 0 
                                        ? 'text-emerald-600' 
                                        : 'text-red-600'
                                }`}>
                                    {profile?.linkedinUrl && profile.linkedinUrl.trim().length > 0 ? 'Complete' : 'Missing'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">CV/Resume</span>
                                <span className={`text-sm font-medium ${
                                    profile?.cvFile && profile.cvFile.trim().length > 0 
                                        ? 'text-emerald-600' 
                                        : 'text-red-600'
                                }`}>
                                    {profile?.cvFile && profile.cvFile.trim().length > 0 ? 'Complete' : 'Missing'}
                                </span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="lg:col-span-1">
                    <Card className="p-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                            Quick Actions
                        </h2>
                        <div className="space-y-3">
                            <Button 
                                block 
                                variant="solid"
                                onClick={() => navigate('/opportunities')}
                                icon={<HiOutlineEye />}
                            >
                                Browse Opportunities
                            </Button>
                            <Button 
                                block 
                                variant="default"
                                onClick={() => navigate('/applications')}
                                icon={<HiOutlineDocumentText />}
                            >
                                My Applications
                            </Button>
                            <Button 
                                block 
                                variant="default"
                                onClick={() => navigate(profile ? '/profile' : '/profile/create')}
                                icon={<HiOutlineUser />}
                            >
                                {profile ? 'View Profile' : 'Create Profile'}
                            </Button>
                            <Button 
                                block 
                                variant="default"
                                onClick={() => navigate('/profile/completeness')}
                                icon={<HiOutlineTrendingUp />}
                            >
                                Profile Completeness
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Recent Opportunities */}
            <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        Recent Opportunities
                    </h2>
                    <Button 
                        size="sm" 
                        variant="default"
                        onClick={() => navigate('/opportunities')}
                    >
                        View All
                    </Button>
                </div>

                {activeOpportunities.length === 0 ? (
                    <div className="text-center py-8">
                        <HiOutlineBriefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Opportunities</h3>
                        <p className="text-gray-600 mb-4">Check back later for new job opportunities</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {activeOpportunities.slice(0, 3).map((opportunity) => (
                            <div 
                                key={opportunity.id} 
                                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                                onClick={() => navigate(`/opportunities/${opportunity.id}`)}
                            >
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                                        {opportunity.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        ${opportunity.salary_min.toLocaleString()} - ${opportunity.salary_max.toLocaleString()}
                                    </p>
                                    <div className="flex items-center gap-4 mt-2">
                                        <span className="text-xs text-gray-500 flex items-center gap-1">
                                            <HiOutlineClock className="w-3 h-3" />
                                            {formatDate(opportunity.generated_date)}
                                        </span>
                                        <span className={`text-xs font-medium px-2 py-1 rounded ${
                                            opportunity.jobType === 'full-time' || opportunity.jobType === 'fulltime'
                                                ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                                                : opportunity.jobType === 'part-time' || opportunity.jobType === 'parttime'
                                                ? 'text-green-600 bg-green-50 dark:bg-green-900/20'
                                                : 'text-gray-600 bg-gray-50 dark:bg-gray-900/20'
                                        }`}>
                                            {opportunity.jobType}
                                        </span>
                                    </div>
                                </div>
                                <Button 
                                    size="sm" 
                                    variant="solid"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        navigate(`/opportunities/${opportunity.id}/apply`)
                                    }}
                                >
                                    Apply
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </Card>
        </div>
    )
}

export default Home
