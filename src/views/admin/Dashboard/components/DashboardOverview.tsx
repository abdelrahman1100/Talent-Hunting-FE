import Card from '@/components/ui/Card'
import {
    TbUsers,
    TbUserCheck,
    TbUserX,
    TbShield,
    TbBuilding,
    TbBriefcase,
    TbUserPlus,
    TbActivity,
} from 'react-icons/tb'
import { useOverviewData } from '../hooks/useDashboardData'

const KPICard = ({
    title,
    value,
    icon: Icon,
    bgColor,
    trend,
}: {
    title: string
    value: string | number
    icon: any
    bgColor: string
    trend?: { value: number; isPositive: boolean }
}) => {
    return (
        <div className="flex-1 flex items-center space-x-4 p-6">
            <div
                className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center`}
            >
                <Icon className="text-xl text-gray-800" />
            </div>
            <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-600 mb-1">
                    {title}
                </h3>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                    {typeof value === 'number' ? value.toLocaleString() : value}
                </div>
                {trend && (
                    <div
                        className={`text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}
                    >
                        {trend.isPositive ? '+' : ''}
                        {trend.value}% vs last month
                    </div>
                )}
            </div>
        </div>
    )
}

const KPIRow = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex">{children}</div>
}

const DashboardOverview = () => {
    const { data, loading, error } = useOverviewData()

    // Show loading state
    if (loading) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="h-20 bg-gray-200 rounded"
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    // Show error state
    if (error) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="text-center text-red-600">
                    <p>Failed to load dashboard data</p>
                    <p className="text-sm text-gray-500">{error}</p>
                </div>
            </div>
        )
    }

    // Use data or fallback to zeros
    const overviewData = data || {
        totalUsers: 0,
        totalActiveUsers: 0,
        totalInactiveUsers: 0,
        totalRoles: 0,
        totalCompanies: 0,
        totalDepartments: 0,
        recentRegistrations: 0,
        systemActivity: 0,
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">KPI Summary</h2>
            </div>

            {/* First Row - 3 columns */}
            <KPIRow>
                <KPICard
                    title="Total Users"
                    value={overviewData.totalUsers}
                    icon={TbUsers}
                    bgColor="bg-pink-100"
                    //trend={{ value: 5.3, isPositive: true }}
                />
                <div className="w-px bg-gray-200"></div>
                <KPICard
                    title="Active Users"
                    value={overviewData.totalActiveUsers}
                    icon={TbUserCheck}
                    bgColor="bg-blue-100"
                    //trend={{ value: 8.1, isPositive: true }}
                />
                <div className="w-px bg-gray-200"></div>
                <KPICard
                    title="Total Companies"
                    value={overviewData.totalCompanies}
                    icon={TbBuilding}
                    bgColor="bg-green-100"
                    //trend={{ value: 0.9, isPositive: true }}
                />
            </KPIRow>

            {/* Divider */}
            <div className="h-px bg-gray-200"></div>

            {/* Second Row - 3 columns */}
            <KPIRow>
                <KPICard
                    title="Total Roles"
                    value={overviewData.totalRoles}
                    icon={TbShield}
                    bgColor="bg-purple-100"
                    // trend={{ value: 16.2, isPositive: true }}
                />
                <div className="w-px bg-gray-200"></div>
                <KPICard
                    title="Inactive Users"
                    value={overviewData.totalInactiveUsers}
                    icon={TbUserX}
                    bgColor="bg-red-100"
                    //  trend={{ value: -2.1, isPositive: false }}
                />
                <div className="w-px bg-gray-200"></div>
                <KPICard
                    title="Total Departments"
                    value={overviewData.totalDepartments}
                    icon={TbBriefcase}
                    bgColor="bg-indigo-100"
                    // trend={{ value: 3.4, isPositive: true }}
                />
            </KPIRow>
        </div>
    )
}

export default DashboardOverview
