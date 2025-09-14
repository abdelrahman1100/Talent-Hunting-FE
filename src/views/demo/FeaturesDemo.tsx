import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { useNotificationStore } from '@/store/notificationStore'
import { NotificationService } from '@/services/NotificationService'
import { PiGlobeDuotone, PiBellDuotone, PiPlusDuotone, PiTrashDuotone } from 'react-icons/pi'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'

const FeaturesDemo = () => {
    const { t, i18n } = useTranslation()
    const { addNotification, notifications, clearAll } = useNotificationStore()
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language)
    const [notificationTitle, setNotificationTitle] = useState('')
    const [notificationMessage, setNotificationMessage] = useState('')
    const [notificationType, setNotificationType] = useState<'info' | 'success' | 'warning' | 'error'>('info')

    const languageOptions = [
        { value: 'en', label: '🇺🇸 English' },
        { value: 'es', label: '🇪🇸 Español' },
        { value: 'fr', label: '🇫🇷 Français' },
    ]

    const notificationTypeOptions = [
        { value: 'info', label: t('common.info') },
        { value: 'success', label: t('common.success') },
        { value: 'warning', label: t('common.warning') },
        { value: 'error', label: t('common.error') },
    ]

    const handleLanguageChange = (lang: string) => {
        setSelectedLanguage(lang)
        i18n.changeLanguage(lang)
    }

    const handleAddNotification = () => {
        if (!notificationTitle.trim() || !notificationMessage.trim()) {
            toast.push(
                <Notification title={t('common.error')} type="error">
                    {t('common.pleaseFillAllFields')}
                </Notification>,
                { placement: 'top-center' }
            )
            return
        }

        addNotification({
            title: notificationTitle,
            message: notificationMessage,
            type: notificationType,
        })

        // Show toast notification
        toast.push(
            <Notification title={t('common.success')} type="success">
                {t('notifications.notificationAdded')}
            </Notification>,
            { placement: 'top-center' }
        )

        // Clear form
        setNotificationTitle('')
        setNotificationMessage('')
        setNotificationType('info')
    }

    const handleAddDemoNotifications = () => {
        const demoNotifications = [
            {
                title: t('notifications.demo.welcome'),
                message: t('notifications.demo.welcomeMessage'),
                type: 'info' as const,
            },
            {
                title: t('notifications.demo.update'),
                message: t('notifications.demo.updateMessage'),
                type: 'success' as const,
            },
            {
                title: t('notifications.demo.maintenance'),
                message: t('notifications.demo.maintenanceMessage'),
                type: 'warning' as const,
            },
            {
                title: t('notifications.demo.security'),
                message: t('notifications.demo.securityMessage'),
                type: 'error' as const,
            },
        ]

        demoNotifications.forEach((notification, index) => {
            setTimeout(() => {
                addNotification(notification)
            }, index * 500)
        })

        toast.push(
            <Notification title={t('common.success')} type="success">
                {t('notifications.demoNotificationsAdded')}
            </Notification>,
            { placement: 'top-center' }
        )
    }

    const handleClearAllNotifications = () => {
        clearAll()
        toast.push(
            <Notification title={t('common.success')} type="success">
                {t('notifications.allNotificationsCleared')}
            </Notification>,
            { placement: 'top-center' }
        )
    }

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {t('demo.features.title')}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    {t('demo.features.description')}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Internationalization Demo */}
                <Card>
                    <div className="flex items-center gap-2 mb-4">
                        <PiGlobeDuotone className="text-2xl text-blue-500" />
                        <h2 className="text-xl font-semibold">{t('demo.i18n.title')}</h2>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {t('common.language')}
                            </label>
                            <Select
                                options={languageOptions}
                                value={selectedLanguage}
                                onChange={handleLanguageChange}
                                placeholder={t('common.select')}
                            />
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <h3 className="font-medium mb-2">{t('demo.i18n.currentLanguage')}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {t('demo.i18n.languageCode')}: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">{i18n.language}</code>
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {t('demo.i18n.dateFormat')}: {new Date().toLocaleDateString(i18n.language)}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-medium">{t('demo.i18n.translations')}</h3>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                    <span className="text-gray-500">{t('common.save')}:</span>
                                    <span className="ml-2 font-medium">{t('common.save')}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500">{t('common.cancel')}:</span>
                                    <span className="ml-2 font-medium">{t('common.cancel')}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500">{t('common.delete')}:</span>
                                    <span className="ml-2 font-medium">{t('common.delete')}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500">{t('common.edit')}:</span>
                                    <span className="ml-2 font-medium">{t('common.edit')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Notifications Demo */}
                <Card>
                    <div className="flex items-center gap-2 mb-4">
                        <PiBellDuotone className="text-2xl text-green-500" />
                        <h2 className="text-xl font-semibold">{t('demo.notifications.title')}</h2>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <h3 className="font-medium mb-2">{t('demo.notifications.currentStatus')}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {t('demo.notifications.totalNotifications')}: <span className="font-medium">{notifications.length}</span>
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {t('demo.notifications.unreadNotifications')}: <span className="font-medium">{notifications.filter(n => !n.read).length}</span>
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="font-medium">{t('demo.notifications.addNew')}</h3>
                            
                            <Input
                                placeholder={t('demo.notifications.titlePlaceholder')}
                                value={notificationTitle}
                                onChange={(e) => setNotificationTitle(e.target.value)}
                            />
                            
                            <Input
                                placeholder={t('demo.notifications.messagePlaceholder')}
                                value={notificationMessage}
                                onChange={(e) => setNotificationMessage(e.target.value)}
                            />
                            
                            <Select
                                options={notificationTypeOptions}
                                value={notificationType}
                                onChange={(value) => setNotificationType(value as any)}
                                placeholder={t('common.select')}
                            />
                            
                            <Button
                                block
                                variant="solid"
                                icon={<PiPlusDuotone />}
                                onClick={handleAddNotification}
                            >
                                {t('demo.notifications.addNotification')}
                            </Button>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={handleAddDemoNotifications}
                                className="flex-1"
                            >
                                {t('demo.notifications.addDemo')}
                            </Button>
                            <Button
                                variant="outline"
                                icon={<PiTrashDuotone />}
                                onClick={handleClearAllNotifications}
                                disabled={notifications.length === 0}
                            >
                                {t('demo.notifications.clearAll')}
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Instructions */}
            <Card>
                <h2 className="text-xl font-semibold mb-4">{t('demo.instructions.title')}</h2>
                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <p>{t('demo.instructions.i18n')}</p>
                    <p>{t('demo.instructions.notifications')}</p>
                    <p>{t('demo.instructions.topbar')}</p>
                </div>
            </Card>
        </div>
    )
}

export default FeaturesDemo
