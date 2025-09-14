import { ADMIN_PREFIX_PATH } from '@/constants/route.constant'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from '@/constants/navigation.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { NavigationTree } from '@/@types/navigation'

const adminNavigationConfig: NavigationTree[] = [
    {
        key: 'admin',
        path: '',
        title: 'Admin',
        translateKey: 'nav.admin',
        icon: 'admin',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN],
        meta: {
            horizontalMenu: {
                layout: 'columns',
                columns: 4,
            },
        },
        subMenu: [
            {
                key: 'dashboard',
                title: 'Admin Dashboard',
                path: `${ADMIN_PREFIX_PATH}/dashboard/overview`,
                type: NAV_ITEM_TYPE_ITEM,
                translateKey: 'nav.admin.dashboard',
                authority: [ADMIN],
                icon: 'dashboard-icon',
                meta: {
                    description: {
                        translateKey: 'nav.admin.dashboardDesc',
                        label: 'admin overview and statistics',
                    },
                },
                subMenu: [],
            },
            {
                key: 'category',
                path: '',
                title: 'category',
                translateKey: 'nav.admin.category',
                icon: 'category',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                meta: {
                    description: {
                        translateKey: 'nav.admin.categoryDesc',
                        label: 'Manage categories',
                    },
                },
                subMenu: [
                    {
                        key: 'categoryList',
                        path: `${ADMIN_PREFIX_PATH}/category/category-list`,
                        title: 'Category List',
                        translateKey: 'nav.admin.category.list',
                        icon: 'categoryList',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        meta: {
                            description: {
                                translateKey: 'nav.admin.category.listDesc',
                                label: 'Manage category list',
                            },
                        },
                        subMenu: [],
                    },
                    {
                        key: 'categoryCreate',
                        path: `${ADMIN_PREFIX_PATH}/category/category-create`,
                        title: 'Create Category',
                        translateKey: 'nav.admin.categoryCreate',
                        icon: 'categoryCreate',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        meta: {
                            description: {
                                translateKey: 'nav.admin.category.createDesc',
                                label: 'Create a new category',
                            },
                        },
                        subMenu: [],
                    },
                    {
                        key: 'categoryEdit',
                        path: `${ADMIN_PREFIX_PATH}/category/category-edit/37`,
                        title: 'Edit Category',
                        translateKey: 'nav.admin.categoryEdit',
                        icon: 'categoryEdit',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        meta: {
                            description: {
                                translateKey: 'nav.admin.category.createDesc',
                                label: 'Create a new category',
                            },
                        },
                        subMenu: [],
                    },
                    {
                        key: 'categoryDetails',
                        path: `${ADMIN_PREFIX_PATH}/category/category-details/:id`,
                        title: 'Category Details',
                        translateKey: 'nav.admin.category.details',
                        icon: 'categoryDetails',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        meta: {
                            description: {
                                translateKey: 'nav.admin.category.detailsDesc',
                                label: 'View category details',
                            },
                        },
                        subMenu: [],
                    },
                ],
            },

            {
                key: 'company',
                path: '',
                title: 'Company',
                translateKey: 'nav.admin.company',
                icon: 'company',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                meta: {
                    description: {
                        translateKey: 'nav.admin.companyDesc',
                        label: 'Manage companies',
                    },
                },
                subMenu: [
                    {
                        key: 'companyList',
                        path: `${ADMIN_PREFIX_PATH}/company/company-list`,
                        title: 'Company List',
                        translateKey: 'nav.admin.companyList',
                        icon: 'companyList',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        meta: {
                            description: {
                                translateKey: 'nav.admin.company.listDesc',
                                label: 'Manage company list',
                            },
                        },
                        subMenu: [],
                    },
                    {
                        key: 'companyCreate',
                        path: `${ADMIN_PREFIX_PATH}/company/company-create`,
                        title: 'Create Company',
                        translateKey: 'nav.admin.companyCreate',
                        icon: 'companyCreate',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        meta: {
                            description: {
                                translateKey: 'nav.admin.company.createDesc',
                                label: 'Create a new company',
                            },
                        },
                        subMenu: [],
                    },
                    {
                        key: 'companyEdit',
                        path: `${ADMIN_PREFIX_PATH}/company/company-edit/37`,
                        title: 'Edit Company',
                        translateKey: 'nav.admin.companyEdit',
                        icon: 'companyEdit',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        meta: {
                            description: {
                                translateKey: 'nav.admin.company.editDesc',
                                label: 'Create a new category',
                            },
                        },
                        subMenu: [],
                    },
                ],
            },

            {
                key: 'departments',
                path: '',
                title: 'Departments',
                translateKey: 'nav.admin.departments',
                icon: 'departments',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                meta: {
                    description: {
                        translateKey: 'nav.admin.departmentsDesc',
                        label: 'Manage departments',
                    },
                },
                subMenu: [
                    {
                        key: 'departmentList',
                        path: `${ADMIN_PREFIX_PATH}/department/department-list`,
                        title: 'Department List',
                        translateKey: 'nav.admin.departmentList',
                        icon: 'departmentList',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        meta: {
                            description: {
                                translateKey: 'nav.admin.department.listDesc',
                                label: 'Manage department list',
                            },
                        },
                        subMenu: [],
                    },
                    {
                        key: 'departmentCreate',
                        path: `${ADMIN_PREFIX_PATH}/department/department-create`,
                        title: 'Create Department',
                        translateKey: 'nav.admin.departmentCreate',
                        icon: 'departmentCreate',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        meta: {
                            description: {
                                translateKey: 'nav.admin.department.createDesc',
                                label: 'Create a new department',
                            },
                        },
                        subMenu: [],
                    },
                    {
                        key: 'departmentEdit',
                        path: `${ADMIN_PREFIX_PATH}/department/department-edit/37`,
                        title: 'Edit Department',
                        translateKey: 'nav.admin.departmentEdit',
                        icon: 'departmentEdit',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        meta: {
                            description: {
                                translateKey: 'nav.admin.department.editDesc',
                                label: 'Create a new category',
                            },
                        },
                        subMenu: [],
                    },
                ],
            },

            {
                key: 'lockup',
                path: '',
                title: 'Lockup',
                translateKey: 'nav.admin.lockup',
                icon: 'lockup',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                meta: {
                    description: {
                        translateKey: 'nav.admin.lockupDesc',
                        label: 'Manage lockups',
                    },
                },
                subMenu: [
                    {
                        key: 'lockupList',
                        path: `${ADMIN_PREFIX_PATH}/lockup/lockup-list`,
                        title: 'Lockup List',
                        translateKey: 'nav.admin.lockup.list',
                        icon: 'lockupList',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        meta: {
                            description: {
                                translateKey: 'nav.admin.lockup.listDesc',
                                label: 'Manage lockup list',
                            },
                        },
                        subMenu: [],
                    },
                    {
                        key: 'lockupCreate',
                        path: `${ADMIN_PREFIX_PATH}/lockup/lockup-create`,
                        title: 'Create Lockup',
                        translateKey: 'nav.admin.lockupCreate',
                        icon: 'lockupCreate',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        meta: {
                            description: {
                                translateKey: 'nav.admin.lockup.createDesc',
                                label: 'Create a new lockup',
                            },
                        },
                        subMenu: [],
                    },
                    {
                        key: 'lockupEdit',
                        path: `${ADMIN_PREFIX_PATH}/lockup/lockup-edit/37`,
                        title: 'Edit Lockup',
                        translateKey: 'nav.admin.lockupEdit',
                        icon: 'lockupEdit',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        meta: {
                            description: {
                                translateKey: 'nav.admin.lockup.createDesc',
                                label: 'Create a new lockup',
                            },
                        },
                        subMenu: [],
                    },
                ],
            },
            // {
            //     key: 'roles',
            //     path: '',
            //     title: 'Roles',
            //     translateKey: 'nav.admin.roles',
            //     icon: 'roles',
            //     type: NAV_ITEM_TYPE_COLLAPSE,
            //     authority: [],
            //     meta: {
            //         description: {
            //             translateKey: 'nav.admin.rolesDesc',
            //             label: 'Manage lockups',
            //         },
            //     },
            //     subMenu: [
            //         {
            //             key: 'roleList',
            //             path: `${ADMIN_PREFIX_PATH}/role/role-list`,
            //             title: 'Role List',
            //             translateKey: 'nav.admin.role.list',
            //             icon: 'roleList',
            //             type: NAV_ITEM_TYPE_ITEM,
            //             authority: [],
            //             meta: {
            //                 description: {
            //                     translateKey: 'nav.admin.role.listDesc',
            //                     label: 'Manage role list',
            //                 },
            //             },
            //             subMenu: [],
            //         },
            //     ],
            // },

              {
                key: 'users',
                path: '',
                title: 'Users',
                translateKey: 'nav.admin.users',
                icon: 'users',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                meta: {
                    description: {
                        translateKey: 'nav.admin.usersDesc',
                        label: 'Manage users',
                    },
                },
                subMenu: [
                    {
                        key: 'userList',
                        path: `${ADMIN_PREFIX_PATH}/user/user-list`,
                        title: 'User List',
                        translateKey: 'nav.admin.userList',
                        icon: 'userList',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        meta: {
                            description: {
                                translateKey: 'nav.admin.user.listDesc',
                                label: 'Manage department list',
                            },
                        },
                        subMenu: [],
                    },
                    {
                        key: 'userCreate',
                        path: `${ADMIN_PREFIX_PATH}/user/user-create`,
                        title: 'Create User',
                        translateKey: 'nav.admin.userCreate',
                        icon: 'userCreate',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        meta: {
                            description: {
                                translateKey: 'nav.admin.user.createDesc',
                                label: 'Create a new user',
                            },
                        },
                        subMenu: [],
                    },
                    {
                        key: 'userEdit',
                        path: `${ADMIN_PREFIX_PATH}/user/user-edit/37`,
                        title: 'Edit User',
                        translateKey: 'nav.admin.userEdit',
                        icon: 'userEdit',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        meta: {
                            description: {
                                translateKey: 'nav.admin.user.editDesc',
                                label: 'Create a new user',
                            },
                        },
                        subMenu: [],
                    },
                ],
            },
        ],
    },
]

export default adminNavigationConfig
