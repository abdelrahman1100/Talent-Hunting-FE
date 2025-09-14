import { Fragment, useState } from 'react'
import Avatar from '@/components/ui/Avatar'
import Tooltip from '@/components/ui/Tooltip'
import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import { TbUser, TbUsers, TbX } from 'react-icons/tb'
import { useRoleUsers, type RoleUser } from '@/hooks/useRoleUsers'
import { formatUserImage, getUserInitials } from '@/utils/userImageUtils'

type UserAvatarsProps = {
    users: RoleUser[]
    total?: number
    maxDisplay?: number
    size?: 'sm' | 'md' | 'lg'
    showNames?: boolean
    className?: string
    roleId?: string | number | null // Add roleId to fetch all users
    showStatusDots?: boolean // Control whether to show status indicator dots
}

const UserAvatars = ({
    users,
    total,
    maxDisplay = 4,
    size = 'sm',
    showNames = false,
    className = '',
    roleId,
    showStatusDots = false,
}: UserAvatarsProps) => {
    const [showAllUsers, setShowAllUsers] = useState(false)

    // Fetch all users only when dialog is open and roleId is provided
    const { users: allUsers, isLoading: loadingAllUsers } = useRoleUsers(
        showAllUsers && roleId ? roleId : null,
        {
            pageIndex: 1,
            pageSize: 100, // Get a large number to show all users
            sort: { order: 'ASC', key: 'name' },
        },
    )

    const displayUsers = users.slice(0, maxDisplay)
    const remainingCount = (total || users.length) - maxDisplay
    const hasMore = remainingCount > 0

    if (users.length === 0) {
        return (
            <div className={`flex items-center text-gray-400 ${className}`}>
                <TbUser className="text-lg mr-1" />
                <span className="text-xs">No users assigned</span>
            </div>
        )
    }

    return (
        <>
            <div className={`flex items-center ${className}`}>
                <div className="flex -space-x-2">
                    {displayUsers.map((user, index) => (
                        <Fragment key={user.id}>
                            <Tooltip title={user.name}>
                                <div className="relative">
                                    <Avatar
                                        size={size}
                                        shape="circle"
                                        src={formatUserImage(user.user_img)}
                                        alt={user.name}
                                        className="border-2 border-white hover:z-10 transition-all duration-200 hover:scale-110 shadow-md"
                                    >
                                        {!user.user_img &&
                                            getUserInitials(user.name)}
                                    </Avatar>
                                    {/* Status indicator dot - only show if enabled */}
                                    {showStatusDots && (
                                        <div
                                            className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
                                                user.status === 'active'
                                                    ? 'bg-green-500'
                                                    : 'bg-red-500'
                                            }`}
                                        />
                                    )}
                                </div>
                            </Tooltip>
                        </Fragment>
                    ))}

                    {hasMore && (
                        <Tooltip
                            title={`Click to see ${remainingCount} more user${remainingCount !== 1 ? 's' : ''}`}
                        >
                            <button
                                onClick={() => setShowAllUsers(true)}
                                className={`
                                    flex items-center justify-center rounded-full bg-gray-200 
                                    text-gray-600 border-2 border-white
                                    text-xs font-medium hover:z-10 transition-all duration-200 hover:scale-110 
                                    hover:bg-gray-300 cursor-pointer shadow-md
                                    ${size === 'sm' ? 'w-8 h-8' : ''}
                                    ${size === 'md' ? 'w-10 h-10' : ''}
                                    ${size === 'lg' ? 'w-12 h-12' : ''}
                                `}
                            >
                                +{remainingCount}
                            </button>
                        </Tooltip>
                    )}
                </div>

                {showNames && (
                    <div className="ml-3 min-w-0">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <TbUsers className="mr-1 flex-shrink-0" />
                            <span className="truncate">
                                {total || users.length} user
                                {(total || users.length) !== 1 ? 's' : ''}{' '}
                                assigned
                            </span>
                        </div>
                        {displayUsers.length > 0 && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {displayUsers.map((u) => u.name).join(', ')}
                                {hasMore && ` and ${remainingCount} more`}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* All Users Dialog */}
            <Dialog
                isOpen={showAllUsers}
                onClose={() => setShowAllUsers(false)}
                onRequestClose={() => setShowAllUsers(false)}
            >
                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-lg font-semibold">
                        All Assigned Users
                    </h5>
                    <Button
                        variant="plain"
                        size="xs"
                        icon={<TbX />}
                        onClick={() => setShowAllUsers(false)}
                    />
                </div>

                <div className="max-h-96 overflow-y-auto">
                    {loadingAllUsers ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
                            <span className="text-sm text-gray-500">
                                Loading all users...
                            </span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-3">
                            {allUsers.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <div className="relative">
                                        <Avatar
                                            size="md"
                                            shape="circle"
                                            src={formatUserImage(user.user_img)}
                                            alt={user.name}
                                            className="border-2 border-white dark:border-gray-800"
                                        >
                                            {!user.user_img &&
                                                getUserInitials(user.name)}
                                        </Avatar>
                                        <div
                                            className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
                                                user.status === 'active'
                                                    ? 'bg-green-500'
                                                    : 'bg-red-500'
                                            }`}
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium text-gray-900 dark:text-gray-100 truncate">
                                            {user.name}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                            {user.email}
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <span
                                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                user.status === 'active'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                                    : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                                            }`}
                                        >
                                            <span
                                                className={`w-1.5 h-1.5 rounded-full mr-1 ${
                                                    user.status === 'active'
                                                        ? 'bg-green-400'
                                                        : 'bg-red-400'
                                                }`}
                                            />
                                            {user.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                        Total: {allUsers.length} user
                        {allUsers.length !== 1 ? 's' : ''} assigned
                    </p>
                </div>
            </Dialog>
        </>
    )
}

export default UserAvatars
