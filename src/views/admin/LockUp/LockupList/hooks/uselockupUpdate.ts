import { useState } from "react"
import { UpdateLockupRequest } from "../types"
import { apiUpdateLockup } from "@/services/LockUp"

export function useUpdateLockup() {
  const [Loading, setIsLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const UpdateLockup = async (id: string, data: UpdateLockupRequest) => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await apiUpdateLockup(id ,data) 
      return response
    } catch (err: any) {
      setError(err.message || "Something went wrong")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return { UpdateLockup, Loading, error }
}
