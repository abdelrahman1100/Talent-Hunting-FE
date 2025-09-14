import { useState } from "react"

import { apiCreateDepartment } from "@/services/DepartmrntServices"

export function useCreateDepartment() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const createDepartment = async (data: any) => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await apiCreateDepartment(data)
      return response
    } catch (err: any) {
      setError(err.message || "Something went wrong")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return { createDepartment, isLoading, error }
}
