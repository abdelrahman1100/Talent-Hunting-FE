import Card from '@/components/ui/Card'
import { useActivityAnalytics } from '../hooks/useDashboardData'
import {
    TbActivity,
    TbUserPlus,
    TbShield,
    TbBuilding,
    TbClock,
} from 'react-icons/tb'

const ActivityAnalytics = () => {
    const { data, loading, error } = useActivityAnalytics('7d')

    // Show loading state
    if (loading) {
        return (
            <Card>
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="h-16 bg-gray-200 rounded"
                            ></div>
                        ))}
                    </div>
                </div>
            </Card>
        )
    }

    // Show error state
    if (error) {
        return (
            <Card>
                <div className="text-center text-red-600 p-8">
                    <p>Failed to load activity analytics</p>
                    <p className="text-sm text-gray-500">{error}</p>
                </div>
            </Card>
        )
    }

    // Use data or fallback to empty arrays
    const activityData = data || {
        loginPatterns: [],
        recentActivities: [],
        peakUsageTimes: [],
    }

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'user_created':
                return (
                    <TbUserPlus className="text-green-600 dark:text-green-400" />
                )
            case 'role_assigned':
                return <TbShield className="text-blue-600 dark:text-blue-400" />
            case 'company_created':
                return (
                    <TbBuilding className="text-purple-600 dark:text-purple-400" />
                )
            default:
                return (
                    <TbActivity className="text-gray-600 dark:text-gray-400" />
                )
        }
    }

    const getActivityColor = (type: string) => {
        switch (type) {
            case 'user_created':
                return 'bg-green-100 dark:bg-green-900/20'
            case 'role_assigned':
                return 'bg-blue-100 dark:bg-blue-900/20'
            case 'company_created':
                return 'bg-purple-100 dark:bg-purple-900/20'
            default:
                return 'bg-gray-100 dark:bg-gray-900/20'
        }
    }

    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    return (
        <Card>
            <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Activity Analytics
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Recent system activities and usage patterns
                </p>
            </div>

            {/* Activity Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <TbActivity className="text-blue-600 dark:text-blue-400 text-lg" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Total Activities
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                            {activityData.recentActivities.length}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                        <TbUserPlus className="text-green-600 dark:text-green-400 text-lg" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            User Creations
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                            {
                                activityData.recentActivities.filter(
                                    (a) => a.type === 'user_created',
                                ).length
                            }
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                        <TbShield className="text-purple-600 dark:text-purple-400 text-lg" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Role Assignments
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                            {
                                activityData.recentActivities.filter(
                                    (a) => a.type === 'role_assigned',
                                ).length
                            }
                        </p>
                    </div>
                </div>
            </div>

            {/* Recent Activities */}
            <div>
                <h5 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Recent Activities
                </h5>
                <div className="space-y-3">
                    {activityData.recentActivities.length > 0 ? (
                        activityData.recentActivities
                            .slice(0, 10)
                            .map((activity, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/20"
                                >
                                    <div
                                        className={`w-8 h-8 ${getActivityColor(activity.type)} rounded-lg flex items-center justify-center flex-shrink-0 mt-1`}
                                    >
                                        {getActivityIcon(activity.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            {activity.description}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <TbClock className="text-gray-400 text-xs" />
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                {formatTimestamp(
                                                    activity.timestamp,
                                                )}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                •
                                            </span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                {activity.user}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <TbActivity className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                            <p>No recent activities available</p>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    )
}

export default ActivityAnalytics
