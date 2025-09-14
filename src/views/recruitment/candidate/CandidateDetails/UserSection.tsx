import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar/Avatar'
import Tag from '@/components/ui/Tag'
import { FaLinkedinIn } from 'react-icons/fa'
import { PiUserDuotone } from 'react-icons/pi'
import { User, CandidateProfile } from './type'
import { useState } from 'react'

const UserProfile = ({
    user,
    profile,
}: {
    user: User
    profile: CandidateProfile
}) => {
    const [imageError, setImageError] = useState(false)

    // Status color mapping for different candidate statuses
    const statusColor: Record<string, string> = {
        active: 'bg-emerald-200 dark:bg-emerald-200 text-emerald-800 dark:text-emerald-800',
        inactive:
            'bg-gray-200 dark:bg-gray-200 text-gray-800 dark:text-gray-800',
    }

    // Get status color or use default
    const getStatusColor = (status: string) => {
        const normalizedStatus = status.toLowerCase()
        return statusColor[normalizedStatus] || statusColor.default
    }

    // Format date for better display
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    }

    // Handle LinkedIn click
    const handleLinkedInClick = () => {
        if (profile.linkedinUrl) {
            window.open(profile.linkedinUrl, '_blank', 'noopener,noreferrer')
        }
    }

    // Handle image error
    const handleImageError = () => {
        setImageError(true)
    }

    // Determine if we should show the icon fallback
    const shouldShowIcon = !user.user_img || imageError

    return (
        <Card className="w-full">
            <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
                {/* Header Section with Avatar and Name */}
                <div className="flex xl:flex-col items-center gap-4 mt-6">
                    <div className="relative">
                        <Avatar
                            size={90}
                            shape="circle"
                            src={
                                shouldShowIcon
                                    ? undefined
                                    : user.user_img || undefined
                            }
                            icon={
                                shouldShowIcon ? <PiUserDuotone /> : undefined
                            }
                        />
                        {/* Hidden image to detect errors */}
                        {user.user_img && !imageError && (
                            <img
                                src={user.user_img}
                                alt=""
                                style={{ display: 'none' }}
                                onError={handleImageError}
                            />
                        )}
                    </div>
                    <div className="text-center xl:text-center">
                        <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                            {user.name}
                        </h4>
                        {/* LinkedIn Icon */}
                        {profile.linkedinUrl && (
                            <div className="flex justify-center">
                                <button
                                    onClick={handleLinkedInClick}
                                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                                    title="View LinkedIn Profile"
                                >
                                    <FaLinkedinIn className="text-[#155fb8] text-xl" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* User Information Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-y-1 gap-x-4 mt-8">
                    {/* Email Section */}
                    <div className=" p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                                Email
                            </span>
                        </div>
                        <p className="text-gray-900 dark:text-gray-100 font-semibold break-all">
                            {user.email}
                        </p>
                    </div>

                    {/* Status Section */}
                    <div className=" p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                                Status
                            </span>
                        </div>
                        <Tag className={getStatusColor(user.status)}>
                            {user.status}
                        </Tag>
                    </div>

                    {/* Created Date Section */}
                    <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                                Member Since
                            </span>
                        </div>
                        <p className="text-gray-900 dark:text-gray-100 font-semibold">
                            {formatDate(user.generated_date)}
                        </p>
                    </div>
                </div>

                {/* Additional Info Section */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Candidate ID: #{user.id}
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default UserProfile

 