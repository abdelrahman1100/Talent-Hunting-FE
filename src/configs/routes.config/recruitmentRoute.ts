import { Routes } from '@/@types/routes'
import { RECRUITMENT_PREFIX_PATH } from '@/constants/route.constant'
import { lazy } from 'react'

export const recruitmentRoute: Routes = [
    {
        key: 'recruiterDashboard',
        path: `${RECRUITMENT_PREFIX_PATH}/dashboard`,
        component: lazy(() => import('@/views/recruitment/RecruiterDashboard/RecruiterDashboard')),
        authority: [],
    },
    {
        key: 'opportunityList',
        path: `${RECRUITMENT_PREFIX_PATH}/opportunities/opportunities-list`,
        component: lazy(
            () => import('@/views/recruitment/opportunities/OpportunityList'),
        ),
        authority: [],
    },
    {
        key: 'opportunityCreate',
        path: `${RECRUITMENT_PREFIX_PATH}/opportunities/opportunity-create`,
        component: lazy(
            () => import('@/views/recruitment/opportunities/OpportunityCreate'),
        ),
        authority: [],
    },
    {
        key: 'opportunityEdit',
        path: `${RECRUITMENT_PREFIX_PATH}/opportunities/opportunity-edit/:id`,
        component: lazy(
            () => import('@/views/recruitment/opportunities/OpportunityEdit'),
        ),
        authority: [],
    },
    {
        key: 'opportunityDetails',
        path: `${RECRUITMENT_PREFIX_PATH}/opportunities/opportunity-details/:id`,
        component: lazy(
            () =>
                import('@/views/recruitment/opportunities/OpportunityDetails'),
        ),
        authority: [],
    },
    {
        key: 'opportunityApplications',
        path: `${RECRUITMENT_PREFIX_PATH}/applications/opportunity-applications/:id`,
        component: lazy(
            () => import('@/views/recruitment/applications/ApplicationList'),
        ),
        authority: [],
    },
    {
        key: 'candidateDetails',
        path: `${RECRUITMENT_PREFIX_PATH}/candidates/candidate-details/:id`,
        component: lazy(
            () => import('@/views/recruitment/candidate/CandidateDetails'),
        ),
        authority: [],
    },
]
