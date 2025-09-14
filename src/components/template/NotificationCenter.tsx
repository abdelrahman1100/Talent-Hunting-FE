import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Dropdown from '@/components/ui/Dropdown'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Avatar from '@/components/ui/Avatar'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import { useNotificationStore, type Notification } from '@/store/notificationStore'
import { NotificationService } from '@/services/NotificationService'
import { PiBellDuotone, PiCheckDuotone, PiTrashDuotone, PiCheckCircleDuotone } from 'react-icons/pi'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import type { CommonProps } from '@/@types/common'

dayjs.extend(relativeTime)

const _NotificationCenter = ({ className }: CommonProps) => {
    const { t } = useTranslation()
    const { 
        notifications, 
        unreadCount, 
        markAsRead, 
        markAllAsRead, 
        removeNotification 
    } = useNotificationStore()
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // Load notifications on mount
        loadNotifications()
    }, [])

    const loadNotifications = async () => {
        setLoading(true)
        try {
            const fetchedNotifications = await NotificationService.getNotifications()
            // In a real app, you'd update the store with fetched notifications
            // For now, we'll use the store's existing notifications
        } catch (error) {
            console.error('Error loading notifications:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleMarkAsRead = async (id: string) => {
        try {
            await NotificationService.markAsRead(id)
            markAsRead(id)
        } catch (error) {
            console.error('Error marking notification as read:', error)
        }
    }

    const handleMarkAllAsRead = async () => {
        try {
            await NotificationService.markAllAsRead()
            markAllAsRead()
        } catch (error) {
            console.error('Error marking all notifications as read:', error)
        }
    }

    const handleDeleteNotification = async (id: string) => {
        try {
            await NotificationService.deleteNotification(id)
            removeNotification(id)
        } catch (error) {
            console.error('Error deleting notification:', error)
        }
    }

    const getNotificationIcon = (type: Notification['type']) => {
        switch (type) {
            case 'success':
                return <PiCheckCircleDuotone className="text-green-500" />
            case 'warning':
                return <PiCheckCircleDuotone className="text-yellow-500" />
            case 'error':
                return <PiCheckCircleDuotone className="text-red-500" />
            default:
                return <PiCheckCircleDuotone className="text-blue-500" />
        }
    }

    const getNotificationColor = (type: Notification['type']) => {
        switch (type) {
            case 'success':
                return 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
            case 'warning':
                return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800'
            case 'error':
                return 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
            default:
                return 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
        }
    }

    return (
        <Dropdown
            className={className}
            isOpen={isOpen}
            onToggle={setIsOpen}
            placement="bottom-end"
            renderTitle={
                <Button
                    variant="plain"
                    icon={<PiBellDuotone />}
                    className="relative"
                >
                    {unreadCount > 0 && (
                        <Badge 
                            className="absolute -top-1 -right-1 min-w-[18px] h-[18px] text-xs"
                            innerClass="bg-red-500 text-white"
                        >
                            {unreadCount > 99 ? '99+' : unreadCount}
                        </Badge>
                    )}
                </Button>
            }
        >
            <Dropdown.Item variant="header">
                <div className="flex items-center justify-between py-2 px-3">
                    <div className="font-semibold text-gray-900 dark:text-gray-100">
                        {t('notifications.title')}
                    </div>
                    {unreadCount > 0 && (
                        <Button
                            size="sm"
                            variant="plain"
                            onClick={handleMarkAllAsRead}
                            className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            {t('notifications.markAllAsRead')}
                        </Button>
                    )}
                </div>
            </Dropdown.Item>
            <Dropdown.Item variant="divider" />
            
            <div className="max-h-[400px] overflow-y-auto">
                {loading ? (
                    <div className="py-4 px-3 text-center text-gray-500">
                        {t('common.loading')}...
                    </div>
                ) : notifications.length === 0 ? (
                    <div className="py-8 px-3 text-center text-gray-500">
                        <PiBellDuotone className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                        <p>{t('notifications.noNotifications')}</p>
                    </div>
                ) : (
                    notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`border-l-4 ${getNotificationColor(notification.type)} ${
                                !notification.read ? 'bg-gray-50 dark:bg-gray-800' : ''
                            }`}
                        >
                            <div className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                <div className="flex items-start gap-3">
                                    <Avatar
                                        size={32}
                                        icon={getNotificationIcon(notification.type)}
                                        className="mt-1"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1 min-w-0">
                                                <h4 className={`text-sm font-medium ${
                                                    !notification.read 
                                                        ? 'text-gray-900 dark:text-gray-100' 
                                                        : 'text-gray-700 dark:text-gray-300'
                                                }`}>
                                                    {notification.title}
                                                </h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                                                    {notification.message}
                                                </p>
                                                <div className="flex items-center justify-between mt-2">
                                                    <span className="text-xs text-gray-500 dark:text-gray-500">
                                                        {dayjs(notification.timestamp).fromNow()}
                                                    </span>
                                                    {notification.action && (
                                                        <Button
                                                            size="xs"
                                                            variant="plain"
                                                            className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                                        >
                                                            {notification.action.label}
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                {!notification.read && (
                                                    <Button
                                                        size="xs"
                                                        variant="plain"
                                                        icon={<PiCheckDuotone />}
                                                        onClick={() => handleMarkAsRead(notification.id)}
                                                        className="text-gray-400 hover:text-green-600"
                                                    />
                                                )}
                                                <Button
                                                    size="xs"
                                                    variant="plain"
                                                    icon={<PiTrashDuotone />}
                                                    onClick={() => handleDeleteNotification(notification.id)}
                                                    className="text-gray-400 hover:text-red-600"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            
            {notifications.length > 0 && (
                <>
                    <Dropdown.Item variant="divider" />
                    <div className="p-2">
                        <Button
                            block
                            size="sm"
                            variant="plain"
                            onClick={() => setIsOpen(false)}
                            className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            {t('common.view')} {t('notifications.all')}
                        </Button>
                    </div>
                </>
            )}
        </Dropdown>
    )
}

const NotificationCenter = withHeaderItem(_NotificationCenter)

export default NotificationCenter
