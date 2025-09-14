import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import classNames from '@/utils/classNames'
import { Link } from 'react-router'
import { TbBriefcase, TbCheck, TbFileText, TbClock } from 'react-icons/tb'
import { RecruitmentOverview as RecruitmentOverviewType } from '../types'
import type { ReactNode } from 'react'
import { RECRUITMENT_PREFIX_PATH } from '@/constants/route.constant'

type StatisticCardProps = {
    title: string
    icon: ReactNode
    className: string
    value: number
}

type RecruitmentOverviewProps = {
    data: RecruitmentOverviewType
}

const StatisticCard = ({
    title,
    className,
    icon,
    value,
}: StatisticCardProps) => {
    return (
        <div
            className={classNames(
                'rounded-2xl p-4 flex flex-col justify-center',
                className,
            )}
        >
            <div className="flex justify-between items-center relative">
                <div>
                    <div className="mb-4 text-gray-900 font-bold">{title}</div>
                    <h1 className="mb-1 text-gray-900">{value}</h1>
                </div>
                <div
                    className={
                        'flex items-center justify-center min-h-12 min-w-12 max-h-12 max-w-12 bg-gray-900 text-white rounded-full text-2xl'
                    }
                >
                    {icon}
                </div>
            </div>
        </div>
    )
}

const RecruitmentOverview = ({ data }: RecruitmentOverviewProps) => {
    return (
        <Card>
            <div className="flex items-center justify-between">
                <h4>Recruitment Overview</h4>
                <Link
                    to={`${RECRUITMENT_PREFIX_PATH}/opportunities/opportunities-list`}
                >
                    <Button asElement="div" size="sm">
                        View All Opportunities
                    </Button>
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 rounded-2xl mt-4">
                <StatisticCard
                    title="Total Opportunities"
                    className="bg-sky-100 dark:bg-sky/75"
                    value={data.totalOpportunities}
                    icon={<TbBriefcase />}
                />
                <StatisticCard
                    title="Active Opportunities"
                    className="bg-emerald-100 dark:bg-emerald/75"
                    value={data.activeOpportunities}
                    icon={<TbCheck />}
                />
                <StatisticCard
                    title="Total Applications"
                    className="bg-purple-100 dark:bg-purple/75"
                    value={data.totalApplications}
                    icon={<TbFileText />}
                />
                {/* <StatisticCard
                    title="Pending Applications"
                    className="bg-amber-100 dark:bg-amber/75"
                    value={data.pendingApplications}
                    icon={<TbClock />}
                /> */}
            </div>
        </Card>
    )
}

export default RecruitmentOverview
