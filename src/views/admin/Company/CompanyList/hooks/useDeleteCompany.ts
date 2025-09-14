// hooks/useDeleteCategory.ts
import { useState } from "react"
import { apiDeleteCompany } from "@/services/CompanyService"

export const useDeleteCompany = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const deleteCompanies = async (
    companyList: any[],
    selectedCompanies: any[],
    onSuccess?: (newList: any[]) => void
  ) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
     
      await apiDeleteCompany(selectedCompanies.map((c) => c.id))


      const newCompanyList = companyList.filter(
        (company) => !selectedCompanies.some((sel) => sel.id === company.id)
      )

      setSuccess(true)
      onSuccess?.(newCompanyList) 
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return {
    deleteCompanies,
    loading,
    error,
    success,
  }
}
