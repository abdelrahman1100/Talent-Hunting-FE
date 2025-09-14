// hooks/useDeleteCategory.ts
import { useState } from "react"
import { apiDeleteCategory } from "@/services/categoryService"
import { apiDeleteDepartment } from "@/services/DepartmrntServices"

export const useDeleteDepartment = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const deleteDepartments = async (
    departmentList: any[],
    selectedDepartments: any[],
    onSuccess?: (newList: any[]) => void
  ) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await apiDeleteDepartment(selectedDepartments.map((c) => c.id))

      const newDepartmentList = departmentList.filter(
        (department) => !selectedDepartments.some((sel) => sel.id === department.id)
      )

      setSuccess(true)
      onSuccess?.(newDepartmentList)
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return {
    deleteDepartments,
    loading,
    error,
    success,
  }
}
