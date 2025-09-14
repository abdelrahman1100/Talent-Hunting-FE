import Loading from '@/components/shared/Loading'
import RecruitmentOverview from './components/RecruitmentOverview'
import OpenRoles from './components/OpenRoles'
import RecentApplications from './components/RecentApplications'
import ApplicationStatusChart from './components/ApplicationStatusChart'
import { apiGetOpportunitiesList } from '@/services/OpportunitiesService'
import { apiGetApplications } from '@/services/ApplicationsService'
import useSWR from 'swr'
import type { GetRecruiterDashboardResponse } from './types'

const RecruiterDashboard = () => {
    // Fetch open opportunities (status: 'active' or 'open')
    const { data: opportunitiesData, isLoading: isOpportunitiesLoading } =
        useSWR(
            ['recruitment/opportunity', { status: 'active', pageSize: 5 }],
            ([_, params]) => apiGetOpportunitiesList<any, any>(params),
            {
                revalidateOnFocus: false,
                revalidateIfStale: false,
                revalidateOnReconnect: false,
            },
        )

    // Fetch recent applications (limit to top 5)
    const { data: applicationsData, isLoading: isApplicationsLoading } = useSWR(
        [
            'recruitment/application',
            { pageSize: 5, sortBy: 'generated_date', order: 'DESC' },
        ],
        ([_, params]) => apiGetApplications<any, any>(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnReconnect: false,
        },
    )

    // Combine data for dashboard
    const dashboardData: GetRecruiterDashboardResponse | null =
        opportunitiesData && applicationsData
            ? {
                  recruitmentOverview: {
                      totalOpportunities: Array.isArray(opportunitiesData)
                          ? opportunitiesData.length
                          : 0,
                      activeOpportunities:
                          (Array.isArray(opportunitiesData)
                              ? opportunitiesData
                              : []
                          ).filter((opp: any) => opp.status === 'active')
                              .length || 0,
                      totalApplications: Array.isArray(applicationsData)
                          ? applicationsData.length
                          : 0,
                      pendingApplications:
                          (Array.isArray(applicationsData)
                              ? applicationsData
                              : []
                          ).filter(
                              (app: any) =>
                                  app.application_status === 'pending',
                          ).length || 0,
                  },
                  openRoles: Array.isArray(opportunitiesData)
                      ? opportunitiesData.slice(0, 5)
                      : [],
                  recentApplications: Array.isArray(applicationsData)
                      ? applicationsData.slice(0, 5)
                      : [],
                  applicationStatusChart: {
                      pending:
                          (Array.isArray(applicationsData)
                              ? applicationsData
                              : []
                          ).filter(
                              (app: any) =>
                                  app.application_status === 'pending',
                          ).length || 0,
                      accepted:
                          (Array.isArray(applicationsData)
                              ? applicationsData
                              : []
                          ).filter(
                              (app: any) =>
                                  app.application_status === 'accepted',
                          ).length || 0,
                      rejected:
                          (Array.isArray(applicationsData)
                              ? applicationsData
                              : []
                          ).filter(
                              (app: any) =>
                                  app.application_status === 'rejected',
                          ).length || 0,
                      total: Array.isArray(applicationsData)
                          ? applicationsData.length
                          : 0,
                      series: [
                          {
                              name: 'Applications',
                              data: [
                                  (Array.isArray(applicationsData)
                                      ? applicationsData
                                      : []
                                  ).filter(
                                      (app: any) =>
                                          app.application_status === 'pending',
                                  ).length || 0,
                                  (Array.isArray(applicationsData)
                                      ? applicationsData
                                      : []
                                  ).filter(
                                      (app: any) =>
                                          app.application_status === 'accepted',
                                  ).length || 0,
                                  (Array.isArray(applicationsData)
                                      ? applicationsData
                                      : []
                                  ).filter(
                                      (app: any) =>
                                          app.application_status === 'rejected',
                                  ).length || 0,
                              ],
                          },
                      ],
                      labels: ['Pending', 'Accepted', 'Rejected'],
                  },
              }
            : null

    const isLoading = isOpportunitiesLoading || isApplicationsLoading

    return (
        <Loading loading={isLoading}>
            {dashboardData && (
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col xl:flex-row gap-4">
                        <div className="flex flex-col gap-4 flex-1 xl:max-w-[calc(100%-400px)]">
                            <RecruitmentOverview
                                data={dashboardData.recruitmentOverview}
                            />
                            <OpenRoles data={dashboardData.openRoles} />
                        </div>
                        <div className="flex flex-col gap-4 xl:w-[400px]">
                            <ApplicationStatusChart
                                data={dashboardData.applicationStatusChart}
                            />
                            <RecentApplications
                                data={dashboardData.recentApplications}
                            />
                        </div>
                    </div>
                </div>
            )}
        </Loading>
    )
}
export default RecruiterDashboard
