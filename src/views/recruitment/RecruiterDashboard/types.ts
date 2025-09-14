import type { Opportunity } from '@/views/recruitment/opportunities/OpportunityList/types'
import type { Application } from '@/views/recruitment/opportunities/OpportunityDetails/type'

export type RecruitmentOverview = {
    totalOpportunities: number
    activeOpportunities: number
    totalApplications: number
    pendingApplications: number
}

export type ApplicationStatusChart = {
    pending: number
    accepted: number
    rejected: number
    total: number
    series: {
        name: string
        data: number[]
    }[]
    labels: string[]
}

export type GetRecruiterDashboardResponse = {
    recruitmentOverview: RecruitmentOverview
    openRoles: Opportunity[]
    recentApplications: Application[]
    applicationStatusChart: ApplicationStatusChart
}