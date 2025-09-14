import Card from '@/components/ui/Card'
import { useCompanyAnalytics } from '../hooks/useDashboardData'
import { TbBuilding, TbUsers } from 'react-icons/tb'

const TopCompanies = () => {
    const { data, loading, error } = useCompanyAnalytics()

    // Show loading state
    if (loading) {
        return (
            <Card>
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="h-16 bg-gray-200 rounded"
                            ></div>
                        ))}
                    </div>
                </div>
            </Card>
        )
    }

    // Show error state
    if (error) {
        return (
            <Card>
                <div className="text-center text-red-600 p-8">
                    <p>Failed to load company data</p>
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

    return (
        <Card>
            <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Top Companies
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Companies ranked by employee count
                </p>
            </div>

            <div className="space-y-3">
                {companyData.employeeDistribution.length > 0 ? (
                    companyData.employeeDistribution
                        .sort((a, b) => b.employeeCount - a.employeeCount)
                        .slice(0, 5)
                        .map((company, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/20"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                                        <TbBuilding className="text-blue-600 dark:text-blue-400 text-sm" />
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-900 dark:text-gray-100">
                                            {company.company}
                                        </span>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            Rank #{index + 1}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <TbUsers className="text-gray-400 text-sm" />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {company.employeeCount.toLocaleString()}{' '}
                                        employees
                                    </span>
                                </div>
                            </div>
                        ))
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <TbBuilding className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                        <p>No company data available</p>
                    </div>
                )}
            </div>
        </Card>
    )
}

export default TopCompanies
