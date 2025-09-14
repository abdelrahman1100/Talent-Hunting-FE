// import { detail, Lockup } from './types';
import { z } from 'zod'

import type { Control, FieldErrors } from 'react-hook-form'

import { LockupFormSchema } from './LockUpForm'

export type FormSectionBaseProps = {
    control: Control<LockupFormSchema>
    errors: FieldErrors<LockupFormSchema>
}

export type detail = {
  id: number
  status: string
  created_by: number | null
  last_updated_by: number | null
  generated_date: string
  last_updated_date: string
  value: string
  label: string
}
export type selectedLockUpDetails = Lockup
export type Lockup = {
  id: number
  status: string
  created_by: number | null
  last_updated_by: number | null
  generated_date: string
  last_updated_date: string
  name: string
  label: string
    details: detail[]
}

export type GetLockupListResponse = {
    list: detail[]
    total: number
}

export type Lockups = Lockup[]

export type LockupOption = {
    id: number
    label: string
    value: string
    status: string
}

// const CompanyFormSchema2 = z.object({
//     name: z.string().min(2).max(100),
//     label: z.string().min(2).max(100),
//     // location: z.string().min(2).max(100),
//     // commercial_id: z.string().min(2).max(100),
//     category: z.string().min(2).max(100),
// })

export type LockupFormSchema2 = {
    name: string
    label:string
    // location: string
    // commercial_id: string
    details: detail[]
}
