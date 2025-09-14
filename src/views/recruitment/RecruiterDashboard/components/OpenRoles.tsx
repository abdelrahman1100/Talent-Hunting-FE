import Card from '@/components/ui/Card'
import Tag from '@/components/ui/Tag'
import Button from '@/components/ui/Button'
import { useNavigate } from 'react-router'
import { RECRUITMENT_PREFIX_PATH } from '@/constants/route.constant'
import type { Opportunity } from '@/views/recruitment/opportunities/OpportunityList/types'

type OpenRolesProps = {
    data: Opportunity[]
}

const OpenRoles = ({ data }: OpenRolesProps) => {
    const navigate = useNavigate()

    const handleViewMore = () => {
        navigate(`${RECRUITMENT_PREFIX_PATH}/opportunities/opportunities-list`)
    }

    const handleRoleClick = (id: number) => {
        navigate(
            `${RECRUITMENT_PREFIX_PATH}/opportunities/opportunity-details/${id}`,
        )
    }

    const getScopeColor = (scope: string) => {
        switch (scope) {
            case 'external':
                return 'bg-blue-200 dark:bg-blue-200 text-gray-900 dark:text-gray-900'
            case 'internal':
                return 'bg-purple-200 dark:bg-purple-200 text-gray-900 dark:text-gray-900'
            default:
                return 'bg-gray-200 dark:bg-gray-200 text-gray-900 dark:text-gray-900'
        }
    }

    return (
        <Card>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Open Roles</h3>
                <Button size="sm" onClick={handleViewMore}>
                    View All
                </Button>
            </div>
            <div>
                {data.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">
                        No open roles found
                    </p>
                ) : (
                    data.map((role) => (
                        <Card
                            key={role.id}
                            className="mb-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
                            onClick={() => handleRoleClick(role.id)}
                        >
                            <div className="flex items-center justify-between gap-3">
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    <h1 className="text-lg font-semibold">
                                        {role.title}
                                    </h1>
                                </div>
                                <Tag
                                    className={
                                        getScopeColor(role.publishScope) ||
                                        'bg-gray-200 dark:bg-gray-200 text-gray-900 dark:text-gray-900'
                                    }
                                >
                                    <span className="capitalize">
                                        {role.publishScope}
                                    </span>
                                </Tag>
                            </div>
                            <div className="mt-4 flex flex-col gap-2">
                                <div>
                                    <span className="font-semibold">
                                        Department:
                                    </span>{' '}
                                    <span className="text-gray-700 dark:text-gray-300">
                                        {role.department?.name}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-semibold">
                                        Department:
                                    </span>{' '}
                                    <span className="text-gray-700 dark:text-gray-300">
                                        {role.department?.name}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-semibold">
                                        Job Type:
                                    </span>{' '}
                                    <span className="text-gray-700 dark:text-gray-300">
                                        {role.jobType}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-semibold">
                                        Salary Range:
                                    </span>{' '}
                                    <span className="text-gray-700 dark:text-gray-300">
                                        ${role.salary_min} - ${role.salary_max}
                                    </span>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </Card>
    )
}

export default OpenRoles
