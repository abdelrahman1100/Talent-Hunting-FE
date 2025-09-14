import { create } from 'zustand'
import type { CategoryOption, categories, selectedCategory } from '../types'

export type CategoryFormState = {
    categoryList: categories
    categoryOption: CategoryOption[]
    selectedCategory: selectedCategory[]
}

type CategoryFormAction = {
    setCategoryList: (payload: categories) => void
    setCategoryOption: (payload: CategoryOption[]) => void
    setSelectedCategory: (payload: selectedCategory[]) => void
}

const initialState: CategoryFormState = {
    categoryList: [],
    categoryOption: [],
    selectedCategory: [],
}

export const useCompanyFormStore = create<
    CategoryFormState & CategoryFormAction
>((set) => ({
    ...initialState,
    setCategoryOption: (payload) => set(() => ({ categoryOption: payload })),
    setCategoryList: (payload) => set(() => ({ categoryList: payload })),
    setSelectedCategory: (payload) =>
        set(() => ({ selectedCategory: payload })),
}))
