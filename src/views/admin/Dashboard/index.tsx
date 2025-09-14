import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import { Card } from '@/components/ui'
import DashboardOverview from './components/DashboardOverview'
import UserAnalytics from './components/UserAnalytics'
import RoleAnalytics from './components/RoleAnalytics'
import CompanyAnalytics from './components/CompanyAnalytics'
import TopCompanies from './components/TopCompanies'
import QuickActions from './components/QuickActions'
import ChartErrorBoundary from './components/ChartErrorBoundary'

const Dashboard = () => {
    return (
        <Container>
            {/* <AdaptiveCard> */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Admin Dashboard
                </h2>
                {/* <p className="text-gray-600 dark:text-gray-400">
                        Overview of system statistics and analytics
                    </p> */}
            </div>

            <div className="space-y-6">
                {/* KPI Overview and Quick Actions Side by Side */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* KPI Overview - Takes 2 columns */}
                    <div className="lg:col-span-2">
                        <ChartErrorBoundary>
                            <DashboardOverview />
                        </ChartErrorBoundary>
                    </div>

                    {/* Quick Actions - Takes 1 column */}
                    <div className="lg:col-span-1">
                        <Card className="p-6 h-full">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                Quick Actions
                            </h2>
                            <QuickActions />
                        </Card>
                    </div>
                </div>

                {/* Analytics Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ChartErrorBoundary>
                        <UserAnalytics />
                    </ChartErrorBoundary>

                    <ChartErrorBoundary>
                        <RoleAnalytics />
                    </ChartErrorBoundary>

                    <ChartErrorBoundary>
                        <CompanyAnalytics />
                    </ChartErrorBoundary>

                    <ChartErrorBoundary>
                        <TopCompanies />
                    </ChartErrorBoundary>
                </div>
            </div>
            {/* </AdaptiveCard> */}
        </Container>
    )
}

export default Dashboard
