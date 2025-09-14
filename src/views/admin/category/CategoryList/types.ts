export type Category = {
  id: number
  status: string
  created_by: number | null
  last_updated_by: number | null
  generated_date: string
  last_updated_date: string
  name: string
  description: string
}

export type GetCategoriesListResponse = {
  list: Category[]
  total: number
}

export type createCategoryRequest = {
  name: string
  description?: string
}
export type UpdateCategoryRequest = {
  name?: string
  description?: string
}


export type CategoryFilter = {
    name?: string
    status?: string
}
