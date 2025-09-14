import { useState } from 'react'
import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import {
    HiEye,
    HiUser,
    HiCamera,
    HiPencil,
    HiMail,
    HiShieldCheck,
    HiGlobe,
    HiIdentification,
} from 'react-icons/hi'
import Dialog from '@/components/ui/Dialog'
import { useNavigate } from 'react-router'
import { Tooltip } from '@/components/ui/Tooltip'
import { ADMIN_PREFIX_PATH } from '@/constants/route.constant'
import Tag from '@/components/ui/Tag'
import { User } from '../UserList/types'
import { formatUserImage, getUserInitials } from '@/utils/userImageUtils'

const UserImageSection = ({ user }: { user: User }) => {
    const [viewOpen, setViewOpen] = useState(false)
    const userImage = formatUserImage(user.user_img)
    const initials = getUserInitials(user.name)
    const navigate = useNavigate()

    const statusColor: Record<string, string> = {
        active: 'bg-emerald-200 dark:bg-emerald-200 text-emerald-800 dark:text-emerald-800',
        inactive: 'bg-red-200 dark:bg-red-200 text-red-800 dark:text-red-800',
        blocked:
            'bg-gray-200 dark:bg-gray-200 text-gray-800 dark:text-gray-800',
    }

    const handleEdit = () => {
        navigate(`${ADMIN_PREFIX_PATH}/user/user-edit/${user.id}`)
    }

    return (
        <Card>
            <div className="mb-3">
                {/* <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    User Profile
                </h4> */}
                {/* <p className="text-sm text-gray-500 dark:text-gray-400">
                    Personal information and account details
                </p> */}
            </div>

            {/* Profile Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-start gap-4 flex-1">
                    {/* Profile Image */}
                    <div className="relative">
                        {userImage ? (
                            <div className="group relative">
                                <Avatar
                                    size={80}
                                    shape="circle"
                                    className="border-4 border-white dark:border-gray-700 shadow-lg cursor-pointer"
                                    src={userImage || undefined}
                                    onClick={() => setViewOpen(true)}
                                >
                                    {!userImage && initials}
                                </Avatar>
                                <div className="absolute inset-0 bg-black/40 group-hover:flex hidden items-center justify-center rounded-full">
                                    <HiEye className="text-white text-sm" />
                                </div>
                            </div>
                        ) : (
                            <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-700 shadow-lg">
                                <HiCamera className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                            </div>
                        )}
                    </div>

                    {/* User Name and Basic Info */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                            {user.name}
                        </h3>
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                            <Tag
                                className={
                                    statusColor[user.status] ||
                                    'bg-gray-200 dark:bg-gray-200 text-gray-800 dark:text-gray-800'
                                }
                            >
                                <span className="capitalize">
                                    {user.status}
                                </span>
                            </Tag>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                ID: #{user.id}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <HiMail className="text-gray-400" />
                            <span>{user.email}</span>
                        </div>
                    </div>
                </div>

                <Tooltip title="Edit user">
                    <button
                        className="close-button button-press-feedback"
                        type="button"
                        onClick={handleEdit}
                    >
                        <HiPencil />
                    </button>
                </Tooltip>
            </div>

            {/* Personal Information */}
            <div className="space-y-4 mb-6">
                <h5 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Personal Information
                </h5>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Gender */}
                    <div className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/20">
                        <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <HiUser className="text-pink-600 dark:text-pink-400 text-lg" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Gender
                            </p>
                            <p className="font-medium text-gray-900 dark:text-gray-100">
                                {user.gender?.label || 'Not specified'}
                            </p>
                        </div>
                    </div>

                    {/* Nationality */}
                    <div className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/20">
                        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <HiGlobe className="text-indigo-600 dark:text-indigo-400 text-lg" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Nationality
                            </p>
                            <p className="font-medium text-gray-900 dark:text-gray-100">
                                {user.nationality?.label || 'Not specified'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Organization Information */}
            <div className="space-y-4">
                <h5 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Organization
                </h5>

                <div className="space-y-3">
                    {user.department && (
                        <div className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/20">
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                <HiShieldCheck className="text-green-600 dark:text-green-400 text-lg" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Department
                                </p>
                                <p className="font-medium text-gray-900 dark:text-gray-100">
                                    {user.department.name}
                                </p>
                            </div>
                        </div>
                    )}

                    {user.department?.company && (
                        <div className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/20">
                            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                <HiShieldCheck className="text-orange-600 dark:text-orange-400 text-lg" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Company
                                </p>
                                <p className="font-medium text-gray-900 dark:text-gray-100">
                                    {user.department.company.name}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Full Size Image Dialog */}
            {userImage && (
                <Dialog
                    isOpen={viewOpen}
                    onClose={() => setViewOpen(false)}
                    onRequestClose={() => setViewOpen(false)}
                >
                    <div className="p-6">
                        <h5 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                            Profile Image - {user.name}
                        </h5>
                        <div className="flex justify-center">
                            <img
                                className="max-w-full max-h-96 object-contain rounded-lg shadow-lg"
                                src={userImage}
                                alt={`Profile image of ${user.name}`}
                            />
                        </div>
                        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                            <p>User ID: #{user.id}</p>
                            <p>Status: {user.status}</p>
                        </div>
                    </div>
                </Dialog>
            )}
        </Card>
    )
}

export default UserImageSection
