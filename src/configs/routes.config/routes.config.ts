import authRoute from './authRoute'
import othersRoute from './othersRoute'
import type { Routes } from '@/@types/routes'
import { recruitmentRoute } from './recruitmentRoute'
import { AdminRoutes } from './adminRoutes'
import { lazy } from 'react'

export const publicRoutes: Routes = [...authRoute]

// Opportunities Routes
const opportunitiesRoutes: Routes = [
    {
        key: 'opportunities',
        path: '/opportunities',
        component: lazy(
            () => import('@/views/candidate/opportunities/Opportunities'),
        ),
        authority: [],
    },
    {
        key: 'opportunity.detail',
        path: '/opportunities/:id',
        component: lazy(
            () => import('@/views/candidate/opportunities/OpportunityDetail'),
        ),
        authority: [],
    },
    {
        key: 'opportunity.apply',
        path: '/opportunities/:id/apply',
        component: lazy(
            () => import('@/views/candidate/opportunities/ApplyForm'),
        ),
        authority: [],
    },
]

// Profile Routes
const profileRoutes: Routes = [
    {
        key: 'profile',
        path: '/profile',
        component: lazy(() => import('@/views/candidate/profile/ProfileView')),
        authority: [],
    },
    {
        key: 'profile.create',
        path: '/profile/create',
        component: lazy(() => import('@/views/candidate/profile/ProfileForm')),
        authority: [],
    },
    {
        key: 'profile.completeness',
        path: '/profile/completeness',
        component: lazy(
            () => import('@/views/candidate/profile/ProfileCompleteness'),
        ),
        authority: [],
    },
    {
        key: 'profile.edit',
        path: '/profile/edit',
        component: lazy(() => import('@/views/candidate/profile/ProfileForm')),
        authority: [],
    },
]

// Applications Routes
const applicationsRoutes: Routes = [
    {
        key: 'applications',
        path: '/applications',
        component: lazy(
            () => import('@/views/candidate/applications/MyApplications'),
        ),
        authority: [],
    },
]

export const protectedRoutes: Routes = [
    ...recruitmentRoute,
    ...AdminRoutes,
    ...opportunitiesRoutes,
    ...profileRoutes,
    ...applicationsRoutes,
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        authority: [],
    },
    {
        key: 'demo',
        path: '/demo/features',
        component: lazy(() => import('@/views/demo/FeaturesDemo')),
        authority: [],
    },
    /** Example purpose only, please remove */
    {
        key: 'singleMenuItem',
        path: '/single-menu-view',
        component: lazy(() => import('@/views/demo/SingleMenuView')),
        authority: [],
    },
    {
        key: 'collapseMenu.item1',
        path: '/collapse-menu-item-view-1',
        component: lazy(() => import('@/views/demo/CollapseMenuItemView1')),
        authority: [],
    },
    {
        key: 'collapseMenu.item2',
        path: '/collapse-menu-item-view-2',
        component: lazy(() => import('@/views/demo/CollapseMenuItemView2')),
        authority: [],
    },
    {
        key: 'groupMenu.single',
        path: '/group-single-menu-item-view',
        component: lazy(() => import('@/views/demo/GroupSingleMenuItemView')),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item1',
        path: '/group-collapse-menu-item-view-1',
        component: lazy(
            () => import('@/views/demo/GroupCollapseMenuItemView1'),
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item2',
        path: '/group-collapse-menu-item-view-2',
        component: lazy(
            () => import('@/views/demo/GroupCollapseMenuItemView2'),
        ),
        authority: [],
    },
    ...othersRoute,
]
