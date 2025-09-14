import { useEffect, useState } from 'react'
import { apiGetDepartments } from '@/services/DepartmentService'

export type DepartmentOption = {
    value: number
    label: string
    
}

export function useDepartmentOptions() {
    const [departmentOptions, setDepartmentOptions] = useState<
        DepartmentOption[]
    >([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchDepartments() {
            setLoading(true)
            setError(null)
            try {
                console.log('Mina Hakim...')
                const data: any = await apiGetDepartments()
                const options = data.list.map((dept: any) => ({
                    value: dept.id,
                    label: `${dept.name}-${dept.company?.name || ''}`,
                }))
                setDepartmentOptions(options)
                console.log('Department Data:', data)
                console.log('Department Options:', options)
            } catch (err) {
                setError('Failed to fetch departments')
                setDepartmentOptions([])
            }
            setLoading(false)
        }
        fetchDepartments()
    }, [])

    return { departmentOptions, loading, error }
}
