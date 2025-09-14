import type { ReactNode, CSSProperties } from 'react'

export interface CommonProps {
    id?: string
    className?: string
    children?: ReactNode
    style?: CSSProperties
}

export type TableQueries = {
    total?: number
    pageIndex?: number
    pageSize?: number
    query?: string
    all?: boolean
    sort?: {
        order: 'asc' | 'desc' | ''
        key: string | number
    }
    search?: string
}

export type TraslationFn = (
    key: string,
    fallback?: string | Record<string, string | number>,
) => string
