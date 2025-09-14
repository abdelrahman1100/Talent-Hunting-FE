import { apiGet, apiPost, apiPut, apiDelete } from './axios/ApiClient'
import {
    useNotificationStore,
    type Notification,
} from '@/store/notificationStore'

// Mock data for demonstration
const mockNotifications: Notification[] = [
    {
        id: '1',
        title: 'Welcome to Ecme Admin',
        message:
            'Thank you for joining our platform. We hope you enjoy using our admin template.',
        type: 'info',
        read: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
    {
        id: '2',
        title: 'Profile Updated',
        message: 'Your profile information has been successfully updated.',
        type: 'success',
        read: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
    {
        id: '3',
        title: 'System Maintenance',
        message:
            'Scheduled maintenance will occur tonight at 2:00 AM. Some features may be temporarily unavailable.',
        type: 'warning',
        read: true,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    },
    {
        id: '4',
        title: 'New Feature Available',
        message:
            'Check out our new dashboard analytics feature. It provides detailed insights into your data.',
        type: 'info',
        read: true,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        action: {
            label: 'View Dashboard',
            url: '/dashboard',
        },
    },
    {
        id: '5',
        title: 'Security Alert',
        message:
            'We detected a login attempt from an unrecognized device. Please verify if this was you.',
        type: 'error',
        read: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
        action: {
            label: 'Review Activity',
            url: '/security/activity',
        },
    },
]

export const NotificationService = {
    // Get all notifications
    getNotifications: async (): Promise<Notification[]> => {
        try {
            // In a real app, this would be an API call
            // const response = await apiGet('/notifications')
            // return response.data

            // For demo purposes, return mock data
            return Promise.resolve(mockNotifications)
        } catch (error) {
            console.error('Error fetching notifications:', error)
            return []
        }
    },

    // Get unread notifications count
    getUnreadCount: async (): Promise<number> => {
        try {
            // In a real app, this would be an API call
            // const response = await apiGet('/notifications/unread-count')
            // return response.data.count

            // For demo purposes, return mock count
            const unreadCount = mockNotifications.filter((n) => !n.read).length
            return Promise.resolve(unreadCount)
        } catch (error) {
            console.error('Error fetching unread count:', error)
            return 0
        }
    },

    // Mark notification as read
    markAsRead: async (id: string): Promise<boolean> => {
        try {
            // In a real app, this would be an API call
            // await apiPut(`/notifications/${id}/read`)

            // For demo purposes, just return success
            return Promise.resolve(true)
        } catch (error) {
            console.error('Error marking notification as read:', error)
            return false
        }
    },

    // Mark all notifications as read
    markAllAsRead: async (): Promise<boolean> => {
        try {
            // In a real app, this would be an API call
            // await apiPut('/notifications/mark-all-read')

            // For demo purposes, just return success
            return Promise.resolve(true)
        } catch (error) {
            console.error('Error marking all notifications as read:', error)
            return false
        }
    },

    // Delete notification
    deleteNotification: async (id: string): Promise<boolean> => {
        try {
            // In a real app, this would be an API call
            // await apiDelete(`/notifications/${id}`)

            // For demo purposes, just return success
            return Promise.resolve(true)
        } catch (error) {
            console.error('Error deleting notification:', error)
            return false
        }
    },

    // Create notification (for testing)
    createNotification: async (
        notification: Omit<Notification, 'id' | 'timestamp' | 'read'>,
    ): Promise<Notification> => {
        try {
            // In a real app, this would be an API call
            // const response = await apiPost('/notifications', notification)
            // return response.data

            // For demo purposes, create a mock notification
            const newNotification: Notification = {
                ...notification,
                id: Math.random().toString(36).substr(2, 9),
                timestamp: new Date(),
                read: false,
            }

            return Promise.resolve(newNotification)
        } catch (error) {
            console.error('Error creating notification:', error)
            throw error
        }
    },
}

// Hook to use notification service with store
export const useNotificationService = () => {
    const store = useNotificationStore()

    return {
        ...store,
        // Add service methods that sync with store
        fetchNotifications: async () => {
            const notifications = await NotificationService.getNotifications()
            // Update store with fetched notifications
            // This would need to be implemented based on your store structure
            return notifications
        },

        markAsReadWithAPI: async (id: string) => {
            const success = await NotificationService.markAsRead(id)
            if (success) {
                store.markAsRead(id)
            }
            return success
        },

        markAllAsReadWithAPI: async () => {
            const success = await NotificationService.markAllAsRead()
            if (success) {
                store.markAllAsRead()
            }
            return success
        },

        deleteNotificationWithAPI: async (id: string) => {
            const success = await NotificationService.deleteNotification(id)
            if (success) {
                store.removeNotification(id)
            }
            return success
        },
    }
}
