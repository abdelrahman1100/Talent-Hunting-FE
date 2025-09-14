import { useState, useEffect } from 'react'
import ApiService from '@/services/ApiService'

interface OverviewData {
    totalUsers: number
    totalActiveUsers: number
    totalInactiveUsers: number
    totalRoles: number
    totalCompanies: number
    totalDepartments: number
    recentRegistrations: number
    systemActivity: number
}

interface UserAnalyticsData {
    userGrowth: Array<{ date: string; count: number }>
    usersByDepartment: Array<{ department: string; count: number }>
    usersByCompany: Array<{ company: string; count: number }>
    userStatusBreakdown: { active: number; inactive: number; pending: number }
}

interface RoleAnalyticsData {
    roleDistribution: Array<{ roleName: string; userCount: number }>
    roleAssignmentTrend: Array<{ date: string; assignments: number }>
    permissionUsage: Array<{ permission: string; usage: number }>
}

interface CompanyAnalyticsData {
    companiesByCategory: Array<{ category: string; count: number }>
    employeeDistribution: Array<{ company: string; employeeCount: number }>
    companyGrowth: Array<{ date: string; count: number }>
    locationDistribution: Array<{ location: string; count: number }>
}

interface ActivityAnalyticsData {
    loginPatterns: Array<{ hour: number; day: string; count: number }>
    recentActivities: Array<{
        type: 'user_created' | 'role_assigned' | 'company_created'
        description: string
        timestamp: string
        user: string
    }>
    peakUsageTimes: Array<{ time: string; users: number }>
}

export const useDashboardData = <T>(
    endpoint: string,
    params: Record<string, any> = {},
) => {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                setError(null)

                const queryString = new URLSearchParams(params).toString()
                const url = `/admin/dashboard/${endpoint}${
                    queryString ? `?${queryString}` : ''
                }`

                console.log('Fetching dashboard data from:', url)

                const response = await ApiService.fetchDataWithAxios<T>({
                    url,
                    method: 'get',
                })

                console.log('Dashboard data received:', response)
                setData(response)
            } catch (err: any) {
                console.error('Error fetching dashboard data:', err)
                setError(err.message || 'Failed to fetch dashboard data')

                // Set fallback data to prevent chart errors
                if (endpoint === 'overview') {
                    setData({
                        totalUsers: 0,
                        totalActiveUsers: 0,
                        totalInactiveUsers: 0,
                        totalRoles: 0,
                        totalCompanies: 0,
                        totalDepartments: 0,
                        recentRegistrations: 0,
                        systemActivity: 0,
                    } as T)
                } else if (endpoint === 'user-analytics') {
                    setData({
                        userGrowth: [],
                        usersByDepartment: [],
                        usersByCompany: [],
                        userStatusBreakdown: {
                            active: 0,
                            inactive: 0,
                            pending: 0,
                        },
                    } as T)
                } else if (endpoint === 'role-analytics') {
                    setData({
                        roleDistribution: [],
                        roleAssignmentTrend: [],
                        permissionUsage: [],
                    } as T)
                } else if (endpoint === 'company-analytics') {
                    setData({
                        companiesByCategory: [],
                        employeeDistribution: [],
                        companyGrowth: [],
                        locationDistribution: [],
                    } as T)
                } else if (endpoint === 'activity-analytics') {
                    setData({
                        loginPatterns: [],
                        recentActivities: [],
                        peakUsageTimes: [],
                    } as T)
                }
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [endpoint, JSON.stringify(params)])

    return { data, loading, error }
}

// Specific hooks for each endpoint
export const useOverviewData = () => {
    return useDashboardData<OverviewData>('overview')
}

export const useUserAnalytics = (period: string = '30d') => {
    return useDashboardData<UserAnalyticsData>('user-analytics', { period })
}

export const useRoleAnalytics = () => {
    return useDashboardData<RoleAnalyticsData>('role-analytics')
}

export const useCompanyAnalytics = () => {
    return useDashboardData<CompanyAnalyticsData>('company-analytics')
}

export const useActivityAnalytics = (period: string = '7d') => {
    return useDashboardData<ActivityAnalyticsData>('activity-analytics', {
        period,
    })
}
