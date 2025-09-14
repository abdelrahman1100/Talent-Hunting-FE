import { useState } from 'react'

import { UpdateUserRequest } from '../types'
import { apiUpdateUser } from '@/services/UserService'

export function useUpdateUser() {
    const [Loading, setIsLoading] = useState(false)
    const [error, setError] = useState<null | string>(null)

    const UpdateUser = async (id: string, data: UpdateUserRequest) => {
        try {
            setIsLoading(true)
            setError(null)
            const response = await apiUpdateUser(id, data)
            return response
        } catch (err: any) {
            setError(err.message || 'Something went wrong')
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    return { UpdateUser, Loading, error }
}
