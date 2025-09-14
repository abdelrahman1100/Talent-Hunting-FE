import { lazy } from 'react'
import authRoute from './authRoute'
import othersRoute from './othersRoute'
import type { Routes } from '@/@types/routes'
import { ADMIN } from '@/constants/roles.constant'
import { ADMIN_PREFIX_PATH } from '@/constants/route.constant'

export const publicRoutes: Routes = [...authRoute]

export const AdminRoutes: Routes = [
    {
        key: 'dashboardOverview',
        path: `${ADMIN_PREFIX_PATH}/dashboard/overview`,
        component: lazy(() => import('@/views/admin/Dashboard/index')),
        authority: [],
        // meta:{
        //     pageContainerType:"contained"
        // }
    },
    {
        key: 'categoryList',
        path: `${ADMIN_PREFIX_PATH}/category/category-list`,
        component: lazy(() => import('@/views/admin/category/CategoryList')),
        authority: [],
        // meta:{
        //     pageContainerType:"contained"
        // }
    },
    {
        key: 'categoryCreate',
        path: `${ADMIN_PREFIX_PATH}/category/category-create`,
        component: lazy(() => import('@/views/admin/category/CategoryCreate')),
        authority: [],
        // meta:{
        //     pageContainerType:"contained"
        // }
    },
    {
        key: 'categoryEdit',
        path: `${ADMIN_PREFIX_PATH}/category/category-edit/:id`,
        component: lazy(() => import('@/views/admin/category/CategoryEdit')),
        authority: [],
        // meta:{
        //     pageContainerType:"contained"
        // }
    },
    {
        key: 'categoryDetails',
        path: `${ADMIN_PREFIX_PATH}/category/category-details/:id`,
        component: lazy(() => import('@/views/admin/category/CategoryDetails')),
        authority: [],
        // meta:{
        //     pageContainerType:"contained"
        // }
    },
    {
        key: 'companyList',
        path: `${ADMIN_PREFIX_PATH}/company/company-list`,
        component: lazy(() => import('@/views/admin/company/CompanyList')),
        authority: [],
        // meta:{
        //     pageContainerType:"contained"
        // }
    },
    {
        key: 'companyCreate',
        path: `${ADMIN_PREFIX_PATH}/company/company-create`,
        component: lazy(() => import('@/views/admin/company/CompanyCreate')),
        authority: [],
        // meta:{
        //     pageContainerType:"contained"
        // }
    },
    {
        key: 'companyEdit',
        path: `${ADMIN_PREFIX_PATH}/company/company-edit/:id`,
        component: lazy(() => import('@/views/admin/company/CompanyEdit')),
        authority: [],
        // meta:{
        //     pageContainerType:"contained"
        // }
    },
    {
        key: 'companyDetails',
        path: `${ADMIN_PREFIX_PATH}/company/company-details/:id`,
        component: lazy(() => import('@/views/admin/company/CompanyDetails')),
        authority: [],
        // meta:{
        //     pageContainerType:"contained"
        // }
    },

    {
        key: 'departmentList',
        path: `${ADMIN_PREFIX_PATH}/department/department-list`,
        component: lazy(
            () => import('@/views/admin/Departments/DepartmentList'),
        ),
        authority: [],
        // meta:{
        //     pageContainerType:"contained"
        // }
    },

    {
        key: 'departmentCreate',
        path: `${ADMIN_PREFIX_PATH}/department/department-create`,
        component: lazy(
            () => import('@/views/admin/Departments/DepartmentCreate'),
        ),
        authority: [],
        // meta:{
        //     pageContainerType:"contained"
        // }
    },
    {
        key: 'departmentEdit',
        path: `${ADMIN_PREFIX_PATH}/department/department-edit/:id`,
        component: lazy(
            () => import('@/views/admin/Departments/DepartmentEdit'),
        ),
        authority: [],
        // meta:{
        //     pageContainerType:"contained"
        // }
    },

    {
        key: 'lockupList',
        path: `${ADMIN_PREFIX_PATH}/lockup/lockup-list`,
        component: lazy(() => import('@/views/admin/LockUp/LockupList')),
        authority: [],
        // meta:{
        //     pageContainerType:"contained"
        // }
    },
    {
        key: 'lockupCreate',
        path: `${ADMIN_PREFIX_PATH}/lockup/lockup-create`,
        component: lazy(() => import('@/views/admin/LockUp/LockupCreate')),
        authority: [],
        // meta:{
        //     pageContainerType:"contained"
        // }
    },

    {
        key: 'lockupEdit',
        path: `${ADMIN_PREFIX_PATH}/lockup/lockup-edit/:id`,
        component: lazy(() => import('@/views/admin/LockUp/LockupEdit')),
        authority: [],
        // meta:{
        //     pageContainerType:"contained"
        // }
    },

    {
        key: 'userList',
        path: `${ADMIN_PREFIX_PATH}/user/user-list`,
        component: lazy(() => import('@/views/admin/User/UserList')),
        authority: [],
        // meta:{
        //     pageContainerType:"contained"
        // }
    },
    {
        key: 'userEdit',
        path: `${ADMIN_PREFIX_PATH}/user/user-edit/:id`,
        component: lazy(() => import('@/views/admin/User/UserEdit')),
        authority: [],
        // meta:{
        //     pageContainerType:"contained"
        // }
    },
    {
        key: 'userDetails',
        path: `${ADMIN_PREFIX_PATH}/user/user-details/:id`,
        component: lazy(() => import('@/views/admin/User/UserDetails')),
        authority: [],
        // meta:{
        //     pageContainerType:"contained"
        // }
    },
    {
        key: 'userCreate',
        path: `${ADMIN_PREFIX_PATH}/user/user-create`,
        component: lazy(() => import('@/views/admin/User/UserCreate')),
        authority: [],
        // meta:{
        //     pageContainerType:"contained"
        // }
    },

   
    //  {
    //     key: 'lockupDetails',
    //     path: `${ADMIN_PREFIX_PATH}/lockup/lockup-details/:id`,
    //     component: lazy(
    //         () => import('@/views/admin/LockUp/'),
    //     ),
    //     authority: [],
    //     // meta:{
    //     //     pageContainerType:"contained"
    //     // }
    // }
    /** Example purpose only, please remove */
    // {
    //     key: 'singleMenuItem',
    //     path: '/single-menu-view',
    //     component: lazy(() => import('@/views/demo/SingleMenuView')),
    //     authority: [],
    // },
    // {
    //     key: 'collapseMenu.item1',
    //     path: '/collapse-menu-item-view-1',
    //     component: lazy(() => import('@/views/demo/CollapseMenuItemView1')),
    //     authority: [],

    //     // meta: {
    //     //    pageContainerType:"contained"
    //     // },
    // },
    // {
    //     key: 'collapseMenu.item2',
    //     path: '/collapse-menu-item-view-2',
    //     component: lazy(() => import('@/views/demo/CollapseMenuItemView2')),
    //     authority: [],
    // },
    // {
    //     key: 'groupMenu.single',
    //     path: '/group-single-menu-item-view',
    //     component: lazy(() => import('@/views/demo/GroupSingleMenuItemView')),
    //     authority: [],
    // },
    // {
    //     key: 'groupMenu.collapse.item1',
    //     path: '/group-collapse-menu-item-view-1',
    //     component: lazy(
    //         () => import('@/views/demo/GroupCollapseMenuItemView1'),
    //     ),
    //     authority: [],
    // },
    // {
    //     key: 'groupMenu.collapse.item2',
    //     path: '/group-collapse-menu-item-view-2',
    //     component: lazy(
    //         () => import('@/views/demo/GroupCollapseMenuItemView2'),
    //     ),
    //     authority: [],
    // },
    // ...othersRoute,
]
