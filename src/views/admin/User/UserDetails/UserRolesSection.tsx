import Card from '@/components/ui/Card'
import { HiShieldCheck, HiInformationCircle } from 'react-icons/hi'
import Tag from '@/components/ui/Tag'
import { User } from '../UserList/types'

const UserRolesSection = ({ user }: { user: User }) => {
    if (!user.roles || user.roles.length === 0) {
        return (
            <Card>
                <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        User Roles
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Roles and permissions assigned to this user
                    </p>
                </div>

                <div className="flex items-center justify-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                    <div className="text-center">
                        <HiInformationCircle className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                            No Roles Assigned
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            This user doesn't have any roles assigned yet.
                        </p>
                    </div>
                </div>
            </Card>
        )
    }

    return (
        <Card>
            <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    User Roles
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Roles and permissions assigned to this user (
                    {user.roles.length} role{user.roles.length !== 1 ? 's' : ''}
                    )
                </p>
            </div>

            <div className="space-y-4">
                {user.roles.map((role) => (
                    <div
                        key={role.id}
                        className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/20"
                    >
                        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <HiShieldCheck className="text-indigo-600 dark:text-indigo-400 text-lg" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                                <h5 className="font-semibold text-gray-900 dark:text-gray-100">
                                    {role.name}
                                </h5>
                                <Tag className="bg-indigo-100 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-200 text-xs">
                                    Role ID: {role.id}
                                </Tag>
                            </div>

                            {role.description && (
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                    {role.description}
                                </p>
                            )}

                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                <span>Status: {role.status}</span>
                                <span>•</span>
                                <span>
                                    Created:{' '}
                                    {new Date(
                                        role.generated_date,
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Role Summary */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {user.roles.length}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Total Roles
                        </div>
                    </div>

                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {
                                user.roles.filter(
                                    (role) => role.status === 'active',
                                ).length
                            }
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Active Roles
                        </div>
                    </div>

                    <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            {
                                user.roles.filter(
                                    (role) => role.status === 'inactive',
                                ).length
                            }
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Inactive Roles
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default UserRolesSection
