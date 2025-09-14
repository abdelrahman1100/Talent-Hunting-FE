import { useState } from 'react'
import { apiCreateCompany } from '@/services/CompanyService'
import { CompanyFormSchema } from '../../CompanyForm'

export function useCreateCompany() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<null | string>(null)

    const createCompany = async (data: any) => {
        try {
            setIsLoading(true)
            setError(null)
            console.log('useCreateCompany - Data being sent to API:', data)
            console.log('useCreateCompany - Data keys:', Object.keys(data))
            console.log(
                'useCreateCompany - category_id in data:',
                'category_id' in data,
            )
            console.log(
                'useCreateCompany - category_id value:',
                data.category_id,
            )
            const response = await apiCreateCompany(data)
            console.log('useCreateCompany - API response:', response)
            return response
        } catch (err: any) {
            console.error('useCreateCompany - API error:', err)
            setError(err.message || 'Something went wrong')
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    return { createCompany, isLoading, error }
}
