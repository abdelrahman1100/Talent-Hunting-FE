import { useState } from 'react'
import {
    apiCreateCategory,
    apiUpdateCategory,
} from '@/services/categoryService'
import { UpdateCompanyRequest } from '../types'
import { apiUpdateCompany } from '@/services/CompanyService'

export function useUpdateCategory() {
    const [Loading, setIsLoading] = useState(false)
    const [error, setError] = useState<null | string>(null)

    const UpdateCategory = async (id: string, data: UpdateCompanyRequest) => {
        try {
            setIsLoading(true)
            setError(null)
            const response = await apiUpdateCompany(id, data)
            return response
        } catch (err: any) {
            setError(err.message || 'Something went wrong')
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    return { UpdateCategory, Loading, error }
}
