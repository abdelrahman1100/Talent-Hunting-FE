import Card from '@/components/ui/Card'
import Tag from '@/components/ui/Tag'
import Button from '@/components/ui/Button'
import { useNavigate } from 'react-router'
import { RECRUITMENT_PREFIX_PATH } from '@/constants/route.constant'
import { Application } from './type'

type ApplicationSectionProps = {
    applications: Application[]
    maxItems?: number
    onViewMore?: () => void
    showViewMoreButton?: boolean
}

const ApplicationSection = ({
    applications,
    maxItems = 10,
    onViewMore,
    showViewMoreButton = true,
}: ApplicationSectionProps) => {
    const navigate = useNavigate()

    const statusColor: Record<string, string> = {
        pending:
            'bg-amber-200 dark:bg-amber-200 text-gray-900 dark:text-gray-900',
        accepted:
            'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900',
        rejected: 'bg-red-200 dark:bg-red-200 text-gray-900 dark:text-gray-900',
    }

    const handleApplicationClick = (profileId: number) => {
        navigate(
            `${RECRUITMENT_PREFIX_PATH}/candidates/candidate-details/${profileId}`,
        )
    }

    return (
        <div>
            {applications.length === 0 ? (
                <p>No applications found.</p>
            ) : (
                applications.slice(0, maxItems).map((app) => (
                    <Card
                        key={app.id}
                        className="mb-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
                        onClick={() => handleApplicationClick(app.profile.id)}
                    >
                        <div className="flex items-center justify-between gap-3">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Application #{app.id}
                            </div>
                            <Tag
                                className={
                                    statusColor[app.application_status] ||
                                    'bg-gray-200 dark:bg-gray-200 text-gray-900 dark:text-gray-900'
                                }
                            >
                                <span className="capitalize">
                                    {app.application_status}
                                </span>
                            </Tag>
                        </div>
                        <div className="mt-4 flex flex-col gap-2">
                            {/* <div>
                                <span className="font-semibold">LinkedIn:</span>{' '}
                                {app.profile.linkedinUrl ? (
                                    <a
                                        href={app.profile.linkedinUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline break-all"
                                    >
                                        {app.profile.linkedinUrl}
                                    </a>
                                ) : (
                                    <span className="text-gray-500">N/A</span>
                                )}
                            </div> */}
                        </div>
                    </Card>
                ))
            )}
            {showViewMoreButton && (
                <div className="mt-2 flex justify-center">
                    <Button variant="default" onClick={onViewMore}>
                        View more details
                    </Button>
                </div>
            )}
        </div>
    )
}

export default ApplicationSection
