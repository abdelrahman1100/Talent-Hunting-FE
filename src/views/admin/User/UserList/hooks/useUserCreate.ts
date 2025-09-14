import { useState } from "react"
import { apiCreateCompany } from "@/services/CompanyService"
import { apiCreateUser } from "@/services/UserService"
import { UserFormSchema } from "../../UserForm/UserForm"
// import { CompanyFormSchema } from "../../CompanyForm"

export function useCreateUser() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const createUser = async (data: UserFormSchema) => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await apiCreateUser(data)
      console.log('Create user response:', response)
      return response
    } catch (err: any) {
      setError(err.message || "Something went wrong")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return { createUser, isLoading, error }
}
