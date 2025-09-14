import Card from '@/components/ui/Card'
import ReactApexChart from 'react-apexcharts'
import { useRoleAnalytics } from '../hooks/useDashboardData'
import { TbShield, TbUsers } from 'react-icons/tb'

const RoleAnalytics = () => {
    const { data, loading, error } = useRoleAnalytics()

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
                    <p>Failed to load role analytics</p>
                    <p className="text-sm text-gray-500">{error}</p>
                </div>
            </Card>
        )
    }

    // Use data or fallback to empty arrays
    const roleData = data || {
        roleDistribution: [],
        roleAssignmentTrend: [],
        permissionUsage: [],
    }

    // Prepare chart data with fallbacks
    const chartData = {
        labels:
            roleData.roleDistribution.length > 0
                ? roleData.roleDistribution.map((item) => item.roleName)
                : ['No data'],
        series:
            roleData.roleDistribution.length > 0
                ? roleData.roleDistribution.map((item) => item.userCount)
                : [0],
    }

    const chartOptions = {
        chart: {
            type: 'donut' as const,
            toolbar: {
                show: false,
            },
        },
        colors: [
            '#3B82F6',
            '#10B981',
            '#F59E0B',
            '#EF4444',
            '#8B5CF6',
            '#06B6D4',
        ],
        labels: chartData.labels,
        plotOptions: {
            pie: {
                donut: {
                    size: '60%',
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            position: 'bottom' as const,
            labels: {
                colors: '#6B7280',
            },
        },
        tooltip: {
            theme: 'light' as const,
            y: {
                formatter: function (value: number) {
                    return value + ' users'
                },
            },
        },
    }

    return (
        <Card>
            <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Role Analytics
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Role distribution and user assignments
                </p>
            </div>

            {/* Role Distribution Chart */}
            <div className="mb-6">
                <h5 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Role Distribution
                </h5>
                <div className="h-64">
                    <ReactApexChart
                        options={chartOptions}
                        series={chartData.series}
                        type="donut"
                        height="100%"
                    />
                </div>
            </div>

            {/* Role List */}
            <div>
                <h5 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Role Details
                </h5>
                <div className="space-y-3">
                    {roleData.roleDistribution.length > 0 ? (
                        roleData.roleDistribution.map((role, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/20"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center">
                                        <TbShield className="text-indigo-600 dark:text-indigo-400 text-sm" />
                                    </div>
                                    <span className="font-medium text-gray-900 dark:text-gray-100">
                                        {role.roleName}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <TbUsers className="text-gray-400 text-sm" />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {role.userCount} users
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <TbShield className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                            <p>No role data available</p>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    )
}

export default RoleAnalytics
