import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface Notification {
    id: string
    title: string
    message: string
    type: 'info' | 'success' | 'warning' | 'error'
    read: boolean
    timestamp: Date
    action?: {
        label: string
        url: string
    }
}

interface NotificationState {
    notifications: Notification[]
    unreadCount: number
    addNotification: (
        notification: Omit<Notification, 'id' | 'timestamp' | 'read'>,
    ) => void
    markAsRead: (id: string) => void
    markAllAsRead: () => void
    removeNotification: (id: string) => void
    clearAll: () => void
    getUnreadCount: () => number
}

export const useNotificationStore = create<NotificationState>()(
    devtools(
        persist(
            (set, get) => ({
                notifications: [],
                unreadCount: 0,
                addNotification: (notification) => {
                    const newNotification: Notification = {
                        ...notification,
                        id: Math.random().toString(36).substr(2, 9),
                        timestamp: new Date(),
                        read: false,
                    }

                    set((state) => ({
                        notifications: [
                            newNotification,
                            ...state.notifications,
                        ],
                        unreadCount: state.unreadCount + 1,
                    }))
                },
                markAsRead: (id) => {
                    set((state) => ({
                        notifications: state.notifications.map(
                            (notification) =>
                                notification.id === id
                                    ? { ...notification, read: true }
                                    : notification,
                        ),
                        unreadCount: Math.max(0, state.unreadCount - 1),
                    }))
                },
                markAllAsRead: () => {
                    set((state) => ({
                        notifications: state.notifications.map(
                            (notification) => ({
                                ...notification,
                                read: true,
                            }),
                        ),
                        unreadCount: 0,
                    }))
                },
                removeNotification: (id) => {
                    set((state) => {
                        const notification = state.notifications.find(
                            (n) => n.id === id,
                        )
                        return {
                            notifications: state.notifications.filter(
                                (n) => n.id !== id,
                            ),
                            unreadCount: notification?.read
                                ? state.unreadCount
                                : Math.max(0, state.unreadCount - 1),
                        }
                    })
                },
                clearAll: () => {
                    set({
                        notifications: [],
                        unreadCount: 0,
                    })
                },
                getUnreadCount: () => {
                    return get().notifications.filter((n) => !n.read).length
                },
            }),
            { name: 'notifications' },
        ),
    ),
)
