import Card from '@/components/ui/Card'
import ReactApexChart from 'react-apexcharts'
import { useUserAnalytics } from '../hooks/useDashboardData'
import { TbUsers, TbUserCheck, TbUserX, TbClock } from 'react-icons/tb'

const UserAnalytics = () => {
    const { data, loading, error } = useUserAnalytics('30d')

    // Show loading state
    if (loading) {
        return (
            <Card>
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="h-64 bg-gray-200 rounded"></div>
                </div>
            </Card>
        )
    }

    // Show error state
    if (error) {
        return (
            <Card>
                <div className="text-center text-red-600 p-8">
                    <p>Failed to load user analytics</p>
                    <p className="text-sm text-gray-500">{error}</p>
                </div>
            </Card>
        )
    }

    // Use data or fallback to empty arrays
    const userData = data || {
        userGrowth: [],
        usersByDepartment: [],
        usersByCompany: [],
        userStatusBreakdown: { active: 0, inactive: 0, pending: 0 },
    }

    // Prepare chart data with fallbacks
    const chartData = {
        labels:
            userData.userGrowth.length > 0
                ? userData.userGrowth.map((item) => item.date)
                : ['No data'],
        series: [
            {
                name: 'User Growth',
                data:
                    userData.userGrowth.length > 0
                        ? userData.userGrowth.map((item) => item.count)
                        : [0],
            },
        ],
    }

    const chartOptions = {
        chart: {
            type: 'line' as const,
            toolbar: {
                show: false,
            },
        },
        stroke: {
            curve: 'smooth' as const,
            width: 3,
        },
        colors: ['#3B82F6'],
        xaxis: {
            categories: chartData.labels,
            labels: {
                style: {
                    colors: '#6B7280',
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#6B7280',
                },
            },
        },
        grid: {
            borderColor: '#E5E7EB',
        },
        tooltip: {
            theme: 'light' as const,
        },
    }

    return (
        <Card>
            <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    User Analytics
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    User growth trends and status breakdown
                </p>
            </div>

            {/* User Growth Chart */}
            <div className="mb-6">
                <h5 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    User Growth (Last 30 Days)
                </h5>
                <div className="h-64">
                    <ReactApexChart
                        options={chartOptions}
                        series={chartData.series}
                        type="line"
                        height="100%"
                    />
                </div>
            </div>

            {/* Status Breakdown Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                    <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center">
                        <TbUserCheck className="text-emerald-600 dark:text-emerald-400 text-lg" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Active Users
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                            {userData.userStatusBreakdown.active.toLocaleString()}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                        <TbUserX className="text-red-600 dark:text-red-400 text-lg" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Inactive Users
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                            {userData.userStatusBreakdown.inactive.toLocaleString()}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                    <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/20 rounded-lg flex items-center justify-center">
                        <TbClock className="text-amber-600 dark:text-amber-400 text-lg" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Pending Users
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                            {userData.userStatusBreakdown.pending.toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default UserAnalytics
