import { useState } from "react"
import { apiCreateCategory, apiUpdateCategory } from "@/services/categoryService"
import { createCategoryRequest, UpdateCategoryRequest } from "../types"

export function useUpdateCategory() {
  const [Loading, setIsLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const UpdateCategory = async (id: string, data: UpdateCategoryRequest) => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await apiUpdateCategory(id ,data) 
      return response
    } catch (err: any) {
      setError(err.message || "Something went wrong")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return { UpdateCategory, Loading, error }
}
