import { TOKEN_NAME_IN_STORAGE } from './constants/api.constant'
import { useSessionUser } from './store/authStore'

const PAYLOAD = {
    accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjY0LCJlbWFpbCI6InRhYmRlbHJobWFuMDJAZ21haWwuY29tIiwidG9rZW5WZXJzaW9uIjo3LCJpYXQiOjE3NTU2OTk5NDIsImV4cCI6MTc1NTcwMDg0Mn0.R0MWsUGk9hAvzPrNOv4-bPlmysiDQ21_jfP1Jxot10M',
    refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjY0LCJlbWFpbCI6InRhYmRlbHJobWFuMDJAZ21haWwuY29tIiwidG9rZW5WZXJzaW9uIjo3LCJpYXQiOjE3NTU2OTk5NDIsImV4cCI6MTc1NjMwNDc0Mn0.eyNgP3FjVaRlnoC4KDAMhp8IroKHvZoPAKeyE4frSZo',
    user: {
        id: 64,
        name: 'aaaaaaaaaaaaaaaaaaaaaa',
        email: 'tabdelrhman02@gmail.com',
        user_img:
            '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSop... (trimmed)',
        roles: ['user'],
    },
}

export function seedAuth() {
    try {
        const storage = localStorage

        const hasToken = !!storage.getItem(TOKEN_NAME_IN_STORAGE)
        const hasRefresh = !!storage.getItem('refreshToken')
        const hasUser = !!storage.getItem('user')

        if (!hasToken && PAYLOAD.accessToken) {
            storage.setItem(TOKEN_NAME_IN_STORAGE, PAYLOAD.accessToken)
        }

        if (!hasRefresh && PAYLOAD.refreshToken) {
            storage.setItem('refreshToken', PAYLOAD.refreshToken)
        }

        if (!hasUser && PAYLOAD.user) {
            storage.setItem('user', JSON.stringify(PAYLOAD.user))
        }

        // update zustand auth store directly
        const store = useSessionUser as unknown as any
        const current = store.getState()
        if (current?.session?.signedIn !== true) {
            current.setSessionSignedIn?.(true)
        }

        const mappedUser = {
            userId: PAYLOAD.user?.id ? String(PAYLOAD.user.id) : undefined,
            avatar: PAYLOAD.user?.user_img || '',
            userName: PAYLOAD.user?.name || '',
            email: PAYLOAD.user?.email || '',
            authority: PAYLOAD.user?.roles || [],
        }

        current.setUser?.(mappedUser)

        // eslint-disable-next-line no-console
        console.info('[seedAuth] seeded auth into localStorage and auth store')
    } catch {
        // eslint-disable-next-line no-console
        console.warn('[seedAuth] seeding skipped or failed')
    }
}

export default seedAuth
