// hooks/useDeleteCategory.ts
import { useState } from "react"
import { apiDeleteCategory } from "@/services/categoryService"
import { apiDeleteDepartment } from "@/services/DepartmrntServices"
import { apiDeleteLockup } from "@/services/LockUp"

export const useDeleteLockup = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const deleteLockups = async (
    lockupList: any[],
    selectedLockups: any[],
    onSuccess?: (newList: any[]) => void
  ) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await apiDeleteLockup(selectedLockups.map((c) => c.id))

      const newLockupList = lockupList.filter(
        (lockup) => !selectedLockups.some((sel) => sel.id === lockup.id)
      )

      setSuccess(true)
      onSuccess?.(newLockupList)
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return {
    deleteLockups,
    loading,
    error,
    success,
  }
}
