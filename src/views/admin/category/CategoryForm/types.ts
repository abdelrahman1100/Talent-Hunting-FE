import { z } from "zod"
import { validationSchema } from "./CategoryForm"
import type { Control, FieldErrors } from 'react-hook-form'

export type CategoryFormSchema = z.infer<typeof validationSchema>

export type FormSectionBaseProps = {
    control: Control<CategoryFormSchema>
    errors: FieldErrors<CategoryFormSchema>
}
