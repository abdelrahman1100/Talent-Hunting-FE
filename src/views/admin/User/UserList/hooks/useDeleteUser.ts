// hooks/useDeleteCategory.ts
import { useState } from "react"
import { apiDeleteUser } from "@/services/UserService"

export const useDeleteUser = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const deleteUsers = async (
    userList: any[],
    selectedUsers: any[],
    onSuccess?: (newList: any[]) => void
  ) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await apiDeleteUser(selectedUsers.map((c) => c.id))

      const newUserList = userList.filter(
        (user) => !selectedUsers.some((sel) => sel.id === user.id)
      )

      setSuccess(true)
      onSuccess?.(newUserList)
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return {
    deleteUsers,
    loading,
    error,
    success,
  }
}
