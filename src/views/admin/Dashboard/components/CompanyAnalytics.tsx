import Card from '@/components/ui/Card'
import ReactApexChart from 'react-apexcharts'
import { useCompanyAnalytics } from '../hooks/useDashboardData'
import { TbBuilding, TbUsers } from 'react-icons/tb'

const CompanyAnalytics = () => {
    const { data, loading, error } = useCompanyAnalytics()

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
                    <p>Failed to load company analytics</p>
                    <p className="text-sm text-gray-500">{error}</p>
                </div>
            </Card>
        )
    }

    // Use data or fallback to empty arrays
    const companyData = data || {
        companiesByCategory: [],
        employeeDistribution: [],
        companyGrowth: [],
        locationDistribution: [],
    }

    // Prepare chart data with fallbacks
    const chartData = {
        labels:
            companyData.companiesByCategory.length > 0
                ? companyData.companiesByCategory.map((item) => item.category)
                : ['No data'],
        series:
            companyData.companiesByCategory.length > 0
                ? companyData.companiesByCategory.map((item) => item.count)
                : [0],
    }

    const chartOptions = {
        chart: {
            type: 'bar' as const,
            toolbar: {
                show: false,
            },
        },
        colors: ['#3B82F6'],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '35%',
                endingShape: 'rounded',
                borderRadius: 6,
            },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: chartData.labels,
            labels: {
                style: {
                    colors: '#6B7280',
                },
            },
        },
        yaxis: {
            title: {
                text: 'Number of Companies',
                style: {
                    color: '#6B7280',
                },
            },
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
            y: {
                formatter: function (value: number) {
                    return value + ' companies'
                },
            },
        },
    }

    return (
        <Card>
            <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Company Analytics
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Company distribution and employee statistics
                </p>
            </div>

            {/* Companies by Category Chart */}
            <div className="mb-6">
                <h5 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Companies by Category
                </h5>
                <div className="h-64">
                    <ReactApexChart
                        options={chartOptions}
                        series={[{ name: 'Companies', data: chartData.series }]}
                        type="bar"
                        height="100%"
                    />
                </div>
            </div>

            {/* Company Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <TbBuilding className="text-blue-600 dark:text-blue-400 text-lg" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Total Companies
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                            {companyData.companiesByCategory
                                .reduce((sum, item) => sum + item.count, 0)
                                .toLocaleString()}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                        <TbUsers className="text-green-600 dark:text-green-400 text-lg" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Total Employees
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                            {companyData.employeeDistribution
                                .reduce(
                                    (sum, item) => sum + item.employeeCount,
                                    0,
                                )
                                .toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default CompanyAnalytics
