import Card from '@/components/ui/Card'
import { HiClock, HiCalendar, HiUser, HiShieldCheck } from 'react-icons/hi'
import { User } from '../UserList/types'

const UserTimelineSection = ({ user }: { user: User }) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const timelineEvents = [
        {
            id: 1,
            type: 'created',
            title: 'Account Created',
            description: 'User account was created in the system',
            date: user.generated_date,
            icon: HiUser,
            color: 'text-green-600 dark:text-green-400',
            bgColor: 'bg-green-100 dark:bg-green-900/20',
        },
        ...(user.last_updated_date &&
        user.last_updated_date !== user.generated_date
            ? [
                  {
                      id: 2,
                      type: 'updated',
                      title: 'Account Updated',
                      description: 'User information was last modified',
                      date: user.last_updated_date,
                      icon: HiShieldCheck,
                      color: 'text-blue-600 dark:text-blue-400',
                      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
                  },
              ]
            : []),
    ]

    return (
        <Card>
            <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Account Timeline
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    History of account activities and changes
                </p>
            </div>

            <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>

                {/* Timeline Events */}
                <div className="space-y-6">
                    {timelineEvents.map((event, index) => {
                        const IconComponent = event.icon
                        return (
                            <div
                                key={event.id}
                                className="relative flex items-start gap-4"
                            >
                                {/* Timeline Dot */}
                                <div
                                    className={`relative z-10 w-12 h-12 ${event.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}
                                >
                                    <IconComponent
                                        className={`w-6 h-6 ${event.color}`}
                                    />
                                </div>

                                {/* Event Content */}
                                <div className="flex-1 min-w-0 pt-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h5 className="font-semibold text-gray-900 dark:text-gray-100">
                                            {event.title}
                                        </h5>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {formatDate(event.date)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {event.description}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Account Statistics */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h5 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Account Statistics
                </h5>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
                        <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center">
                            <HiCalendar className="text-emerald-600 dark:text-emerald-400 text-lg" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Account Age
                            </p>
                            <p className="font-medium text-gray-900 dark:text-gray-100">
                                {Math.floor(
                                    (new Date().getTime() -
                                        new Date(
                                            user.generated_date,
                                        ).getTime()) /
                                        (1000 * 60 * 60 * 24),
                                )}{' '}
                                days
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                            <HiClock className="text-blue-600 dark:text-blue-400 text-lg" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Last Activity
                            </p>
                            <p className="font-medium text-gray-900 dark:text-gray-100">
                                {user.last_updated_date
                                    ? formatDate(user.last_updated_date)
                                    : 'Never'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default UserTimelineSection
