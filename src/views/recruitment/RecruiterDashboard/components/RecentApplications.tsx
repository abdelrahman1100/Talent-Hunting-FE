import Card from '@/components/ui/Card'
import Tag from '@/components/ui/Tag'
import Button from '@/components/ui/Button'
import { useNavigate } from 'react-router'
import { RECRUITMENT_PREFIX_PATH } from '@/constants/route.constant'
import type { Application } from '@/views/recruitment/opportunities/OpportunityDetails/type'

type RecentApplicationsProps = {
    data: Application[]
}

const RecentApplications = ({ data }: RecentApplicationsProps) => {
    const navigate = useNavigate()

    const handleViewMore = () => {
        navigate(`${RECRUITMENT_PREFIX_PATH}/applications`)
    }

    const handleApplicationClick = (profileId: number) => {
        navigate(
            `${RECRUITMENT_PREFIX_PATH}/candidates/candidate-details/${profileId}`,
        )
    }

    const statusColor: Record<string, string> = {
        pending:
            'bg-amber-200 dark:bg-amber-200 text-gray-900 dark:text-gray-900',
        accepted:
            'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900',
        rejected: 'bg-red-200 dark:bg-red-200 text-gray-900 dark:text-gray-900',
    }

    return (
        <Card>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Recent Applications</h3>
                {/* <Button size="sm" onClick={handleViewMore}>
                    View All
                </Button> */}
            </div>

            <div>
                {data.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">
                        No applications found
                    </p>
                ) : (
                    data.map((application) => (
                        <Card
                            key={application.id}
                            className="mb-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
                            onClick={() =>
                                handleApplicationClick(application.profile.id)
                            }
                        >
                            <div className="flex items-center justify-between gap-3">
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Application #{application.id}
                                </div>
                                <Tag
                                    className={
                                        statusColor[
                                            application.application_status
                                        ] ||
                                        'bg-gray-200 dark:bg-gray-200 text-gray-900 dark:text-gray-900'
                                    }
                                >
                                    <span className="capitalize">
                                        {application.application_status}
                                    </span>
                                </Tag>
                            </div>
                            <div className="mt-4 flex flex-col gap-2">
                                <div>
                                    <span className="font-semibold">
                                        Opportunity:
                                    </span>{' '}
                                    <span className="text-gray-700 dark:text-gray-300">
                                        {application.opportunity.title}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-semibold">
                                        Applied:
                                    </span>{' '}
                                    <span className="text-gray-700 dark:text-gray-300">
                                        {new Date(
                                            application.generated_date,
                                        ).toLocaleDateString()}
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

export default RecentApplications
