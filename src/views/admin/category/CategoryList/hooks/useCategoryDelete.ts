// hooks/useDeleteCategory.ts
import { useState } from "react"
import { apiDeleteCategory } from "@/services/categoryService"

export const useDeleteCategory = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const deleteCategories = async (
    categoryList: any[],
    selectedCategories: any[],
    onSuccess?: (newList: any[]) => void
  ) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
     
      await apiDeleteCategory(selectedCategories.map((c) => c.id))

      
      const newCategoryList = categoryList.filter(
        (category) => !selectedCategories.some((sel) => sel.id === category.id)
      )

      setSuccess(true)
      onSuccess?.(newCategoryList) 
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return {
    deleteCategories,
    loading,
    error,
    success,
  }
}
