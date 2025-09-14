import { useState } from "react"
import { apiCreateLockup } from "@/services/LockUp"

export function useCreateLockup() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const createLockup = async (data: any) => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await apiCreateLockup(data)
      return response
    } catch (err: any) {
      setError(err.message || "Something went wrong")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return { createLockup, isLoading, error }
}
