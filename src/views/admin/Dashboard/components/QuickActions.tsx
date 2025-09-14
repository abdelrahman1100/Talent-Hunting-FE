import React from 'react'
import { Button } from '@/components/ui'
import {
    HiOutlinePlus,
    HiOutlineOfficeBuilding,
    HiOutlineAcademicCap,
    HiOutlineClipboardList,
    HiOutlineUsers,
    HiOutlineCog,
    HiOutlineShieldCheck,
    HiOutlineEye,
    HiOutlineDocumentText,
    HiOutlineBriefcase,
} from 'react-icons/hi'
import { useNavigate } from 'react-router'

interface QuickAction {
    id: string
    title: string
    description: string
    icon: React.ReactNode
    path: string
    variant: 'solid' | 'default'
    color: 'blue' | 'purple' | 'green' | 'orange' | 'gray' | 'red'
    category: 'create' | 'manage' | 'system'
}

const QuickActions = () => {
    const navigate = useNavigate()

    const quickActions: QuickAction[] = [
        // Essential Create Actions
        {
            id: 'add-user',
            title: 'Add User',
            description: 'Create a new user account',
            icon: <HiOutlinePlus />,
            path: '/admin/user/user-create',
            variant: 'solid',
            color: 'blue',
            category: 'create',
        },
        {
            id: 'add-company',
            title: 'Add Company',
            description: 'Register a new company',
            icon: <HiOutlineOfficeBuilding />,
            path: '/admin/company/company-create',
            variant: 'default',
            color: 'purple',
            category: 'create',
        },
        {
            id: 'add-department',
            title: 'Add Department',
            description: 'Create a new department',
            icon: <HiOutlineAcademicCap />,
            path: '/admin/department/department-create',
            variant: 'default',
            color: 'green',
            category: 'create',
        },

        // Essential Manage Actions
        {
            id: 'manage-users',
            title: 'Manage Users',
            description: 'View and manage all users',
            icon: <HiOutlineUsers />,
            path: '/admin/user/user-list',
            variant: 'default',
            color: 'blue',
            category: 'manage',
        },
        {
            id: 'manage-companies',
            title: 'Manage Companies',
            description: 'View and manage all companies',
            icon: <HiOutlineOfficeBuilding />,
            path: '/admin/company/company-list',
            variant: 'default',
            color: 'purple',
            category: 'manage',
        },
        {
            id: 'manage-opportunities',
            title: 'Manage Opportunities',
            description: 'View and manage all opportunities',
            icon: <HiOutlineBriefcase />,
            path: '/recruitment/opportunities/opportunities-list',
            variant: 'default',
            color: 'green',
            category: 'manage',
        },
    ]

    const getColorClasses = (color: QuickAction['color']) => {
        const colorMap = {
            blue: 'hover:bg-blue-50 dark:hover:bg-blue-900/20',
            purple: 'hover:bg-purple-50 dark:hover:bg-purple-900/20',
            green: 'hover:bg-green-50 dark:hover:bg-green-900/20',
            orange: 'hover:bg-orange-50 dark:hover:bg-orange-900/20',
            gray: 'hover:bg-gray-50 dark:hover:bg-gray-900/20',
            red: 'hover:bg-red-50 dark:hover:bg-red-900/20',
        }
        return colorMap[color] || colorMap.gray
    }

    const handleActionClick = (action: QuickAction) => {
        navigate(action.path)
    }

    return (
        <div className="space-y-2">
            {/* First Row - Manage Users and Companies */}
            <div className="flex gap-2">
                {quickActions
                    .filter(
                        (action) =>
                            action.category === 'manage' &&
                            action.id !== 'manage-opportunities',
                    )
                    .map((action) => (
                        <Button
                            key={action.id}
                            size="sm"
                            variant={action.variant}
                            onClick={() => handleActionClick(action)}
                            className={`px-3 py-2 rounded-md hover:shadow-md transition-all duration-200 ${getColorClasses(action.color)} flex items-center gap-2`}
                        >
                            <span className="text-base">{action.icon}</span>
                            <span className="font-medium text-sm">
                                {action.title}
                            </span>
                        </Button>
                    ))}
            </div>

            {/* Second Row - Manage Opportunities */}
            <div className="flex gap-2">
                {quickActions
                    .filter(
                        (action) =>
                            action.category === 'manage' &&
                            action.id === 'manage-opportunities',
                    )
                    .map((action) => (
                        <Button
                            key={action.id}
                            size="sm"
                            variant={action.variant}
                            onClick={() => handleActionClick(action)}
                            className={`px-3 py-2 rounded-md hover:shadow-md transition-all duration-200 ${getColorClasses(action.color)} flex items-center gap-2`}
                        >
                            <span className="text-base">{action.icon}</span>
                            <span className="font-medium text-sm">
                                {action.title}
                            </span>
                        </Button>
                    ))}
            </div>
        </div>
    )
}

export default QuickActions
