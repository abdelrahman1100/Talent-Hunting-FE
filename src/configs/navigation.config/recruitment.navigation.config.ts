import { NavigationTree } from '@/@types/navigation'
import { ADMIN } from '@/constants/roles.constant'
import {
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_TITLE,
} from '@/constants/navigation.constant'
import { RECRUITMENT_PREFIX_PATH } from '@/constants/route.constant'

export const recruitmentNavigationConfig: NavigationTree[] = [
    {
        key: 'recruitment',
        path: '',
        title: 'Recruitment',
        translateKey: 'nav.recruitment.recruitment',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, 'recruiter'],
        icon: 'recruitment-icon', // Add a suitable icon name or component here
        meta: {
            horizontalMenu: {
                layout: 'columns',
                columns: 4,
            },
        },
        subMenu: [
            {
                key: 'dashboard',
                title: 'Recruiter Dashboard',
                path: `${RECRUITMENT_PREFIX_PATH}/dashboard`,
                type: NAV_ITEM_TYPE_ITEM,
                translateKey: 'nav.recruitment.dashboard',
                authority: [ADMIN, 'recruiter'],
                icon: 'dashboard-icon',
                meta: {
                    description: {
                        translateKey: 'nav.recruitment.dashboardDesc',
                        label: 'Recruitment overview and statistics',
                    },
                },
                subMenu: [],
            },
            {
                key: 'opportunities',
                title: 'Opportunities',
                path: '',
                type: NAV_ITEM_TYPE_COLLAPSE,
                translateKey: 'nav.recruitment.opportunities',
                authority: [ADMIN, 'recruiter'],
                icon: 'opportunities-icon', // Replace with your actual icon name or component
                meta: {
                    description: {
                        translateKey: 'nav.recruitment.opportunitiesDesc',
                        label: 'Manage job opportunities',
                    },
                },
                subMenu: [
                    {
                        key: 'opportunityList',
                        title: 'Opportunity List',
                        path: `${RECRUITMENT_PREFIX_PATH}/opportunities/opportunities-list`,
                        type: NAV_ITEM_TYPE_ITEM,
                        translateKey: 'nav.recruitment.opportunityList',
                        authority: [ADMIN, 'recruiter'],
                        icon: 'opportunity-list-icon',
                        meta: {
                            description: {
                                translateKey:
                                    'nav.recruitment.opportunityListDesc',
                                label: 'View all job opportunities',
                            },
                        },
                        subMenu: [],
                    },
                    {
                        key: 'opportunityCreate',
                        title: 'Create Opportunity',
                        path: `${RECRUITMENT_PREFIX_PATH}/opportunities/opportunity-create`,
                        type: NAV_ITEM_TYPE_ITEM,
                        translateKey: 'nav.recruitment.opportunityCreate',
                        authority: [ADMIN, 'recruiter'],
                        icon: 'opportunity-create-icon',
                        meta: {
                            description: {
                                translateKey:
                                    'nav.recruitment.opportunityCreateDesc',
                                label: 'Create a new job opportunity',
                            },
                        },
                        subMenu: [],
                    },
                    {
                        key: 'opportunityEdit',
                        title: 'Edit Opportunity',
                        path: `${RECRUITMENT_PREFIX_PATH}/opportunities/opportunity-edit/:id`,
                        type: NAV_ITEM_TYPE_ITEM,
                        translateKey: 'nav.recruitment.opportunityEdit',
                        authority: [ADMIN, 'recruiter'],
                        icon: 'opportunity-edit-icon',
                        meta: {
                            description: {
                                translateKey:
                                    'nav.recruitment.opportunityEditDesc',
                                label: 'Edit an existing job opportunity',
                            },
                        },
                        subMenu: [],
                    },
                    {
                        key: 'opportunityDetails',
                        title: 'Opportunity Details',
                        path: `${RECRUITMENT_PREFIX_PATH}/opportunities/opportunity-details/:id`,
                        type: NAV_ITEM_TYPE_ITEM,
                        translateKey: 'nav.recruitment.opportunityDetails',
                        authority: [],
                        icon: 'opportunity-details-icon',
                        meta: {
                            description: {
                                translateKey:
                                    'nav.recruitment.opportunityDetailsDesc',
                                label: 'View details of a job opportunity',
                            },
                        },
                        subMenu: [],
                    },
                ],
            },
            {
                key: 'applications',
                title: 'Applications',
                path: '',
                type: NAV_ITEM_TYPE_COLLAPSE,
                translateKey: 'nav.recruitment.applications',
                authority: [],
                icon: 'applications-icon',
                meta: {
                    description: {
                        translateKey: 'nav.recruitment.applicationsDesc',
                        label: 'Manage job applications',
                    },
                },
                subMenu: [
                    {
                        key: 'opportunityApplications',
                        title: 'Application List',
                        path: `${RECRUITMENT_PREFIX_PATH}/applications/opportunity-applications/:id`,
                        type: NAV_ITEM_TYPE_ITEM,
                        translateKey: 'nav.recruitment.applicationList',
                        authority: [],
                        icon: 'application-list-icon',
                        meta: {
                            description: {
                                translateKey:
                                    'nav.recruitment.applicationListDesc',
                                label: 'View all job applications',
                            },
                        },
                        subMenu: [],
                    },
                ],
            },
            {
                key: 'candidates',
                title: 'Candidates',
                path: '',
                type: NAV_ITEM_TYPE_COLLAPSE,
                translateKey: 'nav.recruitment.candidates',
                authority: [],
                icon: 'candidates-icon',
                meta: {
                    description: {
                        translateKey: 'nav.recruitment.candidatesDesc',
                        label: 'Manage job candidates',
                    },
                },
                subMenu: [
                    {
                        key: 'candidateDetails',
                        title: 'Candidate Details',
                        path: `${RECRUITMENT_PREFIX_PATH}/candidates/candidate-details/:id`,
                        type: NAV_ITEM_TYPE_ITEM,
                        translateKey: 'nav.recruitment.candidateDetails',
                        authority: [],
                        icon: 'candidate-details-icon',
                        meta: {
                            description: {
                                translateKey:
                                    'nav.recruitment.candidateDetailsDesc',
                                label: 'View details of a job candidate',
                            },
                        },
                        subMenu: [],
                    },
                ],
            },
        ],
    },
]
