import { useState } from "react"
import { apiCreateCategory, apiUpdateCategory } from "@/services/categoryService"
import { createDepartmentRequest, UpdateDepartmentRequest } from "../types"
import { apiUpdateDepartment } from "@/services/DepartmrntServices"

export function useUpdateDepartment() {
  const [Loading, setIsLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const UpdateDepartment = async (id: string, data: UpdateDepartmentRequest) => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await apiUpdateDepartment(id ,data) 
      return response
    } catch (err: any) {
      setError(err.message || "Something went wrong")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return { UpdateDepartment, Loading, error }
}
