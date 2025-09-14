import { useState } from "react"
import { apiCreateCategory } from "@/services/categoryService"

export function useCreateCategory() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const createCategory = async (data: any) => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await apiCreateCategory(data) 
      return response
    } catch (err: any) {
      setError(err.message || "Something went wrong")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return { createCategory, isLoading, error }
}
