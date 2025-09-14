export interface Post {
    id?: string
    title: string
    excerpt: string
    content: string
    featuredImage: string
    tags: string[]
    status: 'draft' | 'published'
    category: string
    readTime: number
    isFeatured: boolean
    publishDate: Date | null
    seoTitle: string
    seoDescription: string
    seoKeywords: string
    author: {
        id: string
        name: string
        avatar: string
    }
    createdAt?: string
    updatedAt?: string
}