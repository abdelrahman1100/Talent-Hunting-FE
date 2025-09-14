import adminNavigationConfig from './admin.navigation'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { NavigationTree } from '@/@types/navigation'
import { recruitmentNavigationConfig } from './recruitment.navigation.config'
import {
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_TITLE,
} from '@/constants/navigation.constant'

const navigationConfig: NavigationTree[] = [
    {
        key: 'home',
        path: '/home',
        title: 'Home',
        translateKey: 'nav.home',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, USER, 'recruiter'],
        subMenu: [],
    },
    {
        key: 'candidate',
        path: '',
        title: 'Candidate',
        translateKey: 'nav.candidate',
        icon: 'groupMenu',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [USER],
        meta: {
            horizontalMenu: {
                layout: 'columns',
                columns: 4,
            },
        },
        subMenu: [
            {
                key: 'opportunities',
                path: '/opportunities',
                title: 'Job Opportunities',
                translateKey: 'nav.opportunities',
                icon: 'groupSingleMenu',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [USER],
                subMenu: [],
            },
            {
                key: 'profile',
                path: '/profile',
                title: 'View Profile',
                translateKey: 'nav.profile',
                icon: 'groupSingleMenu',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [USER],
                subMenu: [],
            },
            {
                key: 'profile.completeness',
                path: '/profile/completeness',
                title: 'Profile Completeness',
                translateKey: 'nav.profileCompleteness',
                icon: 'groupSingleMenu',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [USER],
                subMenu: [],
            },
            {
                key: 'applications',
                path: '/applications',
                title: 'My Applications',
                translateKey: 'nav.applications',
                icon: 'groupSingleMenu',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [USER],
                subMenu: [],
            },
        ],
    },
    ...recruitmentNavigationConfig,
    ...adminNavigationConfig,
]

export default navigationConfig
